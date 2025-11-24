---
title: "[Final] PEP 750 - Template Strings"
excerpt: "Python Enhancement Proposal 750: 'Template Strings'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/750/
toc: true
toc_sticky: true
date: 2025-09-27 13:38:50+0900
last_modified_at: 2025-09-27 13:38:50+0900
published: true
---
> **원문 링크:** [PEP 750 - Template Strings](https://peps.python.org/pep-0750/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Jul-2024


# PEP 750 – Template Strings

*   **작성자:** Jim Baker 외 다수
*   **논의처:** Discourse thread
*   **상태:** Final
*   **유형:** Standards Track
*   **생성일:** 2024년 7월 8일
*   **Python 버전:** 3.14
*   **해결일:** 2025년 4월 10일

**중요:** 이 PEP는 역사적인 문서이며, 최신 공식 문서는 [Template strings](https://docs.python.org/3.14/reference/lexical_analysis.html#template-strings)에서 확인할 수 있습니다.

## 개요 (Abstract)

이 PEP는 커스텀 문자열 처리를 위한 Template Strings (템플릿 문자열)를 소개합니다.

템플릿 문자열은 `f-strings`의 일반화된 형태로, `f` 접두사 대신 `t` 접두사를 사용합니다. `str`로 평가되는 대신, `t-strings`는 새로운 타입인 `Template`으로 평가됩니다.

```python
template: Template = t"Hello {name}"
```

`Template`은 개발자가 문자열과 보간된 값(interpolated values)이 결합되기 전에 이들에 접근할 수 있도록 합니다. 이는 Python 언어에 유연한 기본 문자열 처리 기능을 제공하고, 보안 검사, 웹 템플릿, 도메인 특화 언어(DSL) 등을 가능하게 합니다.

## 다른 PEPs와의 관계 (Relationship With Other PEPs)

*   Python은 PEP 498을 통해 Python 3.6에서 `f-strings`를 도입했습니다.
*   문법은 PEP 701에서 공식화되었고 일부 제한 사항이 해제되었습니다. 이 PEP는 PEP 701을 기반으로 합니다.
*   PEP 498과 거의 동시에 PEP 501이 "i-strings"(interpolation template strings)를 제공하기 위해 작성되었으나, `f-strings` 경험이 더 필요하여 연기되었습니다.
*   이 PEP는 2023년 3월 다른 저자에 의해 "t-strings"라는 템플릿 리터럴 문자열로 작업이 재개되었고, PEP 701 위에 구축되었습니다.
*   이 PEP의 저자들은 PEP 501의 업데이트된 작업에 대한 일반화 및 단순화로 간주합니다.

## 동기 (Motivation)

Python의 `f-strings`는 사용하기 쉽고 매우 인기가 많습니다. 그러나 시간이 지남에 따라 개발자들은 특정 사용 사례에 적합하지 않은 제약 사항에 직면했습니다. 특히 `f-strings`는 보간된 값들이 최종 문자열로 결합되기 전에 가로채서 변환할 방법이 없습니다.

그 결과, `f-strings`를 부주의하게 사용하면 보안 취약점으로 이어질 수 있습니다. 예를 들어:

*   `sqlite3`를 사용하여 SQL 쿼리를 실행하는 사용자가 `f-string`을 사용하여 값을 SQL 표현식에 삽입하려 할 경우, SQL 인젝션 공격으로 이어질 수 있습니다.
*   HTML을 구축하는 개발자가 이스케이프되지 않은 사용자 입력을 문자열에 포함하면, Cross-Site Scripting (XSS) 취약점이 발생할 수 있습니다.

더 나아가, 보간된 값들을 최종 문자열로 결합하기 전에 변환할 수 없다는 점은 더 복잡한 문자열 처리 작업에서 `f-strings`의 유용성을 제한합니다.

템플릿 문자열은 개발자에게 문자열과 보간된 값에 대한 접근 권한을 제공함으로써 이러한 문제들을 해결합니다.

예를 들어, HTML을 생성하고 싶다고 가정해 봅시다. 템플릿 문자열을 사용하면 콘텐츠를 자동으로 새니타이즈(sanitize)할 수 있는 `html()` 함수를 정의할 수 있습니다.

```python
evil = "<script>alert('evil')</script>"
template = t"<p>{evil}</p>"
# html() 함수를 통해 악성 스크립트가 이스케이프됨
assert html(template) == "<p>&lt;script&gt;alert('evil')&lt;/script&gt;</p>"
```

또한, `html()` 함수는 딕셔너리를 사용하여 HTML 요소에 속성을 쉽게 추가할 수 있도록 합니다.

```python
attributes = {"src": "shrubbery.jpg", "alt": "looks nice"}
template = t"<img {attributes} />"
assert html(template) == '<img src="shrubbery.jpg" alt="looks nice" />'
```

이러한 예제들은 `f-strings`로는 불가능합니다. 보간된 값들을 가로채고 변환하는 메커니즘을 제공함으로써 템플릿 문자열은 광범위한 문자열 처리 사용 사례를 가능하게 합니다.

## 사양 (Specification)

### 템플릿 문자열 리터럴 (Template String Literals)

이 PEP는 템플릿 문자열 리터럴을 정의하기 위한 새로운 문자열 접두사 `t`를 소개합니다. 이 리터럴들은 표준 라이브러리 모듈 `string.templatelib`에 있는 새로운 타입 `Template`으로 해석됩니다.

다음 코드는 `Template` 인스턴스를 생성합니다.

```python
from string.templatelib import Template
template = t"This is a template string."
assert isinstance(template, Template)
```

템플릿 문자열 리터럴은 PEP 701의 전체 문법을 지원합니다. 여기에는 보간(interpolations) 내에 템플릿 문자열을 중첩하는 기능과 모든 유효한 따옴표(`'`, `"`, `'''`, `"""`)를 사용하는 기능이 포함됩니다.

*   다른 문자열 접두사처럼 `t` 접두사는 따옴표 바로 앞에 와야 합니다.
*   `f-strings`와 마찬가지로 소문자 `t`와 대문자 `T` 접두사 모두 지원됩니다.
*   `f-strings`와 마찬가지로 `t-strings`는 `u` 또는 `b` 접두사와 결합될 수 없습니다.
*   또한, `f-strings`와 `t-strings`는 결합될 수 없으므로 `ft` 접두사는 유효하지 않습니다.
*   `t-strings`는 `r` 접두사와 결합될 수 있습니다. 자세한 내용은 "Raw Template Strings" 섹션을 참조하십시오.

### Template 타입 (The Template Type)

템플릿 문자열은 새로운 불변(immutable) 타입인 `string.templatelib.Template`의 인스턴스로 평가됩니다.

```python
class Template:
    strings: tuple[str, ...]
    """
    템플릿의 문자열 부분으로 구성된 비어 있지 않은 튜플이며,
    템플릿의 보간 수 N에 대해 N+1개의 항목을 가집니다.
    """
    interpolations: tuple[Interpolation, ...]
    """
    템플릿의 보간 부분으로 구성된 튜플입니다.
    보간이 없는 경우 빈 튜플이 됩니다.
    """
    def __new__(cls, *args: str | Interpolation):
        """
        새로운 Template 인스턴스를 생성합니다. 인수는 어떤 순서로든 제공될 수 있습니다.
        """
        ...
    @property
    def values(self) -> tuple[object, ...]:
        """
        템플릿 내 각 Interpolation의 `value` 속성으로 구성된 튜플을 반환합니다.
        보간이 없는 경우 빈 튜플이 됩니다.
        """
        ...
    def __iter__(self) -> Iterator[str | Interpolation]:
        """
        템플릿의 문자열 부분과 보간을 나타나는 순서대로 반복합니다.
        빈 문자열은 포함되지 않습니다.
        """
        ...
```

`strings` 및 `interpolations` 속성은 리터럴 내의 문자열 부분과 모든 보간에 접근할 수 있도록 합니다.

```python
name = "World"
template = t"Hello {name}"
assert template.strings[0] == "Hello "
assert template.interpolations[0].value == "World"
```

### Interpolation 타입 (The Interpolation Type)

`Interpolation` 타입은 템플릿 문자열 내의 표현식을 나타냅니다. `Template`과 마찬가지로 `string.templatelib` 모듈에 있는 새로운 클래스입니다.

```python
class Interpolation:
    value: object
    expression: str
    conversion: Literal["a", "r", "s"] | None
    format_spec: str
    __match_args__ = ("value", "expression", "conversion", "format_spec")
    def __new__(
        cls,
        value: object,
        expression: str = "",
        conversion: Literal["a", "r", "s"] | None = None,
        format_spec: str = "",
    ): ...
```

`Interpolation` 타입은 얕은 불변(shallow immutable)입니다. 속성은 재할당될 수 없습니다.

*   `value` 속성은 보간의 평가된 결과입니다.
    ```python
    name = "World"
    template = t"Hello {name}"
    assert template.interpolations[0].value == "World"
    ```
*   템플릿 문자열 리터럴에서 보간이 생성될 때, `expression` 속성은 보간의 원래 텍스트를 포함합니다.
    ```python
    name = "World"
    template = t"Hello {name}"
    assert template.interpolations[0].expression == "name"
    ```
    개발자가 명시적으로 `Interpolation`을 구성할 때, `expression` 속성의 값을 선택적으로 제공할 수 있습니다. 문자열로 저장되지만, 유효한 Python 표현식이어야 합니다. 값이 제공되지 않으면 `expression` 속성은 기본적으로 빈 문자열(`""`)이 됩니다.
    대부분의 템플릿 처리 코드에서 `expression` 속성은 사용되지 않을 것으로 예상됩니다. 디버깅 및 인트로스펙션(introspection)을 위해 제공됩니다.

*   `conversion` 속성은 선택적으로 사용할 수 있는 변환으로, `repr()`, `str()`, `ascii()` 변환에 해당하는 `r`, `s`, `a` 중 하나입니다. `f-strings`와 마찬가지로 다른 변환은 지원되지 않습니다.
    ```python
    name = "World"
    template = t"Hello {name!r}"
    assert template.interpolations[0].conversion == "r"
    ```
    변환이 제공되지 않으면 `conversion`은 `None`입니다.

*   `format_spec` 속성은 형식 지정(format specification)입니다. `f-strings`와 마찬가지로 값의 표현 방식을 정의하는 임의의 문자열입니다.
    ```python
    value = 42
    template = t"Value: {value:.2f}"
    assert template.interpolations[0].format_spec == ".2f"
    ```
    `f-strings`의 형식 지정은 그 자체로 보간을 포함할 수 있습니다. 템플릿 문자열에서도 허용되며, `format_spec`은 즉시 평가된 결과로 설정됩니다.
    ```python
    value = 42
    precision = 2
    template = t"Value: {value:.{precision}f}"
    assert template.interpolations[0].format_spec == ".2f"
    ```
    형식 지정이 제공되지 않으면 `format_spec`은 기본적으로 빈 문자열(`""`)이 됩니다. 이는 Python의 내장 `format()` 함수의 `format_spec` 매개변수와 일치합니다.

    `f-strings`와 달리, `conversion` 및 `format_spec` 속성을 해석하는 방법은 템플릿을 처리하는 코드에 달려 있습니다. 이러한 코드가 이 속성들을 반드시 사용해야 하는 것은 아니지만, 존재하는 경우 존중되어야 하며, 가능한 한 `f-strings`의 동작과 일치해야 합니다. 예를 들어, `{value:.2f}`를 사용하는 템플릿 문자열이 처리될 때 값을 소수점 이하 두 자리로 반올림하지 않는다면 놀라울 것입니다.

### Template.values 속성 (The Template.values Property)

`Template.values` 속성은 템플릿 내 각 `Interpolation`의 `value` 속성에 접근하기 위한 단축키이며 다음 코드와 동일합니다.

```python
@property
def values(self) -> tuple[object, ...]:
    return tuple(i.value for i in self.interpolations)
```

### 템플릿 내용 반복 (Iterating Template Contents)

`Template.__iter__()` 메서드는 템플릿의 전체 내용에 접근하는 간단한 방법을 제공합니다. 이는 문자열 부분과 보간을 나타나는 순서대로, 빈 문자열을 제외하고 반환합니다.

`__iter__()` 메서드는 다음 코드와 동일합니다.

```python
def __iter__(self) -> Iterator[str | Interpolation]:
    for s, i in zip_longest(self.strings, self.interpolations):
        if s:
            yield s
        if i:
            yield i
```

다음 예제는 `__iter__()` 메서드의 동작을 보여줍니다.

```python
assert list(t"") == []
assert list(t"Hello") == ["Hello"]

name = "World"
template = t"Hello {name}!"
contents = list(template)
assert len(contents) == 3
assert contents[0] == "Hello "
assert contents[1].value == "World"
assert contents[1].expression == "name"
assert contents[2] == "!"
```

`Template.strings`에 존재할 수 있는 빈 문자열은 `__iter__()` 메서드의 출력에 포함되지 않습니다.

```python
first = "Eat"
second = "Red Leicester"
template = t"{first}{second}"
contents = list(template)
assert len(contents) == 2
assert contents[0].value == "Eat"
assert contents[0].expression == "first"
assert contents[1].value == "Red Leicester"
assert contents[1].expression == "second"
# 그러나 strings 속성에는 빈 문자열이 포함됩니다:
assert template.strings == ("", "", "")
```

템플릿 처리 코드는 요구 사항과 편의에 따라 `strings`, `interpolations`, `values`, `__iter__()`의 어떤 조합으로든 작업할 수 있습니다.

### 템플릿 문자열 처리 (Processing Template Strings)

개발자는 템플릿 문자열을 처리하기 위한 임의의 코드를 작성할 수 있습니다. 예를 들어, 다음 함수는 템플릿의 정적 부분을 소문자로, 보간을 대문자로 렌더링합니다.

```python
from string.templatelib import Template, Interpolation

def lower_upper(template: Template) -> str:
    """정적 부분은 소문자로, 보간은 대문자로 렌더링합니다."""
    parts: list[str] = []
    for item in template:
        if isinstance(item, Interpolation):
            parts.append(str(item.value).upper())
        else:
            parts.append(item.lower())
    return "".join(parts)

name = "world"
assert lower_upper(t"HELLO {name}") == "hello WORLD"
```

템플릿 문자열이 특정 방식으로 처리되어야 한다는 요구 사항은 없습니다. 템플릿을 처리하는 코드는 문자열을 반환할 의무가 없습니다. 템플릿 문자열은 유연하고 범용적인 기능입니다.

### 템플릿 문자열 연결 (Template String Concatenation)

템플릿 문자열은 `+`를 사용한 명시적 연결을 지원합니다. `Template.__add__()`를 통해 두 `Template` 인스턴스에 대한 연결이 지원됩니다.

```python
name = "World"
assert isinstance(t"Hello " + t"{name}", Template)
assert (t"Hello " + t"{name}").strings == ("Hello ", "")
assert (t"Hello " + t"{name}").values[0] == "World"
```

두 템플릿 문자열 리터럴의 암시적 연결도 지원됩니다.

```python
name = "World"
assert isinstance(t"Hello " t"{name}", Template)
assert (t"Hello " t"{name}").strings == ("Hello ", "")
assert (t"Hello " t"{name}").values[0] == "World"
```

`Template`과 `str`의 암시적 및 명시적 연결은 금지됩니다. 이는 `str`이 정적 문자열 부분으로 처리되어야 하는지, 아니면 보간으로 처리되어야 하는지 모호하기 때문입니다.

`Template`과 `str`을 결합하려면 개발자는 `str`을 어떻게 처리할지 명시적으로 결정해야 합니다. `str`이 정적 문자열 부분으로 의도된 경우 `Template`으로 래핑(wrap)해야 합니다. `str`이 보간 값으로 의도된 경우 `Interpolation`으로 래핑하고 `Template` 생성자에 전달해야 합니다. 예를 들어:

```python
name = "World"
# `name`을 정적 문자열 부분으로 처리
template = t"Hello " + Template(name)
# `name`을 보간으로 처리
template = t"Hello " + Template(Interpolation(name, "name"))
```

### Template 및 Interpolation 동등성 (Template and Interpolation Equality)

`Template` 및 `Interpolation` 인스턴스는 객체 ID(`is`)로 비교됩니다.

`Template` 인스턴스는 템플릿 처리 코드에 의해 사용될 의도로, 문자열 또는 다른 타입을 반환할 수 있습니다. 이러한 타입은 필요에 따라 자체 동등성 의미(equality semantics)를 제공할 수 있습니다.

### 순서 지정 미지원 (No Support for Ordering)

`Template` 및 `Interpolation` 타입은 순서 지정을 지원하지 않습니다. 이는 어휘적 순서 지정을 지원하는 Python의 다른 모든 문자열 리터럴 타입과 다릅니다. 보간에는 임의의 값이 포함될 수 있으므로 자연스러운 순서가 없습니다. 결과적으로 `Template` 및 `Interpolation` 타입 모두 표준 비교 메서드를 구현하지 않습니다.

### 디버그 지정자 지원 (`=`) (Support for the debug specifier ( = ))

디버그 지정자 `=`는 템플릿 문자열에서 지원되며, `f-strings`에서와 유사하게 동작하지만 구현상의 제약으로 인해 약간의 차이가 있습니다.

특히 `t'{value=}'`는 `t'value={value!r}'`로 처리됩니다. 첫 번째 정적 문자열은 `""`에서 `"value="`로 다시 작성되고, 변환은 기본적으로 `r`로 설정됩니다.

```python
name = "World"
template = t"Hello {name=}"
assert template.strings[0] == "Hello name="
assert template.interpolations[0].value == "World"
assert template.interpolations[0].conversion == "r"
```

*   변환이 명시적으로 제공되면 유지됩니다: `t'{value=!s}'`는 `t'value={value!s}'`로 처리됩니다.
*   변환 없이 형식 문자열이 제공되면, 변환은 `None`으로 설정됩니다: `t'{value=:fmt}'`는 `t'value={value:fmt}'`로 처리됩니다.
*   디버그 지정자에서 공백은 유지되므로 `t'{value = }'`는 `t'value = {value!r}'`로 처리됩니다.

### Raw Template Strings (원시 템플릿 문자열)

`rt` (또는 `tr`) 접두사를 사용하여 raw 템플릿 문자열이 지원됩니다.

```python
trade = 'shrubberies'
template = rt'Did you say "{trade}"?\n'
assert template.strings[0] == r'Did you say "'
assert template.strings[1] == r'"?\n'
```

이 예제에서 `\n`은 줄 바꿈 문자가 아닌 두 개의 별도 문자(백슬래시 다음에 'n')로 처리됩니다. 이는 Python의 raw 문자열 동작과 일치합니다.

일반 템플릿 문자열과 마찬가지로 raw 템플릿 문자열 내의 보간은 정상적으로 처리되어 raw 문자열 동작과 동적 콘텐츠의 조합을 허용합니다.

### 보간 표현식 평가 (Interpolation Expression Evaluation)

보간에 대한 표현식 평가는 PEP 498과 동일합니다.

문자열에서 추출된 표현식은 템플릿 문자열이 나타난 컨텍스트에서 평가됩니다. 즉, 표현식은 지역 변수 및 전역 변수를 포함하여 어휘적 스코프(lexical scope)에 완전히 접근할 수 있습니다. 함수 및 메서드 호출을 포함한 모든 유효한 Python 표현식이 사용될 수 있습니다.

템플릿 문자열은 `f-strings`와 마찬가지로 왼쪽에서 오른쪽으로 즉시(eagerly) 평가됩니다. 이는 템플릿 문자열이 처리될 때 보간이 즉시 평가되며, 지연되거나 람다(lambdas)로 래핑되지 않음을 의미합니다.

### 예외 (Exceptions)

`t-string` 리터럴에서 발생하는 예외는 `f-string` 리터럴에서 발생하는 예외와 동일합니다.

### Template.\_\_str\_\_() 구현 없음 (No Template.__str__() Implementation)

`Template` 타입은 특수화된 `__str__()` 구현을 제공하지 않습니다.

이는 `Template` 인스턴스가 템플릿 처리 코드에 의해 사용될 의도로, 문자열 또는 다른 타입을 반환할 수 있기 때문입니다. `Template`을 문자열로 변환하는 표준적인 방법은 없습니다.

`Template` 및 `Interpolation` 타입 모두 유용한 `__repr__()` 구현을 제공합니다.

### string.templatelib 모듈 (The string.templatelib Module)

`string` 모듈은 패키지로 변환되며, `Template` 및 `Interpolation` 타입을 포함하는 새로운 `templatelib` 서브모듈을 가집니다. 이 PEP의 구현 이후, 이 새로운 모듈은 `convert()`와 같은 관련 함수나 향후 잠재적인 템플릿 처리 코드(예: 셸 스크립트 도우미)에 사용될 수 있습니다.

## 예제 (Examples)

이 PEP의 모든 예제는 공개 `pep750-examples` Git 저장소에 완전히 테스트된 참조 구현이 제공됩니다.

### 예제: t-strings로 f-strings 구현하기 (Example: Implementing f-strings with t-strings)

`t-strings`를 사용하여 `f-strings`를 "구현"하는 것은 쉽습니다. 즉, `f-string` 리터럴과 매우 유사하게 `Template`을 처리하고 동일한 결과를 반환하는 함수 `f(template: Template) -> str`을 작성할 수 있습니다.

```python
name = "World"
value = 42
templated = t"Hello {name!r}, value: {value:.2f}"
formatted = f"Hello {name!r}, value: {value:.2f}"
assert f(templated) == formatted
```

`f()` 함수는 `!r`과 같은 변환 지정자와 `:.2f`와 같은 형식 지정자(format specifiers)를 모두 지원합니다. 전체 코드는 매우 간단합니다.

```python
from string.templatelib import Template, Interpolation
from typing import Literal

def convert(value: object, conversion: Literal["a", "r", "s"] | None) -> object:
    if conversion == "a":
        return ascii(value)
    elif conversion == "r":
        return repr(value)
    elif conversion == "s":
        return str(value)
    return value

def f(template: Template) -> str:
    parts = []
    for item in template:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, _, conversion, format_spec):
                value = convert(value, conversion)
                value = format(value, format_spec)
                parts.append(value)
    return "".join(parts)
```

### 예제: 구조화된 로깅 (Example: Structured Logging)

구조화된 로깅을 통해 개발자는 JSON과 같은 기계가 읽을 수 있는 형식으로 데이터를 로깅할 수 있습니다. `t-strings`를 사용하면 개발자는 단일 로그 문만으로 사람이 읽을 수 있는 메시지와 함께 구조화된 데이터를 쉽게 로깅할 수 있습니다.

템플릿 문자열로 구조화된 로깅을 구현하는 두 가지 다른 접근 방식을 제시합니다.

#### 접근 방식 1: 커스텀 로그 메시지 (Approach 1: Custom Log Messages)

Python Logging Cookbook에는 구조화된 로깅을 구현하는 방법에 대한 짧은 섹션이 있습니다.

로깅 Cookbook은 간단한 텍스트 메시지와 별도의 값 딕셔너리로 구성되는 새로운 "메시지" 클래스 `StructuredMessage`를 생성할 것을 제안합니다.

```python
message = StructuredMessage("user action", {
    "action": "traded",
    "amount": 42,
    "item": "shrubs"
})
logging.info(message)
# 출력:
# user action >>> {"action": "traded", "amount": 42, "item": "shrubs"}
```

`StructuredMessage.__str__()` 메서드는 사람이 읽을 수 있는 메시지와 값을 모두 형식화하여 최종 문자열로 결합합니다.

템플릿 문자열을 사용하여 `StructuredMessage`의 개선된 버전을 구현할 수 있습니다.

```python
import json
import logging
from string.templatelib import Interpolation, Template
from typing import Mapping

class TemplateMessage:
    def __init__(self, template: Template) -> None:
        self.template = template

    @property
    def message(self) -> str:
        # 이전 예제의 f() 함수를 사용
        return f(self.template)

    @property
    def values(self) -> Mapping[str, object]:
        return {
            item.expression: item.value
            for item in self.template if isinstance(item, Interpolation)
        }

    def __str__(self) -> str:
        return f"{self.message} >>> {json.dumps(self.values)}"

_ = TemplateMessage # 선택 사항, 가독성 향상
action, amount, item = "traded", 42, "shrubs"
logging.info(_(t"User {action}: {amount:.2f} {item}"))
# 출력:
# User traded: 42.00 shrubs >>> {"action": "traded", "amount": 42, "item": "shrubs"}
```

템플릿 문자열은 커스텀 메시지 클래스를 정의하는 더 우아한 방법을 제공합니다. 템플릿 문자열을 사용하면 개발자는 더 이상 형식 문자열과 값 딕셔너리가 동기화되도록 신경 쓸 필요가 없습니다. 단일 템플릿 문자열 리터럴만 있으면 됩니다. `TemplateMessage` 구현은 `Interpolation.expression` 및 `Interpolation.value` 속성에서 구조화된 키와 값을 자동으로 추출할 수 있습니다.

#### 접근 방식 2: 커스텀 포맷터 (Approach 2: Custom Formatters)

커스텀 메시지는 구조화된 로깅에 대한 합리적인 접근 방식이지만 약간 어색할 수 있습니다. 이를 사용하려면 개발자는 작성하는 모든 로그 메시지를 커스텀 클래스로 래핑해야 합니다. 이는 잊기 쉬울 수 있습니다.

대안적인 접근 방식은 커스텀 `logging.Formatter` 클래스를 정의하는 것입니다. 이 접근 방식은 더 유연하며 최종 출력에 대한 더 많은 제어를 허용합니다. 특히, 단일 템플릿 문자열을 가져와 여러 형식(사람이 읽을 수 있는 형식 및 JSON)으로 별도의 로그 스트림으로 출력하는 것이 가능합니다.

사람이 읽을 수 있는 출력을 위한 `MessageFormatter`와 JSON 출력을 위한 `ValuesFormatter`라는 두 개의 간단한 포맷터를 정의합니다.

```python
import json
import logging
from logging import Formatter, LogRecord
from string.templatelib import Interpolation, Template
from typing import Any, Mapping

class MessageFormatter(Formatter):
    def message(self, template: Template) -> str:
        # 이전 예제의 f() 함수를 사용
        return f(template)

    def format(self, record: LogRecord) -> str:
        msg = record.msg
        if not isinstance(msg, Template):
            return super().format(record)
        return self.message(msg)

class ValuesFormatter(Formatter):
    def values(self, template: Template) -> Mapping[str, Any]:
        return {
            item.expression: item.value
            for item in template if isinstance(item, Interpolation)
        }

    def format(self, record: LogRecord) -> str:
        msg = record.msg
        if not isinstance(msg, Template):
            return super().format(record)
        return json.dumps(self.values(msg))
```

그런 다음 로거를 구성할 때 이 포맷터들을 사용할 수 있습니다.

```python
import logging
import sys

logger = logging.getLogger(__name__)

message_handler = logging.StreamHandler(sys.stdout)
message_handler.setFormatter(MessageFormatter())
logger.addHandler(message_handler)

values_handler = logging.StreamHandler(sys.stderr)
values_handler.setFormatter(ValuesFormatter())
logger.addHandler(values_handler)

action, amount, item = "traded", 42, "shrubs"
logger.info(t"User {action}: {amount:.2f} {item}")
# sys.stdout으로 출력:
# User traded: 42.00 shrubs
# 동시에, sys.stderr으로 출력:
# {"action": "traded", "amount": 42, "item": "shrubs"}
```

이 접근 방식은 구조화된 로깅에 대한 커스텀 메시지 접근 방식에 비해 몇 가지 장점이 있습니다.

*   개발자는 커스텀 클래스로 래핑하지 않고도 `t-string`을 직접 로깅할 수 있습니다.
*   사람이 읽을 수 있는 출력과 구조화된 출력을 별도의 로그 스트림으로 보낼 수 있습니다. 이는 사람이 읽을 수 있는 데이터와 독립적으로 구조화된 데이터를 처리하는 로그 집계 시스템에 유용합니다.

### 예제: HTML 템플릿 (Example: HTML Templating)

이 PEP에는 여러 짧은 HTML 템플릿 예제가 포함되어 있습니다. "동기 (Motivation)" 섹션(및 이 PEP의 다른 몇 군데)에 언급된 "가상의" `html()` 함수가 존재하며 `pep750-examples` 저장소에서 사용할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)

`f-strings`와 마찬가지로 템플릿 문자열의 사용은 이전 버전과의 구문적 하위 호환성을 깨는 요소가 됩니다.

## 보안 영향 (Security Implications)

보간과 관련하여 템플릿 문자열 작업의 보안 영향은 다음과 같습니다.

*   스코프(Scope) 조회는 `f-strings`와 동일합니다(어휘적 스코프). 이 모델은 실제로 잘 작동하는 것으로 나타났습니다.
*   `Template` 인스턴스를 처리하는 코드는 모든 보간이 나타나는 컨텍스트를 존중하는 등 안전한 방식으로 처리되도록 보장할 수 있습니다.

## 교육 방법 (How To Teach This)

템플릿 문자열에는 여러 대상이 있습니다.

*   템플릿 문자열 및 처리 함수를 사용하는 개발자
*   템플릿 처리 코드의 작성자
*   템플릿 문자열로 흥미로운 메커니즘을 구축하는 프레임워크 작성자

개발자를 교육하는 것은 간단할 것으로 예상됩니다. 언뜻 보기에 템플릿 문자열은 `f-strings`와 똑같이 생겼습니다. 문법은 친숙하고 스코핑 규칙은 동일하게 유지됩니다.

개발자가 가장 먼저 배워야 할 것은 템플릿 문자열 리터럴이 문자열로 평가되지 않고, 새로운 타입인 `Template`으로 평가된다는 것입니다. 이는 템플릿 처리 코드에 의해 사용될 의도로 만들어진 간단한 타입입니다. 개발자가 처리 함수를 호출해야만 원하는 결과(일반적으로 문자열)를 얻을 수 있으며, 물론 처리 코드는 임의의 타입을 반환할 수 있습니다.

개발자는 또한 템플릿 문자열이 `f-strings` 및 `str.format()`과 같은 다른 문자열 형식화 방법과 어떻게 관련되는지 이해해야 할 것입니다. 각 방법을 언제 사용해야 할지 결정해야 합니다. 간단한 문자열만 필요하고 보안 영향이 없다면 `f-strings`가 최선의 선택일 것입니다. 형식 문자열이 사용되는 대부분의 경우, 템플릿 문자열 생성을 래핑하는 함수로 대체할 수 있습니다. 형식 문자열이 사용자 입력, 파일 시스템 또는 데이터베이스에서 얻어지는 경우, 원한다면 이를 `Template` 인스턴스로 변환하는 코드를 작성할 수 있습니다.

개발자는 `t-strings`가 거의 항상 처리 함수와 함께 사용된다는 것을 배울 것이기 때문에 `Template` 타입의 세부 사항을 반드시 이해할 필요는 없습니다. 디스크립터(descriptors) 및 데코레이터(decorators)와 마찬가지로, `t-string` 처리 함수를 작성하는 개발자보다 `t-strings`를 사용하는 개발자가 훨씬 더 많을 것으로 예상됩니다.

시간이 지남에 따라 소수의 더 고급 개발자들은 자체 템플릿 처리 코드를 작성하기를 원할 것입니다. 처리 코드를 작성하는 것은 종종 형식 문법(formal grammars)의 관점에서 생각해야 합니다. 개발자는 `Template` 인스턴스의 `strings` 및 `interpolation` 속성과 함께 작업하는 방법과 컨텍스트에 민감한 방식으로 보간을 처리하는 방법을 배워야 합니다. 더 정교한 문법은 추상 구문 트리(AST)와 같은 중간 표현(intermediate representations)으로 파싱해야 할 가능성이 높습니다. 훌륭한 템플릿 처리 코드는 적절할 때 형식 지정자 및 변환을 처리할 것입니다. 프로덕션 수준의 템플릿 처리 코드(예: HTML 템플릿을 지원하기 위한)를 작성하는 것은 큰 작업이 될 수 있습니다.

템플릿 문자열은 프레임워크 작성자에게 도구 상자에 강력한 새 도구를 제공할 것으로 예상됩니다. 템플릿 문자열의 기능이 템플릿 엔진과 같은 기존 도구와 겹치지만, `t-strings`는 해당 로직을 언어 자체로 옮깁니다. Python의 모든 강력함과 일반성을 문자열 처리 작업에 적용하는 것은 프레임워크 작성자에게 새로운 가능성을 열어줍니다.

## 또 다른 템플릿 접근 방식이 필요한 이유 (Why another templating approach?)

Python 세계에는 Jinja와 같이 널리 채택된 성숙한 템플릿 언어가 이미 존재합니다. 새로운 템플릿 시스템 생성을 위한 지원을 구축하는 이유는 무엇일까요?

Jinja와 같은 프로젝트는 템플릿이 개발자에 의한 소프트웨어의 일부라기보다는 디자이너 또는 심지어 사용자(예: CMS)가 생성한 콘텐츠의 일부인 경우 여전히 필요합니다.

프런트엔드 개발의 추세는 템플릿을 소프트웨어의 일부로 간주하고 개발자가 작성합니다. 그들은 최신 언어 기능과 좋은 툴링 경험을 원합니다. PEP 750은 비정적 부분이 Python인 DSL(Domain-Specific Languages)을 구상합니다. 즉, 동일한 스코프 규칙, 타이핑, 표현식 구문 등을 가집니다.

## 템플릿 처리에서 흔히 볼 수 있는 패턴 (Common Patterns Seen in Processing Templates)

### 구조적 패턴 매칭 (Structural Pattern Matching)

구조적 패턴 매칭을 사용하여 `Template`을 반복하는 것은 많은 템플릿 함수 구현에서 예상되는 모범 사례입니다.

```python
from string.templatelib import Template, Interpolation
from typing import Any

def process(template: Template) -> Any:
    for item in template:
        match item:
            case str() as s:
                ... # 각 문자열 부분 처리
            case Interpolation() as interpolation:
                ... # 각 보간 처리
```

처리 코드는 `Interpolation` 타입의 속성에 대해 하위 매칭(sub-match)하는 것이 일반적일 수도 있습니다.

```python
match arg:
    case Interpolation(int()):
        ... # 정수 값을 가진 보간 처리
    case Interpolation(value=str() as s):
        ... # 문자열 값을 가진 보간 처리
    # 등등
```

### 메모이제이션 (Memoizing)

템플릿 함수는 템플릿의 정적 및 동적 부분을 효율적으로 처리할 수 있습니다. `Template` 객체의 구조는 효과적인 메모이제이션(memoization)을 허용합니다.

```python
strings = template.strings # 정적 문자열 부분
values = template.values # 동적 보간된 값
```

이러한 분리를 통해 처리된 정적 부분은 캐시하고 동적 부분은 필요에 따라 삽입할 수 있습니다. 템플릿 처리 코드의 작성자는 정적 문자열을 캐시 키로 사용하여 유사한 템플릿이 반복적으로 사용될 때 상당한 성능 향상을 이끌어낼 수 있습니다.

### 중간 표현으로 파싱 (Parsing to Intermediate Representations)

템플릿을 처리하는 코드는 템플릿 문자열을 AST(Abstract Syntax Tree)와 같은 중간 표현으로 파싱할 수 있습니다. 많은 템플릿 처리 라이브러리가 이 접근 방식을 사용할 것으로 예상됩니다.

예를 들어, 우리의 이론적인 `html()` 함수(`Motivation` 섹션 참조)는 `str`을 반환하는 대신 동일한 패키지에 정의된 HTML `Element`를 반환할 수 있습니다.

```python
from dataclasses import dataclass
from typing import Mapping, Sequence

@dataclass(frozen=True)
class Element:
    tag: str
    attributes: Mapping[str, str | bool]
    children: Sequence[str | Element]

    def __str__(self) -> str: ...

def html(template: Template) -> Element: ...
```

그러면 `str(element)`를 호출하면 HTML이 렌더링되지만, 그동안 `Element`는 다양한 방식으로 조작될 수 있습니다.

### 컨텍스트에 민감한 보간 처리 (Context-sensitive Processing of Interpolations)

가상의 `html()` 함수를 계속해서, 이를 컨텍스트에 민감하게 만들 수 있습니다. 보간은 템플릿에 나타나는 위치에 따라 다르게 처리될 수 있습니다.

예를 들어, `html()` 함수는 여러 종류의 보간을 지원할 수 있습니다.

```python
attributes = {"id": "main"}
attribute_value = "shrubbery"
content = "hello"
template = t"<div {attributes} data-value={attribute_value}>{content}</div>"
element = html(template)
assert str(element) == '<div id="main" data-value="shrubbery">hello</div>'
```

*   `{attributes}` 보간은 HTML 태그 컨텍스트에서 발생하고 해당하는 속성 이름이 없기 때문에 속성 딕셔너리로 처리됩니다.
*   `{attribute_value}` 보간은 단순한 문자열 값으로 처리되고 최종 문자열에 포함되기 전에 인용됩니다.
*   `{content}` 보간은 잠재적으로 안전하지 않은 콘텐츠로 처리되고 최종 문자열에 포함되기 전에 이스케이프됩니다.

### 중첩된 템플릿 문자열 (Nested Template Strings)

`html()` 함수로 한 단계 더 나아가 중첩된 템플릿 문자열을 지원할 수 있습니다. 이를 통해 더 간단한 템플릿으로 더 복잡한 HTML 구조를 구축할 수 있습니다.

```python
name = "World"
content = html(t"<p>Hello {name}</p>")
template = t"<div>{content}</div>"
element = html(template)
assert str(element) == '<div><p>Hello World</p></div>'
```

`{content}` 보간은 `Element` 인스턴스이므로 최종 문자열에 포함되기 전에 이스케이프될 필요가 없습니다.

`html()` 함수에 `Template` 인스턴스가 전달되면 중첩된 템플릿에 대해 재귀적으로 자신을 호출하여 자동으로 `Element`로 변환할 수 있다는 멋진 단순화를 상상할 수 있습니다.

템플릿의 중첩 및 구성은 템플릿 처리 코드에서 일반적인 패턴이 될 것이며, 적절한 경우 단순한 문자열 연결보다 선호될 것으로 예상됩니다.

### 지연 평가 접근 방식 (Approaches to Lazy Evaluation)

`f-strings`와 마찬가지로 `t-string` 리터럴의 보간은 즉시 평가됩니다. 그러나 지연 평가(lazy evaluation)가 바람직할 수 있는 경우가 있습니다.

단일 보간이 평가하는 데 비용이 많이 드는 경우, 템플릿 문자열 리터럴에서 람다로 명시적으로 래핑할 수 있습니다.

```python
name = "World"
template = t"Hello {(lambda: name)}"
assert callable(template.interpolations[0].value)
assert template.interpolations[0].value() == "World"
```

물론, 이는 템플릿 처리 코드가 호출 가능한 보간 값을 예상하고 처리한다고 가정합니다. (이터레이터(iterators), 어웨이터블(awaitables) 등도 지원할 수 있다고 상상할 수 있습니다.) 이는 PEP의 요구 사항은 아니지만, 템플릿 처리 코드에서 일반적인 패턴입니다.

일반적으로 커뮤니티가 템플릿 문자열에서 보간의 지연 평가에 대한 모범 사례를 개발하고, 합리적인 경우 공통 라이브러리가 템플릿 처리 코드에서 호출 가능한 또는 어웨이터블(awaitable) 값을 지원하기를 바랍니다.

### 비동기 평가 접근 방식 (Approaches to Asynchronous Evaluation)

지연 평가와 밀접하게 관련된 것은 비동기 평가(asynchronous evaluation)입니다.

`f-strings`와 마찬가지로 `await` 키워드는 보간에서 허용됩니다.

```python
import asyncio

async def example():
    async def get_name() -> str:
        await asyncio.sleep(1)
        return "Sleepy"
    # f() 함수는 이전 f-string 예제에서 가져옴
    assert f(t"Hello {await get_name()}") == "Hello Sleepy"
```

더 정교한 템플릿 처리 코드는 이를 활용하여 보간에서 비동기 작업을 수행할 수 있습니다. 예를 들어, "스마트한" 처리 함수는 보간이 어웨이터블임을 예상하고 템플릿 문자열을 처리하기 전에 `await`할 수 있습니다.

```python
import asyncio

async def async_f(template: Template) -> str:
    # ... async 처리 로직
    pass

async def example():
    async def get_name() -> str:
        await asyncio.sleep(1)
        return "Sleepy"
    template = t"Hello {get_name}"
    assert await async_f(template) == "Hello Sleepy"
```

이는 `async_f()`의 템플릿 처리 코드가 비동기적이고 보간 값(`get_name` 코루틴)을 `await`할 수 있다고 가정합니다.

### 템플릿 재사용 접근 방식 (Approaches to Template Reuse)

개발자가 다른 값으로 템플릿 문자열을 여러 번 재사용하려면 `Template` 인스턴스를 반환하는 함수를 작성할 수 있습니다.

```python
def reusable(name: str, question: str) -> Template:
    return t"Hello {name}, {question}?"

template1 = reusable("friend", "how are you")
template2 = reusable("King Arthur", "what is your quest")
```

물론 이는 `f-strings`가 재사용될 수 있는 방식과 다르지 않습니다.

### 형식 문자열과의 관계 (Relation to Format Strings)

오래된 `str.format()` 메서드는 나중에 값을 형식화하는 데 사용할 수 있는 형식 문자열(format strings)을 허용합니다.

```python
alas_fmt = "We're all out of {cheese}."
assert alas_fmt.format(cheese="Red Leicester") == "We're all out of Red Leicester."
```

형식 문자열을 일종의 함수 정의로 생각할 수 있습니다. `str.format()` 호출은 일종의 함수 호출로 볼 수 있습니다. `t-string`의 해당 기능은 `Template` 인스턴스를 반환하는 표준 Python 함수를 정의하는 것입니다.

```python
def make_template(*, cheese: str) -> Template:
    return t"We're all out of {cheese}."

template = make_template(cheese="Red Leicester")
# 위 f-string 예제의 f() 함수를 사용
assert f(template) == "We're all out of Red Leicester."
```

`make_template()` 함수 자체는 형식 문자열과 유사하다고 생각할 수 있습니다. `make_template()` 호출은 `str.format()` 호출과 유사합니다.

물론, 파일 시스템이나 데이터베이스와 같은 외부 소스에서 형식 문자열을 로드하는 것이 일반적입니다. 다행히 `Template` 및 `Interpolation`은 단순한 Python 타입이므로, 이전 스타일의 형식 문자열을 가져와 동등한 `Template` 인스턴스를 반환하는 함수를 작성할 수 있습니다.

```python
def from_format(fmt: str, /, *args: object, **kwargs: object) -> Template:
    """`fmt`를 파싱하고 `Template` 인스턴스를 반환합니다."""
    ...

# 파일, 데이터베이스 등에서 로드
fmt = "We're all out of {cheese}."
template = from_format(fmt, cheese="Red Leicester")
# 위 f-string 예제의 f() 함수를 사용
assert f(template) == "We're all out of Red Leicester."
```

이는 개발자가 이전에 형식 문자열을 사용했을 곳에 템플릿 문자열을 사용할 수 있도록 하는 강력한 패턴입니다. `from_format()`의 전체 구현은 예제 저장소에서 사용할 수 있으며, 형식 문자열의 전체 문법을 지원합니다.

## 참조 구현 (Reference Implementation)

PEP 750의 CPython 구현이 제공됩니다.

또한 참조 구현을 기반으로 구축된 예제 및 테스트의 공개 저장소가 있습니다. 템플릿 문자열을 가지고 놀고 싶다면 이 저장소가 시작하기에 좋은 곳입니다.

## 거부된 아이디어 (Rejected Ideas)

이 PEP는 여러 중요한 개정판을 거쳤습니다. 또한 PEP 501의 개정판과 Discourse 논의에서 상당히 많은 흥미로운 아이디어들이 고려되었습니다.

고려되었지만 거부된 가장 중요한 아이디어들을 문서화하려고 합니다.

### 임의의 문자열 리터럴 접두사 (Arbitrary String Literal Prefixes)

JavaScript 태그된 템플릿 리터럴(tagged template literals)에서 영감을 받아, 이 PEP의 이전 버전은 리터럴 문자열 앞에 임의의 "태그" 접두사를 허용했습니다.

```python
my_tag'Hello {name}'
```

접두사는 "태그 함수(tag function)"라고 불리는 특별한 호출 가능한(callable) 객체였습니다. 태그 함수는 인자 목록으로 템플릿 문자열의 부분들을 받았습니다. 그런 다음 문자열을 처리하고 임의의 값을 반환할 수 있었습니다.

```python
def my_tag(*args: str | Interpolation) -> Any: ...
```

이 접근 방식은 여러 가지 이유로 거부되었습니다.

*   완전한 일반성을 구축하기에는 너무 복잡하다고 판단되었습니다. JavaScript는 템플릿 문자열 앞에 임의의 표현식을 허용하며, 이는 Python에서 구현하기에 상당한 도전입니다.
*   새로운 문자열 접두사의 향후 도입을 배제했습니다.
*   네임스페이스를 불필요하게 오염시키는 것으로 보였습니다.

단일 `t` 접두사를 사용하는 것이 더 간단하고 Python스러운 접근 방식이며, `f-strings`의 일반화로서 템플릿 문자열의 역할과 더 일치한다고 판단되었습니다.

### 보간의 지연 평가 (Delayed Evaluation of Interpolations)

이 PEP의 초기 버전은 보간이 지연 평가되어야 한다고 제안했습니다. 모든 보간은 암시적 람다로 "래핑"되었습니다. 즉시 평가되는 `value` 속성 대신, 보간에는 보간 값을 해결하는 `getvalue()` 메서드가 있었습니다.

```python
class Interpolation:
    ...
    _value: Callable[[], object]
    def getvalue(self) -> object:
        return self._value()
```

이는 여러 가지 이유로 거부되었습니다.

*   템플릿 문자열의 압도적인 대다수 사용 사례는 자연스럽게 즉시 평가를 요구합니다.
*   지연 평가는 `f-strings`의 동작과 상당한 차이가 있을 것입니다.
*   암시적 람다 래핑은 타입 힌트(type hints) 및 정적 분석(static analysis)에 어려움을 초래합니다.

가장 중요하게도, 지연 평가가 바람직한 많은 경우에 암시적 람다 래핑에 대한 실현 가능한(완벽하지는 않지만) 대안이 있습니다. 자세한 내용은 위의 "Approaches to Lazy Evaluation" 섹션을 참조하십시오.

이 PEP에서는 지연 평가가 거부되었지만, 커뮤니티가 이 아이디어를 계속 탐구하기를 바랍니다.

### Template 및 Interpolation을 프로토콜로 만들기 (Making Template and Interpolation Into Protocols)

이 PEP의 초기 버전은 `Template` 및 `Interpolation` 타입을 클래스 대신 런타임 검사 가능 프로토콜(runtime checkable protocols)로 제안했습니다.

결론적으로, 클래스를 사용하는 것이 더 간단하다고 판단되었습니다.

### Template 및 Interpolation에 대한 \_\_eq\_\_ 및 \_\_hash\_\_ 오버라이드 (Overridden __eq__ and __hash__ for Template and Interpolation)

이 PEP의 이전 버전은 `Template` 및 `Interpolation` 타입이 자체 `__eq__` 및 `__hash__` 구현을 가져야 한다고 제안했습니다.

*   템플릿은 `strings` 및 `interpolations`가 같으면 같다고 간주되었습니다.
*   보간은 `value`, `expression`, `conversion`, `format_spec`이 같으면 같다고 간주되었습니다.
*   `Interpolation` 해싱은 튜플 해싱과 유사했습니다. 즉, `Interpolation`은 `value`가 해시 가능할 때만 해시 가능했습니다.

이것은 `Template.__hash__`가 템플릿 처리 코드에서 캐시 키로 유용하지 않기 때문에 거부되었습니다. 이는 개발자에게 혼란을 줄 수 있다는 우려가 있었습니다.

이러한 `__eq__` 및 `__hash__` 구현을 삭제함으로써 다음과 같은 assert를 작성할 수 있는 능력을 잃게 됩니다.

```python
name = "World"
assert t"Hello " + t"{name}" == t"Hello {name}"
```

`Template` 인스턴스가 추가 코드에 의해 빠르게 처리될 의도이므로, 이러한 assert의 유용성은 제한적이라고 판단했습니다.

### 추가 Decoded 타입 (An Additional Decoded Type)

이 PEP의 초기 버전은 템플릿 문자열의 "정적 문자열" 부분을 나타내기 위한 `Decoded`라는 추가 타입을 제안했습니다. 이 타입은 `str`에서 파생되었으며, 문자열의 원래 텍스트를 제공하는 단일 `raw` 속성을 가졌습니다. 우리는 일반 `str`을 사용하고 `r` 및 `t` 접두사의 조합을 허용하는 더 간단한 접근 방식을 선호하여 이를 거부했습니다.

### Template 및 Interpolation의 최종 위치 (The Final Home for Template and Interpolation)

이 PEP의 이전 버전은 `Template` 및 `Interpolation` 타입을 `types`, `collections`, `collections.abc`, 심지어 새로운 최상위 모듈인 `templatelib`에 배치할 것을 제안했습니다. 최종 결정은 `string.templatelib`에 배치하는 것이었습니다.

### 원본 템플릿 리터럴의 완전한 재구성 활성화 (Enable Full Reconstruction of Original Template Literal)

이 PEP의 이전 버전은 `Template` 인스턴스에서 원본 템플릿 문자열의 텍스트를 완전히 재구성할 수 있도록 시도했습니다. 이는 지나치게 복잡하다고 판단되어 거부되었습니다. 템플릿 리터럴 소스와 기본 AST 간의 매핑은 일대일이 아니며, 원본 소스 텍스트로 라운드 트립(round-tripping)하는 데 몇 가지 제한 사항이 있습니다.

첫째, `Interpolation.format_spec`은 제공되지 않으면 `""`로 기본 설정됩니다.

```python
value = 42
template1 = t"{value}"
template2 = t"{value:}"
assert template1.interpolations[0].format_spec == ""
assert template2.interpolations[0].format_spec == ""
```

다음으로, 디버그 지정자 `=`는 특수한 경우로 처리되며 AST가 생성되기 전에 처리됩니다. 따라서 `t"{value=}"`와 `t"value={value!r}"`를 구별하는 것은 불가능합니다.

```python
value = 42
template1 = t"{value=}"
template2 = t"value={value!r}"
assert template1.strings[0] == "value="
assert template1.interpolations[0].expression == "value"
assert template1.interpolations[0].conversion == "r"
assert template2.strings[0] == "value="
assert template2.interpolations[0].expression == "value"
assert template2.interpolations[0].conversion == "r"
```

마지막으로, `f-strings`의 형식 지정자는 임의의 중첩을 허용합니다. 이 PEP 및 참조 구현에서는 지정자가 즉시 평가되어 `Interpolation`의 `format_spec`을 설정하므로 원래 표현식을 잃게 됩니다. 예를 들어:

```python
value = 42
precision = 2
template1 = t"{value:.2f}"
template2 = t"{value:.{precision}f}"
assert template1.interpolations[0].format_spec == ".2f"
assert template2.interpolations[0].format_spec == ".2f"
```

이러한 제한 사항이 실제로 중요한 문제가 될 것이라고는 예상하지 않습니다. 원본 템플릿 문자열 리터럴을 얻어야 하는 개발자는 항상 `inspect.getsource()` 또는 유사한 도구를 사용할 수 있습니다.

### 템플릿 연결 금지 (Disallowing Template Concatenation)

이 PEP의 이전 버전은 `Template` 인스턴스가 연결을 지원해서는 안 된다고 제안했습니다. 여러 `Template` 인스턴스의 연결을 허용하는 방향으로 거부되었습니다.

하나 또는 모든 형태의 연결을 거부하는 데는 합리적인 주장이 있습니다. 즉, 이는 잠재적인 버그 클래스를 차단하며, 특히 템플릿 문자열이 연결이 항상 동일한 의미(또는 어떤 의미도)를 갖지 않는 복잡한 문법을 포함할 것이라는 관점을 취할 때 그렇습니다.

더욱이, 이 PEP의 초기 버전은 JavaScript의 태그된 템플릿 리터럴에 더 가까운 구문을 제안했으며, 여기서 임의의 호출 가능한(callable) 객체를 문자열 리터럴의 접두사로 사용할 수 있었습니다. 호출 가능한 객체가 연결을 지원하는 타입을 반환한다는 보장이 없었습니다.

결론적으로, 새로운 문자열 타입이 연결을 지원하지 않는다는 것이 개발자들에게 줄 놀라움이 지원함으로써 발생하는 이론적인 해로움보다 클 것이라고 판단했습니다.

이 PEP는 두 `Template`의 연결을 지원하지만, `Template`과 `str`의 연결은 지원하지 않습니다. 이는 `str`이 정적 문자열로 처리되어야 하는지 또는 보간으로 처리되어야 하는지 모호하기 때문입니다. 개발자는 위에서 설명한 대로 `str`을 다른 `Template`과 연결하기 전에 `Template` 인스턴스로 래핑해야 합니다.

템플릿 문자열을 사용하는 코드는 연결보다는 중첩 및 구성을 통해 더 큰 템플릿을 구축하는 것이 더 일반적일 것으로 예상됩니다.

### 임의의 변환 값 (Arbitrary Conversion Values)

Python은 가능한 변환 타입 값으로 `r`, `s`, 또는 `a`만 허용합니다. 다른 값을 할당하려고 하면 `SyntaxError`가 발생합니다.

이론적으로 템플릿 함수는 다른 변환 타입을 처리하도록 선택할 수 있습니다. 그러나 이 PEP는 PEP 701을 엄격하게 준수합니다. 허용되는 값에 대한 모든 변경 사항은 별도의 PEP에서 다루어져야 합니다.

### Interpolation에서 conversion 제거 (Removing conversion From Interpolation)

이 PEP를 초안 작성하는 동안 `Interpolation`에서 `conversion` 속성을 제거하고, `Interpolation.value`가 설정되기 전에 변환이 즉시 수행되도록 지정하는 것을 고려했습니다.

이는 템플릿 처리 코드 작성 작업을 단순화하기 위한 것이었습니다. `conversion` 속성은 확장성이 제한적입니다(`Literal["r", "s", "a"] | None`으로 타입 지정됨). 커스텀 형식 지정자로 더 잘 달성할 수 없는 템플릿 문자열에 상당한 가치나 유연성을 추가하는지는 명확하지 않습니다. 형식 지정자와 달리 Python의 내장 `format()`과 동등한 것이 없습니다. (대신 "Examples" 섹션에 `convert()`의 샘플 구현을 포함합니다.)

궁극적으로 우리는 `f-strings`와의 호환성을 유지하고 향후 확장성을 허용하기 위해 `conversion` 속성을 `Interpolation` 타입에 유지하기로 결정했습니다.

### 대체 보간 기호 (Alternate Interpolation Symbols)

이 PEP의 초기 단계에서 템플릿 문자열에서 보간에 대한 대체 기호를 허용하는 것을 고려했습니다. 예를 들어, i18n 또는 다른 목적에 유용할 수 있다는 생각으로 `{name}`의 대안으로 `${name}`을 허용하는 것을 고려했습니다. 자세한 내용은 Discourse 스레드를 참조하십시오.

이는 `t-string` 문법을 `f-string` 문법과 가능한 한 가깝게 유지하는 것을 선호하여 거부되었습니다.

### Template의 대체 레이아웃 (Alternate Layouts for Template)

이 PEP 개발 중에 `Template` 타입에 대한 여러 대체 레이아웃을 고려했습니다. 많은 것들이 문자열과 보간을 모두 포함하는 단일 `args` 튜플에 초점을 맞췄습니다. 변형에는 다음이 포함되었습니다.

*   `args`는 `tuple[str | Interpolation, ...]`이었고, 첫 번째 및 마지막 항목이 문자열이고 문자열과 보간이 항상 번갈아 나타난다는 약속이 있었습니다. 이는 `args`가 항상 비어 있지 않고 인접한 보간 사이에 빈 문자열이 삽입됨을 의미했습니다. 이는 교대가 타입 시스템에 의해 포착될 수 없고 우리가 만들고자 하는 보장이 아니었기 때문에 거부되었습니다.
*   `args`는 `tuple[str | Interpolation, ...]`으로 유지되었지만 인터리빙(interleaving)을 지원하지 않았습니다. 결과적으로 빈 문자열은 시퀀스에 추가되지 않았습니다. 더 이상 `args[::2]`로 정적 문자열을 얻을 수 없었고, 대신 문자열과 보간을 구별하기 위해 인스턴스 검사 또는 구조적 패턴 매칭을 사용해야 했습니다. 이 접근 방식은 성능 최적화를 위한 향후 기회가 적다고 판단되어 거부되었습니다.
*   `args`는 `Sequence[tuple[str, Interpolation | None]]`으로 타입 지정되었습니다. 각 정적 문자열은 인접한 보간과 쌍을 이루었습니다. 최종 문자열 부분에는 해당하는 보간이 없었습니다. 이는 지나치게 복잡하다고 판단되어 거부되었습니다.

### 템플릿 "종류"를 설명하는 메커니즘 (Mechanism to Describe the “Kind” of Template)

`t-strings`가 인기를 얻으면 템플릿 문자열에서 발견되는 콘텐츠의 "종류"(예: "sql", "html", "css" 등)를 설명하는 방법이 유용할 수 있습니다. 이는 린터(linters), 포맷터(formatters), 타입 체커(type checkers), IDE와 같은 도구에서 강력한 새 기능을 가능하게 할 수 있습니다. (예를 들어, `t-strings`에서 HTML을 포맷하는 `black`이나 주어진 속성이 HTML 태그에 유효한지 확인하는 `mypy`를 상상해 보세요.) 흥미롭기는 하지만, 이 PEP는 특정 메커니즘을 제안하지 않습니다. 시간이 지남에 따라 커뮤니티가 이 목적을 위한 규칙을 개발하기를 바랍니다.

### 바이너리 템플릿 문자열 (Binary Template Strings)

`t-strings`와 바이트(`tb`)의 조합은 이 PEP의 범위를 벗어나는 것으로 간주됩니다. 그러나 `f-strings`와 달리 `t-strings`와 바이트를 결합할 수 없는 근본적인 이유는 없습니다. 향후 PEP에서 지원이 고려될 수 있습니다.

## 감사의 말 (Acknowledgements)

템플릿 문자열로 이어진 아이디어 개발에 기여해준 Ryan Morshead에게 감사드립니다. 또한 몇 년 전에 유사한 아이디어를 다룬 Dropbox의 `pyxl`에게 특별한 언급을 합니다. Andrea Giammarchi는 이 PEP의 초기 초안에 대해 사려 깊은 피드백을 제공했습니다. 마지막으로, `tagged` 라이브러리에 대한 선구적인 작업에 대해 Joachim Viide에게 감사드립니다. `tagged`는 템플릿 문자열의 전신일 뿐만 아니라 GitHub 이슈 댓글을 통해 전체 노력이 시작된 곳입니다!

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.