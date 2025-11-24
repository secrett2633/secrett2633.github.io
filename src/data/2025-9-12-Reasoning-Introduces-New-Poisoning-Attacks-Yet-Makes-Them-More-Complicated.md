---
title: "[논문리뷰] Reasoning Introduces New Poisoning Attacks Yet Makes Them More
  Complicated"
excerpt: "Jamie Hayes이 [arXiv]에 게시한 'Reasoning Introduces New Poisoning Attacks Yet Makes Them More
  Complicated' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Security
  - Data Poisoning
  - Chain-of-Thought
  - Reasoning Models
  - Backdoor Attacks
  - CoT Unfaithfulness
  - Emergent Robustness

permalink: /ai/review/2025-9-12-Reasoning-Introduces-New-Poisoning-Attacks-Yet-Makes-Them-More-Complicated/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.05739)

**저자:** Hanna Foerster, Ilia Shumailov, Jamie Hayes, Robert Mullins, Yiren Zhao, Harsh Chaudhari, Yarin Gal



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 **단계별 추론(Chain-of-Thought, CoT) 능력**이 새로운 유형의 데이터 포이즈닝 공격 기회를 제공함과 동시에, 이러한 공격을 최종 답변으로 유도하는 것을 복잡하게 만드는 예상치 못한 견고성을 생성한다는 점을 탐구합니다. 특히 **추론 경로만을 표적으로 하는 은밀한 포이즈닝 공격**의 가능성과 그 한계를 분석합니다.

## 핵심 방법론
제안된 공격인 **"decomposed reasoning poison"**은 **감독 학습(SFT) 환경**에서 이루어지며, 모델의 프롬프트와 최종 답변은 깨끗하게 유지한 채 **추론 경로(CoT)만 악의적으로 수정**합니다. 공격자는 트리거를 여러 개의 개별적으로 무해한 구성 요소로 분할하여 훈련 데이터에 주입하고, 모델이 **Qwen-32B**와 같은 모델에서 **수학 및 코딩 문제(S1, S2, S3)**를 해결하는 과정에서 악의적인 "홉(hops)"을 통해 다른 문제로 우회하도록 유도합니다.

## 주요 결과
사고 과정에 대한 백도어 주입은 성공적이었으나, 최종 답변을 조작하는 것은 놀랍도록 어려웠습니다. 사고 과정에서는 **최대 80%**의 백도어 성공률(단일 홉 기준)을 보였지만, 최종 답변에서 의도된 결과를 얻는 비율은 **최대 19.25%**에 그쳤습니다. 이는 모델의 **자체 수정 능력**과 **CoT의 불성실성(CoT unfaithfulness)**, 그리고 추론과 최종 답변 생성 사이의 **아키텍처적 분리** 때문인 것으로 분석됩니다.

## AI 실무자를 위한 시사점
LLM의 추론 능력은 **새로운 형태의 은밀한 포이즈닝 공격 벡터**를 생성하지만, 동시에 모델 내부에서 예상치 못한 **"백도어 견고성(backdoor robustness)"**을 발생시킵니다. 이는 **"깨끗한 프롬프트, 오염된 CoT, 깨끗한 답변"** 시나리오에서 기존 방어 메커니즘을 회피할 수 있는 새로운 위협 모델을 제시하며, AI/ML 엔지니어들은 모델의 내부 추론 과정에 대한 모니터링과 **CoT의 신뢰성**에 대한 깊이 있는 이해가 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.