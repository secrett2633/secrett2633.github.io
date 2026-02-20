---
title: "[논문리뷰] Souper-Model: How Simple Arithmetic Unlocks State-of-the-Art LLM Performance"
excerpt: "arXiv에 게시된 'Souper-Model: How Simple Arithmetic Unlocks State-of-the-Art LLM Performance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Souping
  - Large Language Models
  - Weighted Averaging
  - Benchmark Optimization
  - State-of-the-Art
  - Category Experts
  - Parameter Averaging
  - Post-training

permalink: /ai/review/2025-11-18-Souper-Model-How-Simple-Arithmetic-Unlocks-State-of-the-Art-LLM-Performance/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13254)

**저자:** Shalini Maiti, Amar Budhiraja, Bhavul Gauri, Gaurav Chaurasia, Anton Protopopov, Alexis Audran-Reiss, Michael Slater, Despoina Magka, Tatiana Shavrina, Roberta Raileanu, Yoram Bachrach



## 핵심 연구 목표
본 논문은 방대한 자원과 시간이 소요되는 LLM 훈련의 한계를 극복하고, 기존의 균일 가중치 모델 수핑(model souping) 및 임의적인 모델 선택의 단점을 해결하고자 합니다. 벤치마크 구성을 활용하고 비균일 가중치 평균을 적용하여 LLM 성능을 극대화하는 **Soup Of Category Experts (SoCE)** 라는 새로운 모델 수핑 방법론을 제시하여, 값비싼 재훈련 없이 SOTA 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **SoCE** 는 네 가지 핵심 단계를 포함합니다. 첫째, 벤치마크 내의 약하게 상관된 카테고리 쌍을 식별하기 위한 **상관관계 분석** 을 수행합니다. 둘째, 각 약하게 상관된 카테고리 클러스터에 대한 "전문가" 모델을 성능 순위를 기반으로 선별합니다. 셋째, **0.1부터 0.9까지 0.1 스텝** 의 가중치 공간에서 최적의 비균일 가중치를 탐색하여 전체 성능을 극대화합니다. 마지막으로, 최적화된 비균일 가중치를 사용하여 선택된 전문가 모델들을 결합하여 최종 모델을 생성합니다.

## 주요 결과
**Berkeley Function Calling Leaderboard (BFCL)** 벤치마크에서 **700억 파라미터 모델** 의 경우, **SoCE** 가 **80.68%** 의 정확도를 달성하여 이전 SOTA 모델인 **xLAM-2-70b-fc-r (78.56%)** 대비 **2.7%** 성능 향상을 이루었습니다. **80억 파라미터 모델** 에서는 **76.50%** 정확도를 기록하며 **xLAM-2-8b-fc-r** 대비 **5.7%** 의 상대적 개선을 보였습니다. **MGSM** 벤치마크에서도 **51.7%** 의 정확도를 달성했으며, 개별 모델 모두 실패한 태스크의 **8.4%** 를 **SoCE** 가 성공적으로 해결하여 견고성을 입증했습니다.

## AI 실무자를 위한 시사점
**SoCE** 는 값비싼 LLM 재훈련 없이 **기존 모델의 성능을 크게 향상** 시킬 수 있는 효율적인 방안을 제공합니다. 이는 **멀티링구얼 기능, 툴 호출, 수학적 추론** 등 다양한 AI 애플리케이션에서 모델의 **일관성과 신뢰성을 높여** 실제 배포 가치를 증대시킵니다. 또한, 오픈 소스 LLM 생태계에서 **이미 미세 조정된 모델** 들을 전략적으로 결합하여 새로운 기능을 효율적으로 추가하고 특정 태스크에 특화된 고성능 모델을 구축하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.