---
title: "[논문리뷰] AetherCode: Evaluating LLMs' Ability to Win In Premier Programming
  Competitions"
excerpt: "Yidi Du이 [arXiv]에 게시한 'AetherCode: Evaluating LLMs' Ability to Win In Premier Programming
  Competitions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Competitive Programming
  - LLM Evaluation
  - Code Reasoning
  - Benchmark
  - Test Case Generation
  - Programming Competitions
  - Algorithmic Problems

permalink: /ai/review/2025-8-25-AetherCode-Evaluating-LLMs-Ability-to-Win-In-Premier-Programming-Competitions/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.16402)

**저자:** Zihan Wang, Jiaze Chen, Zhicheng Liu, Markus Mak, Yidi Du



## 핵심 연구 목표
현재 대규모 언어 모델(LLM)의 코드 추론 능력 평가 벤치마크들이 모델의 실제 역량을 과대평가하며, 엘리트 인간 프로그래머와의 격차를 숨기고 있다는 문제 의식에서 출발합니다. 본 논문은 기존 벤치마크의 난이도 및 범위 부족, 저품질 테스트 케이스로 인한 평가 편향을 해결하고, LLM의 경쟁 프로그래밍 능력을 더욱 정확하게 측정하기 위한 새로운 벤치마크인 **AetherCode** 를 제시하는 것을 목표로 합니다.

## 핵심 방법론
**AetherCode** 는 **IOI(International Olympiad in Informatics)** 및 **ICPC(International Collegiate Programming Contest)** 와 같은 최고 수준의 경쟁 프로그래밍 대회에서 문제들을 수집하여 벤치마크를 구축했습니다. 문제들은 PDF에서 **Markdown+LaTeX** 형식으로 변환되었고, 전문가들에 의해 분류 태그가 지정되었습니다. 특히, 테스트 케이스는 **자동 생성** 과 **전문가 큐레이션** 을 결합한 하이브리드 방식으로 생성되었으며, **30,000개 이상의 인간 솔루션** 에 대한 검증을 통해 **100% True Positive Rate (TPR)** 및 **100% True Negative Rate (TNR)** 를 달성하여 높은 품질과 신뢰성을 보장합니다.

## 주요 결과
**AetherCode** 벤치마크에서 **04-mini-high** 와 **Gemini-2.5-Pro** 모델이 각각 **35.5% Pass@1** 및 **32.7% Pass@1** 정확도로 다른 모델들을 크게 능가하며, 유일하게 "Extremely Difficult" 문제들을 해결할 수 있었습니다. 추론 모델들은 비추론 모델들보다 전반적으로 우수한 성능을 보였으며, 샘플링 횟수 증가 시 **Pass@4** 점수가 **Pass@1** 대비 **04-mini-high** 는 **11.1% (35.5%→46.6%)** , **Gemini-2.5-Pro** 는 **13.3% (32.5%→46.0%)** 향상되어 상위 모델의 탐색 능력이 뛰어남을 입증했습니다. 하지만 모든 모델들은 **Computational Geometry** 와 **Tree Structures** 같은 복잡한 알고리즘 카테고리에서 현저히 낮은 성능을 보였습니다.

## AI 실무자를 위한 시사점
**AetherCode** 는 LLM의 **실제 알고리즘적 추론 및 문제 해결 능력** 에 대한 보다 현실적인 시각을 제공합니다. 현재 LLM이 상위권 인간 경쟁자 수준에 도달하려면 여전히 상당한 발전이 필요하며, 특히 **복잡한 자료구조, 기하학, 동적 계획법** 등 심층적인 알고리즘 지식을 요구하는 영역에 대한 연구가 시급합니다. 또한, **고품질의 종합적인 테스트 케이스** 를 구축하는 것이 모델 성능 평가의 신뢰성에 매우 중요함을 강조하며, LLM 개발 시 **다양한 엣지 케이스와 효율성** 을 고려한 강건한 코드 생성에 집중해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.