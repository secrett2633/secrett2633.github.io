---
title: "[논문리뷰] Does DINOv3 Set a New Medical Vision Standard?"
excerpt: "Bailiang Jian이 [arXiv]에 게시한 'Does DINOv3 Set a New Medical Vision Standard?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Medical Imaging
  - Foundation Models
  - DINOv3
  - Self-Supervised Learning
  - Vision Transformer
  - 2D/3D Classification
  - Segmentation
  - Domain Adaptation
  - Scaling Laws

permalink: /ai/review/2025-9-9-Does-DINOv3-Set-a-New-Medical-Vision-Standard/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06467)

**저자:** Che Liu, Yinda Chen, Haoyuan Shi, Jinpeng Lu, Bailiang Jian, Jiazhen Pan, Linghan Cai, Jiayi Wang, Yundi Zhang, Jun Li, Cosmin I. Bercea, Cheng Ouyang, Chen Chen, Zhiwei Xiong, Benedikt Wiestler, Christian Wachinger, Daniel Rueckert, Wenjia Bai, Rossella Arcucci



## 핵심 연구 목표
본 연구는 자연 이미지로만 사전 훈련된 최신 Self-Supervised Vision Transformer인 **DINOv3**가 도메인 특화된 사전 훈련 없이 의료 영상 태스크에서 강력하고 통합된 인코더로 활용될 수 있는지 종합적으로 평가하는 것을 목표로 합니다. 다양한 의료 영상 양상 및 태스크에 걸쳐 **DINOv3**의 전이 가능성과 성능 한계를 탐구하고자 합니다.

## 핵심 방법론
연구진은 **DINOv3**의 세 가지 모델 크기(**DINOv3-S, DINOv3-B, DINOv3-L**)를 사용하여 **2D/3D 분류** 및 **세그멘테이션** 태스크에서 성능을 벤치마킹했습니다. **X-ray, WSI, EM, CT, MRI, PET** 등 다양한 의료 영상 모달리티에 걸쳐 실험을 진행했으며, 특히 3D 태스크에서는 **slice-wise feature extraction** 후 **선형 프로빙(linear probing)** 또는 **k-NN**을 사용했습니다. 또한 모델 크기와 입력 해상도 변화에 따른 **스케일링 동작**을 체계적으로 분석했습니다.

## 주요 결과
**DINOv3**는 **NIH-14** 및 **RSNA-Pneumonia 2D 흉부 X-ray 분류**, **CT-RATE 3D CT 분류** 등 일부 의료 태스크에서 인상적인 성능을 보였으며, 일부 경우 **BiomedCLIP**이나 **CT-Net**과 같은 의료 특화 모델을 능가했습니다 (**CT-RATE**에서 **DINOv3-B**는 **0.798 AUC**로 **CT-CLIP**의 **0.731**을 능가). 그러나 **WSI 분류**, **EM 신경 세그멘테이션**, **PET/CT 종양 세그멘테이션**과 같이 도메인 전환이 큰 모달리티에서는 성능이 크게 저하되었습니다. 또한, 자연 이미지에서 관찰되는 **스케일링 법칙**이 의료 도메인에서는 일관되게 적용되지 않아, 더 큰 모델이나 고해상도가 항상 더 나은 성능을 보장하지 않는다는 사실을 발견했습니다 (**NIH-14**에서 **AUC**는 **512x512 해상도**에서 최고점을 기록).

## AI 실무자를 위한 시사점
**DINOv3**는 **CT** 및 **X-ray**와 같이 시각적 특성이 자연 이미지와 유사한 의료 영상 태스크에서 강력한 기본 인코더로 활용될 수 있음을 시사하며, 도메인 특화 사전 훈련의 필요성을 줄일 수 있습니다. 하지만 **WSI**, **EM**, **PET**와 같이 도메인 특화된 미세한 시각적 특징이 중요한 경우, **DINOv3**만으로는 한계가 명확하므로 도메인 특화 모델이나 **파라미터 효율적인 미세 조정(parameter-efficient fine-tuning)** 기법의 적용이 여전히 중요합니다. 의료 AI 개발 시 모델 스케일링이 항상 성능 향상으로 이어지지 않으므로, 무분별한 모델 확장보다는 **태스크와 모달리티에 맞는 신중한 접근**과 평가가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.