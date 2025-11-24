---
title: "[논문리뷰] Recycling Pretrained Checkpoints: Orthogonal Growth of
  Mixture-of-Experts for Efficient Large Language Model Pre-Training"
excerpt: "Peng Cheng이 [arXiv]에 게시한 'Recycling Pretrained Checkpoints: Orthogonal Growth of
  Mixture-of-Experts for Efficient Large Language Model Pre-Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts
  - Large Language Models
  - Checkpoint Recycling
  - Model Growth
  - Efficient Pretraining
  - Depth Growth
  - Width Growth
  - Sunk Cost

permalink: /ai/review/2025-10-10-Recycling-Pretrained-Checkpoints-Orthogonal-Growth-of-Mixture-of-Experts-for-Efficient-Large-Language-Model-Pre-Training/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08008)

**저자:** Ruizhe Wang, Yucheng Ding, Xiao Liu, Peng Cheng, Baining Guo, Zhengjun Zha, Yaoxiang Wang, Yeyun Gong



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 사전 훈련의 급증하는 계산 비용 문제를 해결하기 위해, 기존의 사전 훈련된 체크포인트에 투자된 "매몰 비용(sunk cost)"을 효율적으로 재활용하여 모델을 성장시키는 방법을 제안합니다. 특히, 수렴된 **Mixture-of-Experts (MoE) 모델**에 최적화된 성장 전략을 개발하고, 추가적인 계산 예산 없이 더 큰 모델을 구축하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 수렴된 MoE 모델을 위한 **직교(orthogonal) 성장 방법**을 제안했습니다. 깊이(depth) 성장을 위해서는 기존의 "스태킹(stacking)" 방식보다 모델의 학습된 내부 구조를 더 잘 보존하는 **"삽입(interpositional)" 레이어 복사** 방법을 사용합니다. 폭(width) 성장을 위해서는 **새로운 전문가(expert)를 복제하고 가우시안 노이즈를 주입**하여 전문가의 특성화를 촉진하는 전략을 사용했습니다.

## 주요 결과
본 방법론은 동일한 추가 계산 예산 하에 처음부터 훈련하는 것 대비 **10.66%의 평균 정확도 향상**을 달성하며, **17B MoE 모델을 70B 모델**로 성공적으로 확장했습니다. 사전 훈련에 투자된 매몰 비용(sunk FLOPS)과 최종 모델 성능 사이에 **강력한 양의 상관관계**가 있음을 확인했으며, **삽입 방법**이 수렴된 모델의 깊이 성장에 **더 우수함**을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 사전 훈련의 **경제적 효율성**을 크게 향상시킬 수 있는 실용적인 프레임워크를 제공합니다. AI 엔지니어는 더 이상 작은 모델 체크포인트를 폐기하지 않고, 이를 활용하여 **계산 비용을 절감**하면서 더 큰 MoE 모델을 구축할 수 있습니다. 특히, **삽입 기반 깊이 성장**과 **노이즈 주입 폭 성장** 전략은 MoE 모델 확장 시 성능 저하를 최소화하고 전문가 특성화를 촉진하는 데 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.