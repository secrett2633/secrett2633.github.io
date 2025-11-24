---
title: "[논문리뷰] ACON: Optimizing Context Compression for Long-horizon LLM Agents"
excerpt: "이 [arXiv]에 게시한 'ACON: Optimizing Context Compression for Long-horizon LLM Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Context Compression
  - Long-horizon Tasks
  - Prompt Optimization
  - Knowledge Distillation
  - Memory Efficiency
  - Task Performance
  - Failure Analysis

permalink: /ai/review/2025-10-2-ACON-Optimizing-Context-Compression-for-Long-horizon-LLM-Agents/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00615)

**저자:** Minki Kang, Wei-Ning Chen, Dongge Han, Huseyin A. Inan, Lukas Wutschitz, Yanzhi Chen, Robert Sim, Saravan Rajmohan



## 핵심 연구 목표
본 논문은 **장기(long-horizon) LLM 에이전트 태스크**에서 발생하는 **컨텍스트 길이 증가 문제**를 해결하고자 합니다. 상호작용 기록 및 환경 관찰을 최적으로 압축하여, **추론 비용**과 **메모리 사용량**을 줄이면서도 에이전트의 **태스크 성능**을 유지하거나 향상시키는 통합 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Agent Context Optimization (ACON)** 프레임워크는 자연어 공간에서 **압축 가이드라인을 최적화**하는 파이프라인을 도입합니다. 이는 압축된 컨텍스트로 실패하고 전체 컨텍스트로 성공한 궤적을 비교하는 **대조 태스크 피드백(contrastive task feedback)** 기반의 **실패 분석**을 통해 이루어집니다. 추가적으로, 최적화된 압축기는 **지식 증류(knowledge distillation)**를 통해 **Qwen3-14B, Qwen3-8B, Phi-4**와 같은 **작은 모델**로 전환되어 추가 모듈의 오버헤드를 줄입니다.

## 주요 결과
ACON은 **AppWorld, OfficeBench, Multi-objective QA** 벤치마크에서 **메모리 사용량(최대 토큰)**을 **26-54%** 감소시키면서도 **gpt-4.1**과 같은 대규모 LLM의 태스크 성능을 크게 보존합니다. 특히, 증류된 압축기는 **원본 모델 정확도의 95% 이상**을 유지하며, 소규모 LLM 에이전트의 장기 태스크 성능을 **최대 46%**까지 향상시키는 것을 확인했습니다.

## AI 실무자를 위한 시사점
ACON은 LLM 에이전트의 **운영 비용**을 효율적으로 절감하고 **장기 태스크의 신뢰성**을 높이는 실용적인 해결책을 제시합니다. **자연어 프롬프트 기반의 최적화**는 모델 파라미터 조정 없이 다양한 LLM에 적용 가능하여 높은 유연성을 제공하며, **작은 모델로의 증류**는 리소스 제약이 있는 환경에서도 고성능 에이전트 배포를 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.