---
title: "[논문리뷰] Multiplayer Nash Preference Optimization"
excerpt: "arXiv에 게시된 'Multiplayer Nash Preference Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RLHF
  - LLM Alignment
  - Nash Equilibrium
  - Multiplayer Games
  - Preference Optimization
  - Non-transitive Preferences
  - Game Theory

permalink: /ai/review/2025-9-30-Multiplayer-Nash-Preference-Optimization/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23102)

**저자:** Fang Wu, Xu Huang, Weihao Xuan, Zhiwei Zhang, Yijia Xiao, Guancheng Wan, Xiaomin Li, Bing Hu, Peng Xia, Jure Leskovec, Yejin Choi



## 핵심 연구 목표
기존 RLHF의 **Bradley-Terry 모델** 이 실제 세계의 비전이적(non-transitive)이고 이질적인 선호도를 포착하지 못하는 한계를 해결하고자 합니다. 또한, 기존 **NLHF(Nash Learning from Human Feedback)** 가 2인 게임으로 제한되어 단일 상대방 편향을 갖는 문제를 극복하고, **다인(n-player) 게임** 으로 확장하여 복잡한 인간 선호도에 대한 LLM 정렬의 완전한 복잡성을 다루는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 NLHF를 다인 체제로 일반화한 **Multiplayer Nash Preference Optimization (MNPO)** 프레임워크를 제안합니다. 각 정책은 다수의 상대방 정책과 경쟁하면서 **참조 모델(reference model)** 을 향해 정규화되며, **Plackett-Luce 모델** 을 사용하여 다자간 선호도 비교를 처리합니다. 특히, **시간 의존적 MNPO (TD-MNPO)** 는 가중치 조합의 과거 정책들을 사용하여 상대방 세트를 적응적으로 발전시켜 훈련 안정성을 높입니다.

## 주요 결과
**MNPO** 는 지시 추종 벤치마크에서 기존 NLHF 모델들을 일관되게 능가했습니다. **AlpacaEval 2.0** 에서 **57.27%** Win Rate를 달성하며 DPO(54.35%) 대비 **2.92%p** , INPO(56.09%) 대비 **1.18%p** 높은 성능을 보였습니다. 특히 **Arena-Hard** 벤치마크에서는 **52.26%** 를 기록하여 INPO(48.03%)보다 **4.23%p** 우수했으며, **AIME-24** 수학 추론 벤치마크에서 유일하게 **3.33%** 의 비제로 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**MNPO** 는 복잡하고 비전이적인 인간 선호도를 처리하여 LLM 정렬의 질을 높이는 **확장 가능하고 원칙적인 프레임워크** 를 제공합니다. **다양한 주석자 조건** 이나 **혼합 정책 평가 시나리오** 에서 LLM의 견고성과 성능을 향상시키는 데 기여하며, **시간 의존적 상대방** 을 통해 과거 학습 경험을 활용하여 모델의 안정적인 진화를 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.