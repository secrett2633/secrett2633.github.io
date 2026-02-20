---
title: "[논문리뷰] Inpainting-Guided Policy Optimization for Diffusion Large Language
  Models"
excerpt: "Chenyu Wang이 arXiv에 게시한 'Inpainting-Guided Policy Optimization for Diffusion Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion LLMs
  - Reinforcement Learning
  - Inpainting
  - Policy Optimization
  - Exploration
  - Mathematical Reasoning
  - GRPO

permalink: /ai/review/2025-9-15-Inpainting-Guided-Policy-Optimization-for-Diffusion-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.10396)

**저자:** Siyan Zhao, Mengchen Liu, Jing Huang, Miao Liu, Chenyu Wang, Bo Liu, Yuandong Tian, Guan Pang, Sean Bell, Aditya Grover, Feiyu Chen



## 핵심 연구 목표
본 논문은 **Diffusion Large Language Models (dLLMs)** 에 강화 학습(RL)을 적용할 때 발생하는 **탐색(exploration) 문제** 를 해결하고자 합니다. 특히, 희소한 보상 신호와 비효율적인 샘플링으로 인한 **낮은 학습 효율성** 을 극복하고, dLLMs의 **inpainting 능력** 을 활용하여 RL 탐색을 효과적으로 안내하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **Inpainting Guided Policy Optimization (IGPO)** 프레임워크를 제안합니다. 이는 정책이 올바른 솔루션을 찾기 어려울 때 **부분적인 정답 추론 과정(ground-truth reasoning traces)** 을 전략적으로 삽입하고, dLLM이 나머지 부분을 **inpainting** 으로 완성하게 합니다. 또한, SFT 데이터와 RL 샘플링 간의 길이 불일치를 해소하기 위해 **Length-Aligned SFT** 를 통해 **재작성된 간결한 추론 과정** 으로 모델을 사전 훈련하고, **엔트로피 기반 경사 필터링(entropy-based gradient filtering)** 을 적용하여 **높은 엔트로피 위치** 에만 경사 업데이트를 제한함으로써 학습 안정성을 확보합니다.

## 주요 결과
본 연구는 세 가지 수학적 추론 벤치마크에서 **기존 full-attention masked dLLMs 대비 최신 성능(SoTA)** 을 달성했습니다. **LLaDA-Instruct** 를 기준으로 **GSM8K에서 +4.9%** , **Math500에서 +8.4%** , **AMC에서 +9.9%** 의 성능 향상을 보였습니다. 특히, **IGPO** 는 표준 **GRPO** 샘플링 대비 **약 60%의 '모든 응답 오답 그룹' 비율을 감소** 시켜 더 안정적이고 효율적인 학습을 가능하게 했습니다.

## AI 실무자를 위한 시사점
**IGPO** 는 **dLLMs의 고유한 inpainting 능력** 을 활용하여 RL 탐색을 효과적으로 가이드하는 새로운 패러다임을 제시합니다. 이는 복잡한 추론 태스크와 같이 **희소한 보상 환경** 에서 **dLLMs의 RL 미세 조정** 효율성을 크게 향상시킬 수 있습니다. 또한, **Length-Aligned SFT** 및 **엔트로피 기반 경사 필터링** 과 같은 기술들은 실제 AI 시스템 개발 시 **학습 데이터 준비 및 모델 안정화** 에 대한 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.