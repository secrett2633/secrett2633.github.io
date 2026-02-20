---
title: "[논문리뷰] JudgeRLVR: Judge First, Generate Second for Efficient Reasoning"
excerpt: "Sujian Li이 arXiv에 게시한 'JudgeRLVR: Judge First, Generate Second for Efficient Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RLVR
  - LLMs
  - Reasoning
  - Judge-then-Generate
  - Quality-Efficiency
  - Discriminative Supervision
  - Mathematical Reasoning
  - Backtracking Reduction

permalink: /ai/review/2026-01-14-JudgeRLVR-Judge-First-Generate-Second-for-Efficient-Reasoning/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08468)

**저자:** Jiangshan Duo, Hanyu Li, Hailin Zhang, Yudong Wang, Sujian Li, Liang Zhao



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 과정에서 **RLVR(Reinforcement Learning with Verifiable Rewards)** 이 흔히 유발하는 장황하고 비효율적인 탐색 문제를 해결하고자 합니다. 최종 정답 정확도에만 초점을 맞춘 RLVR의 한계를 극복하고, 모델이 구조화된 계획을 통해 효율적이고 고품질의 추론 경로를 생성하도록 유도하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 `JudgeRLVR`이라는 **두 단계(judge-then-generate) 훈련 패러다임** 을 제안합니다. 첫 번째 **Judging Stage** 에서는 모델을 판별자(judge)로 훈련시켜 다양한 모델이 생성한 후보 솔루션 응답을 정확성 여부에 따라 분류하도록 합니다. 이를 위해 **Hard Negative Mining** 및 **Class Balancing** 기법을 사용하여 훈련 데이터를 구성합니다. 두 번째 **Generating Stage** 에서는 Judging Stage에서 학습된 가중치로 모델을 초기화한 후, **Vanilla RLVR** 방식을 사용하여 솔루션 생성을 최적화합니다.

## 주요 결과
`JudgeRLVR`은 **Qwen3-30B-A3B** 모델에 대해 Vanilla RLVR 대비 뛰어난 성능을 입증했습니다. **인-도메인 수학 벤치마크** 에서 평균 **+3.7%의 정확도 향상** 과 동시에 **평균 생성 길이 42% 감소** 를 달성했습니다. 또한, **아웃-오브-도메인 벤치마크** 에서도 평균 **+4.5%의 정확도 향상** 을 보여 일반화 능력이 개선되었음을 시사합니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 추론을 수행하기 전에 **유효한 솔루션을 판별하는 능력** 을 내재화하는 것이 효율적인 생성에 필수적임을 보여줍니다. AI 실무자들은 이 `Judge-then-Generate` 패러다임을 통해 **추론의 정확도와 효율성** 을 동시에 개선할 수 있으며, 특히 장황한 출력을 줄여야 하는 애플리케이션에 유용할 것입니다. **명시적인 역추적(backtracking) 감소** 와 같은 언어적 스타일 변화는 모델의 내부 의사결정 프로세스가 개선되었음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.