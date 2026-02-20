---
title: "[논문리뷰] RELIC: Interactive Video World Model with Long-Horizon Memory"
excerpt: "Chongjian Ge이 arXiv에 게시한 'RELIC: Interactive Video World Model with Long-Horizon Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Interactive World Model
  - Video Generation
  - Long-Horizon Memory
  - Real-Time Streaming
  - Diffusion Models
  - Autoregressive Models
  - Spatial Consistency
  - Unreal Engine

permalink: /ai/review/2025-12-04-RELIC-Interactive-Video-World-Model-with-Long-Horizon-Memory/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04040)

**저자:** Yicong Hong, Yiqun Mei, Chongjian Ge, et al.



## 핵심 연구 목표
논문은 실시간 장기 스트리밍, 일관된 공간 메모리, 정밀한 사용자 제어라는 세 가지 핵심 요소를 동시에 만족하는 **상호작용 가능한 비디오 월드 모델** 을 구축하는 것을 목표로 합니다. 기존 접근 방식들이 이 중 하나만을 다루거나, 장기 메모리 메커니즘이 실시간 성능을 저하시키는 문제를 해결하고자 합니다.

## 핵심 방법론
**RELIC** 은 **고도로 압축된 과거 잠재 토큰** 을 **상대적 동작(relative actions)** 및 **절대적 카메라 포즈(absolute camera poses)** 와 함께 **KV 캐시** 에 저장하여 장기 메모리를 효율적으로 표현합니다. 이 모델은 **20초 시퀀스** 를 생성하도록 **양방향 교사 비디오 모델** 을 미세 조정하고, **메모리 효율적인 자가 강제(self-forcing) 패러다임** 을 도입하여 장시간 교사 모델 및 학생 모델의 자체 롤아웃에 대한 전체 문맥 증류(distillation)를 가능하게 합니다. 또한, **큐레이션된 Unreal Engine 렌더링 데이터셋** 으로 학습되어 실제와 같은 환경에서의 일반화 능력을 향상시킵니다.

## 주요 결과
**14B 파라미터 모델** 인 **RELIC** 은 **480x832 해상도** 에서 **16 FPS** 의 실시간 생성을 달성했습니다. 정량적 비교에서 **RELIC** 은 **Matrix-Game-2.0** 및 **Hunyuan-GameCraft** 를 능가하는 **평균 점수 0.8015** 를 기록했으며, **0.0906의 가장 낮은 변환 RPE(Translational Relative Pose Error)** 와 **1.00의 가장 낮은 회전 RPE(Rotational Relative Pose Error)** 를 달성하여 더 정확한 동작 추종과 안정적인 장기 스트리밍 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**RELIC** 은 **압축된 공간 메모리** 와 **자가 강제 증류** 기법을 통해 **실시간 성능** 과 **장기적인 공간 일관성** 을 동시에 달성하는 효과적인 방법을 제시합니다. 이 프레임워크는 자율 주행, 로보틱스, 몰입형 가상 콘텐츠 생성과 같은 분야에서 **일반 목적의 월드 시뮬레이터** 를 위한 확장 가능하고 유연한 기반을 제공하며, **Unreal Engine 기반의 고품질 데이터** 학습 전략은 제어 정밀도와 일반화 능력을 향상시키는 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.