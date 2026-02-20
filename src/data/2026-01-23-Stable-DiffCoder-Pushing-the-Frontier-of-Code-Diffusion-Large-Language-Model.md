---
title: "[논문리뷰] Stable-DiffCoder: Pushing the Frontier of Code Diffusion Large Language Model"
excerpt: "arXiv에 게시된 'Stable-DiffCoder: Pushing the Frontier of Code Diffusion Large Language Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Diffusion Models
  - Large Language Models
  - Continual Pretraining
  - Code Generation
  - Code Editing
  - Masked Language Models
  - Code Reasoning

permalink: /ai/review/2026-01-23-Stable-DiffCoder-Pushing-the-Frontier-of-Code-Diffusion-Large-Language-Model/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15892)

**저자:** Chenghao Fan, Wen Heng, Bo Li, Sichen Liu, Yuxuan Song, Jing Su, Xiaoye Qu, Kai Shen, Wei Wei



## 핵심 연구 목표
본 연구는 기존 autoregressive (AR) 모델에 비해 성능이 뒤처지던 확산 기반 언어 모델(DLLM)이 코드 모델링 품질을 향상시킬 수 있는지 체계적으로 탐구합니다. 동일한 아키텍처, 데이터, 계산 예산 하에서 확산 기반 훈련의 추가적인 훈련 모드가 AR 훈련 단독보다 실제 모델 성능을 개선할 수 있음을 입증하는 것이 목표입니다.

## 핵심 방법론
연구팀은 기존 AR 모델인 **Seed-Coder** 의 아키텍처와 데이터, 훈련 파이프라인을 재사용하여 **Stable-DiffCoder** 를 개발했습니다. 효율적인 지식 학습과 안정적인 훈련을 위해, **블록 확산 방식의 연속 사전 훈련(CPT)** 단계를 도입하고, 맞춤형 **웜업(warmup) 훈련 프로세스** 와 **블록별 클리핑 노이즈 스케줄** 을 적용했습니다. 이 모델은 **1.3T 토큰** 을 사용하여 훈련되었으며, **블록 크기는 4** 로 설정되었습니다.

## 주요 결과
**Stable-DiffCoder-8B-Instruct** 는 **HumanEval+에서 86.6%** , **MBPP+에서 85.7%** 의 pass@1 정확도를 달성하며, 자사의 AR 기반 모델인 **Seed-Coder-8B-Instruct (HumanEval+ 84.8%, MBPP+ 85.2%)** 를 능가했습니다. 특히 **CanItEdit 벤치마크에서는 60.0%** 로 모든 비교 모델 중 가장 높은 성능을 보였으며, **MHPP에서는 42.4%** 를 기록하여 동급 모델 중 최고 성과를 달성했습니다. 이는 확산 기반 훈련이 AR 훈련만으로는 불가능했던 코드 모델링 품질 향상을 가져올 수 있음을 입증합니다.

## AI 실무자를 위한 시사점
**Stable-DiffCoder** 의 성공은 확산 기반 언어 모델이 적절한 커리큘럼과 훈련 설계를 갖춘다면 코드 이해 및 생성 품질에서 AR 모델을 능가할 수 있음을 보여줍니다. 특히, **블록 확산 연속 사전 훈련** 과 **웜업 스케줄** 은 훈련 안정성과 효율성을 크게 향상시키므로, AI 개발자들은 이를 활용하여 새로운 고성능 코드 LLM을 구축하고 저자원 프로그래밍 언어의 성능을 개선할 수 있습니다. **코드 편집** 및 **추론** 과 같은 구조화된 코드 모델링 작업에서 **any-order 모델링** 의 이점을 적극적으로 고려할 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.