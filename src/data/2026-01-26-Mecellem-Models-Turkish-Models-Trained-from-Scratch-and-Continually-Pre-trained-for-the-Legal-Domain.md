---
title: "[논문리뷰] Mecellem Models: Turkish Models Trained from Scratch and Continually Pre-trained for the Legal Domain"
excerpt: "이 [arXiv]에 게시한 'Mecellem Models: Turkish Models Trained from Scratch and Continually Pre-trained for the Legal Domain' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Turkish Legal NLP
  - Domain Adaptation
  - ModernBERT
  - Continual Pre-training (CPT)
  - Embedding Models
  - Legal LLMs
  - Retrieval-Augmented Generation (RAG)
  - Curriculum Learning

permalink: /ai/review/2026-01-26-Mecellem-Models-Turkish-Models-Trained-from-Scratch-and-Continually-Pre-trained-for-the-Legal-Domain/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16018)

**저자:** Özgür Uğura, Mahmut Göksu, Mahmut Çimen, Musa Yılmaz, Esra Şavirdi, Alp Talha Demir, Rumeysa Güllüce, İclal Çetin, Ömer Can Sağbaş



## 핵심 연구 목표
본 논문은 터키어 법률 도메인에 특화된 언어 모델인 Mecellem 모델을 개발하여, 비영어권 및 전문 도메인(특히 터키어 법률)에서 대규모 언어 모델의 성능 저하 문제를 해결하는 것을 목표로 합니다. 이를 위해, 스크래치 학습된 인코더 모델과 지속적 사전 훈련(CPT)된 디코더 모델 두 가지 접근 방식을 제시합니다.

## 핵심 방법론
핵심 방법론은 두 가지로 나뉩니다. 첫째, **ModernBERT** 기반의 인코더 모델은 **112.7억 토큰** 의 터키어 법률-중심 코퍼스에서 스크래치 학습되었으며, 사전 훈련 손실 최소화 대신 **하위 스트림 검색 성능** 을 기반으로 최적의 체크포인트를 선택했습니다. 이후 **InfoNCE** 및 **GISTEmbed** 와 같은 **대조 학습(Contrastive Learning)** 기법으로 임베딩 작업을 위한 후처리 학습을 수행했습니다. 둘째, **Qwen3-1.7B** 및 **Qwen3-4B** 디코더 모델은 **4단계 커리큘럼 학습** 기반의 **지속적 사전 훈련(CPT)** 을 통해 터키어 법률 도메인에 적응했습니다. 데이터는 **SemHash** 및 **FineWeb** 필터링을 거쳐 큐레이션 되었습니다.

## 주요 결과
인코더 모델은 터키어 검색 리더보드에서 **상위 3위권** 을 달성했으며, **155M 매개변수** 의 소형 모델이 **307M-567M 매개변수** 의 대형 참조 모델과 필적하는 성능을 보였습니다. 특히, 사전 훈련 손실이 최소값에 도달하기 전의 체크포인트에서 최고의 검색 점수를 얻어 **92.36%의 생산 효율성** 을 입증했습니다. 디코더 모델은 터키어 법률 텍스트에서 **36.2%의 perplexity 감소** 를 달성하여 도메인 적응의 효과를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 특히 형태학적으로 풍부한 언어와 저자원 도메인에서 **하위 스트림 작업 성능 기반의 체크포인트 선택** 이 사전 훈련 손실 최소화보다 중요하다는 것을 보여줍니다. **도메인 특화 사전 훈련** 과 **CPT 전략** 을 통해 법률 분야의 RAG 시스템 개발에 필수적인 고품질 터키어 법률 언어 모델을 구축할 수 있음을 입증했습니다. 또한, **매개변수 효율적인 인코더 모델** 이 대규모 모델과 경쟁할 수 있음을 제시하여, 제한된 컴퓨팅 자원으로도 효과적인 AI 솔루션 구현 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.