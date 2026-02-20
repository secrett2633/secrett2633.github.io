---
title: "[논문리뷰] Scaling Code-Assisted Chain-of-Thoughts and Instructions for Model
  Reasoning"
excerpt: "Zhuoshi Pan이 arXiv에 게시한 'Scaling Code-Assisted Chain-of-Thoughts and Instructions for Model
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code-Assisted Reasoning
  - Chain-of-Thought (CoT)
  - Instruction Tuning
  - Data Augmentation
  - LLMs
  - Mathematical Reasoning
  - Self-Verification
  - Code Generation

permalink: /ai/review/2025-10-8-Scaling-Code-Assisted-Chain-of-Thoughts-and-Instructions-for-Model-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04081)

**저자:** Honglin Lin, Qizhi Pei, Xin Gao, Zhuoshi Pan, Yu Li, Juntao Li, Conghui He, Lijun Wu



## 핵심 연구 목표
본 논문은 LLM의 추론 능력 향상을 위해 기존 자연어 기반 CoT(Chain-of-Thought) 방식의 검증 불가능성, 확장성 한계, 다양성 부족 문제를 해결하는 것을 목표로 합니다. 코드 기반의 자동화된 추론 데이터 생성 프레임워크인 **Caco** 를 제안하여 고품질, 검증 가능하며 다양한 명령어-CoT 추론 데이터를 대규모로 생성하고자 합니다.

## 핵심 방법론
Caco는 먼저 수학 및 알고리즘 솔루션을 **통합된 코드 형식** 으로 변환하고, 이를 활용해 **코드 기반 CoT 생성 모델(CodeGen)** 을 사전 훈련합니다. 이 모델은 대규모의 **코드 기반 CoT 후보군** 을 생성하며, 이들은 **코드 실행** , **논리적 일관성 검사** , **AST 분석** 을 통한 자동 검증 과정을 거칩니다. 최종적으로 검증된 코드 솔루션은 자연어 문제와 CoT로 역변환되고, **이중 검증** 을 통해 최종 데이터셋을 구축합니다.

## 주요 결과
Caco-1.3M 데이터셋으로 훈련된 모델들은 GSM8K에서 **92.6%** , MATH에서 **82.4%** 의 정확도를 달성하여 기존 강력한 베이스라인들을 크게 능가했습니다. 특히, LLaMA3-8B 모델은 Caco-1.3M 데이터셋 사용 시 평균 점수 **57.3%** 를 기록, 기존 최고치인 DartMath의 **39.7%** 대비 **44.3%** 의 상대적 성능 향상을 보였습니다. 또한, 검증 메커니즘은 문제 해결 가능성을 **91K에서 97K** 로, 정확한 답변 비율을 **88K에서 93K** 로 향상시켰습니다.

## AI 실무자를 위한 시사점
Caco는 LLM의 추론 능력을 향상시키는 **확장 가능하고 신뢰할 수 있는 데이터 생성 프레임워크** 를 제공하여 수동 어노테이션의 필요성을 줄입니다. 코드 통합을 통해 수학뿐만 아니라 논리 퍼즐, 과학적 추론 등 다양한 도메인에서 LLM의 추론 및 일반화 성능을 크게 향상시킬 수 있음을 보여줍니다. 이는 **스스로 개선하고 검증 가능한 AI 시스템** 을 구축하는 새로운 패러다임을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.