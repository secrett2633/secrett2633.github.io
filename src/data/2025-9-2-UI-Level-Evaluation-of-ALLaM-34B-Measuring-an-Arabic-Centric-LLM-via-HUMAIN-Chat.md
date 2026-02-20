---
title: "[논문리뷰] UI-Level Evaluation of ALLaM 34B: Measuring an Arabic-Centric LLM via
  HUMAIN Chat"
excerpt: "Omartificial-Intelligence-Space이 arXiv에 게시한 'UI-Level Evaluation of ALLaM 34B: Measuring an Arabic-Centric LLM via
  HUMAIN Chat' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Arabic LLM
  - UI-level Evaluation
  - ALLaM 34B
  - HUMAIN Chat
  - Dialectal Arabic
  - LLM as a Judge
  - Safety Evaluation

permalink: /ai/review/2025-9-2-UI-Level-Evaluation-of-ALLaM-34B-Measuring-an-Arabic-Centric-LLM-via-HUMAIN-Chat/

toc: true
toc_sticky: true

date: 2025-09-02 13:01:41+0900
last_modified_at: 2025-09-02 13:01:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17378)

**저자:** Omer Nacar



## 핵심 연구 목표
본 연구는 영어 중심 LLM들이 아랍어의 언어적, 문화적 뉘앙스를 포착하는 데 어려움을 겪는 문제를 해결하기 위해 개발된 **ALLaM 34B** 모델에 대한 포괄적인 UI-레벨 평가를 수행하는 것을 목표로 합니다. HUMAIN Chat을 통해 실제 사용자 경험을 반영한 평가를 진행하여, **ALLaM 34B** 가 견고하고 문화적으로 적합한 아랍어 LLM임을 입증하고자 합니다.

## 핵심 방법론
연구팀은 **ALLaM 34B** 를 평가하기 위해 현대 표준 아랍어(MSA), 5개 지역 방언, 코드 스위칭, 사실 지식, 추론, 창의적 생성, 적대적 안전성 등 7개 범주에 걸친 **23개의 고유한 프롬프트 팩** 을 구성했습니다. 각 프롬프트는 5회씩 제출되어 총 **115개의 응답** 이 수집되었고, 이 응답들은 **GPT-5** , **Gemini 2.5 Pro** , **Claude Sonnet-4** 세 가지 선도적인 **LLM 심판** 에 의해 5점 척도로 평가되었습니다. 평가 지표는 정확성, 유창성, 지시 준수, 안전성, 방언 충실도를 포함합니다.

## 주요 결과
**ALLaM 34B** 는 코드 스위칭 및 생성 작업에서 평균 **4.92/5** 의 높은 성능을 보였으며, MSA 처리(평균 **4.74/5** ) 및 추론 능력(평균 **4.64/5** )에서도 강력한 결과를 나타냈습니다. 안전성 관련 프롬프트에서는 평균 **4.54/5** 의 안정적인 성능을 보였습니다. 방언 성능은 다양하여 나지드, 히자지, 이집트 방언은 약 **3.8/5** 로 비교적 우수했으나, 레반트 및 모로코 방언은 각각 약 **2.7/5** 로 낮게 평가되어 훈련 데이터 불균형을 시사했습니다.

## AI 실무자를 위한 시사점
**ALLaM 34B** 는 일반 텍스트 생성, 코드 스위칭, MSA 작업에서 탁월한 성능을 보이며 실제 배포에 적합한 강력한 아랍어 LLM으로서의 잠재력을 입증했습니다. 이는 특히 아랍어 중심의 모델 개발 및 평가의 중요성을 강조합니다. 방언 처리의 경우, **ALLaM 34B** 가 덜 지원되는 방언에서 MSA로 회귀하는 경향이 있으므로, 향후 아랍어 LLM 개발 시 **표적화된 방언 말뭉치** 확보와 문화적 맥락에 맞는 미세 조정이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.