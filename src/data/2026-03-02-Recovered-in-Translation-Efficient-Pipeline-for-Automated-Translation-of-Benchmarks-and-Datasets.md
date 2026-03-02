---
title: "[논문리뷰] Recovered in Translation: Efficient Pipeline for Automated Translation of Benchmarks and Datasets"
excerpt: "arXiv에 게시된 'Recovered in Translation: Efficient Pipeline for Automated Translation of Benchmarks and Datasets' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Translation
  - Large Language Models
  - Multilingual Benchmarks
  - Benchmark Quality
  - Test-time Scaling
  - Universal Self-Improvement
  - Translation Ranking
  - Eastern European Languages

permalink: /ai/review/2026-03-02-Recovered-in-Translation-Efficient-Pipeline-for-Automated-Translation-of-Benchmarks-and-Datasets/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22207)

**저자:** Hanna Yukhymenko, Anton Alexandrov, Martin Vechev



## 핵심 연구 목표
현재 다국어 **LLM 평가** 의 신뢰도를 저해하는 번역 벤치마크의 일관성 없는 품질(의미론적 드리프트 및 문맥 손실) 문제를 해결하는 것입니다. 본 연구는 데이터셋과 벤치마크를 **확장 가능하고 고품질** 로 번역하며, 원본 작업 구조와 언어적 뉘앙스를 보존하는 완전 자동화된 프레임워크를 제시하는 것을 목표로 합니다.

## 핵심 방법론
제안된 프레임워크는 **SC (Self-Check)** , **Best-of-N Sampling (BoN)** , **Universal Self-Improvement (USI)** , 그리고 새로운 **Translation Ranking (T-RANK)** 등 네 가지 번역 방법론을 통합합니다. 특히 **T-RANK** 는 **다중 라운드 순차 랭킹 전략** 을 사용하여 번역 후보군의 순위 편향을 완화하고 미묘한 번역 오류를 식별하여 수정합니다. 이 방법들은 **LLM-as-a-judge** 평가와 **COMET 지표** 를 통해 동유럽 및 남유럽 8개 언어(우크라이나어, 불가리아어, 슬로바키아어 등)로 번역된 **MMLU, Hellaswag, ARC, Winogrande** 벤치마크에 적용되었습니다.

## 주요 결과
**USI** 와 **T-RANK** 는 기존 파이프라인 대비 현저히 높은 번역 품질을 보였습니다. **GPT-4o-mini** 를 사용한 **WMT24++** 영어-우크라이나어 번역에서 **T-RANK (p=5)** 가 **0.845 COMET 점수** 를, **USI (n=5)** 가 **0.843 COMET 점수** 를 기록하여 베이스라인(0.827)을 능가했습니다. LLM-as-a-judge 평가에서는 제안된 번역본이 **Global-MMLU** 대비 모든 평가 언어에서 더 많은 승리를 거두었으며, 특히 **Winogrande 벤치마크** 에서 **평균 3.42%** 의 가장 큰 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **테스트-시간 연산 확장 방법론** 이 기계 번역 품질을 크게 향상시킬 수 있음을 입증하며, 특히 **USI** 와 **T-RANK** 가 미묘한 번역 오류를 효과적으로 식별하고 수정할 수 있음을 보여줍니다. 이는 **다국어 LLM 개발자** 들이 다양한 언어 환경, 특히 복잡한 문법 구조를 가진 중소 규모 자원 언어에서 **보다 신뢰할 수 있고 정확한 모델 평가** 를 수행할 수 있는 실용적인 프레임워크를 제공합니다. 결과적으로, **다국어 AI 시스템의 견고성과 공정성** 을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.