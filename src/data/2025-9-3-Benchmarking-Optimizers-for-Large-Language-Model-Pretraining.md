---
title: "[논문리뷰] Benchmarking Optimizers for Large Language Model Pretraining"
excerpt: "mjaggi이 arXiv에 게시한 'Benchmarking Optimizers for Large Language Model Pretraining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Optimizers
  - Benchmarking
  - Hyperparameter Tuning
  - AdamW
  - AdEMAMix
  - MARS
  - Mixture of Experts (MoE)
  - Weight Decay

permalink: /ai/review/2025-9-3-Benchmarking-Optimizers-for-Large-Language-Model-Pretraining/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01440)

**저자:** Andrei Semenov, Matteo Pagliardini, Martin Jaggi



## 핵심 연구 목표
대규모 언어 모델(LLM) 사전 훈련을 위한 최신 옵티마이저들의 성능을 **표준화된 시나리오** 에서 종합적으로 평가하고 비교하는 것을 목표로 합니다. 기존의 파편화된 평가 프로토콜로 인해 옵티마이저 간 직접 비교가 어렵다는 문제점을 해결하고, 실무자와 연구자에게 실용적인 가이드라인을 제공하고자 합니다.

## 핵심 방법론
연구팀은 **모델 크기(124M~720M Llama-like Transformer 및 520M MoE), 배치 크기, 훈련 기간** 을 체계적으로 변화시키며 **11개** 의 다양한 옵티마이저를 벤치마킹했습니다. 각 옵티마이저의 **학습률, 가중치 감소, 모멘텀, 그래디언트 클리핑, 웜업 스텝, 초기화 방식, 학습률 스케줄러(cosine, linear, WSD)** 등 핵심 하이퍼파라미터를 **정밀하게 튜닝** 하여 최적의 성능을 도출했습니다. 이 모든 실험은 **FineWeb 100B 토큰** 데이터셋에서 총 **30,000 GPU 시간** 이상을 소모하는 대규모로 진행되었습니다.

## 주요 결과
**AdEMAMix** 는 모든 벤치마킹 시나리오에서 **최고 수준의 성능** 을 일관되게 달성했으며, **MARS** 는 대규모 모델 및 배치 크기 환경에서 **AdEMAMix** 와 함께 지배적인 성능을 나타냈습니다. **D-Muon** 은 가중치 감소 적용을 통해 기본 **Muon** 대비 **상당한 성능 향상** 을 보였고 일관된 안정성을 유지했습니다. 학습률 감소를 **최대 학습률의 10% 미만** 으로 설정하는 것이 성능을 크게 향상시키며, **z-loss 정규화 제거** 및 **0.1 가중치 감소** 적용 시 성능이 개선되는 것으로 확인되었습니다. **SOAP** 는 모델 크기가 증가할수록 **벽시계 시간이 눈에 띄게 느려지는** 단점을 보였습니다.

## AI 실무자를 위한 시사점
LLM 사전 훈련 시 **AdEMAMix, MARS, D-Muon** 이 **AdamW** 보다 우수한 성능을 제공하는 강력한 대안이므로 적극적으로 고려해야 합니다. 특히, 대규모 모델 및 배치 환경에서는 **AdEMAMix** 와 **MARS** 가 유리합니다. 하이퍼파라미터 튜닝 시 **0.1 가중치 감소** 를 일관되게 적용하고, 학습률은 **최대 학습률의 10% 미만** 으로 충분히 감소시키며, **웜업 기간** 은 옵티마이저 특성에 맞춰 조정하는 것이 중요합니다. 기존 코드베이스의 기본 설정에 맹목적으로 따르기보다는, **z-loss 제거** 및 **가중치 감소 조정** 을 통해 성능을 추가로 최적화할 여지가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.