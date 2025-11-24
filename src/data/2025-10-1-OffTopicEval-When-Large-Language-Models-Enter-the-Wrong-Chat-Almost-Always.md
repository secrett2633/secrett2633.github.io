---
title: "[논문리뷰] OffTopicEval: When Large Language Models Enter the Wrong Chat, Almost
  Always!"
excerpt: "이 [arXiv]에 게시한 'OffTopicEval: When Large Language Models Enter the Wrong Chat, Almost
  Always!' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Operational Safety
  - Out-of-Domain (OOD)
  - Prompt Steering
  - Jailbreak Attacks
  - Evaluation Benchmark
  - Refusal Rate

permalink: /ai/review/2025-10-1-OffTopicEval-When-Large-Language-Models-Enter-the-Wrong-Chat-Almost-Always/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26495)

**저자:** Jingdi Lei, Varun Gumma, Rishabh Bhardwaj, Seok Min Lim, Chuan Li, Amir Zadeh, Soujanya Poria



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 **운영 안전성(operational safety)**이라는 중요한 측면을 다룹니다. 이는 LLM 기반 에이전트가 특정 목적에 맞춰 **인도메인(in-domain) 쿼리를 적절히 수락하고 아웃오브도메인(OOD) 쿼리를 거부**하는 능력을 의미합니다. 일반적인 유해성(harm) 평가를 넘어, 목적 지향적인 에이전트의 신뢰할 수 있는 배포를 위한 체계적인 평가 프레임워크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 LLM의 운영 안전성을 측정하기 위한 평가 스위트인 **OFFTOPICEVAL**을 제안합니다. 이 벤치마크는 **21개의 목적별 에이전트**를 구성하고, 영어, 중국어, 힌디어로 된 **220K개 이상의 샘플**을 사용하여 모델을 테스트합니다. 특히, **직접적인 OOD 쿼리**와 **적대적으로 변형된 적응형 OOD 쿼리**에 대한 거부율을 평가하며, **프롬프트 기반 조향(prompt-based steering)** 기법인 **Q-ground (쿼리 접지)** 및 **P-ground (시스템 프롬프트 접지)**를 통해 완화 전략을 모색합니다.

## 주요 결과
**20개 오픈소스 LLM**에 대한 평가 결과, 모든 모델이 높은 수준의 운영 불안전성을 보였으며, 가장 강력한 모델인 **Qwen-3 (235B)**(77.77%) 및 **Mistral (24B)**(79.96%)조차 신뢰할 수 있는 수준에 미치지 못했습니다. 모델은 직접적인 OOD 쿼리의 **12.24%**를 탐지하지 못했으며, 적응형 OOD 쿼리의 경우 이 실패율은 **70.72%**까지 급증했습니다. 완화 기법 중 **Q-ground**는 운영 안전성을 최대 **23%** 향상시켰고, **P-ground**는 **Llama-3.3 (70B)**에서 **41%**, **Qwen-3 (30B)**에서 **27%**라는 더 큰 개선을 이끌어냈습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 목적 기반 태스크에서 **인도메인 쿼리와 OOD 쿼리를 안정적으로 구별하지 못하는 중대한 취약점**을 드러냅니다. 특히 **적응형 적대적 공격**에 취약함을 보여주므로, LLM을 에이전트로 배포할 때 **운영 안전성을 최우선으로 고려**해야 합니다. **Q-ground** 및 **P-ground**와 같은 **가벼운 프롬프트 기반 조향 방법**은 인도메인 성능을 크게 저하시키지 않으면서 OOD 거부 견고성을 향상시키는 실용적이고 비용 효율적인 초기 해결책을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.