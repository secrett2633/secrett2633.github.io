---
title: "[논문리뷰] Factorized Learning for Temporally Grounded Video-Language Models"
excerpt: "이 [arXiv]에 게시한 'Factorized Learning for Temporally Grounded Video-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-Language Models
  - Temporal Grounding
  - Factorized Learning
  - Preference Optimization
  - Evidence Referencing
  - Video Understanding
  - Dense Captioning

permalink: /ai/review/2026-01-01-Factorized-Learning-for-Temporally-Grounded-Video-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24097)

**저자:** Wenzheng Zeng, Difei Gao, Mike Zheng Shou, Hwee Tou Ng



## 핵심 연구 목표
기존 비디오-언어 모델(VLLMs)이 이벤트 수준의 정확한 **temporal grounding** 과 텍스트 응답 생성에서 겪는 한계를 해결하는 것을 목표로 합니다. 특히, temporal grounding과 텍스트 응답이 종종 결합된 방식으로 처리되어 학습 효율이 저하되는 문제를 극복하고, 이 두 가지 핵심 요소를 **팩터라이즈드 학습 관점** 에서 분리하되 내재된 의존성을 강화하고자 합니다.

## 핵심 방법론
본 논문은 **D2VLM** 이라는 새로운 프레임워크를 제안하며, 이는 생성 목표를 "증거 참조를 통한 접지 후 답변" 패러다임으로 분해합니다. **이벤트-레벨 시각 의미론 캡처** 를 강조하기 위해 **증거 토큰(` <evi> `)** 을 도입하고, 타임스탬프 표현을 넘어선 시각적 증거를 명시적으로 포착합니다. 또한, **Factorized Preference Optimization (FPO) 알고리즘** 을 개발하여 **확률적 temporal grounding 모델링** 을 최적화 목표에 통합하고, 팩터라이즈드 섭동을 적용한 **합성 데이터셋** 을 구축하여 FPO 학습을 지원합니다. 모델은 **Phi-3-Mini-3.8B** 를 기본 LLM으로 사용하며, **LoRA** 를 통해 미세 조정됩니다.

## 주요 결과
제안된 **D2VLM-3.8B** 모델은 **E.T. Bench Grounding** 에서 **42.3% AvgF1** 을 달성하여 이전 SOTA 모델인 **E.T.Chat-3.8B(33.5% AvgF1)** 대비 **7.0%** 향상된 성능을 보였습니다. **E.T. Bench Dense Captioning** 에서는 **37.5% AvgF1** 및 **21.8% AvgSim** 을 기록하여 **E.T.Chat-3.8B** 를 능가했습니다. **FPO 알고리즘** 은 temporal grounding 및 캡셔닝 관련 작업 모두에서 성능을 일관되게 향상시켰으며, 특히 temporal grounding에서 **39.5% AvgF1에서 42.3% AvgF1로** 의 상당한 개선을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 LLM의 **temporal grounding 정확도** 를 높이는 데 있어 **팩터라이즈드 학습** 과 **명시적인 이벤트-레벨 시각 의미론 캡처** 의 중요성을 강조합니다. **FPO 알고리즘** 은 제한된 데이터 환경에서 **temporal grounding을 포함한 복잡한 선호도 학습** 을 가능하게 하여, 실무자들이 비디오 이해 시스템을 개발할 때 모델의 학습 목표를 보다 세분화하고 제어하는 데 실질적인 도움을 줄 수 있습니다. 또한, **3.8B** 의 비교적 작은 모델 크기로도 SOTA 성능을 달성하여 **자원 효율적인 모델** 개발의 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.