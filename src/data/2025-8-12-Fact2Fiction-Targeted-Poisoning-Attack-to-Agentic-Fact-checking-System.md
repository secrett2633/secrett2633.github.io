---
title: "[논문리뷰] Fact2Fiction: Targeted Poisoning Attack to Agentic Fact-checking System"
excerpt: "Reynold Cheng이 [arXiv]에 게시한 'Fact2Fiction: Targeted Poisoning Attack to Agentic Fact-checking System' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adversarial Attack
  - Poisoning Attack
  - Fact-checking
  - LLM Agent
  - Retrieval Augmented Generation
  - Misinformation
  - System Security

permalink: /ai/review/2025-8-12-Fact2Fiction-Targeted-Poisoning-Attack-to-Agentic-Fact-checking-System/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.06059)

**저자:** Haorui He, Yupeng Li, Bin Benjamin Zhu, Dacheng Wen, Reynold Cheng, Francis C. M. Lau



## 핵심 연구 목표
본 연구는 최신 **LLM 기반 에이전트 팩트체킹 시스템** 이 잘못된 정보를 확산시키거나 진실을 훼손할 수 있는 포이즈닝 공격에 취약함을 지적합니다. 기존 공격 방식은 이러한 정교한 시스템의 클레임 분해 및 교차 검증 메커니즘에 효과적이지 못합니다. 이에 논문은 **Fact2Fiction** 이라는 새로운 포이즈닝 공격 프레임워크를 제안하며, 이는 시스템의 클레임 분해 및 정당화 생성 기능을 활용하여 표적화된 악성 증거를 생성함으로써 에이전트 기반 팩트체킹 시스템의 보안 취약점을 노출하는 것을 목표로 합니다.

## 핵심 방법론
**Fact2Fiction** 은 **Planner** 와 **Executor** 라는 두 개의 **LLM 기반 에이전트** 를 활용합니다. **Planner** 는 타겟 클레임을 **서브 클레임으로 분해** 하고, 시스템이 생성한 **정당화(justification)** 를 분석하여 각 서브 클레임에 대한 **표적화된 적대적 답변(adversarial answers)** 을 계획합니다. 이후 **예산 계획(budget planning)** 을 통해 각 서브 클레임의 중요도에 따라 **포이즈닝 예산을 전략적으로 할당** 하고, **쿼리 계획(query planning)** 을 통해 악성 증거의 검색 가능성을 높입니다. **Executor** 는 **Planner** 의 계획에 따라 **맞춤형 악성 증거 코퍼스** 를 생성하고, 이를 지식 베이스에 주입하여 서브 클레임 검증을 조작합니다.

## 주요 결과
**Fact2Fiction** 은 기존의 **PoisonedRAG 공격** 대비 **8.9%에서 21.2%** 더 높은 공격 성공률( **ASR** )을 달성하며, 모든 포이즈닝 예산 범위에서 우수한 성능을 보였습니다. 특히, 최소 **0.1% 포이즈닝 비율** 에서도 기존 공격들을 능가하는 **가장 높은 ASR** 을 기록했으며, **PoisonedRAG** 와 유사한 성능을 달성하는 데 필요한 악성 증거가 **8~16배 적어** 공격 효율성이 훨씬 높음을 입증했습니다. 또한, 시스템의 **정당화(justification) 활용** 이 공격 성공률을 **최대 12.4% 향상** 시키는 등 중요한 취약점으로 작용함을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **에이전트 기반 팩트체킹 시스템** 의 **보안 취약점** 을 드러내며, 시스템이 생성하는 **정당화가 공격자가 목표 공격을 수행하는 데 악용** 될 수 있음을 시사합니다. AI 실무자들은 이러한 시스템 설계 시 **투명성(justification)** 과 **보안(security)** 사이의 균형을 신중하게 고려해야 하며, **악성 콘텐츠 탐지** 및 **회피 메커니즘** 을 강화하는 **새로운 방어 전략** 개발이 시급함을 보여줍니다. 특히, **낮은 포이즈닝 예산에서도 높은 공격 성공률** 을 보이는 점은 **자원 제약이 있는 공격 환경** 에서도 효과적인 위협이 될 수 있음을 의미합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.