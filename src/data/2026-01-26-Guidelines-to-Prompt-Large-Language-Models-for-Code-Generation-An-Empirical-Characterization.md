---
title: "[논문리뷰] Guidelines to Prompt Large Language Models for Code Generation: An Empirical Characterization"
excerpt: "Gabriele Bavota이 arXiv에 게시한 'Guidelines to Prompt Large Language Models for Code Generation: An Empirical Characterization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Code Generation
  - Prompt Engineering
  - Prompt Optimization
  - Empirical Study
  - Software Engineering
  - Guidelines

permalink: /ai/review/2026-01-26-Guidelines-to-Prompt-Large-Language-Models-for-Code-Generation-An-Empirical-Characterization/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.13118)

**저자:** Alessandro Midolo, Alessandro Giagnorio, Fiorella Zampetti, Rosalia Tufano, Gabriele Bavota, Massimiliano Di Penta



## 핵심 연구 목표
본 연구는 **LLM 기반 코드 생성** 시 개발자들이 효과적인 프롬프트를 작성할 수 있도록 돕는 구체적인 가이드라인이 부족하다는 문제점을 해결하고자 합니다. 일반적인 프롬프트 최적화 방법론을 넘어, 소프트웨어 개발 특유의 요구사항을 반영한 실무 지향적 프롬프트 개선 가이드라인을 도출하고 그 유용성을 실증적으로 검증하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **GPT-40 mini** , **Llama 3.3 70B Instruct** , **Qwen2.5 72B Instruct** , **DeepSeek Coder V2 Instruct** 네 가지 LLM과 **BigCodeBench** , **HumanEval+** , **MBPP+** 세 가지 Python 코드 생성 벤치마크를 활용했습니다. LLM이 테스트를 통과하지 못한 코드에 대해 **반복적인 테스트 피드백** 을 제공하며 프롬프트를 자동 개선했고, 이 과정에서 성공적으로 코드를 생성한 초기 및 최종 프롬프트를 수동 분석하여 **10가지 프롬프트 개선 항목** 을 도출했습니다. 이 가이드라인은 **50명의 실무자 대상 설문 조사** 를 통해 사용 빈도와 인지된 유용성을 평가받았습니다.

## 주요 결과
본 연구를 통해 **I/O 형식, 사전/사후 조건, 요구사항, 예외 처리, 알고리즘 세부 사항, 변수 명명, 조건 명확화, 추가 예시, 단호한 언어 사용** 과 관련된 10가지 프롬프트 최적화 가이드라인이 도출되었습니다. 실무자들은 **I/O 형식** 및 **사전/사후 조건** 개선 패턴을 주로 사용한다고 보고했으며, 특히 **I/O 형식** (88% '매우 유용')과 **사전 조건** (78% '매우 유용')을 가장 유용하다고 인식했습니다. 흥미롭게도 '더 많은 예시'는 사용 빈도가 낮았음에도 **74%** 가 '매우 유용'하다고 평가하여 잠재적 유용성을 시사했습니다.

## AI 실무자를 위한 시사점
본 연구에서 제시된 **10가지 가이드라인** 은 LLM을 활용한 코드 생성 시 개발자들이 보다 효과적인 프롬프트를 작성하여 **코드의 품질과 정확성** 을 높이는 데 직접적인 도움을 줄 수 있습니다. 또한, 이 가이드라인은 소프트웨어 엔지니어링 커리큘럼에서 **프롬프트 엔지니어링 교육** 의 핵심 자료로 활용될 수 있으며, 누락된 요소를 식별하고 개선을 제안하는 **자동화된 프롬프트 평가 및 최적화 도구** 개발의 기반을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.