---
title: "[논문리뷰] Agent Learning via Early Experience"
excerpt: "이 [arXiv]에 게시한 'Agent Learning via Early Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Agents
  - Early Experience
  - Reward-Free Learning
  - World Modeling
  - Self-Reflection
  - Imitation Learning
  - Reinforcement Learning
  - Out-of-Domain Generalization

permalink: /ai/review/2025-10-10-Agent_Learning_via_Early_Experience/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08558)

**저자:** Kai Zhang, Xiangchao Chen, Bo Liu, Tianci Xue, Zeyi Liao, Zhihan Liu, Xiyao Wang, Yuting Ning, Zhaorun Chen, Xiaohan Fu, Jian Xie, Yuxuan Sun, Boyu Gou, Qi Qi, Zihang Meng, Jianwei Yang, Ning Zhang, Xian Li, Ashish Shah, Dat Huynh, Hengduo Li, Zi Yang, Sara Cao, Lawrence Jang, Shuyan Zhou, Jiacheng Zhu, Huan Sun, Jason Weston, Yu Su, Yifan Wu



## 핵심 연구 목표
본 논문은 보상이 없거나 불명확한 환경에서 **언어 에이전트**가 스스로 경험을 통해 학습하고 개선하는 데 따르는 어려움을 해결하고자 합니다. 특히, 기존의 **모방 학습(Imitation Learning)**이 가진 데이터 스케일링 및 일반화 한계와 **강화 학습(Reinforcement Learning)**의 보상 신호 부족 문제를 연결하는 새로운 패러다임인 **'Early Experience'**를 제시하고 그 효과를 검증하는 것이 주된 목표입니다.

## 핵심 방법론
**Early Experience** 패러다임은 에이전트가 자체적으로 생성한 상호작용 데이터를 미래 상태에 대한 **감시 신호(supervision signal)**로 활용합니다. 이를 위해 두 가지 전략을 탐구하는데, 첫째는 수집된 미래 상태를 통해 환경 역학에 대한 내부 표현을 구축하는 **Implicit World Modeling (IWM)**이며, 이는 **다음 토큰 예측 손실(L_IWM)**을 사용하여 정책을 학습합니다. 둘째는 에이전트의 차선책 행동에서 얻은 교훈을 통해 의사결정을 개선하는 **Self-Reflection (SR)**으로, 전문가 행동과 대안 행동의 결과 차이를 바탕으로 **자연어 설명(chain-of-thought)**을 생성하여 학습합니다. 이 방법론은 **여덟 가지 다양한 환경**과 **여러 LLM 계열(Llama-3.2-3B, Qwen-2.5-7B, Llama-3.1-8B)**에서 평가되었습니다.

## 주요 결과
**Early Experience** 방법론은 순수 **모방 학습** 대비 평균 **+9.6%의 성공률**과 **+9.4%의 도메인 외 일반화(Out-of-Domain Generalization)** 성능 향상을 일관되게 달성했습니다. 특히, 보상 신호가 있는 환경에서 **강화 학습(GRPO 알고리즘)**의 초기화에 **Early Experience**를 활용하면 최종 성공률이 최대 **+6.4%** 추가로 개선되는 효과를 보였습니다. 또한, 이 패러다임은 전문가 데이터의 **절반 이하**만으로도 유사하거나 우수한 성능을 달성하며 **대규모 모델(Llama-3.3-70B)**에도 효과적으로 적용됨을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 보상이 부족한 실제 환경에서 **언어 에이전트**의 **보상 없는 학습**을 가능하게 하는 실용적인 접근법을 제시합니다. 에이전트의 자체 상호작용 데이터를 **확장 가능한 학습 신호**로 활용함으로써, **전문가 데이터** 수집의 제약을 넘어설 수 있는 새로운 학습 패러다임을 제공합니다. 이는 **도메인 외 일반화 능력**을 향상시키고, 향후 **강화 학습**의 강력한 초기화 지점 역할을 하여, 궁극적으로 **경험 기반 에이전트** 개발을 가속화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.