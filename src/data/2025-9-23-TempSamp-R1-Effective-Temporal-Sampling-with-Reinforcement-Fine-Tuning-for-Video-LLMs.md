---
title: "[논문리뷰] TempSamp-R1: Effective Temporal Sampling with Reinforcement Fine-Tuning
  for Video LLMs"
excerpt: "Shaohui Jiao이 [arXiv]에 게시한 'TempSamp-R1: Effective Temporal Sampling with Reinforcement Fine-Tuning
  for Video LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video LLMs
  - Temporal Grounding
  - Reinforcement Learning
  - Off-policy Learning
  - Reward Shaping
  - Chain-of-Thought
  - Multimodal LLMs

permalink: /ai/review/2025-9-23-TempSamp-R1-Effective-Temporal-Sampling-with-Reinforcement-Fine-Tuning-for-Video-LLMs/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18056)

**저자:** Yunheng Li, Jing Cheng, Shaoyong Jia, Hangyi Kuang, Shaohui Jiao, Qibin Hou, Ming-Ming Cheng



## 핵심 연구 목표
이 논문은 비디오 시간적 접지(temporal grounding) 작업에서 **멀티모달 대규모 언어 모델(MLLMs)** 의 효율성을 개선하는 것을 목표로 합니다. 기존 강화 학습( **RL** ) 방법론, 특히 **GRPO** 가 큰 시간 검색 공간에서 비효율적인 탐색과 불안정한 정책 업데이트를 겪는 문제를 해결하고자 합니다.

## 핵심 방법론
**TempSamp-R1** 이라는 새로운 강화 미세 조정 프레임워크를 제안하며, **온-정책 샘플링(on-policy sampling)** 과 **오프-정책 지도(off-policy guidance)** (예: 정답 주석)를 결합하여 정확한 시간적 감독을 제공합니다. 훈련 안정성을 위해 보상 피드백을 비대칭 변환을 통해 동적으로 재구성하는 **비선형 소프트 이점 계산(non-linear soft advantage computation)** 방법을 도입합니다. 또한, **하이브리드 CoT(Chain-of-Thought) 훈련 패러다임** 을 사용하여 CoT 및 비-CoT 추론 모드를 모두 지원하는 단일 모델을 최적화합니다.

## 주요 결과
**TempSamp-R1** 은 기존 **GRPO 기반** 모델들을 뛰어넘는 최첨단 성능을 달성했습니다. **Charades-STA** 에서 **R1@0.7 52.9%(+2.7%)** , **ActivityNet Captions** 에서 **R1@0.5 56.0%(+5.3%)** , **QVHighlights** 에서 **mAP 30.0%(+3.0%)** 를 기록했습니다. 특히 **제한된 데이터** 환경에서도 강력한 **few-shot 일반화 능력** 을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 LLM** 을 위한 더 안정적이고 데이터 효율적인 **강화 학습 미세 조정 패러다임** 을 제시합니다. **정답 주석을 오프-정책 감독으로 활용** 하고 **적응형 보상 쉐이핑** 을 적용하는 방식은 비디오 이해 작업의 정확도를 크게 향상시킬 수 있음을 시사합니다. **하이브리드 CoT 접근 방식** 은 다양한 추론 복잡성을 가진 쿼리에 유연하게 대응할 수 있어 실제 응용 분야에서 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.