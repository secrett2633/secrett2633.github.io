---
title: "[Final] PEP 427 - The Wheel Binary Package Format 1.0"
excerpt: "Python Enhancement Proposal 427: 'The Wheel Binary Package Format 1.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/427/
toc: true
toc_sticky: true
date: 2025-09-26 21:41:28+0900
last_modified_at: 2025-09-26 21:41:28+0900
published: true
---
> **원문 링크:** [PEP 427 - The Wheel Binary Package Format 1.0](https://peps.python.org/pep-0427/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Sep-2012

PEP 427: Wheel 이진 패키지 형식 1.0

## 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 "wheel"이라는 이름의 Python 빌드-패키지(built-package) 형식에 대해 설명합니다. Wheel은 특별한 파일 이름 형식을 가지며 `.whl` 확장자를 사용하는 ZIP 형식의 아카이브입니다. 이 아카이브는 PEP 376에 따라 특정 설치 스키마(installation scheme)를 사용하여 설치될 때와 거의 동일한 단일 배포본(single distribution)을 포함합니다. 특별한 설치 프로그램이 권장되지만, wheel 파일은 표준 `unzip` 도구를 사용하여 `site-packages`에 단순히 압축을 해제하는 것만으로도 설치될 수 있으며, 나중에 그 내용을 최종 경로에 분산시키는 데 충분한 정보를 유지합니다.

## PEP 수락 (PEP Acceptance)
이 PEP는 Alyssa Coghlan에 의해 2013년 2월 16일 승인되었고, 정의된 wheel 버전은 1.0으로 업데이트되었습니다.

## 도입 배경 (Rationale)
Python은 `sdist`보다 설치하기 쉬운 패키지 형식이 필요했습니다. Python의 `sdist` 패키지는 `distutils`와 `setuptools` 빌드 시스템에 의해 정의되며, 새로운 가상 환경(virtualenv)에 설치하기 위해 임의의 코드를 빌드하고 설치하며, 재컴파일해야 했습니다. 빌드와 설치가 혼합된 이 시스템은 느리고 유지보수가 어려우며, 빌드 시스템과 설치 프로그램 모두의 혁신을 저해했습니다.

Wheel은 빌드 시스템과 설치 프로그램 사이에 더 간단한 인터페이스를 제공함으로써 이러한 문제를 해결하고자 합니다. Wheel 이진 패키지 형식은 설치 프로그램이 빌드 시스템에 대해 알 필요가 없게 하며, 여러 설치에 걸쳐 컴파일 시간을 분산시켜 시간을 절약하고, 대상 환경에 빌드 시스템을 설치할 필요성을 없앱니다.

## 세부 사항 (Details)

### Wheel 설치
'distribution-1.0-py32-none-any.whl'과 같은 wheel 파일의 설치는 개념적으로 두 단계로 구성됩니다.

1.  **압축 해제 (Unpack)** :
    *   `distribution-1.0.dist-info/WHEEL` 파일을 파싱합니다.
    *   설치 프로그램이 `Wheel-Version`과 호환되는지 확인합니다. 마이너 버전이 높으면 경고하고, 메이저 버전이 높으면 중단합니다.
    *   `Root-Is-Purelib == 'true'`이면 아카이브를 `purelib` (site-packages)에 압축 해제합니다. 그렇지 않으면 `platlib` (site-packages)에 압축 해제합니다.

2.  **분산 (Spread)** :
    *   압축 해제된 아카이브에는 `distribution-1.0.dist-info/` 및 (데이터가 있는 경우) `distribution-1.0.data/`가 포함됩니다.
    *   `distribution-1.0.data/`의 각 서브트리를 해당 대상 경로로 이동합니다. `distribution-1.0.data/`의 각 하위 디렉토리는 `distribution-1.0.data/(purelib|platlib|headers|scripts|data)`와 같은 대상 디렉토리 딕셔너리의 키입니다. 초기 지원 경로는 `distutils.command.install`에서 가져옵니다.
    *   해당하는 경우, `#!python`으로 시작하는 스크립트를 올바른 인터프리터를 가리키도록 업데이트합니다.
    *   `distribution-1.0.dist-info/RECORD`에 설치된 경로를 업데이트합니다.
    *   빈 `distribution-1.0.data` 디렉토리를 제거합니다.
    *   설치된 `.py` 파일을 `.pyc`로 컴파일합니다. (제거 프로그램은 `RECORD`에 언급되지 않아도 `.pyc`를 제거할 수 있을 만큼 충분히 지능적이어야 합니다.)

### 권장 설치 프로그램 기능 (Recommended installer features)
*   **`#!python` 재작성** : Wheel에서 스크립트는 `{distribution}-{version}.data/scripts/`에 패키징됩니다. `scripts/` 내 파일의 첫 줄이 정확히 `b'#!python'`으로 시작하면, 올바른 인터프리터를 가리키도록 재작성됩니다. Unix 설치 프로그램은 아카이브가 Windows에서 생성된 경우 이 파일들에 `+x` 비트를 추가해야 할 수도 있습니다. `b'#!pythonw'` 규칙도 허용됩니다. `b'#!pythonw'`는 콘솔 스크립트 대신 GUI 스크립트를 나타냅니다.
*   **스크립트 래퍼 생성** : Wheel에서 Unix 시스템에 패키징된 스크립트에는 `.exe` 래퍼가 동반되지 않습니다. Windows 설치 프로그램은 설치 중에 이를 추가할 수 있습니다.

### 권장 아카이버 기능 (Recommended archiver features)
*   **.dist-info를 아카이브의 끝에 배치** : 아카이버는 `.dist-info` 파일을 아카이브의 물리적 끝에 배치하는 것이 권장됩니다. 이는 전체 아카이브를 다시 작성하지 않고도 메타데이터를 수정할 수 있는 몇 가지 흥미로운 ZIP 트릭을 가능하게 합니다.

### 파일 형식 (File Format)

#### 파일명 규칙 (File name convention)
Wheel 파일명은 `{distribution}-{version}(-{build tag})?-{python tag}-{abi tag}-{platform tag}.whl` 형식입니다.

*   **distribution** : 배포본 이름 (예: 'django', 'pyramid').
*   **version** : 배포본 버전 (예: 1.0).
*   **build tag** : 선택적 빌드 번호. 숫자로 시작해야 합니다. 다른 모든 면에서 (이름, 버전 및 기타 태그) 두 wheel 파일 이름이 동일할 경우 동점 방지 역할을 합니다. 지정되지 않은 경우 빈 튜플로 정렬되고, 그렇지 않으면 첫 번째 항목은 `int`형 초기 숫자, 두 번째 항목은 `str`형 나머지 태그인 두 항목 튜플로 정렬됩니다.
*   **python tag (language implementation and version tag)** : 언어 구현 및 버전 태그 (예: 'py27', 'py2', 'py3').
*   **abi tag** : ABI 태그 (예: 'cp33m', 'abi3', 'none').
*   **platform tag** : 플랫폼 태그 (예: 'linux_x86_64', 'any').

예를 들어, `distribution-1.0-1-py27-none-any.whl`은 'distribution'이라는 패키지의 첫 번째 빌드이며, Python 2.7 (모든 Python 2.7 구현), ABI 없음 (순수 Python), 모든 CPU 아키텍처와 호환됩니다.

확장자를 제외한 파일명의 마지막 세 구성 요소는 "호환성 태그(compatibility tags)"라고 불립니다. 호환성 태그는 패키지의 기본 인터프리터 요구 사항을 나타내며 PEP 425에 자세히 설명되어 있습니다.

#### 이스케이프 및 유니코드 (Escaping and Unicode)
파일명의 각 구성 요소는 영숫자가 아닌 문자열을 밑줄 `_`로 대체하여 이스케이프됩니다.

```python
re.sub("[^\w\d.]+", "_", distribution, re.UNICODE)
```
아카이브 파일명은 유니코드입니다. 도구가 비ASCII 파일명 지원을 위해 업데이트되는 데 시간이 걸리겠지만, 이 명세에서는 지원됩니다. 아카이브 내부의 파일명은 UTF-8로 인코딩됩니다. 일반적으로 사용되는 일부 ZIP 클라이언트가 UTF-8 파일명을 제대로 표시하지 못하더라도, 인코딩은 ZIP 명세와 Python의 `zipfile` 모두에서 지원됩니다.

#### 파일 내용 (File contents)
wheel 파일의 내용은 다음과 같습니다. 여기서 `{distribution}`은 패키지 이름(예: `beaglevote`), `{version}`은 해당 버전(예: `1.0.0`)으로 대체됩니다.

*   `/`: 아카이브의 루트이며, `WHEEL`에 지정된 대로 `purelib` 또는 `platlib`에 설치될 모든 파일을 포함합니다. `purelib`와 `platlib`는 일반적으로 모두 `site-packages`입니다.
*   `{distribution}-{version}.dist-info/`: 메타데이터를 포함합니다.
*   `{distribution}-{version}.data/`: 아직 다루지 않은 비어있지 않은 각 설치 스키마 키에 대해 하나의 하위 디렉토리를 포함하며, 하위 디렉토리 이름은 설치 경로 딕셔너리(예: `data`, `scripts`, `headers`, `purelib`, `platlib`)의 인덱스입니다. Python 스크립트는 `scripts`에 나타나야 하며, 설치 시 스크립트 래퍼 생성 및 `#!python` 재작성을 활용하려면 정확히 `b'#!python'`으로 시작해야 합니다. 확장자가 있거나 없을 수 있습니다.
*   `{distribution}-{version}.dist-info/METADATA`: 메타데이터 버전 1.1 이상 형식의 메타데이터입니다.
*   `{distribution}-{version}.dist-info/WHEEL`: 아카이브 자체에 대한 메타데이터입니다.
    ```
    Wheel-Version: 1.0
    Generator: bdist_wheel 1.0
    Root-Is-Purelib: true
    Tag: py2-none-any
    Tag: py3-none-any
    Build: 1
    ```
    *   `Wheel-Version`: Wheel 명세의 버전 번호입니다.
    *   `Generator`: 아카이브를 생성한 소프트웨어의 이름과 선택적으로 버전입니다.
    *   `Root-Is-Purelib`: 아카이브의 최상위 디렉토리가 `purelib`에 설치되어야 하면 `true`이고, 그렇지 않으면 `platlib`에 설치되어야 합니다.
    *   `Tag`: wheel의 확장된 호환성 태그입니다. 예제에서는 파일명에 `py2.py3-none-any`가 포함됩니다.
    *   `Build`: 빌드 번호이며, 빌드 번호가 없으면 생략됩니다.
    *   `Wheel-Version`이 지원하는 버전보다 높으면 wheel 설치 프로그램은 경고해야 하고, `Wheel-Version`의 메이저 버전이 지원하는 버전보다 높으면 실패해야 합니다.

Wheel은 여러 Python 버전에서 작동하도록 의도된 설치 형식이므로 일반적으로 `.pyc` 파일을 포함하지 않습니다. Wheel은 `setup.py` 또는 `setup.cfg`를 포함하지 않습니다.

이 wheel 명세 버전은 `distutils` 설치 스키마를 기반으로 하며 다른 위치에 파일을 설치하는 방법을 정의하지 않습니다. 이 레이아웃은 기존 `wininst` 및 `egg` 이진 형식에서 제공하는 기능의 상위 집합을 제공합니다.

#### .dist-info 디렉토리 (The .dist-info directory)
Wheel의 `.dist-info` 디렉토리에는 최소한 `METADATA`, `WHEEL`, `RECORD`가 포함됩니다.
*   `METADATA`: 패키지 메타데이터로, `sdist`의 루트에서 찾을 수 있는 `PKG-INFO`와 동일한 형식입니다.
*   `WHEEL`: 패키지 빌드에 특정한 wheel 메타데이터입니다.
*   `RECORD`: wheel 내 거의 모든 파일과 해당 보안 해시 목록입니다. PEP 376과 달리, 자체 해시를 포함할 수 없는 `RECORD`를 제외한 모든 파일은 해시를 포함해야 합니다. 해시 알고리즘은 `sha256` 이상이어야 합니다. 특히 `md5` 및 `sha1`은 허용되지 않습니다. 서명된 wheel 파일은 아카이브의 무결성을 검증하기 위해 `RECORD`의 강력한 해시에 의존하기 때문입니다.
*   PEP 376의 `INSTALLER`와 `REQUESTED`는 아카이브에 포함되지 않습니다.
*   `RECORD.jws`는 디지털 서명에 사용됩니다. `RECORD`에는 언급되지 않습니다.
*   `RECORD.p7s`는 S/MIME 서명을 사용하여 wheel 파일을 보호하려는 사용자를 위해 허용됩니다. `RECORD`에는 언급되지 않습니다.
*   압축 해제 중에 wheel 설치 프로그램은 `RECORD`의 모든 해시를 파일 내용과 대조하여 확인합니다. `RECORD`와 그 서명을 제외하고, 아카이브의 파일 중 `RECORD`에 언급되지 않거나 올바르게 해시되지 않은 파일이 있으면 설치가 실패합니다.

#### .data 디렉토리 (The .data directory)
일반적으로 `site-packages` 내부에 설치되지 않는 모든 파일은 `.dist-info` 디렉토리와 이름은 같지만 `.data/` 확장자를 가진 `.data` 디렉토리로 이동합니다.

```
distribution-1.0.dist-info/
distribution-1.0.data/
```
`.data` 디렉토리에는 배포본의 스크립트, 헤더, 문서 등을 포함하는 하위 디렉토리가 있습니다. 설치 중에 이 하위 디렉토리의 내용은 대상 경로로 이동됩니다.

### 서명된 Wheel 파일 (Signed wheel files)
Wheel 파일에는 디지털 서명을 가능하게 하는 확장된 `RECORD`가 포함됩니다. PEP 376의 `RECORD`는 두 번째 열에 `md5sum` 대신 `digestname=urlsafe_b64encode_nopad(digest)` (후행 `=` 문자가 없는 urlsafe base64 인코딩) 형태의 보안 해시 다이제스트 이름을 포함하도록 변경됩니다. `.pyc` 파일과 같이 생성된 파일을 포함하여 가능한 모든 항목이 해시되지만, 자체 해시를 포함할 수 없는 `RECORD`는 제외됩니다. 예를 들어:

```
file.py,sha256=AVTFPZpEKzuHr7OvQZmhaU3LvwKz06AJw8mT\_pNh2yI,3144
distribution-1.0.dist-info/RECORD,,
```

서명 파일(`RECORD.jws` 및 `RECORD.p7s`)은 `RECORD`가 생성된 후에만 추가될 수 있으므로 `RECORD`에 전혀 언급되지 않습니다. 아카이브의 다른 모든 파일은 `RECORD`에 올바른 해시를 가지고 있어야 하며, 그렇지 않으면 설치가 실패합니다.

JSON 웹 서명(JSON web signatures)이 사용되는 경우, 하나 이상의 JSON 웹 서명 JSON 직렬화(JWS-JS) 서명이 `RECORD` 옆의 `RECORD.jws` 파일에 저장됩니다. JWS는 `RECORD`의 SHA-256 해시를 서명의 JSON 페이로드로 포함하여 `RECORD`에 서명하는 데 사용됩니다.

```json
{ "hash": "sha256=ADD-r2urObZHcxBW3Cr-vDCu5RJwT4CaRTHiFmbcIYY" }
```

(해시 값은 `RECORD`에서 사용된 것과 동일한 형식입니다.)

`RECORD.p7s`가 사용되는 경우, `RECORD`의 분리된 S/MIME 형식 서명을 포함해야 합니다.

Wheel 설치 프로그램은 디지털 서명을 이해할 필요는 없지만, `RECORD`의 해시를 추출된 파일 내용과 대조하여 *반드시* 검증해야 합니다. 설치 프로그램이 파일 해시를 `RECORD`와 대조하여 확인할 때, 별도의 서명 검사기는 `RECORD`가 서명과 일치하는지 확인하기만 하면 됩니다.

### .egg와의 비교 (Comparison to .egg)
Wheel은 설치 형식이며, egg는 가져오기(importable) 형식입니다.

*   **설치 vs. 가져오기** : Wheel 아카이브는 `.pyc`를 포함할 필요가 없으며 특정 Python 버전이나 구현에 덜 종속됩니다. Wheel은 이전 버전의 Python으로 빌드된 (순수 Python) 패키지를 설치할 수 있으므로 항상 패키저가 따라잡기를 기다릴 필요가 없습니다.
*   **메타데이터 디렉토리** : Wheel은 `.dist-info` 디렉토리를 사용하고, egg는 `.egg-info`를 사용합니다.
*   **새로운 패키징 생태계 호환성** : Wheel은 Python 패키징의 새로운 세계와 그것이 가져오는 새로운 개념들과 호환됩니다.
*   **풍부한 파일명 규칙** : Wheel은 오늘날의 다중 구현 환경을 위한 더 풍부한 파일명 규칙을 가지고 있습니다. 단일 wheel 아카이브는 여러 Python 언어 버전 및 구현, ABI 및 시스템 아키텍처와의 호환성을 나타낼 수 있습니다. 역사적으로 ABI는 CPython 릴리스에 특화되어 있었지만, wheel은 안정적인 ABI를 위해 준비되어 있습니다.
*   **무손실(Lossless)** : Wheel은 무손실입니다. 첫 번째 wheel 구현인 `bdist_wheel`은 항상 `egg-info`를 생성한 다음 이를 `.whl`로 변환합니다. 기존 egg 및 `bdist_wininst` 배포판을 변환하는 것도 가능합니다.
*   **버전 관리** : Wheel은 버전이 관리됩니다. 모든 wheel 파일에는 wheel 명세의 버전과 이를 패키징한 구현이 포함됩니다. 다음 마이그레이션은 단순히 Wheel 2.0으로 진행될 수 있기를 바랍니다.
*   **참조** : Wheel은 다른 Python에 대한 참조입니다.

### FAQ

#### Wheel은 `.data` 디렉토리를 정의합니다. 모든 데이터를 여기에 넣어야 하나요?
이 명세는 코드 구성 방법에 대한 의견을 제시하지 않습니다. `.data` 디렉토리는 일반적으로 `site-packages` 또는 `PYTHONPATH` 내부에 설치되지 않는 모든 파일을 위한 공간일 뿐입니다. 즉, `pkgutil.get_data(package, resource)`를 계속 사용할 수 있습니다. 해당 파일들은 일반적으로 wheel의 `.data` 디렉토리에 배포되지 않더라도 말입니다.

#### Wheel에 서명이 포함되는 이유는 무엇인가요?
첨부된 서명은 아카이브와 함께 이동하므로 분리된 서명보다 편리합니다. 개별 파일만 서명되므로, 서명을 무효화하거나 전체 아카이브를 다운로드할 필요 없이 개별 파일을 확인할 수 있습니다.

#### Wheel에서 JWS 서명을 허용하는 이유는 무엇인가요?
JWS가 포함된 JOSE 명세는 구현하기 쉽도록 설계되었으며, 이는 wheel의 주요 설계 목표 중 하나입니다. JWS는 유용하고 간결한 순수 Python 구현을 제공합니다.

#### Wheel에서 S/MIME 서명도 허용하는 이유는 무엇인가요?
S/MIME 서명은 기존 공개 키 인프라를 wheel과 함께 사용해야 하거나 사용하려는 사용자를 위해 허용됩니다. 서명된 패키지는 보안 패키지 업데이트 시스템의 기본적인 구성 요소일 뿐입니다. Wheel은 단지 그 구성 요소만 제공합니다.

#### "purelib"와 "platlib"의 차이는 무엇인가요?
Wheel은 "purelib"와 "platlib"의 구분을 유지하는데, 이는 일부 플랫폼에서 중요합니다. 예를 들어, Fedora는 순수 Python 패키지를 '/usr/lib/pythonX.Y/site-packages'에 설치하고, 플랫폼 종속 패키지를 '/usr/lib64/pythonX.Y/site-packages'에 설치합니다. "Root-Is-Purelib: false"인 wheel에 모든 파일이 `{name}-{version}.data/purelib`에 있는 것은 "Root-Is-Purelib: true"인 wheel에 해당 파일들이 루트에 있는 것과 동일하며, "purelib"와 "platlib" 범주 모두에 파일이 있는 것은 유효합니다. 실제로는 wheel은 순수 Python인지 여부에 따라 "purelib" 또는 "platlib" 중 하나만 가져야 하며, 해당 파일들은 "Root-is-purelib"에 적절한 설정이 주어져 루트에 있어야 합니다.

#### Wheel 파일에서 Python 코드를 직접 가져오는 것이 가능한가요?
기술적으로는 간단한 압축 해제를 통한 설치 지원과 `zipimport`와 호환되는 아카이브 형식의 조합 덕분에, wheel 파일의 하위 집합은 `sys.path`에 직접 배치될 수 있도록 지원합니다. 그러나 이러한 동작은 형식 설계의 자연스러운 결과이지만, 실제로 이에 의존하는 것은 일반적으로 권장되지 않습니다.

첫째, wheel은 주로 배포 형식으로 설계되었으므로, 설치 단계를 건너뛰는 것은 완전히 설치된 환경을 가정하는 기능(예: `pip` 및 `virtualenv`와 같은 표준 도구를 사용하여 감사 및 보안 업데이트 목적에 맞게 종속성을 캡처하고 관리하거나, C 확장 기능에 대한 표준 빌드 메커니즘과 적절한 위치에 헤더 파일을 게시하여 완전히 통합하는 것)에 대한 의존성을 의도적으로 회피하는 것을 의미합니다.

둘째, 일부 Python 소프트웨어는 zip 아카이브에서 직접 실행을 지원하도록 작성되었지만, 코드가 완전히 설치되었다고 가정하고 작성되는 경우가 여전히 흔합니다. 이 가정이 zip 아카이브에서 소프트웨어를 실행하려고 할 때 깨지면, 실패는 종종 모호하고 진단하기 어려울 수 있습니다 (특히 타사 라이브러리에서 발생하는 경우). 이와 관련된 두 가지 가장 일반적인 문제 원인은 CPython이 zip 아카이브에서 C 확장을 가져오는 것을 지원하지 않는다는 점(어떤 플랫폼에서도 동적 로딩 메커니즘이 직접 지원하지 않기 때문)과, zip 아카이브에서 실행할 때 `__file__` 속성이 더 이상 일반 파일 시스템 경로를 참조하지 않고, 파일 시스템의 zip 아카이브 위치와 아카이브 내부 모듈의 상대 경로를 모두 포함하는 조합 경로를 참조한다는 점입니다. 소프트웨어가 추상 리소스 API를 내부적으로 올바르게 사용하더라도, 외부 구성 요소와 인터페이스하려면 실제 디스크 상의 파일 가용성이 여전히 필요할 수 있습니다.

메타클래스, 몽키 패치, 메타 경로 임포터와 마찬가지로, 이 기능을 활용해야 하는지 확신하지 못한다면 거의 확실히 필요하지 않습니다. 그럼에도 불구하고 사용하기로 결정한다면, 많은 프로젝트에서 진정한 버그로 인정하기 전에 완전히 설치된 패키지로 실패를 재현해야 한다는 점을 인지해야 합니다.

## 부록 (Appendix)
urlsafe-base64-nopad 구현 예시:

```python
# urlsafe-base64-nopad for Python 3
import base64

def urlsafe_b64encode_nopad(data):
    return base64.urlsafe_b64encode(data).rstrip(b'=')

def urlsafe_b64decode_nopad(data):
    pad = b'=' * (4 - (len(data) & 3))
    return base64.urlsafe_b64decode(data + pad)
```

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.