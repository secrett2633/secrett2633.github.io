---
title: "[논문리뷰] More Thought, Less Accuracy? On the Dual Nature of Reasoning in
  Vision-Language Models"
excerpt: "Fabian Waschkowski이 arXiv에 게시한 'More Thought, Less Accuracy? On the Dual Nature of Reasoning in
  Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Multimodal Reasoning
  - Reasoning
  - Visual Forgetting
  - Perceptual Grounding
  - Reinforcement Learning
  - Policy Optimization
  - Visual Anchors

permalink: /ai/review/2025-10-1-More-Thought-Less-Accuracy-On-the-Dual-Nature-of-Reasoning-in-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25848)

**저자:** Xinyu Tian, Shu Zou, Zhaoyuan Yang, Mengqi He, Fabian Waschkowski, Lukas Wesemann, Peter Tu, Jing Zhang



## 핵심 연구 목표
이 논문은 Vision-Language Models (VLMs)의 추론이 논리적 추론을 강화하지만, 기본적인 시각적 질문에서 `인식 기반(perceptual grounding)`을 손상시켜 인식 실패를 초래하는 이중적인 특성을 탐구합니다. 주된 목표는 이러한 현상의 원인인 `시각적 망각(visual forgetting)`을 식별하고, 시각적으로 기반을 둔 추론 궤적을 명시적으로 유도하는 새로운 방법론을 제안하는 것입니다.

## 핵심 방법론
이 논문은 VLM에서 추론이 진행됨에 따라 시각적 입력 의존도가 점진적으로 감소하는 `시각적 망각` 현상을 주요 원인으로 지목합니다. 이를 해결하기 위해 **VISION-ANCHORED POLICY OPTIMIZATION (VAPO)** 를 제안하며, 이는 추론 과정 전반에 걸쳐 `시각적 앵커`를 삽입하여 모델의 지각 능력을 평가하고 `인식 보상`을 통해 시각적 기반 추론을 명시적으로 장려합니다. **GRPO** 기반의 훈련 과정에 통합된 이 방법은 모델이 시각적 단서를 유지하고 활용하도록 유도합니다.

## 주요 결과
제안된 `VAPO-Thinker-7B` 모델은 시각 정보 의존도를 크게 강화하여 다양한 벤치마크에서 새로운 State-of-the-Art (SOTA) 성능을 달성했습니다. 특히 수학 벤치마크에서 평균 **2%** (49.1%에서 **51.1%** ) 향상을 보였으며, 범용 벤치마크에서는 **3.2%** (59.9%에서 **63.1%** )의 상당한 개선을 이루었습니다. 또한, 이 방법은 기존 추론-수준 개선책(visual replay, focus prompt)을 적용한 강력한 베이스라인보다 우수한 성능을 보이며, **GRPO** 대비 약 **30분** 의 미미한 추가 훈련 시간으로 **4.37%** 의 성능 향상을 제공하는 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 VLM의 추론 과정에서 발생하는 `시각적 망각` 문제를 해결하는 효과적인 훈련 기반 솔루션을 제시합니다. **VAPO** 는 모델의 시각적 기반을 강화하여 환각을 줄이고 사실적 정확도를 높여 신뢰성 있는 멀티모달 AI 시스템 구축에 기여합니다. AI 실무자들은 이 방법을 통해 추론 능력과 지각 능력을 동시에 최적화하는 견고한 VLM을 개발할 수 있으며, 특히 시각 집중적인 태스크에서 성능 향상을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.