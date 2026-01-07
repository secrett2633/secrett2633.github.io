---
title: "[논문리뷰] NitroGen: An Open Foundation Model for Generalist Gaming Agents"
excerpt: "이 [arXiv]에 게시한 'NitroGen: An Open Foundation Model for Generalist Gaming Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generalist Agents
  - Foundation Models
  - Behavior Cloning
  - Video Games
  - Action Extraction
  - Multi-game
  - Embodied AI

permalink: /ai/review/2026-01-07-NitroGen-An-Open-Foundation-Model-for-Generalist-Gaming-Agents/

toc: true
toc_sticky: true

date: 2026-01-07 00:00:00+0900+0900
last_modified_at: 2026-01-07 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.02427)

**저자:** Loïc Magne, Anas Awadalla, Guanzhi Wang, Yinzhen Xu, Joshua Belofsky, Fengyuan Hu, Joohwan Kim, Ludwig Schmidt, Georgia Gkioxari, Jan Kautz, Yisong Yue, Yejin Choi, Yuke Zhu, Linxi "Jim" Fan



## 핵심 연구 목표
논문은 대규모의 다양하고 레이블링된 행동 데이터 부족으로 인해 지연되었던, 일반화된 행동을 할 수 있는 embodied agent 개발을 목표로 합니다. 특히, 비전 기반의 게임 에이전트가 다양한 게임 환경에서 효과적으로 작동할 수 있도록 **인터넷 규모의 데이터셋** 과 **파운데이션 모델** 을 구축하여, 기존의 게임 에이전트 연구가 가졌던 데이터 부족 및 도메인 특정적 설계의 한계를 극복하고자 합니다.

## 핵심 방법론
**NitroGen** 은 세 가지 핵심 요소로 구성됩니다: 1) **40,000시간 이상의 게임 플레이 영상** 에서 플레이어 액션을 자동 추출하여 구축한 **인터넷 규모의 비디오-액션 데이터셋** , 2) 크로스-게임 일반화 성능을 측정할 수 있는 **멀티-게임 벤치마크 환경** , 3) 대규모 행동 클로닝으로 훈련된 **통합 비전-액션 모델** 입니다. 액션 추출을 위해 **템플릿 매칭** 과 **SegFormer 기반의 하이브리드 분류-세그멘테이션 네트워크** 를 사용하여 게임패드 오버레이에서 조이스틱 위치 및 버튼 상태를 예측하며, 모델은 **SigLIP 2 Vision Transformer** 와 **Diffusion Transformer (DiT)** 를 활용한 **Flow Matching** 방식으로 훈련됩니다.

## 주요 결과
**NitroGen** 은 1,000개 이상의 게임에서 **40,000시간** 의 데이터로 훈련되었으며, 게임패드 액션 추출 파이프라인은 조이스틱 R² 상관 점수 **0.84** , 버튼 프레임 정확도 **0.96** 를 달성하는 높은 성능을 보였습니다. 벤치마크 스위트에서 다양한 2D/3D 게임 및 장르에 걸쳐 비전 기반 일반화 능력을 입증했으며, 사전 훈련된 **NitroGen** 가중치를 사용하여 새로운 게임에 미세 조정했을 때, 스크래치 학습 모델 대비 작업 성공률에서 **최대 52%의 상대적 개선** 을 달성했습니다.

## AI 실무자를 위한 시사점
**NitroGen** 은 **인터넷 규모의 비디오 데이터** 를 활용한 범용 게임 에이전트의 가능성을 보여주며, **비용 효율적인 데이터 수집 방식** 과 **강력한 전이 학습 성능** 은 실제 게임 환경뿐만 아니라 다른 시뮬레이션 환경에 적용될 수 있는 잠재력을 제시합니다. 공개된 데이터셋, 시뮬레이터, 사전 훈련된 모델 가중치는 향후 **Generalist Embodied Agents** 연구 및 개발을 가속화할 수 있는 중요한 기반을 제공합니다. 다만, 현재 모델은 단기적인 반응에 초점을 맞추고 있어, 장기 계획이나 언어 지시를 따르는 능력은 향후 연구 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.