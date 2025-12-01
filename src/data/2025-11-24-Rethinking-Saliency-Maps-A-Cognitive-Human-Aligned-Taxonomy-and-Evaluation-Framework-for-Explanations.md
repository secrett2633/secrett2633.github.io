---
title: "[논문리뷰] Rethinking Saliency Maps: A Cognitive Human Aligned Taxonomy and Evaluation Framework for Explanations"
excerpt: "Noam Koenigstein이 [arXiv]에 게시한 'Rethinking Saliency Maps: A Cognitive Human Aligned Taxonomy and Evaluation Framework for Explanations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Saliency Maps
  - Explainable AI (XAI)
  - Taxonomy
  - Evaluation Framework
  - Faithfulness Metrics
  - Contrastive Explanations
  - Granularity

permalink: /ai/review/2025-11-24-Rethinking-Saliency-Maps-A-Cognitive-Human-Aligned-Taxonomy-and-Evaluation-Framework-for-Explanations/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13081)

**저자:** Yehonatan Elisha, Seffi Cohen, Oren Barkan, Noam Koenigstein



## 핵심 연구 목표
본 연구는 심층 학습 모델의 시각적 설명 기법인 **Saliency Map** 이 명확한 목적과 사용자 질의에 대한 정렬이 부족하여 평가 및 실용적 효용성이 저해되는 문제를 해결하는 것을 목표로 합니다. 사용자 중심의 설명 요구에 부합하는 **인지적으로 정렬된 분류 체계(taxonomy)** 및 **평가 프레임워크** 를 제시하여 설명 방법론의 모호성을 줄이고자 합니다.

## 핵심 방법론
논문은 **Reference-Frame x Granularity (RFxG) 분류 체계** 를 제안하며, 이는 설명의 기준점(pointwise 또는 contrastive)과 의미론적 세분성(class-level 또는 group-level)을 구분합니다. 이 프레임워크에 맞춰 **4가지 새로운 충실도(faithfulness) 지표** 를 도입했습니다: **Contrastive Contrastivity Score (CCS)** , **Class Group Contrastivity (CGC)** , **Pointwise Group Score (PGS)** , **Contrastive Group Score (CGS)** . 이 지표들은 **구조화된 섭동(perturbation)** 및 점수 비교를 통해 설명 품질을 평가합니다. 또한, **WordNet** 계층 구조에서 파생된 **ImageNet 클래스** 에 대한 **새로운 그룹 수준 레이블링** 을 기여했습니다.

## 주요 결과
**IIA (Iterated Integrated Attributions)** 가 제안된 RFxG 분류 체계의 거의 모든 지표에서 일관되게 우수한 성능을 보였으며, 특히 **CCS** 및 **PGS, CGS** 지표에서 두드러졌습니다. 예를 들어, COCO 데이터셋에서 CNN 모델의 경우 IIA는 **CCS 25.17-25.20** 및 **PGS 46.03-46.57** 를 달성했습니다. 그룹 수준 개념에 대한 충실한 설명 생성이 개별 클래스 구분보다 더 쉬웠으며, **Transformer 기반 모델(예: TAttr)** 도 IIA 다음으로 높은 순위를 기록했습니다. 기존의 contrastive 평가 지표인 **CDROP** 는 희소한 기여도에 대한 페널티로 인해 집중된 맵의 판별력을 완전히 반영하지 못할 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
**RFxG 분류 체계** 는 AI 실무자가 **사용자 의도에 부합하는 XAI 방법론** 을 설계하고 평가하는 데 필요한 개념적 틀을 제공합니다. 이는 단일 클래스 중심의 설명에서 벗어나 **대조적(contrastive) 추론** 및 **다양한 의미론적 세분성** 을 고려하는 설명의 중요성을 강조합니다. 특히 **IIA** 와 같은 방법론은 복잡한 사용자 질의에 대한 충실한 설명을 생성하는 데 유용하며, **새로운 그룹 수준 레이블링** 과 제안된 평가 지표는 이러한 설명의 품질을 체계적으로 측정하는 실용적인 도구가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.