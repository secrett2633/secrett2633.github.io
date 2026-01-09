---
title: "[논문리뷰] GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization"
excerpt: "이 [arXiv]에 게시한 'GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-reward RL
  - Policy Optimization
  - Reward Normalization
  - GRPO
  - GDPO
  - LLMs
  - Training Stability

permalink: /ai/review/2026-01-09-GDPO-Group-reward-Decoupled-Normalization-Policy-Optimization-for-Multi-reward-RL-Optimization/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05242)

**저자:** Shih-Yang Liu, Xin Dong, Ximing Lu, Shizhe Diao, Peter Belcak, Mingjie Liu, Min-Hung Chen, Hongxu Yin, Yu-Chiang Frank Wang, Kwang-Ting Cheng, Yejin Choi, Jan Kautz, Pavlo Molchanov



## 핵심 연구 목표
본 논문은 다중 보상(multi-reward) 설정에서 기존 **Group Relative Policy Optimization (GRPO)** 이 겪는 **보상 신호 붕괴(reward signal collapse)** 문제를 해결하는 것을 목표로 합니다. GRPO를 직접 적용할 경우, 상이한 보상 조합들이 동일한 이점(advantage) 값으로 수렴하여 훈련 신호의 해상도를 저해하고, 결과적으로 차선(suboptimal)의 수렴과 훈련 실패를 야기하는 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Group reward-Decoupled Normalization Policy Optimization (GDPO)** 을 제안합니다. GDPO는 개별 보상의 **그룹별 정규화(group-wise normalization)** 를 먼저 수행하여 보상 간의 상대적 차이를 보존하고, 이후 **배치별 이점 정규화(batch-wise advantage normalization)** 를 적용하여 이점의 수치적 범위를 안정적으로 유지하고 업데이트 안정성을 향상시킵니다. 이는 GRPO와 달리 개별 보상에 대한 독립적인 정규화를 통해 정보 손실을 방지합니다.

## 주요 결과
GDPO는 도구 호출, 수학 추론, 코드 추론의 세 가지 태스크에서 GRPO를 일관되게 능가했습니다. 특히, 도구 호출 태스크에서 **Qwen2.5-1.5B 모델** 은 **GDPO** 적용 시 평균 정확도 **55.36%** 및 형식 정확도 **80.66%** 를 달성하여 **GRPO** 의 **50.63%** 및 **76.33%** 를 크게 상회했습니다. 또한, 수학 추론 태스크에서 **DeepSeek-R1-7B 모델** 은 **AIME 벤치마크** 에서 **GDPO** 가 **53.1%** 의 정확도와 **0.2%** 의 길이 초과율을 보이며, **GRPO** 의 **50.2% 정확도** 와 **2.1% 초과율** 보다 우수한 성능을 보여주었습니다.

## AI 실무자를 위한 시사점
GDPO는 다양한 인간 선호도에 맞춰 대규모 언어 모델(LLM)을 정렬하는 다중 보상 RL 훈련에 있어 **GRPO** 보다 훨씬 안정적이고 정확한 대안을 제공합니다. 이는 복잡하고 상충하는 보상 목표가 있는 실제 응용 시나리오에서 LLM의 성능과 신뢰성을 향상시키는 데 필수적입니다. 실무자들은 **GDPO** 를 통해 훈련 안정성을 높이고 더 높은 품질의 모델을 더 효과적으로 개발할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.