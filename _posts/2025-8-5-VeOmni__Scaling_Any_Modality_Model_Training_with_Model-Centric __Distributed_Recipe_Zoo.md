---
title: "[논문리뷰] VeOmni: Scaling Any Modality Model Training with Model-Centric
  Distributed Recipe Zoo"
excerpt: "Bin Jia이 [arXiv]에 게시한 'VeOmni: Scaling Any Modality Model Training with Model-Centric
  Distributed Recipe Zoo' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Omni-Modal LLMs
  - Distributed Training
  - 3D Parallelism
  - Model-Centric
  - FSDP
  - Sequence Parallelism
  - Expert Parallelism
  - Scalability

permalink: /ai/review/2025-8-5-VeOmni__Scaling_Any_Modality_Model_Training_with_Model-Centric __Distributed_Recipe_Zoo/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02317)

**저자:** Qianli Ma, Yaowei Zheng, Zhelun Shi, Zhongkai Zhao, Bin Jia

**키워드:** `Omni-Modal LLMs`, `Distributed Training`, `3D Parallelism`, `Model-Centric`, `FSDP`, `Sequence Parallelism`, `Expert Parallelism`, `Scalability`

## 핵심 연구 목표
논문은 이기종 모델 아키텍처로 인해 대규모 훈련의 확장성과 엔지니어링 오버헤드가 큰 현재 옴니-모달 LLM(Large Language Models) 훈련의 어려움을 해결하고자 합니다. 기존 프레임워크가 모델 정의와 병렬 로직을 밀접하게 결합하여 발생하는 확장성 및 유연성 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
`VeOmni`는 통신과 계산을 분리하는 **모델-중심 분산 레시피(model-centric distributed recipes)**를 도입하여 옴니-모달 LLM에 효율적인 **3D 병렬처리**를 가능하게 합니다. 이는 **FSDP(Fully Sharded Data Parallelism)**, **SP(Sequence Parallelism)**, **EP(Expert Parallelism)**와 같은 병렬 전략의 유연한 조합을 지원하며, 새로운 모달리티의 통합을 최소한의 코드 변경으로 가능하게 하는 **경량 구성 인터페이스**를 제공합니다.

## 주요 결과
`VeOmni`는 뛰어난 효율성과 확장성을 입증했습니다. **30B 매개변수 MoE 옴니-모달 모델**을 **128 GPU**에서 **2,800 tokens/sec/GPU** 이상의 처리량으로 훈련할 수 있었으며, **160K 컨텍스트 길이**까지 확장 가능함을 보여주었습니다. 또한, **TorchTitan**과 같은 기존 프레임워크가 메모리 한계로 인해 지원하지 못하는 **72B Qwen2-VL 모델**의 **64K 컨텍스트 길이** 훈련을 성공적으로 수행하여 높은 메모리 효율성을 달성했습니다.

## AI 실무자를 위한 시사점
`VeOmni`는 이기종 아키텍처를 가진 옴니-모달 LLM 훈련의 복잡성을 크게 줄여, AI 실무자들이 모델 개발 및 배포에 집중할 수 있도록 돕습니다. **모델-중심 설계**와 **유연한 병렬처리** 지원은 새로운 모달리티의 통합과 모델 확장을 용이하게 하여, 차세대 멀티모달 AI 에이전트 개발을 가속화할 것입니다. 특히 **장문 컨텍스트**와 **MoE 모델** 훈련에 대한 최적화는 실제 적용 시 큰 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.