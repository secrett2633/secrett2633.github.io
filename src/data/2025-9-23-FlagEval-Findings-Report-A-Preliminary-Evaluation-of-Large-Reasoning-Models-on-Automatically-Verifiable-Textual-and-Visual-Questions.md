---
title: "[논문리뷰] FlagEval Findings Report: A Preliminary Evaluation of Large Reasoning
  Models on Automatically Verifiable Textual and Visual Questions"
excerpt: "tengdai722이 [arXiv]에 게시한 'FlagEval Findings Report: A Preliminary Evaluation of Large Reasoning
  Models on Automatically Verifiable Textual and Visual Questions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models
  - LLM Evaluation
  - Multimodal AI
  - Reasoning Behaviors
  - Hallucination
  - Contamination-Free
  - AI Safety
  - Instruction Following

permalink: /ai/review/2025-9-23-FlagEval-Findings-Report-A-Preliminary-Evaluation-of-Large-Reasoning-Models-on-Automatically-Verifiable-Textual-and-Visual-Questions/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17177)

**저자:** Bowen Qin, Chen Yue, Teng Dai, Jing-Shu Zheng, Miguel Hu Chen, Richeng Xuan, et al.



## 핵심 연구 목표
본 논문은 최신 **대규모 추론 모델(LRMs)**을 자동으로 검증 가능한 **텍스트 및 시각 질문**에 대해 **오염 없는(contamination-free)** 방식으로 평가하는 예비 보고서입니다. 추론 시간(inference-time) 사고(thinking)의 유용성, 모델의 행동 패턴, 그리고 현재 LRMs의 한계를 깊이 이해하는 것을 목표로 합니다. 특히, 모델 학습 과정에 사용되지 않은 **새로운 데이터를 활용**하여 메모이제이션 효과를 최소화합니다.

## 핵심 방법론
평가는 **새롭게 수집된 데이터셋**을 기반으로 진행되었으며, 텍스트 문제(대학 과목 질문, 단어 퍼즐, 해독)와 시각 문제(새로운 벤치마크 **ROME**)로 구성됩니다. 모델의 추론 과정은 **LLM 기반 행동 분석(LLM-assisted behavioral analysis)** 도구(**gpt-4.1-mini** 사용)를 통해 평가되어, **일관성 없는 답변(inconsistent answers)**, **환각적 도구 사용(hallucinated tool use)**, **추론의 중복성(redundancy)** 등의 행동을 정량화합니다. 각 문제에 대해 **평균 정확도**와 **토큰 소비량**을 기록하며, 결과는 **네 번의 실행(four runs)**을 평균하여 제시됩니다.

## 주요 결과
텍스트 문제에서 **GPT-5 시리즈**는 모든 유형의 문제에서 **일관되게 최고 성능**을 보였고, LRMs는 비사고형 모델보다 우수한 성능을 나타냈습니다. 시각 문제(새로운 **ROME 벤치마크**)에서는 **Gemini 2.5 Pro**가 전체 정확도에서 근소하게 앞섰으나, 텍스트 기반 추론 시간 스케일링은 시각 추론에서 **눈에 띄는 이점**을 가져오지 못했습니다. 일반적인 문제점으로는 **추론과 답변 간의 불일치**, **환각적 웹 검색/도구 사용**(특히 **Gemini 시리즈**), 그리고 오픈소스 LRMs의 **유해 콘텐츠 프롬프트에 대한 취약성**이 관찰되었습니다.

## AI 실무자를 위한 시사점
**LRM의 불투명한 추론 과정**과 **환각** 문제에 대한 **투명성 강화**가 필수적이며, **모델 신뢰도**를 높이기 위한 **일관된 사고 및 응답 전략 개발**이 요구됩니다. 특히 **시각적 추론**에서는 텍스트 기반의 **추론 시간 스케일링 효과가 제한적**이므로, **시각적 편집**이나 **외부 시각 모듈 통합**과 같은 새로운 접근 방식이 필요합니다. **데이터 오염 방지**와 **실세계 유틸리티**를 반영한 **새로운 벤치마크 설계**가 지속적으로 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.