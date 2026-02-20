---
title: "[논문리뷰] VIBE: Visual Instruction Based Editor"
excerpt: "Bulat Suleimanov이 arXiv에 게시한 'VIBE: Visual Instruction Based Editor' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Instruction-Based Image Editing
  - Diffusion Models
  - Vision-Language Models (VLM)
  - Model Efficiency
  - Multi-stage Training
  - Preference Alignment
  - Source Consistency

permalink: /ai/review/2026-01-16-VIBE-Visual-Instruction-Based-Editor/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.02242)

**저자:** Grigorii Alekseenko, Aleksandr Gordeev, Irina Tolstykh, Bulat Suleimanov, Vladimir Dokholyan, Georgii Fedorov, Sergey Yakubson, Aleksandra Tsybina, Mikhail Chernyavsky, Maksim Kuprashevich, R&D Department, SALUTEDEV



## 핵심 연구 목표
본 논문은 기존의 대규모 및 고비용 이미지 편집 모델의 한계를 극복하고, **오픈소스 기반의 초고속, 컴팩트한** 시각적 지시 기반 이미지 편집 시스템을 개발하는 것을 목표로 합니다. 특히, 엄격한 **소스 일관성** 을 유지하면서도 **최고 수준의 편집 성능** 을 달성하고, 실용적인 배포를 위한 **높은 처리량과 낮은 메모리 사용량** 을 확보하는 데 중점을 둡니다.

## 핵심 방법론
VIBE는 **Qwen3-VL-2B-Instruct VLM** 과 **Sana1.5-1.6B diffusion 모델** 을 기반으로 합니다. 참조 이미지 안내를 위해 **채널별 연결(channel-wise concatenation)** 방식을 사용하며, 텍스트 지시는 **학습 가능한 메타 토큰(learnable meta-tokens)** 을 VLM에 입력하여 확산 모델에 대한 컨디셔닝 신호를 생성합니다. 학습은 **정렬(Alignment), 사전 학습(Pre-training), 지도 미세 조정(Supervised Fine-Tuning), 직접 선호도 최적화(Direct Preference Optimization, DPO)** 의 **네 단계 파이프라인** 을 통해 이루어지며, 데이터 품질 유지를 위해 혼합 데이터 학습, 다중 해상도 처리, 엄격한 필터링 기법을 적용합니다.

## 주요 결과
VIBE는 **ImgEdit 벤치마크** 에서 전체 점수 **3.85점** 을 기록하여 비교 대상 모델 중 2위를 차지했습니다. 특히 **Adjust (4.22), Remove (4.42), Background (4.22)** 와 같이 입력 이미지의 엄격한 보존이 요구되는 범주에서 뛰어난 성능을 보였습니다. **GEdit-Bench-EN** 에서는 전체 점수 **6.81점** 을 달성했으며, **7.91점** 의 높은 의미론적 일관성 점수로 지시 준수 능력을 입증했습니다. 또한, **NVIDIA H100** 에서 **24GB GPU 메모리** 로 **BF16** 형식의 **2K 해상도 이미지** 를 **약 4초** 만에 생성할 수 있습니다.

## AI 실무자를 위한 시사점
이 연구는 **컴팩트한 VLM 및 확산 모델** 이 대규모 모델에 필적하는 고품질 이미지 편집 성능을 낼 수 있음을 보여주어, **자원 제약이 있는 환경** 에서의 AI 모델 배포 가능성을 높였습니다. 특히 **24GB GPU 메모리** 에서 **2K 해상도 이미지** 를 빠르게 생성하는 능력은 **온디바이스 AI 또는 클라우드 비용 효율적 서비스** 개발에 중요한 이점을 제공합니다. **엄격한 소스 일관성** 을 강조한 학습 전략은 실제 애플리케이션에서 사용자 신뢰도를 높이고 원치 않는 아티팩트를 줄이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.