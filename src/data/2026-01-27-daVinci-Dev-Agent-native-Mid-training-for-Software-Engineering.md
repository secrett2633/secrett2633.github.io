---
title: "[논문리뷰] daVinci-Dev: Agent-native Mid-training for Software Engineering"
excerpt: "이 [arXiv]에 게시한 'daVinci-Dev: Agent-native Mid-training for Software Engineering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Software Engineering
  - Mid-training
  - Large Language Models
  - Agent-native Data
  - Contextual Trajectories
  - Environmental Trajectories
  - SWE-Bench Verified
  - Code Generation

permalink: /ai/review/2026-01-27-daVinci-Dev-Agent-native-Mid-training-for-Software-Engineering/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18418)

**저자:** Ji Zeng, Dayuan Fu, Tiantian Mi, Ye, Muhang Xie, Qishuo Hua, Yumin Zhuang, Yaxing Huang, Xuefeng Li, Lyumanshan, Zhen Huang, Mohan Jiang, Hanning Wang, Jifan Lin, Yang Xiao, Jie Sun, Yunze Wu, Pengfei Liu



## 핵심 연구 목표
본 논문은 LLM 기반 코드 에이전트 개발에서 기존 **포스트 트레이닝(SFT, RL) 방식의 한계** 인 리소스 제약과 데이터 불일치를 극복하고자 합니다. 특히, 에이전트의 실제 작업 흐름을 반영하지 못하는 기존 미드 트레이닝(MT) 데이터의 문제를 해결하기 위해, **에이전트-네이티브(agent-native) 데이터 기반의 체계적인 미드 트레이닝 방법론** 을 구축하고 그 효과를 검증하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 두 가지 상호 보완적인 **에이전트-네이티브 데이터셋** 을 구축했습니다. 첫째, GitHub Pull Request에서 추출한 **68.6B 토큰 규모의 Contextually-native trajectories** 는 에이전트가 경험하는 완전한 정보 흐름을 보존하여 광범위한 코드 지식과 개발 워크플로우를 제공합니다. 둘째, **SWE-REBENCH** 방법론을 통해 실제 실행 가능한 환경에서 에이전트 롤아웃을 통해 수집한 **3.1B 토큰 규모의 Environmentally-native trajectories** 는 실제 도구 호출 및 테스트 실행 피드백을 포함하여 상호작용의 깊이와 진정성을 부여합니다. 이 데이터셋들을 **Qwen2.5-32B-Base** 및 **Qwen2.5-72B-Base** 모델에 대해 미드 트레이닝한 후, **SWE-AGENT** 스캐폴드 상에서 지도 미세 조정(SFT)을 수행하여 성능을 평가했습니다.

## 주요 결과
본 연구의 최고 성능 모델은 **SWE-Bench Verified** 에서 **32B 모델이 56.1%** , **72B 모델이 58.5%** 의 해결률을 달성하며 최첨단(state-of-the-art) 성능을 입증했습니다. 이는 이전 공개 미드 트레이닝 방식인 **Kimi-Dev(72B)의 48.6%** 를 크게 상회하는 결과이며, Kimi-Dev 대비 절반 이하의 미드 트레이닝 토큰( **73.1B** vs ~ **150B** )을 사용했다는 점에서 효율성도 뛰어납니다. 또한, **HumanEval** 및 **EvalPlus** 와 같은 일반 코드 생성 벤치마크와 **GPQA** 및 **SciBench** 와 같은 과학적 추론 벤치마크에서도 상당한 성능 향상을 보이며 강력한 일반화 능력을 시사합니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM 기반 소프트웨어 엔지니어링 에이전트** 의 개발에 있어 **실제 개발 워크플로우와 환경 피드백을 반영한 미드 트레이닝 데이터** 의 중요성을 강조합니다. AI/ML 엔지니어는 단순 코드 조각이 아닌 **문맥적으로 풍부한 PR 데이터** 와 **실제 실행 환경 상호작용 데이터** 를 활용하여, 에이전트의 **복잡한 문제 해결 및 추론 능력** 을 효과적으로 강화할 수 있습니다. 이는 효율적인 리소스 활용과 함께 **코드 생성 및 일반 추론 태스크 전반** 에 걸쳐 모델의 성능을 향상시킬 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.