---
title: "[논문리뷰] StereoAdapter-2: Globally Structure-Consistent Underwater Stereo Depth Estimation"
excerpt: "[arXiv]에 게시된 'StereoAdapter-2: Globally Structure-Consistent Underwater Stereo Depth Estimation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Underwater Depth Estimation
  - Stereo Matching
  - State Space Model
  - Mamba Architecture
  - ConvSS2D
  - Data Synthesis
  - LoRA
  - Zero-shot Learning
  - Robotics

permalink: /ai/review/2026-02-20-StereoAdapter-2-Globally-Structure-Consistent-Underwater-Stereo-Depth-Estimation/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16915)

**저자:** Zeyu Ren, Xiang Li, Yiran Wang, Zeyu Zhang, Hao Tang



## 핵심 연구 목표
수중 스테레오 깊이 추정에서 발생하는 **도메인 시프트(domain shift)** 문제를 해결하고, 특히 대규모 깊이 차이(large-disparity) 및 텍스처 없는(textureless) 영역에서의 기존 GRU 기반 반복 정제 방식의 **효율성 및 정확도 한계** 를 극복하는 것을 목표로 합니다. 또한, 다양하고 사실적인 수중 스테레오 데이터의 부족 문제를 해결하기 위한 **대규모 합성 데이터셋** 구축을 통해 실세계 적용 가능성을 높이고자 합니다.

## 핵심 방법론
기존 **ConvGRU 업데이터** 를 **선택적 상태 공간 모델(SSM)** 기반의 새로운 **ConvSS2D 연산자** 로 대체합니다. 이 연산자는 **4방향 스캔 전략** 을 사용하여 효율적인 **장거리 공간 정보 전파** 를 가능하게 하며, 에피폴라 기하학적 제약과 수직 구조적 일관성을 모두 고려합니다. 훈련 데이터로는 **UW-StereoDepth-80K** 라는 대규모 합성 데이터셋을 구축했으며, 이는 **Atlantis 기반의 스타일 전이** 와 **NVS-Solver 기반의 기하학적 일관성 있는 신규 뷰 합성** 을 결합한 2단계 파이프라인으로 생성되었습니다. 또한, **Depth Anything 3** 인코더에 **동적 LoRA 적응** 을 적용하여 파라미터 효율적인 도메인 전이를 달성합니다.

## 주요 결과
제안된 방법은 수중 벤치마크에서 **최고 수준의 제로샷(zero-shot) 성능** 을 달성했습니다. **TartanAir-UW** 데이터셋에서 이전 **StereoAdapter** 대비 **REL을 16.5% 감소(0.0527에서 0.0440으로)** 시키고, **RMSE를 17.0% 감소(2.8947에서 2.4038로)** 시켰습니다. 또한, **SQUID** 데이터셋에서는 **RMSE를 7.2% 감소(1.8843에서 1.7481로)** 시키며 이전 방법을 능가했습니다. **BlueROV2 플랫폼** 에서의 실세계 검증 결과는 **REL 0.1023, RMSE 1.7164, A1 정확도 92.56%** 를 기록하며 견고한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**SSM(State Space Model)** , 특히 **ConvSS2D** 와 같은 새로운 아키텍처는 반복적인 깊이 정제 과정에서 **장거리 공간 의존성 모델링** 과 **효율성** 을 크게 향상시킬 수 있음을 보여줍니다. 수중과 같이 실제 데이터 확보가 어려운 도메인에서 **대규모 합성 데이터셋(UW-StereoDepth-80K)을 생성하는 파이프라인** 은 도메인 적응을 위한 중요한 전략이 될 수 있습니다. **LoRA** 와 같은 파라미터 효율적인 적응 기법을 **기초 모델(foundation model)** 에 적용하는 것은 특정 도메인으로의 전이 학습에 매우 효과적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.