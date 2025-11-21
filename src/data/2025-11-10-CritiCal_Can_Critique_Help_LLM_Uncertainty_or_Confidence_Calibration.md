---
title: "[논문리뷰] CritiCal: Can Critique Help LLM Uncertainty or Confidence Calibration?"
excerpt: "Baixuan Xu이 [arXiv]에 게시한 'CritiCal: Can Critique Help LLM Uncertainty or Confidence Calibration?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Calibration
  - Confidence Calibration
  - Uncertainty Estimation
  - Critique Learning
  - Supervised Fine-Tuning
  - Natural Language Processing
  - Self-Critique

permalink: /ai/review/2025-11-10-CritiCal_Can_Critique_Help_LLM_Uncertainty_or_Confidence_Calibration/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24505)

**저자:** Qing Zong, Jiayu Liu, Tianshi Zheng, Chunyang Li, Baixuan Xu, Haochen Shi, Weiqi Wang, Zhaowei Wang, Chunkit Chan, Yangqiu Song



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 **자연어 기반 신뢰도 표현(verbalized confidence)**의 정확한 보정(calibration)을 개선하는 것을 목표로 합니다. 기존의 수치적 또는 일관성 기반 방법들이 답변의 추론 과정을 충분히 반영하지 못하는 한계를 극복하고, 자연어 비판(critique)을 활용하여 LLM의 신뢰도 또는 불확실성 보정 성능을 향상시키고자 합니다.

## 핵심 방법론
저자들은 두 가지 방법을 제안합니다: 첫째, **Self-Critique**는 LLM 스스로 질문, 추론 단계, 최종 답변을 분석하여 자신감 표현을 개선하는 프롬프트 기반 접근 방식입니다. 둘째이자 핵심인 **CritiCal**은 **감독 미세 조정(SFT)** 프레임워크로, **GPT-4o**와 같은 교사 모델이 생성한 자연어 비판을 활용하여 학생 모델의 신뢰도 보정 오류를 학습시킵니다. 이 비판은 학생 모델의 추론 명확성, 강도, 정확성을 참조 해법과 비교하여 평가합니다.

## 주요 결과
실험 결과, **CritiCal**은 **Self-Critique** 및 다른 경쟁 기준 모델들을 **크게 능가**하는 성능을 보였습니다. 특히 복잡한 추론 태스크인 **MATH-Perturb**에서 DeepSeek-Distill-Qwen 모델에 적용된 **CritiCal**은 **0.405 ECE (불확실성)** 및 **0.432 ECE (신뢰도)**를 달성하여, 교사 모델인 **GPT-4o**의 **0.521 ECE (불확실성)** 및 **0.526 ECE (신뢰도)**보다 우수한 보정 성능을 보였습니다. 또한, **CritiCal**은 훈련 데이터셋인 StrategyQA로 학습한 모델이 OOD(Out-Of-Distribution) 데이터셋인 MATH-Perturb에서도 강건한 보정 개선을 보여 뛰어난 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**CritiCal**은 LLM이 고위험 애플리케이션에서 사용자에게 더 신뢰할 수 있는 정보를 제공하는 데 기여할 수 있습니다. 특히, **자연어 비판을 통한 학습**이 학생 모델이 교사 모델의 보정 성능을 뛰어넘게 할 수 있음을 보여주어 새로운 LLM 훈련 패러다임을 제시합니다. 실무자들은 **멀티-초이스 질문**에는 **신뢰도**를, **개방형 질문**에는 **불확실성** 표현을 활용하는 것이 더 효과적임을 고려하여 LLM을 설계할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.