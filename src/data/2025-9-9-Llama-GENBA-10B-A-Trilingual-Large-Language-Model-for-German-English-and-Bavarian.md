---
title: "[논문리뷰] Llama-GENBA-10B: A Trilingual Large Language Model for German, English
  and Bavarian"
excerpt: "Hoi-Fong Mak이 arXiv에 게시한 'Llama-GENBA-10B: A Trilingual Large Language Model for German, English
  and Bavarian' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multilingual LLM
  - Low-Resource Language
  - German
  - Bavarian Dialect
  - Cross-Lingual Transfer
  - Continuous Pretraining
  - Llama-3.1
  - Model Expansion

permalink: /ai/review/2025-9-9-Llama-GENBA-10B-A-Trilingual-Large-Language-Model-for-German-English-and-Bavarian/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.05668)

**저자:** Michael Hoffmann, Jophin John, Stefan Schweter, Gokul Ramakrishnan, Alice Zhang, Dmitry Gaynullin, Hoi-Fong Mak, Nicolay J. Hammer



## 핵심 연구 목표
대규모 언어 모델(LLM)의 **영어 중심 편향** 을 해결하고, 독일어, 영어, 바이에른어(Bavarian)를 지원하는 **삼중 언어 기반 모델인 Llama-GENBA-10B** 를 개발하는 것을 목표로 합니다. 특히 바이에른어와 같은 **저자원 언어** 의 지원을 강화하고, 다국어 커뮤니티 전반에 걸쳐 균형 잡힌 언어 표현을 달성하고자 합니다.

## 핵심 방법론
**Llama 3.1-8B** 를 기반으로 **블록 확장 기법** 을 통해 **10B 파라미터** 로 스케일링하였으며, 영어 편향을 방지하기 위해 영어 데이터 비중을 낮춰 **총 164B 토큰** (영어 82B, 독일어 82B, 바이에른어 80M)으로 사전 학습했습니다. 바이에른어 데이터는 훈련의 **90%** 이후에 도입되었고, **Gemini-flash 모델** 을 사용하여 번역된 **867k 쌍의 지시-응답 데이터셋** 으로 미세 조정되었습니다. 훈련은 단일 **Cerebras CS-2 AI 가속기** 에서 진행되었습니다.

## 주요 결과
**Llama-GENBA-10B-base** 는 유럽 모델 중 두 번째로 높은 순위를 기록하며, 특히 영어와 바이에른어에서 강력한 교차 언어 성능을 보였습니다. 미세 조정된 **Llama-GENBA-10B-instruct** 는 바이에른어에서 **Apertus-8B-2509** 및 **Gemma-2-9B-it** 를 능가하는 **최고 수준의 성능** 을 달성했습니다. 사전 훈련은 **66일** 동안 약 **35.23 MWh** 의 에너지를 소비했습니다.

## AI 실무자를 위한 시사점
이 연구는 **블록 확장** 과 **단계적 언어 통합 전략** 을 통해 저자원 언어를 포함한 다국어 모델을 **자원 효율적** 으로 개발할 수 있는 실용적인 방법론을 제시합니다. 바이에른어와 같은 **저자원 방언** 에 대한 모델의 우수한 성능은 **도메인 특화된 데이터 수집 및 미세 조정의 중요성** 을 강조하며, 언어 다양성을 지원하는 LLM 개발의 가능성을 확장합니다. 단일 **Cerebras CS-2 시스템** 에서의 훈련은 소규모 연구팀도 대규모 다국어 사전 훈련을 효율적으로 수행할 수 있음을 보여주며, **에너지 소비량** 을 명시적으로 기록하여 개발 비용에 대한 투명성을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.