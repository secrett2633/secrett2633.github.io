---
title: "[논문리뷰] Jointly Reinforcing Diversity and Quality in Language Model Generations"
excerpt: "Tianlu이 [arXiv]에 게시한 'Jointly Reinforcing Diversity and Quality in Language Model Generations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Language Models
  - Diversity Optimization
  - Quality Enhancement
  - Semantic Clustering
  - Post-training
  - Generative AI

permalink: /ai/review/2025-9-3-Jointly-Reinforcing-Diversity-and-Quality-in-Language-Model-Generations/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02534)

**저자:** Tianjian Li, Yiming Zhang, Ping Yu, Swarnadeep Saha, Daniel Khashabi, Jason Weston, Jack Lanchantin, Tianlu Wang



## 핵심 연구 목표
대규모 언어 모델(LM)의 후처리 과정에서 발생하는 다양성 감소 문제를 해결하는 것이 주요 목표입니다. 기존 후처리 방식이 정확도와 유용성에 초점을 맞춰 출력 분포가 과도하게 좁아지고 아이디어 범위가 축소되는 현상을 방지하며, 응답 품질과 의미론적 다양성을 동시에 최적화하는 방법을 제시하고자 합니다.

## 핵심 방법론
본 논문은 **Diversity-Aware Reinforcement Learning (DARLING)** 프레임워크를 제안합니다. 이 방법론은 먼저 **학습된 파티션 함수** 를 사용하여 표면적인 어휘 차이를 넘어선 의미론적 다양성을 측정합니다. 이 다양성 신호는 응답 품질 보상과 **곱셈 방식으로 결합** 되어 온라인 강화 학습 과정에서 다양하고 고품질의 응답에 대한 이점을 증폭시킵니다. 또한, 긴 시퀀스에 대한 편향을 줄이기 위해 **토큰 수준 평균화** 를 적용합니다.

## 주요 결과
비검증 가능한 태스크(명령어 따르기, 창의적 글쓰기)에서 **DARLING** 은 품질 전용 RL 기준선을 일관되게 능가하며, **Llama-3.1-8B-Instruct** 모델에서 **LCWR 55.2%** , **Distinct 5.49개** 를 달성하여 기존 **GRPO** 대비 품질과 다양성 모두에서 우위를 보였습니다. 검증 가능한 수학 문제에서는 **Qwen3-4B-Base** 모델에서 **pass@1(솔루션 품질)에서 +3.51%** , **pass@128(솔루션 다양성)에서 +7.62%** 향상을 보였습니다. 특히, 다양성 최적화가 온라인 RL에서 탐색을 촉진하여 더 높은 품질의 응답으로 이어진다는 점을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **DARLING** 을 통해 LM의 후처리 시 다양성 저하 문제를 효과적으로 해결할 수 있습니다. 이는 브레인스토밍, 스토리텔링과 같은 창의적 애플리케이션 및 다양한 해결책이 필요한 문제(예: 수학 문제 풀이)에서 LM의 활용도를 크게 높일 수 있습니다. 학습된 의미론적 분류기 활용은 확장 가능한 다양성 신호 제공하며, 다양성 추구가 예상치 못하게 전반적인 응답 품질 향상으로 이어질 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.