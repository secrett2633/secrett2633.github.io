---
title: "[Rejected] PEP 363 - Syntax For Dynamic Attribute Access"
excerpt: "Python Enhancement Proposal 363: 'Syntax For Dynamic Attribute Access'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/363/
toc: true
toc_sticky: true
date: 2025-09-26 19:08:27+0900
last_modified_at: 2025-09-26 19:08:27+0900
published: true
---
> **원문 링크:** [PEP 363 - Syntax For Dynamic Attribute Access](https://peps.python.org/pep-0363/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Jan-2007

## PEP 363 – 동적 속성 접근을 위한 새로운 문법 제안 (Syntax For Dynamic Attribute Access)

**상태: 거부됨 (Rejected)**

이 문서는 Python Enhancement Proposal (PEP) 363에 대한 한국어 번역 및 정리입니다. PEP 363은 Python에서 객체의 속성에 동적으로 접근하는 새로운 문법을 제안했지만, 최종적으로 **거부되었습니다**. 이 문서는 제안의 내용, 도입 배경, 그리고 거부된 이유를 설명합니다.

### 요약 (Abstract)

현재 Python에서는 `getattr` 및 `setattr` 내장 함수를 사용하여 동적으로 객체 속성에 접근할 수 있습니다. PEP 363은 이러한 동적 속성 접근을 더 쉽게 하기 위한 새로운 문법을 제안했습니다.

예를 들어, 제안된 문법을 사용하면 다음처럼 코드를 작성할 수 있습니다:

```python
x.('foo_%d' % n) += 1
z = y.('foo_%d' % n).('bar_%s' % s)
```

이는 기존의 `getattr`/`setattr`을 사용하는 다음 코드보다 간결합니다:

```python
attr_name = 'foo_%d' % n
setattr(x, attr_name, getattr(x, attr_name) + 1)
z = getattr(getattr(y, 'foo_%d' % n), 'bar_%s' % s)
```

### 도입 배경 (Rationale)

이 제안의 주요 동기는 딕셔너리 접근(`x[12]`)이나 인덱싱(`x[12] += 1`)이 제공하는 것과 유사한 친숙한 문법을 동적 속성 접근에도 제공하여 사용 편의성을 높이는 것이었습니다.

현재 Python에서 속성 접근은 두 가지 방식으로 이루어집니다:

1.  **속성 이름이 코드 작성 시점에 알려진 경우**: `.NAME` 트레일러(trailer)를 사용합니다.
    ```python
    x.foo = 42
    y.bar += 100
    ```
2.  **속성 이름이 런타임에 동적으로 계산되는 경우**: `getattr`, `setattr`, `delattr` 내장 함수를 사용해야 합니다.
    ```python
    x = getattr(y, 'foo_%d' % n)
    setattr(z, 'bar_%s' % s, 99)
    ```
    `getattr`은 또한 속성이 없을 경우 반환할 기본값(default value)을 지정할 수 있습니다:
    ```python
    x = getattr(y, 'foo_%d' % n, 0)
    ```

PEP 363은 `x.(expr)` 형태의 새로운 문법을 통해 동적 속성 접근의 편의성을 개선하고자 했습니다. 이 새로운 문법은 `del` 문과 함께 사용할 수도 있었습니다: `del x.(attr_name)`

### 기존 코드에 미치는 영향 (Impact On Existing Code)

제안된 새로운 문법은 현재 유효하지 않으므로, 이 제안으로 인해 기존의 올바른 프로그램의 의미가 변경되는 경우는 없었을 것입니다.

Python 2.5 배포판의 `*.py` 파일에서 약 600여 건의 `getattr`, `setattr`, `delattr` 사용이 있었으며, 이 중 상당수는 새로운 문법으로 대체될 수 있었을 것으로 추정되었습니다. 특히 `getattr`과 `setattr`이 함께 사용되는 복잡한 경우(`setattr(self, attr, change_root(self.root, getattr(self, attr)))`)에는 새로운 문법(`self.(attr) = change_root(self.root, self.(attr))`)이 가독성을 크게 향상시킬 수 있었습니다.

### 성능 영향 (Performance Impact)

초기 Pystone 벤치마크 측정 결과는 결론적이지 않았지만, 패치된 버전에서 Pystone 점수가 약 1% 정도 하락할 수 있음을 시사했습니다. 이는 `ceval.c`의 메인 루프가 길어져 캐시 동작에 악영향을 미치기 때문이라는 추측이 있었으나 확인되지는 않았습니다. 반면에, 동적 속성 접근 자체에 대해서는 약 40-45%의 속도 향상이 측정되었습니다.

### 오류 처리 (Error Cases)

속성 이름으로는 오직 문자열만 허용되었습니다. 예를 들어, `x.(99) = 8`과 같이 정수를 사용하면 `TypeError: attribute name must be string, not 'int'` 오류가 발생합니다. 이는 기존 `PyObject_GetAttr` 함수에 의해 처리됩니다.

### 초안 구현 (Draft Implementation)

초안 구현은 `Grammar/Grammar` 파일의 `trailer` 절에 새로운 대안을 추가하고, `Python.asdl`에 새로운 AST (Abstract Syntax Tree) 타입인 `DynamicAttribute`를 도입하며, `symtable.c`, `ast.c`, `compile.c`에 관련 변경 사항을 적용했습니다. 또한, 세 개의 새로운 opcode (load/store/del)와 함께 `opcode.h`, `ceval.c`에도 변경이 있었습니다. 이 패치는 핵심 코드에 약 180줄, 테스트 코드에 약 100줄을 추가하는 정도였습니다.

### 메일링 리스트 토론 (Mailing Lists Discussion)

이 PEP는 python-ideas (2007년 2월 9일)와 python-dev (2007년 2월 12일) 메일링 리스트에서 논의되었습니다.

*   **초기 반응**: 초기에는 아이디어에 대한 합리적인 (만장일치는 아니지만) 지지가 있었으나, 정확한 문법 선택에 대해서는 의견이 엇갈렸습니다. 일부는 `.`이 너무 쉽게 간과되어 메소드/함수 호출과 혼동될 수 있다고 지적했습니다.
*   **대체 문법 제안**: `obj.[foo]`, `obj.{foo}`, `obj{foo}` 등 여러 대체 문법이 제안되었고, 그중 `obj.[foo]`가 선호되었습니다.
*   **두 인자 형태 반대**: 기본값을 위한 두 인자 형태의 동적 속성 접근(`x = y.('foo_%d' % n, None)`)은 보편적으로 비판을 받아 PEP에서 제외되었습니다.
*   **근본적인 의문**: 토론은 이 기능이 새로운 문법 도입을 정당화할 만큼 충분한 이점을 제공하는지에 대한 근본적인 질문으로 이어졌습니다. 개발자들이 새로운 문법에 익숙해져야 하는 문제와 함께, 새 문법을 사용하는 코드가 이전 버전의 Python에서 실행되지 않는 하위 호환성 문제도 제기되었습니다.
*   **대체 솔루션 제안**: 새로운 문법 대신, Martin von Löwis가 제안한 **"래퍼 클래스 (wrapper class)"** 아이디어가 논의되었습니다. 이 래퍼 클래스는 객체에 대한 딕셔너리 스타일의 속성 접근을 제공했습니다:

    ```python
    class attrs:
        def __init__(self, obj):
            self.obj = obj
        def __getitem__(self, name):
            return getattr(self.obj, name)
        def __setitem__(self, name, value):
            return setattr(self.obj, name, value)
        def __delitem__(self, name):
            return delattr(self, name)
        def __contains__(self, name):
            return hasattr(self, name)
    ```

    이 래퍼 클래스 접근 방식은 원래 문제에 대한 더 깔끔하고 우아한 해결책으로 간주되었습니다.

*   **최종 결정**: 최종적으로, 이 PEP는 새로운 문법 도입에 대한 입증 책임 (burden of proof)을 충족하지 못한다고 결정되어 **거부되었습니다**. 래퍼 클래스 아이디어는 향후 PEP의 가능성으로 남겨졌습니다.

### 결론

PEP 363은 동적 속성 접근의 편의성을 높이기 위한 새로운 문법 `x.(expr)`를 제안했지만, 복잡성, 하위 호환성 문제, 그리고 새로운 문법 도입의 정당성에 대한 충분한 설득력 부족으로 인해 거부되었습니다. 대신, `getattr`/`setattr`/`delattr`을 딕셔너리처럼 사용할 수 있게 하는 래퍼 클래스(wrapper class)와 같은 대안적인 접근 방식이 더 우아한 해결책으로 논의되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.