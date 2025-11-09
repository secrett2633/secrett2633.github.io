---
title: "[논문리뷰] Spatial-SSRL: Enhancing Spatial Understanding via Self-Supervised
  Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'Spatial-SSRL: Enhancing Spatial Understanding via Self-Supervised
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-supervised learning
  - Reinforcement Learning
  - Spatial Understanding
  - Vision-Language Models
  - Pretext Tasks
  - RGB-D Images
  - Spatial Reasoning

permalink: /ai/review/2025-11-3-Spatial-SSRL_Enhancing_Spatial_Understanding_via_Self-Supervised_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27606)

**저자:** Yuhong Liu, Beichen Zhang, Yuhang Zang, Yuhang Cao, Long Xing, Xiaoyi Dong, Haodong Duan, Dahua Lin, Jiaqi Wang



## 핵심 연구 목표
대규모 시각-언어 모델(LVLM)의 **공간 이해 능력 부족**이라는 한계를 해결하는 것을 목표로 합니다. 기존 지도 학습 및 검증 가능한 보상 강화 학습(RLVR) 방식이 가지는 **높은 비용, 제한된 확장성, 특정 환경 의존성** 문제를 극복하고, 일반적인 RGB 또는 RGB-D 이미지에서 직접 검증 가능한 신호를 도출하는 **자기 지도 강화 학습(SSRL) 패러다임**을 제안합니다.

## 핵심 방법론
**Spatial-SSRL**은 **자기 지도 강화 학습 패러다임**을 도입하여 LVLM의 공간 이해를 개선합니다. **셔플 패치 재정렬, 뒤집힌 패치 인식, 잘린 패치 인페인팅, 영역별 깊이 정렬, 상대 3D 위치 예측**의 다섯 가지 전치 태스크를 자동으로 구성하며, 이 태스크들은 2D 및 3D 공간 구조를 포착합니다. 모델은 **Group Relative Policy Optimization (GRPO)**을 사용하여 검증 가능한 SSL 태스크 보상과 포맷 보상을 통해 최적화되며, 초기 **SFT 콜드 스타트 단계**를 거쳐 안정성을 확보합니다.

## 주요 결과
Spatial-SSRL은 7가지 공간 이해 벤치마크(image 및 video 설정 모두)에서 **Qwen2.5-VL** 모델 대비 일관된 성능 향상을 달성했습니다. **3B 모델**에서는 평균 **+4.63%**, **7B 모델**에서는 평균 **+3.89%**의 정확도 향상을 보였으며, 특히 복잡한 공간 추론 벤치마크인 **Spatial457**에서 **+12.37% (3B)** 및 **+8.67% (7B)**의 큰 개선을 보였습니다. 이는 일반 시각 능력 유지와 함께 공간 추론 능력을 강화했음을 입증합니다.

## AI 실무자를 위한 시사점
**Spatial-SSRL**은 **데이터 라벨링이나 외부 도구 없이** LVLM의 공간 이해 능력을 효과적으로 향상시키는 **확장 가능하고 비용 효율적인 방법론**을 제공합니다. 개발자들은 **자기 지도 전치 태스크**를 활용하여 일반 RGB 또는 RGB-D 이미지에서 직접 검증 가능한 보상을 생성함으로써, 복잡한 공간 추론이 필요한 **자율 주행, 로봇 공학, 증강 현실** 등의 응용 분야에 더욱 강력한 LVLM을 구축할 수 있습니다. 이는 기존 RLVR의 한계를 극복하는 실용적인 접근 방식입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.