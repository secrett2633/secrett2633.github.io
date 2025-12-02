---
title: "[논문리뷰] SO-Bench: A Structural Output Evaluation of Multimodal LLMs"
excerpt: "이 [arXiv]에 게시한 'SO-Bench: A Structural Output Evaluation of Multimodal LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Structural Output
  - Information Extraction
  - JSON Schema
  - SO-Bench
  - Visual Reasoning
  - Supervised Fine-tuning
  - Reinforcement Learning

permalink: /ai/review/2025-12-01-SO-Bench-A-Structural-Output-Evaluation-of-Multimodal-LLMs/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21750)

**저자:** Di Feng, Kaixin Ma, Feng Nan, Haofeng Chen, Bohan Zhai, David Griffiths, Mingfei Gao, Zhe Gan, Eshan Verma, Yinfei Yang, Zhifeng Chen, Afshin Dehghan



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLMs)이 시각적 입력으로부터 스키마 기반 정보를 추출하고 추론하여 구조화된 출력을 생성하는 능력에 대한 체계적인 벤치마크가 부재하다는 문제를 해결하고자 합니다. 궁극적으로, **SO-Bench** 벤치마크를 구축하여 MLLM의 시각적 구조화된 출력 역량을 종합적으로 평가하고 개선 방향을 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **UI 화면** , **자연 이미지** , **문서** , **차트** 의 네 가지 시각 도메인에 걸쳐 **6.5K 이상의 다양한 JSON 스키마** 와 **1.8K개의 큐레이션된 이미지-스키마 쌍** 으로 **SO-Bench** 를 구축했습니다. 벤치마크 데이터셋은 다단계 자동 레이블링 파이프라인(이미지-스키마 연관, 합성 스키마 생성, 비판 모델 및 인력 검증을 통한 응답 생성/개선)을 통해 높은 품질을 보장합니다. 모델의 성능은 **스키마 유효성 검증 정확도** , **필드 매칭 정확도** (정확 및 퍼지), **전체 구조 매칭 정확도** 의 세 가지 주요 지표로 평가됩니다.

## 주요 결과
벤치마킹 결과, **GPT-5** 및 **Gemini 2.5-Pro** 와 같은 최첨단 독점 모델들이 **95% 이상** 의 높은 스키마 유효성 검증 정확도를 보였습니다. 그러나 완전하게 올바른 구조화된 출력을 예측하는 **전체 구조 매칭 정확도** 는 최대 **17.1%** 에 불과하여 상당한 개선의 여지를 보였습니다. 훈련 실험에서는 **지도 미세 조정(SFT)** 과 **검증 가능한 보상을 통한 강화 학습(RLVR)** 을 통해 스키마 유효성 검증은 최대 **20%** , 필드 매칭 정확도는 최대 **13%** 까지 향상될 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 MLLM들이 시각적 입력으로부터 복잡하고 스키마를 준수하는 구조화된 출력을 생성하는 데 있어 한계가 있음을 명확히 보여줍니다. 이는 에이전트 기반 애플리케이션 개발 시 **정확한 스키마 준수** 의 중요성을 강조하며, **SO-Bench** 는 이러한 문제를 해결하기 위한 모델 개발의 핵심적인 지침이 될 것입니다. 특히 **SFT** 및 **RLVR** 과 같은 **구조화된 출력에 특화된 훈련** 의 중요성을 입증하여, 향후 MLLM의 구조적 추론 능력 향상을 위한 실용적인 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.