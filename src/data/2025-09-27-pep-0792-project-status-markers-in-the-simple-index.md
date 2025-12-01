---
title: "[Final] PEP 792 - Project status markers in the simple index"
excerpt: "Python Enhancement Proposal 792: 'Project status markers in the simple index'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/792/
toc: true
toc_sticky: true
date: 2025-09-27 14:05:09+0900
last_modified_at: 2025-09-27 14:05:09+0900
published: true
---
> **원문 링크:** [PEP 792 - Project status markers in the simple index](https://peps.python.org/pep-0792/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 21-May-2025


# PEP 792 – simple index에 프로젝트 상태 마커 추가 (Project status markers in the simple index)

## 초록 (Abstract)

이 PEP는 simple index에서 제공되는 표준화된 프로젝트 상태 마커(project status markers) 세트와, 이러한 마커를 HTML 및 JSON simple index에서 통신하는 메커니즘을 제안합니다.

## 배경 및 동기 (Rationale and Motivation)

프로젝트의 "상태"는 Python 패키징 생태계의 규모와 복잡성이 증가함에 따라 더욱 중요해지는 중요한 메타데이터입니다. 프로젝트가 유지보수되고 있는지 또는 사용하기에 적합한지 판단하는 데 프로젝트 상태(또는 최근 활동과 같은 대리 지표)를 아는 것이 유용합니다.

현재 Python 패키징에는 프로젝트의 "상태"를 전달하는 최소 세 가지 메커니즘이 있습니다.

1.  **Trove 분류자 (Trove classifiers):** PEP 301에 명시된 대로 배포 패키지 메타데이터에 포함될 수 있습니다. 유연하지만, 상태를 업데이트할 때마다 새로운 배포를 푸시해야 하며, 이전 배포의 분류자는 업데이트될 수 없다는 한계가 있습니다.
2.  **Yanking (회수):** PEP 592에 명시된 대로 배포 및 릴리스를 "yanked"로 표시할 수 있습니다. 이는 종속성 해결에 적합하지 않은 것으로 간주되며, 특정 릴리스에 대한 단일 목적의 상태 표시입니다.
3.  **PyPI 프로젝트 상태 (PyPI project statuses):** 전체 프로젝트(모든 릴리스 및 배포)에 적용됩니다. PyPI 관리자는 프로젝트를 "quarantine"할 수 있고, 프로젝트 소유자는 "archive"할 수 있습니다. 그러나 이 상태는 현재 PyPI의 API를 통해 노출되지 않고 사용자 대면 웹페이지에만 렌더링됩니다.

현재 프로젝트 상태 지표 중 기계 판독 가능(machine-readable), 일반적(general), 인덱스 독립적(index-agnostic), 그리고 릴리스별 또는 배포별이 아닌 프로젝트 전체에 적용되는 네 가지 특성을 모두 만족하는 것은 없습니다.

| 메커니즘             | 기계 판독 가능 | 일반적 | 인덱스 독립적 | 프로젝트 전체 |
| :------------------- | :------------- | :----- | :------------ | :------------ |
| Trove 분류자         | ✅             | ✅     | ✅            | ❌            |
| Yanking              | ✅             | ❌     | ✅            | ✅            |
| PyPI 프로젝트 상태 | ✅             | ✅     | ❌            | ✅            |

이 PEP는 위 네 가지 조건을 모두 만족하는 인덱스 독립적인 메커니즘으로 PyPI의 프로젝트 상태를 채택할 것을 제안합니다.

## 명세 (Specification)

이 PEP는 프로젝트 상태 마커 세트와 표준 HTML 및 JSON 인덱스에서의 표현이라는 두 가지 측면을 명시합니다.

### 프로젝트 상태 마커 (Project status markers)

프로젝트는 항상 정확히 하나의 상태를 가집니다. 명시적으로 상태가 명시되지 않으면 프로젝트는 `active` 상태로 간주됩니다. 인덱스는 필요에 따라 이 PEP에 지정된 상태 마커의 하위 집합을 구현할 수 있습니다.

*   **`active`** : 프로젝트가 활성화된 상태입니다. 이것이 프로젝트의 기본 상태입니다.
    *   **인덱스 의미론:** 새 배포 업로드를 허용하고 기존 배포 다운로드를 제공해야 합니다.
    *   **인스톨러 의미론:** 없음.

*   **`archived`** : 프로젝트가 향후 업데이트될 예정이 없습니다.
    *   **인덱스 의미론:** 새 배포 업로드를 허용하지 않지만, 기존 배포 다운로드를 제공해야 합니다.
    *   **인스톨러 의미론:** 프로젝트 아카이브에 대한 경고를 생성할 수 있습니다.

*   **`quarantined`** : 프로젝트가 일반적으로 사용하기에 안전하지 않은 것으로 간주됩니다(예: 멀웨어).
    *   **인덱스 의미론:** 새 배포 업로드를 허용하지 않으며, 프로젝트의 어떤 배포도 다운로드 제공을 해서는 안 됩니다.
    *   **인스톨러 의미론:** 프로젝트 격리에 대한 경고를 생성할 수 있습니다.

*   **`deprecated`** : 프로젝트가 더 이상 사용되지 않으며, 다른 프로젝트로 대체되었을 수 있습니다.
    *   **인덱스 의미론:** `active`와 동일한 의미론을 가집니다.
    *   **인스톨러 의미론:** 프로젝트의 비추천(deprecation)에 대한 경고를 생성할 수 있습니다.

### 인덱스 API의 상태 마커 (Status markers in the index APIs)

이 PEP는 인덱스 API의 버전 1.4를 정의합니다. 모든 변경 사항은 루트 인덱스 응답이 아닌 각 프로젝트의 인덱스 응답 내에서 프로젝트 수준에서 발생합니다.

*   **HTML index** :
    *   `pypi:repository-version`을 `1.4`로 정의해야 합니다.
    *   프로젝트의 상태 마커를 `content`로 갖는 `pypi:project-status` 메타 태그를 추가해야 합니다. (프로젝트가 `active`인 경우 생략 가능)
    *   프로젝트 상태의 맥락을 설명하는 자유 형식 텍스트를 `content`로 갖는 `pypi:project-status-reason` 메타 태그를 포함할 수 있습니다. (`active`이거나 이유가 없는 경우 생략 가능)

*   **JSON index** :
    *   `meta.api-version`을 `1.4`로 정의해야 합니다.
    *   프로젝트의 상태 마커를 값으로 갖는 `project-status.state` 키를 JSON 응답에 포함해야 합니다. (`active`인 경우 생략 가능)
    *   프로젝트 상태의 맥락을 설명하는 자유 형식 텍스트를 값으로 갖는 `project-status.reason` 키를 JSON 응답에 포함할 수 있습니다. (`active`이거나 이유가 없는 경우 생략 가능)

## 향후 고려 사항 (Future Considerations)

이 PEP는 `active`, `archived`, `quarantined`, `deprecated`의 네 가지 프로젝트 상태 마커만 정의합니다. 향후 PEP 또는 PyPA 표준 프로세스에서 필요에 따라 추가 상태 마커를 정의할 수 있습니다. 또한, 사용자 제어 메타데이터(예: 프로젝트 아카이브에 대한 설명)를 포함하도록 프로젝트 상태 메커니즘을 확장하는 것도 고려될 수 있습니다.

## 보안 영향 (Security Implications)

이 PEP는 프로젝트 상태 마커 추가와 관련된 긍정적 또는 부정적인 보안 영향을 식별하지 않습니다.

## 교육 방법 (How to Teach This)

Python 커뮤니티에 이 PEP를 교육하는 데는 두 가지 측면이 있습니다.

1.  **일반 패키지 유지보수자:** 프로젝트를 아카이브하거나 비추천하는 등의 프로젝트 상태 마커를 설정하는 능력에 대해 알려야 합니다. PyPI와 협력하여 유지보수자 지향 문서 및 커뮤니케이션(블로그 게시물, PyPI 사용자 문서 업데이트 포함)을 제공할 예정입니다.
2.  **인스톨러 및 인덱스 유지보수자:** 새로운 프로젝트 상태 마커와 이를 해석하는 방법에 대해 알려야 합니다. PEP 저자는 PyPI에 참조 구현을 수행하고, pip과 같은 인기 있는 인스톨러 유지보수자와 협력하여 프로젝트 상태를 어느 정도 노출할지 결정하도록 도울 것입니다.

## 거부된 아이디어 (Rejected Ideas)

*   **"예약된" 키 사용 (Using “reserved” keys):** 표준을 직접 표준화하는 대신 기존 메커니즘 내에서 비표준 방식으로 통신하는 방법이 고려되었지만, 표준화된 의미론 부족 및 HTML simple index에 동등한 메커니즘이 없다는 단점으로 인해 거부되었습니다.
*   **PyPI의 비표준 JSON API에 프로젝트 마커 추가 (Project markers in PyPI's non-standard JSON API):** PyPI의 비표준 JSON API에만 프로젝트 상태 마커를 노출하는 방안도 고려되었으나, 표준 및 비표준 API 간의 차이를 심화시킨다는 단점으로 인해 거부되었습니다.
*   **동시에 여러 프로젝트 상태 마커 사용 (Multiple project status markers at once):** 초기 버전에서는 프로젝트가 `archived`와 `quarantined`와 같이 동시에 여러 마커를 가질 수 있도록 지원하는 것을 고려했지만, 의미론 병합 시 충돌 해결 메커니즘 및 마커 간의 배타성 상태 머신을 지정해야 하는 복잡성 때문에 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.