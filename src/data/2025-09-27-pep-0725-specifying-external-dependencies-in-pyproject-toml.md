---
title: "[Draft] PEP 725 - Specifying external dependencies in pyproject.toml"
excerpt: "Python Enhancement Proposal 725: 'Specifying external dependencies in pyproject.toml'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/725/
toc: true
toc_sticky: true
date: 2025-09-27 13:18:53+0900
last_modified_at: 2025-09-27 13:18:53+0900
published: true
---
> **원문 링크:** [PEP 725 - Specifying external dependencies in pyproject.toml](https://peps.python.org/pep-0725/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 17-Aug-2023

Citations:

# PEP 725 – `pyproject.toml`에 외부 의존성 지정

## 초록 (Abstract)

이 PEP는 파이썬 프로젝트의 외부 또는 PyPI가 아닌 빌드 및 런타임 의존성을 `pyproject.toml` 파일에 패키징 관련 도구가 활용할 수 있도록 지정하는 방법을 설명합니다.

이 PEP는 `pyproject.toml` 파일에 7개의 키를 가진 `[external]` 테이블을 추가할 것을 제안합니다. `build-requires`, `host-requires`, `dependencies`는 세 가지 유형의 필수 의존성을 지정하는 데 사용됩니다.

*   `build-requires`: 빌드 머신에서 실행할 빌드 도구
*   `host-requires`: 호스트 머신에 필요하지만 빌드 시에도 필요한 빌드 의존성
*   `dependencies`: 호스트 머신에서 런타임에 필요하지만 빌드 시에는 필요하지 않은 의존성

이 세 가지 키에는 각각 선택적 외부 의존성 counterparts (`optional-build-requires`, `optional-host-requires`, `optional-dependencies`)가 있으며, 이는 `project.dependencies`에 대한 `project.optional-dependencies`와 동일한 역할을 합니다. 마지막으로, `dependency-groups`는 외부 의존성을 위한 PEP 735와 동일한 기능을 제공합니다.

빌드 의존성과 호스트 의존성을 구분하여 크로스 컴파일(Cross compilation)을 고려합니다. `[project]` 테이블에서 지원되는 방식과 유사하게 선택적 빌드 타임 및 런타임 의존성도 지원됩니다.

## 동기 (Motivation)

파이썬 패키지는 PyPI에 없는 빌드 도구, 라이브러리, 명령줄 도구 또는 기타 소프트웨어에 의존할 수 있습니다. 현재 이러한 의존성을 표준화된 메타데이터로 표현할 방법이 없습니다. 이 PEP의 주요 동기는 다음과 같습니다.

*   외부 의존성을 다른 패키징 저장소의 패키지로 자동 매핑할 수 있도록 도구를 활성화합니다.
*   파이썬 패키지 인스톨러 및 빌드 프론트엔드에서 발생하는 오류 메시지에 필요한 의존성을 포함할 수 있도록 합니다.
*   패키지 작성자가 이 의존성 정보를 기록할 표준화된 장소를 제공합니다.

Linux 배포판, Conda, Homebrew, Spack, Nix와 같은 패키징 생태계는 파이썬 패키지에 대한 완전한 의존성 세트가 필요하며, 업스트림 파이썬 패키지의 메타데이터에서 자체 패키지 관리자를 위한 의존성 메타데이터를 자동으로 생성하려고 시도하는 `pyp2spec` (Fedora), `Grayskull` (Conda), `dh_python` (Debian)과 같은 도구를 가지고 있습니다. 외부 의존성은 `pyproject.toml` 또는 다른 표준 위치에 메타데이터가 없기 때문에 현재 수동으로 처리됩니다. 다른 도구들은 `elfdeps` (Fedora)처럼 파이썬 패키지 내의 확장 모듈과 공유 라이브러리에서 의존성을 추출하는 방법을 사용합니다. 명시적으로 주석 처리된 메타데이터만을 사용하여 이러한 유형의 변환을 자동화할 수 있도록 하는 것이 이 PEP의 핵심 이점이며, 배포판용 파이썬 패키징을 더 쉽고 안정적으로 만듭니다. 또한, 저자들은 `Repology`, `Dependabot`, `libraries.io`와 같은 의존성 분석 도구를 포함한 다른 유형의 도구들도 이 정보를 활용할 것으로 예상합니다.

소프트웨어 BOM(Bill of Materials) 생성 도구도 이 정보를 사용하여 `pyproject.toml`에 나열되었지만 휠(wheel) 메타데이터에 포함되지 않은 외부 의존성이 휠 내부에 벤더링되었을 가능성이 있음을 플래그 지정할 수 있습니다. 휠에 SBOM을 포함하는 방법을 표준화하는 PEP 770은 해당 PEP가 이 PEP와 어떻게 다른지에 대한 유익한 섹션을 포함합니다.

외부 의존성이 있는 패키지는 일반적으로 소스에서 빌드하기 어렵고, 빌드 실패로 인한 오류 메시지는 최종 사용자가 해독하기 어렵습니다. 최종 사용자의 시스템에 외부 의존성이 누락된 것이 빌드 실패의 가장 흔한 원인입니다. 인스톨러가 오류 메시지의 일부로 필요한 외부 의존성을 표시할 수 있다면, 사용자의 많은 시간을 절약할 수 있습니다.

현재 외부 의존성에 대한 정보는 개별 패키지의 설치 문서에만 기록되어 있습니다. 이는 패키지 작성자가 유지 관리하기 어렵고, 오래될 가능성이 있습니다. 또한 사용자 및 배포판 패키징 담당자가 찾기 어렵습니다. 이 의존성 정보를 기록할 표준화된 장소를 갖는 것은 이러한 상황을 개선할 것입니다.

이 PEP는 외부 의존성이 어떻게 사용되어야 하는지, 또는 PyPI에 게시된 파이썬 프로젝트의 표준화된 개별 패키지 이름과 다른 패키징 생태계의 이름 간의 이름 매핑을 구현하는 메커니즘을 지정하려는 것이 아닙니다. 표준화된 이름과 이름 매핑 메커니즘은 PEP 804에서 다룹니다.

## 근거 (Rationale)

### 외부 의존성의 유형 (Types of external dependencies)

여러 유형의 외부 의존성을 구분할 수 있습니다.

*   **구체적인 패키지 (Concrete packages):** 이름으로 식별할 수 있고 다른 언어별 패키지 저장소에 표준화된 위치가 있는 패키지입니다. 예를 들어, `crates.io`의 Rust 패키지, `CRAN`의 R 패키지, `npm` 레지스트리의 JavaScript 패키지 등이 있습니다.
*   **이름으로 식별 가능하지만 명확한 표준 위치가 없는 구체적인 패키지:** 일반적으로 C, C++, Fortran, CUDA 및 기타 저수준 언어로 작성된 라이브러리 및 도구의 경우입니다. 예를 들어, `Boost`, `OpenSSL`, `Protobuf`, `Intel MKL`, `GCC` 등이 있습니다.
*   **"가상" 패키지 (Virtual packages):** 개념, 도구 유형 또는 인터페이스에 대한 이름입니다. 일반적으로 여러 구현을 가지며, 이 구현은 구체적인 패키지입니다. 예를 들어, C++ 컴파일러, `BLAS`, `LAPACK`, `OpenMP`, `MPI` 등이 있습니다.

구체적인 패키지는 이해하기 쉽고 모든 패키지 관리 시스템에 존재하는 개념입니다. 가상 패키지는 여러 패키징 시스템에 존재하는 개념이지만 항상 그런 것은 아니며 구현 세부 사항이 다릅니다.

### 크로스 컴파일 (Cross compilation)

크로스 컴파일은 아직 (2025년 9월 기준) `stdlib` 모듈과 `pyproject.toml` 메타데이터에서 잘 지원되지 않습니다. 그러나 외부 의존성을 다른 패키징 시스템의 의존성으로 변환할 때 (`pyp2spec`과 같은 도구로) 중요합니다. 이 PEP에서 크로스 컴파일 지원을 즉시 도입하는 것이 나중에 `[external]`을 확장하는 것보다 훨씬 쉽기 때문에, 저자들은 지금 이 기능을 포함하기로 결정했습니다.

### 용어 (Terminology)

이 PEP는 다음 용어를 사용합니다.

*   **빌드 머신 (build machine):** 패키지 빌드 프로세스가 실행되는 머신입니다.
*   **호스트 머신 (host machine):** 생성된 아티팩트가 설치 및 실행될 머신입니다.
*   **빌드 의존성 (build dependency):** 빌드 프로세스 중에만 필요한 패키지입니다. 빌드 시에 사용 가능해야 하며 빌드 머신의 OS 및 아키텍처용으로 빌드됩니다. 일반적인 예로는 컴파일러, 코드 생성기, 빌드 도구가 있습니다.
*   **호스트 의존성 (host dependency):** 빌드 중에 필요하고 종종 런타임에도 필요한 패키지입니다. 빌드 중에 사용 가능해야 하며 호스트 머신의 OS 및 아키텍처용으로 빌드됩니다. 이는 일반적으로 프로젝트가 링크하는 라이브러리입니다.
*   **런타임 의존성 (runtime dependency):** 설치 후 패키지가 사용될 때만 필요한 패키지입니다. 빌드 시에는 필요하지 않지만 런타임에 호스트 머신에서 사용 가능해야 합니다.

이 용어는 빌드 및 패키징 도구마다 일관성이 없으므로, `pyproject.toml`의 빌드/호스트 의존성과 다른 패키지 관리자의 의존성을 비교할 때 주의해야 합니다.

이 PEP에서는 "타겟 머신(target machine)" 또는 "타겟 의존성(target dependency)"이라는 용어를 사용하지 않습니다. 이는 일반적으로 컴파일러 또는 기타 고급 시나리오를 크로스 컴파일할 때만 관련이 있으며, 이 PEP의 범위를 벗어납니다.

마지막으로, "dependency"는 빌드 시에 필요한 패키지에 가장 널리 사용되는 용어이지만, PyPI 빌드 타임 의존성을 위한 `pyproject.toml`의 기존 키는 `build-requires`입니다. 따라서 이 PEP는 일관성을 위해 `[external]` 아래에 `build-requires` 및 `host-requires` 키를 사용합니다.

### 빌드 및 호스트 의존성 (Build and host dependencies)

빌드 및 호스트 플랫폼이 항상 동일하다고 가정하기보다는, 빌드 및 호스트 플랫폼의 정의와 관련된 메타데이터를 명확하게 분리하는 것이 중요합니다.

빌드 의존성은 일반적으로 빌드 프로세스 중에 실행됩니다. 이는 컴파일러, 코드 생성기 또는 기타 유사한 도구일 수 있습니다. 빌드 의존성 사용이 런타임 의존성을 암시하는 경우, 해당 런타임 의존성을 명시적으로 선언할 필요는 없습니다. 예를 들어, `gfortran`으로 Fortran 코드를 파이썬 확장 모듈로 컴파일할 때, 패키지는 `libgfortran` 런타임 라이브러리에 대한 의존성을 가질 수 있습니다. 이러한 런타임 의존성을 명시적으로 나열하지 않는 이유는 두 가지입니다. (1) 의존성 존재 여부는 컴파일러/링커 플래그 또는 빌드 환경의 세부 사항에 따라 달라질 수 있으며, (2) 이러한 런타임 의존성은 `auditwheel`과 같은 도구에 의해 자동으로 감지 및 처리될 수 있습니다.

호스트 의존성은 일반적으로 빌드 프로세스 중에 실행되지 않고 링크에만 사용됩니다. 그러나 이는 규칙이 아닙니다. 에뮬레이터에서 또는 `crossenv`와 같은 사용자 지정 도구를 통해 호스트 의존성을 실행해야 할 수도 있습니다. 호스트 의존성이 런타임 의존성을 암시하는 경우, 빌드 의존성과 마찬가지로 해당 런타임 의존성도 선언할 필요가 없습니다.

호스트 의존성이 선언되고 크로스 컴파일과 관련 없는 작업을 실행하는 도구가 `host-requires` 목록을 `build-requires`에 병합하기로 결정할 수 있습니다. 이것이 유용한지 여부는 상황에 따라 다릅니다.

### 외부 의존성 지정 (Specifying external dependencies)

#### 구체적인 패키지 사양 (Concrete package specification)

"Package URL" 또는 PURL은 패키지를 식별하기 위한 널리 사용되는 URL 문자열로, 패키징 생태계 전반에 걸쳐 이식성을 가집니다. 그 디자인은 다음과 같습니다.

`scheme:type/namespace/name@version?qualifiers#subpath`

`scheme` 컴포넌트는 고정 문자열 `pkg`이며, 다른 컴포넌트 중 `type`과 `name`만 필수입니다.

외부 의존성은 수동으로 입력될 가능성이 높기 때문에, 사용 편의성을 위해 여러 변경 사항을 도입하는 PURL 파생형을 제안합니다 (아래에서 추가 논의).

*   새로운 `virtual` 타입을 통한 가상 패키지 지원.
*   `version` 필드에 버전 범위(리터럴뿐만 아니라) 허용.

이 파생형에서는 `pkg` 스키마를 `dep`으로 대체합니다. 따라서 이를 DepURLs라고 부릅니다.

예를 들어, PyPI의 `requests` 패키지에 대한 DepURL은 다음과 같습니다.

`dep:pypi/requests` `# pkg:pypi/requests와 동일`

`pyproject.toml`에 외부 의존성을 지정하기 위해 PURL 호환 문자열을 채택하는 것은 여러 문제를 한 번에 해결하며, 파이썬 및 여러 다른 언어에서 이미 사양 구현이 있습니다. PURL은 `SPDX` (SPDX 2.3 사양의 외부 저장소 식별자 참조), Open Source Vulnerability 형식, `Sonatype OSS Index`와 같은 의존성 관련 도구에서 이미 지원됩니다. `dep:virtual`과 같이 PURL에 해당하지 않는 경우를 제외하고, `DepURL`은 PURL로 매우 쉽게 변환됩니다.

표준 패키지 관리자가 없는 구체적인 패키지의 경우, `dep:generic/dep-name`을 사용하거나 패키지가 유지 관리되는 VCS 시스템에 직접 참조(예: `dep:github/user-or-org-name/dep-name`)를 사용할 수 있습니다. 이 중 어느 것이 더 적절한지는 상황에 따라 다릅니다. 이 PEP는 패키지 이름이 명확하고 잘 알려져 있을 때 (`dep:generic/git` 또는 `dep:generic/openblas`와 같이) `dep:generic`을 사용하고, 그렇지 않으면 VCS를 `type`으로 사용할 것을 권장합니다. 주어진 패키지에 대해 어떤 이름을 표준 이름으로 선택할지, 그리고 그러한 선택을 하고 기록하는 과정은 PEP 804의 주제입니다.

#### 가상 패키지 사양 (Virtual package specification)

PURL은 아직 가상 또는 가상 의존성 사양을 지원하지 않습니다. `virtual` 타입 추가 제안은 개정 1.1에 대해 논의 중입니다.

그동안 `dep:` 파생형에 새로운 `virtual` 타입을 추가할 것을 제안합니다. 이 타입은 두 개의 `namespace`를 가질 수 있습니다 (PEP 804에 명시된 프로세스를 통해 확장 가능).

*   `interface`: `BLAS` 또는 `MPI`와 같은 컴포넌트용.
*   `compiler`: C 또는 Rust와 같은 컴파일된 언어용.

이름은 인터페이스 또는 언어에 대한 가장 일반적인 이름을 소문자로 사용해야 합니다. 몇 가지 예시는 다음과 같습니다.

*   `dep:virtual/compiler/c`
*   `dep:virtual/compiler/cxx`
*   `dep:virtual/compiler/rust`
*   `dep:virtual/interface/blas`
*   `dep:virtual/interface/lapack`

이러한 의존성의 수가 제한적이므로, 이는 가상 패키지를 사용하는 Linux 배포판 및 Conda, Spack 등과 잘 이해되고 매핑될 것으로 보입니다.

#### 버전 관리 (Versioning)

PURL은 URL의 `@` 컴포넌트를 통해 고정된 버전을 지원합니다. 예를 들어, `numpy===2.0`은 `pkg:pypi/numpy@2.0`으로 표현할 수 있습니다.

PURL에서 고정된 버전을 넘어서는 버전 표현식 및 범위에 대한 지원은 `vers` URI (사양 참조)를 통해 사용할 수 있습니다.

`vers:type/version-constraint|version-constraint|...`

사용자는 `pkg:` URL을 `vers:` URL과 결합해야 합니다. 예를 들어, `numpy>=2.0`을 표현하려면 PURL에 해당하는 것은 `pkg:pypi/numpy`와 `vers:pypi/>=2.0`입니다. 이는 다음 방법으로 수행할 수 있습니다.

*   두 개의 항목으로 된 목록: `["pkg:pypi/numpy", "vers:pypi/>=2.0"]`
*   URL 쿼리 매개변수에 `%` 인코딩: `pkg:pypi/numpy?vers=vers:pypi%2F%3E%3D2.0`

이러한 옵션 중 어느 것도 매우 인체 공학적이지 않기 때문에, DepURL은 PEP 440 의미론의 하위 집합인 버전 범위 지정자도 허용하도록 선택했습니다. 허용되는 연산자는 패키지 관리자 전반에 걸쳐 널리 사용되는 연산자입니다 (예: `==`, `>`, `>=`는 일반적이지만 `~=`는 그렇지 않습니다).

몇 가지 예시:

*   `dep:pypi/numpy@2.0`: 정확히 버전 2.0으로 고정된 `numpy`.
*   `dep:pypi/numpy@>=2.0`: 버전 2.0 이상인 `numpy`.
*   `dep:virtual/interface/lapack@>=3.7.1`: 버전 3.7.1 이상인 LAPACK 인터페이스를 구현하는 모든 패키지.

특정 가상 패키지에 대한 버전 관리 체계는 업스트림 프로젝트 또는 표준에 의해 명확하게 정의되지 않은 경우 중앙 레지스트리 (PEP 804 참조)에 정의됩니다.

#### 환경 마커 (Environment markers)

일반적인 환경 마커 (원래 PEP 508에 정의됨)는 DepURL 뒤에 사용할 수 있습니다. 패키지 유형별 의존성 지정자 컴포넌트가 뒤따르는 PURL 한정자(`?`로 시작)는 환경 마커로 충분한 목적을 위해 사용해서는 안 됩니다. 그 이유는 실용적입니다. 환경 마커는 `pyproject.toml`의 다른 메타데이터에 이미 사용되고 있으므로, `pyproject.toml`과 함께 사용되는 모든 도구는 이미 이를 구문 분석하기 위한 강력한 구현을 가지고 있을 가능성이 높습니다. 그리고 PURL 한정자가 제공하는 추가적인 가능성 (예: Conan 또는 Conda 채널 또는 RubyGems 플랫폼 지정)은 필요하지 않을 것으로 예상합니다.

DepURL과 환경 마커의 조합을 기존 의존성 지정자와 유사하게 "외부 의존성 지정자"라고 명명합니다.

#### 의존성의 표준 이름과 `-dev(el)` 분할 패키지 (Canonical names of dependencies and -dev(el) split packages)

배포판이 패키지를 두 개 이상의 패키지로 분할하는 것은 꽤 흔하지만 보편적이지는 않습니다. 특히 런타임 컴포넌트는 개발 컴포넌트 (헤더, `pkg-config` 및 `CMake` 파일 등)와 별도로 설치 가능한 경우가 많습니다. 후자는 일반적으로 프로젝트/라이브러리 이름 뒤에 `-dev` 또는 `-devel`이 붙은 이름을 가집니다. 또한, 더 큰 패키지는 설치 크기를 관리 가능하게 유지하기 위해 여러 개의 개별 패키지로 분할되기도 합니다. 이러한 패키지 분할은 패키지 유지 관리자에 의해 정의되거나 인식되지 않는 경우가 많으며, 따라서 어떤 분할이 의미하는지 모호합니다. 따라서 이러한 분할은 `[external]` 테이블에 반영되어서는 안 됩니다. 배포판 전반에 걸쳐 작동하는 합리적인 방식으로 이를 지정하는 것은 불가능하므로 `[external]`에서는 표준 이름만 사용해야 합니다.

DepURL을 사용하는 의도는 "지정된 이름을 가진 전체 패키지"입니다. 즉, 패키지의 일부인 모든 설치 가능한 아티팩트를 포함합니다. 패키지 분할이 관련이 있는지 여부는 메타데이터가 사용되는 컨텍스트에 따라 달라집니다. 예를 들어, `libffi`가 호스트 의존성이고 도구가 휠을 빌드하기 위한 환경을 준비하려는 경우, 배포판이 `libffi`의 헤더를 `libffi-devel` 패키지로 분리했다면 도구는 `libffi`와 `libffi-devel` 모두를 설치해야 합니다.

표준 패키지 이름이 무엇이며 도구가 설치 목적으로 `[external]`을 사용하려고 할 때 패키지 분할이 실제로 어떻게 처리되는지에 대한 정의는 PEP 804를 참조하십시오.

#### 파이썬 개발 헤더 (Python development headers)

파이썬 헤더 및 기타 빌드 지원 파일도 분할될 수 있습니다. 이는 위 섹션과 동일한 상황입니다 (파이썬이 배포판에서 단순히 일반 패키지이기 때문입니다). 그러나 `python-dev|devel` 의존성은 `pyproject.toml`에서 파이썬 자체가 명시적 의존성이 아닌 암시적 의존성이기 때문에 특별합니다. 따라서 여기에서 선택을 해야 합니다. `python-dev`를 암시적으로 추가할지, 아니면 각 패키지 작성자가 `[external]` 아래에 명시적으로 추가하게 할지. 파이썬 의존성과 외부 의존성 간의 일관성을 위해 암시적으로 추가하기로 선택했습니다. `[external]` 테이블에 하나 이상의 컴파일러 패키지가 포함되어 있을 때 파이썬 개발 헤더는 필요하다고 가정해야 합니다.

### 새로운 Core Metadata 필드 (New Core Metadata fields)

두 가지 새로운 Core Metadata 필드가 제안됩니다.

*   `Requires-External-Dep`: 외부 요구 사항입니다. `Requires`에서 `Requires-Dist`로의 전환을 모방합니다. 값은 일반 파이썬 지정자(배포판)가 아니라 DepURL을 포함하는 외부 의존성 지정자임을 강조하기 위해 `-Dep` 접미사를 선택했습니다.
*   `Provides-External-Extra`: 외부 의존성만 포함하는 추가 그룹입니다 ( `Requires-External-Dep`에서 찾을 수 있음).

Core Metadata 사양은 `pyproject.toml`의 `[build-system]` 테이블에 있는 메타데이터에 대한 필드를 포함하지 않으므로 `build-requires` 및 `host-requires` 내용은 기존 핵심 메타데이터 필드에 반영될 필요가 없습니다.

또한, 이 PEP는 `Requires-External` 필드를 더 이상 사용하지 않도록 제안합니다. 이유는 다음과 같습니다.

*   새로 제안된 필드와의 혼동 방지.
*   기존 사용과의 잠재적 비호환성 방지 (제한적이지만).
*   생태계 침투율 낮음:
    *   `pyproject.toml` 메타데이터의 필드와 직접적인 대응 관계가 없습니다.
    *   `setuptools` (pypa/setuptools#4220 참조), `hatch` (pypa/hatch#1712 참조), `flit` (pypa/flit#353 참조), `poetry`와 같은 주류 빌드 백엔드는 이를 지정하는 방법을 제공하지 않거나 플러그인 (예: `poetry-external-dependencies`)을 요구합니다.
    *   `maturin`은 0.7.0부터 지원하는 것으로 보이지만 (PyO3/maturin@5b0e4808 참조), 직접적으로 문서화되어 있지 않습니다.
    *   `scikit-build-core` 또는 `meson-python`과 같은 다른 백엔드는 `External-Requires`에 대한 결과를 반환하지 않았습니다.
    *   이 필드는 PyPI JSON API 응답에 포함되지 않습니다.

### 휠 메타데이터에 공유 라이브러리 벤더링이 미치는 영향 (Effect of vendoring shared libraries on wheel metadata)

휠은 외부 의존성을 벤더링할 수 있습니다. 이는 특히 PyPI 또는 다른 파이썬 패키지 인덱스에 휠을 배포할 때 발생하며, `auditwheel`, `delvewheel`, `delocate`와 같은 도구는 이 프로세스를 자동화합니다. 결과적으로, `sdist`의 `Requires-External-Dep` 항목은 `cibuildwheel`과 같은 도구로 해당 `sdist`에서 빌드된 휠에서 사라질 수 있습니다. `Requires-External-Dep` 항목이 휠에 그대로 남아 있거나 더 좁은 제약 조건을 가질 수도 있습니다. `auditwheel`은 기본적으로 `OpenGL`과 같은 특정 허용 목록에 있는 의존성을 벤더링하지 않습니다. 또한, `auditwheel`과 `delvewheel`은 `--exclude` 또는 `--no-dll` 명령줄 플래그를 통해 사용자가 의존성을 수동으로 제외할 수 있도록 합니다. 이는 `CUDA`와 같은 큰 공유 라이브러리를 벤더링하는 것을 피하기 위해 사용됩니다.

`pyproject.toml`의 외부 의존성에서 생성된 `Requires-External-Dep` 항목은 빌드/배포 프로세스에 따라 `sdist`와 해당 휠 간에 다를 수 있습니다.

이것이 필드가 Dynamic으로 표시되어야 함을 의미하지는 않습니다. 이 구분은 빌드 백엔드에 의해 `sdist`에서 빌드된 휠에만 적용되기 때문입니다. 특히, 다른 휠에서 빌드된 휠은 이 제약 조건을 충족할 필요가 없습니다.

### 의존성 그룹 (Dependency groups)

이 PEP는 `PEP 735`의 `dependency-groups` 키를 `[external]` 테이블에도 포함하기로 결정했습니다. 이 결정은 외부 메타데이터에 대해서도 유사한 기능이 필요하다는 동기에서 비롯되었습니다. 최상위 테이블은 PEP 508 문자열 (및 그룹 포함을 위한 테이블)을 예상하는 반면, 우리는 외부 의존성을 위해 `dep:` URL에 의존하기로 선택했으므로 외부 의존성에 사용할 수 없습니다. 둘을 혼합하면 기존 사용과의 심각한 하위 호환성 문제가 발생할 수 있습니다.

엄밀히 말하면, `dependency-groups` 스키마는 그룹별 하위 테이블에 외부 의존성을 정의할 수 있도록 합니다.

```toml
[dependency-groups]
dev = [
  "pytest",
  { external = ["dep:cargo/ripgrep"] },
]
```

그러나 이것은 동일한 문제를 가지고 있습니다. 즉, 동일한 데이터 구조에 다른 유형의 의존성 지정자를 혼합하는 것입니다. 우리는 우려 사항을 다른 최상위 테이블로 분리하는 것이 더 깔끔하다고 생각하므로 `external.dependency-groups`를 여전히 선호합니다.

#### 선택적 의존성 대 의존성 그룹 (Optional dependencies versus dependency groups)

`external.dependency-groups`를 갖는 근거는 `PEP 735`에서 `[dependency-groups]`를 도입한 근거와 동일합니다. 따라서 Core Metadata에 포함/제외되는 의도된 사용법 및 의미론은 `[dependency-groups]`와 동일합니다.

`external.optional-dependencies`는 Core Metadata에 나타납니다. `external.dependency-groups`는 나타나지 않습니다.

## 사양 (Specification)

메타데이터가 부적절하게 지정된 경우 도구는 사용자에게 오류를 알리기 위해 오류를 발생시켜야 합니다 (`MUST`).

### DepURL

DepURL은 패키징 생태계 전반에 걸쳐 이식성을 갖도록 설계된 패키지 식별 체계를 구현합니다. 그 디자인은 다음과 같습니다.

`dep:type/namespace/name@version?qualifiers#subpath`

`dep:`은 고정 문자열이며 항상 존재합니다. `type`과 `name`은 필수이며, 다른 컴포넌트는 선택 사항입니다. 모든 컴포넌트는 PURL과 `virtual type`에 모두 적용되며, 다음과 같은 요구 사항을 가집니다.

*   **type (필수):** PURL `type` 또는 `virtual`이어야 합니다 (`MUST`).
*   **namespace (선택 사항):** PURL `namespace` 또는 DepURL 중앙 레지스트리(PEP 804 참조)의 `namespace`여야 합니다 (`MUST`).
*   **name (필수):** 유효한 PURL `name`으로 구문 분석될 수 있는 이름이어야 합니다 (`MUST`). 도구는 DepURL 중앙 레지스트리(PEP 804 참조)에 이름이 없는 경우 경고 또는 오류를 발생시킬 수 있습니다 (`MAY`).
*   **version (선택 사항):** 단일 버전 또는 버전 범위로, `PEP 440` 의미론을 따르는 일반 버전 지정자여야 합니다 (`MUST`). 이 경우 `>=` , `>` , `<` , `<=` , `==` , `,` 연산자만 사용할 수 있습니다.
*   **qualifiers (선택 사항):** 유효한 PURL `qualifier`로 구문 분석되어야 합니다 (`MUST`).
*   **subpath (선택 사항):** 유효한 PURL `subpath`로 구문 분석되어야 합니다 (`MUST`).

### 외부 의존성 지정자 (External dependency specifiers)

외부 의존성 지정자는 DepURL을 포함해야 하며 (`MUST`), 일반 의존성 지정자 (원래 PEP 508에 지정됨)에 사용된 것과 동일한 구문을 가진 환경 마커를 포함할 수 있습니다 (`MAY`).

### Core Metadata 변경 사항 (Changes in Core Metadata)

#### 사용 중단 (Deprecations)

`External-Requires` Core Metadata 필드는 더 이상 사용되지 않음으로 표시되고 그 사용은 권장되지 않습니다.

#### 추가 사항 (Additions)

두 가지 새로운 필드가 Core Metadata에 추가됩니다.

*   `Requires-External-Dep`: 외부 의존성 지정자 문자열로 표현된 외부 요구 사항.
*   `Provides-External-Extra`: 외부 의존성만 포함하는 추가 그룹 (`Requires-External-Dep`에서 찾을 수 있음).

#### 버전 업 (Version bump)

제안된 변경 사항이 순수하게 추가적인 것이므로, Core Metadata 버전은 2.6으로 상향 조정됩니다.

이는 PyPI 및 외부 런타임 의존성을 지원하려는 도구에만 영향을 미치며, 그 외에는 변경이 필요하지 않습니다.

### `pyproject.toml` 변경 사항 (Changes in pyproject.toml)

`pyproject.toml` 내용은 PEP 621과 동일한 형식입니다.

#### 테이블 이름 (Table name)

도구는 이 PEP에 정의된 필드를 `[external]`이라는 테이블에 지정해야 합니다 (`MUST`). 어떤 도구도 이 PEP 또는 이후 PEP에 정의되지 않은 필드를 이 테이블에 추가해서는 안 됩니다. `[external]` 테이블이 없다는 것은 패키지에 외부 의존성이 없거나, 있더라도 시스템에 이미 존재한다고 가정된다는 것을 의미합니다.

#### `build-requires` / `optional-build-requires`

*   **형식:** 외부 의존성 지정자 배열 (`build-requires`) 및 외부 의존성 지정자 배열 값을 가진 테이블 (`optional-build-requires`)
*   **Core metadata:** N/A

프로젝트 빌드에 필요한 (선택적) 외부 빌드 요구 사항입니다.

`build-requires`의 경우, 값은 문자열 배열인 키입니다. 각 문자열은 프로젝트의 빌드 요구 사항을 나타내며 유효한 외부 의존성 지정자로 형식이 지정되어야 합니다 (`MUST`).

`optional-build-requires`의 경우, 각 키가 추가 빌드 요구 사항 세트를 지정하고 해당 값이 문자열 배열인 테이블입니다. 배열의 문자열은 유효한 외부 의존성 지정자여야 합니다 (`MUST`).

#### `host-requires` / `optional-host-requires`

*   **형식:** 외부 의존성 지정자 배열 (`host-requires`) 및 외부 의존성 지정자 배열 값을 가진 테이블 (`optional-host-requires`)
*   **Core metadata:** N/A

프로젝트 빌드에 필요한 (선택적) 외부 호스트 요구 사항입니다.

`host-requires`의 경우, 값은 문자열 배열인 키입니다. 각 문자열은 프로젝트의 호스트 요구 사항을 나타내며 유효한 외부 의존성 지정자로 형식이 지정되어야 합니다 (`MUST`).

`optional-host-requires`의 경우, 각 키가 추가 호스트 요구 사항 세트를 지정하고 해당 값이 문자열 배열인 테이블입니다. 배열의 문자열은 유효한 외부 의존성 지정자여야 합니다 (`MUST`).

#### `dependencies` / `optional-dependencies`

*   **형식:** 외부 의존성 지정자 배열 (`dependencies`) 및 외부 의존성 지정자 배열 값을 가진 테이블 (`optional-dependencies`)
*   **Core metadata:** `Requires-External-Dep`, `Provides-External-Extra`

프로젝트의 (선택적) 런타임 의존성입니다.

`dependencies`의 경우, 값은 문자열 배열인 키입니다. 각 문자열은 프로젝트의 의존성을 나타내며 유효한 외부 의존성 지정자로 형식이 지정되어야 합니다 (`MUST`). 각 문자열은 `Requires-External-Dep` 필드로 Core Metadata에 추가되어야 합니다 (`MUST`).

`optional-dependencies`의 경우, 각 키가 추가 항목을 지정하고 해당 값이 문자열 배열인 테이블입니다. 배열의 문자열은 유효한 외부 의존성 지정자여야 합니다 (`MUST`). 각 `optional-dependencies` 그룹에 대해:

*   그룹의 이름은 `Provides-External-Extra` 필드로 Core Metadata에 추가되어야 합니다 (`MUST`).
*   해당 그룹의 외부 의존성 지정자는 해당 `; extra == 'name'` 환경 마커와 함께 `Requires-External-Dep` 필드로 Core Metadata에 추가되어야 합니다 (`MUST`).

#### `dependency-groups`

*   **형식:** 각 키가 그룹의 이름이고, 값은 외부 의존성 지정자, 테이블 또는 둘의 혼합 배열인 테이블.
*   **Core metadata:** N/A

`PEP 735` 스타일 의존성 그룹이지만, `PEP 508` 문자열 대신 외부 의존성 지정자를 사용합니다. 다른 모든 세부 사항 (예: 그룹 포함, 이름 정규화)은 공식 의존성 그룹 사양을 따릅니다.

## 예시 (Examples)

이 예시들은 여러 패키지에 대한 `[external]` 테이블 내용과 해당 `PKG-INFO / METADATA` 내용(있는 경우)이 어떻게 예상되는지 보여줍니다.

### `cryptography 39.0`

`pyproject.toml` 내용:

```toml
[external]
build-requires = [
  "dep:virtual/compiler/c",
  "dep:virtual/compiler/rust",
  "dep:generic/pkg-config",
]
host-requires = [
  "dep:generic/openssl",
  "dep:generic/libffi",
]
```

`PKG-INFO / METADATA` 내용: N/A.

### `SciPy 1.10`

`pyproject.toml` 내용:

```toml
[external]
build-requires = [
  "dep:virtual/compiler/c",
  "dep:virtual/compiler/cpp",
  "dep:virtual/compiler/fortran",
  "dep:generic/ninja",
  "dep:generic/pkg-config",
]
host-requires = [
  "dep:virtual/interface/blas",
  "dep:virtual/interface/lapack@>=3.7.1",
]
```

`PKG-INFO / METADATA` 내용: N/A.

### `Pillow 10.1.0`

`pyproject.toml` 내용:

```toml
[external]
build-requires = [
  "dep:virtual/compiler/c",
]
host-requires = [
  "dep:generic/libjpeg",
  "dep:generic/zlib",
]
[external.optional-host-requires]
extra = [
  "dep:generic/lcms2",
  "dep:generic/freetype",
  "dep:generic/libimagequant",
  "dep:generic/libraqm",
  "dep:generic/libtiff",
  "dep:generic/libxcb",
  "dep:generic/libwebp",
  "dep:generic/openjpeg@>=2.0",
  "dep:generic/tk",
]
```

`PKG-INFO / METADATA` 내용: N/A.

### `NAVis 1.4.0`

`pyproject.toml` 내용:

```toml
[project.optional-dependencies]
r = ["rpy2"]
[external]
build-requires = [
  "dep:generic/XCB; platform_system=='Linux'",
]
[external.optional-dependencies]
nat = [
  "dep:cran/nat",
  "dep:cran/nat.nblast",
]
```

`PKG-INFO / METADATA` 내용:

```
Provides-External-Extra: nat
Requires-External-Dep: dep:cran/nat; extra == 'nat'
Requires-External-Dep: dep:cran/nat.nblast; extra == 'nat'
```

### `Spyder 6.0`

`pyproject.toml` 내용:

```toml
[external]
dependencies = [
  "dep:cargo/ripgrep",
  "dep:cargo/tree-sitter-cli",
  "dep:golang/github.com/junegunn/fzf",
]
```

`PKG-INFO / METADATA` 내용:

```
Requires-External-Dep: dep:cargo/ripgrep
Requires-External-Dep: dep:cargo/tree-sitter-cli
Requires-External-Dep: dep:golang/github.com/junegunn/fzf
```

### `jupyterlab-git 0.41.0`

`pyproject.toml` 내용:

```toml
[external]
dependencies = [
  "dep:generic/git",
]
[external.optional-build-requires]
dev = [
  "dep:generic/nodejs",
]
```

`PKG-INFO / METADATA` 내용:

```
Requires-External-Dep: dep:generic/git
```

### `PyEnchant 3.2.2`

`pyproject.toml` 내용:

```toml
[external]
dependencies = [
  # libenchant is needed on all platforms but vendored into wheels
  # distributed on PyPI for Windows. Hence choose to encode that in
  # the metadata. Note: there is no completely unambiguous way to do
  # this; another choice is to leave out the environment marker in the
  # source distribution and either live with the unnecessary ``METADATA``
  # entry in the distributed Windows wheels, or to apply a patch to this
  # metadata when building those wheels.
  "dep:github/AbiWord/enchant; platform_system!='Windows'",
]
```

`PKG-INFO / METADATA` 내용:

```
Requires-External-Dep: dep:github/AbiWord/enchant; platform_system!="Windows"
```

### 의존성 그룹과 함께 (With dependency groups)

`pyproject.toml` 내용:

```toml
[external.dependency-groups]
dev = [
  "dep:generic/catch2",
  "dep:generic/valgrind",
]
```

`PKG-INFO / METADATA` 내용: N/A.

## 하위 호환성 (Backwards Compatibility)

이 PEP는 새로운 선택적 메타데이터만 추가하므로 하위 호환성에 미치는 영향은 없습니다. 이러한 메타데이터가 없는 경우 패키지 작성자나 패키징 도구에는 아무런 변경 사항이 없습니다.

이 PEP에서 도입된 유일한 변경 사항 중 기존 프로젝트에 영향을 미치는 것은 `External-Requires` Core Metadata 필드의 사용 중단입니다. 생태계에서의 낮은 침투율(근거 참조)을 고려할 때, 이 사용 중단의 영향은 미미할 것으로 예상됩니다.

이 필드는 `setuptools-ext`와 같은 기존 도구에서 계속 인식되겠지만, Python Packaging User Guide에서는 `Requires`와 같은 사용되지 않는 필드( `Requires-Dist`를 위해 사용 중단됨)와 유사하게 그 사용이 권장되지 않을 것입니다.

## 보안 영향 (Security Implications)

이 PEP는 외부 의존성에 대한 메타데이터를 정적으로 정의하는 방법을 다루므로 직접적인 보안 문제는 없습니다. 모든 보안 문제는 도구가 메타데이터를 소비하고 그에 따라 조치를 취하는 방식에서 발생할 것입니다.

## 교육 방법 (How to Teach This)

외부 의존성 및 해당 외부 의존성이 벤더링되는 방식은 일반적으로 파이썬 패키지 작성자가 자세히 이해하지 못하는 주제입니다. 외부 의존성이 정의되는 방식, `ctypes` 또는 서브프로세스 호출을 통한 런타임 전용 의존성부터 링크되는 빌드 의존성에 이르기까지 다양한 의존 방식부터 시작하여, 메타데이터에 외부 의존성을 선언하는 방법으로 넘어갈 계획입니다. 문서는 패키지 작성자에게 관련 있는 내용과 배포판 패키징 담당자에게 관련 있는 내용을 명시해야 합니다.

이 주제에 대한 자료는 가장 관련성이 높은 패키징 튜토리얼, 주로 Python Packaging User Guide에 추가될 것입니다. 또한, 외부 의존성 메타데이터에 대한 지원을 추가하는 모든 빌드 백엔드는 해당 문서에 이 정보를 포함할 것이며, `auditwheel`과 같은 도구도 마찬가지입니다.

## 참조 구현 (Reference Implementation)

이 PEP는 코드 기능보다는 메타데이터 사양을 포함하므로, 메타데이터 사양 전체를 구현하는 코드는 없을 것입니다. 그러나 참조 구현이 있는 부분도 있습니다.

*   `[external]` 테이블은 유효한 TOML이어야 하므로 `tomllib`으로 로드할 수 있습니다. 이 테이블은 아래에 시연된 `pyproject-external` 패키지로 추가 처리될 수 있습니다.
*   PURL 사양은 이 사양의 핵심 부분으로, PURL을 구성하고 구문 분석하기 위한 참조 구현이 포함된 파이썬 패키지 `packageurl-python`을 가지고 있습니다. 이 패키지는 DepURL별 유효성 검사 및 처리를 제공하기 위해 `pyproject-external`로 래핑됩니다.

메타데이터가 파이썬 패키지에 추가되면 이 메타데이터를 사용하는 여러 소비자 및 사용 사례가 있을 수 있습니다. 게시된 플랫폼별 휠이 있는 PyPI에서 가장 많이 다운로드된 상위 150개 패키지 모두에 대한 테스트된 메타데이터는 `rgommers/external-deps-build`에서 찾을 수 있습니다. 이 메타데이터는 해당 메타데이터로 패치된 `sdist`에서 깨끗한 Docker 컨테이너에서 휠을 빌드하는 데 사용하여 유효성이 검사되었습니다.

### 예시 (Example)

다음 `[external]` 테이블이 포함된 `pyproject.toml`이 있다고 가정합니다.

```toml
[external]
build-requires = [
  "dep:virtual/compiler/c",
  "dep:virtual/compiler/rust",
  "dep:generic/pkg-config",
]
host-requires = [
  "dep:generic/openssl",
  "dep:generic/libffi",
]
```

`pyproject_external.External`을 사용하여 이를 구문 분석하고 조작할 수 있습니다.

```python
>>> from pyproject_external import External
>>> external = External.from_pyproject_path("./pyproject.toml")
>>> external.validate()
>>> external.to_dict()
{'external': {'build_requires': ['dep:virtual/compiler/c', 'dep:virtual/compiler/rust', 'dep:generic/pkg-config'], 'host_requires': ['dep:generic/openssl', 'dep:generic/libffi']}}
>>> external.build_requires
[DepURL(type='virtual', namespace='compiler', name='c', version=None, qualifiers={}, subpath=None), DepURL(type='virtual', namespace='compiler', name='rust', version=None, qualifiers={}, subpath=None), DepURL(type='generic', namespace=None, name='pkg-config', version=None, qualifiers={}, subpath=None)]
>>> external.build_requires[0]
DepURL(type='virtual', namespace='compiler', name='c', version=None, qualifiers={}, subpath=None)
```

제안된 `[external]` 테이블이 잘 형성되었음에 유의하십시오. 다음과 같은 유효하지 않은 내용의 경우:

```toml
[external]
build-requires = [
  "dep:this-is-missing-the-type",
  "pkg:not-a-dep-url"
]
```

유효성 검사에 실패합니다.

```python
>>> external = External.from_pyproject_data(
...     {
...         "external": {
...             "build_requires": [
...                 "dep:this-is-missing-the-type",
...                 "pkg:not-a-dep-url"
...             ]
...         }
...     }
... )
ValueError: purl is missing the required type component: 'dep:this-is-missing-the-type'.
```

## 거부된 아이디어 (Rejected Ideas)

### PyPI에도 패키징된 외부 의존성을 위한 특정 구문 (Specific syntax for external dependencies which are also packaged on PyPI)

Ninja, patchelf, CMake와 같이 PyPI에 패키징된 비파이썬 패키지가 있습니다. 일반적으로 원하는 것은 해당 시스템 버전을 사용하고, 시스템에 없는 경우 PyPI 패키지를 설치하는 것입니다. 저자들은 이 시나리오에 대한 특정 지원이 불필요하다고 생각합니다 (또는 적어도 그러한 지원을 정당화하기에는 너무 복잡합니다). 외부 의존성을 위한 의존성 제공자는 PyPI를 패키지를 얻을 수 있는 한 가지 가능한 소스로 처리할 수 있습니다. 이 사용 사례에 대한 예시 매핑은 PEP 804에서 제안됩니다.

### 라이브러리 및 헤더 이름을 외부 의존성으로 사용 (Using library and header names as external dependencies)

이전 초안 PEP ("외부 의존성" (2015))는 특정 라이브러리 및 헤더 이름을 외부 의존성으로 사용할 것을 제안했습니다. 이는 너무 세분화되어 있고 불충분합니다 (예: 헤더는 종종 버전이 지정되지 않음; 여러 패키지가 동일한 헤더 또는 라이브러리를 제공할 수 있음). 패키지 이름을 사용하는 것은 패키징 생태계 전반에 걸쳐 잘 확립된 패턴이므로 선호되어야 합니다.

### 명시적인 `-dev` 또는 `-devel` 접미사를 사용하여 호스트 의존성 분할 (Splitting host dependencies with explicit -dev or -devel suffixes)

이 규칙은 패키징 생태계 전반에 걸쳐 일관되지 않으며, 업스트림 패키지 작성자가 일반적으로 받아들이지 않습니다. 명시적 제어의 필요성 (예: 패키지가 빌드 타임 의존성이 아닌 런타임 의존성으로 사용될 때 헤더 설치)은 상당히 틈새 시장이며, 충분히 명확한 사용 사례 없이 설계 복잡성을 추가하고 싶지 않기 때문에, 빌드, 호스트 및 실행 카테고리 분할에만 의존하기로 선택했으며, 각 경우에 어떤 카테고리가 적용되는지는 도구가 상황에 따라 결정합니다.

이것이 불충분하다고 판명되면, 미래의 PEP는 PURL 스키마에 있는 URL 한정자 기능 (`?key=value`)을 사용하여 필요한 조정을 구현할 수 있습니다. 이는 하위 호환 가능한 방식으로 수행할 수 있습니다.

### 식별자 간접 참조 (Identifier indirections)

일부 생태계에서는 `cmake("dependency")` 또는 `compiler("language")`와 같은 매개변수화된 함수를 기반으로 패키지를 선택하는 방법을 보여줍니다. 이러한 함수는 추가 컨텍스트 또는 구성을 기반으로 패키지 이름을 반환합니다. 이 기능은 논란의 여지가 있지만 그다지 흔하지 않으며, 존재하더라도 거의 사용되지 않습니다. 또한, 동적 특성으로 인해 시간이 지남에 따라 의미가 변경될 가능성이 있으며, 이름 해결을 위해 특정 빌드 시스템에 의존하는 것은 일반적으로 좋은 생각이 아닙니다.

저자들은 잘 알려진 메타데이터를 통해 명시적으로 매핑될 수 있는 정적 식별자 (예: PEP 804에 제안된 바와 같이)를 선호합니다.

이러한 간접 참조를 구현하는 생태계는 이를 사용하여 PEP 804에 제안된 매핑을 생성하도록 설계된 인프라를 지원할 수 있습니다.

### `[build-system]` 아래에 `host-requires` 키 추가 (Adding a host-requires key under [build-system])

크로스 컴파일을 지원하는 다른 패키징 시스템으로의 이름 매핑을 더 잘 지원하기 위해 PyPI에 있는 호스트 의존성에 대한 `host-requires`를 추가하는 것은 이 PEP가 `[external]` 테이블 아래에 `host-requires`를 추가하는 것과 동일한 이유로 원칙적으로 유용해 보입니다. 그러나 이 PEP에 포함할 필요는 없으므로, 저자들은 이 PEP의 범위를 제한하는 것을 선호합니다. 크로스 컴파일에 대한 미래의 PEP가 이를 다루고 싶을 수 있습니다. 이 이슈에는 이 PEP의 일부로 `[build-system]` 아래에 `host-requires`를 추가하는 것에 대한 찬성 및 반대 주장이 더 많이 포함되어 있습니다.

### Core Metadata에서 `Requires-External` 필드 재사용 (Reusing the Requires-External field in Core Metadata)

Core Metadata 사양에는 하나의 관련 필드인 `Requires-External`이 포함되어 있습니다. 언뜻 보기에는 `external.dependencies` 테이블을 기록하기에 좋은 후보처럼 보였지만, 저자들은 이 필드를 재사용하여 외부 런타임 의존성 메타데이터를 전파하지 않기로 결정했습니다.

`Requires-External` 필드는 버전 2.4 현재 매우 느슨하게 정의된 의미론을 가집니다. 본질적으로: `name [(version)][; environment marker]` (대괄호는 선택적 필드를 나타냄). `name`에 대한 유효한 문자열이 무엇인지는 정의되어 있지 않습니다. 사양의 예시에서는 "C"를 언어 이름으로, "libpng"를 패키지 이름으로 모두 사용합니다. 의미론을 강화하는 것은 하위 호환성이 없을 것이며, 그대로 두는 것은 만족스럽지 않은 것 같습니다. DepURL은 이 구문에 맞게 분해되어야 합니다.

### 생태계별 버전 비교 의미론 사용 허용 (Allowing use of ecosystem-specific version comparison semantics)

특히 사전 릴리스를 다룰 때 `PEP 440` 버전 비교 의미론이 제대로 작동하지 않는 경우가 있습니다. 예를 들어, `1.2.3a`는 `1.2.3` 이후 릴리스를 나타낼 수 있으며 알파 버전을 나타내지 않을 수 있습니다. 이러한 경우를 올바르게 처리하려면 임의의 버전 관리 체계를 허용해야 합니다. 이 PEP의 저자들은 이를 허용함으로써 얻는 추가 가치가 추가 복잡성으로 정당화되지 않는다고 생각합니다. 원하는 경우 패키지 작성자는 코드 주석 또는 DepURL의 한정자 필드 (근거의 버전 관리 섹션 참조)를 사용하여 이 수준의 세부 정보를 캡처할 수 있습니다.

## 미해결 문제 (Open Issues)

현재 없음.

## 참고 자료 (References)

 "Wanting a singular packaging vision" 스레드의 "define native requirements metadata" 부분 (2022, Discourse): https://discuss.python.org/t/wanting-a-singular-packaging-tool-vision/21141/92
 `pypackaging-native`: "Native dependencies" https://pypackaging-native.github.io/key-issues/native-dependencies/
 GCC documentation - Configure Terms and History, https://gcc.gnu.org/onlinedocs/gccint/Configure-Terms.html
 Meson documentation - Cross compilation https://mesonbuild.com/Cross-compilation.html
 `pypackaging-native`: "Cross compilation" https://pypackaging-native.github.io/key-issues/cross_compilation/
 "pkgconfig specification as an alternative to ctypes.util.find_library" 스레드 (2023, Discourse): https://discuss.python.org/t/pkgconfig-specification-as-an-alternative-to-ctypes-util-find-library/31379

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 게시됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.