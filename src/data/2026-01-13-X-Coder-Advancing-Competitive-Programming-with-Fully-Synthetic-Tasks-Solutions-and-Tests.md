---
title: "[논문리뷰] X-Coder: Advancing Competitive Programming with Fully Synthetic Tasks, Solutions, and Tests"
excerpt: "Jane Luo이 arXiv에 게시한 'X-Coder: Advancing Competitive Programming with Fully Synthetic Tasks, Solutions, and Tests' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Competitive Programming
  - Code LLMs
  - Synthetic Data Generation
  - Supervised Fine-tuning (SFT)
  - Reinforcement Learning (RL)
  - Dual Verification
  - Scaling Laws
  - SynthSmith

permalink: /ai/review/2026-01-13-X-Coder-Advancing-Competitive-Programming-with-Fully-Synthetic-Tasks-Solutions-and-Tests/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06953)

**저자:** Jie Wu, Haoling Li, Xin Zhang, Jiani Guo, Jane Luo, Steven Liu, Yangyu Huang, Ruihang Chu, Scarlett Li, Yujiu Yang



## 핵심 연구 목표
본 논문은 경쟁 프로그래밍(Competitive Programming)을 위한 코드 LLM(Large Language Model)이 실제 데이터의 희소성으로 인해 겪는 한계를 극복하는 것을 목표로 합니다. 완전히 **합성된 태스크, 솔루션 및 테스트 케이스** 를 사용하여 코드 추론 모델을 훈련함으로써, 실제 데이터에 대한 의존성을 줄이고 모델의 확장성 및 성능을 향상시키는 것을 주된 연구 목표로 합니다.

## 핵심 방법론
저자들은 경쟁 프로그래밍에 특화된 새로운 데이터 합성 파이프라인인 **SynthSmith** 를 제안합니다. 이 파이프라인은 **피처 기반 합성(feature-based synthesis)** , 다중 스타일 태스크 구성, 그리고 솔루션과 테스트 케이스의 **이중 검증(dual-verification)** 전략을 통해 다양하고 도전적인 고품질 합성 데이터를 생성합니다. 훈련은 생성된 SFT(Supervised Fine-tuning) 및 RL(Reinforcement Learning) 데이터셋을 활용하는 **SFT-then-RL 패러다임** 을 따르며, RL 단계에서는 **GRPO 알고리즘** 을 사용합니다.

## 주요 결과
**X-Coder 모델 시리즈** 는 7B 파라미터임에도 불구하고 **LiveCodeBench v5에서 62.9 avg@8** , **v6에서 55.8 avg@8** 의 주목할 만한 성능을 달성하여, **DeepCoder-14B-Preview** 나 **AReal-boba2-14B** 와 같은 14B 모델들을 능가했습니다. 특히, SFT 단계에서 합성 데이터를 사용했을 때 **60.3 avg@8** 를 기록했으며, RL 단계에서 추가적인 **4.6% 절대 성능 향상** 을 보여주었습니다. 또한, 태스크 다양성을 높이는 것이 솔루션 다양성을 늘리는 것보다 일반화에 더 효과적임을 발견했습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 추론을 요구하는 AI 태스크에서 **합성 데이터만으로 고성능 LLM을 훈련** 할 수 있음을 입증하며, 데이터 희소성 문제를 해결할 수 있는 실용적인 방안을 제시합니다. **SynthSmith** 와 같은 체계적인 데이터 합성 파이프라인은 경쟁 프로그래밍을 넘어 다양한 도메인에서 고품질 합성 데이터를 생성하는 데 활용될 수 있습니다. **SFT와 RL의 단계별 훈련** 과 데이터 품질을 보장하는 **이중 검증 전략** 은 효과적인 코드 LLM 개발에 필수적인 요소임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.