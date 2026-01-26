---
title: "[논문리뷰] Endless Terminals: Scaling RL Environments for Terminal Agents"
excerpt: "이 [arXiv]에 게시한 'Endless Terminals: Scaling RL Environments for Terminal Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Procedural Generation
  - Terminal Agents
  - Environment Scaling
  - Language Models (LLMs)
  - PPO
  - Task Generation
  - Automated Verification

permalink: /ai/review/2026-01-26-Endless-Terminals-Scaling-RL-Environments-for-Terminal-Agents/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16443)

**저자:** Kanishk Gandhi, Shivam Garg, Noah D. Goodman, Dimitris Papailiopoulos



## 핵심 연구 목표
본 논문은 자체 개선 에이전트 훈련을 위한 환경이 부족하다는 문제점을 해결하고, 확장 가능한 RL 환경을 제공하는 것을 목표로 합니다. 특히 터미널 사용 태스크에 초점을 맞춰, 기존 벤치마크가 평가용으로 설계되어 훈련에 적합하지 않다는 점을 극복하고 인간의 개입 없이 **터미널 사용 태스크를 자동으로 생성하는 파이프라인** 을 구축하고자 합니다.

## 핵심 방법론
`Endless Terminals` 파이프라인은 네 단계로 구성됩니다. 첫째, **LLM** 을 활용하여 카테고리, 복잡도, 시나리오를 샘플링해 다양한 태스크 설명과 권한이 부여된 정답 데이터를 생성합니다. 둘째, **컨테이너화된 환경(Docker/Apptainer)** 을 설정하고 **반복적인 정제 루프** 를 통해 초기 상태 유효성 검사 테스트를 통과시킵니다. 셋째, 태스크 완료 후 기대되는 최종 상태를 검증하는 완료 테스트를 생성합니다. 넷째, **강력한 모델(03)** 에서 **16개의 솔루션** 을 샘플링하여 태스크의 해결 가능성을 확인하고 필터링합니다. 에이전트 훈련에는 **바닐라 PPO** 와 최소한의 상호작용 루프(추론, 명령 실행, 출력 관찰)가 사용됩니다.

## 주요 결과
이 파이프라인을 통해 **3255개의 검증된 태스크** 를 성공적으로 생성했습니다. `Endless Terminals`로 훈련된 모델들은 자체 개발 dev 세트에서 **Llama-3.2-3B가 4.0%에서 18.2%로** , **Qwen2.5-7B가 10.7%에서 53.3%로** , **Qwen3-8B-openthinker-sft가 42.6%에서 59.0%로** 크게 향상되었습니다. 이러한 개선 사항은 인간이 큐레이션한 **TerminalBench 2.0 벤치마크** 에서도 **Llama-3.2-3B가 0.0%에서 2.2%로** , **Qwen2.5-7B가 2.2%에서 3.4%로** , **Qwen3-8B-openthinker-sft가 1.1%에서 6.7%로** 성능이 향상되어, 다른 복잡한 에이전틱 스캐폴드를 사용한 접근 방식보다 우수한 결과를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **환경의 규모 확장** 이 복잡한 대화형 태스크에서 **단순한 RL(PPO) 설정으로도 상당한 성능 향상** 을 가져올 수 있음을 입증합니다. **절차적 생성 파이프라인** 은 인간의 개입 없이 다양하고 검증 가능한 훈련 데이터를 효과적으로 생성하는 방법을 제시하여, **터미널 에이전트 개발 비용과 시간을 절감** 할 수 있는 실용적인 해결책을 제공합니다. 이는 **LLM 기반 에이전트** 의 훈련 데이터를 자동화하고 확장하는 데 중요한 이정표가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.