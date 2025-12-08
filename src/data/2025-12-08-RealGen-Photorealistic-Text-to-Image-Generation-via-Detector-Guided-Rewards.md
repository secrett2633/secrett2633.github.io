---
title: "[논문리뷰] RealGen: Photorealistic Text-to-Image Generation via Detector-Guided Rewards"
excerpt: "Zilong Huang이 [arXiv]에 게시한 'RealGen: Photorealistic Text-to-Image Generation via Detector-Guided Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - Photorealism
  - Reinforcement Learning
  - Diffusion Models
  - Adversarial Learning
  - Detector-Guided Rewards
  - LLM Prompt Optimization
  - Image Quality Assessment

permalink: /ai/review/2025-12-08-RealGen-Photorealistic-Text-to-Image-Generation-via-Detector-Guided-Rewards/

toc: true
toc_sticky: true

date: 2025-12-08 00:00:00+0900+0900
last_modified_at: 2025-12-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00473)

**저자:** Junyan Ye, Leiqi Zhu, Yuncheng Guo, Dongzhi Jiang, Zilong Huang, Yifan Zhang, Zhiyuan Yan, Haohuan Fu, Conghui He, Weijia Li



## 핵심 연구 목표
본 논문은 기존 텍스트-이미지(T2I) 생성 모델들이 보이는 "가짜 같은" AI 아티팩트(예: "지나치게 매끄러운 피부", "기름진 얼굴 광택") 문제를 해결하고, 현실과 **구분 불가능한 수준의 사실적인 이미지** 를 생성하는 것을 목표로 합니다. 특히, 인간의 주관적인 선호도 데이터에 의존하지 않고 객관적이고 확장 가능한 이미지 사실성 평가 및 최적화 방법을 제시하고자 합니다.

## 핵심 방법론
RealGen은 **LLM(Large Language Model)** 을 활용한 프롬프트 최적화와 **Diffusion Model** 을 활용한 사실적 이미지 생성이라는 두 가지 핵심 구성 요소로 이루어져 있습니다. 핵심은 **"Detector Reward" 메커니즘** 으로, 이는 **semantic-level (Forensic-Chat)** 및 **feature-level (OmniAID)** 의 합성 이미지 감지기를 사용하여 이미지 내 아티팩트를 정량화하고 사실성을 평가합니다. 이 보상 신호를 기반으로 **GRPO(Generalized Reinforcement Policy Optimization) 알고리즘** 을 사용하여 LLM과 Diffusion Model 모두를 최적화하여 이미지 사실성과 디테일을 향상시킵니다. 또한, **RealBench** 라는 자동화된 평가 벤치마크를 제안하여 Detector-Scoring과 Arena-Scoring을 통해 사실성을 평가합니다.

## 주요 결과
RealGen은 **RealBench** 평가에서 기존의 강력한 T2I 모델들을 크게 능가하는 성능을 보였습니다. 특히, LLM 프롬프트 최적화를 포함한 Ours* 모델은 **Forensic-chat에서 80.84점** , **OmniAID에서 47.20점** , **GPT 5-Prompt에서 96.73점** 을 달성하며 모든 주요 사실성 지표에서 최고점을 기록했습니다. Arena-Scoring에서 **실제 이미지 대비 약 50%에 육박하는 승률** 을 보여, 생성 이미지가 실제와 혼동될 수 있는 수준의 사실성을 입증했습니다.

## AI 실무자를 위한 시사점
RealGen은 AI 아티팩트를 줄이고 이미지 사실성을 향상시키는 **Detector Reward 기반의 RL 최적화** 접근 방식이 T2I 모델 개발에 매우 효과적임을 보여줍니다. 이는 인간의 주관적인 선호도 데이터 수집의 높은 비용과 편향성 문제를 해결하고, **객관적이고 확장 가능한 T2I 모델 학습** 의 새로운 방향을 제시합니다. AI 실무자들은 **RealGen 프레임워크** 를 통해 고품질의 사실적인 이미지를 생성하고, **RealBench** 를 활용하여 생성 모델의 사실성 성능을 객관적으로 평가할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.