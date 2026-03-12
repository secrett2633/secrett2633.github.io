---
title: "[논문리뷰] V2M-Zero: Zero-Pair Time-Aligned Video-to-Music Generation"
excerpt: "arXiv에 게시된 'V2M-Zero: Zero-Pair Time-Aligned Video-to-Music Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-to-Music Generation
  - Temporal Alignment
  - Zero-Pair Learning
  - Rectified Flow Model
  - Diffusion Transformer
  - Event Curves
  - Modality Gap Mitigation

permalink: /ai/review/2026-03-12-V2M-Zero-Zero-Pair-Time-Aligned-Video-to-Music-Generation/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.11042)

**저자:** Yan-Bo Lin, Jonah Casebeer, Gedas Bertasius, Long Mai, Nicholas J. Bryan, Aniruddha Mahapatra



## 핵심 연구 목표
논문은 기존 Text-to-Music(T2M) 모델의 한계인 비디오 이벤트와의 **정밀한 시간 정렬 제어 부족** 문제를 해결하고, **V2M-ZERO** 라는 **Zero-Pair 비디오-투-음악 생성** 접근 방식을 제안합니다. 이는 대규모의 정렬된 비디오-음악 데이터 쌍 없이도 비디오의 시간적 역동성에 맞춰 음악을 생성하는 것을 목표로 합니다.

## 핵심 방법론
핵심 아이디어는 "무엇이 변하는지"보다 "언제, 얼마나 변하는지"에 초점을 맞춰 시간 동기화를 달성하는 것입니다. 이를 위해 사전 훈련된 음악 및 비디오 인코더를 사용하여 **인트라-모달 유사성(intra-modal similarity)** 에서 계산된 **이벤트 곡선(event curves)** 을 통해 공유된 시간 구조를 추출합니다. 학습 시에는 **Rectified Flow Diffusion Model** 을 **음악-이벤트 곡선** 으로 미세 조정하고, 추론 시에는 학습된 모델의 가중치를 고정한 채 **비디오-이벤트 곡선** 으로 대체하는 **제로-페어 스와핑(zero-pair swapping)** 전략을 사용합니다. **표준화, 리샘플링, Hann 윈도우 스무딩** 을 통해 모달리티 간 간극을 완화합니다.

## 주요 결과
**OES-Pub** , **MovieGenBench-Music** , **AIST++** 데이터셋에서 기존 쌍 데이터(paired-data) 기반 모델 대비 상당한 성능 향상을 달성했습니다. 구체적으로 **5-21% 더 높은 오디오 품질** , **13-15% 더 나은 의미론적 정렬** , **21-52% 향상된 시간 동기화** , 그리고 댄스 비디오에서는 **28% 더 높은 비트 정렬** 을 보였습니다. 대규모 크라우드 소스 주관적 청취 테스트에서도 유사한 결과가 확인되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **대규모 쌍 데이터 없이** 비디오-투-음악 생성을 가능하게 하여 **데이터 수집 및 라벨링 비용** 을 크게 절감할 수 있는 실용적인 솔루션을 제시합니다. **사전 훈련된 T2M 모델** 과 **기성 시각 인코더(DINOv2, CoTracker)** 를 활용하여 효율적인 전이 학습과 **도메인 특화 인코더 선택의 유연성** 을 제공하므로, 영화 음악, 광고, 소셜 미디어 콘텐츠 제작 등 다양한 애플리케이션에 빠르게 적용할 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.