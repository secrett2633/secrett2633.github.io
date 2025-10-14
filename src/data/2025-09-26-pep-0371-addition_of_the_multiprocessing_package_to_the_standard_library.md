---
title: "[Final] PEP 371 - Addition of the multiprocessing package to the standard library"
excerpt: "Python Enhancement Proposal 371: 'Addition of the multiprocessing package to the standard library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/371/
toc: true
toc_sticky: true
date: 2025-09-26 20:55:33+0900
last_modified_at: 2025-09-26 20:55:33+0900
published: true
---
> **원문 링크:** [PEP 371 - Addition of the multiprocessing package to the standard library](https://peps.python.org/pep-0371/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 06-May-2008

# PEP 371 – 표준 라이브러리에 `multiprocessing` 패키지 추가

## 개요 (Abstract)

이 PEP는 `pyProcessing` 패키지를 "multiprocessing"으로 이름을 변경하여 Python 표준 라이브러리에 포함할 것을 제안합니다.

`processing` 패키지는 표준 라이브러리의 `threading` 모듈과 유사한 기능을 제공하여 스레드 기반 프로그래밍에 프로세스 기반 접근 방식을 도입합니다. 이는 최종 사용자가 Global Interpreter Lock (GIL)을 효과적으로 우회하는 여러 작업을 디스패치(dispatch)할 수 있도록 합니다.

이 패키지는 또한 `processing.Manager`를 통해 서버 및 클라이언트 기능을 제공하여 객체와 작업을 원격으로 공유하고 관리할 수 있도록 합니다. 이를 통해 애플리케이션은 로컬 머신의 여러 코어를 활용할 수 있을 뿐만 아니라, 네트워크로 연결된 머신 클러스터에 객체와 작업을 분산할 수 있습니다.

이 패키지의 분산 기능은 유용하지만, 이 PEP의 주된 초점은 패키지의 핵심적인 스레드와 유사한 API 및 기능입니다.

## 도입 배경 (Rationale)

현재 CPython 인터프리터는 Global Interpreter Lock (GIL)을 구현하고 있으며, Python 3000 또는 현재 계획된 다른 버전에서의 작업을 제외하고는 예측 가능한 미래에도 GIL은 CPython 인터프리터 내에 현재 상태로 유지될 것입니다. GIL 자체는 인터프리터와 확장 기반을 위한 C 코드를 깔끔하고 쉽게 유지 보수할 수 있게 해주지만, 멀티코어 머신을 활용하는 Python 프로그래머들에게는 종종 문제가 됩니다.

GIL은 어떤 시점에도 인터프리터 내에서 단 하나의 스레드만 실행되도록 하여, Python이 멀티프로세서 시스템을 활용하는 능력을 효과적으로 제거합니다.

`pyprocessing` 패키지는 GIL을 우회하는 방법을 제공하여 CPython 내의 애플리케이션이 프로그래밍 패러다임을 완전히 변경하지 않고도(예: `Twisted`, `Actors`와 같은 다른 "동시성" 접근 방식을 위해 스레드 프로그래밍을 포기하는 것) 멀티코어 아키텍처를 활용할 수 있도록 합니다.

`Processing` 패키지는 `threading` API와 유사한 "알려진 API"를 CPython에 제공하며, 이는 PEP 8을 준수하는 방식으로 알려진 시맨틱(semantics)과 쉬운 확장성을 제공합니다.

미래에 CPython 인터프리터가 "진정한" 스레딩을 가능하게 한다면 이 패키지는 덜 중요해질 수도 있습니다. 그러나 일부 애플리케이션의 경우, 특히 프로세스 생성이 빠르고 최적화된 플랫폼에서는 경량 스레드(lightweight threads)를 사용하는 것보다 OS 프로세스를 포크(fork)하는 것이 더 바람직할 수 있습니다.

예를 들어, 간단한 스레드 애플리케이션:

```python
from threading import Thread as worker
def afunc(number):
    print number * 3
t = worker(target=afunc, args=(4,))
t.start()
t.join()
```
`pyprocessing` 패키지는 API를 너무 잘 미러링(mirroring)하여, 임포트 문을 다음과 같이 간단히 변경하는 것만으로도:

```python
from processing import process as worker
```
코드가 `processing.process` 클래스를 통해 실행될 것입니다. 물론 API를 PEP 8 준수 방식으로 이름을 변경하면 사용자 애플리케이션 내에서도 추가적인 이름 변경이 필요하겠지만, 그 정도는 사소합니다.

이러한 종류의 호환성은 (대부분의 경우) 코드의 사소한 변경만으로 사용자의 애플리케이션이 병렬 실행을 위해 주어진 머신의 모든 코어와 프로세서를 활용할 수 있게 된다는 것을 의미합니다. 많은 경우 `pyprocessing` 패키지는 I/O 바운드(I/O-bound) 프로그램의 경우 일반적인 스레딩 접근 방식보다도 더 빠릅니다. 물론 이것은 `pyprocessing` 패키지가 최적화된 C 코드로 되어 있고, `threading` 모듈은 그렇지 않다는 점을 고려한 것입니다.

## "분산(Distributed)" 문제

이 패키지 포함에 대한 Python-Dev 토론에서는 이 PEP가 "분산" 문제를 해결하려는 의도에 대한 혼란이 있었고, 이 패키지의 기능을 MPI 기반 통신, CORBA 또는 다른 분산 객체 접근 방식과 같은 다른 솔루션과 자주 비교했습니다.

"분산" 문제는 크고 다양합니다. 이 분야에서 작업하는 각 프로그래머는 자신이 좋아하는 모듈/메서드에 대한 매우 강력한 의견을 가지고 있거나, 기존 솔루션으로는 해결되지 않는 고도로 맞춤화된 문제를 가지고 있습니다.

이 패키지의 채택은 "분산" 문제에 대해 작업하는 프로그래머들이 자신의 문제 영역에 대한 다른 솔루션을 검토하지 못하게 하거나 권장하지 않습니다. 이 패키지를 포함하는 목적은 로컬 동시성(local concurrency)을 위한 초기 수준의 기능과 그 동시성을 머신 네트워크에 분산하기 위한 기본적인 지원을 제공하는 것입니다. 이 둘이 긴밀하게 연결되어 있지는 않지만, `pyprocessing` 패키지는 실제로는 MPI/etc를 포함한 다른 어떤 솔루션과도 함께 사용될 수 있습니다.

필요한 경우, 패키지의 로컬 동시성 기능을 네트워크 기능/공유 측면과 완전히 분리할 수 있습니다. 그러나 심각한 우려나 원인 없이는 이 PEP의 작성자는 그러한 접근 방식을 권장하지 않습니다.

## 성능 비교 (Performance Comparison)

우리 모두 알다시피, "거짓말, 빌어먹을 거짓말, 그리고 벤치마크"가 있습니다. 이 속도 비교는 `pyprocessing` 패키지의 성능을 보여주기 위한 것이지만, 모든 가능한 사용 사례나 환경에 포괄적으로 적용될 수는 없습니다. 특히 프로세스 포크 타이밍이 느린 플랫폼에서는 더욱 그렇습니다.

모든 벤치마크는 다음 환경에서 실행되었습니다.

*   4 코어 Intel Xeon CPU @ 3.00GHz
*   16 GB RAM
*   Gentoo Linux (kernel 2.6.18.6)에 컴파일된 Python 2.5.2
*   pyProcessing 0.52

이 모든 코드는 `http://jessenoller.com/code/bench-src.tgz`에서 다운로드할 수 있습니다.

이 벤치마크의 기본 실행 방법은 `run_benchmarks.py` 스크립트에 있습니다. 이 스크립트는 단순히 단일 스레드(선형), 멀티 스레드(`threading` 모듈 사용), 멀티 프로세스(`pyprocessing` 사용) 방식으로 대상 함수를 실행하기 위한 래퍼(wrapper)이며, 증가하는 실행 루프 수 및/또는 스레드 수에 따라 고정된 반복 횟수로 실행됩니다.

`run_benchmarks.py` 스크립트는 각 함수를 100번 실행하며, `timeit` 모듈을 통해 이 100번의 반복 중 가장 좋은 실행 결과를 선택합니다.

첫째, 워커(worker) 생성의 오버헤드를 식별하기 위해, 단순히 `pass` 문(빈 함수)만 있는 함수를 실행했습니다.

```
cmd: python run_benchmarks.py empty_func.py
Importing empty_func
Starting tests ...
non_threaded (1 iters) 0.000001 seconds
threaded (1 threads) 0.000796 seconds
processes (1 procs) 0.000714 seconds
non_threaded (2 iters) 0.000002 seconds
threaded (2 threads) 0.001963 seconds
processes (2 procs) 0.001466 seconds
non_threaded (4 iters) 0.000002 seconds
threaded (4 threads) 0.003986 seconds
processes (4 procs) 0.002701 seconds
non_threaded (8 iters) 0.000003 seconds
threaded (8 threads) 0.007990 seconds
processes (8 procs) 0.005512 seconds
```
보시다시피, `pyprocessing` 패키지를 통한 프로세스 포크는 스레드 버전 코드를 빌드하고 실행하는 속도보다 빠릅니다.

두 번째 테스트는 각 스레드 내에서(격리되어 아무것도 공유하지 않음) 50000개의 피보나치 수를 계산합니다.

```
cmd: python run_benchmarks.py fibonacci.py
Importing fibonacci
Starting tests ...
non_threaded (1 iters) 0.195548 seconds
threaded (1 threads) 0.197909 seconds
processes (1 procs) 0.201175 seconds
non_threaded (2 iters) 0.397540 seconds
threaded (2 threads) 0.397637 seconds
processes (2 procs) 0.204265 seconds
non_threaded (4 iters) 0.795333 seconds
threaded (4 threads) 0.797262 seconds
processes (4 procs) 0.206990 seconds
non_threaded (8 iters) 1.591680 seconds
threaded (8 threads) 1.596824 seconds
processes (8 procs) 0.417899 seconds
```
세 번째 테스트는 100000 미만의 모든 소수의 합계를 계산하며, 역시 아무것도 공유하지 않습니다.

```
cmd: run_benchmarks.py crunch_primes.py
Importing crunch_primes
Starting tests ...
non_threaded (1 iters) 0.495157 seconds
threaded (1 threads) 0.522320 seconds
processes (1 procs) 0.523757 seconds
non_threaded (2 iters) 1.052048 seconds
threaded (2 threads) 1.154726 seconds
processes (2 procs) 0.524603 seconds
non_threaded (4 iters) 2.104733 seconds
threaded (4 threads) 2.455215 seconds
processes (4 procs) 0.530688 seconds
non_threaded (8 iters) 4.217455 seconds
threaded (8 threads) 5.109192 seconds
processes (8 procs) 1.077939 seconds
```
두 번째와 세 번째 테스트가 순수 수치 계산에 중점을 둔 이유는 현재의 스레딩 구현이 비-I/O 애플리케이션에 어떻게 방해가 되는지를 보여주기 위함입니다. 물론, 이러한 테스트는 결과 및 작업 청크(chunk) 조정을 위해 큐(queue)를 사용하도록 개선될 수 있지만, 이는 패키지와 핵심 `processing.process` 모듈의 성능을 보여주는 데 필요하지 않습니다.

다음 테스트는 I/O 바운드 테스트입니다. 일반적으로 여기서 우리는 단일 스레드 접근 방식에 비해 스레딩 모듈 접근 방식에서 큰 개선을 볼 수 있습니다. 이 경우, 각 워커는 `lorem.txt`에 대한 디스크립터(descriptor)를 열고, 그 안에서 무작위로 탐색(seek)하여 `/dev/null`에 라인들을 작성합니다.

```
cmd: python run_benchmarks.py file_io.py
Importing file_io
Starting tests ...
non_threaded (1 iters) 0.057750 seconds
threaded (1 threads) 0.089992 seconds
processes (1 procs) 0.090817 seconds
non_threaded (2 iters) 0.180256 seconds
threaded (2 threads) 0.329961 seconds
processes (2 procs) 0.096683 seconds
non_threaded (4 iters) 0.370841 seconds
threaded (4 threads) 1.103678 seconds
processes (4 procs) 0.101535 seconds
non_threaded (8 iters) 0.749571 seconds
threaded (8 threads) 2.437204 seconds
processes (8 procs) 0.203438 seconds
```
보시다시피, `pyprocessing`은 이 I/O 작업에서도 여러 스레드를 사용하는 것보다 여전히 빠릅니다. 그리고 여러 스레드를 사용하는 것은 단일 스레드 실행 자체보다 느립니다.

마지막으로, 네트워크 I/O 성능을 보여주기 위해 소켓 기반 테스트를 실행할 것입니다. 이 함수는 LAN 상의 서버에서 간단한 톰캣 오류 페이지인 URL을 100번 가져옵니다. 네트워크는 조용하고, 10G 연결입니다.

```
cmd: python run_benchmarks.py url_get.py
Importing url_get
Starting tests ...
non_threaded (1 iters) 0.124774 seconds
threaded (1 threads) 0.120478 seconds
processes (1 procs) 0.121404 seconds
non_threaded (2 iters) 0.239574 seconds
threaded (2 threads) 0.146138 seconds
processes (2 procs) 0.138366 seconds
non_threaded (4 iters) 0.479159 seconds
threaded (4 threads) 0.200985 seconds
processes (4 procs) 0.188847 seconds
non_threaded (8 iters) 0.960621 seconds
threaded (8 threads) 0.659298 seconds
processes (8 procs) 0.298625 seconds
```
마침내 스레드 성능이 단일 스레드 실행을 능가하는 것을 볼 수 있지만, 워커 수를 늘릴 때는 `pyprocessing` 패키지가 여전히 더 빠릅니다. 한두 개의 스레드/워커를 유지한다면, 스레드와 `pyprocessing` 간의 시간 차이는 상당히 비슷합니다.

하지만 주목할 점은, `pyprocessing` 패키지의 Queue 구현에는 객체 직렬화(serialization)로 인한 암묵적인 오버헤드(overhead)가 있다는 것입니다.

Alec Thomas는 `run_benchmarks.py` 스크립트를 기반으로 한 짧은 예제를 제공하여 기본 Queue 구현 대비 이러한 오버헤드를 보여주었습니다.

```
cmd: run_bench_queue.py
non_threaded (1 iters) 0.010546 seconds
threaded (1 threads) 0.015164 seconds
processes (1 procs) 0.066167 seconds
non_threaded (2 iters) 0.020768 seconds
threaded (2 threads) 0.041635 seconds
processes (2 procs) 0.084270 seconds
non_threaded (4 iters) 0.041718 seconds
threaded (4 threads) 0.086394 seconds
processes (4 procs) 0.144176 seconds
non_threaded (8 iters) 0.083488 seconds
threaded (8 threads) 0.184254 seconds
processes (8 procs) 0.302999 seconds
```
추가 벤치마크는 `pyprocessing` 패키지의 소스 배포판 `examples/` 디렉토리에서 찾을 수 있습니다. 이 예제들은 패키지 문서에 포함될 것입니다.

## 유지 보수 (Maintenance)

`pyprocessing` 패키지의 저자인 Richard M. Oudkerk는 Python SVN 내에서 패키지를 유지 보수하는 데 동의했습니다. Jesse Noller는 또한 패키지 유지 보수/문서화 및 테스트를 돕기로 자원했습니다.

## API 명명 (API Naming)

패키지 API의 목표는 Python 2.x의 `threading` 및 `Queue` 모듈의 API를 면밀히 모방하도록 설계되었지만, 해당 모듈들은 PEP 8을 준수하지 않습니다. 따라서 패키지를 "있는 그대로" 추가하여 비-PEP 8 준수 명명을 영속화하는 대신, 모든 API, 클래스 등의 이름을 완전히 PEP 8을 준수하도록 변경하기로 결정했습니다.

이러한 변경은 `threading` 모듈을 사용하는 사람들에게는 교체 용이성(ease-of-drop in replacement)에 영향을 미치지만, 작성자들의 관점에서는 이는 수용 가능한 부작용입니다. 특히 `threading` 모듈 자체의 API도 변경될 예정이라는 점을 고려하면 더욱 그렇습니다.

트래커의 Issue 3042는 Python 2.6에 `threading` 모듈을 위한 두 가지 API, 즉 현재 API와 PEP 8 준수 API가 있을 것을 제안합니다. `-3`이 호출될 때 원래의 Java 스타일 API의 향후 제거에 대한 경고가 발행될 것입니다.

Python 3000에서는 `threading` API가 PEP 8을 준수하게 될 것이며, 이는 `multiprocessing` 모듈과 `threading` 모듈이 다시 일치하는 API를 갖게 될 것임을 의미합니다.

## 타이밍/일정 (Timing/Schedule)

올해 2.6 및 3.0 릴리스를 위한 이 PEP의 타이밍/늦음(lateness)에 대한 일부 우려가 제기되었지만, 작성자들과 다른 사람들은 이 패키지가 제공하는 기능이 포함 위험을 능가한다고 생각합니다.

그러나 Python 코어(core)를 불안정하게 만들지 않으려는 바람을 고려하여, `pyprocessing` 코드의 일부 리팩토링(refactoring)을 다음 2.x/3.x 릴리스까지 보류할 수 있습니다. 이는 Python 코어에 대한 실제 위험이 최소화되며, 주로 실제 패키지 자체에 한정된다는 것을 의미합니다.

## 열린 문제 (Open Issues)

*   "기본" 원격 연결 기능이 없는지 확인하고, 필요한 경우 원격 기능을 제공하는 클래스에 대해 원격 보안 메커니즘을 기본적으로 활성화해야 합니다.
*   일부 API(`Queue` 메서드 `qsize()`, `task_done()`, `join()`)는 추가되어야 하거나, 제외 이유가 명확히 식별되고 문서화되어야 합니다.

## 해결된 문제 (Closed Issues)

*   `roudkerk`가 issue 1683에 제출한 `PyGILState` 버그 패치는 패키지 단위 테스트가 작동하도록 적용되어야 합니다.
*   기존 문서는 ReST 형식으로 이동되어야 합니다.
*   `ctypes`에 대한 의존성: `pyprocessing` 패키지의 `ctypes` 의존성은 `ctypes`가 지원되지 않는 플랫폼에서 패키지가 작동하지 못하게 합니다. 이는 이 패키지의 제한 사항이 아니라 `ctypes`의 제한 사항입니다.
*   **완료:** 최상위 패키지 이름을 "pyprocessing"에서 "multiprocessing"으로 변경했습니다.
*   **완료:** 또한 프로세스 생성의 기본 동작이 `IDLE` 내에서 그대로 사용하기에 호환되지 않으므로, 이는 버그 수정 또는 "setExecutable" 개선 사항으로 검토될 것입니다.
*   **완료:** Python 인터프리터 대신 현재 실행 파일 이름을 사용하여 프로세스를 생성하는 패키지의 기본 동작을 재정의하기 위해 "multiprocessing.setExecutable()" 메서드를 추가했습니다. Mark Hammond는 이를 위한 팩토리 스타일(factory-style) 인터페이스를 제안했습니다.

## 참고 자료 (References)

*   [1] 2008년 당시의 PyProcessing 프로젝트 (`pyprocessing` 이름은 이후 재사용됨) [https://web.archive.org/web/20080914113946/https://pyprocessing.berlios.de/](https://web.archive.org/web/20080914113946/https://pyprocessing.berlios.de/)
*   [2] Adam Olsen의 "safe threading" 프로젝트 참조 [https://code.google.com/archive/p/python-safethread/](https://code.google.com/archive/p/python-safethread/)
*   [3] 참조: 표준 라이브러리에 "pyprocessing" 모듈 추가 [https://mail.python.org/pipermail/python-dev/2008-May/079417.html](https://mail.python.org/pipermail/python-dev/2008-May/079417.html)
*   [4] [https://mpi4py.readthedocs.io/](https://mpi4py.readthedocs.io/)
*   [5] "클러스터 컴퓨팅(Cluster Computing)" 참조 [https://wiki.python.org/moin/ParallelProcessing#Cluster_Computing](https://wiki.python.org/moin/ParallelProcessing#Cluster_Computing)
*   [6] 원본 `run_benchmark.py` 코드는 2007년 12월 Python Magazine에 Jesse Noller의 "Python Threads and the Global Interpreter Lock"이라는 제목으로 출판되었습니다. 이 PEP를 위해 수정되었습니다.
*   [7] [http://groups.google.com/group/python-dev2/msg/54cf06d15cbcbc34](http://groups.google.com/group/python-dev2/msg/54cf06d15cbcbc34)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

The translation is complete and follows all the guidelines.# PEP 371 – 표준 라이브러리에 `multiprocessing` 패키지 추가

## 개요 (Abstract)

이 PEP는 `pyProcessing` 패키지를 "multiprocessing"으로 이름을 변경하여 Python 표준 라이브러리에 포함할 것을 제안합니다.

`processing` 패키지는 표준 라이브러리의 `threading` 모듈과 유사한 기능을 제공하여 스레드 기반 프로그래밍에 프로세스 기반 접근 방식을 도입합니다. 이는 최종 사용자가 Global Interpreter Lock (GIL)을 효과적으로 우회하는 여러 작업을 디스패치(dispatch)할 수 있도록 합니다.

이 패키지는 또한 `processing.Manager`를 통해 서버 및 클라이언트 기능을 제공하여 객체와 작업을 원격으로 공유하고 관리할 수 있도록 합니다. 이를 통해 애플리케이션은 로컬 머신의 여러 코어를 활용할 수 있을 뿐만 아니라, 네트워크로 연결된 머신 클러스터에 객체와 작업을 분산할 수 있습니다.

이 패키지의 분산 기능은 유용하지만, 이 PEP의 주된 초점은 패키지의 핵심적인 스레드와 유사한 API 및 기능입니다.

## 도입 배경 (Rationale)

현재 CPython 인터프리터는 Global Interpreter Lock (GIL)을 구현하고 있으며, Python 3000 또는 현재 계획된 다른 버전에서의 작업을 제외하고는 예측 가능한 미래에도 GIL은 CPython 인터프리터 내에 현재 상태로 유지될 것입니다. GIL 자체는 인터프리터와 확장 기반을 위한 C 코드를 깔끔하고 쉽게 유지 보수할 수 있게 해주지만, 멀티코어 머신을 활용하는 Python 프로그래머들에게는 종종 문제가 됩니다.

GIL은 어떤 시점에도 인터프리터 내에서 단 하나의 스레드만 실행되도록 하여, Python이 멀티프로세서 시스템을 활용하는 능력을 효과적으로 제거합니다.

`pyprocessing` 패키지는 GIL을 우회하는 방법을 제공하여 CPython 내의 애플리케이션이 프로그래밍 패러다임을 완전히 변경하지 않고도(예: `Twisted`, `Actors`와 같은 다른 "동시성" 접근 방식을 위해 스레드 프로그래밍을 포기하는 것) 멀티코어 아키텍처를 활용할 수 있도록 합니다.

`Processing` 패키지는 `threading` API와 유사한 "알려진 API"를 CPython에 제공하며, 이는 PEP 8을 준수하는 방식으로 알려진 시맨틱(semantics)과 쉬운 확장성을 제공합니다.

미래에 CPython 인터프리터가 "진정한" 스레딩을 가능하게 한다면 이 패키지는 덜 중요해질 수도 있습니다. 그러나 일부 애플리케이션의 경우, 특히 프로세스 생성이 빠르고 최적화된 플랫폼에서는 경량 스레드(lightweight threads)를 사용하는 것보다 OS 프로세스를 포크(fork)하는 것이 더 바람직할 수 있습니다.

예를 들어, 간단한 스레드 애플리케이션:

```python
from threading import Thread as worker
def afunc(number):
    print number * 3
t = worker(target=afunc, args=(4,))
t.start()
t.join()
```
`pyprocessing` 패키지는 API를 너무 잘 미러링(mirroring)하여, 임포트 문을 다음과 같이 간단히 변경하는 것만으로도:

```python
from processing import process as worker
```
코드가 `processing.process` 클래스를 통해 실행될 것입니다. 물론 API를 PEP 8 준수 방식으로 이름을 변경하면 사용자 애플리케이션 내에서도 추가적인 이름 변경이 필요하겠지만, 그 정도는 사소합니다.

이러한 종류의 호환성은 (대부분의 경우) 코드의 사소한 변경만으로 사용자의 애플리케이션이 병렬 실행을 위해 주어진 머신의 모든 코어와 프로세서를 활용할 수 있게 된다는 것을 의미합니다. 많은 경우 `pyprocessing` 패키지는 I/O 바운드(I/O-bound) 프로그램의 경우 일반적인 스레딩 접근 방식보다도 더 빠릅니다. 물론 이것은 `pyprocessing` 패키지가 최적화된 C 코드로 되어 있고, `threading` 모듈은 그렇지 않다는 점을 고려한 것입니다.

## "분산(Distributed)" 문제

이 패키지 포함에 대한 Python-Dev 토론에서는 이 PEP가 "분산" 문제를 해결하려는 의도에 대한 혼란이 있었고, 이 패키지의 기능을 MPI 기반 통신, CORBA 또는 다른 분산 객체 접근 방식과 같은 다른 솔루션과 자주 비교했습니다.

"분산" 문제는 크고 다양합니다. 이 분야에서 작업하는 각 프로그래머는 자신이 좋아하는 모듈/메서드에 대한 매우 강력한 의견을 가지고 있거나, 기존 솔루션으로는 해결되지 않는 고도로 맞춤화된 문제를 가지고 있습니다.

이 패키지의 채택은 "분산" 문제에 대해 작업하는 프로그래머들이 자신의 문제 영역에 대한 다른 솔루션을 검토하지 못하게 하거나 권장하지 않습니다. 이 패키지를 포함하는 목적은 로컬 동시성(local concurrency)을 위한 초기 수준의 기능과 그 동시성을 머신 네트워크에 분산하기 위한 기본적인 지원을 제공하는 것입니다. 이 둘이 긴밀하게 연결되어 있지는 않지만, `pyprocessing` 패키지는 실제로는 MPI/etc를 포함한 다른 어떤 솔루션과도 함께 사용될 수 있습니다.

필요한 경우, 패키지의 로컬 동시성 기능을 네트워크 기능/공유 측면과 완전히 분리할 수 있습니다. 그러나 심각한 우려나 원인 없이는 이 PEP의 작성자는 그러한 접근 방식을 권장하지 않습니다.

## 성능 비교 (Performance Comparison)

우리 모두 알다시피, "거짓말, 빌어먹을 거짓말, 그리고 벤치마크"가 있습니다. 이 속도 비교는 `pyprocessing` 패키지의 성능을 보여주기 위한 것이지만, 모든 가능한 사용 사례나 환경에 포괄적으로 적용될 수는 없습니다. 특히 프로세스 포크 타이밍이 느린 플랫폼에서는 더욱 그렇습니다.

모든 벤치마크는 다음 환경에서 실행되었습니다.

*   4 코어 Intel Xeon CPU @ 3.00GHz
*   16 GB RAM
*   Gentoo Linux (kernel 2.6.18.6)에 컴파일된 Python 2.5.2
*   pyProcessing 0.52

이 모든 코드는 `http://jessenoller.com/code/bench-src.tgz`에서 다운로드할 수 있습니다.

이 벤치마크의 기본 실행 방법은 `run_benchmarks.py` 스크립트에 있습니다. 이 스크립트는 단순히 단일 스레드(선형), 멀티 스레드(`threading` 모듈 사용), 멀티 프로세스(`pyprocessing` 사용) 방식으로 대상 함수를 실행하기 위한 래퍼(wrapper)이며, 증가하는 실행 루프 수 및/또는 스레드 수에 따라 고정된 반복 횟수로 실행됩니다.

`run_benchmarks.py` 스크립트는 각 함수를 100번 실행하며, `timeit` 모듈을 통해 이 100번의 반복 중 가장 좋은 실행 결과를 선택합니다.

첫째, 워커(worker) 생성의 오버헤드를 식별하기 위해, 단순히 `pass` 문(빈 함수)만 있는 함수를 실행했습니다.

```
cmd: python run_benchmarks.py empty_func.py
Importing empty_func
Starting tests ...
non_threaded (1 iters) 0.000001 seconds
threaded (1 threads) 0.000796 seconds
processes (1 procs) 0.000714 seconds
non_threaded (2 iters) 0.000002 seconds
threaded (2 threads) 0.001963 seconds
processes (2 procs) 0.001466 seconds
non_threaded (4 iters) 0.000002 seconds
threaded (4 threads) 0.003986 seconds
processes (4 procs) 0.002701 seconds
non_threaded (8 iters) 0.000003 seconds
threaded (8 threads) 0.007990 seconds
processes (8 procs) 0.005512 seconds
```
보시다시피, `pyprocessing` 패키지를 통한 프로세스 포크는 스레드 버전 코드를 빌드하고 실행하는 속도보다 빠릅니다.

두 번째 테스트는 각 스레드 내에서(격리되어 아무것도 공유하지 않음) 50000개의 피보나치 수를 계산합니다.

```
cmd: python run_benchmarks.py fibonacci.py
Importing fibonacci
Starting tests ...
non_threaded (1 iters) 0.195548 seconds
threaded (1 threads) 0.197909 seconds
processes (1 procs) 0.201175 seconds
non_threaded (2 iters) 0.397540 seconds
threaded (2 threads) 0.397637 seconds
processes (2 procs) 0.204265 seconds
non_threaded (4 iters) 0.795333 seconds
threaded (4 threads) 0.797262 seconds
processes (4 procs) 0.206990 seconds
non_threaded (8 iters) 1.591680 seconds
threaded (8 threads) 1.596824 seconds
processes (8 procs) 0.417899 seconds
```
세 번째 테스트는 100000 미만의 모든 소수의 합계를 계산하며, 역시 아무것도 공유하지 않습니다.

```
cmd: run_benchmarks.py crunch_primes.py
Importing crunch_primes
Starting tests ...
non_threaded (1 iters) 0.495157 seconds
threaded (1 threads) 0.522320 seconds
processes (1 procs) 0.523757 seconds
non_threaded (2 iters) 1.052048 seconds
threaded (2 threads) 1.154726 seconds
processes (2 procs) 0.524603 seconds
non_threaded (4 iters) 2.104733 seconds
threaded (4 threads) 2.455215 seconds
processes (4 procs) 0.530688 seconds
non_threaded (8 iters) 4.217455 seconds
threaded (8 threads) 5.109192 seconds
processes (8 procs) 1.077939 seconds
```
두 번째와 세 번째 테스트가 순수 수치 계산에 중점을 둔 이유는 현재의 스레딩 구현이 비-I/O 애플리케이션에 어떻게 방해가 되는지를 보여주기 위함입니다. 물론, 이러한 테스트는 결과 및 작업 청크(chunk) 조정을 위해 큐(queue)를 사용하도록 개선될 수 있지만, 이는 패키지와 핵심 `processing.process` 모듈의 성능을 보여주는 데 필요하지 않습니다.

다음 테스트는 I/O 바운드 테스트입니다. 일반적으로 여기서 우리는 단일 스레드 접근 방식에 비해 스레딩 모듈 접근 방식에서 큰 개선을 볼 수 있습니다. 이 경우, 각 워커는 `lorem.txt`에 대한 디스크립터(descriptor)를 열고, 그 안에서 무작위로 탐색(seek)하여 `/dev/null`에 라인들을 작성합니다.

```
cmd: python run_benchmarks.py file_io.py
Importing file_io
Starting tests ...
non_threaded (1 iters) 0.057750 seconds
threaded (1 threads) 0.089992 seconds
processes (1 procs) 0.090817 seconds
non_threaded (2 iters) 0.180256 seconds
threaded (2 threads) 0.329961 seconds
processes (2 procs) 0.096683 seconds
non_threaded (4 iters) 0.370841 seconds
threaded (4 threads) 1.103678 seconds
processes (4 procs) 0.101535 seconds
non_threaded (8 iters) 0.749571 seconds
threaded (8 threads) 2.437204 seconds
processes (8 procs) 0.203438 seconds
```
보시다시피, `pyprocessing`은 이 I/O 작업에서도 여러 스레드를 사용하는 것보다 여전히 빠릅니다. 그리고 여러 스레드를 사용하는 것은 단일 스레드 실행 자체보다 느립니다.

마지막으로, 네트워크 I/O 성능을 보여주기 위해 소켓 기반 테스트를 실행할 것입니다. 이 함수는 LAN 상의 서버에서 간단한 톰캣 오류 페이지인 URL을 100번 가져옵니다. 네트워크는 조용하고, 10G 연결입니다.

```
cmd: python run_benchmarks.py url_get.py
Importing url_get
Starting tests ...
non_threaded (1 iters) 0.124774 seconds
threaded (1 threads) 0.120478 seconds
processes (1 procs) 0.121404 seconds
non_threaded (2 iters) 0.239574 seconds
threaded (2 threads) 0.146138 seconds
processes (2 procs) 0.138366 seconds
non_threaded (4 iters) 0.479159 seconds
threaded (4 threads) 0.200985 seconds
processes (4 procs) 0.188847 seconds
non_threaded (8 iters) 0.960621 seconds
threaded (8 threads) 0.659298 seconds
processes (8 procs) 0.298625 seconds
```
마침내 스레드 성능이 단일 스레드 실행을 능가하는 것을 볼 수 있지만, 워커 수를 늘릴 때는 `pyprocessing` 패키지가 여전히 더 빠릅니다. 한두 개의 스레드/워커를 유지한다면, 스레드와 `pyprocessing` 간의 시간 차이는 상당히 비슷합니다.

하지만 주목할 점은, `pyprocessing` 패키지의 Queue 구현에는 객체 직렬화(serialization)로 인한 암묵적인 오버헤드(overhead)가 있다는 것입니다.

Alec Thomas는 `run_benchmarks.py` 스크립트를 기반으로 한 짧은 예제를 제공하여 기본 Queue 구현 대비 이러한 오버헤드를 보여주었습니다.

```
cmd: run_bench_queue.py
non_threaded (1 iters) 0.010546 seconds
threaded (1 threads) 0.015164 seconds
processes (1 procs) 0.066167 seconds
non_threaded (2 iters) 0.020768 seconds
threaded (2 threads) 0.041635 seconds
processes (2 procs) 0.084270 seconds
non_threaded (4 iters) 0.041718 seconds
threaded (4 threads) 0.086394 seconds
processes (4 procs) 0.144176 seconds
non_threaded (8 iters) 0.083488 seconds
threaded (8 threads) 0.184254 seconds
processes (8 procs) 0.302999 seconds
```
추가 벤치마크는 `pyprocessing` 패키지의 소스 배포판 `examples/` 디렉토리에서 찾을 수 있습니다. 이 예제들은 패키지 문서에 포함될 것입니다.

## 유지 보수 (Maintenance)

`pyprocessing` 패키지의 저자인 Richard M. Oudkerk는 Python SVN 내에서 패키지를 유지 보수하는 데 동의했습니다. Jesse Noller는 또한 패키지 유지 보수/문서화 및 테스트를 돕기로 자원했습니다.

## API 명명 (API Naming)

패키지 API의 목표는 Python 2.x의 `threading` 및 `Queue` 모듈의 API를 면밀히 모방하도록 설계되었지만, 해당 모듈들은 PEP 8을 준수하지 않습니다. 따라서 패키지를 "있는 그대로" 추가하여 비-PEP 8 준수 명명을 영속화하는 대신, 모든 API, 클래스 등의 이름을 완전히 PEP 8을 준수하도록 변경하기로 결정했습니다.

이러한 변경은 `threading` 모듈을 사용하는 사람들에게는 교체 용이성(ease-of-drop in replacement)에 영향을 미치지만, 작성자들의 관점에서는 이는 수용 가능한 부작용입니다. 특히 `threading` 모듈 자체의 API도 변경될 예정이라는 점을 고려하면 더욱 그렇습니다.

트래커의 Issue 3042는 Python 2.6에 `threading` 모듈을 위한 두 가지 API, 즉 현재 API와 PEP 8 준수 API가 있을 것을 제안합니다. `-3`이 호출될 때 원래의 Java 스타일 API의 향후 제거에 대한 경고가 발행될 것입니다.

Python 3000에서는 `threading` API가 PEP 8을 준수하게 될 것이며, 이는 `multiprocessing` 모듈과 `threading` 모듈이 다시 일치하는 API를 갖게 될 것임을 의미합니다.

## 타이밍/일정 (Timing/Schedule)

올해 2.6 및 3.0 릴리스를 위한 이 PEP의 타이밍/늦음(lateness)에 대한 일부 우려가 제기되었지만, 작성자들과 다른 사람들은 이 패키지가 제공하는 기능이 포함 위험을 능가한다고 생각합니다.

그러나 Python 코어(core)를 불안정하게 만들지 않으려는 바람을 고려하여, `pyprocessing` 코드의 일부 리팩토링(refactoring)을 다음 2.x/3.x 릴리스까지 보류할 수 있습니다. 이는 Python 코어에 대한 실제 위험이 최소화되며, 주로 실제 패키지 자체에 한정된다는 것을 의미합니다.

## 열린 문제 (Open Issues)

*   "기본" 원격 연결 기능이 없는지 확인하고, 필요한 경우 원격 기능을 제공하는 클래스에 대해 원격 보안 메커니즘을 기본적으로 활성화해야 합니다.
*   일부 API(`Queue` 메서드 `qsize()`, `task_done()`, `join()`)는 추가되어야 하거나, 제외 이유가 명확히 식별되고 문서화되어야 합니다.

## 해결된 문제 (Closed Issues)

*   `roudkerk`가 issue 1683에 제출한 `PyGILState` 버그 패치는 패키지 단위 테스트가 작동하도록 적용되어야 합니다.
*   기존 문서는 ReST 형식으로 이동되어야 합니다.
*   `ctypes`에 대한 의존성: `pyprocessing` 패키지의 `ctypes` 의존성은 `ctypes`가 지원되지 않는 플랫폼에서 패키지가 작동하지 못하게 합니다. 이는 이 패키지의 제한 사항이 아니라 `ctypes`의 제한 사항입니다.
*   **완료:** 최상위 패키지 이름을 "pyprocessing"에서 "multiprocessing"으로 변경했습니다.
*   **완료:** 또한 프로세스 생성의 기본 동작이 `IDLE` 내에서 그대로 사용하기에 호환되지 않으므로, 이는 버그 수정 또는 "setExecutable" 개선 사항으로 검토될 것입니다.
*   **완료:** Python 인터프리터 대신 현재 실행 파일 이름을 사용하여 프로세스를 생성하는 패키지의 기본 동작을 재정의하기 위해 "multiprocessing.setExecutable()" 메서드를 추가했습니다. Mark Hammond는 이를 위한 팩토리 스타일(factory-style) 인터페이스를 제안했습니다.

## 참고 자료 (References)

*   2008년 당시의 PyProcessing 프로젝트 (`pyprocessing` 이름은 이후 재사용됨) [https://web.archive.org/web/20080914113946/https://pyprocessing.berlios.de/](https://web.archive.org/web/20080914113946/https://pyprocessing.berlios.de/)
*   Adam Olsen의 "safe threading" 프로젝트 참조 [https://code.google.com/archive/p/python-safethread/](https://code.google.com/archive/p/python-safethread/)
*   참조: 표준 라이브러리에 "pyprocessing" 모듈 추가 [https://mail.python.org/pipermail/python-dev/2008-May/079417.html](https://mail.python.org/pipermail/python-dev/2008-May/079417.html)
*   [https://mpi4py.readthedocs.io/](https://mpi4py.readthedocs.io/)
*   "클러스터 컴퓨팅(Cluster Computing)" 참조 [https://wiki.python.org/moin/ParallelProcessing#Cluster_Computing](https://wiki.python.org/moin/ParallelProcessing#Cluster_Computing)
*   원본 `run_benchmark.py` 코드는 2007년 12월 Python Magazine에 Jesse Noller의 "Python Threads and the Global Interpreter Lock"이라는 제목으로 출판되었습니다. 이 PEP를 위해 수정되었습니다.
*   [http://groups.google.com/group/python-dev2/msg/54cf06d15cbcbc34](http://groups.google.com/group/python-dev2/msg/54cf06d15cbcbc34)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.