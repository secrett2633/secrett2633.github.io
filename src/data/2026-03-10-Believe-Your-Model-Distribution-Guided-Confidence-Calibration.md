---
title: "[논문리뷰] Believe Your Model: Distribution-Guided Confidence Calibration"
excerpt: "Mofei Song이 arXiv에 게시한 'Believe Your Model: Distribution-Guided Confidence Calibration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Confidence Calibration
  - Test-Time Scaling
  - Large Reasoning Models (LRMs)
  - Gaussian Mixture Models (GMM)
  - Hierarchical Voting
  - Self-Reflection
  - Distributional Priors

permalink: /ai/review/2026-03-10-Believe-Your-Model-Distribution-Guided-Confidence-Calibration/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03872)

**저자:** Xizhong Yang, Haotian Zhang, Huiming Wang, Mofei Song



## 핵심 연구 목표
대규모 추론 모델(LRMs)이 테스트 시 스케일링 기법을 통해 다수의 후보 응답을 생성할 때, 내부 모델의 신뢰도 점수와 분포 정보를 충분히 활용하지 못하여 오답을 확신하는 문제를 해결하고자 합니다. 신뢰도 분포의 사전 정보를 효과적으로 통합하여 답변 선택의 신뢰성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **DistriVoting** 과 **SelfStepConf** 를 제안합니다. **DistriVoting** 은 혼합된 신뢰도 분포를 **Gaussian Mixture Models (GMM)** 을 사용하여 긍정적 및 부정적 요소로 분해하고, **Reject Filter** 를 통해 분포 간 중첩을 완화합니다. 이어서 **Hierarchical Voting** 을 사용하여 최종 답변을 선택합니다. **SelfStepConf** 는 추론 과정 중 단계별 신뢰도를 실시간으로 모니터링하여 신뢰도가 크게 감소할 때 **Self-Reflection** 을 트리거하여 추론 과정을 동적으로 조정함으로써 분포 분리도를 높입니다.

## 주요 결과
제안된 방법은 16개 모델과 5개 벤치마크에 걸쳐 최신 접근법을 **상당히 능가** 하는 성능을 보였습니다. DeepSeek-R1-8B 모델의 경우, **DistriVoting** 에 **SelfStepConf** 를 결합한 **DIS-GMM***이 평균 정확도 **77.84%** 를 달성하여 기존 **BoN (75.30%)** 및 **WSC-GMM (76.64%)** 대비 유의미한 향상을 입증했습니다. 또한, **SelfStepConf** 는 신뢰도 분포의 분리도(Δ 값)를 **3.182에서 5.043** 으로 증가시켜 성능 개선에 기여했습니다.

## AI 실무자를 위한 시사점
외부 모델 없이 **모델 내부 정보만을 활용** 하여 LRM의 추론 신뢰성을 높이는 실용적인 방법을 제공합니다. 특히 **GMM** 기반의 분포 분석과 동적 **Self-Reflection** 메커니즘은 AI 시스템의 **의사결정 투명성과 신뢰성** 을 강화하는 데 활용될 수 있습니다. 고신뢰 추론이 필요한 금융, 의료, 자율주행 등의 분야에서 오답 확신 문제를 줄이는 데 중요한 기여를 할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.