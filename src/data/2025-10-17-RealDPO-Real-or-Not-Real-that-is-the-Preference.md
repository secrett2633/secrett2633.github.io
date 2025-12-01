---
title: "[논문리뷰] RealDPO: Real or Not Real, that is the Preference"
excerpt: "Chenyang Si이 [arXiv]에 게시한 'RealDPO: Real or Not Real, that is the Preference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Models
  - Direct Preference Optimization
  - Preference Learning
  - Real Data
  - Human Motion Synthesis
  - RealDPO
  - RealAction-5K

permalink: /ai/review/2025-10-17-RealDPO-Real-or-Not-Real-that-is-the-Preference/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14955)

**저자:** Guo Cheng, Danni Yang, Ziqi Huang, Jianlou Si, Chenyang Si, Ziwei Liu



## 핵심 연구 목표
본 연구는 기존 비디오 생성 모델들이 복잡한 동작, 특히 사람 중심의 일상 활동에서 자연스럽고 부드러우며 맥락적으로 일관된 움직임을 생성하는 데 겪는 문제를 해결하고자 합니다. 보상 모델(reward model)의 한계(해킹 문제, 확장성 부족, 편향 전파)와 전통적인 지도 미세 조정(SFT)의 비효율성을 극복하여, 실제 데이터를 선호 학습의 긍정적 샘플로 활용하여 모델의 모션 합성 정확도를 향상시키는 것을 목표로 합니다.

## 핵심 방법론
논문은 실제 데이터를 긍정적(win) 샘플로, 모델이 생성한 오류가 있는 출력을 부정적(lose) 샘플로 활용하는 새로운 정렬 패러다임인 **RealDPO** 를 제안합니다. 이 방법은 **diffusion 기반 Transformer 아키텍처** 에 최적화된 **맞춤형 DPO 손실 함수** 를 적용하여 모션 사실감을 향상시킵니다. 또한, 복잡한 모션 합성을 위한 후처리 훈련을 지원하기 위해 풍부하고 정확한 모션 디테일을 담은 고품질의 실제 비디오 데이터셋인 **RealAction-5K** 를 구축했습니다.

## 주요 결과
사용자 연구 결과, **RealDPO** 는 **RealAction-TestBench** 에서 기준 모델 및 다른 정렬 방법론 대비 현저한 성능 향상을 보였습니다. 특히, 전반적인 품질(Overall Quality)에서 **73.33%** , 모션 품질(Motion Quality)에서 **71.00%** , 사람 품질(Human Quality)에서 **72.89%** 의 높은 점수를 기록했습니다. 또한, **MLLM 기반 평가** 에서도 모션 품질 **91.67%** , 사람 품질 **94.11%** 를 달성하여 강력하고 경쟁력 있는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**RealDPO** 는 복잡한 휴먼 액션 비디오 생성에서 **모델 정렬 품질** 을 크게 향상시키는 **데이터 효율적인** 프레임워크를 제공합니다. 이는 기존 **보상 모델의 한계(해킹, 확장성, 편향)** 를 극복하고 **실제 데이터를 선호 학습의 긍정적 샘플** 로 활용하는 새로운 접근 방식을 제시합니다. AI 엔지니어는 **RealAction-5K 데이터셋** 과 **RealDPO** 프레임워크를 활용하여 더욱 **자연스럽고 현실적인 모션 합성** 을 구현할 수 있으며, 이는 비디오 생성 모델의 실용적인 응용 가능성을 확장합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.