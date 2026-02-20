---
title: "[논문리뷰] Learning Image-based Tree Crown Segmentation from Enhanced Lidar-based Pseudo-labels"
excerpt: "Xiaowei Yu이 arXiv에 게시한 'Learning Image-based Tree Crown Segmentation from Enhanced Lidar-based Pseudo-labels' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Instance Segmentation
  - Tree Crown Delineation
  - Remote Sensing
  - Lidar Data
  - Multispectral Imagery
  - Pseudo-labeling
  - Segment Anything Model (SAM)
  - Deep Learning

permalink: /ai/review/2026-02-16-Learning-Image-based-Tree-Crown-Segmentation-from-Enhanced-Lidar-based-Pseudo-labels/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.13022)

**저자:** Julius Pesonen, Stefan Rua, Josef Taher, Niko Koivumäki, Xiaowei Yu, Eija Honkavaara



## 핵심 연구 목표
본 연구는 항공 이미지에서 나무 수관을 자동으로 분할하고 구분하는 데 있어 텍스처 및 부분적 겹침으로 인한 어려움을 해결하고자 합니다. 특히, 수동 라벨링 비용 없이 **ALS(Aerial Laser Scanning) 데이터** 에서 파생된 유사 라벨을 활용하여 **RGB 및 다중 스펙트럼 이미지 기반 딥러닝 모델** 을 훈련하고, 이를 통해 기존 범용 모델보다 뛰어난 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
초기 유사 라벨은 **저해상도 ALS 데이터** 에서 **Canopy Height Model(CHM)** 을 기반으로 **가변 창 워터쉐드 분할(variable-window watershed segmentation)** 을 통해 생성되었습니다. 이 거친 라벨은 **SAM 2 (Segment Anything Model 2)** 를 사용하여 정제되었으며, SAM 2에는 거친 라벨의 바운딩 박스를 쿼리로 제공했습니다. 최종적으로, **Mask R-CNN 모델** 에 **ImageNet 사전 훈련된 ResNet-50-FPN 백본** 을 사용하여 **RGB, RGB+NIR** 등 다중 스펙트럼 이미지에 대해 훈련시켰습니다.

## 주요 결과
제안된 방법은 모든 기존 베이스라인 모델을 크게 능가하는 성능을 보였습니다. 특히, **SAM 2로 강화된 유사 라벨** 을 사용하고 **RGB NIR 입력** 으로 훈련된 모델은 테스트 데이터셋에서 **F1 스코어 0.778** , **Precision 0.783** , **Recall 0.772** , **mIoU 0.621** 을 달성했습니다. 이는 가장 뛰어난 베이스라인인 **Detectree2 (Flexi checkpoint)** 의 **F1 0.556, mIoU 0.324** 에 비해 상당한 개선을 보여줍니다. **SAM 2** 를 통한 라벨 강화는 모든 입력 양식에서 모델 성능을 일관되게 향상시켰습니다.

## AI 실무자를 위한 시사점
이 연구는 **ALS 데이터** 와 **SAM 2** 의 융합을 통해 **수동 라벨링 없이 고품질의 나무 수관 인스턴스 분할 데이터셋** 을 구축하는 효율적인 전략을 제시합니다. 이는 **도시 산림 인벤토리** 및 **산림 건강 모니터링** 와 같은 AI 응용 분야에서 비용 효율적인 모델 훈련을 가능하게 합니다. 특히, **근적외선(NIR) 밴드** 를 포함한 다중 스펙트럼 데이터의 활용이 모델 성능 향상에 기여함을 입증하여, 센서 융합의 중요성을 강조합니다. 다만, 모델의 **전이성** 및 **겹치는 마스크 처리** 는 향후 연구를 통해 개선될 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.