---
title: "[Active] PEP 545 - Python Documentation Translations"
excerpt: "Python Enhancement Proposal 545: 'Python Documentation Translations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/545/
toc: true
toc_sticky: true
date: 2025-09-26 23:33:31+0900
last_modified_at: 2025-09-26 23:33:31+0900
published: true
---
> **원문 링크:** [PEP 545 - Python Documentation Translations](https://peps.python.org/pep-0545/)
>
> **상태:** Active | **유형:** Process | **작성일:** 04-Mar-2017

## PEP 545 – Python 문서 번역 (Python Documentation Translations)

### 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 기존의 파이썬(Python) 문서 번역본에 대한 접근성과 발견 가능성을 높이는 것을 목표로 합니다. 이를 통해 새로운 번역가와 번역 작업 유입을 유도하고자 합니다. 번역된 문서는 `python.org`에서 호스팅될 예정이며, 현재 프랑스어(`docs.python.org/fr/`) 및 일본어(`docs.python.org/ja/`) 번역 팀이 활발하게 활동하고 있습니다. `docs.python.org/en/`는 `docs.python.org/`로 리디렉션됩니다. 번역된 문서의 소스(source)는 GitHub의 Python 조직(`https://github.com/python/`)에서 호스팅됩니다. 기여자들은 '문서 기여 동의서 (Documentation Contribution Agreement)'에 동의해야 합니다.

### 동기 (Motivation)
프리노드(freenode)의 프랑스어 `#python-fr` IRC 채널에서는 영어를 구사하지 못해 파이썬 공식 문서를 읽을 수 없는 사람들을 종종 만날 수 있습니다. 파이썬은 모든 사용자가 어떤 언어로든 폭넓게 사용할 수 있기를 바라며, 이는 파이썬 3이 비 ASCII 식별자(identifier)를 지원하는 이유이기도 합니다 (PEP 3131).

현재 최소 4개 그룹(프랑스어, 일본어, 스페인어, 헝가리어)이 자국어로 파이썬 문서를 번역하고 있지만, 이들의 번역본은 `d.p.o`(docs.python.org)에서 볼 수 없습니다. 러시아어, 중국어, 한국어 등 덜 가시적이고 덜 조직적인 그룹들도 문서를 번역하고 있으며, 아직 발견되지 않은 다른 그룹들도 있을 수 있습니다. 이 PEP는 번역본을 `docs.python.org`로 옮겨 개발자, 신규 사용자, 잠재적 번역가들이 쉽게 찾을 수 있도록 하는 규칙을 정의합니다.

2017년 3월 기준으로 일본어 팀은 문서의 약 80%를 번역했으며, 프랑스어 팀은 약 20%를 번역했습니다. 프랑스어 번역은 2016년에 6%에서 23%로 증가했으며, 7명의 기여자가 참여하여 번역 팀이 문서 변경 속도보다 빠를 수 있음을 입증했습니다.

중국어 번역에 대해 Xiang Zhang은 다음과 같이 언급했습니다: "여러 그룹이 공식 문서의 일부를 번역하려고 시도하는 것을 보았지만, 그들의 노력은 흩어지고 쉽게 잊혀집니다. 이는 그들이 단일한 공동의 결과물을 향해 조직적으로 작업하지 않고, 그 결과물이 웹 어디에나 보관되어 찾기 어렵기 때문입니다. 공식적인 지원이 이러한 어려움을 덜어줄 수 있을 것입니다."

### 근거 (Rationale)

#### 번역 (Translation)

##### 이슈 트래커 (Issue tracker)
번역과 관련된 이슈는 해당 번역 언어로 작성될 수 있으므로, CPython 이슈 트래커에 두어서는 안 됩니다. 모든 번역은 자체 GitHub 프로젝트를 가져야 하므로 (PO 파일용 저장소 참조), 해당 GitHub 이슈 트래커를 사용해야 합니다. 번역 이슈로 인한 혼란을 줄이기 위해 언어 팀 코디네이터는 이슈 트래커 분류를 도와야 합니다.

##### 브랜치 (Branches)
번역 팀은 최신 안정 버전에 집중해야 하며, 한 브랜치에서 완료된 번역을 다른 브랜치로 자동으로 전파하는 도구(스크립트, 번역 메모리 등)를 사용해야 합니다.

*   **번역 메모리:** 이전에 번역된 단락, 심지어 삭제된 단락까지 포함하는 일종의 데이터베이스입니다. Sphinx 국제화(Internationalization)도 참조하십시오.
*   현재 가장 최신 안정 브랜치(stable branch)가 번역되고, 이 번역본은 다른 브랜치로 전파될 수 있습니다.
*   개발 브랜치(`main`)는 안정 브랜치보다 번역 우선순위가 낮지만, `docsbuild-scripts`는 이를 빌드해야 다음 릴리스를 위해 팀이 작업할 수 있도록 합니다.

#### 호스팅 (Hosting)

##### 도메인 이름, 콘텐츠 협상 및 URL (Domain Name, Content negotiation and URL)
다른 번역본들은 다음 중 하나를 변경하여 식별할 수 있습니다: 국가 코드 최상위 도메인(CCTLD), 경로 세그먼트, 서브도메인 또는 콘텐츠 협상.

*   **CCTLD 사용:** 비용이 많이 들고 시간이 소요되며, 이미 등록된 경우 거의 불가능할 수 있으므로 피해야 합니다.
*   **서브도메인 사용 (`es.docs.python.org` 또는 `docs.es.python.org`):** 혼란스러울 수 있으며, 서브도메인에 하이픈(hyphen)을 사용하는 것은 드물고 SEO에 부정적인 요소로 작용할 수 있습니다. RFC 1123에 따라 서브도메인에 언더스코어(underscore) 사용은 금지됩니다. 또한, 서브도메인마다 TLS 인증서를 생성해야 하므로 유지보수가 늘어나고, 언어 전환기(language switcher)에서 문제가 발생할 수 있습니다.
*   **콘텐츠 협상 (Content negotiation) (`Accept-Language` HTTP 헤더):** 사용자가 언어를 쉽게 변경할 수 없어 사용자 경험이 좋지 않습니다. Mozilla에 따르면, 이 헤더는 서버가 특정 URL과 같이 명시적인 사용자 결정에 의해 제어되는 다른 방법으로 언어를 결정할 방법이 없을 때 사용되는 힌트입니다.
*   **URL 경로 사용 (`docs.python.org/de/` 또는 `docs.python.org/pt-BR/`):** 가독성이 좋고, 언어 간 쉬운 전환을 허용하며, 하이픈을 잘 받아들입니다.

버전과 마찬가지로, Sphinx는 여러 언어에 대한 컴파일을 지원하지 않으므로, 버전과 동일하게 경로 아래에 전체 빌드를 가질 것입니다.

따라서 `docs.python.org/LANGUAGE_TAG/VERSION/` 패턴을 사용해야 합니다. 예를 들어, `docs.python.org/de/3.6/`와 같이 `LANGUAGE_TAG`가 먼저 오고 `VERSION`이 뒤에 오는 방식이 더 명확합니다. 기존 문서는 `/en/`으로 이동하지 않고, `docs.python.org/en/`는 `docs.python.org`로 리디렉션됩니다.

##### 언어 태그 (Language Tag)
언어 태그에 대한 일반적인 표기법은 ISO 639 기반의 IETF 언어 태그입니다. `gettext`는 태그를 결합하기 위해 대시(dash, `-`) 대신 언더스코어(underscore, `_`)를 사용하지만 (예: `pt_BR`), URL에서는 대시가 더 흔하므로 IETF 언어 태그를 사용해야 합니다. URL에서는 대문자 사용이 흔치 않고 가독성을 해칠 수 있으므로 `pt-br`과 같은 소문자 태그를 사용해야 합니다. `de-DE` 또는 `fr-FR`과 같이 지역 서브태그(region subtag)가 구별되는 정보를 추가하지 않는 경우 생략할 수 있지만, `pt-BR`과 같이 정보가 추가되는 경우 유지해야 합니다.

따라서 `/fr/`, `/pt-br/`, `/de/` 등과 같이 소문자의 IETF 언어 태그를 사용해야 합니다.

##### 번역 가져오기 및 빌드 (Fetching And Building Translations)
현재 `docsbuild-scripts`가 문서를 빌드하는데, 이 스크립트들은 번역본을 가져오고 빌드하도록 수정되어야 합니다. 새로운 언어 빌드와 언어 전환기에 추가하는 두 단계는 개별적으로 설정 가능해야 합니다. 번역 저장소에서는 `docsbuild-script`가 `.po` 파일만 열어야 합니다.

#### 커뮤니티 (Community)

##### 메일링 리스트 (Mailing List)
`doc-sig` 메일링 리스트는 번역된 문서에 대한 언어 간 변경 사항을 논의하는 데 사용될 것입니다. `i18n-sig` 리스트도 있지만, 이는 파이썬 문서 번역보다는 국제화 API에 더 중점을 둡니다.

##### 채팅 (Chat)
파이썬 커뮤니티가 IRC에서 활발하므로, 메일링 리스트 이름과의 일관성을 위해 `freenode`에 `#python-doc`이라는 새로운 IRC 채널을 생성해야 합니다. 각 언어 코디네이터는 자체 팀을 조직할 수 있으며, 필요에 따라 다른 채팅 시스템을 선택할 수도 있습니다.

##### PO 파일용 저장소 (Repository for PO Files)
각 번역 팀이 다른 번역 도구를 사용하고, 해당 도구가 Git과 쉽게 동기화되어야 하므로, 모든 번역은 Git 저장소를 통해 `.po` 파일을 노출해야 합니다. 파이썬이 GitHub로 마이그레이션했으므로 번역본도 GitHub에서 호스팅됩니다.

일관성과 발견 가능성을 위해 모든 번역은 동일한 GitHub 조직에 있어야 하며, 공통 패턴에 따라 이름이 지정되어야 합니다. 공식적인 번역을 원하므로, 파이썬 GitHub 조직의 프로젝트로 호스팅되어야 합니다. 번역 저장소는 경로에 사용된 언어 태그를 사용하여 `python-docs-LANGUAGE_TAG`로 명명해야 합니다 (중복되는 지역 서브태그 없이, 대시를 사용하며, 소문자로). `docsbuild-scripts`는 Python 조직 외부 또는 잘못된 이름의 저장소에서 가져오는 것을 거부하여 이 규칙을 강제할 수 있습니다.

버전은 다른 저장소, 다른 디렉토리 또는 다른 브랜치에 호스팅될 수 있습니다. 브랜치를 사용하여 버전을 분리하는 것이 일반적이고 자연스러우므로 브랜치를 사용해야 합니다.

##### 번역 도구 (Translation tools)
대부분의 번역 작업은 Transifex에서 이루어집니다. 향후 `https://pontoon.mozilla.org/` 및 `http://zanata.org/`와 같은 다른 도구도 사용될 수 있습니다.

##### `python-docs-translations`
`python-docs-translations` GitHub 조직은 번역 대시보드와 같은 여러 유용한 번역 도구의 본거지입니다.

##### 문서 기여 동의서 (Documentation Contribution Agreement)
문서는 아이디어 표현에 창의성이 포함되므로 번역가로부터 라이선스를 요구합니다. 여러 해결책이 있지만, PSF의 Van Lindberg는 "문서는 저작권을 양도하거나 CC0 하에 있어야 한다. 관대한 소프트웨어 라이선스(Apache 또는 MIT와 같은)도 가능하지만, 작업에 완벽하게 적합하지는 않다. 번역가는 동의서에 서명하거나 번역과 함께 라이선스 선언을 제출해야 한다. 프로젝트 페이지에 정의된 라이선스 하에 기여하도록 사람들을 초대하고, 기여 행위로 수락을 정의해야 한다."고 언급했습니다.

'문서 기여 동의서'를 갖는 것이 가장 간단한 방법으로 보입니다.

##### 언어 팀 (Language Team)
각 언어 팀은 다음을 책임지는 한 명의 코디네이터를 두어야 합니다:
*   팀 관리.
*   팀이 사용할 도구(채팅, 메일링 리스트 등) 선택 및 관리.
*   기여자(contributor)가 문서 기여 동의서에 동의했는지 확인.
*   품질(문법, 어휘, 일관성, 스팸, 광고 필터링 등) 보장.
*   이슈 트래커에 게시된 이슈를 해당 언어의 올바른 GitHub 이슈 트래커로 리디렉션.

### 대안 (Alternatives)

#### 간소화된 영어 (Simplified English)
위키백과에서 했던 것처럼, `python-dev`에서 논의되었듯이 영어 학습자와 어린이를 대상으로 '간소화된 영어' 버전을 도입하는 것도 가능합니다.
*   **장점:** 이론적으로 모든 사람이 읽을 수 있고 현재 관리자가 검토할 수 있는 단일 번역본을 생성합니다.
*   **단점:** 미묘한 세부 사항이 손실될 수 있으며, 위키백과에서 언급했듯이 영어에서 영어로 번역할 번역가를 찾기 어려울 수 있습니다.

### 변경 사항 (Changes)

#### 문서 기여 동의서 확보 (Get a Documentation Contribution Agreement)
문서 기여 동의서는 PSF(Python Software Foundation)에서 작성해야 하며, `https://www.python.org/psf/contrib/`에 목록화되고 `https://www.python.org/psf/contrib/doc-contrib-form/`와 같은 자체 페이지를 가져야 합니다.

#### GitHub 저장소 마이그레이션 (Migrate GitHub Repositories)
이 PEP의 작성자들은 이미 프랑스어 및 일본어 Git 저장소를 소유하고 있으므로, 이를 Python 문서 조직으로 옮기는 것은 문제가 되지 않을 것입니다. 하지만 새로운 번역 절차를 따를 것입니다.

#### 문서 기여 동의서를 위한 GitHub 봇 설정 (Setup a GitHub bot for Documentation Contribution Agreement)
GitHub 기여자가 문서 기여 동의서에 서명했는지 확인하기 위해, 마이그레이션된 저장소에 이 동의서에 맞게 사용자 정의된 "The Knights Who Say Ni" GitHub 봇을 설정할 수 있습니다.

#### `docsbuild-scripts` 패치하여 번역 컴파일 (Patch docsbuild-scripts to Compile Translations)
`docsbuild-scripts`는 다음을 수행하도록 패치되어야 합니다:
*   빌드할 브랜치와 함께 빌드할 언어 태그 목록화.
*   언어 전환기에 표시할 언어 태그 목록화.
*   `github.com:python/python-docs-{language_tag}.git` 형식으로 번역 저장소 찾기 (PO 파일용 저장소 참조).
*   각 브랜치와 각 언어에 대한 번역 빌드.
*   패치된 `docsbuild-scripts`는 번역 저장소에서 `.po` 파일만 열어야 합니다.

#### 개발 가이드에 코디네이터 목록 추가 (List coordinators in the devguide)
개발 가이드에 코디네이터 빈 목록이 있는 페이지 또는 섹션을 추가하고, 각 새로운 코디네이터는 이 목록에 추가될 것입니다.

#### Sphinx 문서 언어 전환기 생성 (Create sphinx-doc Language Switcher)
버전 전환기와 매우 유사하게, 언어 전환기를 구현해야 합니다. 이 언어 전환기는 특정 언어를 숨기거나 표시하도록 설정 가능해야 합니다.

언어 전환기는 현재 버전 전환기가 하는 것처럼 경로에 언어 세그먼트를 업데이트하거나 추가하기만 하면 됩니다. 버전 전환기와 달리, 대상 페이지는 항상 존재하므로 (번역은 페이지를 추가하거나 제거하지 않음) 사전 검사(preflight)는 필요하지 않습니다. 번역되지 않은 (하지만 존재하는) 페이지는 여전히 존재하며, 번역되지 않았거나 모호한 번역의 렌더링 개선을 참조하여 그렇게 렌더링되어야 합니다.

#### Sphinx 문서 버전 전환기 업데이트 (Update sphinx-doc Version Switcher)
`version_switch.js`의 버전 전환기에 있는 `patch_url` 함수는 경로에 언어 세그먼트의 존재를 이해하고 허용하도록 업데이트되어야 합니다.

#### 번역되지 않았거나 모호한 번역의 렌더링 개선 (Enhance Rendering of Untranslated and Fuzzy Translations)
이는 열려 있는 Sphinx 이슈이지만, 필요하므로 이 작업을 진행해야 할 것입니다. 번역된, 모호한(fuzzy), 그리고 번역되지 않은 단락은 구별되어야 합니다. (모호한 단락은 독자에게 자신이 읽고 있는 내용이 오래되었을 수 있음을 알려야 합니다).

### 새로운 번역 절차 (New Translation Procedure)

#### 코디네이터 지정 (Designate a Coordinator)
첫 번째 단계는 코디네이터를 지정하는 것입니다 (언어 팀 참조). 코디네이터는 CLA(Contributor License Agreement)에 서명해야 합니다. 코디네이터는 개발 가이드의 번역 코디네이터 목록에 추가되어야 합니다.

#### GitHub 저장소 생성 (Create GitHub Repository)
Python GitHub 조직에 `python-docs-{LANGUAGE_TAG}` (IETF 언어 태그, 중복되는 지역 서브태그 없이, 대시를 사용하며, 소문자로) 이름의 저장소를 생성하고 (PO 파일용 저장소 참조), 언어 코디네이터에게 이 저장소에 대한 푸시 권한을 부여합니다.

#### 문서 기여 동의서 설정 (Setup the Documentation Contribution Agreement)
README 파일은 다음 문서 기여 동의서를 명확하게 보여야 합니다:
> **번역 라이선스 관련 참고 사항:** Python 문서는 전 세계 자원봉사자 네트워크를 통해 유지보수됩니다. Transifex, GitHub 및 기타 공개 장소에 이 프로젝트를 게시하고 참여를 요청함으로써, 귀하가 Python 문서 개선 또는 Python 문서 번역을 CC0 라이선스(`https://creativecommons.org/publicdomain/zero/1.0/legalcode`_) 하에 PSF가 사용할 수 있도록 제공하는 데 동의하는 계약을 제안합니다. 그 대가로 귀하는 자신이 기여한 번역 부분에 대해 공개적으로 공로를 주장할 수 있으며, 귀하의 번역이 PSF에 의해 수락되면 Misc/ACKS 또는 TRANSLATORS 파일에 적절한 주석을 포함하는 패치(patch)를 제출할 수 있습니다(필수 아님). 이 문서 기여 동의서의 어떤 내용도 PSF가 귀하의 텍스트 기여를 통합할 의무를 지우지는 않지만, Python 커뮤니티에 대한 귀하의 참여는 환영하고 감사합니다. 귀하는 문서에 포함하기 위해 PSF에 귀하의 작업을 제출함으로써 이 동의서에 대한 수락을 표명합니다.

#### `docsbuild-scripts`에 번역 지원 추가 (Add support for translations in docsbuild-scripts)
번역이 첫 커밋(commit)에 도달하는 즉시, `docsbuild-scripts` 구성을 업데이트하여 번역을 빌드합니다 (단, 언어 전환기에는 표시하지 않음).

#### 언어 전환기에 번역 추가 (Add Translation to the Language Switcher)
번역이 다음을 충족하는 즉시 언어 전환기에 추가될 수 있습니다:
*   `bugs.html` 100% 완료, 언어 저장소 이슈 트래커에 대한 적절한 링크 포함.
*   튜토리얼(tutorial) 100% 완료.
*   라이브러리/함수(builtins) 100% 완료.

### 이전 논의 (Previous Discussions)
*   [Python-ideas] 문서 번역 교차 링크 (2016년 1월)
*   [Python-Dev] 번역된 Python 문서 (2016년 2월)
*   [Python-ideas] `https://docs.python.org/fr/`? (2016년 3월)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.