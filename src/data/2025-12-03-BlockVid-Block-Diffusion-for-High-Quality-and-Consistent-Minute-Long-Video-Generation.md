---
title: "[논문리뷰] BlockVid: Block Diffusion for High-Quality and Consistent Minute-Long Video Generation"
excerpt: "이 [arXiv]에 게시한 'BlockVid: Block Diffusion for High-Quality and Consistent Minute-Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Block Diffusion
  - Video Generation
  - Temporal Consistency
  - KV Cache
  - Semi-Autoregressive
  - Video Quality Metrics
  - Long Video Generation

permalink: /ai/review/2025-12-03-BlockVid-Block-Diffusion-for-High-Quality-and-Consistent-Minute-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22973)

**저자:** Zeyu Zhang¹, Shuning Chang¹, Yuanyu He12, Yizeng Han¹, Jiasheng Tang13*, Fan Wang¹, Bohan Zhuang12*



## 핵심 연구 목표
본 논문은 블록 확산 모델을 사용하여 분 단위 길이의 고품질 및 일관된 비디오를 생성하는 데 따르는 주요 과제들을 해결하는 것을 목표로 합니다. 특히, **KV-캐시(KV-cache)로 인한 장기적 오류 누적** 문제와 **세밀한 긴 비디오 벤치마크 및 일관성 측정 지표의 부족** 을 해결하고자 합니다.

## 핵심 방법론
저자들은 **BlockVid** 라는 새로운 블록 확산 프레임워크를 제안합니다. 이는 **시맨틱 희소 KV 캐시(semantic-aware sparse KV cache)** 를 통해 중요한 토큰을 선택적으로 저장하여 오류 전파를 줄이고, **블록 강제(Block Forcing)** 훈련 전략과 **자체 강제 손실(Self Forcing loss)** 을 결합하여 훈련-추론 간극을 해소합니다. 또한, **청크 단위 노이즈 스케줄링 및 셔플링(chunk-wise noise scheduling and shuffling)** 을 도입하여 시간적 일관성을 강화합니다.

## 주요 결과
**BlockVid** 는 **LV-Bench** 에서 기존 최첨단 방법 대비 **VDE Subject에서 22.2%** , **VDE Clarity에서 19.4%** 의 성능 향상을 달성했습니다. 또한, **LV-Bench** 와 **VBench** 의 다양한 일관성 및 지각 품질 지표에서 기존 모델들을 지속적으로 능가하며, 모든 VDE 오류 점수를 최소화하고 최고 수준의 주제 및 배경 일관성, 움직임 부드러움 점수를 기록했습니다.

## AI 실무자를 위한 시사점
**BlockVid** 는 영화 제작, 디지털 스토리텔링, 가상 시뮬레이션 등 장기적이고 일관된 비디오 콘텐츠가 필요한 AI 애플리케이션에 실질적인 해결책을 제시합니다. **시맨틱 희소 KV 캐시** 와 **블록 강제 훈련 전략** 은 장기 시퀀스 생성 모델에서 흔히 발생하는 오류 누적 및 드리프트 문제를 효과적으로 완화할 수 있는 실용적인 방법론을 제공합니다. 새로 도입된 **LV-Bench 벤치마크** 와 **VDE 지표** 는 긴 비디오 생성 모델의 개발 및 평가에 필수적인 도구로 활용될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.