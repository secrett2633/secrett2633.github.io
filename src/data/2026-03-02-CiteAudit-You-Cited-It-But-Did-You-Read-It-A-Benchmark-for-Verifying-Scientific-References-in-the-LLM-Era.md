---
title: "[논문리뷰] CiteAudit: You Cited It, But Did You Read It? A Benchmark for Verifying Scientific References in the LLM Era"
excerpt: "[arXiv]에 게시된 'CiteAudit: You Cited It, But Did You Read It? A Benchmark for Verifying Scientific References in the LLM Era' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Hallucination
  - Citation Verification
  - Multi-Agent System
  - Benchmark
  - Fact Checking
  - Scientific Integrity
  - Information Retrieval
  - Qwen3-VL

permalink: /ai/review/2026-03-02-CiteAudit-You-Cited-It-But-Did-You-Read-It-A-Benchmark-for-Verifying-Scientific-References-in-the-LLM-Era/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23452)

**저자:** Zhengqing Yuan, Kaiwen Shi, Zheyuan Zhang, Lichao Sun, Nitesh V. Chawla, Yanfang Ye



## 핵심 연구 목표
대규모 언어 모델(LLM)이 생성하는 그럴듯하지만 실제로는 존재하지 않는 **참고문헌 환각(hallucinated references)** 문제를 해결하는 것을 목표로 합니다. 기존 자동화 도구의 취약성과 표준화된 평가 부재라는 한계를 극복하기 위해, LLM 시대의 과학 문헌 검증을 위한 포괄적인 벤치마크와 탐지 프레임워크를 구축하는 것을 주요 연구 목적으로 합니다.

## 핵심 방법론
본 논문은 인용문 검증을 여러 협력 단계로 분해하는 **멀티-에이전트 검증 파이프라인** 을 제안합니다. 이 파이프라인은 **Claim Extractor** , **Retriever** , **Passage Matcher** , **Contextual Reasoner** , **Calibrated Judge** 에이전트로 구성됩니다. 특히, **Qwen3-VL-235B A22 모델** 을 기반으로 하는 **Extractor Agent** 는 PDF에서 인용 메타데이터를 추출하고, **Judge Agent** 는 **Strict Consistency Criterion (Sc)** 에 따라 추출된 메타데이터와 검색된 증거의 일치 여부를 판정합니다. **Memory Agent** 의 고속 조회와 **Web Search Agent** , **Scholar Agent** 의 계층적 검색은 신뢰성과 효율성을 동시에 확보합니다.

## 주요 결과
제안된 **CiteAudit 프레임워크** 는 생성된 벤치마크에서 **정확도 0.973, F1 점수 0.968** 을, 실세계 벤치마크에서 **정확도 0.972, F1 점수 0.903** 를 달성하며 모든 최신 LLM 기반 모델들을 크게 능가했습니다. 특히, **실제 환각 인용문을 놓치지 않는 완벽한 재현율(Recall 1.000)** 을 보였습니다. 또한, **Scholar Agent** 와 **Judge Agent** 의 중요성을 ablation study를 통해 입증하였으며, 상업용 LLM 기반 솔루션 대비 **경쟁력 있는 런타임(10개 레퍼런스당 2.3초)과 제로 비용** 이라는 뛰어난 효율성을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 환각된 참고문헌 문제에 대한 **신뢰할 수 있고 투명한 검증 솔루션** 을 제공하며, LLM 기반 시스템의 **인용 무결성 보장** 에 기여합니다. 특히, 본 프레임워크는 연구자, 리뷰어 및 출판사가 과학 문헌의 신뢰성을 강화하는 데 활용될 수 있는 실용적인 도구입니다. **다단계 에이전트 아키텍처** 는 복잡한 검증 작업을 효율적으로 처리하며, **정확도와 비용 효율성** 모두를 개선하여 실제 AI 애플리케이션에 큰 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.