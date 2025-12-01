---
title: "[논문리뷰] Learning Human-Perceived Fakeness in AI-Generated Videos via Multimodal
  LLMs"
excerpt: "이 [arXiv]에 게시한 'Learning Human-Perceived Fakeness in AI-Generated Videos via Multimodal
  LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI-Generated Videos
  - Deepfake Detection
  - Multimodal LLMs
  - Human Perception
  - Video Generation Evaluation
  - Spatiotemporal Annotation
  - Reward Modeling

permalink: /ai/review/2025-10-1-Learning-Human-Perceived-Fakeness-in-AI-Generated-Videos-via-Multimodal-LLMs/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22646)

**저자:** Xingyu Fu, Siyi Liu, Yinuo Xu, Pan Lu, Guangqiuse Hu, Tianbo Yang, Taran Anantasagar, Christopher Shen, Yikai Mao, Yuanzhe Liu, Keyush Shah, Chung Un Lee, Yejin Choi, James Zou, Dan Roth, Chris Callison-Burch



## 핵심 연구 목표
본 연구는 AI-생성 비디오에서 인간이 인지하는 '딥페이크 흔적'을 식별하고 그 이유를 근거 있게 설명할 수 있는가에 대한 문제를 해결하고자 합니다. 기존 비디오 생성 모델 평가가 인간의 시각적 인지를 간과하는 한계를 극복하고, 사회적으로 책임감 있고 신뢰할 수 있는 비디오 생성을 위한 엄격한 테스트베드와 훈련 신호를 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 AI-생성 비디오의 인간 인지 딥페이크 흔적을 위한 최초의 시공간적으로 정교한 벤치마크인 **DEEPTRACEREWARD** 를 도입했습니다. 이 데이터셋은 7가지 최신 모델에서 생성된 3.3K개의 고품질 비디오와 실제 비디오를 포함하며, 각 주석은 자연어 설명, 경계 상자를 통한 시공간적 위치 파악, 그리고 정확한 시작 및 종료 타임스탬프를 제공합니다. 딥페이크 흔적은 9가지 주요 카테고리로 분류되었으며, **VideoLLaMA 3** 와 **Qwen 2.5 VL** 기반의 **멀티모달 언어 모델(LLM)** 을 보상 모델로 학습시켜 인간의 판단과 지역화를 모방하도록 했습니다.

## 주요 결과
기존의 SOTA 멀티모달 LLM(예: **GPT 5** , **GPT 4.1** , **Gemini 2.5 Pro** )은 이진 분류에서는 70% 이상의 높은 정확도를 보였지만, 미세한 딥페이크 흔적 감지에서는 36% 미만의 낮은 성능을 기록했습니다. 반면, **DEEPTRACEREWARD** 로 훈련된 **VideoLLaMA 3 (7B)** 모델은 딥페이크 흔적 식별, 근거 제시, 설명 부문에서 평균 **70.2%** 의 성능을 달성하여 **GPT 5** 대비 **34.7%** , **Gemini 2.5 Pro** 대비 **40.2%** 높은 점수를 기록했습니다. 또한, 이진 분류(99.4%)는 쉽지만, 자연어 설명, 공간적 위치 파악, 시간적 라벨링 순으로 난이도가 증가하는 일관된 경향을 보였습니다.

## AI 실무자를 위한 시사점
**DEEPTRACEREWARD** 는 AI-생성 비디오의 잠재적 오용을 방지하고 더 높은 품질의 콘텐츠를 개발하는 데 필수적인 인간 중심의 피드백 루프를 제공합니다. AI/ML 엔지니어는 이 벤치마크를 활용하여 모델이 단순한 '가짜' 여부를 넘어, 어떤 시각적 결함 때문에 '가짜'로 인지되는지 이해하고, 이를 통해 **딥페이크 탐지 및 방지 기술을 고도화** 할 수 있습니다. 특히, 미세한 시공간적 오류를 식별하고 설명하는 능력은 **AI 시스템의 투명성과 신뢰성** 을 크게 향상시킬 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.