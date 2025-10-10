---
title: "[논문리뷰] The Alignment Waltz: Jointly Training Agents to Collaborate for Safety"
excerpt: "이 [arXiv]에 게시한 'The Alignment Waltz: Jointly Training Agents to Collaborate for Safety' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Safety
  - Multi-agent Reinforcement Learning
  - Safety Alignment
  - Overrefusal
  - Adversarial Attacks
  - Feedback Agent
  - Conversation Agent
  - Dynamic Improvement Reward

permalink: /ai/review/2025-10-10-The_Alignment_Waltz_Jointly_Training_Agents_to_Collaborate_for_Safety/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08240)

**저자:** Jingyu Zhang, Haozhu Wang, Eric Michael Smith, Sid Wang, Amr Sharaf, Mahesh Pasupuleti, Benjamin Van Durme, Daniel Khashabi, Jason Weston, Hongyuan Zhan



## 핵심 연구 목표
대규모 언어 모델(LLM)이 유용하면서도 안전하게 작동하는 것 사이의 근본적인 긴장을 해소하는 것을 목표로 합니다. 특히, 적대적 공격에 취약하여 위험한 콘텐츠를 생성하거나, 양성이지만 민감한 프롬프트에 대해 과도하게 거절(overrefusal)하는 문제를 해결하고자 합니다. 기존의 단일 안전장치 모델이 과도한 거절을 악화시키는 한계를 극복하는 새로운 프레임워크를 제시합니다.

## 핵심 방법론
**WALTZRL**이라는 새로운 다중 에이전트 강화 학습(RL) 프레임워크를 제안하여, **대화 에이전트**와 **피드백 에이전트**를 협력적으로 훈련시킵니다. 피드백 에이전트는 대화 에이전트의 응답을 개선하는 유용한 제안을 제공하며, 핵심은 **동적 개선 보상(Dynamic Improvement Reward, DIR)**으로 대화 에이전트의 보상 개선 정도에 따라 피드백 에이전트를 보상합니다. 이 **2단계 RL 파이프라인**은 피드백을 적응적으로 적용하여 안전성과 유용성을 동시에 향상시킵니다.

## 주요 결과
**WildJailbreak** 데이터셋에서 안전 위반율을 39.0%에서 **4.6%**로, **OR-Bench** 데이터셋에서 과도한 거절율을 45.3%에서 **9.9%**로 크게 줄였습니다. 이는 기존의 단일 모델 RL 및 안전장치 기반 모델보다 우수한 성능이며, 모델의 일반적인 능력 저하 없이 안전성과 유용성 간의 **파레토 프론트**를 발전시켰음을 보여줍니다. 적응형 피드백 메커니즘은 피드백 트리거율(FTR)을 현저히 낮춰 효율성을 높입니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 안전성 강화 및 과도한 거절 감소를 위한 실용적이고 효과적인 다중 에이전트 접근법을 제공합니다. 특히, **적응형 피드백 메커니즘**은 필요한 경우에만 피드백 에이전트가 개입하므로, 일반적인 쿼리에 대한 지연 시간을 최소화하여 실제 서비스 배포에 유리합니다. 이는 안전하고 신뢰할 수 있는 AI 시스템을 구축하려는 AI/ML 엔지니어들에게 중요한 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.