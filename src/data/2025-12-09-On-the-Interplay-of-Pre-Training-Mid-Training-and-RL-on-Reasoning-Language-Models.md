---
title: "[논문리뷰] On the Interplay of Pre-Training, Mid-Training, and RL on Reasoning Language Models"
excerpt: "이 [arXiv]에 게시한 'On the Interplay of Pre-Training, Mid-Training, and RL on Reasoning Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Pre-training
  - Mid-training
  - Reasoning LMs
  - Generalization
  - Synthetic Reasoning Tasks
  - Process-level Supervision

permalink: /ai/review/2025-12-09-On-the-Interplay-of-Pre-Training-Mid-Training-and-RL-on-Reasoning-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07783)

**저자:** Charlie Zhang, Graham Neubig, Xiang Yue



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)에서 사전 훈련(pre-training), 중간 훈련(mid-training), 강화 학습(RL) 기반 후처리 훈련(post-training)이 추론 능력의 일반화에 미치는 상호작용과 인과적 영향을 명확히 규명하는 것을 목표로 합니다. 특히, RL이 모델의 추론 능력을 기저 모델의 역량을 넘어서 확장하는지, 그리고 어떤 조건에서 그러한 확장이 일어나는지에 대한 상충하는 견해를 해소하고자 합니다.

## 핵심 방법론
연구팀은 **합성 추론 태스크(synthetic reasoning tasks)** 를 활용하는 완전 제어 실험 프레임워크를 개발했습니다. 이 프레임워크는 **DAG(Directed Acyclic Graph) 기반의 명시적 원자 연산** 과 **구문 분석 가능한 단계별 추론 과정** 을 특징으로 합니다. 훈련 데이터 분포를 체계적으로 조작하여 각 훈련 단계의 기여도를 분리하고, **외삽적 일반화(extrapolative generalization)** 와 **문맥적 일반화(contextual generalization)** 두 가지 차원에서 모델을 평가합니다. 또한, **프로세스 수준 검증(process-level verification)** 을 보상 함수에 통합하여 보상 해킹을 완화합니다.

## 주요 결과
**RL** 은 사전 훈련으로 충분한 여유가 남아있고, RL 데이터가 모델의 "역량 경계(edge of competence)"에 맞춰질 때만 진정한 능력 향상(예: **pass@128** )을 가져왔습니다. **중간 훈련(mid-training)** 단계는 고정된 컴퓨팅 예산에서 OOD(Out-of-Distribution) 추론 성능을 크게 향상시키며, **RL 단독 대비 OOD-hard 태스크에서 +10.8%** 더 나은 성능을 보였습니다. 또한, **프로세스 수준 보상** 은 외삽적 설정에서 **pass@1** 을 **4-5%** 개선하여 보상 해킹을 완화하고 추론 충실도를 높였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **RL 데이터셋을 모델의 "역량 경계" 주변 태스크에 집중** 하여 설계해야 합니다. 또한, **사전 훈련 단계에서 기본적인 추론 원시 요소(atomic reasoning primitives)를 (최소 1%의 밀도로라도) 포함** 시켜 문맥적 일반화에 필요한 "씨앗"을 제공하는 것이 중요합니다. **중간 훈련** 은 훈련 파이프라인의 강력한 레버이므로, 목표(예: 안정성 vs. 탐색)에 따라 **컴퓨팅 예산을 중간 훈련과 RL 사이에 전략적으로 분배** 해야 하며, **보상 함수에 프로세스 수준 검증을 통합** 하여 모델의 견고성과 추론 충실도를 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.