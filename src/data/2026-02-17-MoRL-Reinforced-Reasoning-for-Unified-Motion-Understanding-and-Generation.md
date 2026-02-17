---
title: "[논문리뷰] MoRL: Reinforced Reasoning for Unified Motion Understanding and Generation"
excerpt: "이 [arXiv]에 게시한 'MoRL: Reinforced Reasoning for Unified Motion Understanding and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Motion Understanding
  - Motion Generation
  - Reinforcement Learning
  - Chain-of-Motion
  - Multimodal LLM
  - Human Motion Synthesis
  - Text-to-Motion

permalink: /ai/review/2026-02-17-MoRL-Reinforced-Reasoning-for-Unified-Motion-Understanding-and-Generation/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14534)

**저자:** Hongpeng Wang, Zeyu Zhang, Wenhao Li, Hao Tang



## 핵심 연구 목표
인간 모션 이해 및 생성 분야에서 **제한적인 추론 능력** 과 **테스트 시간 계획의 한계** 를 극복하는 것을 목표로 합니다. 이를 위해, 모션 이해와 생성을 통합하는 **단일 멀티모달 모션 모델** 을 제안하여, 논리적 추론과 지각적 사실성을 동시에 개선하고자 합니다.

## 핵심 방법론
MoRL은 **합성 CoT(Chain-of-Thinking) 데이터셋 (MoUnd-CoT-140K, MoGen-CoT-140K)** 을 활용한 **지도 학습 미세 조정(SFT)** 과 **검증 가능한 보상 기반의 강화 학습(RLVR)** 을 통해 훈련됩니다. 특히, 모션 이해를 위한 **의미 정렬 및 추론 일관성 보상** 과 모션 생성을 위한 **물리적 타당성 및 텍스트-모션 일관성 보상** 을 설계하였으며, 추론 시 **Chain-of-Motion (CoM)** 전략을 도입하여 단계별 계획 및 반영을 가능하게 합니다.

## 주요 결과
MoRL은 **HumanML3D** 및 **KIT-ML** 데이터셋에서 최신 베이스라인 대비 상당한 성능 향상을 달성했습니다. HumanML3D 모션 이해 벤치마크에서 **Motion Agent** 보다 높은 **BLEU@1 및 BLEU@4** 점수를 기록했으며, **CIDEr 점수 35.8** 을 달성하여 인간 주석과의 더 강력한 일관성을 보였습니다. 모션 생성에서는 **R-Precision Top-1/2/3** 에서 일관된 개선과 **가장 낮은 멀티모달 거리** 를 통해 우수한 텍스트-모션 정렬 및 사실성을 입증했습니다.

## AI 실무자를 위한 시사점
MoRL은 강화 학습과 CoT/CoM 추론을 통해 복잡한 모션 이해 및 생성에서 **논리적 일관성과 물리적 사실성** 을 효과적으로 결합하는 새로운 방향을 제시합니다. **대규모 합성 CoT 데이터셋 구축** 과 **작업별 보상 설계** 는 다른 멀티모달 LLM의 추론 능력을 향상시키는 데 중요한 통찰력을 제공할 수 있습니다. 다만, CoM 추론 과정이 **추가적인 연산 시간** 을 요구하므로 실시간 애플리케이션 적용 시 효율성 최적화가 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.