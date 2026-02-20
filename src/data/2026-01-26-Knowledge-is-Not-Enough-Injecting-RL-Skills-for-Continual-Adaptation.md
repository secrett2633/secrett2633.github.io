---
title: "[논문리뷰] Knowledge is Not Enough: Injecting RL Skills for Continual Adaptation"
excerpt: "arXiv에 게시된 'Knowledge is Not Enough: Injecting RL Skills for Continual Adaptation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - Continual Adaptation
  - Reinforcement Learning
  - Supervised Fine-Tuning
  - Skill Transfer
  - Task Arithmetic
  - Tool Use

permalink: /ai/review/2026-01-26-Knowledge-is-Not-Enough-Injecting-RL-Skills-for-Continual-Adaptation/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11258)

**저자:** Pingzhi Tang, Yiding Wang, Muhan Zhang



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 겪는 "지식 단절(knowledge cutoff)" 문제와, 지도 미세 조정(SFT)이 새로운 지식 통합 시 추론 능력 향상에 한계가 있으며, 강화 학습(RL)은 온라인 적응에 비실용적으로 비싼 비용 문제를 해결하는 것이 목표입니다. 지식 습득(SFT)과 기술 학습(RL) 간의 기능적 불일치를 해소하여 효율적이고 효과적인 지속적 적응을 위한 모듈화되고 전이 가능한 기술 주입 프레임워크를 제안합니다.

## 핵심 방법론
본 연구는 SFT(지식)와 RL(기술)에 의해 유도된 파라미터 업데이트가 파라미터 공간에서 **거의 직교하여** 분리된 부분 공간에 존재한다는 경험적 관찰에 기반합니다. 이를 활용하여 **Parametric Skill Transfer (PaST)** 프레임워크를 제안합니다. 이는 소스 도메인에서 SFT 모델(`θ_sft`)에서 RL 모델(`θ_rl_s`)을 빼서 **도메인 불가지론적 Skill Vector (`v_skill = θ_rl_s - θ_sft`)를 추출** 합니다. 이후 이 **Skill Vector** 를 새로운 타겟 데이터로 경량 SFT된 타겟 모델(`θ_t_sft`)에 **선형적으로 주입(`θ_final = θ_t_sft + λ · v_skill`)** 합니다.

## 주요 결과
**SQUAD 지식 통합 태스크** 에서 PaST는 **56.9%의 정확도** 를 달성하여 기존 최첨단 SEAL 베이스라인( **47.0%** )을 **9.9점** 크게 상회했습니다. **LooGLE 장문 맥락 QA 벤치마크** 에서는 **8.0점** 의 누적 정확도 향상을 보여주며 24k 토큰 이상의 대규모 문서 처리 능력을 입증했습니다. **ToolBench 교차 도메인 도구 사용 평가** 에서는 RL 학습에 사용되지 않은 카테고리에서 평균 **+10.3점** 의 제로샷 성공률 향상을 보였습니다.

## AI 실무자를 위한 시사점
SFT와 RL이 LLM 파라미터 공간에서 지식과 기술을 거의 직교하는 방식으로 학습한다는 중요한 통찰은 LLM의 지속적인 적응을 위한 **모듈화되고 효율적인 접근 방식** 을 가능하게 합니다. **PaST 프레임워크** 는 고비용의 RL 재학습 없이 새로운 지식에 대한 LLM의 추론 및 실행 능력을 크게 향상시켜, 실제 LLM 애플리케이션의 **온라인 적응 실용성을 높입니다** . 이는 특히 지식 기반 QA 및 도구 사용과 같은 복잡한 태스크에서 **skill vector의 교차 도메인 전이 가능성** 을 보여주어, 다양한 환경에 유연하게 대처하는 AI 에이전트 개발에 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.