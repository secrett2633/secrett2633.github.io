---
title: "[논문리뷰] FutureOmni: Evaluating Future Forecasting from Omni-Modal Context for Multimodal LLMs"
excerpt: "이 [arXiv]에 게시한 'FutureOmni: Evaluating Future Forecasting from Omni-Modal Context for Multimodal LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Future Forecasting
  - Audio-Visual Reasoning
  - Benchmark
  - Instruction Tuning
  - Omni-Modal
  - Causal Reasoning

permalink: /ai/review/2026-01-21-FutureOmni-Evaluating-Future-Forecasting-from-Omni-Modal-Context-for-Multimodal-LLMs/

toc: true
toc_sticky: true

date: 2026-01-21 00:00:00+0900+0900
last_modified_at: 2026-01-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.13836)

**저자:** Qian Chen, Jinlan Fu, Changsong Li, See-Kiong Ng, Xipeng Qiu



## 핵심 연구 목표
기존 벤치마크들이 주로 회고적 이해에 초점을 맞추는 한계를 해결하기 위해, 오디오-비주얼 환경에서 멀티모달 대규모 언어 모델(MLLM)의 **미래 사건 예측 능력** 을 평가하는 것을 목표로 합니다. 특히, 모델이 **교차 모달 인과 및 시간 추론** 을 수행하고 내부 지식을 활용하여 미래 이벤트를 예측하는 능력을 평가하고자 합니다.

## 핵심 방법론
본 연구는 **FutureOmni** 라는 최초의 옴니-모달 미래 예측 벤치마크를 소개합니다. 이 벤치마크는 **LLM-보조 및 인간 개입 파이프라인** 을 통해 구축되었으며, **919개의 비디오와 1,034개의 객관식 QA 쌍** 을 포함합니다. 또한, MLLM의 미래 예측 능력을 강화하기 위해 **7K 샘플의 명령어 튜닝 데이터셋** 을 큐레이션하고 **Omni-Modal Future Forecasting (OFF) 훈련 전략** 을 제안합니다.

## 주요 결과
**13개의 옴니-모달 모델** 과 **7개의 비디오 전용 모델** 에 대한 평가 결과, 현재 시스템들은 특히 음성 위주의 시나리오에서 오디오-비주얼 미래 예측에 어려움을 겪고 있으며, **Gemini 3 Flash** 가 **64.8%** 의 최고 정확도를 달성했습니다. **OFF 훈련 전략** 은 **FutureOmni** 에서 **video-SALMONN 2** 의 성능을 **+3.87%** 향상시켰고, **Qwen2.5-Omni** 가 **WorldSense (+2.55%)** 및 **DailyOmni (+3.34%)** 와 같은 비디오 전용 벤치마크에서도 성능 개선을 보였습니다.

## AI 실무자를 위한 시사점
**FutureOmni 벤치마크** 는 MLLM이 실제 환경에서 미래를 예측하는 능력의 중요성을 강조하며, 새로운 연구 방향을 제시합니다. **OFF 훈련 전략** 은 MLLM의 미래 예측 및 일반화 능력을 향상시키는 효과적인 방법을 제공하며, 특히 **복잡한 음향 신호(대화) 해석 능력** 을 크게 개선합니다. **오디오-비주얼 정보의 시너지적 통합** 이 단일 모달리티에 의존하는 것보다 훨씬 중요함을 입증하여, 개발자들이 MLLM 설계 시 이를 적극 고려해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.