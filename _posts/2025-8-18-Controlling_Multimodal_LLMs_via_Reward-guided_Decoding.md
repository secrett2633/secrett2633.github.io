---
title: "[논문리뷰] Controlling Multimodal LLMs via Reward-guided Decoding"
excerpt: "Michal Drozdzal이 [arXiv]에 게시한 'Controlling Multimodal LLMs via Reward-guided Decoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Reward Models
  - Guided Decoding
  - Visual Grounding
  - Hallucination Mitigation
  - Object Precision
  - Object Recall
  - Inference-time Control

permalink: /ai/review/2025-8-18-Controlling_Multimodal_LLMs_via_Reward-guided_Decoding/

toc: true
toc_sticky: true

date: 2025-08-18 13:14:38+0900
last_modified_at: 2025-08-18 13:14:38+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11616)

**저자:** Oscar Mañas, Pierluca D'Oro, Koustuv Sinha, Adriana Romero-Soriano, Michal Drozdzal, Aishwarya Agrawal



## 핵심 연구 목표
본 논문은 MLLM(Multimodal Large Language Models)이 다양한 사용자 요구에 맞춰 동작을 조절할 수 있도록, 추론 과정에서 **세밀한 제어**를 가능하게 하는 것을 목표로 합니다. 특히, MLLM의 **시각적 접지(visual grounding) 품질**을 향상시키면서, 객체 환각을 줄이고 객체 재현율을 높이며, 컴퓨팅 자원과 시각적 접지 품질 사이의 상충 관계를 조절할 수 있는 방법을 제시합니다.

## 핵심 방법론
제안된 **MRGD(Multimodal Reward-Guided Decoding)** 방법은 MLLM의 디코딩을 안내하기 위해 두 가지 보상 모델을 구축합니다. 첫 번째 모델은 **객체 환각(object hallucination) 보상 모델(r_hal)**로, 선호도 데이터셋으로 학습된 **PaliGemma** 백본을 사용합니다. 두 번째는 **재현율(recall) 보상 모델(r_rec)**로, **OWLv2 객체 감지기**와 **Sentence-BERT** 워드 임베딩을 조합하여 구축합니다. 이 두 보상 모델은 **가중치 w**로 선형 조합되어 최종 점수를 계산하며, 디코딩 과정에서 후보 답변들의 **탐색 폭(k)**과 **평가 주기(T)**를 조절하여 사용자가 객체 정밀도와 재현율 간의 균형 및 컴퓨팅 비용을 동적으로 제어할 수 있도록 합니다.

## 주요 결과
**LLaVA-1.5 7B 모델**을 사용한 실험에서 **MRGD**는 **COCO 벤치마크**에서 객체 환각률(**CHAIR_i**)을 그리디 디코딩 대비 **약 70% 감소**시키는 (**15.05%에서 4.53%**) 상당한 개선을 보였습니다. **Llama-3.2-Vision** 및 **SmolVLM-2**와 같은 최신 MLLM에서도 일관된 성능 향상을 입증했으며, 기존 환각 완화 방법론들을 **지속적으로 능가**하는 결과를 보였습니다. 또한, **탐색 폭(k)**을 늘리면 시각적 접지 품질이 향상되고, **평가 주기(T)**를 줄이면 샘플 효율성이 개선됨을 확인했습니다.

## AI 실무자를 위한 시사점
**MRGD**는 MLLM의 **실시간 추론 제어**를 가능하게 하여, 개발자들이 특정 애플리케이션 요구사항에 맞춰 모델 출력을 최적화할 수 있는 강력한 도구를 제공합니다. 특히 **객체 환각 최소화** 또는 **상세한 정보 제공(재현율 극대화)** 중 하나를 선택하거나, 둘 사이의 균형을 유연하게 조절해야 하는 시각 정보 처리 시스템에 유용합니다. **기존 MLLM에 재훈련 없이 적용 가능**하여, 이미 배포된 시스템에도 쉽게 통합하여 성능을 개선할 수 있는 실용적인 이점을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.