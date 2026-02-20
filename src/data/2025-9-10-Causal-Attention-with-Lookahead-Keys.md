---
title: "[논문리뷰] Causal Attention with Lookahead Keys"
excerpt: "Quanquan Gu이 arXiv에 게시한 'Causal Attention with Lookahead Keys' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Causal Attention
  - Lookahead Keys
  - Autoregressive Modeling
  - Language Models
  - Transformer
  - Perplexity Reduction
  - Parallel Training
  - Efficient Inference

permalink: /ai/review/2025-9-10-Causal-Attention-with-Lookahead-Keys/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07301)

**저자:** Zhuoqing Song, Peng Sun, Huizhuo Yuan, Quanquan Gu



## 핵심 연구 목표
이 연구는 **자기회귀(autoregressive) 언어 모델** 의 핵심 구성 요소인 표준 인과적 어텐션(causal attention)이 이전 문맥에만 의존하여 전역적 문맥 파악과 자연어 이해 능력을 저해하는 문제를 해결하는 것을 목표로 합니다. 각 토큰의 키(key)가 문맥이 전개됨에 따라 지속적으로 업데이트되어 미래 정보를 통합하면서도 자기회귀 속성을 엄격하게 유지하는 새로운 어텐션 메커니즘을 제안합니다.

## 핵심 방법론
제안된 **CAuSal aTtention with Lookahead kEys (CASTLE)** 는 토큰 `(t+1)`을 생성할 때, 이전 토큰 `s`의 키를 `s+1`부터 `t`까지의 정보를 통합하도록 업데이트하는 방식입니다. 키는 정적인 **인과적 키(causal keys)** 와 문맥에 따라 갱신되는 **미리보기 키(lookahead keys)** 로 구성되며, 미리보기 키는 **SiLU 활성화 함수** 와 함께 어텐션 메커니즘과 유사한 구조로 정의됩니다. 반복적인 형태에도 불구하고, **수학적 등가성** 을 도출하여 `O(L^2d)`의 병렬 훈련 복잡도와 `O(Ld)`의 추론 복잡도를 달성했습니다.

## 주요 결과
**CASTLE** 은 언어 모델링 벤치마크에서 모든 모델 규모(Small, Medium, Large, XL)에 걸쳐 표준 인과적 어텐션을 일관되게 능가했습니다. **500억 개 토큰** 훈련 후, 검증 퍼플렉시티(validation perplexity)를 Baseline 대비 **Small 모델에서 0.0059, Medium에서 0.0245, Large에서 0.0356, XL에서 0.0348만큼 감소** 시켰습니다. 또한, **ARC, BoolQ, HellaSwag** 등 다양한 다운스트림 태스크에서 평균 정확도를 지속적으로 향상시켜 NLU 및 추론 능력을 강화함을 입증했습니다.

## AI 실무자를 위한 시사점
**CASTLE** 은 기존 자기회귀 언어 모델의 근본적인 한계를 해결하여 **모델의 토큰 효율성을 극대화** 하고, 특히 대규모 언어 모델의 **자연어 이해 능력과 일반화 성능을 크게 향상** 시킬 수 있습니다. 효율적인 **병렬 훈련 및 추론 알고리즘** 덕분에 실환경 AI 시스템에 통합하기 용이하며, **LLaMA와 유사한 Transformer 아키텍처** 에 적용 가능하여 기존 최신 모델에 쉽게 적용할 수 있습니다. **SiLU 함수의 적용** 이 모델의 태스크 일반화 능력에 긍정적인 영향을 미친다는 점도 주목할 만합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.