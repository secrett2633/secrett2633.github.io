---
title: "[Rejected] PEP 377 - Allow __enter__() methods to skip the statement body"
excerpt: "Python Enhancement Proposal 377: 'Allow __enter__() methods to skip the statement body'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/377/
toc: true
toc_sticky: true
date: 2025-09-26 21:00:13+0900
last_modified_at: 2025-09-26 21:00:13+0900
published: true
---
> **원문 링크:** [PEP 377 - Allow __enter__() methods to skip the statement body](https://peps.python.org/pep-0377/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 08-Mar-2009

## PEP 377 – `__enter__()` 메서드가 `with` 문 본문 건너뛰기 허용

**저자:** Alyssa Coghlan
**상태:** Rejected (반려됨)
**유형:** Standards Track
**생성일:** 2009년 3월 8일
**Python 버전:** 2.7, 3.1
**Post-History:** 2009년 3월 8일

---

### 요약

이 PEP는 `__enter__()` 메서드가 관련 `with` 문(statement)의 본문(body) 실행을 건너뛸 수 있도록 하는 하위 호환 가능한(backwards compatible) 메커니즘을 제안합니다. 현재 이러한 기능이 없기 때문에 `contextlib.contextmanager` 데코레이터는 임의의 코드를 적절한 위치에 `yield`가 있는 제너레이터(generator) 함수로 이동시켜 컨텍스트 관리자(context manager)로 변환할 수 있다는 사양을 충족할 수 없습니다. 이 문제의 한 증상은 `contextlib.nested`가 해당 중첩된 `with` 문을 직접 작성했을 때는 발생하지 않을 `RuntimeError`를 발생시킨다는 것입니다.

제안된 변경 사항은 새로운 흐름 제어 예외인 `SkipStatement`를 도입하고, `__enter__()`가 이 예외를 발생시키면 `with` 문의 본문 실행을 건너뛰는 것입니다.

### PEP 반려

이 PEP는 표현력(expressiveness)과 정확성(correctness)의 비례적인 증가 없이 복잡성을 너무 크게 증가시킨다는 이유로 Guido에 의해 반려되었습니다. 이 PEP가 제안하는 더 복잡한 의미론(semantics)을 필요로 하는 설득력 있는 사용 사례가 없으므로, 기존 동작은 허용 가능한 것으로 간주됩니다.

### 제안된 변경 사항

`with` 문의 의미론은 `__enter__()` 호출 주변에 새로운 `try / except / else` 블록을 포함하도록 변경될 예정이었습니다. `__enter__()` 메서드가 `SkipStatement`를 발생시키면, `with` 문의 주요 부분(이제 `else` 절에 위치)은 실행되지 않습니다. 이 경우 `as` 절에 있는 이름들이 바인딩되지 않은 채로 남겨지는 것을 방지하기 위해, 기존의 `NotImplemented` 싱글톤과 유사한 새로운 `StatementSkipped` 싱글톤이 `as` 절에 나타나는 모든 이름에 할당될 것입니다.

`with` 문의 구성 요소는 PEP 343에 설명된 대로 유지됩니다:

```python
with EXPR as VAR:
    BLOCK
```

변경 후 `with` 문의 의미론은 다음과 같습니다:

```python
mgr = (EXPR)
exit = mgr.__exit__ # 아직 호출하지 않음
try:
    value = mgr.__enter__()
except SkipStatement:
    VAR = StatementSkipped # "as VAR"이 있고 VAR이 단일 이름인 경우에만
                           # VAR이 이름들의 튜플인 경우, StatementSkipped는 튜플의 각 이름에 할당됩니다.
else:
    exc = True
    try:
        try:
            VAR = value # "as VAR"이 있는 경우에만
            BLOCK
        except:
            # 예외적인 경우는 여기서 처리됩니다.
            exc = False
            if not exit(*sys.exc_info()):
                raise # exit()가 True를 반환하면 예외가 무시됩니다.
        finally:
            # 정상 및 비지역-goto(non-local-goto) 경우는 여기서 처리됩니다.
            if exc:
                exit(None, None, None)
```

위의 `with` 문 의미론 변경이 적용되면, `contextlib.contextmanager()`는 기본 제너레이터가 `yield`하지 않을 때 `RuntimeError` 대신 `SkipStatement`를 발생시키도록 수정될 것입니다.

### 변경 제안 배경

현재 일부 겉보기에 무해한 컨텍스트 관리자는 실행 시 `RuntimeError`를 발생시킬 수 있습니다. 이는 컨텍스트 관리자의 `__enter__()` 메서드가 `with` 문의 본문에 해당하는 코드가 건너뛰어야 할 상황을 만났을 때 발생합니다. `__enter__()` 메서드는 이를 인터프리터에 알릴 수 있는 메커니즘이 없으므로, `with` 문 본문을 건너뛸 뿐만 아니라 가장 가까운 예외 핸들러까지 모든 코드를 건너뛰는 예외를 발생시킬 수밖에 없습니다. 이는 `with` 문의 설계 목표 중 하나인, 임의의 공통 예외 처리 코드를 제너레이터 함수에 넣고 코드의 가변 부분을 `yield` 문으로 대체함으로써 단일 컨텍스트 관리자로 분리할 수 있도록 하는 것과 상충됩니다.

구체적으로, `cmB().__enter__()`가 `cmA().__exit__()`가 처리하고 억제하는 예외를 발생시키는 경우 다음 예제들은 다르게 동작합니다:

```python
with cmA():
    with cmB():
        do_stuff() # "do_stuff()"를 실행하지 않고 여기서 재개됩니다.

@contextlib.contextmanager
def combined():
    with cmA():
        with cmB():
            yield

with combined():
    do_stuff() # 컨텍스트 관리자의 기본 제너레이터가 yield하지 않았다고 불평하는
               # RuntimeError를 발생시킬 것입니다.

with contextlib.nested(cmA(), cmB()):
    do_stuff() # contextmanager() 예제와 동일한 RuntimeError를 발생시킬 것입니다
               # (nested() 구현이 contextmanager()를 사용한다는 점을 고려하면 놀랍지 않습니다).

# 다음 클래스 기반 버전은 이 문제가 contextlib.contextmanager()에만 국한된 것이 아님을 보여줍니다
# (또한 컨텍스트 관리자를 클래스 대신 제너레이터로 작성하는 것이 얼마나 간단한지도 보여줍니다!)
class CM(object):
    def __init__(self):
        self.cmA = None
        self.cmB = None
    def __enter__(self):
        if self.cmA is not None:
            raise RuntimeError("Can't re-use this CM")
        self.cmA = cmA()
        self.cmA.__enter__()
        try:
            self.cmB = cmB()
            self.cmB.__enter__()
        except:
            self.cmA.__exit__(*sys.exc_info()) # __enter__()에서는 억제할 수 없으므로, 다시 발생시켜야 합니다.
            raise
    def __exit__(self, *args):
        suppress = False
        try:
            if self.cmB is not None:
                suppress = self.cmB.__exit__(*args)
        except:
            suppress = self.cmA.__exit__(*sys.exc_info()):
            if not suppress:
                # 예외가 변경되었으므로 명시적으로 다시 발생시킵니다.
                raise
            else:
                if suppress:
                    # cmB가 이미 예외를 억제했으므로, cmA에 전달하지 않습니다.
                    suppress = self.cmA.__exit__(None, None, None):
                else:
                    suppress = self.cmA.__exit__(*args):
        return suppress
```

제안된 의미론적 변경이 적용되면 위의 `contextlib` 기반 예제들은 "그냥 작동"할 것이지만, 클래스 기반 버전은 새로운 의미론을 활용하기 위해 약간의 조정이 필요했을 것입니다:

```python
class CM(object):
    def __init__(self):
        self.cmA = None
        self.cmB = None
    def __enter__(self):
        if self.cmA is not None:
            raise RuntimeError("Can't re-use this CM")
        self.cmA = cmA()
        self.cmA.__enter__()
        try:
            self.cmB = cmB()
            self.cmB.__enter__()
        except:
            if self.cmA.__exit__(*sys.exc_info()):
                # 예외를 억제하지만, with 문 본문도 실행하지 않습니다.
                raise SkipStatement
            raise
    def __exit__(self, *args):
        suppress = False
        try:
            if self.cmB is not None:
                suppress = self.cmB.__exit__(*args)
        except:
            suppress = self.cmA.__exit__(*sys.exc_info()):
            if not suppress:
                # 예외가 변경되었으므로 명시적으로 다시 발생시킵니다.
                raise
            else:
                if suppress:
                    # cmB가 이미 예외를 억제했으므로, cmA에 전달하지 않습니다.
                    suppress = self.cmA.__exit__(None, None, None):
                else:
                    suppress = self.cmA.__exit__(*args):
        return suppress
```

현재 `contextlib.nested`를 사용하지 않고도 단일 `with` 문에 여러 컨텍스트 관리자를 포함할 수 있도록 `with` 문에 import 스타일 구문을 추가하자는 잠정적인 제안이 있습니다. 이 경우 컴파일러는 AST(추상 구문 트리) 수준에서 단순히 여러 `with` 문을 내보낼 옵션을 가지며, 따라서 실제 중첩된 `with` 문의 의미론을 정확하게 재현할 수 있습니다. 그러나 이러한 변경은 이 PEP가 다루고자 하는 문제를 완화하기보다는 오히려 부각시킬 것입니다. 즉, `contextlib.contextmanager`를 사용하여 이러한 `with` 문들을 안정적으로 분리하는 것이 불가능할 것입니다. 왜냐하면 위의 예제에서 `combined()` 컨텍스트 관리자와 동일한 의미론적 차이를 보일 것이기 때문입니다.

### 성능 영향

새로운 의미론을 구현하려면 `__enter__` 및 `__exit__` 메서드에 대한 참조를 스택(stack) 대신 임시 변수에 저장해야 합니다. 이는 Python 2.6/3.1에 비해 `with` 문 속도에 약간의 회귀(regression)를 초래합니다. 그러나 사용자 정의 `SETUP_WITH` opcode를 구현하면 두 접근 방식 간의 차이를 상쇄할 수 있습니다(또한 수십 번의 불필요한 eval 루프(loop) 왕복을 제거하여 속도를 극적으로 향상시킵니다).

### 참조 구현

이슈 5251에 패치가 첨부되어 있습니다. 이 패치는 기존 opcode만 사용합니다(즉, `SETUP_WITH` 없음).

### 감사의 글

James William Pye는 이 문제 제기 및 이 PEP에 설명된 해결책의 기본 개요를 제안했습니다.

### 참고 자료

 이슈 5251: contextlib.nested inconsistent with nested with statements (http://bugs.python.org/issue5251)
 Import-style syntax to reduce indentation of nested with statements (https://mail.python.org/pipermail/python-ideas/2009-March/003188.html)
 Guido's rejection of the PEP (https://mail.python.org/pipermail/python-dev/2009-March/087263.html)

### 저작권

이 문서는 공개 도메인에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.