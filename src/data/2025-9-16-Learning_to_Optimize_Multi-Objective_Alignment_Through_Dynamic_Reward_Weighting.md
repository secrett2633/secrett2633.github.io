---
title: "[논문리뷰] Learning to Optimize Multi-Objective Alignment Through Dynamic Reward
  Weighting"
excerpt: "Changlong Yu이 [arXiv]에 게시한 'Learning to Optimize Multi-Objective Alignment Through Dynamic Reward
  Weighting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-objective Reinforcement Learning
  - LLM Alignment
  - Dynamic Reward Weighting
  - Pareto Front Optimization
  - Hypervolume Indicator
  - Gradient-based Optimization
  - Online RL

permalink: /ai/review/2025-9-16-Learning_to_Optimize_Multi-Objective_Alignment_Through_Dynamic_Reward_Weighting/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11452)

**저자:** Yining Lu, Zilong Wang, Shiyang Li, Xin Liu, Changlong Yu, Qingyu Yin, Zhan Shi, Zixuan Zhang, Meng Jiang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 다중 목표 정렬(multi-objective alignment) 과정에서 고정된 보상 가중치 기반 선형 스칼라화 방식이 **비볼록 파레토 프론트(non-convex Pareto fronts)**를 포착하지 못하고 **준최적(suboptimal)** 결과를 초래하는 한계를 해결하고자 합니다. 특히, 정확도뿐만 아니라 간결성(conciseness) 및 명확성(clarity)과 같은 보조 목표들을 온라인 강화 학습(RL) 과정에서 동적으로 균형 있게 최적화하는 방법을 제안하여 효과적인 파레토 프론트 탐색을 목표로 합니다.

## 핵심 방법론
연구진은 동적 보상 가중치를 위한 두 가지 접근 방식을 제안합니다. 첫째, 사용자 선호도가 있을 때 **Hypervolume-guided weight adaptation (알고리즘 1)**은 **하이퍼볼륨 기여도(ΔHV)**를 기반으로 메타 보상 `r_pareto`를 사용하여 새로운 파레토 최적 솔루션을 발견하도록 정책을 유도합니다. 둘째, 사용자 선호도가 없을 때 **Gradient-based weight optimization (알고리즘 2)**은 각 목표의 학습 기여도를 **기울기 분석(gradient analysis)**을 통해 계산하고, 이를 기반으로 보상 가중치를 동적으로 재할당하는 업데이트 규칙 **(식 3)**을 사용합니다. 이 방법론들은 **GRPO, REINFORCE, RLOO**와 같은 다양한 온라인 RL 알고리즘과 호환됩니다.

## 주요 결과
**Hypervolume-guided** 방식은 **Math500** 데이터셋에서 **GRPO** 학습 시 정확도 중심 설정에서 기준선 대비 **0.832에서 0.850으로 정확도**를 향상시키는 등 대부분의 목표, 가중치 구성 및 RL 알고리즘에서 **고정 가중치 기준선**보다 뛰어난 성능을 보였습니다. **Gradient-based** 방식은 모든 기준선보다 **우수한 파레토 프론트**를 일관되게 생성했으며, 평균적으로 **6.1단계의 훈련 스텝을 단축**시켜 수렴 속도에서도 우위를 보였습니다. 특히, 간결성에 대한 가중치가 훈련 초기 빠르게 **약 0.2로 수렴**하는 반면, 정확도와 명확성 가중치는 지속적으로 증가하는 양상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 개발자들이 고정 가중치 방식의 한계를 극복하고 **동적 보상 가중치**를 활용하여 다중 목표(예: 정확도, 간결성, 명확성)를 동시에 최적화하는 **더 효율적이고 강력한 LLM**을 훈련할 수 있음을 시사합니다. **Hypervolume-guided** 방식은 사용자 선호도가 명확할 때, **Gradient-based** 방식은 선호도가 불분명할 때 적용 가능한 유연한 접근법을 제공하여 실제 AI 시스템 설계에 도움이 됩니다. 또한, **gradient-based** 방법은 **훈련 효율성을 개선**하여 개발 시간과 리소스를 절약할 수 있으며, 모든 모델이 모든 목표를 동시에 개선하기 어렵다는 발견은 **사전 훈련 단계에서 다중 목표 학습 능력**을 구축하는 것이 중요함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.