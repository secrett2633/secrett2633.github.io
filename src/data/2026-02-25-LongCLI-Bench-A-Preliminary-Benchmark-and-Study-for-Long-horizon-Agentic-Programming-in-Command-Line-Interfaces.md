---
title: "[논문리뷰] LongCLI-Bench: A Preliminary Benchmark and Study for Long-horizon Agentic Programming in Command-Line Interfaces"
excerpt: "Chuanhao Li이 arXiv에 게시한 'LongCLI-Bench: A Preliminary Benchmark and Study for Long-horizon Agentic Programming in Command-Line Interfaces' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Programming
  - CLI
  - Benchmark
  - Long-horizon Tasks
  - Code Generation
  - LLM Evaluation
  - Human-Agent Collaboration
  - Software Engineering

permalink: /ai/review/2026-02-25-LongCLI-Bench-A-Preliminary-Benchmark-and-Study-for-Long-horizon-Agentic-Programming-in-Command-Line-Interfaces/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14337)

**저자:** Yukang Feng, Jianwen Sun, Zelai Yang, Jiaxin Ai, Chuanhao Li, Fanrui Zhang, Kang He, Rui Ma, Jifan Lin, Jie Sun, Yang Xiao, Sizhuo Zhou, Wenxiao Wu, Yiming Liu, Pengfei Liu, Yu Qiao, Shenglin Zhang, Kaipeng Zhang



## 핵심 연구 목표
본 논문은 기존 벤치마크의 한계(짧은 태스크 범위, 데이터 오염, 미흡한 평가 지표)를 극복하고, **명령줄 인터페이스(CLI) 환경** 에서 에이전트 기반 프로그래밍의 **장기적인 계획 및 실행 능력** 을 엄격하게 평가할 수 있는 종합 벤치마크인 **LongCLI-Bench** 를 제안하는 것을 목표로 합니다.

## 핵심 방법론
**LongCLI-Bench** 는 **20개** 의 실제 소프트웨어 엔지니어링 작업(새로운 프로젝트 생성, 기능 추가, 버그 수정, 리팩토링)으로 구성되며, **958개** 의 컴퓨터 과학 과제와 **50개** 의 실제 워크플로우에서 선별되었습니다. 평가는 새로운 요구사항 구현을 확인하는 **Fail→Pass (F2P)** 테스트와 기존 기능의 퇴보를 방지하는 **Pass→Pass (P2P)** 테스트의 **듀얼-셋 프로토콜** 을 사용하며, **단계별 점수(step-level scoring)** 를 통해 세분화된 진행 상황을 측정합니다. 상용 및 오픈소스 CLI 에이전트들을 대상으로 **자체 수정(self-correction)** 및 **인간-에이전트 협업(human-agent collaboration)** 시나리오도 분석했습니다.

## 주요 결과
실험 결과, 최첨단 에이전트들조차 **LongCLI-Bench** 에서 **20% 미만의 통과율** 을 보였으며, 최고 성능 모델인 **Claude-Opus-4.6** 은 **16.7%** 를 기록했습니다. 대부분의 태스크 실패는 초기 단계( **30% 미만 완료** )에 집중되었고, **P2P 통과율** 은 **70.0%~88.3%** 로 에이전트가 새로운 기능을 추가하며 기존 기능을 손상시키는 경향을 보였습니다. **인간-에이전트 협업(Plan & Interactive)** 은 **Claude Code** 에서 **61.7%의 통과율** 을 달성하며 자율 에이전트의 성능을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
현재 LLM 기반 에이전트들은 **장기적인 계획 및 실행 능력** 에서 심각한 한계를 보이며, 특히 복잡한 소프트웨어 엔지니어링 태스크에서 초기 단계의 전략적 실패가 두드러집니다. AI 실무자들은 단순히 자율성을 높이는 것보다는 **인간-에이전트 협업 워크플로우 개발** 에 중점을 두어 에이전트의 계획 및 실행 능력을 보완해야 합니다. 또한, **LongCLI-Bench** 와 같은 현실적이고 장기적인 벤치마크를 활용하여 에이전트의 실제 엔지니어링 역량을 평가하고 개선하는 데 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.