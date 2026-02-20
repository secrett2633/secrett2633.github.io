---
title: "[논문리뷰] Same Content, Different Answers: Cross-Modal Inconsistency in MLLMs"
excerpt: "arXiv에 게시된 'Same Content, Different Answers: Cross-Modal Inconsistency in MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Cross-Modal Consistency
  - Reasoning Inconsistency
  - OCR Performance
  - Modality Gap
  - Benchmarking
  - Render Equivalence

permalink: /ai/review/2025-12-10-Same-Content-Different-Answers-Cross-Modal-Inconsistency-in-MLLMs/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08923)

**저자:** Angela van Sprang, Laurens Samson, Ana Lucic, Erman Acar, Sennay Ghebreab, Yuki M. Asano



## 핵심 연구 목표
본 논문은 MLLM이 시각 및 언어 모달리티에 걸쳐 동일한 의미를 가진 정보에 대해 **일관된 추론 능력** 을 보이는지 체계적으로 평가하는 것을 목표로 합니다. 특히, OCR(광학 문자 인식) 오류를 제어하고 다양한 시각적 특성이 추론 일관성에 미치는 영향을 분석하여 MLLM 내의 근본적인 "모달리티 간극"이 불일치를 유발하는지 밝히고자 합니다.

## 핵심 방법론
연구자들은 **REST** 및 **REST+ (Render-Equivalence Stress Tests)** 라는 두 가지 새로운 벤치마크를 도입했습니다. 각 벤치마크 샘플은 **텍스트 전용, 이미지 전용, 혼합 모달리티** 의 세 가지 형식으로 동일한 의미의 정보를 제공합니다. **15개의 최신 MLLM** 을 대상으로 평가했으며, **SOEBENCH** 와 같은 새로운 시스템 방정식 태스크와 **MMLU, ARC, GSM-Symbolic** 같은 기존 벤치마크를 활용했습니다. REST+는 **다양한 글꼴, 해상도, 텍스트 색상** 으로 이미지를 변형하여 시각적 토큰 수의 영향까지 심층적으로 분석했습니다.

## 주요 결과
평가 결과, 모든 **15개 MLLM** 에서 상당한 교차 모달리티 불일치가 나타났으며, **RER(Render-Equivalence Rate) 점수** 는 **6.6%에서 90.7%** 까지 다양했습니다. **GPT-5-mini** 와 **Claude Haiku 4.5** 가 각각 **90.7%** 와 **90.3%** 로 가장 높은 일관성 점수를 기록했습니다. 대부분의 모델은 **텍스트 모달리티** 에서 더 나은 성능을 보였고, 완벽한 OCR 성능에도 불구하고 불일치가 지속되어 OCR 오류가 주요 원인이 아님을 입증했습니다. 또한, 내부 표현의 **교차 모달리티 코사인 유사성** 과 RER 일관성 점수 사이에 **양의 상관관계(R²=0.611)** 가 관찰되었습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 현재 MLLM이 OCR이 정확해도 **상당한 교차 모달리티 추론 불일치** 를 보인다는 점을 인지해야 합니다. 텍스트를 이미지로 렌더링하거나 그 반대의 방식이 이러한 문제를 해결하지 못하므로, MLLM 배포 시 **텍스트 모달리티를 우선** 하고 다양한 입력 형식을 신중하게 테스트하는 것이 중요합니다. 내부 표현의 모달리티 간극이 불일치의 원인임을 시사하므로, 모델의 내부 표현을 더 잘 정렬하는 연구가 MLLM의 견고한 다중 모달 추론 성능을 향상시키는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.