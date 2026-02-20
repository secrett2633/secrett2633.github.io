---
title: "[논문리뷰] Instruction-Following Evaluation in Function Calling for Large Language
  Models"
excerpt: "NikolaiSkripko이 arXiv에 게시한 'Instruction-Following Evaluation in Function Calling for Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Function Calling
  - LLMs
  - Instruction Following
  - Benchmarking
  - JSON Schema
  - AI Agents
  - Evaluation Metrics

permalink: /ai/review/2025-9-29-Instruction-Following-Evaluation-in-Function-Calling-for-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18420)

**저자:** Nikolai Skripko



## 핵심 연구 목표
이 논문은 기존의 함수 호출 벤치마크(BFCL, τ²-Bench, ACEBench 등)가 인수의 정확성만을 평가하고, 매개변수 설명에 포함된 **형식 지정 지침(예: 이중 따옴표, ISO 날짜 형식)** 준수 여부를 테스트하지 않는 문제를 해결하고자 합니다. 이를 위해 LLM의 정밀한 지침 준수 능력을 평가하는 새로운 벤치마크인 **IFEval-FC** 를 도입하여 AI 에이전트의 견고성 평가에 있어 중요한 격차를 해소하는 것을 목표로 합니다.

## 핵심 방법론
**IFEval-FC** 는 기존 IFEval 벤치마크의 "검증 가능한 지침" 개념을 활용하여, 각 지침을 **JSON 스키마 매개변수 설명의 description 필드** 에 직접 내장합니다. 이 지침들은 알고리즘적 검증을 통해 **객관적이고 자동화된 평가** 가 가능하도록 설계되었습니다. 데이터셋은 총 **750개의 테스트 케이스** 로 구성되며, 각 케이스는 특정 형식 제약 조건을 포함하는 함수와 해당 사용자 질의로 이루어져 있습니다. 모델이 함수를 호출하지 않는 경향을 완화하기 위해 " **YOU MUST CALL A FUNCTION NO MATTER WHAT.** "이라는 시스템 메시지를 강제 적용했습니다.

## 주요 결과
평가 결과, **GPT 04 mini low** 가 **79.87%** , **GPT 5 minimal** 이 **77.73%** 의 최고 정확도를 기록했음에도 불구하고, 어떠한 평가 모델도 전체 정확도 **80%** 를 넘어서지 못했습니다. 이는 **GPT-5 (OpenAI, 2025)** 및 **Claude Opus 4.1 (Anthropic, 2025)** 과 같은 최첨단 모델조차 기본적인 형식 지정 규칙을 자주 준수하지 못함을 의미하며, **GigaChat 2** 는 **22.40%** 로 매우 낮은 성능을 보였습니다. 특히 **Json Format** 과 같은 일부 지침에서는 모델들의 성능이 **0.00%** 로 매우 저조한 경우도 있었습니다.

## AI 실무자를 위한 시사점
**IFEval-FC** 는 LLM 기반 AI 에이전트의 **실제 적용 견고성** 에 대한 중요한 통찰력을 제공합니다. 현재 최고의 LLM조차 매개변수의 사소한 형식 지정 지침을 따르지 못하는 경우가 빈번하므로, AI 실무자들은 LLM을 활용한 함수 호출 시 **견고한 오류 처리 메커니즘** 과 **사후 처리 로직** 을 반드시 구현해야 합니다. 이 벤치마크는 모델 선택 및 미세 조정 과정에서 단순히 기능적 정확성뿐만 아니라 **세부적인 지침 준수 능력** 을 핵심 평가 요소로 고려해야 할 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.