---
title: "[논문리뷰] A Survey on Large Language Model Benchmarks"
excerpt: "Siyi Li이 [arXiv]에 게시한 'A Survey on Large Language Model Benchmarks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Benchmarks
  - Evaluation
  - Systematic Review
  - General Capabilities
  - Domain-Specific Benchmarks
  - Target-Specific Benchmarks
  - Data Contamination
  - AI Ethics

permalink: /ai/review/2025-8-22-A_Survey_on_Large_Language_Model_Benchmarks/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15361)

**저자:** Siyi Li, Xuanang Chen, Shuaimin Li, Guhong Chen, Shiwen Ni



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 평가 벤치마크의 현재 상태와 발전 과정을 체계적으로 검토하고, 기존 벤치마크의 한계를 분석하며, 향후 벤치마크 혁신을 위한 설계 패러다임을 제시하는 것을 목표로 합니다. LLM의 기능 측정과 기술 혁신 촉진이라는 핵심 역할을 하는 벤치마크의 중요성을 강조합니다.

## 핵심 방법론
연구팀은 **283개의 대표적인 LLM 벤치마크**를 분석하고 **일반 역량(General Capabilities)**, **도메인 특화(Domain-Specific)**, **목표 특화(Target-Specific)** 세 가지 범주로 분류했습니다. 각 벤치마크의 **설계 동기**, **데이터 출처**, **형식**, **데이터 양**, **평가 방법론** 및 **평가 지표**를 다각적으로 검토하여 포괄적인 개요를 제공합니다.

## 주요 결과
이 조사를 통해 **283개 벤치마크**의 분류 및 분석이 이루어졌습니다. 현재 LLM 벤치마크가 직면한 세 가지 주요 문제점, 즉 **데이터 오염**으로 인한 점수 부풀리기, **문화적 및 언어적 편향**으로 인한 불공정한 평가, 그리고 "**프로세스 신뢰성**" 및 "**동적 환경**" 평가의 부족을 지적했습니다. 이러한 한계점을 극복하기 위한 새로운 설계 패러다임을 제시합니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 현재 벤치마크 점수를 해석할 때 **데이터 오염**과 **문화적/언어적 편향** 가능성을 염두에 두어야 합니다. LLM의 **일반화 능력**을 정확히 측정하기 위해 **동적이고 오염에 강한 벤치마크**의 필요성을 인식하고, 모델의 **신뢰성, 안전성, 에이전트 능력**을 종합적으로 평가하는 시스템 구축에 기여할 수 있습니다. 이는 LLM의 **책임 있는 배포**와 발전에 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.