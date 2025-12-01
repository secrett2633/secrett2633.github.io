---
title: "[논문리뷰] Actial: Activate Spatial Reasoning Ability of Multimodal Large Language
  Models"
excerpt: "Changfeng Ma이 [arXiv]에 게시한 'Actial: Activate Spatial Reasoning Ability of Multimodal Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Spatial Reasoning
  - Viewpoint Learning
  - Two-Stage Fine-tuning
  - 3D Consistency
  - Viewpoint-100K
  - Reinforcement Learning

permalink: /ai/review/2025-11-4-Actial-Activate-Spatial-Reasoning-Ability-of-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01618)

**저자:** Xiaoyu Zhan, Wenxuan Huang, Hao Sun, Xinyu Fu, Changfeng Ma, Shaosheng Cao, Bohan Jia, Shaohui Lin, Zhenfei Yin, Lei Bai, Wanli Ouyang, Yuanqi Li, Jie Guo, Yanwen Guo



## 핵심 연구 목표
본 논문은 최신 **Multimodal Large Language Models (MLLMs)** 의 3D 공간 추론 능력을 평가하고 향상시키는 것을 목표로 합니다. 특히, MLLMs가 2D 시각 정보에만 의존하는 한계를 넘어, **교차-뷰 일관성** 과 같은 미세한 3D 공간 정보를 효과적으로 포착하고 활용할 수 있도록 **Viewpoint Learning** 이라는 핵심 태스크를 도입합니다.

## 핵심 방법론
저자들은 MLLMs의 공간 추론 능력을 활성화하기 위해 **두 단계의 파인튜닝 전략** 을 제안합니다. 첫 번째 단계인 **지식 주입(Knowledge Injection)** 에서는 새로 구축된 **Viewpoint-100K 데이터셋** 을 활용하여 **Supervised Fine-Tuning (SFT)** 을 수행하며, **하이브리드 콜드-스타트 초기화** 와 사람의 도움을 받은 **pseudo Chain-of-Thoughts (CoTs)** 를 사용합니다. 두 번째 단계인 **일반화 강화(Generalization Enhancement)** 에서는 **Group Relative Policy Optimization (GRPO) 알고리즘** 기반의 **강화 학습(RL)** 을 **SAT 데이터셋** 에 적용하여 모델의 일반화 능력을 향상시킵니다.

## 주요 결과
제안된 접근 방식은 MLLMs의 공간 추론 능력을 크게 활성화하며, 특히 **Viewpoint-100K** 태스크에서 **99.2%** 의 성능을 달성하여 기본 모델의 초기 무작위 추측 수준에서 크게 개선되었습니다. **CV-Bench** 에서는 기존 독점 모델들을 능가하는 상당한 성능 향상을 보였으며, **3DSRBench** 및 **BLINK** 와 같은 벤치마크에서도 인-도메인 및 아웃-오브-도메인 추론 태스크 모두에서 성능이 향상되었습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLMs가 복잡한 3D 공간 추론 태스크에서 성공하기 위해 **Viewpoint Understanding** 과 같은 기초적인 공간 기술을 개발하는 것이 중요함을 시사합니다. AI 실무자들은 **타겟팅된 데이터셋(Viewpoint-100K)** 과 **단계별 훈련 전략(SFT, GRPO)** 을 통해 MLLMs의 공간 인지 능력을 효과적으로 향상시킬 수 있으며, 이는 로봇 공학, 자율 시스템, 3D 장면 이해와 같은 실제 응용 분야에 직접적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.