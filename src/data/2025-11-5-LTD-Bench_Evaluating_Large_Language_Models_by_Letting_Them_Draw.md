---
title: "[논문리뷰] LTD-Bench: Evaluating Large Language Models by Letting Them Draw"
excerpt: "이 [arXiv]에 게시한 'LTD-Bench: Evaluating Large Language Models by Letting Them Draw' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Spatial Reasoning
  - Benchmark
  - Generative AI
  - Visual Perception
  - Spatial Imagination
  - Code Generation

permalink: /ai/review/2025-11-5-LTD-Bench_Evaluating_Large_Language_Models_by_Letting_Them_Draw/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02347)

**저자:** Liuhao Lin, Ke Li et al.



## 핵심 연구 목표
현재 LLM 평가 방식이 **공간 추론 능력**의 근본적인 한계를 가리는 추상적인 수치에 의존하여 모델 역량에 대한 직관적 이해를 제공하지 못하는 문제를 해결하고자 합니다. 본 연구는 LLM의 추상적인 점수를 시각적으로 관찰 가능한 결과물로 전환하여, **언어-공간 양방향 매핑 능력**을 직관적으로 평가하는 **LTD-Bench** 벤치마크를 제안합니다.

## 핵심 방법론
**LTD-Bench**는 LLM이 텍스트 명령을 바탕으로 **도트 매트릭스** 또는 **실행 가능한 코드**를 통해 그림을 생성하도록 요구하여 시각적 결과물을 직접 출력합니다. 이 벤치마크는 **생성 작업** (공간 상상력 평가)과 **인식 작업** (공간 지각 평가)의 두 가지 상보적인 평가 경로를 포함하며, **쉬움, 보통, 어려움**의 세 가지 난이도 수준으로 점진적인 복잡성을 제공합니다. 평가는 주로 **GPT-4.1 기반의 자동 평가**와 일부 **인간 평가**를 병행하여 수행됩니다.

## 주요 결과
실험 결과, 최첨단 LLM조차 **언어와 공간 개념 간의 양방향 매핑**에서 심각한 결함을 보였습니다. **Deepseek-r1**은 평균 **71.54%**의 정확도를 기록했지만, 다른 모델들은 **Deepseek-r1**의 인식 정확도가 **GPT-4.1-mini**보다 **25% 이상** 높았음에도 불구하고 전반적으로 낮은 성능을 보였습니다. 특히 **Qwen2.5-72B-Instruct** 및 **Llama3.3-70B-Instruct** 같은 소규모 모델은 평균 **30%** 내외의 정확도에 그쳤으며, 멀티모달 LLM이 텍스트 전용 LLM 대비 명확한 이점을 보이지 않았습니다.

## AI 실무자를 위한 시사점
**LTD-Bench**는 현재 LLM이 물리 세계와 상호작용하고 추론하는 데 필수적인 **공간 추론 능력**이 부족하다는 중요한 한계를 시각적으로 드러냅니다. 이는 LLM 개발자들이 추상적인 지표를 넘어 실제 모델의 약점을 진단하고, **언어-공간 매핑** 개선에 집중해야 함을 시사합니다. 또한, 생성된 이미지의 **스타일 유사성 비교**를 통한 모델 유사도 분석은 새로운 진단 도구로서 AI 연구에 귀중한 통찰력을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.