---
title: "[논문리뷰] Language-based Trial and Error Falls Behind in the Era of Experience"
excerpt: "이 [arXiv]에 게시한 'Language-based Trial and Error Falls Behind in the Era of Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reinforcement Learning
  - Exploration Efficiency
  - Sub-Scale Collaboration
  - Out-of-Distribution Tasks
  - Agentic AI
  - Supervised Fine-Tuning

permalink: /ai/review/2026-01-30-Language-based-Trial-and-Error-Falls-Behind-in-the-Era-of-Experience/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21754)

**저자:** Haoyu Wang¹ Guozheng Ma¹ Shugang Cui 2 Yilun Kong¹ Haotian Luo Li Shen 3 Mengya Gao 2 Yichao Wu 2 Xiaogang Wang2 Dacheng Tao ¹



## 핵심 연구 목표
Large Language Models (LLMs)가 언어 기반이 아닌 새로운 환경(예: 상징적, 공간적 태스크)에서 낮은 성능을 보이는 문제를 해결하는 것이 목표입니다. 특히, LLM의 방대한 탐색 공간과 높은 연산 비용으로 인해 발생하는 **탐색 비효율성** 과 **차원 불일치** 를 핵심 병목 현상으로 지목하고, 이를 극복하기 위한 새로운 프레임워크를 제안합니다.

## 핵심 방법론
본 연구는 탐색과 활용을 분리하는 **SCOUT (Sub-Scale Collaboration On Unseen Tasks)** 프레임워크를 제안합니다. 경량화된 "스카우트" (예: **작은 MLP** 또는 **CNN** )를 활용하여 **DQN** 및 **PPO** 와 같은 고전적인 **강화 학습(RL)** 알고리즘으로 환경 동역학을 신속하게 탐색하고 전문 궤적을 생성합니다. 이렇게 수집된 궤적은 텍스트화되어 LLM의 **Supervised Fine-Tuning (SFT)** 에 사용되며, 이후 **다중 턴 강화 학습(RL)** 을 통해 LLM의 잠재된 세계 지식을 활성화하고 추론 및 의사결정 능력을 정제합니다.

## 주요 결과
**SCOUT** 를 통해 **Qwen2.5-3B-Instruct** 모델이 평균 **0.86** 의 점수를 달성하여, **Gemini-2.5-Pro (0.60)** 와 같은 독점 모델을 포함한 테스트된 모든 기준선을 크게 능가했습니다. 또한, 기존 방식 대비 약 **60%의 GPU 시간 소비** 를 절약하는 등 상당한 계산 효율성을 입증했습니다. 이는 경량 스카우트를 활용한 효과적인 탐색 전략이 LLM의 성능 향상과 비용 절감에 기여함을 보여줍니다.

## AI 실무자를 위한 시사점
**SCOUT** 프레임워크는 LLM이 새로운 비언어적 태스크를 학습하는 데 필요한 높은 계산 비용과 긴 탐색 시간을 크게 줄일 수 있음을 시사합니다. 이를 통해 소규모 LLM도 대규모 데이터 및 자원 없이 최첨단 성능을 달성할 수 있어 AI의 **민주화** 에 기여할 수 있습니다. AI 에이전트 개발 시, LLM의 추론 능력만큼이나 초기 탐색 효율성이 중요하다는 점을 강조하며, **경량 모델과 대규모 모델의 협업** 을 통한 문제 해결 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.