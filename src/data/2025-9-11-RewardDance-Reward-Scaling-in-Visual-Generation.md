---
title: "[논문리뷰] RewardDance: Reward Scaling in Visual Generation"
excerpt: "Liang Li이 [arXiv]에 게시한 'RewardDance: Reward Scaling in Visual Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reward Model
  - Visual Generation
  - RLHF
  - VLM
  - Reward Scaling
  - Reward Hacking
  - Generative Paradigm
  - Context Scaling
  - Text-to-Image
  - Text-to-Video

permalink: /ai/review/2025-9-11-RewardDance-Reward-Scaling-in-Visual-Generation/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08826)

**저자:** Jie Wu, Yu Gao, Zilyu Ye, Ming Li, Liang Li, Hanzhong Guo, Jie Liu, Zeyue Xue, Xiaoxia Hou, Wei Liu, Yan Zeng, Weilin Huang



## 핵심 연구 목표
시각 생성 모델의 RM(Reward Model) 스케일링 패러다임이 기존 CLIP 기반 RM의 아키텍처 및 입력 제약, Bradley-Terry 손실과 VLM(Vision-Language Model)의 다음 토큰 예측 메커니즘 간의 불일치, 그리고 **보상 해킹(Reward Hacking)** 문제로 인해 제대로 탐구되지 못하는 한계를 해결하는 것이 목표입니다.

## 핵심 방법론
논문은 보상 점수를 "yes" 토큰을 예측할 모델의 확률로 재구성하는 새로운 **생성적 보상 패러다임(Generative Reward Paradigm)** 인 **RewardDance** 를 제안합니다. 이는 보상 목표를 VLM 아키텍처와 본질적으로 정렬하며, **모델 스케일링(1B에서 26B 파라미터)** 및 **컨텍스트 스케일링(태스크별 지침, 참조 예시, CoT 추론 통합)** 의 두 가지 차원에서 스케일링을 가능하게 합니다. 훈련에는 **ReFL 알고리즘** 과 **Bradley-Terry 손실** 및 **가중치 교차 엔트로피 손실** 이 사용됩니다.

## 주요 결과
**RewardDance** 는 RL 미세 조정에서 **Seedream-3.0** 의 Alignment Score를 **74.1** 에서 **26B RM 사용 시 84.8** 로 크게 향상시켰습니다. **Seedance-1.0** T2V 생성에서는 **26B RM** 으로 **+49%** 성능 개선을 달성했으며, **GenEval 벤치마크에서 Seedream-3.0 w RewardDance가 0.79의 Overall Score** 로 SOTA를 기록했습니다. 또한, RM 스케일이 커질수록 **보상 분산이 높게 유지** 되어 보상 해킹에 대한 저항성을 입증했습니다.

## AI 실무자를 위한 시사점
RewardDance는 시각 생성 분야에서 **RLHF** 의 효과를 극대화하기 위한 확장 가능한 RM 프레임워크를 제공합니다. **생성적 보상 패러다임** 과 **VLM 정렬** 은 기존 RM의 한계를 극복하고, 특히 **보상 해킹 문제를 완화** 하여 고품질의 다양성 높은 결과물을 얻는 데 기여합니다. 더 큰 RM과 풍부한 컨텍스트 데이터(예: **CoT 추론** )를 활용하는 것이 생성 모델 성능 향상에 직접적으로 연결됨을 보여주어, 실제 시스템 설계에 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.