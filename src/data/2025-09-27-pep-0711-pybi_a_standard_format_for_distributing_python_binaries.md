---
title: "[Draft] PEP 711 - PyBI: a standard format for distributing Python Binaries"
excerpt: "Python Enhancement Proposal 711: 'PyBI: a standard format for distributing Python Binaries'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/711/
toc: true
toc_sticky: true
date: 2025-09-27 13:12:07+0900
last_modified_at: 2025-09-27 13:12:07+0900
published: true
---
> **원문 링크:** [PEP 711 - PyBI: a standard format for distributing Python Binaries](https://peps.python.org/pep-0711/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 06-Apr-2023


### 초록 (Abstract)

이 PEP는 Python 패키지를 위한 `wheel` 형식과 유사하게, 미리 빌드된 (pre-built) Python 인터프리터를 배포하기 위한 표준 형식인 `PyBI`를 제안합니다. `PyBI`는 "미리 빌드된 Python 패키지 대신, 미리 빌드된 Python 인터프리터"라고 요약될 수 있습니다.

### 동기 (Motivation)

최종 목표는 PyPI.org가 모든 인기 있는 플랫폼의 모든 Python 버전별로 미리 빌드된 패키지를 제공하여, 자동화된 도구가 이를 쉽게 가져와 설정할 수 있도록 하는 것입니다. 이를 통해 Python 사전 릴리스를 쉽고 빠르게 사용해보고, CI에서 Python 버전을 고정하며, 특정 Python 포인트 릴리스에서만 발생하는 버그 보고서를 재현하기 위한 임시 환경을 만드는 등의 작업이 용이해집니다.

이 PEP의 첫 번째 단계는 기존 Python 패키징 표준을 최대한 재사용하여, 미리 빌드된 Python 인터프리터를 담는 표준 패키징 파일 형식을 정의하는 것입니다.

### 예시 (Examples)

예시 `pybi` 빌드는 `pybi.vorpus.org`에서 확인할 수 있습니다. 이 파일들은 ZIP 파일이므로, 압축을 풀어 내부 구조를 살펴볼 수 있습니다.

### 명세 (Specification)

#### 파일명 (Filename)

`PyBI` 파일명은 `{distribution}-{version}[-{build tag}]-{platform tag}.pybi` 형식을 따릅니다. 이는 PEP 427에서 정의된 `wheel` 파일 형식과 일치하며, `{python tag}`와 `{abi tag}`를 생략하고 확장자를 `.whl`에서 `.pybi`로 변경한 것입니다.

**예시:**
*   `cpython-3.9.3-manylinux_2014.pybi`
*   `cpython-3.10b2-win_amd64.pybi`

`wheel`과 마찬가지로, `pybi`가 여러 플랫폼을 지원하는 경우 점(.)으로 구분하여 "압축된 태그 세트(compressed tag set)"를 만들 수 있습니다.

**예시:**
*   `cpython-3.9.5-macosx_11_0_x86_64.macosx_11_0_arm64.pybi`
    (실제로는 `cpython-3.9.5-macosx_11_0_universal2.pybi`와 같이 작성하는 것이 일반적입니다.)

#### 파일 내용 (File contents)

`.pybi` 파일은 ZIP 파일이며, 임의의 위치에 직접 압축을 해제한 후 자체 포함된 (self-contained) Python 환경으로 사용할 수 있습니다. `pybi`는 하드코딩된 절대 경로를 포함할 수 없으며, 특히 미리 설치된 스크립트의 shebang 라인에 절대 경로를 포함해서는 안 됩니다.

`wheel`의 `<package>-<version>.dist-info` 디렉토리와 유사하게, `pybi` 아카이브는 최상위 `pybi-info/` 디렉토리를 포함해야 합니다. 이 디렉토리에는 최소한 다음 파일들이 포함됩니다:

*   `.../PYBI`: 아카이브 자체에 대한 메타데이터 (RFC822-ish 형식).
    *   `Pybi-Version: 1.0`
    *   `Generator: {name} {version}`
    *   `Tag: {platform tag}`
    *   `Build: 1` (선택 사항)
*   `.../RECORD`: `wheel`과 동일하지만, 심볼릭 링크에 대한 특별한 처리 방식이 있습니다.
*   `.../METADATA`: 현재 코어 메타데이터 명세와 동일한 형식으로, `Requires-Dist`, `Provides-Extra`, `Requires-Python` 키는 `pybi`에 의미가 없으므로 금지됩니다. 또한, 아래에 설명된 몇 가지 새로운 필수 키가 있습니다.

#### PyBI 고유의 코어 메타데이터 (Pybi-specific core metadata)

`METADATA` 파일에 포함되는 새로운 `PyBI` 고유 필드는 다음과 같습니다.

*   **`Pybi-Environment-Marker-Variables`**: 이 `PyBI`의 설치 전반에 걸쳐 정적인 PEP 508 환경 마커 변수의 값을 JSON 딕셔너리로 나타냅니다.
    *   예시: `{"implementation_name": "cpython", "python_version": "3.10", ...}`
    *   `platform_version` 및 `platform_release`는 일반적으로 포함되지 않습니다.
    *   `platform_machine`은 macOS `universal2` `pybi`를 제외하고는 일반적으로 포함됩니다.
    *   이는 설치자가 Python을 호출하지 않고도 대상 플랫폼의 `PyBI` 파일을 통해 패키지 핀(pin)을 계산할 수 있도록 합니다.

*   **`Pybi-Paths`**: `wheel`을 설치하는 데 필요한 설치 경로(`sysconfig.get_paths()`와 동일한 키)를 ZIP 파일 루트에서 시작하는 상대 경로로 JSON 딕셔너리에 저장합니다.
    *   이 경로들은 반드시 Unix 형식으로, 슬래시(`/`)를 구분자로 사용해야 합니다.
    *   `{paths["scripts"]}/python`을 실행하여 Python 인터프리터를 호출할 수 있어야 합니다.
    *   이 필드와 `Pybi-Wheel-Tag`는 설치자가 Python을 직접 호출하지 않고도 `wheel`을 선택하고 `PyBI` 환경에 설치할 수 있도록 합니다.

*   **`Pybi-Wheel-Tag`**: 이 인터프리터가 지원하는 `wheel` 태그 목록을 선호도 순서(가장 선호되는 것부터)로 나열합니다. 최종 설치 시스템에 의존하는 플랫폼 태그는 특수 플랫폼 태그 `PLATFORM`으로 대체됩니다.
    *   설치자는 `PyBI`의 `Pybi-Wheel-Tag` 템플릿과 로컬 플랫폼 태그를 조합하여 적절한 `wheel` 태그 세트를 결정할 수 있습니다.
    *   이 값들은 `PyBI` 메타데이터에 포함되어 있어, 복잡한 툴링에 유용하게 사용될 수 있습니다.

#### 심볼릭 링크 (Symlinks)

Unix 기반 Python 설치에서는 기본적으로 심볼릭 링크가 사용됩니다 (예: `bin/python3 -> bin/python3.9`). 또한 macOS 프레임워크 빌드를 `.pybi` 파일에 저장하려면 심볼릭 링크가 필수적입니다. 따라서 `wheel` 파일과 달리 `PyBI` 파일에서 심볼릭 링크를 지원해야 합니다.

**ZIP 파일에서 심볼릭 링크 표현:**
*   심볼릭 링크의 대상 경로가 파일 내용처럼 저장됩니다.
*   Unix 권한 필드의 상위 4비트가 `0xa`로 설정됩니다 (`permissions & 0xf000 == 0xa000`).
*   이 권한 필드는 "외부 속성(external attributes)" 필드의 상위 16비트에 저장됩니다.

**RECORD 파일에서 심볼릭 링크 표현:**
*   일반 파일은 `my/favorite/file,sha256=...,12345` 형식으로 기록됩니다.
*   심볼릭 링크의 경우 `name/of/symlink,symlink=path/to/symlink/target,` 형식으로 기록됩니다.
    *   `symlink`라는 특수 "해시 함수"를 사용하고, 실제 심볼릭 링크 대상을 "해시 값"으로 저장하며, 길이는 비워둡니다.

**PyBI 파일에 심볼릭 링크 저장:**
*   `PyBI` 생성자는 위에서 정의된 두 가지 메커니즘을 모두 사용하여 심볼릭 링크를 저장해야 합니다. (Info-Zip 표현을 사용하여 ZIP 아카이브에 직접 저장하고, `RECORD` 파일에도 기록).
*   `PyBI` 소비자는 아카이브와 `RECORD` 파일의 심볼릭 링크가 서로 일치하는지 검증해야 합니다.

**제한 사항 (Limitations):**
*   Windows 또는 심볼릭 링크를 기본적으로 지원하지 않는 플랫폼을 대상으로 하는 `.pybi`에서는 심볼릭 링크를 사용해서는 안 됩니다.
*   `pybi-info` 디렉토리 내에서는 심볼릭 링크를 사용해서는 안 됩니다.
*   심볼릭 링크의 대상은 상대 경로여야 하며 `pybi` 디렉토리 내에 있어야 합니다.
*   아카이브에 `A/B/...`가 심볼릭 링크로 기록된 경우, `A/B/.../C`와 같은 다른 항목은 없어야 합니다.
*   언패커(Unpacker)는 이러한 규칙이 준수되는지 검증해야 합니다. 그렇지 않으면 공격자가 악성 심볼릭 링크를 만들어 시스템에 피해를 줄 수 있습니다.

### 비규범적 설명 (Non-normative comments)

#### Conda 대신 PyBI를 사용하는 이유 (Why not just use conda?)

`conda`는 바이너리 Python 인터프리터를 배포하는 인기 있는 방법이지만, 모든 Python 사용자가 `conda` 사용자는 아니며, 이 PEP는 그들에게 또 다른 옵션을 제공합니다. PyPI와 `wheel`은 종속성을 표준적이고 추상적인 방식으로 설명하도록 설계되어 있으며, `conda`와 같은 다운스트림 시스템에서 이를 소비하고 로컬 규칙으로 변환할 수 있습니다. `conda`는 PyPI에서 직접 Python 환경을 구축하도록 설계되지 않았기 때문에, `conda`와 `pip`는 서로 다른 경우에 필요하며, 이 제안은 `pip` 측면을 대상으로 합니다.

#### Sdists (또는 아님) (Sdists (or not))

`pybi`에 대한 "sdist"와 유사한 형식(미리 빌드된 `pybi`를 사용할 수 없는 플랫폼에서 자동으로 가져와 빌드할 수 있는 구조화된 Python 소스 릴리스 형식)은 유용할 수 있지만, MVP(최소 기능 제품)에는 필수가 아니므로 나중에 고려할 문제입니다.

#### PyBI 내에 번들링할 패키지 (What packages should be bundled inside a pybi?)

`PyBI` 빌더는 `PyBI` 내에 포함될 항목을 선택할 수 있습니다. 예를 들어, `site-packages` 디렉토리에 일부 미리 설치된 패키지를 포함하거나 `stdlib`의 일부를 제거할 수 있습니다.
프로토타입 "범용(general purpose)" `pybi`에서는 다음과 같은 선택을 했습니다.

*   **`site-packages`를 비워둡니다.**
    *   이는 "스마트" 툴링에 의해 설치되도록 설계되었기 때문에, 깨끗한 상태에서 시작하여 필요한 것을 추가하는 것이 미리 설치된 패키지가 있는 상태에서 시작하는 것보다 쉽기 때문입니다.
    *   (물론 `python -m ensurepip`를 실행할 수도 있습니다.)

*   **`test`를 제외한 전체 `stdlib`를 포함합니다.**
    *   `test` 모듈은 CPython 자체의 테스트 스위트를 포함하며 매우 크고 일반적으로 사용자 코드에서 사용되지 않습니다.
    *   공식 `nuget` 패키지, `manylinux` 이미지, 여러 Linux 배포판에서도 이를 제외하며 큰 문제가 없었습니다.

*   **`.pyc` 파일을 포함하지 않습니다.**
    *   다운로드 시 공간을 차지하고, 최종 시스템에서 최소한의 비용으로 생성될 수 있으며, `.pyc` 파일을 제외하면 위치 의존성(location-dependence)의 원인이 제거됩니다.
    *   (`.pyc` 파일은 해당 `.py` 파일의 절대 경로를 저장하고 트레이스백에 포함하지만, `pybi`는 재배치 가능하므로 설치 후까지 올바른 경로를 알 수 없습니다.)

### 하위 호환성 (Backwards Compatibility)

하위 호환성과 관련된 고려 사항은 없습니다.

### 보안 영향 (Security Implications)

바이너리를 배포하는 사람이 보안 관리 계획(예: OpenSSL CVE 발생 후 새 빌드를 롤링할지 여부)을 세워야 한다는 점을 제외하고는 특별한 보안 영향은 없습니다. Python 코어 개발자들은 이미 모든 주요 플랫폼(macOS, Windows, Linux)용 바이너리 빌드를 유지 관리하고 있으므로, PyPI에 공식 CPython 빌드를 릴리스하더라도 새로운 보안 문제가 발생하지는 않습니다.

### 교육 방법 (How to Teach This)

이 PEP는 최종 사용자를 대상으로 하지 않습니다. 최종 사용자의 경험은 `pyenv` 또는 `tox` 호출이 마법처럼 더 빠르고 안정적으로 작동하는 것일 뿐입니다 (만약 해당 프로젝트의 관리자가 이 PEP를 활용하기로 결정한다면).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.