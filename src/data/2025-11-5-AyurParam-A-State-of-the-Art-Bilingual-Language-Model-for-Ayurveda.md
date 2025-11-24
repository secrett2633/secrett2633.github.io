---
title: "[논문리뷰] AyurParam: A State-of-the-Art Bilingual Language Model for Ayurveda"
excerpt: "이 [arXiv]에 게시한 'AyurParam: A State-of-the-Art Bilingual Language Model for Ayurveda' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Ayurveda LLM
  - Domain Adaptation
  - Bilingual Language Model
  - Instruction Tuning
  - Medical AI
  - Knowledge-Grounded QA
  - Traditional Medicine

permalink: /ai/review/2025-11-5-AyurParam-A-State-of-the-Art-Bilingual-Language-Model-for-Ayurveda/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02374)

**저자:** Mohd Nauman, Sravan Gvm, Vijay Devane, Shyam Pawar, Viraj Thakur, Kundeshwar Pundalik, Piyush Sawarkar, Rohit Saluja, Maunendra Desarkar, Ganesh Ramakrishnan (BharatGen Team)



## 핵심 연구 목표
본 연구는 일반적인 대규모 언어 모델(LLM)이 아유르베다와 같이 깊은 문화적, 언어적, 전문 지식을 요구하는 특수 의학 도메인에서 일관되게 저조한 성능을 보이는 문제를 해결하고자 합니다. 이를 위해 아유르베다의 방대한 지식을 정확하게 해석하고 적용할 수 있는 도메인 전문 **이중 언어(영어 및 힌디어) LLM인 AyurParam-2.9B**를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**Param-1-2.9B-Instruct**를 기반 모델로 사용하여 광범위하고 전문적으로 큐레이션된 아유르베다 데이터셋으로 미세 조정했습니다. 이 데이터셋은 고품질의 주석 프로토콜을 사용하여 사실적 정확성과 지시적 명확성을 보장하는 상황 인식, 추론, 객관식 질문 및 답변(Q&A)을 영어와 힌디어로 통합하며, 총 약 **4.75M 지식 기반 Q&A 쌍**으로 구성됩니다. 훈련은 **NVIDIA H100 GPU 클러스터**에서 **3 에포크** 동안 **bfloat16 혼합 정밀도**로 수행되었습니다.

## 주요 결과
**AyurParam-2.9B**는 **BhashaBench-Ayur 벤치마크**에서 **39.97%**의 전반적인 정확도를 달성하여, 동급(1.5-3B 파라미터)의 모든 오픈소스 인스트럭션 튜닝 모델(예: **Llama-3.2-3B-Instruct 33.20%**)을 능가했습니다. 또한, **Gemma-2-27B-it(37.99%)**와 같은 훨씬 큰 모델들과 비교하여 경쟁력 있거나 우수한 성능을 보였으며, 특히 **객관식 질문(MCQ)**에서 **40.12%**의 최고 정확도를 기록했습니다. 다만, 힌디어 성능(38.04%)은 영어(41.12%)에 비해 다소 뒤처졌습니다.

## AI 실무자를 위한 시사점
**AyurParam**의 성공은 소규모 모델이라 할지라도 전문 지식 도메인을 위한 신뢰할 수 있고 문화적으로 적합한 AI를 제공하는 데 있어 **진정한 도메인 적응**과 **고품질 감독**의 중요성을 강조합니다. 이 모델은 아유르베다 교육, 연구 및 임상 지식 지원을 위한 실용적인 도구로서의 잠재력을 보여주며, 적절한 미세 조정을 통해 일반 LLM보다 훨씬 적은 파라미터로도 경쟁력 있는 성능을 달성할 수 있음을 시사합니다. 하지만 힌디어 성능 격차와 임상 검증의 필요성은 향후 연구를 위한 중요한 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.