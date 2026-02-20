---
title: "[논문리뷰] 'What Are You Doing?': Effects of Intermediate Feedback from Agentic LLM In-Car Assistants During Multi-Step Processing"
excerpt: "[arXiv]에 게시된 ''What Are You Doing?': Effects of Intermediate Feedback from Agentic LLM In-Car Assistants During Multi-Step Processing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic LLM
  - In-Car Assistants
  - Human-AI Interaction
  - Feedback Mechanisms
  - User Experience
  - Multi-Step Tasks
  - Automotive AI
  - Speech Interfaces

permalink: /ai/review/2026-02-20-What-Are-You-Doing-Effects-of-Intermediate-Feedback-from-Agentic-LLM-In-Car-Assistants-During-Multi-Step-Processing/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15569)

**저자:** Johannes Kirmayr, Lukas Stappen, Raphael Wennmacher, Elisabeth André, Khanh Huynh, Florian Alt



## 핵심 연구 목표
본 논문은 **LLM 기반 에이전트 어시스턴트** 가 다단계 작업을 수행할 때 진행 상황과 추론을 어떻게 효과적으로 전달해야 하는지에 대한 문제를 다룹니다. 특히 운전과 같이 주의가 중요한 환경에서 과도한 정보와 부족한 정보 사이의 균형을 찾아 사용자 경험, 신뢰, 인지 부하에 미치는 영향을 평가하는 것이 연구의 주요 목적입니다.

## 핵심 방법론
연구는 자동차 시뮬레이션 환경에서 **N=45명** 의 참가자를 대상으로 **통제된 혼합-방법 연구** 로 진행되었습니다. 주요 독립 변수는 **피드백 타이밍** ( **No Intermediate (NI)** vs. **Planning & Results (PR)** ), **작업 시간** ( **중간/3단계** vs. **고급/6단계** ), 그리고 **상호작용 컨텍스트** ( **정지 상태/단일 작업** vs. **운전/이중 작업** )였습니다. 참가자들은 **ProtoPie 프로토타입** 을 통해 LLM 기반 음성 어시스턴트와 상호작용했으며, 인지된 속도, 작업 부하, 사용자 경험, 신뢰도를 측정하는 정량적 설문조사와 적응형 피드백 선호도를 탐색하는 반구조화된 인터뷰를 수행했습니다.

## 주요 결과
**중간 피드백 (PR)** 은 인지된 속도 ( **dz = 1.01** , p < .001), 사용자 경험 ( **dz = 0.54** , p = .002), 신뢰도 ( **dz = 0.38** , p = .042)를 유의미하게 향상시켰습니다. 놀랍게도 **작업 부하** 또한 **dz = -0.26** (p = .034)으로 감소했으며, 이는 주로 좌절감 하위 척도에서 기인했습니다. 정성적 분석 결과, 사용자들은 신뢰 구축을 위해 초기에는 **높은 투명성** 을 원하며, 신뢰가 쌓이면 **간결한 피드백** 으로 전환하지만, 새롭거나 모호하거나 중요한 작업에는 **즉시 투명성** 이 회복되기를 선호했습니다.

## AI 실무자를 위한 시사점
**에이전트 LLM 기반 시스템** 을 설계할 때, 특히 운전과 같이 주의가 필요한 다단계 작업에서는 **중간 진행 상황 피드백** 을 제공하는 것이 사용자 경험과 신뢰도 향상에 중요합니다. 시스템 초기에는 **높은 투명성** 을 통해 사용자 신뢰를 구축하고, 점진적으로 시스템이 신뢰를 얻으면 **간결한 피드백** 으로 전환하는 **적응형 전략** 을 고려해야 합니다. 또한, 모호하거나 고위험 작업에는 **투명성 수준을 즉시 높이는 메커니즘** 과 함께 **사용자에게 피드백 상세도를 조절할 수 있는 제어권** 을 제공하는 것이 실용적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.