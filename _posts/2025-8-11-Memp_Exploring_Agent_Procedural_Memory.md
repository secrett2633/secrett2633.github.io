---
title: "[논문리뷰] Memp: Exploring Agent Procedural Memory"
excerpt: "Shuofei Qiao이 [arXiv]에 게시한 'Memp: Exploring Agent Procedural Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Procedural Memory
  - LLM Agents
  - Memory Management
  - Task Automation
  - Lifelong Learning
  - Experience Replay
  - Agent Learning

permalink: /ai/review/2025-8-11-Memp_Exploring_Agent_Procedural_Memory/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.06433)

**저자:** Runnan Fang, Yuan Liang, Xiaobin Wang, Jialong Wu, Shuofei Qiao, Pengjun Xie, Fei Huang, Huajun Chen, Ningyu Zhang



## 핵심 연구 목표
논문은 대규모 언어 모델(LLM) 기반 에이전트가 겪는 **취약한 절차적 메모리** 문제를 해결하고, 에이전트에게 **학습 가능하고 업데이트 가능한 평생 절차적 메모리**를 부여하는 것을 목표로 합니다. 이를 통해 에이전트의 **성공률을 높이고** 유사 작업에 대한 **실행 효율성**을 개선하고자 합니다.

## 핵심 방법론
본 연구는 **Memp**라는 프레임워크를 제안하며, 절차적 메모리를 **구축(Build), 검색(Retrieval), 업데이트(Update)** 세 가지 핵심 단계로 최적화합니다. 구축 단계에서는 과거 궤적을 **스크립트(Script)** 또는 **절차화(Proceduralization)** 형태로 증류하며, 검색은 **AveFact**와 같은 **키워드 기반 벡터 매칭**을 사용합니다. 업데이트는 **오류 수정 메커니즘**을 포함하는 **Adjustment** 전략을 통해 동적으로 이루어집니다.

## 주요 결과
**Memp**는 메모리가 없는 베이스라인을 모든 측면에서 능가했습니다. 특히 **절차화(Proceduralization)** 방법론은 **TravelPlanner** 데이터셋에서 **GPT-4o**의 **Common Sense** 점수를 **79.94%**로, **Hard Constraint** 점수를 **9.76%**로 높이며 최적의 성능을 달성했습니다. **Adjustment** 업데이트 전략은 보상에서 **+0.7점**의 이득과 **14단계**의 감소를 가져왔습니다. 또한, **GPT-4o**로 구축된 절차적 메모리를 **Qwen2.5-14B**로 이전했을 때, 작업 완료율이 **5%** 증가하고 평균 단계 수가 **1.6단계** 감소하는 등 뛰어난 전이성을 보였습니다.

## AI 실무자를 위한 시사점
LLM 기반 에이전트의 성능과 견고성을 향상시키려는 AI 실무자들에게 **동적이고 평생 지속되는 절차적 메모리 시스템**의 중요성을 강조합니다. 특히 **성공적인 경험의 추상화**와 **실패로부터의 메모리 조정**은 에이전트의 장기적인 학습 및 적응력에 필수적입니다. 이는 강력한 모델의 지식을 효율적으로 약한 모델로 이전하여 **자원 효율적인 에이전트 개발**을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.