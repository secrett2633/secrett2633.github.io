---
title: "[논문리뷰] DITING: A Multi-Agent Evaluation Framework for Benchmarking Web Novel
  Translation"
excerpt: "arXiv에 게시된 'DITING: A Multi-Agent Evaluation Framework for Benchmarking Web Novel
  Translation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Machine Translation Evaluation
  - Large Language Models (LLMs)
  - Web Novel Translation
  - Multi-Agent Systems
  - Cultural Nuance
  - Benchmark Dataset
  - Natural Language Generation

permalink: /ai/review/2025-10-15-DITING-A-Multi-Agent-Evaluation-Framework-for-Benchmarking-Web-Novel-Translation/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09116)

**저자:** Enze Zhang, Jiaying Wang, Mengxi Xiao, Jifei Liu, Ziyan Kuang, Rui Dong, Eric Dong, Sophia Ananiadou, Min Peng, Qianqian Xie



## 핵심 연구 목표
본 연구는 웹 소설 번역에 대한 기존 기계 번역(MT) 평가 벤치마크들이 표면적 지표에 의존하여 서사적 일관성, 문체적 충실도, 문화적 뉘앙스를 포착하지 못하는 한계를 해결하는 것을 목표로 합니다. 대규모 언어 모델(LLM)이 웹 소설 번역에서 이러한 복합적인 장르적 특성을 효과적으로 반영하는지 종합적으로 평가하기 위한 프레임워크를 제시하고자 합니다.

## 핵심 방법론
연구팀은 웹 소설 번역을 위한 최초의 포괄적 평가 프레임워크인 **DITING** 을 도입했습니다. DITING은 **관용어 번역, 어휘 모호성, 용어 현지화, 시제 일관성, 제로 대명사 해결, 문화적 안전성** 의 6가지 핵심 차원을 통해 평가를 수행하며, 이를 위해 **18,000쌍 이상의 전문가 주석이 달린 중국어-영어 문장 쌍** 으로 구성된 DITING-CORPUS를 구축했습니다. 또한, 전문가의 논의 과정을 시뮬레이션하여 번역 품질을 평가하는 추론 기반 **멀티 에이전트 평가 프레임워크 AgentEval** 을 개발했습니다.

## 주요 결과
**AgentEval** 은 7가지 자동 평가 지표 중 인간의 판단과 **가장 높은 상관관계(Spearman Correlation 0.669, Variance Explained Score 44.8%)** 를 달성하여 기존 지표들보다 뛰어난 신뢰성을 보였습니다. **DeepSeek-V3** 는 평가된 14개 모델 중 **가장 높은 종합 점수(5.16)** 를 기록하며 가장 충실하고 문체적으로 일관된 번역을 제공했습니다. 또한, 중국어 학습 기반 LLM들이 더 큰 규모의 해외 모델들을 지속적으로 능가하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 웹 소설과 같이 문화적 뉘앙스와 복잡한 서사 구조를 포함하는 특정 장르의 번역 품질 평가에 있어 **도메인 특화된 심층 평가 프레임워크** 의 필요성을 명확하게 제시합니다. **AgentEval** 과 같은 멀티 에이전트 기반 평가 시스템은 LLM 개발자들이 모델의 **문화적 적응성 및 서사적 일관성** 성능을 보다 정확하게 측정하고 개선하는 데 기여할 수 있습니다. 특히, 중국어 학습 기반 LLM의 강점은 **대규모 문화 데이터의 통합** 이 번역 성능 향상에 핵심적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.