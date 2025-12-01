---
title: "[논문리뷰] World-in-World: World Models in a Closed-Loop World"
excerpt: "Arda Uzunoglu이 [arXiv]에 게시한 'World-in-World: World Models in a Closed-Loop World' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Models
  - Embodied AI
  - Closed-Loop Evaluation
  - Online Planning
  - Data Scaling
  - Controllability
  - Robotic Manipulation

permalink: /ai/review/2025-10-22-World-in-World-World-Models-in-a-Closed-Loop-World/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18135)

**저자:** Jiahan Zhang, Muqing Jiang, Nanru Dai, Taiming Lu, Arda Uzunoglu, Shunchi Zhang, Yana Wei, Jiahao Wang, Vishal M. Patel, Paul Pu Liang, Daniel Khashabi, Cheng Peng, Rama Chellappa, Tianmin Shu, Alan Yuille, Yilun Du, Jieneng Chen



## 핵심 연구 목표
본 논문은 기존 세계 모델(World Models, WM) 평가 프로토콜이 시각적 품질에만 치중하여 실제 환경에 대한 **embodied agent의 태스크 성공 여부** 를 제대로 측정하지 못하는 문제를 해결하고자 합니다. 궁극적으로, WM이 실제 에이전트-환경 상호작용을 반영하는 **폐쇄 루프(closed-loop) 환경** 에서 에이전트의 의사 결정에 실질적으로 기여하는지 평가하기 위한 **표준화된 벤치마크 World-in-World** 를 제시하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 WM을 폐쇄 루프 환경에 통합하기 위한 **통합된 온라인 계획 전략** 과 **표준화된 액션 API** 를 제안합니다. 이 플랫폼은 **Active Recognition** , **Image-Goal Navigation** , **Active Embodied Question Answering** , **Robotic Manipulation** 의 네 가지 태스크를 통해 다양한 WM을 평가하며, **태스크 성공률** 을 주요 지표로 사용합니다. 또한, 사전 학습된 비디오 생성기를 **액션-관측(action-observation) 데이터** 로 **후처리 학습(post-training)** 하는 방법론을 도입하여 WM의 적응성과 데이터 스케일링 효과를 분석합니다.

## 주요 결과
연구 결과, 세 가지 중요한 발견이 도출되었습니다: (1) **시각적 품질만으로는 태스크 성공을 보장하지 않으며, 제어 가능성(controllability)이 더 중요** 하다는 점이 밝혀졌습니다 (그림 5 참조). (2) **사전 학습된 비디오 생성기를 업그레이드하는 것보다 액션-관측 데이터로 후처리 학습하는 것이 더 효과적** 이며, 예를 들어 **Wan2.1† 모델의 AR 정확도가 60.25%에서 63.34%로 향상** 되었습니다. (3) **추론 시간(inference-time) 컴퓨팅 자원을 늘려 온라인 계획을 수행하면 폐쇄 루프 성능이 크게 향상** 됩니다(예: SVD†의 AR 성공률이 추론 횟수를 3회에서 11회로 늘렸을 때 **53.36%에서 60.98%로 증가** ).

## AI 실무자를 위한 시사점
AI 실무자들은 세계 모델 개발 및 평가 시 **시각적 사실성보다는 액션에 대한 제어 가능성과 신뢰성** 에 중점을 두어야 함을 시사합니다. 범용 비디오 모델을 실제 embodied 태스크에 적용할 때는 **적절한 도메인별 후처리 학습이 필수적** 이며 매우 효과적입니다. 또한, 실시간 의사 결정 시스템에서 **온라인 계획을 위한 추론 자원 할당** 이 성능에 직접적인 영향을 미치므로 효율적인 컴퓨팅 활용 전략이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.