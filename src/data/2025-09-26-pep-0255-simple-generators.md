---
title: "[Final] PEP 255 - Simple Generators"
excerpt: "Python Enhancement Proposal 255: 'Simple Generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/255/
toc: true
toc_sticky: true
date: 2025-09-26 17:35:06+0900
last_modified_at: 2025-09-26 17:35:06+0900
published: true
---
> **원문 링크:** [PEP 255 - Simple Generators](https://peps.python.org/pep-0255/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-May-2001

PEP 255 – 간단한 제너레이터 (Simple Generators)

## 초록 (Abstract)
이 PEP는 Python에 제너레이터(generators)의 개념과 함께 사용되는 새로운 문(statement)인 `yield` 문을 도입합니다.

## 동기 (Motivation)
생산자 함수(producer function)가 생성하는 값들 사이에 상태를 유지해야 하는 복잡한 작업을 수행할 때, 대부분의 프로그래밍 언어는 각 값이 생성될 때마다 호출되는 콜백 함수(callback function)를 생산자의 인자 목록에 추가하는 것 외에는 만족스럽고 효율적인 해결책을 제공하지 않습니다.

예를 들어, 표준 라이브러리의 `tokenize.py`는 이 방식을 사용합니다. 호출자는 `tokenize()`가 다음 토큰을 찾을 때마다 호출될 `token_eater` 함수를 `tokenize()`에 전달해야 합니다. 이 방식은 `tokenize` 코드를 자연스럽게 작성할 수 있게 하지만, `tokenize`를 호출하는 프로그램은 콜백 호출 사이에 어떤 토큰이 마지막으로 보였는지 기억해야 하므로 복잡해지는 경향이 있습니다. `tabnanny.py`의 `token_eater` 함수가 좋은 예인데, 이는 전역 변수에 상태 머신을 유지하여 콜백 간에 이전에 무엇을 보았고 다음에 무엇을 기대하는지 기억합니다. 이를 올바르게 작동하도록 만드는 것이 어려웠고, 사람들이 이해하기도 여전히 어렵습니다.

다른 대안으로는 `tokenize`가 Python 프로그램 전체를 한 번에 큰 리스트로 생성하는 방법이 있습니다. 이렇게 하면 `tokenize` 클라이언트 코드를 로컬 변수와 로컬 제어 흐름(예: 루프 및 중첩된 `if` 문)을 사용하여 상태를 추적하며 자연스럽게 작성할 수 있습니다. 그러나 이 방법은 현실적이지 않습니다. 프로그램은 매우 클 수 있으므로 전체 파싱 결과를 메모리에 올리는 데 필요한 메모리 양에 미리 제한을 둘 수 없고, 일부 `tokenize` 클라이언트는 프로그램 초기에 특정 내용이 나타나는지 여부만 확인하기를 원할 수 있기 때문입니다. 이 경우 전체 프로그램을 먼저 파싱하는 것은 심각한 시간 낭비입니다.

또 다른 대안은 `tokenize`를 이터레이터(iterator)로 만들어 `.next()` 메서드가 호출될 때마다 다음 토큰을 전달하는 것입니다. 이는 호출자에게는 결과의 큰 리스트와 동일한 방식으로 편리하지만, 메모리 및 "일찍 종료하고 싶다면?"과 같은 단점이 없습니다. 그러나 이 방식은 `tokenize`가 `.next()` 호출 사이에 상태를 기억하는 부담을 지게 하며, `tokenize.tokenize_loop()`를 살펴보면 이것이 얼마나 끔찍한 작업이 될지 쉽게 알 수 있습니다. 일반적인 트리 구조의 노드를 생성하기 위한 재귀 알고리즘을 이터레이터 프레임워크로 변환하려면 재귀를 수동으로 제거하고 순회 상태를 직접 관리해야 합니다.

네 번째 옵션은 생산자와 소비자를 별도의 스레드(threads)에서 실행하는 것입니다. 이를 통해 둘 다 자연스러운 방식으로 상태를 유지할 수 있으므로 양측 모두에게 편리합니다. 하지만 스레드가 없는 플랫폼에서는 작동하지 않으며, 스레드가 있는 플랫폼에서도 매우 느립니다.

마지막 옵션은 경량 코루틴(lightweight coroutines)을 지원하는 Stackless (PEP 219) 변형 Python 구현을 사용하는 것입니다. 이는 스레드 옵션과 유사한 프로그래밍적 이점을 제공하지만 훨씬 효율적입니다. 그러나 Stackless는 Python 코어에 대한 논쟁의 여지가 있는 재고(rethinking)이며, Jython이 동일한 의미론을 구현하는 것이 불가능할 수도 있습니다. 이 PEP는 해당 논쟁을 다룰 곳이 아니므로, 제너레이터가 현재 CPython 구현에 쉽게 통합될 수 있는 방식으로 Stackless 기능의 유용한 하위 집합을 제공하며, 다른 Python 구현에도 비교적 간단하게 적용될 수 있다고 말하는 것으로 충분합니다.

이것이 현재 대안들을 모두 설명한 것입니다. 다른 일부 고급 언어들은 만족스러운 해결책을 제공하는데, 특히 CLU의 이터레이터에서 영감을 받은 Sather의 이터레이터와 모든 표현식이 제너레이터인 독특한 언어인 Icon의 제너레이터가 있습니다. 이들 사이에는 차이점이 있지만, 기본적인 아이디어는 동일합니다. 즉, 호출자에게 중간 결과("다음 값")를 반환할 수 있지만, 함수의 로컬 상태를 유지하여 함수가 중단된 지점에서 다시 재개될 수 있는 일종의 함수를 제공하는 것입니다.

매우 간단한 예시:

```python
def fib():
    a, b = 0, 1
    while 1:
        yield b
        a, b = b, a+b
```
`fib()`가 처음 호출되면 `a`는 0으로, `b`는 1로 설정된 다음 `b`를 호출자에게 yield 합니다. 호출자는 1을 받습니다. `fib`가 재개되면, `fib`의 관점에서는 `yield` 문이 `print` 문과 거의 동일합니다. `fib`는 `yield` 이후에 모든 로컬 상태를 그대로 유지한 채 계속됩니다. `a`와 `b`는 1과 1이 되고, `fib`는 `yield`로 돌아가 호출자에게 1을 yield 합니다. 이런 식으로 계속됩니다. `fib`의 관점에서는 콜백을 통해 순서대로 결과를 전달하는 것과 같습니다. 그러나 호출자의 관점에서는 `fib` 호출이 원하는 대로 재개할 수 있는 이터러블(iterable) 객체입니다. 스레드 방식과 마찬가지로, 이 방식은 양측이 가장 자연스러운 방식으로 코드를 작성할 수 있게 합니다. 그러나 스레드 방식과 달리, 이 방식은 효율적으로 모든 플랫폼에서 수행될 수 있습니다. 실제로 제너레이터를 재개하는 것은 함수 호출보다 비용이 많이 들지 않아야 합니다.

동일한 접근 방식이 많은 생산자/소비자 함수에 적용됩니다. 예를 들어, `tokenize.py`는 콜백 함수를 인자로 호출하는 대신 다음 토큰을 yield 할 수 있으며, `tokenize` 클라이언트는 자연스러운 방식으로 토큰을 반복할 수 있습니다. Python 제너레이터는 일종의 Python 이터레이터이지만, 특히 강력한 종류입니다.

## 명세: Yield (Specification: Yield)

새로운 문이 도입됩니다.
`yield_stmt: "yield" expression_list`

`yield`는 새로운 키워드이므로, 초기 릴리스에서는 제너레이터를 사용하려는 모듈이 상단 근처에 `from __future__ import generators` 라인을 포함해야 합니다 (자세한 내용은 PEP 236 참조). `future` 문 없이 `yield` 식별자를 사용하는 모듈은 경고를 발생시킵니다. 다음 릴리스에서는 `yield`가 언어 키워드가 되고 `future` 문은 더 이상 필요하지 않습니다.

`yield` 문은 함수 내부에서만 사용될 수 있습니다. `yield` 문을 포함하는 함수를 제너레이터 함수(generator function)라고 합니다. 제너레이터 함수는 모든 면에서 일반 함수 객체이지만, 코드 객체의 `co_flags` 멤버에 새로운 `CO_GENERATOR` 플래그가 설정됩니다.

제너레이터 함수가 호출될 때, 실제 인수는 일반적인 방식으로 함수-로컬(function-local) 형식 인자 이름에 바인딩되지만, 함수 본문의 코드는 실행되지 않습니다. 대신 제너레이터 이터레이터(generator-iterator) 객체가 반환됩니다. 이 객체는 이터레이터 프로토콜(iterator protocol)을 따르므로, 특히 `for` 루프에서 자연스럽게 사용될 수 있습니다. 의도가 문맥상 명확할 경우, "제너레이터(generator)"라는 이름은 제너레이터 함수 또는 제너레이터 이터레이터를 지칭하는 데 사용될 수 있습니다.

제너레이터 이터레이터의 `.next()` 메서드가 호출될 때마다, 제너레이터 함수의 본문 코드는 `yield` 또는 `return` 문(아래 참조)이 나올 때까지 또는 본문의 끝에 도달할 때까지 실행됩니다.

`yield` 문이 나오면 함수의 상태는 "정지(frozen)"되고, `expression_list`의 값은 `.next()` 호출자에게 반환됩니다. "정지"라는 것은 현재 로컬 변수 바인딩, 명령어 포인터, 내부 평가 스택을 포함한 모든 로컬 상태가 유지된다는 것을 의미합니다. 충분한 정보가 저장되어 다음에 `.next()`가 호출될 때, 함수는 `yield` 문이 마치 또 다른 외부 호출이었던 것처럼 정확하게 진행할 수 있습니다.

**제한:** `try/finally` 구성의 `try` 절에서는 `yield` 문이 허용되지 않습니다. 이는 제너레이터가 다시 재개될 것이라는 보장이 없으므로, `finally` 블록이 실행될 것이라는 보장도 없기 때문입니다. 이는 `finally`의 목적에 대한 너무 큰 위반입니다.

**제한:** 제너레이터는 활성 상태로 실행 중일 때는 재개될 수 없습니다.
```python
>>> def g():
... i = me.next()
... yield i
>>> me = g()
>>> me.next()
Traceback (most recent call last):
...
File "<string>", line 2, in g
ValueError: generator already executing
```

## 명세: Return (Specification: Return)

제너레이터 함수는 다음과 같은 형태의 `return` 문을 포함할 수도 있습니다.
`return`

제너레이터 본문 내의 `return` 문에서는 `expression_list`가 허용되지 않습니다 (물론, 제너레이터 내에 중첩된 비-제너레이터 함수의 본문에는 나타날 수 있습니다).

`return` 문이 나오면, 모든 함수 반환과 마찬가지로 제어가 진행되며, 적절한 `finally` 절(있는 경우)을 실행합니다. 그런 다음 `StopIteration` 예외가 발생하여 이터레이터가 소진되었음을 알립니다. 명시적인 `return` 없이 제어 흐름이 제너레이터 끝에 도달하는 경우에도 `StopIteration` 예외가 발생합니다.

`return`은 제너레이터 함수와 비-제너레이터 함수 모두에서 "나는 완료되었고, 반환할 흥미로운 것이 없다"는 의미를 가집니다.

`return`이 항상 `StopIteration`을 발생하는 것과 동등하지는 않습니다. 차이점은 둘러싼 `try/except` 구성이 처리되는 방식에 있습니다. 예를 들어:

```python
>>> def f1():
...     try:
...         return
...     except:
...         yield 1
>>> print(list(f1()))
[]
```
이는 어떤 함수에서와 마찬가지로 `return`이 단순히 종료하기 때문입니다. 하지만:

```python
>>> def f2():
...     try:
...         raise StopIteration
...     except:
...         yield 42
>>> print(list(f2()))
[42]
```
이는 `StopIteration`이 다른 예외와 마찬가지로 bare `except`에 의해 포착되기 때문입니다.

## 명세: 제너레이터와 예외 전파 (Specification: Generators and Exception Propagation)

`StopIteration`을 포함하되 이에 국한되지 않는, 처리되지 않은 예외가 제너레이터 함수에 의해 발생하거나 제너레이터 함수를 통과하는 경우, 예외는 일반적인 방식으로 호출자에게 전달되며, 이후 제너레이터 함수를 재개하려는 시도는 `StopIteration`을 발생시킵니다. 다시 말해, 처리되지 않은 예외는 제너레이터의 유효 수명을 종료시킵니다.

예시 (관용적이지 않지만 요점을 설명하기 위함):

```python
>>> def f():
...     return 1/0
>>> def g():
...     yield f() # 0으로 나누기 예외가 전파됩니다.
...     yield 42  # 여기에 도달하지 못합니다.
>>> k = g()
>>> k.next()
Traceback (most recent call last):
File "<stdin>", line 1, in ?
File "<stdin>", line 2, in g
File "<stdin>", line 2, in f
ZeroDivisionError: integer division or modulo by zero
>>> k.next() # 그리고 제너레이터는 재개될 수 없습니다.
Traceback (most recent call last):
File "<stdin>", line 1, in ?
StopIteration
>>>
```

## 명세: Try/Except/Finally (Specification: Try/Except/Finally)

앞서 언급했듯이, `try/finally` 구성의 `try` 절에서는 `yield`가 허용되지 않습니다. 결과적으로 제너레이터는 중요한 리소스를 매우 신중하게 할당해야 합니다. 그 외에는 `finally` 절, `except` 절 또는 `try/except` 구성의 `try` 절에 `yield`가 나타나는 데 제한이 없습니다.

```python
>>> def f():
...     try:
...         yield 1
...         try:
...             yield 2
...             1/0
...             yield 3 # 여기에 도달하지 못합니다.
...         except ZeroDivisionError:
...             yield 4
...             yield 5
...             raise
...         except:
...             yield 6
...             yield 7 # 위의 "raise"가 이것을 중단시킵니다.
...         except:
...             yield 8
...             yield 9
...         try:
...             x = 12
...         finally:
...             yield 10
...             yield 11
>>> print(list(f()))
[1, 2, 4, 5, 8, 9, 10, 11]
>>>
```

## 예시 (Example)

```python
# 이진 트리 클래스.
class Tree:
    def __init__(self, label, left=None, right=None):
        self.label = label
        self.left = left
        self.right = right

    def __repr__(self, level=0, indent=" "):
        s = level*indent + repr(self.label) # `self.label` 대신 repr(self.label)로 변경
        if self.left:
            s = s + "\n" + self.left.__repr__(level+1, indent)
        if self.right:
            s = s + "\n" + self.right.__repr__(level+1, indent)
        return s

    def __iter__(self):
        return inorder(self)

# 리스트에서 트리를 생성합니다.
def tree(list_data): # list_data로 변수명 변경
    n = len(list_data)
    if n == 0:
        return None # 빈 리스트일 때 None 반환하도록 수정
    i = n // 2 # 정수 나눗셈으로 변경
    return Tree(list_data[i], tree(list_data[:i]), tree(list_data[i+1:]))

# 트리의 레이블을 중위 순서(in-order)로 생성하는 재귀 제너레이터.
def inorder(t):
    if t:
        for x in inorder(t.left):
            yield x
        yield t.label
        for x in inorder(t.right):
            yield x

# 시연: 트리를 생성합니다.
t = tree("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

# 트리의 노드를 중위 순서로 출력합니다.
for x in t:
    print(x, end=' ') # print 문 수정
print()

# 비재귀 제너레이터.
def inorder_non_recursive(node): # 함수명 변경
    stack = []
    while node:
        while node.left:
            stack.append(node)
            node = node.left
        yield node.label
        while not node.right:
            try:
                node = stack.pop()
            except IndexError:
                return
            yield node.label
        node = node.right

# 비재귀 제너레이터를 실행합니다.
for x in inorder_non_recursive(t): # 함수명 변경
    print(x, end=' ') # print 문 수정
print()
```
두 출력 블록 모두 다음을 표시합니다.
`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`

## Q & A

### 왜 `def`를 재사용하는 대신 새로운 키워드를 사용하지 않았는가?
BDFL Pronouncements 섹션을 참조하십시오.

### 왜 `yield`에 새로운 키워드를 사용하는가? 빌트인 함수 대신에는 안 되는가?
파이썬에서 제어 흐름은 키워드를 통해 훨씬 잘 표현되며, `yield`는 제어 구조입니다. 또한 Jython에서 효율적인 구현을 위해서는 컴파일러가 컴파일 시간에 잠재적 중단점(suspension points)을 결정할 수 있어야 한다고 여겨지며, 새로운 키워드는 이를 쉽게 만듭니다. CPython 참조 구현 또한 이를 활용하여 어떤 함수가 제너레이터 함수인지 감지합니다.

### 그러면 새로운 키워드 없이 다른 특별한 구문은 안 되는가?
예를 들어, `yield 3` 대신 다음과 같은 것들을 생각해 볼 수 있습니다.
-   `return 3 and continue`
-   `return and continue 3`
-   `return generating 3`
-   `continue return 3`
-   `return >> , 3 from generator`
-   `return >> 3`
-   `return << 3`
-   `>> 3`
-   `<< 3 * 3`

수백 개의 메시지 중 세 가지만 이러한 대안을 제시했으며, 위 내용은 그중에서 발췌한 것입니다. 새로운 키워드가 필요 없는 것이 좋겠지만, `yield`를 매우 명확하게 만드는 것이 더 좋습니다. `yield`가 발생하는 것을 이전에는 의미 없던 키워드나 연산자의 시퀀스를 해석하여 추론하고 싶지 않습니다. 그래도 이것이 충분한 관심을 끈다면, 제안자들은 단일 합의 제안에 합의해야 하며, 귀도(Guido)가 그것에 대해 "선언(Pronounce)"할 것입니다.

### 왜 `return`을 아예 허용하는가? 왜 `raise StopIteration`으로 종료를 강제하지 않는가?
`StopIteration`의 메커니즘은 Python 2.1의 `IndexError` 메커니즘과 같이 저수준 세부 사항입니다. 구현은 내부적으로 잘 정의된 작업을 수행해야 하며, Python은 고급 사용자를 위해 이러한 메커니즘을 노출합니다. 그러나 이것이 모든 사람에게 그 수준에서 작업하도록 강제해야 한다는 주장은 아닙니다. `return`은 어떤 종류의 함수에서든 "나는 완료되었다"를 의미하며, 이는 설명하고 사용하기 쉽습니다. 또한, `return`이 `try/except` 구성에서 `raise StopIteration`과 항상 동등하지는 않습니다 ( "명세: Return" 섹션 참조).

### 그러면 `return`에도 표현식을 허용하지 않는가?
어쩌면 언젠가는 허용할 수도 있습니다. Icon에서는 `return expr`이 "나는 완료되었다"와 "하지만 반환할 최종적으로 유용한 값도 있고, 그것이 이것이다"라는 두 가지를 의미합니다. 초기 단계에서는 `return expr`에 대한 설득력 있는 사용 사례가 없으므로, 값을 전달하는 데 `yield`만 사용하는 것이 더 깔끔합니다.

## BDFL 선언 (BDFL Pronouncements)

**쟁점:** `def` 대신 `gen` 또는 `generator`와 같은 다른 새로운 키워드를 도입하거나 구문을 변경하여 제너레이터 함수를 비-제너레이터 함수와 구분해야 하는가.

**반대 (Con):** 실제로 (생각하는 방식에 따라), 제너레이터는 함수이지만, 재개 가능하다는 특징을 가집니다. 그것들이 어떻게 설정되는지에 대한 메커니즘은 비교적 사소한 기술적 문제이며, 새로운 키워드를 도입하는 것은 제너레이터가 시작되는 메커니즘(제너레이터 수명의 중요하지만 작은 부분)을 불필요하게 과도하게 강조할 것입니다.

**찬성 (Pro):** 현실적으로 (생각하는 방식에 따라), 제너레이터 함수는 마법처럼 제너레이터 이터레이터를 생성하는 팩토리 함수(factory functions)입니다. 이런 점에서 그것들은 비-제너레이터 함수와 근본적으로 다르며, 함수라기보다는 생성자처럼 작동하므로 `def`를 재사용하는 것은 기껏해야 혼란스럽습니다. 본문 내부에 숨겨진 `yield` 문만으로는 의미론이 그렇게 다르다는 것을 충분히 경고하지 못합니다.

**BDFL (Guido van Rossum):** `def`는 그대로 유지됩니다. 양측의 주장이 완전히 설득력 있는 것은 아니어서, 언어 설계자로서의 제 직관에 따라 결정했습니다. 제 직관은 이 PEP에서 제안된 구문이 정확히 맞다는 것을 알려줍니다. 너무 뜨겁지도, 너무 차갑지도 않습니다. 그러나 그리스 신화의 델피 신탁처럼, 왜 그런지는 알려주지 않으므로, PEP 구문에 반대하는 주장에 대한 반박은 없습니다. 제가 내놓을 수 있는 최선은 "FUD"(Fear, Uncertainty, Doubt - 공포, 불확실성, 의심)입니다. 만약 이것이 언어의 첫날부터 존재했다면, 앤드루 쿠클링(Andrew Kuchling)의 "Python Warts" 페이지에 실렸을 것이라고는 거의 의심하지 않습니다.

## 참조 구현 (Reference Implementation)
현재 구현은 예비 상태이지만 (문서는 없지만 잘 테스트되고 견고함), Python의 CVS 개발 트리의 일부입니다. 이를 사용하려면 소스에서 Python을 빌드해야 합니다. 이는 Neil Schemenauer의 이전 패치에서 파생되었습니다.

## 각주 및 참고 자료 (Footnotes and References)
 https://www.stackless.com/
 "Iteration Abstraction in Sather" Murer, Omohundro, Stoutamire and Szyperski http://www.icsi.berkeley.edu/~sather/Publications/toplas.html
 http://www.cs.arizona.edu/icon/
 http://python.ca/nas/python/generator.diff
 이 구현을 실험하려면 http://sf.net/cvs/?group_id=5470 지침에 따라 CVS에서 Python을 체크아웃하십시오. 표준 테스트 `Lib/test/test_generators.py`에는 이 PEP의 모든 예제를 포함한 많은 예제가 있습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.