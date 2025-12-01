---
title: "[논문리뷰] Democratizing Diplomacy: A Harness for Evaluating Any Large Language
  Model on Full-Press Diplomacy"
excerpt: "Elizabeth Karpinski이 [arXiv]에 게시한 'Democratizing Diplomacy: A Harness for Evaluating Any Large Language
  Model on Full-Press Diplomacy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Diplomacy Game
  - Multi-agent Systems
  - Strategic Reasoning
  - LLM Evaluation
  - Prompt Engineering
  - Behavioral Analysis
  - Game AI

permalink: /ai/review/2025-8-13-Democratizing-Diplomacy-A-Harness-for-Evaluating-Any-Large-Language-Model-on-Full-Press-Diplomacy/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07485)

**저자:** Alexander Duffy, Samuel J Paech, Ishana Shastri, Elizabeth Karpinski, Baptiste Alloui-Cros, Tyler Marques, Matthew Lyle Olson



## 핵심 연구 목표
본 연구는 **복잡한 전략적 추론 능력** 을 요구하는 외교(Diplomacy) 게임에서 LLM을 평가하는 기존 방식의 높은 복잡성과 한계를 해결하고자 합니다. 특히 **미세 조정이나 전문적인 훈련 없이** 모든 **상용, 로컬 LLM** 이 풀-프레스 디플로머시 게임을 플레이할 수 있는 최초의 평가 하네스를 구축하여, LLM의 내재된 전략적 역량을 탐구하고 평가의 민주화를 목표로 합니다.

## 핵심 방법론
연구팀은 **Python Diplomacy 게임 엔진** 을 기반으로, 게임 상태를 **문맥적으로 풍부한 텍스트 표현** 으로 변환하는 다단계 변환을 적용했습니다. **Critical State Analysis (CSA)** 프레임워크를 활용하여 프롬프트 최적화 및 가설 테스트를 효율화했으며, **16개의 다양한 LLM** 을 대상으로 20회 게임을 실행하여 성능을 측정했습니다. 특히 **프롬프트 엔지니어링** ( **V1-V3 공격적 프롬프트** )을 통해 모델의 행동을 조정하고, **Game Score** 와 같은 정량적 지표 및 **LLM-as-a-judge** 를 활용한 신뢰성 평가를 수행했습니다.

## 주요 결과
개발된 하네스는 **24B 파라미터 모델** 도 게임당 약 **$1** 의 비용으로 전체 디플로머시 게임을 완수할 수 있게 하여 평가 비용을 크게 낮췄습니다. 더 큰 모델이 더 나은 성능을 보였지만, **Mistral-Small-3.2-24B** 와 같은 작은 모델도 데이터 기반 프롬프트 최적화( **V3 프롬프트** )를 통해 홀드(hold) 명령 비율을 **58.9%에서 24.1%** 로 대폭 줄이는 등 유의미한 성능 향상을 보였습니다. 모델들은 고유한 행동 양식과 전략적 적응성을 나타냈으며, **Gemini-2.5-Pro** 와 **Deepseek-R1** 이 설득에 가장 능숙한 모델로 나타났습니다.

## AI 실무자를 위한 시사점
이 연구는 **미세 조정 없이도** 범용 LLM이 복잡한 전략 게임을 플레이할 수 있음을 보여주어, LLM의 전략적 추론 능력이 **자연스럽게 발현** 된다는 중요한 통찰을 제공합니다. 특히 **모델 크기가 전략적 성능에 비례** 하지만, 그 차이가 전통적인 NLP 벤치마크보다 작다는 점은 전략적 능력이 상대적으로 낮은 스케일에서도 발현될 수 있음을 시사합니다. 또한, **기만적 전략** 이 AI 간 상호작용에서 효과적임이 드러나, **다중 에이전트 AI 시스템** 설계 시 **견고한 명령 준수 메커니즘** 의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.