---
title: "[논문리뷰] Language Models Can Learn from Verbal Feedback Without Scalar Rewards"
excerpt: "이 [arXiv]에 게시한 'Language Models Can Learn from Verbal Feedback Without Scalar Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Verbal Feedback
  - Conditional Generation
  - Large Language Models
  - Feedback-Conditional Policy
  - Offline-Online Learning
  - Reward Hypothesis Bypass

permalink: /ai/review/2025-9-29-Language_Models_Can_Learn_from_Verbal_Feedback_Without_Scalar_Rewards/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22638)

**저자:** Renjie Luo, Zichen Liu, Xiangyan Liu, Chao Du, Min Lin, Wenhu Chen, Wei Lu, Tianyu Pang



## 핵심 연구 목표
기존 RLHF(Reinforcement Learning from Human Feedback) 방식이 구두 피드백을 스칼라 보상으로 압축하여 발생하는 정보 손실, 모호성, 보상 스케일 불균형 문제를 해결하는 것을 목표로 합니다. 특히 LLM 환경에서 **구두 피드백**을 스칼라 보상으로 변환하는 과정 없이, 피드백 자체를 **조건화 신호**로 직접 활용하는 새로운 학습 패러다임을 제안합니다.

## 핵심 방법론
본 논문은 **피드백 조건부 정책(Feedback-Conditional Policy, FCP)**을 제안합니다. FCP는 응답과 피드백 쌍으로부터 직접 학습하며, 오프라인 데이터에 대한 **최대 우도 학습(maximum likelihood training)**을 통해 피드백 조건부 사후분포를 근사합니다. 이후 **온라인 부트스트래핑(online bootstrapping)** 단계에서는 정책이 긍정적인 조건(c+)하에 응답을 생성하고 새로운 피드백을 받아 스스로를 정제합니다. 이는 피드백 기반 학습을 보상 최적화가 아닌 **조건부 생성** 문제로 재구성합니다.

## 주요 결과
**FCP**는 수학 및 일반 추론 태스크에서 강력한 **스칼라 기반 기준선(RFT, GRPO)**과 대등하거나 능가하는 성능을 입증했습니다. 오프라인 FCP는 수학 스위트에서 평균 **28.8%의 정확도**를 달성했으며, **온라인 부트스트래핑**을 통해 평균 **38.7% 정확도**로 향상되어 **GRPO(38.4%)**를 약간 앞섰습니다(Table 1). FCP는 또한 `fully_positive` 조건에서 68.5%, `fully_negative` 조건에서 17.1% 정확도를 보여 피드백 조건에 따라 동작을 효과적으로 제어함을 확인했습니다.

## AI 실무자를 위한 시사점
AI 실무자는 더 이상 복잡한 스칼라 보상 함수를 설계하거나 풍부한 **자연어 피드백**을 손실이 큰 스칼라 값으로 변환할 필요 없이, 구두 피드백을 LLM 학습에 직접 활용할 수 있습니다. 이 방법론은 **다양하고 혼합된 형태의 사용자 피드백**을 통합하여 학습 효율성을 높이고, **보상 해킹(reward hacking)** 문제를 피할 수 있는 견고한 학습 신호를 제공합니다. **온라인 부트스트래핑**을 통해 지속적인 성능 개선이 가능하며, 실제 환경의 **동적 피드백**에 적응하는 LLM 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.