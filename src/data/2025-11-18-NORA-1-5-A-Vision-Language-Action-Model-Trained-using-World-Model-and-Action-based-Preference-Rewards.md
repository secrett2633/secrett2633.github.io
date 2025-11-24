---
title: "[논문리뷰] NORA-1.5: A Vision-Language-Action Model Trained using World Model- and Action-based Preference Rewards"
excerpt: "이 [arXiv]에 게시한 'NORA-1.5: A Vision-Language-Action Model Trained using World Model- and Action-based Preference Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Model
  - Direct Preference Optimization
  - World Model
  - Reward Learning
  - Robotics
  - Embodied AI
  - Flow-Matching

permalink: /ai/review/2025-11-18-NORA-1-5-A-Vision-Language-Action-Model-Trained-using-World-Model-and-Action-based-Preference-Rewards/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14659)

**저자:** Chia-Yu Hung, Navonil Majumder, Haoyuan Deng, Liu Renhang, Yankang Ang, Amir Zadeh, Chuan Li, Dorien Herremans, Ziwei Wang, Soujanya Poria



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델이 실제 환경 및 다양한 로봇 플랫폼에서 보이는 낮은 신뢰성과 일반화 문제를 해결하는 것을 목표로 합니다. 특히, 수작업으로 큐레이션된 데이터에 의존하는 기존 지도 미세 조정(SFT) 방식의 한계를 극복하고, 확장 가능하며 데이터 효율적인 정책 개선 방법을 제시하고자 합니다.

## 핵심 방법론
연구팀은 사전 학습된 **NORA** 백본에 **Flow-Matching 기반 액션 전문가(action expert)**를 통합하여 **NORA-1.5** 아키텍처를 구축했습니다. 모델의 강건성과 작업 성공률을 높이기 위해 다음 두 가지 보상 모델을 활용한 **Direct Preference Optimization (DPO)** 기반 후처리 학습을 도입했습니다: (i) **V-JEPA2-AC** 월드 모델 기반의 목표 지향적 보상과 (ii) 실제 액션과의 편차를 측정하는 액션 기반 보상 (**GTA**). 이 보상 신호들을 통해 생성된 액션들의 품질 순위를 매겨 선호도 데이터셋을 구축하고 **NORA-1.5**를 특정 로봇에 맞게 최적화합니다.

## 주요 결과
**NORA-1.5**는 시뮬레이션 환경(**SimplerEnv**, **LIBERO**) 및 실제 로봇 환경(**Galaxea A1**) 모두에서 기존 **NORA** 및 다른 최첨단 VLA 모델들을 일관되게 능가하는 성능을 보였습니다. 특히 **SimplerEnv**의 시각 매칭 평가에서 **82.8%**의 성능을 달성하여 SFT 기준선(77.9%)을 뛰어넘었으며, **Galaxea A1** 로봇에서는 DPO 학습을 통해 평균 성공률을 **13%** 향상시키고 방해물 오인식률을 **4%** 감소시켰습니다. 이는 DPO가 로봇의 그리퍼 궤적을 더욱 부드럽고 일관되게 만들어 성공적인 그랩 동작에 필요한 액션 청크 수를 줄였음을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 **DPO**와 **월드 모델** 기반의 합성 보상 신호를 사용하여 VLA 모델의 **확장 가능하고 데이터 효율적인 후처리 학습** 가능성을 입증했습니다. 이는 값비싼 수동 보상 설계나 대규모 실제 로봇 롤아웃 없이도 로봇 정책의 신뢰성과 일반화 능력을 크게 향상시킬 수 있는 실용적인 경로를 제공합니다. **NORA-1.5**는 미지의 객체와 다양한 환경에서도 강건한 성능을 보여, 실제 로봇 시스템 개발에 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.