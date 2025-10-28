---
title: "[논문리뷰] Knocking-Heads Attention"
excerpt: "Jianguo Li이 [arXiv]에 게시한 'Knocking-Heads Attention' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Head Attention
  - Transformer
  - Large Language Models
  - Inter-Head Communication
  - Parameter Sharing
  - Training Stability
  - Diagonal Initialization

permalink: /ai/review/2025-10-28-Knocking-Heads_Attention/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23052)

**저자:** Zhanchao Zhou, Xiaodong Chen, Haoxing Chen, Zhenzhong Lan, Jianguo Li



## 핵심 연구 목표
본 논문은 기존 **Multi-Head Attention (MHA)**의 어텐션 헤드들이 독립적으로 작동하여 개별 헤드 역량 저하 및 상호작용 부족을 야기하는 문제를 해결하고자 합니다. 특히, 기존 Talking-Heads Attention과 같은 접근 방식의 높은 계산 복잡성 문제를 피하면서 **최소한의 오버헤드**로 헤드 간의 특징 수준 상호작용을 가능하게 하는 새로운 메커니즘을 제안합니다.

## 핵심 방법론
제안하는 **Knocking-Heads Attention (KHA)**은 스케일드 닷-프로덕트 어텐션 이전에 모든 헤드에 걸쳐 공유되는 **대각선으로 초기화된 프로젝션 행렬**을 적용하여 헤드 간의 "노킹(knocking)"을 가능하게 합니다. 특히, **MLP 기반 Knocking-Heads 프로젝션**이 값(value) 표현에 적용될 때 가장 효과적임을 발견했으며, 이는 추론 시 원본 프로젝션에 흡수될 수 있는 선형 변환과 달리 비선형적 표현력을 제공합니다.

## 주요 결과
**6.1B MoE 모델**을 **1T 토큰**으로 학습한 결과, KHA는 학습 중 발생하는 **손실 스파이크(loss spikes)를 크게 감소**시키고 일관되게 낮은 학습 손실을 유지했습니다. 또한, 다운스트림 태스크에서 **종합 평균 1.26점의 성능 향상**을 달성했으며, 특히 언어 이해(**+4.32점**), 코드(**+3.9점**), 수학(**+1.62점**) 태스크에서 유의미한 개선을 보였습니다. KHA는 **추가 파라미터 및 FLOPs가 1% 미만**인 효율적인 방법입니다.

## AI 실무자를 위한 시사점
**Knocking-Heads Attention**은 기존 **MHA, GQA, GTA** 등 다양한 어텐션 메커니즘에 **플러그 앤 플레이 방식**으로 적용 가능하며, **최소한의 계산 오버헤드**로 대규모 언어 모델의 학습 안정성과 성능을 동시에 향상시킬 수 있습니다. 특히, **값(value) 프로젝션**에 집중하고 **대각선 초기화**를 통해 헤드 특화와 상호작용의 균형을 맞추는 것이 핵심이므로, 기존 트랜스포머 아키텍처 개선에 효과적인 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.