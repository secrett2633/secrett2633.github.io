---
title: "[논문리뷰] Taming Hallucinations: Boosting MLLMs' Video Understanding via Counterfactual Video Generation"
excerpt: "arXiv에 게시된 'Taming Hallucinations: Boosting MLLMs' Video Understanding via Counterfactual Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MLLMs
  - Video Understanding
  - Hallucinations
  - Counterfactual Generation
  - Diffusion Models
  - Reinforcement Learning
  - QA Dataset
  - DNA-Train

permalink: /ai/review/2026-01-05-Taming-Hallucinations-Boosting-MLLMs-Video-Understanding-via-Counterfactual-Video-Generation/

toc: true
toc_sticky: true

date: 2026-01-05 00:00:00+0900+0900
last_modified_at: 2026-01-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24271)

**저자:** Zhe Huang, Hao Wen, Aiming Hao, Bingze Song, Meiqi Wu, Jiahong Wu, Xiangxiang Chu, Sheng Lu, Haoqian Wang



## 핵심 연구 목표
본 논문은 **멀티모달 대규모 언어 모델(MLLMs)** 이 시각적 내용보다 언어적 선험 지식에 과도하게 의존하여 발생하는 **시각적으로 근거 없는 환각(hallucinations)** 문제를 해결하는 것을 목표로 합니다. 특히 상식에 반하는 **반사실적(counterfactual) 비디오** 를 처리할 때 두드러지는 이러한 한계를 극복하고 MLLM의 비디오 이해 능력을 향상시키고자 합니다.

## 핵심 방법론
저자들은 제어 가능한 **확산(diffusion) 기반 비디오 편집** 을 활용하여 실제 비디오를 반사실적 시나리오로 변환하는 **DualityForge** 라는 새로운 반사실적 데이터 합성 프레임워크를 제안합니다. 이 프레임워크는 원본-편집 비디오 쌍과 함께 고품질 QA 쌍을 자동으로 생성하며, **Duality-Normalized Advantage Training (DNA-Train)** 이라는 2단계 **SFT-RL(Supervised Fine-Tuning + Reinforcement Learning)** 훈련 방식을 도입합니다. **RL 단계** 에서는 **쌍별 l1 advantage normalization** 을 적용하여 정책 최적화의 안정성을 높이고 시각적 근거에 기반한 추론을 강제합니다.

## 주요 결과
제안된 방법은 **DualityVidQA-Test** 벤치마크에서 **Qwen2.5-VL-7B 베이스라인** 대비 **24.0%** 의 상당한 성능 향상을 달성했습니다. 특히 **DNA-Train-7B 모델** 은 환각 감지 부문에서 **DualityVidQA-Test에서 76.8%** , **EventHallusion에서 61.3%** 라는 최고 점수를 기록하며 환각을 크게 줄였습니다. 또한 TempCompass, MVBench 등 일반적인 비디오 이해 벤치마크에서도 일관된 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **고품질 반사실적 비디오 데이터** 를 확장 가능하게 생성하는 방법을 제공하여, MLLM의 고질적인 데이터 불균형 문제를 해결하고 더욱 견고한 모델을 훈련할 수 있는 토대를 마련합니다. **DNA-Train** 전략은 실제 시나리오에서 MLLM을 배포할 때 필수적인 환각 완화와 일반 성능 유지라는 두 마리 토끼를 잡을 수 있는 실용적인 접근 방식을 제시합니다. 이는 **시각적 근거** 가 언어적 선험 지식보다 중요함을 강조하며, 차세대 MLLM 개발 방향에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.