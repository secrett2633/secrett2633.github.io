---
title: "[논문리뷰] RbtAct: Rebuttal as Supervision for Actionable Review Feedback Generation"
excerpt: "arXiv에 게시된 'RbtAct: Rebuttal as Supervision for Actionable Review Feedback Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Peer Review
  - Rebuttal
  - Actionable Feedback
  - Large Language Models (LLMs)
  - Supervised Fine-tuning (SFT)
  - Direct Preference Optimization (DPO)
  - RMR-75K Dataset
  - Review Feedback Generation

permalink: /ai/review/2026-03-12-RbtAct-Rebuttal-as-Supervision-for-Actionable-Review-Feedback-Generation/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09723)

**저자:** Sihong Wu, Yiling Ma, Yilun Zhao, Tiansheng Hu, Owen Jiang, Manasi Patwardhan, Arman Cohan



## 핵심 연구 목표
본 연구는 기존 LLM 기반의 동료 평가 리뷰가 종종 피상적이고 구체적인 실행 가능한 지침이 부족하다는 문제점을 해결하고자 합니다. 저자의 **재반박(rebuttal)** 을 암묵적인 감독 신호로 활용하여 **실행 가능한(actionable) 리뷰 피드백** 을 생성하는 것을 목표로 합니다.

## 핵심 방법론
**RBTACT** 프레임워크는 저자의 재반박이 실제 수정으로 이어진 부분과 단순히 방어한 부분을 학습하는 데 중요하다고 보고 이를 **암묵적인 선호도 신호** 로 사용합니다. 이를 위해 리뷰 세그먼트와 재반박 세그먼트를 매핑한 **RMR-75K 대규모 데이터셋** 을 구축했으며, **Llama-3.1-8B-Instruct 모델** 에 **지도 미세 조정(SFT)** 후 **재반박 기반 DPO(Direct Preference Optimization)** 를 적용하여 실행 가능성을 최적화했습니다.

## 주요 결과
RBTACT는 인간 전문가 및 LLM 심사 평가 모두에서 **가장 높은 실행 가능성** 을 달성했습니다. 인간 평가에서는 **3.46점(5점 만점)** , LLM 심사 평가에서는 **3.38점(5점 만점)** 을 기록하며 강력한 기준선 대비 일관된 개선을 보였습니다. 또한, **ROUGE-Lsum 12.64** 및 **METEOR 11.65** 로 자동 평가에서도 우수한 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM을 활용하여 실제 구현 가능한 구체적인 리뷰 피드백을 생성하는 새로운 방법을 제시합니다. **재반박 데이터를 감독 신호로 사용하는 DPO** 접근 방식은 명시적인 실행 가능성 레이블이 부족한 다른 피드백 생성 태스크에도 확장될 수 있습니다. **RMR-75K 데이터셋** 은 향후 동료 평가 연구에 귀중한 자료가 될 것이며, 과학 논문의 리뷰 품질과 효율성을 크게 향상시킬 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.