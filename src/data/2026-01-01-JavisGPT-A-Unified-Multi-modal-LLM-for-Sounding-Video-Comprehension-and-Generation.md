---
title: "[논문리뷰] JavisGPT: A Unified Multi-modal LLM for Sounding-Video Comprehension and Generation"
excerpt: "arXiv에 게시된 'JavisGPT: A Unified Multi-modal LLM for Sounding-Video Comprehension and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Sounding Video
  - Video Comprehension
  - Video Generation
  - Audio-Video Synchronization
  - Instruction Tuning
  - Diffusion Model
  - Encoder-Decoder

permalink: /ai/review/2026-01-01-JavisGPT-A-Unified-Multi-modal-LLM-for-Sounding-Video-Comprehension-and-Generation/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22905)

**저자:** Kai Liu, Jungang Li, Yuchong Sun, Shengqiong Wu, Jianzhang Gao, Daoan Zhang, Wei Zhang, Sheng Jin, Sicheng Yu, Geng Zhan, Jiayi Ji, Fan Zhou, Liang Zheng, Shuicheng Yan, Hao Fei, Tat-Seng Chua



## 핵심 연구 목표
기존 멀티모달 LLM(MLLM)이 이미지-텍스트에 치중하거나 영상과 오디오를 별개로 처리하여 동기화된 사운딩 비디오(synchronized sounding video)의 정밀한 시공간적 정렬을 간과하는 문제를 해결하는 것을 목표로 합니다. 본 논문은 사운딩 비디오를 공동으로 이해하고 생성할 수 있는 최초의 통합 MLLM인 **JavisGPT** 를 설계하여, 실세계 애플리케이션에 필수적인 고품질 통합 멀티모달 상호작용을 구현하고자 합니다.

## 핵심 방법론
**JavisGPT** 는 **Qwen2.5 [88]** 기반의 **인코더-LLM-디코더 아키텍처** 를 채택하며, 시공간적 오디오-비디오 융합을 위한 **SyncFusion 모듈** 과 동기화 인식 학습 가능 쿼리를 통합합니다. 이는 사전 훈련된 **JAV-DiT 생성기 [40]** 와 연동되며, **MM-PreTrain, AV-FineTune, MM-InstTune** 의 3단계 훈련 파이프라인을 통해 점진적으로 멀티모달 이해 및 생성 능력을 구축합니다. 또한 **GPT-4o** 로 큐레이션된 200K 이상의 대화형 데이터셋인 **JavisInst-Omni** 를 구축하여 복잡한 시나리오를 지원합니다.

## 주요 결과
**JavisGPT** 는 **AVQA [90]** 및 **MU-AVQA [42]** 벤치마크에서 기존 MLLM을 능가하며 최상위 성능을 달성했습니다. 오디오-비디오 공동 생성 벤치마크에서 **NEXT-GPT [82]** 및 **UnifiedIO-2 [43]** 대비 현저히 우수한 AV 품질, 의미 일관성 및 AV 동기화를 보였으며, 특히 **JavisScore 0.157** 을 기록하여 타 모델 대비 월등히 높았습니다. 또한 **SyncFusion** 은 기존 방법론 대비 감소된 토큰 수(2.0K vs. 3.5K)와 추론 지연 시간(224ms vs. 246ms)으로 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**JavisGPT** 는 동기화된 오디오-비디오 콘텐츠의 통합 이해 및 생성을 위한 강력한 기반을 제공하여 AI 엔지니어가 보다 현실적이고 상호작용적인 AI 시스템을 개발할 수 있도록 돕습니다. **SyncFusion 모듈** 과 3단계 훈련 전략은 복잡한 멀티모달 시나리오에서 시공간적 정렬 및 데이터 효율성을 높이는 효과적인 접근 방식을 제시합니다. 이는 미래의 동적 아바타 챗봇, 사운딩 영화 큐레이션 등 다양한 응용 분야에서 멀티모달 LLM의 활용 가능성을 확장하는 중요한 진전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.