---
title: "[논문리뷰] Search-R3: Unifying Reasoning and Embedding Generation in Large Language
  Models"
excerpt: "James Cheng이 arXiv에 게시한 'Search-R3: Unifying Reasoning and Embedding Generation in Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reinforcement Learning
  - Sentence Embedding
  - Retrieval-Augmented Generation
  - Chain-of-Thought
  - Information Retrieval
  - Supervised Fine-tuning

permalink: /ai/review/2025-10-10-Search-R3-Unifying-Reasoning-and-Embedding-Generation-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07048)

**저자:** Yuntao Gui, James Cheng



## 핵심 연구 목표
본 논문은 Large Language Models (LLMs)의 강력한 추론 능력이 검색(retrieval) 작업에서 충분히 활용되지 못하는 문제를 해결하고자 합니다. LLM의 추론 프로세스와 검색 임베딩 생성 과정을 통합하여, 복잡한 의미 분석을 통해 보다 효과적인 임베딩을 생성하는 새로운 프레임워크인 **Search-R3** 를 제안합니다.

## 핵심 방법론
**Search-R3** 는 두 단계의 학습 파이프라인을 사용합니다. 첫 번째 단계는 **지도 학습(SFT)** 과 **대조 학습(contrastive learning)** 을 통합하여 모델이 특정 `<embed_token|>` 토큰을 사용하여 임베딩을 생성하도록 훈련시킵니다. 두 번째 단계에서는 **강화 학습(RL)** 을 통해 추론 프로세스와 임베딩 품질을 동시에 최적화합니다. 특히, **GRPO(Group Relative Policy Optimization)** 알고리즘과 **DCGscaled** 보상 함수를 사용하며, 효율적인 **선택적 그래프 갱신 메커니즘** 을 갖춘 특수 **RL 환경** 을 도입하여 전체 코퍼스 재인코딩 없이 임베딩 표현의 변화를 효과적으로 관리합니다.

## 주요 결과
**Search-R3** 는 다양한 벤치마크에서 기존의 오픈소스 및 상용 임베딩 모델들을 뛰어넘는 최첨단 성능을 달성했습니다. 추론 기능이 활성화되었을 때 **MKQA** 평가에서 **nDCG@10** 를 **0.194에서 0.211** 로 향상시켰으며, **LitSearch** 에서는 **0.036** , **SciFact** 에서는 **0.048** 의 개선을 보였습니다. 상용 모델과의 비교에서는 **Qwen3-Embedding-4B** 와 유사한 **0.871 nDCG@10** 성능을 보였고, 강화 학습 적용 후 모델 출력의 **69%** 가 **0.5 이상** 의 점수를 달성하며 성능의 일관성을 입증했습니다.

## AI 실무자를 위한 시사점
**Search-R3** 는 LLM의 추론 능력을 검색 임베딩 생성에 직접 통합하여 지식 집약적 태스크의 성능을 크게 향상시킬 수 있음을 보여줍니다. 이는 **RAG(Retrieval-Augmented Generation)** 시스템을 구축하는 AI 엔지니어에게 더욱 정교하고 효과적인 정보 검색 기반을 제공할 수 있습니다. 또한, 효율적인 **강화 학습 환경 설계** 는 대규모 데이터셋에서도 임베딩 모델 훈련의 계산 비용을 절감하여, 실용적인 AI 시스템 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.