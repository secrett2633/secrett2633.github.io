---
title: "[논문리뷰] Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem"
excerpt: "Wei Gao이 [arXiv]에 게시한 'Let It Flow: Agentic Crafting on Rock and Roll, Building the ROME Model within an Open Agentic Learning Ecosystem' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Learning Ecosystem
  - Large Language Models
  - Reinforcement Learning
  - Agentic Crafting
  - Tool Use
  - ROME Model
  - Policy Optimization
  - Sandbox Environment

permalink: /ai/review/2026-01-01-Let-It-Flow-Agentic-Crafting-on-Rock-and-Roll-Building-the-ROME-Model-within-an-Open-Agentic-Learning-Ecosystem/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24873)

**저자:** Wei Gao, Fangwen Dai, Wanhe An, XiaoXiao Xu, Weixun Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 복잡하고 다단계의 에이전트 태스크를 실제 환경에서 수행하기 위한 확장 가능하고 종단 간(end-to-end)의 안정적인 에이전트 에코시스템을 구축하는 것을 목표로 합니다. 기존 오픈소스 커뮤니티의 한계인 비효율적인 개발 및 배포 문제를 해결하여, LLM 기반 에이전트의 실질적인 채택을 가속화하고자 합니다.

## 핵심 방법론
저자들은 **Agentic Learning Ecosystem (ALE)** 을 제안하며, 이는 **ROLL (강화 학습 최적화 프레임워크)** , **ROCK (샌드박스 환경 실행 엔진)** , 그리고 **iFlow CLI (에이전트 프레임워크)** 의 세 가지 핵심 구성요소로 이루어져 있습니다. 이 에코시스템을 기반으로 **Qwen3-MoE** 기반의 오픈소스 에이전트 LLM인 **ROME** 을 개발하였으며, **백만 개 이상의 상호작용 궤적** 을 활용하여 **연속 사전 훈련(CPT)** , **지도 미세 조정(SFT)** , 그리고 **Interaction-Perceptive Agentic Policy Optimization (IPA)** 이라는 새로운 강화 학습 알고리즘을 통해 훈련했습니다. **IPA** 는 개별 토큰 대신 **의미론적 상호작용 청크** 단위로 보상을 할당하여 장기적인 학습 안정성을 개선합니다.

## 주요 결과
**ROME** 은 주요 에이전트 벤치마크에서 뛰어난 성능을 보였으며, **Terminal-Bench 2.0** 에서 **24.72%** , **SWE-bench Verified** 에서 **57.40%** 의 정확도를 달성했습니다. 이는 유사 규모 모델들을 능가하고 **100B 이상의 파라미터를 가진 모델** 들과도 비견될 만한 성능입니다. 또한, 더욱 엄격한 평가를 위한 새로운 벤치마크인 **Terminal Bench Pro** 에서도 경쟁력 있는 성능을 입증했으며, 실제 프로덕션 환경에 성공적으로 배포되어 **ALE** 의 실용적 효과를 검증했습니다.

## AI 실무자를 위한 시사점
**ALE** 는 AI/ML 엔지니어와 데이터 사이언티스트에게 에이전트 LLM의 개발부터 배포까지 전 과정을 최적화하는 견고하고 확장 가능한 인프라를 제공합니다. **ROME** 의 성공은 대규모 데이터와 파라미터뿐만 아니라, **IPA** 와 같은 혁신적인 학습 방법론과 체계적인 데이터 구성을 통해 중소규모 모델도 뛰어난 에이전트 성능을 발휘할 수 있음을 보여줍니다. 이는 **비용 효율적인 에이전트 개발** 의 가능성을 시사하며, 실제 적용을 위한 **보안 샌드박스 환경(ROCK)** 과 **효율적인 RL 훈련(ROLL)** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.