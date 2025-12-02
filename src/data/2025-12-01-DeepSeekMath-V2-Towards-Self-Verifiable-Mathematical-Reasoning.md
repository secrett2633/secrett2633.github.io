---
title: "[논문리뷰] DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning"
excerpt: "이 [arXiv]에 게시한 'DeepSeekMath-V2: Towards Self-Verifiable Mathematical Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mathematical Reasoning
  - Large Language Models (LLMs)
  - Proof Verification
  - Self-Verification
  - Reinforcement Learning (RL)
  - Theorem Proving
  - Meta-Verification
  - Iterative Refinement

permalink: /ai/review/2025-12-01-DeepSeekMath-V2-Towards-Self-Verifiable-Mathematical-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22570)

**저자:** Zhihong Shao*, Yuxiang Luo*, Chengda Lu*†, Z.Z. Ren*, Jiewen Hu, Tian Ye, Zhibin Gou, Shirong Ma, Xiaokang Zhang (DeepSeek-AI)



## 핵심 연구 목표
대규모 언어 모델(LLM)이 수학적 추론에서 최종 정답 기반 보상의 한계를 가지며, 이는 증명 작업에 적용하기 어렵고 추론의 정확성을 보장하지 못한다는 문제점을 해결하고자 합니다. 본 연구는 LLM이 스스로 증명의 포괄성과 엄격함을 검증할 수 있도록 하여, 알려지지 않은 해답을 탐색하는 **개방형 문제** 까지 해결할 수 있는 **자기 검증 가능한 수학적 추론** 능력을 개발하는 것을 목표로 합니다.

## 핵심 방법론
이 논문은 **Rformat** 및 **Rscore** 보상을 사용하여 증명 검증자 **πφ** 를 훈련하고, 검증자 분석의 품질을 평가하는 **메타 검증자 πη** 를 도입하여 **Rmeta** 피드백을 통합합니다. 증명 생성자 **πθ** 는 검증자를 보상 모델로 사용하여 훈련되며, 자체 검증 능력을 부여받아 **R = Rformat (Y, Z) · (α· Ry + β · Rz)** 보상 함수를 통해 정확한 자체 평가를 장려합니다. 또한, 난이도 높은 증명을 자동 레이블링하기 위해 검증 연산량을 확장하고, 다수의 독립적인 검증 분석과 메타 검증 평가를 통해 훈련 데이터를 생성하여 검증자와 생성자를 반복적으로 개선합니다.

## 주요 결과
DeepSeekMath-V2는 사내 CNML-수준 문제에서 **GPT-5-Thinking-High** 및 **Gemini 2.5-Pro** 를 지속적으로 능가하는 성능을 보였습니다. 특히, **IMO 2025** 에서 5/6 문제 해결로 **83.3%** 포인트를, **CMO 2024** 에서 **73.8%** 포인트를 달성하여 **골드 레벨** 을 기록했으며, **Putnam 2024** 에서는 **118/120** 이라는 거의 완벽한 점수로 최고 인간 점수 90점을 뛰어넘었습니다. **IMO-ProofBench** 벤치마크에서는 **DeepMind의 DeepThink (IMO Gold)** 보다 기본 세트에서 우수하고 고급 세트에서도 경쟁력을 유지하며, 자기 검증을 통한 순차적 개선이 증명 품질을 크게 향상시켰음을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **자기 검증 가능한 수학적 추론** 을 위한 LLM 훈련의 실현 가능성을 입증하여, 최종 정답 기반 보상의 한계를 넘어선 새로운 AI 개발 방향을 제시합니다. 생성-검증의 반복적인 사이클은 복잡한 추론 시스템을 지속적으로 개선할 수 있는 틀을 제공하며, 알려지지 않은 해결책을 탐색하는 **개방형 문제** 에 AI를 적용할 가능성을 열어줍니다. 이는 AI 시스템이 스스로의 추론을 평가하고 개선함으로써 더욱 자율적이고 신뢰할 수 있는 수학적 AI 시스템을 구축하는 데 중요한 진전이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.