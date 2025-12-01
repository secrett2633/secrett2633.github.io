---
title: "[논문리뷰] Towards Mixed-Modal Retrieval for Universal Retrieval-Augmented
  Generation"
excerpt: "이 [arXiv]에 게시한 'Towards Mixed-Modal Retrieval for Universal Retrieval-Augmented
  Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Universal RAG
  - Multimodal Retrieval
  - Mixed-Modal Data Generation
  - Vision-Language Models
  - Contrastive Learning
  - Matryoshka Representation Learning

permalink: /ai/review/2025-10-21-Towards-Mixed-Modal-Retrieval-for-Universal-Retrieval-Augmented-Generation/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17354)

**저자:** Chenghao Zhang, Guanting Dong, Xinyu Yang, Zhicheng Dou



## 핵심 연구 목표
본 연구는 기존 RAG 시스템이 단일 모드 텍스트나 제한된 다중 모드 설정에만 초점을 맞춰, 실제 환경의 **혼합 모드(mixed-modal)** 질의 및 문서 처리에 한계가 있다는 문제를 해결하고자 합니다. 궁극적으로 **Universal Retrieval-Augmented Generation (URAG)** 시나리오에서 **Vision-Language Model (VLM)** 의 생성 품질을 향상시키기 위해, 혼합 모드 정보를 이해하고 검색할 수 있는 통합된 리트리버 **Nyx** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 혼합 모드 데이터 부족 문제를 해결하기 위해 웹 문서 기반의 4단계 자동화 파이프라인을 통해 **NYxQA** 데이터셋을 구축했습니다. **Nyx** 리트리버는 두 단계로 훈련됩니다: 첫째, **NYxQA** 및 여러 공개/합성 데이터셋( **mmE5 파이프라인, HotpotQA, MMEB** 등)에서 **Matryoshka Representation Learning (MRL)** 을 활용한 **대조 학습(Contrastive Learning)** 을 통해 사전 훈련됩니다. 둘째, **Qwen-2.5-VL-3B-Instruct** 와 같은 다운스트림 VLM의 생성 선호도에 맞춰 **VLM-guided feedback** 기반의 미세 조정을 수행합니다.

## 주요 결과
**Nyx** 는 6가지 RAG 데이터셋(HotpotQA, Bamboogle, MuSiQue, SciQA, MMQA, NYxQA) 전반에서 모든 기준 모델을 능가하는 일관된 생성 성능을 보였습니다. 특히 **NYxQA** 데이터셋에서 **81.83%의 Accuracy** 를 달성하며 **mmE5 (66.83%)** 및 **Nyx-pretrained (74.83%)** 를 크게 상회했습니다. 임베딩 능력 분석에서도 **MMEB 벤치마크** 에서 **Nyx** 는 **61.1%의 Overall Score** 를 기록하며 다른 모델들을 능가했습니다. 또한 **MRL** 의 적용으로 **1024차원 임베딩** 으로도 **2048차원** 과 유사한 성능을 유지하며 저장 공간을 절반으로 줄일 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
**Nyx** 의 개발은 텍스트와 이미지가 복합적으로 얽힌 실제 웹 환경에서 **범용 RAG** 의 가능성을 입증하여, 복잡한 VLM 애플리케이션 개발에 중요한 지침을 제공합니다. **NYxQA** 와 같은 고품질 합성 데이터셋 구축 방법론과 **VLM 피드백 기반 미세 조정** 전략은 다중 모달 RAG 시스템의 성능 향상과 생성 품질 강화를 위한 효과적인 접근 방식임을 시사합니다. 마지막으로 **Matryoshka Representation Learning** 은 다양한 리소스 제약 조건 하에서 효율적인 임베딩 모델을 구축할 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.