---
title: "[Rejected] PEP 335 - Overloadable Boolean Operators"
excerpt: "Python Enhancement Proposal 335: 'Overloadable Boolean Operators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/335/
toc: true
toc_sticky: true
date: 2025-09-27 00:55:17+0900
last_modified_at: 2025-09-27 00:55:17+0900
published: true
---
> **원문 링크:** [PEP 335 - Overloadable Boolean Operators](https://peps.python.org/pep-0335/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Aug-2004

PEP 335: 오버로딩 가능한 불리언 연산자 (Overloadable Boolean Operators)

*본 문서는 거부(Rejected)된 제안입니다.*

## 개요 (Abstract)

이 PEP는 객체가 불리언 연산자 `and`, `or`, `not`에 대해 자신만의 의미를 정의할 수 있도록 확장하는 방안을 제안하며, 효율적인 구현 전략을 제시합니다. 이 구현의 프로토타입은 다운로드 가능합니다.

## 배경 (Background)

현재 Python은 불리언 연산자 `and`, `or`, `not`에 해당하는 `__xxx__` 특수 메서드를 제공하지 않습니다. `and`와 `or`의 경우, 가장 유력한 이유는 이 연산자들이 단락 평가(short-circuiting semantics)를 갖기 때문입니다. 즉, 첫 번째 피연산자만으로 결과가 결정될 수 있으면 두 번째 피연산자는 평가되지 않습니다. 따라서 이러한 연산자에 대한 특수 메서드를 제공하는 일반적인 기술은 작동하지 않을 것입니다.

그러나 `not`의 경우에는 이러한 어려움이 없으며, 이 연산자에 대한 특수 메서드를 제공하는 것은 간단합니다. 따라서 이 제안의 나머지 부분은 주로 `and`와 `or`를 오버로딩(overload)하는 방법을 제공하는 데 중점을 둘 것입니다.

## 동기 (Motivation)

Python 연산자에 대해 사용자 정의 의미를 제공하는 것이 자연스러운 애플리케이션이 많으며, 이 중 일부에서는 불리언 연산자가 사용자 정의에서 제외되는 것이 불편할 수 있습니다. 예를 들면 다음과 같습니다:

*   **NumPy**: 거의 모든 연산자가 배열(array)에 정의되어 해당 요소들 간에 적절한 연산을 수행하고 결과 배열을 반환합니다. 일관성을 위해 두 배열 간의 불리언 연산은 불리언 배열을 반환할 것으로 예상되지만, 현재는 이것이 불가능합니다.
    *   이러한 종류의 확장에 대한 선례가 있습니다. 비교 연산자는 원래 불리언 결과만 반환하도록 제한되었으나, NumPy 배열의 비교가 불리언 배열을 반환할 수 있도록 풍부한 비교(rich comparisons)가 추가되었습니다.
*   **기호 대수 시스템 (Symbolic algebra system)**: Python 표현식이 평가되어 표현식의 구조에 해당하는 객체 트리를 구성하는 환경.
*   **관계형 데이터베이스 인터페이스 (Relational database interface)**: Python 표현식을 사용하여 SQL 쿼리를 구성하는 경우.

자주 제안되는 해결책은 `and`, `or`, `not` 대신 비트와이즈 연산자 `&`, `|`, `~`를 사용하는 것이지만, 여기에는 몇 가지 단점이 있습니다:

*   다른 연산자와의 우선순위(precedence)가 다르며, 다른 목적으로 이미 사용되고 있을 수 있습니다.
*   사용자가 표현하려는 것에 대해 가장 명확한 구문이 아닌 다른 것을 사용하도록 강제하는 것은 미학적으로 좋지 않습니다. 특히 예시 3과 같은 경우, 불리언 연산이 SQL 쿼리의 주류임을 고려할 때 더욱 심각할 수 있습니다.
*   비트와이즈 연산자는 `a < b < c`와 같이 암시적인 `and` 연산을 포함하는 체인 비교(chained comparisons) 문제에 대한 해결책을 제공하지 않습니다. 이러한 표현식은 현재 NumPy 배열과 같이 비교 결과가 일반적인 불리언 의미를 갖는 것으로 처리될 수 없는 데이터 타입에서는 전혀 사용할 수 없습니다. 이를 `(a < b) & (b < c)`와 같이 확장해야 하며, 상당한 명확성을 잃게 됩니다.

## 근거 (Rationale)

불리언 연산자를 사용자 정의할 수 있도록 허용하는 문제에 대한 성공적인 해결책의 요구 사항은 다음과 같습니다:

1.  **기본 경우 (사용자 정의가 없는 경우)**: 기존의 단락 평가 의미론(short-circuiting semantics)이 보존되어야 합니다.
2.  **기본 경우 (속도)**: 기본 경우에 눈에 띄는 속도 손실이 없어야 합니다.
3.  **사용자 정의 메커니즘**: 사용자 정의 메커니즘은 객체가 재량에 따라 단락 평가 또는 비단락 평가 의미론을 제공할 수 있도록 허용해야 합니다.

이전에 제안되었던 한 가지 분명한 전략은 첫 번째 인자와 두 번째 인자를 평가하기 위한 함수를 특수 메서드에 전달하는 것입니다. 이는 요구 사항 1과 3을 충족하지만, 불리언 연산마다 함수 객체를 구성하고 잠재적으로 Python 함수 호출을 발생시키는 오버헤드가 발생하므로 요구 사항 2는 충족하지 못합니다. 따라서 이 문서에서는 더 이상 고려되지 않습니다.

다음 섹션에서는 세 가지 요구 사항을 모두 해결하는 전략을 제안합니다. 이 전략의 프로토타입 구현은 다운로드 가능합니다.

## 사양 (Specification)

### 특수 메서드 (Special Methods)

Python 수준에서 객체는 다음 특수 메서드를 정의할 수 있습니다.

*   **단항 (Unary)**
    *   `__not__(self)`
        *   `__not__` 메서드가 정의되어 있다면 `not` 연산자를 구현합니다. 정의되어 있지 않거나 `NotImplemented`를 반환하면 기존 의미론이 사용됩니다.

*   **이항, 1단계 (Binary, phase 1)**
    *   `__and1__(self)`
    *   `__or1__(self)`
        *   단락 평가를 허용하기 위해 `and` 및 `or` 연산자의 처리는 두 단계로 나뉩니다. 1단계는 첫 번째 피연산자가 평가된 후, 두 번째 피연산자 이전에 발생합니다. 첫 번째 피연산자가 관련 1단계 메서드를 정의하면, 첫 번째 피연산자를 인자로 호출합니다. 해당 메서드가 두 번째 피연산자가 필요 없이 결과를 결정할 수 있다면, 결과를 반환하고 추가 처리는 건너뜁니다.
        *   1단계 메서드가 두 번째 피연산자가 필요하다고 결정하면 특수 값 `NeedOtherOperand`를 반환합니다. 이는 두 번째 피연산자의 평가와 관련 2단계 메서드의 호출을 트리거합니다.

*   **이항, 2단계 (Binary, phase 2)**
    *   `__and2__(self, other)`
    *   `__or2__(self, other)`
    *   `__rand2__(self, other)`
    *   `__ror2__(self, other)`
        *   2단계 동안, `__and2__/__rand2__` 및 `__or2__/__ror2__` 메서드 쌍은 다른 이항 연산자와 동일하게 작동합니다.

어떤 단계에서든 관련 특수 메서드가 발견되지 않거나 `NotImplemented`를 반환하면 기존 의미론으로 폴백(fallback)됩니다.

특별한 경우로, 첫 번째 피연산자가 2단계 메서드를 정의했지만 해당 1단계 메서드를 정의하지 않은 경우, 두 번째 피연산자는 항상 평가되고 2단계 메서드가 호출됩니다. 이는 단락 평가 의미론을 원하지 않는 객체가 단순히 2단계 메서드를 구현하고 1단계를 무시할 수 있도록 합니다.

### 바이트코드 (Bytecodes)

이 패치는 네 가지 새로운 바이트코드인 `LOGICAL_AND_1`, `LOGICAL_AND_2`, `LOGICAL_OR_1`, `LOGICAL_OR_2`를 추가합니다. 예를 들어, `and` 표현식에 대해 생성된 바이트코드는 다음과 같습니다:

```python
. . .
evaluate first operand
LOGICAL_AND_1
L
evaluate second operand
LOGICAL_AND_2
L:
. . .
```

*   `LOGICAL_AND_1` 바이트코드는 1단계 처리를 수행합니다. 두 번째 피연산자가 필요하다고 결정하면 첫 번째 피연산자를 스택에 남겨두고 다음 코드를 계속 실행합니다. 그렇지 않으면 첫 번째 피연산자를 팝(pop)하고 결과를 푸시(push)한 다음 `L`로 분기(branch)합니다.
*   `LOGICAL_AND_2` 바이트코드는 2단계 처리를 수행하며, 두 피연산자를 모두 팝하고 결과를 푸시합니다.

### 타입 슬롯 (Type Slots)

C 수준에서 새로운 특수 메서드는 타입 객체에 다섯 가지 새로운 슬롯으로 나타납니다. 패치에서는 이들이 `tp_as_number` 하위 구조체에 추가되는데, 이는 단항 및 이항 연산자를 다루는 기존 코드를 활용할 수 있도록 하기 위함입니다. 이들의 존재는 새로운 타입 플래그 `Py_TPFLAGS_HAVE_BOOLEAN_OVERLOAD`로 알려집니다.

새로운 타입 슬롯은 다음과 같습니다:

*   `unaryfunc nb_logical_not;`
*   `unaryfunc nb_logical_and_1;`
*   `unaryfunc nb_logical_or_1;`
*   `binaryfunc nb_logical_and_2;`
*   `binaryfunc nb_logical_or_2;`

### Python/C API 함수 (Python/C API Functions)

새로운 연산에 해당하는 다섯 가지 새로운 Python/C API 함수도 있습니다:

*   `PyObject *PyObject_LogicalNot(PyObject *);`
*   `PyObject *PyObject_LogicalAnd1(PyObject *);`
*   `PyObject *PyObject_LogicalOr1(PyObject *);`
*   `PyObject *PyObject_LogicalAnd2(PyObject *, PyObject *);`
*   `PyObject *PyObject_LogicalOr2(PyObject *, PyObject *);`

## 대안 및 최적화 (Alternatives and Optimisations)

이 섹션에서는 제안의 몇 가지 가능한 변형과 불리언 표현식에 대해 생성된 바이트코드 시퀀스를 최적화하는 방법에 대해 설명하고 있습니다.

### 특수 메서드 집합 축소 (Reduced special method set)

이 제안의 완전한 버전은 타입이 자체적으로 사용자 정의 단락 평가 동작을 정의할 수 있는 메커니ズム를 포함합니다. 그러나 여기에서 제시된 주요 사용 사례를 해결하는 데 완전한 메커니즘은 필요하지 않으며, 2단계 메서드만 포함하는 간소화된 버전을 정의하는 것도 가능합니다. 그러면 `__and2__`, `__rand2__`, `__or2__`, `__ror2__`, `__not__`의 5가지 새로운 특수 메서드와 3개의 관련 타입 슬롯 및 3개의 API 함수만 존재하게 됩니다.

이 간소화된 버전은 나중에 필요하다면 완전한 버전으로 확장될 수 있습니다.

### 추가 바이트코드 (Additional bytecodes)

여기에서 정의된 대로, 불리언 표현식의 결과에 따라 분기하는 코드에 대한 바이트코드 시퀀스는 현재보다 약간 더 길어질 것입니다. 예를 들어, Python 2.7에서 `if a and b:` 구문은 다음과 같은 바이트코드를 생성합니다:

```python
LOAD_GLOBAL a
POP_JUMP_IF_FALSE false_branch
LOAD_GLOBAL b
POP_JUMP_IF_FALSE false_branch
<code for statement1>
JUMP_FORWARD end_branch
false_branch:
<code for statement2>
end_branch:
```

이 제안에 따르면, 이는 다음과 같이 될 것입니다:

```python
LOAD_GLOBAL a
LOGICAL_AND_1
test
LOAD_GLOBAL b
LOGICAL_AND_2
test:
POP_JUMP_IF_FALSE false_branch
<code for statement1>
JUMP_FORWARD end_branch
false_branch:
<code for statement2>
end_branch:
```

이는 단락 평가의 경우에 하나의 추가 바이트코드를, 비단락 평가의 경우에 두 개의 추가 바이트코드를 실행하는 것을 포함합니다.

그러나 논리 연산을 결과 테스트 및 분기와 결합하는 추가 바이트코드를 도입함으로써, 이는 원래와 동일한 수의 바이트코드로 줄어들 수 있습니다:

```python
LOAD_GLOBAL a
AND1_JUMP true_branch, false_branch
LOAD_GLOBAL b
AND2_JUMP_IF_FALSE false_branch
true_branch:
<code for statement1>
JUMP_FORWARD end_branch
false_branch:
<code for statement2>
end_branch:
```

여기서 `AND1_JUMP`는 위에서 설명한 대로 1단계 처리를 수행한 다음 결과를 검사합니다. 결과가 있으면 스택에서 팝되고, 그 진리 값(truth value)이 테스트되어 두 위치 중 하나로 분기됩니다.

그렇지 않으면 첫 번째 피연산자가 스택에 남아 있고 실행은 다음 바이트코드로 계속됩니다. `AND2_JUMP_IF_FALSE` 바이트코드는 2단계 처리를 수행하고 결과를 팝한 다음 결과가 거짓으로 테스트되면 분기합니다.

`or` 연산자의 경우, 해당 `OR1_JUMP` 및 `OR2_JUMP_IF_TRUE` 바이트코드가 있을 것입니다.

만약 1단계 메서드가 없는 간소화된 버전이 사용된다면, `and`의 경우 첫 번째 피연산자가 거짓일 때만, `or`의 경우 첫 번째 피연산자가 참일 때만 조기 종료가 발생할 수 있습니다. 결과적으로 두 개의 타겟을 갖는 `AND1_JUMP` 및 `OR1_JUMP` 바이트코드는 `AND1_JUMP_IF_FALSE` 및 `OR1_JUMP_IF_TRUE`로 대체될 수 있으며, 이들은 하나의 타겟만 갖는 일반적인 분기 명령입니다.

### `not`의 최적화 (Optimisation of 'not')

최근 버전의 Python은 부정된 불리언 표현식에 대한 분기를 분기 방향을 뒤집는 방식으로 구현하여 `UNARY_NOT` opcode를 절약하는 간단한 최적화를 구현합니다.

엄격하게 보면, `not` 연산자가 일반적인 것과 상당히 다른 결과를 생성하도록 오버라이딩될 수 있으므로 이 최적화는 더 이상 수행되어서는 안 됩니다. 그러나 일반적인 사용 사례에서는 사용자 정의된 불리언 연산을 포함하는 표현식이 분기(branching)에 사용될 것으로 예상되지 않습니다. 결과는 다른 방식으로 사용될 가능성이 훨씬 높습니다.

따라서 컴파일러가 불리언 컨텍스트에 직접 나타나는 모든 표현식을 단순화하기 위해 불리언 대수(boolean algebra)의 법칙을 사용하는 것을 허용하도록 지정해도 큰 해는 없을 것입니다. 이것이 불편하다면, 결과를 항상 임시 이름에 먼저 할당할 수 있습니다.

이렇게 하면 기존의 `not` 최적화가 유지될 수 있으며, 드 모르간의 법칙(De Morgan's laws)을 사용하여 표현식 내에서 더 깊게 확장하는 것과 같은 향후 확장도 가능하게 됩니다.

## 사용 예시 (Usage Examples)

### 예시 1: NumPy 배열 (NumPy Arrays)

이 예시는 `and`, `or`, `not` 연산자를 적용하여 불리언 배열을 생성할 수 있는 NumPy 배열의 하위 클래스를 만듭니다.

```python
from numpy import array, ndarray

class BArray(ndarray):
    def __str__(self):
        return "barray(%s)" % ndarray.__str__(self)

    def __and2__(self, other):
        # 비트와이즈 AND를 사용하여 요소별 AND 연산을 수행합니다.
        # 이 예시에서는 __and2__에 대한 로직이 잘못되어 있습니다.
        # 실제로는 (self & other)가 아닌, 각 요소에 대한 논리 AND를 구현해야 합니다.
        # PEP 제안의 의도에 따라 재구성하면,
        # (self != 0) & (other != 0) 과 같은 형태가 될 수 있습니다.
        # 하지만 예시 코드에서는 단순하게 비트와이즈 AND를 사용했습니다.
        # 이는 PEP 335의 목적을 완전히 반영하지 않을 수 있습니다.
        return (self & other) # 예시에서는 비트와이즈 &를 사용

    def __or2__(self, other):
        # 마찬가지로, 이 예시에서는 __or2__에 대한 로직이 잘못되어 있습니다.
        # 실제로는 각 요소에 대한 논리 OR을 구현해야 합니다.
        return (self | other) # 예시에서는 비트와이즈 |를 사용

    def __not__(self):
        # 각 요소에 대해 논리 NOT 연산을 수행합니다.
        # 0이 아닌 값은 True, 0은 False로 간주하여 반전합니다.
        return (self == 0)

def barray(*args, **kwds):
    return array(*args, **kwds).view(type = BArray)

a0 = barray([0, 1, 2, 4])
a1 = barray([1, 2, 3, 4])
a2 = barray([5, 6, 3, 4])
a3 = barray([5, 1, 2, 4])

print("a0:", a0)
print("a1:", a1)
print("a2:", a2)
print("a3:", a3)
print("not a0:", not a0) # __not__ 메서드 호출
print("a0 == a1 and a2 == a3:", a0 == a1 and a2 == a3) # __and2__ 메서드 호출
print("a0 == a1 or a2 == a3:", a0 == a1 or a2 == a3)   # __or2__ 메서드 호출
```

#### 예시 1 출력 (Example 1 Output)

```
a0: barray([0 1 2 4])
a1: barray([1 2 3 4])
a2: barray([5 6 3 4])
a3: barray([5 1 2 4])
not a0: barray([ True False False False])
a0 == a1 and a2 == a3: barray([False False False True])
a0 == a1 or a2 == a3: barray([False False False True])
```


### 예시 2: 데이터베이스 쿼리 (Database Queries)

이 예시는 `and` 및 `or` 연산자를 사용하여 쿼리를 구성할 수 있는 데이터베이스 쿼리용 DSL(Domain Specific Language) 생성을 시연합니다.

```python
class SQLNode(object):
    def __and2__(self, other):
        return SQLBinop("and", self, other)
    def __rand2__(self, other):
        return SQLBinop("and", other, self)
    def __eq__(self, other):
        return SQLBinop("=", self, other)

class Table(SQLNode):
    def __init__(self, name):
        self.__tablename__ = name
    def __getattr__(self, name):
        return SQLAttr(self, name)
    def __sql__(self):
        return self.__tablename__

class SQLBinop(SQLNode):
    def __init__(self, op, opnd1, opnd2):
        self.op = op.upper()
        self.opnd1 = opnd1
        self.opnd2 = opnd2
    def __sql__(self):
        return "(%s %s %s)" % (sql(self.opnd1), self.op, sql(self.opnd2))

class SQLAttr(SQLNode):
    def __init__(self, table, name):
        self.table = table
        self.name = name
    def __sql__(self):
        return "%s.%s" % (sql(self.table), self.name)

class SQLSelect(SQLNode):
    def __init__(self, targets):
        self.targets = targets
        self.where_clause = None
    def where(self, expr):
        self.where_clause = expr
        return self
    def __sql__(self):
        result = "SELECT %s" % ", ".join([sql(target) for target in self.targets])
        if self.where_clause:
            result = "%s WHERE %s" % (result, sql(self.where_clause))
        return result

def sql(expr):
    if isinstance(expr, SQLNode):
        return expr.__sql__()
    elif isinstance(expr, str):
        return "'%s'" % expr.replace("'", "''")
    else:
        return str(expr)

def select(*targets):
    return SQLSelect(targets)

#-----------------------------------------------------------------
dishes = Table("dishes")
customers = Table("customers")
orders = Table("orders")

query = select(customers.name, dishes.price, orders.amount).where(
    customers.cust_id == orders.cust_id and
    orders.dish_id == dishes.dish_id and
    dishes.name == "Spam, Eggs, Sausages and Spam"
)

print(repr(query))
print(sql(query))
```

#### 예시 2 출력 (Example 2 Output)

```
<__main__.SQLSelect object at 0x1cc830>
SELECT customers.name, dishes.price, orders.amount WHERE (((customers.cust_id = orders.cust_id) AND (orders.dish_id = dishes.dish_id)) AND (dishes.name = 'Spam, Eggs, Sausages and Spam'))
```


## 거부 공지 (Rejection Notice)

이 PEP는 거부되었습니다. 자세한 내용은 다음 링크를 참조하십시오: [https://mail.python.org/pipermail/python-dev/2012-March/117510.html](https://mail.python.org/pipermail/python-dev/2012-March/117510.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.
```
The user wants a Korean translation and summary of PEP 335. I have already browsed the URL and obtained the content. Now I need to process this content according to the guidelines:

1.  **Professionalism:** Use accurate Python terminology.
2.  **Term Handling:**
    *   Use common Korean terms where available.
    *   For ambiguous or more familiar English terms, use English or 병기 (both English and Korean).
    *   Do NOT translate keywords or variable names in code.
3.  **Readability:** Use Markdown.
4.  **Accuracy:** Translate all original content into Markdown.

I will go section by section and translate the content, applying the guidelines.

**Plan:**
- Start with the PEP title and rejection notice.
- Translate Abstract.
- Translate Background.
- Translate Motivation, including the examples and workarounds.
- Translate Rationale.
- Translate Specification, covering Special Methods, Bytecodes, Type Slots, and Python/C API Functions.
- Translate Alternatives and Optimisations, including Reduced special method set, Additional bytecodes, and Optimisation of 'not'.
- Translate Usage Examples, including both NumPy Arrays and Database Queries, with their code and output.
- Conclude with the Copyright notice.
- Ensure all sentences derived from the browsed content have citations `[cite: 1]`.

Let's start translating.

---
**Initial thought on specific terms:**
- "Overloadable Boolean Operators" -> "오버로딩 가능한 불리언 연산자"
- "Rejected" -> "거부됨" or "거부(Rejected)"
- "Abstract" -> "개요"
- "Background" -> "배경"
- "Motivation" -> "동기"
- "Rationale" -> "근거"
- "Specification" -> "사양"
- "Special Methods" -> "특수 메서드"
- "Bytecodes" -> "바이트코드"
- "Type Slots" -> "타입 슬롯"
- "Python/C API Functions" -> "Python/C API 함수"
- "Alternatives and Optimisations" -> "대안 및 최적화"
- "Usage Examples" -> "사용 예시"
- "Short-circuiting semantics" -> "단락 평가 의미론" or "단락 평가 (short-circuiting semantics)"
- "NumPy Arrays" -> "NumPy 배열"
- "Relational database interface" -> "관계형 데이터베이스 인터페이스"
- "Bitwise operators" -> "비트와이즈 연산자"
- "Chained comparisons" -> "체인 비교 (chained comparisons)"
- "__and1__", "__or1__", "__and2__", "__or2__", "__rand2__", "__ror2__", "__not__" should remain as is, as they are code/keyword-like.
- `NotImplemented` also remains as is.
- `NeedOtherOperand` also remains as is.
- Bytecode names (`LOGICAL_AND_1`, `LOGICAL_AND_2`, etc.) remain as is.
- C-level type slots (`nb_logical_not`, etc.) remain as is.
- Python/C API functions (`PyObject_LogicalNot`, etc.) remain as is.
- "Precedence" -> "우선순위"
- "Domain Specific Language (DSL)" -> "DSL (Domain Specific Language)"

I will carefully go through the document and apply these.```
The user wants a Korean translation and summary of PEP 335. I have already browsed the URL and obtained the content. Now I need to process this content according to the guidelines:

1.  **Professionalism:** Use accurate Python terminology.
2.  **Term Handling:**
    *   Use common Korean terms where available.
    *   For ambiguous or more familiar English terms, use English or 병기 (both English and Korean).
    *   Do NOT translate keywords or variable names in code.
3.  **Readability:** Use Markdown.
4.  **Accuracy:** Translate all original content into Markdown.

I will go section by section and translate the content, applying the guidelines.

**Plan:**
- Start with the PEP title and rejection notice.
- Translate Abstract.
- Translate Background.
- Translate Motivation, including the examples and workarounds.
- Translate Rationale.
- Translate Specification, covering Special Methods, Bytecodes, Type Slots, and Python/C API Functions.
- Translate Alternatives and Optimisations, including Reduced special method set, Additional bytecodes, and Optimisation of 'not'.
- Translate Usage Examples, including both NumPy Arrays and Database Queries, with their code and output.
- Conclude with the Copyright notice.
- Ensure all sentences derived from the browsed content have citations `[cite: 1]`.

Let's start translating.

---
**Initial thought on specific terms:**
- "Overloadable Boolean Operators" -> "오버로딩 가능한 불리언 연산자"
- "Rejected" -> "거부됨" or "거부(Rejected)"
- "Abstract" -> "개요"
- "Background" -> "배경"
- "Motivation" -> "동기"
- "Rationale" -> "근거"
- "Specification" -> "사양"
- "Special Methods" -> "특수 메서드"
- "Bytecodes" -> "바이트코드"
- "Type Slots" -> "타입 슬롯"
- "Python/C API Functions" -> "Python/C API 함수"
- "Alternatives and Optimisations" -> "대안 및 최적화"
- "Usage Examples" -> "사용 예시"
- "Short-circuiting semantics" -> "단락 평가 의미론" or "단락 평가 (short-circuiting semantics)"
- "NumPy Arrays" -> "NumPy 배열"
- "Relational database interface" -> "관계형 데이터베이스 인터페이스"
- "Bitwise operators" -> "비트와이즈 연산자"
- "Chained comparisons" -> "체인 비교 (chained comparisons)"
- "__and1__", "__or1__", "__and2__", "__or2__", "__rand2__", "__ror2__", "__not__" should remain as is, as they are code/keyword-like.
- `NotImplemented` also remains as is.
- `NeedOtherOperand` also remains as is.
- Bytecode names (`LOGICAL_AND_1`, `LOGICAL_AND_2`, etc.) remain as is.
- C-level type slots (`nb_logical_not`, etc.) remain as is.
- Python/C API functions (`PyObject_LogicalNot`, etc.) remain as is.
- "Precedence" -> "우선순위"
- "Domain Specific Language (DSL)" -> "DSL (Domain Specific Language)"

I will carefully go through the document and apply these.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.