---
title: "[논문리뷰] UI-AGILE: Advancing GUI Agents with Effective Reinforcement Learning and
  Precise Inference-Time Grounding"
excerpt: "Bingqi Chen이 [arXiv]에 게시한 'UI-AGILE: Advancing GUI Agents with Effective Reinforcement Learning and
  Precise Inference-Time Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Reinforcement Learning
  - Grounding
  - MLLMs
  - Reward Function
  - Resampling
  - Visual Noise Reduction

permalink: /ai/review/2025-8-11-UI-AGILE-Advancing-GUI-Agents-with-Effective-Reinforcement-Learning-and-Precise-Inference-Time-Grounding/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.22025)

**저자:** Shuquan Lian, Yuhang Wu, Jia Ma, Zihan Song, Bingqi Chen, Xiawu Zheng, Hui Li



## 핵심 연구 목표
본 논문은 기존 GUI 에이전트 훈련 및 추론 방식의 세 가지 한계점인 **추론 설계 딜레마(P1)**, **비효율적인 보상(P2)**, 그리고 **고해상도 디스플레이에서의 시각적 노이즈(P3)**를 해결하고자 합니다. 궁극적으로 GUI 에이전트의 접지 정확도(grounding accuracy) 및 전반적인 성능을 향상시키는 포괄적인 프레임워크인 UI-AGILE을 제시하는 것을 목표로 합니다.

## 핵심 방법론
UI-AGILE은 훈련 및 추론 단계에서 개선을 도입합니다. 훈련 시, 계획과 접지 정확도 간의 균형을 맞추는 특수 보상 함수인 **"Simple Thinking" 전략**과 타겟 중심에 대한 정밀한 지역화를 장려하는 **연속 접지 보상(Continuous Grounding Reward)**을 사용합니다. 또한, 희소 보상 문제를 완화하고 학습 난이도를 조절하기 위해 **크롭 기반 리샘플링(Cropping-based Resampling)** 전략을 채택합니다. 추론 시에는 고해상도 스크린샷을 하위 이미지로 분해하고, 후보 요소를 생성한 다음, **시각-언어 모델(VLM)**을 통해 최적의 매칭을 판단하는 **분해 접지 선택(Decomposed Grounding with Selection)** 기법을 제안합니다.

## 주요 결과
UI-AGILE은 **ScreenSpot-Pro** 및 **ScreenSpot-v2** 벤치마크에서 최첨단 성능을 달성했습니다. 특히, 제안된 훈련 및 추론 개선 방법을 모두 사용한 **UI-AGILE-7B**는 ScreenSpot-Pro에서 기존 최고 기준선(**JEDI-7B**) 대비 **23%**의 접지 정확도 향상을 가져왔으며 평균 **59.2%**를 기록했습니다. AndroidControl 벤치마크에서는 **UI-AGILE-7B**가 **77.6% (Low)** 및 **60.6% (High)**의 최고 단계 성공률(SR)을 달성하여 다른 RFT 모델들을 능가했습니다.

## AI 실무자를 위한 시사점
이 연구는 고해상도 인터페이스에 특화된 GUI 에이전트 개발을 위한 실용적인 해결책을 제공합니다. AI 실무자들은 **연속 보상 함수**와 **동적 리샘플링**을 활용하여 희소 보상 환경에서도 더 정확한 접지 모델을 훈련할 수 있습니다. **분해 접지 선택** 기법은 추론 시 시각적 노이즈를 효과적으로 줄여 실제 고해상도 시나리오에서 접지 정확도를 크게 향상시키며, 이는 GUI 에이전트 배포에 직접적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.