---
title: "[논문리뷰] VADER: Towards Causal Video Anomaly Understanding with Relation-Aware   Large Language Models"
excerpt: "arXiv에 게시된 'VADER: Towards Causal Video Anomaly Understanding with Relation-Aware   Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Anomaly Understanding
  - Large Language Models
  - Causal Reasoning
  - Relation-Aware
  - Keyframe Sampling
  - Multimodal LLMs
  - Scene Graphs

permalink: /ai/review/2025-11-11-VADER-Towards-Causal-Video-Anomaly-Understanding-with-Relation-Aware-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07299)

**저자:** Ying Cheng¹, Yu-Ho Lin¹, Min-Hung Chen², Fu-En Yang², Shang-Hong Lai¹*



## 핵심 연구 목표
본 논문은 기존 비디오 이상 탐지(VAD) 방법들이 놓치던 **이상 행동의 깊은 인과 관계 및 객체 간 상호작용** 을 이해하는 한계를 극복하고자 합니다. 궁극적으로 비디오 내 이상 현상에 대한 **자세한 해석과 의미론적 이해** 를 제공하는 것을 목표로 합니다.

## 핵심 방법론
**VADER** 프레임워크는 먼저 **Anomaly Scorer** 로 프레임별 이상 점수를 할당하고, **Context-AwarE Sampling (CAES)** 전략을 통해 이벤트 전, 중, 후 컨텍스트를 포함하는 핵심 프레임을 샘플링합니다. 샘플링된 각 키프레임에 대해 **Relation Feature Extractor** 와 **COntrastive Relation Encoder (CORE)** 를 활용하여 동적인 객체 상호작용을 모델링하고 압축된 관계 토큰을 생성합니다. 최종적으로 시각적 및 관계형 단서를 **LoRA [15]** 어댑터를 통해 파인튜닝된 **Multimodal LLM (NVILA [20]** 기반)에 통합하여 상세하고 인과적으로 설명 가능한 응답을 생성합니다.

## 주요 결과
**VADER** 는 **HIVAU-70k** , **HAWK** , **CUVA** 등 여러 VAU 벤치마크에서 강력한 성능을 달성했습니다. 특히 **CUVA** 벤치마크의 "Causes" 태스크에서 **MMEval 점수를 7.38점 향상** 시켰으며, **HAWK** 벤치마크의 설명 생성 및 질문 응답 태스크에서 기존 모델 대비 **BLEU-1 및 BLEU-4 지표에서 큰 폭의 개선** 을 보였습니다. 제안된 **CAES** 와 **CORE** 모듈의 제거 시 텍스트 및 **GPT** 가이드 메트릭 모두에서 성능 저하가 관찰되어, 각 구성 요소의 중요성이 입증되었습니다.

## AI 실무자를 위한 시사점
**VADER** 는 **LLM** 을 활용하여 단순 탐지를 넘어 비정상 이벤트의 **인과적 맥락과 객체 간의 동적 관계** 를 이해하고 설명하는 새로운 패러다임을 제시합니다. 이는 **보안 및 감시 시스템** 과 같이 **'무슨 일이 일어났는지' 뿐만 아니라 '왜 일어났는지'** 를 알아야 하는 AI 응용 분야에서 **해석 가능성과 신뢰성** 을 높이는 데 기여할 수 있습니다. 다만, 상위 모델에 대한 의존성 및 고동작 이벤트에 대한 편향은 향후 연구에서 개선해야 할 실질적인 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.