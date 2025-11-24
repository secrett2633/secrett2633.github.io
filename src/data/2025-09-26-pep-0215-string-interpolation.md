---
title: "[Superseded] PEP 215 - String Interpolation"
excerpt: "Python Enhancement Proposal 215: 'String Interpolation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/215/
toc: true
toc_sticky: true
date: 2025-09-26 16:32:37+0900
last_modified_at: 2025-09-26 16:32:37+0900
published: true
---
> **원문 링크:** [PEP 215 - String Interpolation](https://peps.python.org/pep-0215/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 24-Jul-2000

## PEP 215 – 문자열 보간 (String Interpolation)

### 개요

이 문서는 Python 2.1에서 더 쉬운 문자열 포매팅을 가능하게 하는 문자열 보간(String Interpolation) 기능을 제안합니다. 제안된 구문 변경은 `$ ` 접두사의 도입입니다. 이 접두사는 유닉스 셸(Unix shells), `awk`, Perl, 또는 Tcl에서 찾아볼 수 있는 변수 보간(variable interpolation) 방식과 유사하게 문자열 내의 `$` 문자에 대한 특별한 해석을 트리거합니다.

**중요:** 이 PEP는 PEP 292에 의해 대체(Superseded)되었습니다.

### 저작권

이 문서는 퍼블릭 도메인에 속합니다.

### 사양 (Specification)

문자열 앞에 리딩 싱글 또는 더블 따옴표(또는 삼중 따옴표)와 다른 문자열 접두사('r' 또는 'u') 앞에 오는 `$` 접두사가 붙을 수 있습니다. 이러한 문자열은 내용의 백슬래시 이스케이프(backslash-escapes)에 대한 일반적인 해석 후에 보간을 위해 처리됩니다. 이 처리는 문자열이 값 스택(value stack)에 푸시되기 직전에, 문자열이 푸시될 때마다 발생합니다. 요약하자면, Python은 `$`가 문자열에 적용되는 단항 연산자(unary operator)인 것처럼 정확하게 동작합니다. 수행되는 연산은 다음과 같습니다:

문자열은 `$` 문자(`\x24` (8비트 문자열) 또는 `\u0024` (유니코드 문자열))를 찾기 위해 처음부터 끝까지 스캔됩니다. `$` 문자가 없으면 문자열은 변경되지 않고 반환됩니다.

문자열에서 발견된 모든 `$`는 아래에 설명된 두 가지 종류의 표현식 중 하나가 뒤따라올 경우, 현재 네임스페이스(namespaces)에서 평가된 표현식의 값으로 대체됩니다. 이 값은 포함하는 문자열이 8비트 문자열인 경우 `str()`로, 유니코드 문자열인 경우 `unicode()`로 변환됩니다.

*   선택적으로 여러 개의 트레일러(trailer)가 뒤따르는 Python 식별자. 여기서 트레일러는 다음으로 구성됩니다:
    *   점(`.`)과 식별자.
    *   대괄호(`[]`)로 묶인 표현식.
    *   괄호(`()`)로 묶인 인자 목록. (이는 `Grammar/Grammar`의 정의를 사용하여 Python 문법에서 “`NAME trailer*`”로 표현된 패턴과 정확히 일치합니다.)
*   중괄호(`{}`)로 묶인 완전한 Python 표현식.

두 개의 달러 기호(`$$`)는 하나의 `$`로 대체됩니다.

### 예시 (Examples)

다음은 이 기능의 예상되는 동작을 보여주는 대화형 세션 예시입니다.

```python
>>> a, b = 5, 6
>>> print $'a = $a, b = $b'
a = 5, b = 6
>>> $u'uni${a}ode'
u'uni5ode'
>>> print $'\$a'
5
>>> print $r'\$a'
\5
>>> print $'$$$a.$b'
$5.6
>>> print $'a + b = ${a + b}'
a + b = 11
>>> import sys
>>> print $'References to $a: $sys.getrefcount(a)'
References to 5: 15
>>> print $"sys = $sys, sys = $sys.modules['sys']"
sys = <module 'sys' (built-in)>, sys = <module 'sys' (built-in)>
>>> print $'BDFL = $sys.copyright.split()[4].upper()'
BDFL = GUIDO
```

### 논의 (Discussion)

`$`는 다른 많은 언어 및 컨텍스트에서 이미 보간 문자로 사용되므로 익숙함을 위해 문자열 내의 보간 문자로 선택되었습니다.

이러한 맥락에서 `$`를 접두사로 선택하는 것은 보간 문자에 대한 기억하기 쉬운(mnemonic) 방식이므로 자연스러운 선택입니다.

트레일러(trailers)가 허용되어 대부분의 다른 언어에서 사용 가능한 보간보다 훨씬 더 강력한 보간 메커니즘을 제공하면서도, 보간될 표현식은 명확하게 보이고 중괄호가 필요 없습니다.

`$`는 연산자처럼 작동하며 연산자로 구현될 수도 있지만, 그렇게 하면 컴파일 타임 최적화(compile-time optimization)가 불가능해지고 보안 문제가 발생합니다. 따라서 문자열 접두사로만 허용됩니다.

### 보안 문제 (Security Issues)

`$`는 `eval()`의 기능을 가지고 있지만, 리터럴(literal)만을 평가합니다. (연산자가 아닌 문자열 접두사로) 여기에 설명된 방식으로는 새로운 보안 문제를 야기하지 않습니다. 평가될 표현식은 코드에 문자열 리터럴로 명시적으로 존재해야 하기 때문입니다.

### 구현 (Implementation)

의 `Itpl` 모듈은 이 기능의 프로토타입을 제공합니다. 이 모듈은 `tokenize` 모듈을 사용하여 보간될 표현식의 끝을 찾은 다음, 값이 필요할 때마다 표현식에 대해 `eval()`을 호출합니다. 프로토타입에서는 표현식이 평가될 때마다 구문 분석(parse)되고 다시 컴파일됩니다.

최적화로서, 보간된 문자열은 해당 바이트코드(bytecode)로 직접 컴파일될 수 있습니다. 즉, `'a = $a, b = $b'`는 마치 `'a = ' + str(a) + ', b = ' + str(b)` 표현식인 것처럼 컴파일되어 한 번만 컴파일되면 됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.