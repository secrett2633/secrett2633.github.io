---
title: "[논문리뷰] AgentVista: Evaluating Multimodal Agents in Ultra-Challenging Realistic Visual Scenarios"
excerpt: "arXiv에 게시된 'AgentVista: Evaluating Multimodal Agents in Ultra-Challenging Realistic Visual Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Agents
  - Visual Reasoning
  - Tool Use
  - Benchmark
  - Long-Horizon Tasks
  - Realistic Scenarios
  - Agentic Intelligence

permalink: /ai/review/2026-03-06-AgentVista-Evaluating-Multimodal-Agents-in-Ultra-Challenging-Realistic-Visual-Scenarios/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23166)

**저자:** Zhaochen Su, Jincheng Gao, Hangyu Guo, Zhenhua Liu, Lueyang Zhang, Xinyu Geng, Shijue Huang, Peng Xia, Guanyu Jiang, Cheng Wang, Yue Zhang, Yi R. (May) Fung, Junxian He



## 핵심 연구 목표
본 연구는 기존 멀티모달 벤치마크들이 단일 턴 시각 추론이나 특정 도구 사용 능력에 치우쳐 있어 현실성, 시각적 미묘함, 장기적인 도구 사용을 요구하는 실제 에이전트의 능력을 충분히 포착하지 못하는 문제를 해결하고자 합니다. 이를 위해 현실적이고 매우 도전적인 시각 시나리오에서 장기적인 도구 사용을 요구하는 **일반 멀티모달 에이전트** 를 평가하기 위한 새로운 벤치마크인 **AGENTVISTA** 를 제안합니다.

## 핵심 방법론
**AGENTVISTA** 는 25개 하위 도메인에 걸친 209개 태스크로 구성되며, 각 쿼리는 실제와 같은 상세한 시각적 상태(사진, 스크린샷, 기술 도면)에 기반을 둡니다. 에이전트는 **웹 검색** , **이미지 검색** , **페이지 탐색** , **코드 인터프리터** (이미지 처리 및 일반 프로그래밍) 등 하이브리드 도구를 사용하여 여러 양식에 걸쳐 장기적인 도구 상호작용을 수행합니다. 데이터셋은 **Agent-Centric Filtering** 및 **Two-Round Verification** 등 엄격한 품질 관리 파이프라인을 통해 구축되었습니다.

## 주요 결과
**AGENTVISTA** 는 현재 멀티모달 에이전트에게 매우 도전적이며, 최상위 모델인 **GEMINI-3-PRO with tools** 조차 **27.3%** 의 전체 정확도만을 달성했습니다. 태스크는 평균 **12.67번** 의 도구 호출을 요구하며, 하드 인스턴스는 25번 이상의 도구 호출이 필요한 경우가 있습니다. 오류 분석 결과, **시각적 오인식(visual misidentification)** 이 가장 지배적인 실패 모드였으며, **지식 환각(knowledge hallucination)** 이 두 번째로 흔한 오류 유형이었습니다.

## AI 실무자를 위한 시사점
**AGENTVISTA** 벤치마크는 현실적인 상황에서 멀티모달 에이전트가 직면하는 **시각적 기반 추론** 및 **장기적인 도구 사용** 의 핵심 병목 현상을 명확히 보여줍니다. 특히, **미세한 시각적 단서 인식** 및 **여러 도구 유형의 인터리브된 활용** 에 대한 모델의 약점을 강조하여, AI 개발자들이 보다 강력하고 신뢰성 있는 멀티모달 에이전트를 구축하기 위한 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.