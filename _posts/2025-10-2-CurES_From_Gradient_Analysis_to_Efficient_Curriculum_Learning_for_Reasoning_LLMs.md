---
title: "[논문리뷰] CurES: From Gradient Analysis to Efficient Curriculum Learning for
  Reasoning LLMs"
excerpt: "Hengyi Cai이 [arXiv]에 게시한 'CurES: From Gradient Analysis to Efficient Curriculum Learning for
  Reasoning LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Curriculum Learning
  - LLMs
  - Reasoning
  - Gradient Optimization
  - Reinforcement Learning
  - Bayesian Inference
  - Sample Efficiency

permalink: /ai/review/2025-10-2-CurES_From_Gradient_Analysis_to_Efficient_Curriculum_Learning_for_Reasoning_LLMs/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01037)

**저자:** Yongcheng Zeng, Zexu Sun, Bokai Ji, Erxue Min, Hengyi Cai, Shuaiqiang Wang, Dawei Yin, Haifeng Zhang, Xu Chen, Jun Wang



## 핵심 연구 목표
본 연구는 추론 태스크에서 대규모 언어 모델(**LLMs**)의 훈련 효율성을 향상시키는 것을 목표로 합니다. 기존 커리큘럼 학습 방법론이 프롬프트 난이도 변화를 제대로 반영하지 못하고 단순한 필터링에 의존하여 계산 자원 낭비를 초래하는 문제를 해결하고자, 강화 학습 그래디언트 최적화 관점에서 프롬프트 선택 및 롤아웃 수량 할당을 체계적으로 조사합니다.

## 핵심 방법론
본 논문은 **CurES**(**Curriculum Learning with Efficient Sampling**)를 제안합니다. 이는 그래디언트 효율성과 모델의 질문-응답 정확도(**$p_{\theta}(x)$**) 간의 관계를 분석하여, 프롬프트 샘플링 분포가 그래디언트 하강의 수렴 속도에, 롤아웃 수량 할당이 그래디언트 업데이트의 일관성과 안정성에 영향을 미친다는 통찰을 제공합니다. **CurES**는 초기에는 적은 롤아웃으로 **$p_{\theta}(x)$**를 추정하고, 이 추정치를 기반으로 프롬프트 샘플링 확률과 롤아웃 수량을 재할당합니다. 이 과정에서 **Bayesian posterior estimation**을 활용하여 정확도 추정의 신뢰도를 점진적으로 개선하며, **Beta 분포**를 통해 프롬프트 난이도를 모델링합니다.

## 주요 결과
실험 결과, **CurES**는 **Group Relative Policy Optimization (GRPO)** 대비 **1.5B 모델**에서 **+3.30 포인트**, **7B 모델**에서 **+4.82 포인트** 더 높은 성능을 보였습니다. 또한, **CurES**는 기준선 대비 더 빠른 수렴 속도를 보여, **1.5B 모델**에서는 **GRPO**보다 **5.5배**, **RPP**보다 **1.75배** 빠르게, **7B 모델**에서는 **GRPO**보다 **4.3배**, **RPP**보다 **3.7배** 빠르게 최고 정확도에 도달했습니다. 이는 **CurES**가 중간 난이도 프롬프트에 더 많은 롤아웃을 집중적으로 할당하여 더 일관된 훈련 그래디언트와 향상된 훈련 안정성을 달성했기 때문입니다.

## AI 실무자를 위한 시사점
**CurES**는 AI/ML 엔지니어들이 추론 **LLMs**를 효율적으로 훈련할 수 있는 강력한 방법론을 제공합니다. 프롬프트 난이도에 기반한 동적 샘플링 및 롤아웃 할당 전략은 제한된 컴퓨팅 자원 내에서 **모델의 수렴 속도와 최종 성능**을 크게 향상시킬 수 있습니다. 특히 **Bayesian 추정**을 통해 모델의 학습 상황에 따라 자원을 적응적으로 조절함으로써, 훈련 중 발생하는 분포 변화에 강건하며 자원 낭비를 최소화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.