---
title: "[논문리뷰] Scaling Open-Ended Reasoning to Predict the Future"
excerpt: "이 [arXiv]에 게시한 'Scaling Open-Ended Reasoning to Predict the Future' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Models
  - Forecasting
  - Open-Ended Reasoning
  - Reinforcement Learning (RL)
  - Data Generation
  - Calibration
  - Retrieval-Augmented Generation (RAG)
  - Future Prediction

permalink: /ai/review/2026-01-01-Scaling-Open-Ended-Reasoning-to-Predict-the-Future/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.25070)

**저자:** Nikhil Chandak, Shashwat Goel, Ameya Prabhu, Moritz Hardt, Jonas Geiping



## 핵심 연구 목표
본 연구는 불확실한 미래에 대한 개방형 예측 질문에 대해 언어 모델(LLM)이 정확하고 신뢰할 수 있는 예측을 할 수 있도록 훈련하는 것을 목표로 합니다. 기존 예측 시장 데이터의 한계점(이진 질문, 수동 생성, 편향된 분포)을 극복하고, 미래 정보 유출 없이 확장 가능한 훈련 데이터를 생성하는 방법론을 제시하고자 합니다.

## 핵심 방법론
연구진은 `CommonCrawl News` 코퍼스에서 약 50,000개의 개방형 예측 질문으로 구성된 **OpenForesight** 데이터셋을 자동 생성했습니다. 데이터 생성에는 `DeepSeek v3`를, 질문 필터링 및 미래 정보 유출 방지에는 `Llama-4-Maverick`을 사용했습니다. 모델 훈련은 `Qwen3` 8B 모델에 `Group Relative Policy Optimization (GRPO)`을 활용한 **강화 학습(RL)** 을 적용했으며, 보상 함수로는 **정확도와 Brier 스코어** 를 결합했습니다. 또한, 예측 시스템에는 `Qwen3-8B 임베딩 모델`을 통한 **5개의 관련 뉴스 청크 검색(Retrieval)** 이 통합되었습니다.

## 주요 결과
훈련된 8B 전문 모델인 **OpenForecaster8B** 는 held-out 테스트 세트에서 `GPT-OSS-120B`와 같은 더 큰 독점 모델들과 비교하여 경쟁력 있는 정확도와 보정 성능을 달성했습니다. 본 연구의 훈련 방법은 예측의 정확도, 보정, 일관성을 크게 향상시켰으며, 예측 훈련을 통한 **보정(Calibration) 개선** 은 `SimpleQA`, `GPQA-Diamond`, `MMLU-Pro` 등 여러 out-of-distribution 벤치마크에서도 일반화됨을 확인했습니다. 또한, 검색(Retrieval) 사용 시 모델의 정확도가 **9~18% 증가** 했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 인간의 의사결정을 지원하기 위해 **미래 사건을 예측하는 강력한 도구** 가 될 수 있음을 보여줍니다. **자동화된 대규모 개방형 예측 데이터 생성 파이프라인** 과 **강화 학습을 위한 보정된 보상 함수** 는 신뢰성 있는 AI 예측 시스템 구축에 필수적인 요소입니다. 또한, **Retrieval-Augmented Generation (RAG)** 기법이 예측 성능에 중요한 역할을 함을 입증하여, LLM 기반 예측 시스템 설계에 실용적인 가이드라인을 제공합니다. 공개된 모델, 코드, 데이터는 관련 AI 연구 및 개발의 촉진에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.