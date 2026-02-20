---
title: "[논문리뷰] DocDancer: Towards Agentic Document-Grounded Information Seeking"
excerpt: "arXiv에 게시된 'DocDancer: Towards Agentic Document-Grounded Information Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Document Question Answering
  - Tool-use
  - Information Seeking
  - Synthetic Data Generation
  - Long-context Understanding
  - Multimodal Documents

permalink: /ai/review/2026-01-09-DocDancer-Towards-Agentic-Document-Grounded-Information-Seeking/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05163)

**저자:** Qintong Zhang, Xinjie Lv, Jialong Wu, Baixuan Li, Zhengwei Tao, Guochen Yan, Huanyao Zhang, Bin Wang, Jiahao Xu, Haitao Mi, Wentao Zhang



## 핵심 연구 목표
본 연구는 기존 DocQA(Document Question Answering) 에이전트들의 **비효율적인 도구 활용** 및 **폐쇄형 모델 의존성** 문제를 해결하고자 합니다. 궁극적으로, 정보 탐색 문제로 정형화된 **문서 기반 정보 탐색** 을 위한 **DocDancer** 라는 **종단 간 학습 가능한 오픈소스 Doc 에이전트** 를 제안하여 문서 이해 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
DocDancer는 **ReAct(Reasoning and Acting)** 패러다임 기반의 **도구 중심 에이전트 프레임워크** 를 채택하여 문서 탐색 및 이해를 명시적으로 모델링합니다. 이 프레임워크는 **Search** (키워드 기반 전문 검색) 및 **Read** (세분화된 정보 추출, **멀티모달 요약 모델 Mm** 활용) 두 가지 핵심 도구를 사용합니다. 또한, 고품질 학습 데이터 부족 문제를 해결하기 위해 **Exploration-then-Synthesis 데이터 합성 파이프라인** 을 도입하여, 탐색(Exploration) 단계에서 도구 기반 상호작용으로 증거를 수집하고 합성(Synthesis) 단계에서 QA 쌍을 생성합니다.

## 주요 결과
**DocDancer** 는 **MMLongBench-Doc** 및 **DocBench** 벤치마크에서 뛰어난 성능을 보였습니다. 특히, **GPT-5.2** 기반 DocDancer는 MMLongBench-Doc에서 **56.8 F1 / 67.6 LasJ** , DocBench에서 **85.5 LasJ** 를 달성하여 기존 모든 모델을 능가했으며, DocBench에서는 **인간 기준선을 4점 초과** 했습니다. **Qwen3-30B-A3B** 와 같은 오픈소스 모델은 **5,000개의 합성 데이터** 만으로도 경쟁력 있는 성능을 달성하며 데이터 효율성과 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 문서 이해 태스크에 대한 **도구 중심의 에이전트 프레임워크** 의 효과를 입증하며, 기존 RAG 기반 접근 방식을 넘어선 실용적인 해결책을 제시합니다. **오픈소스 에이전트의 종단 간 학습 가능성** 을 보여주어, 폐쇄형 모델 의존성에서 벗어나 **문서 이해 에이전트 구축 장벽을 낮출 수 있음** 을 시사합니다. 또한, **고품질 합성 데이터 생성 파이프라인** 은 전문 분야의 데이터 부족 문제를 해결하고, 적은 양의 데이터로도 효과적인 모델 학습이 가능함을 보여주는 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.