---
title: "[논문리뷰] CHURRO: Making History Readable with an Open-Weight Large
  Vision-Language Model for High-Accuracy, Low-Cost Historical Text Recognition"
excerpt: "이 [arXiv]에 게시한 'CHURRO: Making History Readable with an Open-Weight Large
  Vision-Language Model for High-Accuracy, Low-Cost Historical Text Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Historical Text Recognition
  - Vision-Language Model
  - Open-Weight Model
  - OCR
  - Cultural Heritage
  - Low-Cost AI
  - Dataset Curation
  - Fine-tuning

permalink: /ai/review/2025-9-29-CHURRO_Making_History_Readable_with_an_Open-Weight_Large_Vision-Language_Model_for_High-Accuracy_Low-Cost_Historical_Text_Recognition/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19768)

**저자:** Sina J. Semnani, Han Zhang, Xinyan He, Merve Tekgürler, Monica S. Lam



## 핵심 연구 목표
본 연구는 역사 문서의 텍스트 인식 정확도를 높이고 비용을 절감하기 위해 **오픈-웨이트 대규모 비전-언어 모델(VLM)**인 **CHURRO**를 개발하는 것을 목표로 합니다. 기존 VLM이 현대 표준화된 텍스트에 주로 맞춰져 있어, 다양한 언어, 필체, 불규칙한 레이아웃, 그리고 손상이 잦은 역사 자료 인식에 비효율적인 문제를 해결하고자 합니다.

## 핵심 방법론
연구팀은 **3B-파라미터 오픈-웨이트 VLM**인 **Qwen 2.5 VL**을 기반으로 **CHURRO**를 개발했습니다. 이 모델은 현재까지 가장 크고 다양한 역사 텍스트 인식 데이터셋인 **CHURRO-DS**를 활용하여 파인튜닝되었습니다. **CHURRO-DS**는 155개 역사 자료(99,491페이지, 46개 언어 클러스터)를 통합하고 정제하여 구축되었으며, 평가는 **정규화된 레벤슈타인 유사도**와 비용 효율성으로 진행되었습니다.

## 주요 결과
**CHURRO**는 **CHURRO-DS 테스트 세트**에서 인쇄물 **82.3%**, 필기체 **70.1%**의 정규화된 레벤슈타인 유사도를 달성하여 모든 VLM 중 최고 성능을 기록했습니다. 이는 두 번째로 우수한 **Gemini 2.5 Pro**를 인쇄물에서 **1.4%**, 필기체에서 **6.5%** 앞서는 결과이며, 동시에 **15.5배 더 비용 효율적**입니다. 파인튜닝을 통해 기본 **Qwen 2.5 VL (3B)** 대비 인쇄물에서 **14.5%**, 필기체에서 **27.2%**의 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
**CHURRO**의 공개는 역사 문서 OCR 분야에서 **오픈-웨이트 모델의 잠재력**과 **낮은 비용으로 고정밀 달성 가능성**을 시사합니다. 이는 AI/ML 엔지니어들이 대규모 독점 모델에 의존하지 않고도 문화유산 데이터에 접근하고 처리할 수 있는 강력한 도구를 제공합니다. 또한, 범용 VLM의 한계를 넘어서는 **도메인 특화 데이터셋**과 **전략적 파인튜닝**의 중요성을 강조하며, 이는 다양한 니치 도메인에서 AI 모델을 최적화하는 데 귀중한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.