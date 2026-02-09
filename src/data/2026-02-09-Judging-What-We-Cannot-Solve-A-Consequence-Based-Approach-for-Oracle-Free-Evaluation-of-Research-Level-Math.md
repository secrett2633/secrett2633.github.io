---
title: "[논문리뷰] Judging What We Cannot Solve: A Consequence-Based Approach for Oracle-Free Evaluation of Research-Level Math"
excerpt: "Amit Agarwal이 [arXiv]에 게시한 'Judging What We Cannot Solve: A Consequence-Based Approach for Oracle-Free Evaluation of Research-Level Math' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Mathematical Reasoning
  - Oracle-Free Validation
  - Consequence-Based Utility
  - Solution Quality
  - In-Context Learning
  - Research-Level Math

permalink: /ai/review/2026-02-09-Judging-What-We-Cannot-Solve-A-Consequence-Based-Approach-for-Oracle-Free-Evaluation-of-Research-Level-Math/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06291)

**저자:** Guijin Son, Donghun Yang, Hitesh Laxmichand Patel, Hyunwoo Ko, Amit Agarwal, Sunghee Ahn, Kyong-Ha Lee, Youngjae Yu



## 핵심 연구 목표
연구 수준 수학 문제에 대한 **LLM(Large Language Model) 생성 솔루션** 의 검증은 전문가 시간을 많이 소모하고 기존 LLM 평가 모델은 신뢰할 수 없거나 편향되어 있습니다. 본 연구는 정답(oracle) 없이도 이러한 솔루션의 품질을 안정적으로 평가할 수 있는 **oracle-free 검증 방법론** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Consequence-Based Utility (CBU)** 라는 새로운 평가 방법론을 제안합니다. CBU는 LLM 솔버(예: **GPT-OSS-120B** )에게 검증 대상 솔루션을 **in-context exemplar** 로 제공하고, 이를 바탕으로 **밀접하게 관련된 인접 문제(neighborhood questions) Q***를 풀게 합니다. 이후, Q*에 대한 솔버의 **정확도** 를 측정하여 해당 솔루션의 유틸리티 점수를 산출합니다. 평가를 위해 **EXPERTMATH** 라는 192개의 전문가 작성 문제와 425개의 LLM 생성 문제로 구성된 데이터셋을 구축했습니다.

## 주요 결과
CBU는 기존의 보상 모델, 생성형 보상 모델 및 LLM-Judges를 일관되게 능가하는 성능을 보였습니다. 특히 **GPT-OSS-120B** 의 경우, **Acc@1이 67.2%에서 76.3%로, AUC가 71.4%에서 79.6%로 향상** 되었습니다. 또한, LLM-Judges에 비해 **더 큰 솔버-평가자 격차** 를 보이며, 모델이 해결하기 어려운 문제에서도 올바른 솔루션과 잘못된 솔루션 간의 더 강력한 분리 능력을 입증했습니다.

## AI 실무자를 위한 시사점
Consequence-Based Utility는 **LLM 기반 수학 연구 솔루션의 확장 가능하고 신뢰할 수 있는 검증 메커니즘** 을 제공하여 값비싼 인간 전문가의 의존도를 줄일 수 있습니다. 특히 LLM-Judges가 오해할 수 있는 문체적 단서나 권위적인 진술 대신 **수학적 오류(예: 잘못된 추론, 부당한 압축)** 를 더 정확하게 식별하므로 **진단 능력이 향상** 됩니다. 이는 정확한 검증이 필수적인 고위험 연구 분야에 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.