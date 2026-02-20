---
title: "[논문리뷰] Web-CogReasoner: Towards Knowledge-Induced Cognitive Reasoning for Web
  Agents"
excerpt: "Xinyu Yang이 arXiv에 게시한 'Web-CogReasoner: Towards Knowledge-Induced Cognitive Reasoning for Web
  Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agent
  - Cognitive Reasoning
  - Knowledge-Induced
  - Large Multimodal Models (LMMs)
  - Bloom's Taxonomy
  - Chain-of-Thought (CoT)
  - Web-CogDataset
  - Web-CogBench

permalink: /ai/review/2025-8-7-Web-CogReasoner-Towards-Knowledge-Induced-Cognitive-Reasoning-for-Web-Agents/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01858)

**저자:** Yuhan Guo, Cong Guo, Aiwen Sun, Hongliang He, Xinyu Yang, Yue Lu, Yingji Zhang, Xuntao Guo, Dong Zhang, Jianzhuang Liu, Jiang Duan, Yijia Xiao, Liangjian Wen, Hai-Ming Xu, Yong Dai



## 핵심 연구 목표
본 연구는 웹 에이전트가 인간의 인지 추론과 유사하게 동작하도록, 충분한 지식을 습득하여 효과적인 추론 능력을 갖추는 것을 목표로 합니다. 특히, **Bloom의 교육 분류학** 에서 영감을 받아 지식 내용 학습과 인지 과정이라는 두 가지 필수 단계로 웹 에이전트의 역량을 분해하여 해결하고자 합니다.

## 핵심 방법론
웹 에이전트의 지식 체계를 **사실적(Factual)** , **개념적(Conceptual)** , **절차적(Procedural)** 세 가지 지식 유형으로 분류하는 **Web-CogKnowledge 프레임워크** 를 제안합니다. 이 프레임워크 기반 지식 습득을 위해 **14개 실제 웹사이트** 에서 큐레이션한 **81K 규모의 Web-CogDataset** 을 구축하고, 이를 활용하여 **Qwen2.5-VL-7B** 를 기반으로 한 **Web-CogReasoner** 를 **지식 기반 Chain-of-Thought (CoT)** 추론 방식으로 학습시켰습니다. 또한, 종합적인 평가를 위해 **Web-CogBench** 를 개발했습니다.

## 주요 결과
**Web-CogBench** 에서 **Web-CogReasoner** 는 **84.4%의 전체 정확도** 를 달성하여 **Gemini 2.5 Pro (80.2%)** 및 **Qwen2.5-VL-7B (69.8%)** 를 포함한 기존 모델들을 뛰어넘었습니다. 특히, 어블레이션 연구를 통해 **사실적 지식** 학습이 **기억 (Memorizing)** 성능을 **+16.9%** 향상시키고, **개념적 지식** 학습이 **이해 (Understanding)** 성능을 **+11.3%** 향상시키며, **절차적 지식** 학습이 **탐색 (Exploring)** 성능을 **+7.1%** 향상시켜 단계별 지식 습득의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 웹 에이전트 개발에 있어 **체계적인 지식 습득의 중요성** 을 강조하며, 단순한 대규모 데이터 학습을 넘어선 **인지적 추론 능력** 의 필요성을 제시합니다. 공개된 **Web-CogDataset** 과 **Web-CogBench** 는 웹 에이전트의 **일반화 및 강건성** 향상을 위한 새로운 연구 방향을 제시하며, 실무자들이 지식 주도적 접근 방식을 활용하여 보다 신뢰성 있는 웹 자동화 솔루션을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.