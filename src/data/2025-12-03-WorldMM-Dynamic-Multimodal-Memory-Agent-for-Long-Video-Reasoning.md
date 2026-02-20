---
title: "[논문리뷰] WorldMM: Dynamic Multimodal Memory Agent for Long Video Reasoning"
excerpt: "arXiv에 게시된 'WorldMM: Dynamic Multimodal Memory Agent for Long Video Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Reasoning
  - Multimodal Memory
  - Adaptive Retrieval
  - Video Large Language Models
  - Knowledge Graph
  - Multiscale Temporal Reasoning
  - Episodic Memory
  - Semantic Memory

permalink: /ai/review/2025-12-03-WorldMM-Dynamic-Multimodal-Memory-Agent-for-Long-Video-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02425)

**저자:** Woongyeong Yeo, Kangsan Kim, Jaehong Yoon, Sung Ju Hwang



## 핵심 연구 목표
본 논문은 기존 비디오 LLM이 긴 비디오(수 시간~수 일)를 처리할 때 직면하는 **제한된 컨텍스트 용량** 및 **시각적 세부 정보 손실** 문제를 해결하고자 합니다. 특히 기존 메모리 증강 방식이 **텍스트 의존적** 이고 **고정된 시간 스케일** 에 머물러 시각적 증거 활용 및 가변적인 이벤트 기간 처리에 실패하는 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
WorldMM은 세 가지 보완적인 메모리를 구축합니다: 다중 시간 스케일의 사실적 이벤트를 인덱싱하는 **에피소드 메모리** (텍스트 그래프), 고수준 개념 지식을 지속적으로 업데이트하는 **의미 메모리** (지식 그래프), 그리고 장면의 세부 정보를 보존하는 **시각 메모리** (특징 기반 및 타임스탬프 기반 검색). 추론 시 **적응형 검색 에이전트** 는 쿼리에 따라 가장 관련성 높은 메모리 소스와 다중 시간 스케일을 반복적으로 선택하며 필요한 정보가 충분히 수집될 때까지 검색을 계속합니다.

## 주요 결과
WorldMM은 5가지 장기 비디오 질의응답 벤치마크에서 기존 최첨단 방법론 대비 평균 **8.4%** 의 성능 향상을 보이며 우수성을 입증했습니다. 특히 **WorldMM-GPT** 는 평균 **69.5%** 의 정확도를 달성했습니다. 에피소드 메모리, 시각 메모리, 의미 메모리가 모두 적응적으로 통합될 때 최상의 결과를 보였으며, 다중 턴 검색 방식은 EgoLifeQA에서 최대 **9.3%** 의 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
WorldMM은 장기 비디오 이해를 위한 **다중 모달 및 다중 스케일 메모리 시스템** 의 중요성을 강조하며, AI 실무자들이 더욱 견고하고 유연한 비디오 추론 시스템을 설계할 수 있는 새로운 방향을 제시합니다. 특히, 쿼리에 따라 **메모리 유형과 시간 스케일을 동적으로 선택** 하는 접근 방식은 복잡한 실제 시나리오에 효과적으로 적용될 수 있습니다. 다만, 지속적으로 축적되는 지식의 **프라이버시 및 보안 문제** 는 실제 배포 시 신중하게 고려해야 할 중요한 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.