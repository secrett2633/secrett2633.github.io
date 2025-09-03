---
title: "[논문리뷰] Reasoning Vectors: Transferring Chain-of-Thought Capabilities via Task
  Arithmetic"
excerpt: "Bernard Ghanem이 [arXiv]에 게시한 'Reasoning Vectors: Transferring Chain-of-Thought Capabilities via Task
  Arithmetic' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reasoning Vectors
  - Task Arithmetic
  - Chain-of-Thought
  - LLMs
  - Reinforcement Learning
  - Model Merging
  - Parameter Transfer

permalink: /ai/review/2025-9-3-Reasoning_Vectors_Transferring_Chain-of-Thought_Capabilities_via_Task_Arithmetic/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01363)

**저자:** Mohammad Zbeeb, Hasan Abed Al Kader Hammoud, Bernard Ghanem



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 복잡한 추론 능력을 습득하기 위해 필요한 **값비싼 강화 학습(RL)** 기반 최적화 과정을 대체하는 방법을 모색합니다. 특히, 학습된 추론 능력을 **추론 벡터(reasoning vector)** 형태로 추출하여 호환 가능한 모델 간에 효율적으로 전이함으로써, 추론 능력 강화에 드는 **계산 자원을 절감**하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 동일한 아키텍처와 초기화, 학습 데이터셋을 공유하는 두 개의 **QWEN2.5 모델**을 사용합니다. 하나는 **SFT(Supervised Fine-Tuning)**로, 다른 하나는 **GRPO(Group Relative Policy Optimization)**로 미세 조정되었습니다. **추론 벡터(vreason)**는 이 두 모델의 파라미터 차이인 **vreason = θGRPO - θSFT**로 정의되며, 이는 RL 학습으로 주입된 추론 능력을 순수하게 분리하는 역할을 합니다. 추출된 벡터는 **θenhanced = θtarget + α · vreason** 연산을 통해 타겟 모델에 적용되며, 실험에서는 **α=1**을 사용했습니다.

## 주요 결과
추론 벡터 주입 결과, **1.5B QWEN2.5 모델**은 **GSM8K**에서 **+4.9%**, **HumanEval**에서 **+4.3%**, **SciQ**에서 **+1.7%**, 그리고 **BigBenchHard**에서 **+12.3%**의 정확도 향상을 보였습니다. 특히 **BigBenchHard**에서는 기준선 대비 **12.3%** 증가한 **19.0%**의 성능을 달성하며 복잡한 추론 시나리오에서의 효과를 입증했습니다. 반대로 추론 벡터를 제거했을 때 **GSM8K**에서 **-11.8%**의 성능 하락이 발생하여, 이 벡터가 모델의 추론 능력에 결정적으로 기여함을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 **값비싼 RL 학습 과정 없이도** 기존 **오픈소스 모델**에서 추론 능력을 추출하여 다른 LLM에 효율적으로 전이시킬 수 있는 실용적인 방법을 제시합니다. 이는 AI 개발자들이 **기존의 컴퓨팅 자원 투자**를 재활용하여 모델의 추론 능력을 강화할 수 있는 새로운 접근 방식을 제공합니다. 다만, 효과적인 전이를 위해서는 **동일한 아키텍처, 토크나이저, 사전 학습 초기화** 등 엄격한 모델 호환성 조건이 요구됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.