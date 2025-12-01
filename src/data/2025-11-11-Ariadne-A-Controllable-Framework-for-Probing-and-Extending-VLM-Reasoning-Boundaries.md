---
title: "[논문리뷰] Ariadne: A Controllable Framework for Probing and Extending VLM   Reasoning Boundaries"
excerpt: "Zhengzhong Tu이 [arXiv]에 게시한 'Ariadne: A Controllable Framework for Probing and Extending VLM   Reasoning Boundaries' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Reinforcement Learning (RL)
  - Spatial Reasoning
  - Controllable Framework
  - RLVR
  - GRPO
  - Maze Navigation
  - Generalization Boundaries

permalink: /ai/review/2025-11-11-Ariadne-A-Controllable-Framework-for-Probing-and-Extending-VLM-Reasoning-Boundaries/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.00710)

**저자:** Minghe Shen, Zhuo Zhi, Chonghan Liu, Shuo Xing, Zhengzhong Tu, Che Liu



## 핵심 연구 목표
본 연구는 RL 후처리 훈련이 기존 **VLM의 내재적 추론 능력 경계** 를, 특히 시각 중심의 공간 추론 작업에서 확장할 수 있는지 탐색하는 것을 목표로 합니다. 이를 위해, 정밀하게 난이도를 제어할 수 있는 프레임워크인 **Ariadne** 를 도입하여 VLM의 추론 행동을 체계적으로 조사하고 한계를 확장하고자 합니다.

## 핵심 방법론
**Ariadne** 는 **합성 미로** 를 활용하여 경로 길이 및 회전 횟수와 같은 난이도를 정밀하게 조절하며 다단계 공간 추론 태스크를 생성합니다. **RLVR(Reinforcement Learning with Verified Rewards)** 과 **GRPO(Group Relative Policy Optimization)** 알고리즘을 사용하여 **Qwen2.5-VL-7B-Instruct** 를 훈련시켰으며, 모델의 예측 정확성, 형식 및 추론 구조를 통합하는 보상 함수를 설계하여 난이도 인지 학습 커리큘럼을 적용했습니다.

## 주요 결과
**RLVR 훈련** 후, 기본 모델이 **0% 정확도** 를 보였던 미로 문제에서 **50% 이상의 정확도** 를 달성하여 기본 정책의 능력 경계가 확장되었음을 입증했습니다. 모델은 훈련 범위 내에서 보지 못한 회전 횟수에는 일반화되었지만, 훈련 노출을 초과하는 이동 단계 수에서는 실패하는 **"발산적 일반화 현상"** 을 보였습니다. 놀랍게도, **MapBench** 에서 **16%** , **ReasonMap** 에서 **24%** 의 제로샷 성능 향상을 보여 실제 공간 추론 작업에서도 일반화 능력이 강화되었음을 확인했습니다.

## AI 실무자를 위한 시사점
**RLVR** 과 **GRPO** 를 활용한 RL 미세 조정이 **VLM의 공간 추론 능력** 을 크게 향상시키고, 기존 SFT 기반 모델의 한계를 넘어설 수 있음을 보여주었습니다. **Ariadne** 와 같은 제어 가능한 합성 환경은 모델의 일반화 경계를 체계적으로 탐색하고 이해하는 데 유용하며, **합성 데이터로 훈련된 모델** 이 실제 내비게이션 태스크에서도 상당한 제로샷 성능 향상을 가져올 수 있음을 시사합니다. 이는 특히 복잡한 공간 추론이 필요한 VLM 기반 애플리케이션 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.