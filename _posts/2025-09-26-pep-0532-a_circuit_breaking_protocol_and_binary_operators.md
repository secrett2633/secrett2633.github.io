---
title: "[Deferred] PEP 532 - A circuit breaking protocol and binary operators"
excerpt: "Python Enhancement Proposal 532: 'A circuit breaking protocol and binary operators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/532/
toc: true
toc_sticky: true
date: 2025-09-26 23:23:40+0900
last_modified_at: 2025-09-26 23:23:40+0900
published: true
---
> **원문 링크:** [PEP 532 - A circuit breaking protocol and binary operators](https://peps.python.org/pep-0532/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 30-Oct-2016

# PEP 532 – 회로 차단(Circuit Breaking) 프로토콜 및 이항(Binary) 연산자

## PEP 연기 (PEP Deferral)
이 PEP에 대한 추가 검토는 최소한 Python 3.8까지 연기되었습니다.

## 요약 (Abstract)
PEP 335, PEP 505, PEP 531 및 관련 논의에서 영감을 받은 이 PEP는 새로운 "회로 차단(circuit breaking)" 프로토콜(메서드 이름 `__then__` 및 `__else__` 사용)의 정의를 제안합니다. 이 프로토콜은 다음을 위한 공통적인 기본 의미론적 기반을 제공합니다.

*   조건부 표현식(conditional expressions): `LHS if COND else RHS`
*   논리적 AND 연산: `LHS and RHS`
*   논리적 OR 연산: `LHS or RHS`
*   PEP 505에서 제안된 None-aware 연산자
*   PEP 535에서 제안된 풍부한 비교 체인 모델

새로운 프로토콜을 활용하여, 조건부 표현식의 정의를 수정하여 `if`와 `else`를 각각 우측 결합(right-associative) 및 좌측 결합(left-associative)의 범용 단락(short-circuiting) 연산자로 사용할 수 있도록 제안합니다.

*   우측 결합 단락: `LHS if RHS`
*   좌측 결합 단락: `LHS else RHS`

논리적 반전(`not EXPR`)을 위의 변경 사항과 일관되게 만들기 위해 새로운 논리적 반전 프로토콜(메서드 이름 `__not__` 사용) 도입을 제안합니다.

회로 차단기의 단락 동작을 강제하기 위해 표현식을 두 번 평가할 필요 없이 `operator` 모듈에 새로운 `operator.short_circuit(obj)` 헬퍼 함수가 추가될 예정입니다.

마지막으로, 객체의 참/거짓 값(제어 흐름을 결정하는 데 사용됨)을 단락된 회로 차단 표현식에서 반환하는 값과 분리하기 위해 새로운 표준 `types.CircuitBreaker` 타입이 제안되며, 특히 일반적인 스위칭 관용구를 나타내기 위해 `operator` 모듈에 다음 팩토리 함수가 추가됩니다.

*   `bool(obj)`에 따라 전환: `operator.true(obj)`
*   `not bool(obj)`에 따라 전환: `operator.false(obj)`
*   `obj is value`에 따라 전환: `operator.is_sentinel(obj, value)`
*   `obj is not value`에 따라 전환: `operator.is_not_sentinel(obj, value)`

## 다른 PEP와의 관계 (Relationship with other PEPs)

이 PEP는 다른 제안들의 광범위한 작업 내역을 기반으로 합니다. 주요 제안 중 일부는 아래에서 논의됩니다.

### PEP 531: 존재 확인 프로토콜 (Existence checking protocol)
이 PEP는 PEP 531의 직접적인 후속작으로, 거기서 정의된 존재 확인 프로토콜과 새로운 `?then` 및 `?else` 문법 연산자를 새로운 회로 차단 프로토콜과 조건부 표현식 및 `not` 연산자에 대한 조정으로 대체합니다.

### PEP 505: None-aware 연산자
이 PEP는 PEP 505의 None-aware 연산자 제안을 보완하여, 조건부 표현식의 특정 사용에 대한 고도로 최적화된 문법 설탕(syntactic sugar)으로서 단락 동작을 설명하는 기본 프로토콜 기반 의미론적 프레임워크를 제공합니다.

이 PEP에서 제안된 변경 사항을 고려할 때:

*   `LHS ?? RHS`는 대략 `is_not_sentinel(LHS, None) else RHS`와 같을 것입니다.
*   `EXPR?.attr`는 대략 `EXPR.attr if is_not_sentinel(EXPR, None)`와 같을 것입니다.
*   `EXPR?[key]`는 대략 `EXPR[key] if is_not_sentinel(EXPR, None)`와 같을 것입니다.

이 세 가지 경우 모두, 전용 문법 형식은 실제로 회로 차단기 인스턴스를 생성하는 것을 피하고 기본 제어 흐름을 직접 구현하도록 최적화됩니다. 후자 두 경우에서는 문법 형식이 `EXPR`를 두 번 평가하는 것도 피합니다. 이는 None-aware 연산자가 None에 특화되어 있지만, 다른 Sentinel 값은 이 PEP의 더 일반적인 프로토콜 기반 제안을 통해 여전히 사용될 수 있음을 의미합니다.

### PEP 335: 오버로드 가능한 불리언 연산자 (Overloadable Boolean operators)
PEP 335는 단락 `and` 및 `or` 연산자를 직접 오버로드할 수 있는 기능을 제안했으며, 비교 체인 의미론을 오버로드할 수 있는 기능이 그 변경의 결과 중 하나였습니다.

### PEP 535: 풍부한 비교 체인 (Rich comparison chaining)
위에서 언급했듯이, PEP 535는 PEP 207에 도입된 풍부한 비교 지원을 확장하여 `LEFT_BOUND < VALUE < RIGHT_BOUND`와 같은 비교 체인 연산도 처리하기 위해 이 PEP에 정의된 회로 차단 프로토콜을 기반으로 하는 제안입니다.

## 명세 (Specification)

### 회로 차단 프로토콜 (`if-else`)
조건부 표현식 (`LHS if COND else RHS`)은 현재 다음과 같이 표현식 수준에서 해석됩니다.

```python
if COND:
    _expr_result = LHS
else:
    _expr_result = RHS
```
이 PEP는 확인된 조건이 새로운 "회로 차단" 프로토콜을 구현할 수 있도록 확장을 변경하여 표현식의 양쪽 분기 중 하나 또는 둘 다의 결과를 보고 잠재적으로 변경할 수 있도록 제안합니다.

```python
_cb = COND
_type_cb = type(_cb)
if _cb:
    _expr_result = LHS
    if hasattr(_type_cb, "__then__"):
        _expr_result = _type_cb.__then__(_cb, _expr_result)
else:
    _expr_result = RHS
    if hasattr(_type_cb, "__else__"):
        _expr_result = _type_cb.__else__(_cb, _expr_result)
```
표시된 대로, 인터프리터 구현은 실제로 실행되는 조건부 표현식의 분기에 필요한 프로토콜 메서드만 액세스해야 합니다. 다른 프로토콜 메서드와 마찬가지로, 특수 메서드는 인스턴스에서 직접이 아니라 회로 차단기의 타입을 통해 조회됩니다.

### 회로 차단 연산자 (`binary if` 및 `binary else`)
프로토콜의 제안된 이름은 조건부 표현식의 의미론 변경에서 오는 것이 아닙니다. 오히려, 기존의 `True` 및 `False` 기반 단락 연산자(`or` 및 `and` 각각)와 PEP 505에서 제안된 `None` 기반 단락 연산자(`??`)를 보완하기 위해 `if`와 `else`를 범용 프로토콜 기반 단락 연산자로 추가하는 제안에서 비롯됩니다. 이 두 연산자는 함께 회로 차단 연산자(circuit breaking operators)로 알려질 것입니다.

이러한 사용을 지원하기 위해, 언어 문법에서 조건부 표현식의 정의는 `if` 절과 `else` 절을 모두 선택 사항으로 만들도록 업데이트됩니다.

```
test: else_test ['if' or_test ['else' test]] | lambdef
else_test: or_test ['else' test]
```
문법의 `test_nocond` 노드(조건부 표현식을 의도적으로 제외하는)의 정의는 변경되지 않으므로, 회로 차단 연산자는 List Comprehension 및 제너레이터(generator) 표현식의 `if` 절에서 조건부 표현식 자체와 마찬가지로 괄호가 필요합니다.

이 문법 정의는 `expr1 if cond else expr2 else expr3`와 같이 모호한 경우의 우선순위/결합성을 `(expr1 if cond else expr2) else expr3`로 해결합니다. 그러나 PEP 8에 "이런 식으로 사용하지 말라"는 지침이 추가될 것입니다. 왜냐하면 이러한 구성은 인터프리터가 어떻게 실행하든 독자에게 본질적으로 혼란스러울 것이기 때문입니다.

우측 결합 회로 차단 연산자 (`LHS if RHS`)는 다음과 같이 확장됩니다.

```python
_cb = RHS
_expr_result = LHS if _cb else _cb
```
좌측 결합 회로 차단 연산자 (`LHS else RHS`)는 다음과 같이 확장됩니다.

```python
_cb = LHS
_expr_result = _cb if _cb else RHS
```
두 경우 모두 핵심은 회로 차단 표현식이 단락될 때, 조건이 회로 차단기가 아니라면 조건 표현식이 표현식의 결과로 사용된다는 것입니다. 후자의 경우, 적절한 회로 차단 프로토콜 메서드는 평소와 같이 호출되지만, 회로 차단기 자체가 메서드 인수로 제공됩니다. 이를 통해 회로 차단기는 후보 표현식 결과로 전달된 인수가 `self`인지 확인하여 단락을 안정적으로 감지할 수 있습니다.

### 논리적 반전 오버로드 (`not`)
모든 회로 차단기 정의에는 여전히 회로 차단기이지만 표현식 평가를 단락할 시점에 대한 답변을 반전시키는 논리적 역(logical inverse)이 있습니다. 예를 들어, 이 PEP에서 제안된 `operator.true` 및 `operator.false` 회로 차단기는 서로의 논리적 역입니다.

`__not__(self)`라는 새로운 프로토콜 메서드가 도입되어 회로 차단기 및 다른 타입이 `not` 표현식을 재정의하여 강제된 불리언 결과 대신 논리적 역을 반환할 수 있도록 합니다.

기존 언어 최적화(예: 불리언 컨텍스트에서 이중 부정을 중복으로 직접 제거하는 것)의 의미론을 유지하기 위해, `__not__` 구현은 다음 불변식을 준수해야 합니다.

```python
assert not bool(obj) == bool(not obj)
```
그러나 대칭 회로 차단기(모든 `__bool__`, `__not__`, `__then__`, `__else__`를 구현하는)는 표현식에 관련된 모든 회로 차단기가 "참"에 대한 일관된 정의를 사용할 때만 불리언 논리의 완전한 의미론을 준수할 것으로 예상됩니다.

### 단락 동작 강제 (Forcing short-circuiting behaviour)
회로 차단기의 단락 동작은 조건부 표현식에서 세 피연산자 모두로 사용하거나 (`obj if obj else obj`), 회로 차단 표현식에서 두 피연산자 모두로 사용하여 (`obj if obj` 또는 `obj else obj`) 강제할 수 있습니다.

이러한 패턴 중 하나를 사용할 필요 없이, 이 PEP는 `operator` 모듈에 회로 차단기를 명시적으로 단락시키고 다른 객체는 수정하지 않고 통과시키는 전용 함수를 추가할 것을 제안합니다.

```python
def short_circuit(obj):
    """
    Replace circuit breakers with their short-circuited result
    Passes other input values through unmodified.
    """
    return obj if obj else obj
```

### 회로 차단 Identity 비교 (`is` 및 `is not`)
표준 회로 차단기가 없는 경우, 제안된 `if` 및 `else` 연산자는 기존 `and` 및 `or` 논리 연산자의 특이한 철자가 될 것입니다. 그러나 이 PEP는 적절한 단락 로직을 구현하는 새로운 범용 `types.CircuitBreaker` 타입과 `is` 및 `is not` 연산자에 해당하는 팩토리 함수를 `operator` 모듈에 제공할 것을 제안합니다.

이들은 조건부 검사가 실패할 때 `False` 대신 `VALUE`를 생성하는 방식으로 정의됩니다.

*   `EXPR if is_sentinel(VALUE, SENTINEL)`
*   `EXPR if is_not_sentinel(VALUE, SENTINEL)`

마찬가지로, 조건부 검사가 성공할 때 `True` 대신 `VALUE`를 생성합니다.

*   `is_sentinel(VALUE, SENTINEL) else EXPR`
*   `is_not_sentinel(VALUE, SENTINEL) else EXPR`

사실상, 이러한 비교는 다음과 같은 형태의 표현식에서 선행 `VALUE if` 및 후행 `else VALUE` 절을 생략할 수 있도록 정의됩니다.

```python
# "if" 표현식을 처리하기 위해, " else VALUE"는 생략될 때 암시됩니다.
EXPR if is_sentinel(VALUE, SENTINEL) else VALUE
EXPR if is_not_sentinel(VALUE, SENTINEL) else VALUE
# "else" 표현식을 처리하기 위해, "VALUE if "는 생략될 때 암시됩니다.
VALUE if is_sentinel(VALUE, SENTINEL) else EXPR
VALUE if is_not_sentinel(VALUE, SENTINEL) else EXPR
```

제안된 `types.CircuitBreaker` 타입은 이 동작을 다음과 같이 프로그래밍 방식으로 표현합니다.

```python
class CircuitBreaker:
    """Simple circuit breaker type"""
    def __init__(self, value, bool_value):
        self.value = value
        self.bool_value = bool(bool_value)
    def __bool__(self):
        return self.bool_value
    def __not__(self):
        return CircuitBreaker(self.value, not self.bool_value)
    def __then__(self, result):
        if result is self:
            return self.value
        return result
    def __else__(self, result):
        if result is self:
            return self.value
        return result
```
이러한 회로 차단기의 주요 특징은 일시적(ephemeral)이라는 것입니다. 단락이 발생했다고 통보받으면(후보 표현식 결과로 자신에 대한 참조를 받음으로써), 회로 차단기 래퍼(wrapper) 대신 원래 값을 반환합니다.

단락 감지는 다음과 같이 정의됩니다. 동일한 회로 차단기 인스턴스를 회로 차단 연산자의 양쪽에 명시적으로 전달하거나 조건부 표현식에서 세 피연산자 모두로 사용하면 래퍼가 항상 제거됩니다.

`operator` 모듈의 팩토리 함수는 `is` 및 `is not` 연산자를 사용하는 ID 검사에 해당하는 회로 차단기를 생성하기 쉽게 만들 것입니다.

```python
def is_sentinel(value, sentinel):
    """Returns a circuit breaker switching on 'value is sentinel'"""
    return types.CircuitBreaker(value, value is sentinel)

def is_not_sentinel(value, sentinel):
    """Returns a circuit breaker switching on 'value is not sentinel'"""
    return types.CircuitBreaker(value, value is not sentinel)
```

### 참 확인 비교 (Truth checking comparisons)
단락 특성으로 인해 `and` 및 `or` 연산자의 기본 런타임 로직은 이전에 `operator` 또는 `types` 모듈을 통해 접근할 수 없었습니다. 회로 차단 연산자와 회로 차단기의 도입은 해당 로직을 `operator` 모듈에 다음과 같이 캡처할 수 있도록 합니다.

```python
def true(value):
    """Returns a circuit breaker switching on 'bool(value)'"""
    return types.CircuitBreaker(value, bool(value))

def false(value):
    """Returns a circuit breaker switching on 'not bool(value)'"""
    return types.CircuitBreaker(value, not bool(value))
```
`LHS or RHS`는 사실상 `true(LHS) else RHS`가 될 것이고, `LHS and RHS`는 사실상 `false(LHS) else RHS`가 될 것입니다.

이러한 연산자 정의에는 실제 변경이 없을 것이며, 새로운 회로 차단 프로토콜과 연산자는 개발 시점에 검사의 의미를 하드코딩하는 대신 제어 흐름 로직을 프로그래밍할 수 있는 방법을 제공할 것입니다. 불리언 논리의 규칙을 준수하면, 이러한 표현식은 우측 결합 회로 차단 연산자를 대신 사용하여 역전된 형태로도 확장될 수 있습니다.

*   `LHS or RHS`는 사실상 `RHS if false(LHS)`가 될 것입니다.
*   `LHS and RHS`는 사실상 `RHS if true(LHS)`가 될 것입니다.

### None-aware 연산자
이 PEP와 PEP 505의 None-aware 연산자가 모두 수락된다면, 제안된 `is_sentinel` 및 `is_not_sentinel` 회로 차단기 팩토리는 "None 확인(None checking)" 개념을 캡슐화하는 데 사용될 것입니다. 즉, 값이 `None`인지 확인하고 대체 값으로 폴백하거나(None-coalescing) 전체 표현식의 결과로 통과시키는(None-severing 또는 None-propagating) 것입니다.

이러한 회로 차단기를 고려할 때, `LHS ?? RHS`는 대략 다음 두 가지와 동일할 것입니다.

*   `is_not_sentinel(LHS, None) else RHS`
*   `RHS if is_sentinel(LHS, None)`

속성 조회 및 서브스크립트(subscripting) 연산에 제어 흐름을 주입하는 방식 때문에 None-aware 속성 접근 및 None-aware 서브스크립트는 회로 차단 연산자로 직접 표현할 수 없지만, 기본 회로 차단 프로토콜을 통해 여전히 정의될 수 있습니다.

이러한 측면에서 `EXPR?.ATTR[KEY].SUBATTR()`는 의미론적으로 다음과 동일할 것입니다.

```python
_lookup_base = EXPR
_circuit_breaker = is_not_sentinel(_lookup_base, None)
_expr_result = _lookup_base.ATTR[KEY].SUBATTR() if _circuit_breaker
```

마찬가지로, `EXPR?[KEY].ATTR.SUBATTR()`는 의미론적으로 다음과 동일할 것입니다.

```python
_lookup_base = EXPR
_circuit_breaker = is_not_sentinel(_lookup_base, None)
_expr_result = _lookup_base[KEY].ATTR.SUBATTR() if _circuit_breaker
```
None-aware 연산자의 실제 구현은 회로 차단기 인스턴스를 실제로 생성하는 것을 건너뛰도록 최적화될 것으로 예상되지만, 위 확장은 런타임에 연산자의 관찰 가능한 동작에 대한 정확한 설명을 제공할 것입니다.

### 풍부한 체인 비교 (Rich chained comparisons)
이 가능한 사용 사례에 대한 자세한 논의는 PEP 535를 참조하십시오.

### 기타 조건부 구성 (Other conditional constructs)
`if` 문, `while` 문, Comprehension 또는 제너레이터(generator) 표현식에는 변경 사항이 제안되지 않습니다. 이러한 구성에 포함된 불리언 절은 전적으로 제어 흐름 목적으로 사용되며 그 자체로 결과를 반환하지 않기 때문입니다.

그러나 이러한 제안이 이 PEP의 범위를 벗어나지만, 여기에 정의된 회로 차단 프로토콜은 다음과 같은 구성을 지원하기에 충분하다는 점은 주목할 가치가 있습니다.

```python
def is_not_none(obj):
    return is_sentinel(obj, None)

while is_not_none(dynamic_query()) as result:
    ... # Code using result
```
그리고:

```python
if is_not_none(re.search(pattern, text)) as match:
    ... # Code using match
```
이는 `CONDITION`을 주어진 이름에 직접 할당하는 대신 `operator.short_circuit(CONDITION)`의 결과를 `as` 절에 주어진 이름에 할당함으로써 수행될 수 있습니다.

### 스타일 가이드 권장 사항 (Style guide recommendations)
이 PEP에서 도입된 새로운 기능과 관련하여 PEP 8에 다음 추가 사항이 제안됩니다.

*   조건부 표현식(`if-else`)과 독립형 회로 차단 연산자(`if` 및 `else`)를 단일 표현식에서 결합하는 것을 피하십시오. 상황에 따라 둘 중 하나를 사용하고, 둘 다 사용하지 마십시오.
*   `if` 문의 `if` 조건과 Comprehension 및 제너레이터 표현식의 필터(filter) 절의 일부로 조건부 표현식(`if-else`)과 독립형 회로 차단 연산자(`if` 및 `else`)를 사용하는 것을 피하십시오.

## 근거 (Rationale)

### 새로운 연산자 추가 (Adding new operators)
PEP 335와 유사하게, 이 PEP의 초기 초안은 새로운 연산자를 제안하기보다 기존 `and` 및 `or` 연산자의 해석을 덜 엄격하게 만드는 데 중점을 두었습니다. 그러나 이는 몇 가지 주요 이유로 문제가 있는 것으로 판명되었습니다.

*   `and` 및 `or` 연산자는 오랫동안 확립된 안정적인 의미를 가지므로, 독자들은 그 의미가 이제 왼쪽 피연산자의 타입에 따라 달라진다면 필연적으로 놀랄 것입니다. 새로운 사용자조차도 이 연산자들에 대한 현재의 잘 알려진 의미론을 가정하는 25년 이상의 교육 자료 때문에 이 변경에 혼란스러워할 것입니다.
*   CPython을 포함한 Python 인터프리터 구현은 이러한 연산의 의미론이 변경된다면 모두 검토하고 잠재적으로 폐기해야 할 런타임 및 컴파일 시간 최적화를 정의할 때 `and` 및 `or`의 기존 의미론을 활용했습니다.
*   프로토콜을 정의하는 데 필요한 새로운 메서드에 어떤 이름이 적절할지 명확하지 않습니다.

대신 기존 `if-else` 삼항 연산자의 단락 이항 변형을 제안하는 것은 이러한 모든 문제를 해결합니다.

*   `and` 및 `or`의 런타임 의미론은 완전히 변경되지 않은 채 유지됩니다.
*   단항 `not` 연산자의 의미론은 변경되지만, `__not__` 구현에 필요한 불변식은 불리언 컨텍스트에서 기존 표현식 최적화가 유효하게 유지됨을 의미합니다.
*   `__else__`는 후행 `else` 절이 없기 때문에 `if` 표현식의 단락 결과입니다.
*   `__then__`은 선행 `if` 절이 없기 때문에 `else` 표현식의 단락 결과입니다(메서드 이름이 `__if__`였다면 이 연결이 더 명확했겠지만, 회로 차단 프로토콜을 호출하지 않는 `if` 키워드의 다른 용도 때문에 모호할 수 있습니다).

### 연산자 및 프로토콜 이름 지정 (Naming the operator and protocol)
"circuit breaking operator", "circuit breaking protocol", "circuit breaker"라는 이름은 모두 "short circuiting operator"라는 구절에서 영감을 받았습니다. 이는 오른쪽 피연산자를 조건부로만 평가하는 연산자에 대한 일반적인 언어 설계 용어입니다.

전기 아날로지(analogy)는 Python의 회로 차단기가 전기 시스템의 회로 차단기가 장비를 손상시키거나 사람에게 해를 끼치기 전에 단락을 감지하고 처리하는 방식과 유사하게 예외가 발생하기 전에 표현식의 단락을 감지하고 처리한다는 것입니다.

Python 수준의 아날로지는 `break` 문이 루프가 자연스러운 결론에 도달하기 전에 루프를 종료할 수 있게 하는 것처럼, 회로 차단 표현식은 표현식 평가를 종료하고 즉시 결과를 생성할 수 있게 한다는 것입니다.

### 기존 키워드 사용 (Using existing keywords)
기존 키워드를 사용하면 `__future__` 문 없이 새 연산자를 도입할 수 있는 이점이 있습니다. `if`와 `else`는 제안된 새 프로토콜에 의미론적으로 적합하며, 도입된 유일한 추가 문법적 모호성은 새 연산자가 명시적 `if-else` 조건부 표현식 문법과 결합될 때 발생합니다.

PEP는 인터프리터 구현자가 이를 어떻게 처리해야 하는지 명시적으로 지정하여 이 모호성을 처리하지만, PEP 8에서 인터프리터는 이를 이해하더라도 인간 독자는 아마 그렇지 않을 것이므로, 단일 표현식에서 조건부 표현식과 회로 차단 연산자를 모두 사용하는 것은 좋은 생각이 아닐 것이라고 지적할 것을 제안합니다.

### 프로토콜 메서드 이름 지정 (Naming the protocol methods)
`__else__` 메서드의 이름 지정은 간단했습니다. 연산자 키워드 이름을 재사용하면 명확하고 모호하지 않은 특수 메서드 이름이 됩니다.

`__then__` 메서드의 이름 지정은 덜 간단했습니다. 키워드 기반 이름 `__if__`를 사용하는 또 다른 가능한 옵션이 있었기 때문입니다.

`__if__`의 문제는 `if` 키워드가 오른쪽에 표현식과 함께 나타나지만, `__if__` 특수 메서드가 호출되지 않는 많은 경우가 계속 존재한다는 것입니다. 대신, `bool()` 내장 함수와 그 기본 특수 메서드(`__bool__`, `__len__`)가 호출되고, `__if__`는 효과가 없을 것입니다.

불리언 프로토콜이 조건부 표현식과 새로운 회로 차단 프로토콜에서 이미 역할을 하고 있으므로, 컴퓨터 과학 및 프로그래밍 언어 설계에서 `if` 문의 첫 번째 절을 설명하는 데 일반적으로 사용되는 용어에 기반하여 덜 모호한 이름 `__then__`이 선택되었습니다.

### 이항 `if`를 우측 결합으로 만들기 (Making binary if right-associative)
조건부 표현식에 의해 설정된 선례는 이항 단락 `if` 표현식이 일관성 문제로 인해 조건이 오른쪽에 있어야 한다는 것을 의미합니다. 오른쪽 피연산자가 항상 먼저 평가되고, 불리언 컨텍스트에서 오른쪽 피연산자가 참이면 왼쪽 피연산자가 전혀 평가되지 않는다는 점을 고려할 때, 자연스러운 결과는 우측 결합 연산자입니다.

### 표준 회로 차단기 이름 지정 (Naming the standard circuit breakers)
좌측 결합 회로 차단 연산자와만 사용될 때, 단항 검사를 위한 명시적 회로 차단기 이름은 `if_` 전치사로 시작하면 잘 읽힙니다.

*   `operator.if_true(LHS) else RHS`
*   `operator.if_false(LHS) else RHS`

그러나 `if_`를 포함하는 것은 논리적 반전을 수행할 때 잘 읽히지 않습니다.

*   `not operator.if_true(LHS) else RHS`
*   `not operator.if_false(LHS) else RHS`

또는 우측 결합 회로 차단 연산자를 사용할 때:

*   `LHS if operator.if_true(RHS)`
*   `LHS if operator.if_false(RHS)`

또는 이항 비교 연산자 이름을 지정할 때:

*   `operator.if_is_sentinel(VALUE, SENTINEL) else EXPR`
*   `operator.if_is_not_sentinel(VALUE, SENTINEL) else EXPR`

대조적으로, 회로 차단기 이름에서 전치사를 생략하면 단항 검사에 대한 모든 형태에서 합리적으로 잘 읽히는 결과가 나옵니다.

*   `operator.true(LHS) else RHS` (선행 `"LHS if "` 암시됨)
*   `operator.false(LHS) else RHS` (선행 `"LHS if "` 암시됨)
*   `not operator.true(LHS) else RHS` (선행 `"LHS if "` 암시됨)
*   `not operator.false(LHS) else RHS` (선행 `"LHS if "` 암시됨)
*   `LHS if operator.true(RHS)` (후행 `" else RHS"` 암시됨)
*   `LHS if operator.false(RHS)` (후행 `" else RHS"` 암시됨)
*   `LHS if not operator.true(RHS)` (후행 `" else RHS"` 암시됨)
*   `LHS if not operator.false(RHS)` (후행 `" else RHS"` 암시됨)

그리고 이항 검사에서도 잘 읽힙니다.

*   `operator.is_sentinel(VALUE, SENTINEL) else EXPR`
*   `operator.is_not_sentinel(VALUE, SENTINEL) else EXPR`
*   `EXPR if operator.is_sentinel(VALUE, SENTINEL)`
*   `EXPR if operator.is_not_sentinel(VALUE, SENTINEL)`

## 위험 및 우려 사항 (Risks and concerns)
이 PEP는 PEP 335, 505, 531 논의 시 제기된 위험과 우려 사항을 특히 해결하도록 설계되었습니다.

*   기존 `and` 및 `or` 연산자에 영향을 미치기보다는 새로운 연산자를 정의하고 체인 비교 정의를 조정합니다(별도의 PEP에서).
*   제안된 새로운 연산자는 범용 단락 이항 연산자로, `None`에 대한 ID 확인에만 유연성 없이 초점을 맞추기보다는 `and` 및 `or`의 기존 의미론을 표현하는 데에도 사용될 수 있습니다.
*   `not` 단항 연산자와 `is` 및 `is not` 이항 비교 연산자에 대한 변경 사항은 기존 의미론에 기반한 제어 흐름 최적화가 유효하게 유지되도록 정의됩니다.

이 접근 방식의 한 가지 결과는 이 PEP 자체만으로는 최종 사용자에게 직접적인 이점을 많이 제공하지 않는다는 것입니다. 일부 일반적인 `None if` 접두사와 `else None` 접미사를 특정 형태의 조건부 표현식에서 생략할 수 있게 해주는 것 외에는 말입니다.

대신, 주로 제공하는 것은 PEP 505의 None-aware 연산자 제안과 PEP 535의 풍부한 비교 체인 제안을 조건부 표현식 및 기존 `and` 및 `or` 연산자와 공유될 공통 기본 의미론적 프레임워크 위에 추구할 수 있도록 하는 공통 기반입니다.

## 설계 논의 (Design Discussion)

### 프로토콜 워크스루 (Protocol walk-through)
다음 다이어그램은 회로 차단 프로토콜의 핵심 개념을 보여줍니다(인스턴스 대신 타입을 통해 특수 메서드를 조회하는 기술적인 세부 사항은 생략되었습니다).

[회로 차단 프로토콜이 삼항 표현식에 적용된 다이어그램 (Diagram of circuit breaking protocol applied to ternary expression)]

다음 표현식을 살펴보겠습니다.

```python
>>> def is_not_none(obj):
... return operator.is_not_sentinel(obj, None)
>>> x if is_not_none(data.get("key")) else y
```
`is_not_none`은 `None`을 Sentinel 값으로 사용하여 제안된 `operator.is_not_sentinel` `types.CircuitBreaker` 팩토리를 호출하는 헬퍼 함수입니다. `data`는 알 수 없는 키로 `get()` 메서드를 호출할 때 `None`을 반환하는 컨테이너(예: 내장 `dict` 인스턴스)입니다.

예제를 다시 작성하여 회로 차단기 인스턴스에 이름을 부여할 수 있습니다.

```python
>>> maybe_value = is_not_none(data.get("key"))
>>> x if maybe_value else y
```
여기서 `maybe_value` 회로 차단기 인스턴스는 다이어그램의 `breaker`에 해당합니다.

삼항 조건은 `bool(maybe_value)`를 호출하여 평가되며, 이는 Python의 기존 동작과 동일합니다. 동작 변경은 피연산자 `x` 또는 `y` 중 하나를 직접 반환하는 대신, 회로 차단 프로토콜이 관련 피연산자를 조건에 사용된 회로 차단기에 전달한다는 것입니다.

`bool(maybe_value)`가 `True`로 평가되면(즉, 요청된 키가 존재하고 해당 값이 `None`이 아님), 인터프리터는 `type(maybe_value).__then__(maybe_value, x)`를 호출합니다. 그렇지 않으면 `type(maybe_value).__else__(maybe_value, y)`를 호출합니다.

이 프로토콜은 새로운 `if` 및 `else` 이항 연산자에도 적용되지만, 이러한 경우 인터프리터는 누락된 세 번째 피연산자를 나타내는 방법이 필요합니다. 이는 회로 차단기 자체를 그 역할로 재사용하여 수행됩니다.

이 두 표현식을 고려해 봅시다.

```python
>>> x if data.get("key") is None
>>> x if operator.is_sentinel(data.get("key"), None)
```
이 표현식의 첫 번째 형식은 `data.get("key") is None`이면 `x`를 반환하지만, 그렇지 않으면 `False`를 반환하는데, 이는 우리가 원하는 바가 거의 확실히 아닙니다.

대조적으로, 이 표현식의 두 번째 형식은 `data.get("key") is None`이면 여전히 `x`를 반환하지만, 그렇지 않으면 `data.get("key")`를 반환하는데, 이는 훨씬 더 유용한 동작입니다.

이 동작은 명시적으로 이름 지정된 회로 차단기 인스턴스를 사용하여 삼항 표현식으로 다시 작성하여 이해할 수 있습니다.

```python
>>> maybe_value = operator.is_sentinel(data.get("key"), None)
>>> x if maybe_value else maybe_value
```
`bool(maybe_value)`가 `True`이면(즉, `data.get("key") is None`), 인터프리터는 `type(maybe_value).__then__(maybe_value, x)`를 호출합니다. `types.CircuitBreaker.__then__`의 구현은 단락이 발생했음을 나타내는 아무것도 보지 못하므로 `x`를 반환합니다.

대조적으로, `bool(maybe_value)`가 `False`이면(즉, `data.get("key") is not None`), 인터프리터는 `type(maybe_value).__else__(maybe_value, maybe_value)`를 호출합니다. `types.CircuitBreaker.__else__`의 구현은 인스턴스 메서드가 자신을 인수로 받았음을 감지하고 회로 차단기 대신 래핑된 값(즉, `data.get("key")`)을 반환합니다.

동일한 로직이 `else`에도 적용되지만, 순서가 반대입니다.

```python
>>> is_not_none(data.get("key")) else y
```
이 표현식은 `data.get("key")`가 `None`이 아니면 `data.get("key")`를 반환하고, 그렇지 않으면 `y`를 평가하여 반환합니다. 메커니즘을 이해하기 위해 표현식을 다음과 같이 다시 작성합니다.

```python
>>> maybe_value = is_not_none(data.get("key"))
>>> maybe_value if maybe_value else y
```
`bool(maybe_value)`가 `True`이면 표현식이 단락되고 인터프리터는 `type(maybe_value).__else__(maybe_value, maybe_value)`를 호출합니다. `types.CircuitBreaker.__then__`의 구현은 인스턴스 메서드가 자신을 인수로 받았음을 감지하고 회로 차단기 대신 래핑된 값(즉, `data.get("key")`)을 반환합니다.

`bool(maybe_value)`가 `True`이면 인터프리터는 `type(maybe_value).__else__(maybe_value, y)`를 호출합니다. `types.CircuitBreaker.__else__`의 구현은 단락이 발생했음을 나타내는 아무것도 보지 못하므로 `y`를 반환합니다.

### 드 모르간의 법칙 준수 (Respecting De Morgan's Laws)
`and` 및 `or`와 유사하게, 이항 단락 연산자는 본질적으로 동일한 표현식을 작성하는 여러 방법을 허용할 것입니다. 이러한 겉보기 중복성은 불리언 대수(Boolean algebra)로서 프로토콜을 정의하는 것의 암시적인 결과입니다. 불리언 대수는 "드 모르간의 법칙(De Morgan's Laws)"으로 알려진 한 쌍의 속성을 준수합니다. 이는 `and` 및 `or` 연산의 결과를 서로와 적절한 `not` 연산 조합으로 표현할 수 있는 능력입니다.

Python에서 `and` 및 `or`에 대한 이러한 불변식은 다음과 같이 설명할 수 있습니다.

```python
assert bool(A and B) == bool(not (not A or not B))
assert bool(A or B) == bool(not (not A and not B))
```
즉, 연산자 중 하나를 취하고, 두 피연산자를 반전시키고, 다른 연산자로 전환한 다음, 전체 결과를 반전시키면 원래 연산자와 동일한 답(불리언 의미에서)을 얻을 수 있습니다.

회로 차단기의 경우, 적절한 불변식을 정의하는 것은 단락될 때 표현식 결과에서 자신을 제거하도록 설계되는 경우가 많기 때문에 복잡합니다. 이는 본질적으로 비대칭적인 동작입니다. 따라서 드 모르간의 법칙을 대칭 회로 차단기의 예상 동작에 매핑할 때 그 본질적인 비대칭성을 고려해야 합니다.

이러한 복잡성을 해결할 수 있는 한 가지 방법은 그렇지 않으면 단락될 피연산자를 `operator.true`로 래핑하여, `bool`이 전체 결과에 적용될 때, 회로 차단기의 입력 값에 직접 `bool`을 적용하는 대신 어떤 분기를 평가할지 결정하는 데 사용된 동일한 참 정의를 사용하도록 하는 것입니다.

구체적으로, 새로운 단락 연산자의 경우, `__bool__` 및 `__not__`를 모두 구현하는 모든 올바르게 작동하는 대칭 회로 차단기에 대해 다음 속성이 합리적으로 유지될 것으로 예상됩니다.

```python
assert bool(B if true(A)) == bool(not (true(not A) else not B))
assert bool(true(A) else B) == bool(not (not B if true(not A)))
```
오른쪽 피연산자의 연산 순서(입력 회로 차단기를 반전시킨 후 `true` 적용)에 유의하십시오. 이는 단순히 `type(true(A)).__not__`의 동작에 대한 것이 아니라 실제로 `type(A).__not__`에 대한 주장이 이루어지도록 보장합니다.

최소한 `types.CircuitBreaker` 인스턴스는 이 논리를 준수하여, 기존 불리언 표현식 최적화(예: 이중 부정 제거)가 계속 적용될 수 있도록 할 것입니다.

### 임의의 Sentinel 객체 (Arbitrary sentinel objects)
PEP 505 및 531과 달리, 이 PEP의 제안은 사용자 정의 Sentinel 객체를 쉽게 처리합니다.

```python
_MISSING = object() # 인수가 제공되었는지 확인하기 위한 Sentinel 사용
def my_func(arg=_MISSING):
    arg = make_default() if is_sentinel(arg, _MISSING) # "else arg" implied
```

### 회로 차단 표현식의 암시적으로 정의된 회로 차단기 (Implicitly defined circuit breakers in circuit breaking expressions)
이 PEP의 게시되지 않은 초안은 `is` 및 `is not` 이항 연산자를 회로 차단 표현식의 컨텍스트에서 사용될 때 자동으로 회로 차단기로 처리하는 아이디어를 탐색했습니다. 불행히도, 이 접근 방식은 필연적으로 두 가지 매우 바람직하지 않은 결과 중 하나를 초래하는 것으로 나타났습니다.

*   이러한 표현식의 반환 타입이 `bool`에서 `types.CircuitBreaker`로 보편적으로 변경되어, 하위 호환성 문제를 일으킬 수 있습니다(특히 `PyObject_IsTrue`를 통해 제공된 값을 전달하거나 인수 파싱 함수 중 하나에서 `p`(predicate) 형식을 사용하는 대신 `PyBool_Check`로 내장 불리언 값을 찾는 확장 모듈 API와 작업할 때).
*   이러한 표현식의 반환 타입이 컨텍스트에 따라 달라져, 다른 일상적인 리팩토링(예: 비교 연산을 지역 변수로 추출하는 것)이 코드의 런타임 의미론에 상당한 영향을 미칠 수 있습니다.

이러한 가능한 결과 중 어느 것도 이 PEP의 제안에 의해 보장되는 것으로 보이지 않으므로, 회로 차단기 인스턴스가 API 호출을 통해 명시적으로 생성되어야 하며 암시적으로 생성되지 않는 현재 설계로 되돌아갔습니다.

## 구현 (Implementation)
PEP 505와 마찬가지로, 이러한 변경을 수행하려는 아이디어에 대한 원칙적인 관심이 보류 중이므로 실제 구현은 연기되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.