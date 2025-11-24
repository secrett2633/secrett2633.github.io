---
title: "[논문리뷰] CAMAR: Continuous Actions Multi-Agent Routing"
excerpt: "Alexey Skrynnik이 [arXiv]에 게시한 'CAMAR: Continuous Actions Multi-Agent Routing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Reinforcement Learning
  - Continuous Control
  - Pathfinding
  - MARL Benchmark
  - GPU Acceleration
  - Robotics Simulation
  - Scalability
  - Heterogeneous Agents

permalink: /ai/review/2025-8-20-CAMAR-Continuous-Actions-Multi-Agent-Routing/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.12845)

**저자:** Artem Pshenitsyn, Aleksandr Panov, Alexey Skrynnik



## 핵심 연구 목표
이 논문은 기존 다중 에이전트 강화 학습(MARL) 벤치마크가 연속적인 상태 및 행동 공간, 복잡한 조정 및 계획 작업을 충분히 지원하지 못하는 한계를 해결하고자 합니다. 로봇 공학의 실제 응용 프로그램에 더 적합한, 고속의 사실적인 다중 에이전트 경로 찾기 환경 **CAMAR**를 제안하여 MARL 연구와 실제 다중 로봇 시스템 간의 격차를 해소하는 것을 목표로 합니다.

## 핵심 방법론
**CAMAR**는 **JAX 기반의 GPU 가속**을 활용하여 **초당 100,000단계 이상**의 시뮬레이션 속도를 달성하는 고성능 환경입니다. 에이전트의 원활한 움직임과 충돌 회피를 위해 **연속적인 상태 및 행동 공간**을 지원하며, **RRT (Rapidly-exploring Random Tree) 및 RRT\***와 같은 고전적인 경로 계획 방법론을 MARL 파이프라인에 통합할 수 있습니다. 또한, 알고리즘의 일반화 능력을 심층적으로 분석하기 위한 **3단계 평가 프로토콜**을 도입했습니다.

## 주요 결과
CAMAR는 **VMAS 대비 최대 20배 빠른 시뮬레이션 속도**를 제공하며, 특히 에이전트 수가 증가할 때 뛰어난 처리량을 보여줍니다. **800개 에이전트** 및 **4160개 장애물**의 극단적인 조건에서도 **초당 약 1400 SPS**를 유지하며 뛰어난 확장성을 입증했습니다. 평가에서 **RRT\*+MAPPO 및 RRT\*+IPPO**와 같은 하이브리드 방법론이 일부 시나리오에서 **기존 MARL 기준선보다 우수한 성능**을 보였으며, **MAPPO**가 MARL 기준선 중 가장 좋은 전반적인 성능을 달성했습니다.

## AI 실무자를 위한 시사점
CAMAR는 **연속적인 행동 공간**과 **GPU 가속**을 통해 실제 로봇 시스템에 더 가까운 환경에서 MARL 알고리즘을 개발하고 평가할 수 있는 고성능 플랫폼을 제공합니다. **RRT\*와 같은 고전적인 계획 방법론과의 통합 가능성**은 실무에서 **하이브리드 AI 시스템**을 설계할 때 유용한 통찰을 제공하며, 복잡한 경로 계획 문제 해결에 기여할 수 있습니다. 이 벤치마크는 **대규모 에이전트 시스템의 확장성**과 **이질적인 에이전트 간의 협업** 연구를 위한 강력한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.