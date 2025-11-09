---
title: "[논문리뷰] CostBench: Evaluating Multi-Turn Cost-Optimal Planning and Adaptation in
  Dynamic Environments for LLM Tool-Use Agents"
excerpt: "Shijue Huang이 [arXiv]에 게시한 'CostBench: Evaluating Multi-Turn Cost-Optimal Planning and Adaptation in
  Dynamic Environments for LLM Tool-Use Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Tool Use
  - Cost-Optimal Planning
  - Dynamic Environments
  - Benchmarking
  - Multi-Turn Interaction
  - Economic Reasoning

permalink: /ai/review/2025-11-6-CostBench_Evaluating_Multi-Turn_Cost-Optimal_Planning_and_Adaptation_in_Dynamic_Environments_for_LLM_Tool-Use_Agents/

toc: true
toc_sticky: true

date: 2025-11-09 21:54:30+0900
last_modified_at: 2025-11-09 21:54:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02734)

**저자:** Jiayu Liu, Cheng Qian, Zhaochen Su, Qing Zong, Shijue Huang, Bingxiang He, Yi R. (May) Fung



## 핵심 연구 목표
기존 LLM 에이전트 평가가 태스크 완료에만 집중하고 자원 효율성 및 동적 환경에서의 적응성을 간과하는 문제를 해결하는 것이 목표입니다. 이 연구는 **CostBench**라는 새로운 벤치마크를 통해, 동적 환경에서 LLM 에이전트의 다중 턴(multi-turn) 비용 최적 계획(cost-optimal planning) 및 적응 능력(adaptation ability)을 체계적으로 평가하고자 합니다.

## 핵심 방법론
**CostBench**는 여행 계획 도메인에서 다양한 비용과 동적 차단 이벤트(예: **도구 실패, 비용 변경, 사용자 선호도 변경, 도구 제거**)를 특징으로 하는 태스크를 제공합니다. 에이전트는 **원자 도구(atomic tools)** 및 **복합 도구(composite tools)**를 활용하여 목표를 달성하며, 모든 도구에는 무작위로 할당된 비용이 부여됩니다. **GPT-5, Gemini-2.5-Pro** 등 10개 선도 LLM을 대상으로 **Cost Gap, Average Normalized Edit Distance (ANED), Exact Match Ratio (EMR)** 등의 지표를 사용하여 정적 및 동적 조건에서 성능을 평가했습니다.

## 주요 결과
정적 환경에서조차 LLM은 비용 최적 계획에서 심각한 약점을 보였으며, 가장 어려운 태스크에서 **GPT-5**의 **EMR**은 **75% 미만**이었습니다. 동적 조건에서는 성능이 약 **40% 추가 하락**했으며, 특히 **비용 변경** 조건에서 **GPT-5**의 EMR은 **34.91%**까지 급락했습니다. 모델들은 비용 노이즈에 대한 높은 민감도를 나타냈는데, 노이즈가 증가할수록 오히려 성능이 향상되는 경향을 보여 비용 신호 처리에 대한 근본적인 한계를 드러냈습니다.

## AI 실무자를 위한 시사점
현재 LLM 에이전트는 복잡한 비용 최적 계획 및 동적 환경에서의 적응 능력 측면에서 큰 개선이 필요합니다. 특히 **진행 상황 인식 부족**과 **도구 종속성에 대한 이해 부족**은 중복되거나 논리적으로 일치하지 않는 도구 호출로 이어져 비효율을 초래합니다. **CostBench**는 이러한 약점을 진단하며, 실제 환경에서 경제적으로 합리적이고 견고하게 작동하는 차세대 LLM 에이전트 개발을 위한 중요한 프레임워크를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.