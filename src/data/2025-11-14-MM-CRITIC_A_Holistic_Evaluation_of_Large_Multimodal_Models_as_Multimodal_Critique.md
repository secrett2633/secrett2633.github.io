---
title: "[논문리뷰] MM-CRITIC: A Holistic Evaluation of Large Multimodal Models as Multimodal Critique"
excerpt: "이 [arXiv]에 게시한 'MM-CRITIC: A Holistic Evaluation of Large Multimodal Models as Multimodal Critique' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LMMs
  - Multimodal Critique
  - Benchmark
  - Evaluation
  - Reward Model
  - GPT-4o
  - Scaling Law

permalink: /ai/review/2025-11-14-MM-CRITIC_A_Holistic_Evaluation_of_Large_Multimodal_Models_as_Multimodal_Critique/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.09067)

**저자:** Gailun Zeng, Ziyang Luo, Hongzhan Lin, Yuchen Tian, Kaixin Li, Ziyang Gong, Jianxiong Guo, Jing Ma



## 핵심 연구 목표
본 논문은 **대규모 멀티모달 모델(LMMs)**의 멀티모달 비판 능력에 대한 포괄적이고 신뢰성 있는 평가의 필요성을 제기하며, **LMMs의 자가 개선 및 신뢰성** 향상을 목표로 합니다. 기존 벤치마크의 이진 선호도 예측 한계를 넘어, 기본, 교정, 비교의 세 가지 비판 차원에서 **MM-CRITIC** 벤치마크를 제안합니다.

## 핵심 방법론
**MM-CRITIC**은 **MEGA-BENCH**에서 선별된 8가지 주요 작업에 걸쳐 4471개의 LMM 응답 샘플을 수집합니다. **GPT-4o**를 평가 모델로 활용하고, **전문가 기반 채점 루브릭**과 **참조 비판**을 도입하여 **스칼라 및 텍스트 지표**를 통해 LMM의 비판 능력을 다차원적으로 평가합니다.

## 주요 결과
실험 결과, 폐쇄형 LMMs가 개방형 모델을 능가했으며, 특히 **o4-mini**는 **Critique Accuracy (0.900)**에서, **Gemini-2.5-pro**는 **Critique Score (8.514)**에서 최고 성능을 보였습니다. 또한, **LMMs의 비판 능력**이 모델 크기에 비례하여 향상되는 **스케일링 법칙**을 확인했으며, **GPT-4o**가 더 길고 상세한 비판 텍스트에 높은 점수를 주는 편향을 관찰했습니다.

## AI 실무자를 위한 시사점
**MM-CRITIC**은 **LMMs**의 멀티모달 비판 능력을 평가하고 발전시키는 표준화된 프레임워크를 제공하여, AI 개발자들이 모델의 **설명 가능성과 신뢰성**을 향상시키는 데 기여합니다. 평가 모델의 잠재적 편향을 인지하고 이를 완화하는 노력이 중요하며, 향후 인터랙티브한 비판이나 다른 멀티모달리티로 확장을 위한 기초를 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.