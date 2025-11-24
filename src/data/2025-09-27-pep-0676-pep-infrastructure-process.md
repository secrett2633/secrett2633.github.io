---
title: "[Active] PEP 676 - PEP Infrastructure Process"
excerpt: "Python Enhancement Proposal 676: 'PEP Infrastructure Process'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/676/
toc: true
toc_sticky: true
date: 2025-09-27 10:08:50+0900
last_modified_at: 2025-09-27 10:08:50+0900
published: true
---
> **원문 링크:** [PEP 676 - PEP Infrastructure Process](https://peps.python.org/pep-0676/)
>
> **상태:** Active | **유형:** Process | **작성일:** 01-Nov-2021

파이썬 PEP 676 – PEP 인프라 프로세스 번역 및 설명

## 개요
PEP 676은 reStructuredText 파일에서 HTML 웹페이지로 PEP 파일을 렌더링하는 인프라를 다룹니다. 이 제안은 PEP 독자, 작성자 및 편집자를 위한 자체 포함되고 유지보수 가능한 솔루션을 명확히 하는 것을 목표로 합니다.

## 동기 (Motivation)
2021년 11월 기준으로, Python Enhancement Proposals (PEP)는 여러 시스템과 여러 단계를 거쳐 렌더링되고 있었습니다. CI (Continuous Integration) 작업이 docutils 스크립트를 실행하여 모든 PEP 파일을 개별적으로 렌더링한 후, 생성된 tar 아카이브를 서버에 업로드하고, 이 아카이브는 python.org 웹사이트에서 주기적으로 검색되어 렌더링되었습니다.

이러한 방식은 python.org 웹사이트가 원시 HTML 업로드를 처리하고 PEP 렌더링을 담당하도록 강제하여, 특정 경우에는 문제 제기 지점을 모호하게 만들었습니다.

이 PEP는 자체 포함된 PEP 렌더링을 위한 명세를 제공하며, 이를 통해 다음과 같은 이점을 얻을 수 있습니다:
*   PEP 지원을 위한 분산된 구성의 양을 줄입니다.
*   PEP를 읽고, 쓰고, 검토하는 사람들을 위한 삶의 질(quality-of-life) 개선을 가능하게 합니다.
*   여러 미해결 문제를 해결하고, 향후 개선을 위한 기반을 마련합니다.
*   자원봉사 유지보수자의 시간을 절약합니다.

PEP는 최상위 도메인인 `peps.python.org`를 통해 접근되며 (예: `peps.python.org/pep-0008`), PEP 렌더링을 지원하는 모든 사용자 정의 도구는 `python/peps` 저장소에서 호스팅될 것을 제안합니다.

## 근거 (Rationale)

### 인프라 단순화 및 중앙 집중화 (Simplifying and Centralising Infrastructure)
2021년 11월 기준으로, PEP 작성자나 편집자가 로컬에서 PEP 파일을 렌더링하려면 `python/peps` 저장소 외부에 존재하는 문서를 따라 python.org 웹사이트의 전체 로컬 인스턴스를 생성하고 여러 분산된 스크립트를 실행해야 했습니다.

이와 대조적으로, 제안된 구현은 단일 `Makefile`과 Python 스크립트를 제공하여 모든 PEP 파일을 렌더링하며, 웹 서버 또는 로컬 파일 시스템을 대상으로 하는 옵션을 제공합니다.

모든 도구를 단일 저장소에 호스팅하면 문제 제기 지점이 명확해져, 문제 분류(triage)에 소요되는 자원봉사 시간을 줄일 수 있습니다. 또한, PEP 렌더링 인프라의 범위가 명확하게 정의되므로, 단순화되고 중앙 집중화된 도구는 추가 개선 사항에 대한 진입 장벽을 낮출 수도 있습니다.

### 삶의 질 개선 및 문제 해결 (Quality-of-Life Improvements and Resolving Issues)
PEP를 읽는 데 필요한 추가 기능에 대한 여러 요청이 있었습니다:
*   구문 강조 (syntax highlighting)
*   `.. code-block::` 지시어 사용
*   SVG 이미지 지원
*   활자체 인용 부호 (typographic quotation marks)
*   추가 푸터 정보 (additional footer information)
*   intersphinx 기능
*   다크 모드 테마 (dark mode theme)

이러한 기능들은 이 제안으로 인한 "쉬운 성공(easy wins)"이며, PEP 사용자 (검토자 및 작성자 포함)의 삶의 질을 향상시킬 것입니다. 예를 들어, 현재 (2021년 11월 기준) 시스템은 주기적으로 실행되어 PEP에 대한 업데이트가 즉시 배포될 수 없어 생산성을 저해했습니다. 참조 구현은 저장소에 대한 모든 커밋에서 모든 PEP를 렌더링하고 게시하여 이 문제를 해결합니다.

참조 구현은 여러 문제를 해결합니다. 예를 들어:
*   `python.org`의 스타일시트가 목록 스타일을 존중하지 않았습니다.
*   PEP 내 이미지 업데이트 지원이 `python.org`에서 어려웠습니다.

Read the Docs 또는 Netlify와 같은 서드파티 제공업체는 Pull Request 자동 렌더링과 같은 기능으로 이러한 경험을 향상시킬 수 있습니다.

## 명세 (Specification)
PEP 파일을 HTML로 렌더링하기 위한 제안된 명세는 참조 구현과 동일합니다.

*   렌더링된 PEP는 `peps.python.org`에서 제공되어야 합니다 (`MUST`).
*   이들은 정적 파일로 호스팅되는 것이 좋으며 (`SHOULD`), CDN (Content Delivery Network) 뒤에 있을 수 있습니다 (`MAY`).
*   Pull Request 미리보기를 렌더링하는 서비스가 제공되어야 합니다 (`SHOULD`). 이 서비스는 호스팅 및 배포 솔루션과 통합될 수 있습니다 (`MAY`).

`python.org` 도메인에 대해 다음 리디렉션 규칙이 생성되어야 합니다 (`MUST`):
*   `/peps/` -> `https://peps.python.org/`
*   `/dev/peps/` -> `https://peps.python.org/`
*   `/peps/(.*)\.html` -> `https://peps.python.org/$1`
*   `/dev/peps/(.*)` -> `https://peps.python.org/$1`

다음 `nginx` 구성으로 이를 달성할 수 있습니다:
```nginx
location ~ ^/dev/peps/?(.*)$ {
    return 308 https://peps.python.org/$1/;
}
location ~ ^/peps/(.*)\.html$ {
    return 308 https://peps.python.org/$1/;
}
location ^/(dev/)?peps(/.*)?$ {
    return 308 https://peps.python.org/;
}
```
이전 버전과의 호환성을 위해 URL fragment를 보존하는 리디렉션이 구현되어야 합니다 (`MUST`).

## 하위 호환성 (Backwards Compatibility)
새로운 정식 URL로의 서버 측 리디렉션 덕분에, 이전에 게시된 자료에서 이전 URL 스키마를 참조하는 링크는 계속 작동합니다. 모든 PEP는 계속해서 올바르게 렌더링되며, 참조 구현의 사용자 정의 스타일시트는 일부 요소 (특히 코드 블록 및 블록 인용)에 대한 표시를 개선합니다. 따라서 이 PEP는 하위 호환성 문제를 일으키지 않습니다.

## 보안 영향 (Security Implications)
`python.org` 메인 웹사이트는 더 이상 원시 HTML 업로드를 처리하지 않아 잠재적인 위협 벡터를 닫습니다. PEP 렌더링 및 배포 프로세스는 최신, 잘 유지보수되는 코드와 안전한 자동화 플랫폼을 사용하여 잠재적인 공격 표면을 더욱 줄입니다. 따라서 부정적인 보안 영향은 없습니다.

## 교육 방법 (How to Teach This)
새로운 정식 URL은 문서에 공개될 것입니다. 그러나 이는 주로 백엔드 인프라 변경이며, 최종 사용자에게 미치는 영향은 최소화되어야 합니다. PEP 1과 PEP 12는 필요에 따라 업데이트될 것입니다.

## 참조 구현 (Reference Implementation)
제안된 구현은 일련의 Pull Request를 통해 `python/peps` 저장소에 병합되었습니다. 이는 사용자 정의 테마 (밝고 어두운 색상 스킴 지원) 및 확장과 함께 Sphinx 문서 시스템을 사용합니다.

이 시스템은 이미 모든 커밋에서 모든 PEP를 자동으로 렌더링하고 `python.github.io/peps`에 게시합니다. 시스템의 상위 수준 문서는 PEP를 로컬에서 렌더링하는 방법과 시스템의 구현에 대해 다룹니다.

## 거부된 아이디어 (Rejected Ideas)
현재 (2021년 11월 기준) 렌더링 프로세스를 수정하여 위에서 언급된 삶의 질 개선 및 문제 완화의 일부를 포함하는 것이 가능했을 것입니다. 그러나 이 방법은 분산된 도구 문제를 해결하지 못할 것이라고 판단되었습니다.

제안된 렌더링 시스템의 출력을 사용하여 `python.org`로 가져오는 것도 가능했을 것입니다. 하지만 이는 많은 복잡성이 추가될 뿐 제거되는 복잡성은 없으므로, 두 가지 경우 중 최악의 시나리오가 될 것이라고 주장되었습니다.

## 감사 (Acknowledgements)
*   Hugo van Kemenade
*   Pablo Galindo Salgado
*   Éric Araujo
*   Mariatta C.A.M. Gerlach

## 각주 (Footnotes)
 예를 들어, pythondotorg#1024, pythondotorg#1038, pythondotorg#1387, pythondotorg#1388, pythondotorg#1393, pythondotorg#1564, pythondotorg#1913
 (1, 2) 요청됨: pythondotorg#1063, pythondotorg#1206, pythondotorg#1638, peps#159, peps#1571의 댓글, peps#1577
 요청됨: peps#701
 요청됨: peps#165
 요청됨: pythondotorg#1564
 요청됨: peps#2의 댓글
 요청됨: python-dev
 2021년 11월 기준, peps#1387, pythondotorg#824, pythondotorg#1556 참조
 구현 PR: peps#1930, peps#1931, peps#1932, peps#1933, peps#1934

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 배포됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.