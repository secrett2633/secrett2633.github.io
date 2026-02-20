---
title: "[논문리뷰] DiG-Flow: Discrepancy-Guided Flow Matching for Robust VLA Models"
excerpt: "arXiv에 게시된 'DiG-Flow: Discrepancy-Guided Flow Matching for Robust VLA Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - VLA Models
  - Flow Matching
  - Robotics
  - Robustness
  - Distribution Shift
  - Wasserstein Distance
  - Geometric Regularization
  - Representation Learning

permalink: /ai/review/2025-12-03-DiG-Flow-Discrepancy-Guided-Flow-Matching-for-Robust-VLA-Models/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01715)

**저자:** Wanpeng Zhang, Ye Wang, Hao Luo, Haoqi Yuan, Yicheng Feng, Sipeng Zheng, Qin Jin, Zongqing Lu



## 핵심 연구 목표
Vision-Language-Action (VLA) 모델이 분포 변화 및 복잡한 다단계 로봇 조작 태스크에서 성능 저하를 겪는 문제를 해결하고자 합니다. 이는 학습된 표현이 태스크 관련 의미를 견고하게 포착하지 못하기 때문이며, 본 논문은 **기하학적 정규화** 를 통해 VLA 모델의 견고성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**DiG-Flow** 프레임워크는 관측 및 액션 임베딩 간의 분포 불일치(discrepancy)를 측정하는 **불일치 함수(Wasserstein distance)** 를 사용합니다. 이 불일치는 **단조 감소 가중치 매핑** 을 통해 변조 가중치 `g`로 변환되며, 이 가중치는 **경량 잔차 연산자** 를 통해 관측 임베딩에 **잔차 업데이트** 를 적용하여 흐름 매칭 전에 표현 레벨에서 개입합니다. 이 방식은 기존 **π0.5** 및 **GR00T-N1** 과 같은 VLA 아키텍처에 쉽게 통합됩니다.

## 주요 결과
**LIBERO** 벤치마크에서 **π0.5-DiG** 는 평균 성공률을 **96.9%에서 98.3%로 향상** 시켰으며, 특히 복잡한 **LIBERO-Long** 태스크에서 **92.4%에서 96.4%로 4.0%p 상승** 했습니다. **RoboCasa** 의 저데이터 환경에서는 평균 성공률을 **41.4%에서 52.6%로 11.2%p 크게 향상** 시켰으며, 실제 로봇 실험과 다양한 교란 조건에서도 일관된 견고성 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**DiG-Flow** 는 기존 흐름 매칭 기반 VLA 모델에 **플러그 앤 플레이 방식** 으로 통합되어, 핵심 아키텍처 변경 없이 견고성을 크게 향상시킬 수 있는 실용적인 방법론을 제시합니다. 이는 특히 **데이터 부족 환경** 및 **복잡한 장기 로봇 태스크** 에서 효과적이며, 관측-액션 표현 간의 기하학적 정렬이 모델 성능과 견고성에 미치는 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.