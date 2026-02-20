---
title: "[논문리뷰] Controllable Memory Usage: Balancing Anchoring and Innovation in Long-Term Human-Agent Interaction"
excerpt: "Zhengkang Guo이 arXiv에 게시한 'Controllable Memory Usage: Balancing Anchoring and Innovation in Long-Term Human-Agent Interaction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Term Human-Agent Interaction
  - Controllable Memory
  - Memory Anchoring
  - Large Language Models (LLMs)
  - Personalization
  - Reinforcement Learning (RL)
  - Supervised Fine-Tuning (SFT)
  - Memory Dependence

permalink: /ai/review/2026-01-13-Controllable-Memory-Usage-Balancing-Anchoring-and-Innovation-in-Long-Term-Human-Agent-Interaction/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05107)

**저자:** Muzhao Tian, Zisu Huang, Xiaohua Wang, Jingwen Xu, Zhengkang Guo, Qi Qian, Yuanzhe Shen, Kaitao Song, Jiakang Yuan, Changze Lv, Xiaoqing Zheng



## 핵심 연구 목표
본 논문은 장기적인 인간-에이전트 상호작용에서 LLM 기반 에이전트가 겪는 **메모리 앵커링(Memory Anchoring)** 문제(과거 상호작용에 과도하게 갇히는 현상)와 메모리 활용 부족 문제를 해결하고자 합니다. 사용자가 에이전트의 메모리 의존도를 동적으로 제어하여, 과거 이력을 충실히 따르는 일관성과 새로운 아이디어를 제안하는 혁신 사이의 균형을 맞출 수 있는 메커니즘을 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 먼저 **메모리 의존도(MD-Score)** 를 1-5 척도로 정량화하는 **루브릭 기반 행동 지표** 를 도입했습니다. 이를 기반으로, 사용자의 **메모리 의존도 선호도** 를 암묵적으로 반영하는 **선호도-표시 질의(q_align)** 를 생성하는 **데이터 생성 파이프라인** 을 구축했습니다. 에이전트인 **SteeM** 은 이 선호도-정렬 데이터로 **지도 미세 조정(SFT)** 된 후, **GRPO 기반 강화 학습(RL)** 을 통해 최적화됩니다. RL은 **정렬 보상(R_align)** , **작업 보상(R_task)** , **일반 보상(R_general)** 을 통합한 복합 보상 함수를 사용합니다.

## 주요 결과
실험 결과, 기존 LLM(Qwen3-4B/8B, Gemini-2.5-Pro, GPT-5)은 낮은 의존도를 지시하는 프롬프트에도 불구하고 높은 메모리 의존도를 보이는 **메모리 앵커링** 현상을 보였습니다. 반면, **SteeM** 은 모든 시나리오와 태스크에서 **정렬 오류(d_align)** 를 **상당히 감소** 시켜(예: Qwen3-8B SFT+RL에서 평균 **1.19** 대 기본 모델 **1.57** ), 사용자가 지정한 메모리 의존도 선호도에 훨씬 더 잘 부합했습니다. 또한, **SteeM** 은 미학습 주제에서도 우수한 일반화 성능을 보였고, AlpacaEval에서 기본 모델과 **유사하거나 약간 더 높은 응답 품질** 을 유지하며 **메모리 마스킹 전략보다 우수함** 을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 에이전트의 **개인화 및 일관성 관리** 에 있어 메모리 사용량을 **사용자 의도에 따라 미세 조정** 할 수 있는 실용적인 방법을 제시합니다. AI 엔지니어는 **SteeM** 프레임워크를 활용하여 에이전트가 특정 상황에서 **창의적인 '새로운 아이디어' 모드** 로 작동하거나 **'고정된 이력' 모드** 로 전환되도록 제어하여, 사용자 경험을 크게 향상시킬 수 있습니다. 특히, **선호도-정렬 데이터 생성** 및 **SFT+RL 학습 패러다임** 은 복잡한 인간의 의도를 AI 모델에 효과적으로 주입하는 강력한 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.