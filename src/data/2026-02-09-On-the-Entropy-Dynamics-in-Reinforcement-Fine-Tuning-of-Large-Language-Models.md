---
title: "[논문리뷰] On the Entropy Dynamics in Reinforcement Fine-Tuning of Large Language Models"
excerpt: "Yanxi Chen이 arXiv에 게시한 'On the Entropy Dynamics in Reinforcement Fine-Tuning of Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Fine-Tuning (RFT)
  - Large Language Models (LLMs)
  - Entropy Dynamics
  - Exploration-Exploitation
  - Policy Optimization
  - GRPO
  - Entropy Control
  - Discriminator Score

permalink: /ai/review/2026-02-09-On-the-Entropy-Dynamics-in-Reinforcement-Fine-Tuning-of-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03392)

**저자:** Shumin Wang, Yuexiang Xie, Wenhao Zhang, Yuchang Sun, Yanxi Chen, Yaliang Li, Yanyong Zhang



## 핵심 연구 목표
본 논문은 LLM의 강화 학습 미세 조정(RFT) 과정에서 발생하는 엔트로피 동학에 대한 이론적인 이해를 확립하고, 탐색-활용(exploration-exploitation) 균형을 최적화하는 실용적인 전략을 개발하는 것을 목표로 합니다. 특히, 기존 휴리스틱 기반 엔트로피 제어 방법의 한계를 극복하고 엔트로피 붕괴 현상을 방지하는 원리적인 접근 방안을 제시하고자 합니다.

## 핵심 방법론
단일 로짓 업데이트에 따른 엔트로피 변화를 정량화하는 **판별식 표현** 으로 이론적 분석을 시작하며, 이를 확장하여 **Group Relative Policy Optimization (GRPO)** 업데이트 공식에 대한 **1차 엔트로피 변화식** 을 도출했습니다. 이 분석을 기반으로, 엔트로피 변화 방향을 결정하는 **판별자 점수 S\***를 정의하고, 이를 활용하여 **batch-normalized (ClipB)** 및 **vocabulary-normalized (Clipy)** 엔트로피-판별자 클리핑(clipping) 기법을 제안합니다.

## 주요 결과
이론적 분석을 통해 **판별자 점수 S\***가 엔트로피 동학의 신뢰할 수 있는 예측 변수임을 확인했습니다. 제안된 **ClipB** 및 **Clipy** 클리핑 방법은 **Qwen2.5-7B-Instruct** 모델을 사용하여 **AIME24, AIME25, DAPO500** 데이터셋에서 **GRPO** 대비 성능을 향상시켰습니다. 예를 들어, **GRPO+ClipB** 는 AIME24에서 Pass@K를 **50.00%에서 56.67%로 (+6.67)** , **GRPO+Clipy** 는 AIME25에서 Pass@K를 **50.00%에서 56.67%로 (+6.67)** 증가시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 RFT 과정에서 LLM의 엔트로피 동학에 대한 이론적 기반을 제공하여, 엔트로피 붕괴와 같은 문제를 이해하고 해결하는 데 도움을 줍니다. 제안된 **엔트로피-판별자 클리핑 방법** 은 탐색 역량을 유지하면서 모델 성능을 향상시키는 실용적인 전략을 제공하며, **Qwen2.5-7B-Instruct** 및 다양한 모델에서 그 효과를 입증했습니다. 이는 LLM의 RFT를 보다 안정적이고 효율적으로 수행하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.