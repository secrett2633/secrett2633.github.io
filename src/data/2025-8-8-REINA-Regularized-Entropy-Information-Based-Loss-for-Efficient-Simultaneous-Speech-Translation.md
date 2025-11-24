---
title: "[논문리뷰] REINA: Regularized Entropy Information-Based Loss for Efficient
  Simultaneous Speech Translation"
excerpt: "Xiao Yu이 [arXiv]에 게시한 'REINA: Regularized Entropy Information-Based Loss for Efficient
  Simultaneous Speech Translation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Simultaneous Speech Translation
  - Adaptive Policy
  - Entropy-based Loss
  - Mutual Information
  - Latency-Quality Trade-off
  - Speech-to-Text Translation
  - REINA

permalink: /ai/review/2025-8-8-REINA-Regularized-Entropy-Information-Based-Loss-for-Efficient-Simultaneous-Speech-Translation/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04946)

**저자:** Nameer Hirschkind, Joseph Liu, Xiao Yu, Mahesh Kumar Nandwana



## 핵심 연구 목표
동시 음성 번역(SimulST) 시스템에서 번역 품질과 지연 시간 간의 최적의 균형을 달성하는 것이 주요 과제입니다. 본 논문은 **"정보 획득 시에만 더 많은 입력을 기다린다"**는 핵심 아이디어를 기반으로, 기존의 비효율적이고 불안정했던 정책 학습 방법론의 한계를 극복하고 효율적인 **READ/WRITE 정책**을 학습하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Regularized Entropy INformation Adaptation (REINA)**라는 새로운 손실 함수를 제안합니다. **REINA**는 비스트리밍 **S2TT 모델의 로그 확률**에서 파생된 **상호 정보량 근사**를 기반으로 정책을 학습시키며, **모노토니시티(monotonicity) 제약**과 **L2 정규화**를 도입하여 학습 안정성을 강화합니다. 훈련은 **비스트리밍 S2TT 모델 학습**, **부분 오디오 적응**, **스트리밍 정책 학습**의 세 단계로 진행되며, 정책 네트워크는 디코더의 히든 스테이트에 적용되는 **소규모 트랜스포머 인코더**로 구성됩니다.

## 주요 결과
**REINAStream 모델**은 공개 소스 데이터를 활용하여 **비교 가능한 크기의 모델** 중 **SOTA 스트리밍 번역 성능**을 달성했습니다. 특히, **NoSE (Normalized Streaming Efficiency)**라는 새로운 평가 지표를 도입하여, **기존 접근 방식 대비 최대 21%의 지연 시간/품질 트레이드오프 개선**을 정량적으로 입증했습니다. **MUST-C 데이터셋**에서 REINA 모델은 **Dig-SST 대비 NoSE 점수가 3.0% 더 높았고**, **DiSeg 대비 8.9% 더 높은 성능**을 보였습니다.

## AI 실무자를 위한 시사점
**REINA**는 **기존의 고품질 비스트리밍 S2TT 모델**을 효과적으로 스트리밍 가능한 **SimulST 모델**로 변환할 수 있는 실용적인 솔루션을 제공합니다. **대규모 공개 소스 데이터**만으로도 **SOTA 성능**을 달성할 수 있음을 보여주어, 독점 데이터셋에 대한 의존도를 줄이고 범용적인 **SimulST 모델 개발**을 촉진합니다. 제안된 **NoSE 지표**는 스트리밍 모델의 **성능 평가를 더욱 공정하고 효율적으로** 수행할 수 있게 하여, 향후 연구 및 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.