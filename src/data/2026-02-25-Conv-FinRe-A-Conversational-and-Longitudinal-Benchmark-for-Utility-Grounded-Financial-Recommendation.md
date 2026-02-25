---
title: "[논문리뷰] Conv-FinRe: A Conversational and Longitudinal Benchmark for Utility-Grounded Financial Recommendation"
excerpt: "[arXiv]에 게시된 'Conv-FinRe: A Conversational and Longitudinal Benchmark for Utility-Grounded Financial Recommendation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Financial Recommendation
  - Conversational AI
  - Large Language Models
  - Utility-Grounded Evaluation
  - Behavioral Finance
  - Stock Recommendation
  - Longitudinal Benchmark
  - Inverse Optimization

permalink: /ai/review/2026-02-25-Conv-FinRe-A-Conversational-and-Longitudinal-Benchmark-for-Utility-Grounded-Financial-Recommendation/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16990)

**저자:** Yan Wang, Yi Han, Lingfei Qian, Yueru He, Xueqing Peng, Dongji Feng, Zhuohan Xie, Vincent Jim Zhang, Rosie Guo, Fengran Mo, Jimin Huang, Yankai Chen, Xue (Steve) Liu, Jian-Yun Nie



## 핵심 연구 목표
본 논문은 금융 자문 분야에서 **LLM 기반 추천 시스템** 의 성능 평가가 단순히 사용자의 행동 모방에 그치지 않고, **실질적인 효용성(utility)에 기반한 의사결정 품질** 을 측정하는 것을 목표로 합니다. 사용자의 행동이 시장 변동성이나 단기적인 목표에 의해 왜곡될 수 있음을 지적하며, 모델이 합리적 분석을 따르는지, 사용자 노이즈를 모방하는지, 또는 시장 모멘텀에 의존하는지를 진단하는 벤치마크 **Conv-FinRe** 를 제안합니다.

## 핵심 방법론
Conv-FinRe는 금융 추천을 **다중 뷰 정렬 문제(multi-view alignment problem)** 로 공식화하여, 모델 순위를 **사용자 선택(Yuser)** , **합리적 효용(yutil)** , **시장 모멘텀(ymom)** , **위험 민감도(ysafe)** 네 가지 보완적인 참조 뷰와 비교합니다. **역 최적화(inverse optimization)** 를 통해 사용자의 종단적 행동 궤적에서 잠재적 위험 선호도(λi, γi)를 추론하며, 이를 바탕으로 효용 및 위험 기반 참조 순위를 구성합니다. 벤치마크는 **온보딩 인터뷰** 와 **단계별 자문 대화** 를 통해 LLM이 경쟁하는 자문 원칙들을 조정하도록 요구합니다.

## 주요 결과
대부분의 LLM은 높은 **uNDCG 점수(0.92-0.97)** 를 달성하여 합리적 효용에 따른 자산 순위 지정에 강한 기준점을 보여주지만, 이는 **사용자 선택(User Choice)** 회복으로 항상 이어지지 않습니다. 예를 들어, **Llama-3.3-70B-Instruct** 는 uNDCG에서 최고점( **0.97** )을 기록했음에도 낮은 Hit Rate를 보였습니다. **Qwen2.5-72B-Instruct** 및 **Llama3-XuanYuan3-70B-Chat** 모델은 **MRR** 및 **HR@K** 에서 우수하여 사용자 의사결정 패턴 모방에 더 효과적임을 나타냈습니다. 이 결과는 합리적인 의사결정 품질과 행동적 정렬 사이의 근본적인 긴장을 드러냅니다.

## AI 실무자를 위한 시사점
AI 실무자들은 금융 추천 시스템 개발 시, 사용자의 클릭이나 평점과 같은 **표면적인 행동 모방** 을 넘어 **진정한 투자 효용성** 을 기반으로 모델을 평가하고 최적화해야 합니다. Conv-FinRe는 **다중 참조 뷰** 를 제공하여 LLM이 사용자 행동의 어떤 측면에 편향되어 있는지 진단할 수 있게 함으로써, **단기 시장 노이즈** 나 사용자의 일시적인 행동에 과적합되지 않는 **장기적인 투자자 선호도** 를 반영하는 LLM을 개발하는 데 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.