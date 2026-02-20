---
title: "[논문리뷰] Free(): Learning to Forget in Malloc-Only Reasoning Models"
excerpt: "arXiv에 게시된 'Free(): Learning to Forget in Malloc-Only Reasoning Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reasoning Models
  - Context Management
  - Memory Pruning
  - LoRA Adapter
  - Long-Horizon Reasoning
  - Self-Forgetting

permalink: /ai/review/2026-02-12-Free-Learning-to-Forget-in-Malloc-Only-Reasoning-Models/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08030)

**저자:** Yilun Zheng, Dongyang Ma, Tian Liang, Jiahao Xu, Xinting Huang, Lihui Chen, Haitao Mi, Yan Wang



## 핵심 연구 목표
추론 모델이 과도한 "사고 토큰"을 축적할 때 성능이 저하되는 문제, 즉 기존 LLM이 쓸모없는 정보를 제거하는 메커니즘 없이 컨텍스트를 지속적으로 쌓아가는 "malloc-only" 아키텍처의 근본적인 결함을 해결하고자 합니다. 이를 통해 장기 추론 태스크에서 발생하는 성능 붕괴를 막고 지속 가능한 추론을 가능하게 하는 것이 목표입니다.

## 핵심 방법론
본 연구는 플러그 앤 플레이 방식의 **LoRA 어댑터** 인 **Free-Module** 을 도입하여 **Free()LM** 모델을 제안합니다. 이 모델은 추론과 클리닝 모드를 반복하며 동적으로 작동하며, 클리닝 모드에서는 **Free-Module** 이 메인 모델에 병합되어 컨텍스트를 스캔하고 중복되거나 관련 없는 부분을 **JSON 형식의 prefix/suffix 앵커 명령** 으로 식별하여 제거합니다. 훈련은 **Gemini-2.5-Pro** 를 활용한 데이터 합성 및 엄격한 보상 메커니즘을 통해 이루어집니다.

## 주요 결과
**Free()LM** 은 8B에서 685B에 이르는 모든 모델 규모에서 일관된 성능 향상을 보이며, 최고 수준의 추론 모델 대비 **평균 3.3% 정확도 향상** 을 달성했습니다. 특히, **DeepSeek V3.2-Speciale** 를 사용하여 **IMOanswerBench** 에서 **새로운 SOTA** 를 수립했으며 **2.3%의 정확도 향상** 을 기록했습니다. 표준 **Qwen3-235B-A22B** 모델이 완전 붕괴(0% 정확도)되는 80k 토큰 이상의 장기 추론 태스크에서 **성능을 약 50%까지 회복** 시키고, KV 캐시 사용량을 **45% (6.14GB → 3.34GB) 감소** 시켰습니다.

## AI 실무자를 위한 시사점
LLM의 "malloc-only" 패러다임이 장기 추론에 부적합함을 명확히 보여주며, **능동적인 컨텍스트 관리 및 메모리 가지치기** 가 필수적임을 시사합니다. **Free-Module** 은 기존 LLM에 효율적인 자가 망각 기능을 **플러그 앤 플레이 방식** 으로 통합할 수 있는 실용적인 솔루션을 제공합니다. 이는 복잡한 추론 태스크에서 **정확도 향상** 및 **메모리 효율성 증대** 라는 이점을 제공하며, **범용적인 컨텍스트 가지치기 서비스** 로서 다양한 아키텍처에 적용될 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.