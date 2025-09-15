---
title: "[논문리뷰] The Illusion of Diminishing Returns: Measuring Long Horizon Execution in
  LLMs"
excerpt: "Jonas Geiping이 [arXiv]에 게시한 'The Illusion of Diminishing Returns: Measuring Long Horizon Execution in
  LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Long-Horizon Tasks
  - Execution Capability
  - Scaling Laws
  - Self-Conditioning
  - Thinking Models
  - Agentic AI

permalink: /ai/review/2025-9-15-The_Illusion_of_Diminishing_Returns_Measuring_Long_Horizon_Execution_in_LLMs/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09677)

**저자:** Akshit Sinha, Arvindh Arun, Shashwat Goel, Steffen Staab, Jonas Geiping



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 지속적인 스케일링이 한계 효용 체감(diminishing returns)으로 이어지는지에 대한 논쟁을 다루며, 특히 **장기적인 태스크(long-horizon tasks)** 수행 능력에 초점을 맞춥니다. 연구는 단일 단계의 정확도 향상이 장기 태스크 완료 길이의 **기하급수적인 개선**으로 이어질 수 있음을 보이고, LLM의 장기 태스크 실패가 추론 능력 부족보다는 **실행 능력의 오류**에서 기인함을 주장합니다.

## 핵심 방법론
연구진은 LLM의 실행 능력을 격리하기 위해 **지식과 계획이 명시적으로 제공**되는 **통제된 키-값 딕셔너리 덧셈 태스크**를 설계했습니다. 모델의 과거 오류에 대한 **자기 조건화 효과(self-conditioning effect)**를 분석하기 위해 **오류 주입 컨텍스트**를 활용한 역대사실적(counterfactual) 실험을 수행했습니다. 또한, **Qwen3, Gemma3, GPT-5, Claude-4 Sonnet** 등 다양한 **프론티어 모델**과 **'사고 모델(thinking models)'**의 성능을 비교했습니다.

## 주요 결과
단일 단계 정확도의 미미한 향상이 태스크 길이에서 **기하급수적인 이득**을 가져오는 것을 확인했습니다. **모델 크기 스케일링**은 작은 모델이 100% 단일 턴 정확도를 가질 때조차도 LLM이 훨씬 더 많은 턴을 정확하게 실행하도록 합니다. LLM은 **자기 조건화 효과**를 보여, 컨텍스트에 과거 오류가 포함될수록 오류를 범할 가능성이 높아지며, 이는 모델 크기 스케일링으로 완화되지 않았습니다. 대조적으로, **'사고 모델' (예: GPT-5 'Horizon')**은 자기 조건화 효과를 해결하며 **1000개 이상의 스텝**을 단일 턴에 실행하여 다른 프론티어 모델(예: Claude-4 Sonnet의 432 스텝)을 크게 앞섰습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 **장기적인 태스크 실행 능력**이 모델의 경제적 가치를 결정하는 핵심 요소임을 강조하며, 지속적인 스케일링 투자의 중요성을 뒷받침합니다. AI 에이전트 개발 시, LLM의 **실행 단계에서의 오류**를 줄이는 데 집중해야 하며, 특히 **자기 조건화 효과**를 완화하기 위한 **'사고 모델' 구현** 및 **능동적인 컨텍스트 관리 전략**이 중요합니다. 병렬 테스트 시간 연산(majority voting)보다는 **순차적인 '사고' 과정**이 장기 태스크에서 더 효과적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.