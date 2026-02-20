---
title: "[논문리뷰] Reasoning with Sampling: Your Base Model is Smarter Than You Think"
excerpt: "arXiv에 게시된 'Reasoning with Sampling: Your Base Model is Smarter Than You Think' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - MCMC
  - Sampling
  - Reasoning
  - Distribution Sharpening
  - Reinforcement Learning (RL)
  - Inference-time Optimization
  - Training-free

permalink: /ai/review/2025-10-27-Reasoning-with-Sampling-Your-Base-Model-is-Smarter-Than-You-Think/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14901)

**저자:** Aayush Karan¹, Yilun Du¹



## 핵심 연구 목표
본 논문은 LLM의 RL-사후 훈련(RL-posttraining)이 진정으로 새로운 추론 능력을 부여하는지, 아니면 기본 모델의 기존 능력을 '선명하게' 하는 것인지에 대한 질문에 답하고자 합니다. 특히, 추가 훈련 없이 **순수 샘플링** 을 통해 **추론 시 기본 모델에서 유사한 추론 능력** 을 이끌어낼 수 있는지 탐구하는 것이 목표입니다.

## 핵심 방법론
저자들은 기본 모델의 자체 우도를 활용하는 간단한 **반복적 샘플링 알고리즘** 을 제안합니다. 이 알고리즘은 강화된 분포에서 샘플링하기 위한 **마르코프 연쇄 몬테카를로(MCMC) 기술** 에서 영감을 받아, **멱 분포(power distribution)** `p^α`를 샘플링 대상으로 설정합니다. 기술적으로는 **훈련, 데이터셋, 검증기(verifier)가 필요 없는** 방식으로 토큰 서브시퀀스를 반복적으로 리샘플링하여 작동합니다.

## 주요 결과
제안된 샘플링 알고리즘은 다양한 단일 샷 추론 태스크에서 상당한 성능 향상을 보였으며, **RL-사후 훈련 모델(GRPO)** 과 거의 일치하거나 이를 능가하는 결과를 달성했습니다. 예를 들어, **MATH500** 에서 **GRPO** 와 비견되는 정확도를 보였고, **HumanEval** 및 **AlpacaEval 2.0** 과 같은 영역 외(out-of-domain) 태스크에서는 **GRPO를 능가** 했습니다( **Qwen2.5-Math-7B HumanEval에서 Ours 0.573 vs GRPO 0.537** , **Phi-3.5-mini-instruct HumanEval에서 Ours 0.732 vs GRPO 0.134** ). 또한, RL-사후 훈련의 특징인 **다양성 붕괴(diversity collapse)** 를 피하며 **pass@k 성능** 에서도 뛰어났습니다.

## AI 실무자를 위한 시사점
이 연구는 기존 **기본 LLM** 이 추가 훈련 없이 **숨겨진 추론 능력** 을 발휘할 수 있음을 보여주어, AI 개발자들이 모델의 잠재력을 활용하는 새로운 방법을 제시합니다. **훈련-불필요, 데이터셋-불필요, 검증기-불필요** 접근 방식은 리소스 제약이 있는 환경이나 검증 가능한 보상이 없는 도메인에서 매우 실용적인 대안이 될 수 있습니다. 특히, RL-사후 훈련의 단점인 **다양성 붕괴** 를 회피하여 다수의 다양하고 고품질의 출력이 필요한 애플리케이션(예: 코드 생성)에 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.