---
title: "[논문리뷰] Tool-R0: Self-Evolving LLM Agents for Tool-Learning from Zero Data"
excerpt: "arXiv에 게시된 'Tool-R0: Self-Evolving LLM Agents for Tool-Learning from Zero Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Self-Play Reinforcement Learning (RL)
  - Tool-Learning
  - Zero-Data Learning
  - LLM Agents
  - Curriculum Learning
  - Reward Shaping
  - Co-evolution

permalink: /ai/review/2026-03-03-Tool-R0-Self-Evolving-LLM-Agents-for-Tool-Learning-from-Zero-Data/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21320)

**저자:** Emre Can Acikgoz, Cheng Qian, Jonas Hübotter, Heng Ji, Dilek Hakkani-Tür, Gokhan Tur



## 핵심 연구 목표
본 논문은 기존의 인간 감독 및 데이터셋 구축에 의존하는 **LLM 도구 학습** 의 확장성 문제를 해결하고자 합니다. **사전 데이터 없이** 약한 LLM이 스스로 도구 사용 능력을 학습하여 **범용 도구 호출 에이전트** 로 발전할 수 있는 **자기 진화 프레임워크 Tool-R0** 을 제안합니다.

## 핵심 방법론
**Tool-R0** 은 **Generator** 와 **Solver** 라는 두 개의 LLM 에이전트가 **상호 보완적인 보상 신호** 를 통해 공동 진화하는 **자기 플레이 RL 프레임워크** 입니다. **Generator** 는 **GRPO** 를 사용하여 **Solver의 현재 역량 수준에 맞는 도전적인 도구 호출 태스크** 를 생성하며, 이 태스크는 **Solver의 예측 불확실성(Pass@K)** 을 기반으로 난이도가 조정됩니다. **Solver** 는 **생성된 커리큘럼 데이터** 를 통해 도구 호출의 **형식 및 정확도** 를 개선하도록 훈련됩니다. 특히, **Generator와 Solver는 별개의 파라미터** 로 훈련되어 학습 충돌을 방지합니다.

## 주요 결과
**Tool-R0** 은 **Qwen2.5-1.5B-Instruct** 모델에서 **평균 정확도 47.84%** 를 달성하며, 기반 모델 대비 **92.52%의 상대적 성능 향상** 을 보였습니다. 이는 **4,000~210,000개의 인간 주석 데이터** 로 훈련된 **완전 지도 학습 모델들을 능가** 하는 결과입니다. 또한, 자기 플레이 과정에서 기반 모델의 **구조적 오류를 절반 가까이 감소** 시켰으며, 특히 소규모 모델에서 **Iter 3** 에서 성능이 빠르게 수렴하는 경향을 확인했습니다.

## AI 실무자를 위한 시사점
**Tool-R0** 은 **제로 데이터** 환경에서 LLM 에이전트가 복잡한 도구 사용 기술을 **자기 진화** 할 수 있음을 보여주며, 이는 데이터 수집의 한계를 극복하고 **확장 가능한 AI 시스템 개발** 의 중요한 진전을 의미합니다. 특히, **생성된 커리큘럼이 인간이 설계한 데이터셋보다 더 효과적** 이라는 점은 LLM이 스스로 학습 격차를 식별하고 해소할 수 있는 잠재력을 시사합니다. 이러한 접근 방식은 **지속적인 능력 획득** 과 **인간 개입 없는 슈퍼인텔리전스** 를 향한 중요한 단계가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.