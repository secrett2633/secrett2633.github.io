---
title: "[Draft] PEP 653 - Precise Semantics for Pattern Matching"
excerpt: "Python Enhancement Proposal 653: 'Precise Semantics for Pattern Matching'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/653/
toc: true
toc_sticky: true
date: 2025-09-27 09:52:27+0900
last_modified_at: 2025-09-27 09:52:27+0900
published: true
---
> **원문 링크:** [PEP 653 - Precise Semantics for Pattern Matching](https://peps.python.org/pep-0653/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 09-Feb-2021

# PEP 653 – 패턴 매칭을 위한 정밀한 의미론

**저자** : Mark Shannon
**상태** : Draft (초안)
**유형** : Standards Track (표준 트랙)
**생성일** : 2021년 2월 9일
**개정 이력** : 2021년 2월 18일

---

## 요약 (Abstract)

이 PEP는 PEP 634의 일반적인 개념을 존중하면서도, 더 정밀하고, 이해하기 쉬우며, 더 빠른 패턴 매칭 의미론을 제안합니다.

객체 모델은 PEP 634의 `__match_args__` 속성 외에 `__match_container__` 및 `__match_class__`라는 두 개의 특수 (던더) 속성으로 확장되어 패턴 매칭을 지원합니다. 이 두 가지 새로운 속성은 정수여야 하며, `__match_args__`는 고유한 문자열의 튜플이어야 합니다.

이 PEP를 통해:

*   패턴 매칭의 의미론이 더욱 명확해져, 패턴을 추론하기 쉬워집니다.
*   패턴 매칭을 더 효율적으로 구현할 수 있습니다.
*   클래스가 어떤 패턴과 매칭될지 더 세밀하게 제어할 수 있게 되어 복잡한 클래스에서도 패턴 매칭이 더욱 유용해집니다.

## 동기 (Motivation)

PEP 634에 설명된 파이썬의 패턴 매칭은 Python 3.10에 추가될 예정입니다. 아쉽게도 PEP 634는 의미론에 대해 충분히 정밀하지 않으며, 클래스가 패턴과 어떻게 매칭될지에 대한 충분한 제어를 허용하지 않습니다.

### 정밀한 의미론 (Precise semantics)

PEP 634는 '정의되지 않은 동작(undefined behavior)'에 대한 섹션을 명시적으로 포함하고 있습니다. C와 같은 언어에서는 많은 양의 정의되지 않은 동작이 허용될 수 있지만, 파이썬에서는 이를 최소화해야 합니다. 파이썬의 패턴 매칭은 표현력이나 성능 손실 없이 더 정밀하게 정의될 수 있습니다.

### 클래스 매칭에 대한 향상된 제어 (Improved control over class matching)

PEP 634는 클래스가 시퀀스(sequence) 또는 매핑(mapping)인지 여부를 `collections.abc`에 위임합니다. 모든 시퀀스로 간주될 수 있는 클래스가 `collections.abc.Sequence`의 서브클래스로 등록되는 것은 아닙니다. 이 PEP는 `collections.abc.Sequence`의 모든 메커니즘을 사용하지 않고도 시퀀스 패턴과 매칭될 수 있도록 합니다.

PEP 634는 일부 내장 클래스에 "self" 매치라는 특별한 형태의 매칭 권한을 부여합니다. 예를 들어, `list(x)` 패턴은 리스트와 매칭되고 리스트를 `x`에 할당합니다. 클래스가 어떤 종류의 패턴과 매칭될지 선택할 수 있도록 함으로써 다른 클래스도 이 형태를 사용할 수 있습니다.

예를 들어, `sympy`를 사용하여 다음과 같이 작성하고 싶을 수 있습니다:

```python
# a*a == a**2
case Mul(args=[Symbol(a), Symbol(b)]) if a == b:
    return Pow(a, 2)
```

이는 `sympy` 클래스 `Symbol`이 "self" 매칭을 해야 함을 의미합니다. `sympy`가 PEP 634로 이 패턴을 지원하는 것은 가능하지만 다소 까다롭습니다. 이 PEP를 사용하면 매우 쉽게 구현할 수 있습니다.

### 견고성 (Robustness)

이 PEP를 사용하면 패턴 매칭 중 속성 접근이 잘 정의되고 확정적(deterministic)이 됩니다. 이는 객체 관계형 매퍼(object-relational mappers)와 같이 숨겨진 부작용이 있는 객체를 매칭할 때 패턴 매칭의 오류 발생 가능성을 줄여줍니다. 객체는 자체적인 분해(deconstruction)에 대해 더 많은 제어권을 가지게 되며, 이는 속성 접근에 부작용이 있을 경우 의도하지 않은 결과를 방지하는 데 도움이 될 수 있습니다.

PEP 634는 값이 어떤 패턴과 매칭될 수 있는지 결정할 때 `collections.abc` 모듈에 의존하며, 필요한 경우 암묵적으로 이를 임포트합니다. 이 PEP는 그러한 임포트로 인한 예상치 못한 임포트 오류 및 오해의 소지가 있는 감사(audit) 이벤트를 제거할 것입니다.

### 효율적인 구현 (Efficient implementation)

이 PEP에서 제안하는 의미론은 부분적으로 정밀한 의미론을 가지고 있고 부분적으로 객체 모델을 사용하기 때문에 효율적인 구현을 가능하게 할 것입니다.

정밀한 의미론을 통해 어떤 코드 변환이 올바른지 추론할 수 있으므로 최적화를 효과적으로 적용할 수 있습니다.

객체 모델은 파이썬의 핵심 부분이므로, 구현체들은 이미 특수 속성(`special attribute`) 조회를 효율적으로 처리합니다. 특수 속성을 조회하는 것은 추상 베이스 클래스에 대한 서브클래스 테스트를 수행하는 것보다 훨씬 빠릅니다.

## 근거 (Rationale)

객체 모델과 특수 메서드(special methods)는 파이썬 언어의 핵심입니다. 결과적으로 구현체들은 이를 잘 지원합니다. 패턴 매칭에 특수 속성을 사용하면 패턴 매칭을 나머지 구현과 잘 통합되는 방식으로 구현할 수 있으므로 유지 관리가 더 쉽고 성능이 더 좋을 가능성이 있습니다.

`match` 문은 일련의 패턴 매칭을 수행합니다. 일반적으로 패턴을 매칭하는 데는 세 가지 부분이 있습니다:

1.  이 값이 이 종류의 패턴과 매칭될 수 있는가?
2.  분해될 때, 이 값이 이 특정 패턴과 매칭되는가?
3.  가드(guard)가 참인가?

값이 특정 종류의 패턴과 매칭될 수 있는지 확인하기 위해 `__match_container__` 및 `__match_class__` 속성을 추가합니다. 이를 통해 값의 종류를 효율적으로 결정할 수 있습니다.

## 명세 (Specification)

### 객체 모델에 대한 추가 사항 (Additions to the object model)

`__match_container__` 및 `__match_class__` 속성이 `object`에 추가될 것입니다. `__match_container__`는 매핑(mapping) 또는 시퀀스(sequence) 패턴과 매칭되기를 원하는 클래스에 의해 오버라이드(override)되어야 합니다. `__match_class__`는 클래스 패턴을 매칭할 때 기본 동작을 변경하고자 하는 클래스에 의해 오버라이드되어야 합니다.

`__match_container__`는 정수여야 하며 다음 중 정확히 하나여야 합니다:

*   `0`
*   `MATCH_SEQUENCE = 1`
*   `MATCH_MAPPING = 2`

`MATCH_SEQUENCE`는 클래스의 인스턴스가 시퀀스 패턴과 매칭될 수 있음을 나타내는 데 사용됩니다.
`MATCH_MAPPING`은 클래스의 인스턴스가 매핑 패턴과 매칭될 수 있음을 나타내는 데 사용됩니다.

`__match_class__`는 정수여야 하며 다음 중 정확히 하나여야 합니다:

*   `0`
*   `MATCH_SELF = 8`

`MATCH_SELF`는 단일 위치 인자(positional argument) 클래스 패턴의 경우, 피사체(subject)가 분해되지 않고 사용될 것임을 나타내는 데 사용됩니다.

**참고** : 이 문서의 나머지 부분에서는 위의 값들을 이름으로만 참조할 것입니다. 파이썬과 C 모두를 위한 심볼릭 상수(symbolic constants)가 제공될 것이며, 이 값들은 절대 변경되지 않을 것입니다.

`object`는 특수 속성에 대해 다음 값을 가집니다:

```python
__match_container__ = 0
__match_class__ = 0
__match_args__ = ()
```

이러한 특수 속성은 일반적인 방식으로 상속됩니다.

`__match_args__`가 오버라이드되면, 고유한 문자열의 튜플을 포함해야 합니다. 비어 있을 수도 있습니다.

**참고** : `__match_args__`는 PEP 634에 명시된 대로 `dataclasses` 및 `named tuples`에 대해 자동으로 생성됩니다.

패턴 매칭 구현은 이러한 속성 중 어느 것도 명세대로 동작하는지 확인할 필요가 없습니다. `__match_container__`, `__match_class__` 또는 `__match_args__`의 값이 명세대로가 아닐 경우, 구현은 어떤 예외도 발생시키거나 잘못된 패턴과 매칭될 수 있습니다. 물론, 구현체들은 이러한 속성을 확인하고 효율적으로 수행할 수 있다면 의미 있는 오류 메시지를 제공할 수 있습니다.

### 매칭 프로세스의 의미론 (Semantics of the matching process)

다음에서, `$var` 형태의 모든 변수는 임시 변수이며 파이썬 프로그램에는 보이지 않습니다. 이들은 인트로스펙션(introspection)을 통해 보일 수 있지만, 이는 구현 세부 사항이므로 의존해서는 안 됩니다. 의사(pseudo) 문장 `FAIL`은 이 패턴에 대한 매칭이 실패했으며 다음 패턴으로 넘어가야 함을 나타내는 데 사용됩니다. 제어가 `FAIL`에 도달하지 않고 번역의 끝에 도달하면, 매칭된 것이며, 이후의 패턴은 무시됩니다.

`$ALL_CAPS` 형태의 변수는 구문 요소를 담고 있는 메타 변수(meta-variable)이며, 일반 변수가 아닙니다. 따라서 `$VARS = $items`는 `$items`를 `$VARS`에 할당하는 것이 아니라, `$items`를 `$VARS`가 담고 있는 변수들로 언패킹(unpacking)하는 것입니다. 예를 들어, 추상 구문 `case [$VARS]:`와 구체적인 구문 `case [a, b]:`에서 `$VARS`는 변수 `(a, b)`를 담고 있는 것이지, 그 변수들의 값을 담고 있는 것이 아닙니다.

의사 함수 `QUOTE`는 변수를 받아 그 변수의 이름을 반환합니다. 예를 들어, 메타 변수 `$VAR`이 변수 `foo`를 담고 있다면 `QUOTE($VAR) == "foo"`입니다.

아래 나열된 모든 추가 코드는 원본 소스에 없는 것이며, PEP 626에 따라 라인 이벤트(line events)를 발생시키지 않습니다.

#### 서문 (Preamble)

어떤 패턴도 매칭되기 전에, 매칭될 표현식이 평가됩니다:

```python
match expr:
```

다음으로 번역됩니다:

```python
$value = expr
```

#### 캡처 패턴 (Capture patterns)

캡처 패턴은 항상 매칭됩니다. 따라서 피할 수 없는(irrefutable) 매치:

```python
case capture_var:
```

다음으로 번역됩니다:

```python
capture_var = $value
```

#### 와일드카드 패턴 (Wildcard patterns)

와일드카드 패턴은 항상 매칭됩니다:

```python
case _:
```

다음으로 번역됩니다:

```python
# 코드 없음 -- 자동으로 매칭됨
```

#### 리터럴 패턴 (Literal Patterns)

리터럴 패턴:

```python
case LITERAL:
```

다음으로 번역됩니다:

```python
if $value != LITERAL: FAIL
```

단, 리터럴이 `None`, `True`, `False` 중 하나일 때는 다음으로 번역됩니다:

```python
if $value is not LITERAL: FAIL
```

#### 값 패턴 (Value Patterns)

값 패턴:

```python
case value.pattern:
```

다음으로 번역됩니다:

```python
if $value != value.pattern: FAIL
```

#### 시퀀스 패턴 (Sequence Patterns)

스타 패턴(`*`)을 포함하지 않는 패턴:

```python
case [$VARS]:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_SEQUENCE: FAIL
if len($value) != len($VARS): FAIL
$VARS = $value
```

예시:

```python
case [a, b] if a is b:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_SEQUENCE: FAIL
if len($value) != 2: FAIL
a, b = $value
if not a is b: FAIL
```

스타 패턴을 포함하는 패턴:

```python
case [$VARS]
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_SEQUENCE: FAIL
if len($value) < len($VARS): FAIL
$VARS = $value # $VARS에는 스타 표현식이 포함됩니다.
```

예시:

```python
case [a, *b, c]:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_SEQUENCE: FAIL
if len($value) < 2: FAIL
a, *b, c = $value
```

#### 매핑 패턴 (Mapping Patterns)

더블 스타 패턴(` **`)을 포함하지 않는 패턴:

```python
case {$KEYWORD_PATTERNS}:
```

다음으로 번역됩니다:

```python
$sentinel = object()
$kind = type($value).__match_container__
if $kind != MATCH_MAPPING: FAIL
# $KEYWORD_PATTERNS는 이름들을 변수들에 매핑하는 메타 변수입니다.
for $KEYWORD in $KEYWORD_PATTERNS:
    $tmp = $value.get(QUOTE($KEYWORD), $sentinel)
    if $tmp is $sentinel: FAIL
    $KEYWORD_PATTERNS[$KEYWORD] = $tmp
```

예시:

```python
case {"x": x, "y": y} if x > 2:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_MAPPING: FAIL
$tmp = $value.get("x", $sentinel)
if $tmp is $sentinel: FAIL
x = $tmp
$tmp = $value.get("y", $sentinel)
if $tmp is $sentinel: FAIL
y = $tmp
if not x > 2: FAIL
```

더블 스타 패턴을 포함하는 패턴:

```python
case {$KEYWORD_PATTERNS, ** $DOUBLE_STARRED_PATTERN}:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_MAPPING: FAIL
# $KEYWORD_PATTERNS는 이름들을 변수들에 매핑하는 메타 변수입니다.
$tmp = dict($value)
if not $tmp.keys() >= $KEYWORD_PATTERNS.keys(): FAIL:
for $KEYWORD in $KEYWORD_PATTERNS:
    $KEYWORD_PATTERNS[$KEYWORD] = $tmp.pop(QUOTE($KEYWORD))
$DOUBLE_STARRED_PATTERN = $tmp
```

예시:

```python
case {"x": x, "y": y, **z}:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_MAPPING: FAIL
$tmp = dict($value)
if not $tmp.keys() >= {"x", "y"}: FAIL
x = $tmp.pop("x")
y = $tmp.pop("y")
z = $tmp
```

#### 클래스 패턴 (Class Patterns)

인자 없는 클래스 패턴:

```python
case ClsName():
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
```

단일 위치 패턴(single positional pattern)을 가진 클래스 패턴:

```python
case ClsName($VAR):
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_class__
if $kind == MATCH_SELF:
    if not isinstance($value, ClsName): FAIL
    $VAR = $value
else:
    # 다른 위치 전용 클래스 패턴과 동일
```

위치 전용 클래스 패턴 (Positional-only class pattern):

```python
case ClsName($VARS):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
$attrs = ClsName.__match_args__
if len($attrs) < len($VARS): raise TypeError(...)
try:
    for i, $VAR in enumerate($VARS):
        $VAR = getattr($value, $attrs[i])
except AttributeError:
    FAIL
```

예시:

```python
match ClsName(x, y):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
$attrs = ClsName.__match_args__
if len($attrs) < 2: FAIL
try:
    x = getattr($value, $attrs[0])
    y = getattr($value, $attrs[1])
except AttributeError:
    FAIL
```

모든 키워드 패턴(keyword patterns)을 가진 클래스 패턴:

```python
case ClsName($KEYWORD_PATTERNS):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
try:
    for $KEYWORD in $KEYWORD_PATTERNS:
        $tmp = getattr($value, QUOTE($KEYWORD))
        $KEYWORD_PATTERNS[$KEYWORD] = $tmp
except AttributeError:
    FAIL
```

예시:

```python
match ClsName(a=x, b=y):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
try:
    x = $value.a
    y = $value.b
except AttributeError:
    FAIL
```

위치 및 키워드 패턴을 가진 클래스 패턴:

```python
case ClsName($VARS, $KEYWORD_PATTERNS):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
$attrs = ClsName.__match_args__
if len($attrs) < len($VARS): raise TypeError(...)
$pos_attrs = $attrs[:len($VARS)]
try:
    for i, $VAR in enumerate($VARS):
        $VAR = getattr($value, $attrs[i])
    for $KEYWORD in $KEYWORD_PATTERNS:
        $name = QUOTE($KEYWORD)
        if $name in $pos_attrs: raise TypeError(...)
        $KEYWORD_PATTERNS[$KEYWORD] = getattr($value, $name)
except AttributeError:
    FAIL
```

예시:

```python
match ClsName(x, a=y):
```

다음으로 번역됩니다:

```python
if not isinstance($value, ClsName): FAIL
$attrs = ClsName.__match_args__
if len($attrs) < 1: raise TypeError(...)
$positional_names = $attrs[:1]
try:
    x = getattr($value, $attrs[0])
    if "a" in $positional_names: raise TypeError(...)
    y = $value.a
except AttributeError:
    FAIL
```

#### 중첩 패턴 (Nested patterns)

위의 명세는 패턴이 중첩되지 않는다고 가정합니다. 중첩 패턴의 경우, 임시 캡처 패턴을 도입하여 위의 번역이 재귀적으로 적용됩니다.

예를 들어, 다음 패턴:

```python
case [int(), str()]:
```

다음으로 번역됩니다:

```python
$kind = type($value).__match_container__
if $kind != MATCH_SEQUENCE: FAIL
if len($value) != 2: FAIL
$value_0, $value_1 = $value
#이제 임시 값에 대해 매칭
if not isinstance($value_0, int): FAIL
if not isinstance($value_1, str): FAIL
```

#### 가드 (Guards)

가드는 나머지 번역 다음에 테스트로 번역됩니다:

```python
case pattern if guard:
```

다음으로 번역됩니다:

```python
[pattern에 대한 번역]
if not guard: FAIL
```

#### 비준수 특수 속성 (Non-conforming special attributes)

모든 클래스는 `__match_container__`, `__match_class__`, `__match_args__`의 값이 명세를 따르도록 해야 합니다. 따라서 구현체는 다음이 참이라고 가정할 수 있습니다 (확인 없이):

*   `__match_container__ == 0` 또는 `__match_container__ == MATCH_SEQUENCE` 또는 `__match_container__ == MATCH_MAPPING`
*   `__match_class__ == 0` 또는 `__match_class__ == MATCH_SELF`

그리고 `__match_args__`는 고유한 문자열의 튜플입니다.

### 표준 라이브러리 클래스를 위한 특수 속성 값 (Values of the special attributes for classes in the standard library)

코어 내장 컨테이너 클래스의 경우 `__match_container__`는 다음과 같습니다:

*   `list`: `MATCH_SEQUENCE`
*   `tuple`: `MATCH_SEQUENCE`
*   `dict`: `MATCH_MAPPING`
*   `bytearray`: `0`
*   `bytes`: `0`
*   `str`: `0`

Named tuple은 `__match_container__`가 `MATCH_SEQUENCE`로 설정됩니다.

`issubclass(cls, collections.abc.Mapping)`이 참인 다른 모든 표준 라이브러리 클래스는 `__match_container__`가 `MATCH_MAPPING`으로 설정됩니다. `issubclass(cls, collections.abc.Sequence)`이 참인 다른 모든 표준 라이브러리 클래스는 `__match_container__`가 `MATCH_SEQUENCE`로 설정됩니다.

다음 내장 클래스에 대해 `__match_class__`는 `MATCH_SELF`로 설정됩니다:

*   `bool`
*   `bytearray`
*   `bytes`
*   `float`
*   `frozenset`
*   `int`
*   `set`
*   `str`
*   `list`
*   `tuple`
*   `dict`

### 합법적인 최적화 (Legal optimizations)

위의 의미론은 구현에 많은 불필요한 노력과 복사를 수반합니다. 그러나 순진한 구현에 의미론 보존 변환(semantic preserving transformations)을 적용하여 위의 의미론을 효율적으로 구현하는 것이 가능합니다.

매칭을 수행할 때, 구현체는 다음 함수와 메서드를 순수(pure)하다고 처리할 수 있습니다:

`MATCH_SEQUENCE`를 지원하는 모든 클래스의 경우:

*   `cls.__len__()`
*   `cls.__getitem__()`

`MATCH_MAPPING`을 지원하는 모든 클래스의 경우:

*   `cls.get()` (두 인자 형태만 해당)

구현체는 다음 가정을 할 수 있습니다:

*   `isinstance(obj, cls)`는 `issubclass(type(obj), cls)`로 자유롭게 대체될 수 있으며 그 반대도 마찬가지입니다.
*   `isinstance(obj, cls)`는 모든 `(obj, cls)` 쌍에 대해 항상 동일한 결과를 반환하므로 반복 호출은 생략될 수 있습니다.
*   `__match_container__`, `__match_class__` 또는 `__match_args__`를 읽는 것은 순수(pure) 작업이며 캐시될 수 있습니다.
*   시퀀스, 즉 `__match_container__ == MATCH_SEQUENCE`가 0이 아닌 모든 클래스는 이터레이션(iteration), 서브스크립팅(subscripting) 또는 `len()` 호출에 의해 수정되지 않습니다. 결과적으로, 불변 시퀀스(immutable sequence)에 적용될 때 동등한 경우 이러한 작업들은 서로 자유롭게 대체될 수 있습니다.
*   매핑, 즉 `__match_container__ == MATCH_MAPPING`이 0이 아닌 모든 클래스는 `get()` 메서드의 두 번째 인자를 캡처하지 않을 것입니다. 따라서 `$sentinel` 값은 자유롭게 재사용될 수 있습니다.

사실, 구현체들은 이러한 가정을 하도록 권장됩니다. 이는 상당한 성능 향상을 가져올 가능성이 높기 때문입니다.

### 보안 영향 (Security Implications)

없음.

### 구현 (Implementation)

명세에서 따르는 순진한 구현(naive implementation)은 그리 효율적이지 않을 것입니다. 다행히도, 성능을 향상시키는 데 사용될 수 있는 합리적으로 간단한 변환들이 있습니다. 성능은 3.10 릴리스 시점에는 PEP 634의 구현(작성 시점 기준)과 비슷해야 합니다. 추가 성능 개선은 3.11 릴리스를 기다려야 할 수도 있습니다.

#### 가능한 최적화 (Possible optimizations)

다음은 명세의 일부가 아니라, 개발자가 효율적인 구현을 만드는 데 도움이 되는 가이드라인입니다.

##### 평가를 레인(lane)으로 분할 (Splitting evaluation into lanes)

각 패턴을 매칭하는 첫 번째 단계는 종류(kind)를 확인하는 것이므로, 종류에 대한 모든 확인을 매치 시작 부분의 단일 다방향 분기(multi-way branch)로 결합할 수 있습니다. 그런 다음 케이스 목록은 여러 "레인"으로 복제될 수 있으며, 각 레인은 하나의 종류에 해당합니다. 그런 다음 각 레인에서 매칭할 수 없는 케이스를 제거하는 것은 사소합니다. 종류에 따라 각 레인에 대해 다른 최적화 전략이 가능합니다. 매치 절의 본문은 복제될 필요가 없고, 패턴만 복제하면 됩니다.

##### 시퀀스 패턴 (Sequence patterns)

이것이 아마도 최적화하기 가장 복잡하고 성능 면에서 가장 이득이 많을 것입니다. 각 패턴은 특정 길이 범위, 종종 단일 길이만 매칭할 수 있으므로, 테스트 순서는 시퀀스에 대한 명시적인 반복으로 다시 작성될 수 있으며, 해당 시퀀스 길이에 적용되는 패턴만 매칭하려고 시도합니다.

예를 들어:

```python
case []: A
case [x]: B
case [x, y]: C
case other: D
```

대략 다음과 같이 컴파일될 수 있습니다:

```python
# 레인 선택
$i = iter($value)
for $0 in $i: break
else: A; goto done
for $1 in $i: break
else: x = $0; B; goto done
for $2 in $i: del $0, $1, $2; break
else: x = $0; y = $1; C; goto done
other = $value; D
done:
```

##### 매핑 패턴 (Mapping patterns)

여기서 가장 좋은 전략은 매핑의 크기와 존재하는 키를 기반으로 결정 트리(decision tree)를 형성하는 것입니다. 키의 존재 여부를 반복적으로 테스트하는 것은 의미가 없습니다. 예를 들어:

```python
match obj:
    case {a:x, b:y}: W
    case {a:x, c:y}: X
    case {a:x, b:_, c:y}: Y
    case other: Z
```

케이스 X를 확인할 때 키 "a"가 없으면 Y에 대해 다시 확인할 필요가 없습니다.

매핑 레인은 대략 다음과 같이 구현될 수 있습니다:

```python
# 레인 선택
if len($value) == 2:
    if "a" in $value:
        if "b" in $value:
            x = $value["a"]
            y = $value["b"]
            goto W
        if "c" in $value:
            x = $value["a"]
            y = $value["c"]
            goto X
elif len($value) == 3:
    if "a" in $value and "b" in $value:
        x = $value["a"]
        y = $value["c"]
        goto Y
other = $value
goto Z
```

### 이 PEP와 PEP 634의 차이점 요약 (Summary of differences between this PEP and PEP 634)

의미론의 변경 사항은 다음과 같이 요약할 수 있습니다:

*   `__match_args__`가 단순히 시퀀스가 아닌 문자열의 튜플이어야 합니다. 이는 `__match_args__`가 불변(immutable)이라고 가정할 수 있으므로 패턴 매칭을 좀 더 견고하고 최적화 가능하게 만듭니다.
*   매칭될 수 있는 컨테이너 패턴의 종류를 선택하는 데 `issubclass(cls, collections.abc.Mapping)` 및 `issubclass(cls, collections.abc.Sequence)` 대신 `cls.__match_container__`를 사용합니다.
*   필요한 경우 `__match_class__ = 0`으로 설정하여 클래스가 분해(deconstruction)에서 완전히 제외될 수 있도록 합니다.
*   패턴 매칭 시 동작은 더 정밀하게 정의되지만, 그 외에는 변경되지 않습니다.

구문에는 변경 사항이 없습니다. PEP 636 튜토리얼에 제공된 모든 예제는 현재와 동일하게 작동해야 합니다.

### 기각된 아이디어 (Rejected Ideas)

#### 인스턴스 딕셔너리의 속성 사용 (Using attributes from the instance's dictionary)

이 PEP의 초기 버전은 `__match_class__`가 기본값일 때 클래스 패턴을 매칭할 때 인스턴스 딕셔너리의 속성만 사용했습니다. 의도는 바운드 메서드(bound-methods) 및 기타 합성 속성(synthetic attributes)을 캡처하는 것을 피하는 것이었습니다. 그러나 이는 프로퍼티(properties)도 무시된다는 것을 의미했습니다.

다음 클래스의 경우:

```python
class C:
    def __init__(self):
        self.a = "a"
    @property
    def p(self): ...
    def m(self): ...
```

이상적으로는 "a"와 "p" 속성은 매칭하지만 "m"은 매칭하지 않기를 원합니다. 그러나 이를 수행할 일반적인 방법이 없으므로, 이 PEP는 이제 PEP 634의 의미론을 따릅니다.

#### 패턴이 아닌 피사체에서 `__match_args__` 조회 (Lookup of __match_args__ on the subject not the pattern)

이 PEP의 초기 버전은 패턴에 지정된 클래스가 아니라 피사체(subject)의 클래스에서 `__match_args__`를 조회했습니다. 이는 몇 가지 이유로 기각되었습니다:

*   패턴에 지정된 클래스를 사용하는 것이 최적화에 더 적합하고 더 나은 성능을 제공할 수 있습니다.
*   패턴에 지정된 클래스를 사용하는 것이 일부 경우에 더 나은 오류 보고를 제공할 잠재력이 있습니다.
*   두 접근 방식 모두 완벽하지 않으며, 둘 다 이상한 코너 케이스가 있습니다. 현상 유지는 혼란을 최소화합니다.

#### `__match_class__`와 `__match_container__`를 단일 값으로 결합 (Combining __match_class__ and __match_container__ into a single value)

이 PEP의 초기 버전은 `__match_class__`와 `__match_container__`를 `__match_kind__`라는 단일 값으로 결합했습니다. 단일 값을 사용하는 것이 성능 면에서 작은 이점이 있지만, 클래스 매칭 동작을 오버라이드할 때 컨테이너 매칭에 의도하지 않은 변경을 초래할 가능성이 높으며 그 반대도 마찬가지입니다.

### 연기된 아이디어 (Deferred Ideas)

이 PEP의 원본 버전에는 `MATCH_POSITIONAL` 매치 종류와 클래스가 매칭에 대한 완전한 제어를 허용하는 특수 메서드 `__deconstruct__`가 포함되어 있었습니다. 이는 `sympy`와 같은 라이브러리에 중요합니다.

예를 들어, `sympy`를 사용하여 다음과 같이 작성하고 싶을 수 있습니다:

```python
# sin(x) **2 + cos(x)** 2 == 1
case Add(Pow(sin(a), 2), Pow(cos(b), 2)) if a == b:
    return 1
```

`sympy`가 현재 패턴 매칭으로 위치 패턴을 지원하는 것은 가능하지만, 까다롭습니다. 이러한 추가 기능이 있으면 쉽게 구현할 수 있습니다.

이 아이디어는 3.11을 위한 향후 PEP에 포함될 예정입니다. 그러나 3.10 개발 주기에서는 그러한 변경을 하기에는 너무 늦습니다.

#### 모든 클래스 매치를 거부하는 별도의 값 (Having a separate value to reject all class matches)

이 PEP의 초기 버전에는 `__match_class__`에 대한 별개의 값이 있었는데, 이를 통해 클래스는 분해(deconstruction)를 요구했을 모든 클래스 패턴을 매칭하지 않을 수 있었습니다. 그러나 `MATCH_POSITIONAL`이 도입되면 이는 중복될 것이며, 극히 드문 경우를 위해 명세를 복잡하게 만듭니다.

### 코드 예시 (Code examples)



```python
# 예시 1
class Symbol:
    __match_class__ = MATCH_SELF

# 예시 2 (위에서 번역됨)
case [a, b] if a is b:
    # ...

# 예시 3 (위에서 번역됨)
case [a, *b, c]:
    # ...

# 예시 4 (위에서 번역됨)
case {"x": x, "y": y} if x > 2:
    # ...

# 예시 5 (위에서 번역됨)
case {"x": x, "y": y, **z}:
    # ...

# 예시 6 (위에서 번역됨)
match ClsName(x, y):
    # ...

# 예시 7 (위에서 번역됨)
match ClsName(a=x, b=y):
    # ...

# 예시 8 (위에서 번역됨)
match ClsName(x, a=y):
    # ...

# 예시 9 (Deferred Ideas 섹션에서 언급)
class Basic:
    __match_class__ = MATCH_POSITIONAL
    def __deconstruct__(self):
        return self._args
```

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되거나 CC0-1.0-Universal 라이선스 중 더 관대한 조건에 따릅니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.