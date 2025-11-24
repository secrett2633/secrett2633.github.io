---
title: "[논문리뷰] Making, not Taking, the Best of N"
excerpt: "이 [arXiv]에 게시한 'Making, not Taking, the Best of N' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Aggregation
  - Generative Fusion
  - Best-of-N
  - Synthetic Data Generation
  - Test-Time Scaling
  - Multilingual Models
  - Ensemble Learning

permalink: /ai/review/2025-10-2-Making-not-Taking-the-Best-of-N/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00931)

**저자:** Ammar Khairi, Daniel D'souza, Marzieh Fadaee, Julia Kreutzer



## 핵심 연구 목표
본 논문은 기존 **Best-of-N (BON)** 방식이 여러 LLM 생성물 중 하나만을 선택하여 잠재적으로 유용한 정보를 버리는 제로섬 게임이라는 문제점을 지적합니다. 대신, 모든 후보 생성물이 최종 결과에 기여할 수 있는 협력적 설정을 탐구하여, **다양한 LLM 출력의 강점을 통합**하여 더 높은 품질의 단일 응답을 만드는 새로운 방법론을 제시하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Fusion-of-N (FUSION)**이라는 방법을 제안합니다. 이는 **범용 LLM judge (fusor)**를 활용하여 여러 후보 샘플에서 가장 유익한 요소들을 **하나의 최종 응답으로 합성**합니다. 이 방법은 (i) **테스트 시간 확장(test-time scaling)**과 (ii) **합성 데이터 생성(synthetic data generation)**의 두 가지 환경에서 **BON**과 비교되었으며, **11개 언어**, **3가지 다양한 태스크** 및 다양한 모델 규모에 걸쳐 광범위하게 벤치마킹되었습니다.

## 주요 결과
**테스트 시간 확장**에서 FUSION은 **COMMAND A** 모델로 **Arena** 태스크에서 GEMINI2.5-PRO 대비 최대 **+10.8%**의 승률 향상을 보였고, **WMT (기계 번역)** 태스크에서는 **BON**을 크게 능가하여 한국어에서 **+11.4 XCOMETXL** 점수 상승을 기록했습니다. **합성 데이터 생성**을 통해 미세 조정된 모델은 **BON** 대비 일관된 성능 향상을 보였으며, **GeoFactX (사실 기반 추론)**에서 평균 **+1.8%** 더 높은 정답 정확도와 **+1.1%** 더 높은 추론 품질을 달성했습니다.

## AI 실무자를 위한 시사점
FUSION은 LLM 출력을 단순히 선택하는 것을 넘어 **다양한 후보들을 효과적으로 통합**하여 고품질의 결과를 생성하는 새로운 패러다임을 제시합니다. 이는 **테스트 시간 확장** 및 **합성 데이터 생성** 모두에서 **BON**보다 우수한 성능과 **더 높은 샘플 효율성**을 제공하며, 약한 티처 모델 풀에서도 강건한 성능을 보여줍니다. 따라서 **LLM 앙상블 활용의 폭을 넓히고 잠재력을 극대화**할 수 있는 실용적인 방법론으로, AI/ML 엔지니어는 이를 통해 더욱 강력하고 유연한 LLM 시스템을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.