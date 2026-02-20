---
title: "[논문리뷰] ARC-Chapter: Structuring Hour-Long Videos into Navigable Chapters and Hierarchical Summaries"
excerpt: "arXiv에 게시된 'ARC-Chapter: Structuring Hour-Long Videos into Navigable Chapters and Hierarchical Summaries' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Chaptering
  - Long-form Video Understanding
  - Large Language Models
  - Multimodal Learning
  - Hierarchical Summarization
  - Video Segmentation
  - Reinforcement Learning
  - Dataset Creation

permalink: /ai/review/2025-11-20-ARC-Chapter-Structuring-Hour-Long-Videos-into-Navigable-Chapters-and-Hierarchical-Summaries/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14349)

**저자:** Junfu Pu*, Teng Wang*, Yixiao Ge*, Yuying Ge, Chen Li, Ying Shan (ARC Lab, Tencent PCG) - *Core contributors, Project lead



## 핵심 연구 목표
본 논문은 기존 비디오 챕터링 방법론이 짧고 거친 주석에 의해 제한되어 장시간 비디오의 미묘한 전환에 대한 일반화가 어렵다는 문제를 해결하고자 합니다. `ARC-Chapter`는 장시간 비디오를 탐색 가능한 챕터와 계층적 요약으로 구조화하는 확장 가능하고 강력한 프레임워크를 구축하여, 데이터 희소성 및 기존 평가 지표의 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **100만 개 이상의 장시간 비디오** 로 구성된 최초의 대규모 데이터셋인 **VidAtlas** 를 구축했습니다. **ASR transcripts** , **scene texts** , **visual captions** 등 멀티모달 정보를 통합하여 **LLM-기반 파이프라인** 을 통해 계층적 챕터 주석을 생성합니다. 모델은 **Qwen2.5-VL-7B** 를 기반으로 하며, 다양한 입력 모달리티(ASR-only, Video-only, ASR+Video)를 지원하고, **GRACE** 라는 새로운 granularity-robust 평가 지표를 제안하여 챕터 경계의 품질을 평가합니다. 또한, **GRPO 알고리즘** 을 사용한 **강화 학습(RL)** 단계로 시간적 정밀도를 향상시킵니다.

## 주요 결과
`ARC-Chapter`는 **VidChapters-7M-test** 벤치마크에서 기존 최고 성능 대비 **F1 점수 14.0%** (45.3%에서 **59.3%** ) 및 **SODA 점수 11.3%** (19.3%에서 **30.6%** )의 큰 폭으로 새로운 최고 기록을 달성했습니다. **VidAtlas-test** 세트에서는 멀티모달 모델(`ARCChapter-vidasr`)이 **F1 66.2** , tIoU **84.0** , SODA **30.2** , CIDEr **141.5** , GRACE **34.1** 를 기록했습니다. 또한, **YouCook2** 와 같은 다운스트림 태스크에서 **F1/SODA 점수 37.9/12.5** 로 우수한 전이학습 성능을 보였습니다.

## AI 실무자를 위한 시사점
`ARC-Chapter`는 장시간 비디오 콘텐츠의 복잡한 구조와 의미를 이해하는 데 있어 **멀티모달 대규모 언어 모델(MLLM)의 강력한 능력** 을 입증했습니다. **VidAtlas** 와 같은 대규모, 고품질 데이터셋의 구축과 **ASR, OCR, 비디오 캡션** 통합 파이프라인 설계는 비디오 이해 모델 개발의 핵심 전략으로 활용될 수 있습니다. **GRACE** 평가 지표와 **GRPO 기반 RL 훈련** 은 모델의 시간적 정확도와 유연성을 높이는 효과적인 방법론으로, 실제 서비스에서 비디오 탐색 및 요약 기능을 크게 향상시킬 잠재력이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.