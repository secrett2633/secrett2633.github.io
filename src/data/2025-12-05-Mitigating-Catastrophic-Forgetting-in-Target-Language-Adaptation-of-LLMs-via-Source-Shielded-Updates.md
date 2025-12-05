---
title: "[논문리뷰] Mitigating Catastrophic Forgetting in Target Language Adaptation of LLMs via Source-Shielded Updates"
excerpt: "Nikolaos Aletras이 [arXiv]에 게시한 'Mitigating Catastrophic Forgetting in Target Language Adaptation of LLMs via Source-Shielded Updates' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Catastrophic Forgetting
  - Language Adaptation
  - Continual Pre-training
  - Parameter Freezing
  - Low-Resource Languages
  - Source Knowledge Preservation

permalink: /ai/review/2025-12-05-Mitigating-Catastrophic-Forgetting-in-Target-Language-Adaptation-of-LLMs-via-Source-Shielded-Updates/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04844)

**저자:** Atsuki Yamaguchi, Terufumi Morishita, Aline Villavicencio, Nikolaos Aletras



## 핵심 연구 목표
이 논문은 instruct LLM을 비용이 많이 드는 특화된 레이블링된 데이터 없이 **비레이블링된 타겟 언어 데이터만으로 새로운 언어에 적응** 시킬 때 발생하는 **재앙적 망각(catastrophic forgetting)** 문제를 해결하는 것을 목표로 합니다. 이는 LLM의 글로벌 접근성을 저해하고, 기존 instruct 모델의 핵심 기능인 채팅 및 지시 따르기 능력을 손상시키는 주요 장애물입니다.

## 핵심 방법론
저자들은 **Source-Shielded Updates (SSU)** 라는 새로운 선택적 파라미터 업데이트 전략을 제안합니다. 이 방법론은 세 단계로 구성됩니다: 첫째, **Wanda** 와 같은 파라미터 중요도 측정 방법을 사용하여 소량의 소스 데이터(예: **500개 샘플** )로 소스 능력을 유지하는 데 **핵심적인 파라미터를 식별** 합니다. 둘째, 식별된 중요도 점수를 기반으로 **컬럼 단위의 동결 마스크(column-wise freezing mask)** 를 생성하여 피처 변환을 보존하고, 기본적으로 상위 **50%** 의 컬럼을 동결합니다. 마지막으로, 이 마스크를 적용한 상태로 **비레이블링된 타겟 언어 데이터(MADLAD-400, 언어당 200M 토큰)** 로 **지속적 사전 학습(Continual Pre-training, CPT)** 을 수행하여 동결된 파라미터의 업데이트를 막습니다.

## 주요 결과
SSU-Wanda는 재앙적 망각을 성공적으로 완화하며, 단일 언어 소스 작업에서 성능 저하를 **7B 모델의 경우 평균 3.4%** , **13B 모델의 경우 2.8%** 로 줄였습니다. 이는 **전체 미세 조정(Full Fine-Tuning, FFT)** 의 **20.3% (7B)** 및 **22.3% (13B)** 와 현저히 대조되는 수치입니다. 또한 SSU는 타겟 언어 성능에서 FFT에 필적하며, **7B 모델의 모든 벤치마크** 와 **13B 모델의 대부분 벤치마크** 에서 FFT보다 우수한 성능을 보였습니다. 특히 코드 혼합(code-mixing) 발생률을 **HFT(6.4%)** 및 **GMT(16.9%)** 보다 훨씬 낮은 **1.0%** 로 감소시키는 효과도 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **비레이블링된 타겟 언어 데이터** 만으로 LLM을 새로운 언어에 효과적으로 적응시키는 **비용 효율적인 방법** 을 제공합니다. AI 실무자들은 **SSU 프레임워크** 를 통해 소스 모델의 **핵심 기능(지시 따르기, 안전성)** 을 거의 완벽하게 보존하면서도 타겟 언어에 대한 높은 숙련도를 달성할 수 있습니다. 특히, 파라미터 중요도 측정 방법 및 캘리브레이션 데이터 선택의 **유연성** 은 다양한 LLM 적응 시나리오에 대한 실용적인 가이드라인을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.