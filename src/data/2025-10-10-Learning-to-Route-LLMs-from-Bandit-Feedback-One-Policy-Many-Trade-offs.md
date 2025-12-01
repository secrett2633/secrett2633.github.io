---
title: "[논문리뷰] Learning to Route LLMs from Bandit Feedback: One Policy, Many Trade-offs"
excerpt: "Franck Dernoncourt이 [arXiv]에 게시한 'Learning to Route LLMs from Bandit Feedback: One Policy, Many Trade-offs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Routing
  - Contextual Bandits
  - Bandit Feedback
  - Multi-objective Optimization
  - Preference-tuning
  - Policy Gradient
  - Cost-efficiency

permalink: /ai/review/2025-10-10-Learning-to-Route-LLMs-from-Bandit-Feedback-One-Policy-Many-Trade-offs/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07429)

**저자:** Wang Wei, Tiankai Yang, Hongjie Chen, Yue Zhao, Franck Dernoncourt, Ryan A. Rossi, Hoda Eldardiry



## 핵심 연구 목표
대규모 LLM 배포 환경에서 각 쿼리당 최적의 LLM을 효율적으로 선택하는 문제를 해결하는 것이 목표입니다. 기존 라우터들이 배포 환경과 다른 **전체 정보 오프라인 감독** 에 의존하여 학습하는 문제점을 극복하고, **부분 피드백** 환경에서 학습하면서도 사용자의 **성능-비용 선호도** 를 반영하여 **추론 시점에 라우팅 정책을 유연하게 조정** 할 수 있는 방법론을 제안합니다.

## 핵심 방법론
본 논문은 LLM 라우팅을 **다중 목표 문맥적 밴딧 문제** 로 공식화하며, **BaRP (Bandit-feedback Routing with Preferences)** 프레임워크를 제안합니다. **신경망 정책 `πθ(a|x, w)`** 는 프롬프트 인코더, 선호도 인코더, 의사결정 헤드로 구성되어 입력 프롬프트 `x`와 사용자의 선호도 벡터 `w`를 바탕으로 `K`개 LLM의 확률 분포를 출력합니다. 학습은 **REINFORCE 정책 기울기 알고리즘** 과 **엔트로피 정규화** , **캘리브레이션된 비용 스케일링** 을 활용하여 **부분 피드백** 환경에서 진행됩니다.

## 주요 결과
**BaRP** 는 인-분포 태스크에서 **RouterDC** 및 **GraphRouter** 와 같은 강력한 오프라인 라우터 대비 각각 **15.53%** 및 **12.44%** 더 높은 평균 점수(73.57%)를 달성했습니다. 아웃-오브-분포 태스크에서도 **GraphRouter** 대비 **25.99%** 더 높은 평균 점수(66.08%)로 강력한 일반화 성능을 보였습니다. 전반적으로 **BaRP** 는 **GraphRouter** 대비 평균 점수를 **16.84%** 향상시키면서도, 동시에 통화 비용을 **50.00%** 절감하는 뛰어난 성능-비용 균형을 입증했습니다.

## AI 실무자를 위한 시사점
**BaRP** 는 LLM 라우팅을 위한 실용적인 솔루션을 제공하며, 실제 배포 환경의 **부분 피드백** 조건에서도 효과적으로 학습하고 작동할 수 있습니다. AI 실무자들은 **성능-비용 선호도 벡터 `w`** 를 조정하여 모델을 재훈련할 필요 없이 **추론 시점에 LLM 선택 동작** 을 유연하게 제어할 수 있습니다. 이 시스템은 강력한 오프라인 라우터 및 가장 큰 LLM보다 우수한 성능을 달성하면서도 상당한 **비용 효율성** 을 제공하여 자원 효율적인 LLM 배포에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.