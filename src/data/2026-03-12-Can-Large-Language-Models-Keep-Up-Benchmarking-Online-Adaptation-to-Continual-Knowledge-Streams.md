---
title: "[논문리뷰] Can Large Language Models Keep Up? Benchmarking Online Adaptation to Continual Knowledge Streams"
excerpt: "arXiv에 게시된 'Can Large Language Models Keep Up? Benchmarking Online Adaptation to Continual Knowledge Streams' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Online Adaptation
  - Continual Learning
  - Knowledge Streams
  - Large Language Models
  - Benchmarking
  - State Tracking
  - Retrieval Augmented Generation
  - Agentic Memory

permalink: /ai/review/2026-03-12-Can-Large-Language-Models-Keep-Up-Benchmarking-Online-Adaptation-to-Continual-Knowledge-Streams/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.07392)

**저자:** Jiyeon Kim, Hyunji Lee, Dylan Zhou, Sue Hyun Park, Seunghyun Yoon, Trung Bui, Franck Dernoncourt, Sungmin Cha, Minjoon Seo



## 핵심 연구 목표
본 논문은 실세계의 동적 환경에서 지식이 지속적으로 진화하거나 점진적으로 출현할 때 **대규모 언어 모델(LLMs)** 이 이에 적응하는 능력의 한계를 해결하고자 합니다. 특히, 스트리밍되는 지식에 대한 **온라인 적응 능력** 을 평가하고, 모델이 미세한 사실 업데이트를 추적하고, 일관성을 유지하며, 장기적인 스트림에서 추론하는 능력을 벤치마킹하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **ONLINE ADAPTATION TO CONTINUAL KNOWLEDGE STREAMS (OAKS)** 라는 벤치마크를 제안하고, **OAKS-BABI** (합성 데이터셋)와 **OAKS-Novel** (문학 텍스트 기반 휴먼 큐레이션 데이터셋) 두 가지 새로운 데이터셋을 구축합니다. 모델은 매 시간 간격마다 동일한 질문에 대해 평가되며, 현재까지 축적된 모든 지식을 바탕으로 정답을 추적합니다. **Gemini 3** , **Qwen3** , **GPT-OSS** , **Gemma 3** 등 **14개 LLM** 을 대상으로 **Base** , **Retrieval Augmented Generation (RAG)** , **Agentic Memory Systems** 등의 다양한 컨텍스트 전략을 사용하여 성능을 분석합니다.

## 주요 결과
LLM들은 OAKS 벤치마크에서 상당한 한계를 보였으며, 오픈소스 모델은 **OAKS-B에서 평균 39.4%** , **OAKS-N에서 57.5%** 의 정확도를 기록했습니다. 가장 강력한 클로즈드소스 모델인 **Gemini 3 Pro** 조차 **OAKS-B에서 66.3%** , **OAKS-N에서 75.5%** 의 정확도에 그쳤습니다. 특히, **자주 업데이트되는 지식** 에 대한 질문에서 성능이 현저히 저하되었고, **‘Thinking mode’** 활성화 시 복잡한 추론 질문(예: Bridge 유형)에서 **15.4%** 의 정확도 향상을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM이 동적으로 변화하는 지식 스트림에 대한 **온라인 적응 능력** 이 여전히 초기 단계임을 인지해야 합니다. 특히 **잦은 지식 업데이트** 가 발생하는 환경에서는 모델의 **상태 추적 지연** 및 **방해 정보에 대한 취약성** 을 극복하기 위한 새로운 접근 방식이 필요합니다. **'Thinking mode'** 와 같은 명시적 추론 프로세스를 통합하는 것은 복잡한 태스크에서 유망하지만, 단순 **RAG** 만으로는 불충분하므로 **에이전트 기반 메모리 시스템** 과 같은 고급 컨텍스트 관리 전략을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.