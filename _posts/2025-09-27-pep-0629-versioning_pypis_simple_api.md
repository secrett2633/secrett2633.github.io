---
title: "[Final] PEP 629 - Versioning PyPI’s Simple API"
excerpt: "Python Enhancement Proposal 629: 'Versioning PyPI’s Simple API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/629/
toc: true
toc_sticky: true
date: 2025-09-27 00:30:52+0900
last_modified_at: 2025-09-27 00:30:52+0900
published: true
---
> **원문 링크:** [PEP 629 - Versioning PyPI’s Simple API](https://peps.python.org/pep-0629/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Jul-2020

PEP 629 – PyPI의 Simple API 버전 관리

### 초록 (Abstract)
이 PEP는 PyPI(Python Package Index)의 Simple API에 버전 관리 방식을 추가할 것을 제안합니다. 이를 통해 클라이언트가 특정 저장소(repository)가 Simple API의 어떤 기능을 지원하는지 파악할 수 있도록 돕는 것이 목표입니다.

### 도입 배경 (Rationale)
Simple API가 발전함에 따라, 클라이언트들은 저장소가 어떤 새로운 기능을 지원하는지 알 필요가 있습니다. 현재는 응답 데이터를 보고 특정 기능이 사용되는지 여부를 추측하는 방식 외에는 이를 감지할 메커니즘이 없습니다.

이러한 방식은 최신 클라이언트가 저장소가 지원하는 모든 기능을 파악하는 데는 어느 정도 작동하지만, 오래된 클라이언트에게는 저장소가 이해하지 못할 수 있는 새로운 기능을 지원한다는 것을 알려주지 못합니다. 이는 클라이언트가 저장소의 출력을 올바르게 해석하지 못할 수 있음을 사용자에게 알릴 기회를 박탈합니다.

예를 들어, `python-requires` 메타데이터가 단계적으로 도입되었을 때, 기존 클라이언트들은 저장소를 계속 사용할 수는 있었지만, 이 새로운 데이터를 이해하지 못하여 최종 사용자에게 더 적합한 파일을 선택하도록 안내할 수 있는 능력이 부족했습니다.

### 개요 (Overview)
이 PEP는 Simple API 페이지에 대한 모든 성공적인 요청의 응답에 메타 태그(meta tag)를 포함할 것을 제안합니다. 이 메타 태그는 `name` 속성으로 `"pypi:repository-version"`을 가지며, `content` 속성에는 PEP 440과 호환되는 버전 번호(Major.Minor 형태)가 들어갑니다.

예시:
```html
<meta name="pypi:repository-version" content="1.0">
```
저장소 버전을 해석하는 방법은 다음과 같습니다:
*   **메이저 버전(Major version) 증가:** 하위 호환성(backwards incompatible)이 없는 변경을 나타냅니다. 기존 클라이언트가 API를 더 이상 의미 있게 사용할 수 없을 것으로 예상되는 경우에 사용됩니다.
*   **마이너 버전(Minor version) 증가:** 하위 호환성이 있는 변경을 나타냅니다. 기존 클라이언트가 API를 계속 의미 있게 사용할 수 있을 것으로 예상되는 경우에 사용됩니다.

이 PEP는 메이저 버전이 절대 증가하지 않을 것으로 예상하며, 향후 주요 API 발전은 다른 메커니즘을 사용할 것으로 가정합니다. 이 PEP는 현재 API 버전을 "1.0"으로 설정하며, Simple API를 추가로 발전시키는 미래의 PEP들은 마이너 버전 번호를 증가시킬 것입니다.

### 클라이언트 동작 (Clients)
Simple API와 상호작용하는 클라이언트는 각 응답에서 저장소 버전을 SHOULD 인트로스펙트(introspect)해야 합니다. 만약 해당 데이터가 존재하지 않는다면 버전 "1.0"으로 MUST 가정해야 합니다.

*   예상보다 큰 메이저 버전을 만났을 때, 클라이언트는 사용자에게 적절한 오류 메시지와 함께 MUST 하드 페일(hard fail)해야 합니다.
*   예상보다 큰 마이너 버전을 만났을 때, 클라이언트는 사용자에게 적절한 경고 메시지를 SHOULD 표시해야 합니다.
*   클라이언트는 저장소가 사용하는 기능을 파악하기 위해 여전히 기능 감지(feature detection)를 MAY 사용할 수 있습니다.

### 기각된 아이디어 (Rejected Ideas)

#### HTTP 헤더 사용 (Using a Header)
이 정보를 HTML에 직접 포함하는 대신 HTTP 헤더를 사용하는 대안이 고려되었습니다. 그러나 이 방식은 미러(mirror)들이 단순히 "덤(dumb)" HTTP 파일 서버로 작동하는 대신 헤더를 수정해야 하게 만들 것이므로 최종적으로 기각되었습니다.

#### URL에 버전 포함 (Using an URL)
API 버전 관리를 위한 또 다른 전통적인 메커니즘은 `/1.0/simple/`과 같이 URL에 버전을 포함하는 것입니다. 이 방식은 기존 클라이언트가 계속 사용할 수 없을 것으로 예상되는 주요 버전 변경에는 잘 작동하지만, 특히 버전 번호가 최종 사용자에게 주로 권고 사항으로 간주될 수 있는 마이너 버전 업데이트에는 적합하지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.