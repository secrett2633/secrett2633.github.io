---
title: "[Rejected] PEP 325 - Resource-Release Support for Generators"
excerpt: "Python Enhancement Proposal 325: 'Resource-Release Support for Generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/325/
toc: true
toc_sticky: true
date: 2025-09-26 18:31:57+0900
last_modified_at: 2025-09-26 18:31:57+0900
published: true
---
> **원문 링크:** [PEP 325 - Resource-Release Support for Generators](https://peps.python.org/pep-0325/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 25-Aug-2003

PEP 325 – 제너레이터를 위한 리소스 해제 지원

*   **작성자** : Samuele Pedroni
*   **상태** : 반려됨 (Rejected)
*   **유형** : 표준 트랙 (Standards Track)
*   **생성일** : 2003년 8월 25일
*   **Python 버전** : 2.4

---

## 초록 (Abstract)

제너레이터(Generators)는 데이터 순회(traversal)를 자연스럽게 코딩하고 추상화할 수 있도록 합니다. 그러나 적절하고 시기적절한 해제가 필요한 외부 리소스가 관련된 경우, 현재 제너레이터는 아쉽게도 적합하지 않습니다. 리소스의 적절한 해제를 위한 일반적인 관용구(idiom)가 지원되지 않습니다. 즉, 제너레이터 내의 `try-finally` 문의 `try` 절 안에서는 `yield` 문이 허용되지 않습니다. `finally` 절의 실행을 보장하거나 강제할 수 없기 때문입니다.

이 PEP는 내장(built-in) 제너레이터 타입이 `close` 메서드와 소멸(destruction) 의미론을 구현하여, `yield` 배치(placement)에 대한 제약을 해제하고 제너레이터의 적용 가능성을 확장할 것을 제안합니다.

## 선언 (Pronouncement)

이 PEP는 보다 정제된 형태로 요청된 동작의 거의 모든 부분을 포함하는 PEP 342에 찬성하여 반려되었습니다.

## 배경 (Rationale)

Python 제너레이터는 많은 데이터 순회 시나리오를 자연스럽게 코딩할 수 있도록 해줍니다. 제너레이터를 인스턴스화(instantiate)하면 이터레이터(iterators)가 생성됩니다. 이 이터레이터는 순회를 추상화하는 일급 객체(first-class objects)이며, 일급 객체의 모든 장점을 가집니다. 이러한 점에서 제너레이터는 (Smalltalk 방식의) 블록을 사용하는 이터레이터 메서드(iterator methods) 접근 방식과 유사한 기능을 제공하며 일부 장점도 있습니다.

그러나 현재의 제약 사항(제너레이터 내의 `try-finally` 문의 `try` 절 안에 `yield`가 허용되지 않음) 때문에 후자의 접근 방식(이터레이터 메서드를 사용하는 클래스)이 순회뿐만 아니라 예외 처리 및 적절한 리소스 획득 및 해제를 캡슐화(encapsulate)하는 데 더 적합해 보입니다.

예시를 통해 살펴보겠습니다 (간단히 파일 읽기 모드를 사용합니다):

```python
def all_lines(index_path):
    for path in file(index_path, "r"):
        for line in file(path.strip(), "r"):
            yield line
```

이 코드는 짧고 직관적이지만, 파일의 적시(timely) 닫기를 위한 `try-finally`를 추가할 수 없습니다. (경로 대신 파일을 인수로 전달할 수 있지만, `index` 내용에 따라 열리는 파일에는 동일하게 적용할 수 없습니다.)

적절한 시기에 리소스를 해제하려면, 제너레이터 전용 접근 방식의 단순함과 직관성을 희생해야 합니다:

```python
class AllLines:
    def __init__(self, index_path):
        self.index_path = index_path
        self.index = None
        self.document = None

    def __iter__(self):
        self.index = file(self.index_path, "r")
        for path in self.index:
            self.document = file(path.strip(), "r")
            for line in self.document:
                yield line
            self.document.close()
            self.document = None
        # self.index.close() # PEP에 명시되지 않았지만, __iter__ 종료 시 index 파일도 닫아야 함
        # self.index = None

    def close(self):
        if self.index:
            self.index.close()
            self.index = None # 추가: self.index를 None으로 설정하여 다시 닫히는 것을 방지
        if self.document:
            self.document.close()
            self.document = None # 추가: self.document를 None으로 설정하여 다시 닫히는 것을 방지
```

이 클래스는 다음과 같이 사용됩니다:

```python
all_lines = AllLines("index.txt")
try:
    for line in all_lines:
        # ... 작업 수행 ...
        pass
finally:
    all_lines.close()
```

적절한 해제를 구현하는 더 복잡한 해결책은 중요한 힌트를 제공합니다. 우리가 한 일은 `close` 메서드를 가진 객체(이터레이터) 안에 순회 로직을 캡슐화한 것입니다.

이 PEP는 제너레이터가 `close` 메서드를 갖도록 하여, 위 예제를 다음과 같이 다시 작성할 수 있도록 제안합니다:

```python
# 현재는 유효한 Python 코드가 아닙니다: yield는 try와 finally 사이에 허용되지 않으며,
# 제너레이터 타입 인스턴스는 close 메서드를 지원하지 않습니다.
def all_lines(index_path):
    index = file(index_path, "r")
    try:
        for path in index:
            document = file(path.strip(), "r")
            try:
                for line in document:
                    yield line
            finally:
                document.close()
    finally:
        index.close()

all = all_lines("index.txt")
try:
    for line in all:
        # ... 작업 수행 ...
        pass
finally:
    all.close() # 제너레이터에 대한 close 호출
```

현재 PEP 255는 `try-finally` 문의 `try` 절 내에서 `yield`를 허용하지 않습니다. 이는 `try-finally` 의미론에 따라 `finally` 절의 실행을 보장할 수 없기 때문입니다.

제안된 `close` 메서드의 의미론은 `finally` 절의 실행이 여전히 보장되지는 않더라도, 필요할 때 강제될 수 있도록 해야 합니다. 구체적으로, `close` 메서드의 동작은 제너레이터 프레임(frame) 내에서 `return`을 강제하거나 예외를 발생시킴으로써 제너레이터 내부의 `finally` 절 실행을 트리거해야 합니다. 적시 리소스 해제가 필요한 상황에서는 `close`가 명시적으로 호출될 수 있습니다.

반면에 제너레이터 소멸의 의미론은 일반적인 경우에 최선의 노력(best-effort) 정책을 구현하도록 확장되어야 합니다. 특히, 소멸 시 `close()`를 호출해야 합니다. 최선의 노력이라는 제약은 소멸자(destructor)의 실행이 처음부터 보장되지 않는다는 사실에서 비롯됩니다.

이는 합리적인 타협점으로 보이며, 그 결과로 얻어지는 전반적인 동작은 파일과 파일 닫기(closing)와 유사합니다.

## 가능한 의미론 (Possible Semantics)

내장 제너레이터 타입은 `close` 메서드를 구현해야 하며, 다음과 같이 호출될 수 있습니다:

```python
gen.close()
```

여기서 `gen`은 내장 제너레이터 타입의 인스턴스입니다. 제너레이터 소멸(destruction) 시에도 `close` 메서드의 동작을 호출해야 합니다.

만약 제너레이터가 이미 종료되었다면, `close`는 아무것도 하지 않는(no-op) 동작이어야 합니다.

그렇지 않은 경우, "Return Semantics" 또는 "Exception Semantics" 두 가지 대안적인 해결책이 있습니다.

### A - 반환 의미론 (Return Semantics)

제너레이터는 재개(resume)되어야 하며, 제너레이터 실행은 재진입 지점(re-entry point)에서의 명령어가 `return`인 것처럼 계속되어야 합니다. 결과적으로, 그때 허용되는 `try-yield-finally` 패턴의 경우, 재진입 지점을 둘러싼 `finally` 절이 실행될 것입니다.

**문제점:** `close`에 의한 강제 종료, 정상 종료, 제너레이터 또는 제너레이터가 호출한 코드에서 발생한 예외 전파를 구별할 수 있는 것이 중요할까요? 정상적인 경우 중요하지 않아 보이며, `finally` 절은 이러한 모든 경우에 동일하게 작동해야 합니다. 하지만 이 의미론은 그러한 구별을 어렵게 만들 수 있습니다.

일반적인 `return`과 마찬가지로 `except` 절은 실행되지 않습니다. 레거시(legacy) 제너레이터의 이러한 절은 제너레이터 또는 제너레이터가 호출한 코드에서 발생한 예외에 대해 실행되기를 기대합니다. `close`의 경우 이들을 실행하지 않는 것이 올바르게 보입니다.

### B - 예외 의미론 (Exception Semantics)

제너레이터는 재개되어야 하며, 실행은 특수 목적의 예외(예: `CloseGenerator`)가 재진입 지점에서 발생한 것처럼 계속되어야 합니다. `close` 구현은 이 예외를 소비(consume)하고 더 이상 전파하지 않아야 합니다.

**문제점:** `StopIteration`을 이 목적으로 재사용해야 할까요? 아마도 아닐 것입니다. 우리는 `close`가 다른 제너레이터/이터레이터를 처리하기 위해 `StopIteration`을 잡는 코드를 포함할 수 있는 레거시 제너레이터에 무해한 작업이 되기를 원합니다.

일반적으로 예외 의미론에서는 제너레이터가 종료되지 않거나 특수 예외가 다시 전파되지 않는 경우 무엇을 해야 할지 불분명합니다. 다른 예외는 아마도 전파되어야 하지만, 다음 레거시 제너레이터 코드를 고려해 보세요:

```python
try:
    # ...
    yield
    # ...
except: # 또는 except Exception:, 등
    raise Exception("boom")
```

만약 `yield` 후에 제너레이터가 일시 중단된 상태에서 `close`가 호출되면, `except` 절이 우리의 특수 목적 예외를 잡을 것이므로, 다른 예외가 다시 전파될 것입니다. 이 경우 합리적으로 소비되고 무시되어야 하지만, 일반적으로는 전파되어야 합니다. 그러나 이러한 시나리오를 분리하는 것은 어려워 보입니다.

예외 접근 방식은 제너레이터가 종료 사례를 구별하고 더 많은 제어권을 가질 수 있도록 한다는 장점이 있습니다. 반면에 명확한 의미론을 정의하는 것은 더 어려워 보입니다.

## 비고 (Remarks)

만약 이 제안이 받아들여진다면, 제너레이터가 리소스를 획득하는지 여부를 문서화하여 `close` 메서드를 호출해야 하는지 여부를 명시하는 것이 일반적인 관행이 되어야 합니다. 제너레이터가 더 이상 사용되지 않는 경우, `close`를 호출하는 것은 무해해야 합니다.

일반적인 시나리오에서는 제너레이터를 인스턴스화한 코드가 필요에 따라 `close`를 호출해야 합니다. 다른 곳에서 인스턴스화된 이터레이터/제너레이터를 다루는 일반적인 코드는 일반적으로 `close` 호출로 가득 차서는 안 됩니다.

이터레이터, 제너레이터, 그리고 적시 해제가 필요한 리소스를 획득하는 제너레이터 등 모든 것을 적절히 처리해야 하는 소유권을 획득한 드문 코드의 경우는 다음과 같이 쉽게 해결할 수 있습니다:

```python
if hasattr(iterator, 'close'):
    iterator.close()
```

## 미해결 문제 (Open Issues)

*   확정적인 의미론이 선택되어야 합니다. 현재 Guido (반 로섬)는 예외 의미론(Exception Semantics)을 선호합니다. 만약 제너레이터가 종료되거나 특수 예외를 다시 전파하는 대신 값을 `yield`한다면, 제너레이터 측에서 특수 예외가 다시 발생해야 합니다.
*   (가능한 의미론에서 논의된 바와 같이) 잘못 변환된 특수 예외가 문제인지, 그리고 이에 대해 무엇을 해야 할지는 여전히 불분명합니다.
*   구현 문제는 탐색되어야 합니다.

## 대안적 아이디어 (Alternative Ideas)

`yield` 배치 제한이 제거되어야 하고 제너레이터 소멸 시 `finally` 절 실행을 트리거해야 한다는 아이디어는 여러 번 제안되었습니다. 이것만으로는 제너레이터가 획득한 리소스의 적시 해제를 강제할 수 없습니다.

PEP 288은 제너레이터에 사용자 정의 예외 전달을 허용하는 더 일반적인 해결책을 제안합니다. 이 PEP의 제안은 리소스 해제 문제를 더 직접적으로 다룹니다. 만약 PEP 288이 구현된다면, `close`에 대한 예외 의미론을 그 위에 계층화(layer)할 수 있을 것입니다. 반면에 PEP 288은 더 일반적인 기능에 대해 별도의 사례를 만들어야 합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.