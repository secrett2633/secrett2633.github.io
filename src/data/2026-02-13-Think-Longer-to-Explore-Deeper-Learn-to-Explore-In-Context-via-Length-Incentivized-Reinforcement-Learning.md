---
title: "[논문리뷰] Think Longer to Explore Deeper: Learn to Explore In-Context via Length-Incentivized Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'Think Longer to Explore Deeper: Learn to Explore In-Context via Length-Incentivized Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - In-Context Learning
  - Reinforcement Learning
  - Test-Time Scaling
  - Exploration-Exploitation
  - State Coverage
  - Reward Shaping
  - Chain-of-Thought

permalink: /ai/review/2026-02-13-Think-Longer-to-Explore-Deeper-Learn-to-Explore-In-Context-via-Length-Incentivized-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11748)

**저자:** Futing Wang, Jianhao Yan, Yun Luo, Ganqu Cui, Zhi Wang, Xiaoye Qu, Yue Zhang, Yu Cheng, Tao Lin



## 핵심 연구 목표
본 논문은 LLM이 추론 과정에서 다양한 가설을 생성, 검증, 개선하는 'In-Context Exploration' 능력을 효과적으로 발휘하지 못하는 문제를 해결하고자 합니다. 이는 긴 추론 과정이 넓은 상태 공간 탐색에 필수적임에도 불구하고, 긴 시퀀스 샘플링 확률이 지수적으로 감소하는 'Shallow Exploration Trap'이라는 병목 현상 때문입니다.

## 핵심 방법론
저자들은 이러한 문제를 해결하기 위해 **Length-Incentivized Exploration (LIE)** 이라는 RL(강화 학습) 보상 설계 기법을 제안합니다. **LIE** 는 모델이 더 긴 추론 궤적을 탐색하도록 장려하는 **길이 보상 (Rlen)** 과 불필요한 반복을 방지하여 의미 있는 상태 탐색을 유도하는 **중복성 패널티 (Rred)** 를 결합합니다. 이를 통해 **GSPO** 와 **GRPO** 와 같은 표준 RL 알고리즘에 적용하여 효과적인 인컨텍스트 탐색을 촉진합니다.

## 주요 결과
**LIE** 는 **Qwen3-4B-Base** 모델에서 인-도메인 태스크에서 평균 **4.4%** , OOD(Out-of-Domain) 벤치마크에서 **2.7%** 의 성능 향상을 달성했습니다. 특히, **AIME25** 벤치마크에서는 **6.2%** 의 상당한 개선을 보였습니다. 또한, **LIE** 는 테스트 시간 추론 예산 증가에 따라 성능이 꾸준히 향상되는 우수한 스케일링 곡선을 보였으며, 백트래킹과 같은 복잡한 인지 행동을 크게 증가시키고 추론 깊이와 폭을 확장하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
**LIE** 는 LLM이 복잡한 문제를 해결하기 위해 더 깊고 넓게 추론하도록 유도하여 **모델의 문제 해결 능력을 향상** 시킬 수 있습니다. 특히, 추론 연산 예산이 증가할 때 지속적으로 성능을 개선하는 특성 덕분에 **장문의 CoT(Chain-of-Thought)** 를 활용하는 애플리케이션에서 **효과적인 테스트 시간 스케일링** 을 가능하게 합니다. 이 방법론은 다양한 LLM 모델에서 일관된 성능 향상을 보여, **강화 학습 기반 LLM 파인튜닝** 에 적용 가능한 범용적인 기법임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.