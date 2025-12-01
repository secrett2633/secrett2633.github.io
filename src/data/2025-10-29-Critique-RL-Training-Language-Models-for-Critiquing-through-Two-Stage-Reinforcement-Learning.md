---
title: "[논문리뷰] Critique-RL: Training Language Models for Critiquing through Two-Stage
  Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'Critique-RL: Training Language Models for Critiquing through Two-Stage
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Language Models
  - Critiquing
  - Two-Stage Optimization
  - Actor-Critic
  - Scalable Oversight
  - Discriminability
  - Helpfulness

permalink: /ai/review/2025-10-29-Critique-RL-Training-Language-Models-for-Critiquing-through-Two-Stage-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24320)

**저자:** Zhiheng Xi, Jixuan Huang, Xin Guo, Boyang Hong, Dingwen Yang, Xiaoran Fan, Shuo Li, Zehui Chen, Junjie Ye, Siyu Yuan, Zhengyin Du, Xuesong Yao, Yufei Xu, Jiecao Chen, Rui Zheng, Tao Gui, Qi Zhang, Xuanjing Huang



## 핵심 연구 목표
본 논문은 복잡한 추론 태스크에서 LLM의 출력을 평가하고 피드백을 제공하는 비판(critiquing) 모델을 훈련하는 것을 목표로 합니다. 기존 방법론들이 강력한 감독이나 오라클 검증기에 의존하여 확장성과 실용성에 한계가 있음을 지적하며, 비판 모델의 **판별력(discriminability)** 과 **유용성(helpfulness)** 간의 최적화 상충 관계를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Critique-RL** 이라는 **온라인 두 단계 강화 학습(two-stage RL)** 접근 방식을 제안합니다. 이 방식은 **actor-critic 패러다임** 을 기반으로 하며, 첫 번째 단계에서는 **직접적인 규칙 기반 보상 신호(`r_dis`)** 를 사용하여 비판 모델의 **판별력을 최적화** 합니다. 두 번째 단계에서는 **actor의 개선(refinement)을 기반으로 한 간접 보상(`r_refine`)** 을 도입하여 **유용성을 향상** 시키고, 동시에 **적절한 정규화(KL-divergence 및 `r_dis`)** 를 통해 판별력을 유지합니다.

## 주요 결과
Critique-RL은 **Qwen2.5-7B** 모델에서 인-도메인 태스크에서 **9.02%** , 아웃-오브-도메인 태스크에서 **5.70%** 의 성능 향상을 달성했습니다. 특히, 비판 모델의 **판별력** 측면에서 기존 베이스라인(예: CTRL) 대비 **Qwen2.5-3B 모델에서 5.31%, Qwen2.5-7B 모델에서 6.36% 포인트** 더 높은 성능을 기록했습니다. 또한, **inference compute scaling** 에서 더 효율적임을 입증하여, **Pass@1** 에서 SFT의 **Pass@64** 를 능가하는 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 **강력한 수동 감독이나 오라클 검증기 없이도** 효과적인 비판 LLM을 훈련할 수 있는 실용적인 방법을 제시하여, **확장 가능한 AI 감독(scalable oversight)** 분야에 기여합니다. AI/ML 엔지니어는 Critique-RL을 활용하여 LLM의 추론 및 개선 능력을 향상시키는 **구조화된 피드백 메커니즘** 을 구축할 수 있습니다. 뛰어난 **계산 효율성** 은 반복적인 모델 개선 과정에서 **배포 및 운영 비용을 절감** 할 수 있는 잠재력을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.