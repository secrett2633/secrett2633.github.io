---
title: "[논문리뷰] Winning the Pruning Gamble: A Unified Approach to Joint Sample and Token
  Pruning for Efficient Supervised Fine-Tuning"
excerpt: "Yue Min이 [arXiv]에 게시한 'Winning the Pruning Gamble: A Unified Approach to Joint Sample and Token
  Pruning for Efficient Supervised Fine-Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM SFT
  - Data Pruning
  - Sample Pruning
  - Token Pruning
  - Error-Uncertainty Plane
  - Q-Tuning
  - Data Efficiency
  - Dynamic Pruning

permalink: /ai/review/2025-10-1-Winning_the_Pruning_Gamble_A_Unified_Approach_to_Joint_Sample_and_Token_Pruning_for_Efficient_Supervised_Fine-Tuning/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23873)

**저자:** Shaobo Wang, Jiaming Wang, Jiajun Zhang, Cong Wang, Yue Min, Zichen Wen, Fei Huang, Huiqiang Jiang, Junyang Lin, Dayiheng Liu, Linfeng Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)의 **Supervised Fine-Tuning (SFT)** 과정에서 발생하는 데이터 비효율성 문제를 해결하고자 합니다. 기존 샘플 및 토큰 프루닝 방법들이 독립적으로 작동하여 최적의 성능을 달성하지 못하는 한계를 극복하고, 두 차원을 **동시에 최적화하는 통합 프루닝 프레임워크**를 제안하여 제한된 예산 내에서 데이터 활용도를 극대화하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Q-Tuning (Quadrant-based Tuning)** 프레임워크는 먼저 **Error-Uncertainty (EU) Plane**을 도입하여 훈련 데이터를 모델의 perplexity (error) 및 entropy (uncertainty) 기반으로 네 가지 사분면으로 분류합니다. 이후 **두 단계의 전략**을 사용합니다. 첫째, 샘플 수준에서 유해한 노이즈(Q1) 및 중복 지식(Q3)은 제거하고, 가치 있는 오개념(Q2) 및 보정 데이터(Q4)는 유지합니다. 둘째, 토큰 수준에서는 **Q2 샘플**에서만 **컨텍스트 인식 스코어링 메커니즘**을 통해 중요도가 낮은 토큰을 선별적으로 제거하며, **Q4 샘플**은 전체 토큰을 보존하여 모델 안정성을 유지합니다.

## 주요 결과
**Q-Tuning**은 5가지 다양한 벤치마크에서 새로운 최첨단 성능을 달성했습니다. 특히, **SmolLM2-1.7B** 모델에서는 원래 훈련 데이터의 **12.5%**만을 사용하여 전체 데이터 SFT 기준 대비 **+38%**의 평균 성능 향상을 기록했습니다. **LLaMA3-8B** 모델로 **GSM8K** 벤치마크에서 **35%**의 데이터만을 사용하고도 **48.07**의 점수를 달성하여, 전체 데이터 훈련보다 **6.0**, 기존 최고 기준선보다 **9.9** 높은 성능을 보여주며, **최초로 전체 데이터 훈련을 지속적으로 능가하는 동적 프루닝 접근 방식**임을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들에게 **Q-Tuning**은 LLM SFT의 계산 비용을 절감하면서 성능을 향상시킬 수 있는 **실용적이고 확장 가능한 청사진**을 제공합니다. 데이터의 이질적 가치를 진단하는 **EU Plane**은 프루닝 전략 수립에 대한 통찰력을 제공하며, **통합된 샘플 및 토큰 프루닝** 접근 방식은 기존 단일 차원 프루닝의 한계를 극복합니다. 이를 통해 제한된 컴퓨팅 자원 하에서도 **최적의 LLM 성능**을 달성할 수 있는 효율적인 데이터 활용 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.