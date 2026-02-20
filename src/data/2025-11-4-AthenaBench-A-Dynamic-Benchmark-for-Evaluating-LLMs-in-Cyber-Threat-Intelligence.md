---
title: "[논문리뷰] AthenaBench: A Dynamic Benchmark for Evaluating LLMs in Cyber Threat
  Intelligence"
excerpt: "Peter Worth이 arXiv에 게시한 'AthenaBench: A Dynamic Benchmark for Evaluating LLMs in Cyber Threat
  Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Benchmarking
  - Cyber Threat Intelligence (CTI)
  - Dynamic Evaluation
  - CTI Reasoning
  - Vulnerability Prediction
  - Threat Actor Attribution
  - Risk Mitigation
  - Natural Language Processing

permalink: /ai/review/2025-11-4-AthenaBench-A-Dynamic-Benchmark-for-Evaluating-LLMs-in-Cyber-Threat-Intelligence/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01144)

**저자:** Md Tanvirul Alam, Dipkamal Bhusal, Salman Ahmad, Nidhi Rastogi, Peter Worth



## 핵심 연구 목표
현재 LLM(Large Language Model) 벤치마크들이 정적 데이터셋에 의존하고 암기 능력을 주로 평가하여 현실적인 CTI(Cyber Threat Intelligence) 추론 능력을 제대로 측정하지 못하는 문제를 해결하고자 합니다. 본 연구는 LLM의 CTI 관련 추론 능력을 종합적으로 평가하기 위한 **동적 벤치마크인 AthenaBench** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
`AthenaBench`는 기존 `CTIBench`를 확장하여 데이터셋 생성 파이프라인을 개선하고, 중복을 제거하며, **위험 완화 전략(Risk Mitigation Strategies, RMS)** 을 포함한 6가지 CTI 관련 태스크를 추가했습니다. **MITRE ATT&CK** 및 **NVD API** 와 같은 실시간 CTI 데이터 소스를 활용하여 벤치마크 샘플을 지속적으로 업데이트하며, **GPT-5** , **Gemini-2.5 Pro** 등 12개 LLM을 대상으로 정확도, F1-점수, 정규화된 MAD(Mean Absolute Deviation)와 같은 다양한 지표를 사용하여 평가했습니다.

## 주요 결과
**GPT-5** 가 **66.1%** 의 가장 높은 종합 점수를 달성하고 **Gemini-2.5 Pro** 가 **63.6%** 로 뒤를 이으며, 전반적으로 독점 LLM들이 오픈소스 모델을 능가했습니다. 모델들은 **취약성 심각도 예측(Vulnerability Severity Prediction, VSP)** 과 같은 정형화된 작업에서는 높은 정확도를 보였으나, **위험 완화 전략(RMS)** (GPT-5: **32.6% F1-점수** ) 및 **위협 행위자 귀속(Threat Actor Attribution, TAA)** (GPT-5: **39% 정확도** )과 같은 추론 집약적 작업에서는 현저히 낮은 성능을 보였습니다. 웹 검색 기능을 통합했을 때 **RMS** 에서 **19.3%** , **TAA** 에서 **24.0%** 의 유의미한 성능 향상이 관찰되었습니다.

## AI 실무자를 위한 시사점
`AthenaBench`는 변화하는 사이버 위협 환경에 맞춰 **LLM의 CTI 추론 능력을 지속적으로 평가** 할 수 있는 표준화된 프레임워크를 제공합니다. LLM이 **정형화된 CTI 분석에는 유용** 하지만, **복잡한 추론 및 전략 수립 작업에서는 여전히 상당한 한계** 를 가지고 있음을 보여주므로, CTI 워크플로우의 완전 자동화를 위해서는 더 많은 연구와 발전이 필요합니다. 또한, **외부 지식 검색 기능의 통합** 이 LLM의 추론 성능을 크게 향상시킬 수 있음을 강조하며, **검색 증강 생성(RAG)** 과 같은 기법의 중요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.