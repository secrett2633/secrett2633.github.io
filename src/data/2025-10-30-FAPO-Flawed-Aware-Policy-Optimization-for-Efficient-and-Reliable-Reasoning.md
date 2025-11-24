---
title: "[논문리뷰] FAPO: Flawed-Aware Policy Optimization for Efficient and Reliable
  Reasoning"
excerpt: "Xin Liu이 [arXiv]에 게시한 'FAPO: Flawed-Aware Policy Optimization for Efficient and Reliable
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Reasoning
  - Policy Optimization
  - Reward Modeling
  - Flawed Reasoning
  - Reliable AI
  - Error Detection

permalink: /ai/review/2025-10-30-FAPO-Flawed-Aware-Policy-Optimization-for-Efficient-and-Reliable-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22543)

**저자:** Yuyang Ding, Haibin Lin, Chi Zhang, Xin Liu, Juntao Li, Min Zhang



## 핵심 연구 목표
RLVR(Reinforcement Learning with Verifiable Rewards)을 활용한 LLM(Large Language Model) 학습 시, '오류가 있지만 정답인 롤아웃'(flawed-positive rollouts)이 신뢰할 수 없는 추론 패턴을 강화하여 성능을 제한하는 문제를 해결하는 것을 목표로 합니다. 연구는 이러한 'flawed-positive' 롤아웃의 분포와 영향을 분석하고, 효율적이고 신뢰할 수 있는 추론을 위한 효과적인 완화 전략을 개발하고자 합니다.

## 핵심 방법론
**Flawed-Aware Policy Optimization (FAPO)**을 제안하여, 정책 최적화 과정에서 'flawed-positive' 롤아웃에 대해 매개변수 없는(parameter-free) 보상 페널티를 부과합니다. 이를 위해 **Generative Reward Model (GenRM)**을 훈련시켜 과정 수준(process-level)의 보상(`Rprocess`)을 통해 추론 오류를 정확히 감지하고 위치를 특정합니다. FAPO는 학습 초기 단계에서는 'flawed-positive'를 유용한 지름길로 활용하게 하고, 모델 역량이 발전함에 따라 최적화가 신뢰할 수 있는 추론으로 점진적으로 전환되도록 유도합니다.

## 주요 결과
**FAPO-GenRM-4B**는 'flawed-positive' 감지 벤치마크인 **FlawedPositiveBench**에서 **89.4 F1 점수**를 달성하여 기존 SOTA 모델들(예: Qwen3-32B의 87.8 F1)을 능가하는 뛰어난 성능을 보였습니다. 최종 RL 학습에서 **FAPO-32B**는 **AIME24**에서 **3.5%**, **AIME25**에서 **3.1%**, **GPQA-Diamond**에서 **1.5%**의 정확도 향상을 가져왔으며, 특히 **AIME24**의 'flawed positive' 비율을 **15.5%에서 7.1%로 8.4% 감소**시켰습니다. 또한, FAPO는 추가적인 토큰 예산 없이도 결과 정확도, 프로세스 신뢰성 및 훈련 안정성을 동시에 개선하는 효과를 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 추론 능력을 강화하는 RL 훈련에서 **숨겨진 비신뢰성 문제를 해결하는 실용적인 방법론**을 제시합니다. **GenRM**을 활용한 **정확한 과정 수준 오류 감지**는 모델이 단순히 정답을 맞히는 것을 넘어 **설명 가능하고 견고한 추론 과정**을 개발하는 데 기여할 수 있습니다. FAPO의 **단계적 최적화 전략**은 학습 초기에는 빠른 성능 향상을, 후반에는 신뢰성을 확보하여 AI 모델의 **훈련 효율성과 배포 신뢰성**을 동시에 높이는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.