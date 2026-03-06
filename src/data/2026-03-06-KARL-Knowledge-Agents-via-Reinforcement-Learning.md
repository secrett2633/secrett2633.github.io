---
title: "[논문리뷰] KARL: Knowledge Agents via Reinforcement Learning"
excerpt: "arXiv에 게시된 'KARL: Knowledge Agents via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Knowledge Agents
  - Enterprise Search
  - Grounded Reasoning
  - Multi-task Learning
  - Off-policy RL
  - Test-time Compute
  - Agentic Synthesis

permalink: /ai/review/2026-03-06-KARL-Knowledge-Agents-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05218)

**저자:** Databricks AI Research



## 핵심 연구 목표
본 논문은 기업 검색 에이전트가 복잡하고 검증하기 어려운 에이전트성 검색 태스크에서 **최첨단 성능** 을 달성하도록 **강화 학습** 을 통해 훈련하는 시스템인 **KARL** 을 제안합니다. 기존 모델들의 제한적인 일반화 능력을 극복하고, **비용-품질** 및 **지연시간-품질** 트레이드오프에서 **파레토-최적** 의 지식 에이전트를 개발하는 것이 목표입니다.

## 핵심 방법론
**KARLBench** 라는 6가지 검색 레짐을 아우르는 새로운 평가 스위트를 도입하여 모델 역량을 측정합니다. **Agentic Synthesis** 파이프라인을 통해 긴 호라이즌 추론과 도구 사용으로 다양하고 검증 가능한 고품질 훈련 데이터를 합성하며, 이는 점진적으로 역량이 향상되는 모델을 통해 부트스트래핑됩니다. 또한, **OAPL(Optimal Advantage-based Policy Optimization with Lagged Inference policy)** 이라는 샘플 효율적이고 강력한 **반-정책(off-policy) RL** 패러다임을 제안하여 OOD(Out-of-Distribution) 일반화가 가능한 다중-태스크 훈련을 가능하게 합니다. 추론 시 성능 향상을 위해 **Parallel Thinking** 및 **Value-Guided Search (VGS)** 와 같은 **테스트-시간 컴퓨팅(TTC) 스케일링** 전략을 활용합니다.

## 주요 결과
**KARL** 은 **Claude 4.6** 및 **GPT 5.2** 대비 KARLBench에서 **비용-품질** 및 **지연시간-품질** 측면에서 **파레토-최적** 의 성능을 달성했습니다. 충분한 테스트-시간 컴퓨팅을 사용하면 **Opus 4.6** 과 같은 최강의 클로즈드 모델과 동등한 성능을 보입니다. 특히 **GLM 4.5 Air** 대비 6점 이상 높은 점수를 기록하면서도 쿼리당 비용은 더 저렴했습니다. **BrowseComp-Plus** 태스크에서 **Iter. 2** 훈련 후 궤적 길이가 **50단계에서 20단계로** 단축되어 효율성이 크게 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 맞춤형 합성 데이터와 **멀티-태스크 강화 학습** 이 비용 효율적이고 고성능의 지식 에이전트를 구축하는 데 핵심적인 역할을 함을 보여줍니다. **OAPL 프레임워크** 는 온라인 RL의 복잡한 휴리스틱 없이도 대규모 모델을 안정적으로 훈련할 수 있어 RL 훈련 인프라 설계 복잡성을 크게 줄입니다. 또한 **테스트-시간 컴퓨팅 스케일링** 이 RL 훈련의 일반화 이점을 보완하여 실제 기업 환경에서 지식 에이전트의 배포 가능성을 높이는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.