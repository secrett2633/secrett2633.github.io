---
title: "[논문리뷰] Surfer 2: The Next Generation of Cross-Platform Computer Use Agents"
excerpt: "이 [arXiv]에 게시한 'Surfer 2: The Next Generation of Cross-Platform Computer Use Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agent
  - Cross-Platform
  - GUI Automation
  - Vision-Language Model
  - Hierarchical Architecture
  - Agent Orchestration
  - Visual Interaction

permalink: /ai/review/2025-10-31-Surfer_2_The_Next_Generation_of_Cross-Platform_Computer_Use_Agents/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19949)

**저자:** M. Andreux, M. Bakler, Y. Barbier, H. Benchekroun, E. Biré, A. Bonnet, R. Bordie, et al.



## 핵심 연구 목표
이 논문은 웹, 데스크톱, 모바일 환경 전반에 걸쳐 일반화하는 에이전트를 구축하는 문제를 해결하고자 합니다. 기존 시스템들이 환경별 인터페이스에 의존하여 플랫폼 간 배포가 제한되는 한계를 극복하고, **순수하게 시각적 관찰만을 기반**으로 작동하는 **통합된 계층적 아키텍처**를 통해 모든 환경에서 최첨단 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**Surfer 2**는 **Orchestrator** (고수준 플래너), **Navigator** (저수준 GUI 실행기), **Validator** (평가 모듈)의 세 가지 주요 구성 요소로 이루어진 통합된 계층적 아키텍처를 제시합니다. Orchestrator는 사용자 작업을 검증 가능한 목표로 분해하고 계획하며 Navigator에 위임하고, Navigator는 스크린샷 기반의 ReAct 루프를 따르며 **Holo1.5 모델**을 사용하여 픽셀 단위의 정확한 UI 요소 위치를 파악하여 작업을 실행합니다. Validator는 Navigator의 실행 결과와 제안된 답변을 평가하여 오류 전파를 제한하고 자체 수정을 촉진합니다.

## 주요 결과
**Surfer 2**는 웹, 데스크톱, 모바일 등 다양한 컴퓨터 사용 환경 벤치마크에서 최첨단 성능을 달성했습니다. **WebVoyager**에서 97.1%, **WebArena**에서 69.6% (pass@1), **OSWorld**에서 60.1% (Foundation E2E GUI), **AndroidWorld**에서 87.1%의 정확도를 기록했습니다. 특히, 여러 번의 시도를 통해 **Surfer 2**는 모든 벤치마크에서 인간의 성능을 능가했으며, 작업별 미세 조정 없이도 우수한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **체계적인 에이전트 오케스트레이션**이 기존 **기반 모델(Foundation Model)**의 기능을 크게 향상시켜, 미세 조정 없이도 범용적인 컴퓨터 제어 능력을 달성할 수 있음을 보여줍니다. **계층적 아키텍처**와 **디커플링된 계획 및 실행**, **자체 검증** 메커니즘은 복잡하고 장기적인 태스크에 대한 견고한 에이전트 개발에 필수적입니다. 하지만 현재의 **VLM(Vision Language Model)** 비용과 확률적 특성으로 인해 파레토 최적의 비용 효율성을 위해서는 차세대 VLM의 필요성도 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.