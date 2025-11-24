---
title: "[논문리뷰] SciVideoBench: Benchmarking Scientific Video Reasoning in Large
  Multimodal Models"
excerpt: "Mohit Bansal이 [arXiv]에 게시한 'SciVideoBench: Benchmarking Scientific Video Reasoning in Large
  Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Multimodal AI
  - Scientific Research
  - Large Multimodal Models
  - Benchmark
  - Quantitative Reasoning
  - Domain Knowledge
  - Visual Grounding

permalink: /ai/review/2025-10-10-SciVideoBench-Benchmarking-Scientific-Video-Reasoning-in-Large-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08559)

**저자:** Andong Deng, Taojiannan Yang, Shoubin Yu, Lincoln Spencer, Mohit Bansal, Chen Chen, Serena Yeung-Levy, Xiaohan Wang



## 핵심 연구 목표
기존 비디오 벤치마크들이 일반 시나리오와 단순 추론에 집중하여 최신 **대규모 멀티모달 모델(LMM)**의 고급 인지 능력을 평가하는 데 한계가 있음을 지적하며, 과학 분야에서의 복잡한 비디오 추론 능력을 종합적으로 평가할 수 있는 엄격한 벤치마크인 **SciVideoBench**를 구축하는 것을 목표로 합니다. 이 연구는 **LMM**이 전문 지식, 정밀한 시공간적 인지, 복잡한 논리적 추론을 요구하는 과학적 맥락의 고차원 인지 능력을 얼마나 잘 수행하는지 평가하고자 합니다.

## 핵심 방법론
**Journal of Visualized Experiments (JoVE)**에서 엄선된 **241편의 연구 등급 실험 비디오**를 기반으로 **1,000개**의 다지선다형 질문을 생성했습니다. 질문 유형은 **개념적(Conceptual)**, **가설적(Hypothetical)**, **정량적(Quantitative)** 추론으로 분류되며, 각 질문은 시각적 증거에 기반한 정밀한 시공간적 인지, 과학적 도메인 지식, 복잡한 논리적 추론을 요구합니다. 벤치마크 구축에는 **Gemini 2.5 Pro** 기반의 멀티 에이전트 **LLM** 시스템과 인간 전문가가 협력하는 파이프라인이 활용되어 질문 생성, 답변 검증, 시각적 접지 및 오류 분석의 정확도를 높였습니다.

## 주요 결과
**SciVideoBench** 평가 결과, 최첨단 독점 모델인 **Gemini 2.5 Pro**가 **64.30%**의 전체 정확도를 기록했으나, 최고 성능의 오픈소스 모델인 **InternVL-3-78B-Instruct**는 **38.80%**에 그쳐 현저한 성능 격차를 보였습니다. 특히 **정량적 추론**에서 **Gemini 2.5 Pro**가 **50.61%**를 달성한 반면, 오픈소스 모델은 **22.04%**에 머물러 큰 취약점을 드러냈으며, 인간 전문가의 평가 정확도는 **17.4%**로 벤치마크의 높은 난이도를 입증했습니다. **Chain-of-Thought(CoT)** 프롬프팅은 독점 모델의 전체 정확도를 평균 **+21.10%** 향상시켰고, **GPT-4o**의 정량적 추론 정확도를 **11.84%**에서 **34.29%**로 크게 끌어올려 복잡한 추론 과정의 중요성을 강조했습니다.

## AI 실무자를 위한 시사점
**SciVideoBench**는 **LMM**이 실제 과학 연구 환경에서 요구되는 심층적인 비디오 추론 능력을 평가하는 데 있어 상당한 도전 과제를 제시합니다. 특히 **정량적 추론**과 **정확한 시각적 인지**, 그리고 **도메인 특화 지식**의 중요성을 강조하며, 이는 향후 **LMM** 개발에서 정밀한 시공간적 정보 추출 및 복잡한 계산 능력을 강화하는 방향으로 연구가 진행되어야 함을 시사합니다. **CoT** 프롬프팅이 특히 정량적 추론에서 효과적임을 보여, 복잡한 다단계 추론을 요구하는 과학적 시나리오에서 명시적인 추론 단계가 **LMM** 성능 향상에 핵심적인 역할을 할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.