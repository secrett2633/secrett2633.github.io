---
title: "[논문리뷰] ELV-Halluc: Benchmarking Semantic Aggregation Hallucinations in Long
  Video Understanding"
excerpt: "Xuanyu Zheng이 [arXiv]에 게시한 'ELV-Halluc: Benchmarking Semantic Aggregation Hallucinations in Long
  Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Understanding
  - Hallucination
  - Semantic Aggregation
  - Video MLLM
  - Benchmark
  - DPO
  - Positional Encoding
  - VideoQA

permalink: /ai/review/2025-9-3-ELV-Halluc-Benchmarking-Semantic-Aggregation-Hallucinations-in-Long-Video-Understanding/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21496)

**저자:** Hao Lu, Jiahao Wang, Yaolun Zhang, Ruohui Wang, Xuanyu Zheng, Yepeng Tang, Dahua Lin, Lewei Lu



## 핵심 연구 목표
Video MLLM(Multimodal Large Language Models)이 긴 비디오에서 보이는 **Semantic Aggregation Hallucination (SAH)** 문제를 해결하는 데 목표를 둡니다. SAH는 모델이 프레임 수준의 의미를 정확하게 인식하지만, 이를 비디오 내 다른 이벤트에 잘못 연결하여 발생하는 오류를 의미하며, 기존 짧은 비디오 기반의 환각 벤치마크에서는 이 문제가 간과되었습니다. 이를 체계적으로 조사하기 위한 최초의 장편 비디오 환각 벤치마크인 **ELV-Halluc** 을 제시합니다.

## 핵심 방법론
ELV-Halluc 벤치마크는 여러 명확히 분리된 이벤트를 포함하는 **Event-by-Event Videos** 를 기반으로 구축되었습니다. 환각 유형은 **Visual details, Action, Object, Declarative content** 네 가지 의미론적 측면으로 분류되며, **적대적 삼중 질문 쌍** (Ground Truth, In-Video Hallucinated, Out-of-Video Hallucinated)을 사용하여 SAH를 정량화합니다. SAH 비율은 **(OutAcc - InAcc) / (1 - InAcc)** 로 계산됩니다. 또한, SAH 완화를 위해 **VideoROPE** 와 같은 강화된 **위치 인코딩** 전략과 **Direct Preference Optimization (DPO)** 을 적용했습니다.

## 주요 결과
ELV-Halluc 벤치마크를 통해 SAH의 존재를 확인했으며, SAH는 **의미론적 복잡성 증가** (더 많은 이벤트, 조밀한 프레임 샘플링)에 따라 심화되는 것으로 나타났습니다. 특히 **Visual Details** 와 같이 빠르게 변화하는 의미에서 SAH가 더 빈번하게 발생했습니다. **VideoROPE** 가 가장 낮은 SAH 비율인 **0.88%** 를 달성하며 효과를 입증했습니다. 또한, **DPO** 전략을 적용하여 **Qwen2.5-VL-7B** 모델의 SAH 비율을 **8.3%에서 6.0%로 27.7% 감소** 시키고, ELV-Halluc의 전반적인 정확도를 **0.3점** 향상시켰습니다.

## AI 실무자를 위한 시사점
장편 비디오 이해를 위한 MLLM 개발 시, 기존의 일반적인 환각뿐만 아니라 **Semantic Aggregation Hallucination (SAH)** 에 대한 특별한 고려가 필요함을 시사합니다. **강화된 위치 인코딩 기법** 과 **DPO 기반의 선호도 학습** 은 SAH를 효과적으로 완화하고 모델의 전반적인 성능을 향상시키는 실용적인 전략이 될 수 있습니다. ELV-Halluc 벤치마크는 이러한 특정 유형의 오류를 평가하고 모델 개발 방향을 제시하는 중요한 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.