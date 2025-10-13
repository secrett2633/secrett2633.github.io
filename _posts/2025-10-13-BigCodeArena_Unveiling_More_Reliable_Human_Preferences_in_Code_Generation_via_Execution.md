---
title: "[논문리뷰] BigCodeArena: Unveiling More Reliable Human Preferences in Code
  Generation via Execution"
excerpt: "Hange Liu이 [arXiv]에 게시한 'BigCodeArena: Unveiling More Reliable Human Preferences in Code
  Generation via Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Generation
  - Human Preference
  - LLM Evaluation
  - Execution Feedback
  - Benchmarking
  - Crowdsourcing
  - Software Engineering
  - Large Language Models

permalink: /ai/review/2025-10-13-BigCodeArena_Unveiling_More_Reliable_Human_Preferences_in_Code_Generation_via_Execution/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08697)

**저자:** Terry Yue Zhuo, Xiaolong Jin, Hange Liu, Ahsen Khaliq



## 핵심 연구 목표
코드 생성 대형 언어 모델(LLM)의 품질을 평가하는 기존 방법론의 한계를 해결하는 것이 이 연구의 핵심 목표입니다. 특히, 단순히 코드 스니펫을 읽거나 정적 분석에 의존하는 방식으로는 코드의 실제 기능성, 런타임 동작, 비기능적 속성을 정확히 판단하기 어렵다는 문제점을 지적합니다. 저자들은 **실행 기반 피드백**을 통해 인간 선호도 평가의 신뢰성과 강건성을 높이는 새로운 개방형 플랫폼을 제시하여 이 문제를 해결하고자 합니다.

## 핵심 방법론
이 연구는 **Chatbot Arena**를 확장한 새로운 개방형 인간 평가 플랫폼인 **BIGCODEARENA**를 소개합니다. 이 플랫폼은 LLM이 생성한 코드의 **실시간 컴파일 및 실행 환경**을 제공하며, 사용자는 **Gradio** 및 **E2B** 기반 샌드박스에서 생성된 코드의 **인터랙티브 UI**를 직접 확인하고, 디버깅하며, 편집할 수 있습니다. 5개월 동안 10개 언어(예: **Python**, **JavaScript**)와 8개 실행 환경(예: **React**, **PyGame**)에서 14,000개 이상의 크라우드소싱 대화 세션과 4,700개 이상의 인간 선호도 데이터를 수집했습니다. 이 데이터를 기반으로 **BIGCODEREWARD** (보상 모델과 인간 판단의 정렬 평가) 및 **AUTOCODEARENA** (LLM-as-a-Judge 기반 자동 **Elo 랭킹** 벤치마크)라는 두 가지 벤치마크를 구축했습니다.

## 주요 결과
평가 결과, 실행 결과(예: UI 스크린샷)가 제공될 때 LLM 평가자의 코드 생성 선호도 판단이 **상당히 더 신뢰성** 있음을 확인했습니다. **AUTOCODEARENA** 벤치마크에서는 **GPT-5**가 코드 생성 품질에서 전반적으로 선두를 달렸으며, **Claude-Sonnet-4**와 **Claude-Opus-4**가 그 뒤를 잇는다는 정량적 결과를 제시했습니다. 또한, 특정 언어(예: **Python**, **Java**) 및 환경(예: **React**, **Streamlit**)에서 **o3-mini** 및 **o1-mini**와 같은 모델들이 높은 승률을 보이며 일관된 성능을 나타냈습니다. 이는 모델마다 언어 및 프레임워크별로 강점과 약점이 다르다는 것을 시사합니다.

## AI 실무자를 위한 시사점
코드 생성 LLM을 평가할 때, 단순히 코드 스니펫을 읽는 것을 넘어 **실제 실행 결과를 확인하는 것이 필수적**이라는 점을 이 연구는 강력하게 시사합니다. **BIGCODEARENA**와 같은 **실행 기반 평가 플랫폼**은 LLM 개발 및 배포 시 **더욱 신뢰성 있는 품질 검증**을 위한 핵심 도구가 될 수 있습니다. AI 실무자는 벤치마크 결과를 활용하여 특정 프로그래밍 언어나 프레임워크에 특화된 모델의 강점을 이해하고, **특정 작업에 최적화된 LLM을 선택**하는 데 중요한 통찰력을 얻을 수 있습니다. 또한, 향후 LLM 에이전트가 웹 애플리케이션과 상호작용하며 테스트를 자율적으로 수행하는 방향으로 발전할 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.