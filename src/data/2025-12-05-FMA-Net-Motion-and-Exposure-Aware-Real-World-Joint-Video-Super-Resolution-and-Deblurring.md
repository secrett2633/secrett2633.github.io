---
title: "[논문리뷰] FMA-Net++: Motion- and Exposure-Aware Real-World Joint Video Super-Resolution and Deblurring"
excerpt: "Munchurl Kim이 arXiv에 게시한 'FMA-Net++: Motion- and Exposure-Aware Real-World Joint Video Super-Resolution and Deblurring' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Super-Resolution
  - Video Deblurring
  - Joint Restoration
  - Exposure-Aware
  - Motion Compensation
  - Transformer Architecture
  - Dynamic Filtering
  - Real-World Degradations

permalink: /ai/review/2025-12-05-FMA-Net-Motion-and-Exposure-Aware-Real-World-Joint-Video-Super-Resolution-and-Deblurring/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04390)

**저자:** Geunhyuk Youk, Jihyong Oh, Munchurl Kim



## 핵심 연구 목표
본 논문은 실제 환경에서 발생하는 **동적으로 변화하는 노출** 과 **모션에 의한 복합적인 비디오 열화** 문제를 해결하여, 고해상도(HR) 및 선명한 비디오를 복원하는 것을 목표로 합니다. 기존 비디오 복원 방법론들이 고정된 노출 시간을 가정하여 실제 시나리오에 취약하다는 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **FMA-Net++** 는 **Hierarchical Refinement with Bidirectional Propagation (HRBP) 블록** 기반의 시퀀스 레벨 아키텍처를 사용하여 장거리 시간적 의존성을 효율적으로 모델링합니다. 각 HRBP 블록 내의 **Exposure Time-aware Modulation (ETM) 레이어** 는 프레임별 노출 정보에 따라 특징을 조절하며, **exposure-aware Flow-Guided Dynamic Filtering (FGDF) 모듈** 은 모션 및 노출에 따른 열화 커널을 추정합니다. 열화 학습과 복원 과정을 분리하여 **NetD** 는 열화 특성을 예측하고 **NetR** 은 이를 기반으로 복원을 수행합니다.

## 주요 결과
**FMA-Net++** 는 자체 제안한 **REDS-ME** 및 **REDS-RE** 벤치마크와 **GoPro** 데이터셋에서 기존 최첨단 방법론 대비 **최고 수준의 정확도와 시간적 일관성** 을 달성했습니다. 특히, REDS4-ME-5:4에서 **29.66 dB PSNR** 및 **0.8546 SSIM** 을 기록하여 차순위 모델보다 **0.62 dB** 높은 성능을 보였습니다. 또한, 유사한 복잡도를 가진 모델 대비 **5.2배** 빠른 추론 속도를 보여주며 효율성도 입증했습니다.

## AI 실무자를 위한 시사점
**FMA-Net++** 는 실제 카메라의 **동적 노출 변화** 로 인한 복합적인 비디오 열화를 효과적으로 처리하는 실용적인 솔루션을 제공합니다. **HRBP 아키텍처** 를 통해 높은 성능과 효율적인 병렬 처리가 가능하여 실제 AI 시스템 통합에 유리합니다. 또한, **ETM** 및 **exposure-aware FGDF** 와 같은 모듈 설계를 통해 외부 환경 요소를 명시적으로 모델링하는 것이 복원 품질 향상에 필수적임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.