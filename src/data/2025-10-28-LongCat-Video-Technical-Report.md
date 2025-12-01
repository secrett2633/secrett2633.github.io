---
title: "[논문리뷰] LongCat-Video Technical Report"
excerpt: "Hongyu Li이 [arXiv]에 게시한 'LongCat-Video Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Transformer
  - RLHF
  - Sparse Attention
  - Long Video Generation
  - Coarse-to-Fine Generation
  - Multi-task Learning
  - World Models

permalink: /ai/review/2025-10-28-LongCat-Video-Technical-Report/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22200)

**저자:** Hongyu Li, Zhuoliang Kang, Qilong Huang, Xunliang Cai, Meituan LongCat Team



## 핵심 연구 목표
본 논문은 효율적이고 고품질의 **장시간 비디오 생성** 에 중점을 둔 **13.6B 파라미터** 규모의 **기반 비디오 생성 모델 LongCat-Video** 를 제안합니다. **Text-to-Video, Image-to-Video, Video-Continuation** 등 다양한 비디오 생성 태스크를 단일 모델로 통합하고, 세계 모델(world models) 구축을 위한 핵심 역량을 확보하는 것을 목표로 합니다.

## 핵심 방법론
LongCat-Video는 **Diffusion Transformer (DiT)** 아키텍처를 기반으로 하며, **Video-Continuation 태스크** 에 대한 사전 학습을 통해 긴 비디오의 높은 품질과 시간적 일관성을 유지합니다. 효율적인 추론을 위해 **temporal 및 spatial 축을 따라 coarse-to-fine 생성 전략** 을 사용하고, **LoRA refinement expert** 를 통해 **480p, 15fps 비디오를 720p, 30fps** 로 업스케일링합니다. 또한, **Block Sparse Attention** 메커니즘을 도입하여 고해상도에서의 연산 효율성을 극대화하며, **다중 보상 RLHF(Group Relative Policy Optimization, GRPO)** 훈련을 통해 성능을 강화했습니다.

## 주요 결과
LongCat-Video는 **720p, 30fps 비디오** 를 단 **몇 분 이내에 생성** 할 수 있으며, 이는 기존 방식 대비 **10.1배에서 12.3배** 의 추론 가속화를 달성합니다. **Block Sparse Attention** 은 표준 Dense Attention 대비 **10% 미만의 연산량** 으로 유사한 생성 품질을 유지합니다. 내부 MOS 평가에서 Visual Quality 및 Overall Quality에서 선도적인 오픈소스 모델 및 일부 상업 모델과 유사하거나 우수한 성능을 보였고, **VBench 2.0** 벤치마크에서는 **총점 62.11%** 로 **Commonsense** 차원에서 모든 다른 모델을 능가하는 강력한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
LongCat-Video는 다양한 비디오 생성 태스크를 단일 모델로 처리할 수 있는 강력한 **범용 비디오 생성 모델** 을 제공합니다. 특히 **효율적인 장시간 비디오 생성 능력** 은 실제 애플리케이션 및 **세계 모델 연구** 에 중요한 돌파구를 마련했습니다. **Block Sparse Attention** 과 **RLHF(GRPO)** 같은 고급 기술은 고해상도/장시간 비디오 생성의 효율성과 품질을 향상시키려는 AI 엔지니어에게 중요한 참고 자료가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.