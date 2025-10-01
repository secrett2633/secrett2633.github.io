---
title: "[논문리뷰] Thinking Sparks!: Emergent Attention Heads in Reasoning Models During
  Post Training"
excerpt: "이 [arXiv]에 게시한 'Thinking Sparks!: Emergent Attention Heads in Reasoning Models During
  Post Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mechanistic Interpretability
  - Attention Heads
  - Post-Training
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Circuit Analysis
  - Reasoning Models
  - Transformer Architecture

permalink: /ai/review/2025-10-1-Thinking_Sparks_Emergent_Attention_Heads_in_Reasoning_Models_During_Post_Training/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25758)

**저자:** Yein Park, Minbyul Jeong, Jaewoo Kang



## 핵심 연구 목표
대규모 추론 모델의 **후처리 훈련(Post-Training)** 기법(SFT, RL 등)이 모델의 추론 능력 향상에 기여하는 내부 아키텍처 메커니즘의 불투명성을 해소하는 것이 주요 목표입니다. 특히, 이러한 훈련 과정에서 **기능적으로 특화된 어텐션 헤드**가 어떻게 출현하고 구조화된 추론 및 계산을 지원하는지 **회로 분석**을 통해 밝히고자 합니다.

## 핵심 방법론
**Qwen** 및 **DeepSeek-R1-Distill-Qwen** 모델군을 대상으로 **회로 분석(Circuit Analysis)**을 적용하여 후처리 훈련(Distillation, SFT, GRPO)에 따른 **새롭게 출현하는 어텐션 헤드**를 식별했습니다. **EAP-IG (Edge Attribution Patching with Integrated Gradients)**를 사용해 회로를 구성하고, **어블레이션(Ablation)** 및 **활성화 스케일링(Activation Scaling)** 실험을 통해 emergent head의 인과적 역할을 검증했습니다. 추가적으로 **Qwen3-8B** 모델의 "Think On/Off" 기능을 분석하여 추론 모드 전환 시의 내부 메커니즘 변화를 연구했습니다.

## 주요 결과
**Distillation**과 **SFT**는 모델에 새롭고 안정적인 추론 어텐션 헤드를 점진적으로 추가하며, 특히 **SFT 헤드**는 주로 중후반 레이어에 집중됩니다. **GRPO (Group Relative Policy Optimization)**는 보상 신호에 따라 어텐션 헤드를 동적으로 활성화 및 가지치기하며, 최종적으로 작고 타겟팅된 헤드 세트를 만듭니다. 예를 들어, **DeepSeekR1-Distill-Qwen-1.5B**의 추론 헤드 **어블레이션 시 AIME'24 pass@1 점수**가 **30.0%에서 26.6%로 하락**했습니다. 또한, **Think Off 모델**에서 과도하게 활성화된 헤드를 어블레이션하거나 스케일링 다운하면 **AIME'24 성능이 최대 30.0%에서 36.6%로 증가**하며, 이는 "과도한 사고(over-thinking)" 문제를 완화할 수 있음을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 후처리 훈련이 LLM의 내부 아키텍처를 근본적으로 재구성하며, **특정 어텐션 헤드의 활성화 및 역할**을 이해하는 것이 모델 성능 최적화에 필수적임을 입증합니다. 복잡한 추론 헤드가 어려운 문제를 해결하지만, **간단한 계산 오류**나 **과도한 추론(over-thinking)**을 유발할 수 있어 **추론 전략의 효율성과 실행의 신뢰성** 사이의 균형이 중요함을 시사합니다. 향후 **타겟팅된 어텐션 헤드 활성화** 및 **정교한 보상 쉐이핑**을 통한 훈련 정책 설계를 위한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.