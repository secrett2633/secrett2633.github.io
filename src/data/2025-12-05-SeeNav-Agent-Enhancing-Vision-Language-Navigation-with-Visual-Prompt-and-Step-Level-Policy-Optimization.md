---
title: "[논문리뷰] SeeNav-Agent: Enhancing Vision-Language Navigation with Visual Prompt and Step-Level Policy Optimization"
excerpt: "arXiv에 게시된 'SeeNav-Agent: Enhancing Vision-Language Navigation with Visual Prompt and Step-Level Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Navigation
  - Large Vision-Language Models
  - Visual Prompt
  - Reinforcement Fine-Tuning
  - Policy Optimization
  - Embodied AI
  - Spatial Reasoning
  - Perception Errors

permalink: /ai/review/2025-12-05-SeeNav-Agent-Enhancing-Vision-Language-Navigation-with-Visual-Prompt-and-Step-Level-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02631)

**저자:** Zhengcheng Wang*, Zichuan Lin*, Yijun Yang, Haobo Fu, Deheng Ye



## 핵심 연구 목표
기존 **LVLM(Large Vision-Language Models)** 기반의 VLN(Vision-Language Navigation) 에이전트가 겪는 지각, 추론, 계획 오류로 인한 낮은 내비게이션 성능 문제를 해결하고자 합니다. 특히 시각적 환각과 공간 이해 부족의 한계를 극복하고, 에이전트의 전반적인 내비게이션 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 새로운 VLN 에이전트 프레임워크인 **SeeNav-Agent** 를 제안합니다. 첫째, 시각 모듈의 지각 환각을 줄이고 에이전트의 공간 상태 이해를 개선하기 위해 **듀얼 뷰 비주얼 프롬프트(Dual-view Visual Prompt, VP)** 기법을 입력 공간에 도입합니다. 둘째, VLN 에이전트의 사후 훈련(post-training)을 위해 **스텝 보상 그룹 정책 최적화(Step Reward Group Policy Optimization, SRGPO)** 라는 새로운 **스텝 수준 강화 미세 조정(Reinforcement Fine-Tuning, RFT)** 방법론을 설계했습니다. **SRGPO** 는 검증 가능한 프로세스 보상을 정의하고 탐색 스텝을 무작위로 그룹화하여 효율적인 스텝 수준 이점 추정을 수행합니다.

## 주요 결과
**SeeNav-Agent** 에 **제로샷 VP 모듈** 을 도입한 결과, **GPT-4.1** 이 EmbodiedBench 내비게이션 벤치마크에서 **86.7%** 의 성공률을 달성하여 기존 최고 **LVLM 모델보다 약 20%p** 높은 성능을 보였습니다. **SRGPO** 기반의 사후 훈련을 통해 **Qwen2.5-VL-3B** 모델은 **72.3%** 의 성공률을 기록하며 기존 최고 **LVLM 모델보다 5.6%p** 우수한 성능을 나타냈습니다. 또한, **SRGPO** 는 **GRPO** 및 **GiGPO** 대비 훈련 안정성, 수렴 효율성, 일반화 능력에서 상당한 개선을 보였습니다.

## AI 실무자를 위한 시사점
**비주얼 프롬프트(VP)** 는 **LVLM** 기반 에이전트의 지각 환각을 효과적으로 줄이고 공간 이해 능력을 향상시키는 강력한 도구로 활용될 수 있습니다. **SRGPO** 와 같은 **스텝 수준 정책 최적화 기법** 은 장기적인 상호작용이 필요한 복잡한 내비게이션 태스크에서 **조밀한 보상 신호** 를 제공하여 에이전트의 학습 효율성과 성능을 크게 향상시킬 수 있습니다. 이는 실제 로봇 및 **Embodied AI** 시스템 개발 시 에이전트의 강건한 내비게이션 및 계획 능력 구현에 중요한 기여를 할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.