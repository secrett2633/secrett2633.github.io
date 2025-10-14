---
title: "[Final] PEP 730 - Adding iOS as a supported platform"
excerpt: "Python Enhancement Proposal 730: 'Adding iOS as a supported platform'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/730/
toc: true
toc_sticky: true
date: 2025-09-27 13:22:30+0900
last_modified_at: 2025-09-27 13:22:30+0900
published: true
---
> **원문 링크:** [PEP 730 - Adding iOS as a supported platform](https://peps.python.org/pep-0730/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Oct-2023

PEP 730은 CPython에 iOS를 지원 플랫폼으로 추가하는 내용을 제안합니다. 초기 목표는 Python 3.13에서 Tier 3 지원을 달성하는 것이며, 이 PEP는 iOS 지원에 필요한 기술적 변경 사항과 프로젝트 관리 관련 사항을 다룹니다.

## 개요 (Abstract)
이 PEP는 CPython에 iOS를 지원 플랫폼으로 추가할 것을 제안합니다. 초기 목표는 Python 3.13에 대해 Tier 3 지원을 달성하는 것입니다. 이 PEP는 iOS를 지원하는 데 필요한 변경 사항의 기술적 측면과 Tier 3 플랫폼으로 iOS를 채택하는 것과 관련된 프로젝트 관리 문제를 설명합니다.

## 동기 (Motivation)
지난 15년간 모바일 플랫폼은 컴퓨팅 환경에서 점점 더 중요해졌으며, iOS는 이러한 기기들의 대부분을 제어하는 두 가지 운영 체제 중 하나입니다. 그러나 CPython에는 iOS에 대한 공식적인 지원이 없습니다. BeeWare 프로젝트와 Kivy는 거의 10년 동안 iOS를 지원해 왔으며, 이 지원을 통해 iOS 앱 스토어에 게시가 승인된 애플리케이션을 생성할 수 있었습니다. 이는 iOS 지원의 기술적 타당성을 보여줍니다. Python 언어의 미래를 위해 널리 채택된 모든 하드웨어 또는 OS에서 사용될 수 있어야 합니다. 널리 사용되는 플랫폼에서 Python을 사용할 수 없다면, 잠재적 사용자들이 해당 플랫폼을 지원하는 다른 언어를 채택하게 되어 언어 채택에 영향을 미칠 것입니다.

## 이론적 근거 (Rationale)

### 개발 환경 (Development landscape)
iOS는 단일 API를 제공하지만, `iphoneos` (물리적 기기) 및 `iphonesimulator`라는 두 가지 별개의 ABI (Application Binary Interface)를 가집니다. 각 ABI는 여러 CPU 아키텍처에서 제공될 수 있습니다. 작성 시점에 Apple은 기기 ABI에서 `arm64`를 공식적으로 지원하며, 시뮬레이터 ABI에서는 `arm64`와 `x86_64`를 지원합니다.

macOS와 마찬가지로, iOS는 여러 CPU 아키텍처를 포함하는 "fat" 바이너리 생성을 지원합니다. 그러나 fat 바이너리는 ABI를 넘나들 수 없습니다. 단일 개발 아티팩트 배포를 지원하기 위해 Apple은 공통 API를 구현하는 여러 ABI를 감싸는 "XCframework" 구조를 사용합니다.

iOS는 macOS와 유사하게 Darwin 커널에서 실행되지만, iOS와 macOS 사이에는 상당한 플랫폼 차이가 있어 구현 수준에서 구별할 필요가 있습니다.

### POSIX 준수 (POSIX compliance)
iOS는 대체로 POSIX 플랫폼입니다. 그러나 WASI/Emscripten과 유사하게, iOS에는 존재하지만 사용할 수 없는 POSIX API와 아예 존재하지 않는 POSIX API가 있습니다. 가장 주목할 만한 점은 iOS가 어떤 형태의 다중 프로세스 (multiprocess) 지원도 제공하지 않는다는 것입니다. `fork` 및 `spawn`은 iOS API에 존재하지만, 호출되면 호출하는 iOS 프로세스가 중지되고 새 프로세스가 시작되지 않습니다.

WASI/Emscripten과 달리, 스레딩은 iOS에서 지원됩니다. 소켓 처리에도 상당한 제한이 있습니다. 프로세스 샌드박싱(sandboxing)으로 인해 소켓을 통한 프로세스 간 통신(interprocess communication)은 불가능하지만, 네트워크 통신을 위한 소켓은 사용 가능합니다.

### 동적 라이브러리 (Dynamic libraries)
iOS 앱은 동적으로 로드되는 라이브러리를 사용할 수 있지만, 동적으로 로드되는 콘텐츠가 iOS에서 사용하기 위해 패키징되는 방식에 대한 매우 엄격한 요구 사항이 있습니다.

*   동적 바이너리 콘텐츠는 공유 객체(shared objects)나 바이너리 번들(binary bundles)이 아닌 동적 라이브러리로 컴파일되어야 합니다.
*   이들은 앱 번들에 `Frameworks`로 패키징되어야 합니다.
*   각 `Framework`는 단일 동적 라이브러리만 포함할 수 있습니다.
*   `Framework`는 iOS 앱의 `Frameworks` 폴더에 포함되어야 합니다.
*   `Framework`는 라이브러리가 아닌 콘텐츠를 포함할 수 없습니다.

이는 CPython의 작동에 몇 가지 제약을 부과합니다. 바이너리 모듈을 `lib-dynload` 및/또는 `site-packages` 폴더에 저장할 수 없으며, 앱의 `Frameworks` 폴더에 저장해야 하며 각 모듈은 `Framework`로 래핑되어야 합니다. 이는 Python 모듈이 Python 모듈의 `__file__` 속성을 사용하여 바이너리 모듈의 위치를 구성할 수 있다는 일반적인 가정이 더 이상 유효하지 않음을 의미합니다.

### 콘솔 및 대화형 사용 (Console and interactive usage)
전통적인 CPython REPL 또는 대화형 "`python.exe`"의 배포는 이 작업의 목표로 간주되어서는 안 됩니다. 모바일 기기(iOS 포함)는 TTY 스타일 콘솔을 제공하지 않습니다. `stdin`, `stdout` 또는 `stderr`를 제공하지 않습니다. iOS는 시스템 로그를 제공하며, 모든 `stdout` 및 `stderr` 콘텐츠를 시스템 로그로 리디렉션하도록 설정할 수 있지만, `stdin`에 대한 유사한 기능은 없습니다.

또한, iOS는 런타임에 추가 코드를 다운로드하는 것에 제한을 둡니다 (이러한 동작은 앱 스토어 심사를 우회하려는 시도와 기능적으로 구별할 수 없기 때문입니다). 결과적으로, 전통적인 "`가상 환경을 만들고 pip install`" 개발 경험은 iOS에서 실행 가능하지 않을 것입니다.

REPL 인터페이스를 제공하는 네이티브 iOS 애플리케이션을 빌드하는 것은 가능합니다. 이는 IDLE 스타일 사용자 경험에 더 가깝지만, Tkinter는 iOS에서 사용할 수 없으므로 모든 앱은 처음부터 다시 작성해야 합니다. 이 작업의 초점은 IDE 스타일 네이티브 인터페이스가 활용할 수 있는 임베디드 배포를 제공하는 것이며, 사용자 대면 "앱" 인터페이스가 아닙니다.

## 명세 (Specification)

### 플랫폼 식별 (Platform identification)

#### `sys`
`sys.platform`은 시뮬레이터와 물리적 기기 모두에서 "`ios`"로 식별됩니다.
`sys.implementation._multiarch`는 ABI 및 CPU 아키텍처를 다음과 같이 설명합니다:
*   ARM64 기기: "`arm64-iphoneos`"
*   ARM64 시뮬레이터: "`arm64-iphonesimulator`"
*   x86_64 시뮬레이터: "`x86_64-iphonesimulator`"

#### `platform`
`platform` 모듈은 iOS 특정 세부 정보를 반환하도록 수정됩니다. 대부분의 `platform` 모듈 반환 값은 `os.uname()`이 반환하는 값과 일치하지만, 다음은 예외입니다:
*   `platform.system()`: "`Darwin`" 대신 "`iOS`" 또는 "`iPadOS`" (사용 중인 하드웨어에 따라 다름)
*   `platform.release()`: Darwin 커널 버전 대신 iOS 버전 번호 (예: "`16.6.1`")

또한, `platform.ios_ver()` 메서드가 추가됩니다. 이는 macOS 버전 정보를 제공하는 데 사용되는 `platform.mac_ver()`를 미러링합니다. `ios_ver()`는 다음을 포함하는 namedtuple을 반환합니다:
*   `system`: OS 이름 (하드웨어에 따라 `iOS` 또는 `iPadOS`)
*   `release`: iOS 버전 (예: "`16.6.1`")
*   `model`: 기기의 모델 식별자 (예: "`iPhone13,2`"). 시뮬레이터에서는 시뮬레이터 기기에 따라 "`iPhone`" 또는 "`iPad`"를 반환합니다.
*   `is_simulator`: 기기가 시뮬레이터인지 여부를 나타내는 부울 값.

#### `os`
`os.uname()`은 POSIX `uname()` 호출의 원시 결과를 반환합니다. 이는 다음 값을 초래합니다:
*   `sysname`: "`Darwin`"
*   `release`: Darwin 커널 버전 (예: "`22.6.0`")

이 접근 방식은 `os` 모듈을 시스템 API에 대한 "원시" 인터페이스로, `platform` 모듈을 더 일반적으로 유용한 값을 제공하는 상위 수준 API로 취급합니다.

#### `sysconfig`
`sysconfig` 모듈은 `sysconfig.get_platform()`의 일부로 최소 iOS 버전을 사용합니다 (예: "`ios-12.0-arm64-iphoneos`"). `sysconfigdata_name` 및 `Config` makefile은 기존 플랫폼과 동일한 패턴을 따르며 ( `sys.platform`, `sys.implementation._multiarch` 등을 사용하여) 식별자를 구성합니다.

### 서브프로세스 지원 (Subprocess support)
iOS는 WASI/Emscripten에 의해 확립된 서브프로세스 비활성화 패턴을 활용할 것입니다. 서브프로세스를 시작하려는 시도가 있을 경우 `subprocess` 모듈은 예외를 발생시키고, `os.fork` 및 `os.spawn` 호출은 `OSError`를 발생시킬 것입니다.

### 동적 모듈 로딩 (Dynamic module loading)
iOS 동적 로딩을 수용하기 위해, `importlib` 부트스트랩은 Python 바이너리 모듈에 대한 요청을 `Framework` 위치로 변환할 수 있는 `metapath finder`를 추가하도록 확장될 것입니다. 이 finder는 `sys.platform == "ios"`일 때만 설치됩니다.

이 finder는 Python 모듈 이름 (예: `foo.bar._whiz`)을 `framework` 이름으로 전체 모듈 이름을 사용하여 고유한 `Framework` 이름 (즉, `foo.bar._whiz.framework`)으로 변환합니다. `Framework`는 디렉토리이며, finder는 해당 디렉토리에서 `foo.bar._whiz`라는 바이너리를 찾을 것입니다.

### 컴파일 (Compilation)
지원되는 유일한 바이너리 형식은 iOS 호환 `framework` 형식으로 패키징된 동적 링크 가능한 `libpython3.x.dylib`입니다. `—undefined dynamic_lookup` 컴파일러 옵션은 현재 작동하지만, 이 옵션의 장기적인 생존 가능성은 보장할 수 없습니다. 불확실한 미래를 가진 컴파일러 플래그에 의존하기보다는, iOS 바이너리 모듈은 `libpython3.x.dylib`와 링크될 것입니다. 이는 iOS 바이너리 모듈이 `libpython3.x.a`에 정적으로 링크된 실행 파일에 의해 로드될 수 없음을 의미합니다. 따라서 정적 `libpython3.x.a` iOS 라이브러리는 지원되지 않을 것입니다. 이는 Windows에서 CPython이 사용하는 것과 동일한 패턴입니다.

### 배포 (Distribution)
iOS를 Tier 3 플랫폼으로 추가하는 것은 패치되지 않은 CPython 코드 체크아웃에서 iOS 호환 빌드를 컴파일하기 위한 지원을 추가하는 것만 요구합니다. 최종 사용자를 위한 공식적으로 배포되는 iOS 아티팩트의 생산을 요구하지는 않습니다.

### CI 리소스 (CI resources)
Anaconda는 iOS 빌드봇을 실행하기 위한 물리적 하드웨어를 제공하겠다고 제안했습니다. GitHub Actions는 macOS 머신에서 iOS 시뮬레이터를 호스팅할 수 있으며, iOS 시뮬레이터는 스크립팅 환경으로 제어될 수 있습니다.

### 패키징 (Packaging)
iOS는 "유니버설" wheel 형식을 제공하지 않을 것입니다. 대신, 각 ABI-arch 조합에 대한 wheel이 제공될 것입니다.
iOS wheel은 다음 태그를 사용합니다:
*   `ios_12_0_arm64_iphoneos`
*   `ios_12_0_arm64_iphonesimulator`
*   `ios_12_0_x86_64_iphonesimulator`

이러한 태그에서 "12.0"은 최소 지원 iOS 버전입니다.

### PEP 11 업데이트 (PEP 11 Update)
PEP 11은 다음 두 가지 iOS ABI를 포함하도록 업데이트될 것입니다:
*   `arm64-apple-ios`
*   `arm64-apple-ios-simulator`

`x86_64-apple-ios-simulator` 타겟은 최선을 다해 지원되겠지만, Tier 3 지원 대상은 아닐 것입니다.

## 하위 호환성 (Backwards Compatibility)
새로운 플랫폼을 추가하는 것은 CPython 자체에 어떠한 하위 호환성 문제도 발생시키지 않습니다. 역사적으로 CPython 지원을 제공해 온 프로젝트(예: BeeWare 및 Kivy)에 일부 하위 호환성 문제가 있을 수 있습니다.

## 보안 문제 (Security Implications)
iOS를 새로운 플랫폼으로 추가하는 것은 어떠한 보안 문제도 추가하지 않습니다.

## 교육 방법 (How to Teach This)
이 PEP와 관련된 교육 필요성은 주로 최종 사용자가 자신의 Xcode 프로젝트에 iOS 지원을 추가하는 방법에 관한 것입니다. 이는 해당 프로세스에 대한 문서 및 튜토리얼을 통해 달성될 수 있습니다.

## 참조 구현 (Reference Implementation)
BeeWare Python-Apple-support 저장소는 배포 가능한 아티팩트를 컴파일하기 위한 참조 패치 및 빌드 도구를 포함하고 있습니다. Briefcase는 iOS 시뮬레이터에서 테스트 스위트를 실행하는 코드의 참조 구현을 제공합니다.

## 기각된 아이디어 (Rejected Ideas)

### 시뮬레이터 식별 (Simulator identification)
이 PEP의 초기 버전에서는 코드가 기기에서 실행되는지 또는 시뮬레이터에서 실행되는지 식별하기 위해 `sys.implementation._simulator` 속성을 포함할 것을 제안했습니다. 이는 공개 API에 보호된 이름을 사용하는 것과 iOS 특정 세부 정보로 `sys` 네임스페이스를 오염시키는 문제로 인해 기각되었습니다.

### "유니버설" wheel 형식 ("Universal" wheel format)
macOS는 현재 두 가지 CPU 아키텍처를 지원하며, 최종 사용자 개발 경험을 돕기 위해 Python은 `x86_64` 및 `ARM64` 바이너리를 모두 포함하는 "`universal2`" wheel 형식을 정의합니다. 개념적으로 유사한 "유니버설" iOS wheel 형식을 제공하는 것도 가능했지만, 이 PEP는 두 가지 이유로 이 접근 방식을 사용하지 않습니다.

첫째, macOS에서의 경험, 특히 수치 Python 생태계에서는 유니버설 wheel을 수용하기가 매우 어려웠습니다. 둘째, iOS는 훨씬 더 유동적인 "유니버설" 정의를 필요로 할 것이라는 역사적 경험이 있습니다. iOS wheel을 단일 플랫폼 전용으로 지정하면 Python 핵심 팀은 업데이트된 "유니버설" 형식에 대한 지속적인 표준화 논의를 피할 수 있습니다. 이는 또한 wheel 발행자가 지원 가능한 플랫폼에 대해 프로젝트별 결정을 내릴 수 있음을 의미합니다.

### 정적 빌드 지원 (Supporting static builds)
`—undefined dynamic_lookup` 옵션의 장기적인 생존 가능성은 보장할 수 없지만, 이 옵션은 존재하며 작동합니다. 경고를 무시하고 Apple이 폐기 결정을 철회하거나 폐기를 확정하지 않기를 바라는 한 가지 옵션이 있을 수 있습니다. 그러나 Apple의 의사 결정 과정이 완전히 불투명하다는 점을 고려할 때, 이는 위험한 옵션일 것입니다. 정적으로 링크된 `libpython3.x.a` iOS 라이브러리의 유일한 이점은 앱 시작 시간이 아주 약간 줄어든다는 점이므로, `libpython3.x`의 정적 빌드 지원을 생략하는 것이 합리적인 타협안으로 보입니다.

### 대화형/REPL 모드 (Interactive/REPL mode)
모바일 기기에는 명령줄이 없기 때문에 전통적인 `python.exe` 명령줄 경험은 모바일 기기에서 실제로 실행 가능하지 않습니다. iOS 앱에는 `stdout`, `stderr`, `stdin`이 없으며, `stdout`과 `stderr`를 시스템 로그로 리디렉션할 수 있지만, IDLE 스타일 IDE 경험에 더 가까운 매우 특정 사용자 대면 앱을 구축하는 것을 포함하지 않는 `stdin`의 원본은 존재하지 않습니다. 따라서 "임베디드 모드"만을 모바일 배포의 대상으로 삼기로 결정했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.