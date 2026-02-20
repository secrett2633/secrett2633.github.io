---
title: "[논문리뷰] MathSE: Improving Multimodal Mathematical Reasoning via Self-Evolving Iterative Reflection and Reward-Guided Fine-Tuning"
excerpt: "arXiv에 게시된 'MathSE: Improving Multimodal Mathematical Reasoning via Self-Evolving Iterative Reflection and Reward-Guided Fine-Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Mathematical Problem Solving
  - Self-Evolving
  - Iterative Fine-Tuning
  - Reward Models
  - Reflection
  - Large Language Models (LLMs)

permalink: /ai/review/2025-11-13-MathSE-Improving-Multimodal-Mathematical-Reasoning-via-Self-Evolving-Iterative-Reflection-and-Reward-Guided-Fine-Tuning/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06805)

**저자:** Jinhao Chen, Zhen Yang, Jianxin Shi, Tianyu Wo, Jie Tang



## 핵심 연구 목표
본 연구는 멀티모달 대규모 언어 모델(MLLM)이 복잡한 수학 문제 해결과 같은 추론 태스크에서 겪는 어려움을 극복하는 것을 목표로 합니다. 특히, 기존의 정적인 교사 모델 유래 데이터셋에 의존하는 방식이 모델의 새로운 문제 적응력과 견고한 일반화 능력을 제한한다는 한계를 해결하고자 합니다.

## 핵심 방법론
**MathSE** 는 **반복적 미세 조정(iterative fine-tuning)** , **보상 기반 피드백(reward-guided feedback)** , **반성(reflection)** 의 순환을 통해 MLLM의 수학적 추론 능력을 지속적으로 향상시키는 프레임워크입니다. 초기 **GPT-4o** 로 증류(distilled)된 데이터로 기본 모델을 미세 조정한 후, **Outcome Reward Model (ORM)** 이 추론 경로의 정확성을 평가하고 오류 단계 및 상세 분석을 제공합니다. 모델은 ORM 피드백을 바탕으로 자신의 실수를 **반성** 하고 수정하여 개선된 추론 경로를 생성하며, 이는 다시 훈련 데이터에 통합되어 모델을 반복적으로 재훈련합니다.

## 주요 결과
**MathSE** 는 **MathVista** , **MathVL-test** , **MathVerse** , **Math-Vision** 등 주요 멀티모달 수학 추론 벤치마크에서 백본 모델 대비 상당한 성능 향상을 입증했습니다. 특히 **MathVL-test** 에서 **CogVLM2** 의 정확도를 30.85%에서 **64.70%** 로, **Qwen2-VL-7B** 는 40.60%에서 **57.00%** 로, **InternVL2.5-8B** 는 33.20%에서 **65.13%** 로 향상시켰습니다. 이는 선두 오픈소스 모델인 **QVQ** 의 성능을 능가하는 결과입니다.

## AI 실무자를 위한 시사점
이 연구는 **반복적인 학습 및 피드백 루프** 가 MLLM의 복잡한 추론 능력을 효과적으로 개선할 수 있음을 보여줍니다. 정적 데이터셋 의존성에서 벗어나 **동적이고 적응적인 학습 패러다임** 의 중요성을 강조하며, **ORM과 같은 정교한 보상 모델** 은 단순 정답 평가를 넘어 기술적인 오류 진단 및 수정에 필수적임을 시사합니다. **MathSE** 프레임워크는 수학적 추론 외 다른 복잡한 멀티모달 또는 일반 추론 태스크에도 확장될 잠재력을 가지고 있어, AI 모델의 신뢰성과 투명성 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.