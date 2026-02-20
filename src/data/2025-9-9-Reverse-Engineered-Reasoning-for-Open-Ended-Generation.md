---
title: "[논문리뷰] Reverse-Engineered Reasoning for Open-Ended Generation"
excerpt: "Wangchunshu Zhou이 arXiv에 게시한 'Reverse-Engineered Reasoning for Open-Ended Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Reasoning
  - Open-Ended Generation
  - Reverse-Engineered Reasoning (REER)
  - LLMs
  - Synthetic Data
  - Iterative Refinement
  - Perplexity Minimization
  - DeepWriting-20K

permalink: /ai/review/2025-9-9-Reverse-Engineered-Reasoning-for-Open-Ended-Generation/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06160)

**저자:** Wangchunshu Zhou, Minghao Liu, Qixin Xu, Haoran Que, Haozhe Wang



## 핵심 연구 목표
개방형(open-ended) 및 창의적 생성과 같이 검증 불가능한 도메인에서 대규모 언어 모델(LLM)에 **깊이 있는 추론 능력** 을 부여하는 것이 이 연구의 핵심 목표입니다. 기존의 강화 학습(RL) 및 증류(distillation) 방식의 한계, 즉 명확한 보상 신호 부재 및 높은 비용 문제를 극복하고자 합니다.

## 핵심 방법론
논문은 **REverse-Engineered Reasoning (REER)** 이라는 새로운 패러다임을 제안합니다. 이는 알려진 "좋은 결과물"로부터 잠재된 단계별 추론 과정을 역설계하여 발견하는 방식입니다. 구체적으로, 생성 모델의 **퍼플렉서티(perplexity)** 를 프록시로 사용하여 추론 경로(`z`)의 품질을 평가하고, **반복적 정제(Iterative Refinement)** 를 통해 최적의 추론 경로를 탐색하는 **구배 없는(gradient-free) 지역 탐색 알고리즘** 을 사용합니다. 이 과정을 통해 **DeepWriting-20K** 라는 20,000개의 합성 추론 궤적 데이터셋을 구축하고, **Qwen3-8B-Base** 모델을 파인튜닝하여 **인간과 유사한 사고 패턴(예: 'Hmm...', 'Wait...')** 을 주입합니다.

## 주요 결과
**DeepWriter-8B** 모델은 모든 벤치마크에서 강력한 오픈소스 베이스라인인 **LongWriter-8B** 를 **평균 18점 이상** 으로 능가합니다. 특히 **LongBench-Write** 에서 **91.28점** 을 기록하여 **GPT-4o (83.1점)** 및 **Claude 3.5 (89.3점)** 를 능가하는 성능을 보였습니다. 창의적인 **HelloBench (HB-B) 태스크** 에서는 **GPT-4o (87.6점)** 및 **Claude 3.5 (88.3점)** 와 통계적으로 유사한 **87.48점** 을 달성했으며, **WritingBench** 의 전문 글쓰기 태스크에서는 **Claude 3.5** 를 크게 앞지르고 **GPT-4o** 및 **Claude 3.7** 과 경쟁력 있는 성능을 보였습니다.

## AI 실무자를 위한 시사점
**REER** 패러다임은 고비용의 RL이나 독점 모델 증류 없이 LLM에 깊이 있는 추론 능력을 주입할 수 있는 확장 가능하고 비용 효율적인 "제3의 경로"를 제공합니다. 또한, 공개된 **DeepWriting-20K** 데이터셋은 개방형 생성에서 구조화된 사고 및 계획 메커니즘에 대한 향후 연구를 촉진할 것입니다. 이 연구는 **8B 규모의 모델** 이 고급 추론 능력을 내재화하여 대규모 독점 모델과 경쟁하거나 능가할 수 있음을 입증하며, AI 추론 능력의 민주화에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.