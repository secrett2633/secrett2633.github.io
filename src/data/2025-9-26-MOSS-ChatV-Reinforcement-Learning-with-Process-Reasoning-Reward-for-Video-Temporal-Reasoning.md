---
title: "[논문리뷰] MOSS-ChatV: Reinforcement Learning with Process Reasoning Reward for
  Video Temporal Reasoning"
excerpt: "Junyan Zhang이 [arXiv]에 게시한 'MOSS-ChatV: Reinforcement Learning with Process Reasoning Reward for
  Video Temporal Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Temporal Reasoning
  - Reinforcement Learning
  - Process Supervision
  - Dynamic Time Warping
  - Multimodal Large Language Models
  - Video State Prediction
  - Reward Hacking

permalink: /ai/review/2025-9-26-MOSS-ChatV-Reinforcement-Learning-with-Process-Reasoning-Reward-for-Video-Temporal-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21113)

**저자:** Sicheng Tao, Jungang Li, Yibo Yan, Junyan Zhang, Yubo Gao, Hanqian Li, ShuHang Xun, Yuxuan Fan, Hong Chen, Jianxiang He, Xuming Hu



## 핵심 연구 목표
비디오 기반 MLLM(Multimodal Large Language Models)에서 발생하는 **프로세스 불일치(process inconsistency)** 문제를 해결하여, 모델이 올바른 최종 답변을 도출하더라도 중간 추론 과정이 비디오의 시간적 역동성에서 벗어나는 한계를 극복하는 것을 목표로 합니다. 이를 통해 모델의 해석 가능성과 견고성을 향상하고자 합니다.

## 핵심 방법론
본 연구는 **Dynamic Time Warping (DTW)** 기반의 **Process Reasoning Reward (PRR)** 를 사용하는 **MOSS-ChatV** 라는 강화 학습(RL) 프레임워크를 제안합니다. 이 **규칙 기반 보상(rule-based reward)** 은 모델의 추론 과정을 시간적으로 정렬된 참조(reference)와 일치시켜, 별도의 보상 모델 없이 효율적인 프로세스 감독을 가능하게 합니다. 또한, 비디오 상태 예측을 위한 **MOSS-Video** 데이터셋을 구축하여 학습 및 평가에 활용하며, **GRPO(Group Relative Policy Optimization)** 를 통해 모델을 미세 조정합니다.

## 주요 결과
**MOSS-ChatV** 는 **MOSS-Video (test) 데이터셋** 에서 **87.2%** 의 정확도를 달성하며, **GPT-4o** 와 같은 강력한 폐쇄형 모델들을 능가하는 **최첨단 성능(state-of-the-art performance)** 을 보였습니다. 또한, **MVBench (67.6%)** 및 **MMVU** 와 같은 일반 비디오 벤치마크에서도 성능 향상을 입증했습니다. **Qwen2.5-VL** 및 **Phi2** 를 포함한 다양한 아키텍처에서 일관된 성능 향상을 보여 넓은 적용 가능성을 확인했으며, **GPT-4o** 를 평가자로 사용한 결과 더 일관되고 안정적인 추론 과정을 생성함을 보여주었습니다.

## AI 실무자를 위한 시사점
**MOSS-ChatV** 는 MLLM의 비디오 시간적 추론 능력을 강화하기 위한 효과적인 강화 학습 프레임워크를 제공합니다. **규칙 기반 PRR** 는 복잡한 보상 모델 훈련의 필요성을 없애 효율적이며, **MOSS-Video** 데이터셋은 프로세스 감독 학습을 위한 중요한 자원입니다. 다양한 모델 아키텍처에 걸쳐 일반화되는 능력은 실제 AI 애플리케이션에 매우 유용하며, 특히 비디오 기반 AI 시스템의 **설명 가능성** 과 **견고성** 을 높이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.