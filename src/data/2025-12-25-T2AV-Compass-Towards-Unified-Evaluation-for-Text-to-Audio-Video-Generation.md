---
title: "[논문리뷰] T2AV-Compass: Towards Unified Evaluation for Text-to-Audio-Video Generation"
excerpt: "이 [arXiv]에 게시한 'T2AV-Compass: Towards Unified Evaluation for Text-to-Audio-Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Audio-Video Generation
  - Multimodal Evaluation
  - Benchmark
  - MLLM-as-a-Judge
  - Cross-modal Alignment
  - Instruction Following
  - Perceptual Realism
  - Audio Realism

permalink: /ai/review/2025-12-25-T2AV-Compass-Towards-Unified-Evaluation-for-Text-to-Audio-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21094)

**저자:** Zhe Cao, Tao Wang, Jiaming Wang, Yanghai Wang, Yuanxing Zhang, Jialu Chen, Miao Deng, Jiahao Wang, Yubin Guo, Chenxi Liao, Yize Zhang, Zhaoxiang Zhang, Jiaheng Liu



## 핵심 연구 목표
텍스트-오디오-비디오 (T2AV) 생성 모델의 평가 방식이 파편화되어 있고, 단일 모달 메트릭에 의존하며 복잡한 프롬프트에서 크로스-모달 정렬, 지시 준수 및 인지적 사실성을 제대로 포착하지 못하는 문제를 해결하고자 합니다. 본 연구는 T2AV 시스템의 포괄적인 평가를 위한 **통합 벤치마크** 를 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **T2AV-Compass** 라는 벤치마크를 제시하며, 이는 분류 기반 파이프라인으로 구축된 **500개의 다양하고 복잡한 프롬프트** 로 구성됩니다. 평가는 **이중 수준 평가 프레임워크** 를 통해 이루어지며, 비디오 및 오디오 품질, 크로스-모달 정렬을 측정하는 **객관적 신호 수준 메트릭** 과 **MLLM-as-a-Judge 프로토콜** 을 활용한 **주관적 평가** (지시 준수 및 사실성)를 통합합니다. 특히, **VT, VA, PQ, CU, CLAP, VideoCLIP-XL-V2, ImageBind, DeSync, LatentSync** 와 같은 객관적 메트릭과 **MSS, OIS, TCS, AAS, MTC** 를 포함한 주관적 사실성 메트릭을 사용합니다.

## 주요 결과
**Veo-3.1, Sora-2, Kling-2.6** 등 **11개의 대표적인 T2AV 시스템** 을 평가한 결과, 가장 강력한 모델조차 인간 수준의 사실성과 크로스-모달 일관성에서 현저히 부족한 것으로 나타났습니다. 특히, **'오디오 사실성 병목 현상'** 이 드러났는데, 예를 들어 최고 성능을 보인 **Seedance-1.5** 모델조차 오디오 사실성 점수가 **53.84** 에 불과했습니다. 이는 현재 모델들이 시각적 품질에 상응하는 물리적으로 기반한 오디오 텍스처를 합성하는 데 어려움을 겪고 있음을 보여줍니다.

## AI 실무자를 위한 시사점
T2AV 모델의 개발자들은 **오디오 사실성, 세밀한 동기화, 지시 준수** 등에서 아직 큰 개선 여지가 있음을 인지해야 합니다. **T2AV-Compass** 는 모델의 강점과 약점을 진단하는 도전적이고 효과적인 도구로 활용될 수 있습니다. 특히, **MLLM-as-a-Judge** 와 같은 해석 가능한 평가 프레임워크는 미래 모델의 발전에 중요한 가이드라인을 제공하며, **네이티브 오디오-비디오 공동 확산 아키텍처** 에 대한 연구 우선순위를 높여야 할 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.