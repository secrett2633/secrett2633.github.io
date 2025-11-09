---
title: "[논문리뷰] Multi-Step Knowledge Interaction Analysis via Rank-2 Subspace
  Disentanglement"
excerpt: "Isabelle Augenstein이 [arXiv]에 게시한 'Multi-Step Knowledge Interaction Analysis via Rank-2 Subspace
  Disentanglement' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - Knowledge Interaction
  - Parametric Knowledge
  - Contextual Knowledge
  - Subspace Disentanglement
  - NLE Generation
  - Hallucination Detection
  - Chain-of-Thought

permalink: /ai/review/2025-11-4-Multi-Step_Knowledge_Interaction_Analysis_via_Rank-2_Subspace_Disentanglement/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01706)

**저자:** Sekh Mainul Islam, Pepa Atanasova, Isabelle Augenstein



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 자연어 설명(NLEs)을 생성할 때 **내부의 매개변수 지식(Parametric Knowledge, PK)**과 **외부의 문맥 지식(Context Knowledge, CK)**을 어떻게 통합하고 상호작용하는지 다단계에 걸쳐 분석하는 것을 목표로 합니다. 기존 **rank-1 프로젝션 공간**이 다양한 지식 상호작용 시나리오를 포착하는 데 부적절하다는 한계를 극복하고자 합니다.

## 핵심 방법론
저자들은 PK와 CK의 기여를 보다 정확하게 분리하기 위해 새로운 **rank-2 프로젝션 서브스페이스**를 제안합니다. 이 서브스페이스는 **액티베이션 패칭(activation patching)** 기법을 활용하여 지식 통합에 중요한 모델의 특정 레이어를 식별하고, 각 NLE 생성 단계에서 **PK-CK 기여도**를 정량화합니다. 이를 통해 **환각(hallucination)** 발생 원인과 **Chain-of-Thought(CoT)** 프롬프트의 영향을 분석합니다.

## 주요 결과
**rank-1 프로젝션 공간**은 다양한 지식 상호작용을 포착하지 못했지만, 제안된 **rank-2 서브스페이스**는 **누적 설명 분산(cumulative explained variance) 1.0**에 도달하며 모든 상호작용 유형을 효과적으로 설명했습니다. 환각이 포함된 NLE는 **PK 방향**과 강하게 일치하는 반면, 문맥에 충실한 NLE는 PK와 CK 간의 균형을 유지했습니다. **CoT 프롬프트**는 생성된 NLE를 **CK 방향**으로 이동시키고 PK 의존도를 감소시키는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 내부의 **지식 통합 메커니즘**에 대한 심층적인 이해를 제공하여, AI/ML 엔지니어가 모델의 **문맥 접지(contextual grounding) 및 사실적 일관성**을 개선하는 데 기여할 수 있습니다. 특히, **rank-2 서브스페이스**는 환각 발생의 **내부 메커니즘을 감지**하는 신호로 활용될 수 있으며, NLE 생성 과정에서 PK-CK 균형을 조절하여 **모델의 해석 가능성**을 높이는 데 응용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.