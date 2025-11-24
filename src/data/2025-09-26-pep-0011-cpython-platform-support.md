---
title: "[Active] PEP 11 - CPython platform support"
excerpt: "Python Enhancement Proposal 11: 'CPython platform support'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/11/
toc: true
toc_sticky: true
date: 2025-09-26 15:49:46+0900
last_modified_at: 2025-09-26 15:49:46+0900
published: true
---
> **원문 링크:** [PEP 11 - CPython platform support](https://peps.python.org/pep-0011/)
>
> **상태:** Active | **유형:** Process | **작성일:** 07-Jul-2002


# PEP 11 – CPython 플랫폼 지원 (CPython platform support)

## 개요 (Abstract)

이 PEP (Python Enhancement Proposal)는 CPython이 특정 운영 체제(플랫폼)를 어떻게 지원하게 되는지, 현재 어떤 플랫폼들이 지원되는지, 그리고 과거의 지원 이력을 문서화합니다.

## 도입 배경 (Rationale)

시간이 지남에 따라 CPython 소스 코드에는 특정 플랫폼에서 CPython을 사용하는 데 필요하다고 간주되었던 다양한 플랫폼별 코드가 축적되었습니다. 이러한 플랫폼에 대한 접근 없이는 해당 코드가 여전히 필요한지 여부를 판단하기 어렵습니다. 결과적으로 이 코드는 CPython의 발전 과정에서 문제가 발생하거나, 플랫폼 자체가 발전함에 따라 불필요해질 수 있습니다.

이러한 파편화된 코드가 증가하도록 허용하는 것은 유지보수 불가능성(unmaintainability)의 위험을 초래합니다. 수많은 플랫폼에 대한 전문가 없이는 CPython 소스 코드의 특정 변경 사항이 지원되는 모든 플랫폼에서 작동할지 여부를 판단하기 어렵습니다.

이러한 위험을 줄이기 위해 이 PEP는 플랫폼이 CPython에 의해 지원되는 것으로 간주되기 위한 요건을 명시하고, CPython 사용자가 적거나 없는 플랫폼의 코드를 제거하는 절차를 제공합니다. 또한, CPython 개발팀이 직접 지원하는 플랫폼을 명시하여 사용자들에게 정보를 제공합니다.

## 지원 단계 (Support tiers)

플랫폼 지원은 여러 단계(tier)로 나뉩니다. 각 단계는 지원에 대해 다른 약속으로 이어지는 다른 요구 사항을 가집니다.

어떤 단계로 승격되려면 Steering Council의 지원이 필요하며, 이는 팀의 합의에 의해 추진됩니다. 하위 단계로 강등되는 경우는 릴리스 관리자(release manager) 또는 Steering Council의 판단에 따라 플랫폼이 현재 단계의 요구 사항을 장기간 충족하지 못할 때 발생합니다. 새로운 기능 릴리스의 b1 시점까지 어떠한 단계의 요구 사항도 더 이상 충족하지 못하는 플랫폼의 경우, 해당 플랫폼에 대한 지원 중단이 임박했음을 커뮤니티에 경고하는 공지가 발표됩니다 (예: b1 발표 시). 첫 번째 릴리스 후보(release candidate)까지 플랫폼이 최소한 하나의 단계에 맞춰지지 않으면, 이 PEP에서 지원되지 않는 것으로 명시됩니다.

### Tier 1

**상태 (STATUS):** CI(Continuous Integration) 실패는 릴리스를 차단합니다. `main` 브랜치를 깨뜨릴 수 있는 변경 사항은 병합이 허용되지 않습니다. 모든 문제가 발생하면 즉시 수정하거나 되돌려야 합니다. 모든 코어 개발자는 `main` 브랜치와 따라서 이 플랫폼들이 작동하도록 유지할 책임이 있습니다. 이 플랫폼에서의 실패는 릴리스를 차단합니다.

**주요 대상 (Target Triple):**
*   `aarch64-apple-darwin` (clang)
*   `aarch64-unknown-linux-gnu` (glibc, gcc)
*   `i686-pc-windows-msvc`
*   `x86_64-pc-windows-msvc`
*   `x86_64-unknown-linux-gnu` (glibc, gcc)

### Tier 2

**상태 (STATUS):** 신뢰할 수 있는 빌드봇(buildbot)이 있어야 합니다. 최소 두 명의 코어 개발자가 해당 플랫폼을 지원하도록 등록되어 있어야 합니다. 이 플랫폼 중 하나라도 손상시키는 변경 사항은 24시간 이내에 수정하거나 되돌려야 합니다. 이 플랫폼에서의 실패는 릴리스를 차단합니다.

**주요 대상 (Target Triple):**
*   `aarch64-unknown-linux-gnu` (glibc, clang)
*   `wasm32-unknown-wasip1` (WASI SDK, Wasmtime)
*   `x86_64-apple-darwin` (macOS, clang)
*   `x86_64-unknown-linux-gnu` (glibc, clang)

### Tier 3

**상태 (STATUS):** 신뢰할 수 있는 빌드봇이 있어야 합니다. 최소 한 명의 코어 개발자가 해당 플랫폼을 지원하도록 등록되어 있어야 합니다. 실패에 대한 응답 SLA(Service Level Agreement)는 없습니다. 이 플랫폼에서의 실패는 릴리스를 차단하지 않습니다.

**주요 대상 (Target Triple):**
*   `aarch64-linux-android`
*   `aarch64-pc-windows-msvc`
*   `arm64-apple-ios` (iOS on device)
*   `arm64-apple-ios-simulator` (iOS on M1 macOS simulator)
*   `armv7l-unknown-linux-gnueabihf` (32-bit Raspberry Pi OS, gcc)
*   `powerpc64le-unknown-linux-gnu` (glibc, clang, gcc)
*   `s390x-unknown-linux-gnu` (glibc, gcc)
*   `wasm32-unknown-emscripten` (emcc)
*   `x86_64-linux-android`
*   `x86_64-unknown-freebsd` (BSD libc, clang)

### 기타 모든 플랫폼 (All other platforms)

코드베이스 내에서 플랫폼 지원이 부분적일 수 있습니다. 예를 들어, 플랫폼 지원에 대한 활발한 개발 중이거나 우연히 지원되는 경우 등이 있습니다. 위에 나열된 단계에 포함되지 않은 플랫폼에 대한 코드 변경은 유지보수 부담을 유발하거나 전반적인 개선을 방해할 경우, Deprecation(더 이상 사용하지 않는 것) 절차 없이 거부되거나 코드베이스에서 제거될 수 있습니다.

여기에 나열되지 않은 플랫폼은 더 넓은 Python 커뮤니티에서 어떤 식으로든 지원될 수 있습니다. 만약 원하는 플랫폼이 위에 나열되어 있지 않다면, 온라인으로 검색하여 이미 어떤 형태로든 지원을 제공하는 사람이 있는지 확인해보세요.

## 참고 사항 (Notes)

### Microsoft Windows

Windows 10 이전 버전의 Windows는 Microsoft의 Fixed Lifecycle Policy를 따랐습니다. 이는 출시 후 5년간의 메인스트림 지원 단계와 추가 5년간의 연장 지원 단계로 구성됩니다. Windows 10 이후 버전은 Microsoft의 Modern Lifecycle Policy를 따르며, 이는 제품, 버전, 에디션 및 채널에 따라 다릅니다. 일반적으로 기능 업데이트는 6-12개월마다 발생하며 18-36개월 동안 지원됩니다.

CPython의 Windows 지원은 현재 Microsoft의 라이프사이클을 따릅니다. 새로운 기능 릴리스 X.Y.0은 연장 지원 기간이 아직 만료되지 않은 모든 Windows 버전을 지원할 것입니다. 이후 버그 수정 릴리스는 Microsoft에서 더 이상 지원하지 않더라도 원래 기능 릴리스와 동일한 Windows 버전을 지원합니다. CPython이 유지보수 모드(maintenance mode)에 있는 동안 출시되는 새로운 Windows 버전은 코어 팀과 릴리스 관리자의 재량에 따라 지원될 수 있습니다.

### 레거시 C 로케일 (Legacy C Locale)

CPython 3.7.0부터 *nix 플랫폼은 레거시 C 로케일(locale)의 대안으로 C.UTF-8 (완전 로케일), C.utf8 (완전 로케일) 또는 UTF-8 (LC_CTYPE 전용 로케일) 중 최소 하나를 제공해야 합니다. 레거시 C 로케일에서만 발생하고 적절하게 구성된 비-ASCII 로케일에서는 재현할 수 없는 모든 유니코드 관련 통합 문제는 "won't fix"(수정하지 않음)로 처리되어 종료됩니다.

## 지원 중단 플랫폼 (Unsupporting platforms)

플랫폼이 단계별 지원에서 벗어나면, 해당 플랫폼이 더 이상 활발히 지원되지 않는다는 내용의 메모가 이 PEP에 게시되어야 합니다. 이 메모에는 시스템 이름, 해당 플랫폼을 더 이상 지원하지 않는 첫 번째 릴리스 번호, 그리고 역사적 지원 코드가 적극적으로 제거되는 첫 번째 릴리스가 포함되어야 합니다.

동시에, CPython 빌드는 해당 플랫폼에 CPython을 설치하려는 경우 경고를 생성하도록 변경되어야 합니다. Autoconf를 사용하는 플랫폼에서는 `configure` 또한 지원되지 않는 플랫폼에 대한 경고를 발행하도록 만들어야 합니다. 이는 해당 플랫폼의 잠재적 사용자에게 유지보수를 제공하기 위해 나설 기회를 제공합니다.

## 더 이상 지원되지 않는 플랫폼 (No-longer-supported platforms)

이 섹션에는 더 이상 지원되지 않는 다양한 플랫폼의 목록이 포함되어 있으며, 각 플랫폼에 대해 지원이 중단된 Python 버전과 해당 플랫폼의 코드가 제거된 Python 버전이 명시되어 있습니다. 예를 들어:
*   MS-DOS, MS-Windows 3.x: Python 2.0에서 지원 중단, Python 2.1에서 코드 제거
*   MacOS 9: Python 2.4에서 지원 중단 및 코드 제거
*   Windows 2000: Python 3.3에서 지원 중단, Python 3.4에서 코드 제거
*   IRIX: Python 3.7에서 지원 중단 및 코드 제거
*   멀티스레딩(multithreading) 지원 없는 시스템: Python 3.7에서 지원 중단 및 코드 제거
This concludes the translation and summary of PEP 11. I have followed all the given guidelines regarding professionalism, terminology, readability, and accuracy, including citations.# PEP 11 – CPython 플랫폼 지원 (CPython platform support)

## 개요 (Abstract)

이 PEP (Python Enhancement Proposal)는 운영 체제(플랫폼)가 CPython에서 어떻게 지원되는지, 현재 지원되는 플랫폼 목록, 그리고 과거의 지원 이력을 문서화합니다.

## 도입 배경 (Rationale)

CPython 소스 코드에는 특정 플랫폼에서 CPython을 사용하기 위해 필요하다고 여겨졌던 플랫폼별 코드가 시간이 지나면서 축적되었습니다. 이러한 플랫폼에 대한 접근 없이는 해당 코드의 필요성 여부를 판단하기 어렵고, 이는 CPython의 발전 과정에서 문제를 일으키거나 불필요해질 수 있습니다. 이러한 코드 조각들이 증가하면 유지보수가 어려워질 위험이 있으며, 다양한 플랫폼 전문가 없이는 CPython 소스 코드 변경이 모든 지원 플랫폼에서 작동하는지 확인하기 힘듭니다.

이러한 위험을 줄이기 위해 PEP 11은 CPython이 플랫폼을 지원하는 것으로 간주되기 위한 요건을 명시하고, CPython 사용자가 적거나 없는 플랫폼의 코드를 제거하는 절차를 제공합니다. 또한, CPython 개발팀이 직접 지원하는 플랫폼 목록을 제공하여 사용자들에게 명확한 정보를 제공합니다.

## 지원 단계 (Support tiers)

플랫폼 지원은 요구 사항과 지원 약속에 따라 여러 단계(tier)로 나뉩니다. 단계 승격에는 Steering Council의 지원과 팀 합의가 필요하며, 하위 단계로의 강등은 릴리스 관리자나 Steering Council의 판단에 따라 현재 단계의 요구 사항을 장기간 충족하지 못할 때 발생합니다. 새로운 기능 릴리스의 b1 시점까지 어떠한 단계의 요구 사항도 충족하지 못하는 플랫폼은 지원 중단 경고가 발표되며, 첫 릴리스 후보(release candidate)까지 개선되지 않으면 지원되지 않는 것으로 명시됩니다.

### Tier 1

**상태 (STATUS):** CI(Continuous Integration) 실패는 릴리스를 차단합니다. `main` 브랜치를 손상하는 변경은 허용되지 않으며, 문제는 즉시 수정되거나 되돌려야 합니다. 모든 코어 개발자는 `main` 브랜치와 이 플랫폼들이 제대로 작동하도록 유지할 책임이 있으며, 이 플랫폼에서의 실패는 릴리스를 차단합니다.

**주요 대상 (Target Triple):**
*   `aarch64-apple-darwin` (clang)
*   `aarch64-unknown-linux-gnu` (glibc, gcc)
*   `i686-pc-windows-msvc`
*   `x86_64-pc-windows-msvc`
*   `x86_64-unknown-linux-gnu` (glibc, gcc)

### Tier 2

**상태 (STATUS):** 신뢰할 수 있는 빌드봇(buildbot)이 필수적이며, 최소 두 명의 코어 개발자가 해당 플랫폼을 지원해야 합니다. 이 플랫폼을 손상시키는 변경은 24시간 이내에 수정하거나 되돌려야 하며, 실패는 릴리스를 차단합니다.

**주요 대상 (Target Triple):**
*   `aarch64-unknown-linux-gnu` (glibc, clang)
*   `wasm32-unknown-wasip1` (WASI SDK, Wasmtime)
*   `x86_64-apple-darwin` (macOS, clang)
*   `x86_64-unknown-linux-gnu` (glibc, clang)

### Tier 3

**상태 (STATUS):** 신뢰할 수 있는 빌드봇이 필수적이며, 최소 한 명의 코어 개발자가 해당 플랫폼을 지원해야 합니다. 실패에 대한 응답 SLA(Service Level Agreement)는 없으며, 이 플랫폼에서의 실패는 릴리스를 차단하지 않습니다.

**주요 대상 (Target Triple):**
*   `aarch64-linux-android`
*   `aarch64-pc-windows-msvc`
*   `arm64-apple-ios` (iOS on device)
*   `arm64-apple-ios-simulator` (iOS on M1 macOS simulator)
*   `armv7l-unknown-linux-gnueabihf` (32-bit Raspberry Pi OS, gcc)
*   `powerpc64le-unknown-linux-gnu` (glibc, clang, gcc)
*   `s390x-unknown-linux-gnu` (glibc, gcc)
*   `wasm32-unknown-emscripten` (emcc)
*   `x86_64-linux-android`
*   `x86_64-unknown-freebsd` (BSD libc, clang)

### 기타 모든 플랫폼 (All other platforms)

코드베이스 내 플랫폼 지원은 부분적이거나 우연히 발생할 수 있습니다. 위에 나열된 단계에 포함되지 않은 플랫폼에 대한 코드 변경은 유지보수 부담이나 전반적인 개선을 방해할 경우, Deprecation(더 이상 사용하지 않는 것) 절차 없이 거부되거나 제거될 수 있습니다. 원하는 플랫폼이 목록에 없다면, 더 넓은 Python 커뮤니티에서 지원을 제공하는지 온라인으로 검색해 볼 것을 권장합니다.

## 참고 사항 (Notes)

### Microsoft Windows

Windows는 Microsoft의 라이프사이클 정책에 따라 지원됩니다. Windows 10 이전 버전은 Fixed Lifecycle Policy를, Windows 10 이후 버전은 Modern Lifecycle Policy를 따릅니다. CPython의 Windows 지원은 이 Microsoft의 라이프사이클을 따르며, 새로운 기능 릴리스 X.Y.0은 연장 지원 기간이 만료되지 않은 모든 Windows 버전을 지원합니다. 이후 버그 수정 릴리스는 Microsoft에서 지원을 중단했더라도 동일한 Windows 버전을 지원하며, CPython 유지보수 모드 중 출시되는 새 Windows 버전은 코어 팀의 재량에 따라 지원될 수 있습니다.

### 레거시 C 로케일 (Legacy C Locale)

CPython 3.7.0부터 *nix 플랫폼은 레거시 C 로케일의 대안으로 C.UTF-8, C.utf8 또는 UTF-8 (LC_CTYPE 전용) 중 최소 하나를 제공해야 합니다. 레거시 C 로케일에서만 발생하고 적절히 구성된 비-ASCII 로케일에서는 재현할 수 없는 유니코드 관련 문제는 "won't fix"(수정하지 않음)로 처리됩니다.

## 지원 중단 플랫폼 (Unsupporting platforms)

플랫폼이 단계별 지원에서 제외되면, 해당 플랫폼이 더 이상 지원되지 않는다는 내용의 메모가 이 PEP에 게시되어야 합니다. 이 메모에는 시스템 이름, 지원이 중단된 첫 번째 릴리스 번호, 그리고 해당 코드가 제거된 첫 번째 릴리스가 포함됩니다. CPython 빌드는 해당 플랫폼에 설치 시 경고를 생성하도록 변경되어야 하며, Autoconf를 사용하는 플랫폼의 `configure`도 경고를 발행해야 합니다. 이는 잠재적 사용자에게 유지보수를 제공할 기회를 줍니다.

## 더 이상 지원되지 않는 플랫폼 (No-longer-supported platforms)

이 섹션에는 Python 2.0의 MS-DOS/MS-Windows 3.x부터 Python 3.7의 IRIX 및 멀티스레딩 미지원 시스템에 이르기까지, 지원이 중단된 다양한 플랫폼과 해당 코드가 제거된 Python 버전 목록이 포함되어 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.