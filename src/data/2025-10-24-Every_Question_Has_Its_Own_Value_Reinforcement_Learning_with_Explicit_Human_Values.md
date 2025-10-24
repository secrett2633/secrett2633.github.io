---
title: "[논문리뷰] Every Question Has Its Own Value: Reinforcement Learning with Explicit
  Human Values"
excerpt: "이 [arXiv]에 게시한 'Every Question Has Its Own Value: Reinforcement Learning with Explicit
  Human Values' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Alignment
  - Human Values
  - Reward Shaping
  - Value-Weighted Reward
  - Termination Policy
  - RLVR

permalink: /ai/review/2025-10-24-Every_Question_Has_Its_Own_Value_Reinforcement_Learning_with_Explicit_Human_Values/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20187)

**저자:** Dian Yu, Yulai Zhao, Kishan Panaganti, Linfeng Song, Haitao Mi, Dong Yu



## 핵심 연구 목표
본 논문은 Large Language Model (LLM)이 모든 정답을 동일하게 중요하게 취급하는 기존의 **Verifiable Rewards (RLVR)** 방식의 한계를 극복하고, 인간이 정의한 가치(value)에 따라 LLM의 최적화를 직접적으로 정렬하는 방법론을 제안합니다. 궁극적으로 LLM이 단순한 정확도를 넘어 인간의 우선순위에 맞춰 행동하도록 만드는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Reinforcement Learning with Explicit Human Values (RLEV)**를 제안합니다. 이는 검증 가능한 보상에 **인간 정의 가치 함수 `v(x)`**를 통합하여 보상 함수를 스케일링하는 방식입니다. 구체적으로, 보상 `r(x,y)`는 `s(x) * 1_correct(y)`로 정의되며, 여기서 `s(x)`는 정규화된 인간 가치 `v(x)`에 기반한 **additive 및 clipped 스케일링 팩터(`1 + min(a * v(x), 1)`)**입니다. 이는 모든 정답에 최소 보상을 보장하면서 높은 가치의 프롬프트에는 더 큰 보너스를 부여하여 훈련 안정성을 확보합니다.

## 주요 결과
**RLEV**는 다양한 RL 알고리즘(**REINFORCE++**, **RLOO**, **GRPO**) 및 모델 스케일(**7B**, **32B**) 전반에서 기존의 정확도-only 베이스라인을 일관되게 능가합니다. 특히, 32B 모델에서는 평균 **H-Acc(Human-Aligned Accuracy) 2.8% 상승**을 보였고, 평균 응답 길이가 246.9 토큰에서 98.6 토큰으로 **절반 이상 감소**하는 등 가치-민감한 종료 정책을 학습했습니다. 또한, 난이도 기반의 약한 레이블과 같은 **노이즈가 있는 가치 신호**에서도 견고한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**RLEV**는 AI 실무자들이 LLM을 단순히 정확성을 높이는 것을 넘어, **인간의 우선순위에 따라 자원을 효율적으로 배분**하고 중요한 작업에 더 집중하도록 유도하는 실용적인 방법론을 제공합니다. 특히 **가치-민감한 종료 정책** 학습을 통해 저가치 프롬프트에는 간결한 응답을, 고가치 프롬프트에는 철저한 응답을 생성하여 리소스 효율성을 높일 수 있습니다. 또한, **정확한 가치 레이블이 없는 시나리오**에서도 약한 신호를 통해 적용 가능하여 활용 범위가 넓습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.