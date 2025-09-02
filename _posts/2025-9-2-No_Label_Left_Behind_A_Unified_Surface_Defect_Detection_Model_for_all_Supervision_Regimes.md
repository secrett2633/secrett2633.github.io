---
title: "[논문리뷰] No Label Left Behind: A Unified Surface Defect Detection Model for all
  Supervision Regimes"
excerpt: "Danijel Skočaj이 [arXiv]에 게시한 'No Label Left Behind: A Unified Surface Defect Detection Model for all
  Supervision Regimes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Surface Defect Detection
  - Anomaly Detection
  - Mixed Supervision
  - Deep Learning
  - Industrial Inspection
  - Unified Model

permalink: /ai/review/2025-9-2-No_Label_Left_Behind_A_Unified_Surface_Defect_Detection_Model_for_all_Supervision_Regimes/

toc: true
toc_sticky: true

date: 2025-09-02 13:01:41+0900
last_modified_at: 2025-09-02 13:01:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19060)

**저자:** Blaž Rolih, Matic Fučka, Danijel Skočaj



## 핵심 연구 목표
본 논문은 기존 표면 결함 감지 모델들이 특정 감독 시나리오에 제한되거나 다양한 데이터 주석 유형(비지도, 약지도, 혼합, 완전 지도)에 적응하기 어려운 문제를 해결하고자 합니다. 모든 감독 체제에서 사용 가능한 모든 데이터 주석을 효과적으로 활용할 수 있는 **통합된(unified)**, 고성능, 효율적이고 적응 가능한 **표면 결함 감지 모델 SuperSimpleNet**을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**SuperSimpleNet**은 **SimpleNet**을 기반으로 구축되었으며, 핵심적으로 **새로운 합성 이상(anomaly) 생성 프로세스**를 도입합니다. 이 프로세스는 **바이너리화된 Perlin 노이즈 마스크(binarised Perlin noise mask)**를 사용하여 특징 레벨에서 **Gaussian 노이즈**를 비정상 영역에 제한적으로 적용함으로써 현실적인 이상을 생성합니다. 또한, **향상된 분류 헤드(enhanced classification head)**를 포함하여 글로벌 컨텍스트를 효과적으로 캡처하며, **Truncated L1 손실(truncated L1 loss)** 및 **Focal 손실(focal loss)**, 그리고 이미지 레이블에 따라 조정되는 제어 항 `γ`를 활용하는 **개선된 학습 절차**를 통해 모든 감독 시나리오에 걸쳐 효율적인 훈련을 가능하게 합니다.

## 주요 결과
**SuperSimpleNet**은 모든 감독 시나리오에서 탁월한 성능을 달성했습니다. 완전 지도 설정에서 SensumSODF 데이터셋에서 **98.0% AUROC**, KSDD2 데이터셋에서 **97.8% APdet**를 기록하며 최신 기술(SOTA)을 능가했습니다. 비지도 이상 감지에서는 MVTec AD에서 **98.3% AUROC**, VisA에서 **93.6% AUROC**를 달성하며 SOTA 성능에 필적했습니다. 특히, **9.5 ms 미만의 추론 시간**과 초당 **262 이미지의 처리량**을 달성하여 매우 빠른 속도를 보여주었습니다.

## AI 실무자를 위한 시사점
**SuperSimpleNet**은 다양한 주석 수준의 데이터를 통합 학습하여 산업 환경의 복잡한 요구 사항을 충족하는 실용적인 솔루션을 제공합니다. **합성 이상 생성 전략**은 실제 이상 데이터가 부족한 시나리오에서도 모델의 강건성과 일반화 성능을 크게 향상시키므로, 제한된 레이블 데이터 환경에서 모델을 훈련해야 하는 AI/ML 엔지니어에게 매우 유용합니다. 또한, **9.5ms의 빠른 추론 속도**는 실시간 산업 검사 시스템에 직접 적용 가능한 수준의 효율성을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.