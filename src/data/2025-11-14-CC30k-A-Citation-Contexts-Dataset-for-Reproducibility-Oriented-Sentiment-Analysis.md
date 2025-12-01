---
title: "[논문리뷰] CC30k: A Citation Contexts Dataset for Reproducibility-Oriented Sentiment Analysis"
excerpt: "Jian Wu이 [arXiv]에 게시한 'CC30k: A Citation Contexts Dataset for Reproducibility-Oriented Sentiment Analysis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Citation Contexts
  - Reproducibility
  - Sentiment Analysis
  - Large Language Models
  - Crowdsourcing
  - Dataset
  - Machine Learning
  - Science of Science

permalink: /ai/review/2025-11-14-CC30k-A-Citation-Contexts-Dataset-for-Reproducibility-Oriented-Sentiment-Analysis/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07790)

**저자:** Rochana R. Obadage, Sarah Rajtmajer, Jian Wu



## 핵심 연구 목표
본 논문은 AI/ML 논문 내 인용 문맥에서 재현성(reproducibility) 지향 감성을 식별하기 위한 **CC30k 데이터셋** 을 구축하는 것을 목표로 합니다. 이는 계산적 재현성 연구를 위한 자원 부족 문제를 해결하고, 대규모 언어 모델(LLM)이 재현성 관련 감성을 효과적으로 예측하도록 훈련하는 기반을 마련합니다.

## 핵심 방법론
총 **30,734개** 의 인용 문맥을 포함하는 데이터셋은 기계 학습 논문에서 수집되었으며, 각 문맥은 **Positive, Negative, Neutral** 세 가지 재현성 지향 감성 레이블 중 하나로 지정되었습니다. **크라우드소싱** 을 통해 **25,829개** 의 레이블이 부여되었고, **RoBERTa** 기반의 **AI-assisted 파이프라인** 과 **인간 검증** 을 통해 희소한 부정 레이블을 **4,905개** 증강하여 클래스 불균형을 해소했습니다. 이후, **LLaMA-3-8B** , **Qwen-1.5-7B** , **GPT-4 (RAG 포함)** 등 LLM의 미세 조정을 통해 데이터셋의 유용성을 입증했습니다.

## 주요 결과
CC30k 데이터셋은 **94%** 의 높은 레이블링 정확도를 달성하며 고품질의 재현성 지향 감성 데이터를 제공합니다. 본 데이터셋으로 LLM을 미세 조정한 결과, 재현성 지향 감성 분류 성능이 베이스라인 대비 **5%에서 27%까지** 유의미하게 향상되었습니다. 특히, **GPT-4 (RAG 포함)** 는 3k 훈련 샘플에서 **0.786 F1-score** 를 달성했으며, **Qwen-1.5-7B** 는 9k 훈련 샘플에서 **0.695 F1-score** 를 기록했습니다.

## AI 실무자를 위한 시사점
CC30k 데이터셋은 AI/ML 논문의 **재현성 평가 모델 개발** 을 위한 중요한 자원으로 활용될 수 있습니다. 이를 통해 **도메인 특화된 LLM** 을 미세 조정하여 학술 문헌에서 재현성 관련 패턴을 분석하고, AI 커뮤니티의 신뢰성을 높이는 데 기여할 수 있습니다. 또한, 데이터 및 소프트웨어 가용성에 대한 인용 문맥을 분석하여 **재현성 인식 추천 시스템** 개발에 중요한 통찰력을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.