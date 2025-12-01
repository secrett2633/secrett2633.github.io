---
title: "[논문리뷰] TokDrift: When LLM Speaks in Subwords but Code Speaks in Grammar"
excerpt: "이 [arXiv]에 게시한 'TokDrift: When LLM Speaks in Subwords but Code Speaks in Grammar' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code LLMs
  - Subword Tokenization
  - Grammar-aware Tokenization
  - Semantic Preservation
  - Rewrite Rules
  - Model Robustness
  - Tokenization Misalignment

permalink: /ai/review/2025-10-17-TokDrift-When-LLM-Speaks-in-Subwords-but-Code-Speaks-in-Grammar/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14972)

**저자:** Yinxi Li, Yuntian Deng, Pengyu Nie



## 핵심 연구 목표
본 논문은 **Code LLM** 이 사용하는 **서브워드 토크나이저** 와 프로그래밍 언어(PL) 문법 간의 불일치 문제를 해결하고자 합니다. 통계에 기반한 서브워드 토크나이저가 공백이나 식별자 명명과 같은 표면적 요인에 따라 동일한 의미의 코드 스니펫을 다르게 토큰화하는 현상이 모델 동작에 미치는 영향을 정량적으로 측정하는 것이 주된 연구 목적입니다.

## 핵심 방법론
연구팀은 의미론적으로 동일하지만 토큰화만 다른 코드 변형을 생성하기 위해 **TOKDRIFT** 라는 프레임워크를 도입했습니다. 이 프레임워크는 공백 변경 또는 식별자 대소문자 스타일 변경과 같은 **의미 보존(semantic-preserving) 재작성 규칙** 을 적용하여 코드를 변형합니다. **Llama-3, Qwen2.5-Coder, DeepSeek-Coder** 등 **9개의 Code LLM** 을 대상으로 버그 수정, 코드 요약, 코드 번역의 세 가지 프로그래밍 태스크에서 **정확도(accuracy)** , **정확도 변화(Δaccuracy)** , **민감도(sensitivity)** 를 측정했습니다.

## 주요 결과
실험 결과, 사소한 토큰화 변화도 모델 동작에 상당한 영향을 미치는 것으로 나타났습니다. 가장 성능이 뛰어난 모델인 **Qwen2.5-Coder-32B-Instruct** 는 입력 토큰화가 변경될 때 예측이 **6.09%** 변경되었으며, 특정 재작성 규칙 하에서는 **최대 60%** 까지 변화했습니다. 대부분의 재작성 규칙은 모델 정확도에 **-2.90에서 +0.32** 절대 백분율 포인트 범위의 측정 가능한 변화를 야기했습니다. 레이어별 분석을 통해 이 문제는 **초기 임베딩 레이어** 에서 발생하며, 서브워드 분할이 문법적 토큰 경계를 포착하지 못하는 것이 주원인임을 밝혔습니다.

## AI 실무자를 위한 시사점
현재의 **Code LLM** 은 표면적인 코드 형식 변경에도 민감하게 반응하여 모델의 **코드 이해 및 생성 견고성** 에 심각한 제한이 있음을 시사합니다. 이는 특히 **코드 생성 및 자동화** 와 같은 실제 AI 애플리케이션에서 예측 불가능한 동작으로 이어질 수 있습니다. 따라서, **문법 인식 토크나이저** 를 개발하여 **PL 구조** 를 보다 충실하게 반영하는 것이 미래 **Code LLM** 의 신뢰성을 높이는 데 필수적이며, 이는 **AI 엔지니어** 가 모델 설계 시 고려해야 할 중요한 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.