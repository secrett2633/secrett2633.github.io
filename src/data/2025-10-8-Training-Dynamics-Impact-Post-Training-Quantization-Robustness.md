---
title: "[논문리뷰] Training Dynamics Impact Post-Training Quantization Robustness"
excerpt: "Jonas Geiping이 arXiv에 게시한 'Training Dynamics Impact Post-Training Quantization Robustness' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Post-Training Quantization
  - Quantization Robustness
  - Training Dynamics
  - Learning Rate Schedules
  - Weight Averaging
  - Large Language Models
  - LLMs
  - Hyperparameter Tuning

permalink: /ai/review/2025-10-8-Training-Dynamics-Impact-Post-Training-Quantization-Robustness/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06213)

**저자:** Albert Catalan-Tatjer, Niccolò Ajroldi, Jonas Geiping



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 효율적인 배포를 위해 널리 사용되는 **Post-Training Quantization (PTQ)** 의 견고성이 훈련 과정 및 동적 특성에 의해 어떻게 영향을 받는지 규명하는 것을 목표로 합니다. 특히, 훈련 데이터셋 규모 증가가 양자화 성능을 필연적으로 저해한다는 기존 가설에 도전하며, 훈련 하이퍼파라미터의 역할을 심층적으로 분석합니다.

## 핵심 방법론
연구팀은 **SmolLM3, OLMo2, Apertus** 등 **최대 320억 개 파라미터** 와 **15조 개 토큰** 으로 훈련된 **여섯 가지 오픈소스 LLM** 의 훈련 궤적 전반에 걸쳐 양자화 성능 저하를 체계적으로 분석했습니다. **GPTQ** 를 주로 사용한 **3비트 및 4비트 양자화** 를 수행했으며, **160M-파라미터 트랜스포머 모델** 을 **최대 1000억 토큰** 까지 자체 훈련하여 **학습률 스케줄(Warmup-Stable-Decay, Cosine Decay), 학습률 크기, Weight Decay, Weight Averaging (LAWA)** 등 다양한 훈련 하이퍼파라미터의 영향을 통제된 환경에서 조사했습니다.

## 주요 결과
양자화 오류는 학습률이 감소하는 **Decay 단계에서 급격히 증가** 하며, 이는 훈련 데이터 규모와 무관하게 나타났습니다. **더 높은 학습률을 유지하는 것이 일관되게 낮은 양자화 오류** 로 이어지며, **Validation Loss** 또한 유사하거나 더 나은 성능을 보였습니다. 또한, **Weight Averaging (LAWA) 및 모델 수프(Model Souping)** 기법이 양자화 견고성을 **상당히 향상** 시켜 개별 모델 훈련보다 **더 낮은 PTQ 오류** 를 달성했습니다.

## AI 실무자를 위한 시사점
LLM의 **PTQ 견고성** 은 훈련 데이터셋의 크기보다 **학습률 스케줄, Weight Averaging** 과 같은 **훈련 동적 하이퍼파라미터** 에 더 크게 좌우됩니다. 따라서 AI/ML 엔지니어는 모델 훈련 시 **양자화 성능을 사전에 고려** 하여 학습률, Weight Decay 등 하이퍼파라미터를 신중하게 선택해야 합니다. **Weight Averaging** 은 양자화 성능 저하를 완화하고 **최종 모델의 양자화 견고성** 을 높일 수 있는 효과적인 전략으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.