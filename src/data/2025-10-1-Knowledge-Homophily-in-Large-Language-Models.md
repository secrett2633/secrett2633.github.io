---
title: "[논문리뷰] Knowledge Homophily in Large Language Models"
excerpt: "Nedim Lipka이 [arXiv]에 게시한 'Knowledge Homophily in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Knowledge Homophily
  - Graph Neural Networks
  - Knowledge Graph
  - Knowledge Injection
  - Question Answering
  - Fine-tuning
  - Knowledge Retrieval

permalink: /ai/review/2025-10-1-Knowledge-Homophily-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23773)

**저자:** Utkarsh Sahu, Zhisheng Qi, Mahantesh Halappanavar, Nedim Lipka, Ryan A. Rossi, Franck Dernoncourt, Yu Zhang, Yao Ma, Yu Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 인간의 뇌와 유사하게 **지식 동질성(Knowledge Homophily)** 패턴을 보이는지 탐구하고, 이를 통해 LLM 내 지식의 구조적 조직을 이해하며 **지식 주도형(knowledge-intensive) 태스크**의 효율성을 개선하는 것을 목표로 합니다. 특히, 개념적으로 관련된 엔티티들이 유사한 수준의 지식력을 갖는 경향이 있는지 밝히고자 합니다.

## 핵심 방법론
LLM의 지식을 그래프 형태로 매핑하기 위해 **트리플 및 엔티티 수준**에서 지식력 점수를 측정합니다. 이를 바탕으로 엔티티와 그 이웃 간의 지식력 관계를 분석하여 동질성 여부를 확인하고, 발견된 지식 동질성 원리를 활용하여 **그래프 신경망(GNN) 회귀 모델**을 개발합니다. 이 모델은 엔티티의 이웃 점수를 활용하여 **엔티티 수준의 지식력 점수**를 추정하며, 추정된 점수는 **LLM 파인튜닝을 위한 지식 주입**과 **다중 홉 질의응답(multi-hop QA)을 위한 지식 검색**에 활용됩니다.

## 주요 결과
LLM 내에서 **지식 동질성**이 존재함을 정량적 및 정성적으로 입증했습니다. **GNN 기반 지식 주입** 방법은 **Mistral-7B** 모델에서 **평균 67.7%의 일반화 이득**을 달성하여 **MLP (65.6%)** 및 **랜덤 (60.5%)** 선택 방식보다 뛰어났습니다. 또한, **GNN 기반 빔 서치(G-BS) 지식 검색**은 다중 홉 질의응답에서 2-hop QA 정확도를 **기준선 대비 4.57% 향상**시키고, 3-hop QA 정확도는 **2.62% 향상**시키는 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 내부 지식 구조에 대한 심도 깊은 통찰을 제공하며, **지식 동질성**이 **LLM의 효율적인 파인튜닝과 지식 검색 전략**에 활용될 수 있음을 보여줍니다. AI/ML 엔지니어는 **GNN 기반 추정 모델**을 활용하여 **덜 알려진 지식 영역을 식별**하고, 이를 통해 **지식 주입 비용을 최적화**하거나 **다중 홉 추론 기반 질의응답 시스템의 성능**을 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.