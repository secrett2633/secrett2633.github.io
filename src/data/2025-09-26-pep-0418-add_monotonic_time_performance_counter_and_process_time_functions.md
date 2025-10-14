---
title: "[Final] PEP 418 - Add monotonic time, performance counter, and process time functions"
excerpt: "Python Enhancement Proposal 418: 'Add monotonic time, performance counter, and process time functions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/418/
toc: true
toc_sticky: true
date: 2025-09-26 21:35:49+0900
last_modified_at: 2025-09-26 21:35:49+0900
published: true
---
> **원문 링크:** [PEP 418 - Add monotonic time, performance counter, and process time functions](https://peps.python.org/pep-0418/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Mar-2012

## PEP 418 – 단조 증가 시간, 성능 카운터 및 프로세스 시간 함수 추가

### 요약 (Abstract)

이 PEP는 Python 3.3에 `time.get_clock_info(name)`, `time.monotonic()`, `time.perf_counter()`, `time.process_time()` 함수를 추가할 것을 제안합니다.

### 배경 (Rationale)

시스템 시간이 수동으로 변경되거나 NTP에 의해 자동으로 조정될 때, 시스템 시간을 사용하여 이벤트를 예약하거나 타임아웃을 구현하는 프로그램은 이벤트를 제때 실행하지 못하거나 타임아웃이 너무 일찍 또는 너무 늦게 종료될 수 있습니다. 이러한 시스템 시간 업데이트에 영향을 받지 않으려면 `time.monotonic()`과 같은 단조 증가(monotonic) 클록을 사용해야 합니다.

함수의 성능을 측정하기 위해 `time.clock()`을 사용할 수 있지만, 이는 Windows와 Unix에서 매우 다르게 작동합니다. Windows에서는 `time.clock()`이 sleep 시간을 포함하는 반면, Unix에서는 그렇지 않습니다. 또한, `time.clock()`의 해상도(resolution)는 Windows에서 매우 좋지만 Unix에서는 매우 좋지 않습니다. 대신 새로운 `time.perf_counter()` 함수는 항상 가장 정밀한 성능 카운터를 제공하며, `sleep` 시간 동안 경과된 시간을 포함하는 등 휴대 가능한(portable) 동작을 보장합니다.

지금까지 Python은 CPU 시간을 측정하는 직접적인 휴대 가능한 함수를 제공하지 않았습니다. Unix에서는 `time.clock()`을 사용할 수 있지만 해상도가 좋지 않습니다. `resource.getrusage()` 또는 `os.times()`도 Unix에서 사용할 수 있지만, 커널 공간과 사용자 공간에서 소비된 시간을 합산해야 합니다. 새로운 `time.process_time()` 함수는 항상 CPU 시간(sleep 시간 제외)을 측정하고 사용 가능한 최고의 해상도를 가지는 휴대 가능한 카운터 역할을 합니다.

각 운영 체제는 클록과 성능 카운터를 다르게 구현하므로, 어떤 함수가 사용되는지, 그리고 해상도와 같은 클록의 속성을 정확히 아는 것이 유용합니다. 새로운 `time.get_clock_info()` 함수는 각 Python 시간 함수에 대한 사용 가능한 모든 정보에 접근할 수 있도록 합니다.

**새로운 함수들의 활용:**
*   `time.monotonic()`: 타임아웃 및 스케줄링에 사용되며, 시스템 클록 업데이트에 영향을 받지 않습니다.
*   `time.perf_counter()`: 벤치마킹에 사용되며, 짧은 기간 동안 가장 정밀한 클록입니다.
*   `time.process_time()`: 프로파일링에 사용되며, 프로세스의 CPU 시간을 측정합니다.

**새로운 함수를 사용할 모듈:**
*   `time.monotonic()`: `concurrent.futures`, `multiprocessing`, `queue`, `subprocess`, `telnet`, `threading` 모듈에서 타임아웃 구현에 사용됩니다.
*   `time.perf_counter()`: `trace` 및 `timeit` 모듈, `pybench` 프로그램에 사용됩니다.
*   `time.process_time()`: `profile` 모듈에 사용됩니다.
*   `time.get_clock_info()`: `pybench` 프로그램에서 타이머의 해상도와 같은 정보를 표시하는 데 사용됩니다.

`time.clock()` 함수는 운영 체제에 따라 다르게 작동하므로 휴대성이 떨어져 폐기됩니다. 대신 요구 사항에 따라 `time.perf_counter()` 또는 `time.process_time()`을 사용해야 합니다. `time.clock()`은 폐기 예정으로 표시되었지만 제거 계획은 없습니다.

**제한 사항:**
*   새로운 함수 문서에서는 시스템 일시 중단(suspend) 후 클록의 동작이 정의되지 않습니다. 동작은 운영 체제에 따라 다릅니다.
*   `time.monotonic()` 및 `time.perf_counter()`는 조정될 수도 있고 조정되지 않을 수도 있습니다. `time.get_clock_info('monotonic')['adjustable']`을 사용하여 단조 증가 클록이 조정 가능한지 확인할 수 있습니다.
*   이 PEP는 `time.thread_time()` 함수를 제안하지 않습니다. 이는 Python 표준 라이브러리에서 필요하지 않으며 일반적으로 요구되는 기능이 아니기 때문입니다.

### Python 함수 (Python functions)

#### 새로운 함수 (New Functions)

##### `time.get_clock_info(name)`

지정된 클록에 대한 정보를 가져옵니다. 지원되는 클록 이름은 다음과 같습니다.
*   `"clock"`: `time.clock()`
*   `"monotonic"`: `time.monotonic()`
*   `"perf_counter"`: `time.perf_counter()`
*   `"process_time"`: `time.process_time()`
*   `"time"`: `time.time()`

다음 속성을 가진 `time.clock_info` 객체를 반환합니다.
*   `implementation` (str): 기본 운영 체제 함수의 이름입니다. 예: `"QueryPerformanceCounter()"`, `"clock_gettime(CLOCK_REALTIME)"`.
*   `monotonic` (bool): 클록이 뒤로 돌아가지 않으면 `True`입니다.
*   `adjustable` (bool): 클록이 자동으로(예: NTP 데몬에 의해) 또는 시스템 관리자에 의해 수동으로 변경될 수 있으면 `True`이고, 그렇지 않으면 `False`입니다.
*   `resolution` (float): 클록의 해상도(초 단위)입니다.

##### `time.monotonic()`

단조 증가 클록(monotonic clock), 즉 뒤로 돌아가지 않습니다. 시스템 클록 업데이트에 영향을 받지 않습니다. 반환 값의 기준점은 정의되지 않으므로, 연속적인 호출 결과 간의 차이만 유효하며 초 단위로 표시됩니다.

Vista 이전 버전의 Windows에서는 `time.monotonic()`이 `GetTickCount()` 정수 오버플로(32비트, 49.7일 후 롤오버)를 감지합니다. 이 오버플로가 감지될 때마다 내부 에포크(epoch)를 2^32씩 증가시킵니다. 에포크는 프로세스 로컬 상태에 저장되므로, 49일 이상 실행되는 두 Python 프로세스에서 `time.monotonic()`의 값이 다를 수 있습니다. 최신 버전의 Windows 및 다른 운영 체제에서는 `time.monotonic()`이 시스템 전체에 적용됩니다.

이용 가능성: Windows, Mac OS X, Linux, FreeBSD, OpenBSD, Solaris. GNU/Hurd에서는 사용할 수 없습니다.

##### `time.perf_counter()`

짧은 기간을 측정하기 위한 가장 높은 해상도를 가진 성능 카운터입니다. `sleep` 시간 동안 경과된 시간을 포함하며 시스템 전체에 적용됩니다. 반환 값의 기준점은 정의되지 않으므로, 연속적인 호출 결과 간의 차이만 유효하며 초 단위로 표시됩니다.

모든 플랫폼에서 사용할 수 있습니다.

##### `time.process_time()`

현재 프로세스의 시스템 및 사용자 CPU 시간의 합계입니다. `sleep` 시간 동안 경과된 시간은 포함하지 않습니다. 정의상 프로세스 전체에 적용됩니다. 반환 값의 기준점은 정의되지 않으므로, 연속적인 호출 결과 간의 차이만 유효합니다.

모든 플랫폼에서 사용할 수 있습니다.

#### 기존 함수 (Existing Functions)

##### `time.time()`

일반적으로 현지 시간(civil time)인 시스템 시간입니다. 정의상 시스템 전체에 적용됩니다. 시스템 관리자에 의해 수동으로 설정되거나 NTP 데몬에 의해 자동으로 조정될 수 있습니다.

모든 플랫폼에서 사용할 수 있으며 실패할 수 없습니다.

##### `time.sleep()`

주어진 초 동안 실행을 일시 중단합니다. 실제 일시 중단 시간은 요청된 시간보다 짧을 수 있는데, 이는 포착된 모든 시그널이 해당 시그널 처리 루틴의 실행 후 `time.sleep()`을 종료하기 때문입니다. 또한, 시스템 내 다른 활동의 스케줄링으로 인해 요청된 시간보다 임의의 양만큼 길어질 수 있습니다.

#### 폐기된 함수 (Deprecated Function)

##### `time.clock()`

Unix에서는 현재 프로세서 시간을 초 단위의 부동 소수점 숫자로 반환합니다. 정의상 프로세스 전체에 적용됩니다. 해상도와 "프로세서 시간"의 의미에 대한 정의는 같은 이름의 C 함수에 따라 다르지만, 어쨌든 Python 벤치마킹이나 알고리즘 시간 측정에 사용되는 함수입니다.

Windows에서는 이 함수가 `QueryPerformanceCounter()` Win32 함수를 기반으로 하여 이 함수에 대한 첫 번째 호출 이후 경과된 벽 시계 시간(wall-clock seconds)을 부동 소수점 숫자로 반환합니다. 해상도는 일반적으로 1마이크로초보다 좋습니다. 시스템 전체에 적용됩니다.

### 대안: API 설계 (Alternatives: API design)

이 섹션에서는 제안된 API 설계에 대한 다양한 대안과 논의를 다룹니다.

#### `time.monotonic()`의 다른 이름

`time.monotonic()`에 대해 `time.counter()`, `time.metronomic()`, `time.seconds()`, `time.steady()`, `time.timeout_clock()`, `time.wallclock()` 등의 이름이 제안되었습니다. `time.steady()`는 모호하며, `time.wallclock()`은 시스템 시간(벽 시계)과 다르므로 적절하지 않다는 의견이 있었습니다.

#### `time.perf_counter()`의 다른 이름

`time.perf_counter()`에 대해 `time.high_precision()`, `time.highres()`, `time.hires()`, `time.performance_counter()`, `time.timer()` 등의 이름이 제안되었습니다.

#### 운영 체제 클록만 노출 (Only expose operating system clocks)

고수준 클록을 정의하는 어려운 작업 없이, 단순히 운영 체제 클록만 노출하는 더 간단한 접근 방식이 제안되었습니다. `time.clock_gettime()` 및 관련 클록 식별자가 Python 3.3에 이미 추가되었습니다.

#### `time.monotonic()`: 시스템 시간으로 폴백 (Fallback to system time)

단조 증가 클록을 사용할 수 없는 경우 `time.monotonic()`이 시스템 시간으로 폴백하는 대안이 논의되었습니다.

**문제점:**
*   이러한 함수를 문서에 정확하게 정의하기 어렵습니다. 단조 증가인가? 안정적인가? 조정되는가?
*   일부 사용자는 단조 증가 클록을 사용할 수 없을 때 어떻게 해야 할지(다른 클록 사용, 오류 표시 등) 직접 결정하고 싶어 합니다.

이러한 함수를 정의하기 위해 다양한 API가 제안되었습니다.

##### 플래그가 있는 단일 함수: `time.monotonic(fallback=True)`

`time.monotonic(fallback=True)`는 단조 증가 클록을 사용할 수 없거나 클록이 실패하면 시스템 시간으로 폴백합니다. `time.monotonic(fallback=False)`는 단조 증가 클록이 실패하면 `OSError`를 발생시키고, 시스템이 단조 증가 클록을 제공하지 않으면 `NotImplementedError`를 발생시킵니다. 호출자에서 상수로 전달되는 키워드 인수는 일반적으로 좋지 않은 API 설계입니다. 또한, 함수에 대해 `NotImplementedError`를 발생시키는 것은 Python에서 흔치 않으며 피해야 합니다.

##### 플래그가 없는 단일 `time.monotonic()` 함수

`time.monotonic()`이 `(time: float, is_monotonic: bool)`을 반환하는 대안이 있습니다. 또는 함수 속성을 사용하여 `time.monotonic.is_monotonic`을 사용할 수 있습니다. 이 속성 값은 `time.monotonic()`의 첫 번째 호출 전에는 `None`일 것입니다.

#### 제약 조건 목록에서 클록 선택 (Choosing the clock from a list of constraints)

제안된 PEP는 몇 가지 새로운 클록을 제공하지만, 다양한 플랫폼에서 유용한 클록을 제공하기 위해 의도적으로 보증이 느슨합니다. 이는 본질적으로 호출에 정책을 내장하므로 호출자는 정책을 선택해야 합니다.

"클록 선택" 접근 방식은 필요한 경우 대부분의 플랫폼 클록을 사용할 수 있도록 하고 호출자가 그 중에서 선택하도록 하여 호출자가 자체 정책을 구현할 수 있도록 하는 추가 API를 제안합니다. PEP에서 제안된 클록은 일반적인 간단한 사용 사례에 계속 사용할 수 있을 것으로 예상됩니다.

이를 위해 두 가지 기능이 필요합니다: 클록 열거와 사용자가 적합성을 평가할 수 있도록 클록에 대한 메타데이터입니다.

기본 인터페이스는 간단한 선택을 쉽게 하는 함수입니다: 호출자는 `time.get_clock(*flags)`를 플래그 조합과 함께 사용할 수 있습니다. 여기에는 다음이 포함됩니다:
*   `time.MONOTONIC`: 클록이 뒤로 돌아가지 않습니다.
*   `time.STEADY`: 클록 속도가 일정합니다.
*   `time.ADJUSTED`: 클록이 NTP 등에 의해 조정될 수 있습니다.
*   `time.HIGHRES`: 가장 높은 해상도를 가진 클록입니다.

이 함수는 현재 시간을 반환하는 `.now()` 메서드를 가진 클록 객체를 반환합니다. 클록 객체는 클록 기능 세트를 설명하는 메타데이터로 주석이 달립니다. `.flags` 필드에는 요청된 모든 플래그가 포함됩니다.

`time.get_clock()`은 일치하는 클록을 찾지 못하면 `None`을 반환하므로 `or` 연산자를 사용하여 호출을 연결할 수 있습니다. 예시:

```python
T = get_clock(MONOTONIC) or get_clock(STEADY) or get_clock()
t = T.now()
```

사용 가능한 클록에는 항상 `time.time()`에 대한 래퍼가 포함되므로, 플래그 없이 마지막 호출을 사용하여 작동하는 클록을 항상 얻을 수 있습니다.

시스템 클록의 플래그 예시:
*   `QueryPerformanceCounter`: `MONOTONIC | HIGHRES`
*   `GetTickCount`: `MONOTONIC | STEADY`
*   `CLOCK_MONOTONIC`: `MONOTONIC | STEADY` (또는 Linux에서는 `MONOTONIC`만)
*   `CLOCK_MONOTONIC_RAW`: `MONOTONIC | STEADY`
*   `gettimeofday()`: (플래그 없음)

클록 객체에는 위에 나열된 것 외에 추가 기능 플래그가 있는 클록 플래그, 기본 OS 기능의 이름, 클록 정밀도(precision)를 포함한 다른 메타데이터가 포함됩니다.

`time.get_clock()`은 여전히 단일 클록을 선택합니다. 열거 기능도 필요합니다. 가장 분명한 방법은 `time.get_clock()`과 동일한 시그니처를 가진 `time.get_clocks()`를 제공하지만, 요청된 플래그와 일치하는 모든 클록의 시퀀스를 반환하는 것입니다. 플래그 없이 요청하면 사용 가능한 모든 클록을 열거하여 호출자가 메타데이터를 기반으로 임의로 선택할 수 있습니다.

#### 운영 체제 버그 우회 (Working around operating system bugs?)

Python은 클록 값과 이전 값으로 최대값을 계산하여 단조 증가 클록이 실제로 단조 증가하도록 보장해야 할까요?

정적 변수를 사용하여 마지막 반환 값을 캐시하는 것이 비교적 간단하므로, 반환되는 값이 실제로 단조 증가하도록 보장하는 데 이를 사용하는 것이 흥미로울 수 있습니다.

가상 머신은 덜 신뢰할 수 있는 클록을 제공합니다. `QueryPerformanceCounter()`는 알려진 버그가 있습니다.

Python은 특정 알려진 운영 체제 버그만 우회할 수 있습니다. 예를 들어, `KB274323`에는 버그를 우회하는 코드 예시가 포함되어 있습니다.

비단조성(non-monotonicities) "교정"의 문제점:
*   클록이 실수로 한 시간 앞으로 설정되었다가 다시 되돌려지면 한 시간 동안 유용한 클록을 가질 수 없습니다.
*   캐시는 프로세스 간에 공유되지 않으므로 다른 프로세스는 동일한 클록 값을 볼 수 없습니다.

### 용어집 (Glossary)

*   **Accuracy (정확도):** 주어진 기기로 측정한 값이 실제 값에서 벗어나는 정도.
*   **Adjusted (조정됨):** 클록을 올바른 시간으로 재설정하는 것.
*   **Civil Time (현지 시간):** 하루의 시간; 시스템 외부에 있습니다.
*   **Clock (클록):** 시간을 측정하는 도구.
*   **Counter (카운터):** 특정 이벤트가 발생할 때마다 증가하는 클록.
*   **CPU Time (CPU 시간):** 특정 작업에 소요된 CPU 노력의 양.
*   **Drift (편차):** 시스템 외부에서 정의된 "실제" 시간과의 누적 오차.
*   **Epoch (에포크):** 클록의 기준점.
*   **Latency (지연 시간):** 지연.
*   **Monotonic (단조 증가):** 클록이 뒤로 돌아가지 않고 앞으로만 움직이는 특성.
*   **Precision (정밀도):** 단일 기기로 동일한 물리적 값을 측정했을 때 측정값 간의 편차.
*   **Process Time (프로세스 시간):** 프로세스 시작 이후 경과된 시간.
*   **Real Time (실시간):** 현실 세계의 시간.
*   **Resolution (해상도):** 주어진 기기로 서로 다른 측정을 야기하는 두 물리적 값 사이의 가장 작은 차이.
*   **Slew (슬루):** 클록 속도의 약간의 변화로, 일반적으로 외부 권한에 대한 편차를 수정하기 위한 것입니다.
*   **Stability (안정성):** 정확도의 지속성.
*   **Steady (안정적인):** 높은 안정성과 비교적 높은 정확도 및 정밀도를 가진 클록.
*   **Step (스텝):** 표시된 시간의 즉각적인 변경.
*   **System Time (시스템 시간):** 운영 체제가 나타내는 시간.
*   **Thread Time (스레드 시간):** 스레드 시작 이후 경과된 시간.
*   **Wallclock (벽 시계):** 벽에 걸린 시계가 나타내는 시간.

### 하드웨어 클록 (Hardware clocks)

*   **HPET (High Precision Event Timer):** 10 MHz 이상의 주파수로 카운트하는 64비트 업-카운터로 구성됩니다. 하루에 약 3초의 드리프트(drift)를 유발할 수 있습니다.
*   **TSC (Time Stamp Counter):** 프로세서 클록 주기에 따라 증가하지만, 이제는 일반적으로 주파수가 일정합니다. 다중 코어는 다른 TSC 값을 가집니다.
*   **ACPI Power Management Timer:** 3.5 MHz 주파수의 24비트 타이머.
*   **Cyclone:** IBM EXA 칩셋의 32비트 카운터.
*   **PIT (programmable interrupt timer):** Intel 8253/8254 칩셋의 16비트 카운터.
*   **RTC (Real-time clock):** 대부분의 RTC는 32,768 Hz 주파수의 크리스털 오실레이터를 사용합니다.

이 섹션에는 Linux `clocksource`, FreeBSD `timecounter`에 대한 자세한 정보와 다양한 하드웨어 클록의 성능 비교표가 포함되어 있습니다.

### NTP 조정 (NTP adjustment)

NTP는 클록을 조정하는 다양한 방법을 가지고 있습니다.
*   **"slewing" (슬루잉):** 클록 주파수를 약간 더 빠르거나 느리게 변경합니다 (`adjtime()`으로 수행).
*   **"stepping" (스테핑):** 단일 이산적인 단계로 크게 점프합니다 (`settimeofday()`로 수행).

기본적으로 오프셋이 128ms 미만이면 슬루잉이 적용되고, 그렇지 않으면 스테핑이 적용됩니다. 슬루잉은 "실제" 시간을 측정하려는 경우 일반적으로 바람직합니다.

### 운영 체제 시간 함수 (Operating system time functions)

#### 단조 증가 클록 (Monotonic Clocks)

`mach_absolute_time`, `CLOCK_MONOTONIC`, `CLOCK_MONOTONIC_RAW`, `CLOCK_BOOTTIME`, Windows의 `QueryPerformanceCounter`, `GetTickCount()`, `timeGetTime()`, Solaris의 `CLOCK_HIGHRES`, `gethrtime()` 등 다양한 운영 체제별 단조 증가 클록에 대한 설명과 해상도, 조정 가능 여부, sleep/suspend 포함 여부 등의 특성이 표로 제시됩니다.

#### 시스템 시간 (System Time)

`CLOCK_REALTIME`, `CLOCK_REALTIME_COARSE`, `GetSystemTimeAsFileTime`, `gettimeofday()`, `ftime()`, `time()` 등 시스템 시간을 제공하는 함수들의 특성과 해상도가 표로 제시됩니다.

#### 프로세스 시간 (Process Time)

`GetProcessTimes()`, `CLOCK_PROCESS_CPUTIME_ID`, `getrusage(RUSAGE_SELF)`, `times()`, `clock()` 등 프로세스 시간을 제공하는 함수들의 특성과 해상도가 표로 제시됩니다.

#### 스레드 시간 (Thread Time)

`CLOCK_THREAD_CPUTIME_ID`, `GetThreadTimes()` 등 스레드 시간을 제공하는 함수들의 특성과 해상도가 표로 제시됩니다.

#### Windows: `QueryUnbiasedInterruptTime`

바이어스된 인터럽트 시간과 현재 슬립 바이어스 양으로부터 현재 언바이어스된 인터럽트 시간을 가져옵니다. 이 시간은 전원 관리 슬립 전환에 영향을 받지 않습니다. `QueryUnbiasedInterruptTime()` 함수로 검색된 경과 시간은 시스템이 작동 상태에서 보내는 시간만 포함합니다. `QueryUnbiasedInterruptTime()`은 단조 증가하지 않습니다. Windows 7에서 도입되었습니다.

### Sleep

주어진 초 동안 프로세스 실행을 일시 중단합니다. `sleep`은 시스템 시간 업데이트에 영향을 받지 않습니다. 시스템 일시 중단(suspend) 동안 `sleep`은 일시 정지됩니다. 예를 들어, 프로세스가 60초 동안 `sleep`하고 시스템이 `sleep` 중간에 30초 동안 일시 중단되면, 실제 시간에서 `sleep` 기간은 90초가 됩니다.

`sleep`은 시그널에 의해 중단될 수 있습니다. 이 경우 함수는 `EINTR`과 함께 실패합니다.

`nanosleep()`, `clock_nanosleep()`, `usleep()`, `delay()`, `sleep()` 등 다양한 `sleep` 관련 함수의 C 해상도가 표로 제시됩니다.

### 시스템 대기 (System Standby)

ACPI 전원 상태 "S3"은 "Suspend to RAM"이라고도 불리는 시스템 대기 모드입니다. RAM은 전원이 공급됩니다.

Windows에서는 `WM_POWERBROADCAST` 메시지가 Windows 애플리케이션에 전원 관리 이벤트(예: 소유자 상태 변경)를 알리기 위해 전송됩니다. Mac OS X의 경우, `Registering and unregistering for sleep and wake notifications` (Technical Q&A QA1340)를 참조하십시오.

### 승인 (Acceptance)

이 PEP는 Guido van Rossum에 의해 2012년 4월 28일에 승인되었습니다. PEP 구현은 이후 저장소에 커밋되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.