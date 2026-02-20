---
title: "[논문리뷰] M-ErasureBench: A Comprehensive Multimodal Evaluation Benchmark for Concept Erasure in Diffusion Models"
excerpt: "Jun-Cheng Chen이 arXiv에 게시한 'M-ErasureBench: A Comprehensive Multimodal Evaluation Benchmark for Concept Erasure in Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Concept Erasure
  - Multimodal Evaluation
  - Adversarial Attacks
  - Robustness
  - Textual Inversion
  - Latent Inversion
  - Cross-Attention

permalink: /ai/review/2026-01-06-M-ErasureBench-A-Comprehensive-Multimodal-Evaluation-Benchmark-for-Concept-Erasure-in-Diffusion-Models/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22877)

**저자:** Ju-Hsuan Weng, Jia-Wei Liao, Cheng-Fu Chou, Jun-Cheng Chen



## 핵심 연구 목표
본 논문은 텍스트-투-이미지 확산 모델의 개념 삭제(concept erasure) 방법들이 텍스트 프롬프트 외의 다른 입력 양식(모달리티)에 대해 얼마나 취약한지 평가하고, 이러한 취약점을 개선할 수 있는 새로운 추론 시간 방어 메커니즘을 제안하는 것을 목표로 합니다. 기존 방법론이 **학습된 임베딩** 이나 **역전된 잠재 공간** 과 같은 모달리티에서 삭제된 개념이 다시 나타나는 문제를 해결하고자 합니다.

## 핵심 방법론
연구진은 세 가지 주요 입력 모달리티( **텍스트 프롬프트** , **학습된 임베딩** , **역전된 잠재 공간** )와 화이트박스/블랙박스 설정을 포함하는 종합적인 멀티모달 평가 벤치마크인 **M-ErasureBench** 를 도입했습니다. 또한, 추론 시 **cross-attention 맵** 을 활용하여 타겟 개념 영역을 식별하고 관련 잠재 공간을 교란하여 개념 재현을 방지하는 플러그앤플레이 모듈인 **IRECE (Inference-time Robustness Enhancement for Concept Erasure)** 를 제안했습니다.

## 주요 결과
**M-ErasureBench** 평가 결과, 기존 개념 삭제 방법들은 텍스트 프롬프트에는 효과적이었으나, 학습된 임베딩 및 역전된 잠재 공간 조건에서는 **개념 재현율(CRR)이 화이트박스 설정에서 90% 이상** 으로 나타나 심각한 취약점을 보였습니다. 제안된 **IRECE** 모듈은 가장 도전적인 화이트박스 잠재 공간 역전 시나리오에서 **CRR을 최대 40%까지 감소** 시키면서 시각적 품질을 유지하여 견고성을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 확산 모델의 개념 삭제 기술이 텍스트 프롬프트 외의 다양한 입력 모달리티에서 심각한 보안 취약점을 가질 수 있음을 보여주며, 실제 AI 애플리케이션에 이러한 모델을 배포할 때 추가적인 고려가 필요함을 시사합니다. **IRECE** 와 같은 추론 시간 강화 모듈은 모델을 재훈련하지 않고도 삭제된 개념의 재현을 효과적으로 막을 수 있어, 보다 안전하고 신뢰할 수 있는 생성형 AI 모델 구축에 실질적인 도움을 줄 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.