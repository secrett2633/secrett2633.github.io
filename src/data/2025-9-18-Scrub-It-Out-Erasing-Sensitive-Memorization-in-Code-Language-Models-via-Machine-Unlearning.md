---
title: "[논문리뷰] Scrub It Out! Erasing Sensitive Memorization in Code Language Models via
  Machine Unlearning"
excerpt: "Zhou Yang이 [arXiv]에 게시한 'Scrub It Out! Erasing Sensitive Memorization in Code Language Models via
  Machine Unlearning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Language Models
  - Machine Unlearning
  - Sensitive Memorization
  - Privacy
  - Gradient Ascent
  - Model Utility
  - Code Generation

permalink: /ai/review/2025-9-18-Scrub-It-Out-Erasing-Sensitive-Memorization-in-Code-Language-Models-via-Machine-Unlearning/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13755)

**저자:** Zhou Yang, Di Wang, Zhikun Zhang, Yao Wan, Zhaoyang Chu



## 핵심 연구 목표
본 논문은 **Code Language Models (CLMs)** 에서 발생하는 민감한 훈련 데이터의 의도치 않은 기억(memorization) 문제를 해결하고자 합니다. 특히, 기존 데이터 중복 제거 및 차등 프라이버시 기법이 전체 모델 재훈련을 요구하여 비효율적이라는 한계를 극복하고, **배포된 CLM에서 민감 정보를 효과적이고 효율적으로 지울 수 있는지** 를 탐구하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 먼저 **detect-secrets** 도구를 사용하여 **codeparrot-clean-train** 데이터셋에서 민감 데이터를 식별하고, **50,000개** 의 민감하게 기억된 샘플로 구성된 **Sensitive Memorization Dataset** 을 구축했습니다. 이를 바탕으로 기존 **Gradient Ascent (GA)** , **Constraint-Based Unlearning (CU)** 방식과 함께, 코드의 민감 부분만 선택적으로 지우고 주변 코드의 무결성을 유지하는 새로운 기법인 **CODEERASER** 를 제안합니다. **CODEERASER** 는 민감한 세그먼트에는 **Gradient Ascent** 를, 비민감 컨텍스트에는 **Gradient Descent** 를 적용하며, **KL divergence 기반 제약 조건** 을 활용하여 모델 유틸리티를 보존합니다.

## 주요 결과
**CODEERASER** 는 **Qwen2.5-Coder-7B** 모델에서 타겟 민감 기억을 **93.89%** 감소시키는 뛰어난 효과를 보였습니다. 동시에 모델의 원래 성능을 **99.00%** 유지했으며, 이는 **HumanEval** 벤치마크에서 기존 **GA (71.44%)** 및 **CU (85.83%)** 방식보다 높은 유틸리티 보존율을 달성한 결과입니다. 샘플당 평균 처리 시간은 **46.88초** 로 효율성도 입증되었습니다.

## AI 실무자를 위한 시사점
**CODEERASER** 는 **GDPR의 '잊힐 권리'** 와 같은 데이터 개인 정보 보호 요구 사항을 충족시키면서, CLM의 민감 데이터 유출 위험을 효과적으로 완화하는 **실용적인 솔루션** 을 제공합니다. 전체 재훈련 없이 특정 데이터를 선택적으로 제거할 수 있어, 배포된 CLM의 유지보수 비용을 크게 절감하고 **모델 유틸리티 저하 없이 보안을 강화** 하고자 하는 AI/ML 엔지니어에게 중요한 기술적 기반을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.