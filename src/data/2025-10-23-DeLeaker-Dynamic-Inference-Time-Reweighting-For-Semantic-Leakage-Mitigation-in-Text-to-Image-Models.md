---
title: "[논문리뷰] DeLeaker: Dynamic Inference-Time Reweighting For Semantic Leakage
  Mitigation in Text-to-Image Models"
excerpt: "Roi Reichart이 [arXiv]에 게시한 'DeLeaker: Dynamic Inference-Time Reweighting For Semantic Leakage
  Mitigation in Text-to-Image Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Semantic Leakage
  - Text-to-Image Models
  - Attention Control
  - Inference-time Mitigation
  - Diffusion Models
  - Evaluation Dataset
  - Self-Attention

permalink: /ai/review/2025-10-23-DeLeaker-Dynamic-Inference-Time-Reweighting-For-Semantic-Leakage-Mitigation-in-Text-to-Image-Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15015)

**저자:** Mor Ventura, Michael Toker, Or Patashnik, Yonatan Belinkov, Roi Reichart



## 핵심 연구 목표
본 논문은 Text-to-Image (T2I) 모델에서 발생하는 **의도치 않은 의미적 누출(semantic leakage)** 문제를 해결하는 것을 목표로 합니다. 이는 서로 다른 개체 간에 의미론적으로 관련된 특징이 잘못 전달되는 현상으로, 기존 방법론의 **최적화 비용** 및 **외부 입력 의존성** 문제를 극복하고자 합니다.

## 핵심 방법론
`DeLeaker`는 확산 과정 중 모델의 **어텐션 맵(attention maps)**에 직접 개입하는 **경량의 추론 시간(inference-time) 접근 방식**입니다. 주요 단계는 (1) **어텐션 기반 개체 마스킹**을 통해 개체별 영역을 식별하고, (2) **누출 억제(Leakage Suppression)**를 통해 개체 간 과도한 상호작용을 줄이며, (3) **자아 정체성 강화(Self-Identity Alignment)**를 통해 각 개체의 텍스트 토큰과 이미지 토큰 간의 연결을 강화하는 것입니다.

## 주요 결과
`DeLeaker`는 모든 평가된 기준선을 **일관되게 능가**하며, 인간 평가에서 **67.8%의 전반적인 개선율**을 달성했습니다. 또한, **가장 낮은 LPIPS 점수(0.22)**, **가장 높은 VQAScore(0.68)**, **가장 낮은 KID 점수(0.00)**를 기록하여 원본 이미지의 충실도와 품질을 손상시키지 않으면서 누출을 효과적으로 완화합니다. **자아 정체성 강화**가 가장 영향력 있는 요소로 밝혀졌습니다.

## AI 실무자를 위한 시사점
`DeLeaker`는 **최적화가 필요 없는** 경량의 **추론 시간 솔루션**으로, T2I 모델의 의미적 정확도를 크게 향상시킬 수 있습니다. 또한, **SLIM (Semantic Leakage in IMages)**이라는 새로운 데이터셋과 자동 평가 프레임워크를 제공하여 해당 분야의 연구 및 시스템적인 평가를 가능하게 합니다. 이는 **어텐션 제어**의 가치를 강조하며, **더욱 의미론적으로 정교한 T2I 모델** 개발의 길을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.