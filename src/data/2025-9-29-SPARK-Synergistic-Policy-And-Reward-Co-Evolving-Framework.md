---
title: "[논문리뷰] SPARK: Synergistic Policy And Reward Co-Evolving Framework"
excerpt: "이 [arXiv]에 게시한 'SPARK: Synergistic Policy And Reward Co-Evolving Framework' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - LVLMs
  - Reward Modeling
  - Policy Optimization
  - Self-Reflection
  - Verifiable Rewards
  - Co-evolution

permalink: /ai/review/2025-9-29-SPARK-Synergistic-Policy-And-Reward-Co-Evolving-Framework/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22624)

**저자:** Ziyu Liu, Yuhang Zang, Shengyuan Ding, Yuhang Cao, Xiaoyi Dong, Haodong Duan, Dahua Lin, Jiaqi Wang



## 핵심 연구 목표
본 논문은 대규모 언어/시각-언어 모델(LLM/LVLM)의 강화 학습(RL) 파이프라인이 겪는 한계를 해결하고자 합니다. 특히, 인간 피드백 기반 RL(RLHF)의 높은 비용과 reward-policy 불일치 문제, 그리고 검증 가능한 보상 기반 RL(RLVR)에서 발생하는 롤아웃 및 정확성 신호의 낭비를 개선하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **SPARK** 프레임워크는 **RLVR** 을 기반으로 하며, 기존에 폐기되던 롤아웃과 정확성 데이터를 재활용하여 모델 자체를 **생성형 reward model** 로 동시에 훈련합니다. 이 보조 훈련은 **pointwise reward score** , **pairwise comparison** , 그리고 **further-reflection responses에 기반한 평가** 등 다양한 목적 함수를 사용하여 모델이 자체 응답을 평가하고 개선하도록 학습시킵니다. **co-evolving feedback loop** 를 통해 reward 정확도 향상이 policy gradient를 강화하고, 이는 다시 reward model을 정제하는 고품질 롤아웃으로 이어지는 선순환 구조를 만듭니다. 테스트 시점에는 외부 reward model 없이 **self-reflection** 을 통해 추론, 판단, 개선을 수행합니다.

## 주요 결과
**SPARK-VL-7B** 는 7개 추론 벤치마크에서 평균 **9.7%** , 2개 reward 벤치마크에서 **12.1%** , 8개 일반 벤치마크에서 **1.5%** 의 성능 향상을 달성했습니다. **SPARK-7B** (LLM) 역시 수학 벤치마크에서 평균 **5.4%** , reward 벤치마크에서 **12.0%** 의 향상을 보였으며, **SPARK-VL-32B** 모델에서도 수학 벤치마크 **+7.8%** , reward 벤치마크 **+3.0%** 의 개선을 보여 모델 규모 확장에도 효과적임을 입증했습니다.

## AI 실무자를 위한 시사점
**SPARK** 는 외부 reward model의 필요성을 제거하고 단일 모델 내에서 policy와 reward를 동시 학습시켜 **GPU memory 및 통신 오버헤드를 절감** 하는 효율적인 RL 프레임워크를 제공합니다. 이는 인간 피드백 데이터 수집 비용을 크게 줄이고, reward-policy 불일치 문제를 완화하여 LLM/LVLM의 **post-pretraining 및 alignment 프로세스를 간소화** 할 수 있습니다. 또한 **self-reflection** 능력을 통합하여 추론 및 판단 작업을 테스트 시점에 확장하고, 수학적 추론을 넘어 **일반 멀티모달 태스크로의 강력한 일반화 능력** 을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.