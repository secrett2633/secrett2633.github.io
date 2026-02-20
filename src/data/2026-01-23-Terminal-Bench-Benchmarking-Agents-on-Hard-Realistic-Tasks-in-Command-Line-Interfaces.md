---
title: "[논문리뷰] Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces"
excerpt: "Harsh Raj이 arXiv에 게시한 'Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - LLM Evaluation
  - Benchmarking
  - Command Line Interface
  - Software Engineering
  - Realistic Tasks
  - Error Analysis

permalink: /ai/review/2026-01-23-Terminal-Bench-Benchmarking-Agents-on-Hard-Realistic-Tasks-in-Command-Line-Interfaces/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11868)

**저자:** Harsh Raj, Boxuan Li, Nicholas Carlini, Alexander G. Shaw, Mike A. Merrill



## 핵심 연구 목표
본 논문은 기존 AI 에이전트 벤치마크가 실제 작업 시나리오를 충분히 반영하지 못하거나 최신 모델의 성능을 측정하기에 난이도가 부족하다는 문제점을 해결하고자 합니다. 이를 위해 **명령줄 인터페이스(CLI)** 환경에서 에이전트의 역량을 평가하는 **Terminal-Bench 2.0** 벤치마크를 제시하고, 어렵고 현실적인 장기 작업을 해결하는 에이전트의 능력을 측정하는 것을 목표로 합니다.

## 핵심 방법론
**Terminal-Bench 2.0** 은 실제 워크플로우에서 영감을 받은 **89개의 도전적인 작업** 으로 구성되며, 각 작업은 고유한 Docker 환경, 사람이 작성한 솔루션, 포괄적인 테스트를 포함합니다. 에이전트는 터미널 명령어를 실행하거나 사용자 정의 도구를 호출하여 환경을 탐색하고 작업을 완료합니다. 벤치마크의 품질을 보장하기 위해 자동화된 CI/LLM 검사, 전문가 검토, 그리고 **적대적 공격 에이전트** 를 통한 엄격한 검증 과정을 거쳤습니다. 또한, **LLM-as-judge (GPT-5)** 를 활용하여 에이전트의 실패 궤적과 명령어 수준의 오류를 분석했습니다.

## 주요 결과
최신 모델과 에이전트는 **Terminal-Bench 2.0** 에서 **65% 미만의 성공률** 을 기록했으며, 특히 소규모 모델은 약 15%에 그쳐 벤치마크의 높은 난이도를 입증했습니다. **GPT-5.2와 Codex CLI 조합** 이 63%의 가장 높은 해결률을 달성했습니다. 오류 분석 결과, **"Command not found"(24.1%)** 와 **"Others in Invocation"(35.1%)** 이 가장 흔한 실패 유형으로 나타났으며, 상호작용 횟수나 토큰 생성량과 성공률 사이에는 **유의미한 상관관계가 없음(r=-0.028, r=-0.170)** 이 밝혀졌습니다.

## AI 실무자를 위한 시사점
현재 AI 에이전트가 복잡하고 실제적인 터미널 기반 작업을 자율적으로 해결하는 데 **상당한 한계** 가 있음을 명확히 보여줍니다. 특히, 환경 탐색 및 정확한 명령어 실행 능력이 개선되어야 합니다. 모델 개발 시 단순히 출력량을 늘리거나 상호작용 횟수를 늘리는 것보다, **의사결정 품질** 과 **전략적 추론 능력** 을 향상시키는 데 집중해야 합니다. **Terminal-Bench 2.0** 는 AI 에이전트의 발전 과정을 측정하고, 현실적인 작업 시나리오에서의 **강점과 약점을 체계적으로 파악** 하는 데 필수적인 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.