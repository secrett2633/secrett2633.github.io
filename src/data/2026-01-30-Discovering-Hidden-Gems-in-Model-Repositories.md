---
title: "[논문리뷰] Discovering Hidden Gems in Model Repositories"
excerpt: "Yedid Hoshen이 arXiv에 게시한 'Discovering Hidden Gems in Model Repositories' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Discovery
  - Hidden Gems
  - Sequential Halving
  - Multi-Armed Bandit
  - Model Repositories
  - Large Language Models
  - Performance Evaluation

permalink: /ai/review/2026-01-30-Discovering-Hidden-Gems-in-Model-Repositories/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.22157)

**저자:** Jonathan Kahana, Eliahu Horwitz, Yedid Hoshen



## 핵심 연구 목표
본 논문은 대규모 모델 저장소에서 사용자에게 잘 알려지지 않았지만 성능이 뛰어난 "숨겨진 보석" 모델들을 효율적으로 발견하는 것을 목표로 합니다. 특히, 현재 모델 사용의 집중이 효율적인 시장 선택의 결과인지, 아니면 우수한 모델들이 단순히 간과되고 있는지 규명하고자 합니다.

## 핵심 방법론
연구진은 모델 발견 문제를 **Multi-Armed Bandit (MAB) 문제** 로 공식화하고, **Sequential Halving (SH) 알고리즘** 을 변형하여 적용했습니다. 주요 개선 사항으로는 모델 간의 성능 비교 신뢰도를 높이기 위한 **Correlated Sampling** 과 초기 단계에서 비효율적인 모델들을 신속하게 제거하는 **Aggressive Elimination Schedule** 을 도입하여 탐색 효율을 극대화했습니다. **Llama-3.1-8B, Qwen2.5 (3B & 7B), Mistral-7B** 등 4가지 모델 계열에서 **2,000개 이상의 모델** 을 **RouterBench** 벤치마크를 활용하여 평가했습니다.

## 주요 결과
평가 결과, 대중적으로 사용되지 않지만 인기 있는 모델들보다 훨씬 우수한 "숨겨진 보석" 모델들이 꾸준히 발견되었습니다. 특히 **Llama-3.1-8B 계열** 에서는 수학 성능을 **83.2%에서 96.0%까지 향상** 시키는 모델이 확인되었으며, 이는 **GSM8K 벤치마크에서 +12.8%의 성능 향상** 을 의미합니다. 제안된 방법론은 기존 방식 대비 **50배 이상 빠르게** 상위 모델을 탐색하며, 모델당 **최소 50개의 쿼리** 만으로도 최고 성능 모델을 식별하여 평균 성능을 **4.5% 이상 향상** 시켰습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 일반적으로 널리 사용되는 파운데이션 모델에 의존하지만, 본 연구는 훨씬 더 우수한 성능을 가진 미발견 미세 조정 모델들이 존재함을 입증했습니다. 제안된 **가속화된 Sequential Halving 알고리즘** 은 광범위하고 비용이 많이 드는 모델 탐색 없이도 이러한 "숨겨진 보석"을 효율적으로 찾아낼 수 있는 실용적인 방법을 제공하여, AI 모델 배포 및 성능 최적화에 기여할 수 있습니다. 대부분의 숨겨진 보석 모델들이 관련 성능 문서가 부족하다는 점은 모델 저장소의 문서화 표준 개선 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.