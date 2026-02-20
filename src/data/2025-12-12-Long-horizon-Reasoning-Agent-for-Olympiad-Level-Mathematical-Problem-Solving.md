---
title: "[논문리뷰] Long-horizon Reasoning Agent for Olympiad-Level Mathematical Problem Solving"
excerpt: "arXiv에 게시된 'Long-horizon Reasoning Agent for Olympiad-Level Mathematical Problem Solving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mathematical Reasoning
  - Long-Horizon Reasoning
  - Multi-Agent System
  - Reinforcement Learning
  - Olympiad Problems
  - Lemma Memory
  - Context Length
  - OREAL-H

permalink: /ai/review/2025-12-12-Long-horizon-Reasoning-Agent-for-Olympiad-Level-Mathematical-Problem-Solving/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10739)

**저자:** Songyang Gao, Yuzhe Gu, Zijian Wu, Lingkai Kong, Wenwei Zhang, Zhongrui Cai, Fan Zheng, Tianyou Ma, Junhao Shen, Haiteng Zhao, Duanyang Zhang, Huilun Zhang, Kuikun Liu, Chengqi Lyu, Yanhui Duan, Chiyu Chen, Ningsheng Ma, Jianfei Gao, Dahua Lin, Kai Chen, Han Lyu



## 핵심 연구 목표
본 논문은 대규모 추론 모델(LRM)이 국제 수학 올림피아드(IMO) 수준의 초고난도 수학 문제를 해결하는 데 있어 **긴 컨텍스트 길이의 제약** 으로 인해 발생하는 병목 현상을 극복하는 것을 목표로 합니다. 특히, 단일 추론 라운드 내에서 탐색 가능한 추론 복잡성 한계를 돌파하여 인간의 사고 패턴과 유사한 다단계 계층적 추론 능력을 갖춘 AI 에이전트를 개발하고자 합니다.

## 핵심 방법론
연구팀은 다중 에이전트 시스템인 **Intern-S1-MO** 를 제안하며, 이는 추론, 요약, 검증 기능을 수행하는 LRM 기반 에이전트들로 구성됩니다. 핵심은 **레마(lemmas) 형태의 압축된 메모리** 를 유지하여 다단계 추론 과정에서 컨텍스트 제약 없이 더 넓은 추론 공간을 탐색하는 **장기 계층적 추론** 입니다. 또한, 온라인 탐색된 궤적을 활용하여 LRM의 추론 능력을 부트스트랩하고 Intern-S1-MO의 전반적인 성능을 향상시키기 위한 RL 프레임워크인 **OREAL-H** 를 도입했습니다.

## 주요 결과
Intern-S1-MO는 IMO2025의 비기하 문제에서 **35점 중 26점** 을 획득하여 은메달리스트 수준의 성능을 달성했습니다. 또한, CMO2025에 공식 참가하여 인간 전문가 심사 하에 **126점 중 102점** 을 얻어 금메달 수준에 도달했습니다. HMMT2025에서 **95%** , AIME2025에서 **96.6%** , CNMO2025에서 **232.4점** 을 기록하며 현재의 최첨단 LRM들을 능가하는 **새로운 최고 성능(SOTA)** 을 확립했습니다.

## AI 실무자를 위한 시사점
이 연구는 **수학적 추론에서 컨텍스트 길이의 한계를 돌파** 하고, **복잡한 문제 해결을 위한 다중 에이전트 시스템 및 계층적 추론 아키텍처** 의 중요성을 강조합니다. **레마 기반 메모리 관리** 와 **온라인 강화 학습(OREAL-H)** 을 통해 AGI 목표에 한 걸음 더 다가섰으며, 미래 AI 시스템이 복잡한 지식 기반 추론을 수행하는 데 있어 실질적인 청사진을 제공합니다. 이는 교육, 과학 연구 등 다양한 분야에서 AI 활용 가능성을 크게 확장할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.