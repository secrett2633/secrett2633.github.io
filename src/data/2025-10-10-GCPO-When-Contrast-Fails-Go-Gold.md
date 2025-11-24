---
title: "[논문리뷰] GCPO: When Contrast Fails, Go Gold"
excerpt: "이 [arXiv]에 게시한 'GCPO: When Contrast Fails, Go Gold' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs Reasoning
  - Policy Optimization
  - Contrastive Learning
  - Chain of Thought
  - Reference Answers
  - Math Reasoning
  - Gold-Standard Answer

permalink: /ai/review/2025-10-10-GCPO-When-Contrast-Fails-Go-Gold/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07790)

**저자:** Hao Wu*, Wei Liu*



## 핵심 연구 목표
본 논문은 기존 강화 학습 방법론, 특히 **Group Relative Policy Optimization (GRPO)**이 모델의 추론 한계에 갇혀 샘플 활용 효율성이 떨어지는 문제점을 해결하고자 합니다. 모델이 문제를 해결하지 못해 올바른 샘플이 생성되지 않을 때 발생하는 **정책 기울기 소실** 문제를 극복하고, 외부 참조 답변을 활용하여 **모델의 학습 효율성 및 일반화 능력**을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Group Contrastive Policy Optimization (GCPO)**을 제안하며, 모델의 롤아웃이 모두 실패할 경우 롤아웃 응답 중 하나를 **골드 표준 답변(GA)**으로 대체합니다. 이 GA는 정답 또는 더 큰 언어 모델에서 생성된 답변으로, 모델에 명확한 업데이트 방향을 제공합니다. 또한, **시퀀스 레벨 중요도 샘플링**을 채택하고 **KL 발산 페널티를 제거**하여 학습 안정성과 효율성을 높였습니다.

## 주요 결과
GCPO는 여러 벤치마크 데이터셋에서 **DAPO**와 **R1-Distill-Qwen-1.5B 기준 모델**을 일관되게 능가했습니다. 특히, **AIME 2024 데이터셋**에서 DAPO 대비 **25% 성능 향상(mean@32)**을 달성했으며, **MQA 데이터셋**에서는 R1-1.5B 기준 모델 대비 **54%의 성능 향상**을 보였습니다. 전반적으로 GCPO는 **평균 36.95%의 정확도**를 기록하여 DAPO의 30.37%를 크게 앞섰습니다.

## AI 실무자를 위한 시사점
GCPO는 LLM의 추론 능력을 강화하기 위한 효과적인 접근 방식을 제시하며, 특히 **작은 모델이 더 큰 모델의 추론 패턴을 학습**할 수 있는 가능성을 보여줍니다. 이는 **강화 학습의 샘플 비효율성 및 기울기 소실 문제**를 완화하는 데 기여하며, 난이도 높은 문제에 대한 학습을 개선할 수 있습니다. 단, 학습 데이터에 대한 **골드 표준 답변(GA) 수집**에 초기 자원이 필요하다는 점을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.