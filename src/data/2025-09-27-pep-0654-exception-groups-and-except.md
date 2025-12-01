---
title: "[Final] PEP 654 - Exception Groups and except*"
excerpt: "Python Enhancement Proposal 654: 'Exception Groups and except*'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/654/
toc: true
toc_sticky: true
date: 2025-09-27 09:52:52+0900
last_modified_at: 2025-09-27 09:52:52+0900
published: true
---
> **원문 링크:** [PEP 654 - Exception Groups and except*](https://peps.python.org/pep-0654/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 22-Feb-2021

## PEP 654 – 예외 그룹 및 `except*` (Exception Groups and except*) 한국어 번역 및 요약

### 초록 (Abstract)

이 문서는 프로그램이 여러 개의 관련 없는 예외를 동시에 발생시키고 처리할 수 있도록 하는 언어 확장을 제안합니다.

주요 내용은 다음과 같습니다:
*   **ExceptionGroup** : 함께 전파되는 관련 없는 예외 그룹을 나타내는 새로운 표준 예외 유형입니다.
*   **`except*`**: ExceptionGroup을 처리하기 위한 새로운 구문입니다.

### 동기 (Motivation)

현재 인터프리터는 한 번에 최대 하나의 예외만 전파할 수 있습니다. PEP 3134에서 도입된 예외 체인 기능은 원인(cause)이나 컨텍스트(context)로서 서로 관련된 예외들을 연결하지만, 스택이 풀릴 때 여러 관련 없는 예외를 함께 전파해야 하는 상황이 있습니다.

몇 가지 실제 사용 사례는 다음과 같습니다:
*   **동시성 오류 (Concurrent errors)** : 비동기 동시성 라이브러리는 여러 태스크를 호출하고 결과를 집계하여 반환하는 API를 제공합니다. 여러 태스크에서 예외가 발생할 경우, 현재는 이를 처리할 적절한 방법이 없습니다. 예를 들어, `asyncio.gather()`는 첫 번째 예외를 발생시키거나 예외를 결과 목록으로 반환하는 두 가지 옵션을 제공합니다. `Trio` 라이브러리는 오류 컬렉션을 보고하기 위해 `MultiError` 예외 유형을 사용합니다. 이 PEP의 작업은 `MultiError`를 처리하는 어려움에서 시작되었습니다.
*   **작업 재시도 시 다중 실패 (Multiple failures when retrying an operation)** : `socket.create_connection` 함수는 여러 주소에 연결을 시도할 수 있으며, 모든 시도가 실패하면 사용자에게 보고해야 합니다. 이러한 오류를 집계하는 방법, 특히 오류 유형이 다를 때가 문제입니다.
*   **다중 사용자 콜백 실패 (Multiple user callbacks fail)** : `atexit.register()`로 등록된 함수 중 하나라도 예외를 발생시키면 마지막 하나만 다시 발생하지만, 모든 예외를 함께 다시 발생시키는 것이 더 좋습니다. `pytest` 라이브러리도 여러 `finalizer`가 예외를 발생시킬 때 첫 번째만 보고하는 문제를 `ExceptionGroup`으로 개선할 수 있습니다.
*   **복잡한 계산의 다중 오류 (Multiple errors in a complex calculation)** : `Hypothesis` 라이브러리는 자동 버그 축소(bug reduction)를 수행하며, 이 과정에서 다른 오류를 생성하는 변형을 발견하고 (선택적으로) 모두 보고합니다. `ExceptionGroup` 메커니즘은 컨텍스트/원인 정보 손실로 인한 디버깅의 어려움을 해결할 수 있습니다.
*   **래퍼 코드의 오류 (Errors in wrapper code)** : `tempfile.TemporaryDirectory` 컨텍스트 매니저는 `__exit__`에서 발생하는 정리(cleanup) 중 예외가 사용자 코드에서 발생한 예외를 가리는 문제가 있었습니다. 이 문제는 정리 코드가 오류를 무시하도록 하여 다중 예외 문제를 회피했지만, 이 PEP에서 제안하는 기능들을 사용하면 `__exit__`이 자체 오류와 사용자 오류를 포함하는 `ExceptionGroup`을 발생시켜 사용자가 자신의 예외를 유형별로 잡을 수 있게 됩니다.

### 근거 (Rationale)

여러 예외를 그룹화하는 것은 언어 변경 없이 컨테이너 예외 유형을 만드는 것만으로도 가능합니다. `Trio`의 `MultiError`가 좋은 예시입니다. 그러나 이러한 접근 방식은 호출하는 코드가 컨테이너 예외 유형을 잡고, 오류 유형을 검사하여 처리할 예외를 추출한 다음 나머지를 다시 발생시켜야 합니다. 또한, 예외는 `__traceback__`, `__cause__`, `__context__`와 같은 중요한 정보를 가지므로, 이러한 정보의 무결성을 유지하는 컨테이너 유형을 설계하는 것은 간단하지 않습니다.

기존 예외 처리 메커니즘과 유사하게 예외 그룹을 지원하기 위해서는 언어 변경이 필요합니다. 최소한 특정 유형의 예외를 포함하는 경우에만 예외 그룹을 잡을 수 있어야 합니다. 그룹 내의 다른 유형의 예외는 자동으로 다시 발생해야 하며, 그렇지 않으면 사용자 코드가 처리하지 않는 예외를 실수로 삼키기 쉽습니다.

`except`의 의미를 하위 호환성을 유지하면서 수정하는 것은 불가능하다고 판단했습니다. 따라서 이 PEP는 `ExceptionGroup` 내장 유형과 예외 그룹 처리를 위한 `except*` 구문을 추가하는 것을 목표로 합니다. `except*`의 원하는 의미론은 기존 예외 처리 의미론과 충분히 다르므로 `except` 키워드의 동작을 수정하는 대신 새로운 `except*` 구문을 추가합니다.

`ExceptionGroup`과 `except*`는 필요할 때만 선택적으로 사용될 것이며, 예외 처리의 기본 메커니즘이 될 것으로 예상하지 않습니다. 라이브러리에서 `ExceptionGroup`을 발생시키기로 결정하는 것은 신중하게 고려해야 하며 API 호환성을 깨는 변경으로 간주되어야 합니다.

### 명세 (Specification)

#### `ExceptionGroup` 및 `BaseExceptionGroup`

새로운 내장 예외 유형 두 가지를 추가할 것을 제안합니다: `BaseExceptionGroup(BaseException)`과 `ExceptionGroup(BaseExceptionGroup, Exception)`. 이들은 `Exception.__cause__` 및 `Exception.__context__`에 할당할 수 있으며, 다른 예외처럼 `raise ExceptionGroup(...)` 및 `try: ... except ExceptionGroup: ...` 형태로 발생시키고 처리할 수 있습니다.

두 유형 모두 메시지 문자열과 중첩된 예외 시퀀스라는 두 개의 위치 전용 인수를 받는 생성자를 가집니다. 이들은 각각 `message` 및 `exceptions` 필드로 노출됩니다. 예를 들어: `ExceptionGroup('issues', [ValueError('bad value'), TypeError('bad type')])`.

`ExceptionGroup`은 `Exception` 서브클래스만 래핑할 수 있는 반면, `BaseExceptionGroup`은 모든 `BaseException` 서브클래스를 래핑할 수 있습니다. `BaseExceptionGroup` 생성자는 중첩된 예외를 검사하여 모두 `Exception` 서브클래스인 경우 `ExceptionGroup`을 반환합니다. `ExceptionGroup` 생성자는 중첩된 예외 중 하나라도 `Exception` 인스턴스가 아니면 `TypeError`를 발생시킵니다.

예외 그룹은 중첩될 수 있으므로, 예외 트리를 나타냅니다. `BaseExceptionGroup.subgroup(condition)` 메서드는 원본 그룹과 동일한 메타데이터와 중첩 구조를 가지지만, 조건이 참인 예외만 포함하는 예외 그룹을 얻는 방법을 제공합니다.
`BaseExceptionGroup.split(condition)` 메서드는 `subgroup`과 그 보수(complement)가 모두 필요할 때 사용됩니다. `split`은 예외 유형 또는 예외 유형 튜플을 인수로 받아 해당 유형과 일치하는 리프(leaf) 예외의 서브그룹과 그렇지 않은 예외의 서브그룹으로 나눌 수 있습니다.

#### 예외 그룹 서브클래싱 (Subclassing Exception Groups)

예외 그룹을 서브클래싱할 수 있지만, 이 경우 `subgroup()` 및 `split()`이 일치하거나 일치하지 않는 부분에 대해 새로운 인스턴스를 어떻게 생성해야 하는지 지정해야 합니다. `BaseExceptionGroup`은 `subgroup`과 `split`이 새로운 예외 그룹을 생성해야 할 때 호출되는 인스턴스 메서드 `derive(self, excs)`를 노출합니다.

#### 예외 그룹의 트레이스백 (The Traceback of an Exception Group)

일반 예외의 트레이스백은 예외가 발생한 프레임부터 잡힌 프레임까지의 단순한 프레임 경로를 나타냅니다. `ExceptionGroup` 인스턴스의 `__traceback__` 필드는 포함된 예외들이 그룹으로 결합된 후 함께 이동한 경로를 나타내며, 중첩된 각 예외의 동일한 필드는 해당 예외가 병합 프레임에 도달한 경로를 나타냅니다.
트레이스백을 해석하고 표시하는 코드는 이제 중첩된 예외의 트레이스백으로 계속되어야 합니다.

#### 예외 그룹 처리 (Handling Exception Groups)

프로그램이 예외 그룹을 잡고 처리할 때, 일반적으로 특정 조건이 충족되는 리프 예외가 있는지 쿼리하거나( `subgroup` 또는 `split` 사용) 예외를 포맷할 것으로 예상됩니다.
개별 리프 예외를 순회하는 것은 유용성이 낮을 수 있습니다. 예외가 그룹화되기 전에 특정 예외에 대한 복구가 수행되어야 하기 때문입니다.

#### `except*`

예외 그룹을 보다 쉽게 다룰 수 있도록 `try..except` 구문의 새로운 변형을 도입합니다. `*` 기호는 각 `except*` 절이 여러 예외를 처리할 수 있음을 나타냅니다:

```python
try:
    ...
except* SpamError:
    ...
except* FooError as e:
    ...
except* (BarError, BazError) as e:
    ...
```

새로운 구문에서는 `except*` 절이 발생한 예외 그룹의 서브그룹과 일치할 수 있으며, 나머지 부분은 다음 `except*` 절에 의해 처리됩니다. 즉, 단일 예외 그룹이 여러 `except*` 절을 실행시킬 수 있지만, 각 절은 최대 한 번만 실행되며 각 예외는 정확히 하나의 절에 의해 처리되거나 (유형과 일치하는 첫 번째 절) 마지막에 다시 발생됩니다.

`except*` 절의 순서는 일반 `try..except`와 마찬가지로 중요합니다.

##### 재귀적 매칭 (Recursive Matching)

`except*` 절과 예외 그룹 간의 매칭은 `split()` 메서드를 사용하여 재귀적으로 수행됩니다.

##### 일치하지 않는 예외 (Unmatched Exceptions)

예외 그룹의 모든 예외가 `except*` 절에 의해 일치하지 않으면, 그룹의 나머지 부분은 계속 전파됩니다.

##### 네이키드 예외 (Naked Exceptions)

`try` 블록 내부에서 발생한 예외가 `ExceptionGroup` 또는 `BaseExceptionGroup` 유형이 아닌 경우, 이를 네이키드(naked) 예외라고 합니다. 해당 유형이 `except*` 절 중 하나와 일치하면, 비어 있는 메시지 문자열을 가진 `ExceptionGroup`(또는 `BaseExceptionGroup`)으로 래핑되어 잡힙니다.
그러나 네이키드 예외가 잡히지 않으면 원래의 네이키드 형태로 전파됩니다.

##### `except*` 블록에서 예외 발생 (Raising exceptions in an except* block)

`except*` 블록 내에서 `raise e` (명시적으로 예외 객체 `e`를 발생) 또는 `raise` (현재 예외를 다시 발생)를 사용할 수 있습니다. `except*` 블록에서 발생되거나 다시 발생된 예외 및 처리되지 않은 예외들은 인터프리터에 의해 하나의 결과로 결합되어 발생됩니다.

명시적으로 발생된 예외들은 원래 예외 그룹과 독립적이며, 병합될 수 없습니다. 대신, 이들은 새로운 `ExceptionGroup` (또는 `BaseExceptionGroup`)으로 결합되며, 여기에는 위에 설명된 다시 발생/처리되지 않은 서브그룹도 포함됩니다.

##### 체인 (Chaining)

명시적으로 발생된 예외 그룹은 다른 예외와 마찬가지로 체인됩니다.

##### 새로운 예외 발생 (Raising New Exceptions)

`except*` 절에서 발생된 예외는 동일한 `try` 문의 다른 절과 일치할 수 없습니다.
네이키드 예외의 새 인스턴스를 발생시킨다고 해서 이 예외가 예외 그룹으로 래핑되지는 않습니다. 대신 예외는 있는 그대로 발생하며, 다른 전파된 예외와 결합되어야 하는 경우, 이를 위해 생성된 새 예외 그룹의 직접적인 자식이 됩니다.

##### 포착된 예외 객체 (Caught Exception Objects)

`except*` 절에서 `e`에 바인딩된 예외 그룹은 임시(ephemeral) 객체입니다. 이를 `raise` 또는 `raise e`를 통해 발생시켜도 원래 예외 그룹의 전체 형태는 변경되지 않습니다. `e`에 대한 모든 수정 사항은 손실될 가능성이 있습니다.

##### 금지된 조합 (Forbidden Combinations)

동일한 `try` 문에서 전통적인 `except` 블록과 새로운 `except*` 절을 함께 사용하는 것은 불가능합니다. 이는 `SyntaxError`를 유발합니다.
`except`를 사용하여 `ExceptionGroup` 및 `BaseExceptionGroup` 유형을 잡는 것은 가능하지만, `except*`로는 불가능합니다.
비어있는 "모두 일치" `except*` 블록은 그 의미가 혼란스러울 수 있으므로 지원되지 않습니다.
`continue`, `break`, `return`은 `except*` 절에서 허용되지 않으며 `SyntaxError`를 유발합니다. 이는 `ExceptionGroup` 내의 예외들이 독립적이라고 가정하기 때문입니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP에서 제안하는 변경 사항은 기존 코드를 손상시키지 않습니다.
*   새로운 내장 예외 유형 `ExceptionGroup` 및 `BaseExceptionGroup`의 추가는 기존 프로그램에 영향을 미치지 않습니다.
*   기존 예외 처리 및 표시 방식은 변경되지 않습니다.
*   `except`의 동작은 변경되지 않으므로 기존 코드는 계속 작동합니다.
`ExceptionGroup`이 `Exception`을 상속하도록 하여 `except Exception:`이 거의 모든 예외를 잡을 수 있도록 보장했습니다. `BaseExceptionGroup`은 `except Exception`에 의해 잡히지 않는 예외를 포함하므로 잡히지 않는 것이 적절합니다.

프로그램이 이러한 기능을 사용하기 시작하면 마이그레이션 문제가 발생할 수 있습니다.
*   이제 잠재적으로 예외 그룹을 발생시킬 수 있는 코드를 래핑하는 `except T:` 절은 `except* T:`가 되어야 할 수 있으며, 그 본문도 업데이트해야 할 수 있습니다.
*   이것은 예외 그룹을 발생시키는 것이 API 호환성을 깨는 변경이므로, 기존 API에 추가하기보다는 새로운 API에서 이루어질 가능성이 높습니다.
*   이전 Python 버전을 지원해야 하는 라이브러리는 `except*`를 사용하거나 예외 그룹을 발생시킬 수 없습니다.

### 교육 방법 (How to Teach This)

예외 그룹과 `except*`는 언어 표준의 일부로 문서화될 것입니다. `asyncio`와 같이 예외 그룹을 발생시키는 라이브러리는 문서에 이를 명시하고 어떤 API 호출을 `try-except` 대신 `try-except*`로 래핑해야 하는지 명확히 해야 합니다.

### 프로그래밍 Without 'except *' (Programming Without 'except *')

이 섹션에서는 `except*` 구문이 없을 때 다중 오류 처리가 얼마나 비직관적이고 번거로운지 간단한 예시를 통해 보여줍니다.
`trio.MultiError.catch`를 사용하는 예시를 통해 예외 처리 로직이 별도의 클로저에 있어야 하고, 예외 메커니즘과 `Trio` API에 대한 비 trivial 한 이해를 요구하며, `try..except` 대신 `with` 블록을 사용해야 하는 등 코드 가독성을 저해하는 문제를 지적합니다.

### 수락 (Acceptance)

PEP 654는 2021년 9월 24일 Thomas Wouters에 의해 수락되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.