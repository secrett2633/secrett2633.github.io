---
title: "[Active] PEP 732 - The Python Documentation Editorial Board"
excerpt: "Python Enhancement Proposal 732: 'The Python Documentation Editorial Board'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/732/
toc: true
toc_sticky: true
date: 2025-09-27 13:23:00+0900
last_modified_at: 2025-09-27 13:23:00+0900
published: true
---
> **원문 링크:** [PEP 732 - The Python Documentation Editorial Board](https://peps.python.org/pep-0732/)
>
> **상태:** Active | **유형:** Process | **작성일:** 14-Oct-2023

## PEP 732 – Python 문서 편집 위원회

### 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 Python 문서 편집 위원회(Python Documentation Editorial Board)를 설립하고, 이 편집 위원회가 어떻게 운영될 것인지 제안합니다.

### 배경 (Motivation)

2021년 3월, Steering Council은 문서의 방향을 설정하기 위해 Documentation Working Group (문서 워킹 그룹)의 생성을 승인했습니다. 이 그룹은 이후 보다 전술적인 작업에 중점을 두기 위해 생성된 다른 Documentation Working Group과 구별하기 위해 'Editorial Board'로 명칭이 변경되었습니다.

Python 문서의 목적은 현재와 미래의 Python 최종 사용자에게 봉사하는 것입니다. 이를 위해 핵심 개발 커뮤니티와 더 넓은 Python 문서 기여자들이 함께 협력합니다.

### 상세 내용 (Specification)

#### 임무 (Mandate)

편집 위원회는 다음을 수행합니다.

*   Python 문서의 품질을 유지하고 개선하기 위한 프로세스가 마련되도록 보장합니다.
*   현재와 미래의 사용자에게 봉사하는 커뮤니티 리소스(community resource)로서 Python 문서가 발전하도록 지원합니다.
*   Python 프로그래밍 언어를 발전시키고, 다양하고 국제적인 Python 프로그래머 커뮤니티의 성장을 지원하고 촉진하는 Python Software Foundation (PSF)의 미션(mission)에 따라 행동합니다.
*   문서 기여가 접근 가능하고(accessible), 포괄적이며(inclusive), 지속 가능하도록(sustainable) 보장합니다.
*   문서 콘텐츠에 대한 적절한 의사 결정 프로세스를 확립합니다.
*   결정을 내리기 전에 기여자들 간의 합의를 이루려고 노력합니다.
*   문서 콘텐츠 결정에 대한 최종 중재자(final arbiter) 역할을 합니다.

#### 책임 (Responsibilities)

위원회는 아래에 명시된 범위 내에서 Python 문서에 대한 결정을 내릴 권한을 가집니다. 예를 들어, 다음을 수행할 수 있습니다.

*   Python 문서의 큰 그림 전략을 설정합니다.
*   문서의 의도된 구조를 설정합니다.
*   글쓰기와 디자인 모두에 대한 스타일 및 편집 결정을 내립니다.
*   문서 거버넌스(governance)를 처리합니다 (예: 의사 결정을 주제 전문가에게 위임, 의견 불일치 해결, 결정 등).

#### 범위 (Scope)

편집 위원회는 다음 내용에 대한 콘텐츠 및 전략을 감독합니다.

*   **포함 범위 (In scope):**
    *   CPython 문서 (`docs.python.org`)
    *   CPython 개발 가이드 (`devguide.python.org`)
    *   CPython 문서 번역
    *   PEPs (`peps.python.org`)
*   **제외 범위 (Not in scope):**
    *   CPython 코드베이스 내 코드 주석 (Code comments in CPython codebase)
    *   CPython docstrings (주석 문자열)
    *   PyPA 문서
    *   `www.python.org`
    *   Python Wiki (`wiki.python.org`)

#### 구성 (Composition)

Python 문서 편집 위원회는 5명의 위원으로 구성됩니다.

##### 편집 위원회 위원 (Editorial Board Members)

초기 편집 위원회 위원은 다음과 같습니다.

*   Mariatta Wijaya
*   Ned Batchelder
*   Joanna Jablonski
*   Guido van Rossum
*   Carol Willing

##### 편집 위원회 위원 자격 (Editorial Board Member Qualifications)

편집 위원회 위원은 다음을 갖춰야 합니다.

*   Python 프로젝트 철학에 대한 깊은 이해
*   Python 교육 및 개발자 대상 문서화 경험
*   건설적이고 도움이 되는 뛰어난 기여 기록
*   Python에 대한 상당한 기여 이력
*   Python 문서 개선에 시간을 할애하려는 의지

편집 위원회 위원은 교육, 커뮤니케이션, 기술 문서 작성, Python 문서, 접근성(accessibility), 번역 또는 커뮤니티 관리 경험이 있어야 합니다.

##### 임기 (Term)

편집 위원회 위원의 임기는 정해져 있지 않지만, 일반적으로 매년 편집 위원회 구성에 변화가 있을 것으로 예상됩니다. 위원들은 매년 위원직을 계속할 의사가 있는지 확인합니다. 위원들은 언제든지 사임할 수 있습니다.

만약 위원이 한 달 이상 연락이 닿지 않거나 연락이 되지 않는 경우, 나머지 위원들이 투표를 통해 교체를 결정할 수 있습니다.

##### 편집 위원회 규모 변경 (Changes to the Editorial Board's Size)

매년 주요 Python 릴리스(release) 이후, 편집 위원회는 위원회 규모를 변경해야 하는지 검토합니다. 이는 문서 커뮤니티의 필요가 시간이 지남에 따라 변할 경우 유연성을 제공합니다. 위원회 규모를 늘리기로 결정하려면 현재 위원회의 80%가 참여하는 정족수(quorum) 하에 단순 과반수가 필요합니다.

문서 편집 위원회의 후원 조직으로서 Steering Council은 언제든지 위원회 위원의 수를 변경할 수 있으며, 여기에는 새로운 위원 임명 또는 기존 위원 해고가 포함됩니다.

##### 공석 (Vacancies)

어떤 이유로든 위원회에 공석이 발생하면, 문서 편집 위원회는 잠재적인 위원 후보를 공개적으로 모집합니다. 후보자들은 자격과 봉사 동기를 간략히 기술한 문서를 제출해야 합니다. 현재 편집 위원회 위원들은 현재 위원회의 80%가 참여하는 정족수 하에 단순 과반수 투표로 새로운 위원을 선출합니다.

#### 개정 (Amendments)

이 PEP는 문서 편집 위원회의 헌장 역할을 합니다. 위원회 운영에 대한 변경 사항은 새로운 PEP를 통하거나 이 PEP를 변경함으로써 이루어질 수 있습니다. 두 경우 모두, 변경 사항은 커뮤니티 논의 후 Steering Council에 의해 결정됩니다.

#### PEP 수락 (PEP Acceptance)

PEP 732는 2023년 12월 11일 Python Steering Council에 의해 수락되었습니다.

Steering Council은 PEP에 명시된 범위에 동의하지만, 편집 위원회가 충분히 확립되고 더 높은 우선순위가 처리된 후에는 표준 라이브러리의 docstrings를 포함하도록 범위를 확장하는 것을 고려하는 것이 합리적일 것이라고 언급했습니다.

#### 문의 (Contact)

편집 위원회에 결정을 요청하려면, 커뮤니티 구성원은 `python/editorial-board` 저장소에 이슈를 열 수 있습니다.

#### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되거나 CC0-1.0-Universal 라이선스(license) 하에 제공되며, 둘 중 더 허용적인 조건을 따릅니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.