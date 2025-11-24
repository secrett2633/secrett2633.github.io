---
title: "[논문리뷰] FineVision: Open Data Is All You Need"
excerpt: "이 [arXiv]에 게시한 'FineVision: Open Data Is All You Need' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Datasets
  - VLM
  - Data Curation
  - Data Hygiene
  - De-duplication
  - Human-in-the-loop
  - GUI Automation
  - Test-set Decontamination

permalink: /ai/review/2025-10-21-FineVision-Open-Data-Is-All-You-Need/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17269)

**저자:** Luis Wiedmann, Leandro von Werra, Orr Zohar, Amir Mahla, Xiaohan Wang, Rui Li, Thibaud Frere, Aritra Roy Gosthipaty, Andrés Marafioti



## 핵심 연구 목표
파편화되고 일관성 없으며 오염된 공개 데이터셋으로 인해 저해되는 Vision-Language Model (VLM) 연구의 한계를 극복하는 것이 목표입니다. 특히, 대규모의 고품질 데이터셋 부재로 인해 발생하는 폐쇄형 모델과 공개형 모델 간의 성능 격차를 줄이고, 데이터 중심 VLM 연구를 가속화할 수 있는 신뢰할 수 있는 기반을 제공하고자 합니다.

## 핵심 방법론
이 연구는 **200개 이상의 원천 데이터**를 **185개 하위 데이터셋**으로 통합하는 **반자동(semi-automated) 휴먼-인-더-루프(human-in-the-loop) 큐레이션 파이프라인**을 개발했습니다. 이 파이프라인은 **벌크 데이터 수집 및 스키마 매핑**, **오염된 이미지 및 텍스트 제거**, **엄격한 중복 제거(de-duplication)** 및 **테스트셋 오염 방지(decontamination)**를 포함하며, 이를 위해 **SSCD 임베딩**과 **LLM/VLM-as-a-judge**(**Qwen3-32B**, **Qwen2.5VL-32B-Instruct**)를 활용합니다. 또한, GUI 데이터에 대한 **통합 액션 스페이스**를 정의하여 에이전트 작업 기능을 확장합니다.

## 주요 결과
FineVision은 **2,400만 개 샘플**, **1,700만 개 이미지**, **8,900만 턴**, **95억 개 답변 토큰**으로 구성된 최대 규모의 공개 VLM 데이터셋입니다. FineVision으로 훈련된 모델은 기존 공개 데이터셋 대비 탁월한 성능을 보였는데, The Cauldron 대비 **40.7%**, Cambrian-1 대비 **12.1%**, LLaVA-OneVision 대비 **46.3%**의 평균 절대 점수 향상을 달성했습니다. 또한, FineVision의 오염률은 **1.02%**로 기존 데이터셋의 **2.15-3.05%**보다 현저히 낮았으며, 오염 제거 후 성능 저하도 **1.6 pp**로 가장 낮았습니다.

## AI 실무자를 위한 시사점
FineVision은 AI/ML 엔지니어 및 데이터 과학자에게 VLM 훈련 및 평가를 위한 **대규모, 고품질, 위생적인 데이터셋**을 제공합니다. 이는 특히 **데이터 중심 VLM 연구**와 **GUI 자동화와 같은 새로운 에이전트 작업** 개발에 중요한 기반이 될 것입니다. 이 데이터셋의 공개는 데이터 품질과 큐레이션의 중요성을 강조하며, 향후 VLM 개발 및 응용의 잠재력을 크게 확장할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.