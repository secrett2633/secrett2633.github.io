---
title: "[Withdrawn] PEP 531 - Existence checking operators"
excerpt: "Python Enhancement Proposal 531: 'Existence checking operators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/531/
toc: true
toc_sticky: true
date: 2025-09-26 23:22:20+0900
last_modified_at: 2025-09-26 23:22:20+0900
published: true
---
> **원문 링크:** [PEP 531 - Existence checking operators](https://peps.python.org/pep-0531/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 25-Oct-2016

PEP 531 – 존재 확인 연산자 (Existence Checking Operators)

**상태:** 철회됨 (Withdrawn)

## 초록 (Abstract)
PEP 505와 관련 논의에서 영감을 받은 이 PEP는 Python에 두 가지 새로운 제어 흐름 연산자를 추가할 것을 제안했습니다:
*   **존재 확인 전제 조건("exists-then"):** `expr1 ?then expr2`
*   **존재 확인 대체 ("exists-else"):** `expr1 ?else expr2`

또한, 일반적인 존재 확인 표현식 및 문장을 위한 다음과 같은 약어를 제안했습니다:
*   **존재 확인 속성 접근:** `obj?.attr` ( `obj ?then obj.attr` 와 동일)
*   **존재 확인 인덱싱 (Subscripting):** `obj?[expr]` ( `obj ?then obj[expr]` 와 동일)
*   **존재 확인 할당:** `value ?= expr` ( `value = value ?else expr` 와 동일)

이 새로운 연산자 정의에 사용된 공통 기호 `?`는 `if` 문, `while` 루프, `comprehension`, `generator expression`, 조건부 표현식, 논리적 `and`, 논리적 `or`에서 사용되는 기존의 `truth-checking` 프로토콜 대신 새로운 "existence checking" 프로토콜을 사용한다는 것을 나타냅니다.

이 새로운 프로토콜은 `operator.exists`로 제공될 예정이었으며, 다음과 같은 특징을 가집니다:
*   타입은 기본 동작을 재정의하기 위해 새로운 `__exists__` 매직 메서드 (Python) 또는 `tp_exists` 슬롯 (C)을 정의할 수 있습니다. 이 선택적 메서드는 `__bool__`과 동일한 시그니처와 가능한 반환 값을 가집니다.
*   `operator.exists(None)`은 `False`를 반환합니다.
*   `operator.exists(NotImplemented)`는 `False`를 반환합니다.
*   `operator.exists(Ellipsis)`는 `False`를 반환합니다.
*   `float`, `complex`, `decimal.Decimal`은 `NaN` 값이 `False`를 반환하고 다른 값 (0 값 포함)은 `True`를 반환하도록 존재 확인을 재정의합니다.
*   다른 모든 타입의 경우, `operator.exists(obj)`는 기본적으로 `True`를 반환합니다.
*   가장 중요한 점은 `truth-checking` 컨텍스트에서 `False`로 평가되는 값 (0, 빈 컨테이너)도 `existence-checking` 컨텍스트에서는 `True`로 평가된다는 것입니다.

## PEP 철회 (PEP Withdrawal)
이 PEP는 `python-ideas`에 토론을 위해 게시되었을 때, 특정 구문 제안의 세부 사항을 고려하기 전에 세 가지 상위 수준의 디자인 질문을 검토하도록 요청했습니다:

1.  "존재 확인(existence checking)"이 소프트웨어 개발에 존재하는 유용한 일반적인 개념이며 "진리 확인(truth checking)" 개념과 구별되는가?
2.  Python 생태계가 언어 정의, 표준 라이브러리 및 사용자 정의 코드에 정의된 "데이터 누락(data missing)" 지표 전반에 걸쳐 알고리즘(특히 단축 평가(short-circuiting) 알고리즘)의 일반화를 허용하는 존재 확인 프로토콜로부터 이점을 얻을 것인가?
3.  `truth-checking`의 `and` 및 `or` 제어 흐름 연산자에 해당하는 존재 확인 연산자가 제공된다면 그러한 프로토콜을 효과적으로 사용하기 더 쉬울 것인가?

첫 번째 질문에 대한 답변은 대체로 긍정적이었지만, 두 번째 질문에 대한 답변은 "아니오"라는 것이 빠르게 명확해졌습니다.

Steven D'Aprano는에서 반대 의견을 잘 설명했지만, 일반적인 아이디어는 "누락된 데이터(missing data)" 센티넬(sentinel)을 확인할 때, 특정 센티넬 값을 찾는 경우가 거의 항상이며, 어떤 센티넬 값이라도 찾는 것이 아니라는 것입니다.

예를 들어, `NotImplemented`는 `None`이 오버로드된 산술 연산자의 잠재적으로 유효한 결과일 수 있고, 예외 처리가 피연산자 강제 변환에 유용하기에는 너무 많은 런타임 오버헤드를 부과하기 때문에 존재합니다.

마찬가지로, `Ellipsis`는 다차원 슬라이싱 지원을 위해 존재합니다. 이는 `None`이 슬라이싱 컨텍스트에서 이미 다른 의미(기본 시작 또는 중지 인덱스 또는 기본 스텝 크기 사용을 나타냄)를 가지고 있기 때문입니다.

수학에서 `NaN` 값의 유용성은 프로그램적으로 해당 타입의 일반 값처럼 동작하면서(예: 모든 일반 속성 및 메서드 노출), 산술적으로는 `NaN` 값을 처리하는 수학적 규칙에 따라 동작한다는 것입니다.

이 핵심 디자인 개념이 무효화됨에 따라, 제안 전체는 의미가 없으므로 철회되었습니다.

그러나 제안에 대한 논의는 새로운 구문 도입 없이 기존 `and`, `or`, `if-else` 연산자를 더 유연하게 만들 수 있는 잠재적인 프로토콜 기반 접근 방식에 대한 고려를 촉발시켰으므로, 이는 PEP 505에 대한 또 다른 가능한 대안으로 작성될 예정입니다.

## 다른 PEP와의 관계 (Relationship with other PEPs)
이 PEP는 Mark Haase의 PEP 505 작업을 기반으로 하고 영감을 받았지만, 제안된 기능의 구문 및 의미론적 세부 사항의 상당한 차이로 인해 궁극적으로 해당 PEP와 경쟁했습니다.

또한, 애플리케이션 및 서비스 개발 활동의 전형적인 요구 사항이 실제로 변화함에 따라 기존 Python 사용자에게 미치는 이점에 초점을 맞춰 변경의 근거에 대한 다른 관점을 제시합니다. 유사한 기능이 여러 프로그래밍 언어에 나타나는 것은 우연이 아니며, 다른 언어 설계자들이 이 문제를 어떻게 다루고 있는지 배우는 것이 좋지만, 다른 곳에서 설정된 선례는 이 문제를 어떻게 해결할 것인지에 더 관련이 있으며, 이 문제를 애초에 다루어야 한다고 생각하는지에 대한 여부와는 관련이 없습니다.

## 근거 (Rationale)
### 존재 확인 표현식 (Existence checking expressions)
현대 소프트웨어 개발에서 점점 더 흔해지는 요구 사항은 "반정형 데이터(semi-structured data)" 작업입니다. 이는 데이터의 구조는 미리 알려져 있지만, 런타임에 데이터의 일부가 누락될 수 있으며, 해당 데이터를 조작하는 소프트웨어는 완전히 실패하기보다는 점진적으로 기능 저하(예: 누락된 데이터에 의존하는 결과 생략)하도록 예상되는 경우입니다.

이 문제가 발생하는 특히 일반적인 경우는 다음과 같습니다:
*   선택적 애플리케이션 구성 설정 및 함수 매개변수 처리
*   분산 시스템에서 외부 서비스 실패 처리
*   부분 레코드를 포함하는 데이터 세트 처리

이 중 후자 두 가지 경우가 이 PEP의 주요 동기입니다. 선택적 구성 설정 및 매개변수를 처리해야 하는 요구 사항은 Python 자체만큼 오래된 디자인 요구 사항이지만, 퍼블릭 클라우드 인프라의 부상, 분산 서비스의 협업 네트워크로서의 소프트웨어 시스템 개발, 분석을 위한 대규모 공개 및 비공개 데이터 세트의 가용성은 부분 서비스 실패 또는 부분 데이터 가용성 상황에서 작업을 점진적으로 저하시킬 수 있는 능력이 현대 프로그래밍 환경의 필수 기능이 되고 있음을 의미합니다.

현재 Python에서 이러한 소프트웨어를 작성하는 것은 코드가 다음과 같은 표현식으로 가득 차게 되므로 정말로 어색할 수 있습니다:
```python
value1 = expr1.field.of.interest if expr1 is not None else None
value2 = expr2["field"]["of"]["interest"] if expr2 is not None else None
value3 = expr3 if expr3 is not None else expr4 if expr4 is not None else expr5
```
이러한 경우가 가끔 발생한다면, 전체 문장 형태로 확장하면 가독성을 향상시킬 수 있지만, 데이터 변환 파이프라인에서 4~5개가 연속으로 있는 경우(이는 상당히 흔한 상황입니다), 이를 16~20줄의 조건부 로직으로 대체하는 것은 문제를 전혀 해결하는 데 도움이 되지 않습니다.

위 세 가지 예시를 다음과 같이 확장하면 이를 이해하는 데 도움이 될 것입니다:
```python
if expr1 is not None:
    value1 = expr1.field.of.interest
else:
    value1 = None

if expr2 is not None:
    value2 = expr2["field"]["of"]["interest"]
else:
    value2 = None

if expr3 is not None:
    value3 = expr3
else:
    if expr4 is not None:
        value3 = expr4
    else:
        value3 = expr5
```
이 PEP의 제안들이 결합된 영향은 위 샘플 표현식들을 다음과 같이 작성할 수 있도록 하는 것입니다:
```python
value1 = expr1?.field.of.interest
value2 = expr2?["field"]["of"]["interest"]
value3 = expr3 ?else expr4 ?else expr5
```
이러한 형태에서는 독자에게 제시되는 거의 모든 정보가 "이 코드는 무엇을 하는가?"라는 질문과 즉시 관련되며, 누락된 데이터를 출력으로 전달하거나 대체 입력으로 폴백(fallback)하여 처리하는 상용구(boilerplate) 코드는 `?` 기호 두 번과 `?else` 키워드 두 번 사용으로 줄어들었습니다.

처음 두 예시에서, 31자 길이의 상용구 절 `if exprN is not None else None` (단일 문자 변수명에서는 최소 27자)이 단일 `?` 문자로 대체되어, 코드 라인의 신호 대 패턴 노이즈 비율(signal-to-pattern-noise ratio)이 상당히 향상되었습니다 (특히 더 의미 있는 변수 및 필드 이름을 사용하도록 권장하여 표현의 간결성을 위해 짧게 만드는 것보다).

마지막 예시에서, 21자 길이의 상용구 `if exprN is not None` (최소 17자)의 두 인스턴스가 단일 문자로 대체되어 다시 신호 대 패턴 노이즈 비율이 상당히 향상되었습니다.

더 나아가, 5개의 "잠재적 관심 하위 표현식" 각각은 정확히 한 번만 포함되며, 이들이 존재하는지 먼저 확인하기 위해 4개를 복제하거나 명명된 변수로 추출할 필요가 없습니다.

존재 확인 전제 조건 연산자는 주로 존재 확인 속성 접근 및 인덱싱 연산자를 위한 명확한 개념적 기반을 제공하기 위해 정의됩니다:
*   `obj?.attr`는 대략 `obj ?then obj.attr`와 동일합니다.
*   `obj?[expr]`는 대략 `obj ?then obj[expr]`와 동일합니다.

단축 형태와 확장된 형태 사이의 주요 의미론적 차이는 존재 확인 연산자 왼쪽에 있는 공통 하위 표현식이 단축 형태에서는 한 번만 평가된다는 것입니다 (증가 할당문(augmented assignment statements)이 제공하는 이점과 유사합니다).

### 존재 확인 할당 (Existence checking assignment)
존재 확인 할당은 이 PEP의 개념을 확장하여 일반적인 구성 처리 관용구(idiom)를 다루도록 제안되었습니다:
```python
value = value if value is not None else expensive_default()
```
이것을 다음과 같이 축약할 수 있습니다:
```python
value ?= expensive_default()
```
이는 주로 대상이 인덱싱(subscript) 작업 또는 하위 속성일 때 유용합니다. 왜냐하면 이 특정 변경이 없더라도 PEP는 여전히 이 관용구를 다음과 같이 업데이트하는 것을 허용할 것이기 때문입니다:
```python
value = value ?else expensive_default()
```
이 형태를 추가하는 것에 대한 주요 반대 의견은 이것이 모호할 수 있으며 다음 중 하나를 의미할 수 있다는 것입니다:
*   `value = value ?else expensive_default()`
*   `value = value ?then value.subfield.of.interest`

두 번째 형태는 전혀 유용하지 않지만, 이 우려가 증가 할당 기능을 유지하면서 해결할 만큼 충분히 중요하다고 판단된다면, 전체 키워드를 구문에 포함시킬 수 있습니다:
```python
value ?else= expensive_default()
```
대안으로, 증가 할당은 현재 제안에서 완전히 제외되고 나중에 다시 고려될 수도 있습니다.

### 존재 확인 프로토콜 (Existence checking protocol)
존재 확인 프로토콜은 프록시 객체(예: 원격 리소스의 로컬 표현) 및 테스트에 사용되는 목(mock) 객체가 프록시 또는 목 객체 자체가 `None`이 아니더라도 대상 리소스의 비존재를 올바르게 나타낼 수 있도록 하기 위해 주로 이 제안에 포함되었습니다.

그러나 해당 프로토콜이 정의되면, 숫자 타입의 `NaN` 값을 확인하는 타입 독립적인 방법을 제공하도록 확장하는 것이 자연스러워 보입니다. 현재는 작업 중인 정확한 데이터 타입(예: 내장 `float`, 내장 `complex`, `decimal` 모듈)을 알고 적절한 연산(예: `math.isnan`, `cmath.isnan`, `decimal.getcontext().is_nan()` 등)을 사용해야 합니다.

마찬가지로, 다른 내장 플레이스홀더 싱글톤(singleton)인 `Ellipsis`와 `NotImplemented`도 데이터 자체를 나타내기보다는 데이터의 부재를 나타내는 객체로 간주하는 것이 합리적입니다.

### 제안된 기호 표기법 (Proposed symbolic notation)
Python은 역사적으로 `bool()` 내장 함수를 통해 직접 호출할 수 있는 `truth checking`이라는 한 가지 종류의 암시적 불리언(boolean) 컨텍스트만 가졌습니다. 이 PEP는 `truth checking` 대신 `existence checking`에 기반한 새로운 종류의 제어 흐름 연산을 제안하므로, `truth checking` 대신 `existence checking`이 사용될 때 코드에 직접 알림을 갖는 것이 가치 있다고 간주됩니다.

존재 주장을 위한 수학적 기호는 U+2203 'THERE EXISTS': `∃` 입니다.

따라서 이 PEP에서 제안된 구문 추가에 대한 한 가지 가능한 접근 방식은 이미 정의된 수학적 표기법을 사용하는 것입니다:
```python
expr1 ∃then expr2
expr1 ∃else expr2
obj∃.attr
obj∃[expr]
target ∃= expr
```
그러나 이 접근 방식에는 두 가지 주요 문제점이 있습니다. 하나는 실용적인 문제이고, 다른 하나는 교육학적인 문제입니다.

실용적인 문제는 대부분의 키보드가 기본적인 산술에 사용되는 기호 외에는 수학적 기호를 쉽게 입력할 수 있는 방법을 제공하지 않는다는 일반적인 문제입니다 (이 PEP에 나타나는 기호조차도 직접 입력하기보다는에서 복사하여 붙여넣은 것입니다).

교육학적인 문제는 존재 주장(`∃`)과 보편 주장(`∀`)의 기호가 기본적인 산술 연산자만큼 대부분의 사람들에게 익숙하지 않을 것이므로, `∃`를 채택함으로써 제안된 구문을 실제로 이해하기 쉽게 만들지는 못할 것이라는 점입니다.

이와 대조적으로, `?`는 Python 구문에서 몇 안 되는 남은 미사용 ASCII 구두점 문자 중 하나이므로, "이 제어 흐름 연산은 `truth check`가 아닌 `existence check`에 기반한다"는 구문 마커의 후보로 사용할 수 있습니다.

이 경로를 따르면 Python의 구문을 유사한 기능을 제공하는 다른 언어의 해당 구문과 일치시키는 장점도 있습니다.

PEP 505의 기존 요약과 "안전 탐색 연산자(safe navigation operator)" 및 "널 병합 연산자(null coalescing operator)"에 대한 Wikipedia 기사에서 발췌하면 다음과 같습니다:

`?.` 존재 확인 속성 접근 구문은 다음을 정확하게 따릅니다:
*   C#의 "safe navigation" 속성 접근 연산자 (`?.`)
*   Swift의 "optional chaining" 연산자 (`?.`)
*   Groovy의 "safe navigation" 속성 접근 연산자 (`?.`)
*   Dart의 "conditional member access" 연산자 (`?.`)

`?[]` 존재 확인 속성 접근 구문은 다음을 정확하게 따릅니다:
*   C#의 "safe navigation" 인덱싱 연산자 (`?[]`)
*   Swift의 "optional subscript" 연산자 (`?[].`)

`?else` 존재 확인 대체 구문은 의미론적으로 다음을 따릅니다:
*   C#의 "null-coalescing" 연산자 (`??`)
*   PHP의 "null-coalescing" 연산자 (`??`)
*   Swift의 "nil-coalescing" 연산자 (`??`)

명확히 하자면, 이것들이 다른 언어에서 사용되는 유일한 연산자 표기법은 아니지만, 가장 일반적인 표기법이며 `?` 기호가 가장 흔한 구문 마커입니다 (아마도 C 스타일 조건부 표현식에서 `then` 절을 도입하는 데 `?`를 사용하는 것에 의해 촉발되었을 것입니다. 이러한 언어 중 다수가 이 또한 제공합니다).

### 제안된 키워드 (Proposed keywords)
기호 마커 `?`가 주어졌을 때, 존재 확인 전제 조건 및 대체 연산을 `truth checking`과 동일한 키워드를 사용하여 표현하는 것은 구문적으로 모호하지 않을 것입니다:
*   `expr1 ?and expr2` (`expr1 ?then expr2` 대신)
*   `expr1 ?or expr2` (`expr1 ?else expr2` 대신)

그러나, 구문적으로 작성되었을 때는 모호하지 않지만, 이 접근 방식은 코드를 발음하기 매우 어렵게 만들고 ("?"의 발음은 무엇인가?) 설명하기도 어렵게 만듭니다 (키워드가 재사용되므로 "존재 확인 전제 조건(?and)"과 "존재 확인 대체(?or)"를 "논리적 논리곱(and)" 및 "논리적 논리합(or)"과 구별하는 명확한 약어 용어가 없습니다).

사람들에게 `?` 기호를 "exists"라고 발음하도록 권장하여 약어 이름을 "exists-and expression" 및 "exists-or expression"으로 만들 수도 있지만, 코드에서 이를 보고 순수하게 그 이름을 추측할 방법은 없을 것입니다.

대신, 이 PEP는 제안된 기호 구문을 활용하여 새로운 키워드 (`?then`)를 도입하고 기존 키워드 (`?else`)를 차용하여 사람들이 모호함 없이 "`then` 표현식" 및 "`else` 표현식"을 언급할 수 있도록 합니다.

이러한 키워드는 제안된 표현식과 의미론적으로 동등한 조건부 표현식과도 잘 일치합니다.

`?else` 표현식의 경우, `expr1 ?else expr2`는 다음와 동일합니다:
```python
_lhs_result = expr1
_lhs_result if operator.exists(_lhs_result) else expr2
```
여기서 병렬 관계는 분명합니다. `else expr2`가 축약형과 확장형 모두의 끝에 나타나기 때문입니다.

`?then` 표현식의 경우, `expr1 ?then expr2`는 다음와 동일합니다:
```python
_lhs_result = expr1
expr2 if operator.exists(_lhs_result) else _lhs_result
```
여기서 병렬 관계는 Python의 전통적으로 익명인 "`then`" 절( `if` 문에서는 `:`으로, 조건부 표현식에서는 `if`로 접미사) 때문에 즉시 명확하지는 않지만, 조건부 제어 흐름의 "if-then-else" 설명에 이미 익숙하다면 여전히 합리적으로 명확합니다.

## 위험 및 우려 사항 (Risks and concerns)
### 가독성 (Readability)
새로운 구문을 효과적으로 읽고 쓰는 것을 배우는 것은 주로 두 가지 개념을 내면화하는 것을 필요로 합니다:
*   `?`를 포함하는 표현식은 존재 확인을 포함하며, `None` 또는 다른 "존재하지 않는" 값이 예상 입력이고 올바른 처리가 이를 결과로 전파하는 것이라면 단축 평가(short-circuit)될 수 있습니다. 이 경우 존재 확인 연산자가 원하는 것일 가능성이 높습니다.

현재 이러한 개념은 언어 수준에서 명시적으로 표현되지 않으므로, 조건부 표현식 및 문장을 기반으로 하는 다양한 관용적인 패턴을 인식하고 사용하는 것을 배워야 합니다.

### 마법 같은 구문 (Magic syntax)
`?`가 구문 요소로서 본질적으로 `is not None` 또는 `operator.exists`를 제안하는 것은 없습니다. Python 코드에서 `?`의 주요 현재 사용은 IPython 환경에서 이전 표현식의 결과에 대한 도움말 정보를 요청하기 위한 후행 접미사입니다.

그러나 존재 확인이라는 개념은 `truth checking`과 구별되는 광범위한 시각적 마커로부터 진정으로 이점을 얻으며, 이를 수행하려면 단일 문자 기호 구문이 필요합니다.

### 개념적 복잡성 (Conceptual complexity)
이 제안은 현재 임시적이고 비공식적인 "존재 확인" 개념을 명확하게 정의된 연산자 프로토콜을 가진 구문적 언어 기능의 지위로 격상시킵니다.

여러 면에서 이는 실제로 언어의 전반적인 개념적 복잡성을 줄여야 합니다. `bool(expr)`을 사용한 `truth checking`과 `operator.exists(expr)`을 사용한 `existence checking` 간에 현재 `truth checking`과 `expr is not None` (또는 피연산자 강제 변환 컨텍스트의 `expr is not NotImplemented`, 또는 수학 라이브러리의 다양한 `NaN` 확인 연산) 간에 매핑되는 것보다 훨씬 더 많은 기대가 올바르게 매핑될 것이기 때문입니다.

이 PEP에 의해 도입된 새로운 병렬 관계의 간단한 예시로 다음을 비교하십시오:
```python
all_are_true = all(map(bool, iterable))
at_least_one_is_true = any(map(bool, iterable))
all_exist = all(map(operator.exists, iterable))
at_least_one_exists = any(map(operator.exists, iterable))
```

## 디자인 논의 (Design Discussion)
### 존재 확인 표현식 체인의 미묘한 차이 (Subtleties in chaining existence checking expressions)
논리 연산자 체인에서 이미 존재하는 것과 유사하게, 존재 확인 표현식 체인에서도 미묘한 차이가 발생합니다. 체인 내의 표현식 중 하나의 오른쪽이 존재하지 않는 값을 반환하면 동작이 놀라울 수 있습니다.

결과적으로, `value = arg1 ?then f(arg1) ?else default()`는 `value = cond and expr1 or expr2`가 의심스러운 것과 본질적으로 동일한 이유로 의심스럽습니다. 전자는 `f(arg1)`이 `None`을 반환하면 `default()`를 평가하고, 후자는 `expr1`이 불리언 컨텍스트에서 `False`로 평가되면 `expr2`를 평가합니다.

### 조건부 표현식과의 모호한 상호 작용 (Ambiguous interaction with conditional expressions)
현재 작성된 제안에서 다음은 구문 오류입니다:
```python
value = f(arg) if arg ?else default
```
다음은 첫 번째 조건이 거짓이 아니라 존재하지 않는 경우 두 번째 조건을 확인하는 유효한 연산입니다:
```python
value = expr1 if cond1 ?else cond2 else expr2
```
위에 설명된 표현식 체인 문제는 첫 번째 연산이 다음와 동일해야 한다는 주장을 뒷받침합니다:
```python
value = f(arg) if operator.exists(arg) else default
```
이것은 두 번째 연산을 다음과 같이 더 명확하게 작성하도록 요구합니다:
```python
value = expr1 if (cond1 ?else cond2) else expr2
```
대안으로, 첫 번째 형태는 구문 오류로 남아 있을 수 있으며, 존재 확인 기호는 `if` 키워드에 붙여서 `truth check` 대신 `existence check`를 사용한다는 것을 나타낼 수 있습니다:
```python
value = expr1 if? cond else expr2
```

### 다른 진리 확인 컨텍스트에서의 존재 확인 (Existence checking in other truth-checking contexts)
`truth-checking` 프로토콜은 현재 다음과 같은 구문 구조에서 사용됩니다:
*   논리적 논리곱 (`and`-표현식)
*   논리적 논리합 (`or`-표현식)
*   조건부 표현식 (`if-else` 표현식)
*   `if` 문
*   `while` 루프
*   `comprehension` 및 `generator expression`의 `filter` 절

현재 PEP에서는 `and`와 `or`를 사용한 `truth-checking`에서 `existence-checking`으로 전환하는 것은 적절한 위치에 새로운 키워드인 `?then`과 `?else`를 대체하는 문제입니다.

다른 `truth-checking` 컨텍스트의 경우, `operator.exists` API를 가져와 사용하거나, `expr is not None` (또는 컨텍스트에 적합한 동등물)을 특별히 확인하는 현재 관용구를 계속 사용하는 것을 제안합니다.

이와 관련하여 가장 간단한 개선 사항은 제안된 `exists()` API를 `operator` 모듈 함수에서 새로운 내장 함수로 격상시키는 것입니다.

대안으로, `?` 존재 확인 기호는 `if` 및 `while` 키워드에 대한 수정자로 지원되어 `truth check` 대신 `existence check` 사용을 나타낼 수 있습니다.

그러나, 이러한 제안 중 어느 것이든 얻게 될 잠재적인 일관성 이점이 추가적인 혼란을 정당화할지는 전혀 명확하지 않으므로, 현재 제안에서 생략되었습니다.

### `__bool__`과 `__exists__` 간의 예상 불변 관계 정의 (Defining expected invariant relations between __bool__ and __exists__)
PEP는 현재 모든 기존 타입의 `__bool__` 정의를 수정하지 않고 두므로, 전체 제안이 역호환성을 유지하도록 보장하지만, 다음과 같은 경우 `bool(obj)`는 `True`를 반환하지만 제안된 `operator.exists(obj)`는 `False`를 반환합니다:
*   `float`, `complex`, `decimal.Decimal`의 `NaN` 값
*   `Ellipsis`
*   `NotImplemented`

이러한 것들을 잠재적으로 변경해야 한다는 주요 주장은, 존재 확인 컨텍스트에서 존재하지 않는다고 나타내는 값이 `truth checking` 컨텍스트에서도 `False`로 보고되어야 한다는 권장되는 불변 요소가 있다면 잠재적인 코드 동작을 추론하기가 더 쉬워진다는 것입니다.

이러한 불변 요소를 정의하지 못하면 `float("NaN") ?else 0.0`이 `0.0`을 반환하는 반면 `float("NaN") or 0.0`은 `NaN`을 반환하는 것과 같이 다소 이상한 결과가 발생할 수 있습니다.

## 제약 사항 (Limitations)
### 임의의 센티넬 객체 (Arbitrary sentinel objects)
이 제안은 `None`이 허용된 명시적 값인 "센티넬 객체(sentinel object)" 관용구에 대한 구문 지원을 제공하려 하지 않습니다. 이 경우 누락된 값을 나타내기 위해 별도의 센티넬 객체가 정의됩니다:
```python
_SENTINEL = object()
def f(obj=_SENTINEL):
    return obj if obj is not _SENTINEL else default_value()
```
이는 존재 프로토콜 정의를 정의하고 사용하는 데 있어 훨씬 더 복잡하게 만드는 대가로 잠재적으로 지원될 수 있습니다:
*   Python 계층에서는 `operator.exists` 및 `__exists__` 구현이 비존재를 나타내기 위해 빈 튜플을 반환하고, 그렇지 않으면 존재 확인의 결과로 사용될 객체에 대한 참조를 포함하는 단일 요소 튜플을 반환할 것입니다.
*   C 계층에서는 `tp_exists` 구현이 비존재를 나타내기 위해 `NULL`을 반환하고, 그렇지 않으면 존재 확인의 결과로 `PyObject *` 포인터를 반환할 것입니다.

이러한 변경을 통해 센티넬 객체 관용구는 다음과 같이 다시 작성될 수 있습니다:
```python
class Maybe:
    SENTINEL = object()
    def __init__(self, value):
        self._result = (value,) if value is not self.SENTINEL else ()
    def __exists__(self):
        return self._result
    def f(obj=Maybe.SENTINEL):
        return Maybe(obj) ?else default_value()
```
그러나, 제안된 3가지 표준 센티넬 값(즉, `None`, `Ellipsis`, `NotImplemented`)을 사용할 수 없는 경우가 추가 프로토콜 복잡성과 `__bool__`과 `__exists__` 간의 대칭 손실을 감수할 만큼 충분히 흔하지는 않을 것이라고 생각합니다.

## 명세 (Specification)
초록(Abstract)은 이미 제안의 요점을 제공하고, 근거(Rationale)는 몇 가지 특정 예시를 제공합니다. 기본 아이디어에 충분한 관심이 있다면, 전체 명세는 제안된 구문 설탕과 참조 구현 생성을 안내하기에 충분한 기본 조건부 표현식 간의 정확한 대응 관계를 제공해야 할 것입니다.

…TBD…

## 구현 (Implementation)
PEP 505와 마찬가지로, 실제 구현은 이러한 연산자를 추가하는 아이디어에 대한 원칙적인 관심이 있을 때까지 연기되었습니다. 구현은 이러한 제안의 어려운 부분이 아니며, 어려운 부분은 신규 및 기존 Python 사용자에게 장기적인 이점이 광범위한 생태계(다른 구현 개발자, 언어 교육 과정 개발자, 기타 Python 관련 교육 자료 저자 포함)가 변경에 적응하는 데 드는 단기적인 비용보다 더 큰 변경인지 여부를 결정하는 것입니다.

…TBD…

## 참고 자료 (References)
*   Wikipedia: Safe navigation operator (https://en.wikipedia.org/wiki/Safe_navigation_operator)
*   Wikipedia: Null coalescing operator (https://en.wikipedia.org/wiki/Null_coalescing_operator)
*   FileFormat.info: Unicode Character 'THERE EXISTS' (U+2203) (http://www.fileformat.info/info/unicode/char/2203/index.htm)
*   python-ideas discussion thread (https://mail.python.org/pipermail/python-ideas/2016-October/043415.html)
*   Steven D'Aprano's critique of the proposal (https://mail.python.org/pipermail/python-ideas/2016-October/043453.html)
*   Considering a link to the idea of overloadable Boolean operators (https://mail.python.org/pipermail/python-ideas/2016-October/043447.html)

## 저작권 (Copyright)
이 문서는 CC0 1.0 라이선스 조건에 따라 공개 도메인에 게시되었습니다: https://creativecommons.org/publicdomain/zero/1.0/

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.