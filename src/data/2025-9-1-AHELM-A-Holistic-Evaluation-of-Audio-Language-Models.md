---
title: "[논문리뷰] AHELM: A Holistic Evaluation of Audio-Language Models"
excerpt: "Siwei Yang이 arXiv에 게시한 'AHELM: A Holistic Evaluation of Audio-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Language Models
  - Holistic Evaluation
  - Benchmarking
  - Multimodality
  - Fairness
  - Robustness
  - Reasoning
  - Bias Detection

permalink: /ai/review/2025-9-1-AHELM-A-Holistic-Evaluation-of-Audio-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21376)

**저자:** Tony Lee, Haoqin Tu, Chi Heem Wong, Yuyin Zhou, Zijun Wang, Siwei Yang, Yifan Mai, Cihang Xie, Percy Liang



## 핵심 연구 목표
오디오-언어 모델(ALMs)의 표준화된 벤치마크 부족 문제를 해결하고, 기존 평가들이 제한된 기능에만 초점을 맞추며 공정성 및 안전성 같은 중요한 측면을 간과하는 한계를 극복하는 것을 목표로 합니다. ALM의 기술적, 사회적 관점 모두에서 포괄적인 성능 평가 프레임워크를 제공하여 안전하고 신뢰할 수 있는 배포를 지원하고자 합니다.

## 핵심 방법론
**AHELM** 이라는 포괄적인 벤치마크를 도입하여 오디오 지각, 지식, 추론, 감정 감지, 편향, 공정성, 다국어성, 견고성, 유해성, 안전성 등 **10가지 핵심 측면** 을 평가합니다. 이에는 **PARADE** (스테레오타입 편향 평가) 및 **CoRe-Bench** (대화형 오디오 추론 평가)와 같은 **2개의 새로운 합성 데이터셋** 을 포함한 **14개의 기존 데이터셋** 이 통합되었습니다. 평가를 위해 **프롬프트, 추론 매개변수, 평가 지표** 를 표준화하고, **14개의 최신 ALM** 과 **3개의 ASR+LM 기반 시스템** 을 테스트했습니다.

## 주요 결과
**Gemini 2.5 Pro (05-06 Preview)** 가 전체적으로 가장 우수했지만, ASR 태스크에서 **그룹 불공정성(p = 0.01)** 을 보였습니다. 놀랍게도 **GPT-4o-mini Transcribe + GPT-4o** 와 같은 베이스라인 시스템이 전체 리더보드에서 **5위** 를 차지하는 등 ALM에 필적하는 성능을 보였습니다. 이는 베이스라인의 전용 ASR 모듈이 음성 인식에 더 뛰어나고 환경 노이즈에 강하며, 텍스트가 대부분의 오디오 태스크에서 좋은 추상화 역할을 한다는 것을 시사합니다.

## AI 실무자를 위한 시사점
**AHELM** 은 ALM 개발자들이 모델의 강점과 약점을 체계적으로 이해하고, 편향 및 공정성과 같은 사회적 측면을 고려한 개발을 촉진하는 데 필수적인 도구를 제공합니다. 베이스라인 시스템의 강력한 성능은 ALM 설계 시 **전용 ASR 모듈의 통합** 을 고려하거나, 노이즈에 강한 아키텍처를 도입하는 것이 중요함을 시사합니다. 또한, **PARADE** 및 **CoRe-Bench** 와 같은 새로운 데이터셋은 ALM의 추론 및 편향 감지 능력을 평가하는 데 중요한 자원입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.