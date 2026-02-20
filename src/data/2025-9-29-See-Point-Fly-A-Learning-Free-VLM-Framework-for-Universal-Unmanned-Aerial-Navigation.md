---
title: "[논문리뷰] See, Point, Fly: A Learning-Free VLM Framework for Universal Unmanned
  Aerial Navigation"
excerpt: "Chih-Hai Su이 arXiv에 게시한 'See, Point, Fly: A Learning-Free VLM Framework for Universal Unmanned
  Aerial Navigation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - UAV Navigation
  - Zero-shot
  - Spatial Grounding
  - Waypoint Prompting
  - Autonomous Navigation
  - Adaptive Control

permalink: /ai/review/2025-9-29-See-Point-Fly-A-Learning-Free-VLM-Framework-for-Universal-Unmanned-Aerial-Navigation/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22653)

**저자:** Chih Yao Hu, Yang-Sen Lin, Yuna Lee, Chih-Hai Su, Jie-Ying Lee, Shr-Ruei Tsai, Chin-Yang Lin, Kuan-Wen Chen, Tsung-Wei Ke, Yu-Lun Liu



## 핵심 연구 목표
본 논문은 기존 **Vision-Language Models (VLMs)** 기반의 드론 내비게이션 접근 방식이 액션 예측을 텍스트 생성으로 간주하여 발생하는 한계를 해결하고자 합니다. **훈련 없는(training-free)** **VLM 프레임워크** 인 **See, Point, Fly (SPF)** 를 통해 액션 예측을 **2D 공간 접지(spatial grounding) 태스크** 로 재정의하여, 어떠한 환경에서도 자유 형식의 지시를 따르는 보편적인 무인항공기(UAV) 내비게이션을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
**SPF** 는 **VLM** 을 활용하여 모호한 언어 지시를 입력 이미지에 대한 **2D 웨이포인트 반복 주석** 으로 분해합니다. 예측된 2D 웨이포인트와 이동 거리는 카메라 정보와 핀홀 모델을 통해 **3D 변위 벡터** 로 변환되어 UAV의 실제 액션 명령으로 사용됩니다. 또한, UAV와 목표물 간의 거리에 따라 이동 거리를 적응적으로 조정하는 **적응형 컨트롤러 모듈** 을 도입하여 효율적인 내비게이션을 지원하며, **폐쇄 루프 제어(closed-loop control)** 방식으로 동적 환경에서 실시간으로 대상을 추적하고 장애물을 회피합니다.

## 주요 결과
**SPF** 는 **DRL 시뮬레이션 벤치마크** 에서 이전 최고 성능 대비 **63%p** 의 압도적인 차이로 **93.9%** 의 평균 성공률을 달성하며 새로운 최첨단 성능을 기록했습니다. 광범위한 실제 환경 평가에서도 **92.7%** 의 평균 성공률을 보였으며, 특히 **TypeFly[15] (0.9%)** 및 **PIVOT[28] (28.7%)** 와 같은 강력한 기준선들을 크게 능가했습니다. 또한, **적응형 스텝 사이즈 컨트롤러** 는 내비게이션 성능을 유지하거나 향상시키면서 작업 완료 시간을 현저히 단축했습니다.

## AI 실무자를 위한 시사점
**See, Point, Fly (SPF)** 는 **훈련 없는 VLM 프레임워크** 를 통해 복잡한 자율 UAV 내비게이션 문제를 해결하는 혁신적인 접근 방식을 제시합니다. 이는 **대규모 훈련 데이터와 컴퓨팅 자원** 에 대한 의존도를 낮추고, 다양한 환경과 작업에 대한 **제로샷 일반화** 가 필수적인 AI 시스템 개발에 실용적인 대안을 제공합니다. 특히, **2D 공간 접지** 를 통해 **VLM** 의 시각-언어 이해 및 추론 능력을 구체적인 로봇 액션으로 변환하는 방식은 로봇 공학 분야에서 **파운데이션 모델** 의 활용 범위를 확장하는 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.