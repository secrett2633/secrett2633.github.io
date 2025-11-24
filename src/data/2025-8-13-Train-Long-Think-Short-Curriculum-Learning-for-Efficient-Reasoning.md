---
title: "[논문리뷰] Train Long, Think Short: Curriculum Learning for Efficient Reasoning"
excerpt: "Marzyeh Ghassemi이 [arXiv]에 게시한 'Train Long, Think Short: Curriculum Learning for Efficient Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Curriculum Learning
  - Reinforcement Learning
  - Large Language Models
  - Reasoning Efficiency
  - Token Budget Control
  - Group Relative Policy Optimization
  - Chain-of-Thought

permalink: /ai/review/2025-8-13-Train-Long-Think-Short-Curriculum-Learning-for-Efficient-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08940)

**저자:** Hasan Abed Al Kader Hammoud, Kumail Alhamoud, Abed Hammoud, Elie Bou-Zeid, Marzyeh Ghassemi



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 추론 능력 향상 과정에서 발생하는 비효율성, 즉 고정된 토큰 예산의 한계와 과도하게 긴 추론 과정의 문제를 해결하고자 합니다. 본 연구는 모델이 처음에 **광범위한 탐색**을 통해 효과적인 해법을 찾고, 이후 **점진적으로 간결하게 압축**하도록 유도하는 **커리큘럼 학습 전략**을 제안하여 효율적인 추론을 목표로 합니다.

## 핵심 방법론
제안된 방법론은 **Group Relative Policy Optimization (GRPO)**을 기반으로 하며, 훈련 단계에 따라 허용되는 토큰 예산을 **B(t) = max(1, B₀γ^(t/T))** 공식에 따라 **지수적으로 감소**시키는 커리큘럼 스케줄을 적용합니다. 보상 함수는 **태스크 정확성(verifier 피드백)**, **길이 효율성(커리큘럼 토큰 예산 준수)**, 그리고 **포맷팅 준수(구조적 태그 `<think>`, `<answer>` 사용)**의 세 가지 구성 요소를 가중 합산하며, 특히 길이 보상은 모델이 예산 내에서 효율적으로 탐색하도록 **삼각형 형태**로 설계되었습니다. 실험은 **QWEN-2.5-7B** 모델을 사용하여 **GSM8K** 및 **MATH500** 데이터셋에서 진행되었습니다.

## 주요 결과
커리큘럼 학습은 동일한 최종 토큰 예산에서 **고정 예산 GRPO** 대비 **일관되게 높은 정확도**를 달성하며 토큰 효율성도 유지했습니다. 예를 들어, **GSM8K**에서는 정확도가 **82.71%에서 86.20%**로 향상되었고, **MATH500**에서는 정확도 **38.80%에서 43.40%**로 상승하면서 평균 추론 길이가 **179.3 토큰에서 137.1 토큰**으로 단축되었습니다. 또한, **삼각형 길이 보상**은 **밴드 보상**보다 평균 정확도에서 **57.9% 대 55.0%**로 더 나은 성능을 보였으며, **선형 예산 감소 스케줄**은 **지수적 스케줄(57.9%)**보다 평균 정확도 **60.0%**를 달성하여 복잡한 태스크에서 특히 유리했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 추론 모델 학습 시 **점진적 제약(progressive constraint)**을 통해 정확도와 토큰 효율성을 동시에 향상시킬 수 있음을 보여주며, 이는 실제 AI 애플리케이션에서 **비용 효율적인 LLM 배포**에 중요한 시사점을 제공합니다. AI 실무자들은 **보상 가중치** 및 **예산 감소 스케줄**을 조정하여 특정 태스크의 요구사항에 맞춰 모델의 **정확도와 출력 길이 간의 균형**을 최적화할 수 있습니다. 공개된 코드와 체크포인트는 효율적인 추론 모델 개발 및 추가 연구를 위한 유용한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.