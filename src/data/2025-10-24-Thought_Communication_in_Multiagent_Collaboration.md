---
title: "[논문리뷰] Thought Communication in Multiagent Collaboration"
excerpt: "Mingze Gao이 [arXiv]에 게시한 'Thought Communication in Multiagent Collaboration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multiagent Systems
  - LLM Communication
  - Latent Variable Models
  - Identifiability Theory
  - Thought Communication
  - Sparse Autoencoder
  - Prefix Tuning

permalink: /ai/review/2025-10-24-Thought_Communication_in_Multiagent_Collaboration/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20733)

**저자:** Yujia Zheng, Mingze Gao, Zhuokai Zhao, Zijian Li, Yaqi Xie, Lizhu Zhang, Kun Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 멀티 에이전트 시스템(MAS)에서 자연어 통신의 내재적 한계(손실, 모호성)를 극복하고자 합니다. 궁극적으로 에이전트들이 **"생각 통신"**을 통해 직접적으로 상호작용하여 집단 지능의 잠재력을 최대한 발휘하는 새로운 통신 패러다임을 제안하고, 이를 위한 이론적 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
에이전트의 내부 상태(**Ht**)가 숨겨진 생각(**Zt**)에 의해 생성된다는 **잠재 변수 모델**을 가정하고, 이를 **희소성 정규화된 오토인코더(sparsity-regularized autoencoder)**를 통해 **Žt**를 추출합니다. 이론적으로는 비모수적 환경에서 공유되거나 개별적인 잠재적 생각의 **식별 가능성(identifiability)**을 증명했으며, 추출된 생각을 각 에이전트의 컨텍스트에 **Prefix Adaptation** 방식으로 주입하여 LLM의 응답 생성을 유도합니다.

## 주요 결과
합성 데이터 실험에서 **Žt**와 실제 잠재 변수 간의 높은 **R² 점수**를 통해 잠재 생각의 식별 가능성을 검증했습니다. 실제 벤치마크인 **MATH 및 GSM8K**에서 **THOUGHTCOMM**는 기존 Multiagent Finetuning 및 Single Answer 방식 대비 뛰어난 성능을 보였으며, 특히 **Qwen 3-1.7B 모델**의 MATH 태스크에서 **93% 정확도**를 달성하여 Multiagent Finetuning보다 **17.2%의 절대적인 성능 향상**을 기록했습니다. 또한, 토론 라운드 및 Prefix 길이 변화에도 견고한 성능을 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 MAS의 협업 방식을 혁신할 수 있는 **새로운 "생각 통신" 패러다임**을 제시합니다. 경량의 **자동 인코더 및 어댑터**만을 훈련시켜 **적은 연산 오버헤드**로 기존 LLM에 쉽게 통합할 수 있으며, 이는 **모델-불가지론적(model-agnostic) 설계**로 다양한 모델과 태스크에 적용 가능함을 시사합니다. 이를 통해 에이전트 간의 정렬 및 협업 효율성을 높여 복잡한 문제 해결 능력을 향상시킬 수 있는 실용적인 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.