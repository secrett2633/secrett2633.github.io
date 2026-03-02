---
title: "[논문리뷰] Communication-Inspired Tokenization for Structured Image Representations"
excerpt: "arXiv에 게시된 'Communication-Inspired Tokenization for Structured Image Representations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Tokenization
  - Structured Representation
  - Attentive Encoding
  - Flow Matching
  - Semantic Alignment
  - Compositional Generalization
  - Transformer Architecture

permalink: /ai/review/2026-02-25-Communication-Inspired-Tokenization-for-Structured-Image-Representations/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20731)

**저자:** Aram Davtyan, Yusuf Sahin, Yasaman Haghighi, Sebastian Stapf, Pablo Acuaviva, Alexandre Alahi, Paolo Favaro



## 핵심 연구 목표
본 논문은 기존 이미지 토크나이저들이 재구성 및 압축에만 초점을 맞춰 객체 수준의 의미론적 구조보다는 국부적인 텍스처를 포착하는 한계를 해결하고자 합니다. 인간의 의사소통 방식에서 영감을 받아, 해석 가능하고 객체 중심적인 토큰 구조를 유도하며 구성적 일반화 및 관계 추론 능력을 크게 향상시키는 **구조화된 이산 시각 토큰 시퀀스** 학습 프레임워크인 **COMiT** 를 제안합니다.

## 핵심 방법론
**COMiT** 는 **어텐티브(attentive) 순차 토큰화** 방식을 사용하여, 인코더가 지역화된 이미지 크롭을 반복적으로 관찰하고 이산 잠재 메시지를 갱신합니다. 인코딩 및 디코딩은 단일 **트랜스포머 모델** 내에서 구현되며, **플로우 매칭(flow-matching) 재구성 손실** 과 **의미론적 표현 정렬 손실(SREPA)** 을 조합하여 엔드투엔드로 훈련됩니다. 특히, **SREPA** 는 사전 훈련된 **DINOv2** 모델로부터 고수준 특징을 증류하여 의미론적 기반을 강화합니다.

## 주요 결과
**COMiT** 는 **ImageNet100, MSCOCO, Visual Genome** 등 다양한 벤치마크에서 기존 1D 이산 이미지 인코더들을 일관되게 능가합니다. 특히, **COMiT-L 모델** 은 **ImageNet100** 에서 **85.80% top-1 정확도** 를 달성했으며, **MSCOCO** 에서 **45.31% top-5 정확도** , **Visual Genome** 에서 **56.42% top-1 정확도** 를 기록했습니다. 어텐티브 토큰화는 토큰-객체 정렬을 크게 개선하여 **mean mIoU 0.53** 을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 이미지 토큰화에 대한 새로운 패러다임을 제시하며, 단순히 압축을 넘어 **의미론적 구조와 해석 가능성** 을 우선시하는 접근 방식을 보여줍니다. 이는 객체 중심의 추론과 구성적 이해가 필수적인 **멀티모달 AI 시스템** 개발에 중요한 기여를 할 수 있습니다. **COMiT** 의 유연한 추론 시간 크롭핑 정책은 **적응형 및 태스크 의존적 시각 토큰화** 연구에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.