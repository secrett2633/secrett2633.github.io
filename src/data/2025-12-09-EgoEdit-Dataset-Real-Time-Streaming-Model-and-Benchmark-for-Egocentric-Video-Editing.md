---
title: "[논문리뷰] EgoEdit: Dataset, Real-Time Streaming Model, and Benchmark for Egocentric Video Editing"
excerpt: "arXiv에 게시된 'EgoEdit: Dataset, Real-Time Streaming Model, and Benchmark for Egocentric Video Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Egocentric Video Editing
  - Real-Time Streaming
  - Augmented Reality
  - Video Generation
  - Dataset
  - Benchmark
  - Diffusion Models
  - Distillation

permalink: /ai/review/2025-12-09-EgoEdit-Dataset-Real-Time-Streaming-Model-and-Benchmark-for-Egocentric-Video-Editing/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06065)

**저자:** Runjia Li, Moayed Haji Ali, Ashkan Mirzaei, Chaoyang Wang, Arpit Sahni, Ivan Skorokhodov, Aliaksandr Siarohin, Tomas Jakab, Junlin Han, Sergey Tulyakov, Philip Torr, Willi Menapace



## 핵심 연구 목표
논문은 대규모 움직임, 빈번한 손-객체 상호작용 등 독특한 도전 과제를 가진 **자기중심적(egocentric) 비디오 편집** 을 위한 포괄적인 생태계를 구축하는 것을 목표로 합니다. 기존 **AR(Augmented Reality)** 응용 프로그램의 고질적인 문제인 높은 지연 시간과 오프라인 편집 파이프라인의 한계를 극복하고, 실시간 상호작용이 가능한 편집 시스템을 제공하고자 합니다.

## 핵심 방법론
연구팀은 먼저 **EgoEditData** 라는 10만 개 이상의 수동 큐레이팅된 자기중심적 비디오 편집 데이터셋을 구축했습니다. 이를 바탕으로 대규모 비디오 생성 모델에서 파인튜닝된 **EgoEdit** 이라는 실시간 **명령어 기반 자기중심적 비디오 편집기** 를 개발했습니다. 실시간 스트리밍 추론을 위해 **DMD(Bidirectional Distribution Matching Distillation)** 및 **Self-Forcing** 증류 절차를 적용하여 모델의 지연 시간을 줄였습니다. 평가를 위해 **EgoEditBench** 라는 종합적인 벤치마크를 도입하여 명령어 충실도, 손 및 상호작용 보존, 시간적 일관성을 평가합니다.

## 주요 결과
**EgoEdit-RT(실시간 스트리밍 버전)** 는 단일 **H100 GPU** 에서 **38.1fps** 의 처리량과 **855ms** 의 첫 프레임 지연 시간으로 실시간 편집을 가능하게 합니다. **EgoEdit** 과 **EgoEdit-RT** 는 **EgoEditBench** 에서 자기중심적 편집 작업에 대해 VLM 스코어 **7.76** 및 **7.71** 을 달성하며 최첨단 성능을 기록했습니다. **EgoEditData** 의 포함 비율이 증가함에 따라 모델의 성능이 **VLM 스코어 4.87%에서 7.85%** 로 꾸준히 향상됨을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 **AR 애플리케이션** 을 위한 실시간, 명령어 기반 생성 시스템 개발에 중요한 기반을 제공합니다. 특히, **EgoEditData** 는 자기중심적 비디오 편집 분야의 데이터 부족 문제를 해결하여 관련 연구를 촉진할 것입니다. **Self-Forcing 및 DMD와 같은 증류 기법** 은 대규모 모델을 실제 인터랙티브 AR 환경에 적용하는 데 필수적인 기술적 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.