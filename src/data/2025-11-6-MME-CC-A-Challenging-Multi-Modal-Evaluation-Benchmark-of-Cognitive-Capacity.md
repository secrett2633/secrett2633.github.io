---
title: "[논문리뷰] MME-CC: A Challenging Multi-Modal Evaluation Benchmark of Cognitive
  Capacity"
excerpt: "이 [arXiv]에 게시한 'MME-CC: A Challenging Multi-Modal Evaluation Benchmark of Cognitive
  Capacity' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Benchmark
  - Cognitive Capacity
  - Visual Reasoning
  - MLLM Evaluation
  - Error Analysis
  - Chain-of-Thought

permalink: /ai/review/2025-11-6-MME-CC-A-Challenging-Multi-Modal-Evaluation-Benchmark-of-Cognitive-Capacity/

toc: true
toc_sticky: true

date: 2025-11-09 21:54:30+0900
last_modified_at: 2025-11-09 21:54:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03146)

**저자:** Kaiyuan Zhang, Chenghao Yang, Zhoufutu Wen, Sihang Yuan, Qiuyue Wang, Chaoyi Huang 외 다수



## 핵심 연구 목표
기존 멀티모달 벤치마크들이 텍스트 기반 추론을 과도하게 강조하거나 시각 중심의 인지적 행동을 체계적으로 포착하지 못하여 MLLM의 인지 능력을 불충분하게 평가하는 한계를 해결하는 것을 목표로 합니다. 시각 기반 추론에 중점을 둔 새로운 벤치마크 **MME-CC** 를 도입하여 MLLM의 인지 능력을 심층적으로 평가하고자 합니다.

## 핵심 방법론
**MME-CC** 는 **11가지 대표적인 추론 태스크** 를 시각 정보, 기하 정보, 시각 지식 추론의 **세 가지 기본 범주** 로 조직하여 구성됩니다. 데이터는 **10명의 어노테이터 팀** 이 참여하는 **인간-피드백 기반 파이프라인** 을 통해 구축되었으며, **모델 기반 필터링** 을 통해 단순하거나 중복되는 항목이 제거되었습니다. 모델 평가는 **DeepSeek-V3-0324** 를 심사위원 모델로 사용하는 **LLM-as-a-judge 프로토콜** 을 따릅니다.

## 주요 결과
**Gemini-2.5-Pro** 가 **42.66%** 의 최고 전체 점수를 기록하며 클로즈드 소스 모델이 오픈 소스 모델을 전반적으로 능가했습니다. 특히, 공간 및 기하 추론 부문에서는 모든 모델의 성능이 **30% 이하** 로 여전히 취약함을 드러냈습니다. 일반적인 오류 패턴으로는 **방향 인식 오류** , **교차 시점 객체 동일성 유지 실패** , **반사실적 지시사항 불이행** 등이 관찰되었습니다.

## AI 실무자를 위한 시사점
현재 MLLM이 시각 기반의 복잡한 인지 추론, 특히 공간 및 기하 추론에서 상당한 한계를 가지고 있음을 명확히 보여줍니다. 이는 AI 엔지니어들이 모델 설계 및 훈련 시 **시각적 인식과 구조화된 추론의 통합** 에 더 집중해야 함을 시사합니다. **MME-CC** 는 진단적 통찰력을 제공하여 특정 실패 모드를 개선하고, MLLM의 인지 능력을 향상시키기 위한 미래 연구 및 개발 방향을 제시하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.