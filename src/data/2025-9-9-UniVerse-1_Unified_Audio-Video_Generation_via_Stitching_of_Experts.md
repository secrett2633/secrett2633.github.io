---
title: "[논문리뷰] UniVerse-1: Unified Audio-Video Generation via Stitching of Experts"
excerpt: "Xinyao Liao이 [arXiv]에 게시한 'UniVerse-1: Unified Audio-Video Generation via Stitching of Experts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Audio-Video Generation
  - Stitching of Experts (SoE)
  - Multimodal Diffusion
  - Online Annotation
  - Cross-modal Noise Correlation
  - Foundation Models
  - Verse-Bench

permalink: /ai/review/2025-9-9-UniVerse-1_Unified_Audio-Video_Generation_via_Stitching_of_Experts/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06155)

**저자:** Duomin Wang, Wei Zuo, Aojie Li, Ling-Hao Chen, Deyu Zhou, Zixin Yin, Xili Dai, Daxin Jiang, Gang Yu



## 핵심 연구 목표
본 논문은 기존 **비디오 생성 모델**들이 시각적 도메인에만 집중하여 오디오-비디오의 다중 모달 특성을 간과하는 문제를 해결하고, **Google Veo3**와 같은 폐쇄형 시스템에 필적하는 **통합된 오디오-비디오 생성 모델**인 **UniVerse-1**을 오픈 소스로 개발하는 것을 목표로 합니다. 특히, 효율적인 훈련과 정확한 시공간적 정렬을 통해 **고품질의 동기화된 오디오-비디오 콘텐츠**를 생성하는 데 중점을 둡니다.

## 핵심 방법론
연구진은 효율적인 훈련을 위해 **Stitching of Experts (SoE)** 패러다임을 제안하여 사전 훈련된 **WAN2.1 (비디오 모델)**과 **Ace-step (음악 모델)**을 **경량 크로스-모달 MLP 커넥터**를 통해 블록 단위로 깊이 통합했습니다. 데이터 정렬 문제 해결을 위해 **온라인 주석 파이프라인**을 개발하여 실시간으로 정확한 시공간적 텍스트 주석을 생성하며, **크로스-모달 노이즈 상관관계** 문제를 완화하기 위해 각 모달리티에 대해 **독립적인 노이즈 샘플링 전략**을 적용했습니다. 모델은 약 **7,600시간의 오디오-비디오 데이터**로 미세 조정되었습니다.

## 주요 결과
**UniVerse-1**은 주변 소리 생성에서 **잘 조율된 오디오-비주얼**을, 음성 생성에서 **강력한 정렬**을 보여주었습니다. 특히, 비디오 품질에서 **ID 일관성 0.89**로 최고 점수를 달성했고, 오디오 품질에서 **피치 상관관계 2.49**를 기록했습니다. 통합 오디오-비디오 정렬 측면에서는 **AV-A 0.23, CLAP 점수 0.16**로 기존 **SVG 모델(AV-A 0.09, CLAP 0.08)** 대비 우수한 성능을 보였으며, **Verse-Bench**라는 새로운 벤치마크 데이터셋을 함께 공개했습니다.

## AI 실무자를 위한 시사점
**UniVerse-1**은 **오픈 소스 최초의 통합 오디오-비디오 생성 모델**로서, 다중 모달리티 AI 개발의 중요한 이정표를 제시합니다. **SoE 방법론**은 기존의 강력한 단일 모달리티 파운데이션 모델들을 재활용하여 효율적으로 다중 모달 모델을 구축할 수 있는 실용적인 접근 방식을 제공합니다. **온라인 주석 파이프라인**과 **독립적인 노이즈 샘플링** 기법은 다중 모달리티 데이터 처리 및 훈련 시 발생할 수 있는 주요 문제를 해결하는 데 중요한 통찰을 제공하며, 향후 대규모 비디오 파운데이션 모델과의 통합 가능성을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.