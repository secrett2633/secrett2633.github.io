---
title: "[Final] PEP 374 - Choosing a distributed VCS for the Python project"
excerpt: "Python Enhancement Proposal 374: 'Choosing a distributed VCS for the Python project'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/374/
toc: true
toc_sticky: true
date: 2025-09-26 20:59:02+0900
last_modified_at: 2025-09-26 20:59:02+0900
published: true
---
> **원문 링크:** [PEP 374 - Choosing a distributed VCS for the Python project](https://peps.python.org/pep-0374/)
>
> **상태:** Final | **유형:** Process | **작성일:** 07-Nov-2008


## PEP 374 – Python 프로젝트를 위한 분산 VCS 선택

**작성자:** Brett Cannon, Stephen J. Turnbull, Alexandre Vassalotti, Barry Warsaw, Dirkjan Ochtman
**상태:** Final
**유형:** Process
**생성일:** 2008년 11월 7일
**개정 이력:** 2008년 11월 7일, 2009년 1월 22일

### 목차
- 배경 (Rationale)
- 용어 (Terminology)
- 일반적인 워크플로 (Typical Workflow)
- 후보 (Contenders)
- 상호 운용성 (Interoperability)
- 사용 시나리오 (Usage Scenarios)
    - 초기 설정 (Initial Setup)
    - 일회성 체크아웃 (One-Off Checkout)
    - 변경 사항 되돌리기 (Backing Out Changes)
    - 패치 검토 (Patch Review)
    - 백포트 (Backport)
    - 새로운 기능의 협업 개발 (Coordinated Development of a New Feature)
    - 이슈 의존성 분리 (Separation of Issue Dependencies)
    - Python 릴리스 수행 (Doing a Python Release)
- 플랫폼/도구 지원 (Platform/Tool Support)
    - 운영체제 (Operating Systems)
    - CRLF -> LF 지원 (CRLF -> LF Support)
    - 대소문자 구분 없는 파일 시스템 지원 (Case-insensitive filesystem support)
    - 도구 (Tools)
- Subversion 위에 DVCS 사용 (Usage On Top Of Subversion)
- 서버 지원 (Server Support)
- 개발 (Development)
- 특별 기능 (Special Features)
- 테스트/인상 (Tests/Impressions)
    - 진입 장벽 (Barrier to Entry)
    - 기본 정보 기능 성능 (Performance of basic information functionality)
    - 내장 도움말에서 명령어 찾기 (Figuring out what command to use from built-in help)
    - 체크아웃 업데이트 (Updating a checkout)
- 결정 (Decision)
    - Subversion 대신 Mercurial을 선택한 이유 (Why Mercurial over Subversion)
    - 다른 DVCS 대신 Mercurial을 선택한 이유 (Why Mercurial over other DVCSs)
- 전환 계획 (Transition Plan)
- 저작권 (Copyright)

---

### 배경 (Rationale)

Python은 수년간 중앙 집중식 버전 관리 시스템(VCS; 처음에는 CVS, 현재는 Subversion)을 매우 효과적으로 사용해왔습니다. Python 공식 버전의 마스터 카피(master copy)를 가지고 있음으로써 사람들은 항상 공식 Python 소스 코드를 얻을 수 있는 단일한 장소를 가질 수 있었습니다. 또한 언어의 역사 기록을 저장할 수 있게 해주었으며, 주로 개발에 도움이 되고, 또한 후세를 위해서도 중요했습니다. 그리고 물론 VCS의 'V'는 개발 시 매우 유용합니다.

그러나 중앙 집중식 버전 관리 시스템에는 단점이 있습니다. 무엇보다도, Python과 함께 버전 관리의 이점을 원활하게 누리려면 "코어 개발자"(즉, Python 마스터 카피에 커밋 권한이 있는 사람)여야 합니다. 코어 개발자가 아니지만 Python의 리비전 트리(revision tree)로 작업하기를 원하는 사람들, 예를 들어 Python을 위한 패치를 작성하거나 사용자 지정 버전을 만드는 사람들은 리비전에 대한 직접적인 도구 지원을 받지 못합니다. 이는 상당한 제약이 될 수 있는데, 이러한 비코어 개발자들은 이전에 저장된 상태로 변경 사항을 되돌리거나, 브랜치를 생성하거나, 전체 리비전 이력을 포함하여 자신의 변경 사항을 게시하는 등의 기본적인 작업을 쉽게 수행할 수 없기 때문입니다. 비코어 개발자에게 있어 마지막 안전한 트리 상태는 Python 개발자들이 설정한 상태이며, 이는 안전한 개발을 방해합니다. 이러한 "이등 시민" 대우는 복잡한 패치로 Python에 기여하고 싶어 하는 사람들에게 개발 과정을 더 쉽게 만들기 위해 점진적으로 진행 상황을 저장할 방법을 원하는 사람들에게는 걸림돌입니다.

또한 작업 내용을 커밋(commit)하기 위해 온라인 상태여야 한다는 문제가 있습니다. 중앙 집중식 VCS는 모든 리비전을 저장하는 중앙 카피를 유지하므로, 리비전을 저장하려면 인터넷 접속이 필요합니다. 인터넷이 없으면 커밋도 할 수 없습니다. 이는 여행 중이거나 인터넷 연결이 없을 때 불편할 수 있습니다. 또한 Python에 기여하고 싶지만 인터넷 연결이 좋지 않아 커밋에 시간이 많이 걸리고 비용이 많이 들며 단일 단계로 작업을 처리하는 것이 더 나은 상황도 있습니다.

중앙 집중식 VCS의 또 다른 단점은 개발자가 검토 의견에 따라 패치를 수정하는 것이 일반적인 사용 사례라는 것입니다. 이는 중간 작업 내용을 담을 공간이 없으므로 중앙 집중식 모델에서는 더 어렵습니다. 모든 작업이 체크인(check-in)되거나 아무것도 체크인되지 않는 방식입니다. 중앙 집중식 VCS에서는 기능(feature) 또는 버그 수정(bug fix) 브랜치에서 작업하는 동안 트렁크(trunk)에 커밋되는 변경 사항을 추적하는 것도 매우 어렵습니다. 이로 인해 이러한 브랜치가 오래되거나, 구식이 되거나, 트렁크로 병합할 때 너무 많은 충돌이 발생하여 쉽게 해결하기 어려울 위험이 커집니다.

마지막으로, Python 유지 관리 문제가 있습니다. 항상 최소한 하나의 주요 Python 버전이 개발 중입니다 (이 글을 쓰는 시점에는 두 개가 있습니다). 개발 중인 각 주요 Python 버전마다 최소한 마지막 마이너 버전의 유지 관리 버전과 개발 중인 마이너 버전이 있습니다 (예: 2.6이 막 릴리스되었을 때, 2.6과 2.7 모두 작업 중이었습니다). 릴리스가 완료되면 코드 베이스 사이에 브랜치가 생성되어 한 버전의 변경 사항이 다른 버전에 속하지 않지만 (속할 수도 있지만) 않습니다. 현재로서는 중앙 집중식 VCS에서 이러한 시간적 브랜치에 대한 자연스러운 지원이 없습니다. 브랜칭을 시뮬레이션하는 도구를 사용해야 합니다. 병합(merge) 추적도 개발자에게는 마찬가지로 고통스럽습니다. 리비전은 종종 네 개의 활성 브랜치(예: 2.6 유지 관리, 3.0 유지 관리, 2.7 개발, 3.1 개발) 사이에서 병합되어야 하기 때문입니다. 이 경우 Subversion과 같은 VCS는 아케인(arcane) 타사 도구를 통해서만 이를 처리합니다.

분산 VCS (DVCS)는 이러한 모든 문제를 해결합니다. 리비전 트리의 마스터 카피를 유지할 수 있지만, 누구나 자신의 용도로 해당 트리를 자유롭게 복사할 수 있습니다. 이는 모든 사람에게 온라인 또는 오프라인에서 자신의 카피에 변경 사항을 커밋할 수 있는 권한을 부여합니다. 또한 유지 관리 및 Python을 위한 새로운 기능 개발을 위한 리비전 트리 이력의 브랜칭 개념과 더욱 자연스럽게 연결됩니다. DVCS는 또한 중앙 집중식 VCS가 제공하지 않거나 제공할 수 없는 많은 추가 기능을 제공합니다.

이 PEP는 위에서 설명한 이점을 얻기 위해 Python의 Subversion 사용을 현재 인기 있는 DVCS 중 하나로 변경할 가능성을 탐색합니다. 이 PEP는 이 PEP가 끝날 때 DVCS로의 전환이 발생할 것이라고 보장하지 않습니다. 명확한 승자가 발견되지 않아 svn이 계속 사용될 가능성도 충분히 있습니다. 이러한 경우, DVCS의 상태가 진화함에 따라 이 PEP는 미래에 재검토되고 수정될 것입니다.

### 용어 (Terminology)

공통 용어에 동의하는 것은 놀라울 정도로 어렵습니다. 주로 각 VCS가 미묘하게 다른 작업, 객체 및 개념을 설명할 때 이러한 용어를 사용하기 때문입니다. 가능한 경우, 개념에 대한 일반적인 정의를 제공하려고 노력했지만, 자세한 내용은 각 시스템의 용어집을 참조해야 합니다. 다음은 각 VCS에 대한 표준 웹 기반 참조에서 가져온 용어에 대한 몇 가지 기본 참조입니다. 각 DVCS의 용어집도 참조할 수 있습니다:

- **Subversion**: http://svnbook.red-bean.com/en/1.5/svn.basic.html
- **Bazaar**: http://bazaar-vcs.org/BzrGlossary
- **Mercurial**: http://www.selenic.com/mercurial/wiki/index.cgi/UnderstandingMercurial
- **git**: http://book.git-scm.com/1_the_git_object_model.html

주요 용어는 다음과 같습니다:
- **branch (브랜치)**: 개발 라인; 시간 순서로 정렬된 리비전(revision)들의 모음.
- **checkout/working copy/working tree (체크아웃/작업 복사본/작업 트리)**: 개발자가 편집할 수 있고 브랜치에 연결된 코드 트리.
- **index (인덱스)**: 리비전이 구축되는 "스테이징 영역"(git에만 해당).
- **repository (저장소)**: 브랜치로 구성된 리비전들의 모음.
- **clone (클론)**: 브랜치 또는 저장소의 완전한 복사본.
- **commit (커밋)**: 저장소에 리비전을 기록하는 것.
- **merge (병합)**: 한 브랜치/저장소의 모든 변경 사항과 이력을 다른 브랜치/저장소에 적용하는 것.
- **pull (풀)**: 원격 또는 로컬일 수 있는 원래 브랜치/저장소에서 체크아웃/클론을 업데이트하는 것.
- **push/publish (푸시/퍼블리시)**: 한 저장소에서 다른 저장소로 리비전과 해당 리비전에 의존하는 모든 리비전을 복사하는 것.
- **cherry-pick (체리 픽)**: 한 브랜치에서 하나 이상의 특정 리비전을 다른 브랜치로 병합하는 것. 이는 다른 저장소에 있을 수도 있고, 해당 리비전의 종속 리비전 없이도 가능.
- **rebase (리베이스)**: 브랜치를 "분리"하여 새로운 브랜치 지점으로 이동시키는 것; 커밋이 발생한 시간적 위치 대신 브랜치의 시작점으로 커밋을 이동시키는 것.

### 일반적인 워크플로 (Typical Workflow)

현재 Python 코어 개발자의 일반적인 워크플로는 다음과 같습니다:
1. 체크아웃(checkout)에서 코드를 편집하여 커밋/푸시하기에 충분히 안정될 때까지 작업.
2. 마스터 저장소에 커밋.

이는 상당히 간단한 워크플로이지만 단점이 있습니다. 하나는 저장소와 관련된 모든 작업이 네트워크 때문에 시간이 걸리므로, 커밋/푸시가 가능한 한 원자적(atomic)이지 않을 수 있다는 것입니다. 또한 체크아웃 디렉토리의 재귀적 복사 외에 새로운 체크아웃을 생성하는 데 비용이 저렴한 방법이 반드시 없다는 단점도 있습니다.

DVCS는 다음과 같은 워크플로로 이어질 수 있습니다:
1. 마스터 저장소의 로컬 클론(local clone)에서 브랜치(branch)를 생성.
2. 원자적인 단위로 코드를 편집하고 커밋.
3. 브랜치를 메인라인(mainline)으로 병합(merge)하고, 모든 커밋을 마스터 저장소로 푸시(push).

가능한 단계가 더 많지만, 이 워크플로는 현재 가능한 것보다 마스터 저장소에 훨씬 덜 의존적입니다. 디스크 속도로 로컬에서 커밋할 수 있기 때문에, 코어 개발자는 훨씬 더 자주 원자적 커밋을 수행할 수 있으며, 여러 작업을 수행하는 커밋을 최소화할 수 있습니다. 또한 브랜치를 사용함으로써 변경 사항은 다른 개발자들이 만드는 다른 변경 사항으로부터 (원하는 경우) 격리됩니다. 브랜치는 저렴하므로, 하나의 특정 문제(예: 하나의 버그 또는 하나의 새로운 기능)를 다루는 여러 개의 작은 브랜치를 쉽게 생성하고 유지 관리할 수 있습니다. DVCS의 더 정교한 기능은 개발자가 공식 메인라인이 진행됨에 따라 장기 실행 개발 브랜치를 더 쉽게 추적할 수 있도록 합니다.

### 후보 (Contenders)

| 이름 (Name) | 약어 (Short Name) | 버전 (Version) | 2.x 트렁크 미러 (2.x Trunk Mirror) | 3.x 트렁크 미러 (3.x Trunk Mirror) |
|---|---|---|---|---|
| Bazaar | bzr | 1.12 | http://code.python.org/python/trunk | http://code.python.org/python/3.0 |
| Mercurial | hg | 1.2.0 | http://code.python.org/hg/trunk/ | http://code.python.org/hg/branches/py3k/ |
| git | N/A | 1.6.1 | git://code.python.org/python/trunk | git://code.python.org/python/branches/py3k |

이 PEP는 darcs, arch 또는 monotone을 고려하지 않습니다. 이 DVCS들의 주요 문제는 다른 DVCS들이 제공하는 매우 설득력 있는 기능을 제공하지 않는 한 지원할 가치가 없을 정도로 인기가 충분하지 않다는 것입니다. Arch와 darcs는 또한 가까운 미래에 해결될 것 같지 않은 상당한 성능 문제를 가지고 있습니다.

### 상호 운용성 (Interoperability)

이미 어떤 DVCS를 사용할지 결정했고 로컬 미러를 직접 유지 관리할 의향이 있는 사람들을 위해, 세 가지 DVCS 모두 git의 "fast-import" 변경 세트 형식을 통한 교환을 지원합니다. git은 물론 기본적으로 이를 수행하며, Bazaar에 대한 기본 지원은 활발히 개발 중이며 2009년 2월 중순 현재 좋은 초기 평가를 받고 있습니다. Mercurial은 `hg convert` 명령을 통한 가져오기(import)에 특이한 지원을 제공하며, 내보내기(export)를 위한 타사 fast-import 지원을 사용할 수 있습니다. 또한 Tailor 도구는 모든 후보 형식의 공식 저장소를 기반으로 로컬 미러를 모든 형식으로 자동 유지 관리하는 것을 지원합니다.

### 사용 시나리오 (Usage Scenarios)

Subversion을 대체할 DVCS를 결정하는 가장 좋은 방법은 개발자(코어 및 비코어)가 작업해야 하는 실제 사용 시나리오를 수행하는 데 무엇이 필요한지 살펴보는 것입니다. 각 사용 시나리오는 그것이 무엇인지, 기본적인 단계(VCS마다 약간 다를 수 있음) 목록, 그리고 다양한 VCS(Subversion 포함)에서 사용 시나리오를 수행하는 방법을 간략하게 설명합니다.

각 VCS는 각 시나리오에 대한 구현 작성을 담당하는 단일 작성자를 가졌습니다 (달리 명시되지 않는 한).

| 이름 (Name) | VCS |
|---|---|
| Brett | svn |
| Barry | bzr |
| Alexandre | hg |
| Stephen | git |

#### 초기 설정 (Initial Setup)

일부 DVCS는 초기 설정을 미리 수행하면 몇 가지 이점을 제공합니다. 이 섹션에서는 도구를 더 잘 활용하기 위해 사용 시나리오를 실행하기 전에 수행할 수 있는 작업에 대해 설명합니다.

모든 DVCS는 프로젝트 식별을 구성하는 것을 지원합니다. 중앙 집중식 시스템과 달리, DVCS는 이메일 주소를 사용하여 커밋을 식별합니다. (접근 제어는 일반적으로 ssh 또는 콘솔 로그인과 같은 DVCS 외부의 메커니즘으로 이루어집니다). 이 식별 정보는 전체 이름과 연결될 수 있습니다.

모든 DVCS는 이 정보에 대한 근사치를 얻기 위해 시스템에 쿼리하지만, 이것이 항상 원하는 정보는 아닐 수 있습니다. 또한 사용자별 및 프로젝트별로 이 정보를 설정하는 것을 지원합니다. 이러한 속성을 설정하는 편리한 명령어는 다양하지만, 모두 구성 파일의 직접 편집을 허용합니다.

일부 VCS는 체크아웃/체크인 시 줄 끝(EOL) 변환을 지원합니다.

##### svn
필수 사항은 없지만, 개발 FAQ의 지침을 따르는 것이 좋습니다.

##### bzr
설정은 필요 없지만, 훨씬 더 빠르고 공간 효율적인 로컬 브랜칭을 위해서는 모든 Python 브랜치를 담을 공유 저장소(shared repository)를 생성해야 합니다. 공유 저장소는 `.bzr` 디렉토리를 포함하는 부모 디렉토리에 불과합니다. `bzr`이 리비전을 커밋할 때, 리비전을 담을 `.bzr` 디렉토리를 찾기 위해 로컬 디렉토리에서 파일 시스템 위로 검색합니다. 여러 브랜치에 걸쳐 리비전을 공유함으로써 사용되는 디스크 공간의 양을 줄일 수 있습니다. 다음과 같이 수행합니다:

```bash
cd ~/projects
bzr init-repo python
cd python
```

이제 모든 Python 브랜치는 `~/projects/python` 안에 생성되어야 합니다.

`~/.bzr/bazaar.conf` 및 `~/.bzr/locations.conf` 파일에 Python 코드와 상호 작용하기 위한 기본 설정을 넣을 수도 있습니다. 이들 중 필수적인 것은 없지만, 일부는 권장됩니다. 예를 들어, 모든 커밋에 GPG 서명을 할 것을 제안하지만, 이는 개발자들에게 너무 높은 진입 장벽이 될 수 있습니다. 또한, 기본적으로 브랜치를 푸시할 위치에 따라 기본 푸시 위치를 설정할 수 있습니다. 마스터 브랜치에 쓰기 권한이 있다면, 해당 푸시 위치는 `code.python.org`일 수 있습니다. 그렇지 않다면, Launchpad와 같은 무료 Bazaar 코드 호스팅 서비스일 수 있습니다. Bazaar가 선택된다면, 정책과 권장 사항을 결정해야 합니다.

최소한 이메일 주소를 설정하는 것이 좋습니다:

```bash
bzr whoami "Firstname Lastname <email.address@example.com>"
```

아래의 `hg` 및 `git`과 마찬가지로, 저장소별로 이메일 주소 (또는 사실상 거의 모든 매개변수)를 설정하는 방법이 있습니다. 이는 다른 DVCS와 마찬가지로 INI 스타일 형식인 `$HOME/.bazaar/locations.conf` 파일의 설정으로 수행합니다. 이 토론과 관련이 없는 자세한 내용은 Bazaar 설명서를 참조하십시오.

##### hg
최소한 사용자 이름을 설정해야 합니다. 이렇게 하려면 홈 디렉토리에 `.hgrc` 파일을 생성하고 다음을 추가합니다:

```ini
[ui]
username = Firstname Lastname <email.address@example.com>
```

Windows를 사용 중이고 도구가 Unix 스타일의 개행을 지원하지 않는 경우, 구성에 다음을 추가하여 자동 개행 변환을 활성화할 수 있습니다:

```ini
[extensions]
win32text =
```

이러한 옵션은 `~/.hgrc` 대신 `<repo>/.hg/hgrc`를 사용자 정의하여 특정 저장소에 로컬로 설정할 수도 있습니다.

##### git
필요한 설정은 없지만, `git`은 약간의 준비만으로 작업을 원활하게 할 수 있는 여러 기능을 지원합니다. `git`은 작업 공간, 사용자 및 시스템 수준에서 기본값을 설정하는 것을 지원합니다. 시스템 수준은 이 PEP의 범위 밖입니다. 사용자 구성 파일은 Unix와 유사한 시스템에서는 `$HOME/.gitconfig`이고, 작업 공간 구성 파일은 `$REPOSITORY/.git/config`입니다.

`git-config` 도구를 사용하여 `user.name` 및 `user.email` 환경 설정을 전역적으로 (시스템 로그인 계정용) 또는 로컬로 (특정 `git` 작업 복사본용) 설정하거나, 구성 파일을 직접 편집할 수 있습니다 (위의 Mercurial 섹션에 표시된 것과 동일한 형식):

```bash
# my full name doesn't change
# note "--global" flag means per user
# (system-wide configuration is set with "--system")
git config --global user.name 'Firstname Lastname'
# but use my Pythonic email address
cd /path/to/python/repository
git config user.email email.address@python.example.com
```

Windows를 사용 중이라면, `git-config`를 사용하여 `core.autocrlf` 및 `core.safecrlf` 환경 설정을 `true`로 설정하는 것이 좋습니다:

```bash
# check out files with CRLF line endings rather than Unix-style LF only
git config --global core.autocrlf true
# scream if a transformation would be ambiguous
# (eg, a working file contains both naked LF and CRLF)
# and check them back in with the reverse transformation
git config --global core.safecrlf true
```

저장소에는 일반적으로 VCS에 거의 등록되지 않아야 하는 파일 이름을 지정하는 `.gitignore` 파일이 포함되어 있지만, 개인적인 규칙(예: 항상 `.msg`라는 임시 파일에 로그 메시지 편집)을 지정하고 싶을 수 있습니다:

```bash
# tell git where my personal ignores are
git config --global core.excludesfile ~/.gitignore
# I use .msg for my long commit logs, and Emacs makes backups in
# files ending with ~
# these are globs, not regular expressions
echo '*~' >> ~/.gitignore
echo '.msg' >> ~/.gitignore
```

다른 VCS와 마찬가지로 여러 브랜치를 사용하는 경우, 모든 객체를 공통 객체 저장소에 넣어 많은 공간을 절약할 수 있습니다. 이는 브랜치의 원본이 다른 저장소에 있었더라도 객체가 저장소 내의 브랜치 간에 공유되므로 다운로드 시간도 절약할 수 있습니다. `git`은 공간 및 시간 효율성이 매우 뛰어나며 여러 최적화를 자동으로 적용하므로 이 구성은 선택 사항입니다. (예제는 생략되었습니다).

#### 일회성 체크아웃 (One-Off Checkout)

비코어 개발자로서, 버그를 수정하는 일회성 패치를 생성하고 게시하여 코어 개발자가 메인라인(mainline)에 포함할지 검토할 수 있도록 하고 싶습니다.

- 트렁크를 체크아웃/브랜치/클론합니다.
- 일부 코드를 편집합니다.
- 패치를 생성합니다 (VCS에서 가장 잘 지원하는 방식, 예: 브랜치 이력 기반).
- 검토자의 의견을 받고 문제를 해결합니다.
- 코어 개발자가 커밋할 두 번째 패치를 생성합니다.

##### svn
`svn`은 로컬 커밋을 지원하지 않으므로, 패치로 이를 흉내냅니다.

```bash
svn checkout http://svn.python.org/projects/python/trunk
cd trunk
# Edit some code.
echo "The cake is a lie!" > README
# Since svn lacks support for local commits, we fake it with patches.
svn diff >> commit-1.diff
svn diff >> patch-1.diff
# Upload the patch-1 to bugs.python.org.
# Receive reviewer comments.
# Edit some code.
echo "The cake is real!" > README
# Since svn lacks support for local commits, we fake it with patches.
svn diff >> commit-2.diff
svn diff >> patch-2.diff
# Upload patch-2 to bugs.python.org
```

##### bzr
`bzr send -o bundle` 명령은 슈퍼-패치(super-patch)와 같은 번들 파일을 생성합니다.

```bash
bzr branch http://code.python.org/python/trunk
cd trunk
# Edit some code.
bzr commit -m 'Stuff I did'
bzr send -o bundle # 번들 파일을 bugs.python.org에 업로드합니다.
# Receive reviewer comments
# Edit some code
bzr commit -m 'Respond to reviewer comments'
bzr send -o bundle # 업데이트된 번들 파일을 bugs.python.org에 업로드합니다.
```
번들 파일은 슈퍼-패치와 같습니다. `patch(1)`로 읽을 수 있지만, 전체 이력을 포함하여 완전히 사용 가능한 브랜치를 생성하기 위해 `bzr merge`에 공급될 수 있도록 추가 메타데이터를 포함합니다. 아래 패치 검토(Patch Review) 섹션을 참조하십시오.

##### hg
`hg`는 `hg outgoing -p`를 사용하여 패치를 생성합니다.

```bash
hg clone http://code.python.org/hg/trunk
cd trunk
# Edit some code.
hg commit -m "Stuff I did"
hg outgoing -p > fixes.patch # 패치를 bugs.python.org에 업로드합니다.
# Receive reviewer comments
# Edit some code
hg commit -m "Address reviewer comments."
hg outgoing -p > additional-fixes.patch # 패치를 bugs.python.org에 업로드합니다.
```

`hg outgoing`에는 해당 플래그가 없지만, 대부분의 Mercurial 명령어는 `--git` 명령을 통해 git의 확장 패치 형식을 지원합니다. 이는 `.hgrc` 파일에 설정하여 패치를 생성하는 모든 명령어가 확장 형식을 사용하도록 할 수 있습니다.

##### git
`git`은 `git format-patch`를 사용하여 패치를 생성하며, 이는 일반 `patch`로는 처리할 수 없는 몇 가지 트릭(빈 파일, 이름 변경 등)을 알고 있습니다.

```bash
# Get the mainline code.
git clone git://code.python.org/python/trunk
cd trunk
# Edit some code.
git commit -a -m 'Stuff I did.'
# Create patch for my changes (i.e, relative to master).
git format-patch master
git tag stuff-v1
# Upload 0001-Stuff-I-did.patch to bugs.python.org.
# Time passes ... receive reviewer comments.
# Edit more code.
git commit -a -m 'Address reviewer comments.'
# Make an add-on patch to apply on top of the original.
git format-patch stuff-v1
# Upload 0001-Address-reviewer-comments.patch to bugs.python.org.
```
패치는 `git diff master > stuff-i-did.patch`로도 생성할 수 있지만, `git format-patch | git am`는 일반 `patch`가 처리할 수 없는 몇 가지 트릭(빈 파일, 이름 변경 등)을 알고 있습니다. `git`은 커밋 메시지에서 "Stuff I did"를 가져와 `0001-Stuff-I-did.patch`라는 파일 이름을 생성합니다. `git-format-patch` 형식에 대한 설명은 아래 패치 검토(Patch Review)를 참조하십시오.

#### 변경 사항 되돌리기 (Backing Out Changes)

코어 개발자로서, 메인라인에 포함될 준비가 되지 않은 변경 사항을 되돌리고 싶습니다.

- 원치 않는 변경 사항을 되돌립니다.
- 서버에 패치를 푸시합니다.

##### svn
```bash
# Assume the change to revert is in revision 40
svn merge -c -40 .
# Resolve conflicts, if any.
svn commit -m "Reverted revision 40"
```

##### bzr
```bash
# Assume the change to revert is in revision 40
bzr merge -r 40..39
# Resolve conflicts, if any.
bzr commit -m "Reverted revision 40"
```
되돌리려는 변경 사항이 마지막으로 이루어진 변경 사항이라면, `bzr uncommit`을 사용할 수 있습니다.

##### hg
```bash
# Assume the change to revert is in revision 9150dd9c6d30
hg backout --merge -r 9150dd9c6d30
# Resolve conflicts, if any.
hg commit -m "Reverted changeset 9150dd9c6d30"
hg push
```
`hg rollback` 및 `hg strip`을 사용하여 로컬 저장소에 커밋했지만 아직 다른 저장소로 푸시하지 않은 변경 사항을 되돌릴 수 있습니다.

##### git
```bash
# Assume the change to revert is the grandfather of a revision tagged "newhotness".
git revert newhotness~2
# Resolve conflicts if any. If there are no conflicts, the commit
# will be done automatically by "git revert", which prompts for a log.
git commit -m "Reverted changeset 9150dd9c6d30."
git push
```

#### 패치 검토 (Patch Review)

코어 개발자로서, 다른 사람들이 제출한 패치를 검토하여 승인된 변경 사항만 Python에 추가되도록 확인하고 싶습니다.

코어 개발자는 다른 사람들이 제출한 패치를 검토해야 합니다. 이는 패치를 적용하고, 테스트한 다음, 변경 사항을 버리는 것을 요구합니다. 코어 개발자가 이미 트렁크의 체크아웃/브랜치/클론을 가지고 있다고 가정할 수 있습니다.

- 트렁크에서 브랜치를 생성합니다.
- 패치 제출자가 생성한 대로 아무런 코멘트 없이 패치를 적용합니다.
- 서버에 패치를 푸시합니다.
- 이제 쓸모없는 브랜치를 삭제합니다.

##### svn
Subversion은 이 PEP에서 정의된 "브랜치"와 같은 것이 없기 때문에 이 개발 스타일에 잘 맞지 않습니다. 대신 개발자는 패치 테스트를 위해 다른 체크아웃을 만들거나 서버에 브랜치를 만들어야 합니다. 지금까지 코어 개발자들은 개별 패치를 처리하기 위해 "서버에 브랜치" 접근 방식을 사용하지 않았습니다. 이 시나리오에서는 개발자가 트렁크의 로컬 체크아웃을 생성하여 작업한다고 가정합니다:

```bash
cp -r trunk issue0000
cd issue0000
patch -p0 < __patch__
# Review patch.
svn commit -m "Some patch."
cd ..
rm -r issue0000
```
또 다른 옵션은 한 번에 하나의 체크아웃만 실행하고 `svn diff`와 `svn revert -R`를 사용하여 독립적으로 만든 변경 사항을 저장하는 것입니다.

##### bzr
`bzr`은 번들 파일을 병합하여 패치를 검토하고 커밋한 다음 푸시할 수 있습니다.

```bash
bzr branch trunk issueNNNN
# Download `patch` bundle from Roundup
bzr merge patch
# Review patch
bzr commit -m'Patch NNN by So N. So' --fixes python:NNNN
bzr push bzr+ssh://me@code.python.org/trunk
rm -rf ../issueNNNN
```
대신, 아마도 이 변경 사항을 트렁크에 커밋할 것이므로, 그냥 체크아웃을 할 수도 있습니다. 이렇게 하면 로컬 작업 트리가 생기고 브랜치(즉, 모든 리비전)는 서버에 계속 존재합니다. 이는 svn 모델과 유사하며 패치를 더 빠르게 검토할 수 있도록 할 수 있습니다. 이 경우 푸시할 필요는 없습니다:

```bash
bzr checkout trunk issueNNNN
# Download `patch` bundle from Roundup
bzr merge patch
# Review patch
bzr commit -m'Patch NNNN by So N. So' --fixes python:NNNN
rm -rf ../issueNNNN
```

##### hg
`hg`는 `hg import`를 사용하여 패치를 적용하고, 검토한 후 푸시할 수 있습니다.

```bash
hg clone trunk issue0000
cd issue0000
# If the patch was generated using hg export, the user name of the
# submitter is automatically recorded. Otherwise,
# use hg import --no-commit submitted.diff and commit with
# hg commit -u "Firstname Lastname <email.address@example.com>"
hg import submitted.diff
# Review patch.
hg push ssh://alexandre@code.python.org/hg/trunk/
```

##### git
`git`은 `git am`를 사용하여 RFC 2822 메시지 형식의 패치를 적용하고, 이를 브랜치에 병합한 후 푸시할 수 있습니다.

```bash
cd trunk
# Create a branch in case we don't like the patch.
# This checkout takes zero time, since the workspace is left in
# the same state as the master branch.
git checkout -b patch-review
# Download patch from bugs.python.org to submitted.patch.
git am < submitted.patch
# Review and approve patch.
# Merge into master and push.
git checkout master
git merge patch-review
git push
```
`git-format-patch`로 생성된 패치를 가정합니다. 이는 하나 이상의 패치를 포함하는 Unix mbox 파일로, 각 패치는 RFC 2822 메시지로 형식화됩니다. `git-am`은 각 메시지를 다음과 같이 커밋으로 해석합니다. 패치의 작성자는 `From:` 헤더에서 가져오고, 날짜는 `Date` 헤더에서 가져옵니다. 커밋 로그는 제목 줄의 내용, 빈 줄, 그리고 패치 시작까지의 메시지 본문을 연결하여 생성됩니다.

#### 백포트 (Backport)

코어 개발자로서, 2.6, 2.7, 3.0 및 3.1에 패치를 적용하여 세 가지 버전 모두에서 문제를 해결하고 싶습니다.

항상 최신 기술과 최신 릴리스 버전이 개발 중이기 때문에 Python은 현재 네 개의 브랜치에서 동시에 작업되고 있습니다. 이로 인해 변경 사항이 다양한 브랜치를 통해 쉽게 전파되는 것이 중요합니다.

##### svn
Python이 `svnmerge`를 사용하기 때문에, 변경 사항은 트렁크(2.7)에서 시작하여 2.6의 릴리스 버전으로 병합됩니다. 3.x 시리즈로 변경 사항을 가져오려면, 변경 사항이 3.1로 병합되고, 수정된 다음 3.0으로 병합됩니다 (2.7 -> 2.6; 2.7 -> 3.1 -> 3.0).

이는 패치가 2.6에 추가된 다음 더 새로운 버전으로 전달되는 (2.6 -> 2.7 -> 3.0 -> 3.1) 포트-포워드(port-forward) 전략과는 대조적입니다.

```bash
# Assume patch applied to 2.7 in revision 0000.
cd release26-maint
svnmerge merge -r 0000
# Resolve merge conflicts and make sure patch works.
svn commit -F svnmerge-commit-message.txt # revision 0001.
cd ../py3k
svnmerge merge -r 0000
# Same as for 2.6, except Misc/NEWS changes are reverted.
svn revert Misc/NEWS
svn commit -F svnmerge-commit-message.txt # revision 0002.
cd ../release30-maint
svnmerge merge -r 0002
svn commit -F svnmerge-commit-message.txt # revision 0003.
```

##### bzr
Bazaar는 리비전(revision)을 수동으로 체리 픽(cherry pick)하는 것을 지원하기 때문에 여기서는 매우 간단합니다. 아래 예제에서는 리비전 번호 대신 리비전 ID를 줄 수도 있었지만, 일반적으로 그럴 필요는 없습니다. Martin Pool은 "일반적으로 가장 오래된 지원 브랜치에서 먼저 수정을 하고, 나중에 릴리스로 병합하는 것을 권장합니다"라고 제안합니다:

```bash
# Assume patch applied to 2.7 in revision 0000
cd release26-maint
bzr merge ../trunk -c 0000
# Resolve conflicts and make sure patch works
bzr commit -m 'Back port patch NNNN'
bzr push bzr+ssh://me@code.python.org/trunk
cd ../py3k
bzr merge ../trunk -r 0000
# Same as for 2.6 except Misc/NEWS changes are reverted
bzr revert Misc/NEWS
bzr commit -m 'Forward port patch NNNN'
bzr push bzr+ssh://me@code.python.org/py3k
```

##### hg
Mercurial은 다른 DVCS와 마찬가지로 Python 코어 개발자가 패치를 백포트(backport)하는 현재 워크플로를 잘 지원하지 않습니다. 현재 버그 수정은 먼저 개발 메인라인(즉, trunk)에 적용된 다음, 유지 관리 브랜치로 백포트되고, 필요한 경우 py3k 브랜치로 포워드 포트(forward-ported)됩니다. 이 워크플로는 개별 변경 사항을 체리 픽(cherry-pick)할 수 있는 능력을 필요로 합니다. Mercurial의 `transplant` 확장(extension)은 이 기능을 제공합니다. 다음은 이 워크플로를 사용하는 시나리오 예시입니다:

```bash
cd release26-maint
# Assume patch applied to 2.7 in revision 0000
hg transplant -s ../trunk 0000
# Resolve conflicts, if any.
cd ../py3k
hg pull ../trunk
hg merge
hg revert Misc/NEWS
hg commit -m "Merged trunk"
hg push
```
위 예제에서 `transplant`는 현재 `svnmerge` 명령과 매우 유사하게 작동합니다. `transplant`가 리비전 없이 호출되면, 여러 변경 사항을 이식하는 데 유용한 대화형 루프를 시작합니다. 또 다른 유용한 기능은 `--filter` 옵션으로, 변경 세트를 프로그래밍 방식으로 수정하는 데 사용할 수 있습니다 (예: `Misc/NEWS`에 대한 변경 사항을 자동으로 제거하는 데 사용될 수 있습니다).

전통적인 워크플로 대신, 버그 수정을 가장 오래된 지원 릴리스에 커밋한 다음, 이러한 수정을 최신 브랜치로 병합함으로써 변경 세트를 이식하는 것을 피할 수 있습니다.

```bash
cd release25-maint
hg import fix_some_bug.diff
# Review patch and run test suite. Revert if failure.
hg push
cd ../release26-maint
hg pull ../release25-maint
hg merge
# Resolve conflicts, if any. Then, review patch and run test suite.
hg commit -m "Merged patches from release25-maint."
hg push
cd ../trunk
hg pull ../release26-maint
hg merge
# Resolve conflicts, if any, then review.
hg commit -m "Merged patches from release26-maint."
hg push
```
이 접근 방식은 이력을 비선형적으로 만들고 따라가기 약간 더 어렵게 만들지만, 지원되는 모든 릴리스에서 버그를 수정하도록 장려합니다. 또한 병합할 특정 리비전 ID를 찾을 필요가 없으므로 백포트할 변경 사항이 많을 때 더 잘 확장됩니다.

##### git
`git`에서는 모든 관련 마스터 저장소 브랜치를 포함하는 작업 공간을 가질 것입니다. `git cherry-pick`은 저장소 간에 작동하지 않습니다. 동일한 저장소에 브랜치가 있어야 합니다.

```bash
# Assume patch applied to 2.7 in revision release27~3 (4th patch back from tip).
cd integration
git checkout release26
git cherry-pick release27~3
# If there are conflicts, resolve them, and commit those changes.
# git commit -a -m "Resolve conflicts."
# Run test suite. If fixes are necessary, record as a separate commit.
# git commit -a -m "Fix code causing test failures."
git checkout master
git cherry-pick release27~3
# Do any conflict resolution and test failure fixups.
# Revert Misc/NEWS changes.
git checkout HEAD^ -- Misc/NEWS
git commit -m 'Revert cherry-picked Misc/NEWS changes.' Misc/NEWS
# Push both ports.
git push release26 master
```
주어진 브랜치에서 정기적으로 병합(cherry-pick 대신)하는 경우, 병합한 다음 되돌림으로써 특정 커밋이 미래에 실수로 병합되는 것을 차단할 수 있습니다. 이는 체리 픽이 원치 않는 패치를 가져오는 것을 방지하지 않으며, 이 기술은 병합을 원치 않는 모든 것을 차단해야 합니다. 이 점이 svn과 다른지는 확실하지 않습니다.

```bash
cd trunk
# Merge in the alpha tested code.
git merge experimental-branch
# We don't want the 3rd-to-last commit from the experimental-branch,
# and we don't want it to ever be merged.
# The notation "^N" means Nth parent of the current commit. Thus HEAD^2^1^1
# means the first parent of the first parent of the second parent of HEAD.
git revert HEAD^2^1^1
# Propagate the merge and the prohibition to the public repository.
git push
```

#### 새로운 기능의 협업 개발 (Coordinated Development of a New Feature)

때때로 코어 개발자들은 여러 개발자와 함께 주요 기능을 개발하게 됩니다. 코어 개발자로서, 다른 개발자들과 협력할 수 있도록 기능 브랜치를 공통의 공개 위치에 게시할 수 있기를 원합니다.

이는 다른 개발자가 접근할 수 있는 서버에 브랜치를 생성하는 것을 필요로 합니다. 모든 DVCS는 저장소 호스트의 적절한 구성으로 개발자가 이미 커밋할 수 있는 호스트에 새 저장소를 생성하는 것을 지원합니다. 이는 저장소 초기화의 세부 사항이 다를 수 있지만, svn의 기존 샌드박스와 개념적으로 유사합니다.

비코어 개발자의 경우, 다양한 수준의 공개 접근이 가능한 저장소 호스팅 서비스가 있습니다. Bazaar는 Launchpad를, Mercurial은 bitbucket.org를, git은 GitHub를 가지고 있습니다. 또한 모두 자체 서버를 유지 관리하는 개발자를 위한 사용하기 쉬운 CGI 인터페이스를 가지고 있습니다.

- 트렁크를 브랜치합니다.
- 서버의 브랜치에서 풀(Pull)합니다.
- 트렁크에서 풀합니다.
- 트렁크로 병합을 푸시합니다.

##### svn
이 시나리오는 어떤 DVCS로 진행할지에 대한 결정이 작업 완료 전에 이루어졌기 때문에 불완전합니다.

```bash
# Create branch.
svn copy svn+ssh://pythondev@svn.python.org/python/trunk svn+ssh://pythondev@svn.python.org/python/branches/NewHotness
svn checkout svn+ssh://pythondev@svn.python.org/python/branches/NewHotness
cd NewHotness
svnmerge init
svn commit -m "Initialize svnmerge."
# Pull in changes from other developers.
svn update
# Pull in trunk and merge to the branch.
svnmerge merge
svn commit -F svnmerge-commit-message.txt
```

#### 이슈 의존성 분리 (Separation of Issue Dependencies)

때때로 특정 이슈(issue)에 대해 작업하는 동안, 작업 중인 문제가 실제로는 다양한 작은 문제들로 구성된 복합적인 문제라는 것이 명확해집니다. 현재 작업을 진행하다가 별도의 이슈 작업을 시작하는 것이, 여러 이슈를 단일하고 큰 단위로 묶는 대신 개별 작업 단위로 분리하는 데 매우 유용합니다.

- 브랜치 A를 생성합니다 (예: `urllib`에 버그가 있음).
- 일부 코드를 편집합니다.
- 브랜치 A가 의존하는 새로운 브랜치 B를 생성합니다 (예: `urllib` 버그로 인해 `socket` 버그가 드러남).
- 브랜치 B에서 일부 코드를 편집합니다.
- 브랜치 B를 커밋합니다.
- 브랜치 A에서 일부 코드를 편집합니다.
- 브랜치 A를 커밋합니다.
- 정리합니다.

##### svn
`svn`의 저렴한 브랜칭 부족을 보완하기 위해, 파일과 단일 변경 목록을 연결하는 `changelist` 옵션이 있습니다. 이는 커밋 수준에서 연결할 수 있는 것만큼 강력하지 않습니다. 또한 변경 목록 간의 의존성을 표현할 방법도 없습니다.

```bash
cp -r trunk issue0000
cd issue0000
# Edit some code.
echo "The cake is a lie!" > README
svn changelist A README
# Edit some other code.
echo "I own Python!" > LICENSE
svn changelist B LICENSE
svn ci -m "Tell it how it is." --changelist B
# Edit changelist A some more.
svn ci -m "Speak the truth." --changelist A
cd ..
rm -rf issue0000
```

##### bzr
`bzr shelf` (이제 `bzr`의 표준 부분)를 사용하여 소켓 버그를 수정하기 위해 잠시 우회하는 동안 일부 변경 사항을 임시로 보관하는 접근 방식입니다.

```bash
bzr branch trunk bug-0000
cd bug-0000
# Edit some code. Dang, we need to fix the socket module.
bzr shelve --all
# Edit some code.
bzr commit -m "Socket module fixes"
# Detour over, now resume fixing urllib
bzr unshelve
# Edit some code
```
또 다른 접근 방식은 `loom` 플러그인을 사용하는 것입니다. `loom`은 스태킹(stacking) 의존성을 자동으로 처리하므로 종속 브랜치에서 작업하는 것을 크게 단순화할 수 있습니다. `loom`을 스택형 종속 브랜치("스레드"라고 함)로 상상하면, 스레드 스택을 위아래로 쉽게 이동하고, 변경 사항을 상위 스레드로 병합하고, 스레드 간에 차이점(diff)을 생성하는 등의 작업을 수행할 수 있습니다. 때때로 검토 또는 커밋을 위해 `loom` 스레드를 별도의 브랜치로 내보내야 할 수도 있습니다. 상위 스레드는 하위 스레드의 모든 변경 사항을 자동으로 통합합니다.

```bash
bzr branch trunk bug-0000
cd bug-0000
bzr loomify --base trunk
bzr create-thread fix-urllib
# Edit some code. Dang, we need to fix the socket module first.
bzr commit -m "Checkpointing my work so far"
bzr down-thread
bzr create-thread fix-socket
# Edit some code
bzr commit -m "Socket module fixes"
bzr up-thread
# Manually resolve conflicts if necessary
bzr commit -m 'Merge in socket fixes'
# Edit me some more code
bzr commit -m "Now that socket is fixed, complete the urllib fixes"
bzr record done
```
보너스 포인트로, 다른 사람이 당신이 방금 했던 것과 똑같은 방식으로 소켓 모듈을 수정했다고 가정해 봅시다. 아마도 이 사람은 당신의 `fix-socket` 스레드를 가져와서 그것만 트렁크에 적용했을 것입니다. 당신은 그들의 변경 사항을 당신의 `loom`에 병합하고 이제 중복된 `fix-socket` 스레드를 삭제할 수 있기를 원할 것입니다.

```bash
bzr down-thread trunk
# Get all new revisions to the trunk. If you've done things
# correctly, this will succeed without conflict.
bzr pull
bzr up-thread
# See? The fix-socket thread is now identical to the trunk
bzr commit -m 'Merge in trunk changes'
bzr diff -r thread: | wc -l # returns 0
bzr combine-thread
bzr up-thread
# Resolve any conflicts
bzr commit -m 'Merge trunk'
# Now our top-thread has an up-to-date trunk and just the urllib fix.
```

##### hg
한 가지 접근 방식은 `shelve` 확장을 사용하는 것입니다. 이 확장은 Mercurial에 포함되어 있지 않지만 설치하기 쉽습니다. `shelve`를 사용하면 변경 사항을 일시적으로 보관할 수 있습니다.

```bash
hg clone trunk issue0000
cd issue0000
# Edit some code (e.g. urllib).
hg shelve # 변경 사항을 보관합니다.
# Edit some other code (e.g. socket).
hg commit
hg unshelve # 초기 수정을 완료합니다.
hg commit
cd ../trunk
hg pull ../issue0000
hg merge
hg commit
rm -rf ../issue0000
```
Mercurial로 이 시나리오에 접근하는 다른 몇 가지 방법이 있습니다. Alexander Solovyov는 Mercurial 메일링 리스트에서 몇 가지 대안적인 접근 방식을 제시했습니다.

##### git
`git stash`를 사용하여 현재 작업을 저장하고, 다른 문제에 대한 작업을 수행한 후, 원래 작업을 복원할 수 있습니다.

```bash
cd trunk
# Edit some code in urllib.
# Discover a bug in socket, want to fix that first.
# So save away our current work.
git stash
# Edit some code, commit some changes.
git commit -a -m "Completed fix of socket."
# Restore the in-progress work on urllib.
git stash apply
# Edit me some more code, commit some more fixes.
git commit -a -m "Complete urllib fixes."
# And push both patches to the public repository.
git push
```
보너스 포인트: 시간을 들여 작업을 했는데, 다른 사람이 당신이 방금 했던 것과 똑같은 방식으로 소켓을 수정하여 트렁크에 반영했다고 가정해 봅시다. 이 경우 당신의 푸시는 브랜치가 최신 상태가 아니기 때문에 실패할 것입니다. 만약 수정이 한 줄짜리였다면, 문자 그대로 정확히 동일할 가능성이 매우 높습니다. `git`은 이를 알아차리고 당신은 작업을 완료하게 될 것입니다. `git`은 자동으로 병합할 것입니다.

운이 좋지 않은 경우를 가정해 봅시다:

```bash
# Update your branch.
git pull git://code.python.org/public/trunk master
# git has fetched all the necessary data, but reports that the
# merge failed. We discover the nearly-duplicated patch.
# Neither our version of the master branch nor the workspace has
# been touched. Revert our socket patch and pull again:
git revert HEAD^
git pull git://code.python.org/public/trunk master
```
Bazaar와 Mercurial처럼, `git`도 패치 스택을 관리하는 확장 기능을 가지고 있습니다. Andrew Morton의 오리지널 Quilt를 사용하거나, Mercurial Queues 또는 Bazaar looms와 유사한 방식으로 대규모 패치 세트에 대한 패치 추적을 VCS에 통합하는 StGit("stacked git")이 있습니다.

#### Python 릴리스 수행 (Doing a Python Release)

PEP 101은 DVCS를 사용할 때 어떻게 변경될까요?

##### bzr
크게 변하지는 않을 것입니다. 유지 관리 브랜치를 생성할 때 `svn cp` 대신 새 위치로 푸시할 것입니다. 태그는 `svn`에서는 디렉토리 복사본이지만 `bzr` (및 `hg`도 그럴 것으로 예상)에서는 특정 브랜치에 대한 리비전의 상징적 이름일 뿐이므로 완전히 다릅니다. `release.py` 스크립트는 `bzr` 명령을 사용하도록 변경되어야 할 것입니다. DVCS (특히 `bzr`)가 체리 픽(cherry picking)과 병합(merging)을 충분히 잘 수행하기 때문에 유지 관리 브랜치를 더 빨리 생성할 수 있을 가능성이 있습니다. `bzr`/`hg` 미러에서 릴리스를 시도하는 것은 유용한 연습이 될 것입니다.

##### hg
분명히 PEP 101 및 릴리스 스크립트에 있는 Subversion 관련 세부 정보는 업데이트되어야 할 것입니다. 특히, 릴리스 태그 지정 및 유지 관리 브랜치 생성 프로세스는 Mercurial의 기능을 사용하도록 수정되어야 할 것입니다. 이는 릴리스 프로세스의 특정 측면을 단순화하고 간소화할 것입니다. 예를 들어, Mercurial에서 태그는 주어진 리비전에 대한 단순한 상징적 이름이므로 릴리스를 태그 지정하고 재태그 지정하는 것은 사소한 작업이 될 것입니다.

##### git
크게 변하지는 않을 것입니다. 유지 관리 브랜치를 생성할 때 `svn cp` 대신 새 위치로 `git push`할 것입니다. 태그는 `svn`에서는 디렉토리 복사본이지만, `git`에서는 브랜치와 마찬가지로 리비전의 상징적 이름일 뿐이므로 완전히 다릅니다. (태그와 브랜치의 차이점은 태그는 특정 커밋을 참조하며, `git tag -f`를 사용하여 강제로 이동시키지 않는 한 절대 변경되지 않는다는 것입니다. 반면에 체크아웃된 브랜치는 `git commit`에 의해 자동으로 업데이트됩니다). `release.py` 스크립트는 `git` 명령을 사용하도록 변경되어야 할 것입니다. `git`을 사용하면 릴리스 엔지니어가 선택되자마자 (로컬) 유지 관리 브랜치를 생성할 것입니다. 그런 다음, 마음에 들지 않는 패치가 나올 때까지 "git pull"을 하다가, "git pull; git revert ugly-patch"를 수행하고, 합리적인 판단이 들면 포크(fork)하여 좋은 패치에 "git cherry-pick"을 시작할 것입니다.

### 플랫폼/도구 지원 (Platform/Tool Support)

#### 운영체제 (Operating Systems)

| DVCS | Windows | OS X | UNIX |
|---|---|---|---|
| bzr | 예 (설치 관리자) w/ Tortoise | 예 (설치 관리자, fink 또는 MacPorts) | 예 (다양한 패키지 형식) |
| hg | 예 (타사 설치 관리자) w/ Tortoise | 예 (타사 설치 관리자, fink 또는 MacPorts) | 예 (다양한 패키지 형식) |
| git | 예 (타사 설치 관리자) | 예 (타사 설치 관리자, fink 또는 MacPorts) | 예 (.deb 또는 .rpm) |

위 표에서 볼 수 있듯이, 세 가지 DVCS 모두 세 가지 주요 OS 플랫폼에서 사용할 수 있습니다. 그러나 또한 Bazaar만이 바이너리 설치 관리자를 통해 Windows를 직접 지원하는 DVCS이며, Mercurial과 git은 바이너리를 위해 타사에 의존해야 합니다. `bzr`과 `hg`는 모두 Tortoise 버전을 가지고 있지만, `git`은 그렇지 않습니다.

Bazaar와 Mercurial은 성능을 위한 선택적 확장과 함께 순수 Python으로 제공된다는 이점도 있습니다.

#### CRLF -> LF 지원 (CRLF -> LF Support)

- **bzr**: 이 글을 쓰는 시점에서 이에 대한 지원이 진행 중이며, 곧 버전으로 출시될 것으로 이해하고 있습니다. 자세한 내용을 찾아보겠습니다.
- **hg**: `win32text` 확장을 통해 지원됩니다.
- **git**: 개인적인 경험으로는 말할 수 없지만, `core.autocrlf` 및 `core.safecrlf` 구성 속성을 통해 상당히 좋은 지원이 있는 것으로 보입니다.

#### 대소문자 구분 없는 파일 시스템 지원 (Case-insensitive filesystem support)

- **bzr**: 문제 없을 것입니다. 저는 Linux와 OS X 간에 항상 브랜치를 공유합니다. 대소문자 변경(예: `bzr mv Mailman mailman`)을 수행했으며, (당연히) Linux에서 수행한 경우 OS X에서 변경 사항을 가져왔을 때 모든 것이 잘 작동했습니다.
- **hg**: Mercurial은 대소문자에 안전한 저장소 메커니즘을 사용하며 대소문자 접기(case folding) 충돌을 감지합니다.
- **git**: OS X는 대소문자를 보존하므로 거기서도 대소문자 변경을 할 수 있습니다. `git`은 어느 방향으로든 이름 변경에 문제가 없습니다. 그러나 대소문자 구분 없는 파일 시스템 지원은 일반적으로 대소문자 구분 파일 시스템에서의 충돌에 대해 불평하는 것을 의미합니다. `git`은 그렇게 하지 않습니다.

#### 도구 (Tools)

Review Board 및 Rietveld와 같은 코드 검토 도구의 경우, 전자는 세 가지 모두를 지원하는 반면 후자는 `hg` 및 `git`을 지원하지만 `bzr`은 지원하지 않습니다. Bazaar는 아직 온라인 검토 보드가 없지만, 이메일 기반 검토 및 트렁크 병합을 관리하는 여러 가지 방법이 있습니다. Bundle Buggy, Patch Queue Manager (PQM), Launchpad의 코드 검토가 있습니다.

세 가지 모두 저장소를 온라인에 게시하려는 사람들을 위한 기본적인 호스팅 지원을 제공하는 웹 사이트가 있습니다. Bazaar는 Launchpad를, Mercurial은 bitbucket.org를, git은 GitHub를 가지고 있습니다. Google Code는 또한 서비스와 함께 `git`을 사용하는 방법에 대한 지침을 제공합니다. 이는 저장소를 보유하는 방법과 읽기 전용 미러로 작동하는 방법을 모두 포함합니다.

세 가지 모두 Buildbot에서 지원되는 것으로 보입니다.

### Subversion 위에 DVCS 사용 (Usage On Top Of Subversion)

| DVCS | svn 지원 (svn support) |
|---|---|
| bzr | bzr-svn (타사) |
| hg | 여러 타사 |
| git | git-svn |

세 가지 DVCS 모두 `svn` 지원을 가지고 있지만, `git`만이 기본적으로 지원을 제공합니다.

### 서버 지원 (Server Support)

| DVCS | 웹 페이지 인터페이스 (Web page interface) |
|---|---|
| bzr | loggerhead |
| hg | hgweb |
| git | gitweb |

세 가지 DVCS 모두 커밋 전/후 검증과 같은 클라이언트 및 서버 측에서 다양한 훅(hook)을 지원합니다.

### 개발 (Development)

세 프로젝트 모두 활발히 개발 중입니다. Git은 매월 릴리스 일정을 따르는 것으로 보입니다. Bazaar는 시간 기반 월별 릴리스 일정을 따릅니다. Mercurial은 4개월, 시간 기반 릴리스 일정을 따릅니다.

### 특별 기능 (Special Features)

##### bzr
Martin Pool은 다음과 같이 덧붙입니다: "bzr은 공용 및 비공용 인터페이스를 구분하고 변경되는 API에 대한 사용 중단 기간을 포함하는 안정적인 Python 스크립팅 인터페이스를 가지고 있습니다. 일부 플러그인은 https://edge.launchpad.net/bazaar 및 http://bazaar-vcs.org/Documentation에 나열되어 있습니다".

##### hg
Alexander Solovyov는 다음과 같이 언급합니다:
Mercurial은 주요 이벤트에 대한 훅(hook)과 명령어 확장을 위한 기능을 갖춘 사용하기 쉬운 광범위한 API를 가지고 있습니다. 또한 Mercurial과 함께 배포되는 `mq` (mercurial queues) 확장 기능이 있어 패치 작업이 단순해집니다.

##### git
`git`은 `cvsserver` 모드를 가지고 있습니다. 즉, CVS를 사용하여 `git`에서 트리를 체크아웃할 수 있습니다. 트리에 커밋할 수도 있지만, 병합과 같은 기능은 없으며, 브랜치는 CVS 모듈로 처리되어 베테랑 CVS 사용자에게는 충격을 줄 수 있습니다.

### 테스트/인상 (Tests/Impressions)

최종적으로 어떤/어떤 DVCS를 선택할지에 대한 결정은 공동 저자가 아닌 저(Brett Cannon)에게 남겨졌기 때문에, 가능한 한 투명하게 하기 위해 다양한 도구를 평가하면서 제가 실행한 테스트와 인상을 기록하는 것이 공정하다고 생각했습니다.

#### 진입 장벽 (Barrier to Entry)

Python 저장소를 체크아웃하는 데 걸리는 시간과 노력은 매우 중요합니다. 어려움이나 시간이 너무 크면 Python에 기여하고 싶어 하는 사람이 포기할 수도 있습니다. 이는 허용될 수 없습니다.

저는 비코어 개발자의 입장에서 2.x 트렁크를 체크아웃하는 것을 측정했습니다. 시간 측정은 `zsh`의 `time` 명령을 사용했고, 공간은 `du -c -h .`로 계산했습니다.

| DVCS | 샌프란시스코 (San Francisco) | 밴쿠버 (Vancouver) | 공간 (Space) |
|---|---|---|---|
| svn | 1:04 | 2:59 | 139 M |
| bzr | 10:45 | 16:04 | 276 M |
| hg | 2:30 | 5:24 | 171 M |
| git | 2:54 | 5:28 | 134 M |

이러한 수치를 `svn`과 비교할 때, 1:1 비교가 아니라는 점을 인식하는 것이 중요합니다. `svn`은 모든 DVCS와 같이 전체 리비전 이력을 가져오지 않습니다. 이는 `svn`이 네트워크에서 다운로드할 정보가 적다는 사실에 근거하여 DVCS보다 훨씬 빠르게 초기 체크아웃을 수행할 수 있음을 의미합니다.

#### 기본 정보 기능 성능 (Performance of basic information functionality)

이력을 쿼리해야 하는 명령을 수행할 때 도구의 성능을 확인하기 위해 `README` 파일의 로그(log)를 측정했습니다.

| DVCS | 시간 (Time) |
|---|---|
| bzr | 4.5 s |
| hg | 1.1 s |
| git | 1.5 s |

이 테스트에서 주목할 점은 `git`이 페이저(pager)를 사용하지 않고 로그를 얻는 방법을 알아내는 데 다른 세 도구보다 더 오래 걸렸다는 것입니다. 페이저 사용은 일반적으로 좋은 점이지만, 자동으로 켜지지 않게 하는 데는 시간이 걸렸습니다 (결국 메인 `git` 명령에는 페이저 사용을 비활성화하는 `--no-pager` 플래그가 있다는 것이 밝혀졌습니다).

#### 내장 도움말에서 명령어 찾기 (Figuring out what command to use from built-in help)

저는 저장소가 복제된 URL을 확인하는 명령이 무엇인지 알아내려고 했습니다. 이를 위해 도구 자체 또는 해당 man 페이지에서 제공하는 도움말만 사용했습니다.

`Bzr`이 가장 쉬웠습니다: `bzr info .` `bzr help`를 실행해도 원하는 것이 표시되지 않았지만, `bzr help commands`를 언급했습니다. 그 목록에는 의미 있는 설명과 함께 명령이 있었습니다.

`Git`이 두 번째로 쉬웠습니다. `git help` 명령은 많은 것을 보여주지 않았고 모든 명령을 나열하는 방법도 없었습니다. 그때 man 페이지를 보았습니다. 다양한 명령을 읽어보니 `git remote`를 발견했습니다. 명령 자체는 `origin` 외에는 아무것도 출력하지 않았습니다. `git remote origin`을 시도하자 오류가 발생했고 명령 사용법이 출력되었습니다. 그때 `git remote show`를 발견했습니다. `git remote show origin`을 실행하자 원하는 정보가 제공되었습니다.

`hg`의 경우, 저는 스스로 원하는 정보를 찾지 못했습니다. 알고 보니 `hg paths`를 원했지만, `hg help`에 의해 출력된 "show definition of symbolic path names"라는 설명으로는 명확하지 않았습니다 (이것을 PEP에 보고한 결과 Mercurial 개발자들이 `hg paths` 명령의 사용을 더 명확하게 하기 위해 문구를 수정했다는 점에 주목해야 합니다).

#### 체크아웃 업데이트 (Updating a checkout)

오래된 저장소를 업데이트하는 데 걸리는 시간을 확인하기 위해 700 커밋 뒤처진 저장소와 50 커밋 뒤처진 저장소 (각각 3주 및 1주 오래된)를 업데이트하는 시간을 측정했습니다.

| DVCS | 700 커밋 (700 commits) | 50 커밋 (50 commits) |
|---|---|---|
| bzr | 39 s | 7 s |
| hg | 17 s | 3 s |
| git | N/A | 4 s |

참고: `Git`은 특정 리비전에서 저장소를 체크아웃하는 것을 허용하지 않는 것으로 보이기 때문에 700 커밋 시나리오에 대한 값이 없습니다.

`git`은 `git pull`의 출력에 대해 특별히 언급할 가치가 있습니다. 각 파일에 대한 델타 변경 정보(delta change information)를 나열할 뿐만 아니라 정보를 색상으로 코딩합니다.

### 결정 (Decision)

PyCon 2009에서 Mercurial을 선택하기로 결정했습니다.

#### Subversion 대신 Mercurial을 선택한 이유 (Why Mercurial over Subversion)

`svn`은 개발팀에 잘 봉사했지만, `svn`이 DVCS만큼 비커미터(non-committer)의 요구를 충족시키지 못한다는 것을 인정해야 합니다. `svn`은 버전 관리, 브랜칭 등과 같은 기능을 저장소에 커밋 권한이 있는 사람에게만 제공하기 때문에 커밋 권한이 없는 사람에게는 방해가 될 수 있습니다. 그러나 DVCS는 그러한 제한이 없으며, 누구나 Python의 로컬 브랜치를 생성하고 전체 `svn` 저장소를 복제하는 부담 없이 자신의 로컬 커밋을 수행할 수 있습니다. 모든 사람이 코어 개발자와 동일한 워크플로를 가질 수 있도록 하는 것이 `svn`에서 `hg`로 전환하는 주요 이유였습니다.

누구나 자신의 브랜치에 로컬로 쉽게 커밋할 수 있도록 하는 이점과 직교적으로, 오프라인 및 빠른 작업이 가능합니다. `hg`는 모든 데이터를 로컬에 저장하므로 원격으로 서버에 요청을 보낼 필요 없이 로컬 디스크에서 작업할 수 있습니다. 이는 응답 시간을 엄청나게 향상시킵니다. 또한 인터넷 연결이 없을 때 오프라인 사용도 가능하게 합니다. 그러나 이 이점은 미미하며 Subversion에서 전환하는 주요 요인이라기보다는 단순한 부수적인 이점으로 간주됩니다.

#### 다른 DVCS 대신 Mercurial을 선택한 이유 (Why Mercurial over other DVCSs)

`git`은 세 가지 주요 이유로 선택되지 않았습니다 (Brett Cannon이 이러한 정확한 이유를 나열하는 PyCon 2009 라이트닝 토크를 참조하십시오; 토크는 3:45에 시작되었습니다). 첫째, `git`의 Windows 지원은 고려 중인 세 가지 DVCS 중 가장 약하며, Python이 실행되는 모든 플랫폼에서 개발을 지원해야 하므로 받아들일 수 없습니다. Python은 Windows에서 실행되고 일부 사람들은 해당 플랫폼에서 개발하기 때문에 견고한 지원이 필요합니다. `git`의 지원이 개선되고 있지만, 현재로서는 문제로 간주될 만큼 충분히 큰 차이로 가장 약합니다.

둘째, 첫 번째 문제만큼이나 중요한 것은 Python 코어 개발자들이 세 가지 DVCS 옵션 중 `git`을 가장 좋아하지 않았다는 것입니다. 다음 표를 보면 코어 개발자들을 대상으로 한 설문 조사 결과와 `git`이 가장 선호되지 않는 버전 관리 시스템임을 큰 차이로 알 수 있습니다.

| DVCS | ++ (매우 선호) | = (보통) | -- (비선호) | 미인지 (Uninformed) |
|---|---|---|---|---|
| git | 5 | 1 | 8 | 13 |
| bzr | 10 | 3 | 2 | 12 |
| hg | 15 | 1 | 1 | 10 |

마지막으로, 모든 것이 동일하다고 가정할 때 (이전 두 문제에서 보여진 것처럼 그렇지 않지만), C와 쉘로 작성된 도구보다는 Python으로 작성된 도구를 사용하고 지원하는 것이 좋습니다. 우리는 단순히 Python으로 작성되었기 때문에 도구를 선택할 만큼 실용적이지는 않지만, 이 경우처럼 합리적일 때 Python을 사용하는 도구를 홍보하는 것이 유용하다고 생각합니다.

Mercurial이 Bazaar보다 선택된 이유는 인기에 있었습니다. 코어 개발자 설문 조사에서 `hg`가 `bzr`보다 선호되었습니다. 그러나 `git`이 고려 대상에서 제외되었다는 발표 후 PyCon에서 보여졌듯이 커뮤니티도 `hg`를 선호하는 것으로 보입니다. 많은 사람들이 Brett에게 와서 다양한 방식으로 `hg`가 선택되기를 원한다고 말했습니다. 아무도 `bzr`이 선택되기를 원하지 않는다고 말하지 않았지만, 아무도 `bzr`이 선택되기를 원한다고도 말하지 않았습니다.

이 모든 정보를 바탕으로 Guido와 Brett은 Mercurial을 Python의 다음 버전 관리 시스템으로 결정했습니다.

### 전환 계획 (Transition Plan)

PEP 385는 `svn`에서 `hg`로의 전환을 간략하게 설명합니다.

### 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 배포되었습니다.## PEP 374 – Python 프로젝트를 위한 분산 VCS 선택 번역 및 요약

이 문서는 Python 프로젝트가 중앙 집중식 버전 관리 시스템(VCS)인 Subversion에서 분산 버전 관리 시스템(DVCS)으로 전환하는 과정을 논의하고, 최종적으로 Mercurial을 채택하게 된 배경과 이유를 설명하는 PEP(Python Enhancement Proposal) 374의 번역 및 정리본입니다.

---

### 1. 배경 (Rationale)

Python 프로젝트는 오랫동안 Subversion과 같은 중앙 집중식 VCS를 성공적으로 사용해왔습니다. 이는 공식 Python 소스 코드를 얻을 수 있는 단일 창구를 제공하고, 언어의 개발 이력을 저장하는 데 큰 역할을 했습니다. 그러나 중앙 집중식 VCS는 몇 가지 심각한 단점을 가지고 있었습니다.

*   **코어 개발자 외 기여자(non-core developer)의 제한된 접근성**: 커밋 권한이 없는 일반 기여자들은 변경 사항 되돌리기, 브랜치 생성, 전체 이력을 가진 변경 사항 게시 등 기본적인 버전 관리 기능을 직접 사용할 수 없었습니다. 이는 패치 작업 및 기여를 어렵게 만드는 주요 진입 장벽이었습니다.
*   **오프라인 작업의 어려움**: 커밋을 위해서는 반드시 인터넷에 연결되어 있어야 했습니다. 이는 이동 중이거나 인터넷 연결이 불안정한 환경에서는 큰 불편을 초래했습니다.
*   **복잡한 패치 수정 및 병합 문제**: 검토 의견에 따라 패치를 수정하는 것이 어려웠고, 중간 작업 내용을 보관할 공간이 부족했습니다. 또한, 기능 브랜치에서 작업하는 동안 트렁크의 변경 사항을 추적하기 어려워 브랜치가 쉽게 오래되거나 병합 충돌이 빈번하게 발생할 위험이 있었습니다.
*   **다중 버전 관리의 비효율성**: Python은 여러 주요 버전(예: 2.6, 2.7, 3.0, 3.1)을 동시에 유지 관리해야 했습니다. 중앙 집중식 VCS는 이러한 다중 브랜치 환경에서의 변경 사항 전파(backport, forward-port) 및 병합 추적에 자연스러운 지원이 부족하여 복잡한 타사 도구에 의존해야 했습니다.

DVCS는 이러한 모든 문제를 해결할 수 있는 대안으로 떠올랐습니다. 누구나 리비전 트리의 마스터 복사본을 복사하여 자신의 로컬에서 자유롭게 커밋하고 브랜치를 만들 수 있으며, 이는 오프라인 작업과 유연한 브랜칭 전략을 가능하게 합니다. 이 PEP는 Subversion을 DVCS로 대체할 가능성을 탐색하며, 최종적으로 DVCS로 전환될지 여부는 이 PEP의 결론에 따라 결정될 것이라고 명시했습니다.

### 2. 용어 (Terminology)

각 VCS마다 용어가 미묘하게 다르므로, PEP에서는 일반적인 정의를 제시합니다.

*   **branch (브랜치)**: 개발 라인; 시간 순서로 정렬된 리비전(revision)들의 모음.
*   **checkout/working copy/working tree (체크아웃/작업 복사본/작업 트리)**: 개발자가 편집할 수 있고 브랜치에 연결된 코드 트리.
*   **index (인덱스)**: 리비전이 구축되는 "스테이징 영역"(git에만 해당).
*   **repository (저장소)**: 브랜치로 구성된 리비전들의 모음.
*   **clone (클론)**: 브랜치 또는 저장소의 완전한 복사본.
*   **commit (커밋)**: 저장소에 리비전을 기록하는 것.
*   **merge (병합)**: 한 브랜치/저장소의 모든 변경 사항과 이력을 다른 브랜치/저장소에 적용하는 것.
*   **pull (풀)**: 원격 또는 로컬일 수 있는 원래 브랜치/저장소에서 체크아웃/클론을 업데이트하는 것.
*   **push/publish (푸시/퍼블리시)**: 한 저장소에서 다른 저장소로 리비전과 해당 리비전에 의존하는 모든 리비전을 복사하는 것.
*   **cherry-pick (체리 픽)**: 한 브랜치에서 하나 이상의 특정 리비전을 다른 브랜치로 병합하는 것.
*   **rebase (리베이스)**: 브랜치를 "분리"하여 새로운 브랜치 지점으로 이동시키는 것.

### 3. 일반적인 워크플로 (Typical Workflow)

현재 중앙 집중식 VCS(Subversion)의 워크플로는 "코드 편집 → 마스터 저장소 커밋"으로 비교적 간단하지만, 네트워크 의존성 및 비원자적(non-atomic) 커밋의 단점이 있었습니다.

DVCS로 전환할 경우 워크플로는 "마스터 저장소 클론 → 로컬 브랜치 생성 → 원자적 단위로 로컬 커밋 → 메인라인으로 브랜치 병합 → 마스터 저장소로 푸시"와 같이 변경됩니다. 이는 개발자가 훨씬 더 독립적으로 작업하고, 디스크 속도로 로컬 커밋을 자주 수행하여 변경 사항을 격리하고, 효율적으로 브랜치를 관리할 수 있게 해줍니다.

### 4. 후보 (Contenders)

이 PEP에서는 Bazaar, Mercurial, git 세 가지 DVCS를 주요 후보로 고려했습니다. darcs, arch, monotone과 같은 다른 DVCS는 인기가 부족하거나 성능 문제로 인해 고려 대상에서 제외되었습니다.

| 이름 (Name) | 약어 (Short Name) | 버전 (Version) |
|---|---|---|
| Bazaar | bzr | 1.12 |
| Mercurial | hg | 1.2.0 |
| git | N/A | 1.6.1 |

### 5. 상호 운용성 (Interoperability)

세 가지 DVCS 모두 git의 "fast-import" 변경 세트 형식을 통한 상호 교환을 지원합니다. 이는 기존의 Subversion 저장소나 다른 DVCS 저장소와의 데이터 교환을 가능하게 합니다.

### 6. 사용 시나리오 (Usage Scenarios)

PEP는 실제 개발 상황에서 자주 발생하는 시나리오(초기 설정, 일회성 패치, 변경 사항 되돌리기, 패치 검토, 백포트, 협업 개발, 이슈 의존성 분리, 릴리스 수행)를 Subversion, Bazaar, Mercurial, git 각각에서 어떻게 수행하는지 자세히 설명합니다. 이를 통해 각 DVCS의 장단점과 워크플로 차이를 비교할 수 있도록 했습니다.

### 7. 플랫폼/도구 지원 (Platform/Tool Support)

*   **운영체제**: 세 가지 DVCS 모두 Windows, OS X, UNIX/Linux와 같은 주요 운영체제에서 사용 가능합니다. 다만, Bazaar만이 Windows용 바이너리 설치 관리자를 직접 제공하며, Mercurial과 git은 타사 설치 관리자에 의존해야 합니다.
*   **CRLF -> LF 지원**: `win32text` 확장을 통해 Mercurial이 지원하며, `git`은 `core.autocrlf` 및 `core.safecrlf` 설정을 통해 지원합니다.
*   **대소문자 구분 없는 파일 시스템 지원**: `bzr`과 `hg`는 잘 지원하지만, `git`은 대소문자 구분 시스템에서의 충돌 감지에는 특화되어 있지 않습니다.
*   **도구**: 코드 검토 도구(Review Board), 호스팅 서비스(Launchpad, bitbucket.org, GitHub), Buildbot 등 다양한 개발 도구와의 연동 가능성을 검토했습니다.

### 8. Subversion 위에 DVCS 사용 (Usage On Top Of Subversion)

세 가지 DVCS 모두 `svn` 지원을 제공하여 `svn` 저장소와 연동할 수 있습니다. `git`만이 `git-svn`을 기본적으로 포함하고 있습니다.

### 9. 개발 (Development)

Bazaar, Mercurial, git 세 프로젝트 모두 활발히 개발 중이며, 각기 다른 릴리스 주기를 가지고 있습니다.

### 10. 특별 기능 (Special Features)

*   **bzr**: 안정적인 Python 스크립팅 인터페이스를 제공하며, 플러그인(plugin) 지원이 강점입니다.
*   **hg**: 사용하기 쉬운 광범위한 API, 훅(hook) 지원, 그리고 패치 관리를 위한 `mq` (mercurial queues) 확장 기능이 특징입니다.
*   **git**: `cvsserver` 모드를 통해 CVS 저장소처럼 사용할 수 있는 기능이 있으나, 병합과 같은 고급 기능은 제한적입니다.

### 11. 테스트/인상 (Tests/Impressions)

Brett Cannon은 각 DVCS의 진입 장벽, 기본 정보 기능 성능, 내장 도움말의 유용성, 체크아웃 업데이트 속도 등을 직접 테스트하고 평가했습니다.

*   **진입 장벽**: 초기 체크아웃 시간은 Subversion이 가장 빨랐지만, 이는 Subversion이 전체 이력을 가져오지 않기 때문입니다. DVCS 중에서는 `git`이 가장 빠르고 `hg`가 그 뒤를 이었습니다.
*   **기본 정보 기능 성능**: `README` 파일의 로그를 가져오는 시간은 `hg`가 1.1초로 가장 빨랐고, `git`은 1.5초, `bzr`은 4.5초였습니다.
*   **내장 도움말**: `bzr`이 명령어 찾기가 가장 쉬웠고, `git`이 두 번째였습니다. `hg`는 `hg paths`와 같은 명령어를 찾기 어려웠다는 점이 지적되었습니다.
*   **체크아웃 업데이트**: 50 커밋 뒤처진 저장소 업데이트 시 `hg`가 3초, `git`이 4초, `bzr`이 7초를 기록했습니다.

### 12. 결정 (Decision)

PyCon 2009에서 **Mercurial**을 Python의 다음 버전 관리 시스템으로 선택하기로 결정했습니다.

#### Subversion 대신 Mercurial을 선택한 이유 (Why Mercurial over Subversion)

가장 큰 이유는 **모든 개발자가 코어 개발자와 동일한 유연한 워크플로를 가질 수 있도록 하기 위함**이었습니다. Mercurial은 누구나 로컬 브랜치를 생성하고 오프라인에서 커밋할 수 있게 하여, Subversion의 제한된 접근성과 오프라인 작업의 불편함을 해소했습니다. 오프라인 및 빠른 로컬 작업은 중요한 이점이지만, Subversion에서 전환하는 주된 동기라기보다는 부수적인 이점으로 간주되었습니다.

#### 다른 DVCS 대신 Mercurial을 선택한 이유 (Why Mercurial over other DVCSs)

*   **Git이 선택되지 않은 이유**:
    *   **Windows 지원의 약점**: `git`의 Windows 지원은 세 후보 중 가장 약했으며, Python 개발이 모든 플랫폼에서 원활해야 한다는 점을 고려할 때 이는 수용할 수 없는 문제로 판단되었습니다.
    *   **코어 개발자의 선호도**: Python 코어 개발자들의 설문 조사 결과, `git`은 세 가지 옵션 중 가장 선호도가 낮았습니다 (Mercurial 15표, Bazaar 10표, Git 5표).
    *   **Python으로 작성된 도구 선호**: 다른 조건이 동일하다면, C와 쉘(shell)이 아닌 Python으로 작성된 도구를 사용하고 지원하는 것이 바람직하다는 점도 고려되었습니다.
*   **Bazaar 대신 Mercurial을 선택한 이유**:
    *   **인기 및 커뮤니티 선호**: 코어 개발자 설문 조사와 PyCon 커뮤니티의 반응에서 Mercurial이 Bazaar보다 더 선호되는 것으로 나타났습니다.

이러한 모든 정보를 바탕으로 Guido van Rossum과 Brett Cannon은 Mercurial을 Python의 새로운 버전 관리 시스템으로 최종 결정했습니다.

### 13. 전환 계획 (Transition Plan)

Subversion에서 Mercurial로의 전환 계획은 PEP 385에서 자세히 다루고 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.