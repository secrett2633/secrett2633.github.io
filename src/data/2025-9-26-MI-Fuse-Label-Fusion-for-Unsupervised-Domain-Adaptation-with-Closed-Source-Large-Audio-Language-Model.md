---
title: "[논문리뷰] MI-Fuse: Label Fusion for Unsupervised Domain Adaptation with
  Closed-Source Large-Audio Language Model"
excerpt: "Hung-yi Lee이 arXiv에 게시한 'MI-Fuse: Label Fusion for Unsupervised Domain Adaptation with
  Closed-Source Large-Audio Language Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech Emotion Recognition
  - Source-Free Unsupervised Domain Adaptation
  - Large Audio-Language Models
  - Label Fusion
  - Mutual Information
  - API-Only Models
  - Domain Mismatch

permalink: /ai/review/2025-9-26-MI-Fuse-Label-Fusion-for-Unsupervised-Domain-Adaptation-with-Closed-Source-Large-Audio-Language-Model/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20706)

**저자:** Hsiao-Ying Huang*, Yi-Cheng Lin*, Hung-yi Lee



## 핵심 연구 목표
논문은 소스 도메인 데이터가 없고, 강력한 **LALM(Large Audio-Language Model)** 이 **API** 를 통해서만 접근 가능한 현실적인 **SFUDA(Source-Free Unsupervised Domain Adaptation)** 시나리오를 해결하는 것을 목표로 합니다. 구체적으로, 레이블 없는 타겟 도메인 오디오와 **API 전용 LALM** 만으로 **SER(Speech Emotion Recognition)** 을 위한 학생 모델을 훈련하여 **LALM** 자체의 성능을 능가하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **MI-Fuse** 는 **API 전용 LALM** 과 **소스 도메인 훈련 SER 분류기** 를 보조 교사로 활용하는 노이즈 제거 레이블 융합 프레임워크입니다. 각 교사로부터 **다중 확률적 예측** 을 생성하고, **상호 정보(Mutual Information)** 기반 불확실성을 사용하여 이들 평균 분포에 가중치를 부여해 통합합니다. 훈련 안정화를 위해 학생 모델의 **EMA(Exponential Moving Average)** 를 통해 분류기 교사를 업데이트하고, **다양성 손실(Diversity Loss)** 을 도입하여 클래스 붕괴를 방지합니다.

## 주요 결과
**세 가지 공개 감정 데이터셋** 과 **여섯 가지 교차 도메인 전이** 실험에서 **MI-Fuse** 는 모든 베이스라인을 일관되게 능가했습니다. 평균적으로 **58.38%의 비가중 정확도(unweighted accuracy)** 를 달성하여 가장 강력한 베이스라인인 **LALM SFUDA** 보다 **3.9%** 더 높은 성능을 보였습니다. 특히 **IMP → IEM** 전이 설정에서 **59.09%** 의 정확도를 기록하며 **SHOT(50.13%)** 및 **NRC(52.09%)** 를 크게 앞섰습니다.

## AI 실무자를 위한 시사점
**MI-Fuse** 는 소스 데이터 공유 없이도 **closed-source LALM** 과 도메인 특화 모델의 강점을 결합하여 **SER 시스템** 의 도메인 적응 성능을 크게 향상시킬 수 있음을 보여줍니다. 이는 **API 전용 LALM** 을 활용하는 현실적인 배포 환경에서 **감정 인식 시스템** 의 성능 저하 문제를 효과적으로 해결하며, 노이즈가 많은 의사 레이블 문제를 완화하는 **불확실성 인식 레이블 융합 전략** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.