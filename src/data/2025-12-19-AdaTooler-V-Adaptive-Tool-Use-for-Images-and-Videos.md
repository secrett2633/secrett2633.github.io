---
title: "[논문리뷰] AdaTooler-V: Adaptive Tool-Use for Images and Videos"
excerpt: "Zhixun Li이 [arXiv]에 게시한 'AdaTooler-V: Adaptive Tool-Use for Images and Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Adaptive Tool-Use
  - Reinforcement Learning
  - Chain-of-Thought
  - Vision-Language Models
  - Visual Reasoning
  - AT-GRPO

permalink: /ai/review/2025-12-19-AdaTooler-V-Adaptive-Tool-Use-for-Images-and-Videos/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16918)

**저자:** Chaoyang Wang, Kaituo Feng, Dongyang Chen, Zhongyu Wang, Zhixun Li, Sicheng Gao, Meng Meng, Xu Zhou, Manyuan Zhang, Yuzhang Shang, Xiangyu Yue



## 핵심 연구 목표
본 논문은 기존 멀티모달 대규모 언어 모델(MLLM)의 **맹목적인 도구 사용(blind tool-use)** 패턴으로 인한 추론 오버헤드 증가와 성능 저하 문제를 해결하는 것을 목표로 합니다. 시각적 문제가 실제로 도구 사용을 필요로 하는지 스스로 판단하여 **도구를 적응적으로 사용하는** MLLM, **AdaTooler-V** 를 제안합니다.

## 핵심 방법론
AdaTooler-V는 도구 사용의 실제 성능 향상을 정량화하는 **Tool Benefit Score (AS)** 개념을 도입하고, 이를 바탕으로 보상 스케일을 조절하는 **AT-GRPO (Adaptive Tool-use GRPO)** 강화 학습 알고리즘을 사용합니다. 모델은 **AdaTooler-V-CoT-100k** (SFT용)와 **AdaTooler-V-300k** (RL용) 두 가지 대규모 데이터셋을 활용한 **두 단계 학습 프레임워크** 를 통해 훈련됩니다.

## 주요 결과
**AdaTooler-V-7B** 는 고해상도 벤치마크 V*에서 **89.8%의 정확도** 를 달성하여 상용 모델인 GPT-4o와 Gemini 1.5 Pro를 능가했습니다. 또한, MathVista에서 **74.5%** 를 기록하며 Qwen2.5-VL-7B-Instruct 대비 **6%p 이상** 의 성능 향상을 보였고, 다양한 영상 벤치마크에서도 우수한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 MLLM이 시각적 추론 작업에서 **도구 사용을 보다 효율적이고 전략적으로** 수행하게 함으로써 추론 비용을 줄이고 전반적인 성능을 향상할 수 있음을 보여줍니다. **AT-GRPO 알고리즘** 과 **Tool Benefit Score** 는 AI 에이전트의 의사결정 능력을 향상시키는 데 활용될 수 있으며, 복잡한 멀티모달 환경에서 보다 지능적인 시스템을 구축하기 위한 중요한 발판을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.