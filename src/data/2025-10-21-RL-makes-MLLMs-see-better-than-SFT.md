---
title: "[논문리뷰] RL makes MLLMs see better than SFT"
excerpt: "arXiv에 게시된 'RL makes MLLMs see better than SFT' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Language Models
  - Reinforcement Learning
  - Supervised Finetuning
  - Vision Encoder
  - Visual Representations
  - Direct Preference Optimization
  - Preference Alignment
  - PIVOT

permalink: /ai/review/2025-10-21-RL-makes-MLLMs-see-better-than-SFT/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.16333)

**저자:** Junha Song, Sangdoo Yun, Dongyoon Han, Jaegul Choo, Byeongho Heo



## 핵심 연구 목표
본 논문은 MLLM(Multimodal Language Model) 연구에서 **LLM 백본** 에 대한 지배적인 가정으로 인해 **비전 인코더** 의 역할이 간과되어 왔다는 문제의식에서 출발합니다. 특히 **SFT(Supervised Finetuning)** 와 **RL(Reinforcement Learning)** 과 같은 훈련 패러다임이 비전 인코더의 시각적 표현을 어떻게 재구성하는지에 대한 이해 부족을 해결하고, MLLM을 위한 강력한 비전 백본을 구축하는 효과적인 방법을 제시하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 MLLM 훈련 전략이 비전 인코더에 미치는 영향을 비교하기 위해 **SFT** 와 **DPO(Direct Preference Optimization)** 를 사용했습니다. **ImageNet 분류** , **시맨틱 분할** , **Grad-CAM 기반 그래디언트 시각화** 등 다양한 실험을 통해 시각적 표현의 변화를 분석했습니다. 이러한 분석을 바탕으로, RL 훈련을 비전 인코더를 위한 보조 훈련 과정으로 재구성한 **PIVOT(Preference-Instructed Vision OpTimization)** 라는 새로운 레시피를 제안하고, **CLIP** , **DINO** , **MAE** 등 다양한 비전 인코더에 적용하여 그 효과를 검증했습니다.

## 주요 결과
**RL(DPO)** 은 **SFT** 에 비해 **강하게 시각 관련 VQA 벤치마크** 에서 우수한 성능을 보였으며, 특히 **SigLIP2-L/16** 모델에서 Vision-Centric VQA 성능을 **+4.2%p** 향상시켰습니다. DPO는 SFT에 비해 **더 강력하고 정확하게 국소화된 시각적 표현** 을 생성하며, 이는 ImageNet 분류에서 **+1.83%p** 정확도 향상과 정교한 세그멘테이션 결과로 입증되었습니다. 또한, 제안된 **PIVOT** 방법론은 표준 비전 사전 훈련 비용의 **1% 미만** 으로도 **PIVOT-향상된 SigLIP1-So/14** 모델이 **SigLIP2-So/16** 보다 **53.2%p 대 52.4%p** 로 더 나은 MLLM 평균 VQA 성능을 달성하게 했습니다.

## AI 실무자를 위한 시사점
**RL(특히 DPO)** 이 MLLM의 **시각적 이해 및 객체 국소화 능력** 을 **SFT보다 훨씬 효과적으로 개선** 할 수 있음을 보여주어, MLLM 개발 시 RL 기반 미세 조정의 중요성을 강조합니다. **PIVOT** 은 적은 컴퓨팅 자원( **8개의 H100 GPU로 18시간 훈련** )으로도 기존 비전 모델의 성능을 크게 향상시킬 수 있는 **매우 효율적인 접근 방식** 을 제공합니다. AI 실무자들은 MLLM의 비전 백본을 최적화할 때 **LLM 중심의 시각** 을 넘어 **RL 기반 시각 표현 학습** 에 집중하는 것이 효과적이며, 특히 **강력한 시각적 이해** 가 요구되는 태스크에 유리할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.