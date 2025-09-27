---
title: "[Accepted] PEP 703 - Making the Global Interpreter Lock Optional in CPython"
excerpt: "Python Enhancement Proposal 703: 'Making the Global Interpreter Lock Optional in CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/703/
toc: true
toc_sticky: true
date: 2025-09-27 13:08:02+0900
last_modified_at: 2025-09-27 13:08:02+0900
published: true
---
> **원문 링크:** [PEP 703 - Making the Global Interpreter Lock Optional in CPython](https://peps.python.org/pep-0703/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 09-Jan-2023

## PEP 703: CPython에서 전역 인터프리터 락(GIL) 선택적 사용 가능하게 하기

### 초록 (Abstract)

CPython의 전역 인터프리터 락(Global Interpreter Lock, GIL)은 여러 스레드가 동시에 Python 코드를 실행하는 것을 막습니다. GIL은 Python에서 멀티코어 CPU를 효율적으로 사용하는 데 큰 장애물이 되어왔습니다. 이 PEP는 GIL 없이 Python 코드를 실행하고 인터프리터를 스레드-안전(thread-safe)하게 만들기 위해 필요한 변경 사항을 포함하는 빌드 구성(`--disable-gil`)을 CPython에 추가할 것을 제안합니다.

### 동기 (Motivation)

GIL은 동시성(concurrency)에 있어 주요한 장애물입니다. 과학 계산 작업의 경우, 프로세서 사이클 대부분이 최적화된 CPU 또는 GPU 커널에서 사용되기 때문에 Python 코드 실행 속도보다 이러한 동시성 부족이 더 큰 문제가 됩니다. GIL은 다른 스레드가 Python 코드를 호출할 때 진행을 방해할 수 있는 전역 병목 현상을 초래합니다. 현재 CPython에서 병렬성을 구현하는 방법들이 있지만, 상당한 제약이 따릅니다.

이 섹션은 GIL이 과학 계산, 특히 AI/ML 워크로드에 미치는 영향에 중점을 두지만, GIL은 다른 Python 사용자에게도 영향을 미칩니다.

#### GIL은 다양한 유형의 병렬성 표현을 어렵게 만듭니다 (The GIL Makes Many Types of Parallelism Difficult to Express)

신경망 기반 AI 모델은 병렬화를 위한 여러 기회를 제공합니다. 예를 들어, 개별 연산은 내부적으로 병렬화될 수 있고("intra-operator"), 여러 연산이 동시에 실행될 수 있으며("inter-operator"), 요청(여러 연산에 걸쳐) 또한 병렬화될 수 있습니다. 효율적인 실행을 위해서는 여러 유형의 병렬성을 활용해야 합니다.

GIL은 inter-operator 병렬성 및 일부 형태의 요청 병렬성을 Python에서 효율적으로 표현하기 어렵게 만듭니다. 다른 프로그래밍 언어에서는 시스템이 스레드를 사용하여 신경망의 다른 부분을 별도의 CPU 코어에서 실행할 수 있지만, Python에서는 GIL 때문에 비효율적입니다. 마찬가지로, 지연 시간에 민감한 추론 워크로드는 스레드를 사용하여 요청 전반에 걸쳐 병렬화하지만, Python에서는 동일한 스케일링 병목 현상에 직면합니다.

강화 학습(reinforcement learning)에서 GIL이 병렬성 활용에 제기하는 문제는 자주 발생합니다. DeepMind의 소프트웨어 엔지니어 Manuel Kroiss는 GIL로 인한 병목 현상 때문에 Python 코드베이스를 C++로 재작성하게 되어 코드 접근성이 낮아진다고 설명합니다. Dose-3D 프로젝트의 Paweł Jurgielewicz는 GIL로 인한 스케일링 문제와 GIL이 없는 Python 포크(fork)를 사용하여 프로젝트가 단순화된 경험을 공유합니다. CellProfiler의 저자인 Allen Goodman은 GIL이 생물학적 방법론 연구를 Python에서 더 어렵게 만든다고 언급합니다.

#### GIL은 Python 라이브러리 사용성에 영향을 미칩니다 (The GIL Affects Python Library Usability)

GIL은 멀티스레드 병렬성을 제한하는 CPython 구현 세부 사항이지만, 이를 사용성 문제로 생각하는 것은 직관적이지 않을 수 있습니다. 그러나 라이브러리 개발자들은 성능에 매우 신경 쓰며, GIL을 우회하는 API를 설계하는 경우가 많습니다. 이러한 우회책은 종종 사용하기 더 어려운 API로 이어집니다. 결과적으로, 이러한 API 사용자들은 GIL을 단순히 성능 문제가 아닌 사용성 문제로 인식할 수 있습니다.

예를 들어, PyTorch는 데이터 입력 파이프라인을 구축하기 위한 `DataLoader`라는 `multiprocessing` 기반 API를 노출합니다. 이는 리눅스에서 `fork()`를 사용하는데, 일반적으로 `spawn()`보다 빠르고 메모리를 덜 사용하지만, GPU에 접근한 후 `DataLoader`를 생성하면 혼란스러운 CUDA 오류로 이어질 수 있습니다. scikit-learn 개발자인 Olivier Grisel은 scikit-learn 관련 라이브러리에서 GIL을 우회해야 하는 것이 사용자 경험을 더 복잡하고 혼란스럽게 만든다고 설명합니다. NumPy 및 SciPy 관리자인 Ralf Gommers는 GIL이 NumPy 및 수치 Python 라이브러리의 사용자 경험에 어떻게 영향을 미치는지 설명하며, GIL이 없었다면 API 및 설계 결정 조정이 훨씬 쉽고 더 나았을 것이라고 말합니다.

#### GPU 집약적 워크로드는 멀티코어 처리를 요구합니다 (GPU-Heavy Workloads Require Multi-Core Processing)

많은 고성능 컴퓨팅(HPC) 및 AI 워크로드는 GPU를 많이 사용합니다. 이러한 애플리케이션은 계산의 대부분이 GPU에서 실행되더라도 효율적인 멀티코어 CPU 실행을 자주 필요로 합니다.

PyTorch 핵심 개발자인 Zachary DeVito는 대부분의 계산이 Python 외부에서 수행되더라도 GIL이 멀티스레드 스케일링을 비효율적으로 만든다고 설명합니다. GIL 때문에 단일 프로세스 대신 72개의 프로세스를 사용하게 되는 경우가 있으며, 이는 로깅, 디버깅, 성능 튜닝을 훨씬 더 어렵게 만들어 개발자 생산성을 저하시킵니다.

GPU 집약적인 워크로드조차도 CPU 집약적인 구성 요소를 자주 가집니다. 예를 들어, 컴퓨터 비전 작업은 일반적으로 이미지 디코딩, 자르기, 크기 조정과 같은 데이터 입력 파이프라인에서 여러 "전처리" 단계를 필요로 합니다. 이러한 작업은 일반적으로 CPU에서 수행되며 Pillow 또는 Pillow-SIMD와 같은 Python 라이브러리를 사용할 수 있습니다. GPU에 데이터를 지속적으로 공급하려면 데이터 입력 파이프라인을 여러 CPU 코어에서 실행해야 합니다.

#### GIL은 Python AI 모델 배포를 어렵게 만듭니다 (The GIL Makes Deploying Python AI Models Difficult)

Python은 신경망 기반 AI 모델 개발에 널리 사용됩니다. PyTorch에서는 모델이 종종 멀티스레드, 주로 C++ 환경의 일부로 배포됩니다. GIL이 전역 병목 현상이 될 수 있기 때문에 Python은 종종 회의적인 시선으로 보입니다. 대부분의 계산이 GIL이 해제된 상태에서 Python "외부"에서 발생하더라도 효율적인 스케일링을 방해할 수 있기 때문입니다.

PyTorch는 GIL을 피하거나 우회하는 여러 메커니즘을 제공하지만, 이들 모두 상당한 제약이 따릅니다. 예를 들어, TorchScript는 C++에서 Python 의존성 없이 실행될 수 있는 모델 표현을 캡처하지만, Python의 제한된 부분 집합만 지원하며 모델 코드의 일부를 다시 작성해야 하는 경우가 많습니다.

#### 동기 요약 (Motivation Summary)

Python의 GIL은 많은 과학 및 수치 계산 애플리케이션에서 최신 멀티코어 CPU를 효율적으로 사용하기 어렵게 만듭니다. Heinrich Kuttler, Manuel Kroiss, Paweł Jurgielewicz는 Python의 멀티스레드 구현이 작업에 잘 스케일링되지 않았고, 여러 프로세스를 사용하는 것이 적절한 대안이 아니었음을 발견했습니다.

스케일링 병목 현상은 핵심 수치 작업에만 국한되지 않습니다. Zachary DeVito와 Paweł Jurgielewicz 모두 Python에서의 조정 및 통신 문제에 대해 설명했습니다.

Olivier Grisel, Ralf Gommers, Zachary DeVito는 GIL에 대한 현재의 우회책이 "유지 보수하기 복잡하다"며 "개발자 생산성을 저하시킨다"고 설명했습니다. GIL은 과학 및 수치 계산 라이브러리 개발 및 유지 보수를 더 어렵게 만들 뿐만 아니라 사용하기 더 어려운 라이브러리 디자인으로 이어집니다.

### 명세 (Specification)

#### 빌드 구성 변경 (Build Configuration Changes)

GIL은 CPython 빌드 및 python.org 다운로드에서 계속 기본값으로 유지됩니다. `--disable-gil`이라는 새로운 빌드 구성 플래그가 `configure` 스크립트에 추가되어, GIL 없이 실행을 지원하고 인터프리터를 스레드-안전하게 만드는 데 필요한 변경 사항을 포함하는 CPython을 빌드하게 됩니다.

`--disable-gil`로 빌드되면, CPython은 `Python/patchlevel.h`에 `Py_GIL_DISABLED` 매크로를 정의합니다. ABI 태그에는 "t"(threading) 문자가 포함됩니다.

`--disable-gil`로 빌드된 CPython은 런타임에 GIL이 활성화된 상태로 선택적으로 실행되는 것을 여전히 지원합니다.

#### CPython 변경 사항 개요 (Overview of CPython Changes)

GIL을 제거하려면 CPython 내부적으로 상당한 변경이 필요하지만, 공개 Python 및 C API에는 상대적으로 적은 변경만 필요합니다. 이 섹션은 CPython 구현에 필요한 변경 사항과 제안된 API 변경 사항을 설명합니다.

구현 변경 사항은 다음 네 가지 범주로 분류할 수 있습니다.
- 참조 카운팅 (Reference counting)
- 메모리 관리 (Memory management)
- 컨테이너 스레드-안전성 (Container thread-safety)
- 락 및 아토믹 API (Locking and atomic APIs)

#### 참조 카운팅 (Reference Counting)

GIL 제거는 CPython의 참조 카운팅 구현을 스레드-안전하게 만들기 위해 변경이 필요합니다. 또한, 낮은 실행 오버헤드를 가지며 여러 스레드에서 효율적으로 스케일링될 수 있어야 합니다. 이 PEP는 이러한 제약 조건을 해결하기 위해 세 가지 기술의 조합을 제안합니다. 첫째는 일반적인 비-아토믹(non-atomic) 참조 카운팅에서 바이어스드 참조 카운팅(biased reference counting)으로의 전환입니다. 이는 일반적인 아토믹 참조 카운팅보다 실행 오버헤드가 낮은 스레드-안전 참조 카운팅 기술입니다. 다른 두 가지 기술은 불멸화(immortalization)와 제한된 형태의 지연 참조 카운팅(deferred reference counting)입니다. 이들은 일부 참조 카운트 수정을 피함으로써 참조 카운팅과 관련된 멀티스레드 스케일링 문제를 해결합니다.

**바이어스드 참조 카운팅 (Biased Reference Counting)**

바이어스드 참조 카운팅(BRC)은 대부분의 객체가 멀티스레드 프로그램에서도 단일 스레드에 의해서만 접근된다는 관찰에 기반합니다. 각 객체는 소유 스레드(객체를 생성한 스레드)와 연결됩니다. 소유 스레드로부터의 참조 카운팅 작업은 비-아토믹 명령어를 사용하여 "로컬(local)" 참조 카운트를 수정합니다. 다른 스레드는 아토믹 명령어를 사용하여 "공유(shared)" 참조 카운트를 수정합니다. 이 설계는 현대 프로세서에서 비용이 많이 드는 많은 아토믹 읽기-수정-쓰기(read-modify-write) 작업을 피합니다.

제안된 `PyObject` 구조체는 다음과 같습니다.

```c
struct _object {
    _PyObject_HEAD_EXTRA
    uintptr_t ob_tid;       // owning thread id (4-8 bytes)
    uint16_t __padding;     // reserved for future use (2 bytes)
    PyMutex ob_mutex;       // per-object mutex (1 byte)
    uint8_t ob_gc_bits;     // GC fields (1 byte)
    uint32_t ob_ref_local;  // local reference count (4 bytes)
    Py_ssize_t ob_ref_shared; // shared reference count and state bits (4-8 bytes)
    PyTypeObject *ob_type;
};
```
`ob_tid`, `ob_ref_local`, `ob_ref_shared`는 바이어스드 참조 카운팅 구현에 사용됩니다. `ob_gc_bits` 필드는 이전에 `PyGC_Head`에 저장되었던 가비지 컬렉션 플래그를 저장하는 데 사용됩니다. `ob_mutex` 필드는 1바이트 크기의 객체당 락을 제공합니다.

**불멸화 (Immortalization)**

인턴(interned)된 문자열, 작은 정수, 정적으로 할당된 `PyTypeObject`, `True`, `False`, `None` 객체와 같은 일부 객체는 프로그램 수명 동안 유지됩니다. 이러한 객체는 로컬 참조 카운트 필드(`ob_ref_local`)를 `UINT32_MAX`로 설정하여 불멸(immortal)로 표시됩니다.

`Py_INCREF` 및 `Py_DECREF` 매크로는 불멸 객체에 대해 아무 작업도 하지 않습니다. 이는 여러 스레드가 이러한 객체에 동시에 접근할 때 참조 카운트 필드에서 발생하는 경합(contention)을 피합니다.

**지연 참조 카운팅 (Deferred Reference Counting)**

최상위 함수, 코드 객체, 모듈, 메서드와 같은 일부 유형의 객체는 많은 스레드에서 동시에 자주 접근되는 경향이 있습니다. 이 객체들은 반드시 프로그램 수명 동안 존재하지는 않으므로 불멸화는 적합하지 않습니다. 이 PEP는 멀티스레드 프로그램에서 이러한 객체의 참조 카운트 필드에 대한 경합을 피하기 위해 제한된 형태의 지연 참조 카운팅을 제안합니다.

일반적으로 인터프리터는 객체가 인터프리터 스택에 푸시되거나 팝될 때 객체의 참조 카운트를 수정합니다. 인터프리터는 지연 참조 카운팅을 사용하는 객체에 대해서는 이러한 참조 카운팅 작업을 건너뜁니다. 지연 참조 카운팅을 지원하는 객체는 로컬 참조 카운트 필드에서 가장 중요한 두 비트를 1로 설정하여 표시됩니다.

일부 참조 카운팅 작업이 건너뛰어지기 때문에, 참조 카운트 필드는 더 이상 이 객체에 대한 실제 참조 수를 반영하지 않습니다. 실제 참조 카운트는 참조 카운트 필드와 각 스레드의 인터프리터 스택에서 건너뛴 참조 수를 합한 것입니다. 실제 참조 카운트는 순환 가비지 컬렉션(cyclic garbage collection) 중에 모든 스레드가 일시 중지될 때만 안전하게 계산될 수 있습니다. 결과적으로, 지연 참조 카운팅을 사용하는 객체는 가비지 컬렉션 주기 동안에만 할당 해제될 수 있습니다.

#### 메모리 관리 (Memory Management)

CPython은 현재 작은 객체 할당에 최적화된 내부 할당자 `pymalloc`을 사용합니다. `pymalloc` 구현은 GIL이 없으면 스레드-안전하지 않습니다. 이 PEP는 `pymalloc`을 `mimalloc`으로 대체할 것을 제안합니다. `mimalloc`은 작은 할당을 포함하여 성능이 좋은 범용 스레드-안전 할당자입니다.

`mimalloc`을 일부 수정하여 사용하는 것은 GIL 제거와 관련된 두 가지 다른 문제도 해결합니다. 첫째, 내부 `mimalloc` 구조를 순회하면 가비지 컬렉터가 링크드 리스트를 유지하지 않고도 모든 Python 객체를 찾을 수 있습니다. 둘째, `mimalloc` 힙(heap)과 크기 클래스(size class) 기반 할당은 `dict`와 같은 컬렉션이 읽기 전용 작업 중에는 일반적으로 락(lock)을 획득하는 것을 피할 수 있게 합니다.

#### 가비지 컬렉션 (사이클 컬렉션) (Garbage Collection (Cycle Collection))

CPython 가비지 컬렉터는 이 제안과 함께 작동하기 위해 다음 변경 사항을 요구합니다.
- 이전에 GIL이 제공했던 스레드-안전성 보장을 제공하기 위해 "stop-the-world" 사용.
- 세대별(generational) 가비지 컬렉션 대신 비-세대별(non-generational) 컬렉터 사용.
- 지연 참조 카운팅 및 바이어스드 참조 카운팅과의 통합.

**Stop-the-World**

CPython 사이클 가비지 컬렉터는 현재 GIL에 의존하여 컬렉터가 사이클을 찾는 동안 다른 스레드가 Python 객체에 접근하는 것을 막습니다. GIL은 사이클 찾기 루틴 동안 절대 해제되지 않으므로, 컬렉터는 해당 루틴 동안 안정적인(즉, 변하지 않는) 참조 카운트 및 참조에 의존할 수 있습니다. 그러나 사이클 감지 후, 객체의 파이널라이저(finalizer) 및 `clear`(`tp_clear`) 함수를 호출하는 동안 GIL이 일시적으로 해제되어 다른 스레드가 교대로 실행될 수 있습니다.

GIL 없이 실행할 때, 구현은 사이클 감지 중에 참조 카운트가 안정적으로 유지되도록 보장하는 방법이 필요합니다. 참조 및 참조 카운트가 안정적으로 유지되도록 Python 코드를 실행하는 스레드는 일시 중지되어야 합니다. 사이클이 식별되면 다른 스레드는 다시 시작됩니다.

**세대 (Generations)**

기존 Python 가비지 컬렉터는 세 가지 세대(generation)를 사용합니다. GIL 없이 컴파일할 때 가비지 컬렉터는 단일 세대만 사용합니다(즉, 비-세대별이 됩니다). 이 변경의 주된 이유는 멀티스레드 애플리케이션에서 stop-the-world 일시 중지(pause)의 영향을 줄이기 위함입니다.

#### 컨테이너 스레드-안전성 (Container Thread-Safety)

CPython에서 GIL은 여러 스레드가 동시에 Python 객체에 접근하거나 수정할 때 내부 인터프리터 상태의 손상을 방지합니다. 예를 들어, 여러 스레드가 동시에 동일한 `list`를 수정하는 경우, GIL은 `list`의 길이(`ob_size`)가 요소 수와 정확히 일치하고, 각 요소의 참조 카운트가 해당 요소에 대한 참조 수를 정확히 반영하도록 보장합니다. GIL이 없으면 — 다른 변경 사항이 없다면 — 동시 수정으로 인해 해당 필드가 손상되고 프로그램 충돌로 이어질 가능성이 높습니다.

이 PEP는 GIL이 제공하는 것과 동일한 보호의 많은 부분을 제공하기 위해 객체당 락(per-object locks)을 사용할 것을 제안합니다. 예를 들어, 모든 `list`, `dictionary`, `set`은 관련 경량 락을 가집니다. 객체를 수정하는 모든 작업은 객체의 락을 보유해야 합니다. 객체에서 읽는 대부분의 작업도 객체의 락을 획득해야 합니다. 락을 보유하지 않고 진행할 수 있는 몇 가지 읽기 작업은 아래에 설명되어 있습니다.

**빌린 참조 (Borrowed References)**

객체당 락은 GIL이 제공하는 중요한 보호의 많은 부분을 제공하지만, 몇 가지 경우에 충분하지 않습니다. 예를 들어, 빌린 참조(borrowed reference)를 "소유된(owned)" 참조로 업그레이드하는 데 의존하는 코드는 특정 상황에서 안전하지 않을 수 있습니다.

```c
PyObject *item = PyList_GetItem(list, idx);
Py_INCREF(item);
```
GIL은 접근과 `Py_INCREF` 호출 사이에 다른 스레드가 `list`를 수정하는 것을 막습니다. GIL이 없으면 — 객체당 락이 있어도 — 다른 스레드가 `list`를 수정하여 접근과 `Py_INCREF` 호출 사이에 `item`이 해제될 수 있습니다.

문제가 있는 빌린 참조 API는 "새로운 참조(new references)"를 반환하지만 그 외에는 동일한 함수로 보완됩니다.
- `PyList_GetItem` 대신 `PyList_FetchItem(list, idx)`
- `PyDict_GetItem` 대신 `PyDict_FetchItem(dict, key)`
- `PyWeakref_GetObject` 대신 `PyWeakref_FetchObject`

**Python 임계 영역 (Python Critical Sections)**

단순한 객체당 락킹은 GIL과 함께 실행할 때는 존재하지 않던 교착 상태(deadlock)를 유발할 수 있습니다. Python 작업은 중첩될 수 있기 때문에 스레드는 여러 객체에 대한 락을 동시에 보유할 수 있습니다. 이 PEP는 교착 상태를 피하기 위해 객체당 락을 암시적으로 해제하는 "Python 임계 영역(Python critical sections)"이라는 방식을 제안합니다.

제안된 Python 임계 영역을 위한 API는 다음 네 가지 매크로입니다.
- `Py_BEGIN_CRITICAL_SECTION(PyObject *op);`
- `Py_END_CRITICAL_SECTION;`
- `Py_BEGIN_CRITICAL_SECTION2(PyObject *a, PyObject *b);`
- `Py_END_CRITICAL_SECTION2;`

**낙관적 락 회피 (Optimistically Avoiding Locking)**

`dict` 및 `list`의 몇 가지 연산은 낙관적으로(optimistically) 객체당 락을 획득하는 것을 피합니다. 이들은 락을 획득하지 않는 빠른 경로(fast path) 연산을 가지지만, 다른 스레드가 해당 컨테이너를 동시에 수정하는 경우에는 `dictionary` 또는 `list`의 락을 획득하는 느린 경로(slow path) 연산으로 대체될 수 있습니다.

낙관적인 빠른 경로를 가진 연산은 다음과 같습니다.
- `PyDict_FetchItem`/`GetItem` 및 `dict.__getitem__`
- `PyList_FetchItem`/`GetItem` 및 `list.__getitem__`

또한, `dict` 및 `list`의 이터레이터(iterator)는 위 함수를 사용하므로 다음 항목을 반환할 때 낙관적으로 락을 피합니다.

### 근거 (Rationale)

#### 비-세대별 가비지 컬렉션 (Non-Generational Garbage Collection)

이 PEP는 (GIL 없이 CPython을 빌드할 때) 세대별 순환 가비지 컬렉터에서 비-세대별 컬렉터로 전환할 것을 제안합니다. 이는 하나의 세대("오래된" 세대)만 갖는 것과 동일합니다. 이 변경이 제안된 데에는 두 가지 이유가 있습니다.

순환 가비지 컬렉션은 젊은 세대(young generation)에 대해서만이라도 프로그램의 다른 스레드를 일시 중지해야 합니다. 저자는 젊은 세대의 잦은 컬렉션이 멀티스레드 프로그램에서 효율적인 스케일링을 방해할 것을 우려합니다.

세대별 가비지 컬렉션은 다른 많은 언어 런타임에서 효과적으로 사용됩니다. 그러나 참조 카운팅을 사용하는 CPython에서는 대부분의 객체가 여전히 젊을 때 죽지만, 참조 카운트가 0이 되면 수집됩니다. 가비지 컬렉션 주기까지 살아남은 객체는 계속 살아남을 가능성이 높습니다. 이러한 차이로 인해 세대별 컬렉션은 다른 언어 런타임보다 CPython에서 훨씬 덜 효과적입니다.

#### `dict` 및 `list` 접근에서 낙관적 락 회피 (Optimistic Avoiding Locking in dict and list Accesses)

이 제안은 `list` 및 `dictionary`의 개별 요소에 접근할 때 대부분 락 획득을 피하는 방식에 의존합니다. 이는 "lock-free" 및 "wait-free" 알고리즘처럼 전진 진행을 보장하는 의미의 "lock free"는 아닙니다. 단순히 일반적인 경우에 락(뮤텍스) 획득을 피하여 병렬성을 개선하고 오버헤드를 줄입니다.

훨씬 간단한 대안은 `reader-writer locks`를 사용하여 `dictionary` 및 `list` 접근을 보호하는 것입니다. 그러나 `reader-writer locks`는 상당한 오버헤드와 낮은 확장성을 가집니다. 특히 단일 요소 `dictionary` 및 `list` 접근과 같이 임계 영역이 작을 때 그렇습니다.

이 PEP에 설명된 기술은 RCU("read-copy-update") 및 (더 적은 정도로) hazard pointers와 관련이 있습니다. 이들은 동시적이며 읽기가 많은(read-mostly) 데이터 구조를 최적화하기 위한 잘 알려진 두 가지 방식입니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 `--disable-gil` 플래그로 CPython을 빌드할 때 여러 가지 하위 호환성 문제를 야기하지만, 이러한 문제는 기본 빌드 구성에서는 발생하지 않습니다. 거의 모든 하위 호환성 문제는 C-API와 관련이 있습니다.

- GIL 없이 빌드된 CPython은 바이어스드 참조 카운팅을 지원하기 위해 필요한 Python 객체 헤더 변경으로 인해 표준 CPython 빌드 또는 안정적인 ABI와 ABI 호환되지 않습니다. C-API 확장 모듈은 이 버전에 맞춰 특별히 다시 빌드해야 합니다.
- C 코드에서 전역 상태 또는 객체 상태를 보호하기 위해 GIL에 의존하는 C-API 확장 모듈은 GIL 없이 실행될 때 스레드-안전성을 유지하기 위해 추가적인 명시적 락킹이 필요합니다.
- GIL 없이 안전하지 않은 방식으로 빌린 참조를 사용하는 C-API 확장 모듈은 빌린 참조가 아닌 새로운 참조를 반환하는 동등한 새 API를 사용해야 합니다.
- 사용자 정의 메모리 할당자(`PyMem_SetAllocator`)는 실제 할당을 이전에 설정된 할당자에게 위임해야 합니다.
- Python 객체는 `PyType_GenericNew` 또는 `PyObject_Malloc`과 같은 표준 API를 통해 할당되어야 합니다. 비-Python 객체는 이러한 API를 통해 할당되어서는 안 됩니다.

Python 코드에는 잠재적인 하위 호환성 문제가 더 적습니다.
- 코드 객체 및 최상위 함수 객체에 대한 소멸자(destructor) 및 약한 참조 콜백(weak reference callbacks)은 지연 참조 카운팅 사용으로 인해 다음 순환 가비지 컬렉션까지 지연됩니다.
- 여러 스레드에 의해 접근되는 일부 객체의 소멸자는 바이어스드 참조 카운팅으로 인해 약간 지연될 수 있습니다.

### 배포 (Distribution)

이 PEP는 Python 배포에 새로운 과제를 제시합니다. 적어도 한동안은 별도로 컴파일된 C-API 확장 모듈을 요구하는 두 가지 버전의 Python이 존재할 것입니다. C-API 확장 개발자들이 `--disable-gil` 호환 패키지를 빌드하여 PyPI에 업로드하는 데 시간이 걸릴 수 있습니다. 또한, 일부 개발자들은 `--disable-gil` 모드가 널리 채택될 때까지 지원을 주저할 수 있지만, 채택은 Python의 풍부한 확장 모음의 가용성에 달려있을 것입니다.

이를 완화하기 위해 저자는 Anaconda와 협력하여 `--disable-gil` 버전의 Python과 conda 채널의 호환 패키지를 배포할 것입니다.

### 성능 (Performance)

GIL 없이 CPython을 스레드-안전하게 만들기 위한 변경 사항은 `--disable-gil` 빌드에서 실행 오버헤드를 증가시킵니다. 성능 영향은 단일 스레드만 사용하는 프로그램과 여러 스레드를 사용하는 프로그램에서 다르므로, 아래 표는 이러한 유형의 프로그램에 대해 실행 오버헤드를 별도로 보고합니다.

**pyperformance 1.0.6에서의 실행 오버헤드**
|              | Intel Skylake | AMD Zen 3 |
|--------------|---------------|-----------|
| 단일 스레드  | 6%            | 5%        |
| 멀티 스레드  | 8%            | 7%        |

오버헤드 측정에 사용된 기준선은 Python 3.12의 불멸 객체를 구현한 PR 19474의 018be4c입니다. 실행 오버헤드에 가장 큰 기여를 하는 것은 바이어스드 참조 카운팅이며, 그 다음은 객체당 락킹입니다. 스레드-안전성 때문에 여러 스레드를 사용하여 실행되는 애플리케이션은 주어진 바이트코드를 한 번만 특수화합니다. 이 때문에 여러 스레드를 사용하는 프로그램의 오버헤드가 단일 스레드만 사용하는 프로그램보다 큽니다. 그러나 GIL이 비활성화되면 여러 스레드를 사용하는 프로그램은 여러 CPU 코어를 더 효과적으로 사용할 수 있어야 합니다.

이 PEP는 기본(비 `--disable-gil`) CPython 빌드의 성능에는 영향을 미치지 않습니다.

### 향후 교육 방안 (How to Teach This)

`--disable-gil` 모드 구현의 일환으로, 저자는 GIL 없이 Python을 실행할 때 패키지를 호환 가능하게 만드는 "HOWTO" 가이드를 작성할 것입니다.

### 참고 구현 (Reference Implementation)

GIL 없는 CPython 버전을 구현하는 두 개의 GitHub 저장소가 있습니다.
- `https://github.com/colesbury/nogil-3.12`
- `https://github.com/colesbury/nogil`

### 대안 (Alternatives)

Python은 현재 병렬성을 가능하게 하는 여러 방법을 지원하지만, 기존 기술에는 상당한 제약이 따릅니다.

#### Multiprocessing (멀티프로세싱)

`multiprocessing` 라이브러리는 Python 프로그램이 Python 서브프로세스를 시작하고 통신할 수 있도록 합니다. 각 서브프로세스가 자체 Python 인터프리터를 가지므로(즉, 프로세스당 하나의 GIL), 병렬성을 허용합니다. `multiprocessing`에는 몇 가지 중요한 제약이 있습니다. 프로세스 간 통신이 제한적이며, 객체는 일반적으로 직렬화되거나 공유 메모리로 복사되어야 합니다. 이는 오버헤드를 발생시키고 `multiprocessing` 위에 API를 구축하는 것을 복잡하게 만듭니다.

#### C-API 확장 모듈에서 GIL 해제 (Releasing the GIL in C-API Extensions)

C-API 확장 모듈은 오랜 시간 실행되는 함수 주변에서 GIL을 해제할 수 있습니다. 이는 GIL이 해제될 때 여러 스레드가 동시에 실행될 수 있으므로 어느 정도의 병렬성을 허용하지만, GIL을 획득하고 해제하는 오버헤드 때문에 일반적으로 몇 개의 스레드 이상으로 효율적으로 스케일링되지 못합니다.

#### 내부 병렬화 (Internal Parallelization)

C로 구현된 함수는 내부적으로 여러 스레드를 사용할 수 있습니다. 예를 들어, Intel의 NumPy 배포판, PyTorch, TensorFlow는 모두 이 기술을 사용하여 개별 연산을 내부적으로 병렬화합니다. 기본 연산이 효율적으로 병렬화될 만큼 충분히 클 때 잘 작동하지만, 작고 많은 연산이 있거나 연산이 일부 Python 코드에 의존하는 경우에는 그렇지 않습니다. C에서 Python을 호출하려면 GIL을 획득해야 합니다. 짧은 Python 코드 조각이라도 스케일링을 방해할 수 있습니다.

### 관련 작업 (Related Work)

#### 인터프리터별 GIL (Per-Interpreter GIL)

최근 승인된 PEP 684는 멀티코어 병렬성 문제를 해결하기 위해 인터프리터별 GIL을 제안합니다. 이는 동일한 프로세스 내에서 인터프리터 간의 병렬성을 허용하지만, 인터프리터 간에 Python 데이터를 공유하는 데 상당한 제약을 둡니다. 이 PEP와 PEP 684는 모두 멀티코어 병렬성 문제를 다루지만, 서로 다른 절충점과 기술을 사용합니다. 두 PEP를 CPython에서 동시에 구현하는 것은 가능합니다.

#### Gilectomy

Gilectomy는 CPython에서 GIL을 제거하기 위한 Larry Hastings의 프로젝트였습니다. 이 PEP에서 제안하는 설계와 마찬가지로 Gilectomy는 동일한 인터프리터 내에서 여러 스레드가 병렬로 실행되는 것을 지원했으며(즉, "자유 스레딩"), 세분화된 락킹(fine-grained locking)을 사용했습니다. 이 PEP의 참조 구현은 Gilectomy에 비해 단일 스레드 성능과 확장성을 개선했습니다.

### 채택되지 않은 아이디어 (Rejected Ideas)

#### 동시 가비지 컬렉터는 왜 사용하지 않는가? (Why Not Use a Concurrent Garbage Collector?)

많은 최신 가비지 컬렉터는 대부분 동시적입니다. 즉, 가비지 컬렉터가 애플리케이션과 동시에 실행되도록 허용하여 긴 stop-the-world 일시 중지를 피합니다. 그렇다면 동시 컬렉터를 사용하지 않는 이유는 무엇일까요?

동시 컬렉션은 쓰기 장벽(write barriers) 또는 읽기 장벽(read barriers)을 필요로 합니다. 저자는 C-API를 실질적으로 손상시키지 않고 CPython에 쓰기 장벽을 추가하는 방법을 알지 못합니다.

#### `PyDict_GetItem`을 `PyDict_FetchItem`으로 대체하여 폐기하지 않는 이유는 무엇인가? (Why Not Deprecate PyDict_GetItem in Favor of PyDict_FetchItem ?)

이 PEP는 `PyDict_GetItem`과 유사하지만 빌린 참조 대신 새로운 참조를 반환하는 `PyDict_FetchItem`이라는 새로운 API를 제안합니다. 이 PEP는 `PyDict_GetItem` 및 빌린 참조를 반환하는 유사한 함수를 폐기(deprecate)하지 않을 것을 제안합니다. 그 이유는 다음과 같습니다.
- 빌린 참조의 많은 사용은 GIL 없이 실행할 때도 안전합니다.
- 초기에는 이 접근 방식을 시도했지만, `PyDict_GetItem`을 `PyDict_FetchItem`으로 전면적으로 대체하면 새로운 참조 카운팅 버그가 자주 발생한다는 것을 발견했습니다.

### 미해결 문제 (Open Issues)

#### 개선된 특수화 (Improved Specialization)

Python 3.11 릴리스는 더 빠른 CPython 프로젝트의 일환으로 퀵닝(quickening) 및 특수화(specialization)를 도입하여 성능을 크게 향상시켰습니다. 특수화는 느린 바이트코드 명령어를 더 빠른 변형으로 대체합니다. 스레드-안전성을 유지하기 위해 (GIL 없이 실행되는) 여러 스레드를 사용하는 애플리케이션은 각 바이트코드를 한 번만 특수화하여 일부 프로그램에서 성능을 저하시킬 수 있습니다. 여러 번 특수화를 지원하는 것이 가능하지만, 더 많은 조사가 필요하며 이 PEP의 일부는 아닙니다.

#### Python 빌드 모드 (Python Build Modes)

이 PEP는 표준 빌드 모드와 ABI 호환되지 않는 새로운 빌드 모드(`--disable-gil`)를 도입합니다. 추가적인 빌드 모드는 Python 핵심 개발자와 확장 개발자 모두에게 복잡성을 더합니다. 저자는 이러한 빌드 모드를 결합하고 런타임에 전역 인터프리터 락을 제어하며, 가능하면 기본적으로 비활성화하는 것이 가치 있는 목표라고 생각합니다. 이 목표로 가는 경로는 여전히 미해결 문제이지만, 가능한 경로는 다음과 같습니다.
- 2024년, CPython 3.13은 `--disable-gil` 빌드 시간 플래그를 지원하여 출시됩니다. CPython에는 GIL이 있는 버전과 없는 버전이라는 두 가지 ABI가 있습니다. 확장 개발자는 두 ABI를 모두 대상으로 합니다.
- 2~3개 릴리스 후(예: 2026~2027년), CPython은 런타임 환경 변수 또는 플래그로 GIL이 제어되는 버전으로 출시됩니다. GIL은 기본적으로 활성화됩니다. 단일 ABI만 존재합니다.
- 다시 2~3개 릴리스 후(예: 2028~2030년), CPython은 GIL이 기본적으로 비활성화된 버전으로 전환됩니다. GIL은 환경 변수 또는 명령줄 플래그를 통해 런타임에 여전히 활성화될 수 있습니다.

이 PEP는 첫 번째 단계를 다루며, 나머지 단계는 미해결 문제로 남겨둡니다.

#### 단일 스레드 성능 완화 (Mitigations for Single-Threaded Performance)

이 PEP에서 제안된 변경 사항은 GIL이 있는 Python 빌드에 비해 `--disable-gil` 빌드에서 실행 오버헤드를 증가시킬 것입니다. 즉, 단일 스레드 성능이 느려질 것입니다. 실행 오버헤드를 줄이기 위한 몇 가지 가능한 최적화가 있습니다. 특히 단일 스레드만 사용하는 `--disable-gil` 빌드의 경우 더욱 그렇습니다. 더 장기적인 목표가 단일 빌드 모드를 갖는 것이라면 이러한 최적화가 가치 있을 수 있지만, 최적화 선택과 그 절충점은 여전히 미해결 문제입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.