---
title: "[Final] PEP 376 - Database of Installed Python Distributions"
excerpt: "Python Enhancement Proposal 376: 'Database of Installed Python Distributions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/376/
toc: true
toc_sticky: true
date: 2025-09-26 20:59:42+0900
last_modified_at: 2025-09-26 20:59:42+0900
published: true
---
> **원문 링크:** [PEP 376 - Database of Installed Python Distributions](https://peps.python.org/pep-0376/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 22-Feb-2009

## PEP 376 – 설치된 Python 배포판 데이터베이스

### 초록 (Abstract)
이 PEP의 목표는 시스템에 설치된 프로젝트 배포판을 관리하는 표준 인프라를 제공하여, 프로젝트를 설치하거나 제거하는 모든 도구들이 상호 운용될 수 있도록 하는 것입니다. 이를 달성하기 위해 PEP는 시스템에 설치된 배포판을 설명하는 새로운 형식을 제안하며, 표준 라이브러리에 대한 참조 구현도 설명합니다. 과거에 설치 데이터베이스를 만들려는 시도가 있었으나 (PEP 262 참조), 현재 제안은 PEP 345와 결합되어 PEP 262를 대체합니다.

**참고:** 이 PEP는 역사적인 문서입니다. 최신 규격인 `Core metadata specifications`는 PyPA specs 페이지에서 유지 관리됩니다.

### 배경 (Rationale)
현재 Python에서 배포판이 설치되는 방식에는 두 가지 문제가 있습니다.
1. 너무 많은 설치 방식이 존재하여 상호 운용이 어렵습니다.
2. 설치된 배포판에 대한 정보를 얻을 수 있는 API가 없습니다.

#### 배포판 설치 방식 (How distributions are installed)
현재 Python에서 배포판이 설치될 때, 각 요소가 다른 디렉터리에 설치될 수 있습니다. 예를 들어, Distutils는 순수 Python 코드를 `purelib` 디렉터리에 설치하며, 유닉스 계열 시스템과 Mac OS X에서는 `lib/python2.6/site-packages`에, Windows에서는 Python 설치 디렉터리 아래의 `Lib\site-packages`에 해당합니다.

`Distutils`의 `install` 명령에 포함된 `install_egg_info` 하위 명령은 프로젝트의 `.egg-info` 파일을 `purelib` 디렉터리에 추가합니다. 예를 들어, `docutils` 배포판의 경우 `docutils` 패키지, `roman.py` 모듈, `docutils-0.5-py2.6.egg-info` 파일이 `site-packages`에 설치됩니다. 일부 실행 스크립트(예: `rst2html.py`)도 Python 설치의 `bin` 디렉터리에 추가됩니다.

`setuptools` 프로젝트는 `EggFormats`라고 불리는 두 가지 다른 배포판 설치 형식을 제공합니다.
1. 모든 배포판 파일과 `EGG-INFO` 하위 디렉터리에 `PKG-INFO`라는 파일에 배포 메타데이터가 포함된 자체 포함 `.egg` 디렉터리.
2. `site-packages`에 설치된 `.egg-info` 디렉터리로, `.egg` 형식의 `EGG-INFO`와 동일한 파일을 포함합니다.

`setuptools`는 또한 `easy-install.pth` 파일에 배포판에 대한 참조를 추가합니다. `easy_install` 스크립트는 `distutils` 기반 배포판을 포함한 모든 배포판을 자체 포함 `.egg` 디렉터리에 설치합니다. `pip`, Fedora 패키지 관리자, Debian 패키지 관리자는 `setuptools` 기반 배포판 또는 `easy_install` 스크립트와 함께 `--single-version-externally-managed` 또는 `--root` 옵션을 사용하여 `distutils`와 유사하게 프로젝트를 설치하도록 강제합니다.

#### 제거 정보 (Uninstall information)
`Distutils`는 제거(uninstall) 명령을 제공하지 않습니다. 배포판을 제거하려면 설치된 다양한 요소를 직접 제거해야 하며, `setuptools` 프로젝트는 최근 제거 기능을 추가했습니다. 이는 `install` 명령의 `record` 옵션을 사용하여 설치된 모든 파일을 기록합니다.

### PEP 제안 내용 (What this PEP proposes)
이러한 문제를 해결하기 위해 이 PEP는 몇 가지 변경 사항을 제안합니다.
1. `setuptools`의 `EggFormats` 표준 중 하나에서 영감을 받은 새로운 `.dist-info` 디렉터리 구조.
2. 설치된 배포판 정보를 쿼리할 수 있는 `pkgutil`의 새로운 API.
3. `Distutils`의 제거 함수 및 제거 스크립트.

#### 설치된 배포판당 하나의 `.dist-info` 디렉터리 (One .dist-info directory per installed distribution)
이 PEP는 `site-packages` 디렉터리에 위치한 별도의 디렉터리를 사용하는 `EggFormats` 표준의 옵션 중 하나에서 영감을 받은 설치 형식을 제안합니다.
이 별도의 디렉터리는 `name + '-' + version + '.dist-info'` 형식으로 명명됩니다.
이 `.dist-info` 디렉터리는 다음 파일을 포함할 수 있습니다.
- **METADATA** : PEP 345, PEP 314, PEP 241에 설명된 메타데이터를 포함합니다.
- **RECORD** : 설치된 파일 목록을 기록합니다.
- **INSTALLER** : 프로젝트를 설치하는 데 사용된 도구의 이름을 기록합니다.
- **REQUESTED** : 이 파일의 존재는 프로젝트 설치가 명시적으로 요청되었음을 나타냅니다 (즉, 의존성으로 설치되지 않음).

`METADATA`, `RECORD`, `INSTALLER` 파일은 필수이며, `REQUESTED`는 없을 수도 있습니다.

**RECORD**
`RECORD` 파일은 설치 시점에 `.dist-info` 디렉터리 내에 추가되며, 설치 명령을 사용하여 소스 배포판을 설치할 때 생성됩니다. `RECORD` 파일은 설치된 파일 목록을 보유합니다. 이 파일은 `install` 명령의 `record` 옵션에 의해 나열된 파일에 해당하며, 기본적으로 생성됩니다.

`RECORD` 파일은 `CSV` 파일이며, 설치된 파일당 한 줄의 레코드로 구성됩니다. 각 레코드는 파일 경로, 파일 내용의 해시, 파일 크기(바이트)의 세 가지 요소로 구성됩니다.

**INSTALLER**
`install` 명령에는 `installer`라는 새로운 옵션이 있습니다. 이 옵션은 설치를 호출하는 데 사용된 도구의 이름입니다. 제공되지 않으면 기본값은 `distutils`입니다. 배포판이 설치되면 `INSTALLER` 파일이 `.dist-info` 디렉터리에 이 값과 함께 생성되어 배포판을 설치한 주체를 추적합니다.

**REQUESTED**
일부 설치 도구는 충족되지 않은 의존성을 자동으로 감지하고 설치합니다. 이 경우 어떤 배포판이 순전히 의존성으로 설치되었는지 추적하는 것이 유용합니다. 배포판이 사용자 요청에 의해 직접 설치된 경우 (`REQUESTED` 파일이 `.dist-info` 디렉터리에 추가됩니다. 설치 도구가 다른 배포판의 의존성으로 배포판을 자동으로 설치하는 경우, `REQUESTED` 파일은 생성되지 않아야 합니다.

### 구현 세부 사항 (Implementation details)
**참고:** 이 섹션은 규범적이지 않습니다. 결국 이 PEP는 표준 라이브러리가 아닌 타사 라이브러리 및 도구에 의해 구현되었습니다.

#### `pkgutil`의 새로운 함수 및 클래스 (New functions and classes in pkgutil)
`.dist-info` 디렉터리 내용을 사용하려면 표준 라이브러리에 API 세트를 추가해야 합니다. 이 API를 넣을 가장 좋은 장소는 `pkgutil`입니다.

`pkgutil` 모듈에 추가된 새로운 함수는 다음과 같습니다.
- `distinfo_dirname(name, version) -> directory name`
- `get_distributions() -> iterator of Distribution instances.`
- `get_distribution(name) -> Distribution or None.`
- `obsoletes_distribution(name, version=None) -> iterator of Distribution instances.`
- `provides_distribution(name, version=None) -> iterator of Distribution instances.`
- `get_file_users(path) -> iterator of Distribution instances.`

**Distribution 클래스 (Distribution class)**
생성자에 제공된 `.dist-info` 디렉터리의 경로로 `Distribution`이라는 새 클래스가 생성됩니다. 이 클래스는 인스턴스화될 때 `METADATA`에 포함된 메타데이터를 읽습니다.
- `Distribution(path) -> instance`
`Distribution`은 다음 속성을 제공합니다.
- `name`: 배포판의 이름.
- `metadata`: 배포판의 `METADATA` 파일로 로드된 `DistributionMetadata` 인스턴스.
- `requested`: `REQUESTED` 메타데이터 파일이 존재하는지 여부를 나타내는 부울.

다음 메서드를 제공합니다.
- `get_installed_files(local=False) -> iterator of (path, hash, size)`
- `uses(path) -> Boolean`
- `get_distinfo_file(path, binary=False) -> file object`
- `get_distinfo_files(local=False) -> iterator of paths`

#### `Distutils`의 새로운 함수 (New functions in Distutils)
`Distutils2`는 `distutils2.util`에 추가되고 제거할 배포판의 이름을 인수로 취하는 매우 기본적인 제거 함수를 제공할 것입니다. 이 `uninstall` 함수는 이전에 설명된 API를 사용하여 고유한 모든 파일을 제거합니다.

**설치자 마커 (Installer marker)**
이 PEP에서 앞서 설명했듯이 `install` 명령은 설치자의 이름과 함께 `INSTALLER` 파일을 `.dist-info` 디렉터리에 추가합니다. 다른 패키징 시스템에 의해 설치된 배포판이 제거되는 것을 방지하기 위해 `uninstall` 함수는 기본값이 `distutils2`인 추가 인수 `installer`를 사용합니다. 호출될 때, `uninstall`은 `INSTALLER` 파일이 이 인수와 일치하는지 확인합니다. 일치하지 않으면 `DistutilsUninstallError`를 발생시킵니다.

**제거 스크립트 추가 (Adding an Uninstall script)**
`Distutils2`에 제거 스크립트가 추가되며 다음과 같이 사용됩니다.
`$ python -m distutils2.uninstall projectname`

### 하위 호환성 및 로드맵 (Backward compatibility and roadmap)
이러한 변경 사항은 새로운 함수로 `pkgutil`과 `distutils2`에 구현되므로 호환성 문제를 일으키지 않습니다. 이 PEP에 설명된 기능은 Python 3.2의 `pkgutil`과 `Distutils2`에 포함될 계획입니다. `Distutils2`는 새로운 `pkgutil`의 백포트도 포함하며, 2.4 버전부터 사용할 수 있습니다.

기존의 표준화 이전 형식으로 설치된 배포판에는 새 API에 필요한 메타데이터가 없으므로 무시됩니다. 타사 도구는 전환을 용이하게 하기 위해 새로운 형식 외에 이전 형식도 계속 지원할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.