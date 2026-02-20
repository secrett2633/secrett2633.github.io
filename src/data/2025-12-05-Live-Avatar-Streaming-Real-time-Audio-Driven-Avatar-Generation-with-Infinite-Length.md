---
title: "[논문리뷰] Live Avatar: Streaming Real-time Audio-Driven Avatar Generation with Infinite Length"
excerpt: "Shifeng Zhang이 arXiv에 게시한 'Live Avatar: Streaming Real-time Audio-Driven Avatar Generation with Infinite Length' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Driven Avatar Generation
  - Real-time Streaming
  - Diffusion Models
  - Infinite Length
  - Pipeline Parallelism
  - Temporal Consistency
  - Model Distillation

permalink: /ai/review/2025-12-05-Live-Avatar-Streaming-Real-time-Audio-Driven-Avatar-Generation-with-Infinite-Length/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04677)

**저자:** Yubo Huang, Hailong Guo, Qijun Gan, Lin Liu, Fangtai Wu, Shifeng Zhang, Shijie Huang, Jiaming Liu, Sirui Zhao, Enhong Chen, Steven Hoi



## 핵심 연구 목표
본 논문은 기존 확산 모델 기반 비디오 생성 방법론의 순차적 계산 및 장기 불일치 문제를 해결하여, 실시간 스트리밍 환경에서 **140억 개 파라미터** 규모의 확산 모델을 사용하여 **무한 길이** 의 고품질 오디오 기반 아바타 생성을 가능하게 하는 것을 목표로 합니다. 이는 시각적 품질, 모델 복잡성, 그리고 실행 속도 사이의 근본적인 트레이드오프를 극복하고자 합니다.

## 핵심 방법론
제안된 **Live Avatar** 프레임워크는 **Timestep-forcing Pipeline Parallelism (TPP)** 을 도입하여 여러 GPU에 걸쳐 디노이징 단계를 병렬화함으로써 자기회귀 병목 현상을 해소하고 예측 가능한 저지연 실시간 스트리밍을 구현합니다. 또한, 장기적인 일관성을 위해 캐시된 참조 이미지를 사용하여 외형을 동적으로 재조정하는 **Rolling Sink Frame Mechanism (RSFM)** 을 제안하며, **Self-Forcing Distribution Matching Distillation** 을 통해 대규모 모델의 인과적 스트리밍 적응을 가능하게 합니다.

## 주요 결과
Live Avatar는 **5대의 H800 GPU** 에서 **종단 간 20 FPS** 의 실시간 생성 성능을 달성하며, **10,000초 이상** 의 무한 길이 아바타 생성에서도 안정적인 신원 유지와 일관된 립싱크를 입증합니다. 정량적 평가에서 GenBench-LongVideo 데이터셋 기준으로 **ASE↑ 3.38, IQA↑ 4.73, Sync-C↑ 6.28** 및 **Dino-S↑ 0.94** 를 기록하며 최신 방법론 대비 우수하거나 경쟁력 있는 성능을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 **대규모 확산 모델** 을 실시간 스트리밍 애플리케이션에 적용하는 새로운 패러다임을 제시합니다. **TPP** 와 **RSFM** 은 고품질 아바타가 오랜 시간 동안 안정적으로 작동해야 하는 가상 비서, 라이브 스트리밍, 인터랙티브 디지털 휴먼 등의 분야에서 **핵심 기술** 로 활용될 수 있습니다. 특히, 실시간 성능과 장기적인 일관성 문제를 동시에 해결함으로써 AI 기반 콘텐츠 생성의 상업적 및 기술적 확장을 위한 중요한 기반을 마련했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.