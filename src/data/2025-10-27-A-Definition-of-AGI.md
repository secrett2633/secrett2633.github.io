---
title: "[논문리뷰] A Definition of AGI"
excerpt: "Yarin Gal이 [arXiv]에 게시한 'A Definition of AGI' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AGI Definition
  - Cognitive Assessment
  - Cattell-Horn-Carroll Theory
  - AI Evaluation
  - Multimodal AI
  - Cognitive Domains
  - Psychometrics

permalink: /ai/review/2025-10-27-A-Definition-of-AGI/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18212)

**저자:** Dan Hendrycks, Dawn Song, Christian Szegedy, Honglak Lee, Yarin Gal



## 핵심 연구 목표
본 논문은 모호한 AGI(인공 일반 지능) 개념을 명확히 정의하고, 현재의 특수화된 AI와 인간 수준의 인지 능력 간의 격차를 해소하기 위한 **정량적 프레임워크** 를 제시하는 것을 목표로 합니다. 잘 교육받은 성인의 인지적 다재다능함과 숙련도에 필적하는 AI를 AGI로 정의하며, 이를 측정 가능한 기준으로 설정하고자 합니다.

## 핵심 방법론
연구팀은 인간 인지 능력의 가장 실증적으로 검증된 모델인 **Cattell-Horn-Carroll (CHC) 이론** 에 기반하여 AGI 평가 프레임워크를 구축했습니다. 이 프레임워크는 일반 지능을 **추론, 기억, 지각 등 10가지 핵심 인지 도메인** 으로 분해하고, AI 시스템을 평가하기 위해 **확립된 인간 심리 측정 배터리** 를 적용합니다. 각 도메인은 세부적인 하위 능력을 포함하며, 전체 AGI 점수는 각 도메인에 10%의 가중치를 부여하여 **0%에서 100%** 사이로 산출됩니다.

## 주요 결과
이 프레임워크를 적용한 결과, 현재 AI 모델들은 **"들쭉날쭉한" 인지 프로필** 을 보였습니다. 예를 들어, **GPT-4는 27%** , **GPT-5는 57%** 의 AGI 점수를 기록하며, 지식 집약적 도메인에서는 뛰어난 성능을 보이나 **장기 기억 저장(Long-Term Memory Storage, MS)** 과 같은 **기초 인지 메커니즘** 에서 심각한 결함을 드러냈습니다. 특히 **장기 기억 저장 능력** 은 현재 모델에서 거의 **0%** 에 가까운 점수를 기록했습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 현재 AI 시스템의 **인지적 강점과 약점을 정확히 진단** 할 수 있는 강력한 도구를 제공합니다. 개발자들은 **대규모 컨텍스트 창(Working Memory)** 에 의존하기보다 **진정한 장기 기억 시스템** 과 같은 **근본적인 인지 병목 현상** 해결에 집중해야 함을 시사합니다. 또한, **환각(hallucinations) 문제** 를 해결하기 위한 **정확한 정보 검색 능력(Retrieval Precision)** 과 같은 핵심 역량 개발의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.