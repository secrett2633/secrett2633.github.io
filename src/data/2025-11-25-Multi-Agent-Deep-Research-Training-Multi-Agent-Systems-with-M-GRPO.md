---
title: "[논문리뷰] Multi-Agent Deep Research: Training Multi-Agent Systems with M-GRPO"
excerpt: "이 [arXiv]에 게시한 'Multi-Agent Deep Research: Training Multi-Agent Systems with M-GRPO' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - Reinforcement Learning
  - LLM Training
  - Hierarchical Credit Assignment
  - Trajectory Alignment
  - Group Relative Policy Optimization
  - Tool-Augmented Reasoning
  - Vertical Architecture

permalink: /ai/review/2025-11-25-Multi-Agent-Deep-Research-Training-Multi-Agent-Systems-with-M-GRPO/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13288)

**저자:** Haoyang Hong, Jiajun Yin, Yuan Wang, Jingnan Liu, Zhe Chen, Ailing Yu, Ji Li, Zhiling Ye, Hansong Xiao, Yefei Chen, Hualei Zhou, Yun Yue, Minghui Yang, Chunxiao Guo, Junwei Liu, Peng Wei, Jinjie Gu (Ant Group & Imperial College London)



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 멀티 에이전트 시스템이 특정 도메인에서 비일관적인 성능을 보이는 문제를 해결하고자 합니다. 특히, 에이전트별로 다른 LLM을 훈련할 때 발생하는 비동기적 작업 빈도, 가변적인 서브 에이전트 호출, 분산 환경에서의 기울기 흐름(gradient flow) 방해와 같은 최적화 난제를 극복하고, 수직적 멀티 에이전트 아키텍처에서 안정적이고 효율적인 훈련 프레임워크를 제공하는 것이 목표입니다.

## 핵심 방법론
논문은 수직적 멀티 에이전트 시스템을 위한 강화 학습 프레임워크인 **M-GRPO(Multi-Agent Group Relative Policy Optimization)**를 제안합니다. 이 방법론은 **Group Relative Policy Optimization**을 계층적 설정으로 확장하여 메인 에이전트와 서브 에이전트 모두에 대해 **그룹-상대적 이점(group-relative advantages)**을 계산하고, 계층적 신용 할당을 유지합니다. 또한, 롤아웃당 가변적인 서브 에이전트 호출 횟수를 처리하기 위해 **Trajectory Alignment** 기법을 도입하여 고정 크기 배치를 생성하고, **분리된 훈련 파이프라인**을 통해 교차 서버 역전파 없이 확장 가능한 훈련을 가능하게 합니다.

## 주요 결과
**M-GRPO**는 **GAIA**, **XBench-DeepSearch**, **WebWalkerQA**와 같은 실제 벤치마크에서 단일 에이전트 **GRPO** 및 고정된 서브 에이전트를 사용하는 멀티 에이전트 시스템보다 **일관되게 우수한 성능**을 보였습니다. 특히, 공동 훈련(메인 및 서브 에이전트 모두 업데이트)이 메인 에이전트만 훈련하거나 단일 에이전트 시스템보다 높은 보상을 달성했으며, **Trajectory Alignment**는 훈련 안정성 및 협업 학습 효율성을 향상시켰습니다.

## AI 실무자를 위한 시사점
**M-GRPO**는 복잡한 도구-증강(tool-augmented) LLM 에이전트 시스템을 훈련하기 위한 효과적인 프레임워크를 제공하여, 실제 AI 애플리케이션 개발에 중요한 기여를 합니다. **분리된 훈련 파이프라인**과 **Trajectory Alignment**는 분산된 이질적 에이전트 시스템의 **확장 가능하고 안정적인 훈련**을 가능하게 하여 대규모 시스템 구축에 실용적인 이점을 제공합니다. 이는 복잡한 문제 해결을 위해 전체 시스템의 파라미터를 함께 최적화하는 것이 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.