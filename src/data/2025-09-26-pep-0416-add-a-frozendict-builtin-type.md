---
title: "[Rejected] PEP 416 - Add a frozendict builtin type"
excerpt: "Python Enhancement Proposal 416: 'Add a frozendict builtin type'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/416/
toc: true
toc_sticky: true
date: 2025-09-26 21:34:46+0900
last_modified_at: 2025-09-26 21:34:46+0900
published: true
---
> **원문 링크:** [PEP 416 - Add a frozendict builtin type](https://peps.python.org/pep-0416/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Feb-2012

파이썬 PEP 416: frozendict 내장 타입 추가 제안 (거부됨)

## 개요
이 문서는 PEP (Python Enhancement Proposal) 416의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. PEP 416은 `frozendict`라는 새로운 내장 타입을 Python에 추가할 것을 제안했으나, 최종적으로 **거부** 되었습니다.

## 목차
- 거부 공지 (Rejection Notice)
- 요약 (Abstract)
- 제안 배경 (Rationale)
- 제약 조건 (Constraints)
- 구현 (Implementation)
- 해시 가능한 dict 레시피 (Recipe: hashable dict)
- 반대 의견 (Objections)
- 대안: dictproxy (Alternative: dictproxy)
- 기존 구현 사례 (Existing implementations)
- 링크 (Links)
- 저작권 (Copyright)

---

### 거부 공지 (Rejection Notice)

PEP 416은 다음을 포함한 여러 이유로 인해 거부되었습니다.

*   **사용률 저조:** Raymond Hettinger에 따르면, `frozendict`의 사용률은 낮습니다. 사용하는 경우에도 `frozendict`를 전역 또는 클래스 수준 "상수"를 선언하는 것과 같은 힌트로 사용하는 경향이 있었습니다. 이는 이름에 여전히 재할당할 수 있기 때문에 진정으로 변경 불가능하지 않습니다.
*   **가변 기본값 문제에 대한 기존 해결책:** 가변 기본값 인자(mutable default arguments) 문제를 피하기 위한 기존의 관용적인 방법들이 있습니다.
*   **최적화 불확실성:** PyPy에서 `frozendict`를 사용하여 코드를 최적화할 수 있을지는 불확실하며, 다른 많은 것들이 먼저 변경되어야 할 것입니다. 일반적인 컴파일 시간 조회(compile-time lookups)의 경우도 마찬가지입니다.
*   **다중 스레드/프로세스:** 여러 스레드는 공유 `dict`를 변경하지 않기로 약속할 수 있으며, 강제할 큰 필요가 없습니다. 여러 프로세스는 `dict`를 공유할 수 없습니다.
*   **보안 샌드박스:** 제한된 범위라도 Python으로 작성된 보안 샌드박스를 추가하는 것은, 샌드박스가 실제로 안전하다는 것을 증명하기 어려운 내재된 어려움 때문에 많은 사람들이 반대합니다. 이러한 이유로 표준 라이브러리(stdlib)에 곧 추가될 예정이 없으므로, 이 사용 사례는 PEP의 범위에서 벗어납니다.

**하지만,** 기존의 읽기 전용 `dict` 프록시를 내장 타입으로 노출하는 것은 좋은 아이디어로 받아들여졌습니다. (생성자 호출을 허용하도록 변경해야 할 것입니다.)

**업데이트 (2012-04-15):** 새로운 `MappingProxyType` 타입이 Python 3.3의 `types` 모듈에 추가되었습니다.

### 요약 (Abstract)

새로운 `frozendict` 내장 타입을 추가하는 것을 제안합니다.

### 제안 배경 (Rationale)

`frozendict`는 읽기 전용 매핑(read-only mapping)입니다. 즉, 키를 추가하거나 제거할 수 없으며, 키는 항상 동일한 값에 매핑됩니다. 하지만 `frozendict`의 값은 해시 가능하지 않을 수 있습니다. `frozendict`는 모든 값이 해시 가능할 때만 해시 가능합니다.

**사용 사례:**

*   기본 설정과 같은 변경 불가능한 전역 변수(immutable global variable)로 사용합니다.
*   함수 매개변수의 기본값으로 사용하여 가변 기본 인자(mutable default arguments) 문제를 피합니다.
*   캐시를 구현합니다. `frozendict`는 함수 키워드를 저장하는 데 사용될 수 있습니다.
*   매핑의 키 또는 집합(set)의 멤버로 `frozendict`를 사용할 수 있습니다.
*   여러 스레드나 프로세스에 의해 `frozendict`가 공유될 때, 특히 해시 가능한 `frozendict`의 경우 잠금(lock)이 필요 없게 합니다. 이는 코루틴(제너레이터 + 그린렛)이 전역 상태를 수정하는 것을 금지하는 데도 도움이 될 것입니다.
*   `frozendict` 조회(lookup)는 매핑이 읽기 전용이므로 런타임 대신 컴파일 시간에 수행될 수 있습니다.
*   `frozendict`는 디버그 빌드(debug build)에 특정한 코드와 같이 조건부 코드를 컴파일 시점에 제거하기 위한 전처리기(preprocessor) 대신 사용될 수 있습니다.
*   `frozendict`는 보안 모듈을 위한 읽기 전용 객체 프록시(read-only object proxies)를 구현하는 데 도움이 됩니다. 예를 들어, `__builtins__` 매핑 또는 `type.__dict__`에 `frozendict` 타입을 사용하는 것이 가능했을 것입니다. 이는 `frozendict`가 PyDict C API와 호환되기 때문입니다.
*   `frozendict`는 일부 경우에 읽기 전용 프록시의 필요성을 피하게 합니다. `frozendict`에서 항목을 가져오는 것은 빠른 조회인 반면, 프록시는 함수 호출을 요구하므로 `frozendict`가 프록시보다 빠릅니다.

### 제약 조건 (Constraints)

*   `frozendict`는 `Mapping` 추상 기본 클래스를 구현해야 합니다.
*   `frozendict`의 키와 값은 순서가 정해지지 않을 수 있습니다.
*   `frozendict`는 모든 키와 값이 해시 가능할 때 해시 가능합니다.
*   `frozendict`의 해시 값은 항목 생성 순서에 의존하지 않습니다.

### 구현 (Implementation)

*   `PyDictObject`를 기반으로 `PyFrozenDictObject` 구조체를 추가하며, 추가적으로 "`Py_hash_t hash;`" 필드를 가집니다.
*   `frozendict.__hash__()`는 `hash(frozenset(self.items()))`를 사용하여 구현되며, 결과를 개인 해시 속성(private hash attribute)에 캐시합니다.
*   `frozendict`를 `collections.abc.Mapping`으로 등록합니다.
*   `frozendict`는 `PyDict_GetItem()`과 함께 사용될 수 있지만, `PyDict_SetItem()` 및 `PyDict_DelItem()`은 `TypeError`를 발생시킵니다.

### 해시 가능한 dict 레시피 (Recipe: hashable dict)

`frozendict`가 해시 가능하도록 보장하려면, `frozendict`를 생성하기 전에 값을 확인할 수 있습니다.

```python
import itertools

def hashabledict(*args, **kw):
    # 모든 값이 해시 가능한지 확인
    for key, value in itertools.chain(args, kw.items()):
        if isinstance(value, (int, str, bytes, float, frozenset, complex)):
            # 해시 가능한 것으로 알려진 내장 타입의 경우 해시 계산을 피함 (느릴 수 있음)
            continue
        hash(value) # 키는 이미 frozendict가 확인하므로 검사하지 않음
    return frozendict.__new__(cls, *args, **kw)
```


### 반대 의견 (Objections)

*   **`namedtuple`이 `frozendict`의 요구사항을 충족할 수 있다?**
    *   `namedtuple`은 매핑이 아니며, `Mapping` 추상 기본 클래스를 구현하지 않습니다.

*   **`frozendict`는 "디스크립터(descriptors)"를 사용하여 Python으로 구현될 수 있고, "실질적으로 상수(practically constant)"이기만 하면 된다?**
    *   `frozendict`가 Python을 강화(보안 목적)하는 데 사용된다면, C로 구현되어야 합니다. C로 구현된 타입이 더 빠릅니다.

*   **PEP 351이 거부되었다?**
    *   PEP 351은 객체를 "고정(freeze)"하려고 시도하며, 따라서 가변 객체를 변경 불가능한 객체(다른 타입을 사용하여)로 변환할 수 있습니다. `frozendict`는 아무것도 변환하지 않습니다. 만약 값이 해시 가능하지 않다면 `hash(frozendict)`는 `TypeError`를 발생시킵니다. 객체를 고정하는 것은 이 PEP의 목적이 아닙니다.

### 대안: dictproxy (Alternative: dictproxy)

Python에는 `type.__dict__` 게터 디스크립터(getter descriptor)에 의해 사용되는 내장 `dictproxy` 타입이 있습니다. 이 타입은 공개되지 않습니다. `dictproxy`는 딕셔너리의 읽기 전용 뷰(read-only view)이지만, 읽기 전용 매핑은 아닙니다. 딕셔너리가 수정되면 `dictproxy`도 수정됩니다.

`dictproxy`는 `ctypes`와 Python C API를 사용하여 사용할 수 있습니다. 예를 들어, Ikkei Shimomura의 "make dictproxy object via ctypes.pythonapi and type() (Python recipe 576540)"를 참조하세요. 이 레시피에는 `dictproxy`가 "가변(mutable)"인지 확인하는 테스트가 포함되어 있습니다.

그러나 `dictproxy`는 그 가변성(mutable property)이 문제가 되지 않는 일부 경우에 딕셔너리 복사를 피하기 위해 유용할 수 있습니다.

### 기존 구현 사례 (Existing implementations)

**화이트리스트(Whitelist) 접근 방식:**

*   Aristotelis Mikropoulos의 "Implementing an Immutable Dictionary (Python recipe 498072)". `frozendict`와 유사하지만 완전히 읽기 전용은 아닙니다. 개인 내부 `dict`에 접근할 수 있습니다. `__hash__`를 구현하지 않으며, `__init__()`를 다시 호출하여 매핑을 수정할 수 있는 구현 문제가 있습니다.
*   PyWebmail의 `ImmutableDict` 타입 (`webmail.utils.ImmutableDict`). 키와 값이 해시 가능하면 해시 가능합니다. 완전히 읽기 전용은 아닙니다. 내부 `dict`는 공개 속성입니다.
*   `remember` 프로젝트의 `remember.dicts.FrozenDict`. 캐시를 구현하는 데 사용됩니다. `FrozenDict`는 함수 콜백을 저장하는 데 사용됩니다. `FrozenDict`는 해시 가능할 수 있습니다. 딕셔너리를 복사하지 않고 `dict`로부터 `FrozenDict`를 생성하는 `supply_dict()` 클래스 메서드를 가지고 있습니다. `__init__()`를 호출하여 매핑을 수정할 수 있고, 해시 값이 항목 생성 순서에 따라 달라질 수 있는 구현 문제가 있습니다. 매핑은 완전히 읽기 전용이 아니며, 내부 `dict`는 Python에서 접근 가능합니다.

**블랙리스트(Blacklist) 접근 방식: `dict`를 상속하고 쓰기 메서드를 오버라이드하여 예외를 발생시키는 방식.** 완전히 읽기 전용은 아니며, 여전히 그러한 "고정된 딕셔너리"에 `dict` 메서드를 호출하여 수정할 수 있습니다.

*   `brownie`: `brownie.datastructures.ImmutableDict`. 키와 값이 해시 가능하면 해시 가능합니다.
*   `werkzeug` 프로젝트도 동일한 코드를 가집니다: `werkzeug.datastructures.ImmutableDict`. `ImmutableDict`는 전역 상수(설정 옵션)에 사용됩니다. Flask 프로젝트는 `werkzeug`의 `ImmutableDict`를 기본 설정에 사용합니다.
*   SQLAlchemy 프로젝트: `sqlalchemy.util.immutabledict`. 해시 가능하지 않으며, `union()`이라는 추가 메서드를 가집니다. `immutabledict`는 매핑을 기대하는 일부 함수의 매개변수 기본값으로 사용됩니다. 예: `SqlSoup.map()`의 `mapper_args=immutabledict()`.
*   Oren Tirosh의 "Frozen dictionaries (Python recipe 414283)". 키와 값이 해시 가능하면 해시 가능합니다. 다음 프로젝트에 포함되어 있습니다:
    *   `lingospot`: `frozendict/frozendict.py`
    *   `factor-graphics`: `python/fglib/util_ext_frozendict.py`의 `frozendict` 타입
*   George Sakkis가 작성한 `gsakkis-utils` 프로젝트에는 `frozendict` 타입이 포함되어 있습니다: `datastructs.frozendict`.
*   `characters`: `scripts/python/frozendict.py`. 해시 가능합니다. `__init__()`는 `__init__`을 `None`으로 설정합니다.
*   이전 NLTK (1.x): `nltk.util.frozendict`. 키와 값은 해시 가능해야 합니다. `__init__()`는 매핑을 수정하기 위해 두 번 호출될 수 있습니다. `frozendict`는 객체를 "고정"하는 데 사용됩니다.

**해시 가능한 `dict`: `dict`를 상속하고 `__hash__` 메서드만 추가하는 방식.**

*   `pypy.rpython.lltypesystem.lltype.frozendict`. 해시 가능하지만 매핑의 수정을 거부하지는 않습니다.
*   `factor-graphics`: `python/fglib/util_ext_frozendict.py`의 `hashabledict` 타입.

### 링크 (Links)

*   Issue #14162: PEP 416: Add a builtin frozendict type
*   PEP 412: Key-Sharing Dictionary (issue #13903)
*   PEP 351: The freeze protocol
*   The case for immutable dictionaries; and the central misunderstanding of PEP 351
*   make dictproxy object via ctypes.pythonapi and type() (Python recipe 576540) by Ikkei Shimomura.
*   C 확장을 사용하여 읽기 전용 객체 프록시를 구현하는 Python 보안 모듈:
    *   `pysandbox`
    *   `mxProxy`
    *   `zope.proxy`
    *   `zope.security`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.