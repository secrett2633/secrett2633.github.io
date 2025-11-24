---
title: "[논문리뷰] Too Good to be Bad: On the Failure of LLMs to Role-Play Villains"
excerpt: "이 [arXiv]에 게시한 'Too Good to be Bad: On the Failure of LLMs to Role-Play Villains' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Role-playing
  - Safety Alignment
  - Villain
  - Persona Simulation
  - Moral Alignment
  - Benchmark
  - Character Fidelity

permalink: /ai/review/2025-11-10-Too-Good-to-be-Bad-On-the-Failure-of-LLMs-to-Role-Play-Villains/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04962)

**저자:** Zihao Yi*, Qingxuan Jiang*, Ruotian Ma*, Xingyu Chen, Qu Yang, Mengru Wang, Fanghua Ye, Ying Shen⁺, Zhaopeng Tu⁺, Xiaolong Li, and Linus



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 다양한 도덕적 스펙트럼, 특히 악역 캐릭터를 얼마나 설득력 있게 연기할 수 있는지 체계적으로 조사하는 것을 목표로 합니다. LLM의 안전 정렬(safety alignment)이 도덕적으로 모호하거나 악의적인 캐릭터를 사실적으로 묘사하는 능력과 근본적인 충돌을 일으킨다는 가설을 검증하고자 합니다.

## 핵심 방법론
연구팀은 **Moral RolePlay 벤치마크**를 도입하여 캐릭터의 도덕적 정렬에 따라 역할 수행 충실도를 측정했습니다. 이 벤치마크는 **도덕적 모범 (Level 1)**, **결함 있지만 선한 (Level 2)**, **이기주의자 (Level 3)**, **악당 (Level 4)**의 네 가지 도덕적 정렬 수준을 포함하며, 각 수준별로 200개의 캐릭터로 구성된 균형 잡힌 테스트 세트를 사용했습니다. **제로샷, 배우 프레임 프롬프팅 전략**을 사용하여 최신 LLM을 평가하고, **Character Fidelity 점수(1-5점)**를 통해 역할 수행의 일관성을 측정했습니다.

## 주요 결과
평가 결과, 캐릭터의 도덕성이 낮아질수록 LLM의 역할 수행 충실도가 **일관되고 단조롭게 감소**했습니다. 평균 충실도 점수는 **도덕적 모범(Level 1)의 3.21점에서 악당(Level 4)의 2.62점**으로 하락했습니다. 특히, **"기만적(Deceitful)" 및 "조작적(Manipulative)"과 같은 부정적인 특성**을 묘사하는 데 가장 큰 어려움을 겪었으며, 이러한 특성들은 **평균 3.41점**으로 가장 높은 성능 저하를 보였습니다. **일반적인 챗봇 능력(Arena 랭킹)**은 악역 역할 수행 능력 예측에 **부적절**했으며, 안전 정렬이 강한 모델이 악역 묘사에서 특히 저조한 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 현재의 안전 정렬 방식 때문에 **미묘한 악역 캐릭터를 생성하는 데 본질적인 한계**가 있음을 보여줍니다. AI 실무자들은 LLM의 일반적인 성능이 캐릭터 역할 수행과 같은 창의적이고 특화된 작업, 특히 복잡한 도덕적 특성을 가진 캐릭터 묘사에 직접적으로 연결되지 않음을 인지해야 합니다. 향후 **더욱 정교하고 맥락 인식적인 정렬 기술**을 개발하여 유해한 콘텐츠 생성 방지와 동시에 사실적인 허구적 악역 묘사 사이의 균형을 찾아야 할 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.