---
title: "[논문리뷰] IterResearch: Rethinking Long-Horizon Agents via Markovian State   Reconstruction"
excerpt: "Haotian Xu이 arXiv에 게시한 'IterResearch: Rethinking Long-Horizon Agents via Markovian State   Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Agents
  - Markov Decision Process
  - Workspace Reconstruction
  - Reinforcement Learning
  - Context Management
  - Iterative Deep Research
  - LLM Agents
  - Efficiency-Aware Policy Optimization

permalink: /ai/review/2025-11-11-IterResearch-Rethinking-Long-Horizon-Agents-via-Markovian-State-Reconstruction/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07327)

**저자:** Haotian Xu, Donglei Yu, Zile Qiao, chenxz, GuoxinChen



## 핵심 연구 목표
이 논문은 기존 딥-리서치 에이전트들이 단일 확장 컨텍스트 창에 정보를 축적하는 `mono-contextual paradigm`으로 인해 발생하는 **컨텍스트 질식(context suffocation)** 및 **노이즈 오염(noise contamination)** 문제를 해결하는 것을 목표로 합니다. 장기(long-horizon) 태스크에서 에이전트의 지속적인 추론 능력을 유지하고 탐색 깊이에 관계없이 일관된 성능을 보장하는 새로운 패러다임을 제안하고자 합니다.

## 핵심 방법론
IterResearch는 장기 연구를 **전략적 작업 공간 재구성(strategic workspace reconstruction)** 을 포함하는 **마르코프 의사 결정 프로세스(Markov Decision Process, MDP)** 로 재구성합니다. 각 상태는 질문, 발전하는 보고서(메모리), 그리고 즉각적인 컨텍스트만을 포함하는 필수 요소들로 재구성되며, 이는 컨텍스트 팽창을 방지합니다. 또한, 효율적인 탐색을 장려하고 안정적인 분산 학습을 가능하게 하는 **효율성 인식 정책 최적화(Efficiency-Aware Policy Optimization, EAPO)** 라는 강화 학습 프레임워크를 개발하여, **기하학적 보상 할인(geometric reward discounting)** 과 **적응형 다운샘플링(adaptive downsampling)** 을 활용합니다.

## 주요 결과
IterResearch는 6가지 벤치마크에서 기존 오픈소스 에이전트들 대비 평균 **+14.5%p** 의 상당한 성능 향상을 달성했습니다. 특히, **2048회 상호작용** 까지 확장하여 **3.5%에서 42.5%** 로 드라마틱한 성능 향상을 보이며 전례 없는 상호작용 스케일링을 입증했습니다. 또한, 훈련 없이도 ReAct 대비 **최대 +19.2%p** 의 개선을 보여주는 **효과적인 프롬프트 전략** 으로 프론티어 모델의 장기 태스크 성능을 향상시킬 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
IterResearch는 기존 LLM 에이전트의 **컨텍스트 길이 제한** 을 극복하고 **장기 추론 능력** 을 획기적으로 향상시킬 수 있는 강력한 해결책을 제공합니다. 이는 복잡한 웹 탐색 및 심층 분석을 요구하는 실제 AI 애플리케이션에 특히 유용하며, **모델 독립적인 프롬프트 전략** 으로 기존의 강력한 모델에도 즉시 적용하여 성능을 높일 수 있습니다. 이 패러다임은 보다 **효율적이고 확장 가능한 AI 에이전트** 설계의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.