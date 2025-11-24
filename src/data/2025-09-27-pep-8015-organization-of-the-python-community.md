---
title: "[Rejected] PEP 8015 - Organization of the Python community"
excerpt: "Python Enhancement Proposal 8015: 'Organization of the Python community'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8015/
toc: true
toc_sticky: true
date: 2025-09-27 19:29:53+0900
last_modified_at: 2025-09-27 19:29:53+0900
published: true
---
> **원문 링크:** [PEP 8015 - Organization of the Python community](https://peps.python.org/pep-8015/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 04-Oct-2018


## PEP 8015 – Python 커뮤니티의 조직 (Organization of the Python community)

**작성자:** Victor Stinner
**상태:** 거부됨 (Rejected)
**유형:** 정보 (Informational)
**주제:** 거버넌스 (Governance)
**생성일:** 2018년 10월 4일

### 초록 (Abstract)
이 PEP는 Python 커뮤니티의 현재 조직을 공식화하고 세 가지 주요 변경 사항을 제안합니다.
1. 기존의 "Python 팀" 개념을 공식화합니다.
2. Python 팀에 더 많은 자율성을 부여합니다.
3. BDFL(Guido van Rossum)을 5명의 새로운 "Python Steering Committee"로 교체합니다. 이 위원회는 제한된 역할을 가지는데, 주로 의사결정 방식을 결정하지만 직접 의사결정은 하지 않습니다.

PEP는 PEP 위임자(delegate) 또는 핵심 개발자(core developers)의 투표(2/3 이상의 다수결)를 통해 승인됩니다.

### PEP 거부 사유 (PEP Rejection Rationale)
PEP 8015는 2018년 12월 17일 월요일, PEP 8001에 설명된 핵심 개발자 투표를 통해 거부되었습니다. 대신 PEP 8016과 해당 문서에서 설명하는 거버넌스 모델이 채택되었습니다.

### 배경 (Rationale)
이 PEP는 Python 사용자부터 Python Steering Committee까지 전체 Python 개발 커뮤니티의 조직을 설명합니다. 모든 그룹과 역할을 하나의 문서에 설명함으로써 조직의 일관성을 높이는 데 도움이 됩니다.

이 거버넌스 변경은 기존 BDFL 조직에서 새로운 Steering Committee 조직으로의 원활한 전환을 위해 변경 사항을 최소화했습니다.

조직의 핵심 설계 원칙 중 하나는 의사결정 병목 현상을 피하는 것입니다. 토론과 의사결정은 각 주제의 전문가를 찾을 수 있는 Python 팀으로 분산됩니다. 이를 통해 PEP에 대한 토론이 더 원활해지고, 해당 주제에 대한 지식이 풍부한 소수의 사람들이 참여할 것으로 기대됩니다.

이전에는 대부분의 의사결정이 BDFL(Benevolent Dictator For Life)인 Guido van Rossum에 의해 이루어졌습니다. Python의 인기가 높아지면서 한 개인에게 가해지는 압박이 증가했습니다. 제안된 조직은 압박을 줄이고 개인의 소진을 방지하기 위해 의사결정 및 책임을 분산합니다.

대부분의 의사결정 권한을 커뮤니티 내에 유지하기 위해 Python Steering Committee의 역할은 매우 제한적입니다. 이는 소수의 개인을 통해 특정 그룹이나 회사가 Python 프로젝트를 "장악"할 위험을 줄이려는 의도입니다. 프로젝트는 자율적이고 모두에게 개방된 상태를 유지해야 합니다.

가장 민감한 PEP는 민주주의 방식으로 결정됩니다. 즉, 핵심 개발자에게만 허용된 투표를 통해 결정됩니다. 투표 방식은 아래 "PEP 프로세스" 섹션을 참조하십시오.

### 공통 지침 (Common Guidelines)
Python 커뮤니티는 모든 사람에게 열려 있습니다. 구성원들은 Python 커뮤니티 행동 강령(Python Community Code of Conduct)을 존중해야 하며, 이는 건설적인 토론을 유지하고 모든 사람이 환영받는다고 느끼도록 보장합니다. Python은 자율적인 프로젝트이며 앞으로도 그럴 것입니다. 의사결정 권한을 가진 사람들은 사용자 및 기여자들의 다양성을 반영해야 합니다.

### 커뮤니티 조직 (Community Organization)
현재 Python 프로젝트에는 다양한 그룹의 사람들이 참여하고 있습니다. 더 많이 참여할수록 더 많은 의사결정 권한을 얻게 됩니다. 가장 깊은 그룹에 접근하는 사람들이 가장 신뢰받는 사람들이어야 한다는 것이 중요합니다.

이 PEP는 다음 그룹을 공식화합니다.
*   Python 사용자 (Python Users)
*   Python 기여자 (Python Contributors)
*   Python 팀 구성원 (Python Teams Members)
*   Python 핵심 개발자 (Python Core Developers)
*   Python Steering Committee 구성원 (Python Steering Committee Members)
*   PSF 행동 강령 워킹 그룹 (PSF Code of Conduct Workgroup)

#### Python 사용자 (Python Users)
이 그룹은 가장 큰 그룹으로, Python을 사용하는 모든 사람을 의미합니다.

#### Python 기여자 (Python Contributors)
Python 사용자가 Python 메일링 리스트에 이메일을 보내거나, Python 버그 트래커에 의견을 남기거나, Python 변경 사항을 제안하거나 검토하는 순간 Python 기여자가 됩니다.

#### Python 팀 (Python Teams)
Python이 너무 커져서 더 이상 단일 팀으로 운영되기 어려워졌기 때문에, 사람들은 특정 주제에 대해 더 긴밀하게 작업하기 위해 자연스럽게 팀을 구성했습니다. 때로는 이를 "Special Interest Group (SIG)"이라고 부르기도 합니다.

충분한 수의 개발자가 특정 주제에 관심을 가지면 새로운 팀을 만들 수 있습니다. 일반적으로 주된 행동은 Python Postmaster에게 새로운 "SIG" 메일링 리스트를 생성해달라고 요청하는 것이지만, 팀은 다른 통신 채널을 사용할 수도 있습니다.

팀 구성원은 Python 기여자 및 Python 핵심 개발자입니다. 팀은 자체적으로 조직되며, 누가 팀에 합류할 수 있고 어떻게 합류할지 선택할 책임이 있습니다.

팀 구성원은 팀 버그 트래커 구성 요소에 대한 버그 분류(bug triage) 권한을 얻을 수 있습니다. 팀에 더 많이 참여할수록 더 많은 의사결정 권한과 책임을 얻게 됩니다.

팀은 자체 PEP에 대해 결정할 수 있는 권한을 얻을 수도 있지만, Python Steering Committee만이 이를 허용할 수 있습니다(그리고 이 권한을 철회할 수도 있습니다). 이러한 경우는 예외적이며, 현재 Packaging Team만이 그러한 권한을 가지고 있습니다.

부록: Python 팀 예시(Annex: Examples of Python Teams)를 참조하십시오.

#### Python 핵심 개발자 (Python Core Developers)
핵심 개발자의 제한된 정의는 변경 사항을 병합(코드 어디든)하고 버그 분류 권한(모든 버그 트래커 구성 요소에 대해)을 가질 수 있는 능력입니다.

핵심 개발자는 변경 사항을 승인하거나 거부해야 할지, 그리고 (더 중요하게는) 어떤 변경 사항을 만들어서는 안 되는지를 결정하는 데 필요한 기술을 보유하고 있음을 입증한 개발자입니다. Python은 오랜 역사, 하위 호환성에 대한 큰 제약, 높은 품질 기준(예: 변경 사항에 새로운 테스트 필요)을 가지고 있습니다. 이러한 이유로 핵심 개발자가 되는 데는 수개월 이상이 걸릴 수 있습니다.

핵심 개발자가 된다는 것은 더 많은 책임을 의미합니다. 예를 들어, 개발자가 변경 사항을 병합하면 해당 수정된 코드의 회귀(regression) 및 유지보수에 대한 책임도 지게 됩니다.

핵심 개발자는 행동 강령(Code of Conduct)에 있어 모범적이어야 합니다. 그들은 기여자들을 멘토링하도록 장려됩니다.

**기여자를 핵심 개발자로 승격 (Promote a contributor as core developer)**
기존 핵심 개발자가 기여자가 핵심 그룹에 합류할 준비가 되었다고 판단하면, 해당 핵심 개발자는 기여자에게 핵심 개발자가 될 의향이 있는지 묻습니다. 기여자가 이러한 새로운 책임에 관심이 있다면 투표가 조직됩니다.

투표는 핵심 개발자에게만 허용되며 공개적으로 1주일 동안 진행됩니다. 일반적으로 승격을 제안하는 핵심 개발자는 투표 설명에 후보자의 작업과 기술을 설명해야 합니다. 기여자는 2/3(>= 2/3) 이상의 찬성(" +1") 표를 얻어야만 승격됩니다. " +1" 및 " -1" 표만 집계됩니다. 다른 표(예: null, " -0", " +0.5")는 무시됩니다.

후보자가 승격되면, 일반적으로 새로운 책임을 처리하는 데 도움을 주기 위해 1개월 동안 멘토를 배정받습니다.

후보자가 승격되지 않은 경우, 예를 들어 6개월 후와 같이 후보자가 부족한 기술을 얻었을 때 새로운 투표를 다시 조직할 수 있습니다.

#### Python Steering Committee
Python Steering Committee는 가장 많은 의사결정 권한을 가지고 있기 때문에 가장 신뢰받는 핵심 개발자들로 구성됩니다. 이 그룹의 역할은 Python이 자율성을 유지하고 개방성을 유지하도록 엄격하게 제한됩니다.

Python Steering Committee는 5명의 위원으로 구성됩니다. 위원들은 3년 임기로 선출되며 매년 1/3이 교체됩니다(첫해: 1명, 둘째 해: 2명, 셋째 해: 2명). 이러한 방식으로 위원은 Python의 전체 릴리스 기간 동안 활동하며 위원회 구성은 자주 업데이트됩니다. 위원회 위원은 자신이 떠나는 자리에 다시 출마할 수 있습니다. 임기 제한은 없습니다.

위원회 위원은 Python 핵심 개발자여야 합니다. 위원회 구성원이 Python 사용자 및 기여자의 다양성을 반영하는 것이 중요합니다. 이를 보장하는 작은 단계는 2명(5명 중 50% 미만)만이 동일한 고용주(동일 회사 또는 동일 회사의 자회사)에서 근무할 수 있도록 강제하는 것입니다.

5명의 위원 수는 위원들의 다양성을 위해, 그리고 위원 중 한 명이 알 수 없는 기간 동안 활동할 수 없게 되더라도 위원회가 계속해서 작동할 수 있도록 보장하기 위해 선택되었습니다.

**Python Steering Committee의 역할 (Python Steering Committee Roles)**
Python Steering Committee의 역할은 다음과 같습니다.
*   PEP가 승인(또는 거부 또는 연기)되는 방식을 결정합니다.
*   Python 팀에 권한을 부여하거나 취소합니다. 예를 들어, 팀이 기여자에게 버그 분류 권한(팀 구성 요소에 대해)을 부여하도록 허용합니다.

PEP가 승인(또는 거부 또는 연기)되는 방식을 결정하기 위한 두 가지 옵션이 있습니다.
1.  위원회는 PEP 위임자(이전에는 "BDFL-delegate"로 알려짐)를 선출합니다. 이 핵심 개발자는 특정 PEP에 대한 최종 결정을 내릴 것입니다. 위원회는 PEP가 논의되는 Python 팀에서 제안할 수 있는 PEP 위임자를 선택합니다.
2.  위원회는 PEP에 대한 투표를 조직할 수 있습니다. 투표 조직에 대한 내용은 "PEP 프로세스"를 참조하십시오. 위원회는 투표가 언제 조직될지 결정합니다. 언어 변경과 같이 모든 Python 사용자에게 영향을 미치는 변경 사항에는 투표가 선호됩니다.

위원회는 Python의 "비전"과 일관성을 유지합니다. 또한 중요한 기능이 완료되도록 보장합니다. PEP 위임자를 선택할 수 있는 능력은 이러한 목표를 달성하는 데 도움이 되도록 고안되었습니다.

**Python Steering Committee 위원 선출 (Election of Python Steering Committee Members)**
투표는 Steering Committee에 의해 조직됩니다. 3주 전에 공지되며, 후보자는 이 기간 동안 지원해야 합니다. 투표는 핵심 개발자에게만 허용되며 1주일 동안 진행됩니다. 자체 검열을 피하기 위해 투표는 비밀 투표를 사용합니다. 이는 더 많은 권한을 얻을 수 있는 사람(선출될 경우)의 적대감을 피하기 위함입니다.

투표는 Condorcet Internet Voting Service (CIVS)와 같은 온라인 서비스를 사용하여 Condorcet 방식의 Schulze/Beatpath/CSSD 변형을 사용합니다. 이 투표 방식은 동점(tie) 발생 위험을 줄입니다. 또한 위원회 구성을 위해 필요한 모든 후보자의 순위를 생성합니다.

동점이 발생하면, 동점에 관련된 후보자들 사이에서 동일한 투표 방식으로 즉시 새로운 투표가 1주일 동안 조직됩니다. 두 번째 투표에서도 다시 동점이 발생하면, 현재 Steering Committee가 선출된 위원을 선택할 책임이 있습니다.

위원회 위원이 사임하면, 그를 대체하기 위한 새로운 투표가 조직됩니다.

위원회 위원의 상황이 위원회 제약 조건(예: 다른 두 위원과 같은 회사로 이동)을 더 이상 충족하지 못하게 변경되면 사임해야 합니다. 위원의 고용주가 다른 두 위원의 고용주에게 인수되는 경우, 임기가 더 일찍 끝나는 위원이 인수가 완료되면 사임해야 합니다.

**Python Steering Committee 위원 생성 선출 (Election Creating the Python Steering Committee Members)**
프로세스를 부트스트랩하기 위해 위원회 생성 시 5명의 위원이 선출됩니다. 투표는 정기 위원회 투표와 동일한 규칙을 따르지만, 선출에는 5명의 위원이 필요하며 투표는 PSF 이사회(PSF Board)가 조직합니다.

위원회 선거에서 상위 5위 득표자 중 3명이 같은 고용주에서 일하는 경우, 그 중 가장 낮은 순위의 후보자는 실격 처리되고 6위 후보자가 5위로 올라갑니다. 유효한 위원회가 구성될 때까지 이 과정이 반복됩니다.

동점이 발생하면, 동점에 관련된 후보자들과 나머지 자리를 채우기 위한 다음 후보자들 사이에서 즉시 두 번째 투표가 조직됩니다. 투표는 정기 위원회 투표와 동일한 규칙을 따릅니다. 두 번째 투표에서도 여전히 동점이 발생하면 PSF 이사회가 위원을 선출하고 투표 결과에서의 순위를 결정할 책임이 있습니다.

선출된 위원의 투표 결과 순위는 고유해야 합니다. 1위와 2위는 3년 임기, 2위와 3위는 2년 임기, 5위는 1년 임기로 선출됩니다.

예시 (동점이 있는 투표 결과):
A B C D E, F G …

처음 4명의 후보자(A, B, C, D)는 즉시 선출됩니다. E가 다른 두 명의 선출된 위원과 같은 고용주에서 일하는 경우 F도 선출됩니다. 그렇지 않으면 E와 F 사이에서 5번째 자리를 위한 두 번째 투표가 조직됩니다.

**특별 사례: Steering Committee 위원과 PEP (Special Case: Steering Committee Members And PEPs)**
위원회 위원은 PEP 위임자가 될 수 있습니다.

위원회 위원은 PEP를 제안할 수 있지만, 자신의 PEP의 위임자가 될 수는 없습니다.

위원회가 PEP에 대한 투표가 필요하다고 결정할 때, 위원회 위원은 핵심 개발자이기도 하므로 투표할 수 있지만, 다른 핵심 개발자보다 더 많은 권한을 가지지는 않습니다.

#### PSF 행동 강령 워킹 그룹 (PSF Code of Conduct Workgroup)
**헌장 (Charter)**
이 워킹 그룹의 목적은 PSF의 행동 강령을 시행하고, "Python 관련 기술 및 교육 자료의 지속적인 개발"이라는 PSF의 사명을 지원하는 행동 강령에 대한 지침과 권고를 Python 커뮤니티에 제공함으로써 다양하고 포용적인 Python 커뮤니티를 육성하는 것입니다.

우리는 다음 세 가지 방식으로 이 공통 목표를 향해 노력합니다.
1.  PSF 행동 강령 및 PSF가 지원하는 다른 커뮤니티와 관련된 정책을 검토, 수정 및 조언합니다. 여기에는 PSF 관할의 모든 #python 채팅 커뮤니티 및 python.org 이메일 목록이 포함됩니다.
2.  컨퍼런스, 메일링 리스트, Slack/IRC, 코드 저장소 등 다양한 상호 작용 채널에 대한 표준 행동 강령 세트 및 지원 문서를 만듭니다.
3.  Python 커뮤니티 주최자가 행동 강령을 구현하고 시행하는 데 도움이 되는 교육 자료 및 기타 프로세스를 개발합니다.

이 워킹 그룹의 조직은 ConductWG 헌장(ConductWG Charter)에 의해 정의됩니다.

**특별 사례: 핵심 개발자 금지 (Special Case: Ban a core developer)**
Python 커뮤니티의 다른 구성원과 마찬가지로 PSF 행동 강령 워킹 그룹은 핵심 개발자를 제한된 시간 동안 금지할 수 있습니다. 이 경우 핵심 개발자는 즉시 핵심 개발자 지위를 잃습니다. 핵심 개발자는 행동 강령에 있어 모범적이어야 합니다.

일반적으로 금지는 다른 모든 옵션이 소진되었을 때 최후의 수단입니다.

금지 기간이 끝나면 개발자는 일반 기여자로 다시 기여할 수 있습니다.

개발자가 행동을 변경하면, 다른 핵심 개발자가 개발자를 핵심 개발자로 승격시키기 위한 새로운 투표를 조직할 수 있습니다. 투표는 다른 Python 기여자들과 동일한 절차를 따릅니다.

### PEP 프로세스 (PEP process)
PEP에는 두 가지 주요 역할이 있습니다.
*   PEP 작성자 (PEP Authors)
*   PEP 위임자 (PEP Delegate)

PEP 작성자는 고품질 PEP를 작성하기 위해 최선을 다합니다.

PEP 위임자는 작성자가 PEP를 개선하도록 돕고 최종 결정(PEP 수락, 거부 또는 연기)을 내리는 책임이 있습니다. 또한 토론을 안내하는 데 도움을 줄 수 있습니다.

결정이 내려지지 않은 경우, 작성자는 나중에(예: 1년 후) PEP를 다시 제안할 수 있으며, 가능하다면 변경을 유도할 새로운 데이터를 포함할 수 있습니다. PEP 위임자는 PEP를 거부하지 않고 나중에 토론을 다시 시작하도록 장려하기 위해 PEP를 "연기됨(Deferred)"으로 표시할 수도 있습니다.

Python 팀에 특정한 PEP는 팀 메일링 리스트에서 논의됩니다. 언어 변경과 같이 모든 Python 개발자에게 영향을 미치는 PEP는 python-dev 메일링 리스트에서 논의되어야 합니다.

#### PEP에 대한 투표 (Vote on a PEP)
Python Steering Committee가 PEP에 더 넓은 승인이 필요하다고 결정하면 투표가 조직됩니다.

투표는 핵심 개발자에게만 허용되며 공개적으로 1주일 전에 공지되고 1주일 동안 진행됩니다. PEP는 1주일 공지 기간 동안 업데이트될 수 있지만, 투표 기간 동안에는 수정되어서는 안 됩니다. 이러한 투표는 PEP가 논의되었던 메일링 리스트에서 이루어집니다. 위원회는 투표가 언제 조직될지 결정합니다. PEP는 투표에 부치기 전에 합리적인 시간 동안 논의되어야 합니다.

PEP는 2/3(>= 2/3) 이상의 찬성(" +1") 표를 얻어야만 승인됩니다. " +1" 및 " -1" 표만 집계됩니다. 다른 표(예: null, " -0", " +0.5")는 무시됩니다.

PEP는 투표를 통해 승인되거나 거부될 수 있으며, 연기될 수는 없습니다.

#### 결정 부재 (Lack of Decision)
논의가 합의에 도달하지 못하거나, Python Steering Committee가 PEP 위임자를 선택하지 못하거나, PEP 위임자가 결정을 내리지 못하면 Python이 발전하지 못할 위험이 있습니다.

그것은 괜찮습니다. 때로는 아무것도 하지 않는 것이 가장 현명한 선택입니다.

#### 이 PEP 변경 (Change this PEP)
이 PEP의 첫 번째 버전은 Guido van Rossum이 2018년 7월 BDFL 역할에서 사임하기로 결정한 후에 작성되었습니다. 이 PEP 이전에 Python 커뮤니티 구성원의 역할은 공식화된 적이 없었습니다. 첫 시도에 완벽한 조직을 설계하는 것은 어렵습니다. 이 PEP는 미래에 조직을 조정하고, 예외적인 경우(corner cases)를 처리하는 방법을 명시하고, 실수를 수정하기 위해 업데이트될 수 있습니다.

이 PEP에 대한 모든 변경 사항은 투표를 통해 검증되어야 합니다. 투표는 3주 전에 공지되며 핵심 개발자에게만 허용되고 python-committers 메일링 리스트에서 공개적으로 진행되며 1주일 동안 진행됩니다. 제안된 PEP 변경 사항은 3주 공지 기간 동안 업데이트될 수 있지만, 투표 기간 동안에는 수정되어서는 안 됩니다.

변경 사항은 4/5(>= 4/5) 이상의 찬성(" +1") 표를 얻어야만 승인됩니다. " +1" 및 " -1" 표만 집계됩니다. 다른 표(예: null, " -0", " +0.5")는 무시됩니다.

### 부록: 투표 요약 (Annex: Summary on votes)
| 투표 대상 | 공지 기간 | 공개 기간 | 투표 방식 |
| :---------------- | :----- | :------ | :------------------------------------ |
| 기여자 승격 | 없음 | 1주 | 공개, >= 2/3 다수결 |
| PEP | 1주 | 1주 | 공개, >= 2/3 다수결 |
| 이 PEP 변경 | 3주 | 1주 | 공개, >= 4/5 다수결 |
| Steering Committee | 3주 | 1주 | 비공개, Condorcet (Schulze/Beatpath/CSSD) |

이 모든 투표는 핵심 개발자에게만 허용됩니다.

### 부록: Python 팀 예시 (Annex: Examples of Python Teams)
아래는 몇 가지 Python 팀의 예시입니다(이 목록은 이 PEP에서 최신 상태로 유지되지 않습니다).

#### Packaging Team
Packaging Team은 자체 PEP 카테고리를 운영하며 자체 PEP를 승인(또는 거부)할 수 있습니다.
*   **웹사이트:** packaging.python.org
*   **메일링 리스트:** distutils-sig
*   **버그 트래커 구성 요소:** Distutils
*   **예시 구성원:** Paul Moore, Alyssa Coghlan, Donald Stuff
*   **표준 라이브러리 모듈:** `distutils`
*   **현재 PEP 위임자:** Paul Moore

#### IDLE Team
IDLE은 Python 표준 라이브러리에서 특별한 경우입니다. 단순한 모듈이 아니라 전체 응용 프로그램입니다. 이러한 이유로 코드는 모든 Python 안정 브랜치에서 동일하게 유지하기로 결정되었습니다(표준 라이브러리는 새로운 안정 브랜치에서 분기되지만).
*   **버그 트래커 구성 요소:** IDLE
*   **예시 구성원:** Terry Reedy, Cheryl Sabella, Serhiy Storchaka
*   **표준 라이브러리 모듈:** `idlelib`

#### Mentorship Team
핵심 개발자가 되는 것은 길고 느린 과정입니다. 멘토링은 미래의 핵심 개발자로서 기여자를 훈련하고 신뢰 관계를 구축하는 효율적인 방법입니다.
*   **웹사이트:**
    *   https://www.python.org/dev/core-mentorship/
    *   https://devguide.python.org/
*   **저장소:** https://github.com/python/devguide
*   **메일링 리스트:** core-mentorship (비공개 아카이브)
*   **예시 구성원:** Guido van Rossum, Carol Willing, Victor Stinner
*   **참고:** 이 그룹은 핵심 개발자 승격을 담당하지 않습니다.

#### Documentation Team
*   **메일링 리스트:** doc-sig
*   **버그 트래커 구성 요소:** Documentation
*   **GitHub 태그:** type-doc
*   **예시 구성원:** Julien Palard, INADA Naoki, Raymond Hettinger
이 팀은 문서 번역도 관리합니다.
"Devguide"를 유지보수하는 Mentorship 팀도 참조하십시오.

#### Security Team
*   **웹사이트:** https://www.python.org/news/security/
*   **메일링 리스트:**
    *   security@python.org (취약점 보고용)
    *   security-sig (공개 목록)
*   **표준 라이브러리 모듈:** `hashlib`, `secrets`, `ssl`
*   **예시 구성원:** Christian Heimes, Benjamin Peterson
security@python.org 메일링 리스트는 초대 전용이며, "Python Security Response Team (PSRT)" 구성원만 이메일을 읽고 회신할 수 있습니다. 반면 security-sig는 공개 목록입니다.
*   **참고:** 이 팀은 PEP를 거의 제안하지 않습니다.

#### Performance Team
*   **웹사이트:** https://speed.python.org/
*   **메일링 리스트:** speed
*   **저장소:**
    *   https://github.com/python/performance
    *   https://github.com/tobami/codespeed
*   **버그 트래커 유형:** Performance
*   **GitHub 레이블:** type-performance
*   **표준 라이브러리 모듈:** `cProfile`, `profile`, `pstats`, `timeit`
*   **예시 구성원:** Victor Stinner, INADA Naoki, Serhiy Storchaka
성능에 영향을 미치는 PEP는 일반적으로 모든 사람에게 영향을 미치므로 speed 메일링 리스트보다는 python-dev 메일링 리스트에서 논의됩니다.

#### Asynchronous Programming Team
*   **웹사이트:** https://docs.python.org/dev/library/asyncio.html
*   **메일링 리스트:** async-sig
*   **버그 트래커 구성 요소:** asyncio
*   **GitHub 레이블:** expert-asyncio
*   **표준 라이브러리 모듈:** `asyncio`, `contextvars`
*   **예시 구성원:** Andrew Sveltov, Yury Selivanov
`asyncio` 및 `contextvars`만 수정하는 PEP는 async-sig 메일링 리스트에서 논의될 수 있지만, Python 언어에 영향을 미치는 변경 사항은 python-dev에서 논의되어야 합니다.

#### Type Hints Team
*   **웹사이트:** http://mypy-lang.org/
*   **저장소:** https://github.com/python/typing
*   **mypy 프로젝트를 위한 GitHub 레이블:** topic-pep-484
*   **표준 라이브러리 모듈:** `typing`
*   **예시 구성원:** Guido van Rossum, Ivan Levkivskyi, Jukka Lehtosalo, Łukasz Langa, Mark Shannon
*   **참고:** Python 3.6 및 이전 버전을 위한 백포트(backport)가 PyPI의 `typing`에 있습니다.

### 버전 기록 (Version History)
이 PEP의 역사:
*   **버전 7:** Steering Committee 조정
    *   Steering Committee는 3명 대신 5명으로 구성됩니다.
    *   임기 제한이 없습니다(이전에는 2번의 임기, 총 6년 제한).
    *   위원회 위원은 이제 PEP 위임자가 될 수 있습니다.
*   **버전 6:** 투표 조정
    *   Condorcet 방식 명시: Python Steering Committee 위원 선출에 Schulze/Beatpath/CSSD 변형 사용.
    *   동점 처리 방법 및 고용주에 대한 제약 조건 명시.
    *   기여자 승격 및 PEP에 대한 투표는 이제 50% + 1 대신 >= 2/3가 필요합니다.
    *   이 PEP 변경에 대한 투표는 이제 50% + 1 대신 >= 4/5가 필요합니다.
    *   회사 인수 처리 방법 설명.
*   **버전 5:** Python Steering Committee 위원 선출에 비밀 투표 사용.
*   **버전 4:**
    *   투표 조정: 1개월 대신 1주일 동안 진행되며 미리 공지됩니다.
    *   "Python Core Board"를 "Python Steering Committee"로 이름 변경.
    *   이 위원회는 PEP를 승인하지 않으며 위원회 위원은 2개 이상의 임기를 중복할 수 없음을 명확히 함.
    *   부록에 "Type Hints" 팀 추가.
*   **버전 3:** "특별 사례: 핵심 개발자 금지" 및 "이 PEP를 업데이트하는 방법" 섹션 추가.
*   **버전 2:** PSF Board와의 혼동을 피하기 위해 "Python board"를 "Python Core Board"로 이름 변경.
*   **버전 1:** python-committers 및 discuss.python.org에 게시된 첫 번째 버전.

---
**저작권:** 이 문서는 퍼블릭 도메인에 공개되었습니다.
**출처:** https://github.com/python/peps/blob/main/peps/pep-8015.rst
**최종 수정:** 2025-02-01 08:55:40 GMT

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.