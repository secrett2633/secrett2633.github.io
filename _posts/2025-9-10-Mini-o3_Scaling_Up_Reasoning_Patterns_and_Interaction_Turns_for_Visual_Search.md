---
title: "[논문리뷰] Mini-o3: Scaling Up Reasoning Patterns and Interaction Turns for Visual
  Search"
excerpt: "Tianjian Li이 [arXiv]에 게시한 'Mini-o3: Scaling Up Reasoning Patterns and Interaction Turns for Visual
  Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Search
  - Multi-Turn Reasoning
  - Reinforcement Learning
  - Tool-Integrated Agents
  - Exploratory Reasoning
  - Data Augmentation
  - Over-turn Masking
  - Visual Language Models

permalink: /ai/review/2025-9-10-Mini-o3_Scaling_Up_Reasoning_Patterns_and_Interaction_Turns_for_Visual_Search/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07969)

**저자:** Xin Lai, Junyi Li, Wei Li, Tao Liu, Tianjian Li, Hengshuang Zhao



## 핵심 연구 목표
기존 오픈소스 VLM(Vision-Language Model)의 단조로운 추론 패턴과 제한된 상호작용 턴 수로 인해 **시행착오적 탐색**이 필요한 어려운 시각 검색 작업을 해결하지 못하는 문제를 다룹니다. 본 연구는 **Mini-o3**라는 시스템을 통해 도구 기반 상호작용을 확장하고, 수십 턴에 달하는 **심층적인 다중 턴 추론**을 수행하여 이러한 난이도 높은 시각 검색 작업에서 **최첨단 성능**을 달성하는 것을 목표로 합니다.

## 핵심 방법론
Mini-o3는 세 가지 핵심 구성 요소로 구현됩니다. 첫째, 탐색적 추론을 위해 고안된 수천 개의 시각 검색 문제로 구성된 **Visual Probe Dataset**을 구축했습니다. 둘째, **콜드 스타트(cold-start) 지도 미세 조정**을 위해 다양한 추론 패턴(예: 깊이 우선 탐색, 시행착오)을 보여주는 다중 턴 궤적을 반복적으로 수집하는 파이프라인을 개발했습니다. 셋째, **강화 학습(RL) 과정**에서 **오버턴 마스킹(over-turn masking) 전략**을 도입하여, 최대 턴 수에 도달한 응답에 대한 페널티를 방지함으로써 훈련 효율성과 테스트 시간 확장성을 균형 있게 조절합니다.

## 주요 결과
Mini-o3는 **VisualProbe-Hard 벤치마크**에서 **48.0%의 정확도**를 달성하여 기존 **DeepEyes의 35.1%**를 크게 능가하는 등, 모든 시각 검색 데이터셋에서 **최첨단 성능**을 기록했습니다. 훈련 시 **단 6턴**으로 상한선을 두었음에도 불구하고, 추론 시 상호작용 턴 수가 **4턴에서 32턴으로 증가함에 따라 정확도가 지속적으로 향상**되는 **테스트 시간 턴 확장성**을 입증했습니다. 특히, 오버턴 마스킹 전략은 이러한 **테스트 시간 스케일링**에 필수적임이 밝혀졌습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 시각 검색 문제를 해결하기 위한 **다중 턴 추론 기반 에이전트** 구축의 실용적인 지침을 제공합니다. **도전적인 데이터셋**의 중요성과 **콜드 스타트 SFT(Supervised Fine-Tuning)**를 통한 다양한 추론 패턴 활성화, 그리고 **RL의 마스킹 전략**이 모델의 확장성에 미치는 긍정적인 영향을 강조합니다. 제한된 훈련 예산으로도 추론 시 심층적인 추론 능력을 발휘할 수 있는 **멀티모달 모델 개발**의 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.