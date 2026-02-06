---
title: "[논문리뷰] V-Retrver: Evidence-Driven Agentic Reasoning for Universal Multimodal Retrieval"
excerpt: "Zeyu Zhang이 [arXiv]에 게시한 'V-Retrver: Evidence-Driven Agentic Reasoning for Universal Multimodal Retrieval' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Retrieval
  - Agentic AI
  - Large Language Models (LLMs)
  - Visual Tools
  - Chain-of-Thought (CoT)
  - Reinforcement Learning
  - Curriculum Learning
  - Evidence-Driven Reasoning

permalink: /ai/review/2026-02-06-V-Retrver-Evidence-Driven-Agentic-Reasoning-for-Universal-Multimodal-Retrieval/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06034)

**저자:** Dongyang Chen, Chaoyang Wang, Dezhao SU, Xi Xiao, Zeyu Zhang, Jing Xiong, Qing Li, Yuzhang Shang, Shichao Kan



## 핵심 연구 목표
기존 MLLM 기반 검색 시스템이 정적 시각 인코딩에 의존하고 시각적 증거를 능동적으로 검증하지 못해 시각적으로 모호한 경우 추론 오류가 발생하는 문제를 해결하고자 합니다. 시각적 검사에 기반한 **증거 기반 에이전트 추론 프로세스** 를 통해 범용 멀티모달 검색의 정확성과 신뢰성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **V-Retrver** 를 제안하며, 멀티모달 검색을 에이전트 추론 문제로 재정의합니다. 모델은 **SELECT-IMAGE** 및 **ZOOM-IN** 과 같은 외부 **시각 도구** 를 호출하여 추론 과정에서 시각적 증거를 선택적으로 획득하는 **멀티모달 인터리브드 추론(MIER)** 을 수행합니다. 훈련은 **지도 미세 조정(SFT)** , **거부 기반 미세 조정(RSFT)** , **증거 정렬 정책 최적화(EAPO)** 를 포함하는 3단계 **커리큘럼 학습 전략** 으로 이루어지며, **GRPO(Group Relative Policy Optimization)** 를 활용합니다.

## 주요 결과
**M-BEIR 벤치마크** 에서 평균 **Recall 69.7%** 를 달성하여 기존 최고 성능 모델인 U-MARVEL-7B 대비 **4.9%p 향상** 을 보였습니다. 특히 미세한 시각적 정보가 중요한 **FashionIQ(51.2%)** 및 **CIRR(73.5%)** 에서 크게 우수한 성능을 기록했습니다. 또한, 훈련 시 접하지 않은 데이터셋(unseen datasets)에서도 **CIRCO MAP@5 48.2%** 를 달성하는 등 뛰어난 일반화 성능을 입증했으며, 시각 도구 사용이 평균 Recall을 **61.8%에서 67.2%로 향상** 시켰음을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 멀티모달 LLM이 **외부 도구를 활용하여 능동적으로 시각적 증거를 수집** 하고 추론하는 에이전트적 접근 방식의 효과를 보여줍니다. 이는 **미세한 시각적 차이에 기반한 검색** 이나 복잡한 멀티모달 질의응답 시스템 개발에 있어 중요한 통찰을 제공합니다. 특히 **커리큘럼 기반의 훈련 전략** 은 에이전트 모델의 안정성과 성능을 높이는 데 기여하며, **검색 증강 생성(RAG)** 과 같은 하위 태스크에도 확장될 수 있는 잠재력을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.