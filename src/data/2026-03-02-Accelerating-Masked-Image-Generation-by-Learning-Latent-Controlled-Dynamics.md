---
title: "[논문리뷰] Accelerating Masked Image Generation by Learning Latent Controlled Dynamics"
excerpt: "Xiaohui Li이 arXiv에 게시한 'Accelerating Masked Image Generation by Learning Latent Controlled Dynamics' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Masked Image Generation
  - Model Acceleration
  - Latent Dynamics Learning
  - Feature Prediction
  - Transformer Efficiency
  - Image Synthesis

permalink: /ai/review/2026-03-02-Accelerating-Masked-Image-Generation-by-Learning-Latent-Controlled-Dynamics/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23996)

**저자:** Kaiwen Zhu, Quansheng Zeng, Yuandong Pu, Shuo Cao, Xiaohui Li, Yi Xin, Qi Qin, Jiayang Li, Yu Qiao, Jinjin Gu, Yihao Liu



## 핵심 연구 목표
마스크 이미지 생성 모델(MIGMs)의 느린 생성 속도, 특히 양방향 어텐션의 다단계 계산으로 인한 비효율성 문제를 해결하는 것을 목표로 합니다. 기존의 캐싱 기반 가속화 방법론이 가진 낮은 표현력과 샘플링 정보 미고려 문제를 극복하고, 모델 품질 저하를 최소화하면서 MIGMs의 가속화를 달성하고자 합니다.

## 핵심 방법론
이전 단계의 연속 특징(`f_ti`)과 샘플링된 토큰(`x_ti`)을 입력으로 받아 다음 단계 특징의 평균 속도 필드(`f_{ti+1} - f_ti`)를 예측하는 경량 **단축 모델(shortcut model)** `So`를 제안합니다. `So`는 **크로스 어텐션** 및 **셀프 어텐션** 레이어를 포함하며, 연산 효율을 위해 **bottleneck ratio** 를 적용합니다. 훈련 시에는 **MSE 손실** 을 사용하여 **기존 MIGM의 특징** 을 타겟으로 학습하며, 추론 시에는 **사전 정의된 예산(`B`)에 따라 기존 모델과 단축 모델을 번갈아 사용** 하여 오류 축적을 방지합니다.

## 주요 결과
제안된 방법인 **MIGM-Shortcut** 은 최신 모델인 **Lumina-DiMOO** 에 적용했을 때 텍스트-이미지 생성에서 **4배 이상의 가속화** 를 달성하면서도 품질을 유지했습니다. 특히, **Lumina-DiMOO (N=64, B=11)** 설정에서 **4.91배 가속** 과 **ImageReward 0.87** , **CLIPScore 34.39** , **UniPercept-IQA 70.80** 을 기록하며, **바닐라 모델(64단계)** 과 유사하거나 더 나은 성능을 보였습니다. **MaskGIT** 에 적용 시에는 **5.79배 가속** 과 **FID 6.84** 를 달성하며 **바닐라 모델(15단계, FID 7.60)** 보다 더 나은 품질을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 MIGM 기반 이미지 생성의 **효율성을 획기적으로 향상** 시킬 수 있는 실용적인 솔루션을 제공합니다. 경량의 단축 모델이 **잠재 다이내믹스를 학습** 하여 샘플링 정보를 효과적으로 통합함으로써, 기존의 무작정 캐싱 방식보다 더 견고하고 정확한 가속이 가능합니다. 이는 대규모 이미지 생성 모델의 **추론 비용을 절감** 하고 **생성 시간을 단축** 하여, MIGM을 활용한 다양한 실시간 애플리케이션 및 서비스의 개발 및 배포를 용이하게 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.