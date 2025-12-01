---
title: "[논문리뷰] Parallel-R1: Towards Parallel Thinking via Reinforcement Learning"
excerpt: "Xinyu Yang이 [arXiv]에 게시한 'Parallel-R1: Towards Parallel Thinking via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Parallel Thinking
  - Reinforcement Learning
  - Mathematical Reasoning
  - Progressive Curriculum
  - Reward Design
  - Exploration Scaffold

permalink: /ai/review/2025-9-10-Parallel-R1-Towards-Parallel-Thinking-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07980)

**저자:** Tong Zheng, Hongming Zhang, Wenhao Yu, Xiaoyang Wang, Xinyu Yang, et al.



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 복잡한 추론 문제에서 병렬적 사고를 습득하도록 훈련하는 데 있어 기존 **지도 학습(SFT)** 방식의 한계를 극복하고자 합니다. 특히, SFT가 합성 데이터에 의존하여 피상적인 패턴 매칭에 그치고, **강화 학습(RL)** 적용 시 발생하는 **콜드 스타트 문제** 와 효과적인 **보상 설계** 의 어려움을 해결하여 일반화된 병렬적 사고 능력을 부여하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 복잡한 실제 수학 추론 태스크를 위한 **최초의 RL 기반 병렬적 사고 프레임워크인 Parallel-R1** 을 제안합니다. 이 프레임워크는 **점진적 커리큘럼** 을 통해 초기에는 쉬운 문제(예: **Parallel-GSM8K** )에서 **SFT** 로 병렬적 사고 형식을 주입하고, 이후 **Group Relative Policy Optimization (GRPO)** 기반의 **RL** 을 사용하여 더 어려운 문제(예: **DAPO** )로 일반화합니다. 특히, **정확도 보상과 병렬적 사고 보상을 교차** 하는 **교대 보상 전략** 을 통해 안정적인 학습을 유도합니다.

## 주요 결과
Parallel-R1은 도전적인 수학 벤치마크에서 **순차적 사고 모델 대비 평균 8.4%의 정확도 향상** 을 달성했습니다. 특히, **AIME25 벤치마크** 에서는 최고 **25.6%의 정확도** 를 기록하며 단일 스레드 모델의 성능을 뛰어넘었습니다. 또한, 모델의 사고 전략이 초기에는 **계산적 탐색(computational exploration)** 에서 후기에는 **다각적 검증(multi-perspective verification)** 으로 진화함을 밝혀냈습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 추론 능력 향상을 위해 **RL 기반 병렬적 사고 훈련** 이 강력한 방법론임을 보여줍니다. 특히, **점진적인 커리큘럼 디자인** 과 **동적 보상 설계** 는 복잡한 스킬 학습의 콜드 스타트 문제를 해결하는 데 중요한 실용적 통찰을 제공합니다. 병렬적 사고를 **훈련 중 탐색 스캐폴드** 로 활용하여 모델의 최종 성능 상한을 높일 수 있다는 발견은 향후 LLM의 훈련 및 아키텍처 설계에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.