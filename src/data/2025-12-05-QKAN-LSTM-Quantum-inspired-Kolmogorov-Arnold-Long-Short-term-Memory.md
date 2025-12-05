---
title: "[논문리뷰] QKAN-LSTM: Quantum-inspired Kolmogorov-Arnold Long Short-term Memory"
excerpt: "Nan-Yow Chen이 [arXiv]에 게시한 'QKAN-LSTM: Quantum-inspired Kolmogorov-Arnold Long Short-term Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Quantum Machine Learning
  - Kolmogorov-Arnold Networks
  - Long Short-Term Memory (LSTM)
  - Time Series Forecasting
  - Hybrid Quantum-Classical Learning
  - Quantum-inspired
  - Recurrent Neural Networks

permalink: /ai/review/2025-12-05-QKAN-LSTM-Quantum-inspired-Kolmogorov-Arnold-Long-Short-term-Memory/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05049)

**저자:** Yu-Chao Hsu, Jiun-Cheng Jiang, Chun-Hua Lin, Kuo-Chung Peng, Nan-Yow Chen, Samuel Yen-Chi Chen, En-Jui Kuo, Hsi-Sheng Goan



## 핵심 연구 목표
본 연구는 기존 **LSTM 모델** 의 높은 파라미터 중복성과 제한된 비선형 표현력 문제를 해결하고, 특히 도시 통신 예측과 같은 복잡한 시계열 모델링 태스크에서 성능을 향상시키는 것을 목표로 합니다. 양자 메커니즘을 활용하여 **LSTM의 주파수 적응성 및 스펙트럼 표현 능력** 을 강화하는 동시에, 훈련 가능한 파라미터 수를 대폭 줄여 **클래식 하드웨어** 에서 효율적으로 실행 가능한 아키텍처를 제안합니다.

## 핵심 방법론
본 논문은 **Quantum-inspired Kolmogorov-Arnold Long Short-Term Memory (QKAN-LSTM)** 모델을 제안하며, 이는 LSTM의 게이팅 구조 내에 **Data Re-Uploading Activation (DARUAN)** 모듈을 통합하여 기존 아핀 변환을 대체합니다. 각 DARUAN은 **단일 큐비트 데이터 재업로딩 회로** 를 사용하는 **양자 변이 활성화 함수(QVAF)** 역할을 하여, 다중 큐비트 얽힘 없이도 주파수 적응성과 풍부한 스펙트럼 표현을 가능하게 합니다. 또한, **Jiang-Huang-Chen-Goan Network (JHCG Net)** 을 통해 **인코더-디코더 구조** 로 **KAN** 을 일반화하고, 잠재 KAN을 QKAN으로 구현한 **Hybrid QKAN (HQKAN)** 을 통해 계층적 표현 학습을 실현합니다. 모델 훈련은 **평균 제곱 오차(MSE)** 를 최소화하는 방식으로 진행되며, 양자 파라미터는 **파라미터-시프트 규칙** 을 사용하여 최적화됩니다.

## 주요 결과
**QKAN-LSTM** 은 고전적인 LSTM에 비해 **훈련 가능한 파라미터 수를 79% 감소** 시키면서도 우수한 예측 정확도와 일반화 성능을 달성했습니다. **Damped SHM** 데이터셋에서 **QKAN-LSTM** 은 30 에포크 후 **1.02 x 10^-3** 의 테스트 손실과 **0.9771** 의 R2 점수를 기록하며 LSTM 베이스라인을 능가했습니다. **Bessel Function** 데이터셋에서는 **QKAN-LSTM** 이 **3.27 x 10^-4** 의 테스트 손실과 **0.9861** 의 R2 점수를, **HQKAN-LSTM** 이 **3.21 x 10^-4** 의 테스트 손실과 **0.9863** 의 R2 점수를 달성하며 LSTM 및 QLSTM보다 더 견고한 성능을 보였습니다. **Urban Telecommunication** 데이터셋에서 **QKAN-LSTM** 및 **HQKAN-LSTM** 은 LSTM 및 QLSTM에 비해 일관되게 낮은 MAE 및 MSE 값을 보였으며, 특히 **HQKAN-LSTM** 은 가장 낮은 MAE를 달성하며 **99.5%의 파라미터 감소** 를 이루었습니다.

## AI 실무자를 위한 시사점
**QKAN-LSTM** 은 기존 LSTM의 파라미터 효율성과 비선형 표현력 한계를 극복하는 효과적인 **양자-영감(quantum-inspired) 솔루션** 을 제공합니다. **단일 큐비트 DARUAN 레이어** 를 사용하여 복잡한 다중 큐비트 얽힘 없이도 높은 표현력을 달성하므로, 현재의 **NISQ(Noisy Intermediate-Scale Quantum) 하드웨어** 제약을 우회하여 클래식 하드웨어에서 실행 가능합니다. **통신 네트워크 예측** 과 같은 실제 시계열 데이터셋에서 뛰어난 성능과 파라미터 효율성을 보여, **자원 제약적인 엣지 컴퓨팅 환경** 이나 **저자원 양자 장치** 에 대한 잠재적 응용 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.