---
title: "[논문리뷰] Visual Document Understanding and Question Answering: A Multi-Agent
  Collaboration Framework with Test-Time Scaling"
excerpt: "Ruolin Shen이 [arXiv]에 게시한 'Visual Document Understanding and Question Answering: A Multi-Agent
  Collaboration Framework with Test-Time Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Document Understanding
  - Visual Question Answering
  - Multi-Agent System
  - Test-Time Scaling
  - Self-Correction
  - Mixed Reward Modeling
  - Large Language Models

permalink: /ai/review/2025-8-8-Visual_Document_Understanding_and_Question_Answering_A_Multi-Agent_Collaboration_Framework_with_Test-Time_Scaling/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03404)

**저자:** Xinlei Yu, Zhangquan Chen, Yudong Zhang, Shilin Lu, Ruolin Shen, Jiangning Zhang, Xiaobin Hu, Yanwei Fu, Shuicheng Yan



## 핵심 연구 목표
본 연구는 기존 비전-언어 모델(VLMs)이 매개변수 규모에 제약이 있고, 견고한 자가 수정 능력이 부족하며, 긴 시각적 맥락과 복잡한 추론을 요구하는 문서 기반 태스크에서 저조한 성능을 보이는 문제를 해결하고자 합니다. 특히 소규모 매개변수 VLM의 잠재력을 최대한 발휘하고 협업 및 자가 수정 메커니즘을 통해 전반적인 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 시각적 문서 이해 및 질의응답을 위한 **MACT(Multi-Agent Collaboration framework with Test-Time scaling)**를 제안합니다. 이 프레임워크는 **기획 에이전트(Aplan)**, **실행 에이전트(Aexe)**, **판단 에이전트(Ajudg)**, **답변 에이전트(Aans)**의 네 가지 소규모 협업 에이전트로 구성됩니다. 특히, **판단 에이전트**는 정확성을 검증하고 오류 발생 시 이전 에이전트로 수정 작업을 리디렉션하는 새로운 전략을 사용하며, **에이전트별 능력**과 **전역적 협업**의 균형을 맞춘 **혼합 보상 모델링** 및 각 에이전트의 기능에 맞춘 **에이전트별 하이브리드 테스트-타임 스케일링**을 적용합니다.

## 주요 결과
MACT는 더 작은 매개변수 규모에도 불구하고 기존 모델 대비 우수한 성능을 입증했습니다. 특히 **MACT-MiMo-VL-Series-28B**는 평균 점수에서 기존 오픈소스 및 클로즈드소스 모델 대비 각각 **5.6% 및 5.9%의 상당한 성능 향상**을 달성했습니다. MACT의 세 가지 변형 모델은 15개 벤치마크 중 13개에서 평균 점수 상위 3위를 꾸준히 유지했으며, 긴 시각적 맥락 및 복잡한 추론을 포함하는 태스크에서 특히 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**다중 에이전트 프레임워크**는 복잡한 문서 이해 및 질의응답 태스크에서 VLM의 능력을 확장하는 유망한 방향을 제시합니다. **판단과 수정의 분리**를 통해 에이전트의 효율적인 자가 수정 능력을 구현할 수 있으며, 이는 실제 AI 시스템의 신뢰성을 높이는 데 기여합니다. 또한, **혼합 보상 모델링** 및 **에이전트별 테스트-타임 스케일링**은 제한된 컴퓨팅 자원을 가진 환경에서 모델 성능을 최적화하고, 소규모 모델이 대규모 모델에 필적하는 결과를 달성할 수 있도록 돕는 실용적인 전략이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.