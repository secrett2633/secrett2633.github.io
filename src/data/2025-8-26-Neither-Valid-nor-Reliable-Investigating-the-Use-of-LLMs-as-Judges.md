---
title: "[논문리뷰] Neither Valid nor Reliable? Investigating the Use of LLMs as Judges"
excerpt: "Golnoosh Farnadi이 arXiv에 게시한 'Neither Valid nor Reliable? Investigating the Use of LLMs as Judges' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs as Judges
  - NLG Evaluation
  - Measurement Theory
  - Validity
  - Reliability
  - Evaluation Bias
  - Scalability
  - Responsible AI

permalink: /ai/review/2025-8-26-Neither-Valid-nor-Reliable-Investigating-the-Use-of-LLMs-as-Judges/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18076)

**저자:** Khaoula Chehbouni, Mohammed Haddou, Jackie Chi Kit Cheung, Golnoosh Farnadi



## 핵심 연구 목표
본 논문은 **NLG(Natural Language Generation)** 시스템 평가에서 **LLM(Large Language Model)을 심사관(LLJ)** 으로 활용하는 방식의 광범위한 채택이 성급했음을 주장하며, 그 **신뢰성(reliability)** 과 **타당성(validity)** 에 대한 엄격한 조사를 목표로 합니다. 사회 과학의 **측정 이론(measurement theory)** 을 기반으로, LLJ 사용의 네 가지 핵심 가정을 비판적으로 평가하고 보다 책임감 있는 평가 관행의 필요성을 강조하고자 합니다.

## 핵심 방법론
저자들은 LLJ에 대한 기존 문헌을 **질적으로 검토** 하여 그 사용을 동기 부여하는 주요 가정과 제한 사항을 파악했습니다. **측정 이론 프레임워크** 를 활용하여 인간 판단의 대리 역할, 평가자로서의 능력, 확장성, 그리고 비용 효율성이라는 네 가지 핵심 가정을 분석했습니다. 이러한 분석은 텍스트 요약, 안전 정렬, 데이터 주석이라는 세 가지 LLJ 적용 사례를 중심으로 구체화되었습니다.

## 주요 결과
이 논문은 LLJ의 **유효성** 과 **신뢰성** 에 심각한 도전 과제가 있음을 밝힙니다. LLJ는 **명령 불이행** , **불충실한 설명 생성** , **견고성 부족** (예: 위치 편향, 적대적 공격), 그리고 주관적인 태스크에서의 **전문성 부족** 을 보입니다. 새로운 정량적 결과는 제시되지 않았지만, 기존 문헌 분석을 통해 LLM 안전 심사관이 단순한 프롬프트 변형으로 **유해한 생성물의 최대 100%를 무해하다고 오분류** 할 수 있음이 드러났습니다 [24]. 또한, **데이터 오염** 및 **선호도 누출** 문제로 인해 LLJ의 **예측 타당성** 이 저해됩니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLJ를 평가에 활용할 때, 그 내재적 한계와 편향을 인식하고 **더욱 엄격하고 상황에 맞는 접근 방식** 을 채택해야 합니다. 단순히 **확장성** 과 **비용 효율성** 만을 추구하여 LLJ를 도입하는 것은 오해의 소지가 있는 발전으로 이어질 수 있으며, 잠재적으로 **사회적 영향** (예: 크라우드워커 대체, 환경 영향, 편향 영속화)을 초래할 수 있습니다. **표준화된 평가 기준, 방법론, 점수 척도** 를 개발하여 LLJ 평가가 인간의 판단을 충실히 반영하고 책임감 있는 NLG 개발을 지원하도록 해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.