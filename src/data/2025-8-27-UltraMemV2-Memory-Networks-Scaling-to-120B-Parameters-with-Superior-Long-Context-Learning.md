---
title: "[논문리뷰] UltraMemV2: Memory Networks Scaling to 120B Parameters with Superior
  Long-Context Learning"
excerpt: "Ran Guo이 [arXiv]에 게시한 'UltraMemV2: Memory Networks Scaling to 120B Parameters with Superior
  Long-Context Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Memory Networks
  - Mixture of Experts (MoE)
  - Long-Context Learning
  - Sparse Models
  - Transformer Architecture
  - LLMs
  - Efficient Inference

permalink: /ai/review/2025-8-27-UltraMemV2-Memory-Networks-Scaling-to-120B-Parameters-with-Superior-Long-Context-Learning/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18756)

**저자:** Zihao Huang, Yu Bao, Qiyang Min, Siyan Chen, Ran Guo, Hongzhi Huang, Defa Zhu, Yutao Zeng, Banggu Wu, Xun Zhou, Siyuan Qiao



## 핵심 연구 목표
본 논문은 Mixture of Experts (MoE) 모델이 겪는 높은 메모리 접근 비용 문제를 해결하고, 기존 메모리 레이어 아키텍처인 UltraMem이 8-expert MoE 모델 성능에 미치지 못하는 격차를 해소하는 것을 목표로 합니다. 동일한 계산량과 파라미터에서 **8-expert MoE 모델**과 동등하거나 그 이상의 성능을 달성하면서 메모리 접근 비용을 대폭 줄이는 새로운 메모리 레이어 아키텍처를 제시하고자 합니다.

## 핵심 방법론
새롭게 설계된 **UltraMemV2**는 다섯 가지 주요 개선 사항을 도입합니다. 모든 Transformer 블록에 메모리 레이어를 통합하는 **아키텍처 통합**, 단일 선형 프로젝션을 통한 **단순화된 값 확장**, **PEER의 FFN 기반 값 처리** 채택, **원칙에 따른 파라미터 초기화**, 그리고 **메모리-FFN 계산 비율 재조정**이 포함됩니다. 이 개선사항들은 메모리 레이어 아키텍처의 성능 격차를 줄이는 데 중점을 둡니다.

## 주요 결과
**UltraMemV2**는 동일한 계산량과 파라미터 조건에서 **8-expert MoE 모델**과 동등한 성능을 달성했으며, 특히 메모리 집약적인 태스크에서 우수한 성능을 보였습니다. 구체적으로, **긴 컨텍스트 기억에서 +1.6점**, **다중 라운드 기억에서 +6.2점**, 그리고 **인컨텍스트 학습에서 +7.9점**의 성능 향상을 기록했습니다. 또한, **120B 총 파라미터** 중 **2.5B 활성화 파라미터**를 가진 모델까지 스케일링을 검증했습니다.

## AI 실무자를 위한 시사점
**UltraMemV2**는 대규모 언어 모델(LLM)의 효율적인 희소 계산을 위한 매력적인 대안을 제시합니다. 활성화 밀도(top-m 값)가 총 희소 파라미터 수보다 성능에 더 큰 영향을 미친다는 점을 밝혀냈으며, 이는 미래 메모리 레이어 아키텍처 설계에 중요한 지침을 제공합니다. 또한, 훈련 과정을 단순화하고 복잡한 설정의 필요성을 줄일 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.