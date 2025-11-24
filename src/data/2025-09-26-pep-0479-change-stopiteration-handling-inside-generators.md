---
title: "[Final] PEP 479 - Change StopIteration handling inside generators"
excerpt: "Python Enhancement Proposal 479: 'Change StopIteration handling inside generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/479/
toc: true
toc_sticky: true
date: 2025-09-26 22:23:28+0900
last_modified_at: 2025-09-26 22:23:28+0900
published: true
---
> **원문 링크:** [PEP 479 - Change StopIteration handling inside generators](https://peps.python.org/pep-0479/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Nov-2014

## PEP 479 – 제너레이터 내 `StopIteration` 처리 방식 변경 제안

**작성자:** Chris Angelico, Guido van Rossum
**상태:** Final (최종)
**유형:** Standards Track
**생성일:** 2014년 11월 15일
**Python 버전:** 3.5

### 요약

이 PEP는 제너레이터에 대한 변경 사항을 제안합니다. 제너레이터 내부에서 `StopIteration` 예외가 발생할 경우, 이는 `RuntimeError`로 대체됩니다. (좀 더 정확히 말하면, 이 예외가 제너레이터의 스택 프레임 밖으로 전파되려고 할 때 발생합니다.) 이 변경 사항은 하위 호환성을 깨뜨리기 때문에, 처음에는 `__future__` 문을 사용하여 도입됩니다.

### 도입 배경 (Rationale)

현재 제너레이터와 `StopIteration`의 상호 작용은 다소 의외의 동작을 보이며, 은밀한 버그를 숨길 수 있습니다. 예상치 못한 예외는 미묘하게 변경된 동작을 초래해서는 안 되며, 시끄럽고 쉽게 디버깅할 수 있는 트레이스백(traceback)을 발생시켜야 합니다. 현재는 제너레이터 함수 내에서 실수로 `StopIteration`이 발생하면, 제너레이터를 구동하는 루프(loop) 구조에 의해 이터레이션(iteration)의 끝으로 해석됩니다.

이 제안의 주요 목표는 보호되지 않은 `next()` 호출(아마도 여러 스택 깊이에서)이 `StopIteration`을 발생시켜 제너레이터에 의해 제어되는 이터레이션이 조용히 종료되는 상황에서 디버깅을 용이하게 하는 것입니다. (반면, 다른 예외가 발생하면 문제의 원인을 지적하는 트레이스백이 출력됩니다.)

이 문제는 특히 PEP 380의 `yield from` 구문과 결합될 때 더욱 치명적입니다. `yield from`은 서브 제너레이터(subgenerator)가 제너레이터에서 분리될 수 있다는 추상화를 깨뜨립니다. 의도적인 사용은 드물지만, 실수로 이런 경우에 부딪히기 쉽습니다. 예를 들어, `contextlib.contextmanager`와 `yield from`을 사용하는 코드에서 내부적으로 `StopIteration`이 발생하면, 컨텍스트 관리자가 이 예외를 삼키고 마무리(finalization)가 조용히 건너뛰어지는 미묘한 버그가 발생할 수 있습니다. 유사하게 `asyncio` 코루틴(coroutine)이 `StopIteration`을 발생시키면 조용히 종료될 수 있습니다.

추가적으로, 이 제안은 `List Comprehension`과 제너레이터 표현식(`generator expressions`) 간의 차이를 줄여서, 예기치 않은 결과를 방지합니다. 이 변경으로 인해, 함수 `F(x)`나 조건 `P(x)`가 `StopIteration`을 발생시키는 경우, `list(F(x) for x in xs if P(x))` 형태와 `[F(x) for x in xs if P(x)]` 형태 모두 예외를 발생시키게 됩니다 (첫 번째 경우는 `RuntimeError`, 두 번째 경우는 `StopIteration`).

마지막으로, 이 제안은 제너레이터를 종료하는 방법에 대한 혼란을 해소합니다. 올바른 방법은 `return`이지 `raise StopIteration`이 아닙니다. 이러한 변경 사항은 제너레이터 함수를 일반 함수와 더욱 일치시키며, 코드 재사용 및 변환을 더 쉽게 만듭니다.

### 제안 내용 (Proposal)

`StopIteration`이 제너레이터 프레임 밖으로 전파되려고 할 때, 이 예외는 `RuntimeError`로 대체됩니다. 이는 `next()` 호출(제너레이터를 호출한)이 해당 예외를 전달하며 실패하도록 만듭니다. 그 후에는 다른 일반적인 예외와 동일하게 처리됩니다.

이 변경은 제너레이터에서 예외가 버블업(bubble out)되는 세 번째 경우에만 영향을 미치며, 발생한 예외가 `StopIteration` (또는 그 서브클래스)인 경우에만 적용됩니다. 제너레이터 프레임에서 `return`에 의해 발생하는 `StopIteration`은 영향을 받지 않습니다. (이는 `StopIteration`이 제너레이터가 "정상적으로" 종료되었음을 의미하기 때문입니다. 즉, 예외를 발생시키지 않았다는 뜻입니다.)

이 변경 사항은 전환 기간 동안 모듈별로 다음을 사용하여 활성화되어야 합니다.

```python
from __future__ import generator_stop
```

이 지시문의 영향을 받아 생성된 모든 제너레이터 함수는 코드 객체에 `REPLACE_STOPITERATION` 플래그가 설정되며, 이 플래그가 설정된 제너레이터는 이 제안에 따라 작동합니다. 기능이 표준이 되면 플래그는 제거될 수 있습니다.

### 기존 코드에 미치는 영향 (Consequences for existing code)

이 변경은 `StopIteration`이 버블업되는 것에 의존하는 기존 코드에 영향을 미칠 것입니다. `groupby`의 순수 Python 구현과 같은 코드들은 `StopIteration`이 전파되어 처리될 것으로 예상하는 곳에서 이제 실패할 수 있습니다.

#### 하위 및 상위 호환성 코드 작성 (Writing backwards and forwards compatible code)

제너레이터 표현식을 종료하기 위해 `StopIteration`을 발생시키는 해킹(hack)을 제외하면, 이전 Python 버전과 새 시맨틱(semantics) 모두에서 동일하게 작동하는 코드를 쉽게 작성할 수 있습니다.

이는 제너레이터 본문 내에서 `StopIteration`이 예상되는 부분(`bare next()` 호출 또는 `StopIteration`을 발생시킬 것으로 예상되는 헬퍼 함수)을 `try/except` 구문으로 감싸 `StopIteration`이 발생할 때 `return`하도록 하는 방식으로 이루어집니다. `try/except` 구문은 제너레이터 함수 내에 직접 나타나야 합니다. `raise StopIteration`이 제너레이터 내에서 직접 발생한다면, 간단히 `return`으로 대체하세요.

#### 변경 예시 (Examples of breakage)

`StopIteration`을 명시적으로 발생시키는 제너레이터는 일반적으로 대신 `return`을 사용하도록 변경할 수 있습니다. 이는 모든 기존 Python 버전과 호환되며 `__future__`의 영향을 받지 않습니다.

**변경 전:**
```python
# Lib/ipaddress.py 예시
if other == self:
    raise StopIteration
```

**변경 후:**
```python
if other == self:
    return
```


더 복잡한 이터레이션 패턴은 명시적인 `try/except` 구문이 필요합니다. 예를 들어, 다음과 같은 가상의 파서(parser)는:

**변경 전:**
```python
def parser(f):
    while True:
        data = next(f)
        while True:
            line = next(f)
            if line == "- end -":
                break
            data += line
        yield data
```

**변경 후:**
```python
def parser(f):
    while True:
        try:
            data = next(f)
            while True:
                line = next(f)
                if line == "- end -":
                    break
                data += line
            yield data
        except StopIteration:
            return
```


`StopIteration`을 발생시켜 제너레이터 표현식을 조기에 종료시키는 (`takewhile` 형태) 방식은 더 이상 지원되지 않습니다.

**변경 전:**
```python
def stop(): raise StopIteration
print(list(x for x in range(10) if x < 5 or stop())) # prints [0, 1, 2, 3, 4]
```

**변경 후:**
```python
def gen():
    for x in range(10):
        if x >= 5:
            return
        yield x
print(list(gen())) # prints [0, 1, 2, 3, 4]
```


### 제너레이터, 이터레이터, `StopIteration` 설명 (Explanation of generators, iterators, and StopIteration)

이 제안은 제너레이터와 이터레이터 간의 관계를 변경하지 않습니다. 제너레이터 객체는 여전히 이터레이터이며, 모든 이터레이터가 제너레이터인 것은 아닙니다. 제너레이터는 `send` 및 `throw`와 같은 이터레이터에는 없는 추가 메서드를 가지고 있습니다. 이러한 모든 사항은 변경되지 않습니다. 제너레이터 사용자를 위한 변경 사항은 없으며, 제너레이터 함수 작성자(조건에서 `StopIteration`이 발생하여 조기 종료에 의존하는 제너레이터 표현식 작성자 포함)만 새로운 것을 배워야 할 수 있습니다.

이터레이터는 `__next__` 메서드를 가진 객체입니다. 다른 많은 특수 메서드와 마찬가지로, 값을 반환하거나 특정 예외(`StopIteration`과 같은)를 발생시켜 더 이상 반환할 값이 없음을 알릴 수 있습니다.

제너레이터 함수는 `yield` 표현식을 포함하는 함수입니다. 매번 (재)시작될 때마다 값을 `yield`하거나 `return`할 수 있습니다. 제너레이터의 헬퍼 함수도 작성할 수 있지만, 제너레이터 프로토콜을 따라야 합니다.

두 경우 모두, 예상치 못한 예외는 버블업됩니다. 제너레이터와 이터레이터의 특성상, 제너레이터 내부의 예상치 못한 `StopIteration`은 `RuntimeError`로 변환되지만, 그 외의 모든 예외는 정상적으로 전파됩니다.

### 전환 계획 (Transition plan)

*   **Python 3.5:** `__future__ import`를 통해 새로운 시맨틱을 활성화합니다. `__future__ import` 없이 제너레이터에서 `StopIteration`이 버블업될 경우 조용한(`silent`) DeprecationWarning을 발생시킵니다.
*   **Python 3.6:** 조용하지 않은(`non-silent`) DeprecationWarning을 발생시킵니다.
*   **Python 3.7:** 모든 곳에서 새로운 시맨틱을 활성화합니다.

### 대안 제안 (Alternate proposals)

이 PEP를 개발하는 동안 몇 가지 대안이 논의되었으나 최종적으로 거부되었습니다.

*   **`RuntimeError` 대신 다른 예외 발생:** `UnexpectedStopIteration`과 같은 새로운 예외 유형을 발생시키는 아이디어가 있었으나, 이는 암묵적으로 해당 예외를 잡도록 권장할 수 있어 거부되었습니다.
*   **`return` 시 특정 예외 제공:** `StopIteration`의 특정 인스턴스를 제공하여 제너레이터가 올바르게 완료되었음을 나타내고, 다른 `StopIteration` 인스턴스는 오류로 처리하는 방안이 있었으나, 더 나은 옵션이 선호되어 철회되었습니다.
*   **`return`으로 인한 `StopIteration`을 명확히 함:** 제너레이터가 `return`할 때 `StopIteration` 대신 `StopIteration`의 특정 서브클래스(`GeneratorReturn`)를 발생시키는 방안이 있었으나, 이 대안은 제너레이터 표현식과 `List Comprehension` 간의 불일치를 해결하지 못했습니다.
*   **`next()` 내부에서 예외 변환:** `next()`가 `StopIteration`을 잡고 대신 `ValueError`를 발생시키도록 하는 방안이 있었으나, 이는 현재 제안보다 훨씬 심각한 하위 호환성 문제를 야기하여 거부되었습니다.
*   **현재 동작을 명시적으로 요청하는 데코레이터:** 현재의 동작이 필요한 상황을 `@allow_implicit_stop`과 같은 데코레이터를 통해 지원하는 방안이 제시되었으나, 구현 복잡성, 지속적인 호환성 문제, 데코레이터 효과의 미묘함, 그리고 "급한 수정"을 조장할 수 있다는 이유로 거부되었습니다.

### 비판 (Criticism)

이 변경이 거의 문제가 되지 않는다는 비공식적인 통계가 제시되었습니다. 기존 동작에 의존하는 코드도 존재하며, 작은 이득을 위해 불필요한 코드 변경을 야기할 수 있다는 우려가 있었습니다.

기존 모델은 예외가 특별한 의미를 가질 때 발생하는 다른 모든 경우에 내재된 완전히 수용 가능한 문제와 비교되었습니다. 예를 들어, `__getitem__` 메서드 내에서 예상치 못한 `KeyError`는 실패로 해석됩니다. 그러나 제너레이터의 경우 `yield`는 데이터를 나타내고 `return`은 비정상 상태를 나타내므로 `StopIteration`을 명시적으로 발생시키는 것은 완전히 불필요하며 잠재적으로 혼란을 야기할 수 있다는 차이점이 있습니다.

#### 모든 `__next__()` 메서드를 수정하지 않는 이유 (Why not fix all __next__() methods?)

일반적인 `__next__()` 메서드를 구현할 때, 이터레이션의 끝을 나타내는 유일한 방법은 `StopIteration`을 발생시키는 것입니다. 따라서 여기에서 `StopIteration`을 잡고 `RuntimeError`로 변환하는 것은 목적에 부합하지 않습니다. 이는 제너레이터 함수의 특별한 상태를 상기시켜줍니다. 제너레이터 함수에서는 `return`만으로 이터레이션을 종료할 수 있으므로 `StopIteration`을 발생시키는 것이 불필요합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.