---
title: "[논문리뷰] DiRL: An Efficient Post-Training Framework for Diffusion Language Models"
excerpt: "arXiv에 게시된 'DiRL: An Efficient Post-Training Framework for Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Post-Training
  - Reinforcement Learning
  - GRPO
  - FlexAttention
  - LMDeploy
  - Math Reasoning
  - SFT

permalink: /ai/review/2025-12-30-DiRL-An-Efficient-Post-Training-Framework-for-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22234)

**저자:** Ying Zhu, Jiaxin Wan, Xiaoran Liu, Siyanag He, Qiqi Wang, Xu Guo, Tianyi Liang, Zengfeng Huang, Ziwei He, Xipeng Qiu



## 핵심 연구 목표
Diffusion Language Models (dLLMs)의 미흡한 post-training (특히 RL) 성능을 개선하여 수학적 추론 능력과 실제 배포 효율성을 향상시키는 것을 목표로 합니다. 기존 dLLM RL 방식의 연산 비효율성, 훈련-추론 불일치, 불충분한 추론 엔진 통합 문제를 해결하고 일관된 훈련-추론 과정을 가능하게 하는 확장 가능한 RL 프레임워크를 제시하고자 합니다.

## 핵심 방법론
DiRL은 **FlexAttention** 가속화된 blockwise 훈련과 **LMDeploy** 최적화된 추론을 긴밀하게 통합하는 효율적인 post-training 프레임워크입니다. **Supervised Fine-Tuning (SFT)** 과 **강화 학습 (RL)** 의 2단계 접근 방식을 사용하며, 특히 **DiPO** 라는 dLLM에 특화된 최초의 편향 없는 **Group Relative Policy Optimization (GRPO)** 구현체를 제안합니다. 이는 blockwise dLLM의 편향 없는 로짓 계산을 활용하여 훈련-추론 일관성과 효율적인 롤아웃 및 정책 최적화를 가능하게 합니다.

## 주요 결과
**DiRL-8B-Instruct** 모델은 **MATH500, GSM8k, AIME2024, AIME2025, OlympiadBench** 등 수학 벤치마크에서 기존 **dLLM** 및 **AR 모델(Qwen2.5-32B-Instruct 포함)** 을 능가하는 **평균 54.0%** 의 최고 성능을 달성했습니다. 또한, **TraceRL** 대비 **2.5배의 전체 처리량 향상** 과 훈련 시 **6배 가까운 지연 시간 단축** 을 시연하여 상당한 엔지니어링 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
DiRL은 dLLM의 **post-training 및 RL 적용 가능성** 을 크게 확장하여, 복잡한 추론 태스크(특히 수학)에서 dLLM의 실용성을 높였습니다. **FlexAttention** 과 **LMDeploy** 의 통합을 통한 효율적인 훈련-추론 파이프라인은 AI 엔지니어들이 dLLM을 실제 서비스에 배포하고 온라인 업데이트를 적용하는 데 중요한 기반을 제공합니다. 이는 dLLM을 활용한 신뢰성 높은 AI 시스템 구축에 기여하며, 기존 AR 모델 대비 dLLM의 경쟁력을 강화할 수 있는 실질적인 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.