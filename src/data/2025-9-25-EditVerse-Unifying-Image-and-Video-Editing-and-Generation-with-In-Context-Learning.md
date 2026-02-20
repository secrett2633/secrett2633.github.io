---
title: "[논문리뷰] EditVerse: Unifying Image and Video Editing and Generation with
  In-Context Learning"
excerpt: "Tianyu Wang이 arXiv에 게시한 'EditVerse: Unifying Image and Video Editing and Generation with
  In-Context Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Multimodal Model
  - In-Context Learning
  - Image and Video Editing
  - Video Generation
  - Full Self-Attention
  - Rotary Positional Embedding
  - Cross-Modal Knowledge Transfer

permalink: /ai/review/2025-9-25-EditVerse-Unifying-Image-and-Video-Editing-and-Generation-with-In-Context-Learning/

toc: true
toc_sticky: true

date: 2025-09-25 13:08:16+0900
last_modified_at: 2025-09-25 13:08:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20360)

**저자:** Xuan Ju, Tianyu Wang, Yuqian Zhou, He Zhang, Qing Liu, Nanxuan Zhao, Zhifei Zhang, Yijun Li, Yuanhao Cai, Shaoteng Liu, Daniil Pakhomov, Zhe Lin, Soo Ye Kim, Qiang Xu



## 핵심 연구 목표
이 논문은 이미지 및 비디오 생성과 편집 작업이 아키텍처적 한계와 데이터 부족으로 인해 파편화되어 있다는 문제를 해결하고자 합니다. **단일 모델** 내에서 이미지 및 비디오 편집과 생성을 통합하는 **EditVerse** 프레임워크를 제안하여, **인컨텍스트 학습** 을 통해 다양한 모달리티를 유연하게 처리하는 것을 목표로 합니다.

## 핵심 방법론
EditVerse는 모든 모달리티(텍스트, 이미지, 비디오)를 **단일 1차원 토큰 시퀀스** 로 표현하고, **완전한 자기 주의(Full Self-Attention)** 메커니즘을 사용하는 **트랜스포머 아키텍처** 를 기반으로 합니다. 특히, 시퀀스, 시간, 높이, 너비 차원을 포함하는 **4차원 회전 위치 임베딩(Rotary Positional Embedding, RoPE)** 을 도입하여 유연성을 높였습니다. 또한, **232K개의 비디오 편집 샘플** 을 포함하는 확장 가능한 데이터 파이프라인을 설계하고 대규모 이미지 및 비디오 데이터와 혼합하여 **교차 모달리티 지식 전이** 를 촉진했습니다.

## 주요 결과
EditVerse는 제안된 **EditVerseBench** 벤치마크에서 **VLM 편집 품질 7.65점** 과 **비디오 텍스트 정렬 23.93점** 을 달성하며 기존 오픈소스 및 상용 모델들을 능가하는 **최첨단(SOTA) 성능** 을 보였습니다. 모델은 훈련 데이터에 없는 작업(예: 재질 변경, 효과 추가)을 수행하는 **새로운 능력을 발휘** 했으며, **교차 모달리티 학습** 을 통해 비디오 편집의 **데이터 희소성 한계를 완화** 했습니다. 또한, **TGVE+ 벤치마크** 에서도 **ViCLIPdir 0.225** , **ViCLIPout 0.252** 를 기록하며 다른 모델들을 능가했습니다.

## AI 실무자를 위한 시사점
EditVerse는 이미지와 비디오 편집 및 생성을 **단일 통합 프레임워크** 로 처리하는 강력한 잠재력을 보여주어, 복잡한 멀티모달 애플리케이션 개발을 간소화할 수 있습니다. 풍부한 이미지 데이터에서 부족한 비디오 편집 데이터로 **지식 전이** 하는 능력은 데이터 수집 및 라벨링 비용을 절감하는 중요한 이점을 제공합니다. **완전한 자기 주의** 와 **인컨텍스트 학습** 을 활용한 이 접근 방식은 유연하고 적응력 있는 차세대 AI 시스템 설계에 대한 새로운 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.