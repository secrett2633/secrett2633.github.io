---
title: "[논문리뷰] RiddleBench: A New Generative Reasoning Benchmark for LLMs"
excerpt: "이 [arXiv]에 게시한 'RiddleBench: A New Generative Reasoning Benchmark for LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Generative AI
  - Benchmark
  - Logical Deduction
  - Spatial Reasoning
  - Constraint Satisfaction
  - Hallucination Cascade
  - Self-Correction

permalink: /ai/review/2025-11-5-RiddleBench_A_New_Generative_Reasoning_Benchmark_for_LLMs/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24932)

**저자:** Deepon Halder, Alan Saji, Thanmay Jayakumar, Ratish Puduppully, Anoop Kunchukuttan, Raj Dabre



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 인간 지능의 핵심 요소인 유연하고 다면적인 추론 능력(논리적 추론, 공간 인식, 제약 조건 만족)을 평가하는 데 있어 기존 벤치마크의 한계를 해결하고자 합니다. 특히, LLMs의 복합적인 다단계 추론 능력을 심층적으로 진단하고, 그 취약성을 밝히는 새로운 벤치마크인 **RiddleBench**를 제시합니다.

## 핵심 방법론
**RiddleBench**는 경쟁 시험에서 추출된 **1,737개**의 영어 퍼즐로 구성되며, 순차 추론, 좌석 배치, 혈연 관계, 코딩-디코딩의 네 가지 범주를 포함합니다. 데이터는 **Gemini 2.5 Flash**를 사용한 **OCR** 및 수동 검증을 통해 수집되었고, **제로샷 프롬프트**와 **8192 토큰**의 사고 예산으로 **GPT-oss-120B**, **Gemini 2.5 Pro**, **03**, **Claude 4 Sonnet** 등 최첨단 모델들이 평가되었습니다.

## 주요 결과
최상위 모델들도 **RiddleBench**에서 약 **60%** 초반의 정확도(예: **GPT-oss-120B 69.26%**, **Gemini 2.5 Pro 60.30%**)를 기록하며 근본적인 약점을 드러냈고, 특히 **좌석 배치 퍼즐**에서 가장 어려움을 겪었습니다. 모델 간 교차 모델 교정에서는 잘못된 추론을 **45.2%**의 확률로 잘못 확인하는 "환각 연쇄(hallucination cascade)" 현상이 관찰되었으며, 자기 교정 성공률은 **17.3%**로 낮아 강력한 자기 확증 편향을 시사합니다.

## AI 실무자를 위한 시사점
현재 LLMs는 복잡한 다단계 추론, 특히 공간 및 제약 조건 만족을 요구하는 시나리오에서 여전히 취약하며, 겉으로 드러나는 정확도 이상의 신뢰성 문제를 가지고 있습니다. LLM 개발자들은 모델의 **환각 연쇄** 및 **자기 확증 편향**과 같은 문제를 해결하고, 입력 정보의 순서 변경이나 불필요한 정보 추가에도 강건한 추론 능력을 갖추도록 노력해야 합니다. **RiddleBench**는 이러한 취약점을 진단하고 보다 신뢰할 수 있는 LLM을 개발하는 데 중요한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.