---
title: "[논문리뷰] Understand Before You Generate: Self-Guided Training for Autoregressive
  Image Generation"
excerpt: "Xihui Liu이 [arXiv]에 게시한 'Understand Before You Generate: Self-Guided Training for Autoregressive
  Image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Image Generation
  - Self-Supervised Learning
  - Visual Understanding
  - Masked Image Modeling
  - Contrastive Learning
  - Next-Token Prediction
  - LlamaGen

permalink: /ai/review/2025-9-19-Understand_Before_You_Generate_Self-Guided_Training_for_Autoregressive_Image_Generation/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15185)

**저자:** Xiaoyu Yue, Xihui Liu, Zidong Wang, Wanli Ouyang, Yuqing Wang, Lei Bai, Wenlong Zhang, Luping Zhou



## 핵심 연구 목표
본 논문은 자연어 처리에서 성공적인 자기회귀(Autoregressive, AR) 모델이 이미지 생성 시 고수준 시각적 의미 학습에 어려움을 겪는 문제를 해결하고자 합니다. 특히, AR 모델의 지역적/조건적 의존성, 단계 간 의미 일관성 부족, 공간 불변성 결여라는 세 가지 핵심 한계를 극복하여 시각적 이해 능력을 향상시키고, 궁극적으로 이미지 생성 품질을 개선하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Self-guided Training for AutoRegressive models (ST-AR)** 프레임워크는 자체 지도 학습 기법을 통합합니다. 지역적 의존성 문제를 해결하기 위해 트랜스포머 블록의 어텐션 맵에 직접 **마스킹된 이미지 모델링 (MIM)**을 적용합니다. 또한, 의미 일관성 부족과 공간 불변성 결여를 해결하기 위해 **inter-step contrastive loss (Lstep)** 및 **inter-view contrastive loss (Lview)**를 도입하여 서로 다른 시간 단계와 증강된 뷰 간의 특징 벡터 일관성을 확보합니다. 최종 손실 함수는 기존 **토큰 예측 손실 (LAR)**에 이 세 가지 손실을 결합하며, **EMA (Exponential Moving Average)**로 업데이트되는 teacher network가 student network를 가이드합니다.

## 주요 결과
**ST-AR**은 **LlamaGen-B** 모델의 선형 프로빙 **Top-1 정확도를 21.00%에서 55.23%**로 크게 향상시켜 이미지 이해 능력의 현저한 개선을 입증했습니다. 이미지 생성 품질 측면에서는 **LlamaGen-XL** 모델을 50 에폭 훈련 시켰을 때 **FID 점수가 약 49% (19.42에서 9.81)** 개선되었으며, 300 에폭 훈련 시에는 **FID 6.20**을 달성하여 매개변수가 4배 많은 **LlamaGen-3B** 모델과 동등한 성능을 보였습니다. 어텐션 맵 분석에서도 유효 수용 영역이 확장되고 의미론적으로 관련된 영역에 집중하는 것을 확인했습니다.

## AI 실무자를 위한 시사점
**ST-AR**은 AR 이미지 생성 모델의 시각적 이해 능력을 자체 지도 학습만으로 향상시켜 **고품질 이미지 생성**을 가능하게 하는 실용적인 방법을 제시합니다. 사전 훈련된 표현 모델에 대한 의존도를 줄여 **도메인 특화 데이터셋**에 유연하게 적용될 수 있는 잠재력이 있습니다. **MIM과 대조 학습**을 AR 프레임워크에 통합하는 접근 방식은 텍스트 등 다른 양식의 AR 모델에도 확장될 수 있어, 통합된 생성 모델 연구에 기여할 수 있습니다. 다만, 훈련 비용이 증가할 수 있으므로 실제 배포 시 **자원 효율성**에 대한 고려가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.