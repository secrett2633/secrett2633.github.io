---
title: "[논문리뷰] DiffusionNFT: Online Diffusion Reinforcement with Forward Process"
excerpt: "Qinsheng Zhang이 [arXiv]에 게시한 'DiffusionNFT: Online Diffusion Reinforcement with Forward Process' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Reinforcement Learning
  - Online RL
  - Flow Matching
  - Forward Process
  - CFG-free
  - Image Generation
  - Negative-Aware FineTuning

permalink: /ai/review/2025-9-23-DiffusionNFT_Online_Diffusion_Reinforcement_with_Forward_Process/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16117)

**저자:** Kaiwen Zheng, Huayu Chen, Haotian Ye, Haoxiang Wang, Qinsheng Zhang, Kai Jiang, Hang Su, Stefano Ermon, Jun Zhu, Ming-Yu Liu



## 핵심 연구 목표
본 논문은 확산 모델의 온라인 강화 학습(RL) 적용 시 발생하는 고유한 문제점, 즉 다루기 어려운 가능도(likelihoods)와 역방향 샘플링 과정의 제약사항을 해결하는 것을 목표로 합니다. 특히, 기존 GRPO 방식의 한계를 극복하고 **CFG(Classifier-Free Guidance)에 의존하지 않는** 효율적인 온라인 RL 패러다임을 확산 모델에 제공하고자 합니다.

## 핵심 방법론
저자들은 **Diffusion Negative-aware FineTuning (DiffusionNFT)**이라는 새로운 온라인 RL 패러다임을 제안합니다. 이 방법론은 확산 모델의 **순방향 프로세스**에서 **플로우 매칭(flow matching)**을 통해 직접 최적화합니다. 긍정적 및 부정적 생성 샘플을 대비시켜 **내재적인 정책 개선 방향**을 정의하고, 이를 통해 강화 학습 신호를 표준 지도 학습 목적 함수에 통합합니다. 이는 **블랙박스 솔버** 사용을 허용하며, **가능도 추정** 없이 **클린 이미지**만으로 정책 최적화를 가능하게 합니다.

## 주요 결과
DiffusionNFT는 헤드투헤드 비교에서 **FlowGRPO**보다 최대 **25배 더 효율적**인 성능을 보였습니다. 예를 들어, **GenEval 점수를 1k 스텝 내에 0.24에서 0.98로 향상**시켰으며, FlowGRPO가 0.95 점수를 달성하는 데 5k 스텝과 추가 CFG가 필요했습니다. 여러 보상 모델을 활용하여 **SD3.5-Medium**의 성능을 모든 벤치마크에서 **CFG-free 상태**로 크게 향상시키는 것을 입증했습니다.

## AI 실무자를 위한 시사점
DiffusionNFT는 확산 모델의 RL 파인튜닝을 위한 **확장 가능하고, 효율적이며, 이론적으로 원칙적인** 경로를 제시합니다. 복잡한 가능도 추정 및 SDE 기반 역방향 프로세스의 필요성을 제거하여 훈련을 단순화하고, 모든 종류의 **블랙박스 샘플러**를 활용할 수 있게 합니다. **CFG-free** 특성은 모델 복잡성과 훈련 비효율성을 줄여, 특정 보상에 맞춰 생성 모델을 더 빠르고 견고하게 파인튜닝할 수 있는 실용적인 해결책을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.