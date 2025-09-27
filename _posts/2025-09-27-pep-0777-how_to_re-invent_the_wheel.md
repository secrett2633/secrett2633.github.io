---
title: "[Draft] PEP 777 - How to Re-invent the Wheel"
excerpt: "Python Enhancement Proposal 777: 'How to Re-invent the Wheel'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/777/
toc: true
toc_sticky: true
date: 2025-09-27 13:56:09+0900
last_modified_at: 2025-09-27 13:56:09+0900
published: true
---
> **원문 링크:** [PEP 777 - How to Re-invent the Wheel](https://peps.python.org/pep-0777/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 09-Oct-2024


## PEP 777 – Wheel 재발명 방법 (How to Re-invent the Wheel) 번역 및 요약

### 개요 (Abstract)

PEP 777은 10년 이상 사용된 현재의 wheel 1.0 사양에 역호환성(backwards-incompatible)이 있는 기능을 추가하는 과정이 명확히 정의되어 있지 않다는 문제점을 해결하고자 합니다. 이 PEP는 향후 wheel 사양의 개정을 위한 호환성 요구사항을 규정함으로써, 다른 PEP들이 새로운 개선 사항을 도입할 수 있도록 길을 닦는 것을 목표로 합니다. 다만, 이 PEP 자체는 새로운 wheel 개정판(예: Wheel 2.0)을 직접 명시하지 않고, 이는 추후의 PEP에 맡깁니다.

### 배경 (Rationale)

현재 wheel 사양의 변경 사항 중 새로운 설치 프로그램 동작을 요구하는 것은 역호환성을 가지며, wheel 메타데이터 형식의 주요 버전(major version)을 증가시켜야 합니다. 이러한 주요 버전 증가는 기존 설치 프로그램이 새로운 버전의 wheel을 거부하여 치명적인 설치 중단으로 이어질 수 있기 때문에 지금까지 이루어지지 않았습니다. 이는 빌드 도구, 패키지 인덱스, 패키지 설치 프로그램 간의 상호 작용을 신중하게 계획하는 것이 중요함을 의미합니다.

이러한 역호환성 문제는 더 나은 압축, wheel 데이터 형식 개선, wheel에 포함된 정보에 대한 더 나은 설명, `.dist-info` 폴더 내 JSON 형식 메타데이터와 같은 wheel 파일 형식의 가치 있는 개선을 막아왔습니다. PEP 777은 새로운 wheel 개정판에 대한 제약 조건과 동작을 기술하여, 새로운 주요 버전의 wheel 형식을 지원하지 않는 기존 도구의 안정성을 보존합니다. 이를 통해 역호환성 변경 사항이 새로운 wheel 사용에 적절히 설정된 사용자 및 도구에만 영향을 미치도록 보장하며, wheel 사양의 발전을 위한 명확한 경로를 제공합니다.

### 제안 내용 (Specification)

PEP 777은 wheel 사양의 발전을 위한 다음과 같은 구체적인 요구사항과 변경 사항을 제안합니다:

#### 1. 코어 메타데이터에 `Wheel-Version` 메타데이터 필드 추가

*   `Wheel-Version` 필드는 Core Metadata Specification에 새로 추가됩니다. 이 필드는 wheel 파일이 준수하는 wheel 사양의 정확한 버전을 포함해야 합니다.
*   이 필드를 통해 Resolver (리졸버)는 wheel을 직접 다운로드하여 `.dist-info/WHEEL` 파일을 검사할 필요 없이, PEP 658 메타데이터 API를 사용하여 wheel 버전을 효율적으로 확인할 수 있습니다.
*   `Wheel-Version`이 메타데이터 파일에 없으면, 도구는 wheel 파일의 주요 버전을 `1`로 추론해야 합니다.
*   소스 배포 메타데이터(PKG-INFO) 파일에는 `Wheel-Version`이 포함되어서는 안 됩니다.
*   Wheel 1.0 버전의 wheel에는 `Wheel-Version`을 포함할 수 있지만, 2.0 이상의 버전에서는 반드시 포함해야 합니다.
*   설치 프로그램(installer)은 wheel을 설치할 때 코어 메타데이터 파일과 wheel 메타데이터 파일의 `Wheel-Version` 값이 일치하는지 확인해야 하며, 일치하지 않으면 설치를 중단해야 합니다.
*   설치 프로그램은 자신의 `Wheel-Version` 호환성을 확인해야 합니다. 마이너 버전이 높으면 경고하고, 메이저 버전이 높으면 설치를 중단해야 합니다.

#### 2. `Wheel-Version`에 대한 Resolver 동작

*   Resolver는 설치할 wheel을 선택할 때 후보 wheel의 `Wheel-Version`을 확인하고 호환되지 않는 wheel 파일은 무시해야 합니다.
*   이는 오래된 설치 프로그램이 지원하지 않는 wheel 버전을 선택하여 설치 실패를 유발하는 것을 방지합니다.
*   Resolver는 호환되지 않는 wheel을 건너뛸 경우 사용자에게 경고를 보내, 새로운 릴리스가 있음을 알리는 것이 좋습니다.

#### 3. 첫 번째 주요 버전 변경 시 파일 확장자 변경 필수

*   기존 Resolver가 호환성 확인 없이 새로운 주요 버전의 wheel을 선택하는 것을 방지하고, Wheel 2.0의 빠른 실험과 채택을 위해, wheel 파일의 확장자를 `.whl`에서 향후 모든 wheel 버전에 대해 `.whlx`로 변경할 것을 제안합니다. 여기서 `x`는 특정 버전을 의미하는 것이 아니라 문자 그대로 'x'입니다.
*   이 확장자 변경은 기존 설치 프로그램 사용자들이 새로운 wheel 파일을 무시하도록 하여, 2.0 wheel의 즉각적인 PyPI 업로드를 가능하게 합니다.

#### 4. 새로운 Wheel 형식에 대한 Build Backend 동작 권고

*   빌드 백엔드(build backend)는 프로젝트가 사용하는 기능에 따라 가장 호환성 높은 wheel을 생성하는 것이 좋습니다.
*   예를 들어, wheel 3.0이 더 나은 압축 기능을 도입한다면, 빌드 백엔드는 wheel 크기 및 다운로드 성능 향상을 위해 이 기능을 기본적으로 활성화할 수 있습니다.

#### 5. 향후 Wheel 개정판에 대한 제한 사항

*   설치된 wheel 파일은 모든 지원되는 CPython 버전의 `Python` 표준 라이브러리 `importlib.metadata`와 호환되어야 합니다.
*   Wheel 파일은 외부 컨테이너 형식으로 ZIP 형식을 유지해야 하며, `.dist-info` 메타데이터 디렉터리는 압축 없이 아카이브의 루트에 배치되어야 합니다.
*   패키징 도구(tooling)는 위에 명시된 메타데이터 폴더 내용 및 외부 컨테이너 형식에 대한 제한 사항 외에는 향후 wheel 주요 버전의 내용과 형식이 동일할 것이라고 가정해서는 안 됩니다.
*   향후 wheel 개정판은 적어도 최신 CPython 릴리스의 표준 라이브러리에 없는 압축 형식을 사용해서는 안 됩니다.

### 역호환성 (Backwards Compatibility)

이 PEP는 새로운 wheel 개정판 채택이 사용자에게 고통스럽지 않도록 여러 선택을 합니다. 예를 들어, Resolver가 설치 프로그램과 호환되지 않는 주요 버전의 wheel을 필터링하도록 요구합니다. 또한, CPython과의 호환성을 유지하면서 wheel 내용의 진화를 허용하는 방향으로 미래 wheel 개정판에 대한 제약 조건을 정의합니다.

이 PEP는 Resolver가 PEP 658 또는 HTTP Range Requests를 통해 패키지 메타데이터를 효율적으로 얻을 수 있음을 전제로 합니다. 주요 호환성 제한 사항은 새로운 wheel만 게시하는 프로젝트의 경우입니다. 오래된 설치 프로그램 사용자는 소스 배포(source distribution)로 대체될 수 있으며, 이는 소스 빌드 환경이 제대로 설정되지 않은 사용자에게 빌드 실패를 유발할 수 있습니다.

### 기각된 아이디어 (Rejected Ideas)

PEP 777 논의 과정에서 다음과 같은 아이디어들이 고려되었으나 기각되었습니다:

*   **Wheel 형식은 완벽하며 변경할 필요가 없다:** Rust 또는 C 확장 모듈 포함 증가, 더 나은 압축(예: `lzma`, `zstd`)의 필요성, 하드웨어 가속 및 공유 라이브러리 호환성 표현의 한계 등으로 인해 wheel 형식의 진화가 필요합니다.
*   **Wheel 형식 변경을 CPython 릴리스에 연동해야 한다:** 새로운 wheel 형식의 채택 속도를 늦추고, 다양한 Python 구현 및 오래된 CPython 버전을 사용하는 사용자에게 불이익을 줄 수 있습니다.
*   **`.whl` 파일 확장자를 계속 사용한다:** 현재 설치 프로그램이 새로운 wheel을 선택하여 실패할 수 있고, 파일명에 저장되는 정보 변경에 제약이 생깁니다.
*   **파일 확장자에 wheel 주요 버전을 저장한다 (예: `.whl2`):** `Wheel-Version` 메타데이터 필드의 필요성을 없앨 수 있지만, 매 주요 버전마다 확장자를 변경해야 하는 관리 부담과 파일명에 너무 많은 메타데이터를 인코딩하는 현재의 취약성을 답습할 수 있습니다.
*   **Wheel 2.0이 외부 컨테이너 형식을 변경해야 한다:** Zstandard `tarfile`과 같은 다른 외부 컨테이너 형식이 더 나은 압축을 제공할 수 있지만, Zstandard가 Python 표준 라이브러리에 없다는 점, 그리고 한 번에 너무 많은 변경을 하는 것이 PEP의 목표(사양 진화 용이화)에 부합하지 않습니다.
*   **이 PEP에서 Wheel 2.0을 명시한다:** 이 PEP의 목표는 wheel 파일 형식에 대한 호환성 전략을 정의하는 것이므로, 새로운 wheel 기능을 정의하는 것은 후속 PEP에 맡겨집니다.

### 논의 주제 (Discussion Topics)

첫 번째 마이그레이션을 위해 인덱스가 듀얼 퍼블리싱(dual-publishing)을 지원해야 하는지에 대한 논의가 있습니다. `.whl`과 `.whlx` 파일이 동시에 PyPI와 같은 패키지 인덱스에 업로드될 수 있도록 허용할지, 그리고 듀얼 퍼블리싱 시 어떤 제약 조건을 둘지에 대한 고려가 필요합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.