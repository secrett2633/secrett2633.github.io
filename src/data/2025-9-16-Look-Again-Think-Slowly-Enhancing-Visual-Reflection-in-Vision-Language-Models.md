---
title: "[논문리뷰] Look Again, Think Slowly: Enhancing Visual Reflection in Vision-Language
  Models"
excerpt: "Shuo Ren이 [arXiv]에 게시한 'Look Again, Think Slowly: Enhancing Visual Reflection in Vision-Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Visual Reasoning
  - Reflection
  - Reinforcement Learning
  - Visual Attention
  - Slow Thinking
  - Multimodal Agents

permalink: /ai/review/2025-9-16-Look-Again-Think-Slowly-Enhancing-Visual-Reflection-in-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.12132)

**저자:** Pu Jian, Junhong Wu, Wei Sun, Chen Wang, Shuo Ren, Jiajun Zhang



## 핵심 연구 목표
논문은 기존 Vision-Language Models (VLMs)이 복잡한 시각적 추론 과정에서 시각적 정보에 대한 의존도가 빠르게 감소하여 "텍스트 환각" 및 "시각적 무시"를 겪는 문제를 해결하고자 합니다. 궁극적으로 모델이 **시각적 입력에 기반하여 추론 과정을 능동적으로 확인하고 개선**하는 진정한 "시각적 반성(visual reflection)" 능력을 부여하는 것이 목표입니다.

## 핵심 방법론
제안하는 **Reflection-V**는 두 단계 훈련 전략을 따릅니다: **콜드 스타트(cold-start) 초기화**와 **강화 학습(reinforcement learning, RL)**. 콜드 스타트 단계에서는 **멀티모달 에이전트**를 활용하여 LLM과 VLM이 상호작용하며 **시각적 반성 패턴을 포함한 시각 중심 추론 데이터**를 구축합니다. RL 단계에서는 **시각적 어텐션 기반 보상(visual attention-based reward)**을 **그룹 상대 정책 최적화(group relative policy optimization, GRPO)**에 통합하여 모델이 시각 정보에 지속적으로 주의를 기울이도록 장려합니다.

## 주요 결과
**Reflection-V**는 다양한 시각적 추론 벤치마크(수학, 다학제, 일반 추론)에서 **상당한 성능 향상**을 달성했습니다. 특히, **Reflection-V-7B**는 **MathVision**에서 **33.9%**, **MMMU**에서 **61.3%**의 정확도를 기록하며 기존의 **QwenVL2.5-7B** (MathVision 25.1%, MMMU 54.3%) 및 다른 오픈소스 모델들을 능가했습니다. 정량적 분석 결과, **Reflection-V**는 시각 토큰에 대한 어텐션 가중치 감소가 더 느리며, 시각적 의존성 측정의 신뢰 구간 상한선이 거의 평평하게 유지되어 시각 정보에 대한 지속적인 의존성을 보여주며 **시각적 환각을 효과적으로 억제**하는 것으로 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **복잡한 시각적 추론 태스크**에서 VLM의 신뢰성과 강건성을 크게 향상시킬 수 있는 실용적인 방법을 제시합니다. **멀티모달 에이전트를 활용한 데이터 구축**과 **시각적 어텐션 기반 보상**을 통해 기존 VLM의 한계를 극복하고, 모델이 **능동적으로 시각 정보를 재확인**하도록 유도하는 것은 중요한 발전입니다. 실무자들은 이 **두 단계 훈련 패러다임**을 활용하여 기존 VLM을 강화하고, 장기적인 추론이 필요한 애플리케이션에서 모델의 성능을 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.