---
title: "[논문리뷰] DeepVision-103K: A Visually Diverse, Broad-Coverage, and Verifiable Mathematical Dataset for Multimodal Reasoning"
excerpt: "Wei Wang이 [arXiv]에 게시한 'DeepVision-103K: A Visually Diverse, Broad-Coverage, and Verifiable Mathematical Dataset for Multimodal Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Mathematical Dataset
  - RLVR
  - Data Curation
  - Visual Diversity
  - K12 Mathematics
  - Large Multimodal Models

permalink: /ai/review/2026-02-23-DeepVision-103K-A-Visually-Diverse-Broad-Coverage-and-Verifiable-Mathematical-Dataset-for-Multimodal-Reasoning/

toc: true
toc_sticky: true

date: 2026-02-23 00:00:00+0900+0900
last_modified_at: 2026-02-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16742)

**저자:** Haoxiang Sun, Lizhen Xu, Bing Zhao, Wotao Yin, Wei Wang, Boyu Yang, Rui Wang, Hu Wei



## 핵심 연구 목표
기존 멀티모달 RLVR(Reinforcement Learning with Verifiable Rewards) 학습 데이터셋의 제한적인 다양성, 커버리지, 일반화 능력을 극복하는 것을 목표로 합니다. 특히, 수동 생성, 합성 또는 재조합된 데이터셋의 한계를 넘어, LMM(Large Multimodal Model)의 시각적 추론 및 반성 능력을 향상시키기 위한 **시각적으로 다양하고 광범위하며 검증 가능한** 수학 데이터셋인 **DeepVision-103K** 를 제안합니다.

## 핵심 방법론
**MM-MathInstruct-3M** 및 **MultiMath-300K** 에서 초기 3.3M 샘플을 수집한 후, 세 단계의 데이터 큐레이션 파이프라인을 적용했습니다. 첫째, **유효성 필터링(Validity Filtering)** 을 통해 검증 가능한 고유한 답변을 가진 문제만 선별했습니다. 둘째, **난이도 필터링(Difficulty Filtering)** 에서는 **MiMo-VL-7B-SFT** 롤아웃과 **MathVerify** 를 사용하여 모델 역량에 기반한 통과율을 보정하고 적절한 난이도의 샘플을 유지했습니다. 셋째, **질의 정확성 검증(Query Correctness Verification)** 을 위해 **Gemini-3-Flash** 를 활용하여 이미지-텍스트 불일치 및 답변의 정확성을 확인하여 최종적으로 77K개의 고품질 QA 쌍을 확보했습니다.

## 주요 결과
**DeepVision-103K** 로 학습된 모델은 수학 및 일반 멀티모달 벤치마크에서 우수한 성능을 달성했습니다. 특히, **Qwen3-VL-8B-DeepVision** 은 WeMath에서 **85.11%** , LogicVista에서 **65.62%** 의 최고 성능을 기록하며 기존 모델을 능가했습니다. **MiMo-VL-7B-DeepVision** 은 모든 벤치마크에서 **2.91%에서 8.56%** 범위의 일관된 성능 향상을 보였습니다. 시각 논리 데이터의 통합은 수학 전용 학습 대비 우월한 성능을 보여주며, 질의 정확성 검증이 모델 성능에 필수적임을 입증했습니다.

## AI 실무자를 위한 시사점
**DeepVision-103K** 는 LMM의 RLVR 학습을 위한 **고품질의 검증 가능한 데이터셋** 을 제공하여, 모델의 시각적 인지, 반성, 수학적 추론 능력을 실질적으로 향상시킵니다. 본 논문의 **세 단계 큐레이션 파이프라인** 은 노이즈나 모호성 없이 신뢰할 수 있는 데이터를 구축하는 모범 사례를 제시합니다. 또한, 수학 문제와 함께 **시각 논리 문제를 통합** 하는 것이 멀티모달 추론 능력의 전반적인 개선에 기여함을 보여주어, 다양한 도메인의 데이터 조합 전략에 대한 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.