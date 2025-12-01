---
title: "[논문리뷰] PRInTS: Reward Modeling for Long-Horizon Information Seeking"
excerpt: "Elias Stengel-Eskin이 [arXiv]에 게시한 'PRInTS: Reward Modeling for Long-Horizon Information Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reward Modeling
  - Long-Horizon Tasks
  - Information Seeking
  - Large Language Models
  - Trajectory Summarization
  - Reinforcement Learning
  - Tool Use
  - Process Reward Models

permalink: /ai/review/2025-11-25-PRInTS-Reward-Modeling-for-Long-Horizon-Information-Seeking/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19314)

**저자:** Jaewoo Lee, Archiki Prasad, Justin Chih-Yao Chen, Zaid Khan, Elias Stengel-Eskin, Mohit Bansal



## 핵심 연구 목표
본 논문은 기존 **Process Reward Model (PRM)** 의 한계, 즉 짧은 추론 단위에 대한 이진 판단과 급증하는 컨텍스트 처리의 어려움을 극복하는 것을 목표로 합니다. 특히, 정보 탐색(information-seeking)과 같은 장기적인 AI 에이전트 태스크에서 **도구 상호작용** 및 **추론** 을 아우르는 단계의 다차원적 품질을 평가하고, 빠르게 늘어나는 컨텍스트를 효율적으로 관리하여 에이전트를 효과적으로 안내하는 것이 주된 연구 목적입니다.

## 핵심 방법론
PRINTS는 **정보 획득 점수(information gain score)** 를 통한 밀집 점수 부여와 **궤적 요약(trajectory summarization)** 이라는 두 가지 핵심 역량을 갖춘 생성형 PRM입니다. 정보 획득 점수는 Monte Carlo 롤아웃을 통해 예측된 최종 정답 정확도 변화를 기반으로 산출되며, 이를 활용하여 **선호도 쌍(preference pairs)** 을 자동으로 구성합니다. 훈련은 **강화 학습(reinforcement learning)** 과 **지도 미세 조정(supervised fine-tuning, SFT)** 을 번갈아 수행하며, **GRPO** 를 통해 점수 보상과 비교 보상을 결합하여 단계별 평가 능력을 강화하고, SFT는 재귀적으로 궤적 요약을 업데이트하도록 합니다.

## 주요 결과
**PRINTS** 는 **FRAMES, GAIA, WebWalkerQA** 벤치마크에서 **Qwen3-32B, Tongyi DeepResearch-30B-A3B, Gemini-2.5-Flash** 등 다양한 LLM 에이전트의 성능을 일관되게 향상시켰습니다. 특히 **Qwen3-32B** 에서는 평균 **9.3%** , **Tongyi DeepResearch-30B-A3B** 에서는 **3.9%** , **Gemini-2.5-Flash** 에서는 **4.0%** 의 절대 정확도 향상을 달성했습니다. 또한, PRINTS의 요약 기반 접근 방식이 원본 궤적을 사용하는 것보다 **7.7%** 더 높은 정확도를 보여, 컨텍스트 압축의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
**PRINTS** 는 정보 탐색 에이전트의 성능을 향상시키는 비용 효율적이고 **모델 불가지론적(model-agnostic)** 인 방법을 제시합니다. 이는 기존 LLM 미세 조정에 필요한 **대규모 데이터셋** 과 **높은 계산 비용** 부담을 줄이면서도, **4B** 와 같은 작은 백본 에이전트로도 강력한 프론티어 모델에 필적하거나 이를 능가하는 성능을 달성할 수 있음을 보여줍니다. 따라서 AI/ML 엔지니어는 **PRINTS** 를 활용하여 복잡하고 장기적인 추론 태스크에서 LLM 기반 에이전트의 **컨텍스트 관리 능력** 과 **단계별 의사 결정 품질** 을 효과적으로 개선할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.