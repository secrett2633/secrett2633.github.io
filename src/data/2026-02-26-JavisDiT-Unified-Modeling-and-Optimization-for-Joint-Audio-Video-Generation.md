---
title: "[논문리뷰] JavisDiT++: Unified Modeling and Optimization for Joint Audio-Video Generation"
excerpt: "[arXiv]에 게시된 'JavisDiT++: Unified Modeling and Optimization for Joint Audio-Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Joint Audio-Video Generation
  - Diffusion Transformer
  - Modality-specific Mixture-of-Experts
  - Temporal-Aligned ROPE
  - Direct Preference Optimization
  - Multimodal Generation
  - Text-to-AV

permalink: /ai/review/2026-02-26-JavisDiT-Unified-Modeling-and-Optimization-for-Joint-Audio-Video-Generation/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.19163)

**저자:** Kai Liu, Yanhao Zheng, Kai Wang, Shengqiong Wu, Rongjunchen Zhang, Jiebo Luo, Dimitrios Hatzinakos, Ziwei Liu, Hao Fei, Tat-Seng Chua



## 핵심 연구 목표
기존 오픈소스 공동 오디오-비디오 생성(JAVG) 모델들이 **생성 품질** , **시간 동기화** , 그리고 **인간 선호도 정렬** 측면에서 상용 모델(예: Veo3)에 비해 한계를 보이는 문제를 해결하는 것을 목표로 합니다. 이를 위해 **통합 모델링 및 최적화 프레임워크** 를 제안하여 고품질, 더 잘 동기화되고, 인간 선호도에 맞춰진 사운드 비디오를 생성하고자 합니다.

## 핵심 방법론
본 논문은 **Wan2.1-1.3B-T2V** 를 백본으로 하는 통합 Diffision Transformer(DiT) 아키텍처를 기반으로 세 가지 핵심 방법론을 제시합니다. 첫째, **Modality-specific Mixture-of-Experts (MS-MoE)** 를 도입하여, 공유된 어텐션 레이어 이후 각 모달리티에 특화된 FFN을 통해 교차 모달 상호작용 및 단일 모달 품질을 향상시킵니다. 둘째, 명시적인 프레임 수준 동기화를 위해 **Temporal-Aligned Multimodal ROPE (TA-ROPE)** 전략을 제안하여 오디오와 비디오 토큰의 위치 ID를 통일된 시간 축에 정렬하고, 모달리티 간 겹침을 방지하기 위해 오디오 차원에 오프셋을 적용합니다. 셋째, **Audio-Video Direct Preference Optimization (AV-DPO)** 방법을 개발하여 다양한 **보상 모델(AudioBox, VideoAlign, ImageBind, SynchFormer)** 을 활용한 모달리티 인지 선호도 순위 지정을 통해 모델 출력을 인간의 선호도에 맞춥니다.

## 주요 결과
JavisDiT++는 JAVG의 모든 평가 지표(품질, 일관성, 동기화)에서 기존 모델들을 **크게 능가** 했습니다. 특히, **JavisDiT** 및 **Universe-1** 대비 **FVD 141.5** , **FAD 5.5** , **DeSync 0.832** 로 최상의 성능을 달성했으며, 추론 시간은 **1분 4초** 로 가장 효율적이었습니다. 인간 평가에서는 **JavisDiT** 대비 **74.0%** , **Universe-1** 대비 **74.7%** 더 선호되었으며, **AV-DPO** 적용 시 **74.7%** 의 승률을 기록하며 향상된 성능을 보였습니다. 이 모델은 단 **1M** 의 공개 데이터셋으로 학습되었습니다.

## AI 실무자를 위한 시사점
본 연구는 통합 아키텍처와 **MS-MoE** 디자인이 복잡한 멀티모달 생성 작업에서 효율성과 성능을 동시에 달성할 수 있음을 보여주며, **멀티모달 AI 모델 설계** 에 대한 중요한 통찰을 제공합니다. **TA-ROPE** 는 오디오-비디오 동기화를 위한 효과적이고 비용 효율적인 방법론으로, 특히 **실시간/저지연 애플리케이션** 에 유용합니다. 또한, **AV-DPO** 는 인간의 선호도를 직접 모델 학습에 통합하여 생성된 콘텐츠의 **실용적 가치와 사용자 만족도** 를 높이는 새로운 접근 방식을 제시하며, 향후 멀티모달 모델의 정렬 연구에 중요한 이정표가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.