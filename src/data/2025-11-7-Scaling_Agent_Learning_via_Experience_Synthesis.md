---
title: "[논문리뷰] Scaling Agent Learning via Experience Synthesis"
excerpt: "이 [arXiv]에 게시한 'Scaling Agent Learning via Experience Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Agents
  - Experience Synthesis
  - World Models
  - Curriculum Learning
  - Sim-to-Real Transfer
  - Web Agents

permalink: /ai/review/2025-11-7-Scaling_Agent_Learning_via_Experience_Synthesis/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03773)

**저자:** Zhaorun Chen, Zhuokai Zhao, Kai Zhang, Bo Liu, Qi Qi, Yifan Wu, Tarun Kalluri, Sara Cao, Yuanhao Xiong, Haibo Tong, Huaxiu Yao, Hengduo Li, Jiacheng Zhu, Xian Li, Dawn Song, Bo Li, Jason Weston, Dat Huynh



## 핵심 연구 목표
대규모 언어 모델(LLM) 에이전트의 강화 학습(RL) 훈련이 직면한 높은 비용, 제한된 태스크 다양성, 불안정한 보상 신호, 복잡한 인프라와 같은 문제들을 해결하는 것을 목표로 합니다. 현실 환경 상호작용의 필요성을 줄이면서도 효과적이고 확장 가능한 RL 훈련을 가능하게 하는 통합 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 **DREAMGYM**이라는 프레임워크를 도입하여, 환경 동역학을 추상적인 텍스트 공간으로 압축하는 **추론 기반 경험 모델(reasoning-based experience model)**을 구축합니다. 이 모델은 **단계별 추론(Chain-of-Thought)**을 통해 일관된 상태 전환과 피드백을 생성하며, **경험 리플레이 버퍼(experience replay buffer)**와 **커리큘럼 태스크 생성기(curriculum task generator)**를 통해 다양하고 점진적으로 도전적인 태스크 변형을 제공하여 에이전트의 지식 습득을 촉진합니다.

## 주요 결과
**WebArena**와 같은 비-RL 환경에서 **DREAMGYM**은 모든 기준선 대비 **30% 이상의 성능 향상**을 달성했습니다. **WebShop** 및 **ALFWorld**와 같이 RL 준비는 되어 있으나 비용이 많이 드는 환경에서는 순전히 합성된 상호작용만으로 **GRPO** 및 **PPO**와 동등한 성능을 보였습니다. 특히 **DREAMGYM-S2R**은 합성 경험으로 사전 훈련 후 실제 환경으로 전이할 때 **10% 미만의 실제 데이터만 사용**하여 **40% 이상의 성능 향상**을 제공했습니다.

## AI 실무자를 위한 시사점
**DREAMGYM**은 LLM 에이전트의 RL 훈련을 위한 확장 가능하고 비용 효율적인 솔루션을 제공하여, 이전에는 RL 적용이 어려웠던 도메인에서도 훈련을 가능하게 합니다. 합성 경험을 통해 실제 환경 상호작용의 필요성을 크게 줄이면서도 강력한 초기화 전략을 제공하여 **샘플 효율성을 극대화**할 수 있습니다. 이는 AI 에이전트 개발 및 배포의 실용성을 대폭 향상시키는 중요한 진전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.