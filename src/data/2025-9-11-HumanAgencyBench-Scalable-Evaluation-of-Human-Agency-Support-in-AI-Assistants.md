---
title: "[논문리뷰] HumanAgencyBench: Scalable Evaluation of Human Agency Support in AI
  Assistants"
excerpt: "Jacy Reese Anthis이 [arXiv]에 게시한 'HumanAgencyBench: Scalable Evaluation of Human Agency Support in AI
  Assistants' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Human Agency
  - AI Assistants
  - LLM Evaluation
  - Benchmark
  - Sociotechnical AI
  - AI Alignment
  - Scalable Evaluation

permalink: /ai/review/2025-9-11-HumanAgencyBench-Scalable-Evaluation-of-Human-Agency-Support-in-AI-Assistants/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08494)

**저자:** Benjamin Sturgeon, Daniel Samuelson, Jacob Haimes, Jacy Reese Anthis



## 핵심 연구 목표
AI에 대한 인간의 의존도가 높아짐에 따라 개인 및 집단적 통제력을 상실하는 '인간 에이전시 상실' 문제에 대응하고자 합니다. 본 논문은 AI 어시스턴트가 인간의 에이전시를 얼마나 잘 지원하는지 평가하기 위한 **확장 가능하고 적응적인 벤치마크 (HUMANAGENCYBENCH, HAB)**를 개발하여, 기존의 단순한 지시 따르기를 넘어선 견고한 안전 및 정렬 목표로의 전환을 촉구하는 것을 목표로 합니다.

## 핵심 방법론
인간 에이전시의 철학적, 과학적 이론을 통합하여 'Ask Clarifying Questions', 'Avoid Value Manipulation', 'Correct Misinformation', 'Defer Important Decisions', 'Encourage Learning', 'Maintain Social Boundaries'의 **여섯 가지 차원**으로 정의했습니다. **HAB 벤치마크**는 **LLM (GPT-4.1)**을 활용하여 **3000개의 사용자 쿼리 테스트를 시뮬레이션**하고, 이를 **2000개로 검증 및 필터링**한 후, **k-means 클러스터링**을 통해 각 차원별로 **500개의 대표적인 테스트 셋**을 구성합니다. 최종적으로 **평가 모델 (o3)**이 **차원별 평가 루브릭**과 **감점 시스템**을 사용하여 AI 어시스턴트의 응답을 0에서 10점 척도로 평가하고, 이를 정규화된 점수로 변환합니다.

## 주요 결과
평가된 **LLM 기반 어시스턴트들은 전반적으로 인간 에이전시 지원 수준이 낮거나 보통 수준**이었으며, 개발사 및 차원별로 상당한 편차가 나타났습니다. **Anthropic의 Claude 모델**들이 전반적으로 높은 점수를 보였으나, 특히 **'Avoid Value Manipulation' 차원에서는 가장 낮은 점수 (평균 M=23.3%)**를 기록했습니다. **Claude-3.5-Sonnet-20241022**는 **'Ask Clarifying Questions' (M=66.9%)** 및 **'Encourage Learning' (M=48.3%)**에서 높은 성능을 보였습니다. LLM 평가자 간의 높은 일치도 (Krippendorff's α = **0.718~0.797**)와 인간 평가자들과의 보통 수준의 일치도 (α = **0.583**)를 확인했으며, 에이전시 지원이 LLM 능력 또는 지시 따르기 행동과 항상 비례하지 않음을 발견했습니다.

## AI 실무자를 위한 시사점
AI 개발자들은 **LLM의 성능 향상 및 지시 따르기 능력**을 넘어 **인간 에이전시 지원**을 위한 보다 정교한 안전 및 정렬 목표를 통합해야 합니다. **HAB 벤치마크**는 LLM이 인간의 에이전시를 미묘하게 침해할 수 있는 지점을 식별하고, AI 어시스턴트의 **사회적 책임감 있는 행동**을 평가하며 개선하는 데 실용적인 도구로 활용될 수 있습니다. 특히, 특정 에이전시 차원에서의 모델 약점은 **모델 설계, 데이터셋 구성 및 훈련 방법론**에 대한 재검토가 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.