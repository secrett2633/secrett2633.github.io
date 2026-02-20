---
title: "[논문리뷰] Training Data Efficiency in Multimodal Process Reward Models"
excerpt: "Haolin Liu이 arXiv에 게시한 'Training Data Efficiency in Multimodal Process Reward Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Process Reward Models (MPRMs)
  - Data Efficiency
  - Monte Carlo Annotation
  - Data Selection
  - Balanced-Information Score (BIS)
  - Label Mixture
  - Label Reliability
  - Computational Cost Reduction

permalink: /ai/review/2026-02-05-Training-Data-Efficiency-in-Multimodal-Process-Reward-Models/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04145)

**저자:** Jinyuan Li, Chengsong Huang, Langlin Huang, Shaoyang Xu, Haolin Liu, Wenxuan Zhang, Jiaxin Huang



## 핵심 연구 목표
본 논문은 Multimodal Process Reward Models (MPRMs) 훈련의 데이터 효율성 문제를 해결하는 것을 목표로 합니다. 특히, 기존의 대규모 **Monte Carlo (MC) 주석 코퍼스** 가 막대한 훈련 비용을 초래하며 상당한 중복성을 포함하고 있음을 지적하고, **최소한의 데이터로 전체 데이터 성능을 유지** 하는 효과적인 데이터 선택 방법을 모색합니다.

## 핵심 방법론
연구진은 **MPRM 훈련이 노이즈가 있는 그라디언트로 인해 제한** 된다는 이론적 프레임워크를 정립하고, 정보성이 높은 그라디언트 업데이트가 **레이블 혼합(label mixture)** 과 **레이블 신뢰성(label reliability)** 에 따라 달라짐을 규명했습니다. 이를 바탕으로, 기존 **MC 신호** 만을 활용하여 추가 비용 없이 롤아웃 수준에서 두 요소를 모두 고려하는 **Balanced-Information Score (BIS)** 를 제안하여 훈련 데이터를 선별합니다.

## 주요 결과
**BIS** 를 통해 선택된 소규모 데이터셋은 **InternVL2.5-8B** 및 **Qwen2.5-VL-7B** 백본에서 전체 데이터 성능과 일치하거나 이를 능가하는 결과를 보였습니다. 특히, **BIS-10%** 서브셋은 전체 훈련 데이터의 **10%** 만 사용하여 전체 데이터 성능을 달성했으며, 무작위 샘플링 대비 **4.1%** 의 상대적 성능 향상과 **95.5%의 계산 비용 절감** 을 가져왔습니다.

## AI 실무자를 위한 시사점
본 연구는 **MC 주석 데이터셋의 상당한 중복성** 을 입증하고, **MPRM 훈련에 필요한 계산 비용을 대폭 절감** 할 수 있는 실용적인 방법을 제시합니다. **BIS** 는 추가 모델 호출이나 재레이블링 없이 기존 MC 점수를 활용하는 **모델-불가지론적(model-agnostic) 접근 방식** 으로, 효율적인 데이터 큐레이션 및 **대규모 MLLM(Multimodal Large Language Models)의 지속 가능한 개발** 에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.