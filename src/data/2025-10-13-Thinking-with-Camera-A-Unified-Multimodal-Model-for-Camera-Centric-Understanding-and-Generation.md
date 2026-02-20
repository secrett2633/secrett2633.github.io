---
title: "[논문리뷰] Thinking with Camera: A Unified Multimodal Model for Camera-Centric
  Understanding and Generation"
excerpt: "Linyi Jin이 arXiv에 게시한 'Thinking with Camera: A Unified Multimodal Model for Camera-Centric
  Understanding and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Multimodal Model
  - Camera-Centric
  - Image Understanding
  - Image Generation
  - Spatial Reasoning
  - Camera Parameters
  - Instruction Tuning
  - Multimodal Spatial Intelligence

permalink: /ai/review/2025-10-13-Thinking-with-Camera-A-Unified-Multimodal-Model-for-Camera-Centric-Understanding-and-Generation/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08673)

**저자:** Kang Liao, Size Wu, Zhonghua Wu, Linyi Jin, Chao Wang, Yikai Wang, Fei Wang, Wei Li, Chen Change Loy



## 핵심 연구 목표
카메라 중심의 장면 이해와 생성을 별개의 문제로 다루던 기존 방식의 한계를 극복하고, 이를 **단일 멀티모달 모델** 로 통합하는 것을 목표로 합니다. 특히, 추상적인 숫자 형태의 카메라 파라미터와 언어 간의 모달리티 간극을 메우고, **"카메라를 언어처럼 생각하는"** (`thinking with camera`) 새로운 패러다임을 통해 공간적으로 일관된 추론과 정밀하게 제어 가능한 생성을 구현하고자 합니다.

## 핵심 방법론
제안하는 **Puffin** 모델은 **오토회귀(autoregressive) 및 확산(diffusion) 모델링** 을 결합한 통합 프레임워크입니다. **기하학적으로 정렬된 비전 인코더** 를 사용하여 풍부한 기하학적 특징을 유지하고, **커넥터 모듈** 을 통해 LLM의 은닉 상태를 확산 모델의 조건 신호로 변환합니다. **이산적인 카메라 토큰** 과 **픽셀 단위의 연속적인 카메라 맵** 을 동시에 활용하여 이미지 생성에서 미세한 공간 제어를 가능하게 하며, **Puffin-4M** 이라는 4백만 개의 비전-언어-카메라 트리플렛으로 구성된 대규모 데이터셋으로 다단계 훈련(Alignment, SFT, SFT w/ Thinking, Instruction Tuning)을 수행합니다.

## 주요 결과
**Puffin** 은 카메라 이해 부문에서 **MegaDepth** 및 **Puffin-Und** 와 같은 데이터셋에서 기존 전문 모델들을 크게 능가하는 성능을 보였습니다. 특히, **Puffin-Und** 에서 롤(Roll) **0.40 error↓** , 피치(Pitch) **0.95 error↓** , FoV **4.90 error↓** 를 달성하여 최첨단 성능을 기록했습니다. 카메라 제어 가능한 생성 부문에서도 **GPT-4o, Qwen-Image** 등 최신 멀티모달 모델보다 우수하여, 업 벡터(Up Vector) **11.94↓** , 위도(Latitude) **6.34↓** , 중력(Gravity) **6.79↓** 의 낮은 평균 오차를 보였습니다. **"thinking with camera"** 모드 도입 시 특히 피치 및 FoV 예측 성능이 일관되게 향상되었습니다.

## AI 실무자를 위한 시사점
**Puffin** 은 **로보틱스, AR/VR, 자율주행** 등 공간 지능이 중요한 분야에서 카메라 중심의 이해와 생성을 통합하는 강력한 기반을 제공합니다. 카메라 파라미터를 **언어적 추론과 결합** 하여 모델의 해석력과 정밀 제어 능력을 향상시키는 접근 방식은 차세대 **멀티모달 AI 시스템** 설계에 중요한 시사점을 줍니다. **Puffin-4M** 데이터셋은 정밀한 카메라 제어가 필요한 이미지 생성 및 이해 모델 개발을 위한 핵심 자원으로 활용될 수 있으나, 현재 고정된 **512x512 해상도 제한** 과 특정 종횡비에서의 성능 저하 가능성이 있어 **멀티스케일 훈련 데이터셋 구축** 이 향후 연구 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.