---
title: "[논문리뷰] Multimodal RewardBench 2: Evaluating Omni Reward Models for Interleaved Text and Image"
excerpt: "이 [arXiv]에 게시한 'Multimodal RewardBench 2: Evaluating Omni Reward Models for Interleaved Text and Image' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reward Models
  - Multimodal LLMs
  - Benchmark
  - Text-to-Image Generation
  - Image Editing
  - Interleaved Generation
  - Multimodal Reasoning
  - MLLM-as-a-judge

permalink: /ai/review/2025-12-19-Multimodal-RewardBench-2-Evaluating-Omni-Reward-Models-for-Interleaved-Text-and-Image/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16899)

**저자:** Yushi Hu, Reyhane Askari-Hemmat, Melissa Hall, Emily Dinan, Luke Zettlemoyer, Marjan Ghazvininejad



## 핵심 연구 목표
본 논문은 이미지와 텍스트가 혼합된 시퀀스를 처리하는 옴니 모델(Omni Models)을 위한 보상 모델(Reward Models, RMs)의 부족한 평가 프레임워크를 해결하고자 합니다. 특히, 텍스트 전용 LLM에 비해 옴니 모델의 보상 모델링이 충분히 탐구되지 않은 문제를 해결하기 위해, 다중 모달 이해 및 생성에 대한 포괄적인 평가 벤치마크인 **Multimodal RewardBench 2 (MMRB2)** 를 구축하는 것을 목표로 합니다.

## 핵심 방법론
MMRB2는 **텍스트-이미지 생성, 이미지 편집, 인터리브드 생성, 다중 모달 추론** 의 네 가지 주요 서브태스크를 포함합니다. 각 태스크는 **1,000개** 의 전문가 주석이 달린 선호도 쌍으로 구성되며, 이는 **23개 모델 및 에이전트** 와 **21개 소스 태스크** 에서 수집되었습니다. 벤치마크는 실제적이고 도전적인 프롬프트, 최신 모델의 응답, 그리고 **앙상블 필터링 전략** 을 통해 높은 인간 전문가 합의를 보장하는 선호도 쌍으로 설계되었습니다.

## 주요 결과
MMRB2 평가 결과, 최신 모델인 **Gemini 3 Pro** 가 모든 서브태스크에서 **74-80%** 의 정확도로 가장 우수한 성능을 보였습니다. **GPT-5** 와 **Gemini 2.5 Pro** 는 **66-75%** 를 달성했으며, **GPT-4o** 는 **59%** 로 낮은 성능을 기록했습니다. 또한, MMRB2 성능은 **Best-of-N 샘플링** 을 사용한 다운스트림 태스크 성공과 강력한 상관관계를 보였고, 다중 모달 추론 태스크에서는 이미지 포함 응답에 대한 강한 편향성( **27.7-49.3% 격차** )이 관찰되었습니다.

## AI 실무자를 위한 시사점
MMRB2는 옴니 모델의 보상 모델 개발 및 평가를 위한 견고하고 도전적인 기반을 제공합니다. 현재 MLLM-as-a-judge 방식의 한계, 특히 추론 태스크에서의 낮은 정확도와 이미지 포함 응답에 대한 편향성을 명확히 보여줍니다. 이는 향후 보상 모델 연구에서 개선해야 할 핵심 영역을 강조하며, AI 엔지니어들이 더욱 효과적인 다중 모달 보상 모델을 개발하는 데 중요한 이정표가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.