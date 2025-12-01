---
title: "[논문리뷰] R-Zero: Self-Evolving Reasoning LLM from Zero Data"
excerpt: "Zongxia Li이 [arXiv]에 게시한 'R-Zero: Self-Evolving Reasoning LLM from Zero Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Evolving LLM
  - Reinforcement Learning
  - Curriculum Learning
  - Reasoning
  - Large Language Models
  - Self-Play
  - Zero-Data Training

permalink: /ai/review/2025-8-8-R-Zero-Self-Evolving-Reasoning-LLM-from-Zero-Data/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05004)

**저자:** Chengsong Huang, Wenhao Yu, Xiaoyang Wang, Hongming Zhang, Zongxia Li, Ruosen Li, Jiaxin Huang, Haitao Mi, Dong Yu



## 핵심 연구 목표
본 연구는 기존 LLM의 자가 진화 방식이 방대한 **인간 큐레이션 데이터** 에 의존하는 한계를 극복하고자 합니다. **R-Zero** 는 **외부 데이터 없이** LLM이 자체적으로 훈련 데이터를 생성하고 학습하여 추론 능력을 자율적으로 발전시키는 **완전 자율 프레임워크** 를 제안하며, 인간 지능을 넘어설 수 있는 AI 시스템의 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
**R-Zero** 는 단일 **기본 LLM** 에서 초기화된 **Challenger** 와 **Solver** 라는 두 개의 독립적인 모델을 사용합니다. **Challenger** 는 현재 **Solver** 의 능력 한계에 가까운 도전적인 질문을 생성하도록 **Group Relative Policy Optimization (GRPO)** 으로 훈련되며, **Solver** 의 다중 답변을 통해 측정된 **불확실성** 에 따라 보상받습니다. **Solver** 는 **Challenger** 가 생성한 질문들을 **자체 다수결 투표** 로 생성된 **의사 레이블** 을 사용하여 **GRPO** 로 미세 조정됩니다.

## 주요 결과
**R-Zero** 는 다양한 백본 LLM(예: **Qwen3-4B-Base** , **OctoThinker** )에서 추론 능력을 크게 향상시켰습니다. **Qwen3-4B-Base** 는 수학 추론 벤치마크에서 평균 **+6.49 포인트** , 일반 도메인 추론 벤치마크에서 평균 **+7.54 포인트** 의 성능 향상을 보였습니다. 프레임워크의 핵심 구성 요소인 **RL 기반 Challenger** , **반복 패널티** , **태스크 필터링** 이 모두 중요함을 **정량적 어블레이션 연구** 를 통해 입증했습니다.

## AI 실무자를 위한 시사점
**R-Zero** 는 **인간 레이블 없이** LLM의 추론 능력을 자율적으로 향상시킬 수 있는 혁신적인 방법을 제시하여 **데이터 수집 비용** 이라는 주요 병목 현상을 해결합니다. 이는 특히 **수학적 추론** 과 같이 객관적 검증이 가능한 도메인에서 LLM을 강화하고, 그 능력을 **일반 도메인** 으로 확장할 수 있음을 보여줍니다. 하지만, 더 어려운 문제 생성 시 **자체 생성된 의사 레이블의 정확도(79%에서 63%로 하락)** 가 감소하는 경향은 향후 연구에서 개선해야 할 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.