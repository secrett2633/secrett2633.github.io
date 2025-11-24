---
title: "[논문리뷰] Beyond One World: Benchmarking Super Heros in Role-Playing Across
  Multiversal Contexts"
excerpt: "이 [arXiv]에 게시한 'Beyond One World: Benchmarking Super Heros in Role-Playing Across
  Multiversal Contexts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Role-playing LLMs
  - Multiversal Consistency
  - Character Benchmarking
  - Moral Dilemmas
  - Canon Events
  - Reasoning-Acting Alignment
  - Chain-of-Thought
  - Superheroes

permalink: /ai/review/2025-10-17-Beyond-One-World-Benchmarking-Super-Heros-in-Role-Playing-Across-Multiversal-Contexts/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14351)

**저자:** Perapard Ngokpol, Kun Kerdthaisong, Pasin Buakhaw, Pitikorn Khlaisamniang, Supasate Vorathammathorn, Piyalitt Ittichaiwong, Nutchanon Yongsatianchot



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLMs)이 **버전별 캐릭터**, 특히 다양한 코믹 및 영화 세계관에 걸쳐 슈퍼히어로 역할을 얼마나 충실하고 일관성 있게 수행하는지 평가하는 것을 목표로 합니다. LLMs가 캐릭터의 고유한 지식, 가치관, 도덕적 코드를 유지하면서 다중 우주적 맥락에서 일관성을 보이는지 탐구하고자 합니다.

## 핵심 방법론
연구진은 **Beyond One World**라는 벤치마크를 제안하며, **30명의 아이코닉한 영웅**과 **90개의 캐논별 버전**을 포함합니다. 이 벤치마크는 **(i) Canon Events** (주요 삶의 단계에 대한 사실적 기억) 및 **(ii) Moral Dilemmas** (윤리적으로 복잡한 시나리오) 두 가지 태스크로 구성됩니다. 응답 평가는 **내부 숙고("thinking")**와 **외부 결정("acting")**을 분리하는 LLM-as-a-judge 방식(Sonnet 3.7)을 사용하며, **Think-Act Matching**이라는 지표로 추론과 행동 간의 정렬도를 측정합니다.

## 주요 결과
실험 결과, **Chain-of-Thought (CoT) 프롬프팅**은 약한 모델의 서사적 일관성을 개선하지만, 더 강한 모델에서는 **캐논적 정확도를 저하시킬 수 있음**이 나타났습니다. 또한, **캐릭터 내 버전 간 일반화**가 여전히 주요 장애물이며, 모델들은 **사고(thinking)**와 **행동(acting)** 중 한쪽에만 능숙하고 둘 다 잘하는 경우는 드물었습니다. 특히 **Sonnet3.5**는 교차 캐릭터 평가에서 **Dilemma Cross(0.69)**와 **Canon Cross(0.65)** 모두에서 가장 강력한 성능을 보였습니다.

## AI 실무자를 위한 시사점
현재 LLMs가 다중 우주적 일관성과 추론-행동 정렬에서 중요한 격차를 보이며, 특히 **버전별 캐릭터 묘사**에 한계가 있음을 시사합니다. AI 개발자들은 **신뢰할 수 있는 역할극 에이전트**를 위해 **'생각'과 '행동' 사이의 간극을 메우는 것**에 집중해야 합니다. 이 벤치마크는 복잡한 캐릭터 시뮬레이션에서 LLM의 다음 발전을 위한 도전적인 평가 기준을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.