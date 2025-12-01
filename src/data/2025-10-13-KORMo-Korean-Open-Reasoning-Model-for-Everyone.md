---
title: "[논문리뷰] KORMo: Korean Open Reasoning Model for Everyone"
excerpt: "이 [arXiv]에 게시한 'KORMo: Korean Open Reasoning Model for Everyone' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Model
  - Korean
  - Bilingual
  - Synthetic Data
  - Fully Open Model
  - Tokenizer
  - Reasoning
  - Pretraining
  - Instruction Tuning

permalink: /ai/review/2025-10-13-KORMo-Korean-Open-Reasoning-Model-for-Everyone/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09426)

**저자:** Minjun Kim, Hyeonseok Lim, Hangyeol Yoo, Inho Won, Seungwoo Song, Minkyung Cho, Junghun Yuk, Changsu Choi, Dongjae Shin, Huije Lee, Hoyun Song, Alice Oh, Kyung Tae Lim



## 핵심 연구 목표
본 논문은 한국어와 영어를 지원하는 **최초의 완전 공개(Fully Open) 이중 언어 대규모 언어 모델(LLM)** 인 **KORMo** 를 구축하는 것을 목표로 합니다. 특히, 웹 크롤링 데이터가 부족한 비영어권 환경에서 **합성 데이터** 를 주된 자원으로 활용하여 모델 학습의 안정성, 효율성 및 일반화 성능을 입증하고, 관련 연구의 장벽을 낮추는 투명한 프레임워크를 제시하고자 합니다.

## 핵심 방법론
**10.8B 매개변수** 의 **KORMo-10B** 모델을 처음부터 학습했으며, 한국어 학습 데이터의 **68.74%** 를 **Qwen** 및 **GPT-OSS** 모델로 생성한 합성 데이터로 구성했습니다. **Pre-LN 아키텍처** , **Intra-doc attention masking** , **Next-Token Prediction (NTP)** 목표, 그리고 **byte-level BPE 기반의 이중 언어 토크나이저** 를 채택했습니다. 학습 과정은 **1500억 토큰** 규모의 다단계 커리큘럼(사전 학습, SFT, 선호 학습)을 따랐으며, **Old-both 방식의 중복 제거** 및 **fastText 기반 품질 필터링** 을 통해 데이터 품질을 엄격하게 관리했습니다.

## 주요 결과
합성 데이터를 사용한 **KORMo-10B** 는 장기 사전 학습 과정에서 모델 붕괴 없이 안정적인 수렴을 보였으며, 기존 공개 다국어 LLM과 유사한 성능을 달성했습니다. 특히, 영어 벤치마크에서 평균 **64.2%** , 한국어 벤치마크에서 평균 **58.2%** 의 성능을 기록했습니다. 이중 언어 토크나이저인 **EPK-125K** 는 한국어 압축 및 다운스트림 성능에서 상용 모델 대비 우수성을 보였고, SFT 단계에서는 MT-Bench, KO-MT-Bench, Logickor에서 평균 **8.61점** 을 기록하며 한국어 지시 이해 및 추론 능력에서 높은 경쟁력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질의 **합성 데이터** 가 비영어권 언어의 LLM 개발을 위한 실행 가능하고 확장 가능한 핵심 자원임을 증명합니다. **데이터 품질 관리(필터링, 중복 제거), 토크나이저 설계, 균형 잡힌 언어 비율** 이 모델 성능에 결정적인 영향을 미치므로, 이를 투명하게 공개한 **KORMo** 는 재현 가능한 FOM 개발의 중요한 이정표가 됩니다. AI 실무자들은 이러한 **fully open 모델** 의 개발 원칙을 활용하여 저자원 언어 모델 구축에 대한 새로운 방향을 모색할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.