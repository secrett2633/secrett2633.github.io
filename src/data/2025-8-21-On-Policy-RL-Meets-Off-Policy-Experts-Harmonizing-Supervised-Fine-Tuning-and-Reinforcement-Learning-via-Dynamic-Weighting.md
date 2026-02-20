---
title: "[논문리뷰] On-Policy RL Meets Off-Policy Experts: Harmonizing Supervised
  Fine-Tuning and Reinforcement Learning via Dynamic Weighting"
excerpt: "Guoyin Wang이 arXiv에 게시한 'On-Policy RL Meets Off-Policy Experts: Harmonizing Supervised
  Fine-Tuning and Reinforcement Learning via Dynamic Weighting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reinforcement Learning
  - Supervised Fine-Tuning
  - On-Policy RL
  - Off-Policy Experts
  - Dynamic Weighting
  - LLM Alignment
  - Reasoning

permalink: /ai/review/2025-8-21-On-Policy-RL-Meets-Off-Policy-Experts-Harmonizing-Supervised-Fine-Tuning-and-Reinforcement-Learning-via-Dynamic-Weighting/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11408)

**저자:** Wenhao Zhang, Yuexiang Xie, Yuchang Sun, Yanxi Chen, Guoyin Wang, Yaliang Li, Bolin Ding, Jingren Zhou



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 사후 튜닝에서 **Supervised Fine-Tuning (SFT)** 과 **Reinforcement Learning (RL)** 을 순차적으로 적용하는 기존 패러다임이 야기하는 문제점, 즉 모델의 기존 패턴 교란 및 전문가 데이터에 대한 과적합 문제를 해결하고자 합니다. 특히, 사전 학습된 모델이 아닌 이미 잘 정립된 정책을 가진 **인스트럭션 튜닝된 모델** 에 외부 전문가 데이터를 통합하는 더 도전적인 시나리오에 초점을 맞춥니다.

## 핵심 방법론
제안된 **CHORD** 프레임워크는 **SFT** 를 **on-policy RL** 프로세스 내의 동적으로 가중된 보조 목표로 재구성하여 **on-policy** 및 **off-policy** 학습을 통합합니다. 이는 **전역 계수 μ** 를 사용하여 학습 과정 전반에 걸쳐 전문가 데이터의 전반적인 영향력을 제어하고, **토큰 단위 가중 함수 φ(·)** ( **p_t(1-p_t)** 로 정의)를 통해 안정성을 유지합니다. **μ** 는 학습이 진행됨에 따라 점진적으로 감소하는 스케줄을 사용하여 off-policy 모방에서 on-policy 탐색으로 부드러운 전환을 유도합니다.

## 주요 결과
**CHORD-φ** 는 **MATH 벤치마크** 에서 강력한 기준선인 **SFT-best+RL** 대비 상당한 성능 향상을 달성했습니다. 특히 **AMC** 에서 **58.4%에서 62.5%** 로, **AIME24** 에서 **17.1%에서 18.2%** 로, **AIME25** 에서 **16.3%에서 17.2%** 로 향상되었으며, **MMLU-Pro** 에서도 **51.3%에서 56.2%** 로 성능이 개선되었습니다. 이는 **CHORD** 가 오프-폴리시 전문가 데이터를 온-폴리시 탐색과 효과적으로 조화시켜 안정적이고 효율적인 학습 과정을 가능하게 함을 보여줍니다.

## AI 실무자를 위한 시사점
**CHORD** 는 LLM 사후 튜닝, 특히 강력한 사전 정책을 가진 모델에 전문가 데이터를 통합할 때 발생하는 문제를 해결하는 실용적인 접근법을 제시합니다. **전역 계수 μ의 감쇠 스케줄** 과 **토큰 단위 가중치 함수 φ(·)** 를 통해 과적합을 방지하고 모델의 탐색 능력을 유지하면서 전문가 지식을 선별적으로 흡수할 수 있습니다. 이는 더 효율적이고 안정적인 **LLM 미세조정 전략** 을 설계하는 데 중요한 통찰력을 제공하며, 기존 순차적 SFT-then-RL 접근법의 한계를 극복하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.