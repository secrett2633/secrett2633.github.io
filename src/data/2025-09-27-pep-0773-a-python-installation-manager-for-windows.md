---
title: "[Accepted] PEP 773 - A Python Installation Manager for Windows"
excerpt: "Python Enhancement Proposal 773: 'A Python Installation Manager for Windows'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/773/
toc: true
toc_sticky: true
date: 2025-09-27 13:54:28+0900
last_modified_at: 2025-09-27 13:54:28+0900
published: true
---
> **원문 링크:** [PEP 773 - A Python Installation Manager for Windows](https://peps.python.org/pep-0773/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 21-Jan-2025

PEP 773: Windows용 Python 설치 관리자 제안

## 초록 (Abstract)
Windows에서 `python.org` 파이썬 배포판을 설치하는 것은 복잡합니다. 사용자 경험은 비슷하지만 각각 다른 한계를 가진 세 가지 주요 설치 방식이 있으며, 이 모든 방식은 최신 사용 시나리오를 충족시키지 못하고 있습니다. 이 PEP는 기존 설치 프로그램의 모든 요구 사항을 충족하고 대부분의 한계를 피하며, 핵심 팀이 향후 몇 년 동안 릴리스를 관리할 수 있도록 하는 단일 Windows 설치 워크플로 도구에 대한 설계를 제안합니다.

새로운 설치 관리자를 사용하면 Windows에서 기본 Python을 실행하는 권장 명령은 `python`이 되며, 여러 버전을 관리(특정 버전 실행 포함)하는 명령은 `py`가 됩니다. 사용자는 `PATH` 환경 변수에 추가 항목을 추가하여 전역 `python3.x` 명령을 사용할 수도 있습니다. 이 기능에 대한 가장 간결한 개요는 "이것을 어떻게 가르칠 것인가" 섹션부터 시작하는 것을 권장합니다.

기존 `.exe` 설치 프로그램과 `py` 런처는 이 PEP가 승인된 후 2년 이내에 사용 중단(deprecated)되고 더 이상 릴리스되지 않습니다. 기존 임베디드 배포판은 다운로드 목록에서 제거되지만, 새 설치 관리자를 통해 계속 사용할 수 있습니다. Windows Store 앱은 즉시 이 설치 관리자로 대체됩니다.

## 독자를 위한 참고 (Reader's Note)
이 문서는 Windows에서 Python의 기존 설치 형식을 새 형식으로 대체하는 것에 대한 "승인" 또는 "거부" 결정을 돕기 위한 상세한 제안입니다. 이는 구속력 있는 사양이나 사용자 문서 또는 상호 운용성 사양을 의도한 것이 아닙니다. 실제 구현은 필요에 따라 시간이 지남에 따라 달라질 수 있으며, 이는 이 PEP의 "위반"으로 간주되지 않습니다. 공개 사용을 위한 모든 인터페이스 및 프로토콜은 표준 사용 중단 일정에 따라 독립적으로 문서화되고 유지 관리됩니다.

Windows에 Python을 설치하는 방법에 대한 문서는 `docs.python.org/using/windows.html`에서 찾을 수 있습니다.

## 배경 (Background)
사용자가 Python 런타임을 설치하려는 다양한 요구 사항이 있습니다. 대부분의 사용자는 간단한 작업을 수행하거나 개념을 가르치는 데 도움이 되는 짧은 스크립트를 실행(또는 작성)하는 데 관심이 있습니다. 일부 사용자는 기존 코드 또는 다른 애플리케이션과 통합할 특정 버전을 찾고 있습니다. 일부는 테스트를 수행하기 위해 다양한 인터프리터 버전의 전체 세트를 원합니다.

이 섹션에서는 사용자가 "Python 설치"에 대해 가지는 기대치, Windows용 기존 설치 프로그램에 대한 개요, 그리고 이러한 제품에 내재된 몇 가지 격차와 과제를 다룹니다.

### 기대치 (Expectations)
주요 Python 사용자 대다수는 다음과 같은 사항을 기대합니다.
*   대부분의 사용자는 최신 안정 버전을 원합니다.
*   대부분의 사용자는 "원클릭" 또는 더 적은 클릭으로 설치를 원합니다.
*   대부분의 사용자는 관리자 권한을 사용하고 싶어 하지 않습니다.
*   대부분의 사용자는 유지 보수 업데이트 설치를 통해 이점을 얻을 것입니다.
*   대부분의 사용자는 설치 후 `python` 명령이 작동하기를 기대합니다.

또한, 다른 중요한 사용자 그룹에 대해서는 다음과 같은 가정을 합니다.
*   일부 사용자는 Python을 프로그래밍 방식으로 설치하기를 원합니다.
*   일부 사용자는 특정 버전을 설치하기를 원합니다.
*   일부 사용자는 여러 버전을 설치하기를 원합니다.
*   일부 사용자는 자신의 컴퓨터의 모든 사용자를 위해 설치하기를 원합니다.
*   일부 사용자는 시작 메뉴(Start Menu) 바로 가기를 원하지 않습니다.
*   일부 사용자는 프로젝트의 빌드 프로세스 일부로 설치하기를 원합니다.
*   일부 사용자는 프로젝트의 설치 프로세스 일부로 설치하기를 원합니다.
*   일부 사용자는 설치를 절대로 업데이트하지 않을 의도를 가집니다.
*   일부 사용자는 설치 후 `py` 명령이 작동하기를 기대합니다.

### 기존 설치 방식 (Traditional Installer)
기존 설치 프로그램은 `python.org`에서 직접 다운로드할 수 있는 실행 파일로, Python용 전체 개발 키트를 설치합니다. 여기에는 CPython 인터프리터, 표준 라이브러리, Python 헤더 및 import 라이브러리, Tcl 및 Tk 빌드, HTML 파일 형태의 문서, 런타임 및 표준 라이브러리 테스트 스위트, Python 및 IDLE용 시작 메뉴 바로 가기, 디버깅 심볼 및 바이너리 디버그 빌드, `py.exe` 런처 및 해당 파일 연결, 사용자 `PATH` 환경 변수 수정 기능, 시스템의 긴 경로 지원 활성화, 표준 라이브러리용 `.pyc` 파일 사전 생성, `pip` 설치 기능이 포함됩니다. 3.13부터는 실험적인 자유 스레드(free-threaded) 바이너리 세트도 포함됩니다. 이들 구성 요소 중 상당수는 선택 사항입니다.

### Windows Store
CPython용 Windows Store 패키지는 일반 릴리스 프로세스의 일부로 다른 패키지와 거의 동일한 바이너리를 사용하여 생성됩니다. 앱 스토어 패키지에 있기 때문에 기본 `python.exe`는 위치를 올바르게 결정할 수 있도록 향상되었으며, `PATH` 환경 변수 설정이 부족한 부분을 보완하기 위해 대체 `pip.exe` 및 기타 바로 가기가 포함됩니다.

또한, Microsoft는 깨끗한 Windows 설치에 기본 `python.exe` 명령을 추가했습니다. 이는 Python이 아직 설치되지 않은 컴퓨터에서 Python을 실행하려는 사용자 시도를 포착합니다. 직접 실행하면 이 명령은 Microsoft Store 앱을 열어 권장 Python 앱 페이지(일반적으로 최신 버전)로 이동합니다.

### NuGet Package
CPython용 NuGet 패키지는 일반 릴리스 프로세스의 일부로 생성 및 게시됩니다. 내용은 기존 설치 프로그램과 동일합니다. NuGet 패키지는 일반적으로 .NET 언어와 관련이 있지만 Visual Studio에서 지원하는 모든 프로젝트와 고도로 통합된 패키지 관리자인 `nuget.org`에 게시됩니다.

### Embeddable Package (임베딩 패키지)
CPython용 임베딩 패키지는 일반 릴리스 프로세스의 일부로 생성 및 게시됩니다. 기존 설치 프로그램과 함께 `python.org`에 게시됩니다. 내용은 동일하지만, 모든 바이너리를 최상위 수준에 저장하고 표준 라이브러리는 ZIP 파일로 압축하도록 레이아웃이 변경되었습니다. `._pth` 파일은 `sys.path`를 재정의하여 배포판의 일부인 파일만 사용하고 환경 변수 또는 레지스트리 항목은 무시하도록 포함됩니다.

이 패키지는 `pip`를 포함하지 않는데, 이는 더 넓은 애플리케이션에 임베딩하기 위한 목적 때문입니다.

### 대체 배포판 (Alternate Distributions)
핵심 팀의 권한 밖이지만, Windows용 Python의 대체 배포판은 런타임 설치를 위한 프로젝트, 워크플로 또는 환경 중심 모델을 사용하는 경우가 많습니다. 이는 도구가 먼저 설치되고, 런타임 및 기타 종속성을 포함하는 작업 공간을 만드는 데 사용된다는 의미입니다. 이러한 도구의 예로는 `conda`와 `uv`가 있습니다.

### 문제점 (Challenges)
현재 설치 프로그램 세트에는 사용자 기대치 불일치 또는 달성 불가능, 그리고 일반적인 불안정성이라는 두 가지 주요 범주로 나눌 수 있는 수많은 문제점이 있습니다.

*   **기존 설치 프로그램 (Traditional Installer)의 불안정성** : Windows Installer 기술은 매우 오래되었고 사실상 더 이상 개발되지 않습니다. 바이러스 스캐너, 다른 설치 프로그램, 시스템 구성, 관리 정책 등 다양한 요인으로부터 간섭을 받을 수 있습니다.
*   **PATH 환경 변수 문제** : `PATH` 환경 변수가 지능적으로 수정될 수 없습니다. 이는 종종 가장 최근에 설치된 Python이 가장 높은 우선순위를 가지게 하여, 예를 들어 사용자가 Python 3.14를 설치한 후 3.13을 설치(또는 업데이트)하면 `python` 명령이 최신 버전에서 이전 버전으로 전환됩니다.
*   **`py.exe` 런처의 한계** : `PEP 397`에 정의되고 `PEP 514`에 의해 묵시적으로 업데이트된 `py.exe` 런처는 이 특정 문제를 피하려는 시도입니다. 그러나 `PEP 514` 논리는 프리릴리스 또는 실험 빌드를 특별히 처리할 수 없어, `py.exe`가 종종 사용자가 기대하는 비실험 버전보다 이러한 빌드를 기본적으로 선호합니다.
*   **Windows Store 패키지의 한계** : Windows Store 패키지는 전역 바로 가기를 제외하고는 매우 안정적입니다. `PATH`를 수정하는 대신 바로 가기는 OS가 관리하는 단일 디렉터리에 생성됩니다. 이는 불안정하거나 일관성 없는 동작을 초래할 수 있습니다. 또한, Store 패키지는 앱 실행 오버헤드로 인해 Python 시작이 더 느리고, 앱 격리 설계로 인해 다른 버전의 Python 간 통신이 더 어렵습니다.
*   **NuGet 및 임베딩 패키지의 한계** : 두 패키지 모두 아카이브 파일을 압축 해제하는 것만큼 간단하고 안정적으로 설치되지만, 설치 관리가 전혀 없으며 삭제 및 재압축 외에는 안정적으로 업데이트할 수 없습니다.

## PyManager 개요 (Overview of PyManager)
PyManager는 제안된 대체 설치 관리자 도구의 내부 이름입니다. Windows Store와 `python.org` 모두에서 MSIX 패키지로 배포될 것입니다. 어느 쪽에서 다운로드하든 동일한 패키지를 얻게 되며, 둘 다 새 릴리스에 대한 자동 업데이트(Store를 통해)를 지원합니다.

사용자에게 보이는 이름은 "Python Install Manager"이며, Python Software Foundation에서 게시합니다. 게시 후 Microsoft에 `python.exe` 스텁을 이 새 앱으로 열도록 조정해달라고 요청할 것입니다.

이 앱은 직접적으로 Python 버전을 제공하지는 않지만, 사용자가 기대하는 전역 명령과 파일 연결 및 시작 메뉴 바로 가기를 제공합니다. OS는 설치 후 앱을 실행하도록 사용자에게 알리고, 이는 CPython의 현재 릴리스 자동 설치를 트리거한 후 실행합니다. 사용자의 관점에서는 첫 실행 시 진행률 표시줄 하나가 추가된 것 외에는 현재와 동일한 초기 경험을 하게 됩니다.

PyManager에서 제공하는 전역 명령은 `python.exe`, `python3.exe`, `py.exe`, `pymanager.exe`입니다. 각 명령은 사용자 시스템을 검사하고 실행할 올바른 런타임을 선택할 수 있어야 합니다. 또한, `py` 및 `pymanager`는 런타임을 추가하고 제거할 수 있는 관리 서브커맨드(subcommand)를 가집니다.

`PEP 394` 및 Windows의 기본 동작에 따라, Python 실행을 위한 권장 명령은 `python.exe`입니다. PyManager가 제공하는 이 명령은 기존 설치를 찾거나(PyManager가 관리하는 설치 또는 `PEP 514`를 사용하여) 사용 가능한 최신 CPython 버전을 설치하고 선택합니다. `python3.exe` 명령은 유사하게 작동하지만, `python.org`에서 3.x 설치만 찾을 수 있습니다.

PyManager가 제공하는 `py.exe` 명령은 간결성 때문에 대부분의 관리 용도로 권장됩니다. 예를 들어 `py install ...`, `py list ...` 등입니다. 기존 `PEP 397` 런처의 동작은 유지되지만, `py`를 통한 실행은 런타임을 자동으로 설치하지 않습니다(기본적으로).

`pymanager.exe` 명령은 모호한 상황을 처리하기 위한 것입니다.

### 다른 설치 프로그램 대체 (Replacing other installers)
PyManager는 개별 버전을 Windows Store에 게시하는 것을 즉시 중단하고, Python 3.16까지 기존 설치 프로그램을 사용 중단하고 단계적으로 폐지할 계획입니다. 임베딩 배포판은 유지되지만, `python.org` 다운로드 페이지 목록에서는 단계적으로 제거되고 PyManager를 통해서만 제공됩니다. NuGet 패키지에는 변경 사항이 없습니다.

PyManager는 `python.org`에서 수동으로 다운로드할 수 있는 앱 패키지로 제공되며, 더블 클릭 설치 경험은 일반적으로 원활합니다.

일부 자동화된 배포 시나리오는 최신 MSIX 형식과 작동하지 않으므로, `python.org`에는 간단한 MSI도 제공될 것입니다. 이는 옵션이나 사용자 인터페이스가 없으며, 일반적으로 이러한 시나리오에 필요한 관리자 권한을 요구합니다.

### 프로젝트 소유권 및 개발 (Project ownership and development)
PyManager는 CPython 저장소와 인접한 자체 저장소에서 동일한 조건으로 개발 및 유지 관리됩니다.

## 사양 (Specification)
**참고** : 이 문서의 모든 명령줄 옵션은 한두 개의 하이픈으로 표시됩니다. 구현 시에는 Windows 및 UNIX 규칙 모두를 허용하도록 모든 옵션이 한두 개의 하이픈 또는 슬래시를 지원합니다.

### `exec` 서브커맨드 (Exec subcommand)
`py [-V:<TAG>] [interpreter opts] [script.py|-m module|-c code] [script args]`
`py [-3.*] [interpreter opts] [script.py|-m module|-c code] [script args]`
`python ...`
`python3 ...`
`pymanager exec -V:tag ...`
`pymanager exec -3.* ...`

이 서브커맨드는 런타임을 선택하고 실행하는 데 사용됩니다. `py` 명령의 기본 동작이며, `python` 및 `python3` 명령이 지원하는 유일한 동작입니다.

`-V:tag` 명령은 명령줄에서 특정 런타임을 요청하는 데 사용됩니다. `-3.*` 옵션은 `-V:PythonCore\\3.*`로 해석됩니다. 이 옵션은 `py` 및 `py exec` 변형에만 사용할 수 있습니다.

### `install` 서브커맨드 (Install subcommand)
`py install [-s|--source <URL>] [-f|--force] [-u|--upgrade] tag [...]`
`py install [-s|--source <URL>] [-t|--target <DIR>] tag`
`py install [-s|--source <URL>] [-d|--download <DIR>] tag [...]`
`py install --refresh`

이 서브커맨드는 현재 컴퓨터에 하나 이상의 런타임을 설치합니다. 태그는 `Company\\Tag` 쌍(슬래시가 없으면 `Tag`만 해당)이며, 인덱스 파일을 검색하는 데 사용됩니다.

`--target <DIR>` 옵션이 단일 태그와 함께 전달되면, 해당 런타임은 설치로 등록되지 않고(별칭 또는 바로 가기 생성 없이) 지정된 디렉터리에 압축 해제됩니다.

`--download <DIR>` 옵션이 전달되면 런타임 패키지는 다운로드되지만 설치되지 않습니다.

### `uninstall` 서브커맨드 (Uninstall subcommand)
`py uninstall [-y|--yes] [--purge] [tag ...]`

이 서브커맨드는 현재 컴퓨터에서 하나 이상의 런타임을 제거합니다. `--purge` 옵션이 태그 없이 전달되면 (확인 후) 모든 런타임과 바로 가기 및 캐시된 파일이 제거됩니다.

### `list` 서브커맨드 (List subcommand)
`py list [-f|--format <FMT>] [-1|--one] [--only-managed] [tag ...]`
`py list [-f|--format <FMT>] [-1|--one] [--online] [--source <URL>] [tag ...]`
`py [--list|--list-paths|-0|-0p]`

이 서브커맨드는 지정된 태그 또는 범위와 일치하는 설치를 모두 나열합니다. 태그가 제공되지 않으면 모든 설치를 나열합니다.

### `help` 서브커맨드 (Help subcommand)
`py help <COMMAND>`

이 서브커맨드는 지정된 각 명령에 대한 도움말 텍스트를 표시하거나, 명령이 지정되지 않으면 명령 목록을 표시합니다.

### 환경 변수 (Environment Variables)
Store 앱 설치 시 환경 변수는 자동으로 업데이트될 수 없습니다. 사용자 `PyManager` 데이터 디렉터리 내의 한 디렉터리는 생성된 별칭을 위해 따로 설정됩니다. 사용자는 원하면 이 디렉터리를 `PATH`에 직접 추가할 수 있습니다.

### 시작 메뉴 바로 가기 (Start Menu Shortcuts)
`PyManager` 문서를 사용자의 기본 웹 브라우저에서 실행하는 시작 메뉴 바로 가기가 추가됩니다. 애플리케이션은 시작 메뉴에 추가되지 않습니다.

### 파일 연결 (File Associations)
`PyManager` 설치 시 표준 파일 연결이 생성되며, 스크립트와 패키지 앱을 `PyManager`의 전역 `python.exe` 별칭으로 실행합니다.

### Windowed Executables
앞서 설명한 각 전역 별칭에 대해 `*w.exe`도 존재합니다. 이들은 콘솔 창을 생성하거나 연결하지 않고 실행됩니다.

### 구성 (Configuration)
`PyManager`는 JSON 기반 구성 파일의 계층 구조를 사용하여 구성됩니다. 명령줄 옵션은 항상 구성 파일 옵션을 재정의합니다.

관리자 전용 구성은 관리자가 그룹 정책 또는 레지스트리 업데이트와 같은 기존 도구를 사용하여 제어하는 시스템을 관리할 수 있도록 제공됩니다.

### 인덱스 스키마 (Index Schema)
인덱스 파일은 온라인 또는 로컬에서 사용할 수 있으며, `PyManager`에 Python 런타임을 찾고, 선택하고, 설치하고, 관리하는 데 필요한 모든 정보를 제공합니다.

인덱스는 JSON으로 저장됩니다. 주요 최상위 키는 `versions`이며, 객체 목록을 포함합니다. 각 버전 객체는 자체 스키마 버전을 가집니다.

### Shebang 처리 (Shebang Processing)
`sh`와 유사한 쉘용으로 설계된 스크립트와의 제한된 호환성을 위해 `PyManager`는 스크립트의 shebang 줄을 확인합니다. Python 명령을 지정하는 shebang 줄은 (명령줄에서 재정의되지 않는 한) 스크립트에 적합한 런타임을 선택하는 데 사용됩니다.

## 근거 (Rationale)

### `python.exe` 명령 "변경" ("Changing" the python.exe command)
`PyManager`가 제공하는 전역 `python.exe` 별칭이 "진정한 Python이 아니다"라고 주장할 수 있습니다. 엄밀히 말하면 그렇지만, 이를 사용해야 한다고 주장하는 세 가지 이유가 있습니다.

1.  수많은 사용자가 깨끗한 컴퓨터의 터미널에서 `python`을 입력하여 Store 페이지로 이동한 후 매일 Store를 통해 설치합니다. 설치하는 앱이 `python` 명령을 제공하지 않으면 리디렉션이 유지됩니다.
2.  "진정하지 않은" 별칭의 대안은 "진정한" 별칭이 아닙니다. 아무것도 없는 것입니다.
3.  `python` 별칭의 기본 구현이 `Programs/python.c`보다 복잡하더라도 사용 경험은 동일합니다.

### `py.exe` 대체 (Replacing py.exe)
`py.exe` 런처는 `PyManager`에 의해 복제될 일부 기능, 특히 이미 설치된 런타임을 실행하는 기능을 제공하기 위해 존재합니다.

두 가지 방법으로 이를 달성합니다.
1.  `PyManager`와 함께 동일한 기능과 `PyManager` 특정 기능을 제공하는 자체 `py.exe` 별칭을 설치합니다.
2.  각 설치에 대해 `PEP 514` 메타데이터를 생성하여 기존 `py.exe`가 `PyManager`가 관리하는 설치와 계속 정상적으로 작동하도록 합니다.

### `venv`와의 상호 작용 (Interaction with venv)
표준 라이브러리 `venv` 모듈에 의해 구현된 활성화된 가상 환경은 `PATH` 환경 변수를 수정하여 `venv` 런처가 다른 실행 파일보다 우선하도록 합니다. 결과적으로 `venv`가 활성화되면 `PyManager`는 `python` 이외의 별칭으로만 실행될 수 있습니다.

## 이전 버전과의 호환성 (Backwards Compatibility)
일반적으로, 사소한 버전 간(3.x에서 3.y)의 설치 프로세스에는 호환성 보장이 없으므로, "다른 설치 프로그램을 사용해야 하는 것"은 호환성 파괴로 간주되지 않습니다.

하지만, 새로운 설치 프로세스로 전환할 때 특정 사용자에게 영향을 미칠 여러 변경 사항이 있습니다.

*   **스크립트 다운로드** : 기존 설치 프로그램의 다운로드 파일 이름을 생성하는 스크립트를 작성한 사용자는 해당 스크립트가 작동하지 않는 것을 발견할 것입니다.
*   **스크립트 설치** : 특정 옵션으로 설치 프로그램을 실행하는 스크립트를 작성한 사용자는 스크립트를 변경해야 할 것입니다.
*   **오래된 런타임 설치** : 기존에 설치된 런타임을 가진 사용자는 등록이 손상되지 않았다면 `PyManager` 및 해당 별칭에 의해 선택될 것입니다.
*   **오래된 `py.exe` 런처 설치** : 오래된 `py.exe` 런처를 수동으로 제거하지 않은 사용자는 기존 및 새 Python 설치가 모두 발견되지만, 버전이 일치하는 경우 기존 설치가 새 설치보다 우선합니다.
*   **잘못 구성된 `venv` 활성화** : `python.exe`가 없거나 `PATH`에 없는 손상되거나 잘못 구성된 가상 환경을 활성화한 사용자는 이전과 다른 오류를 받을 수 있습니다.
*   **이전 버전 사용 가능성** : `PyManager`의 첫 릴리스 이전 Python 버전은 `python.org` 인덱스에 다시 채워질 수 있습니다.
*   **관리자 설치** : 모든 사용자를 위한 Python 복사본을 설치하는 것은 더 이상 불가능합니다. `PyManager`는 사용자 자신의 디렉터리에만 설치하기 때문입니다.
*   **빌드 시 설치** : 임베딩 배포판을 사용하는 사용자는 패키지의 URL을 찾는 새로운 방법으로 변경해야 할 수 있습니다.
*   **단일 아키텍처 설치 프로그램** : 현재 제안은 Intel 64비트 `PyManager` 빌드만 제공합니다.
*   **테스트 스위트 및 디버그 심볼** : `PyManager`가 설치하는 "기본" CPython 패키지에는 테스트 스위트 또는 디버그 심볼이 포함되지 않습니다.
*   **전역 `pip` 명령** : 현재 Windows Store 설치와 달리, 전역 `pip` 명령은 포함되지 않습니다.

## 보안 영향 (Security Implications)
이 섹션에서는 설치 관리자 자체의 보안 영향을 기존 설치 관리자와 비교합니다. Python이 컴퓨터에 설치되는 것의 영향과 악의적인 사용자가 설치 관리자를 실행하는 능력은 범위 외입니다.

설치 관리자가 도입하는 일반적인 위험은 상승된 권한으로 설치 시 낮은 권한의 사용자가 나중에 높은 권한의 사용자에게 영향을 미칠 수 있는 변경을 시스템에 가할 수 있다는 것입니다. `PyManager`는 사용자 자신과 동일한 권한 수준으로만 작동하므로 권한 상승 경로를 도입할 수 없습니다.

## 기존 PEP에 미치는 영향 (Impact on Existing PEPs)
이 제안은 `PEP 397`("Python launcher for Windows") 및 `PEP 486`("Make the Python Launcher aware of virtual environments")과 동일한 기능을 동일한 이름의 새 도구의 일부로 정의함으로써 사실상 대체할 것입니다.

이 제안은 `PEP 394`("The "python" Command on Unix-Like Systems")에 영향을 미치지 않으며, 모든 플랫폼의 사용자에게 유사한 지침을 제공할 수 있는 Windows용 접근 방식을 고안하는 데 일관성이 있다고 믿어집니다.

이 제안은 `PEP 514`("Python registration in the Windows registry")에 영향을 미치지 않으며, 실제로 자체 런타임을 등록하기 위한 더 유연한 시스템으로 이를 따를 수 있는 능력을 향상시킵니다.

## 교육 방법 (How to Teach This)

### 기본 사용 (Basic Use)
이 제안의 핵심 목표는 가장 기본적인 경우에 "터미널에 'python'을 입력하십시오"라는 지침으로 충분하도록 하는 것입니다. Microsoft가 추가한 리디렉터 덕분에 이 지침을 따르면 적어도 유용한 일이 일어나고, `PyManager`를 통해 "유용한 일"이 사용자가 최신 버전을 실행하는 것을 의미하도록 보장할 수 있습니다.

다음과 같은 입문 텍스트를 제안합니다.
> Windows에서 Python 설치는 설치 관리자 도구를 사용하여 관리됩니다. 설치된 후에는 `python`을 실행하여 인터프리터를 시작할 수 있으며, 이미 설치된, 온라인에서 사용 가능한, 또는 실행 중인 스크립트에서 참조하는 최적의 버전을 선택합니다. 특정 버전을 선호하는 경우 `py -V:<version>` 뒤에 나머지 명령을 붙여 지정할 수 있습니다. 명령을 실행하지 않고 Python 버전을 설치하려면 `py install <version>`을 사용하십시오. `py list`로 모든 설치를 확인하고 `py uninstall <version>`으로 제거할 수 있습니다. 사용 가능한 모든 옵션을 보려면 `py help`를 실행하십시오. 각 Python 버전은 모든 프로젝트에서 공유되므로 가상 환경을 사용하는 것이 좋습니다. 이는 일반적으로 `py -V:<version> -m venv .venv`를 실행하여 특정 Python 버전에 대해 생성되고, `.venv\Scripts\Activate`로 활성화됩니다. 이제 설치 관리자 대신 `python` 또는 `py`는 항상 가상 환경을 실행하며, 설치하는 모든 패키지는 이 환경이 활성화되어 있는 동안에만 사용할 수 있습니다. 관리자에 다시 액세스하려면 환경을 `deactivate`하거나 `py <command>`를 사용할 수 있습니다.

### 제거 (Uninstallation)
`PyManager` 제거 시 모든 설치의 일부가 자동으로 정리될 수 없기 때문에 대부분을 제거하지 않기로 선택합니다. 따라서 기본 `python` 및 `py` 명령은 사라지지만, 설치된 모든 런타임은 여전히 존재하며 사용할 수 있습니다.

다음과 같은 설명을 제안합니다.
> Python 설치 관리자를 제거하기 전에 추가한 런타임을 제거해야 합니다. `py uninstall --purge` 옵션을 사용하여 쉽게 수행할 수 있습니다. 이렇게 하면 모든 설치와 남아 있을 수 있는 바로 가기가 제거됩니다. 관리자를 이미 제거했다면 다시 설치하고 위 제거 명령을 다시 실행하여 정리할 수 있습니다. `--purge` 대신 태그를 지정하여 개별 런타임을 제거할 수 있습니다. 태그는 `python list`를 확인하여 찾을 수 있습니다.

### 구성 (Configuration)
구성 파일은 문서화될 일반적인 기능이지만, 일반 사용자에게 가르칠 필요는 없습니다.

### 사용자 정의 인덱스 (Custom Index)
인덱스는 특수 런타임 또는 배포판을 설치하도록 사용자에게 지시할 때만 소개하면 된다고 제안합니다.

대체 인덱스를 사용하고 사용하는 시기를 설명하기 위해 다음과 같은 텍스트를 제안합니다.
> 당사의 배포판은 Python Install Manager (링크 포함)를 사용하여 인덱스를 참조하여 Windows에 설치할 수 있습니다: `py install --source <your index URL here> latest` 이 인덱스에는 모든 버전이 포함되어 있습니다. `py list --source <URL>`을 사용하여 사용 가능한 모든 것을 확인하십시오.

## 참조 구현 (Reference Implementation)
참조 구현은 저자의 저장소에서 미리 컴파일된 MSIX 패키지와 함께 릴리스에서 사용할 수 있습니다. 이 샘플에는 호스팅된 인덱스 대신 번들된 인덱스가 포함되어 있으며, 설치 테스트를 위해 다양한 기존 NuGet 패키지를 참조합니다.

## 거부된 아이디어 (Rejected Ideas)

### PyManager를 모든 플랫폼에서 사용 가능하게 만들기 (Make PyManager available on all platforms)
내재적으로 이 아이디어에 반대하지는 않지만, 이것이 가능해지려면 훨씬 더 많은 구성 요소가 정렬되어야 합니다.

### 관리자에 런타임을 사전 설치하여 포함 (Include a runtime pre-installed with the manager)
런타임 릴리스는 관리자와 완전히 독립적이어야 안정성과 업데이트에 매우 중요합니다.

### 관리자 대신 런타임을 포함 (Include a runtime INSTEAD OF the manager)
이것은 우리가 바꾸려고 하는 현재 상황입니다.

### 서브커맨드 대신 내장 모듈 사용 (Use a built-in module rather than subcommands)
`py list` 또는 `py install`과 같은 명령 대신 `py -m list` 및 `py -m install`과 같이 호출되는 전용 모듈을 사용하거나 `py -m manage list`와 같이 호출되는 단일 전용 모듈을 사용하는 대안이 제안되었습니다. 이 아이디어는 이러한 시맨틱스로 안정적으로 구현할 수 없는 시나리오에 기존 시맨틱스를 재사용하려고 시도하며, 설명하고 이해하고 유지 관리하기 더 어려운 특별한 경우를 필요로 한다는 이유로 거부되었습니다.

### 서브커맨드 대신 새 명령줄 옵션 사용 (Use a new command-line option rather than subcommands)
서브커맨드의 합리적인 대안은 `py /install ...` 또는 `py --list`와 같이 옵션처럼 선행 구두점으로 이름을 지정하는 것입니다. 그러나 Windows의 일반적인 선행 슬래시 형식은 CPython에서 오류가 아닙니다.

### 현재 기존 설치 프로그램 개선 (Improving the current traditional installer instead)
현재 설치 프로그램은 완전히 구식 기술에 기반하고 있습니다. Windows는 더 이상 Windows Installer 서비스를 개발하지 않으며, Wix는 우리가 사용하는 도구 세트 버전을 더 이상 개선하지 않습니다.

### Store 패키지를 완전히 삭제 (Delete the Store package completely)
Store 패키지를 제거하면 사용자가 Python 런타임을 선택할 때 직면하는 옵션 수가 줄어듭니다. 하지만 Store 패키지 사용자의 대다수는 불만이 없는 것으로 보이며, 설치의 용이성과 안정성을 특히 높이 평가합니다.

### WinGet 또는 동등한 도구에 의존 (Rely on WinGet or equivalents)
WinGet, Chocolatey 및 기타 유사한 도구는 우리가 요구하는 의미에서 설치 프로그램이 아닙니다. 자체 메타데이터 저장소를 사용하여 설치 프로그램을 다운로드, 유효성 검사 및 실행합니다.

### 모든 버전을 Windows Store 패키지로 만들기 (Make every version a Windows Store package)
각 버전을 현재와 같이 Windows Store에 릴리스할 수 있지만, 목록에서 제외하고 설치 관리자(잠재적으로 PyManager, WinGet 또는 Store 패키지를 설치할 수 있는 다른 도구)에 의존합니다.

### 일반 ZIP 파일만 게시 (Just publish the plain ZIP file)
일반 ZIP 파일 게시도 계획의 일부이지만, 눈에 띄게 목록에 표시되지 않을 것입니다. (예: `python.org` 다운로드 페이지에는 표시되지 않지만 FTP 뷰에서는 볼 수 있습니다.)

### PyManager를 한 곳에만 게시 (Only publish PyManager to one place)
Windows Store 또는 `python.org` 중 한 곳에만 게시하는 것이 가능합니다. 그러나 사용자는 `python.org`에서 무언가를 다운로드할 수 있기를 강력히 기대합니다.

### 인라인 스크립트 메타데이터 (Inline Script Metadata)
`PEP 723`은 인라인 스크립트 메타데이터를 도입했습니다. `PyManager`는 종속성 설치에 대한 통합 지원이 없으며 추가할 계획도 없습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.