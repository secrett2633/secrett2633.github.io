---
title: "[논문리뷰] A^2FM: An Adaptive Agent Foundation Model for Tool-Aware Hybrid
  Reasoning"
excerpt: "이 [arXiv]에 게시한 'A^2FM: An Adaptive Agent Foundation Model for Tool-Aware Hybrid
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adaptive Agent
  - Foundation Model
  - Hybrid Reasoning
  - Tool-Aware LLM
  - Mode Selection
  - Reinforcement Learning
  - Cost Efficiency
  - LLM Agent

permalink: /ai/review/2025-10-20-A2FM-An-Adaptive-Agent-Foundation-Model-for-Tool-Aware-Hybrid-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12838)

**저자:** OPPO AI Agent Team



## 핵심 연구 목표
이 논문은 추론 중심 LLM(도구 사용 불가)과 에이전트 중심 LLM(추론 능력 부족) 간의 근본적인 격차를 해결하고자 합니다. 기존 LLM들이 단순 질의에 대해 불필요하게 과도한 추론이나 도구 호출을 수행하는 비효율성을 해소하며, 단일 백본 아래에서 에이전틱, 추론, 인스턴트 세 가지 모드를 통합하여 정확도와 효율성의 균형을 맞추는 **적응형 에이전트 파운데이션 모델(A²FM)**을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**A²FM**은 "경로 지정 후 정렬(route-then-align)" 원칙을 따르는 2단계 프로세스를 제안합니다. **1단계: 경로 지정 후 정렬 미세 조정**에서는 모델이 작업 인지 경로 지정을 학습하고 모드별 궤적을 정렬하며, 단순 질의를 직접 처리하는 **인스턴트 모드**를 도입합니다. **2단계: 적응형 정책 최적화(APO)**는 강화 학습을 통해 모드 선택을 최적화하고, 적응형 샘플링 및 비용 정규화 보상(LLM-as-Judge **Mj** 활용)을 적용하여 정확도와 효율성의 균형을 맞춥니다. 백본으로는 **Qwen2.5-32B-Instruct** 모델을 사용합니다.

## 주요 결과
**A²FM**은 에이전틱, 추론, 일반 벤치마크 전반에서 최첨단 성능을 달성했습니다. BrowseComp에서 **13.4%**, AIME25에서 **70.4%(새로운 SOTA)**, HLE에서 **16.7%**를 기록했습니다. 특히 적응형 실행은 SuperGPQA에서 정답당 통과 비용이 **$0.00487**에 불과하여, 추론 모드 대비 **45.2%**, 에이전틱 모드 대비 **33.5%**의 비용 절감 효과를 보여주면서도 유사한 정확도를 유지했습니다.

## AI 실무자를 위한 시사점
**A²FM**은 다양한 LLM 기능(추론, 도구 사용, 직접 응답)을 단일 모델에 통합하는 실용적인 방법을 제시합니다. 이는 AI 엔지니어가 비용 효율적인 방식으로 복잡한 문제와 단순 질의를 모두 처리할 수 있는 다재다능한 LLM 에이전트를 개발하는 데 중요한 기여를 합니다. 특히, **적응형 모드 선택**을 통한 상당한 비용 절감은 실제 LLM 애플리케이션의 경제성을 크게 향상시킬 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.