---
title: "[논문리뷰] Good Intentions Beyond ACL: Who Does NLP for Social Good, and Where?"
excerpt: "Denis Peskoff이 [arXiv]에 게시한 'Good Intentions Beyond ACL: Who Does NLP for Social Good, and Where?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - NLP for Social Good
  - ACL Community
  - Scientometrics
  - Venue Analysis
  - Author Classification
  - Sustainable Development Goals
  - Neural Methods
  - Research Landscape

permalink: /ai/review/2025-10-7-Good-Intentions-Beyond-ACL-Who-Does-NLP-for-Social-Good-and-Where/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04434)

**저자:** Grace LeFevre, Qingcheng Zeng, Adam Leif, Jason Jewell, Denis Peskoff, Rob Voigt



## 핵심 연구 목표
본 연구는 `NLP4SG (NLP for Social Good)` 연구의 저자 및 게재지별 분포를 분석하여 그 현황을 파악하는 것을 목표로 합니다. 특히, `ACL (Association for Computational Linguistics)` 저자들이 사회적 선행 관련 `NLP` 연구를 `ACL` 게재지에 발표하는 경향이 있는지, 그리고 `ACL`이 `NLP4SG` 연구의 중심지인지에 대한 의문을 해소하고자 합니다.

## 핵심 방법론
연구는 `Semantic Scholar's Open Research Corpus (S2ORC)`에서 총 **309,208**편의 논문을 수집하고, `OpenAlex` 및 `Google Scholar` 메타데이터를 활용하여 `NLP` 관련성, 게재지 유형 (**ACL, ACL-ADJACENT, EXTERNAL**), 저자 분류 (**ACL 저자/비-ACL 저자**), `NLP4SG` 관련성 등의 메타데이터를 추가했습니다. `NLP4SG` 분류는 `Adauto et al. (2023)` 모델을 사용하고, `GPT-40`을 통해 `UN SDG`에 따른 주제 및 `방법론 (신경망/전통 방식)`을 식별했습니다.

## 주요 결과
`ACL` 저자는 `ACL` 외부 게재지(`ACL-ADJACENT`, `EXTERNAL`)에서 `NLP4SG` 작업을 발표할 가능성이 **ACL 게재지보다 3배 이상 높았으며 (p < 0.001)**, `EXTERNAL` 게재지에서 `NLP4SG` 논문이 `ACL` 게재지보다 훨씬 많았습니다. `NLP4SG` 연구의 대다수는 **비-ACL 저자에 의해 `EXTERNAL` 게재지에서 수행**되었으며, 그 양은 `ACL` 저자의 연구량보다 훨씬 많았습니다. 주제별로는 `ACL` 게재지가 `평화 (25.6%)`와 `혁신 (9.1%)`에 집중한 반면, `EXTERNAL` 게재지는 `건강 (46.5%)`과 `교육 (25.1%)`에 중점을 두었습니다.

## AI 실무자를 위한 시사점
`NLP4SG` 연구가 `ACL` 커뮤니티 외부에서 광범위하게 이루어지고 있으며, 특히 `ACL` 저자들도 `ACL` 외부에서 더 활발하게 `NLP4SG` 연구를 수행한다는 점은 `ACL` 커뮤니티가 사회적 선행 연구를 더 적극적으로 포용하고 가치를 인정할 필요가 있음을 시사합니다. `AI/ML` 엔지니어와 데이터 과학자는 `NLP4SG` 프로젝트를 수행할 때 다양한 학제 간 게재지의 특성과 해당 분야의 연구 우선순위를 고려하여 협력 기회를 모색해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.