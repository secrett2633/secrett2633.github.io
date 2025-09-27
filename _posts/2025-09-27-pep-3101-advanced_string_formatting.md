---
title: "[Final] PEP 3101 - Advanced String Formatting"
excerpt: "Python Enhancement Proposal 3101: 'Advanced String Formatting'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3101/
toc: true
toc_sticky: true
date: 2025-09-27 14:16:14+0900
last_modified_at: 2025-09-27 14:16:14+0900
published: true
---
> **원문 링크:** [PEP 3101 - Advanced String Formatting](https://peps.python.org/pep-3101/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Apr-2006

## PEP 3101 – 고급 문자열 포매팅

### 초록 (Abstract)
이 PEP(Python Enhancement Proposal)는 기존의 '%' 문자열 포매팅 연산자를 대체하기 위한 새로운 내장 문자열 포매팅 시스템을 제안합니다.

### 도입 배경 (Rationale)
Python은 현재 두 가지 문자열 보간(interpolation) 방식을 제공합니다:
1.  문자열에 대한 '%' 연산자.
2.  `string.Template` 모듈.

이 PEP의 주요 범위는 내장 문자열 포매팅 연산자(즉, 내장 문자열 타입의 메서드)에 대한 제안과 관련이 있습니다.

'%' 연산자는 이항 연산자(binary operator)라는 한계가 있으며, 따라서 최대 두 개의 인자만 취할 수 있습니다. 그중 하나는 이미 포맷 문자열(format string)에 할당되어, 나머지 모든 변수는 남은 인자 하나에 담겨야 합니다. 현재 관행은 두 번째 인자로 딕셔너리(dictionary)나 튜플(tuple)을 사용하는 것이지만, 많은 사람들이 지적했듯이 이것은 유연성이 부족합니다. "전부 또는 전무(all or nothing)" 접근 방식(즉, 위치 인자만 사용하거나, 이름 있는(named) 인자만 사용해야 하는 것)은 너무 제약적이라고 여겨집니다.

이 제안과 `string.Template` 사이에 일부 중복이 있지만, 각각이 서로 다른 요구를 충족하며 하나가 다른 하나를 불필요하게 만들지 않는다고 여겨집니다. 이 제안은 '%' 연산자처럼 한 번만 사용되는 작은 문자열에 효율적인 메커니즘을 위한 것입니다. 따라서 예를 들어, 문자열을 템플릿으로 컴파일하는 것은 이 제안에서 고려되지 않지만, 제안은 포맷 문자열과 API를 정의하여 효율적인 템플릿 패키지가 문법과 일부 기본 포매팅 코드를 재사용할 수 있도록 합니다.

### 명세 (Specification)
이 명세는 다음 부분들로 구성됩니다:

*   내장 `str` 클래스에 추가될 새로운 포매팅 메서드의 명세.
*   기본 포매팅 엔진을 추가 옵션과 함께 사용할 수 있도록 `string` 모듈에 추가될 함수 및 플래그 값의 명세.
*   포맷 문자열을 위한 새로운 문법의 명세.
*   객체의 포매팅 및 변환을 제어하는 새로운 특수 메서드 집합의 명세.
*   사용자 정의 포매팅 클래스를 위한 API 명세.
*   포매팅 오류 처리 방식의 명세.

**문자열 인코딩에 대한 참고:** Python 3.0 맥락에서 이 PEP를 논의할 때는 모든 문자열이 유니코드(unicode) 문자열이며, 이 문서에서 'string'이라는 단어는 일반적으로 Python 3.0 문자열(Python 2.x의 `unicode` 객체와 동일)을 지칭한다고 가정합니다.

Python 2.x 맥락에서는 이 문서에서 'string'이라는 단어가 일반 문자열 객체 또는 유니코드 객체일 수 있는 객체를 지칭합니다. 이 PEP에 설명된 모든 함수 호출 인터페이스는 문자열과 유니코드 객체 모두에 사용될 수 있으며, 모든 경우에 올바른 출력 문자열 타입을 추론하기에 충분한 정보가 있습니다 (즉, 두 개의 분리된 API가 필요하지 않습니다). 모든 경우에 포맷 문자열의 타입이 우선합니다. 즉, 변환 결과는 항상 입력 포맷 문자열과 동일한 문자 표현을 포함하는 객체가 됩니다.

#### 문자열 메서드 (String Methods)
내장 `str` 클래스(및 2.6 버전의 `unicode` 클래스)는 임의의 수의 위치(positional) 및 키워드(keyword) 인자를 받는 새로운 `format` 메서드를 얻게 됩니다:

```python
"The story of {0}, {1}, and {c}".format(a, b, c=d)
```
포맷 문자열 내에서 각 위치 인자는 0부터 시작하는 숫자로 식별됩니다. 위 예시에서 'a'는 인자 0이고 'b'는 인자 1입니다. 각 키워드 인자는 해당 키워드 이름으로 식별되므로, 위 예시에서 'c'는 세 번째 인자를 참조하는 데 사용됩니다.

또한, 단일 값을 포매팅하는 전역 내장 함수 `format`이 있습니다:

```python
print(format(10.0, "7.3g"))
```

이 함수는 나중에 설명됩니다.

#### 포맷 문자열 (Format Strings)
포맷 문자열은 문자 데이터와 마크업이 혼합되어 구성됩니다.

*   **문자 데이터(Character data):** 포맷 문자열에서 출력 문자열로 변경 없이 전달되는 데이터입니다.
*   **마크업(Markup):** 포맷 문자열에서 출력으로 직접 전달되지 않지만, 대신 포맷 엔진에 출력 문자열에서 마크업 대신 무엇을 넣어야 하는지 설명하는 '치환 필드(replacement fields)'를 정의하는 데 사용됩니다.

중괄호(`{}`)는 문자열 내에서 치환 필드를 나타내는 데 사용됩니다:

```python
"My name is {0}".format('Fred')
```

이것의 결과는 다음 문자열이 됩니다:

```
"My name is Fred"
```

중괄호는 이중으로 사용하여 이스케이프(escape)할 수 있습니다:

```python
"My name is {0} :-{{}}".format('Fred')
```

이것은 다음을 생성합니다:

```
"My name is Fred :-{}"
```

중괄호 안의 요소는 '필드(field)'라고 불립니다. 필드는 '필드 이름(field name)'(단순하거나 복합적일 수 있음)과 선택적인 '포맷 지정자(format specifier)'로 구성됩니다.

#### 단순 및 복합 필드 이름 (Simple and Compound Field Names)
단순 필드 이름은 이름 또는 숫자입니다. 숫자이면 유효한 10진수 정수여야 하고, 이름이면 유효한 Python 식별자(identifier)여야 합니다. 숫자는 위치 인자를 식별하는 데 사용되고, 이름은 키워드 인자를 식별하는 데 사용됩니다.

복합 필드 이름은 표현식에서 여러 단순 필드 이름의 조합입니다:

```python
"My name is {0.name}".format(open('out.txt', 'w'))
```

이 예시는 필드 표현식에서 `getattr` 또는 '점(dot)' 연산자를 사용하는 것을 보여줍니다. 점 연산자는 입력 값의 속성(attribute)을 필드 값으로 지정할 수 있도록 합니다.

다른 일부 프로그래밍 언어와 달리, 포맷 문자열에 임의의 표현식(arbitrary expressions)을 포함할 수 없습니다. 이것은 의도적인 설계입니다. 사용할 수 있는 표현식의 종류는 의도적으로 제한됩니다. 두 가지 연산자만 지원됩니다: '.' (`getattr`) 연산자, 그리고 '[]' (`getitem`) 연산자. 이러한 연산자를 허용하는 이유는 일반적으로 비정상적인 코드가 아닌 경우 부작용(side effects)이 없기 때문입니다.

`getitem` 문법의 예시:

```python
"My name is {0[name]}".format(dict(name='Fred'))
```

포맷 문자열 내에서 `getitem`의 사용은 일반적인 사용법보다 훨씬 제한적이라는 점에 유의해야 합니다. 위 예시에서 문자열 'name'은 실제로 리터럴 문자열 'name'이며, 'name'이라는 변수가 아닙니다. 항목 키를 파싱하는 규칙은 매우 간단합니다. 숫자로 시작하면 숫자로 취급하고, 그렇지 않으면 문자열로 사용됩니다.

키는 따옴표로 구분되지 않으므로 포맷 문자열 내에서 임의의 딕셔너리 키(예: 문자열 "10" 또는 ":-]")를 지정할 수 없습니다.

**구현 참고:** 이 제안의 구현은 단순하거나 점으로 구분된 이름이 유효한 Python 식별자여야 한다는 규칙을 강제할 필요가 없습니다. 대신, 기본 객체의 `getattr` 함수가 식별자가 유효하지 않은 경우 예외를 발생시키도록 할 것입니다. `str.format()` 함수는 식별자가 언제 "완료"되는지 (즉, '.', ']', '}' 등을 찾아서) 파악하려고만 시도하는 최소한의 파서(parser)를 가질 것입니다.

#### 포맷 지정자 (Format Specifiers)
각 필드는 해당 필드의 형식을 조정하는 데 사용될 수 있는 선택적인 '포맷 지정자' 집합을 지정할 수 있습니다. 포맷 지정자는 콜론(`:`) 문자로 구분되어 필드 이름 뒤에 옵니다:

```python
"My name is {0:8}".format('Fred')
```

포맷 지정자의 의미와 문법은 포매팅되는 객체의 타입에 따라 다르지만, 이를 오버라이드하지 않는 모든 객체에 사용되는 표준 포맷 지정자 집합이 있습니다.

포맷 지정자는 그 자체로 치환 필드를 포함할 수 있습니다. 예를 들어, 필드 너비가 그 자체로 매개변수인 필드는 다음과 같이 지정할 수 있습니다:

```python
"{0:{1}}".format(a, b)
```

이러한 '내부' 치환 필드는 치환 필드의 포맷 지정자 부분에서만 발생할 수 있습니다. 내부 치환 필드는 그 자체로 포맷 지정자를 가질 수 없습니다. 이는 또한 치환 필드가 임의의 깊이로 중첩될 수 없음을 의미합니다.

끝에 있는 이중 '}}'는 일반적으로 이스케이프되지만, 이 경우에는 이스케이프되지 않습니다. 그 이유는 이스케이프를 위한 '{{' 및 '}}' 문법은 포맷 필드 외부에서 사용될 때만 적용되기 때문입니다. 포맷 필드 내에서는 중괄호 문자가 항상 일반적인 의미를 가집니다.

클래스가 표준 포맷 지정자를 오버라이드할 수 있으므로 포맷 지정자의 문법은 개방형입니다. 이러한 경우 `str.format()` 메서드는 첫 번째 콜론과 일치하는 중괄호 사이의 모든 문자를 관련 기본 포매팅 메서드로 전달하기만 합니다.

#### 표준 포맷 지정자 (Standard Format Specifiers)
객체가 자체 포맷 지정자를 정의하지 않으면, 표준 포맷 지정자 집합이 사용됩니다. 이들은 기존 '%' 연산자에서 사용되는 포맷 지정자와 개념적으로 유사하지만, 여러 가지 차이점도 있습니다.

표준 포맷 지정자의 일반적인 형식은 다음과 같습니다:

```
[[fill]align][sign][#][0][minimumwidth][.precision][type]
```
대괄호(`[]`)는 선택적인 요소를 나타냅니다.

선택적 정렬(align) 플래그는 다음 중 하나일 수 있습니다:

*   `'<'`: 사용 가능한 공간 내에서 필드를 왼쪽 정렬하도록 강제합니다 (이것이 기본값입니다).
*   `'>'`: 사용 가능한 공간 내에서 필드를 오른쪽 정렬하도록 강제합니다.
*   `'='`: 패딩을 부호(있는 경우) 뒤에 오지만 숫자 앞에 오도록 강제합니다. 이는 `'+000000120'` 형태의 필드를 인쇄하는 데 사용됩니다. 이 정렬 옵션은 숫자 타입에만 유효합니다.
*   `'^'`: 사용 가능한 공간 내에서 필드를 가운데 정렬하도록 강제합니다.

최소 필드 너비가 정의되지 않으면 필드 너비는 항상 데이터를 채우는 크기와 동일하므로 이 경우 정렬 옵션은 의미가 없습니다.

선택적 'fill' 문자는 필드를 최소 너비로 채우는 데 사용될 문자를 정의합니다. fill 문자가 있는 경우 정렬 플래그 뒤에 와야 합니다.

'sign' 옵션은 숫자 타입에만 유효하며 다음 중 하나일 수 있습니다:

*   `'+'`: 양수와 음수 모두에 부호가 사용되어야 함을 나타냅니다.
*   `'-'`: 음수에만 부호가 사용되어야 함을 나타냅니다 (이것이 기본 동작입니다).
*   `' '`: 양수에 선행 공백이 사용되어야 함을 나타냅니다.

'#' 문자가 있으면 정수는 포매팅을 위해 '대체 형식(alternate form)'을 사용합니다. 이는 이진수, 8진수, 16진수 출력이 각각 '0b', '0o', '0x'로 접두사가 붙는다는 의미입니다.

`width`는 최소 필드 너비를 정의하는 10진수 정수입니다. 지정하지 않으면 필드 너비는 내용에 따라 결정됩니다.

너비 필드 앞에 0(`'0'`) 문자가 오면 제로 패딩(zero-padding)이 활성화됩니다. 이는 정렬 타입이 `'='`이고 채움 문자가 `'0'`인 것과 동일합니다.

`precision`은 부동 소수점 변환에서 소수점 이하 몇 자리를 표시해야 하는지를 나타내는 10진수입니다. 비숫자 타입의 경우 이 필드는 최대 필드 크기(즉, 필드 내용에서 몇 문자가 사용될지)를 나타냅니다. 정수 변환의 경우 precision은 무시됩니다.

마지막으로, `type`은 데이터가 어떻게 표현되어야 할지를 결정합니다.

사용 가능한 정수(Integer) 표현 타입은 다음과 같습니다:

*   `'b'`: 이진수(Binary). 숫자를 2진수로 출력합니다.
*   `'c'`: 문자(Character). 숫자를 출력하기 전에 해당 유니코드 문자로 변환합니다.
*   `'d'`: 10진수 정수(Decimal Integer). 숫자를 10진수로 출력합니다.
*   `'o'`: 8진수 형식(Octal format). 숫자를 8진수로 출력합니다.
*   `'x'`: 16진수 형식(Hex format). 숫자를 16진수로 출력하며, 9를 초과하는 숫자는 소문자로 표시합니다.
*   `'X'`: 16진수 형식(Hex format). 숫자를 16진수로 출력하며, 9를 초과하는 숫자는 대문자로 표시합니다.
*   `'n'`: 숫자(Number). `'d'`와 동일하지만, 현재 로케일(locale) 설정을 사용하여 적절한 숫자 구분 기호를 삽입합니다.
*   `''` (None): `'d'`와 동일합니다.

사용 가능한 부동 소수점(Floating Point) 표현 타입은 다음과 같습니다:

*   `'e'`: 지수 표기법(Exponent notation). 숫자를 과학적 표기법으로 출력하며, 'e' 문자를 사용하여 지수를 나타냅니다.
*   `'E'`: 지수 표기법(Exponent notation). `'e'`와 동일하지만 숫자를 대문자로 변환합니다.
*   `'f'`: 고정 소수점(Fixed point). 숫자를 고정 소수점 숫자로 표시합니다.
*   `'F'`: 고정 소수점(Fixed point). `'f'`와 동일하지만 숫자를 대문자로 변환합니다.
*   `'g'`: 일반 형식(General format). 숫자가 너무 크지 않은 경우 고정 소수점 숫자로 출력하며, 너무 큰 경우 `'e'` 지수 표기법으로 전환합니다.
*   `'G'`: 일반 형식(General format). `'g'`와 동일하지만 숫자가 너무 커지면 `'E'`로 전환합니다.
*   `'n'`: 숫자(Number). `'g'`와 동일하지만, 현재 로케일 설정을 사용하여 적절한 숫자 구분 기호를 삽입합니다.
*   `'%'`: 백분율(Percentage). 숫자에 100을 곱하고 고정('f') 형식으로 표시한 다음 퍼센트 기호를 붙입니다.
*   `''` (None): `'g'`와 유사하지만, 소수점 이하에 최소 한 자리 숫자를 출력합니다.

객체는 표준 포맷 지정자를 대체하기 위해 자체 포맷 지정자를 정의할 수 있습니다. 예를 들어, `datetime` 클래스는 `strftime()` 함수의 인자와 유사한 포맷 지정자를 가질 수 있습니다:

```python
"Today is: {0:%a %b %d %H:%M:%S %Y}".format(datetime.now())
```

모든 내장 타입에 대해 빈 포맷 명세는 `str(value)`와 동일한 결과를 생성합니다. 자체 포맷 지정자를 정의하는 객체도 이 규칙을 따르도록 권장됩니다.

#### 명시적 변환 플래그 (Explicit Conversion Flag)
명시적 변환 플래그는 포맷 필드 값을 포매팅하기 전에 변환하는 데 사용됩니다. 이는 타입별 포매팅 동작을 오버라이드하고, 값을 더 일반적인 타입인 것처럼 포매팅하는 데 사용될 수 있습니다. 현재 두 가지 명시적 변환 플래그가 인식됩니다:

*   `!r`: `repr()`을 사용하여 값을 문자열로 변환합니다.
*   `!s`: `str()`을 사용하여 값을 문자열로 변환합니다.

이러한 플래그는 포맷 지정자 앞에 위치합니다:

```python
"{0!r:20}".format("Hello")
```

위 예시에서 문자열 "Hello"는 따옴표와 함께 최소 20자 너비의 필드에 출력됩니다.

사용자 정의 `Formatter` 클래스는 추가적인 변환 플래그를 정의할 수 있습니다. 내장 포매터는 잘못된 변환 플래그가 지정되면 `ValueError`를 발생시킵니다.

#### 타입별 포매팅 제어 (Controlling Formatting on a Per-Type Basis)
각 Python 타입은 `__format__` 메서드를 정의하여 해당 인스턴스의 포매팅을 제어할 수 있습니다. `__format__` 메서드는 포맷 지정자를 해석하고, 값을 포매팅하며, 결과 문자열을 반환하는 역할을 합니다.

새로운 전역 내장 함수 `format`은 `len()` 및 `str()`이 각각의 특수 메서드를 호출하는 방식과 유사하게 이 특수 메서드를 단순히 호출합니다:

```python
def format(value, format_spec):
    return value.__format__(format_spec)
```

이 함수를 "None" 값으로 호출해도 안전합니다 (Python에서 "None" 값은 객체이며 메서드를 가질 수 있기 때문입니다).

`str`, `int`, `float`, `object`를 포함한 여러 내장 타입은 `__format__` 메서드를 정의합니다. 이는 이러한 타입 중 하나에서 파생되면 클래스가 자체적으로 포매팅하는 방법을 알게 됨을 의미합니다.

`object.__format__` 메서드는 가장 간단합니다: 단순히 객체를 문자열로 변환한 다음 `format`을 다시 호출합니다:

```python
class object:
    def __format__(self, format_spec):
        return format(str(self), format_spec)
```

`int` 및 `float`의 `__format__` 메서드는 포맷 지정자를 기반으로 숫자 포매팅을 수행합니다. 경우에 따라 이러한 포매팅 연산은 다른 타입으로 위임될 수 있습니다. 예를 들어, `int` 포매터가 `'f'` (즉, 'float') 포맷 타입을 보는 경우, 단순히 값을 float으로 캐스팅하고 `format()`을 다시 호출할 수 있습니다.

어떤 클래스든 `__format__` 메서드를 오버라이드하여 해당 타입에 대한 사용자 정의 포매팅을 제공할 수 있습니다:

```python
class AST:
    def __format__(self, format_spec):
        ...
```

**Python 2.x에 대한 참고:** `format_spec` 인자는 원본 포맷 문자열의 타입에 따라 문자열 객체 또는 유니코드 객체가 됩니다. `__format__` 메서드는 `specifiers` 매개변수의 타입을 테스트하여 문자열 또는 유니코드 객체를 반환할지 결정해야 합니다. 올바른 타입의 객체를 반환하는 것은 `__format__` 메서드의 책임입니다.

위에서 언급된 '명시적 변환' 플래그는 `__format__` 메서드에 전달되지 않습니다. 대신, 플래그에 의해 지정된 변환은 `__format__`을 호출하기 전에 수행될 것으로 예상됩니다.

#### 사용자 정의 포매팅 (User-Defined Formatting)
타입별로 필드의 포매팅을 사용자 정의하는 것만으로는 충분하지 않을 때가 있을 것입니다. 예를 들어, 값이 사용 가능한 공간에 맞지 않을 때 '#' 해시 마크를 표시하는 스프레드시트 애플리케이션이 있습니다.

더 강력하고 유연한 포매팅을 위해, `string` 모듈에 있는 `Formatter` 클래스를 통해 기본 포맷 엔진에 접근할 수 있습니다. 이 클래스는 일반 `str.format` 메서드를 통해 접근할 수 없는 추가 옵션을 취합니다.

애플리케이션은 `Formatter` 클래스를 서브클래싱하여 자체 사용자 정의 포매팅 동작을 생성할 수 있습니다.

이 PEP는 `Formatter` 클래스에 의해 정의된 모든 메서드와 속성을 정확하게 명세하려고 시도하지 않습니다. 대신, 그것들은 초기 구현에서 정의되고 문서화될 것입니다. 그러나 이 PEP는 `Formatter` 클래스에 대한 일반적인 요구 사항을 명세할 것이며, 이는 아래에 나열되어 있습니다.

`string.format()`이 포매팅을 위해 `Formatter` 클래스를 직접 사용하지 않더라도, 둘 다 동일한 기본 구현을 사용합니다. `string.format()`이 `Formatter` 클래스를 직접 사용하지 않는 이유는 "string"이 내장 타입이므로 모든 메서드가 C로 구현되어야 하는 반면, `Formatter`는 Python 클래스이기 때문입니다. `Formatter`는 `string.format()`에서 사용되는 것과 동일한 C 함수에 대한 확장 가능한 래퍼(wrapper)를 제공합니다.

#### Formatter 메서드 (Formatter Methods)
`Formatter` 클래스는 초기화 인자를 받지 않습니다:

```python
fmt = Formatter()
```

`Formatter` 클래스의 공개 API 메서드는 다음과 같습니다:

*   `format(format_string, *args, **kwargs)`
*   `vformat(format_string, args, kwargs)`

`format`은 주요 API 메서드입니다. 이는 포맷 템플릿과 임의의 위치 및 키워드 인자 집합을 받습니다. `format`은 `vformat`을 호출하는 단순한 래퍼입니다.

`vformat`은 실제 포매팅 작업을 수행하는 함수입니다. 이는 `*args` 및 `**kwds` 문법을 사용하여 딕셔너리를 개별 인자로 언패킹(unpacking)하고 다시 패킹(repacking)하는 대신, 미리 정의된 인자 딕셔너리를 전달하려는 경우를 위해 별도의 함수로 노출됩니다. `vformat`은 포맷 템플릿 문자열을 문자 데이터와 치환 필드로 분할하는 작업을 수행합니다. 적절하게 `get_positional` 및 `get_index` 메서드를 호출합니다 (아래 설명).

`Formatter`는 다음 오버라이드 가능한 메서드를 정의합니다:

*   `get_value(key, args, kwargs)`
*   `check_unused_args(used_args, args, kwargs)`
*   `format_field(value, format_spec)`

`get_value`는 주어진 필드 값을 검색하는 데 사용됩니다. `key` 인자는 정수 또는 문자열이 됩니다. 정수이면 `args`의 위치 인자 인덱스를 나타내고, 문자열이면 `kwargs`의 이름 있는 인자를 나타냅니다.

`args` 매개변수는 `vformat`에 대한 위치 인자 리스트로 설정되고, `kwargs` 매개변수는 위치 인자의 딕셔너리로 설정됩니다.

복합 필드 이름의 경우, 이러한 함수는 필드 이름의 첫 번째 구성 요소에 대해서만 호출됩니다. 후속 구성 요소는 일반 속성 및 인덱싱(indexing) 연산을 통해 처리됩니다.

예를 들어, 필드 표현식 '0.name'은 'key' 인자로 0을 사용하여 `get_value`가 호출되도록 합니다. 'name' 속성은 `get_value`가 반환된 후 내장 `getattr` 함수를 호출하여 찾아집니다.

인덱스나 키워드가 존재하지 않는 항목을 참조하면 `IndexError`/`KeyError`가 발생해야 합니다.

`check_unused_args`는 원하는 경우 사용되지 않는 인자(unused arguments) 검사를 구현하는 데 사용됩니다. 이 함수의 인자는 포맷 문자열에서 실제로 참조된 모든 인자 키(위치 인자의 경우 정수, 이름 있는 인자의 경우 문자열)의 집합과 `vformat`에 전달된 `args` 및 `kwargs`에 대한 참조입니다. 사용되지 않는 인자 집합은 이러한 매개변수로부터 계산될 수 있습니다. `check_unused_args`는 검사가 실패하면 예외를 발생시키는 것으로 가정합니다.

`format_field`는 단순히 전역 `format` 내장 함수를 호출합니다. 이 메서드는 서브클래스가 이를 오버라이드할 수 있도록 제공됩니다.

이러한 함수들이 서로 어떻게 관련되는지 더 잘 이해하기 위해 `vformat`의 일반적인 동작을 설명하는 의사 코드(pseudocode)는 다음과 같습니다:

```python
def vformat(format_string, args, kwargs):
    # 출력 버퍼 및 사용된 인자 집합
    buffer = StringIO.StringIO()
    used_args = set()

    # 토큰은 포맷 필드 또는 리터럴 문자열입니다
    for token in self.parse(format_string):
        if is_format_field(token):
            # 토큰을 필드 값과 포맷 지정자로 분할
            field_spec, _, format_spec = token.partition(":")
            # 명시적 타입 변환 확인
            explicit, _, field_spec = field_spec.rpartition("!")

            # 'first_part'는 첫 번째 '.' 또는 '[' 이전 부분입니다.
            # 'get_first_part'가 문법에 따라 int 또는 string을 반환한다고 가정합니다.
            first_part = get_first_part(field_spec)
            value = self.get_value(first_part, args, kwargs)

            # 이 인자를 사용했다는 사실을 기록
            used_args.add(first_part)

            # [subfield] 또는 .subfield 처리. 'components'가 첫 번째 부분을
            # 제외한 다양한 서브필드의 이터레이터(iterator)를 반환한다고 가정합니다.
            for comp in components(field_spec):
                value = resolve_subfield(value, comp)

            # 명시적 타입 변환 처리
            if explicit == 'r':
                value = repr(value)
            elif explicit == 's':
                value = str(value)

            # 전역 'format' 함수를 호출하고 변환된 값을 출력 버퍼에 씁니다.
            buffer.write(self.format_field(value, format_spec))
        else:
            buffer.write(token)

    self.check_unused_args(used_args, args, kwargs)
    return buffer.getvalue()
```

`Formatter` 클래스의 실제 알고리즘(C로 구현될 것임)은 여기에 제시된 것과 다를 수 있다는 점에 유의하십시오. (실제 구현은 '클래스'가 아닐 가능성이 높습니다. 오히려 `vformat`은 다른 오버라이드 가능한 메서드를 인자로 받는 C 함수를 호출할 수 있습니다.) 이 코드 예제의 주요 목적은 오버라이드 가능한 메서드가 호출되는 순서를 설명하는 것입니다.

#### 포매터 사용자 정의 (Customizing Formatters)
이 섹션에서는 `Formatter` 객체를 사용자 정의하는 몇 가지 일반적인 방법을 설명합니다.

대체 포맷-문자열 문법을 지원하기 위해 `vformat` 메서드를 오버라이드하여 포맷 문자열이 파싱되는 방식을 변경할 수 있습니다.

일반적인 요구 사항 중 하나는 '기본(default)' 네임스페이스(namespace)를 지원하는 것입니다. 이렇게 하면 `format()` 메서드에 키워드 인자를 전달할 필요 없이 기존 네임스페이스의 값을 사용할 수 있습니다. 이는 다음과 같이 `get_value()`를 오버라이드하여 쉽게 수행할 수 있습니다:

```python
class NamespaceFormatter(Formatter):
    def __init__(self, namespace={}):
        Formatter.__init__(self)
        self.namespace = namespace

    def get_value(self, key, args, kwds):
        if isinstance(key, str):
            try:
                # 명시적으로 전달된 인자를 먼저 확인
                return kwds[key]
            except KeyError:
                return self.namespace[key]
        else:
            Formatter.get_value(key, args, kwds)
```

이를 사용하여 예를 들어 전역 변수에 접근할 수 있는 포매팅 함수를 쉽게 만들 수 있습니다:

```python
fmt = NamespaceFormatter(globals())
greeting = "hello"
print(fmt.format("{greeting}, world!"))
```

`locals()` 딕셔너리를 사용하여 로컬 딕셔너리에 접근하는 유사한 기술을 사용할 수 있습니다.

호출 스택(calling stack)을 스누핑(snooping)하여 로컬 변수와 전역 변수 모두에 자동으로 접근할 수 있는 '스마트' 네임스페이스 포매터를 만드는 것도 가능합니다. Python의 다른 버전과의 호환성 필요성 때문에 이러한 기능은 표준 라이브러리에 포함되지 않겠지만, 누군가가 이를 위한 레시피(recipe)를 만들고 게시할 것으로 예상됩니다.

또 다른 유형의 사용자 정의는 `format_field` 메서드를 오버라이드하여 내장 타입이 포매팅되는 방식을 변경하는 것입니다. (내장 타입이 아닌 경우, 해당 타입에 `__format__` 특수 메서드를 정의하면 됩니다.) 예를 들어, 필요할 때 과학적 표기법으로 출력하도록 숫자의 포매팅을 오버라이드할 수 있습니다.

#### 오류 처리 (Error handling)
포매팅 중에 발생할 수 있는 예외는 두 가지 종류입니다: 포매터 코드 자체에서 생성된 예외와 사용자 코드(예: 필드 객체의 `getattr` 함수)에서 생성된 예외.

일반적으로 포매터 코드 자체에서 생성된 예외는 `ValueError` 유형입니다. 즉, 포맷 문자열의 실제 "값"에 오류가 있습니다. (항상 그런 것은 아닙니다. 예를 들어, `string.format()` 함수에 첫 번째 매개변수로 문자열이 아닌 것이 전달되면 `TypeError`가 발생할 수 있습니다.)

내부적으로 생성된 이러한 `ValueError` 예외와 관련된 텍스트는 예외의 특성뿐만 아니라 포맷 문자열 내의 예외 위치를 나타냅니다.

사용자 코드에서 생성된 예외의 경우, 예외가 발생한 문자열 내의 위치를 결정하는 데 도움이 되도록 트레이스 기록(trace record)과 더미 프레임(dummy frame)이 트레이스백(traceback) 스택에 추가됩니다. 삽입된 트레이스백은 오류가 다음 위치에서 발생했음을 나타냅니다:

```
File "<format_string>;", line XX, in column_YY
```

여기서 `XX`와 `YY`는 각각 문자열 내의 줄 및 문자 위치 정보를 나타냅니다.

### 대체 문법 (Alternate Syntax)
당연히 가장 논쟁적인 문제 중 하나는 포맷 문자열의 문법, 특히 필드를 나타내는 데 사용되는 마크업 규칙입니다.

다양한 제안들을 모두 나열하려고 하기보다는, 이미 가장 널리 사용되는 것들을 다루겠습니다.

*   **셸 변수 문법:** `$name` 및 `$(name)` (또는 일부 변형에서 `${name}`). 이것은 아마도 가장 오래된 관습이며, Perl 및 다른 많은 곳에서 사용됩니다. 중괄호 없이 사용될 때는 유효하지 않은 문자를 찾을 때까지 어휘적으로 스캔하여 변수의 길이가 결정됩니다. 이 방식은 일반적으로 보간(interpolation)이 암시적인 경우, 즉 어떤 문자열이든 보간 변수를 포함할 수 있고 특별한 대체 함수를 호출할 필요가 없는 환경에서 사용됩니다. 이러한 경우, 보간 동작이 우연히 발생하는 것을 방지하는 것이 중요하므로 '$'(다른 경우에는 비교적 드물게 사용되는 문자)가 동작이 발생해야 할 때를 알리는 데 사용됩니다. 그러나 저자의 의견으로는 포매팅이 명시적으로 호출되는 경우, 우발적인 보간을 방지하기 위해 덜 주의를 기울여도 되며, 이 경우 더 가볍고 덜 다루기 힘든 문법을 사용할 수 있다고 합니다.

*   **`printf` 및 그 사촌들(`%`):** 필드 인덱스를 추가하여 필드를 순서와 상관없이 보간할 수 있는 변형을 포함합니다.

*   **다른 중괄호 전용 변형:** MUD(Multi-User Dungeons)와 같은 다양한 MUSH는 문자열 보간을 위해 대괄호(예: `[name]`)를 사용했습니다. Microsoft .Net 라이브러리는 중괄호(`{}`)와 이 제안의 문법과 매우 유사한 문법을 사용하지만, 포맷 지정자의 문법은 상당히 다릅니다.

*   **백쿼팅(Backquoting):** 이 방법은 최소한의 문법적 혼란이라는 장점이 있지만, 함수 호출 문법의 많은 장점(예: 복잡한 표현식 인자, 사용자 정의 포매터 등)이 부족합니다. 다른 변형으로는 Ruby의 `#{}`, PHP의 `{$name}` 등이 있습니다.

문법의 몇 가지 특정 측면은 추가적인 설명이 필요합니다:

1.  **이스케이프를 위한 백슬래시 문자:** 이 PEP의 초기 버전은 중괄호를 이스케이프하기 위해 이중화보다는 백슬래시를 사용했습니다. 이것은 `\n`과 같은 표준 백슬래시 시퀀스를 따르지 않는 Python 문자열 리터럴의 백슬래시가 수정되지 않고 남아 있었기 때문에 작동했습니다. 그러나 이것은 상당한 혼란을 야기했고, 여러 재귀적 이스케이프(예: 중괄호 앞에 리터럴 백슬래시를 두기 위한 `\\\\{`)의 잠재적인 상황으로 이어졌습니다.
2.  **포맷 지정자 구분 기호로 콜론(`:`) 문자 사용:** 이것은 단순히 .Net이 사용하는 방식이기 때문에 선택되었습니다.

### 대체 기능 제안 (Alternate Feature Proposals)
*   **속성 접근 제한:** PEP의 이전 버전은 선행 밑줄로 시작하는 속성(예: `{0}._private`)에 대한 접근을 제한했습니다. 그러나 이것은 디버깅 시 유용한 기능이므로 제거되었습니다.
*   일부 개발자들은 `getattr` 및 `getitem` 접근 기능을 완전히 제거해야 한다고 제안했습니다. 그러나 이는 단일 인자로 큰 딕셔너리를 전달하고 (`**kwargs` 문법을 사용하여 개별 키워드 인자로 플래트닝하지 않고) 포맷 문자열이 딕셔너리 항목을 개별적으로 참조할 수 있는 기능을 강력히 요구하는 다른 개발자 집단의 요구 사항과 충돌했습니다.
*   포맷 문자열에서 허용되는 표현식 집합을 확장하자는 제안도 있었습니다. 그러나 이는 대부분의 경우 포매팅 함수에 전달되기 전에 매개변수에 동일한 표현식을 실행함으로써 동일한 효과를 얻을 수 있으므로 TOOWTDI(There's Only One Way To Do It) 정신에 어긋나는 것으로 간주되었습니다. 데이터가 풍부한 환경에서 임의의 포매팅을 수행하는 데 포맷 문자열이 사용되는 경우, Genshi 또는 Cheetah와 같이 이 목적에 특화된 템플릿 엔진을 사용하는 것이 권장됩니다.
*   다른 많은 기능들은 `Formatter`를 서브클래싱하여 쉽게 구현할 수 있었기 때문에 기본 구현에 기능을 내장하는 대신 고려되고 거부되었습니다. 여기에는 대체 문법, 포맷 문자열 내 주석 등이 포함됩니다.

### 보안 고려 사항 (Security Considerations)
역사적으로 문자열 포매팅은 웹 기반 애플리케이션에서 흔히 발생하는 보안 취약점의 원천이었으며, 특히 문자열 포매팅 시스템이 포맷 문자열에 임의의 표현식을 포함할 수 있도록 허용하는 경우 더욱 그렇습니다.

잠재적인 보안 취약점을 만들지 않는 방식으로 문자열 포매팅을 사용하는 가장 좋은 방법은 신뢰할 수 없는 소스에서 온 포맷 문자열을 절대 사용하지 않는 것입니다.

그렇지 않은 경우, 다음으로 좋은 접근 방식은 문자열 포매팅에 부작용이 없도록 하는 것입니다. Python의 개방적인 특성 때문에 비자명한(non-trivial) 작업이 이러한 속성을 가짐을 보장하는 것은 불가능합니다. 이 PEP는 포맷 문자열의 표현식 유형을 가시적인 부작용이 드물고 Python 개발자 문화에서 강력히 권장되지 않는 것으로 제한합니다. 예를 들어, 속성 접근은 허용됩니다. 왜냐하면 속성 접근 자체만으로 가시적인 부작용이 있는 코드를 작성하는 것은 비정상적(pathological)으로 간주되기 때문입니다 (코드가 보이지 않는 부작용 - 예를 들어 더 빠른 조회를 위한 캐시 항목 생성 - 을 가지는지 여부는 관련이 없습니다).

### 샘플 구현 (Sample Implementation)
이 PEP의 초기 버전 구현은 Patrick Maupin과 Eric V. Smith에 의해 생성되었으며, `pep3101` 샌드박스에서 찾을 수 있습니다:
[http://svn.python.org/view/sandbox/trunk/pep3101/](http://svn.python.org/view/sandbox/trunk/pep3101/)

### 하위 호환성 (Backwards Compatibility)
기존 메커니즘을 그대로 두어 하위 호환성을 유지할 수 있습니다. 새로운 시스템은 기존 문자열 포매팅 기술의 메서드 이름과 충돌하지 않으므로, 이전 시스템이 더 이상 사용되지 않을 때까지 두 시스템이 공존할 수 있습니다.

### 참조 (References)
*   Python Library Reference - String formatting operations: [http://docs.python.org/library/stdtypes.html#string-formatting-operations](http://docs.python.org/library/stdtypes.html#string-formatting-operations)
*   Python Library References - Template strings: [http://docs.python.org/library/string.html#string.Template](http://docs.python.org/library/string.html#string.Template)
*   [Python-3000] String formatting operations in python 3k: [https://mail.python.org/pipermail/python-3000/2006-April/000285.html](https://mail.python.org/pipermail/python-3000/2006-April/000285.html)
*   Composite Formatting - [.Net Framework Developer's Guide]: [http://msdn.microsoft.com/library/en-us/cpguide/html/cpconcompositeformatting.asp?frame=true](http://msdn.microsoft.com/library/en-us/cpguide/html/cpconcompositeformatting.asp?frame=true)
*   Genshi templating engine: [http://genshi.edgewall.org/](http://genshi.edgewall.org/)
*   Cheetah - The Python-Powered Template Engine: [http://www.cheetahtemplate.org/](http://www.cheetahtemplate.org/)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.
Last modified: 2025-02-01 08:59:27 GMT
Source: [https://github.com/python/peps/blob/main/peps/pep-3101.rst](https://github.com/python/peps/blob/main/peps/pep-3101.rst)


여기서 `XX`와 `YY`는 각각 문자열 내의 줄 및 문자 위치 정보를 나타냅니다. [cite: 1]

### 대체 문법 (Alternate Syntax)
당연히 가장 논쟁적인 문제 중 하나는 포맷 문자열의 문법, 특히 필드를 나타내는 데 사용되는 마크업 규칙입니다. [cite: 1]

다양한 제안들을 모두 나열하려고 하기보다는, 이미 가장 널리 사용되는 것들을 다루겠습니다. [cite: 1]

*   **셸 변수 문법:** `$name` 및 `$(name)` (또는 일부 변형에서 `${name}`). 이것은 아마도 가장 오래된 관습이며, Perl 및 다른 많은 곳에서 사용됩니다. 중괄호 없이 사용될 때는 유효하지 않은 문자를 찾을 때까지 어휘적으로 스캔하여 변수의 길이가 결정됩니다. 이 방식은 일반적으로 보간(interpolation)이 암시적인 경우, 즉 어떤 문자열이든 보간 변수를 포함할 수 있고 특별한 대체 함수를 호출할 필요가 없는 환경에서 사용됩니다. 이러한 경우, 보간 동작이 우연히 발생하는 것을 방지하는 것이 중요하므로 '$'(다른 경우에는 비교적 드물게 사용되는 문자)가 동작이 발생해야 할 때를 알리는 데 사용됩니다. 그러나 저자의 의견으로는 포매팅이 명시적으로 호출되는 경우, 우발적인 보간을 방지하기 위해 덜 주의를 기울여도 되며, 이 경우 더 가볍고 덜 다루기 힘든 문법을 사용할 수 있다고 합니다. [cite: 1]

*   **`printf` 및 그 사촌들(`%`):** 필드 인덱스를 추가하여 필드를 순서와 상관없이 보간할 수 있는 변형을 포함합니다. [cite: 1]

*   **다른 중괄호 전용 변형:** MUD(Multi-User Dungeons)와 같은 다양한 MUSH는 문자열 보간을 위해 대괄호(예: `[name]`)를 사용했습니다. Microsoft .Net 라이브러리는 중괄호(`{}`)와 이 제안의 문법과 매우 유사한 문법을 사용하지만, 포맷 지정자의 문법은 상당히 다릅니다. [cite: 4, 1]

*   **백쿼팅(Backquoting):** 이 방법은 최소한의 문법적 혼란이라는 장점이 있지만, 함수 호출 문법의 많은 장점(예: 복잡한 표현식 인자, 사용자 정의 포매터 등)이 부족합니다. 다른 변형으로는 Ruby의 `#{}`, PHP의 `{$name}` 등이 있습니다. [cite: 1]

문법의 몇 가지 특정 측면은 추가적인 설명이 필요합니다: [cite: 1]

1.  **이스케이프를 위한 백슬래시 문자:** 이 PEP의 초기 버전은 중괄호를 이스케이프하기 위해 이중화보다는 백슬래시를 사용했습니다. 이것은 `\n`과 같은 표준 백슬래시 시퀀스를 따르지 않는 Python 문자열 리터럴의 백슬래시가 수정되지 않고 남아 있었기 때문에 작동했습니다. 그러나 이것은 상당한 혼란을 야기했고, 여러 재귀적 이스케이프(예: 중괄호 앞에 리터럴 백슬래시를 두기 위한 `\\\\{`)의 잠재적인 상황으로 이어졌습니다. [cite: 1]
2.  **포맷 지정자 구분 기호로 콜론(`:`) 문자 사용:** 이것은 단순히 .Net이 사용하는 방식이기 때문에 선택되었습니다. [cite: 1]

### 대체 기능 제안 (Alternate Feature Proposals)
*   **속성 접근 제한:** PEP의 이전 버전은 선행 밑줄로 시작하는 속성(예: `{0}._private`)에 대한 접근을 제한했습니다. 그러나 이것은 디버깅 시 유용한 기능이므로 제거되었습니다. [cite: 1]
*   일부 개발자들은 `getattr` 및 `getitem` 접근 기능을 완전히 제거해야 한다고 제안했습니다. 그러나 이는 단일 인자로 큰 딕셔너리를 전달하고 (`**kwargs` 문법을 사용하여 개별 키워드 인자로 플래트닝하지 않고) 포맷 문자열이 딕셔너리 항목을 개별적으로 참조할 수 있는 기능을 강력히 요구하는 다른 개발자 집단의 요구 사항과 충돌했습니다. [cite: 1]
*   포맷 문자열에서 허용되는 표현식 집합을 확장하자는 제안도 있었습니다. 그러나 이는 대부분의 경우 포매팅 함수에 전달되기 전에 매개변수에 동일한 표현식을 실행함으로써 동일한 효과를 얻을 수 있으므로 TOOWTDI(There's Only One Way To Do It) 정신에 어긋나는 것으로 간주되었습니다. 데이터가 풍부한 환경에서 임의의 포매팅을 수행하는 데 포맷 문자열이 사용되는 경우, Genshi [cite: 5, 1] 또는 Cheetah [cite: 6, 1]와 같이 이 목적에 특화된 템플릿 엔진을 사용하는 것이 권장됩니다. [cite: 1]
*   다른 많은 기능들은 `Formatter`를 서브클래싱하여 쉽게 구현할 수 있었기 때문에 기본 구현에 기능을 내장하는 대신 고려되고 거부되었습니다. 여기에는 대체 문법, 포맷 문자열 내 주석 등이 포함됩니다. [cite: 1]

### 보안 고려 사항 (Security Considerations)
역사적으로 문자열 포매팅은 웹 기반 애플리케이션에서 흔히 발생하는 보안 취약점의 원천이었으며, 특히 문자열 포매팅 시스템이 포맷 문자열에 임의의 표현식을 포함할 수 있도록 허용하는 경우 더욱 그렇습니다. [cite: 1]

잠재적인 보안 취약점을 만들지 않는 방식으로 문자열 포매팅을 사용하는 가장 좋은 방법은 신뢰할 수 없는 소스에서 온 포맷 문자열을 절대 사용하지 않는 것입니다. [cite: 1]

그렇지 않은 경우, 다음으로 좋은 접근 방식은 문자열 포매팅에 부작용이 없도록 하는 것입니다. Python의 개방적인 특성 때문에 비자명한(non-trivial) 작업이 이러한 속성을 가짐을 보장하는 것은 불가능합니다. 이 PEP는 포맷 문자열의 표현식 유형을 가시적인 부작용이 드물고 Python 개발자 문화에서 강력히 권장되지 않는 것으로 제한합니다. 예를 들어, 속성 접근은 허용됩니다. 왜냐하면 속성 접근 자체만으로 가시적인 부작용이 있는 코드를 작성하는 것은 비정상적(pathological)으로 간주되기 때문입니다 (코드가 보이지 않는 부작용 - 예를 들어 더 빠른 조회를 위한 캐시 항목 생성 - 을 가지는지 여부는 관련이 없습니다). [cite: 1]

### 샘플 구현 (Sample Implementation)
이 PEP의 초기 버전 구현은 Patrick Maupin과 Eric V. Smith에 의해 생성되었으며, `pep3101` 샌드박스에서 찾을 수 있습니다: [cite: 1]
[http://svn.python.org/view/sandbox/trunk/pep3101/](http://svn.python.org/view/sandbox/trunk/pep3101/) [cite: 1]

### 하위 호환성 (Backwards Compatibility)
기존 메커니즘을 그대로 두어 하위 호환성을 유지할 수 있습니다. 새로운 시스템은 기존 문자열 포매팅 기술의 메서드 이름과 충돌하지 않으므로, 이전 시스템이 더 이상 사용되지 않을 때까지 두 시스템이 공존할 수 있습니다. [cite: 1]

### 참조 (References)
*   [1] Python Library Reference - String formatting operations: [http://docs.python.org/library/stdtypes.html#string-formatting-operations](http://docs.python.org/library/stdtypes.html#string-formatting-operations) [cite: 1]
*   [2] Python Library References - Template strings: [http://docs.python.org/library/string.html#string.Template](http://docs.python.org/library/string.html#string.Template) [cite: 1]
*   [3] [Python-3000] String formatting operations in python 3k: [https://mail.python.org/pipermail/python-3000/2006-April/000285.html](https://mail.python.org/pipermail/python-3000/2006-April/000285.html) [cite: 1]
*   [4] Composite Formatting - [.Net Framework Developer's Guide]: [http://msdn.microsoft.com/library/en-us/cpguide/html/cpconcompositeformatting.asp?frame=true](http://msdn.microsoft.com/library/en-us/cpguide/html/cpconcompositeformatting.asp?frame=true) [cite: 1]
*   [5] Genshi templating engine: [http://genshi.edgewall.org/](http://genshi.edgewall.org/) [cite: 1]
*   [6] Cheetah - The Python-Powered Template Engine: [http://www.cheetahtemplate.org/](http://www.cheetahtemplate.org/) [cite: 1]

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다. [cite: 1]
Last modified: 2025-02-01 08:59:27 GMT [cite: 1]
Source: [https://github.com/python/peps/blob/main/peps/pep-3101.rst](https://github.com/python/peps/blob/main/peps/pep-3101.rst) [cite: 1]


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.