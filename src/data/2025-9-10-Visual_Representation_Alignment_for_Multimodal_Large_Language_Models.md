---
title: "[논문리뷰] Visual Representation Alignment for Multimodal Large Language Models"
excerpt: "Heeseong Shin이 [arXiv]에 게시한 'Visual Representation Alignment for Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Visual Representation Alignment
  - Foundation Models
  - Regularization
  - Fine-grained Visual Understanding
  - Spatial Reasoning
  - Object Counting
  - Vision-Language Models

permalink: /ai/review/2025-9-10-Visual_Representation_Alignment_for_Multimodal_Large_Language_Models/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07979)

**저자:** Heeji Yoon, Jaewoo Jung, Junwan Kim, Hyungyu Choi, Heeseong Shin, Sangbeom Lim, Honggyu An, Chaehyun Kim, Jisang Han, Chanho Eom, Sunghwan Hong, Seungryong Kim



## 핵심 연구 목표
본 논문은 시각적 지시 튜닝으로 훈련된 **다중 모달 대규모 언어 모델(MLLM)**이 객체 카운팅이나 공간 추론과 같은 시각 중심 작업에서 제한적인 성능을 보이는 문제를 해결하고자 합니다. 기존 텍스트 전용 감독 방식이 시각적 세부 정보를 무시하게 만드는 한계를 극복하고, MLLM이 복잡한 시각 입력에 대해 더 잘 추론할 수 있도록 미세한 시각적 정보를 보존하고 활용하는 방법을 모색합니다.

## 핵심 방법론
저자들은 **VIRAL(VIsual Representation ALignment)**이라는 간단하지만 효과적인 정규화 전략을 제안합니다. 이 방법은 MLLM의 내부 시각적 표현을 **사전 훈련된 비전 파운데이션 모델(VFM)의 표현**과 명시적으로 정렬합니다. 특히 **DINOv2**와 같은 강력한 VFM을 참조 모델로 사용하며, 정렬 손실은 **코사인 유사도**를 기반으로 하여 MLLM이 입력 시각 인코더의 중요한 시각적 세부 정보를 유지하고 VFM으로부터 추가적인 시각적 지식을 통합하도록 유도합니다.

## 주요 결과
VIRAL은 다양한 멀티모달 벤치마크에서 일관된 성능 향상을 보였습니다. 예를 들어, **Vicuna-1.5-7B (CLIP)** 기반 모델에 DINOv2 VFM을 사용하여 훈련했을 때, **CV-Bench2D** 정확도는 **56.82%에서 59.67%**로, **What's Up**은 **40.13%에서 48.55%**로, **MMVP**는 **28.20%에서 33.33%**로 크게 향상되었습니다. 또한, VIRAL은 모델의 훈련 수렴 속도를 가속화하고, 시각적 토큰 순열에 대한 모델의 민감도를 높여 공간적 관계를 더 잘 포착함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM 훈련에서 **텍스트 전용 감독의 한계**를 명확히 보여주며, 시각적 경로에 대한 **명시적인 정규화**가 모델의 시각적 이해도를 크게 높일 수 있음을 시사합니다. **사전 훈련된 강력한 VFM**을 활용하여 MLLM의 내부 표현을 정렬하는 것은 모델이 미세한 시각적 속성 및 풍부한 시각적 지식을 효과적으로 통합하는 데 핵심적인 전략이 될 수 있습니다. 이는 **정확한 시각적 추론 및 grounding 능력**이 요구되는 MLLM 애플리케이션 개발에 중요한 통찰력을 제공하며, 모델 훈련 효율성까지 개선할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.