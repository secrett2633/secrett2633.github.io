---
title: "[논문리뷰] MajutsuCity: Language-driven Aesthetic-adaptive City Generation with Controllable 3D Assets and Layouts"
excerpt: "이 [arXiv]에 게시한 'MajutsuCity: Language-driven Aesthetic-adaptive City Generation with Controllable 3D Assets and Layouts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D City Generation
  - Natural Language Processing
  - Aesthetic Adaptation
  - Controllable Assets
  - Layout Generation
  - Interactive Editing
  - Diffusion Models
  - Multimodal Dataset

permalink: /ai/review/2025-11-26-MajutsuCity-Language-driven-Aesthetic-adaptive-City-Generation-with-Controllable-3D-Assets-and-Layouts/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20415)

**저자:** Zilong Huang, Jun He, Xiaobin Huang, Ziyi Xiong, Yang Luo, Junyan Ye, Weijia Li, Yiping Chen, Ting Han



## 핵심 연구 목표
기존 3D 도시 생성 방법론의 한계인 텍스트 기반 생성의 창의적 유연성과 객체 수준 편집 가능성 및 구조적 일관성 부족 문제를 해결하는 것을 목표로 합니다. 특히 대규모의 스타일적으로 다양한 도시 장면을 위해, **자연어 기반** 으로 미학적 적응성을 갖춘 **구조적으로 일관되고 스타일적으로 다양한 3D 도시 장면** 을 생성하며, 높은 제어 가능성과 **대화형 편집** 기능을 제공하는 프레임워크를 개발하고자 합니다.

## 핵심 방법론
**MajutsuCity** 는 **Scene Design, Layout Generation, Assets & Materials Generation, Scene Generation** 의 4단계 파이프라인을 따릅니다. **Scene Design** 에서는 LLM을 사용하여 텍스트 프롬프트를 구조화된 디자인 사양으로 변환하며, **Layout Generation** 에서는 **LongCLIP 기반 확산 모델** 과 **ControlNet** 을 활용하여 레이아웃 및 높이 맵을 생성합니다. **Assets & Materials Generation** 단계에서는 **이미지 기반 및 포인트 클라우드 기반 형상 제약** 을 통해 3D 빌딩 자산과 **Qwen-Image** 로 PBR 재료 및 스카이박스를 합성합니다. 또한, **GPT-5 기반 MajutsuAgent** 를 통합하여 5가지 객체 수준 편집 작업을 지원하며, **MajutsuDataset** 이라는 고품질 멀티모달 데이터셋을 구축하여 학습에 활용합니다.

## 주요 결과
**MajutsuCity** 는 레이아웃 생성에서 CityDreamer 대비 **83.7%** , CityCraft 대비 **20.1%** 의 **FID** 감소를 달성하며, FID **22.7** , KID **0.013** , IS **3.14** 의 수치를 기록했습니다. 3D 도시 장면 생성에서는 **VLM 기반 AQS 및 RDR 평가 프로토콜** 에서 **구조 및 시점 일관성, 장면 풍부도 및 복잡성, 재료 및 텍스처 충실도, 조명 및 분위기** 를 포함한 **모든 8개 평가 지표에서 1위** 를 차지했습니다. 이를 통해 탁월한 기하학적 충실도와 다양한 스타일 도메인에서의 미학적 적응성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **자연어 기반 3D 콘텐츠 생성** 의 실용적인 가능성을 확장하고, 복잡한 도시 환경을 직관적으로 제어하고 편집할 수 있는 강력한 프레임워크를 제공합니다. **MLLM** 과 **확산 모델** 을 결합한 **layout-to-asset-to-scene 파이프라인** 은 향후 3D 콘텐츠 제작 워크플로우에 혁신을 가져올 수 있으며, 특히 **대화형 편집 에이전트** 는 사용자 경험을 크게 향상시킬 수 있습니다. 또한, 구축된 **고품질 멀티모달 데이터셋** 과 **VLM 기반 평가 지표** 는 향후 3D 생성 연구의 발전을 위한 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.