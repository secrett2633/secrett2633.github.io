---
title: "[Rejected] PEP 502 - String Interpolation - Extended Discussion"
excerpt: "Python Enhancement Proposal 502: 'String Interpolation - Extended Discussion'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/502/
toc: true
toc_sticky: true
date: 2025-09-26 22:45:25+0900
last_modified_at: 2025-09-26 22:45:25+0900
published: true
---
> **원문 링크:** [PEP 502 - String Interpolation - Extended Discussion](https://peps.python.org/pep-0502/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 10-Aug-2015


---
# PEP 502 – String Interpolation - 확장된 논의 (Rejected)

이 문서는 Python 3.6에 도입된 "f-string" (Literal String Formatting)인 PEP 498의 배경과 설계 이유에 대한 확장된 논의를 담고 있습니다. PEP 502는 최종적으로 **거부(Rejected)** 되었는데, 이는 사실 기반의 서술보다는 의견 기반의 서술이 많았고, PEP 498이 이미 작성되어 설계 결정의 세부 사항을 다룰 공간이 되었어야 한다고 판단되었기 때문입니다.

## 개요 (Abstract)

PEP 498: Literal String Interpolation (리터럴 문자열 보간법)은 "formatted strings" (형식화된 문자열)를 제안하여 2015년 9월 9일에 승인되었습니다. 이 문서(PEP 502)는 해당 설계 단계에서 제공된 추가 배경 및 근거를 자세히 설명합니다.

PEP 498의 핵심 내용은 문자열을 템플릿으로 표시하는 새로운 문자열 접두사(string prefix)가 도입되었다는 것입니다. 이 형식화된 문자열(formatted strings)은 기존 `str.format()` 문법을 기반으로 하나 이상의 표현식(expression)을 포함할 수 있습니다. 형식화된 문자열은 컴파일 시점에 일반적인 문자열 포맷팅 연산으로 확장되며, 문자열 내의 표현식은 추출되어 위치 인자(positional arguments)로 전달됩니다.

런타임(runtime) 시, 결과 표현식들은 지정된 형식으로 문자열을 렌더링하기 위해 평가됩니다:

```python
>>> location = 'World'
>>> f'Hello, {location} !' # 새로운 접두사: f''
'Hello, World !' # 보간(interpolated) 결과
```

형식 문자열(format-strings)은 단순히 `str.format()`에 대한 전통적인 호출을 단순화하는 문법적 설탕(syntactic sugar)으로 이해될 수 있습니다.

## 동기 (Motivation)

Python은 문자열 포맷팅 및 조작 기능이 풍부하지만, 편리한 문자열 보간(string interpolation) 문법이 부족하다는 단점이 있었습니다. 비슷한 사용 사례를 가진 다른 동적 스크립팅 언어와 비교할 때, 유사한 문자열을 구성하는 데 필요한 코드 양이 상당히 많았고, 때로는 장황함(verbosity), 복잡한 문법, 또는 식별자(identifier) 중복으로 인해 가독성이 떨어지기도 했습니다.

이러한 어려움은 PEP 498의 시작점이 된 `python-ideas` 메일링 리스트의 초기 게시물에서 자세히 설명되었습니다.

또한, Python 3에서 `print` 문(statement)이 더 일관적인 `print()` 함수(PEP 3105)로 대체되면서, 추가적인 괄호(parentheses)를 입력하고 읽어야 하는 작은 부담이 더해졌습니다. 현재 문자열 포맷팅 솔루션의 장황함과 결합하여, 이는 원래 단순한 언어인 Python을 다른 언어에 비해 불리하게 만들었습니다.

예시:
```python
# bash
echo "Hello, user: $user, id: $id, on host: $hostname"
# perl
say "Hello, user: $user, id: $id, on host: $hostname";
# ruby
puts "Hello, user: #{user}, id: #{id}, on host: #{hostname}\n"

# Python 3, str.format with named parameters
print('Hello, user: {user}, id: {id}, on host: {hostname}'.format(**locals()))
# Python 3, worst case (가장 좋지 않은 경우)
print('Hello, user: {user}, id: {id}, on host: {hostname}'.format(user=user, id=id, hostname= hostname))
```
Python에서는 표준 너비의 한 줄 코드에 여러 변수를 사용하여 문자열을 포맷하고 출력하는 것이 훨씬 어렵고 장황하며, 들여쓰기(indentation)가 이 문제를 더욱 악화시켰습니다.

작은 프로젝트, 시스템 프로그래밍, 셸 스크립트 대체, 심지어 원-라이너(one-liners)와 같이 메시지 포맷팅 복잡성이 아직 캡슐화되지 않은 사용 사례의 경우, 이러한 장황함은 수년 동안 상당수의 개발자와 관리자들이 다른 언어를 선택하게 만들었을 가능성이 높습니다.

## 설계 목표 (Goals)

형식 문자열(format strings)의 설계 목표는 다음과 같습니다:

*   변수를 수동으로 전달할 필요성 제거.
*   식별자(identifier) 반복 및 중복 괄호 제거.
*   어색한 문법, 구두점 문자 및 시각적 노이즈(visual noise) 감소.
*   위치 인자(positional arguments)보다 이름 있는 인자(named parameters)를 선호하여 가독성 향상 및 불일치 오류 제거.
*   `locals()` 및 `globals()` 사용 필요성 회피. 대신 주어진 문자열에서 이름 있는 인자를 파싱하고 자동으로 전달.

## 한계 (Limitations)

Unix 및 셸에서 디자인 힌트를 얻은 다른 언어와 달리, 그리고 Javascript와 마찬가지로 Python은 문자열을 묶는 데 단일(') 및 이중(") ASCII 따옴표 문자를 모두 지정했습니다. 이들 중 하나를 보간(interpolation)에 사용하고 다른 하나는 보간되지 않은 문자열에 남겨두는 것은 합리적이지 않습니다. "백틱"(`)과 같은 다른 문자도 `repr()`의 단축키로 사용되어 역사적으로 제약이 있었습니다.

이러한 제약으로 인해 해당 기능 설계를 위한 몇 가지 옵션이 남았습니다:

*   `printf` 스타일 문자열 포맷팅의 `%`와 같은 연산자(operator).
*   `string.Template()` 클래스와 같은 클래스.
*   `str.format()` 메서드와 같은 메서드 또는 함수.
*   새로운 문법.
*   잘 알려진 `r''` 또는 `u''`와 같은 새로운 문자열 접두사 마커(string prefix marker).

처음 세 가지 옵션은 이미 성숙했지만, 이전에 언급된 장황함과 시각적 노이즈 문제에서 벗어나지 못했습니다.

## 배경 (Background)

형식화된 문자열(Formatted strings)은 여러 기존 기술 및 제안과 이를 통해 얻은 집단적인 학습을 기반으로 합니다. 가독성 및 오류 방지라는 설계 목표에 따라, 다음 예시에서는 위치 인자 대신 이름 있는 인자를 사용합니다.

다음 딕셔너리가 있고, 최종 사용자에게 유익한 문자열로 항목을 출력하려는 경우를 가정해 봅시다:
```python
>>> params = {'user': 'nobody', 'id': 9, 'hostname': 'darkstar'}
```

### `printf` 스타일 포맷팅 (operator 활용)

이 오래된 기술은 바이트 기반 프로토콜, 간단한 경우의 단순성, 많은 프로그래머에게 익숙함 등의 유용성을 가집니다:
```python
>>> 'Hello, user: %(user)s, id: %(id)s, on host: %(hostname)s' % params
'Hello, user: nobody, id: 9, on host: darkstar'
```
이 형식은 사전 생성이라는 전제 조건이 있기에 장황하고 다소 노이즈가 있지만, 비교적 가독성이 있습니다. 추가적인 문제는 연산자가 원래 문자열 외에 하나의 인자만 받을 수 있으므로, 여러 매개변수를 튜플(tuple) 또는 딕셔너리로 전달해야 한다는 것입니다. 또한, 전달된 인자 수, 예상되는 타입, 누락된 키, 또는 끝에 붙는 타입(예: `s` 또는 `d`)을 잊어버리는 등의 오류를 범하기 쉽습니다.

### `string.Template` 클래스

PEP 292 (Simpler String Substitutions)의 `string.Template` 클래스는 의도적으로 단순화된 디자인으로, 익숙한 셸 보간 문법과 안전한 대체(safe-substitution) 기능을 사용하며, 주로 셸 및 국제화 도구에서 사용됩니다:
```python
Template('Hello, user: $user, id: ${id}, on host: $hostname').substitute(params)
```
이 역시 장황하지만, 문자열 자체는 읽기 쉽습니다. 기능은 제한적이지만, 요구 사항을 잘 충족합니다. 많은 경우에 강력하지 않으며, 이는 미숙한 사용자들이 문제를 일으키는 것을 방지하고, 제3자로부터의 중간 정도 신뢰할 수 있는 입력(i18n)으로 인한 문제를 피하는 데 도움이 됩니다. 안타깝게도 `flufl.i18n`와 같은 편의 라이브러리에 캡슐화되지 않으면, 임시 문자열 보간에는 사용을 꺼릴 정도로 많은 코드를 필요로 합니다.

### PEP 215 - String Interpolation

PEP 215는 이 제안(PEP 502)과 많은 공통점을 가진 이전 제안이었습니다. 당시에는 세상이 준비되지 않았던 것으로 보이지만, 다른 여러 언어에서 최근 지원을 고려하면 다시 주목받을 수 있었습니다. 많은 달러 기호($)를 포함하여 Python의 숙적(arch-nemesis)인 Perl과 비슷하게 보였고, 이는 PEP의 불수용에 기여했을 가능성이 있습니다. 이 제안은 다음 제안에 의해 대체되었습니다.

### `str.format()` 메서드

PEP 3101의 `str.format()` 문법은 기존 옵션 중 가장 최근의 현대적인 방식입니다. 또한 다른 방법보다 강력하고 일반적으로 읽기 쉽습니다. 이전 기술의 많은 단점과 한계를 피합니다.

그러나 필수적인 함수 호출 및 매개변수 전달 때문에, 문자열 리터럴과 함께 사용할 때 다양한 상황에서 장황하거나 매우 장황해집니다:
```python
>>> 'Hello, user: {user}, id: {id}, on host: {hostname}'.format(**params)
'Hello, user: nobody, id: 9, on host: darkstar'
# 키워드 인자를 사용할 때, 때때로 변수 이름 단축이 필요함
>>> 'Hello, user: {user}, id: {id}, on host: {host}'.format(user=user, id=id, host=hostname)
'Hello, user: nobody, id: 9, on host: darkstar'
```
메서드 기반 접근 방식의 장황함은 위에서 설명됩니다.

### PEP 498 – Literal String Formatting

PEP 498은 위 개요(Abstract)에서도 설명된 형식 문자열(format strings)을 정의하고 논의합니다.

또한, 처음 접하는 사람들에게는 다소 논란의 여지가 있지만, 형식 문자열이 임의의 표현식(arbitrary expressions)을 지원하도록 확장될 것이라는 아이디어를 소개합니다. 이는 "거부된 아이디어(Rejected Ideas)" 섹션의 "문법을 `str.format()`으로만 제한(Restricting Syntax to str.format() Only)"에서 더 자세히 논의됩니다.

### PEP 501 – Translation ready string interpolation

상호 보완적인 PEP 501은 `i-prefix` 제안, ES6 (Javascript)와 호환되는 `string.Template` 문법 통합, 지연 렌더링(deferred rendering), 그리고 객체 반환 값을 통해 국제화(internationalization)를 중요한 고려 사항으로 논의에 도입합니다.

## 다른 언어에서의 구현 (Implementations in Other Languages)

문자열 보간(string interpolation)은 이제 여러 산업에서 사용되는 다양한 프로그래밍 언어에서 잘 지원되며, 일종의 표준으로 수렴되고 있습니다. 이는 유틸리티 확장을 위한 임의의 표현식 추가와 함께, 약간의 변형이 있는 `str.format()` 스타일 문법을 중심으로 합니다.

"동기(Motivation)" 섹션에서 Bash, Perl, Ruby에 편리한 보간 문법이 존재함을 보여주었습니다. 이제 이들의 표현식 지원을 살펴보겠습니다.

### Bash

Bash는 문자열 내에서 임의의, 심지어 재귀적인 구성(construct)을 지원합니다:
```bash
> echo "user: $USER, id: $((id + 6)) on host: $(echo is $(hostname))"
user: nobody, id: 15 on host: is darkstar
```
*   이중 따옴표 내에서 명시적인 보간이 지원됩니다.
*   직접적인 환경 변수 접근이 지원됩니다.
*   임의의 표현식이 지원됩니다.
*   외부 프로세스 실행 및 출력 캡처가 지원됩니다.
*   재귀적인 표현식이 지원됩니다.

### Perl

Perl 또한 임의의 표현식 구성을 가지고 있습니다.
```perl
say "I have @{[$id + 6]} guanacos."; # 리스트 (lists)
say "I have ${\($id + 6)} guanacos."; # 스칼라 (scalars)
say "Hello { @names.join(', ') } how are you?"; # Perl 6 버전
```
*   이중 따옴표 내에서 명시적인 보간이 지원됩니다.
*   임의의 표현식이 지원됩니다.

### Ruby

Ruby는 보간된 문자열 내에서 임의의 표현식을 허용합니다:
```ruby
puts "One plus one is two: #{1 + 1}\n"
```
*   이중 따옴표 내에서 명시적인 보간이 지원됩니다.
*   임의의 표현식이 지원됩니다.
*   `%`를 사용하여 구분 문자(delimiter chars)를 변경할 수 있습니다.

### 기타 (Others)

문자열 보간을 최근 구현한 덜 유사한 현대 언어들을 살펴보겠습니다.

#### Scala

Scala의 보간은 문자열 접두사를 통해 지시됩니다. 각 접두사는 다른 결과를 가집니다:
```scala
s"Hello, $name ${1 + 1}"  // 임의의 표현식 (arbitrary)
f"$name%s is $height%2.2f meters tall" // printf 스타일
raw"a\nb" // raw, r''와 유사
```
이러한 접두사는 Scala의 `StringContext` 클래스를 확장하여 사용자도 구현할 수 있습니다.
*   리터럴 접두사를 가진 이중 따옴표 내에서 명시적인 보간이 지원됩니다.
*   사용자 구현 접두사가 지원됩니다.
*   임의의 표현식이 지원됩니다.

#### ES6 (Javascript)

템플릿 문자열(Template strings)의 설계자들은 Python과 마찬가지로 단일 및 이중 따옴표가 이미 사용 중이라는 문제에 직면했습니다. 그러나 Python과 달리 "백틱"은 사용 중이 아니었습니다. 문제점에도 불구하고, 백틱은 ECMAScript 2015 (ES6) 표준의 일부로 채택되었습니다:
```javascript
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
```
태그(tag)와 동일한 이름의 함수를 구현하여 사용자 정의 접두사(Custom prefixes)도 지원됩니다:
```javascript
function tag(strings, ...values) {
  console.log(strings.raw); // raw string도 사용 가능
  return "Bazinga!";
}
tag`Hello ${ a + b } world ${ a * b }`;
```
*   백틱 내에서 명시적인 보간이 지원됩니다.
*   사용자 구현 접두사가 지원됩니다.
*   임의의 표현식이 지원됩니다.

#### C#, 버전 6

C# 또한 `IFormattable` 인터페이스를 통해 보간을 사용자 정의할 수 있는 유용한 새 보간 기능을 가지고 있습니다:
```csharp
$"{person.Name, 20} is {person.Age:D3} year{(p.Age == 1 ? "" : "s")} old.";
```
*   이중 따옴표와 `$` 접두사를 사용한 명시적인 보간.
*   사용자 정의 보간이 가능합니다.
*   임의의 표현식이 지원됩니다.

#### Apple의 Swift

Swift에서는 모든 문자열에서 임의의 보간이 가능합니다:
```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message는 "3 times 2.5 is 7.5"
```
*   이중 따옴표를 사용한 암시적인 보간.
*   임의의 표현식이 지원됩니다.
*   CR/LF를 포함할 수 없습니다.

## 새로운 문자열 접두사 (New String Prefix)

Python의 문자열 포맷팅 역사와 하위 호환성(backwards-compatibility), 다른 언어에서의 구현, 그리고 불필요한 새 문법 회피 등을 고려할 때, 독창적인 통찰보다는 제거 과정을 통해 수용 가능한 디자인에 도달했습니다. 따라서 보간된 문자열 리터럴을 문자열 접두사로 표시하는 방법이 선택되었습니다.

또한, 기존 선택지 중 가장 강력한 `str.format()`을 재사용하고 기반으로 하는 표현식 문법을 선택하여 기능 중복을 피했습니다:
```python
>>> location = 'World'
>>> f'Hello, {location} !' # 새로운 접두사: f''
'Hello, World !' # 보간(interpolated) 결과
```
PEP 498 – Literal String Formatting은 이 설계의 메커니즘과 구현에 대해 자세히 다룹니다.

## 추가 주제 (Additional Topics)

### 안전성 (Safety)

이 섹션에서는 형식 문자열(format-strings)을 지원하기 위해 취해진 안전 상황 및 예방 조치에 대해 설명합니다.

형식 문자열에 대해서는 입력으로 받거나 전달되는 변수가 아닌 **문자열 리터럴(string literals)만 고려**되었으므로, 외부 공격을 수행하기 어렵게 만듭니다.

`str.format()` 및 대안들은 이미 이 사용 사례를 처리합니다.

변환 과정에서 `locals()`나 `globals()`는 필요하지도 사용되지도 않으므로, 정보 누출을 방지합니다. 재귀 깊이로 인한 복잡성과 `RuntimeError`를 제거하기 위해 재귀적 보간은 지원되지 않습니다.

그러나 문자열 리터럴 내에서 실수나 악의적인 코드(malicious code)가 간과될 수 있습니다. 이는 일반적으로 코드에 대해 말할 수 있는 것이지만, 이러한 표현식이 문자열 내부에 있다는 것은 가려질 가능성이 더 높다는 것을 의미합니다.

#### 도구를 통한 완화 (Mitigation via Tools)

`pyflakes`, `pylint`, 또는 `Pycharm`과 같은 도구(tools)나 린터(linters)가 표현식이 포함된 문자열 내부를 검사하고 적절하게 표시할 수 있다는 아이디어가 있습니다. 오늘날 프로그래밍 언어에서 이는 흔한 작업이므로, 다국어(multi-language) 도구는 이 기능을 Python만을 위해 구현할 필요가 없어 구현 시간을 크게 단축할 수 있습니다.

더 먼 미래에는 프로젝트의 안전 정책을 초과하는 구성(constructs)에 대해 문자열이 검사될 수도 있습니다.

#### 스타일 가이드/주의 사항 (Style Guide/Precautions)

임의의 표현식은 Python 표현식이 할 수 있는 모든 것을 수행할 수 있으므로, 형식 문자열 내에서 부작용(side effects)을 일으킬 수 있는 구성을 피하는 것이 강력히 권장됩니다.

사용 패턴과 실제 문제가 알려지면 추가 지침이 작성될 수 있습니다.

### 하위 호환성 (Backwards Compatibility)

기존 문법을 사용하고 현재 또는 과거의 기능과 충돌하지 않도록 설계되었으므로, 형식 문자열은 기존 코드와 간섭하지 않으며 어떠한 문제도 일으키지 않을 것으로 예상됩니다.

## 연기된 아이디어 (Postponed Ideas)

### 국제화 (Internationalization)

국제화 지원을 통합하는 것이 매우 바람직했지만 (PEP 501 참조), 세부 사항이 거의 모든 지점에서 달라 공통 솔루션은 어려울 것으로 보였습니다:
*   사용 사례가 다름
*   컴파일 시간(compile-time) vs. 런타임(run-time) 작업
*   보간 문법 요구 사항
*   대상 청중
*   보안 정책

## 거부된 아이디어 (Rejected Ideas)

### 문법을 `str.format()`으로만 제한 (Restricting Syntax to str.format() Only)

임의의 표현식 지원에 반대하는 일반적인 주장들은 다음과 같았습니다:
*   **YAGNI (You aren't gonna need it):** "그것은 필요 없을 것이다."
*   이 기능은 Python의 역사적인 보수주의와 일치하지 않는다.
*   **연기:** 필요성이 입증되면 미래 버전에서 구현할 수 있다.

그러나 `str.format()` 문법만 지원하는 것은 문제에 대한 충분한 해결책이 아니라고 판단되었습니다. 예를 들어, 출력하기 전에 객체의 간단한 길이 또는 증가와 같은 작업이 자주 필요합니다.

"다른 언어에서의 구현(Implementations in Other Languages)" 섹션에서 개발자 커뮤니티가 대체로 이에 동의한다는 것을 알 수 있습니다. 임의의 표현식을 포함한 문자열 보간은 유용성 때문에 현대 언어에서 산업 표준이 되고 있습니다.

### 추가/사용자 정의 문자열 접두사 (Additional/Custom String-Prefixes)

"다른 언어에서의 구현(Implementations in Other Languages)" 섹션에서 보았듯이, 많은 현대 언어는 공통 인터페이스를 가진 확장 가능한 문자열 접두사를 가지고 있습니다. 이는 일반적인 상황에서 코드를 일반화하고 줄이는 방법이 될 수 있습니다. 예시는 ES6 (Javascript), Scala, Nim, C# (정도 덜함)에서 찾을 수 있습니다. 이 아이디어는 BDFL(Benevolent Dictator For Life, Guido van Rossum)에 의해 거부되었습니다.

### 입력 변수의 자동 이스케이프 (Automated Escaping of Input Variables)

어떤 경우에는 도움이 되지만, 이는 문자열 표현식을 안전하게 사용할 수 있는 시기와 장소에 대해 너무 많은 불확실성을 초래한다고 생각되었습니다. 이 개념은 다른 사람들에게 설명하기도 어려웠습니다.

개발자가 명시적으로 이스케이프하지 않는 한, 형식 문자열 변수는 항상 이스케이프되지 않은 것으로 간주해야 합니다.

### 환경 접근 및 명령 치환 (Environment Access and Command Substitution)

시스템 프로그래밍 및 셸 스크립트 대체 용도로는 표현식 문자열에서 환경 변수를 처리하고 명령의 출력을 직접 캡처하는 것이 유용할 것입니다. 이는 충분히 중요하지 않고, bash/perl과 너무 비슷하게 보여 나쁜 습관을 조장할 수 있다는 이유로 거부되었습니다.

## 참고 문헌 (References)

PEP 502 문서 내에서 인용된 참고 자료들은 원문에서 확인할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.