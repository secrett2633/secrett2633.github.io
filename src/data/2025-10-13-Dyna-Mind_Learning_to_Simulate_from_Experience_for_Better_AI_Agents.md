---
title: "[논문리뷰] Dyna-Mind: Learning to Simulate from Experience for Better AI Agents"
excerpt: "Qianhui Wu이 [arXiv]에 게시한 'Dyna-Mind: Learning to Simulate from Experience for Better AI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Reinforcement Learning
  - World Models
  - Simulation
  - Reasoning
  - Language Models
  - Planning
  - Interactive AI

permalink: /ai/review/2025-10-13-Dyna-Mind_Learning_to_Simulate_from_Experience_for_Better_AI_Agents/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09577)

**저자:** Xiao Yu, Baolin Peng, Michel Galley, Hao Cheng, Qianhui Wu, Janardhan Kulkarni, Suman Nath, Zhou Yu, Jianfeng Gao



## 핵심 연구 목표
AI 에이전트가 복잡하고 장기적인 대화형 태스크에서 "대리 시행착오(vicarious trial and error)" 능력을 통해 현재의 한계를 극복하고, 환경을 mentally simulate하여 추론 및 의사결정 성능을 향상시키는 것을 목표로 합니다. 이를 위해 에이전트가 경험으로부터 시뮬레이션 능력을 학습하도록 명시적으로 가르치는 프레임워크를 제안합니다.

## 핵심 방법론
이 연구는 2단계 훈련 프레임워크인 **Dyna-Mind**를 제안합니다. 1단계 **Reasoning with Simulations (RESIM)**에서는 실제 환경 상호작용에서 구축된 확장된 탐색 트리로부터 구조화된 추론 trace를 생성하도록 에이전트를 훈련시키고, 2단계 **Dyna-GRPO**는 온라인 **강화 학습(RL)** 방법으로 시뮬레이션 및 의사결정 능력을 강화하며, 실제 롤아웃의 결과 보상과 중간 상태를 피드백으로 활용합니다. **SIMROLLOUT**을 통해 실제 미래 상태 정보를 텍스트 신호로 통합하여 시뮬레이션 정교화 능력을 향상시킵니다.

## 주요 결과
**RESIM**은 **Sokoban**에서 **96.4% 성공률**, **ALFWorld**에서 **87.7% 성공률**을 달성하며 강력한 성능을 보였고, **DISTILL(RESIM)**은 **DISTILL(R1)** 대비 평균 **11배 적은 토큰**을 사용했습니다. **DYNA-GRPO**는 **GRPO**와 **RLOO** 대비 성능을 향상시켜, **AndroidWorld**에서 **DISTILL-32B(RESIM) + DYNA-GRPO**가 **31.8%의 평균 성공률**을 기록하며 **REACT(GPT-4o)**의 **5.1%**를 크게 상회했습니다. 이는 시뮬레이션 능력이 태스크 성능 향상에 필수적임을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 복잡하고 장기적인 AI 에이전트 태스크에서 **세계 모델 시뮬레이션 능력**의 중요성을 강조합니다. **RESIM**은 외부 알고리즘 없이 시뮬레이션 기반 추론을 모델에 주입하는 효과적인 오프라인 학습 방식을 제공하며, **Dyna-GRPO**는 온라인 **RL**을 통해 시뮬레이션 정확도와 정책 성능을 동시에 개선할 수 있는 실용적인 방법론을 제시합니다. 특히 **토큰 효율성** 향상은 실제 에이전트 배포 및 운영 비용 절감에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.