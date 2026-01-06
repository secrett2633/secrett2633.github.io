---
title: "[논문리뷰] Recursive Language Models"
excerpt: "이 [arXiv]에 게시한 'Recursive Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recursive Language Models
  - Large Language Models
  - Long Context Processing
  - Inference Scaling
  - REPL Environment
  - Task Decomposition
  - Sub-LM Calls
  - Context Management

permalink: /ai/review/2026-01-06-Recursive-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24601)

**저자:** Alex L. Zhang, Tim Kraska, Omar Khattab



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 컨텍스트 길이 제한으로 인해 긴 프롬프트를 효과적으로 처리하지 못하고 '컨텍스트 로트(context rot)' 현상을 겪는 문제를 해결하고자 합니다. 특히, 수백만 토큰 규모의 장기 작업에서 일반 목적 LLM의 컨텍스트 크기를 추론 시점에 **획기적으로 확장** 하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Recursive Language Models (RLMs)** 를 제안합니다. 이는 긴 프롬프트를 LLM의 신경망에 직접 주입하는 대신 **외부 Python REPL 환경의 변수** 로 처리하는 일반적인 추론 전략입니다. LLM은 이 환경에서 **코드를 프로그래밍 방식으로 작성** 하여 프롬프트를 검토, 분해하고, **재귀적으로 자신(서브-LLM)** 을 호출하여 프롬프트의 특정 스니펫을 처리합니다. 이는 컨텍스트 오프로딩과 작업 분해를 가능하게 합니다.

## 주요 결과
RLMs는 모델의 컨텍스트 윈도우를 **두 자릿수 이상 뛰어넘는 입력(10M+ 토큰 규모)** 을 성공적으로 처리합니다. **S-NIAH, OOLONG, OOLONG-Pairs, CodeQA, BrowseComp+** 등 네 가지 다양한 장문 컨텍스트 작업에서 기본 LLM 및 기존 장문 컨텍스트 방법론 대비 **최대 두 배 이상의 성능** 을 보였습니다. 예를 들어, OOLONG-Pairs에서 RLM(GPT-5)는 기본 모델의 <0.1% 대비 **58.00%의 F1 점수** 를 달성했으며,BrowseComp+(1K)에서는 **91.33%의 정확도** 를 기록했습니다. 평균 질의당 비용은 **비슷하거나 더 저렴** 했습니다.

## AI 실무자를 위한 시사점
RLMs는 기존 LLM의 **컨텍스트 길이 한계를 근본적으로 해결** 하며, 장기 문서 분석, 코드 리포지토리 이해 등 복잡한 실세계 AI 애플리케이션의 개발 가능성을 확장합니다. **외부 REPL 환경을 통한 컨텍스트 관리** 와 **재귀적 서브-LLM 호출** 은 대규모 데이터 처리의 효율성을 높여 **비용 효율적** 으로 복잡한 문제를 해결할 수 있는 실용적인 방안을 제공합니다. 이는 LLM을 더욱 강력한 에이전트 시스템으로 발전시키는 데 중요한 방향성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.