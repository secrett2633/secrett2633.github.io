---
title: "[Final] PEP 639 - Improving License Clarity with Better Package Metadata"
excerpt: "Python Enhancement Proposal 639: 'Improving License Clarity with Better Package Metadata'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/639/
toc: true
toc_sticky: true
date: 2025-09-27 01:31:09+0900
last_modified_at: 2025-09-27 01:31:09+0900
published: true
---
> **원문 링크:** [PEP 639 - Improving License Clarity with Better Package Metadata](https://peps.python.org/pep-0639/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Aug-2019


# PEP 639 – 더 나은 패키지 메타데이터로 라이선스 명확성 향상

## 개요
이 PEP (Python Enhancement Proposal)는 Python 프로젝트에서 라이선스를 명확하게 문서화하기 위한 새로운 표준을 정의합니다. 주요 목표는 패키지 작성자가 라이선스를 더 간단하고 모호하지 않게 선언하고, 최종 사용자가 이를 명확하게 이해하며, 도구가 프로그래밍 방식으로 라이선스 정보를 처리할 수 있도록 돕는 것입니다.

이를 위해 다음과 같은 변경 사항을 제안합니다:
*   **SPDX 라이선스 표현식(SPDX license expression syntax)** 문법을 Python 프로젝트의 라이선스를 표현하는 방법으로 채택합니다.
*   프로젝트, 소스 및 빌드 배포판에 라이선스 파일을 포함하는 방법을 정의합니다.
*   Core Metadata 및 해당 `pyproject.toml` 파일의 관련 키에 필요한 변경 사항을 지정합니다.

이러한 변경 사항은 Core Metadata 사양을 버전 2.4로 업데이트할 것입니다.

## 목표
이 PEP의 범위는 배포 패키지의 라이선스를 문서화하기 위한 새로운 메커니즘을 다루는 것으로 제한됩니다.
*   SPDX 라이선스 표현식을 지정하는 수단.
*   배포 패키지 및 설치된 프로젝트에 라이선스 텍스트를 포함하는 방법.

이 PEP에서 요구하는 변경 사항은 이전 버전과의 호환성을 극대화하면서 영향을 최소화하도록 설계되었습니다.

## 비목표 (Non-Goals)
이 PEP는 특정 패키지 작성자에게 특정 라이선스를 선택하도록 권장하지 않습니다. 또한, 프로젝트가 새로운 필드를 사용하지 않기로 결정하더라도, PyPI에 업로드할 때 추가적인 제한을 부과하지 않습니다.

## 동기 (Motivation)
소프트웨어는 창작자 외의 다른 사람이 다운로드, 사용, 공유 및 수정하려면 라이선스가 필요합니다. 현재 Core Metadata에서 라이선스가 문서화되는 여러 필드가 있으며, 각 필드에서 표현할 수 있는 내용에 제한이 있습니다. 이는 패키지 작성자와 최종 사용자(배포 재패키저 포함) 모두에게 혼란을 야기하는 경우가 많습니다.

이로 인해 PyPI 분류자의 모호성, 다른 생태계와의 라이선스 상호 운용성, 너무 많은 혼란스러운 라이선스 메타데이터 옵션, Wheel 프로젝트의 라이선스 파일 지원 제한, 정확한 라이선스 메타데이터 부족 등 라이선스 관련 논의와 문제가 발생했습니다. 결과적으로 Python 패키지는 다른 일반적인 생태계보다 모호하고 누락된 라이선스 정보가 더 많은 경향이 있습니다.

## 근거 (Rationale)
Python 생태계 및 다양한 다른 패키징 시스템, Linux 배포판, 언어 생태계, 애플리케이션에서 기존 라이선스 메타데이터 정의를 매핑하기 위한 조사가 수행되었습니다. 조사 결과는 이 PEP의 권장 사항을 이끌었습니다:
*   SPDX 및 SPDX와 유사한 문법은 많은 최신 패키지 시스템에서 가장 인기 있는 라이선스 표현식입니다.
*   대부분의 Free and Open Source Software 라이선스는 패키지 작성자가 전체 텍스트를 배포 패키지에 포함하도록 요구합니다.

따라서 이 PEP는 두 가지 새로운 Core Metadata 필드를 도입합니다:
*   `License-Expression`: SPDX 라이선스 표현식을 사용하여 패키지의 라이선스를 명확하게 표현하는 방법을 제공합니다.
*   `License-File`: 배포 시 패키지에 라이선스(들)의 전체 텍스트를 포함하는 표준화된 방법을 제공하며, Core Metadata를 사용하는 다른 도구가 배포 아카이브의 라이선스 파일을 찾을 수 있도록 합니다.

## 용어 (Terminology)

*   **license classifier**: Core Metadata 사양에 설명된 `License ::`로 시작하는 PyPI Trove 분류자.
*   **license expression (SPDX expression)**: 하나 이상의 SPDX 라이선스 식별자를 포함하는 유효한 SPDX 라이선스 표현식 문법을 가진 문자열로, 프로젝트의 라이선스(들)와 그 상호 관계를 설명합니다. 예: `GPL-3.0-or-later`, `MIT AND (Apache-2.0 OR BSD-2-clause)`.
*   **license identifier (SPDX identifier)**: 유효한 SPDX 약식 라이선스 식별자. 예: `MIT`, `GPL-3.0-only`, `LicenseRef-My-Custom-License`.
*   **root license directory**: 프로젝트 소스 트리, 배포 아카이브 또는 설치된 프로젝트에서 라이선스 파일이 저장되는 디렉터리.

## 사양 (Specification)
이 PEP를 구현하는 데 필요한 변경 사항은 다음과 같습니다:
*   Core Metadata에 추가.
*   작성자가 제공하는 프로젝트 소스 메타데이터에 추가.
*   소스 배포(sdist), 빌드 배포(wheel) 및 설치된 프로젝트 사양에 추가.
*   레거시 라이선스 메타데이터를 라이선스 표현식으로 처리하고 변환하는 도구를 위한 가이드.

### SPDX 라이선스 표현식 문법
이 PEP는 SPDX 사양 버전 2.2 또는 이후 호환 버전의 SPDX 라이선스 표현식 문법을 채택합니다.

유효한 SPDX 표현식의 예:
*   `MIT`
*   `BSD-3-Clause`
*   `MIT AND (Apache-2.0 OR BSD-2-Clause)`

유효하지 않은 SPDX 표현식의 예:
*   `Use-it-after-midnight`
*   `Apache-2.0 OR 2-BSD-Clause`

### Core Metadata
새로운 필드를 추가함에 따라, 이 PEP는 Core Metadata 버전을 2.4로 업데이트합니다.

#### `License-Expression` 필드 추가
`License-Expression`은 유효한 SPDX 라이선스 표현식을 포함하는 선택적 Core Metadata 필드입니다.
*   빌드 및 게시 도구는 `License-Expression` 필드가 유효한 SPDX 표현식을 포함하는지 확인해야 합니다.
*   PyPI는 `License-Expression` 필드를 포함하는 모든 새로 업로드된 배포 아카이브가 유효한 라이선스 표현식을 포함하는지 검증하고, 그렇지 않은 업로드는 거부해야 합니다.

#### `License-File` 필드 추가
`License-File`은 라이선스 관련 파일의 경로를 포함하는 선택적 Core Metadata 필드입니다. 이 필드는 여러 번 나타날 수 있으며, 각 인스턴스는 하나의 파일 경로를 나열합니다. 이 필드에 지정된 파일은 라이선스 텍스트, 저자/귀속 정보 또는 패키지와 함께 배포되어야 하는 기타 법적 고지를 포함할 수 있습니다.
*   해당 파일은 배포 아카이브에 포함되어야 하며, 설치된 프로젝트에도 동일한 상대 경로로 설치되어야 합니다.
*   경로 구분 기호는 슬래시 문자(`/`)여야 하며, 상위 디렉터리 표시(`..`)는 사용해서는 안 됩니다.
*   라이선스 파일 내용은 UTF-8 인코딩 텍스트여야 합니다.

#### `License` 필드 폐지 (Deprecate)
기존의 비정형 텍스트 `License` Core Metadata 필드는 폐지되며, 새로운 `License-Expression` 필드로 대체됩니다. 두 필드는 상호 배타적입니다.

#### 라이선스 분류자 폐지 (Deprecate)
`Classifier` Core Metadata 필드에 라이선스 분류자를 사용하는 것은 폐지되며, 더 정확한 `License-Expression` 필드로 대체됩니다.

### 프로젝트 소스 메타데이터
이 PEP는 `pyproject.toml` 파일의 `[project]` 테이블 아래에 있는 프로젝트의 소스 메타데이터에 대한 변경 사항을 지정합니다.

#### `license` 키에 문자열 값 추가
`[project]` 테이블의 `license` 키는 최상위 문자열 값을 포함하도록 정의됩니다. 이는 이 PEP에 정의된 유효한 SPDX 라이선스 표현식이며, Core Metadata의 `License-Expression` 필드에 매핑됩니다.

#### `license-files` 키 추가
`[project]` 테이블에 `license-files`라는 새로운 키가 추가되어, 라이선스 및 패키지와 함께 배포될 기타 법적 고지를 포함하는 파일의 경로를 지정합니다. 이는 Core Metadata의 `License-File` 필드에 해당합니다.

이 키의 값은 유효한 glob 패턴을 포함해야 하는 문자열 배열입니다.
*   경로 구분 기호는 슬래시 문자(`/`)여야 합니다.
*   `pyproject.toml`을 포함하는 디렉터리에 상대적이므로, 선행 슬래시 문자는 사용해서는 안 됩니다.
*   상위 디렉터리 표시(`..`)는 사용해서는 안 됩니다.

#### `license` 키 테이블 서브키 폐지
`[project]` 테이블의 `license` 키에 대한 테이블 값(예: `text` 및 `file` 서브키)은 이제 폐지됩니다.

### 레거시 메타데이터 변환
도구는 `license.text` `[project]` 키 (또는 동등한 도구별 형식), 라이선스 분류자 또는 Core Metadata `License` 필드의 내용을 사용하여 `license` 키의 최상위 문자열 값이나 Core Metadata `License-Expression` 필드를 채울 때 사용자에게 알리고 명확한 사용자 작업(원하는 라이선스 표현식 값 선택 및 확인)을 요구해야 합니다.

### 이전 버전과의 호환성 (Backwards Compatibility)
새로운 `License-Expression` Core Metadata 필드와 `pyproject.toml` `[project]` 테이블의 `license` 키에 대한 최상위 문자열 값 추가는 이 PEP의 사양에 대한 지원을 명확하게 의미합니다. 이는 새로운 도구가 라이선스 표현식을 자유 형식 라이선스 설명으로 잘못 해석하거나 그 반대의 경우를 방지합니다.

폐지된 Core Metadata `License` 필드, `pyproject.toml` `[project]` 테이블의 `license` 키 테이블 서브키(`text` 및 `file`), 라이선스 분류자는 이전 버전과의 호환성을 유지합니다. 제거는 향후 PEP 및 Core Metadata 사양의 새로운 버전으로 미뤄집니다.

### 보안 영향 (Security Implications)
이 PEP는 예상되는 보안 영향이 없습니다. `License-Expression` 필드는 일반 문자열이며 `License-File` 필드는 파일 경로입니다. 둘 다 알려진 새로운 보안 문제를 야기하지 않습니다.

### 교육 방법 (How to Teach This)
대부분의 패키지는 단일 라이선스를 사용하므로 간단합니다. 단일 라이선스 식별자는 유효한 라이선스 표현식입니다.
패키징 도구 사용자는 유효하지 않은 라이선스 표현식을 감지하거나 폐지된 `License` 필드 또는 라이선스 분류자가 사용될 때 도구가 발행하는 메시지를 통해 패키지의 유효한 라이선스 표현식을 학습할 것입니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.