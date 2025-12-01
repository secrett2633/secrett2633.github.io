---
title: "[논문리뷰] Insights from the ICLR Peer Review and Rebuttal Process"
excerpt: "Nedjma Ousidhoum이 [arXiv]에 게시한 'Insights from the ICLR Peer Review and Rebuttal Process' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Peer Review
  - Rebuttal Process
  - ICLR
  - Score Dynamics
  - LLM Analysis
  - Reviewer Engagement
  - Academic Publishing
  - OpenReview

permalink: /ai/review/2025-11-24-Insights-from-the-ICLR-Peer-Review-and-Rebuttal-Process/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15462)

**저자:** Nedjma Ousidhoum, Jing Yang, Nafiseh Nikeghbal, Amir Hossein Kargaran



## 핵심 연구 목표
본 논문은 ICLR 2024 및 2025 컨퍼런스의 **피어 리뷰 및 재고(rebuttal) 과정** 의 본질과 역학을 이해하고, 효율성, 효과성 및 출판 논문의 품질 향상에 기여하는 것을 목표로 합니다. 특히, 재고가 리뷰 점수 변화와 최종 결과에 미치는 영향을 분석하여 저자들이 재고를 효과적으로 활용하고 커뮤니티가 더 공정하고 효율적인 리뷰 프로세스를 설계할 수 있도록 실증적인 통찰력을 제공하고자 합니다.

## 핵심 방법론
연구는 ICLR 2024 및 2025의 **OpenReview API** 를 통해 수집된 대규모 데이터를 기반으로 **정량적 통계 분석** 과 **LLM (GPT-40)** 기반의 리뷰 텍스트 및 재고 토론 **카테고리 분류** 를 결합합니다. 재고 전후 점수, 저자-리뷰어 참여도, 리뷰 제출의 시간적 패턴, 공동 리뷰어 영향 효과 등을 종합적으로 분석하며, **다항 로지스틱 회귀 모델** 을 사용하여 점수 변화에 가장 강력하게 영향을 미치는 요인과 효과적인 재고 전략을 식별합니다.

## 주요 결과
재고는 주로 **경계선에 있는 논문 (점수 5-6)** 에 영향을 미치며, 상위 논문 중 약 **5개 중 1개** 는 재고를 통해 점수 향상 혜택을 받습니다. 재고 후 리뷰어 간 불일치는 약 **9-10% 감소** 하며, 특히 고품질 논문(Oral/Spotlight)에서 가장 강한 수렴을 보였습니다. **초기 점수와 공동 리뷰어의 점수** 가 재고 후 점수 변화를 예측하는 가장 강력한 지표였으며, **증거 기반의 명확한 설명** 을 제공하는 재고가 긍정적인 점수 변화를 가져올 가능성이 높습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자, 특히 논문 저자는 재고 작성 시 **경계선 논문에 집중** 하고, 모호하거나 일반적인 방어 대신 **구체적이고 증거에 기반한 설명** 을 제공해야 합니다. 리뷰어는 재고 기간 중간에 제출된 재고가 가장 효과적일 수 있다는 점을 인지해야 합니다. 또한, 컨퍼런스 주최 측은 재고 과정이 논문 순위에 상당한 영향을 미치므로, 이를 **피어 리뷰 프로세스의 중요한 균형 단계** 로 활용하여 공정성과 효율성을 높일 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.