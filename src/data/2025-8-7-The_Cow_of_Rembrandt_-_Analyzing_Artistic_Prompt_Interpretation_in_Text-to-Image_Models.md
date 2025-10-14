---
title: "[논문리뷰] The Cow of Rembrandt - Analyzing Artistic Prompt Interpretation in
  Text-to-Image Models"
excerpt: "Elisabetta Rocchetti이 [arXiv]에 게시한 'The Cow of Rembrandt - Analyzing Artistic Prompt Interpretation in
  Text-to-Image Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - Diffusion Models
  - Cross-Attention Analysis
  - Content-Style Disentanglement
  - Artistic Style Transfer
  - Explainable AI
  - SDXL

permalink: /ai/review/2025-8-7-The_Cow_of_Rembrandt_-_Analyzing_Artistic_Prompt_Interpretation_in_Text-to-Image_Models/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23313)

**저자:** Alfio Ferrara, Sergio Picascia, Elisabetta Rocchetti



## 핵심 연구 목표
텍스트-투-이미지(txt2img) 확산 모델이 학습 과정에서 명시적인 지침 없이도 회화에서 콘텐츠와 스타일 개념을 내부적으로 어떻게 인코딩하고 분리하는지 탐구하는 것입니다. 특히, 모델이 생성된 이미지에서 내용(무엇이 그려지는가)과 형식(어떻게 그려지는가)을 얼마나 잘 구분하는지를 교차-어텐션 맵을 통해 분석하고자 합니다.

## 핵심 방법론
이 연구는 **Stable Diffusion XL (SDXL)** 모델을 사용하여 **MS COCO 데이터셋의 80개 객체 클래스**와 **WikiArt 데이터셋의 50개 스타일 설명자(23명 예술가, 27개 예술 운동)**를 조합한 총 **16,000개의 프롬프트**를 생성했습니다. **DAAM(Diffusion Attentive Attribution Maps)** 방법론을 활용하여 교차-어텐션 히트맵을 추출하고, 이를 이진 세그멘테이션 마스크로 변환한 후 **IoU(Intersection over Union)**를 계산하여 콘텐츠 및 스타일 토큰의 공간적 중첩도를 정량화했습니다. **IoUcs** 값을 다른 토큰 쌍의 평균 IoU인 **mIoUB**와 비교하여 콘텐츠-스타일 분리 정도를 나타내는 **Δ = mIoUB - IoUcs** 지표를 제안했습니다.

## 주요 결과
분석 결과, **IoUcs 값은 평균적으로 mIoUB보다 일관되게 낮게(p-values < 0.001)** 나타나, 콘텐츠와 스타일 토큰이 대체로 서로 다른 공간 영역에 주의를 기울임을 시사합니다. 특히, **고정 임계값 0.4**에서 **IoUcs는 평균 mIoUB보다 0.64 표준편차 낮았으며**, **기린(0.43)**과 같은 동물 관련 콘텐츠와 **뒤러(0.35)**와 같은 예술가 스타일에서 가장 높은 Δ 값을 보여 명확한 분리를 나타냈습니다. 반면, **램브란트(-0.07)** 스타일과 **사람(0.03)** 콘텐츠의 조합에서는 Δ 값이 낮거나 음수로 나타나 콘텐츠와 스타일 간의 높은 공간적 상관관계를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **대규모 txt2img 모델이 명시적인 지시 없이도 콘텐츠와 스타일 개념을 암묵적으로 학습하고 구분할 수 있음**을 보여줍니다. 이는 **생성 모델의 내부 메커니즘을 이해하고 제어하는 데 중요한 통찰**을 제공합니다. 그러나 특정 콘텐츠-스타일 조합에서는 분리도가 떨어지거나 스타일 토큰이 내용 요소에 영향을 미치는 **"엣지 케이스"**가 발생할 수 있음을 확인하여, **프롬프트 엔지니어링 및 모델 튜닝 시 이러한 상호작용을 고려**해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.