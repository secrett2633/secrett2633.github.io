---
title: "[Withdrawn] PEP 379 - Adding an Assignment Expression"
excerpt: "Python Enhancement Proposal 379: 'Adding an Assignment Expression'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/379/
toc: true
toc_sticky: true
date: 2025-09-26 21:01:34+0900
last_modified_at: 2025-09-26 21:01:34+0900
published: true
---
> **원문 링크:** [PEP 379 - Adding an Assignment Expression](https://peps.python.org/pep-0379/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 14-Mar-2009


**작성자:** Jervis Whitley <jervisau at gmail.com>
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2009년 3월 14일
**Python 버전:** 2.7, 3.2
**이력:** (내용 없음)

---

### 개요 (Abstract)

이 PEP는 Python 언어에 새로운 할당 표현식을 추가하여, 거의 모든 곳에서 표현식의 결과를 할당할 수 있도록 제안합니다. 이 새로운 표현식은 표현식의 결과를 처음 사용할 때(예: 비교문에서) 할당하는 것을 가능하게 합니다.

### 동기 및 요약 (Motivation and Summary)

"if something as x:"이라는 `Issue1714448`은 `if` 문에서 표현식의 결과를 이름에 할당하는 기능을 설명합니다. 이 기능은 `as` 문법을 차용할 수 있다고 가정했습니다. 그러나 많은 경우, 흥미로운 것은 표현식 자체보다는 표현식을 구성하는 항 중 하나입니다. 예를 들어, 다음 코드는 매우 제한적으로 보입니다.

```python
if (f_result() == [1, 2, 3]) as res:
```

아마도 원하는 결과는 다음과 같을 것입니다.

```python
if (f_result() as res) == [1, 2, 3]:
```

### 사용 사례 (Use Cases)

자세한 내용은 후반부의 "예시 (Examples)" 섹션을 참조하십시오.

### 명세 (Specification)

새로운 표현식은 다음과 같은 (명목상의) 문법으로 제안됩니다.

```
EXPR -> VAR
```

이 단일 표현식은 다음을 수행합니다.

1.  임의의 표현식인 `EXPR`의 값을 평가합니다.
2.  결과를 단일 할당 대상인 `VAR`에 할당합니다.
3.  `EXPR`의 결과를 스택의 최상단(Top of Stack, TOS)에 남겨둡니다.

여기서 `->` 또는 `RARROW`는 `EXPR`의 결과가 `VAR`에 할당된다는 개념을 설명하는 데 사용되었습니다.

제안된 문법의 번역(컴파일 시 내부적으로 처리되는 방식)은 다음과 같습니다.

```python
VAR = (EXPR)
(EXPR)
```

할당 대상은 어트리뷰트(attribute), 서브스크립트(subscript) 또는 이름(name)이 될 수 있습니다.

```python
f() -> name[0] # 'name'은 이전에 존재해야 합니다.
f() -> name.attr # 마찬가지로 'name'은 이 표현식 이전에 존재해야 합니다.
f() -> name
```

이 표현식은 현재 표현식이 허용되는 모든 곳에서 사용 가능해야 합니다.

현재 유효하지 않은 할당 중에 발생하는 모든 예외는 할당 표현식을 사용할 때도 계속 발생합니다. 예를 들어, 위 예시 1과 2에서 `name`이 이전에 정의되지 않았다면 `NameError`가 발생하거나, 인덱스 0이 범위를 벗어났다면 `IndexError`가 발생할 것입니다.

### 표준 라이브러리 예시 (Examples from the Standard Library)

다음 두 예시는 표준 라이브러리를 간략히 탐색한 후 선택되었으며, 모두 검색 당시 열려 있던 `ast.py` 파일에서 가져왔습니다.

**원본:**

```python
def walk(node):
    from collections import deque
    todo = deque([node])
    while todo:
        node = todo.popleft()
        todo.extend(iter_child_nodes(node))
        yield node
```

**할당 표현식 사용:**

```python
def walk(node):
    from collections import deque
    todo = deque([node])
    while todo:
        todo.extend(iter_child_nodes(todo.popleft() -> node))
        yield node
```

**원본:**

```python
def get_docstring(node, clean=True):
    if not isinstance(node, (FunctionDef, ClassDef, Module)):
        raise TypeError("%r can't have docstrings" % node.__class__.__name__)
    if node.body and isinstance(node.body[0], Expr) and \
       isinstance(node.body[0].value, Str):
        if clean:
            import inspect
            return inspect.cleandoc(node.body[0].value.s)
        return node.body[0].value.s
```

**할당 표현식 사용:**

```python
def get_docstring(node, clean=True):
    if not isinstance(node, (FunctionDef, ClassDef, Module)):
        raise TypeError("%r can't have docstrings" % node.__class__.__name__)
    if node.body -> body and isinstance(body[0] -> elem, Expr) and \
       isinstance(elem.value -> value, Str):
        if clean:
            import inspect
            return inspect.cleandoc(value.s)
        return value.s
```

### 예시 (Examples)

아래 예시들은 할당 표현식의 몇 가지 바람직한 기능과 가능한 코너 케이스(corner cases)를 보여줍니다.

**`if` 문 내에서 나중에 사용하기 위한 할당:**

```python
def expensive():
    import time; time.sleep(1)
    return 'spam'

if expensive() -> res in ('spam', 'eggs'):
    dosomething(res)
```

**`while` 루프 절(clause) 내에서의 할당:**

```python
while len(expensive() -> res) == 4:
    dosomething(res)
```

**`for` 루프에서 이터레이터(iterator) 객체 유지:**

```python
for ch in expensive() -> res:
    sell_on_internet(res)
```

**코너 케이스 (Corner case):**

```python
for ch -> please_dont in expensive():
    pass # 누가 이런 식으로 쓰고 싶어할까요? 저는 아닙니다.
```

### 결론 (Impact on Python Usage)

PEP 379는 표현식의 결과를 변수에 할당하는 동시에 해당 결과를 다른 표현식에서 즉시 사용할 수 있도록 하여 코드의 간결성과 가독성을 향상시키려는 시도였습니다. 특히, 함수 호출 결과를 여러 번 사용해야 하지만 한 번만 계산하고 싶을 때 유용할 수 있었습니다. 하지만 이 PEP는 "철회됨(Withdrawn)" 상태로, Python 언어에 공식적으로 추가되지 않았습니다.

이 제안과 유사한 개념은 나중에 Python 3.8에 도입된 Walrus Operator (할당 표현식 `:=`)를 통해 실현되었습니다. Walrus Operator는 PEP 379와 달리 `->` 대신 `:=`를 사용하여 표현식 내에서 이름에 값을 할당하고 그 값을 반환하는 기능을 제공합니다.

따라서 PEP 379는 직접적으로 Python 사용에 영향을 미치지는 않았지만, 코드 중복을 줄이고 특정 패턴의 코드를 더 간결하게 만들려는 Python 커뮤니티의 오랜 요구 사항을 보여주는 중요한 이정표였습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.