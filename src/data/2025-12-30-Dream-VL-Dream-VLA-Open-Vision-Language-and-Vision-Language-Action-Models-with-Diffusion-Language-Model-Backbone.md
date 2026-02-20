---
title: "[논문리뷰] Dream-VL & Dream-VLA: Open Vision-Language and Vision-Language-Action Models with Diffusion Language Model Backbone"
excerpt: "arXiv에 게시된 'Dream-VL & Dream-VLA: Open Vision-Language and Vision-Language-Action Models with Diffusion Language Model Backbone' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Vision-Language Models
  - Vision-Language-Action Models
  - Robotics
  - Multimodal AI
  - Action Planning
  - Long-Horizon Planning
  - Bidirectional Attention

permalink: /ai/review/2025-12-30-Dream-VL-Dream-VLA-Open-Vision-Language-and-Vision-Language-Action-Models-with-Diffusion-Language-Model-Backbone/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22615)

**저자:** Jiacheng Ye, Shansan Gong, Jiahui Gao, Junming Fan, Shuang Wu, Wei Bi, Haoli Bai, Lifeng Shang, Lingpeng Kong



## 핵심 연구 목표
본 논문은 기존 Autoregressive (AR) 기반 대규모 시각-언어 모델(VLM) 및 시각-언어-액션 모델(VLA)의 복잡한 시각 계획 및 동적 로봇 제어에서의 한계를 극복하는 것을 목표로 합니다. 특히, 확산 기반 대규모 언어 모델(dLLM)을 백본으로 활용하여 우수한 계획 능력과 효율성을 달성하는 VLM 및 VLA 모델을 구축하고자 합니다.

## 핵심 방법론
저자들은 확산 기반 대규모 언어 모델인 **Dream-7B** 를 백본으로 사용하여 **Dream-VL** 이라는 개방형 확산 기반 VLM( **dVLM** )을 구축했습니다. 이를 기반으로, 개방형 로봇 데이터셋에서 지속적인 사전 훈련을 통해 **Dream-VLA** 라는 확산 기반 VLA 모델( **dVLA** )을 개발했습니다. 이 모델은 **양방향 마스크드 확산 모델링** 의 특징을 활용하여 액션 청킹 및 병렬 생성을 지원하며, 이는 로봇 동작 예측에 필수적인 요소로 작용합니다.

## 주요 결과
**Dream-VL** 은 기존 dVLM 중 최고 성능을 달성했으며, 시각 계획 작업에서 AR 기반 VLM을 능가하는 잠재력을 보였습니다. **Dream-VLA** 는 **LIBERO** 벤치마크에서 **97.2%** 의 평균 성공률을 기록했고, **SimplerEnv-Bridge** 에서 **71.4%** , **SimplerEnv-Fractal** 에서 **60.5%** 의 전체 평균을 달성하여 **πo** 및 **GR00T-N1** 과 같은 선도 모델들을 뛰어넘었습니다. 또한, **Dream-VL** 은 저수준 액션 예측에서 AR 모델 대비 **27배 빠른 속도 향상** 을 보여주었습니다.

## AI 실무자를 위한 시사점
확산 모델 기반의 VLM 및 VLA는 복잡한 시각 계획 및 로봇 제어 태스크에서 Autoregressive 모델의 한계를 극복할 강력한 대안을 제시합니다. 특히, **Dream-VLA** 의 기본 양방향 특성은 액션 청킹과 병렬 생성을 구조 변경 없이 지원하여 개발 과정을 단순화하고, 다운스트림 미세 조정을 가속화합니다. 이는 로봇 공학 및 자율 시스템 개발에서 효율적이고 견고한 정책 개발에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.