---
title: "[논문리뷰] Autoregressive Universal Video Segmentation Model"
excerpt: "Albert Gu이 [arXiv]에 게시한 'Autoregressive Universal Video Segmentation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Segmentation
  - Autoregressive Model
  - Universal Model
  - State Space Models
  - Mamba
  - Parallel Training
  - Streaming Video
  - Deep Learning

permalink: /ai/review/2025-8-27-Autoregressive-Universal-Video-Segmentation-Model/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19242)

**저자:** Albert Gu, Yu-Chiang Frank Wang, Sukjun Hwang, Miran Heo, cmhungsteve



## 핵심 연구 목표
현재 단편화된 비디오 분할 태스크들을 **단일 아키텍처**로 통합하고, **프롬프트 기반(prompted)** 및 **비프롬프트 기반(unprompted)** 비디오 분할을 아우르는 범용 모델을 개발하는 것이 목표입니다. 특히, **언어 모델링**의 다음 단어 예측과 유사하게 **다음 프레임 마스크 예측**으로 비디오 스트리밍 분할을 재구성하여, 긴 비디오 스트림에 대해 **상수 메모리**로 확장 가능한 효율적인 모델을 제시하고자 합니다.

## 핵심 방법론
본 논문은 비디오 분할을 순차적인 마스크 예측으로 재구성한 **Autoregressive Universal Segmentation Model (AUSM)**을 제안합니다. **History Compressor** 내의 **Mamba 레이어**를 활용하여 과거의 시공간 정보를 고정된 크기의 단일 공간 상태로 압축함으로써 **임의 길이의 비디오 스트림**을 처리합니다. 또한, **History Marker**는 인스턴스 마스크를 프레임 특징으로 분해하여 세밀한 정보를 보존하며, 기존 반복 훈련 방식과 달리 모든 구성 요소가 **프레임 간 병렬 훈련**을 지원하도록 설계되었습니다.

## 주요 결과
AUSM은 표준 벤치마크(DAVIS17, YouTube-VOS 2018 & 2019, MOSE, YouTube-VIS 2019 & 2021, OVIS)에서 이전 범용 스트리밍 비디오 분할 모델들을 능가하는 성능을 보였습니다. 특히, **16 프레임 시퀀스에서 최대 2.5배 빠른 훈련 속도**를 달성했으며, **Swin-B 백본** 사용 시 YouTube-VOS 2018에서 **UniVS Swin-L** 대비 **+8.7 G**의 성능 향상을 기록했습니다. 또한, OVIS 데이터셋에서 범용 모델 중 가장 높은 성능을 달성하여 장기 상호작용 및 복잡한 객체 역학 모델링 능력을 입증했습니다.

## AI 실무자를 위한 시사점
AUSM은 **프롬프트 기반**과 **비프롬프트 기반** 비디오 분할을 단일 모델로 처리하여, 다양한 비디오 분석 애플리케이션에서 **통합된 솔루션**을 제공합니다. **Mamba 기반 History Compressor**를 통해 **긴 시퀀스 비디오**를 **상수 메모리**로 효율적으로 처리할 수 있어, 실시간 비디오 스트리밍 및 장기 비디오 분석 시스템에 매우 유용합니다. **병렬 훈련 프레임워크**는 대규모 데이터셋과 긴 비디오 시퀀스에 대한 모델 훈련의 확장성을 크게 향상시켜, AI 개발 및 배포의 효율성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.