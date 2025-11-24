---
title: "[논문리뷰] Where MLLMs Attend and What They Rely On: Explaining Autoregressive
  Token Generation"
excerpt: "Shiming Liu이 [arXiv]에 게시한 'Where MLLMs Attend and What They Rely On: Explaining Autoregressive
  Token Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MLLM
  - Interpretability
  - Attribution
  - Token Generation
  - Black-box Explanation
  - Hallucination Diagnosis
  - Multimodality
  - VQA

permalink: /ai/review/2025-9-29-Where-MLLMs-Attend-and-What-They-Rely-On-Explaining-Autoregressive-Token-Generation/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22496)

**저자:** Ruoyu Chen, Xiaoqing Guo, Kangwei Liu, Siyuan Liang, Shiming Liu, Qunli Zhang, Hua Zhang, Xiaochun Cao



## 핵심 연구 목표
Multimodal Large Language Models (MLLMs)의 자동 회귀 토큰 생성 과정에서 시각적 입력이 출력 토큰에 미치는 영향을 설명하고, 언어적 선험 지식과 지각적 증거의 상대적 영향력을 정량화하는 것을 목표로 합니다. 이를 통해 MLLM의 해석 가능성, 신뢰성, 그리고 환각 현상 진단 능력을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 **EAGLE**이라는 경량의 블랙박스 귀인(attribution) 프레임워크를 제안합니다. 이 프레임워크는 선택된 토큰을 **압축된 지각 영역**에 귀속시키고, 언어적 선험 지식과 지각적 증거의 상대적 영향력을 정량화합니다. **충분성(insight score)**과 **필요성(necessity score)**을 통합한 목적 함수를 설계하여, **희소화된 이미지 영역(SLICO superpixel)**에 대한 **그리디 탐색 전략**으로 최적화합니다. 또한, **모달리티 인식 분석**을 통해 각 토큰이 지각 증거와 언어 선험 지식 중 어느 것에 더 의존하는지 평가합니다.

## 주요 결과
**EAGLE**은 기존 귀인 방법론인 **LLaVA-CAM**, **IGOS++**, **TAM**을 일관되게 능가했습니다. 이미지 캡셔닝에서 귀인 충실도 지표(insertion 및 deletion AUC)를 평균 **20.0%** 및 **13.4%** 개선했으며, VQA 태스크에서는 각각 **20.6%** 및 **8.1%** 향상시켰습니다. 또한, **RePOPE 벤치마크**에서 환각 진단 시 AMCR을 최대 **82.3%**, CSR@10%를 최대 **106.6%** 개선했습니다. 특히, **Qwen2.5-VL 7B** 모델에서 **IGOS++**의 **96.90 GB**에 비해 **17.68 GB**의 훨씬 적은 GPU 메모리만 필요로 하는 효율성을 보여주었습니다.

## AI 실무자를 위한 시사점
**EAGLE**은 MLLM의 예측이 시각적 입력의 어떤 부분에 기반하는지 명확히 보여주는 효과적인 블랙박스 도구를 제공하여, 모델의 의사 결정 과정을 이해하고 신뢰성을 높이는 데 기여합니다. 특히, **환각 현상(hallucinations)의 원인을 진단하고 완화**하는 데 실용적인 해결책을 제시하며, **낮은 GPU 메모리 사용량**은 실제 MLLM 애플리케이션에 쉽게 통합될 수 있음을 시사합니다. 이를 통해 MLLM 기반 시스템의 디버깅 및 안전성 강화에 중요한 역할을 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.