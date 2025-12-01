---
title: "[논문리뷰] VisCoder2: Building Multi-Language Visualization Coding Agents"
excerpt: "이 [arXiv]에 게시한 'VisCoder2: Building Multi-Language Visualization Coding Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Language Visualization
  - Code Generation
  - Self-Debugging
  - Instruction Tuning
  - Large Language Models
  - Visualization Benchmark
  - Coding Agents
  - Code-Feedback

permalink: /ai/review/2025-10-29-VisCoder2-Building-Multi-Language-Visualization-Coding-Agents/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23642)

**저자:** Yuansheng Ni, Ping Nie, Kai Zou, Xiang Yue, Wenhu Chen



## 핵심 연구 목표
본 논문은 기존 시각화 코드 생성 연구의 한계, 즉 단일 언어 및 단일 라운드 생성에 대한 편향을 해결하고, **다국어 환경에서 신뢰성 있는 시각화 코드를 생성하며 스스로 오류를 수정** 할 수 있는 AI 에이전트 구축을 목표로 합니다. 실세계 데이터 분석 및 보고 워크플로우를 효과적으로 지원하는 범용 시각화 코딩 에이전트 개발을 위한 기반을 마련하고자 합니다.

## 핵심 방법론
연구진은 세 가지 주요 기여를 통해 목표를 달성했습니다. 첫째, **VisCode-Multi-679K** 데이터셋을 구축하여 **12개 프로그래밍 언어** 에 걸쳐 실행 가능한 시각화 코드와 **다중 턴 피드백 대화** 를 통합했습니다. 둘째, **VisPlotBench** 라는 벤치마크를 개발하여 **8개 언어** 에 대한 **888개 시각화 태스크** 를 제공하고, 초기 생성과 **다중 턴 self-debug** 를 평가하는 표준화된 프로토콜을 확립했습니다. 마지막으로, 이러한 리소스를 활용하여 **Qwen2.5-Coder-Instruct** 백본을 기반으로 **VisCoder2 모델** 을 학습했습니다.

## 주요 결과
**VisCoder2 모델** 은 모든 규모에서 기존 오픈소스 베이스라인을 일관되게 능가했습니다. 특히, **32B 스케일의 VisCoder2** 는 기본 모드에서 **73.1%** 의 실행 통과율을 달성했으며, **self-debugging** 을 통해 **82.4%** 까지 향상되어 **GPT-4.1** 과 동등한 수준의 실행 신뢰도를 보였습니다. **LilyPond** , **LaTeX** , **Asymptote** 와 같은 엄격한 문법을 가진 언어에서 **self-debugging** 의 효과가 두드러지게 나타났으며, **CoSyn-400K** 의 합성 데이터는 이러한 언어의 성능을 **60% 이상** 향상시키는 데 결정적인 역할을 했습니다.

## AI 실무자를 위한 시사점
본 연구는 AI 실무자가 **다국어 시각화 코드 생성** 및 **반복적 오류 수정** 이 가능한 에이전트를 개발하는 데 필요한 핵심 리소스를 제공합니다. **VisCode-Multi-679K** 데이터셋과 **VisPlotBench** 벤치마크는 실제 사용 사례를 반영하므로, 개발된 에이전트의 견고성과 실용성을 높이는 데 기여할 것입니다. 특히 **self-debug 기능** 은 **LaTeX** 나 **LilyPond** 처럼 컴파일러 의존적인 언어에서 발생하는 **구문 및 컴파일 오류** 를 효율적으로 해결하는 데 필수적이며, 이는 AI 개발자들이 보다 신뢰성 높은 시각화 보조 도구를 구축하는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.