---
title: "[Rejected] PEP 310 - Reliable Acquisition/Release Pairs"
excerpt: "Python Enhancement Proposal 310: 'Reliable Acquisition/Release Pairs'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/310/
toc: true
toc_sticky: true
date: 2025-09-26 18:11:37+0900
last_modified_at: 2025-09-26 18:11:37+0900
published: true
---
> **원문 링크:** [PEP 310 - Reliable Acquisition/Release Pairs](https://peps.python.org/pep-0310/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Dec-2002

## PEP 310 – 신뢰할 수 있는 자원 획득/해제 쌍

**작성자:** Michael Hudson, Paul Moore
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2002년 12월 18일
**Python 버전:** 2.4

---

### 개요 (Abstract)

다음과 같이 작성하는 데 있어 타이핑 부담을 줄이는 방법이 있으면 좋을 것입니다:

```python
the_lock.acquire()
try:
    ....
finally:
    the_lock.release()
```

이 PEP는 위 코드를 일반화하는 구문(`with` 블록)과 "작은 'i'" 인터페이스를 제안합니다.

### 발표 (Pronouncement)

이 PEP는 [PEP 343](https://peps.python.org/pep-0343/)에 찬성하여 거부되었습니다.

### 제안 배경 (Rationale)

Python의 예외 처리 철학의 장점 중 하나는 "잘못된" 행동(예: 일부 시스템 호출의 반환 값을 확인하지 않는 것)을 하기 어렵게 만든다는 점입니다. 현재 이러한 이점은 자원 정리(resource cleanup)에는 적용되지 않습니다. 자원(예: 락(lock))을 획득하고 해제하는 현재 구문은 다음과 같습니다:

```python
the_lock.acquire()
try:
    ....
finally:
    the_lock.release()
```

이 구문은 획득(acquisition)과 해제(release) 사이에 (상당히 커질 수 있는) 코드 블록을 배치하여, 코드가 자원을 올바르게 관리하는지 "한눈에" 확인하기 어렵게 만듭니다. 또 다른 흔한 오류는 `acquire` 호출을 `try` 블록 내에 코딩하는 것인데, 이는 `acquire`가 실패할 경우 락을 잘못 해제하게 만듭니다.

### 기본 구문 및 의미 (Basic Syntax and Semantics)

`with` 문의 구문은 다음과 같습니다:

`'with' [ var '=' ] expr ':' suite`

이 문은 다음 일련의 문장과 동일하게 정의됩니다:

```python
var = expr
if hasattr(var, "__enter__"):
    var.__enter__()
try:
    suite
finally:
    var.__exit__()
```

(`__exit__` 메서드의 존재는 `__enter__`와 달리 확인되지 않아 `with` 문에서 부적절한 객체를 사용하는 경우 오류가 발생하도록 합니다.)

변수가 생략되면 이름 없는 객체가 스택에 할당됩니다. 이 경우 `suite`는 이름 없는 객체에 접근할 수 없습니다.

### 가능한 확장 (Possible Extensions)

기본 구문에 대한 여러 잠재적 확장이 Python 개발자 목록에서 논의되었습니다. 이 PEP에서 제안하는 해결책에는 이러한 확장 중 어떤 것도 포함되지 않습니다. 많은 경우, 양쪽 방향의 주장이 거의 비슷하게 강력합니다. 이러한 경우, PEP는 항상 단순성을 선택했는데, 이는 추가적인 기능이 필요할 때 기존 `try` 블록을 사용할 수 있기 때문입니다.

#### 다중 표현식 (Multiple expressions)

하나의 `with` 문 안에 여러 표현식을 허용하는 제안이 있었습니다. `__enter__` 메서드는 왼쪽에서 오른쪽으로 호출되고, `__exit__` 메서드는 오른쪽에서 왼쪽으로 호출될 것입니다. 이렇게 하는 이점은 하나 이상의 자원이 관리되는 경우 중첩된 `with` 문으로 인해 코드가 오른쪽 여백으로 치우칠 수 있다는 것입니다. 이 문제에 대한 해결책은 다른 깊은 중첩의 경우와 동일하게 일부 코드를 별도의 함수로 분리하는 것입니다. 또한, `__exit__` 메서드 중 하나가 예외를 발생시키는 경우(다른 `__exit__` 메서드도 호출되어야 하는가?) 발생하는 문제도 다루어야 합니다.

#### 예외 처리 (Exception handling)

예외가 발생할 때 호출되고 예외를 처리하거나 다시 발생시킬 수 있는 선택적 `__except__` 핸들러를 포함하도록 프로토콜을 확장하는 것이 제안되었습니다. 이 확장의 의미론을 정확하고 이해하기 쉽게 만들 수 있을지는 전혀 명확하지 않습니다. 예를 들어, 예외 핸들러가 정의된 경우 `try ... except ... else`와 동일한 코드가 되어야 하고, 그렇지 않은 경우 `try ... finally`가 되어야 할까요? 일반적으로 컴파일 시점에 이를 어떻게 결정할 수 있을까요? 대안은 코드를 `try ... finally` 내부에 `try ... except`로 확장되는 것으로 정의하는 것입니다. 그러나 이것이 실제 상황에서 올바르게 작동하지 않을 수도 있습니다.

예외 처리에 대해 확인된 유일한 사용 사례는 트랜잭션 처리(정상적인 완료 시 commit, 예외 발생 시 rollback)입니다. 이는 기존의 `try ... except ... else` 블록으로 처리하는 것이 아마도 더 쉬울 것이므로, 이 PEP는 예외 핸들러에 대한 지원을 포함하지 않습니다.

### 구현 시 고려 사항 (Implementation Notes)

`with` 문과 동일하게 지정된 코드에는 잠재적인 경쟁 조건(race condition)이 있습니다. 예를 들어, `__enter__` 메서드 호출 완료와 `try` 블록 시작 사이에 `KeyboardInterrupt` 예외가 발생하면 `__exit__` 메서드는 호출되지 않을 것입니다. 이는 자원 누수(resource leaks) 또는 교착 상태(deadlocks)로 이어질 수 있습니다. (XXX Guido는 이러한 종류의 경쟁 조건에 대해 중요하게 생각하며, 이를 처리하기 위해 일부 C 언어 마법을 작성할 예정이라고 언급했습니다. `with` 문의 구현은 이를 따라야 합니다.)

### 미해결 문제 (Open Issues)

*   기존 클래스(예: 파일과 유사한 객체 및 락)가 적절한 `__enter__` 및 `__exit__` 메서드를 가져야 할까요? 찬성하는 명백한 이유는 편의성(어댑터 불필요)입니다. 반대하는 주장은 내장 파일이 이를 가지지만 (예를 들어) `StringIO`는 가지지 않는다면, 파일 객체에 "with"를 사용하는 코드를 `StringIO` 객체와 재사용할 수 없다는 것입니다. 따라서 `__exit__ = close`는 사용자 정의 클래스가 지원해야 할 수도 있는 "파일과 유사한 객체" 프로토콜의 일부가 됩니다.

*   `__enter__` 훅(hook)은 불필요할 수 있습니다. 많은 사용 사례에서 어댑터 클래스가 필요하며, 이 경우 `__enter__` 훅이 수행하는 작업은 `__init__` 훅에서 쉽게 수행될 수 있습니다.

*   객체 수명 주기(lifetimes)를 명시적으로 제어하는 방법이 있다면, `__exit__` 훅의 기능은 기존 `__del__` 훅으로 대체될 수 있었을 것입니다. 이 접근 방식의 지지자와의 이메일 교환에서 저자 중 한 명은 이것이 올바른 아이디어가 아니라는 확신을 더욱 굳혔습니다.

*   `__exit__` 메서드를 "close"라고 부르거나, `__exit__` 메서드가 발견되지 않으면 "close" 메서드를 고려해야 한다고 제안되었습니다. 이는 "with ..." 구문의 "즉시 사용 가능한 유용성"을 높이기 위함입니다.

*   `with ...` 블록과 제너레이터(Generator) 사이에는 개념적으로 유사점이 있으며, 이로 인해 `for` 루프가 `with` 블록 기능을 구현할 수 있다는 제안이 있었습니다. 일부 수준에서는 깔끔하지만, 우리는 `for` 루프는 루프 본연의 기능에 충실해야 한다고 생각합니다.

### 대안적 아이디어 (Alternative Ideas)

*   **IEXEC:** Holger Krekel – XML과 유사한 구문을 가진 일반화된 접근 방식 (URL을 찾을 수 없음). Holger는 모니터링되는 블록의 제어 흐름 세부 정보를 알려주는 "실행 모니터"에 대한 훨씬 더 광범위한 아이디어를 가지고 있습니다. 흥미롭지만, 이러한 아이디어는 언어를 깊고 미묘하게 변경할 수 있으며, 따라서 다른 PEP에 속합니다.

*   모든 Smalltalk/Ruby 익명 블록 스타일 확장은 분명히 이 PEP의 내용을 포함합니다.

*   [PEP 319](https://peps.python.org/pep-0319/)는 같은 영역에 있지만, python-dev에서 논의되었을 때 지지를 얻지 못했습니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 새로운 키워드를 제안하므로 `__future__` 게임이 필요할 것입니다.

### 채택 비용 (Cost of Adoption)

*   언어가 점점 커지고 복잡해진다고 주장하는 사람들은 또 다른 불평할 거리를 갖게 될 것입니다.
*   가르쳐야 할 또 다른 내용이 생깁니다.
*   이 제안이 유용하려면, 표준 라이브러리 및 다른 코드의 많은 파일과 유사한 클래스 및 락과 유사한 클래스에 `__exit__ = close` 또는 유사한 내용이 추가되어야 할 것입니다.

### 미채택 비용 (Cost of Non-Adoption)

올바른 코드를 작성하는 것이 잘못된 코드를 작성하는 것보다 계속해서 더 많은 노력을 필요로 할 것입니다.

### 참고 자료 (References)

이곳에 언급할 수 있는 다양한 python-list 및 python-dev 토론이 있습니다.

*   Michael Hudson과 Bill Soudan 간의 오프리스트 대화 (허가를 받고 공개됨)
    [http://starship.python.net/crew/mwh/pep310/](http://starship.python.net/crew/mwh/pep310/)
*   Samuele Pedroni의 python-dev 게시물
    [https://mail.python.org/pipermail/python-dev/2003-August/037795.html](https://mail.python.org/pipermail/python-dev/2003-August/037795.html)
*   `[Python-Dev] pre-PEP: Resource-Release Support for Generators` 제목의 python-dev 스레드 (2003년 8월 시작)
    [https://mail.python.org/pipermail/python-dev/2003-August/037803.html](https://mail.python.org/pipermail/python-dev/2003-August/037803.html)

### 저작권 (Copyright)

이 문서는 공용 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.