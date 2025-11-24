---
title: "[Final] PEP 8000 - Python Language Governance Proposal Overview"
excerpt: "Python Enhancement Proposal 8000: 'Python Language Governance Proposal Overview'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8000/
toc: true
toc_sticky: true
date: 2025-09-27 19:25:09+0900
last_modified_at: 2025-09-27 19:25:09+0900
published: true
---
> **원문 링크:** [PEP 8000 - Python Language Governance Proposal Overview](https://peps.python.org/pep-8000/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 24-Aug-2018


# PEP 8000 – Python 언어 거버넌스 제안 개요

*   **작성자:** Barry Warsaw <barry at python.org>
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Governance (거버넌스)
*   **생성일:** 2018년 8월 24일

## 초록 (Abstract)

이 PEP는 Guido van Rossum의 은퇴 이후 새로운 파이썬 언어 거버넌스 모델 선정을 위한 과정에 대한 개요를 제공합니다. 거버넌스 모델이 선정되면, 해당 모델은 PEP 13에 공식적으로 명시될 예정입니다.

다음은 거버넌스 모델 선정 과정과 관련된 PEP 목록입니다. 8000번대 초반의 PEP들은 거버넌스 모델 선정의 일반적인 과정을 설명합니다.

## 거버넌스 모델 선정 관련 PEPs

### PEP 8001 - Python 거버넌스 투표 절차 (Python Governance Voting Process)

이 PEP는 새로운 거버넌스 모델 투표가 어떻게 진행될지 설명합니다. 투표 방식, 일정, 참여 자격 기준, 그리고 투표 자격이 있는 유권자 명단을 명시합니다.

### PEP 8002 - 오픈 소스 거버넌스 설문조사 (Open Source Governance Survey)

유사한 오픈 소스 및 자유 소프트웨어 프로젝트의 거버넌스 모델에 대한 설문조사가 실시될 예정이며, 이 모델들의 요약이 이 PEP에 설명될 것입니다. 이 설문조사는 프로젝트가 성공적으로 거버넌스될 수 있는 방법에 대한 유용한 지표 역할을 하며, 파이썬 자체의 거버넌스 모델에 영감을 줄 수 있습니다. 파이썬은 독특하므로, 조사된 모델을 직접 채택하기보다는 자체적인 거버넌스 방식을 가질 것으로 예상됩니다.

801X번대의 PEP들은 파이썬 거버넌스에 대한 실제 제안들을 설명합니다. 이러한 PEP들은 거버넌스의 광범위한 범위를 다루고, (거버닝 위원회의 규모와 같은) 세부 사항의 차이는 잠재적으로 표가 분산될 수 있는 개별 PEP가 아닌 동일한 PEP 내에서 다루어질 것으로 예상됩니다.

### PEP 8010 - 기술 리더 거버넌스 모델 (The Technical Leader Governance Model)

이 PEP는 단일 기술 프로젝트 리더 모델의 지속을 제안합니다. 자문 위원회가 BDFL(Benevolent Dictator For Life)을 돕거나 지원하는지 여부도 범위 내에 포함됩니다. 이 PEP는 다음 BDFL이나 그러한 자문 위원회의 구성원을 명시하지 않습니다. 이에 대해서는 PEP 13을 참조하십시오.

### PEP 8011 - 파이썬 개발자 3인조 주도 파이썬 거버넌스 모델 (Python Governance Model Lead by Trio of Pythonistas)

이 PEP는 파이썬 개발자 3인조(Trio of Pythonistas, TOP)가 이끄는 새로운 파이썬 거버넌스 모델을 설명합니다. 이는 Trio의 역할과 책임을 설명합니다. 이 PEP는 Trio의 구성원을 명시하지 않습니다. 이에 대해서는 PEP 13을 참조하십시오.

### PEP 8012 - 커뮤니티 거버넌스 모델 (The Community Governance Model)

이 PEP는 중앙 집중식 단일 리더 또는 거버닝 위원회의 역할 없이 합의와 투표에 기반한 새로운 파이썬 거버넌스 모델에 대한 임시 제안입니다. 파이썬 언어에 영향을 미치는 결정에 대한 투표가 어떻게, 언제, 왜 진행되는지 설명합니다. 또한 투표 자격 기준도 설명합니다.

### PEP 8013 - 외부 거버넌스 모델 (The External Governance Model)

이 PEP는 좋은 프로세스를 보장할 책임이 있는 외부 위원회에 기반한 새로운 파이썬 거버넌스 모델을 설명합니다. 핵심 개발팀에 의해 선출된 이 위원회는 충분히 자세하지 않거나, 영향을 받는 모든 사용자를 고려하지 않거나, 다가오는 릴리스에 적합하지 않은 제안을 거부할 수 있습니다. 이 PEP는 그러한 위원회의 구성원을 명시하지 않습니다. 이에 대해서는 PEP 13을 참조하십시오.

### PEP 8014 - 커먼즈 거버넌스 모델 (The Commons Governance Model)

이 PEP는 PEP가 수용되기 전에 파이썬 커뮤니티의 충분한 다수 지지를 받도록 보장할 책임이 있는 원로 위원회에 기반한 새로운 파이썬 거버넌스 모델을 설명합니다. 다른 거버넌스 PEP들과 달리, 이 모델은 명시적으로 누가 투표권을 가지며 다수결 투표가 무엇을 의미하는지 지정하지 않습니다. 대신 이는 원로 위원회에 의해 사례별로 결정됩니다.

### PEP 8015 - 파이썬 커뮤니티의 조직 (Organization of the Python community)

이 PEP는 파이썬 커뮤니티의 현재 조직을 공식화하고 세 가지 주요 변경 사항을 제안합니다:
1.  "Python 팀"이라는 기존 개념을 공식화합니다.
2.  Python 팀에 더 많은 자율성을 부여합니다.
3.  BDFL(Guido van Rossum)을 3명의 새로운 "Python 보드"로 대체하며, 이 보드는 제한된 역할을 가지며 주로 PEP 승인(또는 거부) 방식을 결정합니다.

### PEP 8016 - 스티어링 위원회 모델 (The Steering Council Model)

이 PEP는 스티어링 위원회(Steering Council)를 중심으로 한 파이썬 거버넌스 모델을 제안합니다. 위원회는 광범위한 권한을 가지지만, 가능한 한 드물게 이 권한을 행사하려고 합니다. 대신 이 권한을 사용하여 다른 801X 시리즈 PEP에서 제안된 것과 같은 표준 프로세스를 확립합니다. 이는 큰 변경 사항을 독립적으로 검토할 수 있는 일련의 작은 변경 사항으로 나누는 것이 더 낫다는 일반적인 철학을 따릅니다. 즉, 하나의 PEP에서 모든 것을 시도하는 대신, 추가 거버넌스 결정을 위한 최소한이지만 견고한 기반을 제공하는 데 중점을 둡니다.

최종 선택 전에 추가 거버넌스 모델이 추가될 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.