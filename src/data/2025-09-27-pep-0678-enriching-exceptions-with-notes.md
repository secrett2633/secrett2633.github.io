---
title: "[Final] PEP 678 - Enriching Exceptions with Notes"
excerpt: "Python Enhancement Proposal 678: 'Enriching Exceptions with Notes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/678/
toc: true
toc_sticky: true
date: 2025-09-27 10:09:33+0900
last_modified_at: 2025-09-27 10:09:33+0900
published: true
---
> **원문 링크:** [PEP 678 - Enriching Exceptions with Notes](https://peps.python.org/pep-0678/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Dec-2021



# PEP 678 – 예외에 Notes 추가하기

## 초록 (Abstract)
Python의 예외(Exception) 객체는 일반적으로 발생한 오류를 설명하는 메시지로 초기화됩니다. 하지만 예외가 포착(catch)되어 다시 발생(re-raise)되거나 `ExceptionGroup`에 포함될 때 추가 정보가 필요할 수 있습니다. PEP 678은 이러한 필요에 따라 `BaseException.add_note(note)` 메서드와 추가된 노트들을 담는 `.__notes__` 속성(list)을 도입할 것을 제안합니다. 또한, 내장 트레이스백(traceback) 포매팅 코드가 예외 문자열(exception string) 다음에 노트들을 포함하도록 업데이트됩니다.

이 기능은 PEP 654의 `ExceptionGroup`과 관련하여 특히 유용하며, 기존의 해결책들이 비효율적이거나 혼란스러웠던 문제를 해결합니다. 표준 라이브러리, Hypothesis 및 cattrs 패키지, 그리고 재시도(retries)가 있는 일반적인 코드 패턴에서 사용 사례가 확인되었습니다.

## 동기 (Motivation)
예외가 발생하기 위해 생성될 때, 주로 발생한 오류를 설명하는 정보로 초기화됩니다. 하지만 예외가 포착된 후 추가 정보를 추가하는 것이 유용한 경우가 있습니다. 예를 들어,

*   **테스팅 라이브러리** 는 실패한 assert와 관련된 값이나 실패를 재현하는 단계를 표시하고자 할 수 있습니다 (예: pytest 및 hypothesis).
*   **오류 발생 시 작업을 재시도하는 코드** 는 여러 오류 각각에 반복 횟수, 타임스탬프 또는 다른 설명을 연결하고 싶을 수 있습니다. 특히 이들을 `ExceptionGroup`으로 다시 발생시킬 때 더욱 그렇습니다.
*   **초보자를 위한 프로그래밍 환경** 은 다양한 오류에 대한 더 자세한 설명과 해결 팁을 제공할 수 있습니다.

기존 접근 방식들은 이 추가 정보를 전달하면서도 발생했거나, 포착되었거나, 연결된(chained) 예외의 상태와 동기화해야 했습니다. 이는 이미 오류 발생 가능성이 높았으며, PEP 654 `ExceptionGroup`으로 인해 더욱 어려워졌으므로, 내장 솔루션이 필요한 시점입니다.

따라서 PEP 678은 다음을 제안합니다.
*   새로운 메서드 `BaseException.add_note(note: str)`
*   `.add_note()`를 사용하여 추가된 노트 문자열 리스트인 `BaseException.__notes__`
*   내장 트레이스백 포매팅 코드에서 노트가 예외 문자열 다음에 표시되도록 지원.

### 사용 예시 (Example usage)

```python
>>> try:
...     raise TypeError('bad type')
... except Exception as e:
...     e.add_note('Add some information')
...     raise
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: bad type
Add some information
```

`ExceptionGroup`에 예외를 수집할 때, 개별 오류에 대한 컨텍스트 정보를 추가할 수 있습니다. 다음은 Hypothesis와 `ExceptionGroup`을 사용한 예시입니다. 각 예외에는 최소 실패 예시에 대한 노트가 포함됩니다.

```python
from hypothesis import given, strategies as st, target

@given(st.integers())
def test(x):
    assert x < 0
    assert x > 0

# + Exception Group Traceback (most recent call last):
# | File "test.py", line 4, in test
# |   def test(x):
# |
# | File "hypothesis/core.py", line 1202, in wrapped_test
# |     raise the_error_hypothesis_found
# |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# | ExceptionGroup: Hypothesis found 2 distinct failures.
# +-+---------------- 1 ----------------
# | Traceback (most recent call last):
# |   File "test.py", line 6, in test
# |     assert x > 0
# |     ^^^^^^^^^^^^
# | AssertionError: assert -1 > 0
# |
# | Falsifying example: test(
# |     x=-1,
# | )
# +---------------- 2 ----------------
# | Traceback (most recent call last):
# |   File "test.py", line 5, in test
# |     assert x < 0
# |     ^^^^^^^^^^^^
# | AssertionError: assert 0 < 0
# |
# | Falsifying example: test(
# |     x=0,
# | )
# +------------------------------------
```

### 비목표 (Non-goals)
여러 노트를 리스트로 추적하는 것은 노트가 추가될 때 문자열을 연결하는 대신 개별 노트 간의 구분을 유지하기 위함입니다. 이는 friendly-traceback과 같은 패키지에서 노트 번역과 같은 특수 사용 사례에서 필요할 수 있습니다.

그러나 `__notes__`는 구조화된 데이터를 전달하기 위한 것이 아닙니다. 노트가 사람에게 표시되기보다는 프로그램에서 사용하기 위한 것이라면, 오류 또는 `ExceptionGroup`에 `err._parse_errors = ...`와 같은 속성에 대한 규칙을 선택하는 것을 권장합니다 (또는 추가적으로).

경험상, 오류가 개별 오류로 다시 발생하거나 처리될 경우에는 예외 체인(exception chaining)을 선호하고, 예외 유형을 변경하는 것을 피하거나 여러 예외 객체를 함께 처리하기 위해 수집하는 경우에는 `.add_note()`를 선호하는 것을 제안합니다.

## 명세 (Specification)
`BaseException`은 새로운 메서드 `.add_note(note: str)`를 얻습니다. `note`가 문자열이면, `.add_note(note)`는 이를 `__notes__` 리스트에 추가하며, 속성이 존재하지 않으면 생성합니다. `note`가 문자열이 아니면, `.add_note()`는 `TypeError`를 발생시킵니다.

라이브러리는 `__notes__` 리스트를 수정하거나 삭제하여 기존 노트를 지울 수 있으며, `del err.__notes__`를 사용하여 모든 노트를 지울 수도 있습니다. 이를 통해 첨부된 노트에 대한 완전한 제어가 가능하며, API를 지나치게 복잡하게 만들거나 `BaseException.__dict__`에 여러 이름을 추가하지 않습니다.

인터프리터의 내장 트레이스백 렌더링 코드에 의해 예외가 표시될 때, 노트(있는 경우)는 예외 메시지 바로 뒤에, 추가된 순서대로, 각 노트가 새 줄에서 시작하여 나타납니다.

`__notes__`가 생성된 경우, `BaseExceptionGroup.subgroup` 및 `BaseExceptionGroup.split`은 새 인스턴스마다 새로운 리스트를 생성하며, 원본 예외 그룹의 `__notes__`와 동일한 내용을 포함합니다.

사용자가 `__notes__`에 리스트가 아닌 값을 할당하거나 문자열이 아닌 요소를 포함하는 리스트를 할당했을 때의 예상되는 동작은 명시하지 않습니다. 구현은 경고를 발행하거나, 잘못된 값을 삭제 또는 무시하거나, 문자열로 변환하거나, 예외를 발생시키거나, 완전히 다른 작업을 수행할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)
시스템 정의 또는 "던더(dunder)" 이름 ( `__*__` 패턴을 따름)은 언어 명세의 일부이며, 할당되지 않은 이름은 향후 사용을 위해 예약되어 있고 경고 없이 변경될 수 있습니다. 또한 `__notes__` 추가로 인해 손상될 수 있는 코드는 알지 못합니다.

`BaseException.add_note()` 추가로 인해 손상될 수 있는 코드도 찾을 수 없었습니다. Google 및 GitHub 검색 결과 여러 `.add_note()` 메서드 정의가 발견되었지만, 그 중 어느 것도 `BaseException`의 서브클래스에 있지 않았습니다.

## 교육 방법 (How to Teach This)
`add_note()` 메서드와 `__notes__` 속성은 언어 표준의 일부로 문서화되고, "Errors and Exceptions" 튜토리얼의 일부로 설명될 것입니다.

## 참조 구현 (Reference Implementation)
PEP 654와 관련된 논의에 따라, 이 제안의 초기 버전은 CPython 3.11.0a3에 구현 및 출시되었으며, 변경 가능한 문자열 또는 `None` 타입의 `__note__` 속성을 가졌습니다.

CPython PR #31317은 `.add_note()` 및 `__notes__`를 구현합니다.

## 거부된 아이디어 (Rejected Ideas)

### `print()` (또는 `logging` 등) 사용
오류에 대한 설명 또는 컨텍스트 정보를 `print` 또는 `logging`으로 보고하는 것은 역사적으로 허용되는 해결책이었습니다. 그러나 이 방식은 내용과 참조하는 예외 객체를 분리시켜, 오류가 나중에 포착되어 처리되거나 단순히 어떤 설명이 어떤 오류에 해당하는지 파악하기가 어려워지는 "고아(orphan)" 보고서를 초래할 수 있습니다. 새로운 `ExceptionGroup` 타입은 이러한 기존의 문제들을 심화시킵니다.

`__traceback__` 속성과 동일한 방식으로 `__notes__`를 예외 객체에 첨부하면 이러한 문제들이 해결됩니다.

### `raise Wrapper(explanation) from err`
또 다른 패턴은 예외 체인(exception chaining)을 사용하는 것입니다. 현재 예외로부터 컨텍스트나 설명을 포함하는 '래퍼(wrapper)' 예외를 발생시킴으로써, `print()`로부터의 분리 문제를 피할 수 있습니다. 그러나 여기에는 두 가지 주요 문제가 있습니다.

첫째, 예외의 유형을 변경하는데, 이는 종종 하위 코드에 대한 호환성(breaking change)을 야기합니다. 항상 `Wrapper` 예외를 발생시키는 것은 용납할 수 없을 정도로 우아하지 않다고 판단합니다. 또한 사용자 정의 예외 유형은 임의의 수의 필수 인수를 가질 수 있기 때문에 항상 동일한 유형의 인스턴스를 설명과 함께 생성할 수는 없습니다. 정확한 예외 유형을 아는 경우에는 표준 라이브러리 `http.client` 코드와 같이 작동할 수 있지만, 사용자 코드를 호출하는 라이브러리에서는 작동하지 않습니다.

둘째, 예외 체인은 여러 줄의 추가적인 세부 정보를 보고하는데, 이는 숙련된 사용자에게는 방해가 되고 초보자에게는 매우 혼란스러울 수 있습니다.

이 두 가지 문제가 적용되지 않는 경우에는 `__notes__` 대신 예외 체인 사용을 권장합니다.

### 할당 가능한 `__note__` 속성
이 PEP의 첫 번째 초안 및 구현은 단일 `__note__` 속성을 정의했으며, 이는 기본적으로 `None`이지만 문자열을 할당할 수 있었습니다. 이는 노트가 최대 하나일 경우에만 훨씬 간단합니다.

friendly-traceback과 같은 라이브러리에서 오류 메시지의 상호 운용성과 번역을 촉진하기 위해 의심스러운 구문 분석 휴리스틱에 의존하지 않고 `.add_note()` 및 `__notes__` API에 합의했습니다.

### `Exception`을 서브클래싱하여 하위에서 노트 지원 추가
트레이스백 출력은 C 코드에 내장되어 있으며, `traceback.py`에서 순수 Python으로 재구현됩니다. 하위 구현에서 `err.__notes__`를 출력하려면 사용자 정의 트레이스백 출력 코드를 작성해야 합니다.

사용자 정의 예외 유형은 `__str__` 메서드를 구현하여 제안된 `__notes__` 의미 체계를 포함할 수 있지만, 이는 거의 사용되지 않고 일관성이 없을 것입니다.

### 노트를 `Exception`에 첨부하지 않고 `ExceptionGroup`에만 저장
이 PEP의 초기 동기는 `ExceptionGroup`의 각 오류에 노트를 연결하는 것이었습니다. 놀랍도록 어색한 API와 위에서 논의된 상호 참조 문제의 대가를 치르면, 이 사용 사례는 각 예외에 저장하는 대신 `ExceptionGroup` 인스턴스에 노트를 저장하여 지원될 수 있었습니다.

그러나 더 깔끔한 인터페이스와 위에서 설명된 다른 사용 사례들이 이 PEP가 제안하는 더 일반적인 기능을 정당화하기에 충분하다고 생각합니다.

### 헬퍼 함수 `contextlib.add_exc_note()` 추가
표준 라이브러리에 다음과 같은 유틸리티를 추가하는 것이 제안되었습니다. 이 아이디어는 이 PEP의 제안의 핵심이 아니므로, 나중이나 하위 구현을 위해 남겨둡니다.

### `raise` 문 증강
한 논의에서는 `raise Exception() with "note contents"`를 제안했지만, 이는 `ExceptionGroup`과의 호환성이라는 원래 동기를 해결하지 못합니다.

또한, 해결하려는 문제가 새로운 언어 구문을 필요로 하거나 정당화한다고 생각하지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.