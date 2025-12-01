---
title: "[Withdrawn] PEP 426 - Metadata for Python Software Packages 2.0"
excerpt: "Python Enhancement Proposal 426: 'Metadata for Python Software Packages 2.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/426/
toc: true
toc_sticky: true
date: 2025-09-26 21:40:33+0900
last_modified_at: 2025-09-26 21:40:33+0900
published: true
---
> **원문 링크:** [PEP 426 - Metadata for Python Software Packages 2.0](https://peps.python.org/pep-0426/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 30-Aug-2012


## PEP 426 – Python 소프트웨어 패키지 메타데이터 2.0 (Metadata for Python Software Packages 2.0)

**참고** : 이 PEP는 **철회된(Withdrawn) 문서** 이며, 현재는 **역사적 문서(Historical Document)** 입니다. 제안된 메타데이터 재설계는 PEP 566으로 대체되었습니다.

### 초록 (Abstract)

이 PEP는 Python 배포판(distributions)과 관련된 메타데이터를 게시하고 교환하는 메커니즘을 설명합니다. 필드 이름과 그 의미, 사용법에 대한 구체적인 내용을 포함합니다. 이 문서는 공식적으로 릴리스된 적 없는 메타데이터 형식 버전 2.0을 명세합니다. 기존 버전 1.0은 PEP 241, 버전 1.1은 PEP 314, 버전 1.2는 PEP 345에 명세되어 있습니다.

버전 2.0은 기존의 커스텀 Key:Value 파일 형식을 직접 정의하는 대신, JSON 호환 가능한 인메모리(in-memory) 표현을 정의하여 다른 컨텍스트(예: API 및 아카이브 형식 정의)에서 메타데이터 표현을 정의하는 데 사용될 수 있도록 제안했습니다. 이 버전은 또한 정식 확장 메커니즘을 정의하여, 핵심 메타데이터 형식을 업데이트할 필요 없이 특정 목적을 위한 새로운 필드를 추가할 수 있도록 했습니다.

### PEP 역사에 대한 참고 사항 (Note on PEP History)

이 PEP는 처음에 2013년 12월부터 2017년 3월까지 오랜 기간 보류되었습니다. 이 기간 동안 `distutils-sig`는 PEP 425(바이너리 호환성 태그 형식), PEP 427(바이너리 아카이브 형식 'wheel'), PEP 440(버전 관리 및 버전 비교), PEP 503(PyPI "simple" API), PEP 508(의존성 지정자 및 Extras 시스템), PEP 518(정적 빌드 시스템 의존성 `pyproject.toml`) 등 여러 중요한 변경 사항을 진행했습니다.

이러한 변경 사항을 추구하면서 어떤 메타데이터 형식 변경이 진정으로 바람직한지에 대한 추가적인 관점을 얻었으며, 단지 "변화를 위한 변화"로 간주될 수 있는 요소들은 수정된 명세에서 제외할 수 있게 되었습니다. 또한, 소프트웨어 게시 및 배포의 핵심 활동에 필수적이지 않은 여러 기능들은 PEP 459(릴리스에 대한 추가적인 선택적 정보를 제공하는 표준 메타데이터 확장에 대한 별도의 제안)로 옮겨졌습니다.

2017년 9월, 이 PEP는 다시 보류되었습니다. 당시에는 특별히 시급한 문제를 해결하는 데 도움이 되지 않는다는 이유였습니다. JSON 표현은 기존 메타데이터 1.2 필드의 변환을 통해 더 잘 처리될 수 있었고, 지난 몇 년간 정의된 추가 필드 및 사양 관리 프로세스 변경에 대한 명확화는 사소한 사양 버전 업데이트에서 더 잘 다루어질 수 있다고 판단되었습니다.

결론적으로, 이 PEP는 2018년 2월에 PEP 566(보다 점진적인 전략을 추구하는)을 지지하며 철회되었습니다. 이 PEP에서 제안된 대대적인 메타데이터 재설계는 실현 가능한 마이그레이션 계획이 없는 단일 대규모 변경 제안보다는, 보다 점진적인 방식으로 나중 제안의 일부로 고려될 수 있습니다.

### 목적 (Purpose)

이 PEP의 목적은 Python 생태계에서 소프트웨어 게시 도구(publication tools)와 소프트웨어 통합 도구(integration tools) 간의 통신을 위한 공통 메타데이터 교환 형식을 정의하는 것입니다.

주요 목표 중 하나는 분석을 수행하는 주체가 임의의 Python 코드를 실행할 필요 없이 생태계에서 완전한 의존성 분석(dependency analysis)을 지원하는 것입니다. 또 다른 목표는 기본적으로 좋은 소프트웨어 배포 관행을 장려하는 동시에, Python Package Index (PyPI)의 거의 모든 기존 사용자(게시자와 통합자 모두)의 현재 관행을 계속 지원하는 것입니다. 마지막으로, 최종 사용자에게 투명한 방식으로 현재 사용 중인 메타데이터 형식으로부터 업그레이드 경로를 지원하는 것을 목표로 합니다.

이 디자인은 `distutils` 기반 소프트웨어 배포에 대한 Python 커뮤니티의 거의 20년 경험을 바탕으로 하며, Python의 `setuptools`, `pip` 및 기타 프로젝트, Ruby의 `gems`, Perl의 CPAN, Node.js의 `npm`, PHP의 `composer` 및 RPM, APT와 같은 Linux 패키징 시스템을 포함한 다른 배포 시스템의 아이디어와 개념을 통합합니다.

### Python 소프트웨어 개발, 배포 및 배포 (Development, Distribution and Deployment of Python Software)

이 PEP의 메타데이터 디자인은 소프트웨어 개발 및 배포 프로세스의 특정 개념 모델을 기반으로 합니다. 이 모델은 다음 단계로 구성됩니다.

*   **소프트웨어 개발 (Software development)** : 기능 추가 및 버그 수정을 위해 특정 애플리케이션의 소스 체크아웃(source checkout)을 다루는 단계입니다. 개발자는 소프트웨어를 빌드하고, 자동화된 테스트 스위트를 실행하며, 프로젝트별 유틸리티 스크립트를 실행하고, 소프트웨어를 게시할 수 있어야 합니다.
*   **소프트웨어 게시 (Software publication)** : 개발된 소프트웨어를 소프트웨어 통합자가 사용할 수 있도록 만드는 단계입니다. 이 PEP에 정의된 설명 메타데이터를 생성하고, 소프트웨어를 사용할 수 있도록 만드는 것(일반적으로 인덱스 서버에 업로드)을 포함합니다.
*   **소프트웨어 통합 (Software integration)** : 게시된 소프트웨어 구성 요소를 가져와 일관된 통합 시스템으로 결합하는 단계입니다. Python 특정 크로스 플랫폼 도구를 직접 사용하거나, 개발 언어 중립적인 플랫폼 특정 패키징 시스템으로 변환하여 처리할 수 있습니다.
*   **소프트웨어 배포 (Software deployment)** : 통합된 소프트웨어 구성 요소를 가져와 소프트웨어가 실제로 실행될 대상 시스템에 배포하는 단계입니다.

게시 및 통합 단계는 통칭하여 **배포 단계(distribution phase)** 라고 하며, 이 단계에서 개별적으로 배포되는 소프트웨어 구성 요소는 공식적으로 "배포 패키지(distribution packages)"라고 불리지만, 흔히 "패키지(packages)"라고 알려져 있습니다(하위 모듈을 가진 Python 모듈 종류의 패키지와는 문맥에 따라 구분됩니다).

### 지원 정의 (Supporting definitions)

이 문서에서 사용되는 주요 용어들은 다음과 같이 정의됩니다.

*   **프로젝트 (Projects)** : 통합을 위해 제공되는 소프트웨어 구성 요소. Python 라이브러리, 프레임워크, 스크립트, 플러그인, 애플리케이션, 데이터 또는 기타 리소스 모음 등을 포함합니다.
*   **릴리스 (Releases)** : 프로젝트의 고유하게 식별되는 스냅샷.
*   **배포 패키지 (Distribution packages)** : 릴리스를 게시하고 배포하는 데 사용되는 패키지된 파일.
*   **sdist** : 바이너리 아카이브 생성을 위한 배포 메타데이터와 필수 소스 파일을 제공하는 게시 형식.
*   **바이너리 아카이브 (Binary archives)** : 사전 빌드된 파일을 대상 시스템의 올바른 위치로 이동하기만 하면 되는 아카이브.
*   **빌드 도구 (Build tools)** : 개발 시스템에서 실행되어 소스 및 바이너리 배포 아카이브를 생성하는 자동화된 도구.
*   **인덱스 서버 (Index servers)** : 버전 및 의존성 메타데이터를 게시하고 허용된 메타데이터에 제약을 가하는 활성 배포 레지스트리 (예: PyPI).
*   **통합 도구 (Integration tools)** : 인덱스 서버나 기타 지정된 소스에서 게시된 메타데이터와 배포 아카이브를 사용(예: 설치 또는 플랫폼 특정 패키징 형식으로 변환)하는 자동화된 도구.
*   **레거시 메타데이터 (Legacy metadata)** : 이 메타데이터 사양의 이전 버전 및 `setuptools` 프로젝트에 의해 정의된 지원 메타데이터 파일 형식.

### 메타데이터 형식 (Metadata format)

이 PEP에 정의된 형식은 Python 배포 메타데이터를 문자열 키(string-keyed) 딕셔너리로 표현한 인메모리(in-memory) 형식입니다. 개별 항목의 허용되는 값은 문자열, 문자열 목록, 그리고 추가적인 중첩된 문자열 키 딕셔너리입니다.

별도로 언급되지 않는 한, 배포 메타데이터의 딕셔너리 키는 속성 기반 메타데이터 접근 API를 지원하기 위해 유효한 Python 식별자여야 합니다. 개별 필드 설명은 JSON 매핑의 일부로 직렬화될 때의 키 이름과 값의 예시를 보여줍니다.

*   **메타데이터 파일 (Metadata files)** : 이 PEP에 정의된 정보는 `pysdist.json` 파일로 직렬화됩니다. 이 파일은 UTF-8로 인코딩된 JSON 메타데이터를 포함합니다.
    *   `{distribution}-{version}.dist-info/pysdist.json` 파일은 `sdist` 소스 배포 아카이브, `wheel` 바이너리 배포 아카이브, 로컬 Python 설치 데이터베이스에 존재합니다.
*   **메타데이터 유효성 검사 (Metadata validation)** : 배포 메타데이터에 대한 `jsonschema` 설명이 제공됩니다. URL 필드는 RFC 3986을 준수해야 합니다.

### 핵심 메타데이터 (Core metadata)

이 섹션은 모든 Python 배포판에 필요한 핵심 메타데이터 필드를 지정합니다. 게시 도구(publication tools)는 배포판 게시 시 이러한 필드가 존재하도록 보장해야 하며, 인덱스 서버(index servers)는 업로드 시 이 필드가 메타데이터에 존재하도록 보장해야 합니다. 설치 도구(installation tools)는 기본적으로 이러한 필드 중 하나 이상이 누락된 배포판 설치를 거부해야 하지만, 사용자가 강제로 설치하도록 허용할 수 있습니다.

*   **`Metadata-Version`** : 파일 형식의 버전입니다. "2.0"이 유일하게 유효한 값입니다.
    *   예시: `"metadata_version": "2.0"`
*   **`Generator`** : 파일을 생성한 프로그램의 이름 (및 선택적 버전)입니다. 수동으로 생성된 파일은 이 필드를 생략할 수 있습니다.
    *   예시: `"generator": "setuptools (34.3.1)"`
*   **`Name`** : PEP 508에 정의된 배포판의 이름입니다. ASCII 문자, 숫자, 밑줄(`_`), 하이픈(`-`), 마침표(`.`)만 허용됩니다. 이름은 ASCII 문자나 숫자로 시작하고 끝나야 합니다.
    *   예시: `"name": "ComfyChair"`
*   **`Version`** : PEP 440에 정의된 배포판의 공개 또는 로컬 버전 식별자입니다. 버전 식별자는 자동화된 도구에 의해 사용되도록 설계되었으며, PEP 440의 형식을 준수해야 합니다.
    *   예시: `"version": "1.0a2"`
*   **`Summary`** : 배포판이 수행하는 작업을 요약한 짧은 설명입니다. 512자 미만이어야 하며, 2048자를 초과할 수 없습니다. 줄바꿈을 포함해서는 안 됩니다.
    *   예시: `"summary": "A module that is more fiendish than soft cushions."`

### 소스 코드 메타데이터 (Source code metadata)

이 섹션은 이 배포판을 생성하는 데 사용된 소스 코드에 대한 식별 정보를 제공하는 필드를 지정합니다. 이 필드는 모두 선택 사항입니다.

*   **`Source labels`** : 최소한의 정의된 의미를 가진 텍스트 문자열입니다. 통합자가 특정 배포판에 추가적인 로컬 수정 사항을 적용했더라도, 원본 소스 코드를 명확하게 식별할 수 있도록 하기 위한 것입니다. 소문자 ASCII 문자, ASCII 숫자, 밑줄(`_`), 하이픈(`-`), 마침표(`.`), 더하기 기호(`+`)만 허용됩니다.
    *   예시: `"source_label": "v1.8.1.301.ga0df26f"`
*   **`Source URL`** : 이 특정 버전의 배포판 소스를 다운로드할 수 있는 전체 URL을 포함하는 문자열입니다. URL은 각 프로젝트 내에서 고유해야 합니다. 보안 전송 메커니즘(예: `https`)을 지정하고 확인을 위한 예상 해시 값을 URL에 포함하는 것이 권장됩니다.
    *   예시: `"source_url": "https://github.com/pypa/pip/archive/1.3.1.zip#sha256=2dc6b5a470a1bde68946f263f1af1515a2574a150a30d6ce02c6ff742fcc0db8"`

### 의미론적 의존성 (Semantic dependencies)

의존성 메타데이터는 게시된 프로젝트가 다른 게시된 프로젝트가 제공하는 기능을 사용할 수 있도록 합니다. 의미론적 의존성(Semantic dependencies)은 게시자가 어떤 다른 프로젝트가 필요한지 뿐만 아니라, **왜** 필요한지도 나타낼 수 있도록 합니다. 이 추가 정보는 통합자가 특정 활동에 필요한 의존성만 설치하도록 허용하여, 제약된 환경에서 설치 공간(installation footprints)을 최소화하기 쉽게 만듭니다.

기본적으로 의존성 선언은 "런타임 의존성(runtime dependencies)"으로 간주됩니다.
또한, 릴리스가 선언할 수 있는 네 가지 종류의 선택적 의존성(`Optional dependency`, `Extras`라고도 함)이 있습니다.

*   **`test` dependencies** : 이 릴리스의 자동화된 테스트 스위트를 실행하는 데 필요하지만, 단순히 사용하기 위해서는 필요하지 않은 다른 릴리스 (예: `nose2` 또는 `pytest`).
*   **`build` dependencies** : 소스로부터 이 릴리스의 배포 가능한 바이너리 버전을 빌드하는 데 필요한 다른 릴리스 (예: `flit` 또는 `setuptools`).
*   **`doc` dependencies** : 이 배포판에 대한 문서를 빌드하는 데 필요한 다른 릴리스 (예: `sphinx` 빌드 도구).
*   **`dev` dependencies** : 이 배포판 작업을 할 때 필요하지만, 다른 선택적 의존성 범주 중 정확히 하나에 속하지 않는 다른 릴리스 (예: `pylint`, `flake8`). `dev` 의존성은 `test`, `build`, `doc` 의존성을 결합한 것으로 간주됩니다.

`Extras`는 `PEP 508`에 정의되어 있으며, 프로젝트 릴리스의 선택적 측면을 활성화하는 추가 의존성을 의미합니다.

*   **`extras`** : 의존성 필드에서 조건부 의존성을 정의하는 데 사용될 수 있는 선택적 의존성 집합 목록입니다. 이름은 배포 이름과 동일한 제한을 따릅니다.
    *   예시: `"extras": ["warmup", "tea"]`
*   **`dependencies`** : 이 릴리스를 실제로 실행하는 데 필요한 릴리스 요구 사항 목록입니다. 의존성 지정자(dependency specifiers)는 `requires` (요구 사항 목록), `extra` (선택적 의존성 집합 이름), `environment` (`PEP 508`에 정의된 환경 마커)의 하위 필드를 가진 매핑입니다.
    *   예시:
        ```json
        "dependencies": [
            { "requires": ["SciPy", "PasteDeploy", "zope.interface > 3.5.0"] },
            { "requires": ["pywin32 > 1.0"], "environment": "sys_platform == 'win32'" },
            { "requires": ["SoftCushions"], "extra": "warmup" }
        ]
        ```

### 메타데이터 확장 (Metadata Extensions)

메타데이터에 대한 확장(Extensions)은 `extensions` 키 아래의 매핑으로 존재할 수 있습니다. 키는 유효한 접두사 이름(prefixed names)이어야 하며, 값은 중첩된 매핑이어야 합니다.
메타데이터 확장을 통해 개발 도구는 배포의 후반 단계에서 유용할 수 있지만, 의존성 해결이나 소프트웨어 빌드에는 필수적이지 않은 정보를 메타데이터에 기록할 수 있습니다.

*   **`Extension versioning`** : 확장은 `extension_version` 키를 사용하여 버전 관리되어야 합니다. 이 키가 생략되면, 암시적 버전은 "1.0"입니다.
*   **`Required extension handling`** : 프로젝트는 일부 확장의 올바른 처리가 소프트웨어의 올바른 설치에 필수적이라고 간주할 수 있습니다. 이는 `installer_must_handle` 필드를 `true`로 설정하여 나타냅니다.
    *   예시: (PEP 459의 `python.details` 및 `python.commands` 표준 확장 예시)
        ```json
        "extensions" : {
            "python.details": {
                "license": "GPL version 3, excluding DRM provisions",
                "keywords": [ "comfy", "chair", "cushions", "too silly", "monty python" ],
                "classifiers": [ "Development Status :: 4 - Beta" ],
                "document_names": { "description": "README.rst" }
            },
            "python.commands": {
                "wrap_console": [{"chair": "chair:run_cli"}]
            }
        }
        ```

### 부록 (Appendices)

*   **부록 A: 레거시 메타데이터 변환 참고 사항 (Conversion notes for legacy metadata)** : 레거시 메타데이터를 메타데이터 2.0으로 변환하는 참조 구현으로 `wheel`, `Warehouse`, `distlib` 프로젝트를 언급합니다.
*   **부록 B: 의존성 선언을 RPM SPEC 파일에 매핑하기 (Mapping dependency declarations to an RPM SPEC file)** : 이 PEP의 내용을 Linux 배포판 패키지(예: RPM `SPEC` 파일)에 매핑하는 예시를 제공합니다.
*   **부록 C: PEP 345와의 차이점 요약 (Summary of differences from PEP 345)** : `Metadata-Version`의 2.0으로의 변경, JSON 호환 형식으로의 전환, PEP 440 기반의 버전 체계 변경, `source label` 지원, `PEP 508`에 정의된 의존성 선언/Extras/환경 마커 지원, 메타데이터 확장 메커니즘 등을 요약합니다.
*   **부록 D: 보류된 기능 (Deferred features)** : 표준 확장, 프로젝트 노후화/이름 변경/합병 처리 개선, MIME 타입 등록, 환경 마커의 문자열 메서드 등 향후 추가될 수 있었던 기능들을 설명합니다.
*   **부록 E: 거부된 기능 (Rejected features)** : 조건부 및 무조건부 의존성 분리 목록, 의미론적 의존성 분리 목록, 지나치게 정확한 의존성 선언에 대한 마찰 도입, 배포 이름에 밑줄 사용 불허, 배포 이름에 유니코드 사용 허용, 소스 레이블에 의존, 대체 의존성, 환경 마커의 호환 릴리스 비교, 조건부 제공 등 너무 많은 복잡성을 도입하거나 이점이 적다고 판단되어 거부된 기능들을 설명합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.