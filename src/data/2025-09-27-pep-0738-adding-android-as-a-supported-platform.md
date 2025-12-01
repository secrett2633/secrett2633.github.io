---
title: "[Final] PEP 738 - Adding Android as a supported platform"
excerpt: "Python Enhancement Proposal 738: 'Adding Android as a supported platform'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/738/
toc: true
toc_sticky: true
date: 2025-09-27 13:28:23+0900
last_modified_at: 2025-09-27 13:28:23+0900
published: true
---
> **원문 링크:** [PEP 738 - Adding Android as a supported platform](https://peps.python.org/pep-0738/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Dec-2023


## PEP 738 – Android를 지원 플랫폼으로 추가

### 개요 (Abstract)

이 PEP는 CPython에 Android를 지원 플랫폼으로 추가할 것을 제안합니다. 초기 목표는 Python 3.13에서 Android가 Tier 3 지원을 달성하는 것입니다. 이 PEP는 Russell Keith-Magee의 PEP 730("Adding iOS as a supported platform")을 기반으로 하며, iOS와 Android 플랫폼 간의 주요 차이점은 "iOS"라는 단어를 검색하여 확인할 수 있습니다.

### 동기 (Motivation)

지난 15년간 모바일 플랫폼은 컴퓨팅 환경에서 점점 더 중요해지고 있습니다. Android는 이러한 장치의 약 70%에서 실행되는 운영체제이지만, CPython에는 Android에 대한 공식적인 지원이 없습니다.

Chaquopy, BeeWare, Kivy와 같은 프로젝트들은 오랫동안 Android를 지원해왔으며, Google Play Store에 애플리케이션을 게시하는 데 성공했습니다. 이는 Android 지원의 기술적 타당성을 입증합니다.

Python 언어의 미래를 위해 널리 채택된 모든 플랫폼에서 사용될 수 있는 것이 중요합니다. 그렇지 않으면 잠재적 사용자들은 이러한 플랫폼을 지원하는 다른 언어를 선택하게 될 것입니다. 이는 특히 차세대 개발자들이 데스크톱보다 모바일 플랫폼을 사용하는 데 더 많은 시간을 보내는 교육 분야에서 더욱 중요합니다.

### 근거 (Rationale)

#### 일반 (General)

Android는 기본적으로 Linux 커널과 ELF 바이너리 형식을 기반으로 하는 POSIX 플랫폼입니다. `glibc` 대신 Bionic이라는 자체 C 라이브러리 구현을 사용합니다. 결과적으로, 아키텍처가 일치하더라도 다른 Linux 배포판과 바이너리 호환성이 없습니다. 또한 다른 Unix와는 다른 자체 파일 시스템 레이아웃을 가지고 있습니다.

하지만 Android는 Linux와의 소스 호환성이 상당히 좋습니다. 초기에는 C 라이브러리가 매우 불완전했지만, 2014년경까지 대부분의 부족한 부분이 채워졌습니다. 이후에는 하드웨어 장치나 운영체제 서비스에 직접 접근하는 경우가 아니라면, Linux용으로 컴파일된 C 코드는 일반적으로 Android용으로도 컴파일할 수 있습니다. 이는 CPython도 마찬가지여서, 공식적으로 Android를 지원한 적은 없지만, 최근 버전(3.6 이후)은 최소한의 패치로도 Android용으로 컴파일할 수 있습니다.

#### OS 버전 (OS versions)

각 Android 버전은 일반적인 점으로 구분된 버전 번호, 순차적인 정수 "API 레벨", 그리고 알파벳으로 된 제과 테마 코드 이름(더 이상 마케팅에는 사용되지 않지만 개발자 문서에는 여전히 나타남)의 세 가지 방식으로 식별됩니다.

Python 3.13의 경우, 최소 Android 버전을 2014년에 출시된 5.0 (API 레벨 21)으로 제안합니다. 구글 통계에 따르면 이는 활성 장치의 99%를 포괄할 것입니다.

#### 개발 도구 (Development tools)

Android 개발 도구는 Linux (x86_64), Windows (x86_64), macOS (x86_64 및 ARM64)에서 동일하게 지원됩니다. CPython의 경우 가장 중요한 도구는 NDK (Native Development Kit)입니다. NDK r26 버전은 API 레벨 21부터 34까지 지원합니다.

Gradle은 완성된 배포 가능한 앱을 빌드하는 데 사용되는 도구입니다. QEMU 기반의 에뮬레이터는 개발 머신에서 실행되는 시뮬레이션된 Android 장치입니다.

#### 아키텍처 (Architectures)

Android는 현재 `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64`의 4가지 아키텍처를 지원합니다. 거의 모든 현재의 물리적 장치는 ARM 아키텍처 중 하나를 사용하며, x86 및 x86_64는 에뮬레이터에서 사용됩니다.

Python 3.13에서는 Tier 3 지원이 64비트 플랫폼(`arm64-v8a` 및 `x86_64`)만 포함할 것을 제안합니다. 이는 `x86`과 `armeabi-v7a`의 지원 감소 및 빌드봇(buildbot) 구축의 어려움 때문입니다.

#### 앱 라이프사이클 (App lifecycle)

Android 앱의 주요 프로그래밍 언어는 Java 또는 Kotlin입니다. 앱은 자체 실행 파일을 제공하지 않으며, 대신 운영체제가 제공하는 실행 파일을 실행하는 Java 가상 머신으로 시작됩니다. 앱의 Java 코드는 JNI(Java Native Interface)를 통해 동적 라이브러리를 로드하고 호출하여 프로세스에 네이티브 코드를 추가할 수 있습니다.

Android에서는 서브프로세스 생성이 지원되지만, 앱은 특정 위치의 실행 파일만 실행할 수 있으며, 런타임에 쓰기 가능한 위치는 없습니다. 따라서 Android에서 Python을 실행하는 권장 방법은 `libpython3.x.so`를 주 앱 프로세스에 로드하는 것입니다. `python3.x` 실행 파일은 이 플랫폼에서 공식적으로 지원되지 않을 것입니다.

### 사양 (Specification)

#### 작업 범위 (Scope of work)

이 작업의 초점은 기존 Windows 임베더블 패키지와 동등한 Android 패키지를 생성하는 것입니다. 즉, 개발자들이 자신의 앱에 추가할 수 있는 컴파일된 라이브러리 세트를 제공하는 것이며, 설치 프로그램은 필요하지 않습니다.

Android를 Tier 3 플랫폼으로 추가하는 것은 패치되지 않은 CPython 소스 코드에서 Android 호환 빌드를 컴파일하기 위한 지원을 추가하는 것만을 의미합니다. python.org에 공식적으로 배포되는 Android 아티팩트가 반드시 필요하지는 않지만, 미래에는 추가될 수 있습니다.

Android는 다른 POSIX 플랫폼과 동일한 `configure` 및 `Makefile` 시스템을 사용하여 빌드될 것이며, 따라서 POSIX 플랫폼에서 빌드되어야 합니다. Linux와 macOS 모두 지원될 것입니다.

#### 연결 (Linkage)

Python은 `dlopen`을 사용하여 앱에 로드될 수 있는 동적 `libpython3.x.so` 라이브러리로 앱에 포함될 것입니다. Android는 Linux와 달리 나중에 로드되는 라이브러리의 재배치(relocations)를 해결하기 위해 `dlopened` 라이브러리를 암시적으로 사용하지 않으므로, 모든 Python 확장 모듈은 Android용으로 빌드할 때 `libpython3.x.so`에 명시적으로 링크되어야 합니다.

정적 `libpython3.x.a` 라이브러리는 Android에서 지원되지 않을 것입니다. 이는 Windows의 CPython과 동일한 패턴입니다.

#### 표준 라이브러리 (Standard library)

일부 표준 라이브러리 모듈은 기본 C API가 없으므로 Android에서 지원되지 않습니다. 여기에는 `curses`, `readline`, `dbm.gnu`, `dbm.ndbm`, `grp`, `multiprocessing`, `tkinter`, `turtle` 등이 포함됩니다.

- **`sys`** : `sys.platform`은 "android"를 반환합니다. C-레벨의 stdio 스트림은 아무것도 연결되지 않으므로, `sys.stdout` 및 `sys.stderr`는 시스템 Logcat으로 리디렉션되고, `sys.stdin`은 항상 EOF를 반환합니다.
- **`platform`** : `platform.system()`은 "Android"를, `platform.release()`는 Android 버전 번호(예: "14")를 반환합니다. 또한, `platform.android_ver()` 메서드가 추가되어 장치의 Android 버전, API 레벨, 제조업체, 모델, 장치 이름 및 에뮬레이터 여부 등을 포함하는 `namedtuple`을 반환합니다.
- **`os`** : `os.uname()`은 POSIX `uname()` 호출의 원시 결과를 반환합니다. `sysname`은 "Linux", `release`는 Linux 커널 버전을 반환합니다.

#### CI 리소스 (CI resources)

Android 에뮬레이터와 물리적 장치는 동일한 ABI를 사용하므로, 에뮬레이터에서의 테스트로 충분할 것입니다. Anaconda는 Android 빌드봇을 실행하기 위한 물리적 하드웨어를 제공하겠다고 제안했습니다.

#### 패키징 (Packaging)

Android 휠(wheels)은 `android_<api-level>_<abi>` 형식의 태그를 사용합니다 (예: `android_21_arm64_v8a`). `<api-level>`은 휠이 컴파일될 때 선택된 최소 Android 버전을 나타냅니다. `pip`과 같은 설치 도구는 이를 기존 macOS 태그와 유사하게 해석해야 합니다.

Python 커뮤니티가 Android에서 Python을 채택하는 능력을 높이기 위해, 프로젝트가 Android 빌드를 CI 및 릴리스 도구에 추가하는 방법을 명확하게 문서화해야 합니다. `crossenv` 및 `cibuildwheel`과 같은 도구에 Android 지원을 추가하는 것이 한 가지 방법이 될 수 있습니다. Android 휠 태그 형식은 PyPI가 허용하는 태그 목록에도 추가되어야 합니다.

#### PEP 11 업데이트 (PEP 11 Update)

PEP 11은 지원되는 두 가지 Android ABI(`aarch64-linux-android`, `x86_64-linux-android`)를 포함하도록 업데이트될 것입니다. Petr Viktorin이 이 ABI들의 초기 코어 팀 연락처 역할을 맡을 것입니다.

### 하위 호환성 (Backwards Compatibility)

새로운 플랫폼을 추가하는 것은 CPython 자체에 하위 호환성 문제를 일으키지 않습니다. 그러나 BeeWare 및 Kivy와 같이 역사적으로 CPython 지원을 제공해온 프로젝트에는 일부 하위 호환성 문제가 발생할 수 있습니다.

### 보안 영향 (Security Implications)

새로운 플랫폼을 추가해도 새로운 보안 영향은 없습니다.

### 교육 방법 (How to Teach This)

이 PEP와 관련된 교육 요구 사항은 두 그룹의 개발자에게 해당됩니다.

1.  **앱 개발자:** Python 코드를 Android 앱에 빌드하고, 지원 패키지와 함께 런타임에 사용하는 방법을 알아야 합니다. 이 문서는 기존 Windows 임베더블 패키지와 유사한 형태로 다룰 것이지만, Briefcase, Chaquopy, Buildozer와 같은 상위 레벨 도구를 사용할 것을 권장할 것입니다.
2.  **이진 컴포넌트를 가진 패키지 개발자:** Android용으로 빌드하고 릴리스하는 방법을 알아야 합니다 (패키징 섹션 참조).

### 참조 구현 (Reference Implementation)

Chaquopy 저장소에는 참조 패치 및 빌드 스크립트가 포함되어 있습니다. Briefcase는 Android 장치 및 에뮬레이터에서 테스트 스위트를 실행하는 코드의 참조 구현을 제공합니다.

### 거부된 아이디어 (Rejected Ideas)

`platform.android_ver()`의 원래 사양에서 `min_api_level` 필드가 제거되었는데, 이는 다른 필드와 달리 현재 장치의 속성이 아니기 때문입니다. `is_emulator` 필드는 테스트 중 에뮬레이터 관련 문제가 발견되어 추가되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.