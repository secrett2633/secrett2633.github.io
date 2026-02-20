---
title: "[논문리뷰] Action100M: A Large-scale Video Action Dataset"
excerpt: "arXiv에 게시된 'Action100M: A Large-scale Video Action Dataset' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large-scale Dataset
  - Video Action Recognition
  - Open-Vocabulary
  - Temporal Segmentation
  - Vision-Language Models
  - Zero-shot Learning
  - Data Curation
  - Self-Refine

permalink: /ai/review/2026-01-16-Action100M-A-Large-scale-Video-Action-Dataset/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10592)

**저자:** Delong Chen, Tejaswi Kasarla, Yejin Bang, Mustafa Shukor, Willy Chung, Jade Yu, Allen Bolourchi, Théo Moutakanni, Pascale Fung



## 핵심 연구 목표
본 연구는 기존 영상 액션 데이터셋의 규모 및 도메인 다양성 한계를 극복하고, 물리적 세계를 이해하는 AI 모델의 발전을 위한 **대규모 오픈-어휘 영상 액션 데이터셋** 인 **ACTION100M** 을 구축하는 것을 목표로 합니다. 이를 통해 **오픈-도메인 액션 인식** 및 **세계 모델링** 연구를 위한 견고한 데이터 기반을 마련하고자 합니다.

## 핵심 방법론
ACTION100M은 **1.2M 인터넷 교육용 영상** 으로부터 **완전 자동화된 파이프라인** 을 통해 생성되었습니다. 이 파이프라인은 먼저 **V-JEPA 2 임베딩** 을 사용하여 **계층적 시간 분할** 을 수행하고, 이어서 **TREE-OF-CAPTIONS** 구조로 **다단계 프레임 및 세그먼트 캡션** 을 생성합니다. 마지막으로, **GPT-OSS-120B** 추론 모델이 **멀티-라운드 SELF-REFINE 절차** 를 거쳐 **구조화된 주석(brief/detailed action, actor, brief/detailed caption)** 을 추출하여 데이터 품질과 일관성을 높입니다.

## 주요 결과
**ACTION100M** 은 총 **14.6년 분량의 1.2M 영상** 에서 **1억 4천 7백만 개 이상의 시간적으로 지역화된 세그먼트 주석** 을 포함하며, 총 **213억 단어** 에 달하는 방대한 텍스트 정보를 제공합니다. **VL-JEPA 모델** 을 ACTION100M으로 훈련시킨 결과, 8개의 액션 인식 벤치마크에서 **평균 52.5%의 zero-shot top-1 정확도** 와 8개의 텍스트-영상 검색 벤치마크에서 **평균 64.9%의 Recall@1** 을 달성하며 **일관된 데이터 스케일링 성능 향상** 과 강력한 zero-shot 성능을 입증했습니다. 또한, **의미론적 리샘플링** 은 zero-shot 정확도를 **40.77%에서 41.41%로 향상** 시켰습니다.

## AI 실무자를 위한 시사점
**ACTION100M** 은 **대규모의 고품질 영상 데이터셋** 이 **오픈-어휘 액션 이해 및 세계 모델링** 에 필수적임을 보여줍니다. 특히, **V-JEPA 2** 와 같은 **최신 비전-언어 모델(VLM)** 을 활용한 **자동화된 주석 파이프라인** 과 **계층적 캡셔닝** , **SELF-REFINE 메커니즘** 은 데이터 구축의 효율성과 품질을 동시에 확보하는 효과적인 방법을 제시합니다. 이는 AI/ML 엔지니어들이 **수동 주석의 한계** 를 넘어 **확장 가능하고 다양한 도메인** 의 영상 이해 모델을 개발하는 데 중요한 기반 데이터셋으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.