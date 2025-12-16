---
title: "[논문리뷰] NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents"
excerpt: "chongyang09이 [arXiv]에 게시한 'NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Coding Agents
  - LLMs
  - Software Engineering
  - Repository Generation
  - Long-Horizon Reasoning
  - Benchmark
  - Python Development
  - Autonomous Systems

permalink: /ai/review/2025-12-16-NL2Repo-Bench-Towards-Long-Horizon-Repository-Generation-Evaluation-of-Coding-Agents/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.12730)

**저자:** Jingzhe Ding, Yue Hou, Chongyao Tao, et al.



## 핵심 연구 목표
이 논문은 기존 코딩 에이전트 벤치마크들이 완전한 소프트웨어 시스템을 구축하는 데 필요한 **장기적인 추론 능력** 을 엄격하게 평가하지 못하는 문제를 해결하고자 합니다. 주로 국지적인 코드 생성이나 단기 버그 수정에 초점을 맞추던 한계를 넘어, **자연어 요구사항 문서와 빈 작업 공간** 만으로 완전한 소프트웨어 저장소를 자율적으로 생성하는 에이전트의 능력을 평가하는 벤치마크, **NL2Repo-Bench** 를 제안합니다.

## 핵심 방법론
**NL2Repo-Bench** 는 에이전트가 아키텍처 설계, 종속성 관리, 다중 모듈 로직 구현을 자율적으로 수행하여 **완전히 설치 가능한 Python 라이브러리** 를 생성하도록 요구합니다. 평가는 실제 오픈소스 프로젝트의 공식 **pytest 스위트** 를 **제어된 Docker 환경** 에서 실행하는 **엄격한 실행 기반** 으로 이루어집니다. 벤치마크는 다양한 응용 도메인에서 온 **104개의 Python 라이브러리 태스크** 로 구성되어 있으며, 평균 입력 길이는 **약 18,800 토큰** 입니다.

## 주요 결과
실험 결과, 장기적인 저장소 생성은 여전히 대부분의 경우 해결되지 않은 과제임이 드러났습니다. 가장 강력한 에이전트조차 **평균 테스트 통과율이 40% 미만** 이며, 전체 저장소를 올바르게 완성하는 경우는 거의 없습니다( **Pass@1은 5개 저장소에 불과** ). **Claude-Sonnet-4.5** 는 **40.2%** 로 가장 높은 성능을 보였으나, **GPT-5** 는 조기 종료 경향으로 낮은 성능(21.7%)을 보였습니다. **1M+ 토큰** 의 대규모 컨텍스트 창이 성능에 유리하지만, 컨텍스트 크기만으로는 충분하지 않다는 것이 밝혀졌습니다.

## AI 실무자를 위한 시사점
현재 LLM 기반 코딩 에이전트들은 복잡하고 장기적인 소프트웨어 개발에 필요한 자율적인 역량이 아직 부족합니다. 향후 연구는 단순히 컨텍스트 창 크기를 늘리는 것을 넘어, **에이전트적 계획 수립** , **자체 수정 루프** , **안정적인 환경 관리** 와 같은 아키텍처 혁신에 집중해야 합니다. **NL2Repo-Bench** 는 다음 세대 자율 코딩 에이전트의 지속적인 역량을 측정하고 개발하는 데 필요한 엄격하고 검증 가능한 테스트베드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.