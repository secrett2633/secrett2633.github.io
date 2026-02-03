---
title: "[논문리뷰] FS-Researcher: Test-Time Scaling for Long-Horizon Research Tasks with File-System-Based Agents"
excerpt: "이 [arXiv]에 게시한 'FS-Researcher: Test-Time Scaling for Long-Horizon Research Tasks with File-System-Based Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Deep Research
  - Long-Horizon Tasks
  - Test-Time Scaling
  - File System
  - Persistent Workspace
  - Knowledge Base
  - Dual-Agent Framework

permalink: /ai/review/2026-02-03-FS-Researcher-Test-Time-Scaling-for-Long-Horizon-Research-Tasks-with-File-System-Based-Agents/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01566)

**저자:** Chiwei Zhu, Benfeng Xu, Mingxuan Du, Shaohan Wang, Xiaorui Wang, Zhendong Mao, Yongdong Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 에이전트가 긴 호라이즌의 심층 연구 작업을 수행할 때 발생하는 컨텍스트 창 제한 문제를 해결하고자 합니다. 이는 토큰 예산을 압축하고 효과적인 테스트 시간 스케일링을 방해하여 보고서의 불완전한 커버리지와 낮은 품질을 초래합니다. 연구의 목표는 영구적인 작업 공간을 통해 컨텍스트 창의 한계를 넘어 심층 연구를 확장하고, 반복적인 개선을 가능하게 하는 프레임워크를 제안하는 것입니다.

## 핵심 방법론
**FS-Researcher** 는 파일 시스템 기반의 **듀얼 에이전트 프레임워크** 로, 연구 작업을 두 단계로 나눕니다. 첫 번째 에이전트인 **Context Builder** 는 사서 역할을 하며 인터넷을 탐색( **search_web** , **read_webpage** ), 구조화된 노트를 작성하고 원본 소스를 **계층적 지식 베이스(KB)** 에 아카이브합니다. 두 번째 에이전트인 **Report Writer** 는 이 KB를 사실의 유일한 출처로 삼아 보고서를 섹션별로 작성하며, 필요에 따라 정보를 검색합니다. 파일 시스템은 두 에이전트와 세션 간의 **영구적인 외부 메모리** 이자 **공유 조정 매체** 역할을 하여 컨텍스트 창을 넘어선 반복적인 정제를 가능하게 합니다.

## 주요 결과
**FS-Researcher** 는 **DeepResearch Bench** 및 **DeepConsult** 두 가지 공개 벤치마크에서 **최첨단 보고서 품질** 을 달성했습니다. 특히, **Claude-Sonnet-4.5** 백본 모델을 사용한 경우 **DeepResearch Bench** 에서 **53.94 RACE** 점수를 기록하여 가장 강력한 baseline 모델 대비 **+3.02점** 높은 성능을 보였습니다. **DeepConsult** 에서는 **80.00%의 최고 승률** 과 **8.33점의 평균 점수** 를 달성했으며, 손실률을 **9.58%** 크게 줄였습니다. 또한, 최종 보고서 품질과 **Context Builder** 에 할당된 계산량 사이에 양의 상관관계가 있음을 입증했습니다.

## AI 실무자를 위한 시사점
**FS-Researcher** 는 컨텍스트 창의 한계를 극복하여 **복잡하고 긴 호라이즌의 연구 작업을 처리하는 LLM 에이전트** 를 구축하기 위한 효과적인 접근 방식을 제시합니다. **영구적인 파일 시스템 기반 작업 공간** 과 **구조화된 지식 베이스** 를 활용하는 것은 LLM 에이전트가 정보를 효율적으로 수집, 증류, 재사용하고, **반복적인 정제** 를 통해 성능을 스케일링하는 데 핵심적인 전략임을 보여줍니다. 이는 **정보 수집과 보고서 작성을 분리하는 듀얼 에이전트 아키텍처** 가 더욱 견고하고 확장 가능한 LLM 기반 워크플로우를 설계하는 데 유용한 청사진이 될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.