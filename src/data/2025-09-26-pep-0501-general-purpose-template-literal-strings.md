---
title: "[Withdrawn] PEP 501 - General purpose template literal strings"
excerpt: "Python Enhancement Proposal 501: 'General purpose template literal strings'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/501/
toc: true
toc_sticky: true
date: 2025-09-26 22:44:34+0900
last_modified_at: 2025-09-26 22:44:34+0900
published: true
---
> **원문 링크:** [PEP 501 - General purpose template literal strings](https://peps.python.org/pep-0501/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 08-Aug-2015

PEP 501은 "범용 템플릿 리터럴 문자열(General purpose template literal strings)"에 대한 제안서였으나, 현재는 [PEP 750](https://peps.python.org/pep-0750/)에 의해 철회(Withdrawn)되었습니다. 이 문서는 Python의 f-string과 유사하지만, 렌더링을 지연시켜 보안 취약점을 해결하고 유연한 템플릿 처리 기능을 제공하려는 목적을 가졌습니다.

---

## 초록 (Abstract)

Python의 f-string은 사용하기 쉽고 우아하지만, 셸 명령어, SQL 쿼리, HTML 스니펫 등을 구성할 때 인젝션 공격에 취약할 수 있습니다 (예: `os.system(f"echo {message_from_user}")`). PEP 501은 f-string과 유사한 구문 및 의미 체계를 가지지만, `format()` 또는 다른 템플릿 렌더링 함수가 호출될 때까지 렌더링을 지연시키는 "템플릿 리터럴 문자열(template literal strings)" (또는 "t-string")을 도입합니다. 이를 통해 표준 라이브러리 호출, 헬퍼 함수 및 서드파티 도구가 f-string의 유용성과 편리함을 유지하면서 입력에 대해 적절한 이스케이프 및 기타 문자열 처리를 안전하고 지능적으로 수행할 수 있도록 합니다.

## PEP 철회 (PEP Withdrawal)

PEP 750이 "태그된 문자열(tagged strings)" 제안으로 처음 발표되었을 때 (임의의 문자열 접두사를 허용), PEP 501은 새로운 "보간 템플릿(interpolation template)" 유형의 인스턴스를 생성하기 위해 단일 전용 문자열 접두사를 사용하는 더 간단한 "템플릿 리터럴" 접근 방식을 계속 옹호하기 위해 열려 있었습니다.

2024년 10월 PEP 750 업데이트에서 템플릿 문자열이 더 광범위한 태그된 문자열 개념보다 Python에 더 적합하다는 데 동의했습니다. 이 PEP의 저자들이 PEP 750에 대해 가졌던 다른 모든 우려 사항들도 해당 업데이트에서 해결되거나, 향후 변경 제안에서 합리적으로 해결될 수 있는 상태로 남겨졌습니다. 업데이트된 PEP 750 제안의 명확한 개선 사항으로 인해, 이 PEP는 PEP 750을 지지하며 철회되었습니다.

**중요** : 이 PEP의 나머지 부분은 2024년 8월 태그된 문자열 제안의 상태를 반영합니다. PEP 철회로 인해 중복되므로 2024년 10월 PEP 750 변경 사항을 반영하도록 업데이트되지 않았습니다.

## 다른 PEP들과의 관계 (Relationship with other PEPs)

*   이 PEP는 [PEP 498](https://peps.python.org/pep-0498/)에서 처음 구현되고 [PEP 701](https://peps.python.org/pep-0701/)에서 정식화된 f-string 구문에서 영감을 받아 그 위에 구축되었습니다.
*   이 PEP는 [PEP 675](https://peps.python.org/pep-0675/)에 추가된 리터럴 문자열 타이핑(literal string typing) 지원을 보완하며, 보안에 민감한 문자열에 런타임 값을 동적으로 보간(dynamic interpolation)하는 안전한 방법을 도입합니다.
*   이 PEP는 [PEP 750](https://peps.python.org/pep-0750/)의 태그된 문자열 제안의 일부 측면과 경쟁했지만 (특히 템플릿 렌더링이 `render(t"template literal")` 또는 `render"template literal"`로 표현되는지 여부), 많은 공통 기능을 공유합니다.
*   이 PEP는 사용자 인터페이스 국제화(i18n) 사용 사례를 위한 [PEP 292](https://peps.python.org/pep-0292/)의 대안을 제안하지 않습니다 (그러나 이 PEP와 PEP 750이 도입하는 컴파일러 지원 값 보간 메커니즘의 이점을 누릴 수 있는 해당 사용 사례를 목표로 하는 향후 구문 개선 가능성은 언급합니다).

## 동기 (Motivation)

PEP 498은 컴파일러에 투명한 문자열 보간을 위한 새로운 구문 지원을 추가하여, 보간 연산의 이름 참조가 명시적인 이름 참조에 국한되지 않고 포함하는 네임스페이스에 대한 완전한 접근 권한을 가지도록 했습니다. 이러한 기능은 "f-string"(formatted strings의 약어)이라고 불립니다.

PEP 498이 승인된 이후 f-string은 널리 확립되고 매우 인기를 얻었습니다. PEP 701의 정식화된 문법으로 f-string은 더욱 유용하고 유연해졌습니다. f-string은 훌륭하지만, 즉시 렌더링(eager rendering)에는 한계가 있습니다. 예를 들어, f-string의 즉시 렌더링 특성 때문에 다음과 같은 코드가 불행하게도 그럴듯하게 사용될 수 있습니다.

```python
os.system(f"echo {message_from_user}")
```

이러한 종류의 코드는 겉보기에는 우아하지만, `message_from_user`라는 보간된 값이 신뢰할 수 없는 사용자로부터 제공되는 경우 심각한 문제를 야기합니다. 즉, 제공된 사용자 데이터가 `os.system` 호출에 전달되기 전에 제대로 이스케이프되지 않아 일종의 코드 인젝션 공격에 대한 통로가 될 수 있습니다.

PEP 675에서 도입된 `LiteralString` 타입 어노테이션은 타입 체커가 이러한 종류의 안전하지 않은 함수 사용에 대해 타입 오류를 보고할 수 있도록 하지만, 이러한 오류는 더 안전한 대안(예: `subprocess.run()`)을 사용하는 코드를 더 쉽게 작성하는 데 도움이 되지 않습니다.

이 문제(및 기타 여러 문제)를 해결하기 위해, 이 PEP는 "t-string"(template literal strings의 약어)의 보완적인 도입을 제안합니다. 여기서 `format(t"Message with {data}")`는 `f"Message with {data}"`와 동일한 결과를 생성하지만, 템플릿 리터럴 인스턴스는 템플릿 내용을 다르게 처리하는 다른 템플릿 렌더링 함수에 전달될 수 있습니다.

## 제안 (Proposal)

### 전용 템플릿 리터럴 구문 (Dedicated template literal syntax)

이 PEP는 문자열이 일반 문자열이 아닌 템플릿 리터럴임을 선언하는 새로운 문자열 접두사를 제안합니다.

```python
template = t"Substitute {names:>{field_width}} and {expressions()!r} at runtime"
```

이것은 효과적으로 다음과 같이 해석될 것입니다:

```python
template = TemplateLiteral(
    r"Substitute {names:>{field_width}} and {expressions()} at runtime",
    TemplateLiteralText(r"Substitute "),
    TemplateLiteralField("names", names, f">{field_width}", ""),
    TemplateLiteralText(r" and "),
    TemplateLiteralField("expressions()", expressions(), f"", "r"),
)
```

`types.TemplateLiteral`의 `__format__` 메서드는 `str.format()`에서 영감을 받은 의미 체계를 구현합니다.

```python
>>> import datetime
>>> name = 'Jane'
>>> age = 50
>>> anniversary = datetime.date(1991, 10, 12)
>>> format(t'My name is {name}, my age next year is {age+1}, my anniversary is {anniversary:%A, %B %d, %Y}.')
'My name is Jane, my age next year is 51, my anniversary is Saturday, October 12, 1991.'
>>> format(t'She said her name is {name!r}.')
"She said her name is 'Jane'."
```

템플릿 리터럴의 구문은 PEP 701을 기반으로 하며, 템플릿의 문자열 부분에 대해 대부분 동일한 구문을 사용합니다. 다른 접두사를 사용하는 것 외에, 유일한 다른 구문 변경 사항은 `!()`를 렌더링 시 필드 평가를 요청하는 표준 변환 지정자로 허용하고, 사용자 지정 렌더러가 사용자 지정 변환 지정자를 정의할 수 있도록 하는 변환 지정자의 정의 및 처리 방식에 있습니다.

이 PEP는 기존의 문자열 포맷팅 메커니즘을 제거하거나 사용 중단할 것을 제안하지 않습니다. 이는 애플리케이션의 소스 코드에 직접 존재하지 않는 문자열을 포맷팅할 때 여전히 가치가 있기 때문입니다.

### 지연 필드 평가 변환 지정자 (Lazy field evaluation conversion specifier)

기존의 `a`, `r`, `s` 변환 지정자 외에, `str.format()`, `str.format_map()`, `string.Formatter`는 `()`를 "보간된 값을 호출"하는 변환 지정자로 받아들이도록 업데이트됩니다.

사용자 지정 템플릿 렌더링 함수에서 표준 변환 지정자를 적용하기 위해, 새로운 `operator.convert_field()` 함수가 추가될 것입니다.

`format()` 내장 함수의 시그니처와 동작도 세 번째 선택적 매개변수로 변환 지정자를 받아들이도록 업데이트됩니다. 비어 있지 않은 변환 지정자가 주어지면, `__format__` 메서드를 찾기 전에 값이 `operator.convert_field()`로 변환됩니다.

### 사용자 지정 변환 지정자 (Custom conversion specifiers)

기본 렌더러로 템플릿을 포맷팅할 수 있는 방식으로 필드별 지시어를 사용자 지정 렌더링 함수에 전달하기 위해, 변환 지정자 필드는 두 번째 `!` 문자를 포함할 수 있도록 허용됩니다.

`operator.convert_field()` 및 `format()` (따라서 기본 `TemplateLiteral.render` 템플릿 렌더링 메서드)는 해당 문자 및 변환 지정자 필드의 모든 후속 텍스트를 무시합니다.

`str.format()`, `str.format_map()`, `string.Formatter`도 사용자 지정 변환 지정자를 허용(및 무시)하도록 업데이트됩니다.

### POSIX 셸 명령어를 위한 템플릿 렌더러 (Template renderer for POSIX shell commands)

지연 렌더링 지원의 이점을 실질적으로 시연하고 그 자체로도 가치 있는 기능으로, `shlex` 모듈에 새로운 `sh` 템플릿 렌더러가 추가될 것입니다. 이 렌더러는 모든 보간된 필드가 `shlex.quote()`로 이스케이프된 문자열을 생성합니다.

`subprocess.Popen` API (및 `subprocess.run()`과 같이 이에 의존하는 상위 레벨 API)는 보간 템플릿을 받아들이고 새로운 `shlex.sh` 렌더러에 따라 처리하도록 업데이트될 것입니다.

## 배경 (Background)

이 PEP는 f-string이 광범위하게 사용되고 인기를 얻은 후, PEP 701에서 f-string의 문법과 의미론의 일부 미흡한 점과 제한 사항을 개선하기 위해 도입되었습니다. 템플릿 리터럴 제안은 2023년에 f-string에 대한 현재 지식과 PEP 701의 개선 사항을 반영하기 위해 업데이트되었습니다.

2024년에 PEP 750이 발표되어, 이 PEP의 좁은 템플릿 리터럴 제안보다는 사용자 지정 태그된 문자열 접두사를 위한 일반적인 메커니즘을 제안했습니다. 이 PEP는 태그된 문자열 제안에서 영감을 받은 새로운 아이디어를 통합하고, 더 일반적인 태그된 문자열 제안보다 이 PEP의 좁은 템플릿 리터럴 구문 제안의 인지된 이점을 설명하기 위해 다시 업데이트되었습니다.

### f-string과의 차이점 요약 (Summary of differences from f-strings)

f-string과 t-string의 주요 차이점은 다음과 같습니다.

*   `t` (템플릿 리터럴) 접두사는 지연 렌더링을 나타내지만, 그 외에는 포맷팅된 문자열과 거의 동일한 구문 및 의미 체계를 사용합니다.
*   템플릿 리터럴은 런타임에 `types.TemplateLiteral`이라는 새로운 종류의 객체로 사용할 수 있습니다.
*   포맷팅된 문자열에 사용되는 기본 렌더링은 컴파일된 코드에서 암시적으로 수행되는 대신 `format(template)`을 호출하여 템플릿 리터럴 객체에서 호출됩니다.
*   f-string과 달리 (변환 지정자가 컴파일러에서 직접 처리됨), t-string 변환 지정자는 렌더링 함수에 의해 렌더링 시점에 처리됩니다.
*   새로운 `!()` 변환 지정자는 필드 표현식이 기본 `format()` 렌더링 함수를 사용할 때 호출되어야 하는 호출 가능한 객체임을 나타냅니다. 이 지정자는 f-string에 특별히 추가되지 않습니다 (거기서는 무의미하기 때문입니다).
*   t-string 변환 지정자에는 두 번째 `!`가 허용됩니다 (후속 텍스트는 무시됨). 이는 사용자 지정 템플릿 렌더링 함수가 기본 `TemplateLiteral.render()` 렌더링 메서드를 깨뜨리지 않고 사용자 지정 변환 지정자를 받아들일 수 있도록 하는 방법입니다. 이 기능은 f-string에 특별히 추가되지 않습니다 (거기서는 무의미하기 때문입니다).
*   f-string `f"Message {here}"`는 `format(t"Message {here}")`와 의미상 동일하지만, f-string은 컴파일러에서 직접 계속 지원되므로 t-string에 필요한 지연 렌더링 메커니즘을 실제로 사용하는 런타임 오버헤드를 피합니다.

### 태그된 문자열과의 차이점 요약 (Summary of differences from tagged strings)

태그된 문자열이 처음 제안되었을 때, 렌더링 함수 호출이 `render(t"template literal")` 또는 `render"template literal"`로 작성되는지 여부와 같은 표면적인 구문 차이 외에도 PEP 501의 제안과 몇 가지 주목할 만한 차이가 있었습니다.

초기 PEP 750 논의 과정에서 이러한 차이점 중 많은 부분이 제거되었습니다. 이는 PEP 501이 PEP 750 제안의 해당 측면을 채택하거나 (예: 변환 지정자를 지연 적용하는 방식), PEP 750이 PEP 501 제안의 일부 측면을 유지하도록 변경되었기 때문입니다 (예: 템플릿 세그먼트를 단순 시퀀스로 표현하는 대신 전용 유형을 정의하는 방식).

남아있는 주요 차이점은 이 PEP가 `t-string` 접두사만 추가하는 것으로 PEP 750에 설명된 모든 원하는 이점을 제공하기에 충분한 개선이라고 주장한다는 점입니다. 일반화된 "태그된 문자열" 구문으로의 확장은 불필요하며, 피할 수 있는 추가적인 문제를 야기합니다.

두 PEP는 또한 템플릿 필드의 지연 평가를 처리하는 제안된 접근 방식에서도 차이가 있습니다.

## 근거 (Rationale)

f-string ([PEP 498](https://peps.python.org/pep-0498/))은 Python의 어휘적 네임스페이스 의미 체계에 대한 완전한 접근 권한을 가지고 값을 문자열에 보간하는 것을 더 간단하게 만들었습니다. 그러나 이는 SQL 쿼리, 셸 명령어 및 HTML 템플릿과 같은 민감한 대상에 값을 보간할 때 코드 인젝션 공격에 대한 고려 없이 처리될 때 올바르게 처리될 때보다 훨씬 깨끗한 구문을 가질 수 있는 상황을 만듭니다.

이 PEP는 템플릿 리터럴의 실제 렌더링을 포맷팅된 문자열로 해당 `__format__` 메서드에 지연시키는 옵션을 제공하여, 템플릿을 퍼스트 클래스 객체로 전달함으로써 다른 템플릿 렌더러를 사용할 수 있도록 합니다.

기술적인 세부 사항은 매우 다르지만, 이 PEP에서 제안하는 `types.TemplateLiteral` 인터페이스는 C# 6.0에 도입된 네이티브 보간 지원의 기반이 되는 `FormattableString` 유형과 ES6에 도입된 JavaScript 템플릿 리터럴과 개념적으로 매우 유사합니다.

## 명세 (Specification)

이 PEP는 새로운 유형 `types.TemplateLiteral`의 인스턴스를 생성하는 새로운 `t` 문자열 접두사를 제안합니다.

템플릿 리터럴은 유니코드 문자열입니다 (바이트 리터럴은 허용되지 않습니다). 문자열 리터럴 연결은 일반적인 방식으로 작동하며, 전체 결합된 리터럴이 템플릿 리터럴을 형성합니다.

템플릿 문자열은 PEP 498 및 PEP 701의 f-string에 설명된 대로 리터럴, 표현식, 포맷 지정자 및 변환 지정자로 구문 분석됩니다. 변환 지정자의 구문은 유효한 Python 식별자로 제한되는 대신 임의의 문자열( `{`, `}`, `:`를 포함하지 않는 문자열)이 허용되도록 완화됩니다.

그러나 이러한 구성 요소는 포맷팅된 문자열로 직접 렌더링되는 대신 다음 동작을 가진 새로운 유형의 인스턴스로 구성됩니다.

```python
class TemplateLiteralText(str): ...
class TemplateLiteralField(NamedTuple): ...
class TemplateLiteral: ...
```

템플릿 리터럴 표현식의 결과는 이미 렌더링된 문자열이 아닌 이 유형의 인스턴스입니다. 렌더링은 인스턴스의 `render` 메서드가 호출될 때만 발생합니다 (직접적으로 또는 `__format__`을 통해 간접적으로).

컴파일러는 나중에 사용할 템플릿 리터럴에 다음 세부 정보를 전달합니다.

*   소스 코드에 작성된 원시 템플릿을 포함하는 문자열
*   템플릿 세그먼트의 시퀀스로, 각 세그먼트는 다음 중 하나입니다.
    *   리터럴 텍스트 세그먼트 (원시 형식에 대한 접근도 제공하는 일반 Python 문자열)
    *   구문 분석된 템플릿 보간 필드, 보간된 표현식의 텍스트(일반 문자열로), 평가된 결과, 포맷 지정자 텍스트(대체 필드가 f-string으로 즉시 평가됨), 및 변환 지정자 텍스트(일반 문자열로)를 지정합니다.

### 템플릿 렌더링 (Rendering templates)

`TemplateLiteral.render` 구현은 다음 렌더러를 사용하여 렌더링 프로세스를 정의합니다.

*   렌더링된 텍스트 및 필드 세그먼트의 시퀀스가 완전히 렌더링된 결과로 구성되는 방식을 정의하는 전체 `render_template` 작업입니다. 기본 템플릿 렌더러는 `'' .join`을 사용하는 문자열 연결입니다.
*   템플릿 내의 개별 리터럴 텍스트 세그먼트를 수신하는 텍스트 세그먼트별 `render_text` 작업입니다. 기본 텍스트 렌더러는 내장 `str` 생성자입니다.
*   템플릿 내의 대체 필드에 대한 필드 값, 포맷 지정자 및 변환 지정자를 수신하는 필드 세그먼트별 `render_field` 작업입니다. 기본 필드 렌더러는 내장 `format()`입니다.

위의 구문 분석된 템플릿 표현을 고려할 때, 템플릿 렌더링의 의미 체계는 다음과 동일합니다.

```python
def render(self, *, render_template=''.join, render_text=str, render_field=format):
    rendered_segments = []
    for segment in self._segments:
        match segment:
            case TemplateLiteralText() as text_segment:
                rendered_segments.append(render_text(text_segment))
            case TemplateLiteralField() as field_segment:
                rendered_segments.append(render_field(*field_segment[1:]))
    return render_template(rendered_segments)
```

### 포맷 지정자 (Format specifiers)

t-string의 필드 지정자의 구문 및 처리는 f-string과 동일하게 정의됩니다. 여기에는 필드 지정자 자체가 f-string 대체 필드를 포함하는 것이 허용됩니다.

### 변환 지정자 (Conversion specifiers)

`a`, `r`, `s` 변환 지정자에 대한 기존 지원 외에, `str.format()` 및 `str.format_map()`은 `()`를 "보간된 값을 호출"하는 변환 지정자로 받아들이도록 업데이트됩니다.

PEP 701이 변환 지정자를 `NAME` 토큰으로 제한하는 반면, 이 PEP는 대신 `FSTRING_MIDDLE` 토큰을 허용합니다 ( `{`, `}`, `:`만 허용되지 않음). 이 변경은 주로 `!()` 변환 지정자를 사용한 지연 필드 렌더링을 지원하기 위해 이루어졌지만, 사용자 지정 렌더링 함수가 기본 `format()` 필드 렌더러에 정의된 것보다 자체 변환 지정자를 정의할 때 더 많은 유연성을 제공합니다.

변환 지정자는 여전히 일반 문자열로 처리되며, 대체 필드 사용을 지원하지 않습니다.

사용자 지정 템플릿 렌더러가 기본 렌더러가 실패하지 않도록 자체 사용자 지정 변환 지정자를 정의할 수 있도록, 변환 지정자는 두 번째 `!` 문자로 접두사가 붙은 사용자 지정 접미사를 포함할 수 있도록 허용됩니다. 즉, `!!<custom>`, `!a!<custom>`, `!r!<custom>`, `!s!<custom>`, `!()!<custom>`는 모두 템플릿 리터럴에서 유효한 변환 지정자가 됩니다.

표준 변환 지정자와 필드가 렌더링될 때 보간된 값에서 호출되는 특수 메서드 간의 전체 매핑은 다음과 같습니다.

*   **변환 없음** (빈 문자열): `__format__` (포맷 지정자를 매개변수로 사용)
*   `a`: `__repr__` (`ascii()` 내장 함수와 동일)
*   `r`: `__repr__` (`repr()` 내장 함수와 동일)
*   `s`: `__str__` (`str` 내장 함수와 동일)
*   `()`: `__call__` (매개변수 없음)

변환이 발생하면, 원래 객체에서 호출되는 대신 변환 결과에 대해 `__format__` (포맷 지정자와 함께)이 호출됩니다.

f-string 자체는 새로운 `!()` 변환 지정자를 지원하지 않습니다 (값 보간과 값 렌더링이 항상 동시에 발생하므로 중복됨). 또한 사용자 지정 변환 지정자 사용을 지원하지 않습니다 (렌더링 함수가 컴파일 시간에 알려져 있고 사용자 지정 지정자를 사용하지 않기 때문입니다).

### `operator` 모듈의 새로운 필드 변환 API (New field conversion API in the operator module)

사용자 지정 템플릿 렌더링 함수에서 표준 변환 지정자를 적용하기 위해, 새로운 `operator.convert_field()` 함수가 추가될 것입니다.

```python
def convert_field(value, conversion_spec=''):
    """Apply the given string formatting conversion specifier to the given value"""
    std_spec, sep, custom_spec = conversion_spec.partition("!")
    match std_spec:
        case '':
            return value
        case 'a':
            return ascii(value)
        case 'r':
            return repr(value)
        case 's':
            return str(value)
        case '()':
            return value()
    # ... error handling ...
```

### `format()`에 추가된 변환 지정자 매개변수 (Conversion specifier parameter added to format())

`format()` 내장 함수의 시그니처와 동작이 업데이트될 것입니다.

```python
def format(value, format_spec='', conversion_spec=''):
    if conversion_spec:
        value_to_format = operator.convert_field(value)
    else:
        value_to_format = value
    return type(value_to_format).__format__(value, format_spec)
```

비어 있지 않은 변환 지정자가 주어지면, `__format__` 메서드를 찾기 전에 값이 `operator.convert_field()`로 변환됩니다.

`__format__` 특수 메서드의 시그니처는 변경되지 않습니다 (포맷 지정자만 포맷팅되는 객체에서 처리됩니다).

### 구조적 타이핑 및 덕 타이핑 (Structural typing and duck typing)

사용자 지정 렌더러가 대체 보간 템플릿 구현을 받아들일 수 있도록 (네이티브 템플릿 리터럴 유형에 밀접하게 연결되지 않도록), `typing` 모듈에 다음 구조적 프로토콜이 추가될 것입니다.

```python
@runtime_checkable
class TemplateText(Protocol): ...
@runtime_checkable
class TemplateField(Protocol): ...
@runtime_checkable
class InterpolationTemplate(Protocol): ...
```

### 사용자 지정 렌더러 작성 (Writing custom renderers)

사용자 지정 렌더러를 작성하는 데 특별한 구문이 필요하지 않습니다. 대신, 사용자 지정 렌더러는 대체 `render_template`, `render_text`, 및/또는 `render_field` 구현으로 `render()` 메서드를 호출하거나, 템플릿의 데이터 속성에 직접 접근하여 보간 템플릿을 직접 처리하는 일반 호출 가능한 객체입니다.

예를 들어, 다음 함수는 객체의 `repr` 구현을 사용하여 템플릿을 렌더링합니다.

```python
def repr_format(template):
    def render_field(value, format_spec, conversion_spec):
        converted_value = operator.convert_field(value, conversion_spec)
        return format(repr(converted_value), format_spec)
    return template.render(render_field=render_field)
```

사용자 지정 렌더러는 `shlex` 모듈에 포함될 예정이며, `subprocess` 모듈 API를 사용할 때 `os.system`을 실행하거나 시스템 셸을 활성화하여 발생하는 상당한 위험 없이 외부 프로그램에 접근하는 데 더 POSIX 셸 스타일의 경험을 제공하는 것을 목표로 합니다. 이 렌더러는 Julia 프로그래밍 언어에서 제공하는 인터페이스에서 영감을 받아 백틱 기반의 `` `cat $filename` `` 구문 대신 `t"cat {filename}"` 스타일 템플릿 리터럴로 대체된 외부 프로그램 실행 인터페이스를 제공할 것입니다.

### 코드 인젝션 공격 처리 (Handling code injection attacks)

PEP 498의 포맷팅된 문자열 구문은 다음과 같은 코드를 작성하는 것을 잠재적으로 매력적으로 만듭니다.

```python
runquery(f"SELECT {column} FROM {table};")
runcommand(f"cat {filename}")
return_response(f"<html><body>{response.body}</body></html>")
```

이 모든 것은 보간되는 변수 중 하나라도 신뢰할 수 없는 소스에서 오는 경우 코드 인젝션 공격의 잠재적 벡터를 나타냅니다. 이 PEP의 특정 제안은 관련 보안 컨텍스트에 적절하게 보간된 값을 인용하는 사용 사례별 렌더러를 직접 작성할 수 있도록 설계되었습니다.

```python
runquery(sql(t"SELECT {column} FROM {table} WHERE column={value};"))
runcommand(sh(t"cat {filename}"))
return_response(html(t"<html><body>{response.body}</body></html>"))
```

시간이 지남에 따라 잠재적으로 위험한 문자열 입력을 처리하는 API가 템플릿을 기본적으로 받아들이도록 업데이트되어, 문제가 있는 코드 예제를 단순히 `f` 문자열 접두사를 `t`로 교체하여 해결할 수 있을 것으로 예상됩니다.

```python
runquery(t"SELECT {column} FROM {table};")
runcommand(t"cat {filename}")
return_response(t"<html><body>{response.body}</body></html>")
```

### `shlex`에 추가된 셸 이스케이프 렌더러 (Renderer for shell escaping added to shlex)

참조 구현으로, 안전한 POSIX 셸 이스케이프를 위한 렌더러를 `shlex` 모듈에 추가할 수 있습니다. 이 렌더러는 `sh`라고 불리며 템플릿 리터럴의 각 필드 값에 대해 `shlex.quote`를 호출하는 것과 동일합니다.

따라서:

```python
os.system(shlex.sh(t'cat {myfile}'))
```

다음과 동일한 동작을 가질 것입니다.

```python
os.system('cat ' + shlex.quote(myfile)))
```

구현은 다음과 같습니다.

```python
def sh(template: TemplateLiteral):
    def render_field(value, format_spec, conversion_spec)
        field_text = format(value, format_spec, conversion_spec)
        return quote(field_text)
    return template.render(render_field=render_field)
```

`shlex.sh`의 추가는 `subprocess` 문서에서 `shell=True`를 전달하는 것을 피하는 것이 가장 좋다는 기존 경고나 `os.system()` 문서에서 상위 레벨 `subprocess` API에 대한 참조를 변경하지 않습니다.

### `subprocess` 모듈 변경 사항 (Changes to subprocess module)

`shlex` 모듈에 추가된 렌더러와 템플릿 리터럴의 추가로, `subprocess` 모듈은 `Popen`에 추가 입력 유형으로 템플릿 리터럴을 받아들이도록 변경될 수 있습니다.

템플릿 리터럴이 추가되면 `subprocess.Popen` (그리고 결과적으로 `subprocess.run()`과 같은 모든 상위 레벨 함수)은 안전한 방식으로 문자열을 받아들일 수 있습니다 (적어도 POSIX 시스템에서는).

예를 들어:

```python
subprocess.run(t'cat {myfile}', shell=True)
```

이 PEP에서 제공하는 `shlex.sh` 렌더러를 자동으로 사용할 것입니다. 따라서 다음과 같이 `subprocess.run` 호출 내에서 `shlex`를 사용하는 것은:

```python
subprocess.run(shlex.sh(t'cat {myfile}'), shell=True)
```

중복됩니다. `run`은 모든 템플릿 리터럴을 `shlex.sh`를 통해 자동으로 렌더링하기 때문입니다.

대안으로, `subprocess.Popen`이 `shell=True` 없이 실행될 때, `subprocess`에 더 인체 공학적인 구문을 제공할 수 있습니다. 예를 들어:

```python
subprocess.run(t'cat {myfile} --flag {value}')
```

다음과 동일할 것입니다.

```python
subprocess.run(['cat', myfile, '--flag', value])
```

또는 더 정확하게는:

```python
subprocess.run(shlex.split(f'cat {shlex.quote(myfile)} --flag {shlex.quote(value)}'))
```

이는 위와 같이 먼저 `shlex.sh` 렌더러를 사용한 다음, 결과에 대해 `shlex.split`을 사용하여 수행됩니다.

## 학습 방법 (How to Teach This)

이 PEP는 교육 환경에서 항상 사용할 수 있는 두 가지 표준 렌더러인 내장 `format()`과 새로운 `shlex.sh` POSIX 셸 렌더러를 의도적으로 포함합니다.

이 두 렌더러를 함께 사용하여 f-string으로 문자열 포맷팅을 처음 접한 학생들에게 지연 렌더링에 대한 초기 이해를 구축할 수 있습니다. 이 초기 이해는 학생들이 기존 템플릿 렌더링 함수와 결합하여 템플릿 리터럴을 효과적으로 사용할 수 있도록 하는 것을 목표로 합니다.

예를 들어, `f"{'some text'}"`, `f"{value}"`, `f"{value!r}"`, `f"{callable()}"`와 같은 모든 것이 소개될 수 있습니다.

동일한 작업은 `format(t"{'some text'}")`, `format(t"{value}")`, `format(t"{value!r}")`, `format(t"{callable()}")`로 다시 작성하여 즉시 렌더링 형식과 지연 렌더링 형식 간의 관계를 설명할 수 있습니다.

"템플릿 정의 시간" (또는 "보간 시간")과 "템플릿 렌더링 시간" 간의 차이는 템플릿 리터럴을 로컬 변수로 저장하고 `format` 호출 결과와 별도로 그 표현을 살펴보면서 더 자세히 조사할 수 있습니다. 이 시점에서, `t"{callable!()}"` 구문이 템플릿 정의 시간에 호출되는 필드 표현식과 템플릿 렌더링 시간에 호출되는 필드 표현식을 구분하기 위해 도입될 수 있습니다.

마지막으로, `f"{'some text'}"`, `format(t"{'some text'}")`, `shlex.sh(t"{'some text'}")`의 결과 간의 차이를 탐구하여 기본 렌더링 함수와 사용자 지정 렌더링 함수 간의 잠재적 차이를 설명할 수 있습니다.

## 논의 (Discussion)

이 PEP의 몇 가지 요점에도 적용되므로 이전 논의는 [PEP 498](https://peps.python.org/pep-0498/)을 참조하십시오. [PEP 750](https://peps.python.org/pep-0750/)의 디자인 논의도 현재 디자인의 여러 측면에 영감을 주었으므로 매우 관련성이 높습니다.

## 변경 및 보류된 고려 사항 (Deferrals and Considerations)

*   **이진 보간 지원(Support for binary interpolation)** : f-string이 바이트 문자열을 처리하지 않으므로 t-string도 처리하지 않습니다.
*   **`str` 전용 인터페이스와의 상호 운용성(Interoperability with str-only interfaces)** : `str`만 받아들이는 인터페이스와의 상호 운용성을 위해, 렌더링을 호출된 함수에 위임하는 대신 `format()`으로 보간 템플릿을 미리 렌더링할 수 있습니다.
*   **원시 템플릿 문자열 보존(Preserving the raw template string)** : 초기 버전의 이 PEP는 템플릿 리터럴에 원시 템플릿 문자열을 제공하지 못했습니다. 이를 유지함으로써 더 매력적인 템플릿 표현을 제공할 수 있을 뿐만 아니라, 표현식 텍스트와 포맷 지정자에서 즉시 렌더링된 대체 필드의 세부 정보를 모두 포함하여 원래 문자열을 정확하게 재구성할 수 있습니다.
*   **전역 이름 조회가 아닌 풍부한 객체 생성(Creating a rich object rather than a global name lookup)** : 초기 버전의 이 PEP는 보간 함수에서 나중에 사용하기 위한 새로운 종류의 객체를 생성하는 대신 `__interpolate__` 내장 함수를 사용했습니다. 유용한 기본 렌더러를 가진 풍부한 설명 객체를 생성함으로써 보간 의미론의 사용자 지정을 훨씬 쉽게 지원할 수 있게 되었습니다.
*   **f-string을 대체하는 대신 그 위에 구축(Building atop f-strings rather than replacing them)** : 초기 버전의 이 PEP는 [PEP 498](https://peps.python.org/pep-0498/) (f-string)의 완전한 대체 역할을 하려고 했습니다. 해당 PEP와 최근의 [PEP 701](https://peps.python.org/pep-0701/)이 승인됨에 따라, 이 PEP는 기존 f-string의 즉시 렌더링 위에 더 유연한 지연 렌더링 기능을 구축할 수 있습니다.
*   **반복 및 연결 의미론 정의(Defining repetition and concatenation semantics)** : 이 PEP는 `TemplateLiteral` 및 `TemplateLiteralText`에 대한 반복 및 연결 의미론을 명시적으로 정의합니다. 엄밀히 말하면 필요하지 않지만, 이러한 정의는 역사적으로 일반 문자열만 지원했던 코드에서 유형을 더 쉽게 작업할 수 있도록 할 것으로 예상됩니다.
*   **지연 필드 평가를 위한 새로운 변환 지정자(New conversion specifier for lazy field evaluation)** : [PEP 750](https://peps.python.org/pep-0750/)의 처음 발표된 버전은 모든 보간 필드에 대해 지연 평가를 기본으로 했습니다. 이후 즉시 평가를 기본으로 하도록 업데이트되었지만 (f-string 및 이 PEP에서와 같이), 해당 주제에 대한 논의는 보간된 필드 값이 수정 없이 사용되는 대신 렌더링 시점에 호출되어야 함을 렌더링 함수에 알리는 방법을 제공하는 아이디어를 촉발했습니다.
    *   PEP 750도 변환 지정자 처리를 평가 시점까지 지연시켰기 때문에, 인자 없이 `__call__`을 호출하는 것이 `__repr__` (`!a`, `!r`) 또는 `__str__` (`!s`)를 호출하는 기존 변환 지정자와 유사하게 볼 수 있다는 제안이 제시되었습니다.
    *   따라서 이 PEP는 변환 지정자 처리도 렌더링 함수의 책임으로 만들고, 지연 평가를 위한 새로운 변환 지정자로 `!()`를 도입하도록 업데이트되었습니다.
    *   `operator.convert_field()`를 추가하고 `format()` 내장 함수를 업데이트하는 것은 기본 변환 지정자를 받아들이려는 렌더링 함수 구현에 적절한 지원을 제공하는 문제였습니다.
*   **사용자 지정 렌더러에서 임의의 변환 지정자 허용(Allowing arbitrary conversion specifiers in custom renderers)** : `!()`를 새로운 변환 지정자로 받아들이려면 파서가 변환 지정자에 대해 받아들이는 구문을 업데이트해야 합니다 (현재 식별자로 제한됨).
*   **단일 새로운 문자열 접두사만 예약(Only reserving a single new string prefix)** : 이 PEP와 [PEP 750](https://peps.python.org/pep-0750/) 간의 주요 차이점은 후자가 임의의 문자열 접두사 사용을 가능하게 하는 것을 목표로 한다는 것입니다. 이 PEP의 저자들이 두 번째 표기법을 선호하는 주된 이유는 독자에게 무엇이 진행되고 있는지 더 명확하게 알려주기 때문입니다. 즉, 템플릿 리터럴 인스턴스가 생성되어 보간 템플릿 인스턴스로 유용한 작업을 수행하는 방법을 아는 호출 가능한 객체에 전달됩니다.
*   **더 간결한 지연 평가 구문 고려 연기(Deferring consideration of more concise delayed evaluation syntax)** : 지연 평가에 대한 논의 중에 ` {-> expr} `가 이미 지원되는 람다 기반 구문 ` {(lambda: expr)} `에 대한 잠재적인 구문 설탕으로 제안되었습니다. (기존 구문에서는 `:` 문자가 포맷 지정자의 시작을 나타내는 것으로 잘못 해석되는 것을 방지하기 위해 괄호가 필요합니다.)
*   **가능한 로깅 통합 고려 연기(Deferring consideration of possible logging integration)** : 로깅 모듈의 한 가지 과제는 이전에 `printf` 스타일 포맷팅 사용에서 벗어날 합리적인 마이그레이션 전략을 고안할 수 없었다는 것입니다.
*   **i18n 사용 사례에서의 가능한 사용 고려 연기(Deferring consideration of possible use in i18n use cases)** : 이 PEP의 초기 동기 부여 사용 사례는 i18n(국제화) 번역을 위한 더 깔끔한 구문을 제공하는 것이었습니다. 이는 수정되지 않은 원본 템플릿에 대한 접근을 필요로 하기 때문입니다.
*   **비 POSIX 셸에 대한 이스케이프 렌더링 지원 연기(Deferring escaped rendering support for non-POSIX shells)** : `shlex.quote()`는 정규식 문자 집합 `[\w@%+=:,./-]`를 안전하다고 분류하고, 다른 모든 문자는 안전하지 않다고 판단하여 포함하는 문자열에 대한 인용(quoting)을 요구합니다. 사용되는 인용 메커니즘은 POSIX 셸에서 문자열 인용이 작동하는 방식에 따라 다르므로, POSIX 셸 문자열 인용 규칙을 따르지 않는 셸을 실행할 때는 신뢰할 수 없습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.