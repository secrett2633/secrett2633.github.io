---
title: "[논문리뷰] MINED: Probing and Updating with Multimodal Time-Sensitive Knowledge for
  Large Multimodal Models"
excerpt: "Yifan Gao이 arXiv에 게시한 'MINED: Probing and Updating with Multimodal Time-Sensitive Knowledge for
  Large Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Multimodal Models (LMMs)
  - Time-Sensitive Knowledge
  - Temporal Reasoning
  - Knowledge Editing
  - Multimodal Benchmarking
  - Temporal Awareness
  - Dynamic Knowledge

permalink: /ai/review/2025-10-23-MINED-Probing-and-Updating-with-Multimodal-Time-Sensitive-Knowledge-for-Large-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19457)

**저자:** Kailin Jiang, Ning Jiang, Yuchen Ren, Yuchen Li, Yifan Gao, Jinhe Bi, Yunpu Ma, Qingqing Liu, Xianhao Wang, Yifan Jia, Hongbo Jiang, Yaocong Hu, Bin Li, Lei Liu, Yuntao Du



## 핵심 연구 목표
본 연구는 대규모 멀티모달 모델(LMM)이 시간에 따라 변화하는 사실적 지식을 정확하게 이해하는 데 어려움을 겪는 문제를 해결하고자 합니다. 기존 벤치마크의 정적인 한계를 넘어, LMM의 **시간 민감 지식(time-sensitive knowledge)** 이해 능력을 종합적으로 평가하는 **MINED** 벤치마크를 제안하고, 이를 통해 모델의 인지적, 시간적 인지, 신뢰성, 이해, 추론, 견고성 등 6가지 핵심 역량을 평가하는 것을 목표로 합니다.

## 핵심 방법론
**MINED** 벤치마크는 두 명의 전문 주석자가 **Wikipedia** 에서 수집한 2,104개의 시간 민감 지식 샘플을 바탕으로 6가지 핵심 역량과 11가지 도전적인 태스크를 구성합니다. 모델 성능은 **Cover Exact Match (CEM) 점수** 로 평가하며, 시간 민감 지식 업데이트 가능성을 탐구하기 위해 **FT-LLM, FT-VIS, MEND, SERAC, IKE** 와 같은 **지식 편집(knowledge editing) 방법론** 을 단일 및 평생 편집 시나리오에서 적용하고 그 효과를 분석합니다.

## 주요 결과
총 15개의 LMM을 평가한 결과, **Gemini-2.5-Pro** 가 평균 **CEM 점수 63.07%** 로 가장 높은 성능을 달성했지만, 대부분의 오픈소스 LMM은 시간 이해 능력이 부족했습니다. LMM은 **조직(organization) 지식** 에서 가장 우수한 성능을 보였고, **스포츠(sport) 지식** 에서는 가장 취약한 성능을 나타냈습니다. **단일 편집 시나리오** 에서는 **지식 편집 방법론** 이 LMM의 시간 민감 지식을 효과적으로 업데이트할 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
현재 LMM은 동적이고 시간 민감한 정보를 처리하는 데 중대한 한계를 가지고 있으며, 특히 특정 도메인(예: 스포츠)에서 취약합니다. 이는 실시간 정보 업데이트가 필요한 AI 애플리케이션에 대한 중요한 고려사항을 제시합니다. **지식 편집 기술** 은 LMM을 전체 재훈련 없이 효율적으로 업데이트할 수 있는 유망한 대안을 제공하여, LMM이 최신 정보를 유지하고 실제 환경에서 더 신뢰할 수 있도록 하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.