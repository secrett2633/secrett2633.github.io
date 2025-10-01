---
title: "[논문리뷰] Who's Your Judge? On the Detectability of LLM-Generated Judgments"
excerpt: "이 [arXiv]에 게시한 'Who's Your Judge? On the Detectability of LLM-Generated Judgments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-as-a-judge
  - Judgment Detection
  - Bias Quantification
  - Feature Engineering
  - Interpretability
  - Peer Review
  - AI Ethics
  - Evaluation

permalink: /ai/review/2025-10-1-Whos_Your_Judge_On_the_Detectability_of_LLM-Generated_Judgments/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25154)

**저자:** Dawei Li, Zhen Tan, Chengshuai Zhao, Bohan Jiang, Baixiang Huang, Pingchuan Ma, Abdullah Alnaibari, Kai Shu, Huan Liu



## 핵심 연구 목표
본 논문은 LLM이 생성한 평가(judgment)를 인간의 평가와 구별하는 **판단 탐지(judgment detection)** 태스크를 제안하고, 그 탐지 가능성을 체계적으로 조사하는 것을 목표로 합니다. 특히, 텍스트 피드백 없이 오직 평가 점수와 후보 콘텐츠만을 기반으로 LLM 생성 평가를 탐지하는 것이 중요하며, 이는 학술 심사 등 민감한 시나리오에서 평가의 공정성과 신뢰성을 보장하기 위함입니다.

## 핵심 방법론
제안된 **J-Detector**는 경량의 해석 가능한 신경망 탐지기로, **판단 본질적 특징(Judgment-Intrinsic Features)**과 **판단-후보 상호작용 특징(Judgment-Candidate Interaction Features)**을 모두 활용합니다. 상호작용 특징은 **LLM-강화 특징** (스타일 규칙성, 판단 정렬 차원, **Qwen-3-8B**로 추출) 및 **언어학적 특징** (길이, 어휘 다양성, 가독성, 통사론적 복잡성, 담화/헤징)을 명시적으로 추출하여 사용합니다. **RandomForest**, **LGBM**, **XGBoost** 같은 경량 분류기를 활용하여 효율성을 확보하고, 그룹 수준 집계를 통해 탐지 성능을 높입니다.

## 주요 결과
**J-Detector**는 **JD-Bench** 데이터셋 전반에서 기존 **SLM 기반 및 LLM 기반 모델**보다 훨씬 뛰어난 탐지 성능을 달성했습니다. 특히, 단일 차원 평가 시나리오에서 기존 방법론들이 약 **50-55% F1 스코어**를 기록하며 저조한 성능을 보인 반면, **J-Detector (XGBoost)**는 Helpsteer2 데이터셋에서 **99.8% F1 스코어**와 **100.0% AUROC**를 달성했습니다. 또한, 탐지 가능성은 **그룹 크기, 평가 차원 수, 평가 척도의 세분화**에 따라 크게 달라지며, **GPT-5-mini**나 **Claude-Haiku-3**와 같은 API 기반 모델이 오픈소스 모델보다 탐지하기 어렵다는 점을 밝혔습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 평가 시스템의 **공정성과 책임성**을 확보하기 위한 핵심적인 도구를 제공합니다. AI 실무자들은 **J-Detector**의 해석 가능성을 활용하여 LLM 평가자의 **복잡성, 신뢰도, 길이 편향**과 같은 체계적인 편향을 정량화하고 완화할 수 있습니다. 텍스트 기반 탐지기와 결합할 경우, AI 생성 심사 탐지에서 **99.3% F1 스코어**를 달성하여 실제 시나리오에서의 실용적 가치를 입증, 특히 텍스트 피드백이 부족한 상황에서 강력한 대안이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.