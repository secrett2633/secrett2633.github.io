---
title: "[Final] PEP 564 - Add new time functions with nanosecond resolution"
excerpt: "Python Enhancement Proposal 564: 'Add new time functions with nanosecond resolution'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/564/
toc: true
toc_sticky: true
date: 2025-09-26 23:48:58+0900
last_modified_at: 2025-09-26 23:48:58+0900
published: true
---
> **원문 링크:** [PEP 564 - Add new time functions with nanosecond resolution](https://peps.python.org/pep-0564/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Oct-2017



Here's the translated and summarized content of PEP 564, adhering to the specified guidelines.

---

# PEP 564: 나노초 해상도를 지원하는 새로운 시간 함수 추가

## 개요
PEP 564는 Python의 `time` 모듈에 나노초(nanosecond) 해상도를 제공하는 여섯 가지 새로운 함수를 추가할 것을 제안합니다. 이 함수들은 기존 함수들에 `_ns` 접미사를 붙인 형태(예: `time.time_ns()`, `time.monotonic_ns()`)로, 결과를 Python `int` 타입의 나노초 단위로 반환합니다. 이로써 기존 `float` 타입이 가질 수 있는 정밀도 손실 문제를 해결하고, 현대 시스템의 향상된 클록 해상도를 활용할 수 있게 됩니다.

## 도입 배경 (Rationale)

### float 타입의 104일 한계
데스크톱 및 노트북 컴퓨터의 클록 해상도는 나노초 수준에 가까워지고 있습니다. 하지만 Python의 `time.time()` 함수는 시간을 IEEE 754 64비트 부동 소수점(float) 숫자로 반환하며, 이 `float` 타입은 약 104일이 지나면 나노초 단위의 정밀도를 잃기 시작합니다. 이는 UNIX Epoch(1970년 1월 1일) 이후 104일이 지나면 `time.time()`이 나노초 정밀도를 잃는다는 의미입니다.

**정밀도 손실 예시:**
- 서버가 104일 이상 장기 실행될 경우, 성능 측정 시 `float` 타입의 한계로 인해 미묘한 시간 차이가 손실될 수 있습니다.
- 나노초 해상도로 기록된 타임스탬프를 더 낮은 해상도(예: 초 단위)의 시스템 클록과 비교할 때, 시간이 미래로 인식되는 등의 문제가 발생할 수 있습니다.
- 현대 데이터베이스와 파일 시스템은 나노초 해상도 시간 저장을 지원하고 있으며, Python 또한 이에 대한 지원이 필요합니다.

### 이전 PEP (PEP 410)의 기각
5년 전, PEP 410은 `decimal.Decimal` 타입을 사용하여 나노초 해상도를 지원하도록 모든 시간 반환 함수를 변경하는 것을 제안했지만 기각되었습니다. 주된 이유는 다음과 같습니다.
- 결과 타입을 변경하는 선택적 매개변수 추가 방식이 Python에서 일반적이지 않고 좋지 않은 프로그래밍 방식이라고 판단되었습니다.
- 하드웨어 클록이 정말로 1 나노초 해상도를 가졌는지, 또는 Python 레벨에서 그 의미가 명확하지 않았습니다.
- `decimal.Decimal` 타입은 Python에서 흔하지 않아 코드 적응이 필요했습니다.

### CPython의 최근 5년간 개선 사항 및 기존 나노초 API
PEP 410이 기각된 이후, CPython은 나노초 단위 시간 처리를 위한 개선이 있었습니다.
- `os.stat_result` 구조체에 `st_atime_ns`, `st_ctime_ns`, `st_mtime_ns` 필드가 나노초(`int`)로 추가되었습니다.
- PEP 418이 수락되어 Python 3.3에 `time.monotonic()`, `time.perf_counter()`, `time.process_time()` 같은 새로운 클록이 추가되었습니다.
- CPython의 내부 `pytime` C API는 64비트 정수(`_PyTime_t`)를 사용하여 1 나노초 단위로 시간을 처리합니다.

이러한 기존 API들은 이미 나노초 단위의 `int`를 사용하고 있으므로, 새로운 함수들도 `int` 타입을 사용하는 것이 일관성이 있습니다.

## 변경 사항 (Changes)

### 새로운 함수 (New functions)
`time` 모듈에 다음과 같은 6가지 새로운 함수가 추가됩니다.

- `time.clock_gettime_ns(clock_id)`
- `time.clock_settime_ns(clock_id, time: int)`
- `time.monotonic_ns()`
- `time.perf_counter_ns()`
- `time.process_time_ns()`
- `time.time_ns()`

이 함수들은 기존 `_ns` 접미사가 없는 버전과 유사하지만, 나노초 단위의 `int` 값을 반환합니다. 예를 들어, `time.monotonic_ns()`는 `int(time.monotonic() * 1e9)`와 유사한 값을 반환합니다. 이 함수들은 `time.time()`처럼 UNIX epoch를 기준으로 하는 "큰" 타임스탬프를 반환할 수 있으므로, `float` 반환 시 발생할 수 있는 나노초 정밀도 손실을 방지합니다.

### 변경되지 않는 함수 (Unchanged functions)
Python 3.3에서 `time.clock()` 함수가 Deprecated(사용 중단)되었으므로 `time.clock_ns()`는 추가되지 않습니다.
다른 시간 반환 함수들은 내부 해상도가 1 마이크로초(us) 이상이거나 최대값이 `float` 정밀도 손실을 일으키지 않을 만큼 작기 때문에 나노초 변형이 제안되지 않았습니다 (예: `os` 모듈의 `sched_rr_get_interval()`, `time.clock_getres()` 등).

## 대안 및 논의 (Alternatives and discussion)

### 서브-나노초(Sub-nanosecond) 해상도
`time.time_ns()` API는 이론적으로 미래에 더 미세한 클록 해상도가 필요해질 경우 완전하게 "미래 지향적"이지 않을 수 있습니다. 그러나 현재 대부분의 운영 체제 함수가 반환하는 모든 구조체에서 1 나노초 해상도로 충분합니다. CPU TSC 클록과 같이 1 나노초보다 더 나은 해상도(예: 0.3 ns)를 가진 하드웨어 클록이 존재하지만, 이러한 희귀한 사용 사례를 위해 Python 표준 라이브러리를 서브-나노초 해상도까지 지원하도록 설계하는 것은 정당화되지 않습니다. CPython 구현에서는 `int64_t` 타입을 사용하여 나노초 정밀도 타임스탬프를 저장하는 것이 편리하며, 이는 약 -292년에서 +292년까지의 시간 범위를 지원합니다.

### `time.time()` 결과 타입 변경
`time.time()` 함수가 더 나은 정밀도를 가진 다른 숫자 타입을 반환하도록 변경하는 아이디어가 있었으나, PEP 410에서 `decimal.Decimal` 제안이 기각되었습니다. 기존 함수를 새로운 타입으로 변경하는 것은 하위 호환성을 깨뜨릴 위험이 있습니다.

### 다른 타입
`int` 타입을 재사용하는 것보다 새로운 타입을 추가하는 것은 표준 라이브러리, 서드파티 코드 및 애플리케이션의 더 많은 수정 노력을 요구합니다. Python의 `int` 타입은 잘 알려져 있고, 잘 지원되며, 조작하기 쉽고, `dt = t2 - t1`과 같은 모든 산술 연산을 지원합니다.

### 다른 API 방식
`time.time(ns=False)`와 같이 매개변수에 따라 결과 타입을 변경하는 API 방식은 Python에서 일반적이지 않으며 좋지 않은 프로그래밍 방식으로 간주되었습니다.

### 새로운 모듈
`time_ns`와 같은 새로운 모듈을 추가하는 아이디어도 있었으나, 두 가지 버전의 `time` 모듈을 유지 관리하는 어려움과, `os` 모듈 등 다른 모듈에도 나노초 변형이 필요할 경우 `os_ns`와 같은 새로운 모듈을 계속 추가해야 하는 문제 때문에 기각되었습니다. `time.ns`와 같은 하위 모듈 제안도 비슷한 문제를 안고 있습니다.

## 부록: Python의 클록 해상도 (Annex: Clocks Resolution in Python)
PEP는 Python에서 측정된 클록 해상도에 대한 상세 분석을 포함합니다.

### Linux
Fedora 26 (kernel 4.12)에서 측정된 클록 해상도는 다음과 같습니다.
- `time.time()`: 239 ns
- `time.time_ns()`: 84 ns (약 2.8배 개선)
- `time.monotonic()`: 81 ns
- `time.monotonic_ns()`: 84 ns
- `time.perf_counter()`: 82 ns
- `time.perf_counter_ns()`: 84 ns
- `time.process_time()`: 2 ns
- `time.process_time_ns()`: 1 ns

### Windows
Windows 8.1에서 측정된 클록 해상도는 다음과 같습니다.
- `time.time()`: 894.1 us
- `time.time_ns()`: 318 us (약 2.8배 개선)
- `time.monotonic()`: 15 ms
- `time.monotonic_ns()`: 15 ms
- `time.perf_counter()`: 100 ns
- `time.perf_counter_ns()`: 100 ns
- `time.process_time()`: 15.6 ms
- `time.process_time_ns()`: 15.6 ms

### 분석
`time.time_ns()`의 해상도는 `time.time()`보다 훨씬 우수합니다 (Linux에서 84 ns 대 239 ns, Windows에서 318 us 대 894 us). `time.time()`의 해상도는 시간이 지남에 따라 점차 악화될 수 있는데, 이는 매일 시스템 클록에 많은 나노초가 추가되어 정밀도 손실이 증가하기 때문입니다.
`time.perf_counter()`, `time.monotonic()`, `time.process_time()`와 그 나노초 변형 간의 큰 차이는 단기 실행 스크립트에서는 눈에 띄지 않을 수 있지만, 시스템 업타임이 104일 이상이 되면 유의미한 차이가 나타날 수 있습니다.

---

**결론적으로, PEP 564는 Python 개발자들이 현대 하드웨어의 정밀한 시간 측정 기능을 `float` 정밀도 손실 없이 활용할 수 있도록 `time` 모듈에 나노초 해상도를 가진 새로운 함수들을 `int` 타입으로 추가하는 것을 목표로 합니다. 이는 시스템의 미세한 성능 측정, 이벤트 동기화, 그리고 고정밀 타임스탬프 처리에 필수적인 개선입니다.**

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.