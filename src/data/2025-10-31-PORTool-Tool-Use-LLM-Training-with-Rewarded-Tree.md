---
title: "[논문리뷰] PORTool: Tool-Use LLM Training with Rewarded Tree"
excerpt: "이 [arXiv]에 게시한 'PORTool: Tool-Use LLM Training with Rewarded Tree' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tool-Use LLM
  - Reinforcement Learning (RL)
  - Policy Optimization
  - Rewarded Tree
  - Trajectory Optimization
  - Agentic System
  - Dynamic Tool Call

permalink: /ai/review/2025-10-31-PORTool-Tool-Use-LLM-Training-with-Rewarded-Tree/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26020)

**저자:** Feijie Wu¹, Weiwu Zhu², Yuxiang Zhang², Soumya Chatterjee², Jiarong Zhu², Fan Mo², Rodin Luo², Jing Gao¹
¹Purdue University, ² Apple



## 핵심 연구 목표
기존 도구 사용 LLM이 정적 데이터셋에 의존하여 동적이고 실제적인 도구 호출 환경에서 탐색 능력이 제한되고 낮은 성능을 보이는 문제를 해결합니다. 본 연구는 LLM이 **정확한 답변을 도출하는 다양한 궤적을 탐색** 하도록 장려하는 **강화 학습(RL) 방법론** 인 PORTool을 제안하여, 복잡한 다단계 도구 사용 작업에서 LLM의 추론 및 행동 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
PORTool은 **트리 롤아웃(tree rollout)** 전략을 통해 주어진 쿼리에 대한 여러 도구 호출 궤적을 생성하고 이를 **트리 구조** 로 구성합니다. 각 단계에 최종 답변의 정확성(outcome reward)과 포맷 준수 여부(formatting reward)를 고려한 **단계별 보상(step-wise reward)** 이 할당되며, 이 보상은 **감쇠 계수 γ** 와 **가중치 계수 w1, w2** 를 통해 **궤적별 및 포크별 이점(advantages)** 과 결합되어 LLM을 훈련합니다. **GPT-40** 으로 궤적의 정확성을 평가하고, 이러한 **단계별 기여도 정량화** 를 통해 모델이 더 효과적인 도구 호출 단계를 생성하도록 유도합니다.

## 주요 결과
PORTool은 **Qwen-2.5-7B-Instruct** 기반 모델에서 **정확도(Accuracy) 64.07%** 를 달성하여 기존 GRPO 대비 **5%** 향상되었고, **Unanswerable Rate는 12.77%** 로 **8%** 감소시켰으며, 평균 도구 호출 단계 수는 **3.22** 로 **11%** 줄였습니다. 특히 **감쇠 계수 γ=0.95** 에서 최적의 성능을 보였고, **Qwen-3-1.7B** 모델에서도 강력한 성능 향상과 함께 **최고 포맷팅 보상(0.784)** 을 기록하여 방법론의 견고함을 입증했습니다.

## AI 실무자를 위한 시사점
PORTool은 **실시간 데이터** 와 **다양한 외부 도구(17개 이상)** 를 활용하는 LLM 기반 에이전트 시스템 개발에 실용적인 돌파구를 제공합니다. **트리 구조의 보상 할당** 과 **단계별 기여도 정량화** 는 LLM의 **복잡한 다단계 추론 과정에서의 오류 수정 능력** 을 크게 향상시키며, 더욱 **효율적이고 정확한 도구 호출 궤적** 을 생성하는 데 기여할 수 있습니다. 이는 실제 AI 서비스에서 LLM 에이전트의 **견고성과 신뢰성** 을 높이는 데 중요한 인사이트를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.