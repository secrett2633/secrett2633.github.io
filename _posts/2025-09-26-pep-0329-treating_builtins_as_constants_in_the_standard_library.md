---
title: "[Rejected] PEP 329 - Treating Builtins as Constants in the Standard Library"
excerpt: "Python Enhancement Proposal 329: 'Treating Builtins as Constants in the Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/329/
toc: true
toc_sticky: true
date: 2025-09-26 20:37:36+0900
last_modified_at: 2025-09-26 20:37:36+0900
published: true
---
> **원문 링크:** [PEP 329 - Treating Builtins as Constants in the Standard Library](https://peps.python.org/pep-0329/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Apr-2004


# PEP 329 – 표준 라이브러리에서 Builtin을 상수로 취급하기

*   **작성자:** Raymond Hettinger <python at rcn.com>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2004년 4월 18일
*   **Python 버전:** 2.4
*   **이력:** 2004년 4월 18일

## 개요 (Abstract)

이 제안은 빌트인(builtin) 참조를 상수처럼 취급하는 함수를 추가하고, 이 함수를 표준 라이브러리 전체에 적용하는 것을 목표로 합니다.

## 상태 (Status)

이 PEP는 작성자에 의해 스스로 거부되었습니다. ASPN 레시피는 좋은 반응을 얻었지만, 이 제안을 코어 배포판에 포함시키는 것에 대한 의지는 적었습니다.

특히, Jython 구현은 바이트코드(byte code)를 사용하지 않으므로, 현재의 `_len=len`과 같은 최적화가 제거되면 성능 저하를 겪을 수 있습니다.

또한, 바이트코드를 변경하는 것은 성능을 개선하고 더 깔끔한 코딩을 가능하게 하는 방법 중 가장 깔끔하지 못한 방법 중 하나로 여겨졌습니다. 더 견고한 해결책은 컴파일러 pragma 지시어 또는 최적화될 수 있는 것을 나타내는 메타변수(예: `const`/`volatile` 선언과 유사)를 포함할 가능성이 높았습니다.

## 동기 (Motivation)

표준 라이브러리에는 `_len=len`과 같은 코드가 포함되어 있는데, 이는 느린 전역(global) 조회 대신 빠른 지역(local) 참조를 생성하기 위한 것입니다. 이러한 구조는 성능을 위해 필요하지만, 코드를 지저분하게 만들고 종종 불완전합니다 (많은 최적화 기회를 놓칩니다).

만약 이 제안이 채택되었다면, 이러한 구조들을 코드베이스에서 제거하면서도 성능 측면에서 더 나은 결과를 얻을 수 있었을 것입니다.

현재 라이브러리에는 `while 1` 구문이 100개 이상 있습니다. 이들은 더 가독성 높은 `while True`로 대체되지 않았는데, 이는 성능상의 이유 때문입니다 (컴파일러가 `True`가 항상 상수임을 알지 못하므로 테스트를 제거할 수 없습니다). `True`를 상수로 변환하면 성능을 유지하면서 코드를 명확하게 할 수 있습니다.

다른 많은 기본적인 Python 연산들도 전역 조회(global lookup) 때문에 훨씬 느리게 실행됩니다. `try`/`except` 문에서, 잡힌 예외(exception)들은 일치 여부를 테스트하기 전에 동적으로 조회됩니다. 마찬가지로, `while x is not None`과 같은 간단한 동일성 테스트도 매번 `None` 변수를 다시 조회해야 합니다. 빌트인 조회는 특히 더 문제가 되는데, 바깥쪽 전역 스코프(global scope)를 먼저 확인해야 하기 때문입니다. 이러한 조회 체인은 다른 곳에 더 잘 활용될 캐시 공간을 차지합니다.

요약하자면, 이 제안이 채택되었다면 코드는 더 깔끔해지고 전반적인 성능이 향상되었을 것입니다.

## 제안 (Proposal)

`codetweaks.py`라는 모듈을 추가하고, 이 모듈에는 `bind_constants()`와 `bind_all()`이라는 두 개의 함수를 포함합니다. 첫 번째 함수는 상수 바인딩(constant binding)을 수행하고, 두 번째 함수는 이를 대상 모듈 내의 모든 함수와 클래스에 재귀적으로 적용합니다.

대부분의 표준 라이브러리 모듈의 경우, 스크립트 끝 부분에 다음과 같은 두 줄의 코드를 추가합니다.

```python
import codetweaks, sys
codetweaks.bind_all(sys.modules[__name__])
```

빌트인 바인딩 외에도 `sre_compile`과 같은 일부 모듈에서는 모듈 변수와 빌트인 모두를 상수로 바인딩하는 것이 합리적입니다.

## 질의응답 (Questions and Answers)

*   **이것이 모든 사람의 주의를 최적화 문제로 돌리게 만들까요?**
    자동으로 수행되기 때문에, 최적화에 대해 생각할 필요성을 줄여줍니다.

*   **간단히 말해, 어떻게 작동하나요?**
    모든 함수에는 바이트코드(Python 가상 머신의 언어)와 상수 테이블이 포함된 속성이 있습니다. `bind` 함수는 바이트코드에서 `LOAD_GLOBAL` 명령을 스캔하고, 해당 값이 이미 알려져 있는지 확인합니다. 만약 그렇다면, 해당 값을 상수 테이블에 추가하고 opcode를 `LOAD_CONSTANT`로 대체합니다.

*   **언제 작동하나요?**
    모듈이 처음 임포트(import)될 때, Python은 바이트코드를 컴파일하고 바인딩 최적화를 실행합니다. 이후의 임포트는 이전 작업을 재사용합니다. 각 세션마다 이 프로세스가 반복됩니다 (결과는 `.pyc` 파일에 저장되지 않습니다).

*   **이것이 작동하는지 어떻게 아나요?**
    제가 구현하고, 라이브러리의 모든 모듈에 적용했으며, 테스트 스위트는 예외 없이 실행되었습니다.

*   **모듈이 빌트인을 섀도잉(shadowing)하는 변수를 정의한다면요?**
    이런 일이 발생합니다. 예를 들어, 모듈 수준에서 `True = (1==1)`과 같이 `True`를 재정의할 수 있습니다. 아래의 샘플 구현은 섀도잉을 감지하고 전역 조회는 변경하지 않고 둡니다.

*   **대부분의 전역 조회가 절대 변경되지 않는 값에 대한 것임을 처음으로 인지한 사람인가요?**
    아닙니다. 이는 오랫동안 알려진 사실입니다. Skip Montanaro는 PEP 266에서 명쾌한 설명을 제공합니다.

*   **`builtins` 모듈을 교체하고 사용자 정의 구현을 제공하려면 어떻게 해야 하나요?**
    모듈을 임포트하기 전에 이를 수행하거나, 모듈을 다시 로드(reload)하거나, `codetweaks.py`를 비활성화(disable)할 수 있습니다 (비활성화 플래그가 있을 것입니다).

*   **이 모듈은 Python의 바이트코드 변경에 얼마나 취약한가요?**
    재넘버링(renumbering)으로부터 보호하기 위해 `opcode.py`를 임포트합니다. 또한, `LOAD_CONST`와 `LOAD_GLOBAL`은 근본적이고 오랫동안 존재해왔습니다. 그럼에도 불구하고, 코딩 스키마가 변경될 수 있으며, 이 구현은 현재 코딩 스키마에 의존하는 `dis`와 같은 모듈과 함께 변경되어야 할 것입니다.

*   **시작 시간(startup time)에 미치는 영향은 무엇인가요?**
    차이를 측정할 수 없었습니다. `warnings.py`를 제외하고는 어떤 시작 모듈도 바인딩되지 않습니다. 또한, 바인딩 함수는 `LOAD_GLOBAL` opcode를 찾아 코드 문자열을 한 번만 통과하므로 매우 빠릅니다.

## 샘플 구현 (Sample Implementation)

다음은 `codetweaks.py`의 샘플 구현입니다. 이 코드는 주어진 함수(`f`)의 바이트코드를 스캔하여 `LOAD_GLOBAL` 연산을 찾고, 만약 해당 전역 변수가 현재 환경(빌트인 또는 모듈 전역)에서 상수처럼 정의되어 있다면, 이를 `LOAD_CONSTANT`로 대체하여 최적화합니다.

`bind_constants` 함수는 단일 함수를 최적화하며, `builtin_only` 플래그를 통해 빌트인만 최적화할지, 아니면 모듈 전역까지 포함할지 제어할 수 있습니다. `stoplist`를 통해 특정 변수를 최적화에서 제외할 수도 있습니다.

`bind_all` 함수는 모듈 또는 클래스 내의 모든 함수에 `bind_constants`를 재귀적으로 적용합니다. 모듈의 마지막 줄(모든 정의가 완료된 후, 테스트 코드 이전에)에 사용하여 모듈 전체를 최적화하도록 제안됩니다.

```python
# (원문 코드 생략. 여기서는 설명만 제공합니다.)
from types import ClassType, FunctionType
from opcode import opmap, HAVE_ARGUMENT, EXTENDED_ARG
LOAD_GLOBAL, LOAD_CONST = opmap['LOAD_GLOBAL'], opmap['LOAD_CONST']
ABORT_CODES = (EXTENDED_ARG, opmap['STORE_GLOBAL'])

def bind_constants(f, builtin_only=False, stoplist=[], verbose=False):
    """
    최적화된 전역 참조를 가진 새 함수를 반환합니다.
    전역 참조를 현재 정의된 값으로 대체합니다.
    정의되지 않은 경우, 동적(런타임) 전역 조회는 그대로 둡니다.
    builtin_only가 True인 경우, 빌트인만 최적화됩니다.
    stoplist에 있는 변수 이름도 그대로 둡니다.
    verbose가 True인 경우, 각 대체가 발생할 때마다 출력합니다.
    """
    # ... (생략) ...
    # 바이트코드를 분석하고 LOAD_GLOBAL을 LOAD_CONST로 대체하는 로직 포함
    # ... (생략) ...

def bind_all(mc, builtin_only=False, stoplist=[], verbose=False):
    """
    모듈 또는 클래스 내의 함수에 bind_constants()를 재귀적으로 적용합니다.
    모듈의 마지막 줄(모든 것이 정의된 후, 테스트 코드 이전에)에 사용합니다.
    수정 가능한 전역 변수가 필요한 모듈에서는 builtin_only를 True로 설정합니다.
    """
    # ... (생략) ...
    # 모듈/클래스 내의 함수 및 클래스를 순회하며 bind_constants 적용
    # ... (생략) ...

# CPython이 아닌 환경(바이트코드가 없는 환경)을 자동으로 감지합니다.
# 이 경우, bind 함수는 단순히 원본 함수를 변경 없이 반환합니다.
# 이는 라이브러리 모듈에 두 줄을 추가하는 것이 다른 구현에 영향을 미치지 않도록 보장합니다.
# 최종 코드에는 바인딩을 쉽게 비활성화할 수 있는 플래그가 추가되어야 합니다.
```

## 참고 자료 (References)

*   비공개 구현을 위한 ASPN 레시피
    `https://code.activestate.com/recipes/277940/`
*   CPython과 Jython의 차이점
    `https://web.archive.org/web/20031018014238/http://www.jython.org/cgi-bin/faqw.py?req=show&file=faq01.003.htp`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.