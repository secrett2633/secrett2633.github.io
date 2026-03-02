---
title: "[논문리뷰] MobilityBench: A Benchmark for Evaluating Route-Planning Agents in Real-World Mobility Scenarios"
excerpt: "arXiv에 게시된 'MobilityBench: A Benchmark for Evaluating Route-Planning Agents in Real-World Mobility Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Route Planning Agents
  - Benchmarking
  - Real-World Mobility
  - API Replay Sandbox
  - Multi-dimensional Evaluation
  - Tool-augmented Agents

permalink: /ai/review/2026-02-27-MobilityBench-A-Benchmark-for-Evaluating-Route-Planning-Agents-in-Real-World-Mobility-Scenarios/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22638)

**저자:** Zhiheng Song, Jingshuai Zhang, Chuan Qin, Chao Wang, Chao Chen, Longfei Xu, Kaikui Liu, Xiangxiang Chu, Hengshu Zhu



## 핵심 연구 목표
본 논문은 다양한 라우팅 요구, 비결정론적 매핑 서비스, 제한된 재현성으로 인해 복잡한 실세계 모빌리티 시나리오에서 **LLM 기반 경로 계획 에이전트** 의 체계적인 평가가 어렵다는 문제를 해결하고자 합니다. 이를 위해 확장 가능하고 재현 가능한 평가를 가능하게 하는 새로운 벤치마크인 **MobilityBench** 를 소개하는 것을 목표로 합니다.

## 핵심 방법론
**MobilityBench** 는 **Amap** 에서 수집된 대규모 익명 사용자 쿼리를 기반으로 구축되었으며, **11가지 태스크 시나리오** 로 구성된 포괄적인 태스크 분류 체계를 포함합니다. 재현 가능한 종단 간 평가를 위해 실시간 서비스의 환경적 변동을 제거하는 **결정론적 API-재현 샌드박스** 를 설계했습니다. 또한, 결과 유효성에 중점을 둔 **다차원 평가 프로토콜** 을 제안하여 지침 이해, 계획, 도구 사용, 의사 결정 및 효율성 측면에서 에이전트 성능을 평가합니다.

## 주요 결과
평가 결과, **Claude-Opus-4.5** 는 **Plan-and-Execute** 프레임워크에서 가장 높은 **83.53%의 Delivery Rate** 와 **65.77%의 Final Pass Rate** 를 달성했습니다. **Gemini-3-Pro-Preview** 는 **ReAct** 프레임워크에서 가장 높은 **69.09%의 FPR** 을 기록했습니다. 현재 모델들은 기본적인 정보 검색 및 경로 계획 태스크에서는 유능하지만, **선호도 제약 경로 계획** 에서는 상당한 개선이 필요한 것으로 나타났습니다. **ReAct** 는 **Plan-and-Execute** 대비 평균 **35.38% 더 많은 입력 토큰** 을 소모하며 계산 비용이 높습니다.

## AI 실무자를 위한 시사점
**MobilityBench** 는 AI/ML 실무자들이 **LLM 기반 경로 계획 에이전트** 의 실제 성능을 평가하고, 다양한 모델과 에이전트 프레임워크를 공정하게 비교할 수 있는 표준화된 환경을 제공합니다. 특히, **선호도 제약이 있는 복잡한 모빌리티 시나리오** 에서 LLM 에이전트의 현재 한계를 명확히 보여주어, 이 분야의 연구 및 개발 방향을 제시합니다. **ReAct** 와 **Plan-and-Execute** 같은 프레임워크 간의 성능 및 계산 비용 **(예: 토큰 사용량)** 트레이드오프는 실시간 프로덕션 시스템 설계 시 중요한 고려사항입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.