---
title: "[논문리뷰] When Does RL Help Medical VLMs? Disentangling Vision, SFT, and RL Gains"
excerpt: "arXiv에 게시된 'When Does RL Help Medical VLMs? Disentangling Vision, SFT, and RL Gains' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Medical VLMs
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Visual Question Answering
  - Multi-modality
  - Reasoning Capacity
  - MedMNIST

permalink: /ai/review/2026-03-03-When-Does-RL-Help-Medical-VLMs-Disentangling-Vision-SFT-and-RL-Gains/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.01301)

**저자:** Ahmadreza Jeddi, Kimia Shaban, Negin Baghbanzadeh, Natasha Sharan, Abhishek Moturu, Elham Dolatabadi, and Babak Taati



## 핵심 연구 목표
의료 Vision-Language Model (VLM)에서 강화 학습(RL)이 시각적 추론을 개선하는지, 또는 주로 Supervised Fine-tuning (SFT)을 통해 이미 유도된 행동을 단순히 강화하는지에 대한 불분명함을 해소하는 것이 목표입니다. 비전, SFT, RL 각각의 기여도를 명확히 분리하여 RL의 실제 효과적인 적용 조건을 밝히고자 합니다.

## 핵심 방법론
본 연구는 **MedMNIST-v2** 를 통제된 다중 모달리티 테스트베드로 사용하여 비전, SFT, RL의 역할을 분석했습니다. 모델의 시각적 지각 능력은 **선형 프로빙(linear probing)** 을 통해 평가했으며, 추론 능력은 **Accuracy@1** 과 **Pass@K** 지표를 비교하여 측정했습니다. RL의 효과는 **Qwen2.5-VL-7B-Instruct (MBase)** 와 **OctoMed (MSFT)** 모델을 기반으로 **consistency-aware GRPO** 파이프라인을 사용하여 인-도메인 및 전이 학습 시나리오에서 평가했습니다.

## 주요 결과
기본 모델은 이미 합리적인 시각적 특징 분리 능력을 가지며, **의료 SFT** 는 이를 더욱 향상시킵니다. 그러나 RL은 시각적 표현을 일관되게 개선하지 않습니다. **Accuracy@1** 은 **Pass@K** 보다 현저히 낮아 잠재적 지원 가능성이 높음을 시사하며, RL은 모델이 **비자명한 지원(non-trivial support)** 을 이미 가질 때 가장 효과적입니다. 제안된 경계 인식 레시피를 **OctoMed 기반 모델** 에 적용하여 PMC-VQA로 RL 후 훈련한 결과, 6개 의료 VQA 벤치마크에서 평균 **64.91%** 의 성능을 달성하여 기존 baseline을 능가했습니다.

## AI 실무자를 위한 시사점
AI 실무자는 의료 VLM에 RL을 적용하기 전에 모델의 **잠재적 지원(Pass@K)** 을 진단하는 것이 중요합니다. 지원이 약한 경우 RL보다는 **SFT** 를 통해 모델의 커버리지를 확장하는 **"브리징(bridging)"** 단계를 우선시해야 합니다. 모델이 충분한 지원을 확보한 후 **RL** 을 적용하여 출력 분포를 **정밀화(sharpening)** 하고 **Acc@1** 을 향상시켜 샘플링 효율성을 높이는 전략이 효과적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.