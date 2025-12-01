---
title: "[논문리뷰] ReviewerToo: Should AI Join The Program Committee? A Look At The Future
  of Peer Review"
excerpt: "Christopher Pal이 [arXiv]에 게시한 'ReviewerToo: Should AI Join The Program Committee? A Look At The Future
  of Peer Review' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Peer Review
  - AI-Assisted Review
  - Large Language Models
  - LLM Agents
  - Meta-Review
  - Conference Submissions
  - Reviewer Personas
  - Evaluation Metrics

permalink: /ai/review/2025-10-13-ReviewerToo-Should-AI-Join-The-Program-Committee-A-Look-At-The-Future-of-Peer-Review/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08867)

**저자:** Gaurav Sahu, Hugo Larochelle, Laurent Charlin, Christopher Pal



## 핵심 연구 목표
과학 출판의 핵심인 피어 리뷰 과정에서 발생하는 불일치, 주관성, 확장성 문제를 해결하고, AI가 인간의 판단을 보완하는 체계적이고 일관된 평가를 제공할 수 있도록 **AI 기반 피어 리뷰 시스템** 을 연구하고 배포하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 `ReviewerToo`라는 **모듈형 프레임워크** 를 제안합니다. 이 프레임워크는 **LLM 기반 에이전트** 를 활용하여 문헌 검토 ( **LitLLM** ), 다양한 **리뷰어 페르소나** (예: 이론가, 경험주의자, 교육학자), 저자 반박, 그리고 **메타리뷰어** 등의 역할을 수행합니다. 각 에이전트는 **ICLR 2025 리뷰어 가이드라인** 에 맞춰 구조화된 평가를 생성하며, **1,963편의 ICLR 2025 논문** 으로 구성된 `ICLR-2k` 데이터셋을 통해 **gpt-oss-120b 모델** 의 성능을 검증합니다.

## 주요 결과
`ReviewerToo`의 **gpt-oss-120b 모델** 은 논문의 수락/거절을 분류하는 태스크에서 **81.8%의 정확도** 를 달성하여, 평균적인 인간 리뷰어의 **83.9%** 에 근접하는 성능을 보였습니다. `Meta (all)` 에이전트 (메타리뷰어 통합)는 2진 분류 태스크에서 **81.8% 정확도** 와 **1657의 최고 ELO 점수** 를 기록하며 가장 강력한 성능을 나타냈습니다. AI 리뷰어는 **사실 확인 및 문헌 커버리지** 에서 강점을 보였으나, **방법론적 참신성 및 이론적 기여 평가** 에서는 어려움을 겪었습니다.

## AI 실무자를 위한 시사점
AI는 피어 리뷰에서 **일관되고 구조화된 피드백** 을 제공하며, **초기 의사 결정의 정확도를 높이는 보완적 역할** 을 수행할 수 있습니다. 시스템 설계 시 **앙상블 및 메타리뷰 프로토콜** 을 우선시하여 개별 AI 리뷰어의 편향을 줄이고 신뢰성을 높여야 합니다. 또한, LLM의 **'sycophancy' 경향** 을 완화하기 위한 명시적인 **교정 지침** 과 **적대적 프롬프트** 를 포함하는 신중한 설계가 필요하며, 복잡한 평가 판단은 여전히 **인간 전문가** 에게 맡겨야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.