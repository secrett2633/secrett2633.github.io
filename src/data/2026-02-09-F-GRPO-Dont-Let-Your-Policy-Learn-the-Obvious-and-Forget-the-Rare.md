---
title: "[논문리뷰] F-GRPO: Don't Let Your Policy Learn the Obvious and Forget the Rare"
excerpt: "이 [arXiv]에 게시한 'F-GRPO: Don't Let Your Policy Learn the Obvious and Forget the Rare' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM
  - Policy Optimization
  - Reward Models
  - Diversity Preservation
  - Focal Loss
  - Group Sampling
  - Mathematical Reasoning

permalink: /ai/review/2026-02-09-F-GRPO-Dont-Let-Your-Policy-Learn-the-Obvious-and-Forget-the-Rare/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06717)

**저자:** Daniil Plyusov, Alexey Gorbatovski, Boris Shaposhnikov, Viacheslav Sinii, Alexey Malakhov, Daniil Gavrilov



## 핵심 연구 목표
RLVR (Reinforcement Learning with Verifiable Rewards)에서 그룹 샘플링 기반의 정책 업데이트가 흔한 해결책으로 편향되어 희귀하지만 올바른 해결책을 간과하는 '정책 샤프닝(policy sharpening)' 문제를 해결하는 것이 목표입니다. 특히 중간 규모의 그룹 샘플링 크기가 이러한 샤프닝 위험을 최대화함을 이론적으로 분석하고, 이를 완화하면서 계산 비용을 늘리지 않는 방법을 제안합니다.

## 핵심 방법론
논문은 group-relative RLVR의 샘플링 역학을 분석하여, 그룹 크기에 따른 희귀-정답 모드의 누락 확률에 대한 **닫힌 형식(closed-form)** 을 도출했습니다. 이를 기반으로, **Focal loss** 에서 영감을 받은 난이도 인식 이점 스케일링 계수인 **F-GRPO** 를 제안하며, 이 계수는 성공률이 높은 프롬프트에 대한 업데이트 가중치를 낮춰 정책이 흔한 정답에 집중하는 것을 방지합니다. 이 경량 수정은 **GRPO, DAPO, CISPO** 와 같은 기존 그룹 기반 RLVR 알고리즘에 직접 통합될 수 있습니다.

## 주요 결과
**Qwen2.5-7B** 모델에서 F-GRPO(N=8)는 GRPO(N=32) 대비 **4배 적은 롤아웃** 으로 **pass@256** 를 **64.1 → 70.3** 로 크게 향상시키며, **pass@1** 성능을 유지하거나 개선했습니다. 또한, 다른 모델 및 방법론 전반에 걸쳐 **pass@256** 에서 일관된 개선을 보였고, OOD(Out-of-Domain) 벤치마크에서도 **pass@1** 및 **pass@256** 모두 일관된 향상을 기록하여, 중간 그룹 크기에서 희귀-정답 모드 누락 확률이 비단조적으로 나타나는 이론적 예측과 일치함을 입증했습니다.

## AI 실무자를 위한 시사점
RLVR 훈련 시 **그룹 샘플링 크기** 선택의 중요성을 강조하며, 중간 그룹 크기가 오히려 정책 샤프닝을 유발할 수 있음을 인지해야 합니다. **F-GRPO** 는 추가적인 계산 비용이나 모델 변경 없이 **정책 다양성** 을 보존하고 희귀한 정답을 학습하는 데 효과적인 **즉시 적용 가능한(drop-in) 솔루션** 을 제공합니다. 이는 특히 대규모 언어 모델의 추론 능력 향상 및 **OOD 일반화** 에 기여하여, 실용적인 RLVR 시스템 설계에 중요한 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.