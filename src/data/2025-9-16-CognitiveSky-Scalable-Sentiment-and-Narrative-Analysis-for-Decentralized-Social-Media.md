---
title: "[논문리뷰] CognitiveSky: Scalable Sentiment and Narrative Analysis for
  Decentralized Social Media"
excerpt: "Subasish Das이 arXiv에 게시한 'CognitiveSky: Scalable Sentiment and Narrative Analysis for
  Decentralized Social Media' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sentiment Analysis
  - Narrative Analysis
  - Decentralized Social Media
  - Bluesky
  - Transformer Models
  - Topic Modeling
  - Real-time Processing
  - Data Visualization

permalink: /ai/review/2025-9-16-CognitiveSky-Scalable-Sentiment-and-Narrative-Analysis-for-Decentralized-Social-Media/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11444)

**저자:** Gaurab Chhetri, Anandi Dutta, Ph.D., Subasish Das, Ph.D.



## 핵심 연구 목표
본 연구는 분산형 소셜 미디어 플랫폼인 **Bluesky** 에서 실시간으로 대규모 공개 담론을 분석하기 위한 확장 가능한 오픈 소스 프레임워크인 **CognitiveSky** 를 제안합니다. 기존 트위터(X) API 제한으로 인한 연구 한계를 극복하고, 감성, 감정, 내러티브 분석을 위한 투명하고 확장 가능한 도구를 제공하여 계산 사회 과학을 지원하는 것이 목표입니다.

## 핵심 방법론
**CognitiveSky** 는 **Bluesky Firehose API** 에서 실시간 데이터를 수집하는 **Node.js** 기반의 인제스트 파이프라인으로 시작합니다. 수집된 데이터는 **Python 기반 파이프라인** 에서 **ROBERTa-based 모델 (CardiffNLP)** 로 감성 분류를, **DistilRoBERTa 모델 (GoEmotions dataset)** 로 감정 탐지를 수행합니다. 이후 **TF-IDF** 벡터화와 **MiniBatch NMF** 를 사용하여 토픽 클러스터링을 수행하며, 이 모든 과정은 **GitHub Actions** 를 통해 자동화됩니다. 최종적으로 처리된 데이터는 **Next.js 및 Recharts** 로 구성된 동적 대시보드를 통해 시각화됩니다.

## 주요 결과
**CognitiveSky** 는 무료 등급 인프라를 활용하여 **낮은 운영 비용** 과 **높은 접근성** 을 달성했습니다. 시스템은 정신 건강 담론 모니터링에 성공적으로 적용되었으며, 총 **58,567개의 게시물** 을 처리하고 **17.1%의 긍정 감성 비율** 과 **31.3%의 가장 많은 감정으로 '두려움'** 을 식별했습니다. 구체적인 모델의 성능 지표는 명시되지 않았으나, 최첨단 트랜스포머 모델을 통합하여 실시간 분석 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**CognitiveSky** 는 AI/ML 엔지니어와 데이터 과학자에게 **분산형 소셜 미디어 데이터** 를 실시간으로 분석하고 시각화하는 강력한 참조 아키텍처를 제공합니다. **SOTA 트랜스포머 모델** 을 경량화된 파이프라인에 통합하는 방법을 보여주며, **무료 등급 클라우드 서비스** 를 활용한 비용 효율적인 솔루션 구축 가능성을 제시합니다. 본 프레임워크는 정보 보안, 위기 대응, 시민 참여 등 다양한 도메인에서 활용될 수 있는 **모듈식 및 재현 가능한 설계** 를 갖추고 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.