---
title: "[논문리뷰] FlashAdventure: A Benchmark for GUI Agents Solving Full Story Arcs in
  Diverse Adventure Games"
excerpt: "Dongmin Park이 [arXiv]에 게시한 'FlashAdventure: A Benchmark for GUI Agents Solving Full Story Arcs in
  Diverse Adventure Games' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Adventure Games
  - Benchmark
  - Full Story Arc
  - Observation-Behavior Gap
  - LLMs
  - Automated Evaluation

permalink: /ai/review/2025-9-3-FlashAdventure-A-Benchmark-for-GUI-Agents-Solving-Full-Story-Arcs-in-Diverse-Adventure-Games/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01052)

**저자:** Jaewoo Ahn, Junseo Kim, Heeseung Yun, Jaehyeon Son, Dongmin Park, Jaewoong Cho, Gunhee Kim



## 핵심 연구 목표
기존 GUI 에이전트 벤치마크는 게임 다양성과 전체 스토리라인 완료 평가 기능이 부족하며, 에이전트가 이전에 관찰한 정보를 기억하고 활용하는 '관찰-행동 간극' 문제를 제대로 다루지 못했습니다. 본 연구는 **FlashAdventure** 벤치마크를 통해 이러한 한계를 해결하고, GUI 에이전트가 다양한 어드벤처 게임에서 **전체 스토리 아크**를 완료하며 장기적인 의존성을 관리하는 능력을 평가하고자 합니다.

## 핵심 방법론
본 연구는 **34개의 Flash 기반 어드벤처 게임**으로 구성된 **FlashAdventure** 벤치마크를 제안합니다. 에이전트 성능의 자동화된 평가를 위해, 게임 환경과 상호작용하여 마일스톤 완료를 검증하는 **CUA-as-a-Judge**라는 자동화된 게임플레이 평가자를 개발했습니다. 또한, 장기 단서 기억을 활용하여 순차적인 작업 계획 및 해결을 개선하는 에이전트 프레임워크 **COAST (Clue-Oriented Agent for Sequential Tasks)**를 도입했습니다.

## 주요 결과
기존 GUI 에이전트(예: **Claude-3.7-Sonnet Computer-Use**, **OpenAI CUA**)는 낮은 성공률(**0-5.88%**)과 마일스톤 완료율(**1.20-17.11%**)을 기록하며 전체 스토리 아크 완료에 크게 어려움을 겪었습니다. 반면, **COAST**는 단서 기억을 효과적으로 관리함으로써 관찰-행동 간극을 해소하고 마일스톤 완료율을 **19.89%**로 향상시켰습니다. 인간 플레이어는 평균 **251.1 스텝**의 관찰-행동 간극을 보이며 장기 기억과 추론의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
**FlashAdventure** 벤치마크는 현재 LLM 기반 GUI 에이전트가 복잡한 어드벤처 게임의 **전체 스토리 아크**를 해결하는 데 있어 **계획, 시각적 인식, 횡단적 사고 능력** 등에서 심각한 한계가 있음을 보여줍니다. **COAST** 프레임워크는 **장기 단서 기억**과 **계획 수립**이 에이전트의 문제 해결 능력을 크게 향상시킬 수 있음을 입증하며, 향후 AI 에이전트 개발 시 **고급 메모리 및 추론 모듈**의 통합 필요성을 강조합니다. **CUA-as-a-Judge**와 같은 **자동화된 평가 도구**는 다양한 GUI 환경에서 에이전트 성능을 신뢰성 있고 확장 가능하게 평가하는 데 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.