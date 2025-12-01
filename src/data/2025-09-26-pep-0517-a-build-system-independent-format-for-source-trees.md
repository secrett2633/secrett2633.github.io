---
title: "[Final] PEP 517 - A build-system independent format for source trees"
excerpt: "Python Enhancement Proposal 517: 'A build-system independent format for source trees'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/517/
toc: true
toc_sticky: true
date: 2025-09-26 23:11:54+0900
last_modified_at: 2025-09-26 23:11:54+0900
published: true
---
> **원문 링크:** [PEP 517 - A build-system independent format for source trees](https://peps.python.org/pep-0517/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Sep-2015

## PEP 517 – 소스 트리를 위한 빌드 시스템 독립적인 형식

본 문서는 PEP 517의 내용을 한국어 Python 개발자들을 위해 번역하고 정리한 것입니다. 이 PEP는 Python 패키징 생태계에서 빌드 시스템의 유연성과 확장성을 크게 개선하는 중요한 제안입니다.

### 개요 (Abstract)

기존 `distutils` 및 `setuptools`는 Python 패키지 빌드에 오랜 기간 사용되었지만, 다음과 같은 세 가지 심각한 문제를 안고 있었습니다.
1.  **기능 부족:** 빌드 시 의존성 선언, 자동 구성, 버전 관리의 DRY(Don't Repeat Yourself) 원칙 준수 등 중요한 기능이 누락되어 있었습니다.
2.  **확장성 난이도:** `distutils`/`setuptools`를 확장하기 어려워, 위 문제들을 해결하기 위한 다양한 시도가 있었지만, 종종 기이하고 취약하며 유지보수 비용이 많이 들었습니다.
3.  **대체 시스템 사용의 어려움:** `distutils`/`setuptools`가 `pip`과 같은 설치 도구 및 사용자 모두에게 표준 패키지 설치 인터페이스를 제공했기 때문에, 다른 빌드 시스템을 사용하기가 매우 어려웠습니다.

이 PEP는 특히 세 번째 문제(c)를 해결하는 데 중점을 둡니다. 목표는 `distutils-sig`가 Python 빌드 시스템의 문지기(gatekeeper) 역할을 하지 않도록 하는 것입니다. 즉, 개발자가 `distutils` 외에 다른 빌드 시스템(예: `flit`, `bento`)을 표준화된 방법으로 쉽게 사용할 수 있도록 최소한의 인터페이스를 제안합니다. 이는 `wheel` 포맷이 많은 어려운 문제(예: 빌드 시스템이 모든 가능한 설치 구성을 알 필요 없음)를 해결했기 때문에 가능해졌으며, 빌드 시스템에 요구되는 것은 표준을 준수하는 `wheel` 및 `sdist`를 생성하는 기능으로 단순화되었습니다.

### 용어 및 목표 (Terminology and Goals)

*   **Source Tree (소스 트리):** VCS(버전 관리 시스템) 체크아웃과 같은 상태를 의미합니다. `pip install some-directory/`와 같이 이 형식에서 설치하기 위한 표준 인터페이스가 필요합니다.
*   **Source Distribution (소스 배포판, sdist):** `lxml-3.4.4.tar.gz`와 같이 특정 소스 코드 릴리스를 나타내는 정적인 스냅샷입니다. 릴리스의 기록 보존, 다양한 언어로 작성된 대규모 코드 코퍼스를 처리하는 도구의 입력, Debian/Fedora/Conda와 같은 다운스트림 패키징 시스템의 입력 등 다양한 목적으로 사용됩니다. Python 생태계에서는 `pip`과 같은 패키징 도구가 `sdist`를 사용하여 이진 의존성을 충족시키는 데 중요한 역할을 합니다. `sdist`는 `sdists`로도 불립니다.
*   **Build Frontend (빌드 프런트엔드):** 사용자가 임의의 소스 트리 또는 소스 배포판을 가져와 `wheel`을 빌드하는 도구입니다. 실제 빌드는 각 소스 트리의 **Build Backend (빌드 백엔드)** 에 의해 수행됩니다. 예를 들어, `pip wheel some-directory/` 명령에서 `pip`은 빌드 프런트엔드 역할을 합니다.
*   **Integration Frontend (통합 프런트엔드):** 사용자가 패키지 요구사항 세트(예: `requirements.txt` 파일)를 가져와 작업 환경을 해당 요구사항에 맞게 업데이트하는 도구입니다. 이는 `wheel` 및 `sdist`의 조합을 찾아, 빌드하고, 설치하는 것을 포함할 수 있습니다. 예를 들어, `pip install lxml==2.4.0` 명령에서 `pip`은 통합 프런트엔드 역할을 합니다.

이 PEP의 주요 목표는 Python 빌드 시스템에 대한 `distutils-sig`의 의존성을 줄이고, 표준화된 방법을 통해 다양한 빌드 시스템을 쉽게 사용할 수 있도록 하는 것입니다.

### 소스 트리 (Source Trees)

기존에는 `setup.py` 파일을 사용하는 레거시 소스 트리 형식이 존재했습니다. 이 PEP는 PEP 518에서 정의된 `pyproject.toml` 파일을 기반으로 하는 새로운 소스 트리 형식을 정의하며, `[build-system]` 테이블에 `build-backend`라는 추가 키를 확장합니다.

**`pyproject.toml` 예시:**

```toml
[build-system]
# PEP 518에 의해 정의됨:
requires = ["flit_core >=3.2,<4"] # 예시, 원문에는 flit
# 이 PEP에 의해 정의됨:
build-backend = "flit_core.buildapi" # 예시, 원문에는 flit.api:main
```

*   `build-backend`는 빌드를 수행하는 데 사용될 Python 객체의 이름을 지정하는 문자열입니다. `setuptools` 엔트리 포인트와 동일한 `module:object` 구문 형식을 따릅니다.
*   `pyproject.toml` 파일이 없거나 `build-backend` 키가 누락된 경우, 해당 소스 트리는 이 사양을 사용하지 않으며, 도구는 `setup.py`를 실행하는 레거시 동작으로 되돌아가야 합니다 (직접 실행하거나 `setuptools.build_meta:__legacy__` 백엔드를 암시적으로 호출).
*   `build-backend` 키가 존재하면, 이 키가 우선하며 소스 트리는 지정된 백엔드의 형식 및 규칙을 따릅니다. 따라서 백엔드가 요구하지 않는 한 `setup.py`는 필요하지 않습니다.
*   `backend-path` 키는 백엔드 코드가 소스 트리에 직접 포함될 때 사용될 수 있습니다.

### 빌드 요구사항 (Build Requirements)

이 PEP는 `pyproject.toml` 파일의 "빌드 요구사항" 섹션에 몇 가지 추가 요구사항을 부과합니다.
*   프로젝트 빌드 요구사항은 의존성의 방향성 그래프를 정의하며, 이 그래프는 **순환(cycle)을 포함해서는 안 됩니다.**
*   프런트엔드는 순환이 발견되면 빌드를 거부할 수 있습니다.
*   빌드 요구사항이 `wheel`로 제공되는 경우, 프런트엔드는 가능하면 `wheel`을 사용해야 합니다.
*   백엔드가 자체 호스팅(self-hosting)하려는 경우(즉, 백엔드용 `wheel`을 빌드하는 데 해당 백엔드를 사용하는 경우) 순환을 피하기 위해 특별한 조치를 취해야 합니다. 일반적으로 이는 자신을 인트리(in-tree) 백엔드로 지정하고 외부 빌드 의존성을 피하는 것을 포함합니다.

### 빌드 백엔드 인터페이스 (Build Backend Interface)

빌드 백엔드 객체는 다음 중 일부 또는 전부를 제공하는 속성(훅)을 가져야 합니다. 모든 훅에 전달되는 `config_settings` 인자는 개별 훅 설명 뒤에 설명됩니다.

#### 필수 훅 (Mandatory Hooks)

*   **`build_wheel(wheel_directory, config_settings=None, metadata_directory=None)`**
    *   `.whl` 파일을 빌드하여 지정된 `wheel_directory`에 배치해야 합니다.
    *   생성된 `.whl` 파일의 베이스 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.
    *   `metadata_directory`가 제공되면, `build_wheel`은 이전에 `prepare_metadata_for_build_wheel`이 생성한 메타데이터와 동일한 메타데이터를 가진 `wheel`을 생성해야 합니다.
    *   백엔드는 소스 디렉토리를 읽기 전용으로 처리할 준비가 되어 있어야 합니다.

*   **`build_sdist(sdist_directory, config_settings=None)`**
    *   `.tar.gz` 소스 배포판을 빌드하여 지정된 `sdist_directory`에 배치해야 합니다.
    *   생성된 `.tar.gz` 파일의 베이스 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.
    *   `.tar.gz` `sdist`는 `{name}-{version}` 형식의 단일 최상위 디렉토리(예: `foo-1.0`)를 포함해야 하며, 빌드 디렉토리의 `pyproject.toml`과 PEP 345에 설명된 형식의 메타데이터를 포함하는 `PKG-INFO` 파일을 포함해야 합니다.
    *   생성된 tarball은 UTF-8 기반 파일 이름을 지정하는 최신 POSIX.1-2001 pax tar 형식을 사용해야 합니다.
    *   `UnsupportedOperation` 예외를 통해 `sdist` 생성에 필요한 의존성이 없거나 다른 이유로 `sdist`를 생성할 수 없는 경우를 알릴 수 있습니다.

#### 선택적 훅 (Optional Hooks)

*   **`get_requires_for_build_wheel(config_settings=None)`**
    *   `pyproject.toml` 파일에 지정된 것 외에, `build_wheel` 또는 `prepare_metadata_for_build_wheel` 훅을 호출할 때 설치해야 할 `PEP 508` 의존성 사양 목록을 반환해야 합니다.
    *   정의되지 않은 경우 기본 구현은 `return []`와 동일합니다.

*   **`prepare_metadata_for_build_wheel(metadata_directory, config_settings=None)`**
    *   지정된 `metadata_directory` 내에 `wheel` 메타데이터를 포함하는 `.dist-info` 디렉토리를 생성해야 합니다. 이 디렉토리는 `wheel` 사양에 정의된 유효한 `.dist-info` 디렉토리여야 하지만, `RECORD` 또는 서명을 포함할 필요는 없습니다.
    *   생성된 `.dist-info` 디렉토리의 베이스 이름(전체 경로 아님)을 유니코드 문자열로 반환해야 합니다.
    *   이 메서드가 정의되지 않은 경우, 빌드 프런트엔드는 `build_wheel`을 호출하여 결과 메타데이터를 직접 확인해야 합니다.

*   **`get_requires_for_build_sdist(config_settings=None)`**
    *   `pyproject.toml` 파일에 지정된 것 외에, `build_sdist` 훅을 호출할 때 설치해야 할 `PEP 508` 의존성 사양 목록을 반환해야 합니다.
    *   정의되지 않은 경우 기본 구현은 `return []`와 동일합니다.

**편집 가능한 설치 (Editable Installs):** 원래 이 PEP는 `install_editable` 훅을 지정했지만, 복잡성 때문에 제거되었으며 나중에 다른 PEP에서 지정될 수 있습니다.

#### 설정 (Config settings)

*   `config_settings` 인자는 모든 훅에 전달되는 임의의 딕셔너리로, 사용자가 개별 패키지 빌드에 임시(ad-hoc) 구성을 전달하기 위한 "비상구(escape hatch)" 역할을 합니다.
*   빌드 백엔드는 이 딕셔너리에 원하는 의미론을 할당할 수 있습니다.
*   빌드 프런트엔드는 사용자가 임의의 문자열 키/값 쌍을 이 딕셔너리에 지정할 수 있는 메커니즘을 제공해야 합니다.

#### 빌드 환경 (Build Environment)

빌드 프런트엔드의 책임 중 하나는 빌드 백엔드가 실행될 Python 환경을 설정하는 것입니다.
*   가상 환경(Virtual Environment) 메커니즘(`virtualenv`, `venv` 등)에 대한 특정 요구사항은 없지만, 사용되는 메커니즘은 다음 기준을 충족해야 합니다:
    *   프로젝트의 빌드 요구사항에 지정된 모든 요구사항은 Python에서 import 가능해야 합니다.
    *   빌드에 필요한 패키지의 명령줄 스크립트가 빌드 환경의 `PATH`에 존재해야 합니다.
    *   빌드 백엔드는 `stdlib`에 존재하는 패키지 또는 명시적으로 빌드 요구사항으로 선언된 패키지 외에 다른 패키지에 액세스할 수 있다고 가정해서는 안 됩니다.
*   프런트엔드는 각 훅을 새 서브프로세스에서 호출해야 합니다.

### 빌드 프런트엔드에 대한 권장 사항 (비규범적) (Recommendations for build frontends (non-normative))

*   빌드 프런트엔드는 기본적으로 표준 라이브러리와 명시적으로 요청된 빌드 의존성만 포함하는 격리된 환경을 각 빌드를 위해 생성해야 합니다.
    *   이는 상충하는 빌드 요구사항을 가진 여러 패키지를 단일 설치 실행에서 빌드할 수 있도록 합니다.
    *   패키지 저자가 정확한 빌드 의존성을 선언하도록 유도하는 역할을 합니다.
*   사용자가 필요할 때 기본값을 재정의할 수 있는 메커니즘을 제공해야 합니다. 예를 들어, `--build-with-system-site-packages` 또는 `--build-requirements-override=my-requirements.txt`와 같은 옵션을 제공할 수 있습니다.

### 인트리 빌드 백엔드 (In-tree Build Backends)

*   특정 상황에서 프로젝트는 빌드 백엔드 소스 코드를 `requires` 키를 통해 참조하는 대신 소스 트리에 직접 포함하고 싶을 수 있습니다.
*   이는 백엔드 자체를 빌드하는 "자체 호스팅 백엔드(self-hosting backends)"나 표준 백엔드에 대한 사용자 정의 래퍼로 구성된 "프로젝트별 백엔드(project-specific backends)"에서 예상됩니다.
*   `pyproject.toml`에 `backend-path` 키를 포함하여 백엔드 코드가 인트리(in-tree)로 호스팅됨을 지정할 수 있습니다.
*   `backend-path`의 내용은 프로젝트 루트를 기준으로 하며 소스 트리 내의 위치를 참조해야 합니다. 또한 백엔드 코드는 `backend-path`에 지정된 디렉토리 중 하나에서 로드되어야 합니다.

### 소스 배포판 (Source Distributions)

레거시 `sdist` 형식을 계속 사용하되, 새로운 제약 사항을 추가합니다.
*   새로운 `sdist`는 `.tar.gz` 확장자를 가진 gzipped tar 아카이브여야 합니다. 현재 zip 아카이브나 다른 압축 형식은 허용되지 않습니다.
*   tar 아카이브는 파일 이름에 UTF-8을 사용하는 최신 POSIX.1-2001 pax tar 형식으로 생성되어야 합니다.
*   `sdist`에 포함된 소스 트리는 `pyproject.toml` 파일을 포함해야 합니다.

### 변경 사항 요약 (Summary of changes to PEP 517)

`pip 19.0`에서 초기 참조 구현이 릴리스된 후 이 PEP에 다음과 같은 변경 사항이 적용되었습니다.

*   빌드 요구사항의 **순환이 명시적으로 금지** 되었습니다.
*   `[build-system]` 테이블에 `backend-path` 키를 도입하여 **인트리 백엔드 및 백엔드의 자체 호스팅 지원** 이 추가되었습니다.
*   `build-backend`를 명시적으로 지정하지 않는 소스 트리의 경우 `setuptools.build_meta:__legacy__` PEP 517 백엔드가 `setup.py`를 직접 호출하는 것에 대한 허용 가능한 대안임을 명확히 했습니다.

### 부록 A: PEP 516과의 비교 (Appendix A: Comparison to PEP 516)

PEP 516은 빌드 시스템 인터페이스를 지정하는 경쟁 제안이었으나, 이 PEP 517이 채택되면서 거부되었습니다. 주요 차이점은 PEP 517의 빌드 백엔드가 명령줄 기반 인터페이스가 아닌 **Python 훅(hook) 기반 인터페이스** 를 통해 정의된다는 것입니다.

Python 훅 접근 방식은 다음과 같은 세 가지 주요 이점을 제공합니다.

1.  **전체 생태계의 총 코드량 감소 및 새로운 빌드 시스템 진입 장벽 낮춤:** 빌드 프런트엔드는 소수에 불과하지만, 사용자 정의 빌드 백엔드는 많을 수 있으므로, Python 훅 방식은 전체 시스템의 코드량을 줄이고 새로운 빌드 시스템 개발을 더 쉽게 만듭니다.
2.  **명세의 불필요한 복잡성 제거:** Python은 인터페이스를 설명하는 데 더 간단하면서도 풍부한 구조를 제공하여, 명세 자체의 복잡성을 줄입니다. 이는 특히 명령줄 인터페이스에서 발생할 수 있는 입력 충돌이나 선택적 인자 처리와 같은 문제를 명확하게 해결합니다.
3.  **향후 사양 진화에 대한 강력한 옵션 제공:** Python 훅 방식은 향후 사양 변경 시 더 큰 유연성을 제공합니다. 예를 들어, 새로운 훅이 추가될 때 프런트엔드가 자동으로 지원 여부를 감지하고 적절하게 폴백(fallback)할 수 있도록 합니다. 이는 `pyproject.toml` 파일을 업데이트할 필요 없이 생태계 전반에 걸쳐 점진적인 변화를 가능하게 합니다. 예를 들어, `prepare_metadata_for_build_wheel` 명령을 선택적으로 만들 수 있었던 것도 이러한 유연성 덕분입니다.

**기타 차이점:**

*   메타데이터 명령이 선택 사항입니다.
*   메타데이터를 단일 `METADATA` 파일이 아닌 디렉토리로 반환합니다. 이는 `wheel` 메타데이터가 여러 파일(예: 엔트리 포인트)에 걸쳐 분산되는 실제 방식과 더 잘 일치하며, 향후 확장 가능성을 높입니다.
*   메타데이터 단계와 `wheel` 빌드 단계 간에 정보를 전달하는 메커니즘을 제공합니다.
*   빌드 환경에 대한 더 자세한 권장 사항을 제공합니다(비규범적).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.