
---
title: "[논문리뷰] Investigating Hallucination in Conversations for Low Resource Languages"
excerpt: "Fatemeh Jamshidi이 [arXiv]에 게시한 'Investigating Hallucination in Conversations for Low Resource Languages' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - [Review]

permalink: /ai/review/2025-8-4-Investigating_Hallucination_in_Conversations_for_Low_Resource_Languages/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.22720)

**저자:** Amit Das, Md. Najib Hasan, Souvika Sarkar, Zheng Zhang, Fatemeh Jamshidi, Tathagata Bhattacharya, Nilanjana Raychawdhury, Dongji Feng, Vinija Jain, Aman Chadha

**키워드:** `LLM Hallucination`, `Low-resource Languages`, `Conversational AI`, `ROUGE Score`, `Cross-lingual Evaluation`, `Factual Consistency`

## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)이 생성하는 텍스트의 사실적 오류, 즉 '환각(hallucination)' 문제를 저자원 언어인 힌디어, 페르시아어, 만다린어 대화 데이터에서 심층적으로 조사하는 것을 목표로 합니다. 특히 **GPT-3.5**, **GPT-40**, **Llama-3.1**, **Gemma-2.0**, **DeepSeek-R1**, **Qwen-3** 등 다양한 LLM의 신뢰성과 정확성을 평가하여 언어 및 모델 아키텍처에 따른 환각 경향을 파악하고자 합니다.

## 핵심 방법론
연구는 **BlendedSkillTalk**와 **DailyDialog** 두 가지 대화 데이터셋을 활용했습니다. 원문 영어 대화는 **GPT-3.5**를 통해 힌디어, 페르시아어, 만다린어로 번역되었으며, 원어민 검수를 통해 번역 품질을 확보했습니다. LLM의 환각 측정은 실제 응답과의 비교를 통해 **ROUGE-1** 및 **ROUGE-L** 점수를 사용하여 수행되었습니다. 추가적으로 원어민이 무작위 샘플을 검토하여 환각 패턴을 분석했습니다.

## 주요 결과
LLM은 만다린어에서 가장 낮은 환각률을 보였는데, **BlendedSkillTalk** 데이터셋에서 **ROUGE 점수가 거의 1.0을 넘지 않았고**, **DailyDialogue**에서는 대부분 **1.5 미만**을 기록했습니다. 이는 풍부하고 고품질의 훈련 데이터 가용성에 기인하며, 만다린어의 환각은 주로 부분적인 성격을 띠었습니다. 반면 힌디어와 페르시아어에서는 훨씬 높은 환각률이 관찰되었으며, 이들 언어에서는 **GPT-4.0**과 **GPT-3.5**가 소규모 오픈소스 모델보다 상대적으로 나은 성능을 보였습니다.

## AI 실무자를 위한 시사점
저자원 언어에서 LLM 환각은 **훈련 데이터의 양과 품질**에 직접적인 영향을 받음이 확인되었습니다. 힌디어 및 페르시아어와 같이 데이터가 부족한 언어에서는 **검색 증강 생성(RAG)**, **접지 디코딩(grounded decoding)**, 또는 **인간 참여 감독(human-in-the-loop supervision)**과 같은 환각 완화 기술이 필수적입니다. 또한, 특정 언어에 대한 **사전 훈련**이나 **미세 조정 전략**이 환각 감소에 효과적임을 시사하며, 이는 보다 신뢰할 수 있고 맥락을 인지하는 대화 시스템 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
