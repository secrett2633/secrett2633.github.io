---
title: "[논문리뷰] Jailbreaking Commercial Black-Box LLMs with Explicitly Harmful Prompts"
excerpt: "Liming Fang이 arXiv에 게시한 'Jailbreaking Commercial Black-Box LLMs with Explicitly Harmful Prompts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Jailbreaking
  - Red Teaming
  - Malicious Content Detection
  - Developer Messages
  - D-Attack
  - DH-CoT
  - Adversarial Attacks
  - Dataset Cleaning

permalink: /ai/review/2025-8-25-Jailbreaking-Commercial-Black-Box-LLMs-with-Explicitly-Harmful-Prompts/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10390)

**저자:** Chiyu Zhang, Lu Zhou, Xiaogang Xu, Jiafei Wu, Liming Fang, Zhe Liu



## 핵심 연구 목표
본 논문은 상업용 블랙박스 LLM에 대한 효과적인 탈옥(jailbreak) 공격 방법론을 개발하고, 기존 레드팀 데이터셋의 부적절한 프롬프트(Benign, Non-obvious Harmful, Non-Triggering harmful-response) 문제를 해결하여 LLM 평가의 정확성을 높이는 것을 목표로 합니다. 특히, 기존 데이터셋의 비효율성을 극복하고 악성 콘텐츠 탐지 및 탈옥 반응 평가를 위한 체계적인 프레임워크를 제시합니다.

## 핵심 방법론
연구팀은 데이터셋 정제 및 탈옥 반응 탐지를 위한 하이브리드 평가 프레임워크인 **MDH (Malicious content Detection based on LLMs with Human assistance)** 를 제안합니다. MDH는 **Judger Selection** , **Type-Based Pre-Filtering** , **Multi-Round Voting-Based Fine Filtering** 단계를 포함하며 LLM 기반 주석과 최소한의 사람 검토를 결합합니다. 또한, **D-Attack** (컨텍스트 시뮬레이션 및 잘 구성된 개발자 메시지 활용)과 **DH-CoT** (개발자 메시지에 하이재킹된 사고 체인 통합)라는 두 가지 새로운 탈옥 공격 전략을 도입합니다.

## 주요 결과
**MDH** 는 데이터셋 정화에서 **95% 이상의 NHP 탐지 정확도** 를 달성했으며, 수동 작업 노력은 **10% 미만** 으로 크게 줄였습니다. 탈옥 반응 탐지에서도 **D-Attack (04-Mini)** 의 경우 **0% 에러율** 을 기록하는 등 낮은 에러율을 보였습니다. 특히, **DH-CoT** 는 추론 모델인 **o3에서 38%** , **o4-Mini에서 30%** 의 ASR(Attack Success Rate) 향상을 보이며 기존 **H-CoT** 를 크게 능가하는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 안전성 평가를 위한 고품질 레드팀 데이터셋 구축 및 관리의 중요성을 강조하며, **MDH** 와 같은 효율적인 악성 콘텐츠 탐지 도구를 제공합니다. **D-Attack** 및 **DH-CoT** 와 같은 개발자 메시지 기반의 공격은 LLM의 안전장치에 대한 새로운 취약점을 드러내며, 특히 추론 모델에서 효과적인 탈옥이 가능함을 보여줍니다. 이는 AI 시스템의 개발자 인터페이스 및 내부 로직 보안 강화의 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.