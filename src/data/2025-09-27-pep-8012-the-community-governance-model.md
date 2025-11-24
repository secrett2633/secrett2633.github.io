---
title: "[Rejected] PEP 8012 - The Community Governance Model"
excerpt: "Python Enhancement Proposal 8012: 'The Community Governance Model'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8012/
toc: true
toc_sticky: true
date: 2025-09-27 19:28:04+0900
last_modified_at: 2025-09-27 19:28:04+0900
published: true
---
> **원문 링크:** [PEP 8012 - The Community Governance Model](https://peps.python.org/pep-8012/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 03-Oct-2018


# PEP 8012 – 커뮤니티 거버넌스 모델

*   **작성자:** Łukasz Langa <lukasz at python.org>
*   **상태:** **Rejected (거부됨)**
*   **유형:** Informational (정보성)
*   **주제:** Governance (거버넌스)
*   **생성일:** 2018년 10월 3일

## PEP 거부 사유

PEP 8012는 2018년 12월 17일 월요일, PEP 8001에 명시된 핵심 개발자 투표를 통해 거부되었습니다. 대신 PEP 8016에 설명된 거버넌스 모델이 채택되었습니다.

## 개요 (Abstract)

이 PEP는 Python 커뮤니티의 합의와 투표를 기반으로 한 새로운 Python 거버넌스 모델을 제안합니다. 이 모델은 Python 언어의 거버넌스를 수행하기 위해 워크그룹(workgroups)에 의존합니다. 이 거버넌스 모델은 중앙 집중식 단일 리더나 운영 위원회(governing council)의 역할 없이 작동합니다.

이 문서는 Python 언어에 영향을 미치는 결정에 대한 투표가 어떻게, 언제, 왜 수행되는지 설명하며, 투표 자격 기준도 기술합니다. 이 모델이 채택되었다면 PEP 13에 명문화되었을 것입니다.

이 모델은 이상적이지는 않지만 다른 모델들에 비해 가장 견고하다는 특성 때문에 "가장 덜 나쁜 거버넌스 모델(The Least Worst Governance Model)"이라고 불릴 수 있습니다. 다른 모델들이 내재한 문제들을 피하는 것이 커뮤니티 거버넌스 모델의 가장 중요한 특징이므로, 이 문서는 다른 모델들을 먼저 거부하면서 논의를 시작하는 다소 특이한 방식으로 전개됩니다.

## 거부된 모델들 (Rejected Models)

PEP 8012는 자체 모델을 제안하기 전에, 왜 다른 모델들이 적합하지 않은지 설명하며 논의를 시작합니다.

### 또 다른 BDFL (Benevolent Dictator For Life)을 갖자

이 모델은 우리가 익히 알고 있는 방식이므로 매우 매력적으로 보일 수 있습니다.

#### 도전 과제: 또 다른 Guido는 없다 (Challenge: There is no other Guido)

Guido van Rossum과 같은 독특한 기술, 커뮤니케이션, 조직적 경험을 가진 단 한 명의 사람은 없습니다.

*   프로젝트를 위한 일관된 장기 비전 설정 및 명확한 전달
*   런타임, 표준 라이브러리 및 광범위한 서드파티 라이브러리 컨텍스트에 대한 깊은 기술적 이해
*   모든 관련 당사자가 수용할 수 있는 방식으로 논쟁적인 문제 협상 및 해결
*   수년간 지속적인 참여를 유지할 자유 시간과 에너지

#### 위험: 악의적인 종신 독재자 (Risk: Malevolent Dictator For Life)

만약 첫 번째 Dictator만큼 적합하지 않은 사람을 얻게 된다면 심각한 결과로 이어질 수 있습니다. 기술적 깊이 부족, 근소한 선거, 일관성 없는 비전, 갈등 처리 능력 부족 또는 번아웃 등으로 신뢰를 얻지 못할 수 있습니다. 또한, Dictator 설정은 한 사람에게 집중된 로비 활동을 유발하여 악의적인 행위자가 프로젝트를 조종할 위험이 있습니다.

#### 관찰: 우리는 실제로 Dictator가 필요하지 않다 (Observation: We don't actually need a Dictator)

Dictator 모델의 아이러니는 선거가 필요하다는 점입니다. 이 정도로 중대한 두 가지 문제를 커뮤니티 프로세스를 통해 해결할 수 있다면, 이후의 모든 결정에도 계속 이 방식을 사용하는 것이 어떻겠습니까?

#### 위험: 모호한 제안이 주는 막연한 안도감 (Risk: The warm and fuzzy feeling of a vague proposal)

BDFL 모델이 제안될 때, BDFL이 누가 되어야 하는지 언급하지 않음으로써 위의 비판을 회피하기 쉽습니다. 그러나 이는 구체적인 모델이 아니므로, 가장 나쁜 시나리오까지 고려하여 공정하게 평가해야 합니다.

#### 결론

Guido 없이는 이 모델이 미래의 언어에 가장 적합한 이익을 제공하지 못합니다.

### 의회 (Council)를 갖자

이 그룹은 Dictator의 책임을 대략적으로 공유합니다.

#### 위험: 책임 분산 및 혼란 (Risk: Dilution and confusion)

이 모델은 3~5명 정도의 소그룹을 선호합니다. 한 명이 아닌 여러 명의 권력자를 두면 책임이 분산되는 동시에 로비, 불충분한 신뢰 또는 커뮤니티의 일부 소외 위험이 증폭됩니다.

#### 위험: 내부 갈등 (Risk: Internal Conflict)

여러 사람이 거버넌스 책임을 공유하면 내부 갈등, 프로젝트의 일관성 없는 장기 비전, 그리고 구성원들의 지속적인 시간 참여 요구가 증가합니다.

#### 결론

이 모델은 Dictator 모델과 유사한 위험을 가지며, 심지어 더 나쁠 수 있습니다.

## 동기 (Motivation)

다른 거버넌스 모델들의 기본 사항을 거부했으니, 느슨하게 정의된 커미터(committers) 그룹 외에 왜 거버넌스 모델이 필요한지 논의합니다.

*   **안정성과 신뢰성 (Stability and Reliability):** 단일 커미터가 언어의 미래나 사용성에 영향을 미치는 광범위한 변경을 하는 것을 방지하고 싶습니다. 일관된 비전과 하위 호환성(backwards compatibility)은 모든 프로그래밍 언어에서 중요하지만, Python처럼 매우 동적인 언어(예: 매우 복잡한 하위 호환성 문제)에서는 두 배로 중요합니다.
*   **Python의 다양한 용도 (Diverse Uses of Python):** Python은 학생부터 과학자, 수백만 줄의 코드를 가진 기업에 이르기까지 다양한 사용자 그룹이 사용합니다. 모든 다양한 사용자를 포용하고자 합니다.
*   **활력 (Vitality):** 침체를 피하고 싶습니다. Python은 성숙한 프로젝트이지만, 런타임과 프로그래밍 언어 모두 관련성을 유지하기 위해 계속 발전해야 합니다.

## 근거 (Rationale)

*   **포괄적 (Inclusive):** 커뮤니티 모델은 가장 포괄적인 모델입니다. 특정 개인이나 소수 그룹이 다른 사람들에 비해 특권적인 권력을 갖지 않습니다. 기여자(Contributors)와 모든 워크그룹은 자율적으로 선택됩니다.
*   **실용적 (Pragmatic):** 이 모델은 특정 개인이나 소수 그룹의 이익으로 인해 어떤 사용자 그룹도 불이익을 받지 않도록 합니다.
*   **입증됨 (Proven):** 이 모델은 작동합니다. Rust, Django, ECMAScript, C++ 등 많은 대규모 오픈 소스 프로젝트가 이 방식으로 운영됩니다.

## 사양 (Specification)

### 핵심 인력 및 기능 (Key people and their functions)

*   **핵심 팀 (The core team):** GitHub의 "python" 조직 내 "Python core" 팀에 속한 핵심 개발자들로 구성됩니다. 기여는 변경사항 커밋, Pull Request (PR) 검토, 버그 리포트 관리, 공식 채널 토론 등 다양한 형태로 이루어집니다. 비활동적인(dormant) 기여자도 언제든지 기여를 재개할 수 있습니다.
*   **전문가 (Experts):** Python Developer's Guide에 명시된 특정 관심 영역에 대한 전문가로 인정된 핵심 개발자들입니다. 이들은 해당 영역의 버그 트래커 이슈에 응답하고, PR을 검토하며, 영역의 일관된 디자인 진화를 감독합니다. 여러 전문가가 있는 경우, 그들은 핵심 팀 내에서 하위 팀을 구성하며 함께 책임을 집니다.
*   **중재자 (Moderators):** 공식 커뮤니케이션 채널에서 토론이 행동 강령(Code of Conduct)을 준수하도록 보장하는 역할을 합니다.

### 일반적인 의사 결정 과정 (Regular decision process)

주요 작업은 버그 트래커 이슈와 Pull Request를 통해 진행됩니다. 핵심 개발자들은 변경 사항을 `cpython` 저장소에 직접 푸시하는 대신 Pull Request를 사용하는 것이 좋습니다. 핵심 개발자가 Pull Request를 승인하면 추가 절차 없이 병합(merge)할 수 있습니다.

### 논쟁적인 의사 결정 과정 (Controversial decision process)

특정 관심 영역의 실질적인 변경은 PEP를 필요로 합니다. 여기에는 언어의 의미론적(semantic) 또는 구문적(syntactic) 변경, 표준 라이브러리 또는 C API의 하위 호환성 없는 변경, 표준 라이브러리 추가, 언어 기능 제거 등이 포함됩니다.

#### 향상된 PEP (PEP, Enhanced)

PEP 프로세스는 다음과 같은 변경 및 명확화를 통해 보완됩니다.

*   PEP는 최종 결정이 내려질 때까지 병합되지 않으며, 그 전까지는 GitHub에서 열린 Pull Request 상태로 유지됩니다.
*   제출된 PEP는 최종 결정을 내릴 권한을 가진 관심 영역과 관련 전문가를 식별해야 합니다.
*   PEP 작성자는 공식 커뮤니케이션 채널을 사용하여 피드백을 수집하고 통합하여 합의를 구축해야 합니다.
*   어느 시점에서 명명된 전문가 중 한 명이 토론의 현재 상태(주요 불일치 지점 및 절충안 포함)를 설명하는 "요약 의견(summary comment)"을 게시합니다. 동시에 전문가는 PEP를 승인(accept), 잠정적 승인(accept provisionally), 거부(reject) 또는 연기(defer)하는 "최종 의견 수렴 기간(Final Comment Period, FCP) 동의(motion)"를 제안합니다.
*   FCP에 들어가려면 관련 관심 영역의 모든 전문가가 PEP에 서명해야 합니다.
*   FCP는 이해관계자들이 결정이 내려지기 전에 최종 이의를 제기할 수 있도록 14일 동안 지속됩니다.

#### 매우 논쟁적인 PEP (Very controversial PEPs)

핵심 기여자가 특정 PEP에 강하게 반대하는 경우, FCP 동안 투표를 통해 PEP를 거부하는 동의를 제기할 수 있습니다. 이는 최후의 수단이자 드문 경우여야 합니다.

#### 연기 및 거부된 PEP 재검토 (Revisiting deferred and rejected PEPs)

PEP가 연기되거나 거부된 경우, 동일한 아이디어에 대한 또 다른 시도를 하기 전에 관련 전문가에게 먼저 연락해야 합니다. 전문가들이 아이디어를 재검토할 정당한 증거가 있다고 동의하면, 연기되거나 거부된 PEP를 편집하는 Pull Request를 열 수 있습니다.

### 기타 투표 상황 (Other Voting Situations)

*   **새로운 핵심 개발자 지명 (Nominating a new core developer):** 챔피언(champion)이 공식 커뮤니케이션 채널에 게시하여 새로운 핵심 개발자를 지명합니다. 투표가 시작됩니다. 후보자가 이미 다른 사람들에게 충분히 알려지고 신뢰받는 경우에 이루어져야 합니다.
*   **불신임 투표 (Votes of no confidence):** 핵심 개발자를 핵심 팀에서 해임하거나, 특정 관심 영역에 대한 전문가 팀을 해체하는 경우입니다. 이는 프로젝트의 기능 장애 영역을 치유하는 방법을 보여주기 위해 명시적으로 언급되었습니다.

### 투표 메커니즘 (Voting Mechanics)

모든 투표는 +1/-1/0 ("찬성"/"반대"/"기권")으로 기록됩니다. 투표는 14일 동안 진행됩니다. 비활동적인 핵심 개발자는 기권할 경우 총계에 포함되지 않지만, 투표를 선택하면 활동적인 것으로 간주됩니다. 투표는 GitHub의 "python" 조직 내 비공개 저장소에 커밋하는 방식으로 이루어지며, 투표 기간이 끝나면 공개됩니다.

각 상황별로 다른 투표 비율이 요구됩니다.

*   **PEP 거부 투표:** 비활동적이지 않은 핵심 개발자 인구의 1/3 이상이 명시적으로 거부 투표를 해야 합니다.
*   **새로운 핵심 개발자 지명:** 반대 투표가 없어야 합니다.
*   **불신임 투표:** 비활동적이지 않은 핵심 개발자 인구의 최소 2/3 이상의 초다수(super-majority)가 동의에 찬성 투표를 해야 합니다.

## 누락된 사항 (Omissions)

이 문서는 프로젝트 내에서 가능한 관심 영역을 나열하는 것을 의도적으로 생략합니다. 또한 Python Software Foundation과 그 행동 강령 워킹 그룹(Code of Conduct Working Group)에 의해 이루어지는 중재자(Moderators)의 선출 및 관리에 대해서도 다루지 않습니다.

## Acknowledgements (감사의 말씀)

이 문서를 형성하는 데 도움이 된 PEP 8002 작성자들과, 이 문서에 큰 영감을 준 Alex Crichton 및 Rust 팀의 거버넌스 모델에 감사드립니다.

## Copyright (저작권)

이 문서는 퍼블릭 도메인에 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.