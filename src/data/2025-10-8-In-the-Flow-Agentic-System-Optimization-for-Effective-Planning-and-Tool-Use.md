---
title: "[논문리뷰] In-the-Flow Agentic System Optimization for Effective Planning and Tool
  Use"
excerpt: "이 [arXiv]에 게시한 'In-the-Flow Agentic System Optimization for Effective Planning and Tool
  Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Systems
  - Large Language Models (LLMs)
  - Tool Use
  - Reinforcement Learning (RL)
  - On-policy Optimization
  - Flow-based Group Refined Policy Optimization (Flow-GRPO)
  - Multi-turn Reasoning

permalink: /ai/review/2025-10-8-In-the-Flow-Agentic-System-Optimization-for-Effective-Planning-and-Tool-Use/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05592)

**저자:** Zhuofeng Li, Haoxiang Zhang, Seungju Han, Sheng Liu, Jianwen Xie, Yu Zhang, Yejin Choi, James Zou, Pan Lu



## 핵심 연구 목표
이 논문은 기존의 도구 증강 LLM 접근 방식이 긴 추론 과정과 다양한 도구 사용에서 확장성이 떨어지고 새로운 시나리오에 대한 일반화 능력이 약하다는 문제를 제기합니다. 또한, 기존 에이전트 시스템들이 주로 학습 없이 수작업 로직에 의존하거나 오프라인 학습으로 실시간 상호작용과 분리되어 작동하여, 희소한 보상과 동적 환경에서의 취약한 적응력을 보이는 한계를 해결하고자 합니다. 따라서 논문은 **실시간 다중 턴 루프 내에서 플래너를 직접 최적화** 하는 훈련 가능한 에이전트 프레임워크인 **AGENTFLOW** 를 제안하여, 적응적이고 장기적인 계획 및 강력한 도구 활용을 목표로 합니다.

## 핵심 방법론
AGENTFLOW는 **플래너, 실행자, 검증자, 생성자** 의 네 가지 전문화된 모듈로 구성되며, 공유되는 **진화하는 메모리** 와 도구 세트를 통해 반복적으로 상호작용합니다. 핵심적으로, 논문은 온-정책 학습을 위해 **Flow-based Group Refined Policy Optimization (Flow-GRPO)** 알고리즘을 도입합니다. Flow-GRPO는 다중 턴 최적화를 일련의 단일 턴 정책 업데이트로 변환하기 위해 **단일의 검증 가능한 궤적 수준 보상** 을 모든 턴에 브로드캐스팅하고, **그룹 정규화된 이점(advantages)** 을 사용하여 학습 안정성을 확보합니다. 모든 모듈은 **Qwen2.5-7B-Instruct** 백본 모델을 사용하며, 플래너만 Flow-GRPO를 통해 학습됩니다.

## 주요 결과
AGENTFLOW는 **7B 스케일 백본** 으로도 최상위 베이스라인과 더 큰 규모의 독점 모델인 **GPT-40 (~200B)** 을 일관되게 능가하는 성능을 보였습니다. 구체적으로, 검색 작업에서 **14.9%** , 에이전트 작업에서 **14.0%** , 수학적 추론에서 **14.5%** , 과학적 추론에서 **4.1%** 의 평균 정확도 향상을 달성했습니다. Flow-GRPO 튜닝은 계획 품질을 향상시키고 도구 호출의 신뢰성을 높여, **도구 호출 오류율을 최대 28.4% 감소** 시켰습니다. 또한, 모델 크기 및 허용된 턴 예산이 증가함에 따라 성능이 꾸준히 향상되는 **긍정적인 스케일링 경향** 을 보였습니다.

## AI 실무자를 위한 시사점
AGENTFLOW는 모놀리식 LLM의 한계를 극복하고, **모듈화된 에이전트 시스템** 이 **실시간 온-정책 학습** 을 통해 복잡한 장기 추론 및 도구 사용 문제를 효과적으로 해결할 수 있음을 보여줍니다. **Flow-GRPO** 는 스파스 보상 및 긴 추론 체인의 크레딧 할당 문제를 해결하는 효과적인 방법론으로, 실제 환경에서 에이전트를 훈련시키는 데 중요한 실용적 기술입니다. **7B-규모의 백본** 으로도 훨씬 큰 모델인 **GPT-40에 필적하거나 능가하는 성능** 을 달성함으로써, 컴퓨팅 자원이 제한적인 환경에서도 고성능 에이전트 시스템을 구축할 수 있는 효율적인 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.