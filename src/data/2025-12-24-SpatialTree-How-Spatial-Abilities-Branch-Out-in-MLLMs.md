---
title: "[논문리뷰] SpatialTree: How Spatial Abilities Branch Out in MLLMs"
excerpt: "arXiv에 게시된 'SpatialTree: How Spatial Abilities Branch Out in MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatial Intelligence
  - Multimodal LLMs
  - Cognitive Hierarchy
  - Benchmark
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Spatial Reasoning

permalink: /ai/review/2025-12-24-SpatialTree-How-Spatial-Abilities-Branch-Out-in-MLLMs/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20617)

**저자:** Yuxi Xiao, Longfei Li, Shen Yan, Xinhang Liu, Sida Peng, Yunchao Wei, Xiaowei Zhou, Bingyi Kang



## 핵심 연구 목표
멀티모달 대규모 언어 모델(MLLM) 내에서 공간 능력의 계층적 구조가 제대로 이해되지 않고 단편적으로 연구되는 문제를 해결하는 것을 목표로 합니다. 인지 과학에서 영감을 받은 **SpatialTree** 프레임워크를 통해 MLLM의 공간 지능을 체계적으로 진단하고, 공간 능력이 어떻게 발현되고 상호작용하며 전이되는지 밝히고자 합니다.

## 핵심 방법론
공간 능력을 L1(지각), L2(정신적 매핑), L3(정신적 시뮬레이션), L4(에이전트 역량)의 4단계 계층으로 분류하는 **SpatialTree** 분류 체계를 제안합니다. 이 분류를 기반으로 **27개의 세부 능력** 을 포함하는 최초의 역량 중심 계층적 벤치마크를 구축하고, 주류 MLLM(예: **Gemini 2.5 Pro** , **GPT-4o** )을 평가했습니다. 또한 **Supervised Fine-Tuning(SFT)** 과 **Hierarchy-Aware Reward** 가 적용된 **강화 학습(RL)** 을 통해 능력 전이 역학을 분석했습니다.

## 주요 결과
L1(지각) 기술은 대부분 **독립적** 인 반면, L2-L4의 고수준 기술은 **강하게 상호 연관** 되어 있음을 확인했습니다. **L1-Geo.Dist** 와 같은 단일 L1 능력에 대한 SFT는 **L2 Underst. (+2.0%)** 및 **L4 Goal Exec. (+3.4%)** 와 같은 고수준 능력으로의 **강한 교차 수준 전이** 를 보였습니다. 여러 L1 능력을 통합한 SFT는 **전반적인 성능에서 +1.1%의 시너지 효과** 를 보였고, 특히 **L1.Motion** 과 같은 기존에 저조했던 능력에서 **+0.7%의 개선** 을 가져왔습니다. 또한, 직관적인 지각에는 불필요한 추론을 억제하고 복잡한 계획에는 추론을 장려하는 **auto-think 전략** 을 통해 RL이 모든 수준에서 일관되게 **+3.6% 성능 향상** 을 달성했습니다.

## AI 실무자를 위한 시사점
MLLM 개발 시 공간 지능을 효과적으로 확장하기 위해 **인지 계층 구조** 를 이해하는 것이 중요하며, **L1 지각 능력** 을 강화하는 것이 상위 수준의 에이전트 역량으로 이어지는 핵심적인 토대임을 시사합니다. 직관적인 지각과 복잡한 추론에 대해 **차별화된 학습 및 추론 전략(예: auto-think)** 을 적용하는 것이 MLLM의 전반적인 공간 능력 향상에 필수적입니다. **SpatialTree** 는 MLLM의 공간 능력 개발 로드맵을 수립하고, 다양한 데이터 유형을 전략적으로 활용하는 데 유용한 프레임워크를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.