---
title: "[논문리뷰] Unveiling Implicit Advantage Symmetry: Why GRPO Struggles with Exploration and Difficulty Adaptation"
excerpt: "이 [arXiv]에 게시한 'Unveiling Implicit Advantage Symmetry: Why GRPO Struggles with Exploration and Difficulty Adaptation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Reasoning
  - Group Relative Policy Optimization
  - Advantage Estimation
  - Exploration-Exploitation
  - Curriculum Learning
  - Multi-modal LLMs

permalink: /ai/review/2026-02-13-Unveiling-Implicit-Advantage-Symmetry-Why-GRPO-Struggles-with-Exploration-and-Difficulty-Adaptation/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05548)

**저자:** Zhiqi Yu, Zhangquan Chen, Mengting Liu, Heye Zhang, Liangqiong Qu



## 핵심 연구 목표
본 논문은 **Group Relative Policy Optimization (GRPO)** 가 탐색 및 난이도 적응에서 겪는 어려움의 근본 원인을 규명하는 것을 목표로 합니다. 특히, **Group Relative Advantage Estimation (GRAE)** 에 내재된 "암묵적 이점 대칭성"이 이러한 병목 현상의 원인임을 밝히고, 이를 극복하기 위한 새로운 프레임워크를 제안합니다.

## 핵심 방법론
GRPO의 최적화 과정을 **Supervised Fine-Tuning (SFT)의 재가중 변형** 으로 정형화하고, GRAE의 이점 대칭성을 그룹 및 샘플 수준에서 분석했습니다. 이를 통해 정확한 궤적에 대한 가중치 대칭성이 탐색을 저해하고, 샘플 난이도에 대한 불감증이 최적화를 방해함을 보였습니다. 제안하는 **Asymmetric GRAE (A-GRAE)** 는 배치별 평균 보상과 샘플 성공률 `p`에 기반하여 탐색 인센티브와 샘플 난이도 초점을 동적으로 조절하며, 특히 **정확한 응답 이점의 감쇠 억제 전략** 과 **동적 난이도 주의 전환** 을 포함합니다.

## 주요 결과
**A-GRAE** 는 다양한 LLM ( **Qwen2.5-Math-7B** , **Llama-3.2-3B-Instruct** , **DeepSeek-R1-7B** ) 및 MLLM ( **Qwen2.5-VL-3B-Instruct** ) 벤치마크에서 GRPO 및 그 변형 모델들의 성능을 일관되게 향상시켰습니다. 특히 **Pass@1** 및 **Pass@k** 지표에서 상당한 개선을 보였는데, 예를 들어 **AIME2025** 데이터셋에서 **DAPO + A-GRAE** 는 **Pass@256** 에서 **60.0%** 를 달성하여 DAPO의 **53.3%** 를 넘어섰습니다. 또한, GRPO에서 관찰되는 엔트로피 붕괴를 효과적으로 완화하고 훈련 후반부에서 탐욕 디코딩 정확도를 크게 능가했습니다.

## AI 실무자를 위한 시사점
본 연구는 RLVR에서 **이점 함수 설계** 의 중요성을 강조하며, 암묵적 대칭성이 탐색과 적응을 방해할 수 있음을 보여줍니다. AI 실무자들은 **궤적의 비대칭적 가중치 부여** 와 **동적 커리큘럼 학습** 이 LLM의 추론 능력 향상에 필수적임을 고려해야 합니다. **A-GRAE** 는 기존 GRPO 변형에 쉽게 통합될 수 있는 견고한 프레임워크로, 다양한 (멀티모달) 태스크에서 모델의 성능과 일반화 능력을 개선하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.