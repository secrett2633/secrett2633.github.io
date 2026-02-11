---
title: "[논문리뷰] ScaleEnv: Scaling Environment Synthesis from Scratch for Generalist Interactive Tool-Use Agent Training"
excerpt: "이 [arXiv]에 게시한 'ScaleEnv: Scaling Environment Synthesis from Scratch for Generalist Interactive Tool-Use Agent Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Environment Synthesis
  - Tool-Use Agents
  - Reinforcement Learning
  - Generalization
  - Procedural Generation
  - LLM Agents
  - Interactive Environments
  - Data Scaling

permalink: /ai/review/2026-02-11-ScaleEnv-Scaling-Environment-Synthesis-from-Scratch-for-Generalist-Interactive-Tool-Use-Agent-Training/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06820)

**저자:** Dunwei Tu, Hongyan Hao, Hansi Yang, Yihao Chen, Yi-Kai Zhang, Zhikang Xia, Yu Yang, Yueqing Sun, Xingchen Liu, Furao Shen, Qi Gu, Hui Su, Xunliang Cai



## 핵심 연구 목표
본 논문은 일반 목적의 도구 사용 에이전트 훈련에 필요한 **대규모의 사실적이고 검증 가능한 인터랙티브 환경** 이 부족하다는 문제를 해결하고자 합니다. 기존 LLM 기반 시뮬레이터의 환각 및 신뢰성 부족, 그리고 수동 통합 방식의 확장성 한계를 극복하여, 에이전트의 강력한 일반화 능력을 위한 견고한 학습 기반을 제공하는 것을 목표로 합니다.

## 핵심 방법론
ScaleEnv는 두 단계로 나뉘어 환경을 구축합니다: 먼저, **LLM** 을 활용하여 도구 및 데이터베이스 스키마를 정의하고, **멀티-에이전트 아키텍처** 로 기능 코드를 생성하며, **절차적 테스트(Procedural Testing)** 를 통해 엄격하게 검증하여 **도구 의존성 그래프(Tool Dependency Graph)** 를 생성합니다. 다음으로, 이 그래프에서 시드 도구 체인을 샘플링하고 **의존성 인식 확장 전략(Dependency-Aware Expansion Strategy)** 을 통해 동적으로 데이터베이스 상태와 디스트랙터 데이터를 주입하여 복잡하고 탐색 가능한 환경을 구축합니다.

## 주요 결과
ScaleEnv 환경에서 훈련된 에이전트( **Qwen3-SE 모델 시리즈** )는 **T2-Bench** 및 **VitaBench** 와 같은 미지의, 멀티턴 도구 사용 벤치마크에서 상당한 성능 향상을 보였습니다. 특히, **Qwen3-SE-32B** 모델은 VitaBench의 복잡한 교차 도메인 서브셋에서 **기존 모델 대비 두 배 이상 높은 46.8%의 Pass@4** 를 달성했습니다. 또한, 훈련 도메인 수가 증가함에 따라 제로샷 일반화 성능이 단조롭게 향상됨을 보여, 환경 다양성 스케일링이 강력한 에이전트 학습에 필수적임을 입증했습니다.

## AI 실무자를 위한 시사점
ScaleEnv는 **높은 충실도와 검증 가능성을 갖춘 인터랙티브 환경** 을 자동으로 생성하는 프레임워크를 제공하여, LLM 기반 에이전트의 **데이터 중심 강화 학습(data-centric RL)** 에 새로운 패러다임을 제시합니다. 기존 LLM 시뮬레이터의 한계(환각, 비현실성)를 극복하고, **환경 다양성** 이 에이전트의 일반화 능력에 미치는 결정적인 영향을 강조함으로써, 견고하고 일반화 가능한 에이전트 개발의 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.