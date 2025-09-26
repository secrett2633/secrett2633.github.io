---
title: "[Superseded] PEP 513 - A Platform Tag for Portable Linux Built Distributions"
excerpt: "Python Enhancement Proposal 513: 'A Platform Tag for Portable Linux Built Distributions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/513/
toc: true
toc_sticky: true
date: 2025-09-26 23:03:09+0900
last_modified_at: 2025-09-26 23:03:09+0900
published: true
---
> **원문 링크:** [PEP 513 - A Platform Tag for Portable Linux Built Distributions](https://peps.python.org/pep-0513/)
>
> **상태:** Superseded | **유형:** Informational | **작성일:** 19-Jan-2016

## PEP 513 – 휴대용 Linux 빌드 배포판을 위한 플랫폼 태그

### 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 Python 패키지 빌드 배포판, 특히 `wheels`를 위한 새로운 플랫폼 태그인 `manylinux1_{x86_64,i686}` 생성을 제안합니다. 이 태그를 사용하는 `wheels`는 표준화되고 제한된 Linux 커널 및 핵심 사용자 공간 ABI(Application Binary Interface)의 하위 집합에만 외부 종속성을 가집니다. PyPI(Python Package Index)가 이 플랫폼 태그를 가진 `wheels`의 업로드 및 배포를 지원하고, `pip`는 호환 가능한 플랫폼에서 이 패키지들을 다운로드 및 설치할 수 있도록 지원하는 것을 목표로 합니다.

### 배경 (Rationale)
현재 Windows 및 OS X용 바이너리 Python 확장을 배포하는 것은 간단합니다. 개발자들은 `wheels` (PEP 427, PEP 491)를 빌드하여 `win32` 또는 `macosx_10_6_intel`과 같은 플랫폼 태그를 할당하고 PyPI에 업로드합니다. 사용자들은 `pip`와 같은 도구를 사용하여 이 `wheels`를 다운로드하고 설치할 수 있습니다.

그러나 Linux의 경우 상황이 훨씬 복잡합니다. 일반적으로 한 Linux 배포판에서 빌드된 컴파일된 Python 확장 모듈은 다른 Linux 배포판에서는 작동하지 않거나, 심지어 동일한 Linux 배포판을 실행하는 다른 시스템에서도 시스템 라이브러리가 다르면 작동하지 않을 수 있습니다.

PEP 425 플랫폼 태그를 사용하는 빌드 도구는 특정 Linux 배포판이나 설치된 시스템 라이브러리에 대한 정보를 추적하지 않고, 모든 `wheels`에 `linux_i686` 또는 `linux_x86_64`와 같이 너무 모호한 태그를 할당합니다. 이러한 불확실성 때문에 한 머신에서 컴파일된 `linux` 태그가 붙은 빌드 배포판이 다른 머신에서 제대로 작동할 것이라는 기대가 없으며, 이러한 이유로 PyPI는 Linux용 `wheels` 업로드를 허용하지 않았습니다.

어떤 Linux 시스템에서도 작동할 수 있는 `wheel` 패키지를 컴파일할 수 있다면 이상적일 것입니다. 그러나 PC에서 Android, 그리고 커스텀 `libc`를 사용하는 임베디드 시스템에 이르기까지 Linux 시스템의 엄청난 다양성 때문에 이는 일반적으로 보장될 수 없습니다.

대신, 이 PEP는 실제로 널리 사용되는 모든 데스크톱 및 서버 배포판을 포함하여 많은 Linux 시스템에서 호환될 만큼 충분한 커널 및 핵심 사용자 공간 ABI의 표준 하위 집합을 정의합니다. Enthought의 Canopy 및 Continuum Analytics의 Anaconda와 같은 회사들이 Linux용으로 이처럼 널리 이식 가능한 사전 컴파일된 Python 확장 모듈을 배포해왔기 때문에 이것이 가능하다는 것을 알고 있습니다.

이 회사들로부터 얻은 호환성 교훈을 바탕으로, 바이너리 Python `wheels`에서 사용할 `manylinux1` 플랫폼 태그를 정의하고, 이러한 `manylinux1 wheels`의 구축을 돕기 위한 초기 도구 구현을 소개합니다.

### Linux 바이너리 비호환성의 주요 원인 (Key Causes of Inter-Linux Binary Incompatibility)
`wheel` 패키지가 많은 Linux 플랫폼에서 작동하도록 보장하는 표준을 올바르게 정의하려면, Linux에서 사전 컴파이된 이식성이 저해되는 근본적인 원인(Root Causes)을 이해해야 합니다. 두 가지 주요 원인은 사용자 시스템에 존재하지 않는 공유 라이브러리에 대한 종속성과 `glibc`와 같은 특정 코어 라이브러리의 특정 버전에 대한 종속성입니다.

#### 외부 공유 라이브러리 (External Shared Libraries)
대부분의 데스크톱 및 서버 Linux 배포판에는 시스템 디렉터리(`(/usr/lib)`)에 설치된 공유 라이브러리의 설치를 관리하는 시스템 패키지 관리자(`APT`, `yum`, `pacman` 등)가 함께 제공됩니다. 대부분의 복잡한 Python 확장 기능은 이러한 공유 라이브러리 중 하나 이상에 의존하며, 따라서 사용자가 패키지 관리자를 사용하거나 `LD_LIBRARY_PATH`와 같은 환경 변수를 설정하여 적절한 라이브러리(및 그 적절한 버전)를 설치한 시스템에서만 제대로 작동합니다.

#### 코어 공유 라이브러리 버전 관리 (Versioning of Core Shared Libraries)
Python 확장 모듈 개발자가 외부 공유 라이브러리를 사용하지 않으려 하더라도, 모듈은 일반적으로 GNU C 라이브러리인 `glibc`에 대한 동적 런타임 종속성을 가집니다. `glibc`를 정적으로 링크하는 것이 가능하더라도, `dlopen()`과 같은 일부 중요한 C 함수는 `glibc`를 정적으로 링크하는 코드에서 호출할 수 없기 때문에 일반적으로 좋지 않은 방법입니다. 실제로 시스템에서 제공하는 `glibc`에 대한 런타임 공유 라이브러리 종속성은 피할 수 없습니다.

GNU C 라이브러리의 유지 관리자는 하위 호환성을 위해 엄격한 심볼 버전 관리 체계를 따릅니다. 이를 통해 이전 버전의 `glibc`에 대해 컴파일된 바이너리가 최신 `glibc`를 가진 시스템에서 실행될 수 있도록 보장합니다. 반대는 일반적으로 사실이 아닙니다. 최신 Linux 배포판에서 컴파일된 바이너리는 이전 시스템에서 사용할 수 없는 `glibc`의 버전 관리된 함수에 의존하는 경향이 있습니다.

이것은 일반적으로 최신 Linux 배포판에서 컴파일된 `wheels`가 이식성이 떨어지는 것을 방지합니다.

### manylinux1 정책 (The manylinux1 policy)
이러한 이유로 광범위한 이식성을 달성하기 위해 Python `wheels`는 다음 조건을 충족해야 합니다.

*   극히 제한된 외부 공유 라이브러리 집합에만 의존해야 합니다.
*   해당 외부 공유 라이브러리에서 "오래된" 심볼 버전에만 의존해야 합니다.
*   광범위하게 호환되는 커널 ABI에만 의존해야 합니다.

`manylinux1` 플랫폼 태그를 얻으려면 Python `wheel`은 다음 조건을 모두 충족해야 합니다.

(a) 다음 목록에 있는 `SONAME`을 가진 라이브러리에만 링크하는 바이너리 실행 파일 및 컴파일된 코드를 포함해야 합니다.

```
libpanelw.so.5 libncursesw.so.5 libgcc_s.so.1 libstdc++.so.6 libm.so.6 libdl.so.2 librt.so.1 libc.so.6 libnsl.so.1 libutil.so.1 libpthread.so.0 libresolv.so.2 libX11.so.6 libXext.so.6 libXrender.so.1 libICE.so.6 libSM.so.6 libGL.so.1 libgobject-2.0.so.0 libgthread-2.0.so.0 libglib-2.0.so.0
```

(b) CentOS 5.11 시스템에서 작동해야 하며, 이 시스템에는 시스템 패키지 관리자가 제공하는 위 라이브러리 버전이 포함되어야 합니다.

`libcrypt.so.1`은 Fedora 30이 `libcrypt.so.2`와 함께 릴리스된 후 화이트리스트에서 소급적으로 제거되었습니다.

CentOS 5는 `x86_64` 및 `i686` 아키텍처에서만 사용할 수 있으므로, 현재 `manylinux1` 정책에서 지원하는 유일한 아키텍처입니다.

Debian 기반 시스템에서 이러한 라이브러리는 `libncurses5`, `libgcc1`, `libstdc++6`, `libc6`, `libx11-6`, `libxext6`, `libxrender1`, `libice6`, `libsm6`, `libgl1-mesa-glx`, `libglib2.0-0` 패키지에 의해 제공됩니다.
RPM 기반 시스템에서 이러한 라이브러리는 `ncurses`, `libgcc`, `libstdc++`, `glibc`, `libXext`, `libXrender`, `libICE`, `libSM`, `mesa-libGL`, `glib2` 패키지에 의해 제공됩니다.

이 목록은 Canopy 및 Anaconda 배포판의 외부 공유 라이브러리 종속성을 확인하여 컴파일되었습니다. 이 두 배포판은 가장 인기 있는 다양한 Python 모듈을 포함하며, 실제로 다양한 Linux 시스템에서 작동하는 것으로 확인되었습니다.

위에서 허용된 많은 시스템 라이브러리는 하위 호환성을 위해 심볼 버전 관리 체계를 사용합니다. CentOS 5.11 버전의 이러한 라이브러리와 함께 제공되는 최신 심볼 버전은 다음과 같습니다.

*   `GLIBC_2.5`
*   `CXXABI_3.4.8`
*   `GLIBCXX_3.4.9`
*   `GCC_4.2.0`

따라서 요구 사항 (b)의 결과로, 위 공유 라이브러리의 버전 관리된 심볼에 의존하는 모든 `wheel`은 다음 버전의 심볼에만 의존할 수 있습니다.

*   `GLIBC <= 2.5`
*   `CXXABI <= 3.4.8`
*   `GLIBCXX <= 3.4.9`
*   `GCC <= 4.2.0`

이러한 권장 사항은 2016년 1월의 관련 논의 결과입니다.

`pip` 또는 PyPI가 이 정책의 세부 사항을 확인하고 강제하려고 시도해서는 안 된다는 점에 유의하십시오(기존 플랫폼 태그(`win32` 등)의 세부 사항을 확인하고 강제하지 않는 것과 마찬가지입니다). 위 텍스트는 (a) 패키지 빌더에게 조언으로, (b) 특정 `wheel`이 일부 시스템에서 작동하지 않을 경우 책임을 할당하는 방법으로 제공됩니다. 만약 `wheel`이 위 정책을 만족하면 이는 사양 또는 설치 도구의 버그입니다. 정책을 만족하지 않으면 `wheel`의 버그입니다. 이 접근 방식의 유용한 결과 중 하나는 더 많은 경험을 쌓으면서 추가 업데이트 및 조정의 가능성을 열어둔다는 것입니다. 예를 들어, 동일한 시스템을 대상으로 하고 동일한 `manylinux1` 플랫폼 태그를 사용하는 "manylinux 1.1" 정책(따라서 `pip` 또는 PyPI에 추가 변경이 필요 없음)을 가질 수 있지만, 문제가 있는 것으로 판명된 라이브러리를 제거하거나 안전한 것으로 판명된 라이브러리를 추가하도록 위 목록을 조정할 수 있습니다.

#### libpythonX.Y.so.1
`libpythonX.Y.so.1`은 `manylinux1` 확장이 링크할 수 있는 라이브러리 목록에 없습니다. 거의 모든 경우에 `libpythonX.Y.so.1`에 명시적으로 링크할 필요가 없습니다. ELF 링킹 방식에 따르면, 인터프리터에 로드되는 확장 모듈은 확장이 `libpython`에 명시적으로 링크되었는지 여부와 관계없이 인터프리터의 모든 심볼에 자동으로 접근할 수 있습니다. 또한, `libpython`에 명시적으로 링크하면 Python이 `--enable-shared` 없이 빌드된 일반적인 구성에서 문제가 발생합니다. 특히 Debian 및 Ubuntu 시스템에서 `apt install pythonX.Y`는 `libpythonX.Y.so.1`을 설치하지도 않으므로, `libpythonX.Y.so.1`에 의존하는 `wheel`은 가져오기(import)에 실패할 수 있습니다.

이러한 방식으로 링크된 확장이 작동하지 않을 수 있는 한 가지 상황은, 호스트 프로그램(예: `apache2`)이 `dlopen()`을 사용하여 CPython 인터프리터를 내장하는 모듈(예: `mod_wsgi`)을 로드하고, 호스트 프로그램이 `dlopen()`에 `RTLD_GLOBAL` 플래그를 전달하지 않을 때입니다. 이 경우 내장된 CPython은 `libpythonX.Y.so.1`에 명시적으로 링크되지 않은 확장 모듈을 로드할 수 없습니다. 다행히 `apache2`는 `RTLD_GLOBAL` 플래그를 설정하며, 우리가 찾을 수 있었던 CPython을 `dlopen` 플러그인을 통해 내장하는 다른 모든 프로그램도 마찬가지이므로, 실제로 심각한 문제는 아닌 것으로 보입니다. Debian/Ubuntu와의 비호환성은 다소 모호한 예외 상황과의 이론적인 비호환성보다 더 큰 문제입니다.

이것은 `manylinux1`의 범위를 넘어서는 다소 복잡하고 미묘한 문제입니다. 더 자세한 논의는를 참조하십시오.

#### UCS-2 vs UCS-4 빌드 (UCS-2 vs UCS-4 builds)
CPython 2.x의 모든 버전과 CPython 3.0-3.2는 `--enable-unicode=ucs2` 구성 플래그를 사용하는 빌드는 유니코드 데이터를 UCS-2(실제로는 UTF-16) 형식으로 저장하고, `--enable-unicode=ucs4` 구성 플래그를 사용하는 빌드는 UCS-4 형식으로 저장하는 두 가지 ABI 비호환 모드로 빌드할 수 있습니다. (CPython 3.3 이상은 항상 UCS-4를 지원하는 다른 저장 방식을 사용합니다.) UCS-2 `wheels`가 UCS-4 CPython에 설치되지 않도록 하려면 어떤 조치가 필요합니다.

이 PEP의 이전 버전에는 이러한 이전 CPython 버전을 대상으로 하는 `manylinux1 wheels`가 항상 UCS-4 ABI를 사용해야 한다는 요구 사항이 포함되어 있었습니다. 그러나 PEP가 처음 수락되고 구현되는 과정에서 `pip`와 `wheel`은 관련 CPython 버전에 대한 ABI 호환성의 이 측면을 추적하고 확인하는 일류(first-class) 지원을 얻었으며, 이는 더 나은 해결책입니다. 따라서 이제 `manylinux1` 플랫폼 태그를 모든 ABI 태그와 함께 사용할 수 있도록 허용합니다. 그러나 호환성을 유지하려면 모든 `manylinux1 wheels`에 비 trivial한 ABI 태그가 포함되도록 하는 것이 중요합니다. 예를 들어, UCS-4 CPython에 대해 빌드된 `wheel`은 다음과 같은 이름을 가질 수 있습니다.

```
PKG-VERSION-cp27-cp27mu-manylinux1_x86_64.whl
^^^^^^ 좋음!
```

UCS-2 ABI에 대해 빌드된 `wheel`은 다음과 같은 이름을 가질 수 있습니다.

```
PKG-VERSION-cp27-cp27m-manylinux1_x86_64.whl
^^^^^ 괜찮음!
```

하지만 다음과 같은 이름의 `wheel`은 절대 안 됩니다.

```
PKG-VERSION-cp27-none-manylinux1_x86_64.whl
^^^^ 나쁨! 이렇게 하지 마세요!
```

이 `wheel`은 UCS-2 및 UCS-4 빌드와 동시에 호환된다고 주장하는데, 이는 잘못된 것입니다.

참고로, UCS-4 ABI가 Linux CPython 배포판에서 훨씬 더 널리 퍼져 있는 것으로 보입니다.

#### fpectl 빌드 vs. no fpectl 빌드 (fpectl builds vs. no fpectl builds)
CPython의 모든 기존 버전은 `configure` 플래그 `--with-fpectl`을 사용하거나 사용하지 않고 빌드할 수 있습니다. 이 플래그는 CPython ABI를 변경하는 것으로 나타났습니다. `no-fpectl` CPython에 대해 빌드된 확장은 `yes-fpectl` CPython과 항상 호환되지만, 역은 반드시 사실이 아닙니다. (증상: 가져오기(import) 시 `PyFPE_jbuf`라는 정의되지 않은 심볼에 대한 오류 발생).

따라서 최대 호환성을 위해 `manylinux1 wheels`를 빌드하는 데 사용되는 CPython은 `--with-fpectl` 플래그 없이 컴파일되어야 하며, `manylinux1` 확장 기능은 `PyFPE_jbuf` 심볼을 참조해서는 안 됩니다.

### 호환되는 `Wheels` 컴파일 (Compilation of Compliant Wheels)
`glibc`, `libgcc`, `libstdc++`가 심볼 버전 관리를 관리하는 방식 때문에, 실제로 대부분의 개발자가 일상 작업에 사용하는 컴파일러 툴체인은 `manylinux1` 호환 `wheels`를 빌드할 수 없습니다. 따라서 `pip wheel` / `bdist_wheel`의 기본 동작을 변경하지 않습니다. 이들은 계속해서 일반 `linux_*` 플랫폼 태그를 생성할 것이며, `manylinux1` 태그가 붙은 `wheels`를 생성하려는 개발자는 두 번째 후처리 단계에서 태그를 변경해야 합니다.

`manylinux1` 표준을 충족하는 `wheels` 컴파일을 지원하기 위해 두 가지 도구의 초기 초안을 제공합니다.

#### Docker 이미지 (Docker Image)
첫 번째 도구는 CentOS 5.11 기반의 Docker 이미지입니다. 이 이미지는 `manylinux1 wheels`를 컴파일하기 위한 사용하기 쉬운 자체 포함 빌드 상자로 권장됩니다. 더 최근에 출시된 Linux 배포판에서 컴파일하면 일반적으로 너무 새로운 버전 관리된 심볼에 대한 종속성이 도입됩니다. 이 이미지는 완전한 컴파일러 스위트(`gcc`, `g++`, `gfortran 4.8.2`)와 최신 Python 및 `pip` 릴리스와 함께 제공됩니다.

#### Auditwheel
두 번째 도구는 `auditwheel`이라는 명령줄 실행 파일로, 패키지 관리자가 타사 외부 종속성을 처리하는 데 도움이 될 수 있습니다.

위 정책을 충족하는 방식으로 타사 외부 라이브러리를 사용하는 `wheels`를 빌드하는 방법은 최소 세 가지가 있습니다.

1.  타사 라이브러리를 정적으로 링크할 수 있습니다.
2.  타사 공유 라이브러리를 `wheel`이 의존하는 PyPI의 별도 패키지로 배포할 수 있습니다.
3.  타사 공유 라이브러리를 `wheel` 라이브러리 내부에 번들로 제공하고 상대 경로로 링크할 수 있습니다.

이러한 모든 옵션은 다른 패키지 및 커뮤니티에서 효과적으로 사용될 수 있는 유효한 옵션입니다. 정적 링크는 일반적으로 빌드 시스템에 패키지별 수정이 필요하며, PyPI에 타사 종속성을 배포하려면 패키지 사용자 커뮤니티의 일부 조정이 필요할 수 있습니다.

이러한 옵션에 대한 종종 자동적인 대안으로 `auditwheel`을 소개합니다. 이 도구는 `wheel` 내부의 모든 ELF 파일을 검사하여 버전 관리된 심볼 또는 외부 공유 라이브러리에 대한 종속성을 확인하고 `manylinux1` 정책과의 일치를 검증합니다. 여기에는 호환되는 `wheels`에 새 플랫폼 태그를 추가하는 기능이 포함됩니다. 더 중요한 것은 `auditwheel`은 외부 공유 라이브러리에 의존하는 `wheels`를 시스템에서 `wheel` 자체로 해당 공유 라이브러리를 복사하고, 런타임에 이러한 라이브러리가 선택되도록 적절한 RPATH 항목을 수정하여 자동으로 `wheels`를 수정하는 기능을 가지고 있다는 것입니다. 이는 빌드 시스템 변경 없이 라이브러리가 정적으로 링크된 것과 유사한 결과를 달성합니다. 패키지 관리자는 번들링이 정적 링크와 마찬가지로 저작권 문제를 야기할 수 있음을 유의해야 합니다.

### Linux의 번들 `Wheels` (Bundled Wheels on Linux)
`manylinux1 wheels` 내에서 타사 라이브러리 종속성을 처리하는 여러 가지 접근 방식을 인정하지만, `manylinux1` 정책은 외부 종속성을 번들링하는 것을 권장하며, 이는 많은 Linux 배포판의 시스템 패키지 관리자의 패키지 관리 정책과 상반되는 관행입니다. 이의 주요 목적은 크로스-배포판(cross-distro) 호환성입니다. 또한 PyPI의 `manylinux1 wheels`는 시스템 패키지 관리자를 통해 제공되는 Python 패키지와는 다른 틈새시장을 차지합니다.

이 PEP에서 일반적인 Linux 배포판의 번들 해제 정책에서 벗어나도록 권장하는 결정은 다음 우려 사항에 따라 이루어졌습니다.

*   자동화된 지속적인 통합(Continuous Integration) 및 배포(Deployment) 파이프라인 시대에는 새로운 버전을 게시하고 종속성을 업데이트하는 것이 이러한 정책이 정의되었을 때보다 쉽습니다.
*   `pip` 사용자는 사전 빌드된 `wheel` 파일을 사용하는 대신 로컬 빌드를 강제하고 싶다면 여전히 `--no-binary` 옵션을 자유롭게 사용할 수 있습니다.
*   현대적인 컨테이너 기반 배포 및 "불변 인프라(Immutable Infrastructure)" 모델의 인기는 어차피 애플리케이션 계층에서 상당한 번들링을 포함합니다.
*   PyPI를 통한 번들 `wheels` 배포는 현재 Windows 및 OS X에서는 일반적입니다.
*   이 PEP는 미래에 특정 Linux 배포판에 대해 더 목표 지향적인 바이너리를 제공할 가능성을 배제하지 않습니다.

이 PEP에 설명된 모델은 크로스 플랫폼 Python 패키지에 가장 이상적으로 적합합니다. 왜냐하면 이미 정적 Windows 및 OS X `wheels`를 만드는 데 수행하는 작업의 대부분을 재사용할 수 있기 때문입니다. 우리는 Linux의 고유한 패키지 관리 기능과 더 긴밀하게 상호 작용하고 특정 배포판의 작은 집합만 대상으로 하려는 Linux 특정 패키지에는 덜 최적화되어 있다는 것을 인정합니다.

### 보안 영향 (Security Implications)
Linux에서 중앙 집중식 라이브러리에 대한 종속성의 장점 중 하나는 버그 수정 및 보안 업데이트가 시스템 전체에 배포될 수 있으며, 이러한 라이브러리에 의존하는 애플리케이션은 기본 라이브러리가 업데이트될 때 이러한 패치의 영향을 자동으로 받는다는 것입니다. 이는 네트워크를 통한 통신 또는 암호화와 관련된 패키지의 보안 업데이트에 특히 중요할 수 있습니다.

OpenSSL과 같은 보안에 중요한 라이브러리를 번들링하여 PyPI를 통해 배포되는 `manylinux1 wheels`는 공개된 취약점 및 패치에 대한 신속한 업데이트의 책임을 지게 됩니다. 이는 플랫폼에 시스템 패키지 관리자가 없기 때문에 일반적으로 종속성을 번들링하는 Windows용 바이너리 `wheels` 배포의 보안 영향과 밀접하게 유사합니다. 특히 안정적인 ABI가 없기 때문에 OpenSSL은 `manylinux1` 프로필에 포함될 수 없습니다.

### 설치자를 위한 플랫폼 감지 (Platform Detection for Installers)
위에서 `wheel`이 `manylinux1` 호환이라는 것이 무엇을 의미하는지 정의했습니다. 여기서는 Python 설치가 `manylinux1` 호환이라는 것이 무엇을 의미하는지 논의합니다. 특히 이는 `pip`와 같은 도구가 `manylinux1` 태그가 붙은 `wheels`를 설치 대상으로 고려해야 할지 결정할 때 중요합니다.

`manylinux1` 프로필은 이미 널리 사용되는 상업용 Python 배포판의 수천 명의 사용자에게 작동하는 것으로 알려져 있으므로, 설치 도구는 특별한 이유가 없는 한 시스템이 호환된다고 가정하는 쪽으로 기울어져야 한다고 제안합니다.

실제로 발생할 수 있는 잠재적인 비호환성의 네 가지 주요 원인을 알고 있습니다.

*   결국 미래에는 이 프로필과 호환되지 않는 배포판이 존재할 수 있습니다(예: 프로필의 라이브러리 중 하나가 하위 호환되지 않는 방식으로 ABI를 변경하는 경우).
*   너무 오래된 Linux 배포판(예: RHEL 4)
*   `glibc`를 사용하지 않는 Linux 배포판(예: `musl libc` 기반의 Alpine Linux 또는 Android)

이러한 문제에 대처하기 위해 두 가지 접근 방식을 제안합니다. 잠재적인 미래 비호환성을 처리하기 위해, Python 배포자가 특정 Python 설치가 `manylinux1`와 확실히 호환되는지 또는 호환되지 않는지 알리는 메커니즘을 표준화합니다. 이는 `_manylinux`라는 모듈을 설치하고 `manylinux1_compatible` 속성을 설정하여 수행됩니다. 이러한 모듈을 표준 라이브러리에 추가하는 것은 제안하지 않습니다. 이는 배포자와 설치 도구가 만나기 위한 잘 알려진 이름일 뿐입니다. 그러나 배포자가 이 모듈을 추가하는 경우, `site-packages/` 디렉터리보다는 표준 라이브러리에 추가해야 합니다. 왜냐하면 표준 라이브러리는 `virtualenvs`에 의해 상속되고(`virtualenvs`에 상속되기를 원함), `site-packages/`는 일반적으로 그렇지 않기 때문입니다.

그런 다음 기존 Python 배포판에 대한 마지막 두 가지 경우를 처리하기 위해 `glibc`의 존재 및 버전을 확인하는 간단하고 신뢰할 수 있는 방법을 제안합니다(기본적으로 전체 배포판의 "연령"에 대한 "시계"로 사용).

구체적으로 제안하는 알고리즘은 다음과 같습니다.

```python
def is_manylinux1_compatible():
    # Only Linux, and only x86-64 / i686
    from distutils.util import get_platform
    if get_platform() not in ["linux-x86_64", "linux-i686"]:
        return False

    # Check for presence of _manylinux module
    try:
        import _manylinux
        return bool(_manylinux.manylinux1_compatible)
    except (ImportError, AttributeError):
        # Fall through to heuristic check below
        pass

    # Check glibc version. CentOS 5 uses glibc 2.5.
    return have_compatible_glibc(2, 5)

def have_compatible_glibc(major, minimum_minor):
    import ctypes
    process_namespace = ctypes.CDLL(None)
    try:
        gnu_get_libc_version = process_namespace.gnu_get_libc_version
    except AttributeError:
        # Symbol doesn't exist -> therefore, we are not linked to
        # glibc.
        return False

    # Call gnu_get_libc_version, which returns a string like "2.5".
    gnu_get_libc_version.restype = ctypes.c_char_p
    version_str = gnu_get_libc_version()

    # py2 / py3 compatibility: if not isinstance(version_str, str):
    if not isinstance(version_str, str):
        version_str = version_str.decode("ascii")

    # Parse string and check against requested version.
    version = [int(piece) for piece in version_str.split(".")]
    assert len(version) == 2
    if major != version[0]:
        return False
    if minimum_minor > version[1]:
        return False
    return True
```

**거부된 대안:** 우리는 또한 `(/etc/python/compatibility.cfg)`와 같은 구성 파일을 사용하는 것을 고려했습니다. 이 방법의 문제점은 단일 파일 시스템에 각기 고유한 ABI 프로필을 가진 여러 다른 인터프리터 환경이 포함될 수 있다는 것입니다. 시스템에 설치된 `x86_64 CPython`의 `manylinux1` 호환성이 사용자 설치 `i686 PyPy`의 `manylinux1` 호환성에 대해 많은 것을 알려주지 않을 수 있습니다. 이 구성 정보를 Python 환경 자체 내에 배치하면 올바른 바이너리에 계속 연결되어 있고 조회 코드가 크게 단순화됩니다.

우리는 또한 호환 가능한 것으로 간주되어야 하는 모든 플랫폼 태그 목록과 그 선호도 순서를 포함하는 더 정교한 구조를 사용하는 것도 고려했습니다. 예를 들어 `_binary_compat.compatible = ["manylinux1_x86_64", "centos5_x86_64", "linux_x86_64"]`와 같습니다. 그러나 이것은 몇 가지 복잡성을 야기합니다. 예를 들어, "manylinux1을 지원하지 않음"(또는 결국 `manylinux2` 등) 상태와 "manylinux1 지원 여부를 명시적으로 지정하지 않음" 상태를 구별할 수 있어야 하는데, 이는 위 표현에서 완전히 명확하지 않습니다. 또한 현재 유일하게 가능한 플랫폼 태그가 `manylinux1`과 `linux`라는 점을 감안할 때 선호도 순서와 관련하여 실제로 필요한 기능이 무엇인지 전혀 명확하지 않습니다. 따라서 Linux가 더 많은 플랫폼 태그를 얻게 될 때 별도의 PEP에서 더 완전한 해결책을 보류하고 있습니다.

라이브러리 호환성 검사를 위해 훨씬 더 정교한 검사(예: 커널 버전 확인, `manylinux1` 프로필에 나열된 모든 개별 라이브러리 검색 및 버전 확인 등)도 고려했지만, 궁극적으로 이는 사용자에게 실제로 도움이 되기보다는 혼란스러운 버그를 유발할 가능성이 더 높다고 판단했습니다. (예: 다른 배포판은 이러한 라이브러리를 실제로 어디에 두는지 다르며, 검사 코드가 올바른 경로 검색을 사용하지 못하면 쉽게 잘못된 답변을 반환할 수 있습니다.)

### PyPI 지원 (PyPI Support)
PyPI는 `manylinux1` 플랫폼 태그를 포함하는 `wheels`의 업로드를 허용해야 합니다. PyPI는 `manylinux1` 플랫폼 태그를 포함하는 `wheels`가 이 문서에 설명된 `manylinux1` 정책을 준수하는지 공식적으로 확인하려고 시도해서는 안 됩니다. 이러한 검증 작업은 `auditwheel`과 같이 별도로 개발된 다른 도구에 맡겨야 합니다.

### 거부된 대안 (Rejected Alternatives)
한 가지 대안은 각 Linux 배포판(및 각 버전)에 대해 별도의 플랫폼 태그를 제공하는 것이었습니다. 예를 들어 `RHEL6`, `ubuntu14_10`, `debian_jessie` 등입니다. 이 제안의 어떤 내용도 미래에 이러한 플랫폼 태그를 추가할 가능성이나, `wheels`가 외부 시스템 설치 패키지에 대한 종속성을 선언할 수 있도록 하는 `wheel` 메타데이터에 대한 추가 확장을 배제하지 않습니다. 그러나 이러한 확장은 이 제안보다 훨씬 더 많은 작업을 필요로 하며, 모든 일반적인 Linux 배포판을 포괄하기 위해 여러 빌드 환경을 유지하고 여러 `wheels`를 빌드해야 하는 것을 선호하지 않는 패키지 개발자에게 여전히 좋게 평가되지 않을 수 있습니다. 따라서 우리는 그러한 제안들을 이 PEP의 범위를 벗어나는 것으로 간주합니다.

### 향후 업데이트 (Future updates)
미래의 어느 시점에는 더 현대적인 기준 환경(아마도 CentOS 6 기반)을 지정하는 `manylinux2`가 있을 것이고, 언젠가는 `manylinux3` 등이 있을 것으로 예상하지만, 초기 `manylinux1` 제안에 대한 더 많은 경험을 얻을 때까지는 이러한 사양을 연기합니다.

### 참조 (References)
PEP 513은 다음 자료들을 참조합니다.
*   Enthought Canopy Python Distribution (https://store.enthought.com/downloads/)
*   Continuum Analytics Anaconda Python Distribution (https://www.continuum.io/downloads)
*   CentOS 5.11 Release Notes (https://wiki.centos.org/Manuals/ReleaseNotes/CentOS5.11)
*   manylinux-discuss mailing list discussion (https://groups.google.com/forum/#!topic/manylinux-discuss/-4l3rrjfr9U)
*   distutils-sig discussion (https://mail.python.org/pipermail/distutils-sig/2016-January/027997.html)
*   distutils-sig discussion (https://mail.python.org/pipermail/distutils-sig/2016-February/028275.html)
*   github issue discussion (https://github.com/pypa/manylinux/issues/30)
*   python bug tracker discussion (https://bugs.python.org/issue21536)
*   manylinux1 docker images (Source: https://github.com/pypa/manylinux; x86-64: https://quay.io/repository/pypa/manylinux1_x86_64; x86-32: https://quay.io/repository/pypa/manylinux1_i686)
*   auditwheel tool (https://pypi.python.org/pypi/auditwheel)
*   Fedora Bundled Software Policy (https://fedoraproject.org/wiki/Bundled_Software_policy)
*   Debian Policy Manual – 4.13: Convenience copies of code (https://www.debian.org/doc/debian-policy/ch-source.html#s-embeddedfiles)
*   numpy bug report: https://github.com/numpy/numpy/issues/8415#issuecomment-269095235

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.
Source: https://github.com/python/peps/blob/main/peps/pep-0513.rst
최종 수정: 2025-02-01 08:59:27 GMT

**거부된 대안:** 우리는 또한 `(/etc/python/compatibility.cfg)`와 같은 구성 파일을 사용하는 것을 고려했습니다. 이 방법의 문제점은 단일 파일 시스템에 각기 고유한 ABI 프로필을 가진 여러 다른 인터프리터 환경이 포함될 수 있다는 것입니다. 시스템에 설치된 `x86_64 CPython`의 `manylinux1` 호환성이 사용자 설치 `i686 PyPy`의 `manylinux1` 호환성에 대해 많은 것을 알려주지 않을 수 있습니다. 이 구성 정보를 Python 환경 자체 내에 배치하면 올바른 바이너리에 계속 연결되어 있고 조회 코드가 크게 단순화됩니다.

우리는 또한 호환 가능한 것으로 간주되어야 하는 모든 플랫폼 태그 목록과 그 선호도 순서를 포함하는 더 정교한 구조를 사용하는 것도 고려했습니다. 예를 들어 `_binary_compat.compatible = ["manylinux1_x86_64", "centos5_x86_64", "linux_x86_64"]`와 같습니다. 그러나 이것은 몇 가지 복잡성을 야기합니다. 예를 들어, "manylinux1을 지원하지 않음"(또는 결국 `manylinux2` 등) 상태와 "manylinux1 지원 여부를 명시적으로 지정하지 않음" 상태를 구별할 수 있어야 하는데, 이는 위 표현에서 완전히 명확하지 않습니다. 또한 현재 유일하게 가능한 플랫폼 태그가 `manylinux1`과 `linux`라는 점을 감안할 때 선호도 순서와 관련하여 실제로 필요한 기능이 무엇인지 전혀 명확하지 않습니다. 따라서 Linux가 더 많은 플랫폼 태그를 얻게 될 때 별도의 PEP에서 더 완전한 해결책을 보류하고 있습니다.

라이브러리 호환성 검사를 위해 훨씬 더 정교한 검사(예: 커널 버전 확인, `manylinux1` 프로필에 나열된 모든 개별 라이브러리 검색 및 버전 확인 등)도 고려했지만, 궁극적으로 이는 사용자에게 실제로 도움이 되기보다는 혼란스러운 버그를 유발할 가능성이 더 높다고 판단했습니다. (예: 다른 배포판은 이러한 라이브러리를 실제로 어디에 두는지 다르며, 검사 코드가 올바른 경로 검색을 사용하지 못하면 쉽게 잘못된 답변을 반환할 수 있습니다.)

### PyPI 지원 (PyPI Support)
PyPI는 `manylinux1` 플랫폼 태그를 포함하는 `wheels`의 업로드를 허용해야 합니다. PyPI는 `manylinux1` 플랫폼 태그를 포함하는 `wheels`가 이 문서에 설명된 `manylinux1` 정책을 준수하는지 공식적으로 확인하려고 시도해서는 안 됩니다. 이러한 검증 작업은 `auditwheel`과 같이 별도로 개발된 다른 도구에 맡겨야 합니다.

### 거부된 대안 (Rejected Alternatives)
한 가지 대안은 각 Linux 배포판(및 각 버전)에 대해 별도의 플랫폼 태그를 제공하는 것이었습니다. 예를 들어 `RHEL6`, `ubuntu14_10`, `debian_jessie` 등입니다. 이 제안의 어떤 내용도 미래에 이러한 플랫폼 태그를 추가할 가능성이나, `wheels`가 외부 시스템 설치 패키지에 대한 종속성을 선언할 수 있도록 하는 `wheel` 메타데이터에 대한 추가 확장을 배제하지 않습니다. 그러나 이러한 확장은 이 제안보다 훨씬 더 많은 작업을 필요로 하며, 모든 일반적인 Linux 배포판을 포괄하기 위해 여러 빌드 환경을 유지하고 여러 `wheels`를 빌드해야 하는 것을 선호하지 않는 패키지 개발자에게 여전히 좋게 평가되지 않을 수 있습니다. 따라서 우리는 그러한 제안들을 이 PEP의 범위를 벗어나는 것으로 간주합니다.

### 향후 업데이트 (Future updates)
미래의 어느 시점에는 더 현대적인 기준 환경(아마도 CentOS 6 기반)을 지정하는 `manylinux2`가 있을 것이고, 언젠가는 `manylinux3` 등이 있을 것으로 예상하지만, 초기 `manylinux1` 제안에 대한 더 많은 경험을 얻을 때까지는 이러한 사양을 연기합니다.

### 참조 (References)
PEP 513은 다음 자료들을 참조합니다.
*   Enthought Canopy Python Distribution (https://store.enthought.com/downloads/)
*   Continuum Analytics Anaconda Python Distribution (https://www.continuum.io/downloads)
*   CentOS 5.11 Release Notes (https://wiki.centos.org/Manuals/ReleaseNotes/CentOS5.11)
*   manylinux-discuss mailing list discussion (https://groups.google.com/forum/#!topic/manylinux-discuss/-4l3rrjfr9U)
*   distutils-sig discussion (https://mail.python.org/pipermail/distutils-sig/2016-January/027997.html)
*   distutils-sig discussion (https://mail.python.org/pipermail/distutils-sig/2016-February/028275.html)
*   github issue discussion (https://github.com/pypa/manylinux/issues/30)
*   python bug tracker discussion (https://bugs.python.org/issue21536)
*   manylinux1 docker images (Source: https://github.com/pypa/manylinux; x86-64: https://quay.io/repository/pypa/manylinux1_x86_64; x86-32: https://quay.io/repository/pypa/manylinux1_i686)
*   auditwheel tool (https://pypi.python.org/pypi/auditwheel)
*   Fedora Bundled Software Policy (https://fedoraproject.org/wiki/Bundled_Software_policy)
*   Debian Policy Manual – 4.13: Convenience copies of code (https://www.debian.org/doc/debian-policy/ch-source.html#s-embeddedfiles)
*   numpy bug report: https://github.com/numpy/numpy/issues/8415#issuecomment-269095235

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.
Source: https://github.com/python/peps/blob/main/peps/pep-0513.rst
최종 수정: 2025-02-01 08:59:27 GMT

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.