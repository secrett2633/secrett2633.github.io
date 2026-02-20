---
title: "[논문리뷰] Hearing to Translate: The Effectiveness of Speech Modality Integration into LLMs"
excerpt: "Carlos Escolano이 arXiv에 게시한 'Hearing to Translate: The Effectiveness of Speech Modality Integration into LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech-to-Text Translation
  - Multimodal LLMs
  - Speech Foundation Models
  - Cascaded Systems
  - Benchmarking
  - Speech Modality Integration
  - Robustness
  - Evaluation Metrics

permalink: /ai/review/2025-12-19-Hearing-to-Translate-The-Effectiveness-of-Speech-Modality-Integration-into-LLMs/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16378)

**저자:** Carlos Escolano, Vilém Zouhar, Zachary Hopton, javi8979, spapi



## 핵심 연구 목표
이 논문은 음성 양식이 **LLM(Large Language Model)** 에 직접 통합될 때 **음성-텍스트 번역(ST)** 품질이 향상되는지, 아니면 기존의 **계단식(cascaded)** 또는 **직접(direct) 모델** 이 여전히 더 효과적인 솔루션인지 평가합니다. 특히, **SpeechLLM** (음성 모달리티가 통합된 LLM)이 전통적인 ST 아키텍처를 능가할 수 있는지 검증하고, 음성 통합의 실질적인 이점을 파악하는 것을 목표로 합니다.

## 핵심 방법론
연구는 **5개의 최신 SpeechLLM** 과 **16개의 강력한 계단식 및 직접 시스템** 을 비교하는 **Hearing to Translate** 라는 포괄적인 테스트 스위트를 도입합니다. 이 스위트는 **16개의 벤치마크** , **13개의 언어 쌍** , 그리고 **9가지 도전적인 음향 및 언어 현상(예: 비유창성, 노이즈, 장문 음성)** 을 포함합니다. 평가는 **XCOMET** 및 **MetricXE** 와 같은 품질 예측(QE) 메트릭과 성별 편향, 악센트, 개체명 인식 등을 측정하는 맞춤형 **갭(gap) 메트릭** 을 활용했습니다.

## 주요 결과
전반적으로 **계단식 시스템** 이 가장 신뢰할 수 있으며, 언어, 벤치마크, 음향 조건 전반에 걸쳐 가장 강력하고 일관된 번역 품질을 제공했습니다. 반면, **SpeechLLM** 은 노이즈 음성, 코드 스위칭, 비유창성 등 특정 설정에서만 **계단식 시스템** 과 동등하거나 약간 우월한 성능을 보였고, 특히 **Voxtral** 모델이 강점을 보였습니다. **단독 SFM(Speech Foundation Model)** 은 **LLM** 을 활용한 시스템(계단식 및 SpeechLLM)에 비해 뒤처져, 정확한 번역을 위해 **LLM의 언어 능력** 이 중요함을 시사합니다. 예를 들어, **NoisyFLEURS** 벤치마크에서 **SpeechLLM** 은 **38%** 이상의 **Δnoise** 성능 저하를 보이는 **SFM** 및 **계단식 시스템** 보다 우수한 강건성을 보였습니다.

## AI 실무자를 위한 시사점
현재 **SpeechLLM** 은 특정 도전적인 조건에서 유망하지만, 아직 만능 해결책은 아니므로, 견고하고 고품질의 ST를 위해서는 강력한 **SFM** 과 **LLM** 을 결합한 **모듈형 계단식 아키텍처** 를 고려해야 합니다. 음성 모달리티가 **LLM** 에 통합되는 방식(아키텍처 수준 설계)이 모델의 **강건성** 에 큰 영향을 미치므로, 설계 시 이를 신중하게 고려해야 합니다. 또한, 일반적인 번역 품질 외에 **개체명 정확도** 나 **성별 편향** 등 특정 현상에 대한 **맞춤형 평가 지표** 를 활용하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.