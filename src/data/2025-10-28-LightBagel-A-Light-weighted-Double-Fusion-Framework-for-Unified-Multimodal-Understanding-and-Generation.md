---
title: "[논문리뷰] LightBagel: A Light-weighted, Double Fusion Framework for Unified
  Multimodal Understanding and Generation"
excerpt: "Chaorui Deng이 arXiv에 게시한 'LightBagel: A Light-weighted, Double Fusion Framework for Unified
  Multimodal Understanding and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Multimodal Models
  - Double Fusion
  - Lightweight AI
  - Text-to-Image Generation
  - Image Editing
  - Model Architecture
  - Efficient Training
  - Cross-modal Interaction

permalink: /ai/review/2025-10-28-LightBagel-A-Light-weighted-Double-Fusion-Framework-for-Unified-Multimodal-Understanding-and-Generation/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22946)

**저자:** Zeyu Wang, Zilong Chen, Chenhui Gou, Feng Li, Chaorui Deng, Deyao Zhu, Kunchang Li, Weihao Yu, Haoqin Tu, Haoqi Fan, Cihang Xie



## 핵심 연구 목표
본 논문은 기존의 선도적인 통합 멀티모달 모델(UMM)들이 상당한 계산 자원과 학습 비용을 요구한다는 문제에 주목합니다. 이를 해결하기 위해, 이해(Understanding)와 생성(Generation)에 특화된 공개 모델들을 전략적으로 통합하여, 훨씬 적은 훈련 토큰으로도 경쟁력 있는 성능을 달성하는 효율적이고 경량화된 UMM 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
핵심은 **Double Fusion** 이라는 새로운 메커니즘으로, 기존의 강력한 **VLM(QWen2.5-VL-7B)** 과 **DiT(Wan2.2-TI2V-5B)** 블록을 그대로 유지하면서, 각 블록 사이에 **영점 초기화된 멀티모달 Self-Attention 블록** 을 삽입합니다. 이 설계를 통해 고수준 의미론적 표현과 저수준 공간 신호의 시너지적 융합을 촉진하며, 데이터 품질, 작업 균형, 다양성을 강조한 약 **4500만 개의 샘플** 로 구성된 큐레이션된 데이터셋으로 **약 350억 개의 토큰** 만으로 훈련을 수행했습니다.

## 주요 결과
LIGHTBAGEL은 **GenEval** 에서 **0.91** , **DPG-Bench** 에서 **82.16** 의 강력한 텍스트-이미지 생성 성능을 달성했습니다. 또한, 이미지 편집 벤치마크인 **GEditBench** 에서 **6.06** , **ImgEdit-Bench** 에서 **3.77** 을 기록하며 State-of-the-Art 수준의 결과를 보여주었습니다. 특히, 이전 선도 모델들이 수십 배 많은 토큰으로 훈련된 것에 비해 **약 350억 개의 토큰** 만으로 이러한 성능을 달성하여 뛰어난 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**Double Fusion** 접근 방식은 기존의 강력한 사전 훈련 모델들을 재활용하여 **UMM 구축 시간과 비용을 크게 절감** 할 수 있음을 보여줍니다. 이 경량화된 프레임워크는 **제한된 컴퓨팅 자원을 가진 환경** 에서도 고성능 멀티모달 모델 개발을 가능하게 합니다. 이해와 생성 경로의 깊은 상호작용은 **정밀한 이미지 편집** 및 **다양한 멀티모달 태스크** 에서 유연한 제어를 제공하며, 전체 코드, 모델 가중치, 데이터셋의 공개는 실무 적용 및 후속 연구에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.