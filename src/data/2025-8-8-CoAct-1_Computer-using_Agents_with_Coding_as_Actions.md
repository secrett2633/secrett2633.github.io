---
title: "[논문리뷰] CoAct-1: Computer-using Agents with Coding as Actions"
excerpt: "Taiwei Shi이 [arXiv]에 게시한 'CoAct-1: Computer-using Agents with Coding as Actions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agent
  - Multi-agent System
  - GUI Automation
  - Programmatic Control
  - Code Generation
  - OSWorld Benchmark
  - Hybrid AI

permalink: /ai/review/2025-8-8-CoAct-1_Computer-using_Agents_with_Coding_as_Actions/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03923)

**저자:** Linxin Song, Yutong Dai, Viraj Prabhu, Jieyu Zhang, Taiwei Shi, Li Li, Junnan Li, Silvio Savarese, Zeyuan Chen, Jieyu Zhao, Ran Xu, Caiming Xiong



## 핵심 연구 목표
이 논문은 복잡하고 장기적인 컴퓨터 사용 태스크에서 GUI(Graphical User Interface) 기반 자율 에이전트의 효율성과 신뢰성 문제를 해결하는 것을 목표로 합니다. 기존 GUI 전용 에이전트의 취약성과 비효율성을 극복하기 위해, **코딩을 강화된 액션으로 통합**하여 GUI 조작과 직접적인 프로그램 실행을 결합하는 하이브리드 접근 방식을 제안합니다.

## 핵심 방법론
본 연구는 **CoAct-1**이라는 새로운 멀티 에이전트 시스템을 소개하며, 이 시스템은 **Orchestrator, Programmer, GUI Operator**의 세 가지 전문 에이전트로 구성됩니다. **Orchestrator**는 사용자 목표를 분해하고 서브태스크의 성격에 따라 **Programmer** (Python 또는 Bash 스크립트 작성 및 실행) 또는 **GUI Operator** (시각 기반 GUI 조작)에게 동적으로 작업을 위임합니다. 각 에이전트는 자체 대화 기록을 메모리로 사용하며, 작업을 완료한 후 Orchestrator에 요약과 스크린샷을 제공합니다.

## 주요 결과
CoAct-1은 OSWorld 벤치마크에서 새로운 **최첨단 성공률 60.76%**를 달성하여, 이전 방법론인 **GTA-1 (45.20%)**를 크게 능가했습니다. 특히 OS-레벨 (79.16%), 다중 애플리케이션 (43.73%), Thunderbird 이메일 (80.00%)과 같이 프로그래밍 방식 제어가 유리한 카테고리에서 큰 성능 향상을 보였습니다. 또한, 태스크 당 평균 스텝 수를 **10.15**로 줄여 기존 GUI 에이전트 (GTA-1의 15 스텝)보다 효율성을 크게 개선했습니다.

## AI 실무자를 위한 시사점
이 연구는 **AI 에이전트에 코딩 능력을 통합**하는 것이 일반화된 컴퓨터 자동화를 위한 강력하고 효율적이며 확장 가능한 경로를 제공함을 입증합니다. 파일 관리나 데이터 처리와 같은 복잡한 백엔드 작업에서 GUI 조작 대신 **프로그래밍 방식의 자동화**를 통해 효율성과 견고성을 극대화할 수 있습니다. 이는 AI 엔지니어들이 더욱 지능적이고 유연한 자동화 시스템을 설계하는 데 중요한 통찰력을 제공하며, **다중 모달리티 에이전트 설계**의 가능성을 확장합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.