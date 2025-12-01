---
title: "[논문리뷰] TrustJudge: Inconsistencies of LLM-as-a-Judge and How to Alleviate Them"
excerpt: "Zhuohao Yu이 [arXiv]에 게시한 'TrustJudge: Inconsistencies of LLM-as-a-Judge and How to Alleviate Them' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-as-a-Judge
  - Evaluation Frameworks
  - Inconsistency Reduction
  - Probabilistic Scoring
  - Transitivity
  - Information Loss
  - Perplexity
  - Large Language Models

permalink: /ai/review/2025-9-26-TrustJudge-Inconsistencies-of-LLM-as-a-Judge-and-How-to-Alleviate-Them/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21117)

**저자:** Yidong Wang, Yunze Song, Tingyuan Zhu, Xuanwang Zhang, Zhuohao Yu, Hao Chen, Chiyu Song, Qiufeng Wang, Cunxiang Wang, Zhen Wu, Xinyu Dai, Yue Zhang, Wei Ye, Shikun Zhang



## 핵심 연구 목표
본 논문은 LLM-as-a-judge 평가 프레임워크에서 발생하는 **핵심적인 불일치 문제** 를 해결하는 것을 목표로 합니다. 구체적으로, 낮은 점수를 받은 응답이 쌍대 비교에서 더 높은 점수를 받은 응답보다 우수한 **점수-비교 불일치(Score-Comparison Inconsistency)** 와, 순환 선호도 체인(A > B > C > A) 및 등가 모순(A = B = C ≠ A)으로 나타나는 **쌍대 전이성 불일치(Pairwise Transitivity Inconsistency)** 를 식별하고 해결하고자 합니다.

## 핵심 방법론
저자들은 이러한 문제를 해결하기 위해 **TrustJudge** 라는 확률론적 평가 프레임워크를 제안합니다. 이 프레임워크는 정보 엔트로피를 보존하는 **분포 민감 점수화(distribution-sensitive scoring)** 를 통해 이산 점수 시스템의 정보 손실을 줄이고, **가능성 인식 집계(likelihood-aware aggregation)** 를 통해 전이성 위반을 해소합니다. 분포 민감 점수화는 **세분화된 스케일(예: 100점)** 로 연속적인 기댓값을 계산하며, 가능성 인식 집계는 **PPL(Perplexity) 기반 방법** 또는 **양방향 선호 확률** 을 사용하여 모호한 동점 판단을 명확히 합니다.

## 주요 결과
**Llama-3.1-70B-Instruct** 를 심사 모델로 사용한 결과, TrustJudge는 **점수-비교 불일치** 를 23.32%에서 **14.89%** 로 **8.43%** 감소시켰습니다. 또한, **쌍대 전이성 불일치** 를 15.22%에서 **4.40%** 로 **10.82%** 감소시켰습니다. 이와 함께, 평가 정확도도 유지하거나 향상되었으며, **정확 일치율(exact match rates)은 1.19%에서 6.85%까지 증가** 하는 결과를 보였습니다.

## AI 실무자를 위한 시사점
TrustJudge는 LLM 기반 평가 시스템의 **신뢰성과 일관성** 을 크게 향상시킬 수 있는 실용적인 솔루션을 제공합니다. 이는 **추가적인 훈련이나 인적 주석 없이** 적용 가능하므로, AI/ML 엔지니어들이 다양한 LLM 아키텍처와 규모에 걸쳐 **더욱 신뢰할 수 있는 자동화된 평가** 를 구축하는 데 기여할 수 있습니다. 특히, 정보 손실을 최소화하고 모호한 판단을 해결하는 방식은 LLM 평가의 **투명성과 재현성** 을 높이는 데 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.