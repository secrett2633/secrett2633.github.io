---
title: "[논문리뷰] Dynamic Model Routing and Cascading for Efficient LLM Inference: A Survey"
excerpt: "John D. Kelleher이 arXiv에 게시한 'Dynamic Model Routing and Cascading for Efficient LLM Inference: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Inference
  - Model Routing
  - Model Cascading
  - Efficiency Optimization
  - Dynamic Model Selection
  - Multi-LLM Systems
  - Cost-Performance Trade-off
  - Adaptive AI Systems

permalink: /ai/review/2026-03-09-Dynamic-Model-Routing-and-Cascading-for-Efficient-LLM-Inference-A-Survey/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.04445)

**저자:** Yasmin Moslem, John D. Kelleher



## 핵심 연구 목표
본 설문조사는 대규모 언어 모델(LLM)의 급증에 따라 발생하는 추론 시간의 효율성 및 최적 모델 선택의 필요성을 해결하고자 합니다. 특히, 정적 모델 배포의 한계를 극복하고, 쿼리의 복잡성과 도메인에 따라 **여러 LLM을 동적으로 선택** 하는 라우팅 및 캐스케이딩 시스템의 최신 기술을 체계적으로 분석하는 것을 목표로 합니다.

## 핵심 방법론
이 설문조사는 멀티-LLM 라우팅 및 캐스케이딩 접근 방식을 **난이도 인지 라우팅** , **인간 선호도 정렬 라우팅** , **클러스터링 기반 라우팅** , **강화 학습 라우팅** , **불확실성 기반 라우팅** , **캐스케이딩** 의 여섯 가지 주요 패러다임으로 분류하여 분석합니다. 또한, 라우팅 결정이 이루어지는 **시점** , 사용되는 **정보** , 결정이 **계산되는 방식** 을 기준으로 시스템을 특성화하는 개념적 프레임워크를 제시합니다.

## 주요 결과
분석 결과, 효과적인 멀티-LLM 라우팅은 경쟁하는 목표들(성능, 비용, 지연 시간) 간의 균형이 중요함이 드러났습니다. **GraphRouter** 는 최소 **12.3%** 의 성능 향상을 보였으며, **MixLLM** 은 **GPT-4** 품질의 **97.25%** 를 **24.18%** 의 비용으로 달성하는 등, 잘 설계된 라우팅 시스템이 개별 모델보다 뛰어난 효율성을 제공할 수 있음을 보여줍니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 설문조사를 통해 다양한 LLM 라우팅 및 캐스케이딩 전략을 이해하고 실제 배포 환경에 맞는 최적의 시스템을 설계할 수 있습니다. 특히, 쿼리의 특성(난이도, 도메인)에 따라 **모델의 전문화된 역량을 전략적으로 활용** 하여 비용을 절감하고 성능을 극대화하는 방안을 모색할 수 있으며, 시스템의 **일반화** 및 **멀티모달리티** 지원이라는 남아있는 과제에 대한 인사이트를 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.