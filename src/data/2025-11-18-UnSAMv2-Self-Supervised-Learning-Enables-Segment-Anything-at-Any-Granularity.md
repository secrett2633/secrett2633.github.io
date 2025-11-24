---
title: "[논문리뷰] UnSAMv2: Self-Supervised Learning Enables Segment Anything at Any Granularity"
excerpt: "이 [arXiv]에 게시한 'UnSAMv2: Self-Supervised Learning Enables Segment Anything at Any Granularity' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Supervised Learning
  - Segmentation
  - Granularity Control
  - SAM
  - Foundation Models
  - Unsupervised Learning
  - Image Segmentation
  - Video Segmentation

permalink: /ai/review/2025-11-18-UnSAMv2-Self-Supervised-Learning-Enables-Segment-Anything-at-Any-Granularity/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13714)

**저자:** Junwei Yu, Trevor Darrell, XuDong Wang



## 핵심 연구 목표
본 논문은 기존 **Segment Anything Model (SAM)** 계열의 모델들이 가지는 세분화(granularity) 제어의 한계를 극복하고, 인간의 주석 없이 **모든 세분화 수준에서 연속적이고 제어 가능한 객체 분할**을 가능하게 하는 것을 목표로 합니다. 사용자가 단일 점 프롬프트와 연속적인 세분화 점수를 통해 미세한 부분부터 전체 객체까지 유연하게 정의하고 분할할 수 있도록 합니다.

## 핵심 방법론
**SAM-2**를 기반으로 **Divide-and-Conquer pseudo-labels**를 활용한 **자율 학습 훈련 파이프라인**을 도입했습니다. 구체적으로, **MaskCut**을 통한 인스턴스 발견 후 재귀적인 병합으로 계층적 의사 레이블을 생성하고, 각 마스크에 연속적인 **세분화 스칼라**를 할당합니다. 또한, **SAM-2** 디코더에 **경량의 세분화 인코더** (Fourier embedding과 MLP 조합)와 **세분화 인지 마스크 토큰**을 추가하여 세분화 제어 기능을 통합했으며, 단 **6,000개의 레이블 없는 이미지**와 **LoRA** 기반 **0.02%의 추가 파라미터**로 훈련되었습니다.

## 주요 결과
**UNSAMv2**는 대화형, 전체 이미지 및 비디오 분할 작업에서 **SAM-2**와 이전 SOTA(State-Of-The-Art) 방법론을 능가하는 최첨단 성능을 달성했습니다. 특히, **NoC90** 지표를 **5.69에서 4.75**로, **1-IoU**를 **58.0에서 73.1**로, **AR1000**을 **49.6에서 68.3**로 크게 개선했습니다. 이는 레이블 없는 데이터만으로도 모델이 풍부한 세분화 계층 구조를 학습할 수 있음을 입증합니다.

## AI 실무자를 위한 시사점
**UNSAMv2**는 인간의 개입 없이도 정밀한 세분화 제어를 통해 객체 분할을 수행할 수 있게 함으로써 AI 실무자들에게 **유연하고 효율적인 도구**를 제공합니다. **소량의 레이블 없는 데이터**와 **경량의 추가 파라미터**만으로도 강력한 성능 향상을 이뤄내, **자율 학습 기반 비전 기초 모델**의 잠재력과 확장성을 보여줍니다. 이는 다양한 비전 애플리케이션에서 수동적인 마스크 조정의 필요성을 줄이고, 복잡한 계층 구조 분석을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.