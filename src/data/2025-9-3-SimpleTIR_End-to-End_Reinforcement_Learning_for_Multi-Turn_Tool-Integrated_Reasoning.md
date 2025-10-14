---
title: "[논문리뷰] SimpleTIR: End-to-End Reinforcement Learning for Multi-Turn
  Tool-Integrated Reasoning"
excerpt: "Qian Liu이 [arXiv]에 게시한 'SimpleTIR: End-to-End Reinforcement Learning for Multi-Turn
  Tool-Integrated Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Tool-Integrated Reasoning
  - Multi-turn Reasoning
  - Gradient Explosion
  - Training Stability
  - Trajectory Filtering
  - Zero RL

permalink: /ai/review/2025-9-3-SimpleTIR_End-to-End_Reinforcement_Learning_for_Multi-Turn_Tool-Integrated_Reasoning/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02479)

**저자:** Zhenghai Xue, Longtao Zheng, Qian Liu, Yingru Li, Xiaosen Zheng, Zejun Ma, Bo An



## 핵심 연구 목표
본 논문은 Reinforcement Learning (RL)을 사용하여 Multi-turn Tool-Integrated Reasoning (TIR)을 수행하는 Large Language Models (LLMs)의 훈련 시 발생하는 불안정성, 특히 **그래디언트 폭발**과 **성능 저하** 문제를 해결하는 것을 목표로 합니다. 외부 도구 피드백으로 인한 **분포 불일치**와 그로 인해 발생하는 **낮은 확률 토큰**의 누적이 핵심 원인임을 진단하고 이를 해결하고자 합니다.

## 핵심 방법론
저자들은 **SimpleTIR**이라는 플러그 앤 플레이 알고리즘을 제안합니다. 이 방법론은 LLM 응답이 완전한 코드 블록이나 최종 답변을 포함하지 않는 "void turns"를 포함하는 궤적을 식별하고, 해당 궤적을 정책 업데이트에서 **필터링**하여 제거함으로써 불안정한 **높은 그래디언트**의 전파를 차단합니다. 이는 **Hierarchical MDP** 프레임워크와 **Group Relative Policy Optimization (GRPO)**을 기반으로 합니다.

## 주요 결과
**SimpleTIR**는 도전적인 수학 추론 벤치마크에서 최첨단 성능을 달성했습니다. 특히 **Qwen2.5-7B** 기본 모델을 시작점으로 했을 때, **AIME24 점수를 텍스트 전용 baseline의 22.1점에서 50.5점으로** 크게 향상시켰습니다. 또한, **Qwen2.5-32B** 모델에서는 **AIME24 59.9점**을 기록하며 기존의 모든 Zero RL baseline을 능가했으며, 훈련 중 **그래디언트 노름**이 안정적으로 유지되었습니다.

## AI 실무자를 위한 시사점
**SimpleTIR**는 Multi-turn TIR 시스템의 훈련 안정성을 획기적으로 개선하여, LLM 기반 에이전트 개발자들이 도구를 반복적으로 사용하여 복잡한 문제를 해결할 수 있도록 지원합니다. **Zero RL** 접근 방식을 통해 모델이 **자기 수정**이나 **교차 검증**과 같은 다양하고 정교한 추론 패턴을 스스로 발견하도록 장려하며, 이는 수작업으로 라벨링된 데이터셋에 대한 의존도를 줄일 수 있는 중요한 진전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.