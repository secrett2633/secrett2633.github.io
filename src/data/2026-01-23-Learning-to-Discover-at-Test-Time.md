---
title: "[논문리뷰] Learning to Discover at Test Time"
excerpt: "arXiv에 게시된 'Learning to Discover at Test Time' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Test-Time Training
  - Reinforcement Learning
  - Scientific Discovery
  - LLM Optimization
  - GPU Kernel Engineering
  - Algorithm Design
  - Single-Cell Analysis

permalink: /ai/review/2026-01-23-Learning-to-Discover-at-Test-Time/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16175)

**저자:** Mert Yuksekgonul, Daniel Koceja, Xinhao Li, Federico Bianchi, Jed McCaleb, Xiaolong Wang, Jan Kautz, Yejin Choi, James Zou, Carlos Guestrin, Yu Sun



## 핵심 연구 목표
본 연구는 AI를 활용하여 과학적 문제에서 **새로운 SOTA(State-of-the-Art) 솔루션** 을 발견하는 방법을 제시합니다. 특히, 훈련 데이터 범위를 넘어서는 **새로운 아이디어** 를 요구하는 난제들을 LLM이 **테스트 시점에 지속적으로 학습** 하며 해결하는 것을 목표로 합니다. 이는 단순히 기존 지식을 검색하는 것을 넘어, **단일의 우수한 해** 를 찾는 데 특화된 학습 패러다임을 제안합니다.

## 핵심 방법론
제안하는 **Test-Time Training to Discover (TTT-Discover)** 방법론은 LLM이 단일 테스트 문제에 대해 **강화 학습(Reinforcement Learning)** 을 수행하여 자체 가중치를 업데이트하도록 합니다. 핵심적으로, **최대 보상을 선호하는 엔트로픽 목표 함수(Entropic Objective)** 와 **PUCT(Polynomial Upper Confidence Trees) 기반의 상태 재사용 휴리스틱** 을 결합하여 가장 유망한 솔루션 탐색에 집중합니다. 모든 실험은 개방형 모델인 **OpenAI gpt-oss-120b** 와 **LoRA (Rank 32)** 를 사용하여 수행되었습니다.

## 주요 결과
TTT-Discover는 시도된 거의 모든 분야에서 새로운 SOTA를 달성했습니다. **수학 문제(Erdős' Minimum Overlap)** 에서 기존 **0.380924** 를 넘어선 **0.380876** 의 상한을, **GPU 커널 엔지니어링(TriMul H100)** 에서는 이전 최고 기록인 **1371 µs** 보다 약 15% 빠른 **1161 µs** 를 달성했습니다. 또한, **AtCoder 알고리즘 대회** 에서 **567,062점** 으로 최고 인간 기록인 566,997점을 넘어섰고, **단일 세포 분석 denoising** 문제에서 **0.71점** 을 기록하여 이전 SOTA인 **0.64점** 을 상회했습니다. 이 모든 결과는 **수백 달러** 의 비용으로 달성되었으며, 코드가 공개되어 재현 가능합니다.

## AI 실무자를 위한 시사점
TTT-Discover는 **제한된 예산** 으로 **개방형 LLM** 을 활용하여 다양한 과학 분야에서 **SOTA를 달성** 할 수 있는 실용적인 길을 제시합니다. 이는 **GPU 커널 최적화** 나 **복잡한 수학적 문제 해결** 과 같이 단일 최적 해가 중요한 문제에서 특히 유용합니다. **테스트 시점 학습** 과 **문제 맞춤형 RL** 접근 방식은 AI 기반 과학 발견의 **투명성과 접근성** 을 높이고, 기존의 폐쇄형 모델 의존성에서 벗어나는 중요한 전환점이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.