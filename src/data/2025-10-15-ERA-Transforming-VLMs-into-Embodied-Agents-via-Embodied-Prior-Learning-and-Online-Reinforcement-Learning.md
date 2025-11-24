---
title: "[논문리뷰] ERA: Transforming VLMs into Embodied Agents via Embodied Prior Learning
  and Online Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'ERA: Transforming VLMs into Embodied Agents via Embodied Prior Learning
  and Online Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Vision Language Models (VLMs)
  - Reinforcement Learning (RL)
  - Prior Learning
  - Supervised Fine-tuning (SFT)
  - Embodied Agents

permalink: /ai/review/2025-10-15-ERA-Transforming-VLMs-into-Embodied-Agents-via-Embodied-Prior-Learning-and-Online-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12693)

**저자:** Hanyang Chen, Mark Zhao, Rui Yang, Qinwei Ma, Ke Yang, Jiarui Yao, Kangrui Wang, Hao Bai, Zhenhailong Wang, Rui Pan, Mengchao Zhang, Jose Barreiros, Aykut Onol, ChengXiang Zhai, Heng Ji, Manling Li, Huan Zhang, Tong Zhang



## 핵심 연구 목표
본 논문은 소규모 Vision-Language Model(VLM)이 복잡한 Embodied AI 태스크를 수행하는 데 필요한 지식과 기술 부족 문제를 해결하고자 합니다. 특히, 대규모 모델의 높은 배포 비용과 소규모 모델의 낮은 성능 격차를 줄여 효율적이고 일반화 가능한 Embodied Agent를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Embodied Reasoning Agent (ERA)**는 두 단계 프레임워크로 구성됩니다. 첫 번째 단계인 **Embodied Prior Learning (EPL)**은 **Trajectory-Augmented Priors**, **Environment-Anchored Priors**, **External Knowledge Priors** 등 세 가지 데이터 소스에서 기초 지식을 추출하여 **지도 학습 기반 미세 조정(SFT)**합니다. 두 번째 단계인 **Online Reinforcement Learning (RL)**은 **자체 요약(self-summarization)을 통한 컨텍스트 관리**, **밀집 보상 설계(dense reward shaping)**, 그리고 **턴-레벨 정책 최적화(turn-level policy optimization)**를 통해 에이전트 성능을 더욱 향상시킵니다.

## 주요 결과
**3B 모델 기반 ERA**는 **EB-ALFRED** 고수준 계획 태스크에서 **GPT-4o** 대비 **8.4%**, **EB-Manipulation** 저수준 제어 태스크에서 **19.4%**의 성능 향상을 달성했습니다. 전체적으로 **EB-ALFRED**에서 **65.2%**, **EB-Manipulation**에서 **48.3%**의 성공률을 기록하여 기존 대규모 프롬프트 기반 모델과 이전 훈련 기반 모델을 능가했습니다. 특히, **미학습 태스크에 대한 강력한 일반화 능력**을 보였으며, 각 단계별 설계 요소의 효과를 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 소형 VLM을 효과적인 Embodied Agent로 전환하는 **실용적인 방법론**을 제시합니다. **구조화된 사전 지식 학습(EPL)**과 **온라인 RL**의 결합은 복잡한 환경에서의 에이전트 학습에 중요한 역할을 합니다. 특히, **컨텍스트 관리, 밀집 보상 설계, 턴-레벨 정책 최적화**와 같은 RL 설계 원칙은 장기적인 상호작용 및 희소한 보상 환경에서 안정적인 학습에 필수적임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.