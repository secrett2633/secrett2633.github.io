---
title: "[논문리뷰] HalluCitation Matters: Revealing the Impact of Hallucinated References with 300 Hallucinated Papers in ACL Conferences"
excerpt: "Taro Watanabe이 arXiv에 게시한 'HalluCitation Matters: Revealing the Impact of Hallucinated References with 300 Hallucinated Papers in ACL Conferences' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hallucinated Citations
  - NLP Conferences
  - Citation Detection
  - Academic Integrity
  - Peer Review
  - Large Language Models (LLMs)
  - Bibliometrics

permalink: /ai/review/2026-01-28-HalluCitation-Matters-Revealing-the-Impact-of-Hallucinated-References-with-300-Hallucinated-Papers-in-ACL-Conferences/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18724)

**저자:** Yusuke Sakai, Hidetaka Kamigaito, Taro Watanabe



## 핵심 연구 목표
본 논문은 학술 논문, 특히 AI/ML 분야에서 증가하는 **환각 인용(HalluCitation)** 의 확산과 그 영향을 체계적으로 조사하는 것을 목표로 합니다. 이는 과학적 신뢰성과 학술 컨퍼런스의 명성을 위협하는 심각한 문제로 제기되고 있으며, 2024년 및 2025년 ACL, NAACL, EMNLP 컨퍼런스에 발표된 논문을 중심으로 현황을 분석합니다.

## 핵심 방법론
연구팀은 **2024년 및 2025년 ACL, NAACL, EMNLP 컨퍼런스** 에서 발표된 **17,000편 이상의 논문** 을 수집했습니다. 인용 정보는 **OCR 기반 추출 도구(MinerU)** 와 **GROBID** 를 사용하여 원시 PDF에서 추출 및 정규화되었습니다. 후보 환각 인용은 **ACL Anthology, arXiv, DBLP, OpenAlex** 와 같은 참조 데이터베이스에 대해 **정규화된 Levenshtein 거리 기반의 퍼지 매칭(유사도 0.9 이상)** 을 통해 식별되었으며, 최종적으로 각 후보는 연구팀이 직접 **수동 검증** 하여 HalluCitation 여부를 판별했습니다.

## 주요 결과
분석 결과, **거의 300편의 논문** 에서 최소 한 개 이상의 HalluCitation이 발견되었으며, 이 중 대다수는 **2025년** 에 발표되었습니다. 특히 **EMNLP 2025** 에서만 전체의 절반에 해당하는 **154편** 의 HalluCited 논문이 확인되어 문제의 급격한 증가를 시사합니다. 또한, **4개 이상의 HalluCitation 후보** 를 포함하는 논문은 실제로 HalluCitation을 포함할 가능성이 **60.7% 이상** 으로 높게 나타났습니다.

## AI 실무자를 위한 시사점
환각 인용의 증가는 **LLM 기반 도구** 의 확산과 함께 학술적 신뢰성에 대한 중대한 도전 과제를 제시합니다. AI/ML 엔지니어와 연구자들은 **Google Scholar** 와 같은 보조 데이터베이스가 부정확한 인용을 포함할 수 있음을 인지하고, 원본 출처에 대한 **철저한 검증 과정** 을 거쳐야 합니다. 본 연구는 인용 신뢰성을 높이고 **동료 심사 과정의 지속 가능성** 을 개선하기 위한 **자동화된 환각 인용 탐지 시스템** 및 제출 전 검토 도구의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.