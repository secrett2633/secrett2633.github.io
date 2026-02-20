---
title: "[논문리뷰] UniME-V2: MLLM-as-a-Judge for Universal Multimodal Embedding Learning"
excerpt: "Ziyong Feng이 arXiv에 게시한 'UniME-V2: MLLM-as-a-Judge for Universal Multimodal Embedding Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Embeddings
  - MLLM-as-a-Judge
  - Hard Negative Mining
  - Semantic Alignment
  - Representation Learning
  - Reranking
  - Contrastive Learning

permalink: /ai/review/2025-10-16-UniME-V2-MLLM-as-a-Judge-for-Universal-Multimodal-Embedding-Learning/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13515)

**저자:** Tiancheng Gu, Kaicheng Yang, Kaichen Zhang, Xiang An, Ziyong Feng, Yueyi Zhang, Weidong Cai, Jiankang Deng, Lidong Bing



## 핵심 연구 목표
기존 multimodal 임베딩 모델의 한계인 **hard negative 샘플의 다양성 부족** 과 **의미적 미묘한 차이 포착 능력 부족** 을 해결하여, **discriminative ability** 를 향상시키는 보편적인 multimodal 임베딩 모델을 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **UniME-V2** 모델을 제안합니다. 먼저 **글로벌 검색** 을 통해 잠재적 hard negative 세트를 구축한 후, **MLLM-as-a-Judge 메커니즘** 을 도입하여 MLLM이 쿼리-후보 쌍의 **의미적 정렬** 을 평가하고 **soft semantic matching score** 를 생성합니다. 이 점수는 hard negative mining의 기반이 되어 false negative를 줄이고 다양성을 확보하며, 모델이 **similarity matrix** 와 **semantic score matrix** 를 정렬하여 의미적 구분을 학습하도록 지도합니다. 추가적으로 **UniME-V2-Reranker** 는 mined hard negative를 활용한 **joint pairwise 및 listwise 최적화** 를 통해 재랭킹 성능을 향상시킵니다.

## 주요 결과
제안된 **UniME-V2** 모델은 **MMEB 벤치마크** 와 여러 검색 태스크에서 **최고 수준의 성능(state-of-the-art)** 을 달성했습니다. 특히, **UniME-V2 (Qwen2-VL-7B)** 는 **VLM2Vec** 대비 MMEB 전체 점수에서 **2.2%** 향상을 보였습니다. 또한, **UniME-V2-Reranker** 는 **LamRA** 대비 재랭킹 태스크에서 **0.5%에서 7.4%** 에 이르는 성능 향상을 시연했습니다. Ablation 연구에 따르면 **MLLM-as-a-Judge** 방법론은 태스크 전반에 걸쳐 **1.5%~7.6%** 의 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
**MLLMs의 심층적인 언어 및 시각 이해 능력** 을 **hard negative mining** 에 활용하여 multimodal 임베딩 학습의 중요한 병목 현상을 해결하는 혁신적인 접근법을 제시합니다. **UniME-V2** 및 **UniME-V2-Reranker** 는 다양한 multimodal 검색 태스크에서 **뛰어난 성능** 을 보여주어, 실제 애플리케이션에서 **보다 정확하고 견고한 검색 시스템** 을 구축하는 데 활용될 수 있습니다. **soft semantic matching score** 를 통한 학습은 모델의 미세한 의미 구별 능력을 효과적으로 향상시키는 전략으로, 향후 다른 임베딩 학습 시나리오에도 적용될 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.