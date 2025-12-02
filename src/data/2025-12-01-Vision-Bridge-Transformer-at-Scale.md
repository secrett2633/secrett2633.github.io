---
title: "[논문리뷰] Vision Bridge Transformer at Scale"
excerpt: "Xinchao Wang이 [arXiv]에 게시한 'Vision Bridge Transformer at Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Transformer
  - Bridge Models
  - Conditional Generation
  - Image Editing
  - Video Translation
  - Velocity Matching
  - Diffusion Models
  - Scalability

permalink: /ai/review/2025-12-01-Vision-Bridge-Transformer-at-Scale/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.23199)

**저자:** Zhenxiong Tan, Zeqing Wang, Xingyi Yang, Songhua Liu, Xinchao Wang



## 핵심 연구 목표
본 논문은 **Brownian Bridge Models** 를 대규모 비전 변환 태스크(이미지 및 비디오)에 적용하여 조건부 생성의 효율성을 극대화하는 것을 목표로 합니다. 기존 노이즈-투-데이터(noise-to-data) 패러다임의 비효율성과 기존 브릿지 모델 훈련 목표의 수치적 불안정성 문제를 해결하여 효과적인 데이터-투-데이터(data-to-data) 변환을 실현하고자 합니다.

## 핵심 방법론
제안된 **Vision Bridge Transformer (ViBT)** 는 **Transformer 아키텍처** 를 활용하며, **Qwen-Image-Editing** 및 **Wan 2.1** 과 같은 선도적인 flow-matching 모델로 초기화됩니다. 특히, 훈련 과정의 안정성과 모든 타임스텝에 걸친 균형 잡힌 학습을 위해 새로운 **variance-stabilized velocity-matching objective** 를 제안합니다. 추론 단계에서는 **variance-corrected sampling** 전략을 사용하여 타임스텝에 따라 분산이 부드럽게 감소하도록 조정하여 생성 품질을 향상시킵니다.

## 주요 결과
**ViBT** 는 instruction-based 이미지 편집, 비디오 스타일 변환, depth-to-video 합성 등 다양한 비전 변환 태스크에서 기존 확산 모델들과 견줄 만한 성능을 달성했습니다. Depth-to-video 태스크에서 **ViBT** 는 **VBench Score 0.71** 로 모든 기준선을 능가했으며, 이미지 편집 태스크에서는 특히 객체 추가 및 스타일 변환에서 강력한 결과를 보였습니다. 또한, 조건부 DiT 모델 대비 이미지 및 비디오 태스크에서 **2.28배에서 4.03배 빠른 추론 속도** 를 입증하여 높은 효율성을 보여주었습니다.

## AI 실무자를 위한 시사점
**Brownian Bridge Models** 를 **Transformer** 와 결합하여 대규모로 스케일링함으로써 **instruction-based image editing** 및 복잡한 비디오 변환과 같은 데이터 간 변환 작업에 강력한 솔루션을 제공합니다. 제안된 안정화된 훈련 목표와 **상당히 빠른 추론 속도** 는 실제 AI 애플리케이션에 **ViBT** 를 적용할 때의 실용적인 이점을 강조합니다. 다만, 이미지 편집에는 **s=0.5** , depth-to-video에는 **s=1 또는 s=2** 가 최적의 노이즈 스케일인 것으로 나타나, 태스크별로 **하이퍼파라미터 튜닝** 이 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.