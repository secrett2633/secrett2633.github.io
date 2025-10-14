---
title: "[논문리뷰] Training Vision-Language Process Reward Models for Test-Time Scaling in
  Multimodal Reasoning: Key Insights and Lessons Learned"
excerpt: "이 [arXiv]에 게시한 'Training Vision-Language Process Reward Models for Test-Time Scaling in
  Multimodal Reasoning: Key Insights and Lessons Learned' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Process Reward Models (PRMs)
  - Multimodal Reasoning
  - Test-Time Scaling (TTS)
  - Process Supervision
  - Dataset Construction
  - Perception Errors
  - MCTS

permalink: /ai/review/2025-10-2-Training_Vision-Language_Process_Reward_Models_for_Test-Time_Scaling_in_Multimodal_Reasoning_Key_Insights_and_Lessons_Learned/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23250)

**저자:** Brandon Ong, Tej Deep Pala, Vernon Toh, William Chandra Tjhi, Soujanya Poria



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)의 추론 신뢰성을 향상시키는 프로세스 보상 모델(PRM)을 시각-언어 모델(VLM) 영역으로 확장하고자 합니다. 특히, 기존 VLM-PRM의 **MCTS(Monte Carlo Tree Search)** 기반 데이터 구축의 한계(노이즈 및 일반화 부족)를 극복하고, **데이터 구축, 훈련, 테스트 시점 스케일링**의 다양한 전략을 탐색하여 **멀티모달 추론**에서 VL-PRM의 설계 공간을 규명하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **강력한 VLM (o4-mini)**의 판단과 **MCTS**를 결합한 **하이브리드 데이터 합성 프레임워크**를 제안하여, 보다 정확한 스텝-레벨 레이블을 생성하는 **VL-PRM300K** 데이터셋을 구축했습니다. 또한, **시각적 그라운딩 단계**의 오류를 명시적으로 감지하도록 **인지(Perception) 중심 감독(supervision)**을 도입했습니다. 테스트 시점 스케일링(TTS)을 위해 **Guided Greedy Search, One-shot Search, Step-Score Aggregation**의 세 가지 전략을 체계적으로 평가했으며, **Qwen-2.5-VL** 및 **Gemma3** 백본 모델들을 활용했습니다.

## 주요 결과
**VL-PRM300K** 데이터셋은 **MCTS와 o4-mini VLM 판별기**를 함께 사용하여 기존 **MCTS 단독 방식보다 우수한 성능**을 보였습니다. **인지(Perception) 중심 감독**은 VL-PRM의 인지 오류 감지 능력을 크게 향상시켜 **F1 점수를 14-20%** 끌어올렸습니다. 테스트 시점 스케일링에서는 **One-shot Search** (ORM처럼 작동)가 스텝-레벨 프로세스 선택 방식보다 지속적으로 우수한 성능을 나타냈습니다. 또한, **작은 VL-PRM (3B 모델)**이 프로세스 오류 감지에서 **더 큰 7B 모델을 5% 초과**하는 성능을 보였고, **강력한 VLM 백본**에서 **잠재된 추론 능력**을 발현시키는 데 기여했습니다.

## AI 실무자를 위한 시사점
멀티모달 AI 시스템 개발자들은 **MCTS와 VLM 판단을 결합한 하이브리드 데이터 라벨링**이 고품질 프로세스 감독 데이터 생성에 필수적임을 고려해야 합니다. 특히, **시각적 인지 오류 감지**를 위한 명시적 훈련은 VLM의 **테스트 시점 스케일링 성능**을 크게 향상시킬 수 있습니다. **One-shot Search**와 같이 PRM을 **Outcome Reward Model (ORM)**처럼 활용하는 전략이 스텝-바이-스텝 가이드보다 효과적일 수 있으며, 이는 기존 VLM의 숨겨진 추론 능력을 끌어내는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.