---
title: "[논문리뷰] Do You Need Proprioceptive States in Visuomotor Policies?"
excerpt: "Yushen Liang이 arXiv에 게시한 'Do You Need Proprioceptive States in Visuomotor Policies?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visuomotor Policies
  - Spatial Generalization
  - Imitation Learning
  - Proprioception
  - State-free Policies
  - Robot Manipulation
  - End-Effector Control
  - Data Efficiency

permalink: /ai/review/2025-9-24-Do-You-Need-Proprioceptive-States-in-Visuomotor-Policies/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18644)

**저자:** Juntu Zhao, Wenbo Lu, Di Zhang, Yufeng Liu, Yushen Liang



## 핵심 연구 목표
본 연구는 로봇의 시각-운동 정책(visuomotor policies)에서 고유 수용성 상태(proprioceptive states)의 필요성을 재평가하고, 기존 상태 기반 정책이 학습 궤적에 과적합되어 공간 일반화 능력이 저해되는 문제를 해결하고자 합니다. 궁극적으로 고유 수용성 상태를 제거한 "State-free Policies"를 제안하여 실세계 로봇 애플리케이션의 실용성을 높이는 것이 목표입니다.

## 핵심 방법론
제안하는 **State-free Policy** 는 고유 수용성 상태 입력을 완전히 제거하고, 오직 시각 관측에만 기반하여 행동을 예측합니다. 이를 위해 **상대 End-Effector (EEF) 액션 공간** 을 사용하고, **듀얼 광각 손목 카메라** 를 통해 충분한 "전체 태스크 관련 시각 정보(full task observation)"를 확보합니다. 다양한 로봇 기종과 태스크(예: **π0, ACT, Diffusion Policy** 등)에서 **실세계 환경 및 시뮬레이션** 을 통해 정책의 성능을 평가했습니다.

## 주요 결과
State-free Policy는 상태 기반 정책 대비 현저히 향상된 공간 일반화 능력을 보였습니다. **Pick Pen 태스크** 의 경우, 높이 일반화 성공률은 **0%에서 98%로** , 수평 일반화는 **0%에서 58%로** 개선되었습니다. 다양한 실세계 태스크에서 평균 성공률이 높이 일반화는 **0%에서 85%로** , 수평 일반화는 **6%에서 64%로** 향상되었습니다. 또한, **데이터 효율성** 과 **기종 간 적응 능력** 에서도 상당한 이점을 입증하였으며, **오버헤드 카메라 제거** 가 공간 일반화 능력을 추가적으로 향상시킬 수 있음도 발견했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 제어 정책의 **공간 일반화 문제** 를 해결하는 실용적인 방법을 제시하며, **고유 수용성 상태 제거** 가 데이터 수집 비용 절감과 **다양한 로봇 시스템으로의 전이 학습** 효율 증대에 기여함을 보여줍니다. **듀얼 광각 손목 카메라** 와 같은 센서 구성은 태스크 관련 시각 정보를 충분히 제공하여 정책의 견고성을 높이며, 이는 **더욱 일반화되고 유연한 로봇 시스템 개발** 에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.