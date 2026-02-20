---
title: "[논문리뷰] SPARKLING: Balancing Signal Preservation and Symmetry Breaking for Width-Progressive Learning"
excerpt: "arXiv에 게시된 'SPARKLING: Balancing Signal Preservation and Symmetry Breaking for Width-Progressive Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Progressive Learning
  - Width Expansion
  - Signal Preservation
  - Symmetry Breaking
  - LLM
  - Training Stability
  - MoE
  - RMSNorm

permalink: /ai/review/2026-02-03-SPARKLING-Balancing-Signal-Preservation-and-Symmetry-Breaking-for-Width-Progressive-Learning/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02472)

**저자:** Qifan Yu, Xinyu Ma, Zhijian Zhuo, Minrui Wang, Deyi Liu, Shiyi Zhan, Yiyuan Ma, Liang Xiang, Xingyan Bin, Di He



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 사전 훈련 비용을 절감하기 위한 점진적 학습(Progressive Learning, PL)의 핵심 과제인 **중간 단계 너비 확장(mid-stage width expansion)** 의 불안정성을 해결하는 것을 목표로 합니다. 특히, 이 단계에서 발생하는 **활성화 통계 교란** 과 **복사 기반 초기화** 로 인한 **그래디언트 대칭성** 문제를 동시에 해결하고자 합니다.

## 핵심 방법론
저자들은 **SPARKLING** 이라는 프레임워크를 제안하며, **활성화 통계 안정화** 를 위한 **RMS-스케일 일관성(RMS-scale consistency)** 을 통해 신호 보존을 달성합니다. 대칭성 문제 해결을 위해 새롭게 도입된 파라미터에 대한 **비대칭적 옵티마이저 상태 재설정(asymmetric optimizer state resetting)** 과 **비대칭적 학습률 재-웜업(asymmetric learning rate re-warmup)** 을 적용합니다. 이 방법론은 **Mixture-of-Experts (MoE) 모델** 에 적용되어 다양한 너비 축과 **AdamW** , **Muon** 같은 옵티마이저에서 평가되었습니다.

## 주요 결과
**SPARKLING** 은 동일한 토큰 예산 하에 전체 규모 모델을 처음부터 훈련하는 것보다 일관적으로 더 나은 다운스트림 성능을 달성했습니다. 특히, **2배 너비 확장** 시 최대 **35%의 훈련 비용 절감** 과 최대 **1.49배의 실제 벽시계 시간(wall-clock speed-up)** 을 기록했습니다. 이는 **RMS-preserved scaling** 이 후반부 수렴을 일관적으로 개선하고, **비대칭적 옵티마이저 재설정** 과 **학습률 재-웜업** 이 최종 손실을 추가적으로 낮추는 데 기여했음을 보여줍니다.

## AI 실무자를 위한 시사점
**SPARKLING** 은 **LLM 사전 훈련 비용** 을 크게 줄이면서도 성능 저하 없이 모델의 너비를 효율적으로 확장할 수 있는 실용적인 프레임워크를 제공합니다. **활성화 통계 안정화** 와 **기능적 중복성 극복** 을 위한 구체적인 기법들을 통해, AI 엔지니어들은 대규모 모델 개발 시 훈련 자원을 더욱 효율적으로 활용하고 안정적인 모델 확장을 이룰 수 있습니다. 이는 특히 대규모 모델의 **지속적인 스케일업** 에 중요한 시사점을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.