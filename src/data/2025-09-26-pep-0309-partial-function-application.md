---
title: "[Final] PEP 309 - Partial Function Application"
excerpt: "Python Enhancement Proposal 309: 'Partial Function Application'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/309/
toc: true
toc_sticky: true
date: 2025-09-26 18:11:12+0900
last_modified_at: 2025-09-26 18:11:12+0900
published: true
---
> **원문 링크:** [PEP 309 - Partial Function Application](https://peps.python.org/pep-0309/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Feb-2003

PEP 309 – Partial Function Application (부분 함수 적용)

## 요약
이 PEP는 호출 가능한(callable) 객체와 부분적인 인자 리스트(위치 인자 및 키워드 인자 포함)를 사용하여 새로운 호출 가능한 객체를 생성하는 함수 또는 호출 가능한 클래스에 대한 제안입니다. 이 제안은 `partial()` 이라는 이름으로 표준 라이브러리의 `functools` 모듈에 추가되었습니다. `partial()`은 함수형 프로그래밍의 부분 적용(partial application) 개념을 파이썬에 도입하여, 기존 함수에 미리 일부 인자를 고정하여 새로운 함수를 만드는 유연성을 제공합니다.

## 노트 (Note)
이 PEP가 수락된 후 `python-dev` 및 `comp.lang.python`에서의 추가 논의를 통해 함수 객체에 대해 작동하지만 함수형 프로그래밍과는 관련 없는 여러 도구에 대한 요구가 드러났습니다. 이러한 도구들을 위한 새 모듈을 만드는 대신, 새로 확장된 초점을 반영하여 "functional" 모듈을 "functools"로 이름을 변경하기로 합의되었습니다. 이 PEP의 "functional" 모듈에 대한 참조는 역사적인 이유로 그대로 남아 있습니다.

## 초록 (Abstract)
이 제안은 호출 가능한 객체와 (위치 및 키워드 인자를 포함한) 부분적인 인자 리스트로부터 새로운 호출 가능한 객체를 구성할 수 있게 해주는 함수 또는 호출 가능한 클래스를 위한 것입니다.

저는 `partial()`의 구현을 포함하여 유용한 고차 함수(higher-order function)들을 담을 "functional"이라는 표준 라이브러리 모듈을 제안합니다. 구현은 SourceForge에 제출되었습니다.

## 수락 (Acceptance)
패치 #941881은 Py2.5를 위해 2005년에 수락 및 적용되었습니다. 이는 기본적으로 여기에 설명된 대로 `partial()` 타입 생성자가 가장 왼쪽 위치 인자와 모든 키워드를 바인딩하는 형태입니다. `partial` 객체는 `func`, `args`, `keywords` 세 가지 읽기 전용 속성을 가집니다. `partial` 객체에 대한 호출은 객체 자체에 있는 키워드를 재정의하는 키워드를 지정할 수 있습니다.

동등한 함수(equivalent function)의 동작을 더 가깝게 모방하기 위해 `__get__` 메서드로 `partial` 구현을 수정할지에 대한 별도의 지속적인 논의가 있습니다.

## 동기 (Motivation)
함수형 프로그래밍에서 함수 커링(function currying)은 다중 인자 함수를 단일 인자 함수로 구현하는 한 가지 방법입니다. N개의 인자를 가진 함수는 실제로 1개의 인자를 가지고 (N-1)개의 인자를 받는 다른 함수를 반환하는 함수입니다. Haskell 및 ML과 같은 언어에서 함수 적용은 다음과 같은 함수 호출로 작동합니다:

```
f x y z
```

이는 실제로 다음을 의미합니다:

```
(((f x) y) z)
```

이것은 실제 프로그래밍에서 매우 유용하다는 것이 밝혀진다는 점을 제외하고는 모호한 이론적 문제일 뿐입니다. 다른 함수에 인자의 부분 적용으로 함수를 표현하는 것은 우아하고 강력할 수 있으며, 함수형 언어에서는 많이 사용됩니다.

일부 함수형 언어(예: Miranda)에서는 `(+1)`과 같은 표현식을 사용하여 파이썬의 `(lambda x: x + 1)`과 동일한 의미를 나타낼 수 있습니다. 일반적으로 그러한 언어는 강타입(strongly typed)이므로 컴파일러는 항상 예상되는 인자의 수를 알고 있으며, 펑터(functor)와 예상보다 적은 인자가 제공될 때 올바른 작업을 수행할 수 있습니다.

파이썬은 커링을 통해 다중 인자 함수를 구현하지 않으므로, 부분 적용된 인자를 가진 함수를 원한다면 위에서 언급했듯이 `lambda`를 사용하거나 각 인스턴스에 대해 명명된 함수를 정의할 것입니다.

그러나 `lambda` 문법은 모두의 취향에 맞는 것은 아닙니다. 또한, 파이썬의 위치 인자와 키워드를 모두 사용하는 유연한 매개변수 전달은 부분 적용의 아이디어를 일반화하고 `lambda`가 할 수 없는 작업을 수행할 기회를 제공합니다.

## 구현 예시 (Example Implementation)
다음은 파이썬에서 부분 적용된 인자를 가진 호출 가능한 객체를 만드는 한 가지 방법입니다. 아래 구현은 Scott David Daniels가 제공한 개선 사항을 기반으로 합니다:

```python
class partial(object):
    def __init__(*args, **kw):
        self = args[0]
        self.fn, self.args, self.kw = (args[1], args[2:], kw)

    def __call__(self, *args, **kw):
        if kw and self.kw:
            d = self.kw.copy()
            d.update(kw)
        else:
            d = kw or self.kw
        return self.fn(*(self.args + args), **d)
```
(이와 유사한 레시피는 파이썬 쿡북(Python Cookbook)에 한동안 있었습니다.)

객체가 함수처럼 호출될 때, 위치 인자는 생성자에 제공된 인자에 추가되고, 키워드 인자는 생성자에 제공된 인자를 재정의하고 보강합니다. 객체를 생성할 때와 호출할 때 모두 위치 인자, 키워드 인자 또는 둘 다를 제공할 수 있습니다.

## 사용 예시 (Examples of Use)

`partial(operator.add, 1)`은 `(lambda x: 1 + x)`와 약간 비슷합니다. 물론 여기서 이점은 분명하게 드러나지 않습니다.

또한, 클래스 자체도 객체를 위한 호출 가능한 팩토리(callable factories)이기 때문에 클래스를 동일한 방식으로 래핑할 수 있습니다. 따라서 일부 경우, 서브클래스(subclass)를 정의하는 대신 생성자에 인자를 부분 적용하여 클래스를 특수화(specialise)할 수 있습니다.

예를 들어, `partial(Tkinter.Label, fg='blue')`는 기본적으로 파란색 전경(foreground)을 가진 Tkinter Label을 만듭니다.

다음은 부분 적용을 사용하여 Tkinter 위젯에 대한 콜백(callback)을 즉석에서 구성하는 간단한 예시입니다:

```python
from Tkinter import Tk, Canvas, Button
import sys
from functional import partial

win = Tk()
c = Canvas(win,width=200,height=50)
c.pack()

for colour in sys.argv[1:]:
    b = Button(win, text=colour, command=partial(c.config, bg=colour))
    b.pack(side='left')

win.mainloop()
```

## 폐기된 문법 제안 (Abandoned Syntax Proposal)
원래 `fn@(*args, **kw)` 구문을 제안했습니다. 이는 `partial(fn, *args, **kw)`와 같은 의미입니다.

`@` 기호는 일부 어셈블리 언어에서 레지스터 간접 지정을 의미하는 데 사용되며, 여기에서의 사용도 일종의 간접 지정입니다. `f@(x)`는 `f(x)`가 아니라, 호출할 때 `f(x)`가 되는 것입니다.

이 제안은 잘 받아들여지지 않았으므로, 이 부분은 철회했습니다. 어쨌든 `@`는 새 데코레이터(decorator) 문법에 사용되었습니다.

## comp.lang.python 및 python-dev의 피드백 (Feedback from comp.lang.python and python-dev)
표명된 의견 중 다음이 있었습니다 (요약):

*   `lambda`는 충분히 좋다.
*   `@` 문법은 추하다 (만장일치).
*   이것은 클로저(closure)라기보다는 커링(currying)에 가깝다.
*   ActiveState의 파이썬 쿡북에 거의 동일한 커리 클래스 구현이 있다.
*   커리 클래스는 실제로 표준 라이브러리에 유용한 추가가 될 것이다.
*   이것은 함수 커링이 아니라 부분 적용(partial application)이다. 따라서 이름은 이제 `partial()`로 제안된다.
*   내장(built-ins)에 포함될 만큼 유용하지 않을 수도 있다.
*   `functional`이라는 모듈 아이디어는 잘 받아들여졌고, 그곳에 속할 다른 것들(예: 함수 합성)이 있다.
*   완전성을 위해 함수 호출에 제공된 인자 뒤에 부분 인자를 추가하는 다른 객체(아마도 `rightcurry`라고 불릴 수 있는)가 제안되었다.

저는 `lambda`가 일반적으로 충분히 좋지만 항상 그런 것은 아니라는 데 동의합니다. 그리고 유용한 인트로스펙션(introspection)과 서브클래싱(subclassing)의 가능성을 원합니다.

저는 `@`가 특히 추하다고는 생각하지 않지만, 제가 이상할 수도 있습니다. 딕셔너리, 리스트, 튜플 리터럴은 특별한 구두점으로 깔끔하게 구분됩니다 – 부분 적용된 함수 리터럴을 직접 표현하는 방법이 그렇게 억지스러운 것은 아닙니다. 그러나 단 한 명도 좋아한다고 말한 사람이 없었으므로, 저에게는 "죽은 앵무새"입니다.

클래스를 `curry`나 `closure` 대신 `partial`이라고 부르는 것에 동의하므로, 이 PEP의 제안을 그에 따라 수정했습니다. 그러나 모든 곳에서 그런 것은 아닙니다: 당시 논의의 흐름을 보여주기 위해 'curry'에 대한 일부 부정확한 참조는 남겨두었습니다.

오른쪽에서 인자를 부분 적용하거나 임의의 위치에 인자를 삽입하는 것은 그 자체로 문제를 야기하지만, 좋은 구현과 혼란스럽지 않은 의미론이 발견될 때까지 배제해서는 안 된다고 생각합니다.

Carl Banks는 실제 함수형 클로저(functional closure)로서 구현을 게시했습니다:

```python
def curry(fn, *cargs, **ckwargs):
    def call_fn(*fargs, **fkwargs):
        d = ckwargs.copy()
        d.update(fkwargs)
        return fn(*(cargs + fargs), **d)
    return call_fn
```
그는 이것이 더 효율적이라고 확신했습니다.

또한 Pyrex로 클래스를 코딩하여 C로 코딩했을 때 성능이 얼마나 향상될 수 있는지 추정했습니다:

```python
cdef class curry:
    cdef object fn, args, kw

    def __init__(self, fn, *args, **kw):
        self.fn=fn
        self.args=args
        self.kw = kw

    def __call__(self, *args, **kw):
        if self.kw: # from Python Cookbook version
            d = self.kw.copy()
            d.update(kw)
        else:
            d=kw
        return self.fn(*(self.args + args), **d)
```
Pyrex에서의 성능 향상은 중첩 함수(nested function) 구현에 비해 100% 미만입니다. 이는 완전히 일반적이기 위해 Python API 호출을 통해 작동해야 하기 때문입니다. 같은 이유로 C 구현도 훨씬 빠르지 않을 것이므로 C로 코딩된 내장 함수에 대한 주장은 그리 강력하지 않습니다.

## 요약 (Summary)
표준 라이브러리에 함수 및 기타 호출 가능한 객체를 부분 적용할 수 있는 수단이 있어야 한다고 생각합니다.

표준 라이브러리 모듈 `functional`은 `partial`의 구현과 커뮤니티가 원하는 다른 고차 함수를 포함해야 합니다. 그러나 그곳에 속할 수 있는 다른 함수들은 이 PEP의 범위를 벗어납니다.

구현, 문서 및 단위 테스트(SF 패치 931005, 931007, 931010)에 대한 패치가 제출되었지만 아직 체크인되지 않았습니다.

Hye-Shik Chang의 C 구현도 제출되었지만, Python 구현이 최적화할 가치가 있을 만큼 충분히 유용하다는 것이 입증될 때까지는 포함되지 않을 것으로 예상됩니다.

## 참고 자료 (References)
 https://mail.python.org/pipermail/python-dev/2006-March/062290.html
 Patches 931005, 931007, and 931010.
 http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/52549

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.