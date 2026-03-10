---
title: "[논문리뷰] Lost in Stories: Consistency Bugs in Long Story Generation by LLMs"
excerpt: "Hongzhi Li이 arXiv에 게시한 'Lost in Stories: Consistency Bugs in Long Story Generation by LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Story Generation
  - Narrative Consistency
  - Benchmark
  - Automated Evaluation
  - Error Analysis
  - Long-Form Text Generation
  - Consistency Error Density (CED)

permalink: /ai/review/2026-03-10-Lost-in-Stories-Consistency-Bugs-in-Long-Story-Generation-by-LLMs/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05890)

**저자:** Junjie Li, Xinrui Guo, Yuhao Wu, Roy Ka-Wei Lee, Hongzhi Li, Yutao Xie



## 핵심 연구 목표
대규모 언어 모델(LLM)이 수만 단어에 달하는 장편 서사를 생성할 수 있게 되었지만, 설정된 사실, 캐릭터 특성, 세계 규칙 등 전반적인 일관성을 유지하는 데 실패하는 문제를 해결하는 것이 목표입니다. 기존 스토리 생성 벤치마크가 플롯 품질과 유창성에만 초점을 맞추어 일관성 오류가 간과되는 한계를 극복하고자 합니다.

## 핵심 방법론
장편 스토리 생성의 내러티브 일관성을 평가하기 위해 **ConStory-Bench** 벤치마크를 제시합니다. 이는 2,000개의 프롬프트와 4가지 태스크 시나리오를 포함하며, 5가지 주요 오류 카테고리와 19가지 세분화된 오류 유형의 **분류 체계** 를 정의합니다. 또한, 모순을 탐지하고 명시적인 텍스트 증거를 기반으로 판단하는 자동화된 평가 파이프라인인 **ConStory-Checker** 를 개발했습니다.

## 주요 결과
평가된 LLM들은 장편 내러티브 일관성 유지에 여전히 어려움을 겪고 있으며, **GPT-5-Reasoning** 이 가장 낮은 **CED (0.113)** 와 가장 좋은 **GRR (2.80)** 을 달성하며 최고의 성능을 보였습니다. 오류 분석 결과, **사실 및 세부 사항 일관성** 과 **타임라인 및 플롯 논리** 오류가 가장 흔한 실패 유형으로 나타났습니다. 특히 오류는 내러티브의 중간 부분(40-60% 범위)에 집중되는 경향이 있었고, 오류 발생 시 텍스트 세그먼트는 전체 텍스트보다 **상당히 높은 엔트로피(예: QWEN3-4B-INSTRUCT-2507에서 +19.24%)** 를 보였습니다.

## AI 실무자를 위한 시사점
장편 텍스트 생성 시 LLM의 **사실 추적 및 시간적 추론 능력** 을 개선하는 것이 매우 중요하며, 이는 주요 일관성 실패 모드임을 시사합니다. 모델의 **토큰 수준 불확실성(엔트로피)** 이 일관성 오류의 신뢰할 수 있는 예측 신호가 될 수 있으므로, 이를 활용하여 생성 중 **사전 경고 시스템** 이나 **자가 점검 루틴** 을 구현할 수 있습니다. 특히 장거리 컨텍스트에 의존하는 **시간적 및 지리적 오류** 에 대한 강력한 메모리 메커니즘 개발이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.