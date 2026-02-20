---
title: "[논문리뷰] The Path Not Taken: RLVR Provably Learns Off the Principals"
excerpt: "arXiv에 게시된 'The Path Not Taken: RLVR Provably Learns Off the Principals' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Parameter-Efficient Fine-Tuning
  - Optimization Bias
  - Spectral Geometry
  - Model Sparsity
  - LoRA

permalink: /ai/review/2025-11-12-The-Path-Not-Taken-RLVR-Provably-Learns-Off-the-Principals/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08567)

**저자:** Hanqing Zhu, Zhenyu Zhang, Hanxian Huang, DiJia Su, Zechun Liu, Jiawei Zhao, Igor Fedorov, Hamed Pirsiavash, Zhizhou Sha, Jinwon Lee, David Z. Pan, Zhangyang Wang, Yuandong Tian, Kai Sheng Tai



## 핵심 연구 목표
RLVR(Reinforcement Learning with Verifiable Rewards)이 LLM 추론 능력을 크게 향상시키지만, 놀랍게도 **소수의 파라미터만 수정** 하는 모순을 해결하는 것이 목표입니다. 이 논문은 이러한 겉보기에는 희박한 업데이트 뒤에 숨겨진 **모델 조건부 최적화 편향** 의 근본적인 메커니즘을 규명하고, RL과 SFT(Supervised Fine-Tuning)의 근본적으로 다른 학습 동역학을 이해하고자 합니다.

## 핵심 방법론
논문은 RLVR의 최적화 동역학을 설명하기 위해 **Three-Gate Theory (KL Anchor, Model Geometry, Precision)** 를 제안합니다. **Gate I (KL Anchor)** 는 온-정책 단계에서 KL 제약을 부과하고, **Gate II (Model Geometry)** 는 업데이트 방향을 **저곡률(low-curvature) 및 스펙트럼 보존(spectrum-preserving) 부분 공간** 으로 유도하며, **Gate III (Precision)** 는 bfloat16 정밀도 제한으로 인해 비선호 영역의 미세 업데이트를 숨겨 희소성을 야기한다고 설명합니다. 이를 검증하기 위해 **Qwen3-8B** 및 **DS-Qwen-1.5B** 모델에 대한 광범위한 스펙트럼 분석 및 마스킹 기반 실험을 수행했습니다.

## 주요 결과
RLVR은 **사전 학습된 스펙트럼 구조를 보존** 하고, **주요(principal) 가중치 업데이트를 피하며** **최소한의 부분 공간 회전** 을 보이는 반면, SFT는 스펙트럼을 왜곡하고 주요 가중치를 목표로 합니다. 실험 결과, RLVR의 업데이트는 **주요 가중치(principal weights)와 겹침(overlap)이 무작위(random)보다 낮은** 것으로 나타났습니다. **특정 마스킹 전략을 사용한 파인튜닝 실험** 에서 **M_princ** (주요 가중치만 업데이트) 마스크는 **53.82%의 평균 정확도** 를 보여 **Dense 모델(57.44%)** 대비 성능이 저하되었으며, **M_low U M_princ** (비주요 및 저크기 가중치 업데이트) 마스크는 **56.24%** 로 Dense 모델과 유사한 성능을 달성했습니다. 또한, **PiSSA** 는 **LoRA** 대비 추가적인 성능 이득을 제공하지 못하고 높은 학습률에서 불안정성을 보였습니다.

## AI 실무자를 위한 시사점
RLVR은 SFT와 **본질적으로 다른 최적화 메커니즘** 을 따르므로, SFT 시대의 PEFT(Parameter-Efficient Fine-Tuning) 방법론을 RLVR에 직접 적용하는 것은 비효율적일 수 있습니다. 특히 **주요 방향(principal directions)을 타겟팅하는 PEFT 기법(예: PiSSA)** 은 RLVR의 **비주요(off-principal) 동역학** 과 맞지 않아 성능 저하나 불안정성을 초래할 수 있습니다. 따라서 RLVR의 고유한 최적화 특성을 고려한 **기하학적 인식(geometry-aware) PEFT 방법론** 개발이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.