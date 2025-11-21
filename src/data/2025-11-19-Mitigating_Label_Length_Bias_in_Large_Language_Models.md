---
title: "[논문리뷰] Mitigating Label Length Bias in Large Language Models"
excerpt: "Katharina von der Wense이 [arXiv]에 게시한 'Mitigating Label Length Bias in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Label Bias
  - Calibration
  - In-Context Learning
  - Text Classification
  - Multi-token Labels
  - Label Length Bias
  - Multiple Choice QA

permalink: /ai/review/2025-11-19-Mitigating_Label_Length_Bias_in_Large_Language_Models/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14385)

**저자:** Mario Sanz-Guerrero, Katharina von der Wense



## 핵심 연구 목표
논문은 대규모 언어 모델(LLMs)이 다중 토큰 클래스 레이블을 예측할 때 발생하는 **'레이블 길이 편향(label length bias)'** 문제를 해결하는 것을 목표로 합니다. 기존 캘리브레이션 기법들이 단일 토큰 레이블에 집중하여 전체 레이블의 확률을 간과하는 한계를 극복하고, 예측의 정확도와 신뢰도를 향상시키고자 합니다.

## 핵심 방법론
저자들은 새로운 캘리브레이션 방법인 **Normalized Contextual Calibration (NCC)**을 제안합니다. 이 방법은 먼저 각 레이블의 다중 토큰 확률을 해당 레이블의 토큰 수로 **정규화(geometric mean)**하여 길이 편향을 완화합니다. 그 후, **내용이 없는 입력(content-free inputs)**을 통해 산출된 사전 확률로 정규화된 확률을 나누어 LLM의 예측을 보정합니다.

## 주요 결과
**NCC**는 다양한 데이터셋과 모델에서 기존 방법론 대비 **최대 10% F1 스코어 향상**이라는 통계적으로 유의미한 성능 개선을 달성했습니다. 특히, **Llama 3.1 (8B) 모델**에서 few-shot 설정 시 평균 **7.6%**의 절대 Macro-F1 성능 향상을 보였습니다. 또한, **few-shot 예제 선택에 대한 민감도를 줄이고** 예측의 신뢰도를 향상시켜 **가장 낮은 예상 캘리브레이션 에러(ECE)**를 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 시스템에서 **다중 토큰 레이블 처리의 중요성**을 부각하며, **NCC**를 통해 예측의 **정확성과 신뢰성을 크게 향상**시킬 수 있음을 보여줍니다. 특히, 복잡한 레이블을 사용하는 텍스트 분류나 다지선다형 질의응답과 같은 실세계 애플리케이션에서 LLM의 편향을 줄이고 성능을 개선하는 데 실질적인 도움을 줄 수 있습니다. 이는 **적은 수의 in-context 예제로도 경쟁력 있는 성능**을 달성 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.