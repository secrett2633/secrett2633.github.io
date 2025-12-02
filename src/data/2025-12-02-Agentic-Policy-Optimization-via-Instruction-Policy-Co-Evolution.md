---
title: "[논문리뷰] Agentic Policy Optimization via Instruction-Policy Co-Evolution"
excerpt: "이 [arXiv]에 게시한 'Agentic Policy Optimization via Instruction-Policy Co-Evolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Instruction Optimization
  - Policy Co-Evolution
  - Agentic AI
  - Tool-Integrated Reasoning
  - Self-Reflection

permalink: /ai/review/2025-12-02-Agentic-Policy-Optimization-via-Instruction-Policy-Co-Evolution/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01945)

**저자:** Han Zhou, Xingchen Wan, Ivan Vulić, Anna Korhonen



## 핵심 연구 목표
본 논문은 LLM 기반 에이전트의 강화 학습(RL) 과정에서 고정되고 수동으로 설계된 명령어(instruction)가 최적의 성능을 저해한다는 문제에 주목합니다. 에이전트의 정책이 발전함에 따라 최적의 명령어 또한 변화해야 한다는 전제하에, 명령어 학습을 RL 루프의 동적이고 필수적인 구성 요소로 자동화하여 명령어와 정책이 함께 발전하도록 하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 프레임워크인 **INSPO (INStruction-Policy co-evolution)** 는 크게 두 가지 핵심 요소를 가집니다. 첫째, **동적 명령어 기반 정책 최적화** 는 명령어 후보 집단을 유지하고, RL 훈련 시 각 명령어의 중요도에 따라 샘플링하여 정책과 명령어 중요도를 동시에 업데이트합니다. 주기적으로 성능이 낮은 명령어는 제거하고, 상위 명령어에서 새로운 명령어를 진화시키며 **Successive Halving** 기법을 활용합니다. 둘째, **경험 기반 명령어 생성** 은 에이전트의 실패 또는 낮은 보상을 기록한 **리플레이 버퍼** 의 궤적을 기반으로, **LLM 기반 최적화기** 가 자기 성찰을 통해 새로운 명령어 후보를 생성합니다. 새로 생성된 명령어는 저비용 프록시를 통해 검증된 후 활성 집단에 병합됩니다.

## 주요 결과
INSPO는 정적 명령어를 사용하는 강력한 베이스라인들을 크게 능가했습니다. **Qwen-2.5-3B 모델** 을 사용한 다중 턴 검색 및 추론 태스크에서 평균 **EM 점수 38.2%** 를 달성하여 최신 RL 베이스라인인 **Search-R1** 보다 **6%p** 높은 성능을 보였습니다. 이러한 성능 우위는 **7B 모델** 에서도 일관되게 나타났으며, INSPO는 더 많은 **유효한 도구 호출** 을 수행하고 **더 긴 프롬프트 길이** 로 진화하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM 기반 에이전트 시스템을 구축할 때 정적인 프롬프트 엔지니어링을 넘어 **동적으로 최적화되는 명령어 전략** 을 고려해야 합니다. INSPO는 에이전트 정책 학습 과정과 명령어를 함께 진화시키는 **"instruction-policy co-evolution"** 접근 방식이 더 강력하고 적응력 있는 에이전트 개발에 핵심적임을 보여줍니다. 특히 **실패 경험을 통한 LLM의 자기 성찰** 은 에이전트의 추론 경로를 전략적으로 개선하고 툴 사용 효율성을 극대화하는 데 유용하게 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.