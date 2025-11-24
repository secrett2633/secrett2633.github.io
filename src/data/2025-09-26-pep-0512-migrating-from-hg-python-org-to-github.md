---
title: "[Final] PEP 512 - Migrating from hg.python.org to GitHub"
excerpt: "Python Enhancement Proposal 512: 'Migrating from hg.python.org to GitHub'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/512/
toc: true
toc_sticky: true
date: 2025-09-26 22:57:36+0900
last_modified_at: 2025-09-26 22:57:36+0900
published: true
---
> **원문 링크:** [PEP 512 - Migrating from hg.python.org to GitHub](https://peps.python.org/pep-0512/)
>
> **상태:** Final | **유형:** Process | **작성일:** 17-Jan-2015



## PEP 512 – hg.python.org에서 GitHub로 마이그레이션



## 요약 (Abstract)
이 PEP는 Python의 개발 프로세스를 `hg.python.org` 에 호스팅되던 Mercurial 에서 GitHub 의 Git 으로 마이그레이션하는 데 필요한 단계들을 설명합니다. 이 PEP의 최소 목표를 달성하면 Python의 개발 프로세스를 현재와 동일한 수준으로 생산적으로 유지할 수 있으며, 확장 목표를 달성하면 현 상태보다 개발 프로세스를 개선할 수 있을 것으로 기대됩니다.

**참고**: CPython의 개발 프로세스는 2017년 2월 10일에 `https://github.com/python/cpython`으로 이전되었습니다.

## 도입 배경 (Rationale)
2014년, Python의 독자적인 개발 프로세스가 병목 현상을 일으키는 것이 명확해졌습니다. 예를 들어, 외부 기여자가 버그 수정을 제출하여 최종적으로 커밋되기까지의 기본적인 단계는 다음과 같았습니다.
*   `bugs.python.org` 에 버그 이슈를 엽니다.
*   `hg.python.org` 에서 CPython 소스 코드를 체크아웃합니다.
*   수정 작업을 수행합니다.
*   패치를 업로드합니다.
*   코어 개발자가 Rietveld 코드 리뷰 도구의 포크를 사용하여 패치를 검토합니다.
*   패치를 다운로드하여 깨끗하게 적용되는지 확인합니다.
*   테스트 스위트를 수동으로 실행합니다.
*   필요에 따라 `NEWS`, `ACKS`, "What's New" 문서를 업데이트합니다.
*   병합 충돌을 피하기 위해 변경 사항을 풀(pull)합니다.
*   수동으로 변경 사항을 커밋합니다.
*   버그 수정 릴리스인 경우, 개발 중인 브랜치로 병합합니다.
*   테스트 스위트를 수동으로 다시 실행합니다.
*   병합을 커밋합니다.
*   변경 사항을 푸시합니다.

이는 코어 개발자에게 매우 번거롭고 수동적인 프로세스였습니다. 이러한 문제로 인해 코어 개발자들이 밀린 작업을 빠르게 처리하지 못해 제출된 패치들이 이슈 트래커에 방치되는 경우가 많았습니다. 이는 결국 외부 기여자들이 관심 부족으로 인해 좌절감을 느끼고 기여 활동을 줄이는 부작용으로 이어졌습니다.

이러한 배경으로 2014년 말, 새로운 개발 프로세스로의 전환이 필요하다는 결정이 내려졌습니다. 새로운 워크플로우를 제안하는 PEP 요청이 있었고, 최종적으로 GitHub 를 제안한 PEP 481과 GitLab 을 제안한 PEP 507 두 가지가 나왔습니다.

2016년 1월 1일, Brett Cannon은 개발 프로세스를 GitHub로 옮기기로 결정했습니다. GitHub를 선택한 주요 이유는 다음과 같습니다.
*   **커스텀 인프라 유지보수 부담**: 유지보수되지 않는 Rietveld 포크와 같은 커스텀 인프라가 자원봉사자들에게 부담이었습니다.
*   **코어 개발자의 시간 소모**: 커스텀 워크플로우는 코어 개발자들에게 많은 시간을 소모하게 했으며, 이를 지원할 자동화된 도구가 부족했습니다.
*   **외부 기여자 진입 장벽**: CPython 고유의 개발 프로세스에 익숙해지는 데 필요한 시간 때문에 외부 기여자들에게 진입 장벽으로 작용했습니다.
*   **GitHub의 익숙함**: GitLab 과 GitHub 간에 오픈소스 여부 외에는 차별점이 없었으며, 코어 개발자와 외부 기여자 모두 GitHub에 대한 익숙함이 훨씬 높았습니다.
*   **BDFL (Guido van Rossum)의 선호**: BDFL이 GitHub를 선호하는 것도 중요한 고려 사항이었습니다.

이 마이그레이션의 궁극적인 목표는 코어 개발자가 태블릿에서 Wi-Fi를 사용하여 브라우저 내에서 외부 기여 제출부터 커밋에 이르는 모든 단계를 처리할 수 있을 정도로 개발 프로세스를 개선하는 것입니다. 또한, 최종 솔루션은 외부 기여자가 GitHub를 사용하지 않기로 선택하더라도 기여할 수 있도록 허용할 것입니다 (기능 동등성은 보장되지 않음).

## 마이그레이션 계획 (Migration Plan)
`hg.python.org` 에 많은 저장소가 호스팅되어 있지만, 다음 다섯 가지 주요 저장소만 이전해야 합니다.
*   `devinabox` (완료)
*   `benchmarks` (건너뜀)
*   `peps` (완료)
*   `devguide` (완료)
*   `cpython`

`devinabox` 저장소는 코드 전용입니다. `peps`와 `devguide` 저장소는 웹페이지 생성과 관련이 있습니다. 그리고 `cpython` 저장소는 `bugs.python.org` 와의 통합을 위한 특별한 요구 사항이 있습니다.

마이그레이션 계획은 위에 언급된 저장소들을 이전하는 데 필요한 사항을 기준으로 섹션별로 나뉩니다. 각 섹션의 요구 사항이 완료되면 관련 저장소의 마이그레이션이 진행될 수 있습니다.

### 코드 전용 저장소 요구 사항 (Requirements for Code-Only Repositories)
이 섹션의 요구 사항이 완료되면 `devinabox` 저장소를 GitHub로 이전할 수 있습니다.

1.  **'Python core' 팀 생성**: 권한 관리를 위해 `python` 조직 의 일부로 'Python core' 팀이 생성됩니다. 이전되는 모든 저장소에는 'Python core' 팀에 쓰기 권한 이 부여됩니다. 이전에 `hg.python.org`에서 SSH 키를 관리할 권한이 있던 모든 사람은 'Python core' 팀의 팀 유지보수자가 됩니다.
2.  **Mercurial 저장소를 Git으로 옮기는 명령 정의**: GitHub로 이동하는 것은 Git 으로 이동하는 것을 의미하므로, Mercurial 저장소를 Git으로 변환하는 데 사용할 도구와 명령을 결정해야 합니다. 이 마이그레이션을 위해 특별히 개발된 도구는 `https://github.com/orsenthil/cpython-hg-to-git`에 호스팅됩니다.
3.  **CLA (Contributor License Agreement) 강제 적용**: 모든 기여자가 기여자 라이선스 계약 (CLA) 에 서명했는지 확인해야 합니다.
    *   **bugs.python.org에 GitHub 사용자명 지원 추가**: CLA 서명 추적은 `bugs.python.org` 사용자 프로필의 일부로 계속됩니다. 기여자가 CLA에 서명하고 GitHub를 통해 기여하려면 GitHub 및 `bugs.python.org` 계정 이 모두 필요합니다.
    *   **CLA 서명을 강제하는 봇**: GitHub 계정과 `bugs.python.org` 계정 간의 연결을 통해, 봇이 GitHub의 Pull Request를 모니터링하고 기여자가 CLA에 서명했는지 여부를 표시할 수 있습니다. CLA가 서명되면 긍정적인 레이블 (예: "CLA signed")을, 서명되지 않았거나 `bugs.python.org` 계정이 없는 경우 부정적인 레이블 (예: "CLA not signed")을 추가하고 Pull Request를 차단합니다. 이 봇은 Heroku 에 호스팅되며, 비동기 프로그래밍의 쇼케이스 역할을 위해 Python 3.5를 대상으로 작성됩니다. 봇의 코드는 Knights Who Say Ni 프로젝트 에 있습니다.
4.  **오래된 저장소 읽기 전용으로 설정**: `.hg/hgrc` 파일의 `[hooks]` 섹션을 업데이트하여 이전 Mercurial 저장소를 읽기 전용으로 만듭니다.

### 웹 관련 저장소 요구 사항 (Requirements for Web-Related Repositories)
웹페이지 생성에 사용되는 `devguide` 및 `peps` 저장소는 새로운 Git 저장소에서 풀(pull)하도록 각 프로세스를 업데이트해야 합니다.

### cpython 저장소 요구 사항 (Requirements for the cpython Repository)
`cpython` 저장소 는 `hg.python.org` 에서 호스팅되는 가장 활발하고 중요한 저장소입니다. 그 중요성과 높은 사용 빈도 때문에, 이 PEP에서 언급된 다른 저장소보다 GitHub로 이동하기 전에 더 많은 도구화가 필요합니다.

1.  **Pull Request 커밋 단계 문서화**: 선형 히스토리가 선호되므로, GitHub Pull Request의 "Merge" 버튼은 squash commits만 수행하도록 설정됩니다. `bugs.python.org` 에 업로드된 패치 파일로부터 기여를 커밋하기 위한 두 번째 추천 명령 세트도 작성될 것입니다.
2.  **Pull Request와 이슈 연결**: Pull Request와 이슈 간의 연관성이 필요합니다. Pull Request의 제목 또는 본문에 이슈 번호가 지정되면 `bugs.python.org` 에서 연결이 생성됩니다.
    *   **커밋이 이루어지면 이슈 알림**: 커밋이 이루어지면 해당 이슈는 이 사실을 반영하도록 업데이트되어야 합니다.
3.  **커밋 ID를 URL로 매핑하는 연결 서비스 업데이트**: `https://hg.python.org/lookup/` 서비스가 Git 저장소로 리디렉션하고 새로운 Git 리비전 ID를 지원하도록 업데이트되어야 합니다.
4.  **`sys._mercurial` 폐기**: Python이 더 이상 Mercurial 에 보관되지 않으면 `sys._mercurial` 속성은 `('CPython', '', '')`를 반환하도록 변경됩니다. 동일한 사용 사례를 충족하는 `sys._git` 속성이 추가될 것입니다.
5.  **devguide 업데이트**: 개발 가이드(devguide)는 새로운 워크플로우의 세부 정보로 업데이트되어야 합니다.
6.  **PEP 101 업데이트**: 릴리스 프로세스가 필요에 따라 업데이트되어야 합니다.

## 선택적/계획된 기능 (Optional, Planned Features)
`cpython` 저장소 가 마이그레이션되면 모든 저장소가 GitHub 로 이전되며 개발 프로세스는 이전과 동일한 수준이 될 것입니다. 그러나 이 마이그레이션의 핵심 이유는 개발 프로세스를 개선하여 이전보다 더 좋게 만드는 것입니다. 이 섹션에서는 개선 계획 중 일부를 설명합니다.

*   **`Misc/NEWS` 처리**: 전통적으로 `Misc/NEWS` 파일 은 여러 Python 릴리스에 걸쳐 변경 사항이 있을 때 문제가 있었습니다. 제안된 접근 방식은 각 뉴스 항목에 대해 개별 파일을 사용하고, 각 기능 릴리스마다 자체 디렉터리를 가지며, 이슈 번호 또는 타임스탬프 값으로 명명된 별도의 파일을 생성하는 것입니다. 이렇게 하면 브랜치 간 병합 시 충돌 문제가 없어지고 변경 사항이 코드와 함께 유지됩니다.
*   **`Misc/ACKS` 처리**: 전통적으로 `Misc/ACKS` 파일 은 수동으로 관리되었습니다. 그러나 Git이 커밋당 author 및 committer 값을 지원하므로, 커밋의 저작권은 코드 자체의 히스토리의 일부가 될 수 있습니다. 따라서 `Misc/ACKS`의 수동 관리는 선택 사항이 됩니다.
*   **`https://git.python.org` 생성**: `hg.python.org` 가 Python의 Mercurial 저장소를 가리키는 것처럼, `git.python.org`도 Git 저장소에 대해 동일한 역할을 해야 합니다.
*   **Pull Request 데이터 백업**: GitHub 가 코드 호스팅 및 코드 리뷰에 사용될 예정이므로, 이 두 가지는 백업되어야 합니다. 코드 리뷰 히스토리의 일일 백업이 수행되어야 합니다.
*   **Cherry-pick Pull Request 생성 봇**: 여러 브랜치에 영향을 미치는 Pull Request에 대해 cherry-picking 기반의 Pull Request를 생성하는 봇이 있으면 편리할 것입니다.
*   **Pull Request 커밋 큐**: 승인된 Pull Request를 선형적으로 적용하고, 테스트 스위트를 실행하여 커밋들이 서로 충돌하지 않는지 확인하는 시스템입니다.
*   **CI (Continuous Integration) 서비스**: GitHub 에 호스팅된 오픈소스 프로젝트에 무료 지원을 제공하는 다양한 CI 서비스 중 Travis 가 선택되었습니다.
*   **테스트 커버리지 보고서**: Python 표준 라이브러리에 대한 최신 테스트 커버리지 보고서를 얻는 것은 매우 유익할 것입니다. Codecov 가 최선의 옵션으로 선택되었습니다.
*   **Pull Request 댓글에 대한 이슈 알림**: `bugs.python.org` 의 이슈에 리뷰 댓글이 남겨질 때 알림을 제공하는 기능입니다.
*   **bugs.python.org에서 GitHub 로그인 제공자로 사용 허용**: `bugs.python.org` 가 GitHub 자격 증명을 사용하여 로그인할 수 있도록 확장하는 것이 좋을 것입니다.
*   **웹 콘텐츠 재생성을 위한 웹 훅 (Web hooks)**: 이 마이그레이션의 일부로 이동될 저장소 중 하나에 보관된 파일에서 파생된 웹 콘텐츠(`docs.python.org`, `docs.python.org/devguide`, `www.python.org/dev/peps/`)의 변경 시 해당 웹 콘텐츠를 재구축하도록 웹 훅을 설정하는 것이 좋습니다.
*   **웹 콘텐츠를 생성된 파일로 다시 연결**: 문서에서 문제를 발견한 사람들이 각 페이지에 GitHub 의 원본 파일로 연결되는 링크를 갖는 것이 도움이 될 것입니다.
*   **문서의 일부를 자체 저장소로 분할**: `docs.python.org` 의 일부 문서는 CPython 코드 자체와 밀접하게 관련되어 있지 않으며, 유지보수와 기여 권한 확대를 위해 자체 저장소로 분할될 수 있습니다.
*   **Git 저장소 백업**: 재난 방지를 위해 다양한 Git 저장소의 공식 백업을 갖는 것이 좋을 것입니다.
*   **잠재적 신규 코어 개발자 식별**: 패치 수락률을 추적하고 보고서를 생성하여 코어 개발자가 될 자격이 있는 기여자를 식별하는 봇을 작성할 수 있습니다.

## 현황 (Status)
이 PEP는 `Final` 상태입니다.
(2017년 2월 10일 CPython 개발 프로세스는 GitHub로 이전 완료)

### `cpython` 저장소
*   **필수 요구사항**: 대부분 완료되었거나 진행 중입니다.
    *   `PEP 101` 업데이트 (미시작)
    *   `sys._mercurial` 폐기 (진행 중)
    *   커밋 ID를 URL로 매핑하는 연결 서비스 업데이트 (진행 중)
    *   나머지 사항들은 완료되었습니다.
*   **선택적 기능**: 많은 부분이 미시작이거나 진행 중입니다.
    *   CI 서비스, 테스트 커버리지 보고서, 웹 콘텐츠 파일 연결, `Misc/NEWS` 처리, cherry-pick PR 생성 봇, `.github/CONTRIBUTING.md` 작성 등은 완료되었습니다.

## 미해결 문제 (Open Issues)
이 PEP에서 미해결 문제란 문제에 접근하거나 해결하는 방법에 대한 결정이 필요한 사안을 의미합니다.

*   **`hg.python.org`의 운명**: 코드 저장소가 Git 으로 이동함에 따라 `hg.python.org` 를 계속 실행할 기술적 필요는 없습니다. 그러나 일부 커뮤니티 구성원은 Git 저장소의 Mercurial 미러로 유지되기를 원하고 있습니다. 유지보수가 필수는 아니므로, PSF 인프라 위원회에서 유지 여부를 결정할 것입니다.
*   **`cpython`에 Pull Request를 커밋하기 위한 Git CLI 명령**: Git 이 코어 개발자에게 새로운 버전 관리 시스템일 수 있으므로, 실행해야 할 명령을 문서화해야 합니다. 이 명령들은 Pull Request 작성자에게 적절한 기여를 부여하면서 선형 히스토리를 유지해야 합니다. `bugs.python.org` 에 업로드된 패치 파일로 작업할 때 필요한 다른 명령 세트도 필요합니다.
*   **봇 이름 지정**: 봇의 최종 이름은 Brett Cannon이 Monty Python 에서 따와서 선택할 것입니다.

## 기각된 아이디어 (Rejected Ideas)
*   **Python 2와 Python 3 저장소 분리**: 전체 저장소 크기를 줄여 인터넷 연결이 느린 사용자에게 이점을 줄 수 있다는 논의가 있었지만, CPython의 모든 히스토리를 단일 저장소에 유지하는 것이 물류적으로 더 쉽다고 결정되었습니다.
*   **버그 수정 브랜치에 다중 릴리스 변경 사항 먼저 커밋**: 가장 오래된 브랜치에 먼저 커밋하고 기본 브랜치로 병합하는 기존 워크플로우를 유지할지 여부가 논의되었으나, 최신 브랜치에 커밋한 다음 이전 브랜치로 변경 사항을 cherry-pick하는 것이 가장 효과적이라고 결정되었습니다. 이는 대부분의 사람들이 본능적으로 최신 브랜치에서 작업하고, Git 사용 시 더 일반적인 워크플로우이기 때문입니다.
*   **커밋 로그에서 `Misc/NEWS` 파생**: 커밋 메시지의 첫 줄을 뉴스 항목으로 사용하는 방안이 제안되었지만, 일부 코어 개발자들이 커밋 메시지와 별도로 뉴스 항목을 작성하는 것을 선호하여 기각되었습니다.
*   **`bugs.python.org`에서 `Misc/NEWS` 파생**: `bugs.python.org` 에서 뉴스 항목을 지정하는 해결책도 기각되었습니다. 이 방법은 뉴스 항목이 실제 변경 사항을 만든 커밋과 분리되어 있어 커밋 후 `bugs.python.org`로 돌아가 뉴스 항목을 추가해야 하는 불편함이 있었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.