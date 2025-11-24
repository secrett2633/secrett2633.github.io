---
title: "[Accepted] PEP 794 - Import Name Metadata"
excerpt: "Python Enhancement Proposal 794: 'Import Name Metadata'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/794/
toc: true
toc_sticky: true
date: 2025-09-27 14:07:32+0900
last_modified_at: 2025-09-27 14:07:32+0900
published: true
---
> **원문 링크:** [PEP 794 - Import Name Metadata](https://peps.python.org/pep-0794/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 05-Jun-2025

## PEP 794 – Import Name Metadata (가져오기 이름 메타데이터)

### 개요 (Abstract)
이 PEP는 Python 패키징을 위한 핵심 메타데이터 사양을 확장하여 `Import-Name`과 `Import-Namespace`라는 두 개의 새롭고 반복 가능한 필드를 도입할 것을 제안합니다. 이 필드들은 프로젝트가 설치될 때 제공하는 가져오기 이름(import names)을 기록하는 역할을 합니다. 새로운 핵심 메타데이터 필드의 값을 제공하기 위해 `pyproject.toml` 파일의 `[project]` 테이블에 `import-names` 및 `import-namespaces` 키가 추가될 예정입니다. 이로 인해 핵심 메타데이터 버전 2.5가 도입됩니다.

### 동기 (Motivation)
현재 Python 패키징에서는 프로젝트 이름이 해당 프로젝트에서 가져올 수 있는 이름(import name)과 일치해야 한다는 요구 사항이 없습니다. 이로 인해 가져오기 이름에서 프로젝트 이름으로, 또는 그 반대로 쉽고 정확하게 전환할 수 있는 방법이 없습니다. 이는 사용자가 가져오기 이름만 알고 있거나 프로젝트 이름을 어렴풋이 기억할 때 올바른 프로젝트를 찾아 설치하는 데 도움을 주려는 도구들에게 어려움을 야기합니다.

예를 들어, 코드 편집기는 가상 환경에서 충족되지 않은 `import` 문을 감지할 수 있지만, 어떤 프로젝트가 어떤 가져오기 이름을 제공하는지 확실히 알 수 없으므로, 사용자에게 해당 가져오기 요구 사항을 충족할 수 있는 잠재적인 프로젝트 목록을 정확하게 제공할 수 없습니다 (예: `import PIL`이 `Pillow` 프로젝트 설치를 의미한다는 것이 분명하지 않음).

또한, 두 프로젝트를 설치할 때 제공하는 가져오기 이름을 기반으로 충돌 여부를 쉽게 알 수 있는 방법도 없습니다. 예를 들어, 두 개의 다른 프로젝트가 모두 `_utils` 모듈을 가지고 있다면, 두 프로젝트를 모두 설치하면 한 프로젝트의 `_utils` 모듈이 다른 프로젝트의 파일을 덮어쓰면서 충돌이 발생할 수 있습니다.

이 제안은 스팸 감지에도 도움이 될 수 있습니다. 프로젝트가 매우 인기 있는 프로젝트와 동일한 가져오기 이름을 지정하는 경우, 덜 인기 있는 프로젝트의 유효성을 면밀히 조사해야 한다는 신호가 될 수 있습니다.

### 근거 (Rationale)
이 PEP는 프로젝트 소유자가 특정 플랫폼에 설치될 때 프로젝트가 제공하는 최상위 가져오기 이름을 지정할 수 있도록 패키징 코어 메타데이터 사양을 확장할 것을 제안합니다. 이 메타데이터를 코어 메타데이터에 포함함으로써 데이터는 (잠재적으로) 인덱스 서버에 의해 제공되며, sdist 또는 wheel과 독립적입니다. 이는 전체 wheel을 다운로드할 필요 없이 도구에 메타데이터를 노출하는 방법을 고안할 필요를 없앱니다.

이 메타데이터가 모든 릴리스 아티팩트(release artifacts)에서 동일하게 유지되면, 프로젝트는 모든 가능한 가져오기 이름을 얻기 위해 단일 파일의 코어 메타데이터만 확인하면 됩니다. 또한, `pyproject.toml`에 `project.import-names` 및 `project.import-namespaces` 키를 가짐으로써 프로젝트 버전 전체에 걸쳐 일관성을 유지할 수 있도록 합니다.

이 PEP는 제안된 메타데이터에 무엇을 나열할지(또는 나열하지 않을지)에 대해 의도적으로 지나치게 엄격하지 않습니다. Python의 가져오기 시스템이 유연하기 때문에 빌드 백엔드가 프로젝트가 특정 사양을 정확하게 따르는지 확인하는 것은 거의 불가능할 것입니다. 따라서 이 PEP는 유효한 가져오기 이름이 사용되고 프로젝트가 거짓말을 하지 않아야 한다고만 요구합니다.

### 사양 (Specification)
이 PEP는 핵심 메타데이터에 새로운 필드를 도입하므로, 최신 핵심 메타데이터 버전을 2.5로 상향 조정합니다. `Import-Name` 및 `Import-Namespace` 필드는 "다중 사용(multiple uses)" 필드입니다. 두 필드의 각 항목은 유효한 가져오기 이름이어야 하며, `Import-Name`의 경우 비워둘 수도 있습니다. 지정된 이름은 프로젝트가 특정 플랫폼에 설치될 때 가져올 수 있어야 합니다.

가져오기 이름 뒤에는 세미콜론과 "private"이라는 용어가 붙을 수 있습니다 (예: `; private`). 이는 가져오기 이름이 프로젝트의 공개 API의 일부가 아님을 도구에 알립니다.

*   **`Import-Name`**: 프로젝트가 설치될 때 **독점적으로** 제공하는 가져오기 이름을 나열합니다. (즉, 두 프로젝트가 `Import-Name`에 동일한 가져오기 이름을 나열한 채로 설치되면, 한 프로젝트가 다른 프로젝트의 이름을 가리게 됩니다.)
*   **`Import-Namespace`**: 프로젝트가 설치될 때 제공하지만, **독점적이지는 않은** 가져오기 이름을 나열합니다. (즉, 여러 프로젝트가 `Import-Namespace`에 동일한 가져오기 이름을 나열하고 함께 설치되어도 해당 공유 이름이 가려지지 않습니다.)

`pyproject.toml` 사양에는 `import-names` 키가 추가됩니다. 이는 `Import-Name`에 기록될 문자열 배열이 될 것입니다. `import-namespaces`도 `Import-Namespace`에 동일하게 적용됩니다.

프로젝트는 모든 가져오기 이름 시나리오를 포괄하는, 프로젝트가 독점적으로 제공하는 가장 짧은 가져오기 이름을 모두 나열해야 합니다. 만약 가장 짧은 이름 중 점으로 구분된 이름(dotted name)이 있다면, 해당 이름부터 최상위 이름까지의 모든 중간 이름도 `Import-Namespace` 및/또는 `Import-Name`에 적절하게 나열되어야 합니다. 또한, 프로젝트는 공개 또는 비공개 여부에 관계없이 모든 가져오기 이름을 적절한 `; private` 수정자와 함께 나열해야 합니다.

프로젝트가 `Import-Name`과 `Import-Namespace`에 동일한 이름을 나열하는 경우, 도구는 모호성으로 인해 오류를 발생시켜야 합니다.

### 예시 (Examples)

*   **scikit-learn 1.7.0의 경우:**
    ```toml
    [project]
    import-names = ["sklearn"]
    ```

*   **pytest 8.3.5의 경우:**
    ```toml
    [project]
    import-names = ["_pytest", "py", "pytest"]
    ```

*   **azure-mgmt-search 9.1.0의 경우:**
    ```toml
    [project]
    import-names = ["azure.mgmt.search"]
    import-namespaces = ["azure", "azure.mgmt"]
    ```

### 하위 호환성 (Backwards Compatibility)
이것은 핵심 메타데이터의 새로운 필드이자 새로운 핵심 메타데이터 버전이므로, 하위 호환성 문제는 없을 것입니다.

### 보안 관련 사항 (Security Implications)
도구는 메타데이터를 잠재적으로 부정확하게 처리해야 합니다. 따라서 제공된 메타데이터를 기반으로 내리는 모든 결정은 어떤 식으로든 악의적일 수 있다고 가정해야 합니다.

### 교육 방법 (How to Teach This)
프로젝트 소유자는 이제 자신의 프로젝트가 가져오기 위해 제공하는 이름을 기록할 수 있다는 것을 교육받아야 합니다. 프로젝트 이름이 프로젝트가 제공하는 모듈 또는 패키지 이름과 일치하는 경우 아무것도 할 필요가 없습니다. 그러나 차이가 있는 경우, 프로젝트가 제공하는 모든 가져오기 이름을 가능한 가장 짧은 이름을 사용하여 기록해야 합니다. 이름 중 암시적 네임스페이스(implicit namespaces)인 경우 `pyproject.toml`의 `project.import-namespaces`에 들어가고, 그렇지 않으면 `project.import-names`에 들어갑니다.

프로젝트 사용자는 이 새로운 메타데이터에 대해 반드시 알 필요는 없습니다. 도구를 통해 접할 수도 있지만, 해당 데이터의 출처에 대한 세부 정보는 중요하지 않습니다.

### 참고 구현 (Reference Implementation)
`packaging` 라이브러리를 업데이트하여 이 PEP를 지원하는 브랜치가 있습니다: `https://github.com/brettcannon/packaging/tree/pep-794`

### 기각된 아이디어 (Rejected Ideas)

*   **`Import-Namespace` 값 추론:** 이전 버전에서는 `Import-Name`의 점으로 구분된 이름에서 `Import-Namespace` 값을 추론했지만, 명시적인 방식이 오류를 방지하고 데이터의 자체 문서화를 돕는다고 판단되었습니다.
*   **`Import-Namespace`에 나열된 이름이 `Import-Name`에 포함되지 않도록 요구:** Python의 가져오기 시스템의 유연성 때문에 이 요구 사항은 제거되었습니다.
*   **`Provides` 필드 재사용:** 메타데이터 버전 1.1에 도입되고 1.2에서 더 이상 사용되지 않는 `Provides` 필드는 이 PEP가 제안하는 것과 유사한 정보를 제공했지만, 네임스페이스를 구분하지 않는다는 차이점과 `Provides`가 더 이상 사용되지 않는다는 점 때문에 새로운 필드를 사용하기로 결정했습니다.
*   **필드 이름을 `Namespace`로 지정:** "namespace"라는 용어가 가져오기 관점에서는 정확하지만, 암시적 네임스페이스 패키지(implicit namespace packages)와 혼동될 수 있다는 이유로 채택되지 않았습니다.
*   **`RECORD` 파일 제공:** wheel의 `RECORD` 파일을 인덱스 서버에서 제공하자는 제안도 있었지만, 이는 부정확한 정보를 유발할 수 있으며 sdist를 지원하지 않으므로 이 PEP의 접근 방식이 선택되었습니다.
*   **프로젝트가 지정하는 내용에 대한 더 엄격한 규정:** 초기 버전은 `Import-Name`에 넣을 수 있는 내용에 대해 훨씬 엄격했지만, 이는 너무 제한적이고 잘못 구현될 위험이 있어 현재의 완화된 사양이 선택되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.