---
title: "[논문리뷰] One Life to Learn: Inferring Symbolic World Models for Stochastic
  Environments from Unguided Exploration"
excerpt: "Mohit Bansal이 [arXiv]에 게시한 'One Life to Learn: Inferring Symbolic World Models for Stochastic
  Environments from Unguided Exploration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Symbolic World Models
  - Stochastic Environments
  - Unguided Exploration
  - Probabilistic Programming
  - Law Synthesis
  - Crafter-OO
  - Program Synthesis

permalink: /ai/review/2025-10-15-One_Life_to_Learn_Inferring_Symbolic_World_Models_for_Stochastic_Environments_from_Unguided_Exploration/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12088)

**저자:** Zaid Khan, Archiki Prasad, Elias Stengel-Eskin, Jaemin Cho, Mohit Bansal



## 핵심 연구 목표
본 논문은 복잡하고 확률적인 환경에서 제한된 상호작용 예산("one life")과 인간의 보상/목표와 같은 외부 안내 없이 기호적 월드 모델을 학습하는 어려운 문제를 해결하는 것을 목표로 합니다. 이전 연구들이 주로 결정론적 환경, 풍부한 데이터, 인간의 지시에 의존했던 한계를 극복하고자 합니다.

## 핵심 방법론
제안된 프레임워크인 **ONELIFE**는 **확률적 프로그래밍** 내에서 **조건부 활성화되는 프로그램적 법칙**을 통해 월드 동역학을 모델링합니다. 각 법칙은 **전제조건-효과 구조**를 가지며, **그래디언트 기반 추론 알고리즘**이 현재 상태와 예측된 다음 상태 간의 변화에 관련 있는 활성 법칙에 대해서만 가중치를 업데이트합니다. 데이터 수집을 위해 **LLM 기반의 자율 탐색 정책**을 사용하고, **원자적 법칙 합성기**를 통해 관찰된 전환을 설명하는 단순하고 모듈화된 법칙을 제안합니다.

## 주요 결과
**ONELIFE**는 테스트된 23개 시나리오 중 16개에서 강력한 베이스라인인 **PoE-World (Piriyakulkij et al., 2025)**를 능가하는 성능을 보였습니다. 특히, 상태 랭킹 지표에서 **18.7%의 Rank@1 정확도**와 **0.479의 Mean Reciprocal Rank (MRR)**를 달성하여, **PoE-World 대비 Rank@1에서 7.9%p, MRR에서 0.128** 개선을 이루었습니다. 또한, 학습된 월드 모델 내에서 시뮬레이션된 롤아웃을 통해 목표 지향적 태스크에서 실제 환경과 동일한 계획 랭킹을 성공적으로 예측했습니다.

## AI 실무자를 위한 시사점
**ONELIFE**는 기존의 한계를 넘어 인간의 개입 없이 복잡하고 확률적인 환경에서 해석 가능한 기호적 월드 모델을 자율적으로 구축할 수 있는 가능성을 제시합니다. 이는 AI 에이전트가 알려지지 않은 환경의 규칙을 **역설계**하고, 예측 가능한 **프로그램적 모델**을 기반으로 효과적인 계획을 수립할 수 있는 기반을 마련합니다. **Crafter-OO**와 같은 구조화된 객체 지향 환경은 향후 기호적 강화 학습 연구를 위한 중요한 테스트베드 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.