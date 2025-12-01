---
title: "[논문리뷰] Has GPT-5 Achieved Spatial Intelligence? An Empirical Study"
excerpt: "Ruisi Wang이 [arXiv]에 게시한 'Has GPT-5 Achieved Spatial Intelligence? An Empirical Study' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatial Intelligence
  - Multimodal LLMs
  - Benchmark Evaluation
  - GPT-5
  - Cognitive AI
  - AGI

permalink: /ai/review/2025-8-19-Has-GPT-5-Achieved-Spatial-Intelligence-An-Empirical-Study/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13142)

**저자:** Zhongang Cai, Yubo Wang, Qingping Sun, Ruisi Wang, et al.



## 핵심 연구 목표
이 연구는 최신 **MLLM(Multi-modal Large Language Model)** , 특히 **GPT-5** 가 인공 일반 지능(AGI)의 핵심 역량인 공간 이해 및 추론 능력을 얼마나 달성했는지 실증적으로 평가하는 것을 목표로 합니다. 이를 위해 기존 벤치마크를 통합하는 포괄적인 공간 태스크 분류 체계를 제안하고, 공정한 모델 평가의 과제를 해결하고자 합니다.

## 핵심 방법론
연구는 공간 지능을 **Metric Measurement (MM)** , **Mental Reconstruction (MR)** , **Spatial Relations (SR)** , **Perspective-taking (PT)** , **Deformation and Assembly (DA)** , **Comprehensive Reasoning (CR)** 의 여섯 가지 핵심 능력으로 분류했습니다. **VSI-Bench** , **SITE** , **MMSI** 등 **8가지 핵심 공간 지능 벤치마크** 에 대해 **GPT-5** , **Gemini-2.5-pro** 등의 모델을 **제로샷 CoT(Chain-of-Thought) 프롬프트** 와 표준화된 평가 지표( **Chance-Adjusted Accuracy (CAA)** , **Mean Relative Accuracy (MRA)** )를 사용하여 평가했습니다.

## 주요 결과
평가 결과, **GPT-5** 는 공간 지능 분야에서 **최고 성능(SOTA)** 을 달성했지만, **Mental Reconstruction (MR)** , **Perspective-taking (PT)** , **Deformation and Assembly (DA)** , **Comprehensive Reasoning (CR)** 태스크에서 인간 수준에 크게 미치지 못했습니다(예: **MMSI** 에서 **GPT-5** 의 **CAA 22.47%** vs. 인간 **96.27%** ). 반면, **Metric Measurement (MM)** 및 **Spatial Relations (SR)** 일부 태스크에서는 인간 수준에 근접했습니다. 또한, 어려운 공간 지능 문제에서는 독점 모델과 오픈소스 모델 간의 성능 우위가 뚜렷하지 않았습니다.

## AI 실무자를 위한 시사점
본 연구는 **GPT-5** 의 발전에도 불구하고 공간 지능이 여전히 **MLLM** 의 중요한 한계 영역임을 명확히 보여줍니다. 기본적인 공간 인식에서는 유용할 수 있지만, 복잡한 다단계 공간 추론 능력은 개선이 시급합니다. 난이도 높은 태스크에서 독점 모델의 우위가 크지 않으므로, **오픈소스 모델 개발 및 커뮤니티 협력** 을 통해 이 분야의 발전을 가속화할 기회가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.