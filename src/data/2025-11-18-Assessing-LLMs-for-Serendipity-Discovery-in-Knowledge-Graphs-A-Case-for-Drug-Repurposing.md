---
title: "[논문리뷰] Assessing LLMs for Serendipity Discovery in Knowledge Graphs: A Case for Drug Repurposing"
excerpt: "이 [arXiv]에 게시한 'Assessing LLMs for Serendipity Discovery in Knowledge Graphs: A Case for Drug Repurposing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Serendipity Discovery
  - Knowledge Graphs
  - Drug Repurposing
  - LLMs
  - KGQA
  - RNS Metric
  - Biomedical AI

permalink: /ai/review/2025-11-18-Assessing-LLMs-for-Serendipity-Discovery-in-Knowledge-Graphs-A-Case-for-Drug-Repurposing/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.12472)

**저자:** Mengying Wang, Chenhui Ma, Ao Jiao, Tuo Liang, Pengjun Lu, Shrinidhi Hegde, Yu Yin, Evren Gurkan-Cavusoglu, Yinghui Wu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 지식 그래프(KG)에서 예측 가능하고 관련성 높은 답변을 넘어, **예상치 못하고 가치 있는("serendipitous") 통찰력을 발견** 하는 능력을 평가하는 것을 목표로 합니다. 특히 **약물 재창출(Drug Repurposing)** 도메인에 초점을 맞춰, LLM 기반의 과학적 발견 역량을 심층적으로 이해하고 개선할 새로운 평가 프레임워크를 제시하고자 합니다.

## 핵심 방법론
연구진은 **SerenQA 프레임워크** 를 제안하며, 이는 세 가지 핵심 구성요소로 이루어집니다. 첫째, **Serendipity Metric (RNS)** 은 관련성(Relevance), 참신성(Novelty), 놀라움(Surprise)을 정보 이론 및 그래프 특성을 기반으로 정량화합니다. 둘째, **Serendipity-aware Benchmark** 는 **Clinical Knowledge Graph (CKG)** 에서 파생된 약물 재창출 관련 전문가 주석 KGQA 데이터셋을 포함합니다. 셋째, **평가 파이프라인** 은 지식 검색, 서브그래프 추론, 그리고 LLM 유도 **빔 탐색(Beam Search)** 을 통한 serendipity 탐색의 세 가지 하위 작업으로 구성됩니다.

## 주요 결과
실험 결과, 최신 LLM(예: **DeepSeek-V3** , **GPT-4o** )은 단순한 단일 홉 지식 검색 작업에서 우수한 성능(약 **78% F1 스코어** )을 보였습니다. 그러나 3개 이상의 홉을 포함하는 복잡한 다중 홉 질의에서는 F1 스코어가 **10% 미만** 으로 크게 하락하며 성능 저하를 보였습니다. 또한, LLM은 **serendipity 탐색(SerenHit <0.10)** 에서 현저히 낮은 점수를 기록하여, 진정으로 새롭고 놀라운 발견을 식별하는 데 큰 어려움을 겪고 있음을 시사했습니다.

## AI 실무자를 위한 시사점
현재 LLM은 지식 그래프에서 직접적인 정보 검색에는 강점을 보이지만, **복잡한 다단계 추론** 이나 **예상치 못한 과학적 통찰력** 을 생성하는 데는 아직 한계가 명확합니다. 이는 **과학적 발견을 위한 LLM의 역량 강화** , 특히 **다중 홉 추론** 및 **serendipity 생성** 분야에서 상당한 개선 기회와 연구 방향을 제시합니다. **SerenQA 프레임워크** 와 **RNS 측정 지표** 는 이러한 고급 LLM 능력을 평가하는 데 유용한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.