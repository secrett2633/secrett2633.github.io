---
title: "[Final] PEP 495 - Local Time Disambiguation"
excerpt: "Python Enhancement Proposal 495: 'Local Time Disambiguation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/495/
toc: true
toc_sticky: true
date: 2025-09-26 22:40:14+0900
last_modified_at: 2025-09-26 22:40:14+0900
published: true
---
> **원문 링크:** [PEP 495 - Local Time Disambiguation](https://peps.python.org/pep-0495/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 02-Aug-2015

PEP 495: 로컬 시간 중의성 해소

## 초록 (Abstract)

이 PEP는 `datetime.time` 및 `datetime.datetime` 클래스의 인스턴스에 `fold`라는 새로운 속성을 추가하는 것을 제안합니다. 이 `fold` 속성은 로컬 시간이 동일하지만 실제 시점은 다른 두 시간을 구별하는 데 사용됩니다. `fold` 속성의 허용되는 값은 0과 1이며, 0은 중의적인 로컬 시간의 두 가지 가능한 해석 중 이른 시점에 해당하고, 1은 늦은 시점에 해당합니다.

## 도입 배경 (Rationale)

대부분의 지역에서는 로컬 시계가 뒤로 이동하는 시기가 존재했습니다. 이러한 시기에는 로컬 시계가 같은 날 두 번 같은 시간을 표시하는 구간이 발생합니다. 이러한 상황에서는 로컬 시계에 표시되는 정보(또는 Python `datetime` 인스턴스에 저장된 정보)만으로는 특정 시점을 식별하기에 불충분합니다. 제안된 해결책은 `datetime` 인스턴스에 0과 1의 값을 가지는 속성을 추가하여 두 가지 중의적인 시간을 열거하는 것입니다.

일광 절약 시간 (DST)을 준수하는 지역에서는 보통 가을에 시계를 한 시간 뒤로 되돌립니다. 드물지만 다른 이유로 시계가 뒤로 이동하는 경우도 있습니다. 예를 들어, 우크라이나는 1990년 3월의 봄철 시간 전환을 건너뛰고 대신 1990년 7월 1일에 시계를 뒤로 옮겨 모스크바 시간에서 동유럽 시간으로 변경했습니다. 이 경우 전환 전후 모두 표준(겨울) 시간이 적용되었습니다. DST 및 표준 시간 변경 모두 한 시간 외의 시간 이동을 초래할 수 있습니다.

## 용어 (Terminology)

시계가 뒤로 이동할 때, 우리는 시간 안에 "폴드(fold)"가 생성된다고 말합니다. 시계가 앞으로 이동할 때, "갭(gap)"이 생성됩니다. 폴드 안에 있는 로컬 시간을 "중의적(ambiguous)"이라고 부르며, 갭 안에 있는 로컬 시간을 "누락(missing)"이라고 부릅니다.

## 제안 (Proposal)

### `fold` 속성 (The “fold” attribute)

`datetime.time` 및 `datetime.datetime` 클래스의 인스턴스에 `fold`라는 속성을 추가할 것을 제안합니다. 이 속성은 중의적인 경우의 두 번째(시간 순서상 늦은) 시점을 나타내는 인스턴스를 제외한 모든 인스턴스에 대해 0의 값을 가져야 합니다. 해당 인스턴스의 경우 값은 1이 됩니다.

### 영향을 받는 API (Affected APIs)

#### 속성 (Attributes)

`datetime.time` 및 `datetime.datetime` 클래스의 인스턴스는 두 가지 가능한 값(0과 1)을 갖는 새로운 `fold` 속성을 갖게 됩니다.

#### 생성자 (Constructors)

`datetime.time` 및 `datetime.datetime` 클래스의 `__new__` 메서드는 기본값 0을 갖는 `fold`라는 새로운 키워드 전용 인자(keyword-only argument)를 갖게 됩니다. `fold` 인수의 값은 반환된 인스턴스의 `fold` 속성 값을 초기화하는 데 사용됩니다.

#### 메서드 (Methods)

`datetime.time` 및 `datetime.datetime` 클래스의 `replace()` 메서드는 `fold`라는 새로운 키워드 전용 인자를 갖게 됩니다. 이 인자는 다른 `replace()` 인자와 유사하게 동작합니다. `fold` 인자가 지정되고 0 또는 1의 값이 주어지면, `replace()`에 의해 반환된 새 인스턴스는 해당 값으로 `fold` 속성이 설정됩니다.

#### C-API

`PyDateTime_DateTime` 및 `PyDateTime_Time` 객체에서 `fold` 값을 추출하기 위한 접근 매크로가 정의됩니다.

- `int PyDateTime_DATE_GET_FOLD(PyDateTime_DateTime *o)`: `fold` 값을 C `int`로 반환합니다.
- `int PyDateTime_TIME_GET_FOLD(PyDateTime_Time *o)`: `fold` 값을 C `int`로 반환합니다.

생성된 인스턴스의 `fold` 값을 지정하기 위한 추가 인자를 받는 새로운 생성자가 정의됩니다.

- `PyObject* PyDateTime_FromDateAndTimeAndFold(int year, int month, int day, int hour, int minute, int second, int usecond, int fold)`: 지정된 연, 월, 일, 시, 분, 초, 마이크로초 및 `fold`를 가진 `datetime.datetime` 객체를 반환합니다.
- `PyObject* PyTime_FromTimeAndFold(int hour, int minute, int second, int usecond, int fold)`: 지정된 시, 분, 초, 마이크로초 및 `fold`를 가진 `datetime.time` 객체를 반환합니다.

### 영향을 받는 동작 (Affected Behaviors)

#### 지금 몇 시인가요? (What time is it?)

인수 없이 호출된 `datetime.now()` 메서드는 시스템 로컬 시간 폴드에서 두 가지 중의적인 시간 중 두 번째 시간을 반환할 때 `fold=1`로 설정합니다. `tzinfo` 인수를 사용하여 호출될 경우, `fold` 값은 `tzinfo.fromutc()` 구현에 의해 결정됩니다. `datetime.timezone` 클래스 인스턴스(예: `datetime.timezone.utc`)가 `tzinfo`로 전달되면 반환된 `datetime` 인스턴스는 항상 `fold=0`을 갖습니다. `datetime.utcnow()` 메서드는 영향을 받지 않습니다.

#### naive 시간에서 aware 시간으로의 변환 (Conversion from naive to aware)

naive `datetime` 인스턴스를 aware `datetime`으로 변환하는 것을 용이하게 하기 위한 새로운 기능이 제안됩니다.

`astimezone()` 메서드는 이제 naive `self`에 대해 작동합니다. 이 경우 시스템 로컬 시간대가 가정되며, `fold` 플래그는 중의적인 경우 어떤 로컬 시간대가 적용되는지 결정하는 데 사용됩니다.

예를 들어, US/Eastern 시간대로 설정된 시스템에서:

```python
>>> dt = datetime(2014, 11, 2, 1, 30)
>>> dt.astimezone().strftime('%D %T %Z%z')
'11/02/14 01:30:00 EDT-0400'
>>> dt.replace(fold=1).astimezone().strftime('%D %T %Z%z')
'11/02/14 01:30:00 EST-0500'
```

이는 `datetime.now(tz)`가 `datetime.now().astimezone(tz)`와 완전히 동등하다는 것을 의미합니다 (단, `tz`는 PEP 이후의 `tzinfo` 구현 인스턴스, 즉 `fold`를 올바르게 처리하고 설정하는 인스턴스여야 합니다).

#### Epoch 이후 POSIX 초에서 변환 (Conversion from POSIX seconds from EPOCH)

`datetime.datetime`의 정적 메서드 `fromtimestamp()`는 반환되는 객체에서 `fold` 속성을 적절하게 설정합니다.

예를 들어, US/Eastern 시간대로 설정된 시스템에서:

```python
>>> datetime.fromtimestamp(1414906200)
datetime.datetime(2014, 11, 2, 1, 30)
>>> datetime.fromtimestamp(1414906200 + 3600)
datetime.datetime(2014, 11, 2, 1, 30, fold=1)
```

#### Epoch 이후 POSIX 초로 변환 (Conversion to POSIX seconds from EPOCH)

`datetime.datetime`의 `timestamp()` 메서드는 `fold` 속성 값만 다른 `datetime.datetime` 인스턴스가 중의적이거나 누락된 시간을 나타내는 경우에만 다른 값을 반환합니다.

`datetime.datetime` 인스턴스 `dt`가 중의적인 시간을 나타낼 때, `s0`과 `s1`이라는 두 가지 값이 존재합니다.

`datetime.fromtimestamp(s0) == datetime.fromtimestamp(s1) == dt`

이 경우 `dt.timestamp()`는 `dt.fold == 0`이면 `s0`과 `s1` 중 작은 값을 반환하고, 그렇지 않으면 큰 값을 반환합니다.

예를 들어, US/Eastern 시간대로 설정된 시스템에서:

```python
>>> datetime(2014, 11, 2, 1, 30, fold=0).timestamp()
1414906200.0
>>> datetime(2014, 11, 2, 1, 30, fold=1).timestamp()
1414909800.0
```

`datetime.datetime` 인스턴스 `dt`가 누락된 시간을 나타낼 때, `datetime.fromtimestamp(s) == dt`를 만족하는 `s` 값은 없습니다. 하지만 갭의 크기(초)만큼 다른 두 개의 "알아두면 좋은" `s` 값을 형성할 수 있습니다.

누락된 `dt`에 대해 `dt.timestamp()`가 반환하는 값은 `dt.fold == 0`이면 두 "알아두면 좋은" 값 중 큰 값을 반환하고, 그렇지 않으면 작은 값을 반환합니다. (이는 오타가 아니며, 중의적인 시간 규칙과 의도적으로 반대입니다.)

예를 들어, US/Eastern 시간대로 설정된 시스템에서:

```python
>>> datetime(2015, 3, 8, 2, 30, fold=0).timestamp()
1425799800.0
>>> datetime(2015, 3, 8, 2, 30, fold=1).timestamp()
1425796200.0
```

#### Aware datetime 인스턴스 (Aware datetime instances)

PEP 이전의 `tzinfo` 구현을 사용하는 사용자들은 aware `datetime` 인스턴스의 동작에서 어떤 변화도 보지 못할 것입니다. `fold` 속성 값만 다른 두 인스턴스는 `fold` 값에 대한 명시적인 접근 외에는 어떤 방법으로도 구별할 수 없습니다. (이는 PEP 이전 구현이 `fold` 속성을 사용하지 않기 때문입니다.)

반면에 객체의 `tzinfo`가 `fold`-aware 구현으로 설정되면, 폴드 또는 갭에서 `fold` 값은 `utcoffset()`, `dst()`, `tzname()`, `astimezone()`, `strftime()` (형식 지정에 "%Z" 또는 "%z" 지시어가 사용된 경우), `isoformat()`, `timetuple()` 등 여러 메서드의 결과에 영향을 미칩니다.

#### 날짜와 시간 결합 및 분리 (Combining and splitting date and time)

`datetime.datetime.combine()` 메서드는 `fold` 속성 값을 결과 `datetime.datetime` 인스턴스로 복사합니다.
`datetime.datetime.time()` 메서드는 `fold` 속성 값을 결과 `datetime.time` 인스턴스로 복사합니다.

#### Pickles

`fold` 속성의 값은 프로토콜 버전 4 (Python 3.4에서 도입) 이상으로 생성된 pickle에만 저장됩니다.
`datetime.datetime` 및 `datetime.time` 객체의 pickle 크기는 변경되지 않습니다. `fold` 값은 `datetime.datetime` pickle 페이로드의 3번째 바이트의 첫 번째 비트와 `datetime.time` 페이로드의 첫 번째 바이트의 첫 번째 비트에 인코딩됩니다. 현재 구현에서 이 바이트들은 월(1-12)과 시간(0-23) 값을 저장하는 데 사용되며, 첫 번째 비트는 항상 0입니다.

### 표준 라이브러리의 `tzinfo` 구현 (Implementations of tzinfo in the Standard Library)

이 PEP에서는 `datetime.tzinfo` 추상 클래스의 새로운 구현을 제안하지 않습니다. 기존의 (고정 오프셋) 시간대(timezone)는 중의적인 로컬 시간을 도입하지 않으며, `utcoffset()` 구현은 `fold` 값에 관계없이 현재와 동일한 상수 값을 반환할 것입니다.

추상 `datetime.tzinfo` 클래스의 `fromutc()` 기본 구현은 변경되지 않습니다. 현재 stdlib의 유일한 `tzinfo` 구현(`datetime.timezone` 클래스)이 `fromutc()`를 오버라이드하기 때문에 어디에도 사용되지 않습니다. 기본 구현을 변경하지 않으면 기본 `fromutc()`를 상속하는 PEP 이전의 서드 파티 구현이 의도치 않게 영향을 받지 않는다는 이점이 있습니다.

### 새로운 `tzinfo` 구현을 위한 가이드라인 (Guidelines for New tzinfo Implementations)

가변 UTC 오프셋(DST 및 기타 원인으로 인한)을 지원하려는 구체적인 `datetime.tzinfo` 서브클래스 구현자는 다음 가이드라인을 따라야 합니다.

#### 무지는 축복이다 (Ignorance is Bliss)

`utcoffset()`, `tzname()`, `dst()` 메서드의 새로운 구현은 중의적이거나 누락된 시간에 대해 호출되지 않는 한 `fold` 값을 무시해야 합니다.

#### 폴드 안에서 (In the Fold)

새로운 서브클래스는 기본 클래스의 `fromutc()` 메서드를 오버라이드하고, 두 개의 다른 UTC 시간 `u0`과 `u1`(`u0 < u1`)이 동일한 로컬 시간 `t`에 해당하는 모든 경우에 `fromutc(u0)`는 `fold=0`인 인스턴스를 반환하고, `fromutc(u1)`는 `fold=1`인 인스턴스를 반환하도록 구현해야 합니다. 다른 모든 경우에는 반환된 인스턴스는 `fold=0`을 가져야 합니다.

`utcoffset()`, `tzname()`, `dst()` 메서드는 `fold` 속성 값을 사용하여 중의적인 시간 `t`가 전환 전 또는 후의 시간에 해당하는지 여부를 결정해야 합니다. 정의에 따라 `utcoffset()`은 폴드를 생성하는 모든 전환 전에는 크고 전환 후에는 작습니다. `tzname()` 및 `dst()`가 반환하는 값은 전환 유형에 따라 `fold` 속성 값에 의존할 수도 있고 의존하지 않을 수도 있습니다.

#### 갭을 조심하세요 (Mind the Gap)

`fromutc()` 메서드는 갭 내의 시간을 생성해서는 안 됩니다.

`utcoffset()`, `tzname()`, `dst()` 메서드가 갭에 속하는 로컬 시간에 대해 호출되면, `fold=0`인 경우 전환 전 규칙이 사용되어야 합니다. 그렇지 않으면 전환 후 규칙이 사용되어야 합니다.

#### 전환 시 규칙 요약 (Summary of Rules at a Transition)

중의적이거나 누락된 시간에 `utcoffset()`은 다음 표에 따라 값을 반환해야 합니다.

| | `fold=0` | `fold=1` |
|---|---|---|
| **Fold** | `oldoff` | `newoff = oldoff - delta` |
| **Gap** | `oldoff` | `newoff = oldoff + delta` |

여기서 `oldoff` (`newoff`)는 전환 전 (후) UTC 오프셋이고 `delta`는 폴드 또는 갭의 절대 크기입니다.

#### DST 전환 (The DST Transitions)

DST 시작 시 도입된 누락된 시간에서 `utcoffset()` 및 `dst()` 메서드가 반환하는 값은 다음과 같아야 합니다.

| | `fold=0` | `fold=1` |
|---|---|---|
| `utcoffset()` | `stdoff` | `stdoff + dstoff` |
| `dst()` | `zero` | `dstoff` |

DST 종료 시 도입된 중의적인 시간에서 `utcoffset()` 및 `dst()` 메서드가 반환하는 값은 다음과 같아야 합니다.

| | `fold=0` | `fold=1` |
|---|---|---|
| `utcoffset()` | `stdoff + dstoff` | `stdoff` |
| `dst()` | `dstoff` | `zero` |

여기서 `stdoff`는 표준 (비-DST) 오프셋이고, `dstoff`는 DST 보정(`timedelta(hours=1)`이 일반적)이며, `zero = timedelta(0)`입니다.

### 시간 산술 및 비교 연산자 (Temporal Arithmetic and Comparison Operators)

`fold` 속성의 값은 naive `datetime` 인스턴스를 사용하는 모든 연산에서 무시됩니다. 결과적으로 `fold` 값만 다른 naive `datetime.datetime` 또는 `datetime.time` 인스턴스는 같다고 비교됩니다. 이러한 인스턴스를 구별해야 하는 애플리케이션은 `fold` 값을 명시적으로 확인하거나 해당 인스턴스를 중의적인 시간이 없는 시간대(예: UTC)로 변환해야 합니다.

`timedelta`가 aware 또는 naive `datetime` 인스턴스에 추가되거나 빼지는 경우에도 `fold` 값은 무시됩니다. `timedelta`를 `datetime`에 추가(또는 뺄셈)한 결과는 원래 `datetime` 인스턴스가 `fold=1`이었더라도 항상 `fold`가 0으로 설정됩니다.

`datetime` 인스턴스 `t`와 `s`에 대한 차이 `t - s`가 계산되는 방식에는 변경이 제안되지 않습니다.

Naive 및 intra-zone 비교는 `fold` 값을 무시하고 현재와 동일한 결과를 반환합니다. (이는 하위 호환성을 유지하는 유일한 방법입니다. `fold`를 사용하는 aware intra-zone 비교가 필요하면 먼저 양쪽을 UTC로 변환해야 합니다.)

Inter-zone 뺄셈은 현재와 같이 정의됩니다: `t - s`는 `(t - t.utcoffset()) - (s - s.utcoffset()).replace(tzinfo=t.tzinfo)`로 계산되지만, `t.tzinfo` 또는 `s.tzinfo` 중 하나가 PEP 이후 구현인 경우 결과는 `t.fold` 및 `s.fold`의 값에 따라 달라집니다.

#### Aware datetime 등가 비교 (Aware datetime Equality Comparison)

aware `datetime` 비교 연산자는 현재와 동일하게 작동하며, 피연산자 중 하나의 `utcoffset()` 값이 `fold`에 의존할 때 결과는 간접적으로 `fold` 값의 영향을 받습니다. 단, 한 가지 예외가 있습니다. inter-zone 비교에서 하나 또는 둘 다의 피연산자가 `utcoffset()`이 `fold` 속성의 `fold` 값에 의존하는 경우, 결과는 `False`입니다.

### 하위 및 상위 호환성 (Backward and Forward Compatibility)

이 제안은 `fold` 플래그를 명시적으로 읽거나 이를 사용하는 `tzinfo` 구현을 사용하지 않는 프로그램에는 거의 영향을 미치지 않습니다. 이러한 프로그램에 대한 유일하게 눈에 띄는 변경 사항은 POSIX 타임스탬프와 상호 변환이 이제 올바르게 왕복한다는 것입니다 (부동 소수점 반올림 오차 내에서). 이전의 잘못된 동작에 대한 해결책을 구현한 프로그램은 수정해야 할 수도 있습니다.

오래된 프로그램으로 생성된 pickle은 완전히 상위 호환성을 유지합니다. 새로운 버전에서 `fold=1`로 pickle된 `datetime`/`time` 인스턴스만 이전 Python 버전에서는 읽을 수 없게 됩니다. `fold=0` (기본값) 인스턴스의 pickle은 변경되지 않습니다.

### 질문과 답변 (Questions and Answers)

#### 왜 새 플래그를 "isdst"라고 부르지 않나요? (Why not call the new flag “isdst”?)

**비기술적 답변 (A non-technical answer)**

`isdst`라는 이름은 Daylight Saving Time (DST)과 관련되어 혼란을 줄 수 있습니다. `fold`는 DST뿐만 아니라 시계가 뒤로 이동하는 모든 상황을 포괄하는 더 일반적인 개념입니다.

**기술적 이유 (A technical reason)**

`time.struct_time` 객체의 `tm_isdst` 필드는 폴드에서 로컬 시간을 중의적으로 해소하는 데 사용될 수 있지만, 그러한 중의성 해소의 의미론은 이 PEP의 제안과 완전히 다릅니다.
`tm_isdst` 필드의 주요 문제는 시간대에 대한 자세한 정보(이는 `tzinfo` 구현에서만 사용 가능)를 알지 못하면 `tm_isdst`에 적절한 값을 알 수 없다는 것입니다.
`tm_isdst`와 달리 제안된 `fold` 속성은 해당 속성 없이 두 가지 (또는 없음) 해석이 가능하지 않는 한 `datetime` 인스턴스의 해석에 영향을 미치지 않습니다.

`tm_isdst`와 동일한 의미론을 갖지 않는 `isdst`라는 이름을 사용하는 것은 매우 혼란스러울 것이기 때문에 다른 이름이 필요합니다. 또한 `datetime.datetime` 클래스에는 이미 `dst()`라는 메서드가 있으며, `fold`를 "isdst"라고 부르면 "isdst"가 0인데 `dst()`는 0이 아니거나 그 반대인 상황이 필연적으로 발생할 것입니다.

#### 왜 "fold"인가요? (Why “fold”?)

Guido van Rossum이 제안했으며, 한 저자가 선호했습니다. 속성의 허용되는 값이 `False`/`True`에서 `0`/`1`로 변경된 후 합의가 이루어졌습니다. "fold"라는 명사는 올바른 함의를 가지며 기억하기 쉬운 규칙을 제공하지만, 동시에 근거 없는 가정을 유도하지 않습니다.

#### "first"는 무엇인가요? (What is “first”?)

이는 초기에는 명백한 대안("second")이 기존 속성과 충돌하기 때문에 선택된 속성의 작업 이름이었습니다. 주로 `True`를 기본값으로 만들 것이라는 이유로 거부되었습니다.

#### 두 가지 값으로 충분한가요? (Are two values enough?)

`fold` 속성에 `None` 또는 `-1` 값을 허용해야 한다는 몇 가지 이유가 제기되었습니다: 하위 호환성, `tm_isdst`와의 유사성, 그리고 무효 시간(invalid time)에 대한 엄격한 확인.

**하위 호환성 (Backward Compatibility)**

`fold` 플래그의 기본값이 `None`이면 PEP 이전 동작을 요청하는 신호가 될 수 있어 하위 호환성을 개선할 수 있다는 제안이 있었습니다. 아래 분석을 기반으로 `fold=0` 기본값으로 제안된 변경 사항이 충분히 하위 호환성을 갖는다고 판단합니다.

이 PEP는 프로그램이 달리 동일한 `datetime` 인스턴스가 다른 `fold` 값을 갖는다는 것을 발견할 수 있는 세 가지 방법을 제공합니다: (1) `fold` 속성의 명시적 확인; (2) 인스턴스가 naive인 경우 - `astimezone()` 메서드를 사용하여 다른 시간대로 변환; 그리고 (3) `timestamp()` 메서드를 사용하여 float으로 변환.

**`tm_isdst`와의 유사성 (Analogy with tm_isdst)**

`time.mktime` 인터페이스는 `tm_isdst` 플래그에 대해 `-1, 0, 1` 세 가지 값을 허용합니다. 위에서 설명했듯이, `-1` (주어진 시간에 대해 DST가 적용되는지 여부를 `mktime`이 나머지 필드에서 결정하도록 요청)이 실제로 유용한 유일한 선택입니다.

그러나 `fold` 플래그를 사용하면 `datetime.timestamp()`는 대부분의 DST 전환 시간대에서 99.98%의 시간 동안 `tm_isdst=-1`을 사용한 `mktime`과 동일한 값을 반환합니다. 게다가 `tm_isdst=-1`과 같은 동작은 `fold` 값에 관계없이 지정됩니다.

**엄격한 무효 시간 확인 (Strict Invalid Time Checking)**

또 다른 제안은 `fold=-1` 또는 `fold=None`을 사용하여 프로그램이 폴드와 갭을 처리할 수 있는 수단이 없음을 나타내고, `dt`가 중의적이거나 누락된 로컬 시간을 나타낼 때마다 `dt.utcoffset()`이 오류를 발생시키도록 하는 것이었습니다.

이 제안의 주요 문제는 `dt.utcoffset()`이 오류를 발생시키는 것이 옵션이 아닌 상황에서 내부적으로 사용된다는 것입니다. 예를 들어, 딕셔너리 조회 또는 목록/세트 멤버십 확인 등입니다. 따라서 엄격한 갭/폴드 확인 동작은 별도의 플래그(`dt.utcoffset(raise_on_gap=True, raise_on_fold=False)`)로 제어되어야 합니다. 그러나 이 기능은 사용자 코드에서 쉽게 구현할 수 있습니다.

## 구현 (Implementation)

Github fork: [https://github.com/abalkin/cpython/tree/issue24773-s3](https://github.com/abalkin/cpython/tree/issue24773-s3)
Tracker issue: [http://bugs.python.org/issue24773](http://bugs.python.org/issue24773)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.