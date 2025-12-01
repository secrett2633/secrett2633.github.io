---
title: "[논문리뷰] Supervised Reinforcement Learning: From Expert Trajectories to Step-wise
  Reasoning"
excerpt: "이 [arXiv]에 게시한 'Supervised Reinforcement Learning: From Expert Trajectories to Step-wise
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Reinforcement Learning
  - LLMs
  - Multi-step Reasoning
  - Reward Shaping
  - Expert Trajectories
  - Math Reasoning
  - Agentic AI

permalink: /ai/review/2025-10-31-Supervised-Reinforcement-Learning-From-Expert-Trajectories-to-Step-wise-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25992)

**저자:** Yihe Deng, I-Hung Hsu, Jun Yan, Zifeng Wang, Rujun Han, Gufeng Zhang, Yanfei Chen, Wei Wang, Tomas Pfister, Chen-Yu Lee



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 다단계 추론 문제, 특히 정답 궤적이 희박한 어려운 태스크에서 겪는 한계를 극복하는 것을 목표로 합니다. 기존의 **Supervised Fine-Tuning (SFT)** 이 과적합되거나, **Reinforcement Learning with Verifiable Rewards (RLVR)** 가 성공적인 롤아웃 부족으로 실패하는 문제를 해결하고자 합니다.

## 핵심 방법론
논문은 문제 해결을 순차적 의사결정 과정으로 재구성하는 **Supervised Reinforcement Learning (SRL)** 프레임워크를 제안합니다. 전문가 궤적을 일련의 논리적 "액션"으로 분해하고, 모델이 각 액션 이전에 내부 추론 모놀로그를 생성하도록 훈련합니다. 모델의 생성된 액션과 전문가 액션 간의 **시퀀스 유사도** 를 기반으로 조밀하고 부드러운 보상(reward)을 제공하여 학습 신호를 풍부하게 합니다.

## 주요 결과
수학 추론 벤치마크에서 **SRL** 은 기존 SFT 및 RLVR 대비 평균적으로 **3.0%** 의 상당한 성능 향상을 달성했습니다. 특히, **SRL → RLVR 파이프라인** 은 모든 베이스라인 중 가장 높은 평균 **28.3%** 의 성능을 기록하며, 평균 **3.7%** 의 추가 개선을 보였습니다. 소프트웨어 엔지니어링 태스크에서도 **SRL** 은 **14.8%** 의 해결률을 달성하여 **SWE-Gym-7B** 대비 **74%** 의 상대적 성능 향상을 보여주었습니다.

## AI 실무자를 위한 시사점
**SRL** 은 전통적인 SFT나 RLVR로는 학습하기 어려운 복잡한 다단계 추론 문제를 LLM에 효과적으로 가르칠 수 있는 강력한 방법론을 제공합니다. 시퀀스 유사도 기반의 조밀한 보상은 학습 효율성을 높이고, 모델이 유연하면서도 정교한 추론 패턴을 개발하도록 유도합니다. 수학 및 소프트웨어 엔지니어링과 같은 다양한 도메인에 걸쳐 일반화 가능성을 입증하여, 보다 유능하고 다재다능한 AI 에이전트 구축에 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.