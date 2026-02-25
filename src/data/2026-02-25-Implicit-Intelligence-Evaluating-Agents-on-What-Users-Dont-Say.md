---
title: "[논문리뷰] Implicit Intelligence -- Evaluating Agents on What Users Don't Say"
excerpt: "Marc Wetter이 [arXiv]에 게시한 'Implicit Intelligence -- Evaluating Agents on What Users Don't Say' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Implicit Intelligence
  - AI Agents
  - Agent-as-a-World
  - Contextual Reasoning
  - Safety
  - Privacy
  - Accessibility
  - LLM Evaluation

permalink: /ai/review/2026-02-25-Implicit-Intelligence-Evaluating-Agents-on-What-Users-Dont-Say/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20424)

**저자:** Ved Sirdeshmukh, Marc Wetter



## 핵심 연구 목표
AI 에이전트가 사용자의 **명시적 지시** 를 따르는 것을 넘어, **암묵적인 기대치와 요구사항** 을 추론하고 충족하는 능력을 평가하는 것을 목표로 합니다. 현실 세계의 요청은 본질적으로 불완전하게 명시되며, 기존 벤치마크들이 **명시적인 지시 수행** 에만 초점을 맞춰왔다는 한계를 극복하고자 합니다.

## 핵심 방법론
본 연구는 암묵적 지능을 평가하기 위한 프레임워크인 **Implicit Intelligence** 를 제안하며, 상호작용 가능한 세계를 시뮬레이션하는 **Agent-as-a-World (AaW)** 패러다임을 도입합니다. **AaW** 는 언어 모델을 범용 시뮬레이터로 활용하여 YAML 파일로 정의된 세계를 실행합니다. 평가 시나리오는 **암묵적 추론** , **재난 위험 회피** , **개인 정보 보호 및 보안** , **접근성** 의 네 가지 범주로 분류됩니다.

## 주요 결과
16개의 주요 모델과 오픈소스 모델을 205개 시나리오에 걸쳐 평가한 결과, **가장 성능이 좋은 모델인 GPT-5.2-pro도 시나리오 통과율(SPR)이 48.3%** 에 불과했습니다. 이는 리터럴한 지시 수행과 인간과 유사한 맥락적 추론 사이의 상당한 격차를 보여줍니다. 특히 **Catastrophic Risk** 및 **Privacy** 시나리오에서 모델 간 성능 차이가 두드러졌습니다.

## AI 실무자를 위한 시사점
이 연구는 AI 에이전트 개발의 다음 프론티어가 **더 정교한 도구 사용이나 긴 계획** 이 아닌, **암묵적 지능** 에 있음을 시사합니다. AI/ML 엔지니어는 에이전트가 **환경 탐색을 통해 숨겨진 제약을 발견** 하고, **불확실성을 명확히 하기 위한 질문** 을 할 수 있도록 모델을 설계해야 할 것입니다. 현재 모델들이 여전히 사용자 의도를 완전히 이해하는 데 큰 어려움을 겪고 있음을 인지하고, **안전성 및 개인 정보 보호** 와 같은 암묵적 요구사항을 시스템 설계 초기에 고려하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.