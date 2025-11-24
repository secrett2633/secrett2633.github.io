---
title: "[논문리뷰] Lost in Embeddings: Information Loss in Vision-Language Models"
excerpt: "Ivan Vulić이 [arXiv]에 게시한 'Lost in Embeddings: Information Loss in Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Information Loss
  - Embeddings
  - Connectors
  - k-NN Overlap Ratio
  - Embedding Reconstruction
  - Multimodal AI

permalink: /ai/review/2025-9-16-Lost-in-Embeddings-Information-Loss-in-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11986)

**저자:** Wenyan Li, Raphael Tang, Chengzu Li, Caiqi Zhang, Ivan Vulić, Anders Søgaard



## 핵심 연구 목표
본 논문은 **Vision-Language Models (VLMs)**에서 시각적 정보를 언어 모델 임베딩 공간으로 투영하는 **커넥터(connector)** 모듈로 인해 발생하는 잠재적인 **정보 손실**을 정량화하고 분석하는 것을 목표로 합니다. 이러한 손실이 모델의 하위 태스크 성능에 미치는 영향을 이해하고, 정보 변환 과정에서 발생하는 왜곡의 본질을 규명하고자 합니다.

## 핵심 방법론
연구는 두 가지 상호 보완적인 접근 방식을 사용합니다. 첫째, **k-Nearest Neighbors Overlap Ratio (KNOR)**를 도입하여 투영 전후 이미지 임베딩 간의 **k-NN 관계 변화**를 측정하여 기하학적 및 의미론적 정보 보존도를 평가합니다. 둘째, **패치 수준 시각 임베딩 재구성(patch-level visual embedding reconstruction)** 모델을 훈련하여 투영된 임베딩에서 원본 시각 임베딩을 재구성하고, 정보 손실이 발생하는 이미지 패치를 식별합니다.

## 주요 결과
커넥터는 시각적 표현의 로컬 기하학을 크게 왜곡하여 **k-NN 이웃이 40-60% 발산**하는 것으로 나타났습니다. 특히 **LLaVA 및 Idefics2 모델**의 경우, 이웃 재정렬이 **검색 성능 저하(R@5에서 LLaVA 41.4%, Idefics2 18.8% 하락)**와 상관관계가 있음이 확인되었습니다. 패치 수준 재구성 손실은 시각적 질문 답변(VQA) 및 캡셔닝 성능 저하와 연관되며, **높은 정보 손실 영역이 모델의 오류를 예측**하는 데 신뢰할 수 있는 지표로 작용합니다.

## AI 실무자를 위한 시사점
본 연구는 VLM 커넥터가 시각적 임베딩에서 상당한 정보 손실과 기하학적 왜곡을 초래하는 **핵심 병목 지점**임을 시사합니다. AI 엔지니어는 특히 **정밀한 시각적 세부 사항**이 중요한 작업에서 이러한 손실이 모델 성능을 제한할 수 있음을 인지해야 합니다. 제안된 **패치 수준 재구성 기법**은 VLM의 실패 원인을 진단하고 정보 손실 영역을 시각화하는 유용한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.