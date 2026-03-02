---
title: "[논문리뷰] Enhancing Spatial Understanding in Image Generation via Reward Modeling"
excerpt: "arXiv에 게시된 'Enhancing Spatial Understanding in Image Generation via Reward Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Reward Modeling
  - Spatial Understanding
  - Reinforcement Learning
  - Visual Language Models
  - Text-to-Image
  - Preference Learning

permalink: /ai/review/2026-03-02-Enhancing-Spatial-Understanding-in-Image-Generation-via-Reward-Modeling/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.24233)

**저자:** Zhenyu Tang, Chaoran Feng, Yufan Deng, Jie Wu, Xiaojie Li, Rui Wang, Yunpeng Chen, Daquan Zhou



## 핵심 연구 목표
본 연구는 복잡한 공간 관계가 포함된 텍스트 프롬프트에서 현재 **Text-to-Image(T2I) 모델** 이 직면하는 한계를 해결하고, 생성된 이미지의 공간적 정확도를 향상시키는 것을 목표로 합니다. 특히 기존 보상 모델들이 공간 이해도 평가에 실패하는 문제를 극복하고, 신뢰할 수 있는 보상 모델을 통해 온라인 **강화 학습(RL)** 을 효과적으로 수행하고자 합니다.

## 핵심 방법론
연구팀은 8만 개 이상의 적대적 선호도 쌍으로 구성된 **SpatialReward-Dataset** 을 구축하고, 이를 기반으로 공간 관계 평가를 위한 강력한 보상 모델인 **SpatialScore** 를 개발했습니다. **SpatialScore** 는 **Qwen2.5-VL-7B** 를 백본으로 사용하며 **LoRA** 를 통해 파인튜닝되었고, 온라인 RL 훈련에서는 **Flux.1-dev** 모델에 **GRPO 알고리즘** 과 효율적인 **top-k 필터링 전략** 을 적용하여 공간 이해도를 강화했습니다.

## 주요 결과
**SpatialScore** 는 보상 모델 평가 벤치마크에서 **95.77%** 의 선호도 예측 정확도를 달성하여 **GPT-5** 및 **Gemini-2.5 Pro** 와 같은 선도적인 독점 모델의 성능을 능가했습니다. **SpatialScore** 를 통한 온라인 RL 훈련은 **Flux.1-dev** 모델의 공간 이해도를 크게 향상시켜, 자체 **SpatialScore 평가에서 2.18에서 7.81로** 점수가 증가했습니다. 여러 텍스트-이미지 정렬 벤치마크에서 일관된 성능 향상이 관찰되었습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 공간 관계를 정확하게 이해하는 **T2I 모델** 개발에 중요한 진전을 가져왔습니다. **SpatialScore** 와 같은 전문화된 보상 모델을 구축하고 이를 온라인 **강화 학습** 에 활용함으로써, 기존 **VLM** 및 **T2I 모델** 의 공간 추론 한계를 극복할 수 있음을 보여주었습니다. 이는 향후 고품질의 공간적으로 정확한 이미지 생성 시스템을 설계하는 데 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.