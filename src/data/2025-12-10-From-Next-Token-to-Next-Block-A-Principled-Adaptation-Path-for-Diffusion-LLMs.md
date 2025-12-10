---
title: "[논문리뷰] From Next-Token to Next-Block: A Principled Adaptation Path for Diffusion LLMs"
excerpt: "이 [arXiv]에 게시한 'From Next-Token to Next-Block: A Principled Adaptation Path for Diffusion LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - LLM Adaptation
  - Block-Diffusion
  - Autoregressive Models
  - Attention Masks
  - Parallel Generation
  - Transfer Learning
  - Generative Models

permalink: /ai/review/2025-12-10-From-Next-Token-to-Next-Block-A-Principled-Adaptation-Path-for-Diffusion-LLMs/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06776)

**저자:** Yuchuan Tian, Yuchen Liang, Jiacheng Sun, Shuo Zhang, Guangwen Yang, Yingte Shu, Sibo Fang, Tianyu Guo, Kai Han, Chao Xu, Hanting Chen, Xinghao Chen, Yunhe Wang (Peking University & Huawei Technologies)



## 핵심 연구 목표
본 논문은 순차적인 자동회귀(AR) LLM의 추론 병목 현상을 해결하고자 합니다. 병렬 생성이 가능한 Diffusion Language Models(DLM)로 전환할 때, AR 모델의 방대한 사전 학습 지식을 버리고 DLM을 처음부터 학습하는 데 드는 막대한 비용 문제를 해결하기 위해, 사전 학습된 AR 모델을 고성능 블록-디퓨전 모델로 효율적으로 적응시키는 원칙적인 경로를 제시하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 AR을 `blocksize=1`인 블록-디퓨전의 특별한 경우로 보고, AR에서 블록-디퓨전으로의 점진적인 전환 경로를 제안합니다. 핵심 방법론은 **컨텍스트-인과적 어텐션 마스크(Context-Causal Attention Mask)** 를 사용하여 컨텍스트에서는 인과성을 유지하고 활성 블록 내에서만 양방향 추론을 허용하며, **효율적인 병렬 학습 절차** 와 **보조 AR 손실(Auxiliary AR Loss)** 을 통해 사전 학습된 지식을 보존하고 데이터 활용도를 극대화합니다. 또한, 생성 블록 크기를 점진적으로 증가시키는 **점진적 블록 성장 커리큘럼(Gradual Block Growth Curriculum)** 을 도입하여 AR과 블록-디퓨전 모델 간의 간극을 완화합니다.

## 주요 결과
제안된 **NBDIFF-7B (Base 및 Instruct)** 모델은 7B급 DLM 중 최첨단 성능을 달성했습니다. **NBDIFF-7B-BASE** 는 GSM8K에서 **79.6%** , MATH500에서 **46.0%** 의 정확도를 기록하며 기존 강력한 AR 및 디퓨전 모델을 능가했으며, **NBDIFF-7B-INSTRUCT** 는 GSM8K에서 **91.9%** , MATH500에서 **84.3%** , HumanEval에서 **87.8%** 의 성능을 보여주며 더욱 강력한 결과를 입증했습니다. 어블레이션 연구에서는 AR 손실 및 점진적 블록 성장 커리큘럼이 성능을 크게 향상시켰음을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 값비싼 DLM의 스크래치 학습 대신, 기존의 강력한 **사전 학습된 AR LLM(예: Pangu-Embedded-7B)** 을 효율적으로 활용하여 병렬 생성 기능을 갖춘 블록-디퓨전 모델로 전환할 수 있는 실용적인 방법을 제공합니다. **컨텍스트-인과적 어텐션, 보조 AR 손실, 점진적 블록 크기 성장** 과 같은 기법들은 모델 적응의 안정성과 지식 보존을 크게 향상시키므로, AI 엔지니어는 이를 통해 더욱 빠르고 유연한 텍스트 생성 모델을 개발할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.