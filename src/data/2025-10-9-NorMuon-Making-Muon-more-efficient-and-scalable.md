---
title: "[논문리뷰] NorMuon: Making Muon more efficient and scalable"
excerpt: "Tuo Zhao이 arXiv에 게시한 'NorMuon: Making Muon more efficient and scalable' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Training
  - Optimizer
  - Muon
  - Orthogonalization
  - Adaptive Learning Rates
  - Distributed Training
  - FSDP2
  - NorMuon

permalink: /ai/review/2025-10-9-NorMuon-Making-Muon-more-efficient-and-scalable/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05491)

**저자:** Zichong Li, Liming Liu, Chen Liang, Weizhu Chen, Tuo Zhao



## 핵심 연구 목표
대규모 언어 모델(LLM) 훈련 효율성 향상을 위해 기존 Muon 옵티마이저의 한계를 극복하는 것이 목표입니다. Muon이 업데이트의 컨디셔닝을 개선하지만 뉴런별 업데이트 노름의 분산이 크다는 문제를 해결하고, 이를 통해 훈련 동역학을 더욱 균형 있게 만들어 전반적인 수렴 속도와 확장성을 높이고자 합니다.

## 핵심 방법론
본 논문은 **NorMuon** 이라는 새로운 옵티마이저를 제안합니다. 이는 Muon의 **행렬 단위 직교화(orthogonalization)** 와 **뉴런 단위 적응형 학습률** 을 결합한 방식입니다. 구체적으로, 직교화된 업데이트 행렬에 대해 각 뉴런(행)의 **제곱 평균값** 을 계산하고, 이를 **2차 모멘텀 통계** 로 축적한 후 **행 단위 정규화** 에 사용하여 뉴런별 기여도를 균일하게 만듭니다. 또한, 대규모 배포를 위해 **FSDP2 프레임워크** 기반의 효율적인 **분산 구현** 을 개발하여 직교화 계산을 장치 간에 분산하고 **로우-와이즈 파라미터 샤딩** 을 활용했습니다.

## 주요 결과
NorMuon은 다양한 모델 규모에서 Adam과 Muon 대비 일관되게 우수한 성능을 보였습니다. 특히 **1.1B 파라미터 모델** 사전 훈련에서 Adam 대비 **21.74%** , Muon 대비 **11.31%** 더 나은 훈련 효율성을 달성했습니다. 메모리 사용량은 Muon과 유사한 수준을 유지하며, AdamW 대비 훈련 단계 시간은 **2.9%** 만 증가하는 등 효율적인 오버헤드를 입증했습니다.

## AI 실무자를 위한 시사점
NorMuon은 직교화와 적응형 학습률이 상호 보완적으로 작동함을 입증하여, LLM 훈련을 위한 새로운 옵티마이저 설계 방향을 제시합니다. 이는 대규모 모델의 훈련 시간과 비용을 절감하는 데 기여할 수 있습니다. **FSDP2** 와의 호환성을 갖춘 효율적인 분산 구현은 **대규모 분산 환경** 에서 NorMuon의 실제 적용 가능성을 높여 AI/ML 엔지니어들에게 실용적인 대안을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.