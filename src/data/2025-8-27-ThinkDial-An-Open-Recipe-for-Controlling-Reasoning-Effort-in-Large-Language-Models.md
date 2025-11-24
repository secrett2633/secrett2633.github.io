---
title: "[논문리뷰] ThinkDial: An Open Recipe for Controlling Reasoning Effort in Large
  Language Models"
excerpt: "Jiangjie Chen이 [arXiv]에 게시한 'ThinkDial: An Open Recipe for Controlling Reasoning Effort in Large
  Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - Controllable Reasoning
  - Computational Efficiency
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Reasoning Compression
  - Budget-Aware Training

permalink: /ai/review/2025-8-27-ThinkDial-An-Open-Recipe-for-Controlling-Reasoning-Effort-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18773)

**저자:** Qianyu He, Siyu Yuan, Xuefeng Li, Mingxuan Wang, Jiangjie Chen



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 CoT(Chain-of-Thought) 추론 능력은 뛰어나지만, 실제 배포 시 연산 비용을 효율적으로 제어하는 것이 어렵습니다. 이 연구는 OpenAI의 gpt-oss 시리즈와 유사하게 **이산적인 운영 모드**를 통해 추론 노력을 제어하는 기능을 오픈소스 커뮤니티에 제공하여, 다양한 시나리오에서 추론 깊이와 연산 예산을 동적으로 조절할 수 있도록 하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Budget-Mode Supervised Fine-tuning (SFT)**과 **Budget-Aware Reinforcement Learning (RL)**을 통합한 엔드투엔드 훈련 패러다임인 **THINKDIAL**을 제안합니다. SFT 단계에서는 고품질 추론 체인을 **대상 기반 잘라내기(targeted truncation)**를 통해 **High, Medium, Low** 모드에 맞춰 압축하고, 모드별 시스템 프롬프트를 통해 각 모드에 적합한 추론 패턴을 학습시킵니다. RL 단계에서는 **DAPO 프레임워크** 기반의 **두 단계 훈련(Two-Phase Training)** 전략을 사용하여, 초기 **Warm-up RL**로 최고 성능을 확립한 후 **예산 인식 보상 쉐이핑(Budget-Aware Reward Shaping)**을 통해 모드별 추론 길이 제어를 구현합니다. 특히, 추론 내용이 답변 섹션으로 새는 **"Reasoning Length Hacking"**을 방지하기 위해 **Leak Penalty**를 도입했습니다.

## 주요 결과
**THINKDIAL**은 **Medium 모드**에서 **50% 토큰 감소와 10% 미만 성능 저하**, **Low 모드**에서 **75% 토큰 감소와 15% 미만 성능 저하**라는 목표를 일관되게 달성했습니다. 본 프레임워크는 gpt-oss-120b 및 o3-mini와 같은 독점 시스템의 제어 가능한 추론 패턴을 성공적으로 재현했으며, **ACT(Accuracy-Cost Trade-off) 점수** 평가에서 탁월한 균형을 보였습니다. 수학적 추론 벤치마크(AIME 2024, AIME 2025, GSM8K) 및 OOD(Out-of-Distribution) 태스크(GPQA)에서 강력한 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **THINKDIAL**을 통해 LLM의 연산 자원을 효율적으로 관리하고, 애플리케이션의 특정 요구사항에 맞춰 **추론 깊이를 동적으로 조절**할 수 있게 됩니다. 이산적인 추론 모드(Low, Medium, High)의 활용은 사용자 경험을 개선하고, **비용 효율적인 LLM 배포 전략**을 수립하는 데 중요한 기반을 제공합니다. 또한, **예산 인식 SFT 데이터 구성** 및 **Leak Penalty**와 같은 훈련 기법들은 추론 압축 시 발생할 수 있는 성능 저하 및 부작용을 효과적으로 방지하는 실용적인 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.