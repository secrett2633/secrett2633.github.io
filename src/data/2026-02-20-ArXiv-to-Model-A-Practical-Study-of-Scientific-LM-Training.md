---
title: "[논문리뷰] ArXiv-to-Model: A Practical Study of Scientific LM Training"
excerpt: "[arXiv]에 게시된 'ArXiv-to-Model: A Practical Study of Scientific LM Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Scientific Language Models
  - LLM Training
  - ArXiv
  - LaTeX Processing
  - Tokenization
  - Resource Constraints
  - Pretraining
  - Data Engineering

permalink: /ai/review/2026-02-20-ArXiv-to-Model-A-Practical-Study-of-Scientific-LM-Training/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17288)

**저자:** Anuj Gupta



## 핵심 연구 목표
본 연구는 **raw arXiv LaTeX 소스** 를 활용하여 도메인 특화 과학 언어 모델(Scientific LM)을 훈련하는 실제적이고 투명한 과정을 문서화하는 것을 목표로 합니다. 특히, 제한된 컴퓨팅 자원(2×A100 GPU) 하에서 **1.36B-parameter 모델** 을 성공적으로 훈련하며 발생하는 데이터 전처리, 토큰화, 훈련 안정성 및 인프라 병목 현상과 같은 실용적인 문제와 해결책을 탐구합니다.

## 핵심 방법론
연구는 **ArXiv LaTeX 소스** 에서 **80GB 텍스트 코퍼스** 를 구축하는 **end-to-end 파이프라인** 을 상세히 설명합니다. 이 파이프라인은 메타데이터 필터링, LaTeX 추출, 텍스트 정규화 및 가중치 혼합을 포함합니다. 토큰화는 과학 텍스트의 상징적 밀도를 고려하여 **LLaMA-compatible SentencePiece 토크나이저** (102,400 토큰)를 사용했으며, 훈련은 **2 NVIDIA A100 GPU** 에서 **bfloat16 혼합 정밀도** 및 **ZeRO Stage 2 최적화** 를 사용하여 **1.36B-parameter dense transformer** 로 진행되었습니다.

## 주요 결과
**20GB의 소규모 데이터셋** 에서 불안정한 수렴을 보인 반면, **200GB의 전체 데이터셋 (52.18B 토큰)** 으로 훈련했을 때는 손실이 부드럽게 감소하며 안정적인 수렴을 보였습니다. 최종 검증 손실은 약 **1.438 (perplexity ≈ 4.2)** 로, 과학 코퍼스에 대한 강력한 모델 적응력을 나타냈습니다. 데이터 전처리 결정, 스토리지 및 I/O 제약, 그리고 토큰화 전략이 사용 가능한 토큰 볼륨과 훈련 안정성에 지대한 영향을 미친다는 점이 밝혀졌습니다.

## AI 실무자를 위한 시사점
소규모에서 중간 규모의 언어 모델을 훈련할 때, **정교한 데이터 엔지니어링 및 파이프라인 설계** 는 아키텍처 스케일링만큼이나 중요합니다. 제한된 컴퓨팅 자원으로 도메인 특화 모델을 구축하는 연구자들은 **전처리 및 토큰화 전략의 투명한 보고** 를 통해 재현성을 높여야 합니다. 또한, **스토리지 및 I/O 처리량** 이 GPU 컴퓨팅만큼 주요한 병목 지점이 될 수 있음을 인지하고 최적화해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.