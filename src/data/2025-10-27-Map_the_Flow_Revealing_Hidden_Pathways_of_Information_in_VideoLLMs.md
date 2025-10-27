---
title: "[논문리뷰] Map the Flow: Revealing Hidden Pathways of Information in VideoLLMs"
excerpt: "Bohyung Han이 [arXiv]에 게시한 'Map the Flow: Revealing Hidden Pathways of Information in VideoLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Large Language Models
  - VideoQA
  - Mechanistic Interpretability
  - Attention Knockout
  - Temporal Reasoning
  - Information Flow
  - Model Interpretability
  - Logit Lens

permalink: /ai/review/2025-10-27-Map_the_Flow_Revealing_Hidden_Pathways_of_Information_in_VideoLLMs/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13251)

**저자:** Minji Kim, Taekyung Kim, Bohyung Han



## 핵심 연구 목표
본 논문은 Video Large Language Models (**VideoLLMs**)가 비디오-텍스트 정보(spatiotemporal inputs)를 어떻게 내부적으로 추출하고 전파하여 **비디오 질의응답 (VideoQA)** 태스크에서 Temporal Reasoning을 수행하는지 그 메커니즘을 밝히는 것을 목표로 합니다. 기존 연구들이 외부 설계에 집중한 반면, 이 연구는 **VideoLLM의 내부 정보 흐름**에 대한 체계적인 청사진을 제공하고자 합니다.

## 핵심 방법론
연구진은 **mechanistic interpretability** 기법을 활용하여 VideoLLMs의 내부 동작을 역분석했습니다. 특히, **Attention Knockout** 기법을 사용하여 특정 어텐션 연결을 선택적으로 비활성화하고 최종 답변 확률의 변화를 측정하여 정보 흐름의 인과적 영향을 추적했습니다. 또한, **Logit Lens**를 사용하여 비디오 토큰 내에서 공간 및 시간 개념이 어떻게 출현하고 발전하는지 분석했습니다.

## 주요 결과
**VideoLLMs**는 초기-중간 레이어에서 비디오 토큰 간의 **적극적인 프레임 간 상호작용**을 통해 Temporal Reasoning을 시작합니다. 이어서 중간 레이어에서 비디오 표현과 Temporal 개념을 포함하는 언어 임베딩 간의 정렬을 통해 **비디오-언어 통합**이 진행됩니다. 이러한 통합이 완료되면, 모델은 중간-후기 레이어에서 정답을 생성할 준비가 됩니다. 특히, **LLaVA-NeXT-7B-Video-FT** 모델의 경우, 전체 어텐션 엣지의 **58%**를 비활성화하고도 **VideoQA 성능을 유지**할 수 있음을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **VideoLLMs**가 Temporal Reasoning을 수행하는 방식에 대한 명확한 이해를 제공하여 모델 **해석 가능성(interpretability)**을 높입니다. 비효율적인 어텐션 경로를 식별하고 제거함으로써, **LLM의 비디오 QA 성능 저하 없이 모델을 최적화하고 경량화**할 수 있는 실질적인 방안을 제시합니다. 이는 더욱 효율적이고 설명 가능한 **VideoLLMs** 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.