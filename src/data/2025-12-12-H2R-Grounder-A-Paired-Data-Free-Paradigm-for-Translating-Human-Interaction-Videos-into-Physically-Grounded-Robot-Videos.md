---
title: "[논문리뷰] H2R-Grounder: A Paired-Data-Free Paradigm for Translating Human Interaction Videos into Physically Grounded Robot Videos"
excerpt: "Mike Zheng Shou이 arXiv에 게시한 'H2R-Grounder: A Paired-Data-Free Paradigm for Translating Human Interaction Videos into Physically Grounded Robot Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-to-Video Translation
  - Robot Learning
  - Human-Robot Transfer
  - Diffusion Models
  - Unpaired Data Learning
  - Pose-Guided Generation
  - Embodiment Gap Bridging

permalink: /ai/review/2025-12-12-H2R-Grounder-A-Paired-Data-Free-Paradigm-for-Translating-Human-Interaction-Videos-into-Physically-Grounded-Robot-Videos/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09406)

**저자:** Hai Ci, Xiaokang Liu, Pei Yang, Yiren Song, Mike Zheng Shou*



## 핵심 연구 목표
본 논문은 일상적인 인간-객체 상호작용 비디오를 **물리적으로 접지된 로봇 조작 비디오** 로 변환하여 로봇이 인간 비디오로부터 조작 기술을 학습할 수 있도록 하는 것을 목표로 합니다. 특히, **페어링된 인간-로봇 비디오 데이터 없이** 이러한 변환을 수행하여 로봇 데이터 수집의 어려움과 시각적 체현 간극(visual embodiment gap) 문제를 해결하고자 합니다.

## 핵심 방법론
핵심은 **H2Rep** 라는 새로운 전이 가능한 중간 표현을 사용하는 것입니다. 훈련 시, 로봇 비디오에서 **로봇 팔을 인페인팅하여 깨끗한 배경을 얻고** , 그리퍼의 2D 위치 및 방향을 나타내는 **최소한의 포즈 표시기** 를 오버레이하여 H2Rep를 생성합니다. 이 H2Rep를 조건으로 **사전 훈련된 비디오 확산 모델 (Wan 2.2)** 을 **인컨텍스트 학습 방식으로 미세 조정** 하여 로봇 비디오를 생성합니다. 추론 시에는 인간 비디오에서 **손 포즈를 추정하고 (ViT-Pose, HaMeR)** , **인간을 인페인팅한 후 (Minimax-Remover)** 동일한 포즈 표시기를 오버레이하여 H2Rep를 구성, 로봇 비디오를 생성합니다.

## 주요 결과
H2R-Grounder는 현실감과 물리적 접지 측면에서 기존 베이스라인을 크게 능가합니다. **DexYCB 데이터셋** 에 대한 인간 평가에서 **시각적 품질 (61.4%)** , **물리적 타당성 (63.6%)** , **움직임 일관성 (54.5%)** , **배경 일관성 (56.8%)** 에서 가장 높은 선호도를 받았습니다. **Gemini VLM** 평가에서도 **움직임 일관성 (3.7)** , **배경 일관성 (4.9)** , **물리적 타당성 (4.4)** 등 높은 점수를 기록하여 모델의 강점을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **페어링된 데이터 없이** 인간 비디오에서 로봇 비디오로의 변환을 가능하게 하는 패러다임을 제시하여 로봇 학습을 위한 데이터 수집 부담을 획기적으로 줄입니다. **전이 가능한 표현 (H2Rep)** 과 **대규모 확산 모델의 인컨텍스트 미세 조정** 은 체현 간극을 해결하는 확장 가능한 접근 방식을 제공합니다. AI 실무자들은 이 프레임워크를 활용하여 풍부한 비라벨링 인간 비디오로부터 로봇 정책을 개발하고, 로봇의 광범위한 역량을 다양한 환경에서 확장할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.