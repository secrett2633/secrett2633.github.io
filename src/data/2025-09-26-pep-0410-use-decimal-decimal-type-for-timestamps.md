---
title: "[Rejected] PEP 410 - Use decimal.Decimal type for timestamps"
excerpt: "Python Enhancement Proposal 410: 'Use decimal.Decimal type for timestamps'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/410/
toc: true
toc_sticky: true
date: 2025-09-26 21:31:14+0900
last_modified_at: 2025-09-26 21:31:14+0900
published: true
---
> **원문 링크:** [PEP 410 - Use decimal.Decimal type for timestamps](https://peps.python.org/pep-0410/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 01-Feb-2012


# PEP 410 – 타임스탬프에 `decimal.Decimal` 타입 사용

*   **작성자:** Victor Stinner
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2012년 2월 1일
*   **Python 버전:** 3.3
*   **해결:** Python-Dev 메일링 리스트 메시지

## 거부 고지 (Rejection Notice)

이 PEP는 거부되었습니다. 자세한 내용은 Python-Dev 메일링 리스트 아카이브를 참조하십시오.

## 요약 (Abstract)

이 PEP는 나노초(nanosecond) 해상도를 사용하는 새로운 함수를 정밀도 손실 없이 지원하기 위해, 고해상도 타임스탬프의 공식 타입으로 `Decimal`을 사용하도록 제안했습니다.

## 배경 (Rationale)

Python 2.3에서는 서브-초(sub-second) 해상도를 지원하기 위해 `float` 타임스탬프를 도입했습니다. Python 2.5부터 `os.stat()`은 기본적으로 `float` 타임스탬프를 사용했습니다. Python 3.3에서는 나노초 해상도를 지원하는 다음 함수들이 도입되었습니다:

*   `os` 모듈: `futimens()`, `utimensat()`
*   `time` 모듈: `clock_gettime()`, `clock_getres()`, `monotonic()`, `wallclock()`

그러나 `os.stat()`은 나노초 타임스탬프를 읽지만, 여전히 결과를 `float`으로 반환합니다.

Python의 `float` 타입은 IEEE 754 표준의 `binary64` 형식을 사용합니다. 1나노초(10⁻⁹) 해상도에서는 `float` 타임스탬프가 2²⁴초(약 194일, 에포크 타임스탬프 기준 1970년 7월 14일)보다 큰 값에서 정밀도를 잃습니다.

나노초 해상도는 나노초 타임스탬프를 지원하는 파일 시스템(예: ext4, btrfs, NTFS 등)에서 정확한 수정 시간을 설정하는 데 필수적입니다. 또한 파일 수정 시간을 비교하여 한 파일이 다른 파일보다 최신인지 확인하는 데 도움이 됩니다. 활용 사례로는 `shutil.copystat()`을 사용하여 파일의 수정 시간을 복사하거나, `tarfile` 모듈로 TAR 아카이브를 생성하거나, `mailbox` 모듈로 메일함을 관리하는 등이 있습니다.

더 나은 해상도가 필요할 때마다 API를 변경할 필요가 없도록, 고정된 해상도(예: 나노초)보다는 임의의 해상도가 선호됩니다. 예를 들어, NTP 프로토콜은 2³²초의 분수(약 2.3 × 10⁻¹⁰초)를 사용하며, NTP 프로토콜 버전 4는 2⁶⁴초의 분수(5.4 × 10⁻²⁰초)를 사용합니다.

**참고:**
*   1마이크로초(10⁻⁶) 해상도에서는 `float` 타임스탬프가 2³³초(약 272년, 에포크 타임스탬프 기준 2242년 3월 16일)보다 큰 값에서 정밀도를 잃습니다.
*   100나노초(10⁻⁷, Windows에서 사용되는 해상도) 해상도에서는 `float` 타임스탬프가 2²⁹초(약 17년, 에포크 타임스탬프 기준 1987년 1월 5일)보다 큰 값에서 정밀도를 잃습니다.

## 제안 내용 (Specification)

타임스탬프의 새로운 타입으로 `decimal.Decimal`을 추가하는 것을 제안했습니다. `Decimal`은 모든 타임스탬프 해상도를 지원하고, 산술 연산이 가능하며, 비교할 수 있습니다. 정밀도 손실이 있을 수 있지만, `Decimal`을 `float`으로 변환하는 것도 가능합니다. 클럭 해상도 또한 `Decimal` 객체에 저장할 수 있습니다.

다음 함수들에 선택적 타임스탬프 인수를 추가하는 것을 제안했습니다:

*   `os` 모듈: `fstat()`, `fstatat()`, `lstat()`, `stat()` (`stat` 구조체의 `st_atime`, `st_ctime`, `st_mtime` 필드), `sched_rr_get_interval()`, `times()`, `wait3()`, `wait4()`
*   `resource` 모듈: `getrusage()`의 `ru_utime`, `ru_stime` 필드
*   `signal` 모듈: `getitimer()`, `setitimer()`
*   `time` 모듈: `clock()`, `clock_gettime()`, `clock_getres()`, `monotonic()`, `time()`, `wallclock()`

타임스탬프 인수의 값은 `float` 또는 `Decimal`이 될 수 있으며, 하위 호환성을 위해 `float`이 계속 기본값이 됩니다. 다음 함수들은 `Decimal`을 입력으로 지원합니다:

*   `datetime` 모듈: `date.fromtimestamp()`, `datetime.fromtimestamp()`, `datetime.utcfromtimestamp()`
*   `os` 모듈: `futimes()`, `futimesat()`, `lutimes()`, `utime()`
*   `select` 모듈: `epoll.poll()`, `kqueue.control()`, `select()`
*   `signal` 모듈: `setitimer()`, `sigtimedwait()`
*   `time` 모듈: `ctime()`, `gmtime()`, `localtime()`, `sleep()`

`os.stat_float_times()` 함수는 `int()`를 사용한 명시적 캐스팅으로 대체되도록 Deprecated (더 이상 사용되지 않음) 처리됩니다.

**참고:**
`decimal` 모듈은 Python으로 구현되어 `float`보다 느리지만, CPython에 포함될 준비가 거의 완료된 새로운 C 구현이 있습니다.

## 하위 호환성 (Backwards Compatibility)

기본 타임스탬프 타입(`float`)은 변경되지 않으므로, 하위 호환성이나 성능에 영향을 미치지 않습니다. 새로운 타임스탬프 타입인 `decimal.Decimal`은 명시적으로 요청될 때만 반환됩니다.

## 반대 의견: 클럭 정확도 (Objection: clocks accuracy)

컴퓨터 클럭과 운영 체제는 부정확하며 실제로 나노초 정확도를 제공하지 못합니다. 나노초는 몇 개의 CPU 명령을 실행하는 데 걸리는 시간입니다. 실시간 운영 체제에서도 나노초 단위의 정확한 측정은 상위 애플리케이션에 의해 처리되기 시작할 때 이미 구식이 될 수 있습니다. CPU의 단일 캐시 미스만으로도 정밀도는 무의미해질 것입니다.

**참고:**
Linux는 실제로 나노초 정밀도로 시간을 측정할 수 있지만, 클럭을 UTC에 나노초 정확도로 동기화할 수는 없습니다.

## 대안: 타임스탬프 타입 (Alternatives: Timestamp types)

임의 또는 나노초 해상도의 타임스탬프를 지원하기 위해 다음과 같은 타입들이 고려되었습니다:

*   `decimal.Decimal`
*   나노초 단위의 정수
*   128비트 `float`
*   `datetime.datetime`
*   `datetime.timedelta`
*   정수 튜플
*   `timespec` 구조체

**기준:**

*   타임스탬프에 대한 산술 연산이 가능해야 합니다.
*   타임스탬프는 비교할 수 있어야 합니다.
*   임의의 해상도, 또는 최소한 정밀도 손실 없는 1나노초 해상도를 가져야 합니다.
*   하위 호환성을 위해 새로운 타임스탬프를 `float`으로 강제 변환할 수 있어야 합니다.

현재 모든 C 함수를 지원하기에는 1나노초 해상도로 충분합니다. 운영 체제가 사용하는 최고의 해상도는 1나노초입니다. 실제로 대부분의 클럭 정확도는 나노초보다는 마이크로초에 가깝습니다. 따라서 1나노초의 고정 해상도를 사용하는 것이 합리적으로 보입니다.

### 나노초 단위의 정수 (`int`)

나노초 해상도는 모든 현재 C 함수에 충분하므로, 타임스탬프를 `float`이 아닌 단순히 나노초 단위의 정수로 표현할 수 있습니다.

그러나 나노초 단위의 정수 형식은 객체 타입만으로는 나노초와 초 단위를 구분할 수 없으므로, 이 형식을 위한 새로운 특수 함수를 추가해야 한다는 이유로 거부되었습니다.

### 128비트 `float`

새로운 IEEE 754-2008 쿼드-정밀도 바이너리 `float` 타입을 추가하는 방안입니다. 이 128비트 `float`은 GCC (4.3), Clang, ICC 컴파일러에서 지원됩니다.

그러나 Python은 이식성이 중요하므로 일부 플랫폼에서만 사용할 수 있는 타입에 의존할 수 없습니다. 예를 들어, Visual C++ 2008은 128비트 `float`을 지원하지 않으며, 이는 공식 Windows 실행 파일을 빌드하는 데 사용됩니다. 또한 GCC는 128비트 `float`에 MPFR 라이브러리를 사용하는데, 이 라이브러리는 GNU LGPL 라이선스로 배포되어 Python 라이선스와 호환되지 않는 라이선스 문제입니다.

**참고:**
Intel CPU의 x87 부동 소수점 장치는 80비트 `float`을 지원하지만, 이제 x86_64에서 선호되는 SSE 명령어 세트에서는 지원되지 않습니다. 다른 CPU 벤더는 80비트 `float`을 지원하지 않습니다.

### `datetime.datetime`

`datetime.datetime` 타입은 타임스탬프를 포함하고 있다는 것이 명확하므로 자연스러운 선택입니다. 이는 절대 타임스탬프이며 잘 정의되어 있습니다. 년, 월, 일, 시, 분, 초에 직접 접근할 수 있으며, 타임스탬프를 문자열로 포맷하는 등의 시간 관련 메서드를 제공합니다.

주요 문제는 `os.stat()`, `time.time()`, `time.clock_gettime(time.CLOCK_GETTIME)`를 제외한 모든 시간 함수가 시작 시점이 지정되지 않고 시간대 정보가 없어 `datetime.datetime`으로 변환될 수 없다는 것입니다. 또한, `datetime.datetime`은 시간대 문제도 있습니다. 예를 들어, 시간대 정보가 없는(`unaware`) `datetime` 객체와 시간대 정보가 있는(`aware`) `datetime` 객체는 비교할 수 없습니다. 일광 절약 시간(DST)이 일반 시간으로 전환될 때 중복되는 시간에서 순서 문제도 발생합니다.

`os.times()` 또는 `time.clock()`과 같이 시작 시점이 지정되지 않은 함수에 사용할 수 없기 때문에 `datetime.datetime`은 거부되었습니다.

**참고:**
`datetime.datetime`은 현재 마이크로초 해상도만 지원하지만, 나노초를 지원하도록 확장될 수 있습니다.

### `datetime.timedelta`

`datetime.timedelta`는 상대 타임스탬프에 대한 자연스러운 선택입니다. 시작 시점을 알 때 `datetime.datetime`과 함께 사용하여 절대 타임스탬프를 얻을 수 있습니다.

그러나 `datetime.timedelta`는 `float`으로 강제 변환될 수 없고 고정된 해상도를 가지기 때문에 거부되었습니다. 하나의 새로운 표준 타임스탬프 타입으로 충분하며, `Decimal`이 `datetime.timedelta`보다 선호됩니다. `datetime.timedelta`를 `float`으로 변환하려면 `datetime.timedelta.total_seconds()` 메서드를 명시적으로 호출해야 합니다.

**참고:**
`datetime.timedelta`는 현재 마이크로초 해상도만 지원하지만, 나노초를 지원하도록 확장될 수 있습니다.

### 정수 튜플 (Tuple of integers)

C 함수를 Python에 노출하기 위해, C 언어가 정수 필드를 가진 구조체(예: `timeval`, `timespec` 구조체)를 사용하므로 정수 튜플이 타임스탬프를 저장하는 자연스러운 선택입니다. 정수만 사용하면 정밀도 손실을 피할 수 있습니다(Python은 임의 길이의 정수를 지원합니다). 정수 튜플을 생성하고 파싱하는 것은 간단하고 빠릅니다.

그러나 정수 튜플은 산술 연산을 지원하지 않아 거부되었습니다.

### `timespec` 구조체 (timespec structure)

`timespec`은 나노초 해상도로 타임스탬프를 저장하는 데 사용되는 C 구조체입니다. Python은 동일한 구조를 가진 타입(`(seconds, nanoseconds)`)을 사용할 수 있습니다. 편의상 `timespec`에 대한 산술 연산이 지원됩니다.

`timespec` 타입은 나노초 해상도만 지원하고 각 산술 연산을 구현해야 하는 반면, `Decimal` 타입은 이미 구현되어 있고 잘 테스트되었다는 이유로 거부되었습니다.

## 대안: API 디자인 (Alternatives: API design)

### 반환 타입을 지정하는 문자열 인자 추가 (Add a string argument to specify the return type)

타임스탬프를 반환하는 함수에 문자열 인자를 추가하는 방안입니다(예: `time.time(format="datetime")`). 문자열은 타입보다 확장성이 뛰어나며, 정수 튜플처럼 타입이 없는 형식도 요청할 수 있습니다.

그러나 이 API는 객체를 인스턴스화하기 위해 암시적으로 모듈을 임포트해야 했고(예: `datetime.datetime`을 생성하기 위해 `datetime` 임포트), 모듈 임포트는 예외를 발생시키거나 느릴 수 있으며, 이러한 동작은 예상치 못하고 놀랍다는 이유로 거부되었습니다.

### 타임스탬프 타입을 변경하는 전역 플래그 추가 (Add a global flag to change the timestamp type)

`os.stat_float_times()`와 유사하게 `os.stat_decimal_times()`와 같은 전역 플래그를 추가하여 타임스탬프 타입을 전역적으로 설정하는 방안입니다.

전역 플래그는 `Decimal` 대신 `float`을 기대하는 라이브러리 및 애플리케이션에 문제를 일으킬 수 있습니다. `Decimal`은 `float`과 완전히 호환되지 않습니다. 예를 들어, `float + Decimal`은 `TypeError`를 발생시킵니다. `os.stat_float_times()`의 경우는 `int`가 `float`으로 강제 변환될 수 있고 `int + float`이 `float`을 반환하므로 다릅니다.

### 타임스탬프를 생성하는 프로토콜 추가 (Add a protocol to create a timestamp)

타임스탬프가 생성되는 방식을 하드 코딩하는 대신, 분수에서 타임스탬프를 생성하는 새로운 프로토콜을 추가하는 방안입니다.

예를 들어, `time.time(timestamp=type)`은 `type.__fromfraction__(numerator, denominator)` 클래스 메서드를 호출하여 지정된 타입의 타임스탬프 객체를 생성합니다. 타입이 프로토콜을 지원하지 않으면 `type(numerator) / type(denominator)`와 같은 폴백(fallback)이 사용됩니다.

요구 사항에 비해 과도하다는 이유로 프로토콜 제안은 거부되었지만, 설득력 있는 사용 사례가 발견되면 나중에 도입할 수 있도록 특정 구문(`time.time(timestamp=type)`)은 허용되었습니다.

### `os.stat`에 새 필드 추가 (Add new fields to os.stat)

나노초 해상도로 파일의 생성, 수정, 접근 시간을 얻기 위해 `os.stat()` 구조체에 세 개의 필드를 추가하는 방안입니다.

이 새로운 필드는 나노초 해상도의 타임스탬프(예: `Decimal`)이거나 각 타임스탬프의 나노초 부분(`int`)일 수 있습니다.

그러나 `os.stat()` 구조체에 새 필드를 추가하는 것은 다른 모듈(예: `time` 모듈)의 나노초 문제를 해결하지 못한다는 점 때문에 거부되었습니다.

### 불리언 인자 추가 (Add a boolean argument)

하나의 새로운 타입(`Decimal`)만 필요하므로, 간단한 불리언 플래그를 추가하는 방안입니다. 예: `time.time(decimal=True)` 또는 `time.time(hires=True)`.

이러한 플래그는 숨겨진 임포트를 필요로 하는데, 이는 좋지 않은 관행으로 간주됩니다.

불리언 인자 API는 "파이썬적"이지 않다는 이유로 거부되었습니다. 불리언 매개변수(플래그)보다는 매개변수 값으로 반환 타입을 변경하는 것이 선호됩니다.

### 새 함수 추가 (Add new functions)

각 타입에 대해 새로운 함수를 추가하는 방안입니다. 예: `time.clock_decimal()`, `time.time_decimal()`, `os.stat_decimal()`, `os.stat_timespec()` 등.

타임스탬프를 생성하는 각 함수마다 새로운 함수를 추가하는 것은 많은 코드를 중복시키고 유지 관리가 어렵다는 이유로 거부되었습니다.

### 새 `hires` 모듈 추가 (Add a new hires module)

`time` 모듈과 동일한 API를 가지지만, `decimal.Decimal`과 같은 고해상도 타임스탬프를 반환하는 "hires"라는 새 모듈을 추가하는 방안입니다. 새 모듈을 추가하면 `time`이나 `os`와 같은 저수준 모듈을 `decimal` 모듈에 연결하는 것을 피할 수 있습니다.

이 아이디어는 `time` 모듈의 대부분 코드를 중복해야 하고 유지 관리가 어렵다는 점, 그리고 타임스탬프가 `time` 모듈 외의 다른 모듈(예: `signal.sigtimedwait()`, `select.select()`, `resource.getrusage()`, `os.stat()` 등)에서도 사용된다는 이유로 거부되었습니다. 각 모듈의 코드를 중복하는 것은 허용될 수 없습니다.

## 링크 (Links)

관련 이슈 및 토론:

*   Issue #7652: `decimal`의 C 버전을 py3k에 병합 (`cdecimal`)
*   Issue #11457: `os.stat()`: 나노초 해상도의 `Decimal` 객체로 타임스탬프를 얻기 위한 새 필드 추가
*   Issue #13882: PEP 410: 타임스탬프에 `decimal.Decimal` 타입 사용
*   [Python-Dev] `decimal.Decimal` 객체로 타임스탬프 저장

다른 언어의 고해상도 타임스탬프 지원:

*   **Ruby (1.9.3):** `Time` 클래스가 피코초(10⁻¹²)를 지원
*   **.NET framework:** `DateTime` 타입: 0001년 1월 1일 자정 12:00:00 이후 경과된 100나노초 간격의 수. `DateTime.Ticks`는 부호 있는 64비트 정수 사용.
*   **Java (1.5):** `System.nanoTime()`: 지정되지 않은 시작 시점을 가진 나노초 단위의 벽 시계(wallclock), 부호 있는 64비트 정수(`long`) 사용.
*   **Perl:** `Time::Hiref` 모듈: `float`을 사용하므로 Python의 `float` 타임스탬프와 동일하게 나노초 해상도에서 정밀도 손실 문제가 있음.

---
이 PEP는 `decimal.Decimal`을 사용하여 고정밀 타임스탬프를 도입하려는 시도였으나, 여러 대안과 반대 의견, 그리고 복잡성으로 인해 최종적으로 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.