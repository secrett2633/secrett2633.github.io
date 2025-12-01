---
title: "[Withdrawn] PEP 3146 - Merging Unladen Swallow into CPython"
excerpt: "Python Enhancement Proposal 3146: 'Merging Unladen Swallow into CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3146/
toc: true
toc_sticky: true
date: 2025-09-27 14:38:28+0900
last_modified_at: 2025-09-27 14:38:28+0900
published: true
---
> **원문 링크:** [PEP 3146 - Merging Unladen Swallow into CPython](https://peps.python.org/pep-3146/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 01-Jan-2010


## PEP 3146 – Unladen Swallow을 CPython으로 통합하기 (철회됨)

**작성자:** Collin Winter, Jeffrey Yasskin, Reid Kleckner
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2010년 1월 1일
**Python 버전:** 3.3

### PEP 철회

Unladen Swallow 프로젝트가 중단됨에 따라, 이 PEP는 철회된 것으로 간주됩니다.

### 개요 (Abstract)

이 PEP는 성능 향상에 중점을 둔 CPython의 오픈 소스 브랜치인 Unladen Swallow 프로젝트를 CPython의 소스 트리로 통합할 것을 제안했습니다. Unladen Swallow는 유효한 Python 2.6.4 애플리케이션 및 C 확장 모듈과 소스 호환성을 가졌습니다.

Unladen Swallow는 CPython에 Just-In-Time (JIT) 컴파일러를 추가하여, 선택된 Python 코드를 최적화된 머신 코드로 컴파일할 수 있도록 했습니다. 고전적인 정적 컴파일러 최적화를 넘어, Unladen Swallow의 JIT 컴파일러는 런타임에 수집된 데이터를 활용하여 코드 동작에 대한 검증된 가정을 세우고, 더 빠른 머신 코드를 생성할 수 있었습니다.

이 PEP는 Unladen Swallow를 CPython 개발 트리의 별도 `py3k-jit` 브랜치에 통합한 후, 궁극적으로 메인 `py3k` 브랜치와 병합하는 것을 목표로 했습니다. Unladen Swallow는 완성되거나 완벽하지는 않았지만, CPython 로드맵에 통합될 만큼 충분한 성숙도에 도달했다고 판단되었습니다.

### 제안 배경 및 구현 (Rationale, Implementation)

많은 기업과 개인은 Python이 더 빨라져서 더 많은 프로젝트에 활용되기를 원했습니다. Google도 그러한 회사 중 하나였습니다.

Unladen Swallow는 Google의 수많은 Python 라이브러리, 도구 및 애플리케이션의 성능을 향상시키기 위해 시작된 Google 후원의 CPython 브랜치였습니다. Unladen Swallow의 채택을 최대한 쉽게 만들기 위해, 프로젝트는 처음에는 네 가지 목표를 설정했습니다:
*   단일 스레드 코드에서 CPython 2.6.4 기준 대비 5배 성능 향상.
*   유효한 CPython 2.6 애플리케이션과 100% 소스 호환성.
*   유효한 CPython 2.6 C 확장 모듈과 100% 소스 호환성.
*   궁극적으로 CPython으로 다시 병합되도록 설계.

Unladen Swallow는 런타임에 피드백을 수집하고 이를 컴파일 시간 최적화에 활용하는 Just-In-Time (JIT) 컴파일러를 구현했습니다. 이는 최신 JavaScript 엔진, 대부분의 Java 가상 머신, Rubinius, MacRuby 등에서 채택된 접근 방식과 유사합니다.

핵심은 동적 언어가 이론적으로만 동적일 뿐, 실제로는 각 함수나 코드 조각이 상대적으로 정적이며 안정적인 유형 및 자식 함수 세트를 사용한다는 점입니다. CPython의 현재 바이트코드 인터프리터는 실행 중인 코드에 대해 최악의 경우를 가정합니다. Unladen Swallow는 사용자 코드의 이러한 상대적으로 정적인 특성을 활용하여 성능을 향상시켰습니다.

Unladen Swallow JIT 컴파일러는 함수의 CPython 바이트코드를 플랫폼별 머신 코드로 변환하며, 런타임에 수집된 데이터와 고전적인 컴파일러 최적화를 사용하여 생성된 머신 코드의 품질을 향상시켰습니다. 프로그램 실행에 실제로 도움이 되는 Python 코드만 컴파일하기 위해, 온라인 휴리스틱을 사용하여 특정 함수의 "핫니스(hotness)"를 평가했습니다. 함수의 핫니스 값이 특정 임계값을 넘으면 컴파일 및 최적화 대상으로 선택되었습니다. 함수가 핫하다고 판단되기 전까지는 표준 CPython `eval` 루프에서 실행되었으며, 이 루프는 실행된 각 바이트코드에 대한 흥미로운 데이터를 기록하도록 계측되었습니다. 이 런타임 데이터는 생성된 머신 코드의 유연성을 줄여 일반적인 경우(common case)에 대해 최적화할 수 있게 했습니다. 예를 들어, 다음 데이터를 수집했습니다:
*   브랜치(branch)가 실행되었는지 여부.
*   연산자에 사용된 타입.
*   각 호출 지점(callsite)에서 호출된 함수.

최적화 시 만들어진 가정이 더 이상 유효하지 않게 되면, 최적화된 머신 코드 실행을 중단하고 인터프리터로 돌아가 나머지 작업을 수행했습니다. 이를 위해 각 최적화된 머신 코드 섹션 앞에는 가드(guard)가 배치되었습니다.

코드 생성 및 최적화를 위해 LLVM이라는 기존 컴파일러 라이브러리 세트를 재사용했습니다. 이는 소규모 팀이 여러 머신 명령어 세트에서 코드 생성을 이해하고 디버깅하며, 많은 수의 고전적인 컴파일러 최적화를 구현해야 하는 부담을 덜어주었습니다.

Unladen Swallow는 단일 스레드, 순수 Python 코드의 성능 향상에 중점을 두었습니다. CPython의 Global Interpreter Lock (GIL)을 제거하려는 노력은 하지 않았습니다. 이는 Unladen Swallow의 작업과 별개이며, 민감한 문제이므로 메인라인 개발 브랜치에서 수행하는 것이 가장 좋다고 판단했습니다.

### 대안 (Alternatives)

Unladen Swallow 팀은 Python 성능 향상을 위한 여러 대안 전략을 고려했지만, 불만족스럽다고 판단했습니다.
*   **Cython, Shedskin** : 이들은 Python용 정적 컴파일러입니다. 런타임 데이터에 기반한 JIT 컴파일러가 고려하는 전체 코드 범위에 대해 최적화할 수 없다는 한계가 있었습니다.
*   **IronPython** : Microsoft의 .Net 플랫폼용 Python이며, 사실상 Windows 전용이어서 일반적인 CPython 대체제로 부적합했습니다.
*   **Jython** : Python 2.5의 완전한 구현이지만, Unladen Swallow보다 훨씬 느리고 CPython 확장 모듈을 지원하지 않아 대규모 애플리케이션 마이그레이션 비용이 너무 높았습니다.
*   **Psyco** : CPython용 특수화 JIT 컴파일러였지만, 32비트 전용이고 x86만 지원하며 유지보수가 매우 어려웠습니다.
*   **PyPy** : 숫자 코드에서는 좋은 성능을 보였지만, 일부 워크로드에서는 Unladen Swallow보다 느렸습니다. PyPy의 JIT 컴파일러는 32비트 x86 코드 생성만 지원하고, 중요한 모듈이 PyPy에 대해 빌드되지 않으며, CPython과 동일한 임베딩 API를 제공하지 않는 등의 문제가 있었습니다.
*   **PyV8** : V8 위에서 실행되는 실험적인 Python-to-JavaScript 컴파일러로, 전체 Python 언어를 구현하지 않았고 CPython 확장 모듈을 지원하지 않았습니다.
*   **WPython** : CPython 인터프리터 루프의 워드코드 기반 재구현으로, 인터프리터 성능에 미미한 개선을 제공했지만 JIT 컴파일러의 대안은 아니었습니다.

### 성능 (Performance)

Unladen Swallow는 합성 마이크로벤치마크부터 전체 애플리케이션 매크로벤치마크에 이르는 상당히 큰 벤치마크 스위트를 개발했습니다. 이 벤치마크들은 타사 기여자, Google의 내부 워크로드, 그리고 광범위한 Python 커뮤니티에서 널리 사용되는 도구 및 라이브러리(예: `django`, `2to3`, `spambayes`)에서 영감을 받았습니다.

#### CPython 2.6.4 대비 성능

벤치마크 결과는 Unladen Swallow가 CPython 2.6.4 대비 다양한 성능 향상을 보였음을 나타냅니다. 예를 들어, `django` 벤치마크는 32비트 환경에서 1.35배 빨라졌고, 64비트 환경에서는 `nbody` 벤치마크가 2.86배 빨라졌습니다. 그러나 `spambayes`와 같은 일부 벤치마크에서는 Unladen Swallow가 더 느리거나 성능 변화가 미미했습니다.

Unladen Swallow는 Python 함수를 머신 코드로 컴파일하기 위해 실행을 블록(block)하여 일부 벤치마크에서 성능 저하가 발생했습니다. 이는 `html5lib` 및 `rietveld` 벤치마크의 타임라인 그래프에서 볼 수 있으며, `2to3`의 전반적인 성능을 저하시켰습니다. 팀은 이 문제를 해결하기 위한 개발 브랜치를 운영했지만, CPython의 현재 스레딩 시스템의 제약으로 인해 예상보다 많은 시간과 노력이 필요했습니다. 이 문제는 `py3k` 브랜치로 최종 병합하는 데 있어 중요한 문제로 간주되었습니다.

초기 목표였던 5배 성능 향상은 달성하지 못했습니다. 이는 LLVM 작업에 예상보다 많은 노력이 필요했고, LLVM의 JIT 인프라에 존재하는 여러 치명적인 버그를 수정하는 데 시간을 할애했기 때문입니다.

#### 메모리 사용량 (Memory Usage)

Unladen Swallow는 CPython 2.6.4 대비 메모리 사용량이 증가했습니다. 예를 들어, 32비트 환경에서 `2to3`는 1.77배, `django`는 2.76배, `spambayes`는 6.32배 더 많은 메모리를 사용했습니다. 64비트 환경에서는 `spambayes`가 7.92배 더 많은 메모리를 사용했습니다.

이러한 메모리 사용량 증가는 LLVM 코드 생성, 분석 및 최적화 라이브러리, 네이티브 코드, LLVM의 메모리 사용량 문제 또는 누수, 머신 코드 최적화 및 생성을 위한 데이터 구조 등 여러 원인에서 비롯되었습니다. 메모리 사용량 감소는 최종 `py3k` 브랜치 병합을 위한 중요한 문제로 간주되었습니다.

#### 시작 시간 (Start-up Time)

LLVM의 코드 생성, 분석 및 최적화 라이브러리를 정적으로 링크(statically linking)하면서 Python 바이너리의 시작 시간이 증가했습니다. 예를 들어, `normal_startup` 벤치마크에서 CPython 대비 1.6배 느려졌고, `startup_nosite` 벤치마크에서는 2.5배 느려졌습니다. 시작 시간 개선은 Unladen Swallow의 병합 우선순위 목록에서 높은 순위를 차지했습니다.

#### 바이너리 크기 (Binary Size)

LLVM 라이브러리를 정적으로 링크함으로써 Python 바이너리의 크기가 크게 증가했습니다. CPython 2.6.4와 3.1.1이 각각 1.3MB 및 1.4MB (32비트)였던 것에 비해, Unladen Swallow r1041은 12MB (32비트 및 64비트)로 증가했습니다. 이는 LLVM의 코드 생성, 분석 및 최적화 라이브러리를 정적으로 링크하기 때문이며, LLVM이 공유 라이브러리(shared linking)를 더 잘 지원하도록 수정하면 해결될 수 있는 문제로 보았습니다.

### 정확성 및 호환성 (Correctness and Compatibility)

Unladen Swallow의 정확성 테스트 스위트에는 CPython의 자체 테스트 스위트(`Lib/test/`)뿐만 아니라 `Django`, `NumPy`, `SQLAlchemy`, `Twisted` 등 여러 중요한 타사 애플리케이션 및 라이브러리가 포함되었습니다. 이러한 애플리케이션들은 Unladen Swallow에서 실행될 때 모든 관련 테스트를 통과했습니다. 또한, Google의 내부 Python 라이브러리 및 애플리케이션에 대해서도 자동 테스트가 수행되었습니다.

#### 알려진 비호환성 (Known Incompatibilities)

Unladen Swallow와 호환되지 않는 것으로 알려진 유일한 애플리케이션은 Psyco였습니다. PyGame과 같은 일부 라이브러리는 CPython 2.6.4에서 잘 작동했지만, Unladen Swallow의 변경 사항으로 인해 일부 성능 저하가 발생했습니다.

Unladen Swallow는 CPython 2.6.4와 소스 호환성을 가졌지만, 바이너리 호환성은 없었습니다. 한쪽에 대해 컴파일된 C 확장 모듈은 다른 쪽과 작동하려면 재컴파일이 필요했습니다.

### 플랫폼 지원 (Platform Support)

Unladen Swallow는 LLVM의 JIT 컴파일 시스템이 제공하는 플랫폼 지원에 의해 본질적으로 제한되었습니다. LLVM의 JIT는 x86 및 x86-64 시스템에서 가장 잘 지원되며, Unladen Swallow도 이들 플랫폼에서 가장 많은 테스트를 받았습니다. PPC 및 ARM 지원도 존재했지만, 널리 사용되지 않고 버그가 있을 수 있었습니다.

Unladen Swallow는 Linux, Darwin, Windows 운영 체제에서 작동하는 것으로 알려져 있었습니다. LLVM의 JIT가 작동하지 않는 하드웨어 및 소프트웨어 플랫폼을 지원하기 위해, `--without-llvm` 옵션을 제공했습니다. 이 플래그는 LLVM에 의존하는 Unladen Swallow의 모든 부분을 제거하여, 성능 이점은 없지만 작동하고 테스트를 통과하는 Python 바이너리를 생성했습니다.

### CPython 개발에 미치는 영향 (Impact on CPython Development)

#### Python 또는 CPython 바이트코드 변경 실험 (Experimenting with Changes to Python or CPython Bytecode)

Unladen Swallow의 JIT 컴파일러는 CPython 바이트코드에서 작동하므로, 파서(parser)에만 영향을 미치는 Python 언어 변경에는 영향을 받지 않았습니다. CPython 바이트코드 컴파일러 또는 개별 바이트코드의 의미 변경은 먼저 인터프리터 루프에서 프로토타입을 만들고, 의미가 명확해지면 JIT 컴파일러로 포팅하는 것을 권장했습니다.

#### 디버깅 (Debugging)

Unladen Swallow 팀은 JIT 컴파일된 Python 코드를 gdb로 더 쉽게 디버깅할 수 있도록 gdb에 변경 사항을 구현했습니다. 이 변경 사항은 gdb 7.0에서 릴리스되었으며, gdb가 JIT 생성 호출 스택 프레임을 식별하고 되감을 수 있게 했습니다.

#### 프로파일링 (Profiling)

Unladen Swallow는 Linux 시스템에서 어셈블리 수준 프로파일링을 지원하기 위해 oProfile 0.9.4 이상과 통합되었습니다. 이는 oProfile이 보고서에서 JIT 컴파일된 함수를 올바르게 심볼화(symbolize)할 수 있음을 의미했습니다.

#### CPython에 C++ 추가 (Addition of C++ to CPython)

LLVM을 사용하기 위해 Unladen Swallow는 핵심 CPython 트리 및 빌드 프로세스에 C++를 도입했습니다. 이는 LLVM에 의존하는 피할 수 없는 부분이며, LLVM은 C API를 제공하지만 CPython에 필요한 기능을 모두 노출하지 않았습니다. 이로 인해 Unladen Swallow JIT의 내부 구현과 지원 인프라는 C++로 구현되었습니다. 전체 CPython 코드베이스를 C++로 변환할 것을 제안하지는 않았습니다.

#### LLVM 릴리스, C++ API 변경 관리 (Managing LLVM Releases, C++ API Changes)

LLVM은 6개월마다 정기적으로 릴리스되었으며, 이는 CPython 3.x 릴리스 개발 과정에서 LLVM이 두세 번 릴리스될 수 있음을 의미했습니다. 각 LLVM 릴리스는 더 새롭고 강력한 최적화, 향상된 플랫폼 지원 및 더 정교한 코드 생성을 가져왔습니다. 일반적으로 LLVM 릴리스에는 LLVM C++ API에 대한 비호환적인 변경 사항이 포함되었습니다.

LLVM 기반 CPython은 한 번에 단일 LLVM 버전과의 호환성을 목표로 하는 것이 오버헤드를 줄이는 데 도움이 될 것이라고 권장되었습니다.

#### CPython 빌드 (Building CPython)

Unladen Swallow는 LLVM에 대한 런타임 종속성 외에도, LLVM 기반 C/C++ 컴파일러인 Clang에 대한 빌드 시간 종속성을 포함했습니다. 이는 C 언어 Python 런타임의 일부를 LLVM의 중간 표현(Intermediate Representation, IR)으로 컴파일하는 데 사용되어, 교차 언어 인라이닝(cross-language inlining)을 가능하게 하고 성능을 향상시켰습니다.

전체 빌드는 LLVM 상호 작용에 필요한 추가 `.cc` 파일, `libpython`에 LLVM을 정적으로 링크하는 것, 교차 언어 인라이닝을 가능하게 하기 위해 Python 런타임의 일부를 LLVM IR로 컴파일하는 것 등으로 인해 더 많은 시간이 소요되었습니다.

### 제안된 병합 계획 (Proposed Merge Plan)

Unladen Swallow 팀은 CPython의 3.x 개발 라인과의 병합에 노력을 집중할 것을 제안했습니다. Python 3가 미래이며, 성능 향상 노력의 목표가 될 것이라고 언급했습니다.

Unladen Swallow를 CPython 소스 트리로 병합하기 위한 계획은 다음과 같았습니다:
*   CPython SVN 저장소에 `py3k-jit` 브랜치 생성.
*   이 브랜치를 `py3k` 브랜치와 긴밀하게 통합 유지.
*   JIT 관련 패치는 `py3k-jit` 브랜치로, JIT 비관련 패치는 `py3k` 브랜치로 커밋.
*   논란의 여지가 있는 문제는 `python-dev`에서 논의.

Unladen Swallow는 CPython 2.6을 기반으로 했으므로, 컴파일러를 Python 3로 포팅해야 했습니다.

### 비상 계획 (Contingency Plans)

메모리 사용량이나 시작 시간을 CPython 커뮤니티가 만족하는 수준으로 줄이지 못할 경우, 주요 비상 계획은 온라인 JIT 컴파일 전략에서 계측된 CPython 인터프리터 루프를 사용하여 피드백을 얻는 오프라인 AOT(Ahead-Of-Time) 전략으로 전환하는 것이었습니다. 이를 "피드백 지향 최적화(feedback-directed optimization, FDO)"라고 지칭했습니다. FDO 컴파일러는 JIT 컴파일러보다 성능이 떨어질 것으로 예상되었지만, Unladen Swallow JIT 컴파일러를 위해 개발된 코드와 인프라의 많은 부분을 재활용할 수 있을 것이라고 보았습니다.

### 향후 작업 (Future Work)

JIT 컴파일러는 매우 유연한 도구이며, 그 잠재력을 완전히 발휘하지 못했다고 보았습니다. 아직 구현되지 않은 성능 최적화 목록은 다음과 같습니다:
*   **Python/Python 인라이닝 (inlining)** : 현재 컴파일러는 순수 Python 함수 간에 인라이닝을 수행하지 않았습니다.
*   **언박싱 (Unboxing)** : 숫자 성능에 매우 중요합니다.
*   **재컴파일, 적응 (Recompilation, adaptation)** : Unladen Swallow는 현재 Python 함수를 한 번만 컴파일하며, 사용 패턴이 변경되면 재컴파일의 한계가 있었습니다.
*   **정규 표현식 JIT 컴파일 (JIT-compile regular expressions)** : 최신 JavaScript 엔진은 JIT 컴파일 인프라를 재사용하여 정규 표현식 성능을 향상시켰습니다.
*   **트레이스 컴파일 (Trace compilation)** : PyPy 및 Tracemonkey의 결과에 따라, CPython JIT는 어느 정도 트레이스 컴파일을 통합해야 한다고 믿었습니다.
*   **프로파일 생성/재사용 (Profile generation/reuse)** : JIT가 수집한 런타임 데이터를 디스크에 저장하고 후속 JIT 컴파일 또는 Cython과 같은 외부 도구에서 재사용할 수 있었습니다.

---PEP 3146, "Unladen Swallow를 CPython으로 통합하기"는 Unladen Swallow 프로젝트를 CPython 소스 트리에 통합하자는 제안이었습니다. Unladen Swallow 프로젝트는 성능 향상에 초점을 맞춘 CPython의 오픈 소스 브랜치였습니다. 이 PEP는 결국 철회되었습니다.

---

## PEP 3146 – Unladen Swallow를 CPython으로 통합하기 (철회됨)

**작성자:** Collin Winter, Jeffrey Yasskin, Reid Kleckner
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2010년 1월 1일
**Python 버전:** 3.3

### PEP 철회

Unladen Swallow 프로젝트가 중단되었기 때문에, 이 PEP는 철회된 것으로 간주됩니다.

### 개요 (Abstract)

이 PEP는 성능 향상에 중점을 둔 CPython의 오픈 소스 브랜치인 Unladen Swallow 프로젝트를 CPython의 소스 트리로 통합할 것을 제안했습니다. Unladen Swallow는 유효한 Python 2.6.4 애플리케이션 및 C 확장 모듈과 소스 호환이 가능했습니다.

Unladen Swallow는 CPython에 Just-In-Time (JIT) 컴파일러를 추가하여, 선택된 Python 코드를 최적화된 머신 코드로 컴파일할 수 있도록 했습니다. 고전적인 정적 컴파일러 최적화를 넘어, Unladen Swallow의 JIT 컴파일러는 런타임에 수집된 데이터를 활용하여 코드 동작에 대한 검증된 가정을 세우고, 더 빠른 머신 코드를 생성할 수 있었습니다.

이 PEP는 Unladen Swallow를 CPython 개발 트리의 별도 `py3k-jit` 브랜치에 통합한 후, 궁극적으로 메인 `py3k` 브랜치와 병합하는 것을 목표로 했습니다. Unladen Swallow는 완성되거나 완벽하지는 않았지만, CPython 로드맵에 통합될 만큼 충분한 성숙도에 도달했다고 판단되었습니다.

### 제안 배경 및 구현 (Rationale, Implementation)

많은 기업과 개인은 Python이 더 빨라져서 더 많은 프로젝트에 활용되기를 원했습니다. Google도 그러한 회사 중 하나였습니다.

Unladen Swallow는 Google의 수많은 Python 라이브러리, 도구 및 애플리케이션의 성능을 향상시키기 위해 시작된 Google 후원의 CPython 브랜치였습니다. Unladen Swallow의 채택을 최대한 쉽게 만들기 위해, 프로젝트는 처음에는 네 가지 목표를 설정했습니다:
*   단일 스레드 코드에서 CPython 2.6.4 기준 대비 5배 성능 향상.
*   유효한 CPython 2.6 애플리케이션과 100% 소스 호환성.
*   유효한 CPython 2.6 C 확장 모듈과 100% 소스 호환성.
*   궁극적으로 CPython으로 다시 병합되도록 설계.

Unladen Swallow는 런타임에 피드백을 수집하고 이를 컴파일 시간 최적화에 활용하는 Just-In-Time (JIT) 컴파일러를 구현했습니다. 이는 최신 JavaScript 엔진, 대부분의 Java 가상 머신, Rubinius, MacRuby 등에서 채택된 접근 방식과 유사합니다.

핵심은 동적 언어가 이론적으로만 동적일 뿐, 실제로는 각 함수나 코드 조각이 상대적으로 정적이며 안정적인 유형 및 자식 함수 세트를 사용한다는 점입니다. CPython의 현재 바이트코드 인터프리터는 실행 중인 코드에 대해 최악의 경우를 가정합니다. Unladen Swallow는 사용자 코드의 이러한 상대적으로 정적인 특성을 활용하여 성능을 향상시켰습니다.

Unladen Swallow JIT 컴파일러는 함수의 CPython 바이트코드를 플랫폼별 머신 코드로 변환하며, 런타임에 수집된 데이터와 고전적인 컴파일러 최적화를 사용하여 생성된 머신 코드의 품질을 향상시켰습니다. 프로그램 실행에 실제로 도움이 되는 Python 코드만 컴파일하기 위해, 온라인 휴리스틱을 사용하여 특정 함수의 "핫니스(hotness)"를 평가했습니다. 함수의 핫니스 값이 특정 임계값을 넘으면 컴파일 및 최적화 대상으로 선택되었습니다. 함수가 핫하다고 판단되기 전까지는 표준 CPython `eval` 루프에서 실행되었으며, 이 루프는 실행된 각 바이트코드에 대한 흥미로운 데이터를 기록하도록 계측되었습니다. 이 런타임 데이터는 생성된 머신 코드의 유연성을 줄여 일반적인 경우(common case)에 대해 최적화할 수 있게 했습니다. 예를 들어, 다음 데이터를 수집했습니다:
*   브랜치(branch)가 실행되었는지 여부.
*   연산자에 사용된 타입.
*   각 호출 지점(callsite)에서 호출된 함수.

최적화 시 만들어진 가정이 더 이상 유효하지 않게 되면, 최적화된 머신 코드 실행을 중단하고 인터프리터로 돌아가 나머지 작업을 수행했습니다. 이를 위해 각 최적화된 머신 코드 섹션 앞에는 가드(guard)가 배치되었습니다.

코드 생성 및 최적화를 위해 LLVM이라는 기존 컴파일러 라이브러리 세트를 재사용했습니다. 이는 소규모 팀이 여러 머신 명령어 세트에서 코드 생성을 이해하고 디버깅하며, 많은 수의 고전적인 컴파일러 최적화를 구현해야 하는 부담을 덜어주었습니다.

Unladen Swallow는 단일 스레드, 순수 Python 코드의 성능 향상에 중점을 두었습니다. CPython의 Global Interpreter Lock (GIL)을 제거하려는 노력은 하지 않았습니다. 이는 Unladen Swallow의 작업과 별개이며, 민감한 문제이므로 메인라인 개발 브랜치에서 수행하는 것이 가장 좋다고 판단했습니다.

### 대안 (Alternatives)

Unladen Swallow 팀은 Python 성능 향상을 위한 여러 대안 전략을 고려했지만, 불만족스럽다고 판단했습니다.
*   **Cython, Shedskin** : 이들은 Python용 정적 컴파일러입니다. 런타임 데이터에 기반한 JIT 컴파일러가 고려하는 전체 코드 범위에 대해 최적화할 수 없다는 한계가 있었습니다.
*   **IronPython** : Microsoft의 .Net 플랫폼용 Python이며, 사실상 Windows 전용이어서 일반적인 CPython 대체제로 부적합했습니다.
*   **Jython** : Python 2.5의 완전한 구현이지만, Unladen Swallow보다 훨씬 느리고 CPython 확장 모듈을 지원하지 않아 대규모 애플리케이션 마이그레이션 비용이 너무 높았습니다.
*   **Psyco** : CPython용 특수화 JIT 컴파일러였지만, 32비트 전용이고 x86만 지원하며 유지보수가 매우 어려웠습니다.
*   **PyPy** : 숫자 코드에서는 좋은 성능을 보였지만, 일부 워크로드에서는 Unladen Swallow보다 느렸습니다. PyPy의 JIT 컴파일러는 32비트 x86 코드 생성만 지원하고, 중요한 모듈이 PyPy에 대해 빌드되지 않으며, CPython과 동일한 임베딩 API를 제공하지 않는 등의 문제가 있었습니다.
*   **PyV8** : V8 위에서 실행되는 실험적인 Python-to-JavaScript 컴파일러로, 전체 Python 언어를 구현하지 않았고 CPython 확장 모듈을 지원하지 않았습니다.
*   **WPython** : CPython 인터프리터 루프의 워드코드 기반 재구현으로, 인터프리터 성능에 미미한 개선을 제공했지만 JIT 컴파일러의 대안은 아니었습니다.

### 성능 (Performance)

Unladen Swallow는 합성 마이크로벤치마크부터 전체 애플리케이션 매크로벤치마크에 이르는 상당히 큰 벤치마크 스위트를 개발했습니다. 이 벤치마크들은 타사 기여자, Google의 내부 워크로드, 그리고 광범위한 Python 커뮤니티에서 널리 사용되는 도구 및 라이브러리(예: `django`, `2to3`, `spambayes`)에서 영감을 받았습니다.

#### CPython 2.6.4 대비 성능

벤치마크 결과는 Unladen Swallow가 CPython 2.6.4 대비 다양한 성능 향상을 보였음을 나타냅니다. 예를 들어, `django` 벤치마크는 32비트 환경에서 1.35배 빨라졌고, 64비트 환경에서는 `nbody` 벤치마크가 2.86배 빨라졌습니다. 그러나 `spambayes`와 같은 일부 벤치마크에서는 Unladen Swallow가 더 느리거나 성능 변화가 미미했습니다.

Unladen Swallow는 Python 함수를 머신 코드로 컴파일하기 위해 실행을 블록(block)하여 일부 벤치마크에서 성능 저하가 발생했습니다. 이는 `html5lib` 및 `rietveld` 벤치마크의 타임라인 그래프에서 볼 수 있으며, `2to3`의 전반적인 성능을 저하시켰습니다. 팀은 이 문제를 해결하기 위한 개발 브랜치를 운영했지만, CPython의 현재 스레딩 시스템의 제약으로 인해 예상보다 많은 시간과 노력이 필요했습니다. 이 문제는 `py3k` 브랜치로 최종 병합하는 데 있어 중요한 문제로 간주되었습니다.

초기 목표였던 5배 성능 향상은 달성하지 못했습니다. 이는 LLVM 작업에 예상보다 많은 노력이 필요했고, LLVM의 JIT 인프라에 존재하는 여러 치명적인 버그를 수정하는 데 시간을 할애했기 때문입니다.

#### 메모리 사용량 (Memory Usage)

Unladen Swallow는 CPython 2.6.4 대비 메모리 사용량이 증가했습니다. 예를 들어, 32비트 환경에서 `2to3`는 1.77배, `django`는 2.76배, `spambayes`는 6.32배 더 많은 메모리를 사용했습니다. 64비트 환경에서는 `spambayes`가 7.92배 더 많은 메모리를 사용했습니다.

이러한 메모리 사용량 증가는 LLVM 코드 생성, 분석 및 최적화 라이브러리, 네이티브 코드, LLVM의 메모리 사용량 문제 또는 누수, 머신 코드 최적화 및 생성을 위한 데이터 구조 등 여러 원인에서 비롯되었습니다. 메모리 사용량 감소는 최종 `py3k` 브랜치 병합을 위한 중요한 문제로 간주되었습니다.

#### 시작 시간 (Start-up Time)

LLVM의 코드 생성, 분석 및 최적화 라이브러리를 정적으로 링크(statically linking)하면서 Python 바이너리의 시작 시간이 증가했습니다. 예를 들어, `normal_startup` 벤치마크에서 CPython 대비 1.6배 느려졌고, `startup_nosite` 벤치마크에서는 2.5배 느려졌습니다. 시작 시간 개선은 Unladen Swallow의 병합 우선순위 목록에서 높은 순위를 차지했습니다.

#### 바이너리 크기 (Binary Size)

LLVM 라이브러리를 정적으로 링크함으로써 Python 바이너리의 크기가 크게 증가했습니다. CPython 2.6.4와 3.1.1이 각각 1.3MB 및 1.4MB (32비트)였던 것에 비해, Unladen Swallow r1041은 12MB (32비트 및 64비트)로 증가했습니다. 이는 LLVM의 코드 생성, 분석 및 최적화 라이브러리를 정적으로 링크하기 때문이며, LLVM이 공유 라이브러리(shared linking)를 더 잘 지원하도록 수정하면 해결될 수 있는 문제로 보았습니다.

### 정확성 및 호환성 (Correctness and Compatibility)

Unladen Swallow의 정확성 테스트 스위트에는 CPython의 자체 테스트 스위트(`Lib/test/`)뿐만 아니라 `Django`, `NumPy`, `SQLAlchemy`, `Twisted` 등 여러 중요한 타사 애플리케이션 및 라이브러리가 포함되었습니다. 이러한 애플리케이션들은 Unladen Swallow에서 실행될 때 모든 관련 테스트를 통과했습니다. 또한, Google의 내부 Python 라이브러리 및 애플리케이션에 대해서도 자동 테스트가 수행되었습니다.

#### 알려진 비호환성 (Known Incompatibilities)

Unladen Swallow와 호환되지 않는 것으로 알려진 유일한 애플리케이션은 Psyco였습니다. PyGame과 같은 일부 라이브러리는 CPython 2.6.4에서 잘 작동했지만, Unladen Swallow의 변경 사항으로 인해 일부 성능 저하가 발생했습니다.

Unladen Swallow는 CPython 2.6.4와 소스 호환성을 가졌지만, 바이너리 호환성은 없었습니다. 한쪽에 대해 컴파일된 C 확장 모듈은 다른 쪽과 작동하려면 재컴파일이 필요했습니다.

### 플랫폼 지원 (Platform Support)

Unladen Swallow는 LLVM의 JIT 컴파일 시스템이 제공하는 플랫폼 지원에 의해 본질적으로 제한되었습니다. LLVM의 JIT는 x86 및 x86-64 시스템에서 가장 잘 지원되며, Unladen Swallow도 이들 플랫폼에서 가장 많은 테스트를 받았습니다. PPC 및 ARM 지원도 존재했지만, 널리 사용되지 않고 버그가 있을 수 있었습니다.

Unladen Swallow는 Linux, Darwin, Windows 운영 체제에서 작동하는 것으로 알려져 있었습니다. LLVM의 JIT가 작동하지 않는 하드웨어 및 소프트웨어 플랫폼을 지원하기 위해, `--without-llvm` 옵션을 제공했습니다. 이 플래그는 LLVM에 의존하는 Unladen Swallow의 모든 부분을 제거하여, 성능 이점은 없지만 작동하고 테스트를 통과하는 Python 바이너리를 생성했습니다.

### CPython 개발에 미치는 영향 (Impact on CPython Development)

#### Python 또는 CPython 바이트코드 변경 실험 (Experimenting with Changes to Python or CPython Bytecode)

Unladen Swallow의 JIT 컴파일러는 CPython 바이트코드에서 작동하므로, 파서(parser)에만 영향을 미치는 Python 언어 변경에는 영향을 받지 않았습니다. CPython 바이트코드 컴파일러 또는 개별 바이트코드의 의미 변경은 먼저 인터프리터 루프에서 프로토타입을 만들고, 의미가 명확해지면 JIT 컴파일러로 포팅하는 것을 권장했습니다.

#### 디버깅 (Debugging)

Unladen Swallow 팀은 JIT 컴파일된 Python 코드를 gdb로 더 쉽게 디버깅할 수 있도록 gdb에 변경 사항을 구현했습니다. 이 변경 사항은 gdb 7.0에서 릴리스되었으며, gdb가 JIT 생성 호출 스택 프레임을 식별하고 되감을 수 있게 했습니다.

#### 프로파일링 (Profiling)

Unladen Swallow는 Linux 시스템에서 어셈블리 수준 프로파일링을 지원하기 위해 oProfile 0.9.4 이상과 통합되었습니다. 이는 oProfile이 보고서에서 JIT 컴파일된 함수를 올바르게 심볼화(symbolize)할 수 있음을 의미했습니다.

#### CPython에 C++ 추가 (Addition of C++ to CPython)

LLVM을 사용하기 위해 Unladen Swallow는 핵심 CPython 트리 및 빌드 프로세스에 C++를 도입했습니다. 이는 LLVM에 의존하는 피할 수 없는 부분이며, LLVM은 C API를 제공하지만 CPython에 필요한 기능을 모두 노출하지 않았습니다. 이로 인해 Unladen Swallow JIT의 내부 구현과 지원 인프라는 C++로 구현되었습니다. 전체 CPython 코드베이스를 C++로 변환할 것을 제안하지는 않았습니다.

#### LLVM 릴리스, C++ API 변경 관리 (Managing LLVM Releases, C++ API Changes)

LLVM은 6개월마다 정기적으로 릴리스되었으며, 이는 CPython 3.x 릴리스 개발 과정에서 LLVM이 두세 번 릴리스될 수 있음을 의미했습니다. 각 LLVM 릴리스는 더 새롭고 강력한 최적화, 향상된 플랫폼 지원 및 더 정교한 코드 생성을 가져왔습니다. 일반적으로 LLVM 릴리스에는 LLVM C++ API에 대한 비호환적인 변경 사항이 포함되었습니다.

LLVM 기반 CPython은 한 번에 단일 LLVM 버전과의 호환성을 목표로 하는 것이 오버헤드를 줄이는 데 도움이 될 것이라고 권장되었습니다.

#### CPython 빌드 (Building CPython)

Unladen Swallow는 LLVM에 대한 런타임 종속성 외에도, LLVM 기반 C/C++ 컴파일러인 Clang에 대한 빌드 시간 종속성을 포함했습니다. 이는 C 언어 Python 런타임의 일부를 LLVM의 중간 표현(Intermediate Representation, IR)으로 컴파일하는 데 사용되어, 교차 언어 인라이닝(cross-language inlining)을 가능하게 하고 성능을 향상시켰습니다.

전체 빌드는 LLVM 상호 작용에 필요한 추가 `.cc` 파일, `libpython`에 LLVM을 정적으로 링크하는 것, 교차 언어 인라이닝을 가능하게 하기 위해 Python 런타임의 일부를 LLVM IR로 컴파일하는 것 등으로 인해 더 많은 시간이 소요되었습니다.

### 제안된 병합 계획 (Proposed Merge Plan)

Unladen Swallow 팀은 CPython의 3.x 개발 라인과의 병합에 노력을 집중할 것을 제안했습니다. Python 3가 미래이며, 성능 향상 노력의 목표가 될 것이라고 언급했습니다.

Unladen Swallow를 CPython 소스 트리로 병합하기 위한 계획은 다음과 같았습니다:
*   CPython SVN 저장소에 `py3k-jit` 브랜치 생성.
*   이 브랜치를 `py3k` 브랜치와 긴밀하게 통합 유지.
*   JIT 관련 패치는 `py3k-jit` 브랜치로, JIT 비관련 패치는 `py3k` 브랜치로 커밋.
*   논란의 여지가 있는 문제는 `python-dev`에서 논의.

Unladen Swallow는 CPython 2.6을 기반으로 했으므로, 컴파일러를 Python 3로 포팅해야 했습니다.

### 비상 계획 (Contingency Plans)

메모리 사용량이나 시작 시간을 CPython 커뮤니티가 만족하는 수준으로 줄이지 못할 경우, 주요 비상 계획은 온라인 JIT 컴파일 전략에서 계측된 CPython 인터프리터 루프를 사용하여 피드백을 얻는 오프라인 AOT(Ahead-Of-Time) 전략으로 전환하는 것이었습니다. 이를 "피드백 지향 최적화(feedback-directed optimization, FDO)"라고 지칭했습니다. FDO 컴파일러는 JIT 컴파일러보다 성능이 떨어질 것으로 예상되었지만, Unladen Swallow JIT 컴파일러를 위해 개발된 코드와 인프라의 많은 부분을 재활용할 수 있을 것이라고 보았습니다.

### 향후 작업 (Future Work)

JIT 컴파일러는 매우 유연한 도구이며, 그 잠재력을 완전히 발휘하지 못했다고 보았습니다. 아직 구현되지 않은 성능 최적화 목록은 다음과 같습니다:
*   **Python/Python 인라이닝 (inlining)** : 현재 컴파일러는 순수 Python 함수 간에 인라이닝을 수행하지 않았습니다.
*   **언박싱 (Unboxing)** : 숫자 성능에 매우 중요합니다.
*   **재컴파일, 적응 (Recompilation, adaptation)** : Unladen Swallow는 현재 Python 함수를 한 번만 컴파일하며, 사용 패턴이 변경되면 재컴파일의 한계가 있었습니다.
*   **정규 표현식 JIT 컴파일 (JIT-compile regular expressions)** : 최신 JavaScript 엔진은 JIT 컴파일 인프라를 재사용하여 정규 표현식 성능을 향상시켰습니다.
*   **트레이스 컴파일 (Trace compilation)** : PyPy 및 Tracemonkey의 결과에 따라, CPython JIT는 어느 정도 트레이스 컴파일을 통합해야 한다고 믿었습니다.
*   **프로파일 생성/재사용 (Profile generation/reuse)** : JIT가 수집한 런타임 데이터를 디스크에 저장하고 후속 JIT 컴파일 또는 Cython과 같은 외부 도구에서 재사용할 수 있었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.