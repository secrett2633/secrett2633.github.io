---
title: "[논문리뷰] Relational Visual Similarity"
excerpt: "Jing Shi이 arXiv에 게시한 'Relational Visual Similarity' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Relational Similarity
  - Visual Similarity
  - Vision-Language Models
  - Anonymous Captioning
  - Image Retrieval
  - Analogical Reasoning
  - Dataset Curation

permalink: /ai/review/2025-12-09-Relational-Visual-Similarity/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07833)

**저자:** Thao Nguyen, Sicheng Mo, Krishna Kumar Singh, Yilin Wang, Jing Shi



## 핵심 연구 목표
본 연구는 기존 이미지 유사성 모델들이 시각적 속성(perceptual attribute)에만 집중하여, 인간이 인지하는 추상적이고 관계적인 시각 유사성(relational visual similarity)을 포착하지 못하는 한계를 해결하고자 합니다. 이미지 간의 표면적 속성 차이에도 불구하고 내재된 관계적 논리나 기능이 유사할 때 이를 '관계적 유사성'으로 정의하고, 이를 측정하는 새로운 방법을 개발하는 것이 목표입니다.

## 핵심 방법론
연구팀은 먼저 **LAION-2B** 에서 **114k** 개의 '관계적으로 흥미로운' 이미지를 선별하여 데이터셋을 구축했습니다. 다음으로, 수동으로 큐레이션된 이미지 그룹들을 활용해 **Qwen2.5-VL-7B** 모델을 **파인튜닝** 하여 이미지의 객체 특성을 배제하고 관계적 논리만을 설명하는 **익명 캡션(anonymous caption)** 을 생성했습니다. 최종적으로, 이 **이미지-익명 캡션 데이터셋** 을 이용해 **Vision-Language Model (VLM)** 기반의 `relsim` 모델을 **InfoNCE 손실 함수** 를 사용하여 훈련하여 이미지와 익명 캡션 간의 관계적 특징을 정렬하도록 했습니다.

## 주요 결과
제안된 `relsim` 모델은 **GPT-40** 를 통한 관계적 시각 유사성 평가에서 **6.77** 이라는 최고 점수를 달성하여, **LPIPS (4.56)** , **DINO (5.14)** , **CLIP-I (5.91)** 등 기존의 주요 유사성 측정 모델들을 큰 폭으로 능가했습니다. 사용자 연구(user study)에서는 `relsim`의 검색 결과에 대한 인간의 선호도가 **42.5%에서 60.7%** 에 달해, 모든 기준선 모델보다 일관되게 높은 선호도를 보였습니다. 이 결과는 `relsim`이 인간의 관계적 유사성 인지를 성공적으로 모방하고 있음을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 AI가 이미지의 표면적 특징을 넘어선 추상적, 관계적 유사성을 이해하도록 함으로써, 인간과 유사한 인지 능력을 가진 AI 시스템 개발의 중요한 진전을 이뤘습니다. 특히, **익명 캡션** 과 **Vision-Language Model** 의 결합은 고수준의 시각적 이해와 유추적 추론을 요구하는 이미지 검색 및 생성 작업에 새로운 가능성을 제시합니다. 본 연구에서 구축된 **114k 규모의 관계적 데이터셋** 과 `relsim` 모델은 향후 더 심층적인 시각적 추론 능력을 가진 AI 모델 개발에 핵심적인 기반 자료가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.