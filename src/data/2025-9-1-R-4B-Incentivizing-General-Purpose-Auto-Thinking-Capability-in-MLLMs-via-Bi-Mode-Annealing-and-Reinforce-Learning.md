---
title: "[논문리뷰] R-4B: Incentivizing General-Purpose Auto-Thinking Capability in MLLMs
  via Bi-Mode Annealing and Reinforce Learning"
excerpt: "Han Hu이 [arXiv]에 게시한 'R-4B: Incentivizing General-Purpose Auto-Thinking Capability in MLLMs
  via Bi-Mode Annealing and Reinforce Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Auto-Thinking
  - Reinforcement Learning (RL)
  - Bi-mode Annealing
  - Bi-mode Policy Optimization (BPO)
  - General-Purpose AI
  - Reasoning
  - Efficiency

permalink: /ai/review/2025-9-1-R-4B-Incentivizing-General-Purpose-Auto-Thinking-Capability-in-MLLMs-via-Bi-Mode-Annealing-and-Reinforce-Learning/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21113)

**저자:** Han Hu, Shiming Xiang, Bolin Ni, Qi Yang, Jie Jiang



## 핵심 연구 목표
본 논문은 복잡한 추론 문제에서 뛰어난 성능을 보이는 기존 MLLM의 step-by-step 사고(thinking) 과정이 단순 문제에서는 불필요한 연산 오버헤드를 유발하는 비효율성을 해결하고자 합니다. 이를 위해 문제 복잡도에 따라 사고 모드 활성화 여부를 **자동으로 결정** 하는 **일반 목적 자동 사고(auto-thinking) MLLM인 R-4B** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
R-4B는 모델에 사고(thinking) 및 비사고(non-thinking) 기능을 모두 부여하기 위해 **bi-mode annealing** 기법을 제안합니다. 이 과정에서 추론 및 비추론 데이터셋을 통합된 명령-수행 구조로 큐레이션하여 훈련하며, 이후 **Bi-mode Policy Optimization (BPO)** 라는 강화 학습 알고리즘을 적용합니다. BPO는 **bi-mode rollouts** 를 통해 사고 및 비사고 응답 궤적을 동시에 생성하도록 강제함으로써 "모드 붕괴(mode collapse)"를 방지하고 적응형 정책을 학습합니다.

## 주요 결과
**R-4B-RL** 은 **25개 벤치마크** 에서 최첨단 성능을 달성하며, 대부분의 태스크에서 **Qwen2.5-VL-7B** 를 능가했습니다. 특히 **MMMUval** 에서 **68.1%** , **CharXIV (RQ)** 에서 **56.8%** , **MathVerse-vision** 에서 **64.9%** 를 기록했으며, **Kimi-VL-A3B-Thinking-2506 (16B)** 과 같은 대규모 모델과 유사한 추론 성능을 더 낮은 연산 비용으로 달성했습니다. 또한, **OCRBench** 에서는 **57개 토큰** 을 사용하는 반면, **MathVista/WeMath** 와 같은 추론 집약적 벤치마크에서는 **996~1278개 토큰** 을 동적으로 생성하여 효율성과 성능 사이의 최적의 균형을 보여주었습니다.

## AI 실무자를 위한 시사점
R-4B는 AI/ML 엔지니어에게 MLLM을 실제 배포할 때 **연산 효율성을 크게 개선** 할 수 있는 실용적인 방안을 제시합니다. 모델이 태스크 복잡성에 따라 추론 깊이를 동적으로 조절할 수 있으므로, 단순한 질의에는 빠른 응답을, 복잡한 질의에는 심층적인 추론을 제공하여 **자원 활용을 최적화** 할 수 있습니다. **bi-mode annealing 및 BPO 프레임워크** 는 복잡한 보상 설계나 광범위한 수동 주석 없이도 적응형 MLLM을 훈련하는 강력한 방법을 제공하여, 확장성 있는 AI 시스템 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.