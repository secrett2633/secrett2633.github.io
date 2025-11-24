---
title: "[논문리뷰] Ask-to-Clarify: Resolving Instruction Ambiguity through Multi-turn
  Dialogue"
excerpt: "Hui Zhang이 [arXiv]에 게시한 'Ask-to-Clarify: Resolving Instruction Ambiguity through Multi-turn
  Dialogue' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Human-Robot Interaction
  - Multi-turn Dialogue
  - Instruction Following
  - Vision-Language Models
  - Diffusion Models
  - Ambiguity Resolution
  - Low-level Actions

permalink: /ai/review/2025-9-22-Ask-to-Clarify-Resolving-Instruction-Ambiguity-through-Multi-turn-Dialogue/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15061)

**저자:** Xingyao Lin, Xinghao Zhu, Tianyi Lu, Sicheng Xie, Hui Zhang, Xipeng Qiu, Zuxuan Wu, Yu-Gang Jiang



## 핵심 연구 목표
현재 **VLA(Vision-Language-Action) 기반 로봇**이 모호한 지시를 처리하지 못하고 수동적으로 명령을 실행하는 한계를 해결하는 것이 목표입니다. 궁극적으로 인간과 적극적으로 소통하여 모호성을 해소하고, 실제 환경에서 **저수준 액션**을 **종단간(end-to-end)**으로 생성하는 협업 로봇 에이전트를 구축하고자 합니다.

## 핵심 방법론
본 연구는 **Ask-to-Clarify 프레임워크**를 제안하며, 이는 **VLM(Vision-Language Model)** 기반의 협업 컴포넌트와 **확산 모델(diffusion model)** 기반의 액션 생성 컴포넌트로 구성됩니다. **연결 모듈(connection module)**은 VLM의 출력을 바탕으로 관측을 조정하여 확산 모델에 신뢰성 있는 조건을 제공하며, **두 단계 지식 단열(knowledge-insulation) 학습 전략**을 사용합니다. 1단계에서는 특정 대화 데이터로 VLM의 모호성 해결 능력을 미세 조정하고, 2단계에서는 VLM을 고정한 채 액션 컴포넌트를 통합하고 미세 조정하여 대화 능력을 보존합니다. 추론 시에는 **시그널 감지기(signal detector)**를 통해 질문과 액션 사이를 원활하게 전환합니다.

## 주요 결과
제안된 Ask-to-Clarify 프레임워크는 8가지 실제 태스크에서 기존 SOTA VLA 모델들을 크게 능가했습니다. 특히, "Put the Object on the plate" 유형 태스크에서 **95.0%**, "Pour the water from the Color cup onto the plate" 유형 태스크에서 **98.3%**, "Stack the Color1 block on top of the Color2 block" 유형 태스크에서 **90.0%**의 높은 평균 성공률을 달성했습니다. 저조도 환경에서 **πo 모델의 성공률이 57.5%에서 22.5%로 급감**한 반면, Ask-to-Clarify는 **90.0%에서 80.0%로 소폭 감소**하여 강건함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **모호한 인간 지시를 처리해야 하는 실제 로봇 시스템** 개발에 필수적인 대화 기반 모호성 해결 능력을 제시합니다. **VLM과 확산 모델의 효과적인 통합** 및 **지식 단열 학습 전략**은 대규모 모델 기반의 로봇 학습에서 기존 지식을 보존하면서 새로운 기술을 습득하는 데 실용적인 가이드를 제공합니다. 특히 **저수준 액션 생성**을 통해 복잡한 조작 태스크에 대한 적용 가능성을 높여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.