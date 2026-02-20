---
title: "[논문리뷰] Native Parallel Reasoner: Reasoning in Parallelism via Self-Distilled Reinforcement Learning"
excerpt: "arXiv에 게시된 'Native Parallel Reasoner: Reasoning in Parallelism via Self-Distilled Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Parallel Reasoning
  - Self-Distilled Reinforcement Learning
  - Policy Optimization
  - Inference Acceleration
  - Structured Output
  - Agentic Reasoning

permalink: /ai/review/2025-12-09-Native-Parallel-Reasoner-Reasoning-in-Parallelism-via-Self-Distilled-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07461)

**저자:** Tong Wu*, Yang Liu, Jun Bai, Zixia Jia†, Shuyi Zhang, Ziyong Lin, Yanting Wang, Song-Chun Zhu, and Zilong Zheng†



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 **순차적 모방** 에서 벗어나 **진정한 병렬 추론 능력** 을 자기 진화할 수 있도록 하는 것을 목표로 합니다. 기존 방식의 **외부 교사 모델 의존성** 과 그로 인한 **"지능 천장"** 및 **비효율적인 병렬 처리** 문제를 해결하고, 효율적이고 확장 가능한 **에이전트 추론(agentic reasoning)** 을 위한 새로운 표준을 제시하고자 합니다.

## 핵심 방법론
**Native Parallel Reasoner (NPR)** 프레임워크는 3단계의 점진적 훈련 패러다임을 사용합니다. **1단계(NPR-ZERO)** 에서는 **DAPO 기반의 format-follow RL** 을 통해 구조화된 병렬 형식을 유도합니다. **2단계(NPR-BETA)** 에서는 자체 증류된(self-distilled) 궤적에 대한 **지도 미세 조정(SFT)** 을 통해 병렬 기본 요소들을 안정화하며, **병렬 어텐션 마스크** 와 **위치 인코딩** 을 적용합니다. 마지막 **3단계(NPR)** 에서는 새로운 **Parallel-Aware Policy Optimization (PAPO) 알고리즘** 과 **NPR Engine** 을 사용하여 실행 그래프 내에서 분기 정책을 직접 최적화하여 진정한 병렬 추론 능력을 강화합니다.

## 주요 결과
**NPR** 은 8가지 추론 벤치마크에서 **Qwen3-4B 모델** 을 훈련시켜 **최대 24.5%의 성능 향상** 과 **최대 4.6배의 추론 속도 향상** 을 달성했습니다. 특히 **AIME25 벤치마크** 에서 **50.4%의 정확도** 를 기록하며 이전 **SoTA(45.8%)** 를 능가하는 높은 추론 정확도를 보여주었습니다. 또한, 기존 모델들이 자동회귀(AR) 디코딩으로 회귀하는 경향이 있었던 것과 달리, **NPR** 은 모든 평가 사례에서 **100% 진정한 병렬 실행** 을 입증했습니다.

## AI 실무자를 위한 시사점
**NPR** 은 LLM이 외부 교사 모델 없이도 복잡한 문제를 병렬적으로 추론할 수 있는 **자기 진화적 능력** 을 제공하여, LLM 기반 에이전트 시스템의 자율성과 성능을 크게 향상시킬 수 있습니다. **PAPO 알고리즘** 과 **NPR Engine** 은 **대규모 병렬 RL 학습** 의 안정성과 효율성을 보장하며, 이는 복잡한 AI 추론 작업을 위한 실용적인 솔루션을 제공합니다. **진정한 병렬 실행** 과 **추론 속도 향상** 은 실시간 상호작용이 필요한 AI 서비스에서 LLM의 활용 범위를 넓히는 데 핵심적인 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.