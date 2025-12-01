---
title: "[논문리뷰] ChartCap: Mitigating Hallucination of Dense Chart Captioning"
excerpt: "Gunhee Kim이 [arXiv]에 게시한 'ChartCap: Mitigating Hallucination of Dense Chart Captioning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chart Captioning
  - Hallucination Mitigation
  - Dataset Generation
  - Visual Language Models
  - Cycle Consistency
  - Reference-Free Metric
  - Data Visualization

permalink: /ai/review/2025-8-6-ChartCap-Mitigating-Hallucination-of-Dense-Chart-Captioning/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03164)

**저자:** Junyoung Lim, Jaewoo Ahn, Gunhee Kim



## 핵심 연구 목표
본 논문은 시각 언어 모델(VLMs)이 생성하는 차트 캡션의 **환각 현상(hallucination)을 줄이고 정보의 정확성 및 밀도를 높이는 것** 을 목표로 합니다. 기존 데이터셋의 외부 정보 포함 및 차트 유형별 핵심 정보 부족 문제를 해결하여, 모델이 차트 이미지로부터 직접 추론 가능한 고품질 캡션을 생성하도록 합니다.

## 핵심 방법론
저자들은 **565K 규모의 실세계 차트 이미지 데이터셋인 CHARTCAP** 을 구축했습니다. 이 데이터셋은 **유형별 캡션 스키마** 에 따라 구조적 요소와 핵심 통찰을 상세히 포함하며 외부 정보를 배제합니다. 캡션 생성을 위해 **GPT-4o** 및 **Claude 3.5 Sonnet** 을 활용한 **4단계 자동 파이프라인** 을 설계하고, **순환 일관성 기반의 인간 검증** 을 통해 데이터 품질을 확보했습니다. 또한, 캡션에서 차트를 재구성하고 원본 차트와 유사도를 측정하는 **참조-자유 지표인 Visual Consistency Score (VCS)** 를 제안했습니다.

## 주요 결과
**CHARTCAP** 은 기존 데이터셋 대비 가장 높은 **VCS (최대 0.9133)** 및 **OCRScore (최대 0.5424)** 를 달성하며, 이는 캡션이 원본 차트 정보를 가장 정확하게 재구성함을 보여줍니다. **CHARTCAP** 으로 미세 조정된 모델들은 **Claude 3.5 Sonnet** 을 포함한 오픈소스 및 상용 모델, 심지어 **인간 주석 캡션** 보다 높은 정확도와 정보성, 낮은 환각 현상을 보이는 캡션을 생성했습니다. 인간 평가에서 **Phi3.5-Vision-4BCHARTCAP** 이 모든 평가 기준에서 일관적으로 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
**CHARTCAP 데이터셋** 은 VLM이 차트를 더 정확하고 상세하게 이해하며 환각 없이 캡션을 생성하도록 훈련시키는 데 필수적인 고품질 자원을 제공합니다. 제안된 **VCS** 는 참조 캡션 없이도 생성된 차트 캡션의 심층적인 의미 품질을 평가할 수 있는 **강력하고 신뢰할 수 있는 자동 평가 지표** 로 활용될 수 있습니다. 이는 **데이터 시각화 AI 모델의 개발 및 평가 과정** 에 큰 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.