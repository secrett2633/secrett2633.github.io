---
title: "[논문리뷰] WebGen-Agent: Enhancing Interactive Website Generation with Multi-Level
  Feedback and Step-Level Reinforcement Learning"
excerpt: "Zhuofan Zong이 [arXiv]에 게시한 'WebGen-Agent: Enhancing Interactive Website Generation with Multi-Level
  Feedback and Step-Level Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Website Generation
  - Code Agent
  - LLM
  - VLM
  - Reinforcement Learning
  - Multi-Level Feedback
  - GUI Agent
  - Step-GRPO

permalink: /ai/review/2025-9-29-WebGen-Agent-Enhancing-Interactive-Website-Generation-with-Multi-Level-Feedback-and-Step-Level-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22644)

**저자:** Zimu Lu, Houxing Ren, Yunqiao Yang, Ke Wang, Zhuofan Zong, Junting Pan, Mingjie Zhan, Hongsheng Li



## 핵심 연구 목표
본 논문은 웹사이트 코드 생성과 같이 시각적 요소와 사용자 상호작용 피드백이 중요한 태스크에서, 기존 코드 에이전트들이 단순한 코드 실행 피드백에만 의존하여 실제 웹사이트 품질을 제대로 반영하지 못하는 한계를 해결하고자 합니다. 이를 위해 포괄적인 다단계 피드백을 활용하여 웹사이트 코드베이스를 반복적으로 생성하고 개선하는 새로운 에이전트 시스템을 제안하는 것이 목표입니다.

## 핵심 방법론
제안하는 **WebGen-Agent** 는 **코드 생성, 코드 실행, 피드백 수집** 의 세 가지 액션으로 구성된 반복적인 다단계 패러다임을 따릅니다. **시각 언어 모델(VLM)** 을 활용하여 웹사이트 스크린샷에 대한 **설명, 외관 점수, 시각적 개선 제안** 을 제공하고, **GUI 에이전트** 가 기능적 요구사항을 평가하여 **GUI 에이전트 테스트 점수 및 기능 개선 제안** 을 생성합니다. 이러한 피드백은 **백트래킹 및 최적 스텝 선택 메커니즘** 과 통합되며, 특히 **Step-GRPO with Screenshot and GUI-agent Feedback** 을 도입하여 각 단계의 스크린샷 및 GUI 에이전트 점수를 보상으로 사용하여 LLM을 에이전트의 추론 엔진으로 훈련합니다.

## 주요 결과
**WebGen-Bench 데이터셋** 에서 **WebGen-Agent** 는 기존 최신 에이전트 시스템을 능가하는 성능을 보였습니다. 특히 **Claude-3.5-Sonnet** 의 정확도를 **26.4%에서 51.9%** 로, 외관 점수를 **3.0에서 3.9** 로 향상시켰습니다. 또한, **Step-GRPO 훈련 방법론** 은 **Qwen2.5-Coder-7B-Instruct** 의 정확도를 **38.9%에서 45.4%** 로, 외관 점수를 **3.4에서 3.7** 로 끌어올렸습니다. 피드백 VLM이 제공하는 스크린샷 점수의 정확도는 **93%에서 96%** 에 달하고, GUI 에이전트 점수의 정확도는 **89%에서 93%** 로 매우 신뢰할 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **다단계 시각 및 기능 피드백** 을 LLM 기반 코드 에이전트 워크플로우에 효과적으로 통합하여 웹사이트 생성과 같은 복잡한 도메인에서 모델의 실용성을 크게 높였습니다. **Step-GRPO** 와 같은 강화 학습 기법을 활용한 단계별 피드백 메커니즘은 AI 실무자들이 **작은 오픈 소스 LLM** 으로도 **고품질 웹 애플리케이션** 을 생성하고 미세 조정하는 데 중요한 방법을 제공합니다. 이는 개발 프로세스의 효율성을 높이고 사용자 요구사항에 더욱 잘 부합하는 결과물을 만들어내는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.