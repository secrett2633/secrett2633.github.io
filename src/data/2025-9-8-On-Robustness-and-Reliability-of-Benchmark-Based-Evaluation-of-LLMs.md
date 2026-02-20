---
title: "[논문리뷰] On Robustness and Reliability of Benchmark-Based Evaluation of LLMs"
excerpt: "Kevin Roitero이 arXiv에 게시한 'On Robustness and Reliability of Benchmark-Based Evaluation of LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Model Robustness
  - Benchmark Reliability
  - Paraphrasing
  - Linguistic Variability
  - Generalization
  - Question Answering

permalink: /ai/review/2025-9-8-On-Robustness-and-Reliability-of-Benchmark-Based-Evaluation-of-LLMs/

toc: true
toc_sticky: true

date: 2025-09-08 13:10:18+0900
last_modified_at: 2025-09-08 13:10:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04013)

**저자:** Riccardo Lunardi, Vincenzo Della Mea, Stefano Mizzaro, Kevin Roitero



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 문맥에 따라 재구성된 질문에 얼마나 **강건한지** 를 평가하고, 현재 사용되는 벤치마크 기반 평가가 모델의 실제 능력을 얼마나 **신뢰성 있게** 측정하는지 조사하는 것을 목표로 합니다. 고정된 문구의 벤치마크 질문이 LLM의 실제 적용 능력과 일반화 능력을 과대평가할 수 있다는 우려를 다룹니다.

## 핵심 방법론
연구팀은 **6가지 주요 벤치마크** ( **MMLU** , **ARC-C** , **HellaSwag** , **OpenBookQA** , **RACE** , **SciQ** )의 모든 질문에 대해 **GPT-4o mini** 를 사용하여 **5가지 다양한 패러프레이즈** 를 체계적으로 생성했습니다. 이후 **34개의 최신 LLM** 을 대상으로 원본 질문과 패러프레이즈된 질문에 대한 성능을 **제로샷(zero-shot) 설정** 및 **최상위 1개 토큰 확률** 기반으로 평가하여 모델의 일관성과 정확도 변화를 측정했습니다.

## 주요 결과
LLM들의 순위는 패러프레이즈된 입력에도 불구하고 **상대적으로 안정적** 이었으나 ( **Kendall's τ 값 0.9 이상** ), **절대적인 정확도 점수는 크게 하락** 했습니다. 모델들은 질문의 특정 문구에 따라 답변을 달리하는 경향을 보였으며, 평균적으로 **70-85%의 질문** 만이 패러프레이즈된 버전들 사이에서 일관된 답변을 받았습니다. 대규모 모델일수록 정확도와 일관성 사이에 **강한 양의 상관관계(p = 0.79)** 를 보인 반면, 소규모 모델은 **음의 상관관계(p = -0.51)** 를 나타냈습니다.

## AI 실무자를 위한 시사점
현재 벤치마크는 고정된 질문 문구를 사용하기 때문에 LLM의 실제 환경에서의 **강건성 및 일반화 능력을 과대평가** 할 수 있음을 시사합니다. AI 엔지니어는 단순한 벤치마크 점수 외에 **언어적 변동성에 대한 모델의 민감도** 를 반드시 고려해야 하며, 실제 배포 시 발생할 수 있는 성능 저하를 예상해야 합니다. 향후 LLM 평가는 **패러프레이즈를 포함한 동적인 벤치마크** 를 통해 모델의 진정한 능력을 측정해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.