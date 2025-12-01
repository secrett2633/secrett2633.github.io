---
title: "[Final] PEP 454 - Add a new tracemalloc module to trace Python memory allocations"
excerpt: "Python Enhancement Proposal 454: 'Add a new tracemalloc module to trace Python memory allocations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/454/
toc: true
toc_sticky: true
date: 2025-09-26 22:04:39+0900
last_modified_at: 2025-09-26 22:04:39+0900
published: true
---
> **원문 링크:** [PEP 454 - Add a new tracemalloc module to trace Python memory allocations](https://peps.python.org/pep-0454/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 03-Sep-2013



# PEP 454 – Python 메모리 할당 추적을 위한 새로운 `tracemalloc` 모듈 추가

## 초록 (Abstract)
이 PEP는 Python에 의해 할당된 메모리 블록을 추적하기 위한 새로운 `tracemalloc` 모듈을 추가할 것을 제안합니다.

## 도입 배경 (Rationale)
Valgrind와 같은 일반적인 C 도구들은 메모리 블록이 할당된 C traceback을 얻을 수 있습니다. 그러나 이러한 도구를 사용하여 Python 메모리 할당을 분석하는 것은 대부분의 메모리 블록이 `PyMem_Malloc()`과 같은 동일한 C 함수 내에서 할당되기 때문에 도움이 되지 않습니다. 또한, Python은 효율성을 위해 자유 블록을 유지하는 "pymalloc"이라는 작은 객체용 할당자를 가지고 있는데, 이 또한 이러한 도구들로 잘 처리되지 않습니다.

Heapy, Pympler, Meliae와 같은 Python 언어 전용 디버그 도구들은 가비지 컬렉터 모듈(예: `gc.get_objects()`, `gc.get_referrers()`, `gc.get_referents()` 함수)을 사용하여 모든 활성(alive) 객체를 나열하고, 그 크기를 계산(예: `sys.getsizeof()` 사용)하며, 유형별로 객체를 그룹화합니다. 이러한 도구들은 애플리케이션의 메모리 사용량에 대한 더 나은 추정치를 제공합니다. 이들은 대부분의 메모리 누수가 동일한 유형의 인스턴스이고 이 유형이 소수의 함수에서만 인스턴스화될 때 유용합니다. 하지만 `str` 또는 `tuple`과 같이 객체 유형이 매우 흔하고 이러한 객체들이 어디에서 인스턴스화되는지 식별하기 어려울 때 문제가 발생합니다.

참조 순환(reference cycles)을 찾는 것 또한 어려운 문제입니다. 모든 참조의 다이어그램을 그리는 여러 도구가 있지만, 수천 개의 객체가 있는 대규모 애플리케이션에서는 다이어그램이 너무 커서 수동으로 분석할 수 없습니다.

## 제안 (Proposal)
PEP 445의 사용자 정의 할당(allocation) API를 사용하면 Python 메모리 할당자에 훅(hook)을 설정하기 쉬워집니다. 훅은 Python 내부를 검사하여 Python traceback을 검색할 수 있습니다. 현재 traceback을 얻는 아이디어는 `faulthandler` 모듈에서 비롯되었습니다. `faulthandler`는 크래시 시 모든 Python 스레드의 traceback을 덤프하는데, 여기서 아이디어는 Python에 의해 메모리 블록이 할당될 때 현재 Python 스레드의 traceback을 얻는 것입니다.

이 PEP는 Python에 의해 할당된 메모리 블록을 추적하는 디버그 도구인 새로운 `tracemalloc` 모듈을 추가할 것을 제안합니다. 이 모듈은 다음 정보를 제공합니다.

*   객체가 할당된 traceback
*   파일 이름 및 줄 번호별로 할당된 메모리 블록에 대한 통계: 총 크기, 할당된 메모리 블록의 수 및 평균 크기
*   메모리 누수를 감지하기 위해 두 스냅샷(snapshot) 간에 계산된 차이

`tracemalloc` 모듈의 API는 `faulthandler` 모듈의 API와 유사합니다: `enable()` / `start()`, `disable()` / `stop()`, `is_enabled()` / `is_tracing()` 함수, 환경 변수 (`PYTHONFAULTHANDLER` 및 `PYTHONTRACEMALLOC`), 그리고 `-X` 명령줄 옵션 (`-X faulthandler` 및 `-X tracemalloc`). `faulthandler` 모듈의 문서를 참조하십시오.

메모리 할당 추적 아이디어는 새로운 것이 아닙니다. 이는 2005년 PySizer 프로젝트에서 처음 구현되었습니다. PySizer는 다르게 구현되었습니다: traceback이 frame 객체에 저장되었고 일부 Python 유형은 객체 유형의 이름과 trace를 연결했습니다. PySizer는 사용되지 않을 때도 CPython 성능 및 메모리 점유율(footprint)에 오버헤드를 추가했습니다. `tracemalloc`은 traceback을 하위 계층인 메모리 블록에 연결하며, 모듈이 메모리 할당을 추적하지 않을 때는 오버헤드가 없습니다.

`tracemalloc` 모듈은 CPython용으로 작성되었습니다. 다른 Python 구현은 이를 제공하지 못할 수도 있습니다.

## API
대부분의 Python에 의해 할당된 메모리 블록을 추적하려면, `PYTHONTRACEMALLOC` 환경 변수를 `1`로 설정하거나, `-X tracemalloc` 명령줄 옵션을 사용하여 가능한 한 일찍 모듈을 시작해야 합니다. `tracemalloc.start()` 함수는 런타임에 Python 메모리 할당 추적을 시작할 수 있습니다.

기본적으로 할당된 메모리 블록의 trace는 가장 최근 프레임(1 프레임)만 저장합니다. 시작 시 25 프레임을 저장하려면: `PYTHONTRACEMALLOC` 환경 변수를 `25`로 설정하거나, `-X tracemalloc=25` 명령줄 옵션을 사용하십시오. `set_traceback_limit()` 함수는 런타임에 제한을 설정하는 데 사용할 수 있습니다.

### 함수 (Functions)

*   **`clear_traces()`** : Python에 의해 할당된 메모리 블록의 trace를 지웁니다. `stop()`도 참조하십시오.
*   **`get_object_traceback(obj)`** : Python 객체 `obj`가 할당된 traceback을 가져옵니다. `Traceback` 인스턴스를 반환하거나, `tracemalloc` 모듈이 메모리 할당을 추적하지 않거나 객체 할당을 추적하지 않은 경우 `None`을 반환합니다. `gc.get_referrers()` 및 `sys.getsizeof()` 함수도 참조하십시오.
*   **`get_traceback_limit()`** : trace의 traceback에 저장된 최대 프레임 수를 가져옵니다. `tracemalloc` 모듈은 제한을 얻기 위해 메모리 할당을 추적해야 하며, 그렇지 않으면 예외가 발생합니다. 제한은 `start()` 함수에 의해 설정됩니다.
*   **`get_traced_memory()`** : `tracemalloc` 모듈에 의해 추적된 메모리 블록의 현재 크기와 최대 크기를 `(size: int, max_size: int)` 튜플로 가져옵니다.
*   **`get_tracemalloc_memory()`** : 메모리 블록의 trace를 저장하는 데 사용된 `tracemalloc` 모듈의 메모리 사용량을 바이트 단위로 가져옵니다. `int`를 반환합니다.
*   **`is_tracing()`** : `tracemalloc` 모듈이 Python 메모리 할당을 추적 중이면 `True`를, 그렇지 않으면 `False`를 반환합니다. `start()` 및 `stop()` 함수도 참조하십시오.
*   **`start(nframe: int = 1)`** : Python 메모리 할당 추적을 시작합니다. Python 메모리 할당자에 훅을 설치합니다. 수집된 trace의 traceback은 `nframe` 프레임으로 제한됩니다. 기본적으로 메모리 블록의 trace는 가장 최근 프레임만 저장합니다(제한은 `1`). `nframe`은 1보다 크거나 같아야 합니다. 1개 이상의 프레임을 저장하는 것은 'traceback'별로 그룹화된 통계를 계산하거나 누적 통계를 계산할 때만 유용합니다. `Snapshot.compare_to()` 및 `Snapshot.statistics()` 메서드를 참조하십시오. 더 많은 프레임을 저장하면 `tracemalloc` 모듈의 메모리 및 CPU 오버헤드가 증가합니다. `get_tracemalloc_memory()` 함수를 사용하여 `tracemalloc` 모듈이 사용하는 메모리 양을 측정하십시오. `PYTHONTRACEMALLOC` 환경 변수(`PYTHONTRACEMALLOC=NFRAME`) 및 `-X tracemalloc=NFRAME` 명령줄 옵션을 사용하여 시작 시 추적을 시작할 수 있습니다. `stop()`, `is_tracing()`, `get_traceback_limit()` 함수도 참조하십시오.
*   **`stop()`** : Python 메모리 할당 추적을 중지합니다. Python 메모리 할당자에 대한 훅을 제거합니다. Python에 의해 할당된 메모리 블록의 trace도 지웁니다. trace를 지우기 전에 스냅샷을 찍으려면 `take_snapshot()` 함수를 호출하십시오. `start()` 및 `is_tracing()` 함수도 참조하십시오.
*   **`take_snapshot()`** : Python에 의해 할당된 메모리 블록의 trace 스냅샷을 찍습니다. 새로운 `Snapshot` 인스턴스를 반환합니다. 스냅샷에는 `tracemalloc` 모듈이 메모리 할당 추적을 시작하기 전에 할당된 메모리 블록은 포함되지 않습니다. trace의 traceback은 `get_traceback_limit()` 프레임으로 제한됩니다. 더 많은 프레임을 저장하려면 `start()` 함수의 `nframe` 매개변수를 사용하십시오. 스냅샷을 찍으려면 `tracemalloc` 모듈이 메모리 할당을 추적해야 합니다(`start()` 함수 참조). `get_object_traceback()` 함수도 참조하십시오.

### 필터 (Filter)

*   **`Filter(inclusive: bool, filename_pattern: str, lineno: int=None, all_frames: bool=False)` 클래스** : 메모리 블록의 trace에 대한 필터입니다. `filename_pattern`의 구문은 `fnmatch.fnmatch()` 함수를 참조하십시오. `.pyc` 및 `.pyo` 파일 확장자는 `.py`로 대체됩니다.
    *   **`inclusive` 속성** : `True`이면(`include`) `filename_pattern`과 `lineno`에 일치하는 파일에서 할당된 메모리 블록의 trace만 포함합니다. `False`이면(`exclude`) `filename_pattern`과 `lineno`에 일치하는 파일에서 할당된 메모리 블록을 무시합니다.
    *   **`lineno` 속성** : 필터의 줄 번호(`int`). `None`이면 필터는 모든 줄 번호에 일치합니다.
    *   **`filename_pattern` 속성** : 필터의 파일 이름 패턴(`str`).
    *   **`all_frames` 속성** : `True`이면 traceback의 모든 프레임을 확인합니다. `False`이면 가장 최근 프레임만 확인합니다. 이 속성은 traceback 제한이 2보다 작으면 무시됩니다. `get_traceback_limit()` 함수 및 `Snapshot.traceback_limit` 속성을 참조하십시오.

### 프레임 (Frame)

*   **`Frame` 클래스** : traceback의 프레임입니다. `Traceback` 클래스는 `Frame` 인스턴스의 시퀀스입니다.
    *   **`filename` 속성** : 파일 이름(`str`).
    *   **`lineno` 속성** : 줄 번호(`int`).

### 스냅샷 (Snapshot)

*   **`Snapshot` 클래스** : Python에 의해 할당된 메모리 블록의 trace 스냅샷입니다. `take_snapshot()` 함수가 스냅샷 인스턴스를 생성합니다.
    *   **`compare_to(old_snapshot: Snapshot, group_by: str, cumulative: bool=False)` 메서드** : 이전 스냅샷과의 차이를 계산합니다. `group_by`로 그룹화된 정렬된 `StatisticDiff` 인스턴스 목록으로 통계를 가져옵니다. `group_by` 및 `cumulative` 매개변수는 `statistics()` 메서드를 참조하십시오. 결과는 `StatisticDiff.size_diff`의 절대값, `StatisticDiff.size`, `StatisticDiff.count_diff`의 절대값, `Statistic.count`, 그리고 `StatisticDiff.traceback` 순으로 가장 큰 것에서 가장 작은 것으로 정렬됩니다.
    *   **`dump(filename)` 메서드** : 스냅샷을 파일에 씁니다. `load()`를 사용하여 스냅샷을 다시 로드합니다.
    *   **`filter_traces(filters)` 메서드** : 필터링된 trace 시퀀스로 새로운 `Snapshot` 인스턴스를 생성합니다. `filters`는 `Filter` 인스턴스 목록입니다. `filters`가 빈 목록이면 trace 복사본을 포함하는 새로운 `Snapshot` 인스턴스를 반환합니다. 모든 inclusive 필터는 한 번에 적용됩니다. inclusive 필터에 일치하지 않는 trace는 무시됩니다. 하나 이상의 exclusive 필터에 일치하는 trace는 무시됩니다.
    *   **`load(filename)` 클래스 메서드** : 파일에서 스냅샷을 로드합니다. `dump()`도 참조하십시오.
    *   **`statistics(group_by: str, cumulative: bool=False)` 메서드** : `group_by`로 그룹화된 정렬된 `Statistic` 인스턴스 목록으로 통계를 가져옵니다.
        *   `group_by` 설명:
            *   `'filename'`: 파일 이름
            *   `'lineno'`: 파일 이름 및 줄 번호
            *   `'traceback'`: traceback
        *   `cumulative`가 `True`이면, 가장 최근 프레임뿐만 아니라 trace의 traceback의 모든 프레임에 대한 메모리 블록의 크기와 수를 누적합니다. `cumulative` 모드는 `group_by`가 `'filename'` 및 `'lineno'`이고 `traceback_limit`가 1보다 클 때만 사용할 수 있습니다. 결과는 `Statistic.size`, `Statistic.count`, 그리고 `Statistic.traceback` 순으로 가장 큰 것에서 가장 작은 것으로 정렬됩니다.
    *   **`traceback_limit` 속성** : trace의 traceback에 저장된 최대 프레임 수: 스냅샷이 찍힐 때 `get_traceback_limit()`의 결과입니다.
    *   **`traces` 속성** : Python에 의해 할당된 모든 메모리 블록의 trace: `Trace` 인스턴스의 시퀀스입니다. 시퀀스는 정의되지 않은 순서입니다. 정렬된 통계 목록을 얻으려면 `Snapshot.statistics()` 메서드를 사용하십시오.

### 통계 (Statistic)

*   **`Statistic` 클래스** : 메모리 할당에 대한 통계입니다. `Snapshot.statistics()`는 `Statistic` 인스턴스 목록을 반환합니다. `StatisticDiff` 클래스도 참조하십시오.
    *   **`count` 속성** : 메모리 블록 수(`int`).
    *   **`size` 속성** : 바이트 단위의 메모리 블록 총 크기(`int`).
    *   **`traceback` 속성** : 메모리 블록이 할당된 traceback, `Traceback` 인스턴스.

### 통계 차이 (StatisticDiff)

*   **`StatisticDiff` 클래스** : 이전 스냅샷과 새 스냅샷 간의 메모리 할당에 대한 통계 차이입니다. `Snapshot.compare_to()`는 `StatisticDiff` 인스턴스 목록을 반환합니다. `Statistic` 클래스도 참조하십시오.
    *   **`count` 속성** : 새 스냅샷의 메모리 블록 수(`int`): 새 스냅샷에서 메모리 블록이 해제된 경우 0입니다.
    *   **`count_diff` 속성** : 이전 스냅샷과 새 스냅샷 간의 메모리 블록 수 차이(`int`): 새 스냅샷에서 메모리 블록이 할당된 경우 0입니다.
    *   **`size` 속성** : 새 스냅샷의 바이트 단위 메모리 블록 총 크기(`int`): 새 스냅샷에서 메모리 블록이 해제된 경우 0입니다.
    *   **`size_diff` 속성** : 이전 스냅샷과 새 스냅샷 간의 바이트 단위 메모리 블록 총 크기 차이(`int`): 새 스냅샷에서 메모리 블록이 할당된 경우 0입니다.
    *   **`traceback` 속성** : 메모리 블록이 할당된 traceback, `Traceback` 인스턴스.

### 트레이스 (Trace)

*   **`Trace` 클래스** : 메모리 블록의 trace입니다. `Snapshot.traces` 속성은 `Trace` 인스턴스의 시퀀스입니다.
    *   **`size` 속성** : 바이트 단위 메모리 블록의 크기(`int`).
    *   **`traceback` 속성** : 메모리 블록이 할당된 traceback, `Traceback` 인스턴스.

### 트레이스백 (Traceback)

*   **`Traceback` 클래스** : 가장 최근 프레임부터 가장 오래된 프레임 순으로 정렬된 `Frame` 인스턴스의 시퀀스입니다. traceback은 최소 1개의 프레임을 포함합니다. `tracemalloc` 모듈이 프레임을 가져오지 못한 경우, 줄 번호 0의 `<unknown>` 파일 이름이 사용됩니다. 스냅샷이 찍힐 때 trace의 traceback은 `get_traceback_limit()` 프레임으로 제한됩니다. `take_snapshot()` 함수를 참조하십시오. `Trace.traceback` 속성은 `Traceback` 인스턴스입니다.

## 채택되지 않은 대안 (Rejected Alternatives)

### 메모리 할당자에 대한 호출 로깅 (Log calls to the memory allocator)
다른 접근 방식은 `malloc()`, `realloc()`, `free()` 함수에 대한 호출을 로깅하는 것입니다. 호출은 파일에 기록되거나 네트워크를 통해 다른 컴퓨터로 전송될 수 있습니다. 로그 항목의 예: 함수의 이름, 메모리 블록의 크기, 메모리 블록의 주소, 할당이 발생한 Python traceback, 타임스탬프.

로그는 직접 사용할 수 없으며, 메모리의 현재 상태를 얻으려면 이전 로그를 파싱해야 합니다. 예를 들어, `get_object_traceback(obj)`가 trace로 하는 것처럼 Python 객체의 traceback을 직접 얻는 것은 불가능합니다.

Python은 수명이 매우 짧은 객체를 사용하므로 메모리 할당자를 광범위하게 사용합니다. 수명이 짧은 작은 객체(512바이트 미만)에 최적화된 할당자를 가지고 있습니다. 예를 들어, Python 테스트 스위트는 평균적으로 초당 270,000번 `malloc()`, `realloc()`, `free()`를 호출합니다. 로그 항목의 크기가 32바이트라면, 로깅은 초당 8.2MB 또는 시간당 29.0GB를 생성합니다.

이 대안은 효율성이 떨어지고 기능이 적기 때문에 거부되었습니다. 다른 프로세스나 다른 컴퓨터에서 로그를 파싱하는 것은 동일한 프로세스에서 할당된 메모리 블록에 대한 trace를 유지하는 것보다 느립니다.

## 이전 작업 (Prior Work)
이 PEP는 다양한 이전 작업과 프로젝트를 기반으로 합니다.

*   **Python Memory Validator (2005-2013)** : Software Verification에서 개발한 상용 Python 메모리 검증 도구. Python Reflection API를 사용합니다.
*   **PySizer** : Nick Smallbone의 Google Summer of Code 2005 프로젝트.
*   **Heapy (2006-2013)** : Sverker Nilsson이 작성한 Guppy-PE 프로젝트의 일부.
*   **Draft PEP: Support Tracking Low-Level Memory Usage in CPython (Brett Canon, 2006)**
*   **Muppy** : Robert Schuppenies가 2008년에 개발한 프로젝트.
*   **asizeof** : Jean Brouwers가 2008년에 만든 객체 크기를 추정하는 순수 Python 모듈.
*   **Heapmonitor** : 개별 객체의 크기를 조정하고 특정 클래스의 모든 객체를 추적하는 기능을 제공합니다. Ludwig Haehne가 2008년에 개발했습니다.
*   **Pympler (2008-2011)** : `asizeof`, `muppy`, `HeapMonitor`를 기반으로 한 프로젝트.
*   **objgraph (2008-2012)**
*   **Dozer** : Marius Gedminas가 작성한 CherryPy 메모리 누수 디버거의 WSGI Middleware 버전 (2008-2013).
*   **Meliae** : John A Meinel이 2009년부터 개발한 Python Memory Usage Analyzer.
*   **gdb-heap** : Dave Malcolm이 2010-2011년에 작성한 Python으로 작성된 gdb 스크립트로 힙(heap) 메모리 사용량을 분석합니다.
*   **memory_profiler** : Fabian Pedregosa가 작성 (2011-2013).
*   **caulk** : Ben Timby가 2012년에 작성.

Pympler 관련 작업도 참조하십시오.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.