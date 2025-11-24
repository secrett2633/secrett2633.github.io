---
title: "[논문리뷰] UI-TARS-2 Technical Report: Advancing GUI Agent with Multi-Turn
  Reinforcement Learning"
excerpt: "Haoyang Zou이 [arXiv]에 게시한 'UI-TARS-2 Technical Report: Advancing GUI Agent with Multi-Turn
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - Multi-Turn RL
  - Reinforcement Learning
  - Data Flywheel
  - Agent Framework
  - Hybrid Environments
  - Parameter Interpolation

permalink: /ai/review/2025-9-3-UI-TARS-2-Technical-Report-Advancing-GUI-Agent-with-Multi-Turn-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02544)

**저자:** Haoyang Zou, zhwang4ai, JoeYing, jzfeng, MingComplex



## 핵심 연구 목표
본 연구는 **데이터 희소성, 확장 가능한 멀티-턴 강화 학습(RL), GUI 전용 작동의 한계, 환경 확장성 및 안정성**과 같은 자율 GUI 에이전트 개발의 주요 과제를 해결하는 것을 목표로 합니다. 궁극적으로 **UI-TARS-2**를 통해 GUI 에이전트의 상태를 발전시키고 실제 인터랙티브 시나리오에 대한 강력한 일반화를 달성하고자 합니다.

## 핵심 방법론
**UI-TARS-2**는 네 가지 핵심 기둥 위에서 구축되었습니다: **데이터 플라이휠(Data Flywheel)**을 통한 확장 가능한 데이터 생성, 비동기 롤아웃과 **PPO(Proximal Policy Optimization)** 강화를 포함한 **안정화된 멀티-턴 RL 프레임워크**, 파일 시스템 및 터미널을 통합하는 **하이브리드 GUI-중심 환경**, 그리고 **통합 샌드박스 플랫폼**을 활용합니다. 특히, 공유 SFT 초기화에서 훈련된 각 도메인별 에이전트의 파라미터를 통합하기 위해 **파라미터 보간법(Parameter Interpolation)**을 사용합니다.

## 주요 결과
**UI-TARS-2**는 GUI 벤치마크에서 **Online-Mind2Web 88.2%**, **OSWorld 47.5%**, **WindowsAgentArena 50.6%**, **AndroidWorld 73.3%**의 성능을 달성하여 기존 Claude 및 OpenAI 에이전트를 능가했습니다. 게임 환경에서는 **15개 게임 스위트에서 평균 59.8점**의 정규화된 점수를 기록했으며, **GUI-SDK**를 통합하여 **Terminal Bench 45.3%**, **SWE-Bench Verified 68.7%**와 같은 시스템 수준 작업에서도 성능이 크게 향상되었습니다. 또한, **W4A8 양자화(quantization)**를 통해 토큰 생성 속도를 **29.6에서 47 tokens/s**로, 평균 지연 시간을 **4.0에서 2.5초**로 단축했습니다.

## AI 실무자를 위한 시사점
**UI-TARS-2**는 **GUI agents**가 직면한 복합적인 문제를 해결하기 위한 포괄적인 프레임워크를 제공하여, AI/ML 엔지니어가 실세계 애플리케이션에서 복잡한 상호작용을 자동화할 수 있는 잠재력을 보여줍니다. **데이터 플라이휠** 및 **멀티-턴 RL 프레임워크**는 확장 가능한 학습과 지속적인 성능 개선을 위한 효과적인 방법론을 제시하며, **하이브리드 환경 통합**은 에이전트의 활용 범위를 넓히는 데 중요한 역할을 합니다. 또한, **파라미터 보간법**은 다양한 도메인별 지식을 효율적으로 결합하는 전략을 제공하며, **W4A8 양자화**는 실시간 배포를 위한 실용적인 최적화 기법으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.