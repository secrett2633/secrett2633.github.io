---
title: "[논문리뷰] Reinforced Visual Perception with Tools"
excerpt: "Mingyang Fu이 [arXiv]에 게시한 'Reinforced Visual Perception with Tools' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Reasoning
  - Multimodal LLMs
  - Reinforcement Learning
  - Tool Usage
  - Perception-heavy Benchmarks
  - GRPO
  - Vision Tools

permalink: /ai/review/2025-9-9-Reinforced-Visual-Perception-with-Tools/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01656)

**저자:** Zetong Zhou, Dongping Chen, Zixian Ma, Zhihan Hu, Mingyang Fu, Sinan Wang, Yao Wan, Zhou Zhao, Ranjay Krishna



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(LLM)이 복잡한 시각적 추론 문제를 해결하고 외부 시각 도구를 효과적으로 활용하는 능력을 강화하는 것을 목표로 합니다. 기존 지도 학습(SFT) 기반 접근 방식의 한계인 고비용 데이터 생성, 섬세한 데이터 필터링 필요성, 그리고 제한된 일반화 능력을 극복하고자 합니다.

## 핵심 방법론
저자들은 **GRPO(Group Relative Policy Optimization)** 기반의 새로운 강화 학습(RL) 알고리즘인 **REVPT** 를 제안합니다. 이 방법론은 **객체 탐지, 깊이 추정, 엣지 탐지, 줌 인** 의 네 가지 핵심 시각 도구를 사용하여, 모델이 문제 해결 과정에서 도구 사용 정책을 **적응적으로 학습** 하고 도구 결과를 분석하여 최종 응답을 생성하도록 훈련합니다. 특히, **콜드 스타트(cold-start)** 단계에서는 **GPT-4.1** 로 생성된 고품질 도구 사용 데이터를 활용하여 초기 훈련의 안정성을 확보합니다.

## 주요 결과
**REVPT-3B** 및 **REVPT-7B** 모델은 **CV-Bench** 에서 각각 **9.03%** 및 **9.44%** 의 인상적인 성능 향상을 보이며, **SAT, CV-Bench, BLINK, MMStar** 등 인지 중심 벤치마크에서 기존 지도 학습 및 텍스트 기반 RL 방식보다 뛰어난 최첨단 성능을 달성했습니다. 또한, **객체 탐지** 또는 **깊이 추정** 도구를 제거한 실험에서는 **MMVP** 점수가 **12.33%** 하락하고 **BLINK Relation** 점수가 **5%** 하락하는 등, 시각 도구 사용이 REVPT의 효과에 필수적임을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
**REVPT** 는 강화 학습을 통해 멀티모달 LLM이 외부 시각 도구를 활용하여 복잡한 시각 추론 능력을 효과적으로 향상시킬 수 있음을 보여줍니다. 이는 **데이터 라벨링 비용이 높은 AI 애플리케이션** 이나 **새로운 환경에 대한 일반화가 필요한 시스템** 개발에 실용적인 대안을 제시하며, 모델이 문제 해결 전략을 동적으로 조정하도록 돕는 강력한 접근 방식을 제공합니다. 다만, 효과적인 도구 사용을 위해서는 **도구 선택의 균형** 과 **고품질 학습 데이터 구성** 이 모델의 일반화 능력을 유지하는 데 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.