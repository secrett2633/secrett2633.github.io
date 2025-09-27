---
title: "[Accepted] PEP 658 - Serve Distribution Metadata in the Simple Repository API"
excerpt: "Python Enhancement Proposal 658: 'Serve Distribution Metadata in the Simple Repository API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/658/
toc: true
toc_sticky: true
date: 2025-09-27 09:54:18+0900
last_modified_at: 2025-09-27 09:54:18+0900
published: true
---
> **원문 링크:** [PEP 658 - Serve Distribution Metadata in the Simple Repository API](https://peps.python.org/pep-0658/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 10-May-2021

# PEP 658 – Simple Repository API에서 배포 메타데이터 제공

## 개요
이 문서는 PEP 503 "simple" 저장소 API에서 배포(distribution)의 `METADATA` 파일을 노출하기 위해 앵커 태그(anchor tag)를 추가할 것을 제안합니다. `data-dist-info-metadata` 속성이 도입되어 주어진 배포에서 해당 파일을 독립적으로 가져올 수 있음을 나타냅니다.

## 동기 (Motivation)
최근 도구들에 의해 보편화된 패키지 관리 워크플로우는 배포를 설치할 의도 없이 배포 메타데이터를 검사해야 할 필요성을 증가시키고 있습니다. 또한, 메타데이터를 기반으로 프로젝트의 여러 배포 중에서 선택하기 위해 많은 배포를 다운로드하는 경우가 발생합니다. 이로 인해 불필요하게 많은 데이터를 다운로드하고 폐기하게 되는데, 이는 비효율적이며 사용자 경험을 저해합니다.

## 배경 (Rationale)
도구들은 HTTP 범위 요청(range requests)을 통해 Wheel 파일을 부분적으로 다운로드하여 다운로드 크기를 줄이는 방법을 모색해왔습니다. 그러나 이 방법은 저장소 서버에 추가적인 런타임 요구사항을 발생시킵니다. 또한, 메타데이터 파일을 찾기 위해 Wheel 파일의 파일 목록을 가져오기 위한 별도의 요청이 필요하므로 추가적인 오버헤드가 발생합니다.

따라서 서버가 메타데이터 파일을 미리 추출하여 독립적인 파일로 제공함으로써, 추가 요청 및 ZIP 파일 검사 없이 메타데이터를 얻을 수 있도록 하는 것이 바람직합니다.

Core Metadata Specification 에 정의된 메타데이터 파일은 일반적인 사용 사례에 필요한 정보를 포함하고 있으므로 저장소에서 직접 제공될 것입니다. 이 메타데이터는 Wheel 및 sdist 와 같은 표준 준수 배포에 대해서만 제공되어야 하며, `.dist-info` 디렉터리에 있는 Wheel의 `METADATA` 파일 과 같이 배포의 정식 메타데이터 파일과 동일해야 합니다.

클라이언트가 별도로 제공되는 메타데이터 파일을 선택할 수 있는지 여부를 나타내기 위해 배포 파일의 앵커 링크에 HTML 속성이 필요합니다. 이 속성은 클라이언트 측 검증을 위한 메타데이터 내용의 해시(hash)도 제공하는 데 사용됩니다. 속성이 없다는 것은 배포 내용 또는 저장소 지원 부족으로 인해 해당 배포에 별도의 메타데이터 항목이 제공되지 않음을 나타냅니다.

## 명세 (Specification)
Simple Repository의 프로젝트 페이지에서, 각 배포를 가리키는 앵커 태그(anchor tag)는 `data-dist-info-metadata` 속성을 가질 수 있습니다. 이 속성의 존재는 해당 앵커 태그가 나타내는 배포가 Core Metadata 파일을 포함하고 있으며, 이 파일은 배포가 처리되거나 설치될 때 수정되지 않음을 의미합니다.

`data-dist-info-metadata` 속성이 존재하면, 저장소는 배포 파일 이름에 `.metadata`를 덧붙인 형태로 배포의 Core Metadata 파일을 배포와 함께 제공해야 합니다. 예를 들어, `/files/distribution-1.0-py3.none.any.whl`에서 제공되는 배포의 Core Metadata는 `/files/distribution-1.0-py3.none.any.whl.metadata`에 위치합니다. 이는 PEP 503이 GPG 서명 파일의 위치를 지정하는 방식과 유사합니다.

저장소는 Core Metadata 파일의 해시를 `data-dist-info-metadata` 속성의 값으로 제공해야 합니다. 이때 `<hashname>=<hashvalue>` 구문을 사용하며, `<hashname>`은 사용된 해시 함수의 소문자 이름이고, `<hashvalue>`는 16진수로 인코딩된 다이제스트(digest)입니다. 해시를 사용할 수 없는 경우, 저장소는 `true`를 속성의 값으로 사용할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)
앵커 태그에 `data-dist-info-metadata` 속성이 없는 경우, 도구들은 메타데이터를 검사하기 위해 배포를 다운로드하는 현재의 동작으로 되돌아갈 것으로 예상됩니다.

새로운 `data-dist-info-metadata` 속성을 지원하지 않는 이전 도구들은 이 속성을 무시하고, 메타데이터를 검사하기 위해 배포를 다운로드하는 현재의 동작을 유지할 것으로 예상됩니다. 이는 이전에 추가된 `data-` 속성들이 기존 도구들에 대해 작동하도록 예상되는 방식과 유사합니다.

## 기각된 아이디어 (Rejected Ideas)

### 1. 프로젝트 페이지에 메타데이터 내용 포함 (Put metadata content on the project page)
도구들은 프로젝트 페이지에 이미 있는 정보 외에 배포에서 일반적으로 종속성 정보만 필요로 하기 때문에, PEP 503에 명시된 `data-requires-python` 속성처럼 저장소가 프로젝트 페이지에 직접 정보를 포함할 수 있다는 제안이 있었습니다.

이 접근 방식은 배포가 임의로 긴 종속성 목록(필수 및 선택 포함)을 포함할 수 있고, 프로젝트의 모든 배포에 대한 정보를 포함하는 것이 순수한 절약으로 이어질지 불분명하다는 이유로 폐기되었습니다. 대부분의 배포에 대한 정보는 결국 필요 없게 되기 때문입니다. 메타데이터를 별도로 제공함으로써 데이터 사용량이 검사된 배포 수에 비례하게 되어 성능을 더 잘 예측할 수 있습니다.

### 2. 배포 내의 더 많은 파일 노출 (Expose more files in the distribution)
메타데이터 파일만 제공하는 대신 전체 `.dist-info` 디렉터리를 별도의 부분으로 제공하자는 제안이 있었습니다. 그러나 HTTP를 통해 여러 파일을 하나의 엔티티로 제공하려면 저장소 서버가 원래 배포에서 파일을 추출한 후 별도로 다시 압축해야 하며, 배포 자체가 설치되지 않을 때 `METADATA` 파일 외의 다른 파일에 대한 현재 사용 사례는 없습니다.

이 접근 방식은 미래에 다른 파일들이 도입되는 것을 배제하지 않으며, 함께 제공하거나 개별적으로 제공할 수 있습니다.

### 3. 프로젝트 페이지에 메타데이터 파일의 URL 명시 (Explicitly specify the metadata file's URL on the project page)
이 초안의 초기 버전에서는 `data-dist-info-metadata` 속성에 메타데이터 파일의 URL을 넣을 것을 제안했습니다. 그러나 저장소가 결정된 위치에 메타데이터 파일을 제공하도록 요구하는 것이 검색 가능성(discoverability)에 더 좋다고 판단되었습니다. 현재 접근 방식은 또한 프로젝트 페이지의 크기를 줄이는 추가적인 이점도 있습니다.

## 참조 (References)
*   [core-metadata] https://packaging.python.org/specifications/core-metadata/
*   [dist-info] https://packaging.python.org/specifications/recording-installed-packages/
*   [wheel] https://packaging.python.org/specifications/binary-distribution-format/
*   [sdist] https://packaging.python.org/specifications/source-distribution-format/

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.