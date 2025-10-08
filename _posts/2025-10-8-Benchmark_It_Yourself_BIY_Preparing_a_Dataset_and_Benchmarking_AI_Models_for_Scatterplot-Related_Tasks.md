---
title: "[논문리뷰] Benchmark It Yourself (BIY): Preparing a Dataset and Benchmarking AI
  Models for Scatterplot-Related Tasks"
excerpt: "Pedro Bizarro이 [arXiv]에 게시한 'Benchmark It Yourself (BIY): Preparing a Dataset and Benchmarking AI
  Models for Scatterplot-Related Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Scatterplot Analysis
  - AI Benchmarking
  - Multimodal LLMs
  - Synthetic Data Generation
  - Cluster Detection
  - Outlier Detection
  - Data Visualization
  - Prompt Engineering

permalink: /ai/review/2025-10-8-Benchmark_It_Yourself_BIY_Preparing_a_Dataset_and_Benchmarking_AI_Models_for_Scatterplot-Related_Tasks/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06071)

**저자:** João Palmeiro, Diogo Duarte, Rita Costa, Pedro Bizarro



## 핵심 연구 목표
본 연구는 기존 벤치마크들이 산점도(scatterplot) 관련 태스크를 충분히 다루지 못하여 AI 모델의 성능을 평가하는 데 한계가 있다는 문제점을 해결하고자 합니다. 특히, AI 모델이 차트 이미지를 통해 클러스터링 및 이상치 탐지 같은 산점도 관련 시각적 분석 태스크를 얼마나 잘 수행하는지 종합적으로 평가하기 위한 새로운 합성 데이터셋과 벤치마크를 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **6가지 데이터 생성기**와 **17가지 차트 디자인**을 활용하여 **18,000개 이상의 합성 산점도 데이터셋**을 구축했습니다. 이 데이터셋은 클러스터 경계 상자, 중심 좌표, 이상치 좌표 등의 상세한 주석을 포함합니다. 벤치마크에서는 **OpenAI의 GPT-4.1 및 GPT-4o 계열 모델**과 **Google의 Gemini 2.5 Flash 및 Flash-Lite 모델**을 대상으로 **5가지 산점도 관련 태스크**(**클러스터 개수 세기, 클러스터 탐지, 클러스터 식별, 이상치 개수 세기, 이상치 식별**)에 대해 **zero-shot, one-shot, few-shot**의 **세 가지 프롬프트 전략**을 적용하여 성능을 평가했습니다.

## 주요 결과
**클러스터 개수 세기** 태스크에서는 **OpenAI의 03 및 GPT-4.1 모델**이 **few-shot 프롬프트** 사용 시 높은 **정확도**를 보였으며, **MAE는 0.03**을 기록했습니다. **이상치 개수 세기** 태스크에서는 **Flash 모델**이 **few-shot 프롬프트**에서 **90.49%의 정확도**로 우수한 성능을 나타냈습니다. 그러나 **클러스터 탐지 및 이상치 식별**과 같은 위치 파악 태스크에서는 **정밀도와 재현율이 50% 미만**으로 저조했으며, **Flash 모델**의 **이상치 식별(65.01%)**만이 상대적으로 높은 수치를 기록했습니다.

## AI 실무자를 위한 시사점
**Gemini 2.5 Flash**와 **OpenAI 모델**은 **few-shot 프롬프트 전략**을 사용할 경우 **산점도의 클러스터 및 이상치 개수를 세는** 데 매우 효과적임을 보여주므로, 데이터 분석 및 시각화 보고서 자동 생성에 활용될 수 있습니다. 하지만 **정확한 클러스터 또는 이상치의 위치 파악**이 필요한 AI 애플리케이션에서는 현재 모델들의 성능이 **50% 미만의 정밀도/재현율**로 미흡하여 추가적인 개선과 연구가 필수적입니다. 또한, AI 모델에 차트를 입력할 때 **16:9, 21:9와 같은 넓은 가로세로 비율**이나 **무작위로 색상이 지정된 산점도**는 모델 성능에 부정적일 수 있으므로 차트 디자인에 주의해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.