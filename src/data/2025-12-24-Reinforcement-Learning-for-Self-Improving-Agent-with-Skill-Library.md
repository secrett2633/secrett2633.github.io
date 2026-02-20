---
title: "[논문리뷰] Reinforcement Learning for Self-Improving Agent with Skill Library"
excerpt: "Soumya Smruti Mishra이 arXiv에 게시한 'Reinforcement Learning for Self-Improving Agent with Skill Library' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - LLM Agents
  - Skill Library
  - Self-Improvement
  - Sequential Rollout
  - AppWorld dataset
  - GRPO

permalink: /ai/review/2025-12-24-Reinforcement-Learning-for-Self-Improving-Agent-with-Skill-Library/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17102)

**저자:** Jiongxiao Wang, Qiaojing Yan, Yawei Wang, Yijun Tian, Soumya Smruti Mishra, Zhichao Xu, Megha Gandhi, Panpan Xu, Lin Lee Cheong



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 에이전트가 복잡한 환경에서 지속적으로 자체 개선하고 적응하는 데 어려움을 겪는 문제를 해결합니다. 특히, 기존의 LLM 프롬프트 기반 스킬 라이브러리 구현 방식의 한계를 극복하고 **강화 학습(RL) 기반 접근 방식** 을 통해 스킬 라이브러리를 활용한 에이전트의 자기 개선 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
연구진은 스킬을 학습에 체계적으로 통합하는 새로운 RL 프레임워크인 **Skill Augmented GRPO for self-Evolution (SAGE)** 를 제안합니다. 이 프레임워크의 핵심 요소는 **Sequential Rollout** 으로, 에이전트가 유사한 태스크 체인을 반복적으로 수행하며 이전 태스크에서 생성된 스킬을 라이브러리에 축적하고 후속 태스크에 활용할 수 있게 합니다. 또한, **Skill-integrated Reward** 를 도입하여 검증 가능한 결과 기반 보상과 고품질 스킬 생성 및 활용에 대한 추가 보상을 결합합니다. 초기에는 **Claude 3.5 Sonnet V2** 와 같은 고급 LLM이 생성한 전문가 경험 데이터를 사용하여 **Qwen2.5-32B-Instruct** 모델에 **지도 미세 조정(SFT)** 을 적용합니다.

## 주요 결과
**AppWorld Test Normal** 데이터셋에서 **SAGE** 는 **72.0%의 Task Goal Completion (TGC)** 과 **60.7%의 Scenario Goal Completion (SGC)** 을 달성하며 기존 **GRPO** baseline 대비 **8.9% 높은 SGC** 를 보였습니다. 또한, **GRPO** baseline보다 **26% 적은 상호작용 단계** (12.1 대 16.4)와 **59% 적은 토큰 생성** (1,475 대 3,613)을 기록하며 효율성 측면에서도 크게 우수했습니다. 스킬 활용 분석 결과, **SAGE** 는 학습된 스킬 사용 시 **2배 이상의 성공률** 을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **강화 학습** 을 통해 LLM 에이전트의 **스킬 라이브러리** 활용 능력을 혁신적으로 개선할 수 있음을 입증합니다. **Sequential Rollout** 및 **Skill-integrated Reward** 와 같은 기법은 복잡한 다중 턴 환경에서 에이전트의 성능과 효율성을 동시에 향상시키는 데 중요한 통찰력을 제공합니다. 실무자들은 **SFT** 를 통한 초기 모델 정교화와 **RL** 을 활용한 지속적인 자기 개선 전략을 결합하여, **AppWorld** 와 같이 API 호출 및 코드 생성을 요구하는 실제 애플리케이션 시나리오에서 더욱 강력하고 적응력 있는 에이전트를 개발하는 데 영감을 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.