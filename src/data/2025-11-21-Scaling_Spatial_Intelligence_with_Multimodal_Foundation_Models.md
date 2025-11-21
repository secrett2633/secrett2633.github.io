---
title: "[논문리뷰] Scaling Spatial Intelligence with Multimodal Foundation Models"
excerpt: "이 [arXiv]에 게시한 'Scaling Spatial Intelligence with Multimodal Foundation Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatial Intelligence
  - Multimodal Foundation Models
  - Data Scaling
  - Perspective-taking
  - Visual Question Answering
  - Emergent Capabilities
  - Embodied AI
  - Benchmark Evaluation

permalink: /ai/review/2025-11-21-Scaling_Spatial_Intelligence_with_Multimodal_Foundation_Models/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13719)

**저자:** Zhongang Cai, Ruisi Wang, Chenyang Gu, Fanyi Pu, Junxiang Xu, Yubo Wang, Wanqi Yin, Zhitao Yang, Chen Wei, Qingping Sun, Tongxi Zhou, Jiaqi Li, Hui En Pang, Oscar Qian, Yukun Wei, Zhiqian Lin, Xuanke Shi, Kewang Deng, Xiaoyang Han, Zukai Chen, Xiangyu Fan, Hanming Deng, Lewei Lu, Liang Pan, Bo Li, Ziwei Liu, Quan Wang, Dahua Lin, Lei Yang



## 핵심 연구 목표
본 연구는 최신 멀티모달 파운데이션 모델(Multimodal Foundation Models, MLLMs)이 가진 공간 지능(spatial intelligence)의 부족함을 해결하고, **SenseNova-SI** 계열 모델을 통해 대규모 데이터 스케일링을 통해 공간 지능을 효과적으로 육성하는 방법을 탐구하는 것을 목표로 합니다. 궁극적으로 MLLM이 3차원 공간을 이해하고 추론하며 상호작용할 수 있는 능력을 향상시키고자 합니다.

## 핵심 방법론
연구팀은 **Qwen3-VL**, **InternVL3**, **Bagel**과 같은 기존 MLLMs를 기반으로 **데이터 중심 접근 방식**을 채택했습니다. 공간 능력의 엄격한 분류 체계(Metric Measurement, Spatial Relations, Mental Reconstruction, Perspective-taking, Comprehensive Reasoning)에 따라 **SenseNova-SI-8M (8백만 개 이상의 다양하고 고품질의 공간 데이터 샘플)**을 체계적으로 큐레이션하고 모델을 지속적으로 훈련했습니다. 특히 기존 데이터셋에서 부족했던 **Perspective-taking** 작업에 중점을 두었습니다.

## 주요 결과
**SenseNova-SI**는 다양한 공간 지능 벤치마크에서 **최고 성능**을 달성했습니다: **VSI-Bench 68.7%**, **MMSI 43.3%**, **MindCube 85.6%**, **ViewSpatial 54.6%**, **SITE 50.1%**를 기록하며 오픈 소스 모델들을 능가하고 특정 공간 능력에서는 **GPT-5**보다 뛰어난 성능을 보였습니다. 동시에 **MMBench-En 84.9%**를 기록하며 일반 멀티모달 이해 능력도 강력하게 유지했습니다. 또한, 훈련 시 **16프레임**으로 학습했음에도 추론 시 **32프레임 이상**의 시퀀스에 효과적으로 일반화하는 **초기 발현적 일반화 능력**을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLMs의 공간 지능 향상에 **대규모의 다양하고 공간적으로 기반을 둔 데이터**의 중요성을 강조합니다. 공개된 **SenseNova-SI 모델**은 미래 연구를 위한 강력한 기반을 제공하며, AI/ML 엔지니어는 **데이터 큐레이션 및 훈련 전략**에 집중하여 모델의 공간 이해 능력을 향상시킬 수 있습니다. 특히, 언어적 편향이나 지름길 학습을 피하기 위한 **견고한 평가 방법론**의 필요성과 **Perspective-taking**과 같은 특정 공간 능력의 집중적인 강화가 **로봇 조작(embodied manipulation)**과 같은 실제 응용 분야에 직접적인 이점을 가져올 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.