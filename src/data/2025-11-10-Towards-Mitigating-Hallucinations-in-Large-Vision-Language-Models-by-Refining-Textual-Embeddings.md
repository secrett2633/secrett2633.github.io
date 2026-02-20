---
title: "[논문리뷰] Towards Mitigating Hallucinations in Large Vision-Language Models by Refining Textual Embeddings"
excerpt: "Jiaxin Yuan이 arXiv에 게시한 'Towards Mitigating Hallucinations in Large Vision-Language Models by Refining Textual Embeddings' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hallucination Mitigation
  - Large Vision-Language Models
  - Textual Embeddings
  - Multimodal Reasoning
  - Attention Mechanism
  - Visual Grounding
  - Modality Imbalance

permalink: /ai/review/2025-11-10-Towards-Mitigating-Hallucinations-in-Large-Vision-Language-Models-by-Refining-Textual-Embeddings/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05017)

**저자:** Aakriti Agrawal, Gouthaman KV, Rohith Aralikatti, Gauri Jagatap, Jiaxin Yuan, Vijay Kamarshi, Andrea Fanelli, Furong Huang



## 핵심 연구 목표
대규모 비전-언어 모델(LVLM)이 시각적 정보를 불충분하게 활용하고 텍스트 우선(textual priors)에 과도하게 의존하여 발생하는 환각(hallucinations) 문제를 해결하는 것을 목표로 합니다. 이를 통해 모델의 시각적 grounding을 강화하고 더 균형 잡힌 멀티모달 추론을 촉진하고자 합니다.

## 핵심 방법론
제안하는 **VisAlign** 방법론은 텍스트 임베딩에 시각적 정보를 통합하여 개선합니다. 이는 먼저 투영된 시각 임베딩( **Vproj** )을 평균 풀링하여 단일 시각 임베딩 벡터( **V** )를 생성한 후, 이 벡터를 텍스트 임베딩( **T** )과 연결하여 퓨전 임베딩( **Tv** )을 만듭니다. 마지막으로 **선형 투영 레이어** 를 사용하여 **Tv** 를 LLM 임베딩 공간으로 다시 매핑하여 시각적으로 grounding된 텍스트 토큰 시퀀스( **T_hat** )를 생성하고, 이를 원본 시각 임베딩과 함께 LLM에 입력합니다. 이 방법은 **Video-LLaVA** 를 기반으로 두 단계(사전 훈련 및 fine-tuning)로 학습됩니다.

## 주요 결과
**VisAlign** 은 여러 환각 벤치마크에서 상당한 성능 향상을 보였습니다. 특히 **MMVP-MLLM에서 +9.33%** , **POPE-AOKVQA에서 +2.99%** , **Merlin에서 최대 +3.4%** , 그리고 **HallusionBench의 hard-data split에서 +3%** 의 개선을 달성했습니다. 이는 기존 모델 대비 시각 및 텍스트 토큰 전반에 걸쳐 더욱 균형 잡힌 어텐션 분포를 유도하여 모델의 시각적 grounding 능력을 크게 향상시켰음을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **LVLM의 환각 문제** 를 입력 표현 수준에서 근본적으로 해결하는 효과적인 방법을 제시합니다. 이는 기존의 사후 보정 방식이나 추론 시간 기법과 상호 보완적으로 활용될 수 있어 **멀티모달 AI 시스템의 신뢰성** 과 정확도를 높이는 데 기여할 수 있습니다. 특히 **VisAlign** 이 **LLaVA 1.5** 와 같은 다른 SOTA LVLM에서도 성능 향상을 보여주어, 다양한 모델에 적용 가능한 일반적인 해결책임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.