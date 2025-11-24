---
title: "[논문리뷰] Video-Thinker: Sparking 'Thinking with Videos' via Reinforcement Learning"
excerpt: "Runhao Fu이 [arXiv]에 게시한 'Video-Thinker: Sparking 'Thinking with Videos' via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Multimodal Large Language Models
  - Reinforcement Learning
  - Chain-of-Thought
  - Video Understanding
  - Temporal Grounding
  - Video Captioning
  - Autonomous Tool Use

permalink: /ai/review/2025-10-30-Video-Thinker-Sparking-Thinking-with-Videos-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23473)

**저자:** Shijian Wang, Jiarui Jin, Xingjian Wang, Linxin Song, Runhao Fu, Hecheng Wang, Zongyuan Ge, Yuan Lu, Xuelian Cheng



## 핵심 연구 목표
본 논문은 기존 이미지 추론에서 성공적으로 활용된 "Thinking with Images" 패러다임을 비디오 추론 태스크로 확장하는 것을 목표로 합니다. MLLM이 외부 도구에 의존하지 않고 비디오 콘텐츠 내에서 **내재적인 grounding 및 captioning 능력**을 자율적으로 활용하여 추론 단서를 생성함으로써 "Thinking with Videos" 능력을 부여하고자 합니다.

## 핵심 방법론
저자들은 MLLM이 비디오를 "생각"할 수 있도록 **Video-Thinker** 프레임워크를 제안합니다. 이를 위해 **Video-Thinker-10K**라는 정교하게 큐레이션된 데이터셋을 구축했으며, 이 데이터셋은 chain-of-thought 추론 시퀀스 내에서 자율적인 도구 사용을 포함합니다. 훈련 전략은 추론 형식을 학습하기 위한 **Supervised Fine-Tuning (SFT)**으로 시작하여, 추론 능력을 강화하기 위한 **Group Relative Policy Optimization (GRPO)** 단계로 이어집니다.

## 주요 결과
**Video-Thinker-7B**는 7B 크기 MLLM 중 비디오 추론 벤치마크에서 새로운 SOTA 성능을 달성했습니다. 특히 Video-Holmes에서 **43.22%**, CG-Bench-Reasoning에서 **33.25%**, VRBench에서 **80.69%**의 인상적인 성능 향상을 보였습니다. GRPO 단계는 SFT 단계 대비 out-of-domain 일반화에서 **11.70%** (Video-Holmes)의 상당한 개선을 가져왔으며, 비디오 grounding 태스크에서 **48.22% mIoU**를 기록했습니다.

## AI 실무자를 위한 시사점
**Video-Thinker**는 MLLM이 외부 도구 호출 없이 비디오 grounding 및 captioning 태스크를 자율적으로 처리할 수 있는 효과적인 방법을 제시합니다. 이는 AI/ML 엔지니어들이 더욱 효율적이고 견고한 비디오 이해 시스템을 구축할 수 있게 합니다. 또한, **10K개의 신중하게 큐레이션된 훈련 데이터셋**만으로도 강력한 비디오 추론 능력을 달성할 수 있음을 보여주어, 대규모 데이터셋에 대한 의존도를 줄이는 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.