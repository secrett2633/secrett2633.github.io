---
title: "[논문리뷰] Blind to the Human Touch: Overlap Bias in LLM-Based Summary Evaluation"
excerpt: "Puneet Mathur이 arXiv에 게시한 'Blind to the Human Touch: Overlap Bias in LLM-Based Summary Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-as-a-judge
  - Summarization Evaluation
  - Overlap Bias
  - Position Bias
  - N-gram Metrics
  - Gemma
  - Llama
  - Evaluation Bias

permalink: /ai/review/2026-02-17-Blind-to-the-Human-Touch-Overlap-Bias-in-LLM-Based-Summary-Evaluation/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.07673)

**저자:** Jiangnan Fang, Cheng-Tse Liu, Hanieh Deilamsalehy, Nesreen K. Ahmed, Puneet Mathur, Nedim Lipka, Franck Dernoncourt, Ryan A. Rossi



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)을 요약 평가 심사관으로 활용할 때 발생하는 **overlap bias** 를 심층적으로 분석하는 것을 목표로 합니다. 특히, LLM 심사관의 판단이 인간이 작성한 요약문과의 유사도(n-gram overlap metrics)에 따라 어떻게 달라지는지, 그리고 다양한 크기와 유형의 LLM 모델 전반에서 이러한 패턴이 일관적으로 관찰되는지를 탐구합니다. 또한, **position bias** 가 이러한 판단 패턴과 어떻게 상호작용하는지 밝히고자 합니다.

## 핵심 방법론
연구는 **WikiSum** 및 **CNN_DailyMail** 데이터셋에서 6,744개의 LLM 생성 요약과 94,000개 이상의 LLM 판단을 포함하는 벤치마크 데이터셋을 구축했습니다. **ROUGE-1, ROUGE-2, BLEU-1, BLEU-4** 와 같은 n-gram overlap metrics를 사용하여 LLM 생성 요약과 인간 작성 요약 간의 유사도를 측정했으며, 1B에서 12B 파라미터에 이르는 **9가지 LLM(Gemma 3, LLAMA 3 변형 포함)** 을 심사관으로 활용했습니다. **요약 길이(95-105 단어)를 통제** 하고, 요약 제시 순서를 교환하여 **position bias** 의 영향을 분석했습니다.

## 주요 결과
LLM 심사관은 인간 작성 요약과의 n-gram overlap이 적을수록 **LLM이 생성한 요약을 더 선호하는 경향** 을 보였습니다(Figure 4). 이러한 "generated" 요약에 대한 선호는 **1B 파라미터의 소형 모델** 이 생성한 요약에 대해서도 나타났으며, **Mistral(8B)의 경우 평균 점수 0.5 이상에서는 LLM 요약 선호도가 25% 미만으로 감소** 하여 유의미한 비겹침이 편향 발현에 필요함을 시사합니다. **Position bias** 는 생성된 요약이 인간 작성 요약과 더 유사할 때 더욱 두드러졌으며, 파라미터가 많은 모델은 마지막 제시 요약을, 적은 모델은 첫 번째 제시 요약을 선호했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM-as-a-judge 패러다임이 **인간이 작성한 요약에 대한 내재적인 편향** 을 가질 수 있음을 시사하며, 이는 LLM을 요약 평가 도구로 활용할 때 **단순 비교를 넘어선 정교한 평가 기법** 의 필요성을 강조합니다. LLM 출력 텍스트에 나타나는 독특한 **스타일적 마커** 를 식별하는 데 활용될 수 있지만, LLM의 자동 평가 신뢰도를 높이기 위해서는 이러한 편향을 완화할 수 있는 **새로운 훈련 및 평가 프레임워크** 개발이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.