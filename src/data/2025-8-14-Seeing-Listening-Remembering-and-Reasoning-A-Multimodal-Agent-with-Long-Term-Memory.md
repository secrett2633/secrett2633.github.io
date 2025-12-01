---
title: "[논문리뷰] Seeing, Listening, Remembering, and Reasoning: A Multimodal Agent with
  Long-Term Memory"
excerpt: "Yuan Lin이 [arXiv]에 게시한 'Seeing, Listening, Remembering, and Reasoning: A Multimodal Agent with
  Long-Term Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Agent
  - Long-Term Memory
  - Episodic Memory
  - Semantic Memory
  - Reinforcement Learning
  - Video Question Answering
  - Entity-Centric Memory

permalink: /ai/review/2025-8-14-Seeing-Listening-Remembering-and-Reasoning-A-Multimodal-Agent-with-Long-Term-Memory/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09736)

**저자:** Lin Long, Yichen He, Wentao Ye, Yiyuan Pan, Yuan Lin, Hang Li, Junbo Zhao, Wei Li



## 핵심 연구 목표
본 논문은 실시간 멀티모달 입력(시각, 청각)을 지속적으로 처리하여 장기 기억을 구축하고 업데이트하며, 이를 기반으로 추론하여 복잡한 지시를 완료할 수 있는 **멀티모달 에이전트 프레임워크 M3-Agent** 를 제안합니다. 기존 모델의 한계인 무한한 정보 처리 및 일관된 세계 지식 구축 문제를 해결하고자 합니다.

## 핵심 방법론
**M3-Agent** 는 `멀티모달 LLM(MLLM)`과 `멀티모달 장기 기억 모듈`로 구성되며, `기억 형성(memorization)`과 `제어(control)` 두 가지 병렬 프로세스로 작동합니다. 기억은 `엔티티 중심의 멀티모달 그래프` 형태로 구성되며, `에피소드 기억`과 `의미 기억`을 생성합니다. 제어 과정에서는 `강화 학습(DAPO)`을 통해 **다중 턴 반복 추론** 을 수행하고 관련 정보를 메모리에서 검색합니다.

## 주요 결과
실험 결과, **M3-Agent** 는 가장 강력한 베이스라인인 **Gemini-GPT4o-Hybrid** 대비 **M3-Bench-robot** 에서 **6.7%** , **M3-Bench-web** 에서 **7.7%** , **VideoMME-long** 에서 **5.3%** 더 높은 정확도를 달성했습니다. 특히 `의미 기억`의 중요성이 입증되었는데, 이를 제거 시 정확도가 **17.1%** 에서 **19.2%** 감소하는 등 크게 하락했습니다. `강화 학습`은 성능을 **8.0%** 이상 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 AI 에이전트가 보다 인간과 유사한 `장기 기억`을 갖추는 데 중요한 진전을 보여줍니다. `엔티티 중심의 멀티모달 기억 구조`와 `강화 학습 기반의 다중 턴 추론`이 복잡한 환경 이해 및 태스크 완수에 필수적임을 시사합니다. 새롭게 개발된 **M3-Bench** 벤치마크는 실제 환경에서의 멀티모달 에이전트 평가를 위한 귀중한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.