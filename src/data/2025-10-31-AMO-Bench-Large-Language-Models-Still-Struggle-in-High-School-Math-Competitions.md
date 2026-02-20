---
title: "[논문리뷰] AMO-Bench: Large Language Models Still Struggle in High School Math
  Competitions"
excerpt: "arXiv에 게시된 'AMO-Bench: Large Language Models Still Struggle in High School Math
  Competitions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Mathematical Reasoning
  - Olympiad-level Math
  - Benchmark
  - Performance Saturation
  - Test-time Scaling
  - AMO-Bench

permalink: /ai/review/2025-10-31-AMO-Bench-Large-Language-Models-Still-Struggle-in-High-School-Math-Competitions/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26768)

**저자:** Shengnan An, Xunliang Cai, Xuezhi Cao, Xiaoyu Li, Yehao Lin, Junlin Liu, Xinxuan Lv, Dan Ma, Xuanlin Wang, Ziwen Wang, Shuang Zhou



## 핵심 연구 목표
기존 대규모 언어 모델(LLM) 수학 벤치마크들의 **성능 포화 문제** 를 해결하고, LLM의 고급 수학적 추론 능력을 보다 엄격하게 평가하기 위한 새로운 벤치마크 `AMO-Bench`를 제안하는 것이 목표입니다. 특히, 국제 수학 올림피아드(IMO) 수준 이상의 난이도를 가진 **원천적으로 새로운 문제** 들을 통해 LLM의 진정한 추론 한계를 탐색하고자 합니다.

## 핵심 방법론
`AMO-Bench`는 50개의 **인간이 직접 만든 독창적인 문제** 로 구성되며, 모든 문제는 전문가에 의해 **IMO 난이도 기준** 을 충족하도록 교차 검증되었습니다. 평가를 위해 최종 답안만 요구하여 **자동 채점(파서 기반 및 LLM 기반)** 이 가능하게 하였고, 성능 누출 방지를 위해 **기존 데이터셋과의 유사성 검토** 를 거쳤습니다. 또한, 모델의 추론 과정을 분석할 수 있도록 **인간이 주석한 추론 경로** 를 제공합니다.

## 주요 결과
실험 결과, 현재 최고의 성능을 보인 모델인 **GPT-5-Thinking (High)** 이 `AMO-Bench`에서 **52.4%** 의 정확도를 기록했으며, 대부분의 LLM은 **40% 미만** 의 점수를 보이며 상당한 어려움을 겪는 것으로 나타났습니다. 그럼에도 불구하고 상위 모델들은 **pass@32에서 70% 이상** 의 성능을 달성하며 개선의 잠재력을 보였고, **출력 토큰 길이(test-time compute) 증가** 에 따른 성능 향상 경향이 확인되었습니다.

## AI 실무자를 위한 시사점
현재 LLM들이 **고급 수학적 추론 문제** 에 대해 여전히 큰 어려움을 겪고 있음을 명확히 보여주며, 이 분야의 추가 연구 개발이 시급함을 시사합니다. **test-time scaling** 이 LLM의 추론 능력 향상에 긍정적인 영향을 미친다는 점은 계산 자원을 효과적으로 활용하는 전략의 중요성을 강조합니다. `AMO-Bench`는 LLM의 수학적 추론 능력 발전을 위한 **견고하고 도전적인 평가 도구** 로서 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.