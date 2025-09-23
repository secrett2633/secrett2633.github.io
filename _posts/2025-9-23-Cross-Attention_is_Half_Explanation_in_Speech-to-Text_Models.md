---
title: "[논문리뷰] Cross-Attention is Half Explanation in Speech-to-Text Models"
excerpt: "Luisa Bentivogli이 [arXiv]에 게시한 'Cross-Attention is Half Explanation in Speech-to-Text Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Cross-attention
  - Speech-to-Text (S2T)
  - Explainable AI (XAI)
  - Saliency Maps
  - Feature Attribution
  - Transformer
  - Context Mixing
  - Correlation

permalink: /ai/review/2025-9-23-Cross-Attention_is_Half_Explanation_in_Speech-to-Text_Models/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18010)

**저자:** Sara Papi, Dennis Fucci, Marco Gaido, Matteo Negri, Luisa Bentivogli



## 핵심 연구 목표
본 논문은 S2T 모델에서 교차 어텐션(cross-attention) 점수가 입력-출력 의존성을 얼마나 잘 설명하는지 체계적으로 분석합니다. 특히, 교차 어텐션이 입력-출력 정렬의 대리자로서 유효한지, 그리고 **특징 기여(feature attribution)**와 같은 정식 설명 가능성(explainability) 방법론과 비교 가능한 통찰력을 제공하는지 평가합니다.

## 핵심 방법론
연구팀은 **SPES(Speech Perturbation for Explainable Speech-to-Text)**에서 파생된 **입력 살리언시 맵(SMX)**과 교차 어텐션 점수(**CA**)를 비교했습니다. 또한, **인코더 출력 살리언시 맵(SMH)**과 **CA**를 비교하여 **문맥 혼합(context mixing)**의 영향을 정량화했으며, **Conformer 인코더**와 **Transformer 디코더**를 사용하는 다양한 규모의 ASR 및 ST 모델에서 **Pearson 상관 계수(p)**를 측정했습니다.

## 주요 결과
교차 어텐션은 입력 살리언시 맵과 **0.45-0.55** 범위의 중간에서 강한 상관관계를 보였습니다. 인코더 출력 살리언시 맵과는 더 높은 상관관계를 보였으며, **0.03에서 0.18** 범위의 p 값 차이는 **6.6-16.7%**의 문맥 혼합 영향을 나타냈습니다. 그러나 교차 어텐션은 인코더 출력 수준에서도 관련성의 **52-75%**만을 포착했으며, 삭제 메트릭(deletion metric)에서는 **41.2**를 기록하여 **SMX(52.9)**나 전체 해상도 맵(**91.3**)보다 낮은 성능을 보였습니다.

## AI 실무자를 위한 시사점
교차 어텐션은 S2T 모델의 동작에 대한 **유익하지만 불완전한 설명**을 제공하며, 단독적인 XAI 도구로 사용되기에는 한계가 있습니다. 특히 **헤드와 레이어에 걸쳐 통합(averaging)**하거나 **마지막 디코더 레이어**에 집중할 때, 살리언시 맵과의 정렬이 개선되므로 이를 활용한 다운스트림 애플리케이션 개선 가능성이 있습니다. **어텐션 정규화(attention regularization)**와 같은 훈련 시간 전략을 통해 설명 가능성과 태스크 성능을 동시에 향상시킬 수 있는 잠재력이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.