---
title: "[논문리뷰] P3-SAM: Native 3D Part Segmentation"
excerpt: "Yunhan Yang이 arXiv에 게시한 'P3-SAM: Native 3D Part Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Part Segmentation
  - Point Cloud Segmentation
  - Prompt-based Segmentation
  - Deep Learning
  - Transformer
  - Interactive Segmentation
  - Automatic Segmentation
  - Native 3D

permalink: /ai/review/2025-9-11-P3-SAM-Native-3D-Part-Segmentation/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06784)

**저자:** Changfeng Ma, Yang Li, Xinhao Yan, Jiachen Xu, Yunhan Yang, Chunshi Wang, Zibo Zhao, Yanwen Guo, Zhuo Chen, Chunchao Guo



## 핵심 연구 목표
본 논문은 기존 3D 파트 분할 방법론의 한계, 특히 복잡한 객체에 대한 **불충분한 견고성** 과 **완전한 자동화의 부재** 를 극복하고자 합니다. 2D SAM 기반의 리프팅 방식이 겪는 **3D 일관성 부족** 및 **경계 부정확성** 문제를 해결하고, 어떤 3D 객체든 정밀하게 구성 요소로 분할하는 **완전 자동화된 3D 점-프롬프트 가능 파트 분할 모델** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **P3-SAM** 은 **Sonata** ( **Point Transformer V3** )를 기반으로 하는 **특징 추출기** , **다중 분할 헤드** , 그리고 **IoU 예측기** 로 구성됩니다. 모델은 **하나의 긍정적인 점 프롬프트** 만 사용하여 다양한 스케일의 마스크를 예측하고 최적의 마스크를 선택합니다. 완전 자동화를 위해 **FPS (Farthest Point Sampling)** 로 프롬프트 점을 샘플링하고, 예측된 마스크를 **NMS (Non-Maximum Suppression)** 로 병합한 뒤 **Flood Fill 알고리즘** 으로 최종 마스크를 생성합니다. 모델은 자체 구축한 **3.7백만 개 모델** 데이터셋으로 학습됩니다.

## 주요 결과
P3-SAM은 다양한 벤치마크 데이터셋에서 **최첨단 성능** 을 달성했습니다. **PartObj-Tiny** 데이터셋에서 연결성 없는 분할에서 **평균 IoU 59.88%** , 연결성 있는 분할에서 **81.14%** , 대화형 분할에서 **51.23%** 를 기록했습니다. 특히, **PartObj-Tiny-WT** 데이터셋의 완전 자동 분할(연결성 없음)에서는 **58.10%** 를 달성하여 기존 방법들을 능가하며, **복잡한 객체와 상세한 기하학적 형태** 에 대해 뛰어난 정밀도와 견고성을 입증했습니다.

## AI 실무자를 위한 시사점
P3-SAM은 3D 파트 분할에서 **2D 모델 의존성을 탈피** 하고 순수한 **3D 네이티브 방식의 가능성** 을 제시합니다. 특히 **자동화된 파트 분할 파이프라인** 은 수작업 개입 없이 대규모 3D 자산 처리 자동화에 크게 기여할 수 있습니다. **정밀한 마스크 예측** 과 **강력한 견고성** 은 3D 모델링, 시뮬레이션, 증강 현실 등 다양한 산업 응용 분야에서 3D 콘텐츠 생성 및 이해를 크게 향상시킬 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.