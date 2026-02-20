---
title: "[논문리뷰] Loomis Painter: Reconstructing the Painting Process"
excerpt: "arXiv에 게시된 'Loomis Painter: Reconstructing the Painting Process' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Painting Process Generation
  - Video Diffusion Models
  - Media Transfer
  - Reverse Painting
  - Dataset Curation
  - Perceptual Distance Profile
  - Artistic Workflow
  - Generative AI

permalink: /ai/review/2025-11-24-Loomis-Painter-Reconstructing-the-Painting-Process/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17344)

**저자:** Markus Pobitzer, Chang Liu, Chenyi Zhuang, Teng Long, Bin Ren, Nicu Sebe



## 핵심 연구 목표
본 논문은 기존 생성 모델들이 겪는 시간적 불연속성, 구조적 불일치, 그리고 다양한 예술 매체에 대한 일반화 능력 부족 문제를 해결하여, 어떤 입력 이미지에 대해서도 **사실적이고 일관된 단계별 그림 그리기 과정** 을 생성하는 것을 목표로 합니다. 특히, 인간의 창의적인 작업 흐름을 충실히 재현하고 **대화형 및 개인 맞춤형 튜토리얼** 을 가능하게 하는 데 중점을 둡니다.

## 핵심 방법론
저자들은 다중 매체 페인팅 프로세스 생성을 위한 **통합 프레임워크** 를 제안하며, **확산 모델의 조건부 공간** 에 매체별 속성을 임베딩하는 **시맨틱 기반 스타일 제어 메커니즘** 을 도입했습니다. 또한, 완성된 작품에서 빈 캔버스로 거꾸로 학습하는 **역방향 페인팅(reverse-painting) 훈련 전략** 을 통해 시간적 일관성을 확보하고, 손 가림(occlusion)을 제거하는 **자동 제거 절차** 가 포함된 **대규모 실제 페인팅 프로세스 데이터셋** 을 구축했습니다.

## 주요 결과
제안된 방법인 "Ours"는 기존 SOTA 모델 대비 우수한 성능을 달성했습니다. 특히, 최종 이미지 충실도에서 **FID 151.04** , **LPIPS 0.38** , **CLIP 0.86** , **DINOv2 0.76** 의 정량적 지표를 기록하여, Inverse Painting, ProcessPainter, PaintsUndo와 같은 베이스라인을 뛰어넘었습니다. 또한, 시간적 일관성을 평가하기 위해 도입한 새로운 지표인 **Perceptual Distance Profile (PDP)에서 LPIPS 기준 0.098** 을 달성하며 인간의 창의적 패턴과 유사한 진행을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 확산 모델** 을 활용하여 예술적 프로세스를 재구성하는 새로운 접근 방식을 제시하며, **다양한 매체(미디어)로의 스타일 전이** 와 **단계별 튜토리얼 생성** 에 큰 잠재력을 보여줍니다. 구축된 고품질 데이터셋과 **역방향 페인팅 전략** 은 향후 창의적 AI 분야 연구에 중요한 기반이 될 수 있으며, **Perceptual Distance Profile (PDP) 지표** 는 생성된 예술적 콘텐츠의 시간적 일관성을 평가하는 새로운 표준을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.