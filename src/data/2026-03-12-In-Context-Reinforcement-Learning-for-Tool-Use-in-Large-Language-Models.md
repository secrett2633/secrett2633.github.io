---
title: "[논문리뷰] In-Context Reinforcement Learning for Tool Use in Large Language Models"
excerpt: "arXiv에 게시된 'In-Context Reinforcement Learning for Tool Use in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Tool Use
  - In-Context Learning
  - Few-Shot Learning
  - SFT-free
  - Data Efficiency
  - Curriculum Learning

permalink: /ai/review/2026-03-12-In-Context-Reinforcement-Learning-for-Tool-Use-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08068)

**저자:** Yaoqi Ye, Yiran Zhao, Keyu Duan, Zeyu Zheng, Kenji Kawaguchi, Cihang Xie, Michael Qizhe Shieh



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 외부 도구를 효과적으로 활용하도록 훈련할 때, 기존 **SFT(Supervised Fine-Tuning)** 기반 파이프라인의 높은 레이블링 데이터 비용 문제를 해결하고자 합니다. 특히, SFT 단계 없이 **RL-only 프레임워크** 를 통해 데이터 효율적이고 확장 가능한 도구 사용 학습 방법을 개발하는 것이 주된 목표입니다.

## 핵심 방법론
제안하는 **ICRL(In-Context Reinforcement Learning)** 은 RL 롤아웃 단계에서 **few-shot in-context 예시** 를 활용하여 모델이 도구 사용 방식을 학습하도록 합니다. 훈련이 진행됨에 따라 이 예시의 수를 점진적으로 줄여 **curriculum learning** 방식을 도입하며, 최종적으로는 **zero-shot** 환경에서 모델이 스스로 도구를 호출하도록 유도합니다. 최적화에는 **GRPO (Shao et al., 2024)** 가 사용되며, 보상 함수는 **정확도(EM)와 형식 준수** 를 결합하여 설계되었습니다.

## 주요 결과
**ICRL** 은 다양한 QA 및 추론 벤치마크에서 **SOTA 성능** 을 달성했습니다. **Qwen2.5-3B** 모델에서는 평균 **EM 정확도 40.16%** 를 기록하며 **Search-R1 (31.10%)** 대비 **+8.94%** 높은 성능을 보였고, **Qwen2.5-7B** 모델에서는 **49.12%** 로 **ParallelSearch (41.78%)** 대비 **+7.34%** 높은 결과를 나타냈습니다. 특히 **2Wiki (+7.3%)** 및 **Musique (+9.7%)** 와 같은 다중 홉 데이터셋에서 큰 개선을 보였으며, 수학 추론 벤치마크에서도 **SFT 없이 ReTool에 필적하는 성능** 을 입증했습니다.

## AI 실무자를 위한 시사점
**ICRL** 은 외부 도구 연동이 필요한 LLM 애플리케이션 개발 시 **값비싼 SFT 데이터 레이블링 없이** 모델을 훈련할 수 있는 **데이터 효율적인 대안** 을 제공합니다. 이는 특히 리소스가 제한적이거나 빠르게 변화하는 도메인에서 LLM의 도구 사용 능력을 확장하는 데 유용합니다. 점진적인 **in-context 예시 감소(curriculum design)** 전략은 모델의 자율적인 도구 사용 능력을 효과적으로 구축하는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.