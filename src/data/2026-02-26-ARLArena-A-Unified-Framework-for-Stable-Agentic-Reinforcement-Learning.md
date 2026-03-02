---
title: "[논문리뷰] ARLArena: A Unified Framework for Stable Agentic Reinforcement Learning"
excerpt: "arXiv에 게시된 'ARLArena: A Unified Framework for Stable Agentic Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Reinforcement Learning
  - LLM
  - Policy Optimization
  - Training Stability
  - Importance Sampling Clipping
  - Advantage Design
  - Dynamic Filtering
  - ARLArena
  - SAMPO

permalink: /ai/review/2026-02-26-ARLArena-A-Unified-Framework-for-Stable-Agentic-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21534)

**저자:** Xiaoxuan Wang, Han Zhang, Haixin Wang, Yidan Shi, Ruoyan Li, Kaiqiao Han, Chenyi Tong, Haoran Deng, Renliang Sun, Alexander Taylor, Yanqiao Zhu, Jason Cong, Yizhou Sun, Wei Wang



## 핵심 연구 목표
에이전트 강화 학습(ARL)의 심각한 훈련 불안정성 문제, 특히 훈련 붕괴 현상을 해결하는 것이 목표입니다. 이 불안정성은 대규모 환경 및 장기 상호작용에서 ARL의 확장성을 제한하며, 체계적인 알고리즘 설계 탐색을 어렵게 만듭니다. 본 연구는 안정적인 훈련 방법론과 체계적인 분석 프레임워크를 제시하여 ARL의 근본적인 불안정성 원인을 파악하고 완화하고자 합니다.

## 핵심 방법론
본 논문은 **ARLArena** 라는 통합 프레임워크를 제안합니다. 먼저, 행동 복제, 형식 벌칙, KL 정규화 및 하이퍼파라미터 탐색을 통해 **표준화된 테스트베드** 를 구축합니다. 그 다음, 정책 그래디언트를 **손실 집계, 중요도 샘플링(IS) 클리핑, 궤적 필터링, 이점 설계** 의 네 가지 차원으로 분해하여 각 차원의 성능과 안정성을 평가합니다. 이러한 분석을 바탕으로, 주요 불안정성 원인을 완화하기 위해 **시퀀스 레벨 클리핑, 미세 조정된 이점 추정, 동적 필터링** 을 통합한 안정적인 에이전트 정책 최적화(PO) 방법인 **SAMPO** 를 제시합니다.

## 주요 결과
**SAMPO** 는 **ALFWorld, WebShop, Sokoban, TIR Math** 를 포함한 다양한 에이전트 태스크에서 일관되게 안정적인 훈련과 강력한 성능을 달성했습니다. 특히, **SAMPO** 는 **GRPO baseline 대비 평균 25.2%의 성능 향상** 을 보였습니다. **ALFWorld** 에서는 **92.72% 성공률** 을, **WebShop** 에서는 **74.08% 성공률** 을, **Sokoban** 에서는 **88.86% 성공률** 을 기록했습니다. 또한, **SAMPO** 를 적용한 **Qwen3-4B-RFT** 는 **GPT-5.2(51.56%)** 및 **o3 기반 MAS(56.25%)** 와 같은 대규모 폐쇄형 모델보다 **ALFWorld** 에서 뛰어난 성능을 보였습니다. **관용적 클리핑(tolerant clipping)** 은 초기 성능 향상을 가져오지만, **시퀀스 레벨 클리핑** 이 훈련 붕괴를 방지하고 안정적인 개선을 보장합니다.

## AI 실무자를 위한 시사점
본 연구는 ARL의 안정적인 훈련을 위해 **행동 복제, 형식 벌칙, KL 정규화** 와 같은 초기화 및 정규화 전략이 필수적임을 강조합니다. 특히, **시퀀스 레벨 중요도 샘플링 클리핑** 은 오프-정책 드리프트를 억제하고 장기 상호작용 ARL의 안정성을 확보하는 데 핵심적인 요소입니다. **미세 조정된 이점 설계** 와 **동적 궤적 필터링** 은 보상 희소성 문제를 해결하고 정책 그래디언트의 정보력을 높이는 데 기여합니다. 이는 AI/ML 엔지니어들이 안정적이고 재현 가능한 LLM 기반 에이전트 훈련 파이프라인을 구축하는 데 실용적인 지침을 제공하며, **원칙적인 RL 훈련** 이 단순한 모델 규모 확장이나 추론 시간 공학적 노력보다 에이전트 태스크에서 더 큰 이점을 가져올 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.