---
title: "[논문리뷰] GeRe: Towards Efficient Anti-Forgetting in Continual Learning of LLM via
  General Samples Replay"
excerpt: "Yang Fan이 [arXiv]에 게시한 'GeRe: Towards Efficient Anti-Forgetting in Continual Learning of LLM via
  General Samples Replay' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Continual Learning
  - Large Language Models (LLMs)
  - Catastrophic Forgetting
  - Replay
  - Knowledge Distillation
  - Activation States
  - Anti-forgetting
  - Threshold-based Margin Loss

permalink: /ai/review/2025-8-13-GeRe-Towards-Efficient-Anti-Forgetting-in-Continual-Learning-of-LLM-via-General-Samples-Replay/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04676)

**저자:** Yunan Zhang, Shuoran Jiang, Mengchen Zhao, Yuefeng Li, Yang Fan, Xiangping Wu, Qingcai Chen



## 핵심 연구 목표
대규모 언어 모델(LLM)의 연속 학습 시 발생하는 **파국적 망각(catastrophic forgetting)** 문제를 해결하는 것이 주된 목표입니다. 특히, LLM이 기존의 일반적인 능력과 이전에 학습한 하위 태스크에서의 성능을 동시에 유지하면서 새로운 태스크를 효율적이고 안정적으로 학습할 수 있는 방안을 모색합니다.

## 핵심 방법론
논문은 일반적인 사전 학습 텍스트를 활용하는 **General Sample Replay (GeRe)** 프레임워크를 제안합니다. 이 프레임워크 내에서 **Threshold-Based Margin (TM) Loss**를 도입하여, 일반 샘플의 신경망 **활성화 상태(activation states)** 일관성을 유지합니다. 이는 **오프라인 모드에서 추출된 히든 스테이트를 기반**으로 임계값을 설정하고, **활성화 상태를 이산적으로 분류**하여 최적화 목표로 사용합니다.

## 주요 결과
**GeRe 프레임워크**는 LLM의 일반적인 능력 유지와 순차적 태스크 성능 향상에 효과적임을 입증했습니다. 완전 파라미터 미세 조정 설정에서 **BaselineR+TM (w=100)**은 MMLU **60.7155**, 15 Tasks AP **74.0817**, F1 Avg **66.7359**를 달성하여 다른 리플레이 전략보다 우수한 성능을 보였습니다. **LoRA 설정**에서도 **BaselineR+TM (w=d.)**은 MMLU **66.2539**, 15 Tasks AP **64.4417**, F1 Avg **65.3352**로 높은 성능을 기록하며, **TM Loss**가 일관되게 성능을 향상시키고 더 나은 강건성을 나타냈습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 **효율적인 파국적 망각 방지**를 위한 실용적인 접근법을 제시합니다. 일반적인 사전 학습 텍스트를 재활용하는 **GeRe**는 기존의 노동 집약적인 태스크별 리플레이 샘플 수집 방식보다 훨씬 효율적입니다. **활성화 상태 일관성**을 통한 학습은 LLM의 일반화 능력을 보존하면서 새로운 태스크 학습을 촉진하므로, 대규모 LLM 기반 서비스의 지속적인 업데이트 및 유지보수에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.