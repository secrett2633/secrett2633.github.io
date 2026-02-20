---
title: "[논문리뷰] Learning on the Job: An Experience-Driven Self-Evolving Agent for
  Long-Horizon Tasks"
excerpt: "arXiv에 게시된 'Learning on the Job: An Experience-Driven Self-Evolving Agent for
  Long-Horizon Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Continuous Learning
  - Self-Evolving
  - Memory Module
  - Long-Horizon Planning
  - Productivity Tasks
  - Test-Time Learning
  - Experience Replay

permalink: /ai/review/2025-10-10-Learning-on-the-Job-An-Experience-Driven-Self-Evolving-Agent-for-Long-Horizon-Tasks/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08002)

**저자:** Cheng Yang, Xuemeng Yang, Licheng Wen, Daocheng Fu, Jianbiao Mei, Rong Wu, Pinlong Cai, Yufan Shen, Nianchen Deng, Botian Shi, Yu Qiao, Haifeng Li



## 핵심 연구 목표
본 논문은 실세계의 복잡한 **장기(long-horizon) 작업** 을 수행하는 AI 에이전트가 경험으로부터 학습하고 지속적으로 개선되지 못하는, 즉 **"테스트-시간 정적(test-time static)"** 이라는 한계를 해결하고자 합니다. 이를 위해 에이전트가 자율적으로 지식을 축적하고 스스로 진화하여 작업 완성도를 높이는 프레임워크를 제안합니다.

## 핵심 방법론
제안된 **MUSE** 프레임워크는 **계층적 메모리 모듈(Memory Module)** 을 중심으로 하는 **"계획-실행-반영-기억(Plan-Execute-Reflect-Memorize)"** 반복 루프를 사용합니다. 메모리 모듈은 **전략 메모리(Mstrat)** , **절차 메모리(Mproc)** , **도구 메모리(Mtool)** 로 구성되며, **계획-실행(PE) 에이전트** 는 이를 활용해 작업을 분해하고 실행합니다. **반영(Reflect) 에이전트** 는 각 서브-태스크 실행 후 궤적을 평가하고 성공적인 경험을 구조화된 메모리로 변환하여 모듈에 통합하며, 이는 **LLM-agnostic** 한 자연어 형태로 저장됩니다.

## 주요 결과
**TheAgentCompany (TAC) 벤치마크** 에서 MUSE는 경량 **Gemini-2.5 Flash 모델** 을 사용하여 새로운 **SOTA 성능(51.78% Spartial)** 을 달성했습니다. 이는 이전 SOTA 대비 **약 20%의 상당한 성능 향상** 이며, 연속 학습 실험에서는 메모리 없는 기준선보다 **10% 이상 뛰어난 성능** 을 보였습니다. 또한, 학습된 경험이 새로운 **고난이도 태스크(`Thard`)에서 33.41% Spartial** 를 기록하며 강력한 **제로샷 일반화 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
MUSE는 **LLM 에이전트가 실제 환경에서 지속적으로 학습하고 자율적으로 진화** 할 수 있는 새로운 패러다임을 제시합니다. 특히 **메모리 메커니즘** 을 통해 경량 모델로도 복잡한 장기 작업을 효율적으로 처리하고, 반복적인 시행착오를 줄이며, 학습된 지식을 새로운 상황에 **일반화** 할 수 있음을 보여줍니다. 이는 **실세계 생산성 작업 자동화** 및 **에이전트의 견고성과 적응성 향상** 에 중요한 실용적 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.