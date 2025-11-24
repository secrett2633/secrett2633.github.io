---
title: "[Rejected] PEP 3130 - Access to Current Module/Class/Function"
excerpt: "Python Enhancement Proposal 3130: 'Access to Current Module/Class/Function'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3130/
toc: true
toc_sticky: true
date: 2025-09-27 14:31:53+0900
last_modified_at: 2025-09-27 14:31:53+0900
published: true
---
> **원문 링크:** [PEP 3130 - Access to Current Module/Class/Function](https://peps.python.org/pep-3130/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 22-Apr-2007


# PEP 3130 – 현재 모듈/클래스/함수에 접근

*   **작성자:** Jim J. Jewett <jimjjewett at gmail.com>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2007년 4월 22일
*   **Python 버전:** 3.0
*   **히스토리:** 2007년 4월 22일

---

## 거부 고지 (Rejection Notice)

이 PEP는 거부되었습니다. 어떻게 구현되어야 할지, 그리고 엣지 케이스(edge cases)에서 정확한 의미론(semantics)이 무엇이 되어야 할지 명확하지 않았습니다. 또한, 충분히 중요한 사용 사례가 제시되지 않았고, 전반적으로 반응이 미온적이었기 때문입니다.

## 개요 (Abstract)

현재 모듈(module), 클래스(class) 또는 함수(function)에 대한 참조가 필요한 경우가 흔하지만, 현재로서는 이를 완전히 올바르게 수행하는 방법이 없습니다. 이 PEP는 `__module__`, `__class__`, `__function__`이라는 키워드를 추가할 것을 제안합니다.

## `__module__` 제안 배경 (Rationale for `__module__`)

많은 모듈은 다양한 함수, 클래스 및 기타 객체를 내보내지만, 스크립트(script)로 실행될 때는 (유닛 테스트 실행과 같은) 추가적인 활동을 수행합니다. 현재 일반적인 관용구(idiom)는 모듈의 이름이 특정 매직 값으로 설정되었는지 테스트하는 것입니다.

```python
if __name__ == "__main__":
    # 이 모듈이 직접 실행될 때만 수행되는 코드
    ...
```

더 복잡한 인트로스펙션(introspection)은 모듈이 자기 자신을 (시도하여) 임포트(import)하도록 요구합니다. 만약 예상된 이름으로 임포트하는 것이 실제로는 다른 모듈을 생성한다면, 좋은 해결 방법이 없습니다.

```python
# __import__를 사용하면 변수를 사용할 수 있지만,
# 모듈이 패키지 안에 있을 경우 더 복잡해집니다.
__import__(__name__)

# sys.modules를 직접 사용하는 방법:
# 모듈이 숨겨지거나 제거되지 않았고(보안상 이유 등으로),
# __name__이 변경되지 않았으며,
# 같은 이름을 가진 다른 모듈이 현재 사용 가능하지 않다는 희망을 가져야 합니다.
class X(object): pass
import sys
mod = sys.modules[__name__]
mod = sys.modules[X.__class__.__module__]
```

**제안:** 현재 정의(실행) 중인 모듈을 참조하는 `__module__` 키워드를 추가합니다.

## `__class__` 제안 배경 (Rationale for `__class__`)

클래스 메서드(class methods)는 현재 인스턴스(instance)를 전달받습니다. 이를 통해 `self.__class__` (또는 클래스 메서드의 경우 `cls`)를 결정할 수 있습니다. 그러나 이 참조는 객체의 실제 클래스를 가리키며, 이는 정의된 클래스의 서브클래스(subclass)일 수 있습니다. 현재의 해결책은 클래스의 이름을 반복하고, 그 이름이 재할당되지 않을 것이라고 가정하는 것입니다.

```python
class C(B):
    def meth(self):
        super(C, self).meth() # C가 재할당되지 않기를 바랍니다.

class D(C):
    def meth(self):
        # ?!? issubclass(D,C)이므로 "작동"합니다.
        super(C, self).meth() # 여전히 C를 사용.
```

**제안:** 현재 정의(실행) 중인 클래스를 참조하는 `__class__` 키워드를 추가합니다.

```python
class C(B):
    def meth(self):
        super(__class__, self).meth() # 항상 현재 클래스 C를 참조.
```

참고로, `super` 호출은 "New Super" PEP (Spealman)에 의해 더 단순화될 수 있습니다. `__class__` (또는 `__this_class__`) 속성은 해당 PEP의 설명 및/또는 구현을 단순화하려는 시도에서 제기되었지만, 독립적인 결정으로 분리되었습니다.

`__class__` (또는 `__this_class__`)는 바운드 `super` 객체의 `__thisclass__` 속성과는 완전히 동일하지 않습니다. 기존 `super.__thisclass__` 속성은 Method Resolution Order (MRO) 검색이 시작되는 클래스를 참조합니다. 위 클래스 `D`의 예에서 `super.__thisclass__`는 (현재 이름 `C`가 참조하는) `C`를 참조할 것입니다.

## `__function__` 제안 배경 (Rationale for `__function__`)

함수(메서드 포함)는 종종 자기 자신에 접근하기를 원하며, 일반적으로는 프라이빗 저장 위치(private storage location)나 진정한 재귀(true recursion)를 위해 필요합니다. 몇 가지 해결책이 있지만, 모두 단점이 있습니다.

```python
def counter(_total=[0]):
    # _total이 서명(signature)에 아예 나타나지 않아야 합니다.
    # 리스트 래핑(wrapping)과 [0] 언래핑(unwrapping)은 코드를 불분명하게 만듭니다.
    _total[0] += 1
    return _total[0]

@annotate(total=0)
def counter():
    # counter 이름이 재할당되지 않는다고 가정합니다.
    counter.total += 1
    return counter.total

# 저장 공간을 제공하기 위해 클래스가 존재합니다.
class _wrap(object):
    __total = 0
    def f(self):
        self.__total += 1
        return self.__total
accum = _wrap().f # 모듈 속성을 바운드 메서드(bound method)로 설정

# 이 함수는 "factorial"을 호출하며, 자기 자신이어야 하지만,
# 강한 재귀를 사용하는 프로그래밍 스타일은
# 함수 이름을 재할당할 가능성이 더 높습니다.
def factorial(n):
    return (n * factorial(n-1) if n else 1)
```

**제안:** 현재 정의(실행) 중인 함수(또는 메서드)를 참조하는 `__function__` 키워드를 추가합니다.

```python
@annotate(total=0)
def counter():
    # 항상 이 함수 객체를 참조합니다.
    __function__.total += 1
    return __function__.total

def factorial(n):
    return (n * __function__(n-1) if n else 1)
```

## 하위 호환성 (Backwards Compatibility)

사용자가 이미 이러한 이름을 사용하고 있을 수도 있지만, 이중 밑줄 이름 (`__anything__`)은 인터프리터(interpreter)를 위해 명시적으로 예약되어 있습니다. 따라서 단일 기능 릴리스(feature release) 내에서 이러한 이름에 특별한 의미를 부여하는 것은 허용 가능합니다.

## 구현 (Implementation)

이상적으로는 이 이름들이 바이트코드 컴파일러(bytecode compiler)에 의해 특별히 처리되는 키워드가 될 것입니다.

Guido는 메타클래스(metaclass)에 의해 채워지는 셀 변수(cell variable)를 사용할 것을 제안했습니다.

Michele Simionato는 바이트코드 핵(bytecode hacks)을 사용하여 프로토타입을 제공했습니다. 이는 새로운 바이트코드 연산자를 필요로 하지 않으며, 단지 기존 연산자의 특정 시퀀스를 수정하는 것입니다.

## 미해결 문제 (Open Issues)

*   `__module__`, `__class__`, `__function__`이 올바른 이름인가요? 특히, 이름에 "this"라는 단어가 포함되어야 할까요? (예: `__this_module__`, `__this_class__`, `__this_function__` 또는 `__thismodule__`, `__thisclass__`, `__thisfunction__`) 이는 `super.__thisclass__`의 현재 사용법과 충돌할 수 있습니다.
*   세 키워드가 모두 필요한가요, 아니면 이 개선 사항이 객체의 하위 집합으로 제한되어야 할까요?
*   메서드는 다른 함수와 별도로 취급되어야 할까요?

## 참고 자료 (References)

*   Fixing super anyone? Guido van Rossum
    `https://mail.python.org/pipermail/python-3000/2007-April/006671.html`
*   Descriptor/Decorator challenge, Michele Simionato
    `http://groups.google.com/group/comp.lang.python/browse_frm/thread/a6010c7494871bb1/62a2da68961caeb6?lnk=gst&q=simionato+challenge&rnum=1&hl=en#62a2da68961caeb6`

---

이 PEP는 현재 컨텍스트(모듈, 클래스, 함수)에 대한 명시적인 접근을 제공하여 코드의 명확성과 재귀적 또는 자기 참조적 패턴의 구현을 개선하려 했으나, 제안된 키워드의 의미론적 모호성 및 구현의 복잡성으로 인해 채택되지 못했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.