---
title: "[논문리뷰] The Curious Case of Analogies: Investigating Analogical Reasoning in Large Language Models"
excerpt: "이 [arXiv]에 게시한 'The Curious Case of Analogies: Investigating Analogical Reasoning in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Analogical Reasoning
  - Large Language Models
  - Mechanistic Interpretability
  - Proportional Analogies
  - Story Analogies
  - Structural Alignment
  - Attention Knockout
  - Patchscopes

permalink: /ai/review/2025-12-03-The-Curious-Case-of-Analogies-Investigating-Analogical-Reasoning-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20344)

**저자:** Taewhoo Lee, Minju Song, Chanwoong Yoon, Jungwoo Park, Jaewoo Kang



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLMs)의 내재된 메커니즘을 탐구하여 LLM이 유추 추론을 수행하는 방식을 이해하는 것을 목표로 합니다. 특히, LLM이 관계형 개념을 추출하고 새로운 상황에 적용하며, 표면적 유사성을 넘어 구조적 정렬을 통해 병렬 관계를 어떻게 식별하는지 밝히고자 합니다.

## 핵심 방법론
비례 유추(Proportional Analogies)에서는 **Attention Knockout** 을 사용하여 핵심 토큰 위치( **e2** , **e3** , **link** )의 정보 흐름을 분석하고, **Patchscopes** 와 **Linear Probing** 을 통해 속성 및 관계형 정보 인코딩을 조사했습니다. 잘못된 추론 사례에서는 **패치 개입(Patching Interventions)** 을 통해 **e2** 의 표현을 **link** 에 주입하여 정보 전달을 촉진했습니다. 스토리 유추(Story Analogies)에서는 **Linear Probing** 으로 유추 구조의 선형 분리 가능성을 평가하고, **Mutual Alignment Score (MAS)** 를 정의하여 소스 및 타겟 스토리 간의 토큰 수준 구조적 정렬을 정량화했습니다.

## 주요 결과
LLM은 유추 추론 시 **e2** 및 **e3** 에서 관계형 정보를 효과적으로 인코딩하지만, 오답 사례에서는 이 정보가 크게 감소합니다. 특히, **Qwen2.5-14B** 모델에서 **e2** 의 표현을 **link** 에 패치했을 때, 오답 사례 중 최대 **38.1%** 의 답변이 개선되어 관계 적용이 병목 현상임을 시사합니다. 스토리 유추에서는 모델의 **중간 레이어** 에서 유추 구조가 선형적으로 가장 잘 분리되며(최대 **82.9%** 정확도), 성공적인 유추는 높은 **Mutual Alignment Score (MAS)** 와 강한 구조적 정렬과 연관됨을 확인했습니다.

## AI 실무자를 위한 시사점
LLM이 유추적 추론에서 잠재력을 보이지만, 관계형 정보의 정확한 적용이 여전히 중요한 과제임을 시사합니다. **Attention Knockout** 및 **Patchscopes** 와 같은 기계적 해석 도구는 LLM의 추론 실패 원인을 진단하고 개선하기 위한 **모델 디버깅** 에 활용될 수 있습니다. **패치 개입** 과 같은 방법을 통해 관계형 정보의 전달을 명시적으로 강화하여 LLM의 유추 능력을 향상시킬 수 있는 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.