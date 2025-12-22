---
title: "[논문리뷰] Seed-Prover 1.5: Mastering Undergraduate-Level Theorem Proving via Learning from Experience"
excerpt: "이 [arXiv]에 게시한 'Seed-Prover 1.5: Mastering Undergraduate-Level Theorem Proving via Learning from Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Formal Theorem Proving
  - Large Language Models
  - Reinforcement Learning
  - Agentic Prover
  - Lean Theorem Prover
  - Mathematical Reasoning
  - Test-Time Scaling

permalink: /ai/review/2025-12-22-Seed-Prover-1-5-Mastering-Undergraduate-Level-Theorem-Proving-via-Learning-from-Experience/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17260)

**저자:** ByteDance Seed AI4Math



## 핵심 연구 목표
본 논문은 학부 및 대학원 수준 이상의 수학 문제에 대한 형식적 정리 증명(Formal Theorem Proving)의 효율성과 성능을 개선하는 것을 목표로 합니다. 특히, LLM 기반의 형식적 증명에서 나타나는 높은 계산 비용과 도전 과제를 해결하며, 자연어 증명과 형식어 증명 간의 간극을 효과적으로 연결하고자 합니다.

## 핵심 방법론
**Seed-Prover 1.5** 는 대규모 **에이전트 강화 학습(Agentic Reinforcement Learning)** 을 통해 훈련되어 Lean 및 다양한 도구와의 상호작용 경험을 축적합니다. 효율적인 **테스트-타임 스케일링(Test-Time Scaling, TTS) 워크플로우** 를 사용하며, 이는 **Rubric RL** 로 훈련된 **스케치 모델** 을 포함하여 자연어 증명을 렘마 기반의 Lean 스케치로 변환합니다. 이 계층적 분해 방식은 에이전트 증명기가 하위 문제를 병렬로 해결할 수 있도록 지원합니다.

## 주요 결과
Seed-Prover 1.5는 **PutnamBench** 문제의 **88%** , **Fate-H** 문제의 **80%** , **Fate-X** 문제의 **33%** 를 해결하여 기존 최첨단 모델 대비 우수한 성능을 보였습니다. 특히, **Putnam 2025** 의 12문제 중 **11문제** 를 9시간 이내에 성공적으로 증명했으며, 더 적은 컴퓨팅 예산으로도 뛰어난 성과를 달성했습니다 (예: Putnam에서 **Seed-Prover 1.5는 10 H20 days/problem으로 87.9% 해결** 한 반면, **AlphaProof는 500 TPU days/problem으로 56.1% 해결** ).

## AI 실무자를 위한 시사점
이 연구는 복잡한 수학적 추론 작업에서 **에이전트 강화 학습** 과 **경험을 통한 학습** 의 엄청난 잠재력을 입증했습니다. 자연어 스케치를 활용한 하이브리드 접근 방식은 인간의 직관과 형식적 검증 사이의 다리 역할을 효과적으로 수행할 수 있음을 보여줍니다. 감소된 컴퓨팅 예산으로 최첨단 성능을 달성한 것은 AI 시스템의 실제 배포 가능성을 높이는 중요한 진전이지만, PhD 수준 문제와 최신 수학 연구에 기여하기 위한 추가적인 Mathlib 지원 및 여러 논문의 통찰력 통합의 필요성도 강조됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.