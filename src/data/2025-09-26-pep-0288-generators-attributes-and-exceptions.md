---
title: "[Withdrawn] PEP 288 - Generators Attributes and Exceptions"
excerpt: "Python Enhancement Proposal 288: 'Generators Attributes and Exceptions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/288/
toc: true
toc_sticky: true
date: 2025-09-26 17:59:36+0900
last_modified_at: 2025-09-26 17:59:36+0900
published: true
---
> **원문 링크:** [PEP 288 - Generators Attributes and Exceptions](https://peps.python.org/pep-0288/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 21-Mar-2002

# PEP 288 – 제너레이터 속성 및 예외 (Generators Attributes and Exceptions)

*   **작성자:** Raymond Hettinger <python at rcn.com>
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** Standards Track
*   **생성일:** 2002년 3월 21일
*   **Python 버전:** 2.5
*   **이력:** (Post-History는 생략하고 내용에 포함)

---

## 요약 (Abstract)

이 PEP는 실행 중인 제너레이터(Generator)와 예외를 발생시키고 데이터를 공유하기 위한 메커니즘을 제공하여 제너레이터를 강화할 것을 제안합니다.

## 상태 (Status)

이 PEP는 **철회되었습니다 (Withdrawn)** . 예외 발생 메커니즘은 PEP 343으로 확장 및 통합되었습니다. 속성 전달 기능은 지지자를 얻지 못했고, 명확한 구현 방안이 없었으며, 실행 중인 제너레이터가 자신의 네임스페이스에 접근할 수 있는 깔끔한 방법이 없었습니다.

## 도입 배경 (Rationale)

현재는 클래스 기반의 이터레이터(Iterator)만이 속성(attribute)과 예외 처리 기능을 제공할 수 있습니다. 그러나 클래스 기반 이터레이터는 작성하기 더 어렵고, 덜 간결하며, 가독성이 떨어지고, 속도가 느립니다. 이러한 기능을 제너레이터에 사용할 수 있도록 하는 것이 더 나은 해결책입니다.

속성 할당을 활성화하면 실행 중인 제너레이터로 데이터를 전달하거나 제너레이터에서 데이터를 전달받을 수 있습니다. 속성을 사용하여 데이터를 공유하는 방식은 Python에 널리 퍼져 있습니다. 다른 접근 방식들도 존재하지만, 상대적으로 해킹(hackish)에 가깝습니다.

또 다른 발전 단계는 제너레이터로 예외를 전달할 수 있도록 하는 제너레이터 메서드를 추가하는 것입니다. 현재로서는 제너레이터 외부에서 예외를 발생시킬 깔끔한 방법이 없습니다. 또한, 제너레이터 예외 전달은 제너레이터의 `try/finally` 금지(PEP 255)를 완화하는 데 도움이 됩니다. 이는 종료 시 버퍼를 비우거나 리소스를 닫아야 하는 제너레이터에게 특히 중요합니다.

이 두 가지 제안은 이전 버전과 호환되며 새로운 키워드를 필요로 하지 않습니다. Python 2.5 버전에 권장되었습니다.

## 제너레이터 속성 사양 (Specification for Generator Attributes)

기본적으로 이 제안은 클래스에 대한 속성 작성을 에뮬레이션(emulate)하는 것입니다. 유일한 문제점은 제너레이터가 자기 자신의 인스턴스(instance)를 참조할 방법이 없다는 것입니다. 따라서, 이 제안은 참조를 발견하기 위한 함수를 제공하는 것입니다. 예를 들어:

```python
def mygen(filename):
    self = sys.get_generator() # 제안된 기능
    myfile = open(filename)
    for line in myfile:
        if len(line) < 10:
            continue
        self.pos = myfile.tell() # 제너레이터 인스턴스에 속성 할당
        yield line.upper()

g = mygen('sample.txt')
line1 = g.next()
print 'Position', g.pos # 제너레이터 인스턴스의 속성 접근
```

제너레이터 속성의 용도는 다음과 같습니다:

*   제너레이터 클라이언트에 추가 정보 제공 (위 예시와 같이).
*   제너레이터 작동을 제어하는 제어 플래그를 외부에서 설정 (예: 데이터 그룹에서 언제 스텝 인(step in)하거나 스텝 오버(step over)할지 제너레이터에 알려주기).
*   복잡한 실행 상태를 가진 지연 소비자(lazy consumers) 작성 (예: 산술 인코더 출력 스트림).
*   코루틴(co-routines) 작성 (Dr. Mertz의 기사에서 시연된 바와 같이).

`yield` 및 `next`의 제어 흐름은 이 제안으로 인해 변경되지 않습니다. 유일한 변경 사항은 데이터를 제너레이터로 전달하거나 제너레이터에서 전달받을 수 있다는 것입니다. 대부분의 기본 메커니즘은 이미 존재하며, 접근 함수만 추가하면 됩니다.

## 제너레이터 예외 전달 사양 (Specification for Generator Exception Passing)

제너레이터 인터페이스에 `.throw(exception)` 메서드를 추가합니다:

```python
import time

class WriteLog(Exception):
    pass

def writelog(log_data):
    print("Writing log:", log_data) # 실제 로그 작성 로직

def logger():
    start = time.time()
    log = []
    try:
        while True:
            log.append(time.time() - start)
            yield log[-1]
    except WriteLog: # 제너레이터 내부에서 예외 처리
        writelog(log)

# 예시 사용
g = logger()
for i in [10,20,40,80,160]:
    # testsuite(i) # 실제 테스트 스위트 함수가 있다고 가정
    next(g) # Python 3에서는 g.next() 대신 next(g) 사용

try:
    g.throw(WriteLog) # 제너레이터로 예외 전달
except StopIteration:
    print("Generator stopped after handling WriteLog")
```

제너레이터 내부에 예외를 발생시키기 위한 기존의 해결 방법은 없습니다. 이는 활성 코드가 예외를 받거나 통과할 수 없는 Python의 유일한 경우입니다.

제너레이터 예외 전달은 제너레이터의 고유한 한계, 즉 정리(clean-up) 코드를 트리거하기 위해 `try/finally`를 사용할 수 없는 금지 사항(PEP 255)을 해결하는 데도 도움이 됩니다.

*   **참고 A:** `throw` 메서드의 이름은 여러 가지 이유로 선택되었습니다. `raise`는 키워드이므로 메서드 이름으로 사용할 수 없습니다. 현재 실행 지점에서 즉시 예외를 발생시키는 `raise`와 달리, `throw`는 먼저 제너레이터로 돌아간 다음 예외를 발생시킵니다. `throw`라는 단어는 예외를 다른 위치에 두는 것을 암시합니다. `throw`라는 단어는 다른 언어에서도 이미 예외와 관련되어 있습니다.
    대체 메서드 이름으로 `resolve()`, `signal()`, `genraise()`, `raiseinto()`, `flush()` 등이 고려되었습니다. 이들 중 어느 것도 `throw()`만큼 적합하지 않았습니다.

*   **참고 B:** `throw()` 구문을 단순하게 유지하기 위해 `raise` 구문의 인스턴스 버전만 지원됩니다 ( "`raise string`" 또는 "`raise class, instance`"와 같은 변형은 없음).
    `g.throw(instance)`를 호출하는 것은 가장 최근의 `yield` 바로 뒤에 `raise instance`를 작성하는 것과 같습니다.

## 참고 자료 (References)

*   Dr. David Mertz의 "Charming Python" 초고 칼럼:
    *   [http://gnosis.cx/publish/programming/charming_python_b5.txt](http://gnosis.cx/publish/programming/charming_python_b5.txt)
    *   [http://gnosis.cx/publish/programming/charming_python_b7.txt](http://gnosis.cx/publish/programming/charming_python_b7.txt)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.