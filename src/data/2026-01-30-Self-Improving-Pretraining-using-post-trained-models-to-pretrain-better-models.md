---
title: "[논문리뷰] Self-Improving Pretraining: using post-trained models to pretrain better models"
excerpt: "arXiv에 게시된 'Self-Improving Pretraining: using post-trained models to pretrain better models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Improving Pretraining
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Quality Control
  - Factuality
  - Safety
  - Post-trained Models
  - Pretraining Data Augmentation

permalink: /ai/review/2026-01-30-Self-Improving-Pretraining-using-post-trained-models-to-pretrain-better-models/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21343)

**저자:** Ellen Xiaoqing Tan, Shehzaad Dhuliawala, Jing Xu, Ping Yu, Sainbayar Sukhbaatar, Jason Weston, Olga Golovneva



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 생성 안전성, 사실성 및 전반적인 품질 문제를 사전 훈련 단계에서부터 해결하는 것을 목표로 합니다. 기존 사후 훈련(post-training) 정렬 방식의 한계를 극복하고, 모델의 핵심 동작이 형성되는 프리트레이닝 과정에서 유해하거나 환각적인 출력이 고착화되는 것을 방지하고자 합니다.

## 핵심 방법론
제안하는 'Self-Improving Pretraining' 방법론은 문서 스트림을 활용하고 **강화 학습(RL)** 을 통해 매 단계 다음 **K개의 생성된 토큰** 을 개선합니다. 특히, **강력한 사전 훈련 모델** 이 **Rewriter** 역할을 하여 입력 접두사(prefix)가 안전하지 않거나 품질이 낮은 경우 더 나은 접미사(suffix)를 생성하도록 유도하고, **Judge** 역할을 하여 모델의 롤아웃, 원본 접미사 및 재작성된 접미사를 품질, 안전성, 사실성 측면에서 평가합니다. 이 평가를 바탕으로 **온라인 DPO** 또는 **Reward-Filtered NLL** 과 같은 **RL 알고리즘** 을 사용하여 정책 모델(pre-training 중인 LLM)을 훈련합니다.

## 주요 결과
본 방법론은 표준 프리트레이닝 대비 상당한 성능 향상을 보였습니다. 사실성 측면에서 **36.2%** , 안전성 측면에서 **18.5%** 의 상대적 개선을 달성했으며, 전반적인 생성 품질에서는 최대 **86.3%** 의 승률 향상을 기록했습니다. 이는 모델 롤아웃이 훈련 과정에서 점점 더 높은 품질을 보이도록 보상하는 메커니즘을 통해 이루어졌습니다.

## AI 실무자를 위한 시사점
이 연구는 **더 높은 품질, 안전성, 사실성을 갖춘 LLM을 처음부터 구축** 할 수 있는 효과적인 방법을 제시합니다. 기존의 강력한 모델을 활용하여 새로운 모델의 프리트레이닝을 유도함으로써, 복잡하고 비용이 많이 드는 사후 훈련 및 정렬 단계를 줄일 수 있는 잠재력을 제공합니다. AI 엔지니어는 이 프레임워크를 통해 모델 개발 초기 단계부터 신뢰성을 내재화하고, 지속적으로 성능을 개선하는 효율적인 피드백 루프를 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.