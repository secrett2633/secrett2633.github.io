---
title: "[논문리뷰] A Style is Worth One Code: Unlocking Code-to-Style Image Generation with Discrete Style Space"
excerpt: "이 [arXiv]에 게시한 'A Style is Worth One Code: Unlocking Code-to-Style Image Generation with Discrete Style Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code-to-Style Generation
  - Discrete Style Space
  - Style Codebook
  - Autoregressive Model
  - Diffusion Models
  - Visual Stylization
  - Generative AI

permalink: /ai/review/2025-11-19-A_Style_is_Worth_One_Code_Unlocking_Code-to-Style_Image_Generation_with_Discrete_Style_Space/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.10555)

**저자:** Huijie Liu1,2 Shuhao Cui² Haoxiang Cao2,3 Shuai Ma¹ Kai Wu2,† Guoliang Kang1,†



## 핵심 연구 목표
본 논문은 기존 텍스트 프롬프트, 참조 이미지, LoRA 기반 스타일 생성 방식이 겪는 스타일 일관성 부족, 창의성 한계, 복잡한 스타일 표현 문제를 해결하고자 합니다. 궁극적으로 **숫자 코드(numerical code)**만으로 **새롭고 일관된 시각적 스타일**의 이미지를 생성하는 **코드-투-스타일(code-to-style) 이미지 생성**이라는 새로운 패러다임을 제안하고, 이를 위한 최초의 오픈 소스 프레임워크인 **CoTyle**을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**CoTyle**은 세 가지 주요 구성요소로 이루어져 있습니다. 첫째, 이미지 컬렉션에서 **이산 스타일 코드북(discrete style codebook)**을 **대조 손실(contrastive loss)**을 이용해 훈련하여 스타일 임베딩을 추출합니다. 둘째, 이 스타일 임베딩을 조건으로 사용하여 **텍스트-투-이미지 확산 모델(T2I-DM)**을 훈련하여 특정 스타일의 이미지를 생성하도록 합니다. 셋째, **자기회귀 변환기(autoregressive transformer)**를 스타일 생성기로 훈련하여 이산 스타일 임베딩의 분포를 학습하고 새로운 스타일 임베딩을 합성할 수 있도록 합니다.

## 주요 결과
**CoTyle**은 코드-투-스타일 이미지 생성 태스크에서 Midjourney 대비 **상당히 우수한 스타일 일관성**을 보여주었으며, **0.6007의 Consistency 점수**로 Midjourney의 0.4734를 능가했습니다 (Table 1). 또한, 텍스트 브랜치를 통한 스타일 주입 방식이 시각 브랜치(Visual Branch) 대비 더 높은 일관성(0.5791 vs 0.5306)을 달성하며 **의미적 정보 보존**에 효과적임을 입증했습니다 (Table 2). 고주파 인덱스 억제(high-frequency suppression) 전략을 통해 스타일 다양성(0.7764)과 일관성(0.6007)이 모두 향상됨을 확인했습니다 (Table 4).

## AI 실무자를 위한 시사점
**CoTyle**은 **간결한 숫자 코드**만으로 일관성 있고 재현 가능한 스타일 이미지를 생성할 수 있어, 스타일 탐색 및 적용 프로세스를 크게 단순화합니다. **오픈 소스 프레임워크**로서 AI/ML 연구자와 엔지니어가 코드-투-스타일 생성 분야에서 추가 연구 및 애플리케이션 개발을 진행하는 데 중요한 기반을 제공합니다. 또한, **스타일 보간(interpolation)**과 **이미지 조건부 생성**을 지원하여 실제 응용 시나리오에서 높은 유연성을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.