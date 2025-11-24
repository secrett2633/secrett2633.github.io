---
title: "[논문리뷰] Efficient Multi-modal Large Language Models via Progressive Consistency
  Distillation"
excerpt: "이 [arXiv]에 게시한 'Efficient Multi-modal Large Language Models via Progressive Consistency
  Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-modal LLMs
  - Token Compression
  - Efficiency
  - Knowledge Distillation
  - Progressive Learning
  - Consistency Distillation
  - MLLM Training

permalink: /ai/review/2025-10-6-Efficient-Multi-modal-Large-Language-Models-via-Progressive-Consistency-Distillation/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00515)

**저자:** Zichen Wen, Shaobo Wang, Yufa Zhou, Junyuan Zhang, Qintong Zhang, Yifeng Gao, Zhaorun Chen, Bin Wang, Conghui He, Linfeng Zhang, Weijia Li



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLMs)에서 시각 토큰이 소모하는 막대한 계산 자원으로 인한 효율성 저하 문제를 해결하고자 합니다. 특히, 시각 토큰 압축 과정에서 발생하는 **학습 난이도 증가**와 **특징 공간 교란** 문제를 해결하여, 효율성을 높이면서도 성능 저하를 최소화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Progressive Consistency Distillation (EPIC)**이라는 점진적 학습 프레임워크를 제안합니다. 이 프레임워크는 **Token Consistency Distillation (TCD)**과 **Layer Consistency Distillation (LCD)**을 도입하여, 각각 토큰별 및 레이어별 특징 공간 교란을 완화합니다. 특히, **단일 MLLM**이 가중치 공유를 통해 교사와 학생 역할을 동시에 수행하며, 점진적으로 압축률을 높이고 압축 레이어를 깊은 곳에서 얕은 곳으로 이동시키는 **점진적 학습 궤적**을 따릅니다.

## 주요 결과
**EPIC**은 **LLaVA-v1.5** 아키텍처에서 아키텍처 수정 없이 뛰어난 효율성과 성능을 입증했습니다. 예를 들어, **64개의 시각 토큰**만을 사용하여 **LLaVA-v1.5**의 **576개 토큰** 대비 **KV 캐시 메모리 88.6% 감소**, **FLOPs 83.9% 감소**를 달성하면서도 **MMBench 정확도는 59.4%**로 유지했습니다. 심지어 **192개 토큰** 사용 시에는 **LLaVA-v1.5**보다 **평균 성능이 향상**되는 결과를 보였습니다.

## AI 실무자를 위한 시사점
**EPIC**은 기존 MLLM 아키텍처를 변경하지 않고도 효율성을 크게 향상시킬 수 있는 실용적인 방법을 제공합니다. AI 엔지니어는 **다양한 토큰 압축 기법**에 유연하게 적용할 수 있어 **자원 제약이 있는 엣지 디바이스**에서의 MLLM 배포를 가속화할 수 있습니다. 또한, 점진적 학습 전략을 통해 압축으로 인한 학습 안정성 문제를 완화하므로, **성능-효율성 트레이드오프**를 최적화하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.