---
title: "[논문리뷰] AgroBench: Vision-Language Model Benchmark in Agriculture"
excerpt: "Yoshitaka Ushiku이 [arXiv]에 게시한 'AgroBench: Vision-Language Model Benchmark in Agriculture' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Agriculture
  - Benchmarking
  - Disease Identification
  - Pest Management
  - Crop Management
  - Agronomy

permalink: /ai/review/2025-8-3-AgroBench-Vision-Language-Model-Benchmark-in-Agriculture/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.20519)

## AgroBench: Vision-Language Model Benchmark in Agriculture

**저자:** Risa Shinoda, Nakamasa Inoue, Hirokatsu Kataoka, Masaki Onishi, Yoshitaka Ushiku

**키워드:** `Vision-Language Models`, `Agriculture`, `Benchmarking`, `Disease Identification`, `Pest Management`, `Crop Management`, `Agronomy`

## 핵심 연구 목표
본 논문은 농업 분야에서 **Vision-Language Model (VLM)** 의 광범위한 지식과 실제 적용 가능성을 평가하기 위한 포괄적인 벤치마크 데이터셋인 **AgroBench** 를 구축하는 것을 목표로 합니다. 기존 농업 VLM 벤치마크의 부족한 범주 다양성과 합성 데이터 의존성이라는 한계를 극복하고자 합니다.

## 핵심 방법론
**AgroBench** 는 7가지 농업 관련 작업(예: **질병 식별 (DID)** , **해충 식별 (PID)** , **작물 관리 (CMN)** )을 포함하며, **203개 작물 유형** , **682개 질병 범주** , **134개 해충 범주** , **108개 잡초 범주** 를 포함한 광범위한 전문가 주석 데이터를 활용합니다. 총 **4,342개 질의응답(QA) 쌍** 과 **3,745개의 실제 농장 이미지** 를 기반으로 하며, **GPT-4o** , **Gemini 1.5-Pro** 와 같은 폐쇄형 VLM 및 다양한 오픈소스 VLM을 평가하여 성능을 분석했습니다.

## 주요 결과
평가 결과, **GPT-4o 모델** 이 **종합 정확도 73.45%** 로 가장 우수한 성능을 보였으며, 오픈소스 VLM과 인간 기준선을 능가했습니다. 그러나 **잡초 식별 (WID)** 작업은 대부분의 VLM이 무작위 추측 수준에 가까운 성능을 보여 ( **Gemini 1.5-Pro** 가 가장 높게 **55.17%** 기록) 가장 어려운 과제로 나타났습니다. 오류 분석 결과, VLM 실패의 주요 원인은 **지식 부족 (51.92%)** 과 **인지 오류 (32.69%)** 로 밝혀졌습니다.

## AI 실무자를 위한 시사점
**AgroBench** 는 VLM이 농업 분야의 미세한 식별 작업, 특히 **잡초 및 질병 식별** 에서 개선의 여지가 크다는 것을 보여줍니다. 이는 **도메인 특화된 농업 지식** 을 VLM에 더 많이 학습시키고, **시각적 인지 능력** 을 향상시키는 연구 방향을 제시합니다. 이 벤치마크는 실제 농업 문제 해결을 위한 VLM 개발 및 적용에 중요한 기반 자료가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
