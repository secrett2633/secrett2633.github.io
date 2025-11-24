---
title: "[논문리뷰] PhysMaster: Mastering Physical Representation for Video Generation via
  Reinforcement Learning"
excerpt: "Hengshuang Zhao이 [arXiv]에 게시한 'PhysMaster: Mastering Physical Representation for Video Generation via
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Physical Plausibility
  - Reinforcement Learning
  - Direct Preference Optimization
  - Physical Representation
  - Diffusion Models
  - World Models
  - Image-to-Video

permalink: /ai/review/2025-10-16-PhysMaster-Mastering-Physical-Representation-for-Video-Generation-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13809)

**저자:** Sihui Ji, Xi Chen, Xin Tao, Pengfei Wan, Hengshuang Zhao



## 핵심 연구 목표
본 논문은 최신 비디오 생성 모델들이 시각적으로 사실적인 비디오를 생성하지만 물리 법칙을 준수하지 못하는 문제를 해결하는 것을 목표로 합니다. 물리적 지식을 비디오 생성 모델에 통합하여 **물리적으로 그럴듯한 비디오**를 생성하고, 모델을 단순한 콘텐츠 생성기에서 **"월드 모델"**로 발전시키는 것을 궁극적인 목적으로 합니다.

## 핵심 방법론
본 연구는 **Image-to-Video(I2V) 태스크**를 기반으로 **PhysEncoder**를 도입하여 입력 이미지에서 암묵적인 물리적 표현을 추출합니다. 이 **PhysEncoder**는 물리적 표현에 대한 명확한 정의가 없으므로, **강화 학습(RL)**과 **인간 피드백을 활용한 DPO(Direct Preference Optimization)** 프레임워크를 통해 최종 생성된 비디오의 물리적 타당성을 기반으로 상향식 최적화됩니다. 훈련은 **DiT(Transformer-based diffusion model)** 및 **PhysEncoder**의 **SFT(Supervised Fine-Tuning)**, **DiT 모델에 대한 DPO**, 그리고 **PhysEncoder에 대한 DPO**의 세 단계로 진행됩니다.

## 주요 결과
**PhysMaster**는 모델의 물리 인식 능력을 플러그인 방식으로 크게 향상시키며, 프록시 태스크(자유 낙하)에서 기존 모델 대비 우수한 성능을 입증했습니다. 특히, Ours 모델은 **L2 0.0299 (↓), CD 0.0567 (↓), IoU 0.468 (↑)**를 달성하여 **PhysGen** 및 **PISA**를 능가합니다. 일반적인 개방형 시나리오에서는 **SA(Semantic Adherence) 0.67 (↑)** 및 **PC(Physical Commonsense) 0.40 (↑)**로 최첨단 성능을 달성했으며, **단일 A800 GPU에서 5초 비디오를 26초 만에 생성**하는 효율성을 보였습니다.

## AI 실무자를 위한 시사점
**PhysMaster**는 비디오 생성에서 물리적 일관성을 확보하는 효과적인 방법을 제시하며, 특히 **물리적 표현을 위한 DPO 기반 최적화**는 지도 학습 없이 모델의 물리 이해도를 높이는 데 중요한 시사점을 제공합니다. 이러한 접근 방식은 생성 모델이 더 복잡한 물리적 상호작용을 시뮬레이션하고 현실 세계의 "월드 모델"로 기능할 수 있는 잠재력을 보여줍니다. 또한, 향상된 효율성은 실제 AI 애플리케이션에 대한 실용성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.