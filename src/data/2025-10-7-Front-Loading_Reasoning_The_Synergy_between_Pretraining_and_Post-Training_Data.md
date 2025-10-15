---
title: "[논문리뷰] Front-Loading Reasoning: The Synergy between Pretraining and
  Post-Training Data"
excerpt: "이 [arXiv]에 게시한 'Front-Loading Reasoning: The Synergy between Pretraining and
  Post-Training Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Pretraining
  - Supervised Fine-tuning
  - Reasoning Data
  - Data Allocation
  - Diversity
  - Quality
  - Reinforcement Learning

permalink: /ai/review/2025-10-7-Front-Loading_Reasoning_The_Synergy_between_Pretraining_and_Post-Training_Data/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03264)

**저자:** Syeda Nahida Akter, Shrimai Prabhumoye, Eric Nyberg, Mostofa Patwary, Mohammad Shoeybi, Yejin Choi, Bryan Catanzaro



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 능력을 극대화하기 위해 사전 훈련(pretraining)과 지도 미세 조정(SFT) 단계 간에 추론 데이터를 최적으로 할당하는 방법을 체계적으로 탐구하는 것을 목표로 합니다. 특히, 추론 데이터를 조기에 주입하는 것이 나중에 주입하는 것보다 더 효과적인지, 그리고 데이터의 다양성, 규모, 품질이 각 훈련 단계에 미치는 영향을 규명하고자 합니다.

## 핵심 방법론
연구팀은 **8B 하이브리드 Transformer 모델**을 **1조 토큰**으로 사전 훈련한 후, SFT 및 강화 학습(RL)을 적용하는 다단계 훈련 파이프라인을 사용했습니다. 사전 훈련 및 SFT 단계에서 추론 데이터 **(Dres)**의 **다양성, 규모, 품질**을 체계적으로 조절했으며, 특히 **DLDQ(대규모, 다양), DSHQ(소규모, 고품질), DLMQ(대규모, 혼합 품질)** 등의 데이터셋을 활용하여 다양한 시나리오를 검증했습니다.

## 주요 결과
추론 데이터를 사전 훈련 단계에 "앞으로 배치(front-loading)"하는 것이 **평균 19%의 성능 향상**을 가져왔으며, 이는 SFT만으로는 따라잡을 수 없는 근본적인 능력을 구축함을 입증했습니다. 최적의 데이터 전략은 비대칭적인데, 사전 훈련에는 **다양성 및 규모**가 가장 중요하여 **다양한 코퍼스 사용 시 평균 11%의 추가 이득**을 보였고, SFT는 **데이터 품질**에 가장 민감하여 **고품질 데이터 사용 시 평균 15%의 추가 이득**을 얻었습니다. 또한, 혼합 품질 SFT 데이터의 무분별한 스케일링은 **수학 추론에서 평균 -5%**의 성능 하락을 초래할 수 있음을 발견했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 훈련 시 추론 데이터 할당에 대한 **원칙적인 가이드라인**을 제공합니다. 개발자는 사전 훈련 단계에서 **광범위하고 다양한 추론 데이터**를 사용하여 견고한 기초를 마련하고, SFT 단계에서는 **고품질의 추론 집중 데이터**를 통해 특정 기술을 세밀하게 조정하는 비대칭 전략을 고려해야 합니다. 이는 **효율적인 자원 활용**을 통해 더 강력하고 일반화 가능한 LLM을 구축하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.