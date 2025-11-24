---
title: "[논문리뷰] Omni-Reward: Towards Generalist Omni-Modal Reward Modeling with
  Free-Form Preferences"
excerpt: "이 [arXiv]에 게시한 'Omni-Reward: Towards Generalist Omni-Modal Reward Modeling with
  Free-Form Preferences' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reward Modeling
  - Multimodal AI
  - Human Preferences
  - RLHF
  - Generalist AI
  - Benchmark
  - Dataset
  - Free-Form Preferences

permalink: /ai/review/2025-10-28-Omni-Reward-Towards-Generalist-Omni-Modal-Reward-Modeling-with-Free-Form-Preferences/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23451)

**저자:** Zhuoran Jin, Hongbang Yuan, Kejian Zhu, Jiachun Li, Pengfei Cao, Yubo Chen, Kang Liu, Jun Zhao



## 핵심 연구 목표
본 논문은 기존 보상 모델(RMs)의 두 가지 주요 한계, 즉 **모달리티 불균형(Modality Imbalance)**(텍스트 및 이미지 외 모달리티 지원 부족)과 **선호도 경직성(Preference Rigidity)**(고정된 이진 선호 쌍으로는 복잡하고 개인화된 선호도 포착 불가)을 해결하고자 합니다. 이를 통해 **자유 형식 선호도(free-form preferences)**를 지원하는 **범용 옴니모달 보상 모델링(generalist omni-modal reward modeling)**을 달성하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **옴니-리워드(Omni-Reward)** 프레임워크를 제안하며, 이는 세 가지 주요 구성 요소로 이루어집니다. 첫째, 9가지 태스크와 5가지 모달리티(텍스트, 이미지, 비디오, 오디오, 3D)를 아우르는 최초의 벤치마크인 **Omni-RewardBench**를 구축했습니다. 둘째, **248K 일반 선호도 쌍**과 **69K 명령 튜닝 쌍**으로 구성된 대규모 멀티모달 선호도 데이터셋인 **Omni-RewardData**를 생성했습니다. 셋째, **옴니-리워드모델(Omni-RewardModel)**을 제안하며, 이는 **Bradley-Terry 손실**을 사용하는 **Omni-RewardModel-BT(차별적 RM)**와 **체인-오브-생각(Chain-of-Thought)** 설명을 생성하는 **Omni-RewardModel-R1(생성적 RM)**을 포함합니다.

## 주요 결과
**Omni-RewardModel**은 **Omni-RewardBench**에서 **w/o Ties 설정 시 73.68%**, **w/ Ties 설정 시 65.36%**의 정확도를 달성하여 기존 MLLM 대비 강력한 성능을 보였습니다. 특히 **Claude 3.5 Sonnet**의 **66.54%**와 **Gemma-3 27B**의 **65.12%**를 능가하는 결과입니다. 또한, **VL-RewardBench**에서 **76.3%**로 SOTA 성능을 기록했으며, **Multimodal RewardBench**에서도 **Claude 3.5 Sonnet**과 유사한 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 AI 모델이 텍스트와 이미지 외의 **다양한 모달리티(비디오, 오디오, 3D)**에서 인간의 선호도에 맞춰 행동하도록 유도하는 **범용 보상 모델**의 중요성을 강조합니다. **Omni-RewardBench**와 **Omni-RewardData**는 실무자들이 **멀티모달 RLHF**를 위한 데이터셋 구축 및 평가 기준을 마련하는 데 중요한 자원이 될 것입니다. 특히 **자유 형식 선호도 학습**과 **생성적 RM**을 통한 **해석 가능한 보상 신호**는 차세대 AI 시스템 개발에 실질적인 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.