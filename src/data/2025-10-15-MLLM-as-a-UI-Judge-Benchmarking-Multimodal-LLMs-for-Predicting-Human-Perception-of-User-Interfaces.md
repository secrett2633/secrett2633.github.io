---
title: "[논문리뷰] MLLM as a UI Judge: Benchmarking Multimodal LLMs for Predicting Human
  Perception of User Interfaces"
excerpt: "Sungchul Kim이 [arXiv]에 게시한 'MLLM as a UI Judge: Benchmarking Multimodal LLMs for Predicting Human
  Perception of User Interfaces' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - UI Evaluation
  - Human Perception
  - Benchmarking
  - UX Research
  - MLLM-as-a-Judge
  - Cognitive Factors
  - Pairwise Comparison

permalink: /ai/review/2025-10-15-MLLM-as-a-UI-Judge-Benchmarking-Multimodal-LLMs-for-Predicting-Human-Perception-of-User-Interfaces/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08783)

**저자:** Sungchul Kim, Samyadeep Basu, Ryan Rossi, Reuben A. Luera, Franck Dernoncourt



## 핵심 연구 목표
본 논문은 사용자 인터페이스(UI) 디자인 평가 과정에서 발생하는 리소스 제약을 해결하기 위해 **Multimodal Large Language Models (MLLMs)** 이 인간의 UI 인식과 선호도를 얼마나 정확하게 예측할 수 있는지 벤치마킹하는 것을 목표로 합니다. 기존의 행동 시뮬레이션을 넘어, **주관적인 UI 요소에 대한 인간의 판단을 모방** 하여 디자인 초기 단계의 평가자로 MLLM의 활용 가능성을 탐구합니다.

## 핵심 방법론
30개의 UI 이미지를 수집하고, **GPT-4o** , **Claude 3.5 Sonnet** , **Llama-3.2-11B-Vision** 세 가지 MLLM을 활용했습니다. 인간 평가 데이터는 Amazon Mechanical Turk를 통해 500명의 참가자로부터 **9가지 UI 요인(인지적, 지각적, 감성적)** 에 대한 **7점 리커트 척도 평가** 와 서술형 설명을 수집했습니다. MLLM 평가는 **절대 점수 예측** 과 **쌍대 비교 선호도 예측** 두 가지 방식으로 진행되었으며, **MSE, MAE, 정확도, 상관계수(Pearson, Spearman, Kendall tau)** 등의 지표를 통해 인간 평가와의 일치도를 측정했습니다.

## 주요 결과
MLLM은 평균적으로 인간 점수와 **0.35점 이내의 유사성** 을 보였으며, **±1-accuracy는 72%-77%** 에 달했습니다 ( **Claude 3.5** 가 77%로 가장 높음). 특히 **신뢰성(TRUSTWORTHY)** 과 같은 인지적/지각적 요인에서는 높은 예측 성능을 보였으나, **흥미로움(INTERESTING)** 과 같은 감성적 요인에서는 인간 점수를 **과소평가** 하는 경향이 있었습니다. 쌍대 비교에서는 인간 선호도 차이가 클수록 MLLM의 예측 정확도가 높아져, **GPT-4o와 Claude** 는 큰 차이에서 **90-93%의 정확도** 를 달성했습니다. **INTERESTING** 요인은 예측 오류가 높았음에도 불구하고 **상관관계가 가장 높게** 나타나, MLLM이 절대 점수 예측보다 **상대적 선호도(랭킹)** 파악에 더 효과적임을 시사합니다.

## AI 실무자를 위한 시사점
MLLM은 **초기 단계의 UI/UX 연구** 에서 제한된 리소스를 보완하는 **빠르고 저렴한 근사치 평가 도구** 로서 잠재력을 가집니다. 특히 디자인 선택의 방향성을 잡거나 옵션을 좁히는 데 유용할 수 있습니다. 그러나 **정확한 결과나 고위험 시나리오** 에서는 여전히 인간 평가를 대체할 수 없으며, 감성적/주관적 요인에 대한 예측 정확도를 높이기 위한 추가 연구가 필요합니다. 본 연구에서 구축된 벤치마크 데이터셋은 **MLLM의 미세 조정(fine-tuning)** , 특히 **강화 학습(RLHF)** 을 통해 UI 평가 능력을 향상시키는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.