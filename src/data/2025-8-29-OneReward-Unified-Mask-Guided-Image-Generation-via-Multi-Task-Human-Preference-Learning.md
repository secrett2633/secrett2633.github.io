---
title: "[논문리뷰] OneReward: Unified Mask-Guided Image Generation via Multi-Task Human
  Preference Learning"
excerpt: "Yitong Wang이 arXiv에 게시한 'OneReward: Unified Mask-Guided Image Generation via Multi-Task Human
  Preference Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Mask-Guided Editing
  - Reinforcement Learning
  - Human Preference Learning
  - Vision-Language Models
  - Multi-Task Learning
  - Flow Matching

permalink: /ai/review/2025-8-29-OneReward-Unified-Mask-Guided-Image-Generation-via-Multi-Task-Human-Preference-Learning/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21066)

**저자:** Yuan Gong*, Xionghui Wang*†, Jie Wu, Shiyin Wang, Yitong Wang, Xinglong Wu



## 핵심 연구 목표
논문은 마스크 기반 이미지 편집(Image Fill, Extend, Object Removal, Text Rendering)의 다양한 하위 태스크에서 기존 모델들의 제한적인 범용성과 태스크별 **지도 학습 미세 조정(SFT)** 의 비효율성을 해결하고자 합니다. 이를 위해 **단일 Vision-Language Model (VLM)** 을 보상 모델로 활용하여 여러 태스크에 걸쳐 모델의 생성 능력을 향상시키는 **통합 강화 학습 프레임워크(OneReward)** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**OneReward** 프레임워크는 **단일 VLM** 을 사용하여 태스크 카테고리와 평가 지표 정보를 쿼리에 직접 통합함으로써, 다양한 태스크와 평가 기준에 따라 생성된 이미지의 우열을 효과적으로 판단합니다. **Seedream 3.0 Fill** 모델은 **Flow Matching** 기반의 사전 훈련된 모델을 정책 모델로 삼고, **다차원적 인간 선호도 데이터셋** 및 VLM의 보상 신호를 활용하여 **태스크별 SFT 없이** 강화 학습을 통해 직접 최적화됩니다. 또한, 동적으로 업데이트되는 EMA 모델을 참조 모델로 사용하는 전략을 도입했습니다.

## 주요 결과
**Seedream 3.0 Fill** 은 이미지 채우기 태스크에서 **69.04%의 사용성 비율** 을 달성하여 경쟁 모델들을 **16.93%p** 차이로 앞섰으며, 객체 제거 태스크에서도 **82.22%의 사용성 비율** 과 **86.33%의 제거 품질 점수** 로 최고 성능을 기록했습니다. **OneReward** 보상 모델은 텍스트 정렬(이미지 채우기)에서 **83.77%** , 객체 제거 품질에서 **84.93%** 의 높은 선호도 식별 정확도를 보였습니다. 이 결과는 상용 및 오픈소스 모델들을 일관되게 능가하는 **Seedream 3.0 Fill** 의 뛰어난 성능을 입증합니다.

## AI 실무자를 위한 시사점
**단일 VLM 기반의 강화 학습** 을 통해 다양한 이미지 편집 작업을 통합적으로 처리할 수 있는 효율적인 프레임워크를 제시하여, 제너레이티브 모델의 **범용성과 훈련 효율성** 을 크게 향상시킬 수 있습니다. 특히 **태스크별 SFT 없이** 최첨단 성능을 달성한 점은 복잡한 멀티태스크 환경에서 모델 개발 및 배포의 복잡성을 줄이는 데 기여할 것입니다. **다차원적 인간 선호도 데이터셋** 구축 및 활용 전략은 AI 시스템의 사용자 경험 정렬에 중요한 인사이트를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.