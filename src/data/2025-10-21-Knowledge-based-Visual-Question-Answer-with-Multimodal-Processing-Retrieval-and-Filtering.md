---
title: "[논문리뷰] Knowledge-based Visual Question Answer with Multimodal Processing,
  Retrieval and Filtering"
excerpt: "이 [arXiv]에 게시한 'Knowledge-based Visual Question Answer with Multimodal Processing,
  Retrieval and Filtering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Question Answering
  - Retrieval-Augmented Generation
  - Multimodal AI
  - Reinforcement Learning
  - Knowledge Base
  - Tool Learning
  - Information Filtering

permalink: /ai/review/2025-10-21-Knowledge-based-Visual-Question-Answer-with-Multimodal-Processing-Retrieval-and-Filtering/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14605)

**저자:** Yuyang Hong, Jiaqi Gu, Qi Yang, Lubin Fan, Yue Wu, Ying Wang, Kun Ding, Shiming Xiang, Jieping Ye



## 핵심 연구 목표
본 논문은 **지식 기반 시각 질문 답변(KB-VQA)** 태스크에서 **멀티모달 쿼리의 품질과 검색 결과의 관련성** 이 부족하여 발생하는 문제를 해결하는 것을 목표로 합니다. 기존 **RAG(Retrieval-Augmented Generation)** 방법론의 한계를 극복하고, 시각적 이해와 외부 지식 검색을 효율적으로 통합하여 정확한 답변을 생성하는 새로운 프레임워크를 제시합니다.

## 핵심 방법론
제안하는 **Wiki-PRF** 는 **Processing, Retrieval, Filtering** 의 3단계로 구성됩니다. **Processing 단계** 에서는 **VLM-PRF 모델** 이 **캡셔닝, 시각적 접지(grounding), 플립(flipping)** 과 같은 시각 도구를 동적으로 호출하여 정밀한 멀티모달 검색 쿼리를 생성합니다. **Retrieval 단계** 에서는 시각 및 텍스트 특징을 통합하여 **멀티모달 지식 검색** 을 수행하며, **EVA-CLIP** 임베딩과 **Faiss 라이브러리** 를 활용합니다. 마지막 **Filtering 단계** 에서는 검색된 결과를 **관련성 기반으로 필터링 및 압축** 하여 최종 답변 생성에 사용합니다. 이 전체 과정은 **강화 학습(Reinforcement Learning)** 을 통해 훈련되며, **정답 정확도와 형식 일관성** 을 보상으로 사용하여 모델의 추론 및 도구 활용 능력을 향상시킵니다.

## 주요 결과
**E-VQA** 와 **InfoSeek** 벤치마크 데이터셋에서 **state-of-the-art 성능** 을 달성했습니다. 특히, **E-VQA** 에서는 **36.0%** (VLM-PRF-7B), **InfoSeek** 에서는 **42.8%** (VLM-PRF-7B)의 정확도를 기록하며 이전 방법론들을 크게 상회했습니다. 또한 **OK-VQA 벤치마크** 에서도 **77.8%** 의 새로운 SOTA 점수를 달성하여 본 방법론의 뛰어난 성능과 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **멀티모달 RAG 시스템** 에서 **강화 학습을 통한 도구 기반 정보 처리 및 필터링** 의 효과를 성공적으로 입증했습니다. 이는 제한된 데이터셋으로도 모델의 추론 및 정보 추출 능력을 크게 향상시킬 수 있음을 보여주며, 향후 **지식 기반 멀티모달 AI 시스템** 설계에 중요한 시사점을 제공합니다. 특히, 동적으로 도구를 활용하고 불필요한 정보를 제거하는 능력은 복잡한 현실 세계 VQA 문제 해결에 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.