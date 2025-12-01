---
title: "[논문리뷰] TWIST2: Scalable, Portable, and Holistic Humanoid Data Collection System"
excerpt: "Rocky Duan이 [arXiv]에 게시한 'TWIST2: Scalable, Portable, and Holistic Humanoid Data Collection System' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Humanoid Robotics
  - Data Collection
  - Teleoperation
  - Full-Body Control
  - Visuomotor Policy Learning
  - VR
  - Portable MoCap-Free

permalink: /ai/review/2025-11-5-TWIST2-Scalable-Portable-and-Holistic-Humanoid-Data-Collection-System/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02832)

**저자:** Yanjie Ze, Siheng Zhao, Weizhuo Wang, Angjoo Kanazawa, Rocky Duan, Pieter Abbeel, Guanya Shi, Jiajun Wu, C. Karen Liu



## 핵심 연구 목표
휴머노이드 로봇 분야에서 **대규모 데이터 수집의 비효율성** 과 **기존 텔레오퍼레이션 시스템의 한계** 를 극복하는 것입니다. 특히, 값비싸고 비휴대적인 모션 캡처 시스템 없이도 **확장 가능하고 휴대 가능한** 동시에 **전신 제어를 유지** 하는 휴머노이드 데이터 수집 시스템을 개발하여 인간 수준의 다재다능한 조작 및 이동에 필요한 데이터를 효율적으로 확보하는 것을 목표로 합니다.

## 핵심 방법론
본 시스템인 **TWIST2** 는 **PICO4U VR 장치** 와 저비용의 **2-DoF TWIST2 Neck** 을 활용하여 전신 인간 모션을 실시간으로 스트리밍하고 로봇의 전신(body, hand, neck)으로 리타겟팅합니다. 이를 통해 모션 캡처 없이 **전신 제어** 가 가능한 텔레오퍼레이션을 구현하며, 수집된 데이터를 바탕으로 **계층적 시각-운동 정책 학습 프레임워크** (Diffusion Policy와 저수준 모션 트래킹 컨트롤러 결합)를 사용하여 자율적인 전신 제어를 가능하게 합니다.

## 주요 결과
**TWIST2** 는 **15분 내에 약 100개의 시연(dexterous pick & place)을 100% 성공률** 로 수집할 수 있음을 입증했습니다(Table II). 이는 기존 모션 캡처 기반 시스템 대비 현저히 빠른 속도입니다. 자율 태스크에서는 **WB-Dex 태스크** 에서 **54회 시도 중 33회(약 61%)의 Grasp&Place 성공률** 을 보였으며, **Kick-T 태스크** 에서는 **7회 시도 중 6회 성공** 을 기록하며 전체 몸체 제어의 유효성을 증명했습니다.

## AI 실무자를 위한 시사점
이 연구는 **저비용의 휴대 가능한 VR 장비** 만으로도 휴머노이드 로봇의 **전신 텔레오퍼레이션 및 대규모 데이터 수집** 이 가능함을 보여주어, 연구실 환경을 넘어선 실생활 환경에서의 휴머노이드 로봇 데이터 수집의 문턱을 낮춥니다. **계층적 시각-운동 정책 학습 프레임워크** 는 복잡한 전신 제어 태스크를 자율적으로 수행하는 데 효과적인 접근 방식을 제공하며, **오픈소스 공개** 를 통해 휴머노이드 로봇 연구의 민주화를 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.