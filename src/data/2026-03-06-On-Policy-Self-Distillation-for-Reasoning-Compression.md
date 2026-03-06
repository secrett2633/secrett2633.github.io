---
title: "[논문리뷰] On-Policy Self-Distillation for Reasoning Compression"
excerpt: "Zhipeng Wang이 arXiv에 게시한 'On-Policy Self-Distillation for Reasoning Compression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reasoning Compression
  - Self-Distillation
  - On-Policy Learning
  - Large Language Models
  - Mathematical Reasoning
  - Knowledge Distillation
  - Efficient Inference

permalink: /ai/review/2026-03-06-On-Policy-Self-Distillation-for-Reasoning-Compression/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05433)

**저자:** Zhipeng Wang, Ran He, Zhengze Zhou, Yuanda Xu, Hejian Sang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 추론 과정에서 생성하는 불필요하고 과도한 토큰으로 인한 **비효율성 및 오류 누적 문제** 를 해결하고자 합니다. 정답 데이터나 토큰 예산 같은 외부 제약 없이 모델 스스로 간결하게 추론하도록 학습시켜, 추론 과정의 압축과 동시에 정확도를 향상시키는 방법론을 제안합니다.

## 핵심 방법론
제안하는 **OPSDC(On-Policy Self-Distillation for Reasoning Compression)** 는 동일한 모델을 학생과 교사로 사용합니다. 교사 모델은 "간결하게 추론하라"는 지시어( **conciseness instruction** )를 추가로 받아 간결한 추론을 생성하며, 교사 가중치는 학생 모델 가중치로 **주기적으로 동기화(M=50 스텝)** 됩니다. 학습은 학생 모델이 생성한 롤아웃에 대해 학생과 교사 분포 간의 **토큰별 역방향 KL 다이버전스(reverse KL divergence)** 를 최소화하는 방식으로 진행되며, 이는 **온-정책(on-policy)** 방식으로 이뤄져 분포 이동 문제를 방지합니다.

## 주요 결과
**Qwen3-8B** 및 **Qwen3-14B** 모델로 실험한 결과, **MATH-500 벤치마크** 에서 **57-59%의 토큰 감소** 를 달성하면서 **정확도는 9-16%p 향상** 되었습니다 (예: Qwen3-14B는 70.0%에서 **86.1%로 상승** ). 특히 **AIME 2024** 에서는 **Qwen3-14B** 가 **41% 압축** 과 함께 **10.5%p의 정확도 향상** 을 보였습니다. OPSDC는 **문제 난이도에 따라 압축률을 자동으로 조절** 하며, 모델의 **일반적인 능력(MMLU)** 및 **탐색적 엔트로피** 를 안정적으로 유지했습니다.

## AI 실무자를 위한 시사점
OPSDC는 **정답 데이터나 복잡한 보상 모델 없이** 표준 SFT 인프라만으로 LLM 추론을 압축하고 효율성을 높일 수 있는 **실용적이고 비용 효율적인 방법론** 입니다. 이는 LLM의 추론 비용을 크게 절감하면서도 **정확도를 향상** 시켜 실제 애플리케이션의 성능과 사용자 경험을 개선할 수 있습니다. 또한, **정답을 얻기 어려운 도메인** 에서도 모델의 지시 이행 능력을 활용하여 추론 압축이 가능함을 보여주어 **LLM의 범용적인 활용 가능성** 을 확장합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.