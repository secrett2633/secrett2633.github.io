---
title: "[논문리뷰] X-Part: high fidelity and structure coherent shape decomposition"
excerpt: "Yunhan Yang이 [arXiv]에 게시한 'X-Part: high fidelity and structure coherent shape decomposition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Shape Decomposition
  - Diffusion Models
  - Part-level Generation
  - Controllable Generation
  - Bounding Box Prompts
  - Semantic Features
  - Interactive Editing
  - Generative AI

permalink: /ai/review/2025-9-15-X-Part-high-fidelity-and-structure-coherent-shape-decomposition/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08643)

**저자:** Xinhao Yan, Jiachen Xu, Yang Li, Changfeng Ma, Yunhan Yang, Chunshi Wang, Zibo Zhao, Zeqiang Lai, Yunfei Zhao, Zhuo Chen, Chunchao Guo



## 핵심 연구 목표
기존 파트 기반 3D 형태 생성 방식이 낮은 제어 가능성과 의미론적으로 불분명한 분해 성능을 보이는 문제를 해결하는 것을 목표로 합니다. 전체 3D 객체를 기하학적 충실도가 높고 의미론적으로 일관성 있는 파트들로 분해하며, 다운스트림 애플리케이션(예: 메시 리토폴로지, UV 매핑)을 위한 편집 가능한 파트 생성 파이프라인을 제공하고자 합니다.

## 핵심 방법론
본 연구는 **X-Part**라는 **확산 기반 프레임워크**를 제안하며, 이는 **P³-SAM**으로부터 추출된 **bounding box**를 프롬프트로, **점 단위(point-wise) semantic feature**를 주입하여 의미 있는 분해를 유도합니다. **VAE**로 인코딩된 Shape Token을 객체 수준(object-level) 및 파트 수준(part-level) 조건으로 활용하며, 여러 **DiT 블록**으로 구성된 **동기화된 멀티-파트 확산 프로세스**를 통해 파트를 생성합니다. 또한, **bounding box 기반의 편집 파이프라인**을 통합하여 파트 분할 및 조정과 같은 상호작용 편집을 지원합니다.

## 주요 결과
**ObjaversePart-Tiny** 데이터셋에서 기존 최신 방법들을 능가하는 성능을 달성했습니다. 파트 분해 품질 지표에서 **CD↓ 0.11**, **Fscore-0.1↑ 0.80**, **Fscore-0.5↑ 0.71**을 기록하며 State-of-the-Art(SOTA) 성능을 보였습니다. 전체적인 형태 생성 결과에서도 **CD↓ 0.08**, **Fscore-0.1↑ 0.92**, **Fscore-0.5↑ 0.78**로 SOTA를 달성했으며, 정성적 결과는 구조적 타당성과 높은 기하학적 품질을 보여줍니다.

## AI 실무자를 위한 시사점
**X-Part**는 **제어 가능하고 편집 가능한** 3D 파트 생성 기능을 제공하여 **생산 준비가 된(production-ready) 3D 애셋** 제작을 위한 새로운 패러다임을 제시합니다. **Bounding box 기반의 직관적인 제어**는 3D 콘텐츠 제작 워크플로우를 크게 개선하며, **UV unwrapping**과 같은 하위 태스크의 복잡성을 줄일 수 있습니다. 다만, **파트 수가 많아질수록 추론 시간이 증가**하여 실시간 사용에 제약이 있을 수 있음을 인지해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.