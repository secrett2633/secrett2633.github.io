---
title: "[논문리뷰] tttLRM: Test-Time Training for Long Context and Autoregressive 3D Reconstruction"
excerpt: "Zhiqin Chen이 arXiv에 게시한 'tttLRM: Test-Time Training for Long Context and Autoregressive 3D Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Reconstruction
  - Test-Time Training (TTT)
  - Autoregressive Modeling
  - Long-Context
  - Gaussian Splatting
  - Neural Radiance Fields
  - Large Reconstruction Models

permalink: /ai/review/2026-02-24-tttLRM-Test-Time-Training-for-Long-Context-and-Autoregressive-3D-Reconstruction/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20160)

**저자:** Chen Wang, Hao Tan, Wang Yifan, Zhiqin Chen, Yuheng Liu



## 핵심 연구 목표
본 논문은 기존 3D 재구성 모델들이 가지는 **느린 최적화** , **제한적인 입력 뷰 확장성** , 그리고 **긴 시퀀스 컨텍스트 처리 능력** 의 한계를 극복하는 것을 목표로 합니다. 특히, 스트리밍 시각 입력으로부터 **실시간 렌더링** 이 가능한 **명시적 3D 표현** 을 위한 **고해상도, 긴 컨텍스트, Autoregressive 3D 재구성** 을 달성하고자 합니다.

## 핵심 방법론
제안하는 **tttLRM** 모델은 **Test-Time Training (TTT)** 의 **LaCT 블록** 을 활용하여 **선형적인 계산 복잡성** 으로 긴 시퀀스 컨텍스트를 처리합니다. 입력 이미지는 토큰화되어 LaCT 블록의 **고속 가중치** 를 업데이트하며, 이 가중치는 **암시적 3D 표현** 으로 해석됩니다. 가상 쿼리 토큰은 이 가중치를 조회하여 **3D Gaussian Splats (3DGS)** 나 **triplane-based NeRFs** 와 같은 **명시적 3D 표현** 으로 디코딩됩니다. 또한, **시퀀스 병렬 처리** 를 통해 여러 GPU에 걸쳐 대규모 입력 뷰를 효율적으로 처리하며, **Novel View Synthesis** 태스크를 통해 사전 학습되어 모델 초기화를 강화합니다.

## 주요 결과
**tttLRM** 은 객체 수준에서 **GS-LRM [69]** 대비 **512x512 해상도** 에서 **34.02 PSNR** (GS-LRM 32.83 PSNR)을 달성하며 **2배 빠른 추론 속도** 를 보였습니다. 장면 수준에서는 기존 피드포워드 방식인 **Long-LRM [72]** 보다 약 **1dB PSNR** 높은 품질을 제공하고, **64개 입력 뷰** 에서 최적화 기반 모델과 유사한 품질을 유지하면서도 **수백 배 빠른 속도** 를 달성했습니다. 특히, **1024x1024 해상도** 에서도 메모리 부족 없이 원활하게 작동하며, **4개 초기 뷰** 에서 시작하여 **32개 뷰** 까지 점진적으로 개선되는 **Autoregressive 재구성** 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **Test-Time Training (TTT)** 을 활용하여 **선형적인 복잡성** 으로 **긴 컨텍스트 3D 재구성** 을 가능하게 함으로써, **실시간 3D 애플리케이션** 에 혁신적인 발전을 가져올 잠재력을 보여주었습니다. **고품질 명시적 3D 모델** 을 **스트리밍 입력** 에서 효율적으로 생성할 수 있어 **AR/VR, 로봇 공학, 자율 주행** 등 다양한 분야에 실용적으로 적용될 수 있습니다. 특히, **사전 훈련된 모델** 의 전이학습 효과와 **다양한 3D 출력 형식** 지원은 실제 AI 시스템 개발 시 유연성과 효율성을 크게 향상시킬 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.