---
title: "[논문리뷰] When Models Lie, We Learn: Multilingual Span-Level Hallucination
  Detection with PsiloQA"
excerpt: "Artem Vazhentsev이 [arXiv]에 게시한 'When Models Lie, We Learn: Multilingual Span-Level Hallucination
  Detection with PsiloQA' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hallucination Detection
  - Multilingual LLMs
  - Span-Level Annotation
  - Synthetic Data Generation
  - Question Answering (QA)
  - Encoder Models
  - Uncertainty Quantification
  - GPT-4o

permalink: /ai/review/2025-10-17-When-Models-Lie-We-Learn-Multilingual-Span-Level-Hallucination-Detection-with-PsiloQA/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04849)

**저자:** Elisei Rykov, Kseniia Petrushina, Maksim Savkin, Valerii Olisov, Artem Vazhentsev, Kseniia Titova, Alexander Panchenko, Vasily Konovalov, Julia Belikova



## 핵심 연구 목표
대규모 언어 모델(LLM)의 안전하고 신뢰할 수 있는 배포를 위한 핵심 과제인 환각(hallucination) 탐지를 목표로 합니다. 특히 기존 벤치마크가 시퀀스 수준에 머무르고 영어에 국한되어 미세하고 다국어적인 환각 감지 감독이 부족하다는 한계를 극복하기 위해, **PsiloQA** 라는 대규모 다국어 스팬 수준 환각 데이터셋을 제안하고 이를 통해 다양한 탐지 방법론을 평가합니다.

## 핵심 방법론
**GPT-4o** 를 활용한 자동화된 3단계 파이프라인으로 데이터셋을 구축했습니다. 먼저, **Wikipedia** 에서 질문-답변 쌍을 생성하고, 다양한 LLM이 **컨텍스트 없는 환경** 에서 답변을 생성하여 환각을 유도합니다. 다음으로, **GPT-4o** 를 사용하여 황금 답변 및 검색된 컨텍스트와 비교해 **[HAL] 태그** 로 환각이 발생한 스팬을 자동으로 주석 처리합니다. 마지막으로, 규칙 기반 및 프롬프트 기반 필터링을 통해 주관적이거나 불완전한 질문, LLM의 답변 거부 사례를 제거합니다.

## 주요 결과
**PsiloQA** 는 14개 언어에 걸쳐 63,792개의 훈련 샘플과 2,897개의 테스트 샘플을 포함하는 대규모 다국어 스팬 수준 환각 데이터셋입니다. **인코더 기반 모델** , 특히 **mmBERT-base** 가 불확실성 정량화 및 LLM 기반 접근 방식보다 우수한 성능을 보였으며, 14개 언어 중 12개에서 가장 높은 AP 및 IoU 점수를 달성했습니다. 예를 들어, 영어에서 **mmBERT-base** 는 **AP 84.88%** 와 **IoU 70.67%** 를 기록했습니다. PsiloQA로 훈련된 모델은 **RAGTruthQA** 대비 **Mu-SHROOMen** 에서 **45% IoU 향상** 을 보여 강력한 교차 언어 일반화 및 지식 전이 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**PsiloQA** 는 AI 실무자들이 다국어 환경에서 미세한 스팬 수준의 환각 탐지 모델을 훈련하고 평가할 수 있는 확장 가능하고 비용 효율적인 리소스를 제공합니다. **mmBERT** 와 같은 미세 조정된 다국어 인코더 모델이 가장 강력한 성능을 보여, **교차 언어 환각 탐지** 의 중요성을 강조합니다. **GPT-4o** 를 활용한 자동화된 데이터 생성 및 주석 파이프라인은 고품질의 특정 목적 데이터셋을 효율적으로 구축하는 새로운 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.