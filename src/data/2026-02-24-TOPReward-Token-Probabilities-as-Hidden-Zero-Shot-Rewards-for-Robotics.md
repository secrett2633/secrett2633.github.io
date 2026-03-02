---
title: "[논문리뷰] TOPReward: Token Probabilities as Hidden Zero-Shot Rewards for Robotics"
excerpt: "arXiv에 게시된 'TOPReward: Token Probabilities as Hidden Zero-Shot Rewards for Robotics' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Reward Modeling
  - Vision-Language Models
  - Zero-Shot Learning
  - Token Probabilities
  - Progress Estimation
  - Behavior Cloning
  - Manipulation

permalink: /ai/review/2026-02-24-TOPReward-Token-Probabilities-as-Hidden-Zero-Shot-Rewards-for-Robotics/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.19313)

**저자:** Shirui Chen, Cole Harrison, Ying-Chun Lee, Angela Jin, Yongzheng Ren, Lillian J. Ratliff, Jiafei Duan, Dieter Fox, Ranjay Krishna



## 핵심 연구 목표
본 논문은 로봇 공학 분야의 주요 병목 현상인 보상 모델링 문제를 해결하기 위해, 사전 훈련된 **Vision-Language Models (VLMs)** 의 **내부 토큰 확률** 을 활용하여 **제로-샷(zero-shot) 진척도(progress) 추정** 을 가능하게 하는 것을 목표로 합니다. 특히, 기존 연구들이 오픈소스 VLM이 시간적 이해 부족이나 수치 생성의 불안정성 때문에 보상 모델링에 부적합하다고 가정하는 한계에 도전합니다.

## 핵심 방법론
본 연구는 **TOPReward** 라는 새로운 진척도 추정기를 제안하며, 이는 VLM의 **텍스트 생성 과정을 우회** 합니다. 대신, VLM에 "이 궤적이 작업을 완료하는가?"와 같은 **이진 완료 쿼리** 를 제시하고, 긍정적인 토큰( **True** )의 **확률 분포(token logits)** 를 분석하여 연속적인 보상 신호를 추출합니다. 이 방법론은 추가 훈련이나 미세 조정 없이 VLM의 **내재된 세계 지식** 을 활용하며, 새롭게 도입된 **ManiRewardBench** 벤치마크와 **Open X-Embodiment** 데이터셋에서 평가되었습니다.

## 주요 결과
**TOPReward** 는 **Qwen3-VL-8B** 모델을 백본으로 사용할 경우, **Open X-Embodiment** 데이터셋에서 **0.857 VOC(Value-Order Correlation)** 를, **ManiRewardBench** 에서는 **0.942-0.954 VOC** 를 달성하여, 기존의 **GVL(Generative Value Learning)** 방식보다 크게 우수한 성능을 보였습니다(예: Qwen3-VL-8B에서 GVL 대비 **+0.663 VOC 포인트 향상** ). 또한, **TOPReward** 는 **성공 감지(success detection)** 에서 **0.654 ROC-AUC** 를 달성했으며, **강화 학습 파이프라인(advantage-weighted behavior cloning)** 에 통합했을 때 성공률을 크게 향상시켜, 기준선 방식이 **10개 중 7개 성공** 한 과제에서 **10개 중 10개 성공** 을 기록했습니다.

## AI 실무자를 위한 시사점
**TOPReward** 는 로봇 보상 모델링의 주요 병목 현상을 해결하는 **훈련 없는(training-free) 제로-샷(zero-shot) 접근 방식** 을 제공하여, AI/ML 엔지니어들이 로봇 학습에 필요한 보상 신호를 효과적으로 생성할 수 있게 합니다. 특히, **오픈소스 VLM** 의 **내부 토큰 확률** 이 생성된 텍스트보다 신뢰할 수 있는 진척도 지표가 될 수 있음을 보여주어, 다른 도메인에서도 유사한 기법을 적용할 가능성을 제시합니다. 새롭게 공개된 **ManiRewardBench** 벤치마크는 실제 로봇 조작 작업에서 진척도 추정 모델을 평가하는 귀중한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.