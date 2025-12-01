---
title: "[논문리뷰] Multimodal Referring Segmentation: A Survey"
excerpt: "Zuxuan Wu이 [arXiv]에 게시한 'Multimodal Referring Segmentation: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Learning
  - Referring Segmentation
  - Vision-Language Models
  - Image Segmentation
  - Video Segmentation
  - 3D Vision
  - Survey

permalink: /ai/review/2025-8-4-Multimodal-Referring-Segmentation-A-Survey/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00265)

## Multimodal Referring Segmentation: A Survey

**저자:** Henghui Ding, Song Tang, Shuting He, Chang Liu, Zuxuan Wu, Yu-Gang Jiang

**키워드:** `Multimodal Learning`, `Referring Segmentation`, `Vision-Language Models`, `Image Segmentation`, `Video Segmentation`, `3D Vision`, `Survey`

## 핵심 연구 목표
이 논문은 이미지, 비디오, 3D 장면과 같은 다양한 시각적 맥락에서 텍스트 또는 오디오 참조 표현을 기반으로 특정 객체를 분할하는 **다중모드 참조 분할(Multimodal Referring Segmentation)** 분야에 대한 포괄적인 최신 조사를 제공하는 것을 목표로 합니다. 연구는 이 분야의 진화를 이해하고, 현재의 과제를 식별하며, 미래 연구 방향을 제시하는 데 중점을 둡니다.

## 핵심 방법론
본 조사는 **다중모드 참조 분할** 을 위한 통일된 메타 아키텍처를 제시하고, **투 스테이지(Two-stage)** 및 **원 스테이지(One-stage)** 패러다임을 포함한 대표적인 방법론을 검토합니다. 주요 구성 요소로는 **시각, 텍스트, 오디오 인코더를 통한 특징 추출** , **다중모드 상호작용(융합 및 정렬)** , **시간 처리** , **분할 헤드** , 그리고 **훈련 목표** 등이 상세히 분석됩니다. 특히 **대규모 언어 모델(LLMs/MLLMs)** 의 통합이 강조됩니다.

## 주요 결과
이 분야는 2016년 이후 **상당한 발전** 을 이루었으며, 특히 **LLMs/MLLMs** 의 도입으로 **추론 기반 분할** 에서 괄목할 만한 성능 향상이 있었습니다. 예를 들어, 이미지 참조 분할(RES)에서 **OneRef-L** 은 RefCOCOg 검증 세트에서 **75.68% mIoU** 를 달성했고, 비디오 객체 분할(RVOS)에서 **VRS-HQ** 는 Ref-YouTube-VOS에서 **71.00% J&F** 를 기록했습니다. 3D 참조 분할(3D-RES)에서는 **IPDN** 이 ScanRefer에서 **60.60% Acc@0.25** 의 최상위 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 조사는 AI/ML 실무자들에게 **다중모드 참조 분할** 의 광범위한 응용 가능성(예: 이미지/비디오 편집, 로봇 공학, 자율 주행)에 대한 통찰력을 제공합니다. 특히 **대규모 비전-언어 모델(VLMs)의 활용** 이 복잡한 추론 및 실세계 시나리오에 대한 모델의 견고성을 향상시키는 핵심 동향임을 강조합니다. **범용적인 분할 에이전트 개발** 과 **제한된 감독 하의 심층 추론 능력 강화** 는 향후 중요한 연구 및 개발 방향이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
