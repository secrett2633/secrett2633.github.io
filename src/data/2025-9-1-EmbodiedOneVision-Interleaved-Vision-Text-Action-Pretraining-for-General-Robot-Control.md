---
title: "[논문리뷰] EmbodiedOneVision: Interleaved Vision-Text-Action Pretraining for
  General Robot Control"
excerpt: "Zhaoqing Chen이 arXiv에 게시한 'EmbodiedOneVision: Interleaved Vision-Text-Action Pretraining for
  General Robot Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Robot Control
  - Vision-Language-Action Models
  - Multimodal Pretraining
  - Flow Matching
  - Foundation Models
  - Generalization
  - Real-world Robotics

permalink: /ai/review/2025-9-1-EmbodiedOneVision-Interleaved-Vision-Text-Action-Pretraining-for-General-Robot-Control/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21112)

**저자:** Delin Qu*, Haoming Song*, Qizhi Chen*, Zhaoqing Chen*, Xianqiang Gao*, Modi Shi, Guanghui Ren, Maoqing Yao, Bin Zhao, Dong Wang



## 핵심 연구 목표
본 연구는 기존 VLA 모델들이 가진 제한된 도메인 및 유연성 문제를 해결하고, 개방형 환경에서 인간 수준의 유연한 **다중 모달 추론 및 물리적 상호작용** 을 가능하게 하는 일반ist 로봇 제어를 목표로 합니다. 비전, 텍스트, 액션 간의 상호 정보 교환을 지원하는 **효과적인 훈련 패러다임** 을 설계하여 로봇이 포괄적인 세계 지식을 습득하고 능숙한 행동을 실행하도록 하는 것이 주된 목적입니다.

## 핵심 방법론
**EO-Robotics** 는 **EO-1 모델** 과 **EO-Data1.5M 데이터셋** 으로 구성됩니다. **EO-1** 은 **인터리빙된 비전-텍스트-액션 사전 훈련(interleaved vision-text-action pre-training)** 을 통해 다중 모달 추론 및 로봇 제어 성능을 향상시키는 **통합된 디코더 전용 Transformer 아키텍처** 이며, **Qwen 2.5 VL** 로 초기화됩니다. **EO-Data1.5M** 은 **자동 회귀 디코딩(auto-regressive decoding)** 과 **플로우 매칭 노이즈 제거(flow matching denoising)** 의 시너지를 통해 훈련되며, 시공간적 추론 데이터와 로봇 제어 데이터를 템플릿 기반으로 연결하는 **인터리빙 샘플링 전략** 을 활용하여 구성됩니다.

## 주요 결과
**EO-1** 은 다양한 벤치마크에서 뛰어난 성능을 보였습니다. **LIBERO 벤치마크** 에서 **98.2%** 의 평균 성공률을 달성하며 기존 최신 모델들을 능가했고, **SimplerEnv** 에서 **72.7%~76.5%** 의 최고 성공률을 기록했습니다. 또한, 자체 구축한 **EO-Bench** 에서 공간 추론 **36.4점** , 시간 추론 **38.9점** 을 기록했으며, **RoboVQA** 에서는 **58.5 BLEU-4** 로 GPT-4o를 크게 앞섰습니다. 특히, **실제 로봇 환경** 의 28가지 태스크에서 **86.0%** 의 높은 완료율을 달성하며 강력한 **개방형 환경 일반화 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **EO-Robotics** 라는 **완전 공개 훈련 레시피** 와 데이터셋, 모델 가중치를 제공하여 로봇 공학 연구 커뮤니티에 큰 기여를 합니다. **하이브리드 디코딩 메커니즘** 과 **인터리빙된 다중 모달 데이터 훈련** 은 로봇 제어의 정밀도와 개방형 환경에서의 일반화 능력을 크게 향상시킬 수 있음을 시사합니다. 하지만, **도메인에 특화된 정교한 데이터셋** 이 필수적이며, 일반적인 대규모 시각-언어 데이터는 오히려 **물리적 접지 능력(physical grounding)** 을 저하시킬 수 있음을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.