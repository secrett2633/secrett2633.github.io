---
title: "[논문리뷰] VIDEOP2R: Video Understanding from Perception to Reasoning"
excerpt: "이 [arXiv]에 게시한 'VIDEOP2R: Video Understanding from Perception to Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Understanding
  - Reinforcement Fine-Tuning (RFT)
  - Large Video Language Models (LVLMs)
  - Perception and Reasoning
  - Chain-of-Thought (CoT)
  - Process-Aware Learning
  - Policy Optimization
  - Credit Assignment

permalink: /ai/review/2025-11-19-VIDEOP2R_Video_Understanding_from_Perception_to_Reasoning/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11113)

**저자:** Yifan Jiang, Yueying Wang, Rui Zhao, Toufiq Parag, Zhimin Chen, Zhenyu Liao, Jayakrishnan Unnikrishnan



## 핵심 연구 목표
기존 비디오 RFT 프레임워크가 인식(perception)과 추론(reasoning) 과정을 단일 절차로 처리하여 신용 할당(credit assignment)이 모호해지고 오류 수정 효율성이 떨어진다는 문제를 해결하고자 합니다. 이 논문은 비디오 이해를 향상시키기 위해 인식과 추론을 별개의 프로세스로 모델링하는 새로운 프로세스-인지(process-aware) 비디오 RFT 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **VIDEOP2R**는 **SFT(Supervised Fine-Tuning)**와 **RL(Reinforcement Learning)**의 두 단계로 구성됩니다. SFT 단계에서는 **Qwen2.5-VL-72B-Instruct**를 기반으로 인식과 추론 트레이스를 분리하는 **3단계 CoT 생성 파이프라인**을 통해 고품질의 **VIDEOP2R-CoT-162K** 데이터셋을 구축하여 모델을 사전 학습시킵니다. RL 단계에서는 **PA-GRPO(Process-Aware Group Relative Policy Optimization)** 알고리즘을 도입하여, 인식에는 **Claude 3.7 Sonnet**으로 판단된 LLM 기반 보상, 추론에는 규칙 기반 보상이라는 별도의 보상을 제공하여 신용 할당을 개선합니다.

## 주요 결과
**VIDEOP2R**는 **7개 비디오 이해 및 추론 벤치마크 중 6개에서 SotA(State-of-the-Art) 성능**을 달성했으며, 이전 SotA 대비 **평균 1.3%의 정확도 향상**을 보였습니다. 베이스 모델 대비 **평균 1.9%~9.1%의 강력한 정확도 향상**을 입증했습니다. 또한, **PA-GRPO**와 프로세스-인지 모델링이 각각 **2.1% (SFT)** 및 **2.3% (RL)**의 평균 정확도 향상에 기여했음을 ablation 연구를 통해 확인했습니다.

## AI 실무자를 위한 시사점
비디오 이해 시스템 개발 시, **인식과 추론 단계를 명확히 분리**하여 모델링하는 것이 복잡한 추론 작업에서 **성능과 신뢰도를 향상**시키는 데 중요합니다. **PA-GRPO**와 같은 프로세스-인지 보상 체계는 멀티모달 **LLM 학습에서 더 정교한 신용 할당**을 가능하게 하여 학습 효율성을 높일 수 있습니다. 또한, **VIDEOP2R-CoT-162K**와 같이 구조화된 CoT 데이터셋을 생성하는 방법론은 향후 고품질 멀티모달 SFT 데이터 구축에 활용될 수 있습니다. 그러나 특정 **도메인 특화 지식**이 필요한 경우(예: MMVU 벤치마크)에는 모델의 성능이 저하될 수 있어, 일반 비디오 이해를 넘어선 전문 분야 적용을 위해 추가적인 지식 주입 전략이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.