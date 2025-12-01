---
title: "[논문리뷰] Infusing Theory of Mind into Socially Intelligent LLM Agents"
excerpt: "이 [arXiv]에 게시한 'Infusing Theory of Mind into Socially Intelligent LLM Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Theory of Mind
  - Large Language Models
  - Social Agents
  - Dialogue Systems
  - Mental State Modeling
  - Look-ahead Planning
  - Supervised Fine-tuning
  - Sotopia Benchmark

permalink: /ai/review/2025-10-2-Infusing-Theory-of-Mind-into-Socially-Intelligent-LLM-Agents/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22887)

**저자:** EunJeong Hwang, Yuwei Yin, Giuseppe Carenini, Peter West, Vered Shwartz



## 핵심 연구 목표
본 논문은 대화형 **LLM(Large Language Model)** 기반 소셜 에이전트가 **타인의 정신 상태 이해 능력(Theory of Mind, ToM)** 을 통합함으로써 사회적 지능과 목표 달성 능력을 향상시키는 것을 목표로 합니다. LLM의 사회적 추론 능력 부족 문제를 해결하고, 특히 대화 환경에서 ToM 모델링의 기여도를 정량적으로 평가하고자 합니다.

## 핵심 방법론
연구진은 **ToMAgent (TOMA)** 라는 ToM 중심 대화 에이전트를 제안합니다. 이 방법론은 대화 턴 사이에 **LLM** 이 **정신 상태(신념, 욕구, 의도, 감정, 지식)** 를 명시적으로 생성하도록 프롬프트하는 것에서 시작합니다. 최적의 대화 궤적을 선택하기 위해 **단기 미래 대화 시뮬레이션** 및 **대화 결과 예측** 을 결합하고, 높은 점수를 받은 정신 상태-발화 쌍을 수집하여 **표준 교차 엔트로피 손실** 을 통해 **Qwen2.5-3B** 및 **Qwen2.5-7B** 모델을 **감독 하에 미세 조정(fine-tuning)** 합니다.

## 주요 결과
**Sotopia** 대화 벤치마크에서 **TOMA** 는 베이스라인 모델 대비 **Qwen2.5-3B** 에서 **18.9%** , **Qwen2.5-7B** 에서 **6.6%** 의 평균 점수 향상을 달성했습니다. 또한, **GPT-5-nano** 베이스라인과도 경쟁력 있는 성능을 보였습니다. 특히 **관계(Relationship)** 차원에서 우수한 성능을 나타냈으며, 대화 턴이 증가할수록 목표 달성 점수가 지속적으로 향상되는 **장기적 적응 능력** 을 입증했습니다. **TOMA** 는 베이스라인보다 더 많은 **1차 정신 상태(상대방에 대한 신념)** 를 생성했습니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM** 에 **명시적인 ToM 모델링** 을 주입하는 것이 단순한 일반 추론 능력 향상을 넘어, 에이전트의 **사회적 지능과 목표 지향적 행동** 을 크게 개선할 수 있음을 보여줍니다. **ToMAgent** 는 협상, 설득, 갈등 상황 등 다양한 시나리오에서 **더욱 전략적이고 인간다운 상호작용** 을 가능하게 하며, 장기적인 대화에서 **적응성** 을 높입니다. 이는 사회적으로 안전하고 효과적인 **LLM 에이전트 개발** 을 위한 중요한 단계입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.