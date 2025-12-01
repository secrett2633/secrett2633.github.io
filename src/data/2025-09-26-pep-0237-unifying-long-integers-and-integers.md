---
title: "[Final] PEP 237 - Unifying Long Integers and Integers"
excerpt: "Python Enhancement Proposal 237: 'Unifying Long Integers and Integers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/237/
toc: true
toc_sticky: true
date: 2025-09-26 17:06:31+0900
last_modified_at: 2025-09-26 17:06:31+0900
published: true
---
> **원문 링크:** [PEP 237 - Unifying Long Integers and Integers](https://peps.python.org/pep-0237/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Mar-2001


# PEP 237 – Long Integers와 Integers의 통합

*   **작성자:** Moshe Zadka, Guido van Rossum
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **작성일:** 2001년 3월 11일
*   **Python 버전:** 2.2
*   **개정 이력:** 2001년 3월 16일, 2001년 8월 14일, 2001년 8월 23일

## 초록 (Abstract)

현재 Python은 두 가지 종류의 정수(integer)를 구분합니다: C `long` 타입의 크기(일반적으로 32 또는 64비트)에 제한되는 일반 `int` (또는 `short int`)와, 가용 메모리에 의해서만 제한되는 `long int`입니다. `short int`에 대한 연산 결과가 C `long`의 범위에 맞지 않으면 오류를 발생시킵니다. 이 외에도 몇 가지 다른 차이점이 있습니다. 이 PEP는 Python 사용자 관점에서 이 두 가지 타입의 대부분의 의미론적 차이를 없애고, 이들을 통합할 것을 제안합니다.

## 배경 (Rationale)

많은 프로그램에서 나중에 더 큰 숫자를 다룰 필요가 생기며, 알고리즘을 변경하는 것은 번거로운 일입니다. 모든 산술 연산이 `long int`를 사용하여 수행될 경우, 필요하지 않을 때도 성능 저하가 발생할 수 있습니다.

머신의 워드(word) 크기가 언어에 노출되는 것은 이식성(portability)을 저해합니다. 예를 들어, Python 소스 파일과 `.pyc` 파일은 이 문제 때문에 32비트 및 64비트 머신 간에 이식 가능하지 않습니다.

대부분의 애플리케이션에서 불필요한 세부 사항은 Python 사용자로부터 숨겨져야 한다는 일반적인 바람도 있습니다. 예를 들어, C에서는 명시적인 메모리 할당이 Python에서는 자동화되어 문자열, 리스트 등에서 무제한 크기의 편리함을 제공합니다. 이러한 편리함을 숫자로 확장하는 것은 합리적입니다.

이는 새로운 Python 프로그래머(프로그래밍 자체에 새로 접하는 사람이든 아니든)가 언어를 사용하기 시작하기 전에 배워야 할 것을 하나 줄여줄 것입니다.

## 구현 (Implementation)

초기에는 두 가지 대체 구현 방안이 제안되었습니다 (각 저자가 하나씩).

1.  `PyInt` 타입의 C `long` 슬롯을 `union` 타입으로 변경하여, 작은 숫자와 큰 숫자를 모두 처리할 수 있도록 하는 방안. 모든 `PyInt` 함수는 이 `union`의 특정 비트를 확인하여 어떤 연산을 사용할지 결정합니다.
2.  기존 `short int` 및 `long int` 타입을 유지하되, 연산 결과가 `short int`로 표현될 수 없을 때 `OverflowError`를 발생시키는 대신 `long int`를 반환하도록 합니다. `int`와 `long` 구현 타입의 추상 베이스 타입인 새로운 `integer` 타입을 도입할 수 있습니다. 이는 `if isinstance(i, integer): ...` 와 같이 한 번의 테스트로 정수 여부를 확인할 수 있도록 합니다.

고려 끝에 두 번째 구현 계획이 채택되었습니다. 이는 구현이 훨씬 쉽고, C API 수준에서 하위 호환성을 유지하며, 과도기적 조치로서 부분적으로 구현될 수 있기 때문입니다.

## 비호환성 (Incompatibilities)

다음 연산들은 `short int`와 `long int`에 대해 (보통 미묘하게) 다른 의미론을 가지며, 이 중 하나는 변경되어야 합니다. 이는 철저한 목록입니다.

*   **산술 연산자:** 현재 `<<`를 제외한 모든 `short int` 산술 연산자는 결과가 `short int`로 표현될 수 없을 때 `OverflowError`를 발생시킵니다. 이는 `long int`를 대신 반환하도록 변경됩니다. `x+y`, `x-y`, `x*y`, `x**y`, `divmod(x, y)`, `x/y`, `x%y`, `-x` 등이 영향을 받습니다.
*   **좌측 시프트 (`x << n`):** 현재 `short int`의 경우 비트 손실이 발생할 수 있습니다. 이는 `short int`를 반환하면 비트가 손실될 경우 (부호 변경도 비트 손실의 특별한 경우로 간주) 시프트된 모든 비트를 포함하는 `long int`를 반환하도록 변경됩니다.
*   **16진수 (`hex`) 및 8진수 (`oct`) 리터럴:** 현재 `short int`에 대한 16진수 및 8진수 리터럴은 음수 값을 지정할 수 있습니다 (예: 32비트 머신에서 `0xffffffff == -1`). 이는 `0xffffffffL` (2^32-1)과 같도록 변경됩니다.
*   **문자열 포매팅 (`%u`, `%x`, `%X`, `%o`):** 현재 `%u`, `%x`, `%X`, `%o` 문자열 포매팅 연산자와 `hex()`, `oct()` 내장 함수는 음수에 대해 다르게 동작합니다. 음수 `short int`는 부호 없는 C `long`으로 포매팅되는 반면, 음수 `long int`는 마이너스 부호와 함께 포매팅됩니다. 이는 모든 경우에 `long int` 의미론을 사용하도록 변경됩니다 (단, 현재 `long int`의 `hex()` 및 `oct()` 출력에 붙는 `L` 접미사는 제외). 이는 `%u`가 `%d`의 별칭이 되며, 결국 제거될 것임을 의미합니다.
*   **`repr()`:** 현재 `long int`의 `repr()`은 `L`로 끝나는 문자열을 반환하지만, `short int`의 `repr()`은 그렇지 않습니다. `L` 접미사는 제거될 예정이며, Python 3.0 이전에 제거되지는 않을 것입니다.
*   **`long` 피연산자와의 연산:** 현재 `long` 피연산자와의 연산은 절대로 `short int`를 반환하지 않습니다. 이는 일부 최적화를 허용하기 위해 변경될 수 있습니다. (아직 변경된 사항은 없으며, 계획된 사항도 없습니다.)
*   **`type(x).__name__`:** `type(x).__name__`의 표현식은 `x`가 `short int`인지 `long int`인지에 따라 달라집니다. 구현 대안 2가 선택되었으므로 이 차이는 유지됩니다. (Python 3.0에서는 이 차이를 사용자 코드에 노출하는 것이 성가시고, 두 타입 간의 차이가 덜 보이게 되므로 이 차이를 숨기는 트릭을 사용할 수 있을 것입니다.)
*   **`marshal`, `pickle`, `cPickle` 모듈:** `long` 및 `short int`는 `marshal` 모듈과 `pickle`, `cPickle` 모듈에 의해 다르게 처리됩니다. 이 차이는 유지됩니다 (최소한 Python 3.0까지).
*   **정수 인터닝 (Interning):** 작은 값을 가진 `short int` (일반적으로 -1에서 99 사이)는 인터닝(interning)됩니다. 즉, 결과가 이러한 값을 가질 때마다 동일한 값을 가진 기존 `short int`가 반환됩니다. `long int`의 동일한 값에는 적용되지 않습니다. 이 차이는 유지됩니다. (이 인터닝이 보장되는 것은 아니므로, 이것이 의미론적 차이인지에 대해서는 논란의 여지가 있습니다. 하지만 이 인터닝 때문에 `short int` 비교에 `is`를 사용하는 코드가 존재할 수 있으며, 이러한 코드는 `long int`와 함께 사용될 경우 실패할 수 있습니다.)

## 리터럴 (Literals)

정수 리터럴 끝의 `L` 접미사는 더 이상 의미를 갖지 않게 되며, 결국에는 불법화될 것입니다. 컴파일러는 오로지 값에 따라 적절한 타입을 선택할 것입니다. (Python 3.0 이전까지는 리터럴을 `long`으로 강제하지만, `L` 접미사가 없는 리터럴도 `short int`로 표현할 수 없는 경우 `long`이 될 수 있습니다.)

## 내장 함수 (Built-in Functions)

`int()` 함수는 인자 값에 따라 `short int` 또는 `long int`를 반환할 것입니다. Python 3.0에서는 `long()` 함수가 `int()` 함수를 호출할 것입니다. 그 전까지는 계속해서 결과를 `long int`로 강제하지만, 그 외에는 `int()`와 동일하게 작동할 것입니다. 내장 이름 `long`은 `long` 구현 타입을 나타내기 위해 언어에 남아있을 것입니다 (Python 3.0에서 완전히 제거되지 않는 한), 하지만 필요할 때 자동으로 `long`을 반환하므로 `int()` 함수를 사용하는 것이 여전히 권장됩니다.

## C API

C API는 변경되지 않습니다. C 코드는 여전히 `short int`와 `long int`의 차이를 인지해야 합니다. (`PyArg_Parse*()` API는 이미 C `int` 또는 `long`으로 표현 가능한 범위 내의 `long int`를 받아들이므로, C `int` 또는 `long` 인자를 받는 함수는 Python `long`을 처리하는 것에 대해 걱정할 필요가 없을 것입니다.)

## 전환 (Transition)

전환은 세 가지 주요 단계로 구성됩니다.

*   **단계 1 (Python 2.2):** 현재 `OverflowError`를 발생시키는 `short int` 연산은 대신 `long int` 값을 반환합니다. 이 단계의 유일한 변경 사항입니다. 리터럴은 여전히 `short int`와 `long int`를 구분합니다. 위에서 언급된 다른 의미론적 차이점 ( `<<`의 동작 포함)은 유지됩니다. 이 단계는 현재 `OverflowError`를 발생시키는 상황만 변경하므로, 기존 코드를 손상시키지 않을 것으로 예상됩니다. 극단적인 하위 호환성을 우려하는 경우, 명령줄 옵션이나 `warnings` 모듈을 통해 경고 또는 오류를 발생시킬 수 있지만, 기본적으로는 비활성화됩니다.
*   **단계 2 (Python 2.3 - 2A, Python 2.4 - 2B):**
    *   **단계 2A:** 나머지 의미론적 차이점을 해결합니다. 모든 경우에 `long int` 의미론이 우선합니다. 이는 일부 기존 코드를 손상시킬 수 있는 하위 비호환성을 야기하므로, 향후 `future statement` 및/또는 경고, 그리고 장기간의 전환 기간이 필요할 수 있습니다. `L` 접미사는 입력 및 `repr()`에서 `long`에 계속 사용됩니다.
    *   **단계 2B:** 2단계에서 숫자 결과가 변경될 연산(특히 `hex()` 및 `oct()`, `%u`, `%x`, `%X`, `%o`, `[sys.maxint+1, sys.maxint*2+1]` 범위의 16진수 및 8진수 리터럴, 비트를 잃는 좌측 시프트)에 대한 경고가 활성화됩니다. 이러한 연산에 대한 새로운 의미론이 구현됩니다. 이전과 다른 결과를 주는 연산은 경고를 발생시키지 않습니다.
*   **단계 3 (Python 3.0):** `repr()`에서 `L` 접미사가 제거되고, 입력에서 불법화됩니다. (가능하다면 `long` 타입이 완전히 사라집니다.) `hex()` 및 `oct()`에서도 `L` 접미사가 제거됩니다.

**단계 1** 은 Python 2.2에서 구현되었습니다.
**단계 2** 는 점진적으로 구현되었으며, 2A는 Python 2.3에서, 2B는 Python 2.4에서 구현되었습니다.
**단계 3** 은 Python 3.0에서 구현되었습니다 (Python 2.4 출시 후 최소 2년).

## OverflowWarning

현재 `OverflowError`를 발생시키는 상황에서 생성되는 경고를 지시하는 규칙은 다음과 같습니다. 이는 전환 1단계에 적용됩니다. 역사적으로, 1단계가 Python 2.2에서, 2A단계가 Python 2.3에서 완료되었음에도 불구하고, `OverflowWarning`이 Python 2.3에서도 계속 생성된다는 사실을 아무도 눈치채지 못했습니다. 이는 마침내 Python 2.4에서 비활성화되었습니다.

Python 내장 `OverflowWarning`과 해당 C API `PyExc_OverflowWarning`은 Python 2.4에서는 더 이상 생성되거나 사용되지 않지만, Python 2.5까지 사용자 코드의 (가능성이 낮은) 경우를 위해 남아있을 것입니다.

새로운 경고 카테고리인 `OverflowWarning`이 도입되었습니다. 이는 내장 이름입니다. `int` 결과가 오버플로우되면, 연산을 나타내는 메시지 (예: "integer addition")와 함께 `OverflowWarning` 경고가 발행됩니다. 이는 `sys.stderr`에 경고 메시지를 표시하거나 예외를 발생시킬 수 있으며, 이 모든 것은 `-W` 명령줄 옵션과 `warnings` 모듈에 의해 제어됩니다. `OverflowWarning`은 기본적으로 무시됩니다.

`OverflowWarning`은 `-W` 명령줄 옵션 또는 `warnings.filterwarnings()` 호출을 통해 모든 경고와 마찬가지로 제어할 수 있습니다.
예를 들어:

```bash
python -Wdefault::OverflowWarning
```
특정 소스 라인에서 처음 발생할 때 `OverflowWarning`이 표시되도록 합니다.

```bash
python -Werror::OverflowWarning
```
`OverflowWarning`이 발생할 때마다 예외로 전환되도록 합니다.

다음 코드는 프로그램 내부에서 경고를 활성화합니다.

```python
import warnings
warnings.filterwarnings("default", "", OverflowWarning)
```

`-W` 옵션에 대해서는 python man 페이지를, `filterwarnings()`에 대해서는 `warnings` 모듈 문서를 참조하십시오.

`OverflowWarning`이 오류로 전환되면 `OverflowError`로 대체됩니다. 이는 하위 호환성을 위해 필요합니다. 경고가 예외로 전환되지 않는 한, 연산 결과 (예: `x+y`)는 인수를 `long int`로 변환한 후 재계산됩니다.

## 예시 (Example)

`long int`를 정수를 취하는 C 함수나 내장 연산에 전달하면, 값이 범위 내에 있는 한 `short int`와 동일하게 처리됩니다 (`PyArg_ParseTuple()` 구현 방식 덕분입니다). `long` 값이 맞지 않으면 여전히 `OverflowError`가 발생합니다.

예를 들어:

```python
def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)

A = "ABCDEFGHIJKLMNOPQ"
n = input("Gimme an int: ")
print(A[fact(n) % 17])
```

`n >= 13`일 때, 이 코드는 현재 `OverflowError`를 발생시킵니다 (사용자가 입력의 일부로 `L` 접미사를 입력하지 않는 한), 계산된 인덱스가 항상 `range(17)` 내에 있더라도 말입니다. 새로운 접근 방식에서는 이 코드가 올바르게 작동할 것입니다. 인덱스는 `long int`로 계산되지만, 그 값은 범위 내에 있을 것입니다.

## 해결된 문제 (Resolved Issues)

이전에 미해결이었던 다음 문제들이 해결되었습니다.

*   **`hex()` 및 `oct()`의 `L` 접미사:** `long`에 적용되는 `hex()` 및 `oct()`는 Python 3000까지 `L` 접미사를 계속 생성합니다.
*   **`sys.maxint`:** `sys.maxint`는 `short int`와 `long int`의 구분이 여전히 관련이 있는 경우 (예: 값의 타입을 검사할 때) 여전히 유효하므로 유지됩니다.
*   **`%u` 제거 여부:** 완전히 제거됩니다.
*   **`<<` 비트 잘림 경고:** `<<`가 정수를 잘라내지 않는 것에 대해 경고해야 합니다. (예)
*   **오버플로우 경고의 이식 가능한 최대 크기:** 아닙니다. (no)

## 구현 현황 (Implementation)

Python 2.x 라인에 대한 구현 작업은 완료되었습니다. 1단계는 Python 2.2와 함께, 2A단계는 Python 2.3과 함께, 2B단계는 Python 2.4와 함께 릴리스되었습니다 (이미 CVS에 있습니다).

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.