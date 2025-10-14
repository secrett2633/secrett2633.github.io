---
title: "[논문리뷰] Self-Rewarding Vision-Language Model via Reasoning Decomposition"
excerpt: "Zhenwen Liang이 [arXiv]에 게시한 'Self-Rewarding Vision-Language Model via Reasoning Decomposition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Reinforcement Learning
  - Self-Rewarding
  - Reasoning Decomposition
  - Visual Perception
  - Language Reasoning
  - Hallucinations
  - Language Shortcuts

permalink: /ai/review/2025-8-28-Self-Rewarding_Vision-Language_Model_via_Reasoning_Decomposition/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19652)

**저자:** Zongxia Li, Wenhao Yu, Chengsong Huang, Zhenwen Liang, Rui Liu, et al.



## 핵심 연구 목표
Vision-Language Model (VLM)이 겪는 **시각적 환각** 및 **언어적 지름길** 문제를 해결하는 것을 목표로 합니다. 기존 VLM 훈련 방식이 외부 시각적 감독 부족으로 인해 발생하는 문제들을 극복하고, **외부 시각적 감독 없이** VLM의 시각적 추론 능력을 강화하는 **자기 보상(self-rewarding)** 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 VLM의 추론 과정을 **시각적 인식**과 **언어 추론**의 두 단계로 분해하는 **Vision-SR1**을 제안합니다. 모델은 첫 번째 단계에서 이미지와 질의를 바탕으로 **독립적인 시각적 인식(Visual Perception)**을 생성하고, 두 번째 단계에서는 이 인식 정보만을 사용하여 언어 추론 및 최종 답변을 생성합니다. 중요한 것은, 두 번째 단계에서 생성된 인식 정보만으로 정확한 답변을 도출할 수 있을 때 **자기-시각 보상(self-visual reward)**을 부여하여, 시각적 인식의 충실도를 검증합니다.

## 주요 결과
**Qwen2.5-VL-7B** 백본 모델을 사용한 **Vision-SR1**은 다양한 벤치마크에서 평균 **58.8%**의 성능을 달성하여, **Vision-R1** (57.4%) 및 지도 학습 기반 모델 (55.1%)을 뛰어넘었습니다. 특히 **MMMU-Pro**에서 **49.1%**, **MMMU**에서 **57.2%**를 기록하며 기존 방식 대비 우수한 성능을 보였습니다. 제안된 **Language Shortcut Rate (LSR)** 지표를 통해 **Vision-SR1**이 언어적 지름길 사용 경향을 현저히 낮추었음이 확인되었습니다.

## AI 실무자를 위한 시사점
**Vision-SR1**은 **외부의 고비용 시각적 주석 없이** VLM의 시각적 추론 능력을 개선하는 실용적인 방법을 제공합니다. 이 접근 방식은 VLM의 **시각적 환각** 및 **언어적 지름길** 문제를 효과적으로 완화하여, 모델의 **강건성(robustness)**과 **신뢰성(reliability)**을 높입니다. 특히 복잡한 멀티모달 태스크에서 VLM이 시각 정보에 더 잘 **접지(grounding)**되도록 유도하여, AI 애플리케이션의 성능 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.