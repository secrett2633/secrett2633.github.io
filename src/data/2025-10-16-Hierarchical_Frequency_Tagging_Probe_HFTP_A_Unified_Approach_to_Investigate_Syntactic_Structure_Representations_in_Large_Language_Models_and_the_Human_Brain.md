---
title: "[논문리뷰] Hierarchical Frequency Tagging Probe (HFTP): A Unified Approach to
  Investigate Syntactic Structure Representations in Large Language Models and
  the Human Brain"
excerpt: "Lingxi Lu이 [arXiv]에 게시한 'Hierarchical Frequency Tagging Probe (HFTP): A Unified Approach to
  Investigate Syntactic Structure Representations in Large Language Models and
  the Human Brain' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Syntactic Structure
  - Human Brain
  - Frequency Tagging
  - Neuroscience
  - Model Interpretability
  - Representational Similarity Analysis
  - Intracranial EEG

permalink: /ai/review/2025-10-16-Hierarchical_Frequency_Tagging_Probe_HFTP_A_Unified_Approach_to_Investigate_Syntactic_Structure_Representations_in_Large_Language_Models_and_the_Human_Brain/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13255)

**저자:** Jingmin An, Yilong Song, Ruolin Yang, Nai Ding, Lingxi Lu, Yuxuan Wang, Wei Wang, Chu Zhuang, Qian Wang, Fang Fang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 인간 수준의 언어 능력을 보여주지만 구문 구조를 모델링하는 특정 연산 모듈이 불분명하다는 문제에 주목합니다. LLM의 행동 능력이 인간 뇌의 메커니즘과 유사한지 탐구하고, LLM의 **뉴런 단위 구성 요소(예: MLP 뉴런)**와 인간 뇌의 **피질 영역(두개내 기록)**에서 구문 구조 표현을 식별하기 위한 **계층적 주파수 태깅 프로브(HFTP)**라는 통합된 접근 방식을 제시하는 것을 목표로 합니다.

## 핵심 방법론
**HFTP**는 **주파수 도메인 분석**을 활용하여 LLM의 **MLP 뉴런**과 인간 뇌의 **sEEG 전극 채널**에서 구문 구조 표현을 식별합니다. LLM의 경우, 활성화 값은 **4Hz의 시간 스케일**로 정의되고 **Fast Fourier Transform (FFT)**을 통해 주파수 도메인으로 변환됩니다. **순열 테스트**와 **z-score 편차**를 사용하여 **1Hz(문장)** 및 **2Hz(구)** 주파수에서 유의미한 뉴런을 식별하고, 인간 뇌 데이터는 **Inter-Trial Phase Coherence (ITPC)**로 분석됩니다. 최종적으로, LLM과 인간 뇌의 구문 구조 표현 정렬은 **Structure Representational Dissimilarity Matrices (SRDMs)**를 구축하고 **Representational Similarity Analysis (RSA)**를 통해 **Spearman 상관관계**로 정량화됩니다.

## 주요 결과
**GPT-2, Gemma, Gemma 2, Llama 2, Llama 3.1, GLM-4**와 같은 LLM들은 유사한 계층에서 구문을 처리하지만, 인간 뇌는 다른 구문 수준에 따라 상이한 피질 영역에 의존하는 것으로 나타났습니다. **Representational similarity analysis (RSA)** 결과, LLM 표현과 언어 처리에 지배적인 **좌뇌 반구** 사이에 더 강한 정렬이 관찰되었습니다. 특히, **Gemma 2**는 **Gemma**보다 더 큰 뇌 유사성(예: Gemma 2의 문장 코퍼스 좌뇌 유사도 **0.644 L**이 Gemma의 **0.582 L**보다 높음)을 보였지만, **Llama 3.1**은 **Llama 2**보다 뇌와의 정렬이 감소했습니다(예: Llama 3.1의 문장 코퍼스 좌뇌 유사도 **0.514 L**이 Llama 2의 **0.645 L**보다 낮음).

## AI 실무자를 위한 시사점
**HFTP**는 **LLM의 내부 작동 방식**을 이해하고 **해석 가능성**을 높이는 데 중요한 도구입니다. 이 연구는 LLM의 성능 개선이 항상 인간 뇌와 유사한 메커니즘을 통해 이루어지는 것은 아님을 시사하며, **모델 아키텍처와 훈련 데이터**가 LLM의 인지적 특성에 미치는 영향을 심층적으로 분석해야 할 필요성을 강조합니다. **오픈 소스 도구**(`https://github.com/LilTiger/HFTP`)로 제공되어 LLM 개발자들이 모델을 평가하고 인간의 언어 처리와 더욱 유사한 시스템을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.