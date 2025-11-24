---
title: "[논문리뷰] Patch-as-Decodable-Token: Towards Unified Multi-Modal Vision Tasks in
  MLLMs"
excerpt: "Jingyi Liao이 [arXiv]에 게시한 'Patch-as-Decodable-Token: Towards Unified Multi-Modal Vision Tasks in
  MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Visual Reference Tokens (VRTs)
  - Dense Prediction
  - Referring Expression Comprehension (REC)
  - Open-Vocabulary Detection (OVD)
  - Image Captioning
  - Unified Architecture
  - Autoregressive Generation

permalink: /ai/review/2025-10-9-Patch-as-Decodable-Token-Towards-Unified-Multi-Modal-Vision-Tasks-in-MLLMs/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01954)

**저자:** Yongyi Su, Haojie Zhang, Shijie Li, Nanqing Liu, Jingyi Liao, Junyi Pan, Yuan Liu, Xiaofen Xing, Chong Sun, Xulei Yang, Xun Xu, Chen Li, Nancy F. Chen, Shuicheng Yan



## 핵심 연구 목표
기존 MLLM이 시각 작업을 위해 텍스트로 좌표를 생성하는 등 **간접적인 표현 방식**에 의존하여 성능이 제한되고 **분할(Segmentation)과 같은 밀집 예측(Dense Prediction) 작업**이 어려웠던 문제를 해결하는 것입니다. 출력 형식의 불일치, 텍스트-시각 양식 간의 의미 불일치, 불연속적인 좌표 토큰으로 인한 예측 정확도 저하 등의 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 MLLM이 텍스트와 다양한 시각적 결과물을 직접 생성할 수 있도록 **Patch-as-Decodable Token (PaDT)**이라는 통일된 패러다임을 제안합니다. 핵심은 시각적 패치 임베딩에서 파생된 **Visual Reference Tokens (VRTs)**를 LLM의 출력 텍스트 토큰과 원활하게 혼합하는 것입니다. **Dynamic Embedding Module**은 시각 패치로 텍스트 어휘 코드를 확장하고, **PaDT Head**는 VRT를 출력하도록 분류기를 증강하며, **경량 PaDT Decoder**는 VRT를 바운딩 박스, 분할 마스크, 신뢰도 점수와 같은 시각적 결과물로 변환합니다. **강건한 토큰별 교차 엔트로피 손실(Robust Per-token Cross-Entropy Loss)**과 **전경 VRT의 무작위 샘플링**을 통해 학습의 안정성과 일반화 성능을 높였습니다.

## 주요 결과
PaDT는 네 가지 시각 인지 및 이해 작업에서 일관되게 최첨단 성능을 달성했습니다. **Referring Expression Comprehension (REC)**에서 **PaDT Pro (3B)**는 **93.6%의 평균 정확도**로 훨씬 큰 **78B InternVL3 모델**을 능가했으며, **7B 모델**은 **94.5%**를 기록했습니다. **COCO2017 개방형 어휘 탐지(Open-Vocabulary Detection, OVD)**에서는 **PaDT Pro (3B)**가 **38.2 mAP**를, **7B 모델**은 **39.0 mAP**를 달성하여 이전 최고 성능을 거의 두 배로 향상시켰습니다. 또한, **Referring Image Captioning (RIC)** 작업에서 **PaDT Pro (3B)**는 **1.45 CIDEr**, **82.3% GreedyPrecision (GP)**, **45.1% GreddyRecall (GR)**의 높은 점수를 기록하며 유창하고 의미론적으로 정확한 캡션 생성 능력을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM이 다양한 시각 작업을 처리하는 데 있어 **더욱 강건하고 유연한 통합 접근 방식**을 제공합니다. 텍스트 기반 좌표 직렬화의 한계(불일치 출력 형식, 의미 불일치)를 극복하고 **시각 토큰을 직접 생성**하는 패러다임의 유효성을 입증했습니다. 특히, **3B 모델**이 **78B InternVL3**과 같은 훨씬 큰 모델을 능가하는 성능을 보여 **효율적인 확장 가능성**을 시사합니다. 이는 REC, RES, OVD, RIC와 같은 AI 애플리케이션에서 **더 정확하고 의미론적으로 접지된 시각 AI 시스템** 개발에 중요한 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.