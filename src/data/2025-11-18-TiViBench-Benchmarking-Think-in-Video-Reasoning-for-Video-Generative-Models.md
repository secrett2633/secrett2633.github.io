---
title: "[논문리뷰] TiViBench: Benchmarking Think-in-Video Reasoning for Video Generative Models"
excerpt: "Qingyang Liu이 [arXiv]에 게시한 'TiViBench: Benchmarking Think-in-Video Reasoning for Video Generative Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generative Models
  - Visual Reasoning
  - Benchmarking
  - Image-to-Video
  - TiViBench
  - VideoTPO
  - Prompt Optimization

permalink: /ai/review/2025-11-18-TiViBench-Benchmarking-Think-in-Video-Reasoning-for-Video-Generative-Models/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13704)

**저자:** Harold Haodong Chen, Disen Lan, Wen-Jie Shu, Qingyang Liu, Zihan Wang, Sirui Chen, Wenkai Cheng, Kanghao Chen, Hongfei Zhang, Zixin Zhang, Rongjin Guo, Yu Cheng, Ying-Cong Chen



## 핵심 연구 목표
본 논문은 기존의 이미지-투-비디오(I2V) 생성 모델 평가 벤치마크가 시각적 충실도와 시간적 일관성에 집중하여 고차원적인 추론 능력을 제대로 평가하지 못하는 문제를 해결하고자 합니다. 대규모 언어 모델(LLM)과 유사한 추론 능력을 비디오 생성 모델이 갖추고 있는지 체계적으로 평가하고, 이러한 능력을 향상시킬 수 있는 효율적인 방안을 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 I2V 모델의 추론 능력을 평가하기 위한 계층적 벤치마크인 **TiViBench**를 제안합니다. 이는 **구조적 추론 및 탐색**, **공간 및 시각 패턴 추론**, **상징 및 논리 추론**, **액션 계획 및 작업 실행**의 네 가지 차원과 24가지 시나리오, 3가지 난이도로 구성됩니다. 평가는 **OpenCV-기반**, **DINO-기반**, **DINO-X-기반**, **Gemini-기반 QA 지표** 등 다양한 **과정 및 목표 일관성**과 **최종 상태 유효성** 지표를 사용하여 수행됩니다. 또한, 모델의 추론 잠재력을 해제하기 위한 테스트-시간 프롬프트 최적화 전략인 **VideoTPO**는 **GPT-4o**와 같은 **VLM**을 활용하여 생성된 비디오를 자체 분석하고, 텍스트 피드백을 통해 프롬프트를 반복적으로 개선합니다.

## 주요 결과
평가 결과, **Sora 2**와 **Veo 3.1**과 같은 상용 모델들이 오픈소스 모델 대비 일관적으로 강력한 추론 잠재력을 보였으며, **Sora 2**는 **Pass@1에서 27.9%**의 가장 높은 전체 성능을 달성했습니다. 오픈소스 모델들은 **Pass@5**에서 **Pass@1** 대비 상당한 개선을 보여 잠재적인 추론 능력을 시사하지만, 여전히 불안정한 성능을 나타냈습니다. 특히 **VideoTPO**를 적용했을 때, **HunyuanVideo**의 전체 성능이 **4.03%에서 10.25%**로, **Wan2.1**은 **8.40%에서 18.15%**로 크게 향상되어 테스트-시간 최적화의 효과를 입증했습니다.

## AI 실무자를 위한 시사점
**TiViBench**는 비디오 생성 모델의 추론 능력을 평가하고 개선하기 위한 필수적인 도구를 제공하며, 단순히 시각적 품질을 넘어선 AI 개발의 새로운 방향을 제시합니다. 상용 모델의 우수한 성능은 대규모 데이터와 최적화된 아키텍처의 중요성을 강조하며, 오픈소스 모델은 더 많은 학습 데이터 또는 추론-특정 최적화가 필요함을 시사합니다. **VideoTPO**는 추가 학습 없이 기존 모델의 추론 성능을 향상시킬 수 있는 비용 효율적인 방법을 제공하여, 실무자들이 기존 모델의 잠재력을 최대한 활용할 수 있게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.