---
title: "[논문리뷰] AMBEDKAR-A Multi-level Bias Elimination through a Decoding Approach with
  Knowledge Augmentation for Robust Constitutional Alignment of Language Models"
excerpt: "Rahul Karthikeyan이 [arXiv]에 게시한 'AMBEDKAR-A Multi-level Bias Elimination through a Decoding Approach with
  Knowledge Augmentation for Robust Constitutional Alignment of Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Bias Mitigation
  - Large Language Models
  - Speculative Decoding
  - Constitutional AI
  - Fairness
  - Inference-Time Control
  - Indian Sociocultural Context

permalink: /ai/review/2025-9-3-AMBEDKAR-A-Multi-level-Bias-Elimination-through-a-Decoding-Approach-with-Knowledge-Augmentation-for-Robust-Constitutional-Alignment-of-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02133)

**저자:** Snehasis Mukhopadhyay, Aryan Kasat, Shivam Dubey, Rahul Karthikeyan, Dhruv Sood, Vinija Jain, Aman Chadha, Amitava Das



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 학습 데이터에서 발생하는 사회적 편향, 특히 인도 사회의 **카스트 및 종교 관련 편향**을 반영하여 유해하거나 편향된 출력을 생성하는 문제를 해결하고자 합니다. 서구 중심의 기존 편향 완화 전략의 한계를 극복하고, **인도 헌법 14-17조**에 명시된 평등, 중립성, 포괄성 원칙에 부합하는 LLM 출력을 유도하는 프레임워크를 개발하는 것이 목표입니다.

## 핵심 방법론
AMBEDKAR는 기본 모델의 매개변수를 업데이트하지 않고 추론 시점에 적용되는 **Constitution-Aware Decoding Layer**를 도입합니다. 여기서는 잠재적으로 편향된 **Small Language Model (SLM)**이 후보 생성을 제안하고, 헌법적으로 정렬된 **Large Language Model (LLM)**이 검증자 역할을 합니다. **counterfactual perturbation**을 통해 원본 및 대조적인 컨텍스트에서 후보 토큰의 **Jensen-Shannon divergence (JSD)**를 계산하여 공정성을 평가하고, **가장 낮은 발산 값**을 보이는 토큰을 선택하여 편향 저항적인 출력을 생성합니다.

## 주요 결과
AMBEDKAR 프레임워크는 종교 관련 편향에서 **평균 절대 편향을 26.41% 감소**시켰고 (상대적 감소율 77.23%), 카스트 관련 편향에서는 각각 **15.06% 및 23.06% 감소**를 달성했습니다. 이 방법은 표준 탐욕적 디코딩에 비해 **토큰당 지연 시간을 6.29%만 증가**시켜 효율성을 유지했으며, 기존 디코딩 기준과 비교하여 BLEU 및 BERTScore 값에서 2-3점 범위 내에서 의미론적 충실도를 보존했습니다.

## AI 실무자를 위한 시사점
AMBEDKAR는 **인도 사회문화적 맥락**에서 발생하는 LLM의 **카스트 및 종교 편향**을 추론 시점에 효과적으로 완화할 수 있는 실용적인 솔루션을 제공합니다. 모델의 **재훈련 없이 적용 가능**하며, **블랙박스 모델에도 호환**되어 기존 시스템에 쉽게 통합될 수 있습니다. 헌법적 원칙에 기반한 접근 방식은 고위험 AI 애플리케이션에서 **규범적 정렬의 중요성**을 강조하며, AI 시스템 개발자가 책임감 있는 AI를 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.