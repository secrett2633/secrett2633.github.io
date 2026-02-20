---
title: "[논문리뷰] MPJudge: Towards Perceptual Assessment of Music-Induced Paintings"
excerpt: "arXiv에 게시된 'MPJudge: Towards Perceptual Assessment of Music-Induced Paintings' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Music-Painting Cross-Modal
  - Perceptual Assessment
  - Modality-Adaptive Normalization
  - Direct Preference Optimization
  - Cross-Modal Fusion
  - Dataset Annotation
  - Affective Computing

permalink: /ai/review/2025-11-11-MPJudge-Towards-Perceptual-Assessment-of-Music-Induced-Paintings/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07137)

**저자:** Shiqi Jiang, Tianyi Liang, Huayuan Ye, Changbo Wang, Chenhui Li



## 핵심 연구 목표
음악에 의해 영감을 받은 그림의 지각적 일관성을 평가하는 어려운 과제를 해결하는 것을 목표로 합니다. 기존 감정 기반 접근 방식의 한계(불정확성 및 감정 외 다른 지각적 단서 간과)를 극복하고, 음악과 시각 예술 간의 지각적 일관성을 직접적으로 모델링하는 새로운 프레임워크를 제안하고자 합니다.

## 핵심 방법론
먼저, 50,000쌍의 음악-그림 쌍에 대한 전문가의 지각적 일관성 점수 및 모호한 경우를 위한 **10,428쌍의 선호도 주석** 이 포함된 대규모 데이터셋 **MPD** 를 구축했습니다. 제안된 **MPJudge** 모델은 음악 특징을 **Modality-Adaptive Normalization (MAN)** 기반 융합 메커니즘을 통해 시각 인코더에 통합합니다. 훈련은 스칼라 점수에 대한 **평균 제곱 오차(MSE)** 회귀 손실과 모호한 선호도 데이터를 효과적으로 학습하기 위한 **Direct Preference Optimization (DPO)** 손실을 결합하여 수행됩니다.

## 주요 결과
**MPJudge** 는 제안된 MPD 데이터셋에서 **SRCC 0.86** 및 **MAE 0.04** 를 달성하여 기존의 최첨단 접근 방식들을 일관되게 능가했습니다. 사용자 연구와 시각화 분석을 통해 모델이 인간의 지각적 판단과 잘 일치하며, 그림에서 음악 관련 영역을 더 정확하고 해석 가능하게 식별함을 입증했습니다. **DPO 손실** 과 **MAN 모듈** 의 통합이 모델 성능 향상에 결정적인 역할을 했습니다.

## AI 실무자를 위한 시사점
본 연구는 음악-그림 교차 모달 지각적 평가라는 새로운 영역을 개척하며, 예술 분야의 AI 응용 가능성을 확장합니다. **Modality-Adaptive Normalization (MAN)** 메커니즘과 **Direct Preference Optimization (DPO) 손실** 은 주관적이거나 모호한 주석이 있는 다른 교차 모달 또는 평가 작업에 유용하게 적용될 수 있는 강력한 방법론을 제공합니다. 또한, 구축된 **MPD 데이터셋** 은 풍부한 인간 주석을 기반으로 하여 이 분야의 미래 연구를 위한 귀중한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.