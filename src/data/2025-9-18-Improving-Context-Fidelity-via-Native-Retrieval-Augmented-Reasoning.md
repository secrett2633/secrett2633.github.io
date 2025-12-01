---
title: "[논문리뷰] Improving Context Fidelity via Native Retrieval-Augmented Reasoning"
excerpt: "Xiangru Tang이 [arXiv]에 게시한 'Improving Context Fidelity via Native Retrieval-Augmented Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Context Fidelity
  - Retrieval-Augmented Generation (RAG)
  - Large Language Models (LLMs)
  - Reinforcement Learning (RL)
  - Supervised Fine-Tuning (SFT)
  - Hallucination
  - Question Answering
  - In-context Retrieval
  - Curriculum Learning

permalink: /ai/review/2025-9-18-Improving-Context-Fidelity-via-Native-Retrieval-Augmented-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13683)

**저자:** Suyuchen Wang, Jinlin Wang, Xinyu Wang, Shiqi Li, Xiangru Tang, Sirui Hong, Xiao-Wen Chang, Chenglin Wu, Bang Liu



## 핵심 연구 목표
논문은 대규모 언어 모델(LLMs)이 제공된 컨텍스트에 대한 충실도(context fidelity)를 유지하지 못하고, 질문에 대한 답변 생성 시 일관성 없는 결과를 내거나 환각(hallucination)을 일으키는 문제를 해결하고자 합니다. 이를 위해 LLMs가 자체적인 검색 능력을 활용하여 **인컨텍스트 증거를 추론 과정에 명시적으로 통합** 하도록 가르치는 새로운 패러다임을 제안합니다.

## 핵심 방법론
제안된 **CARE (Context-Aware Retrieval-Enhanced reasoning)** 프레임워크는 제한된 레이블 증거 데이터만을 사용하며, **두 단계의 훈련 과정** 을 거칩니다. 첫째, **감독 학습 미세 조정 (SFT) 단계** 에서는 **골든 인컨텍스트 검색 스니펫(retrieval snippets)** 으로 강화된 추론 체인을 통해 증거 통합 패턴을 확립합니다. 둘째, **강화 학습 (RL) 단계** 에서는 **검색 인식 보상(retrieval-aware rewards)** 을 통해 자체 검색 메커니즘을 정제하며, **커리큘럼 학습 전략** 을 활용하여 모델이 간단한 추론 작업에서 복잡한 작업으로 점진적으로 적응하도록 합니다.

## 주요 결과
**CARE** 는 여러 실제 및 반사실 QA 벤치마크에서 기존의 SFT, 전통적인 RAG 및 외부 검색 솔루션들을 **일관되게 능가** 하는 성능을 보였습니다. 특히 **LLaMA-3.1 8B** 모델에서 **평균 F1 점수가 +15.29%** 향상되었으며, **2WikiMQA** 에서는 **+29.42%** , **MuSiQue** 에서는 **+18.92%** 의 가장 큰 성능 향상을 기록했습니다. 반사실 QA 태스크인 **CofCA** 에서도 **LLaMA-3.1 8B** 에서 **+13.69%** 의 상당한 개선을 보였습니다.

## AI 실무자를 위한 시사점
**CARE** 는 LLMs의 **컨텍스트 충실도를 크게 향상** 시키고 지식 집약적 작업을 위한 **정확하고 신뢰할 수 있는 기반** 을 제공합니다. 이는 외부 API 호출 및 데이터베이스 검색과 같은 **추가 오버헤드 없이** 모델 자체의 언어 이해 능력을 활용하여 인컨텍스트 검색을 수행하므로 효율적입니다. 하지만 외부 지식에 접근할 수 없으며, 모호하거나 모순된 입력 컨텍스트에서는 여전히 환각 가능성이 존재하므로 **적절한 적용 범위와 한계** 를 인지해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.