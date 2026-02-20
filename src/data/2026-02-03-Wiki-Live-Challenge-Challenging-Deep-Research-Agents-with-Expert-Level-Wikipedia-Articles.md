---
title: "[논문리뷰] Wiki Live Challenge: Challenging Deep Research Agents with Expert-Level Wikipedia Articles"
excerpt: "arXiv에 게시된 'Wiki Live Challenge: Challenging Deep Research Agents with Expert-Level Wikipedia Articles' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Research Agents
  - LLM Evaluation
  - Wikipedia
  - Good Articles
  - Factuality
  - Writing Quality
  - Benchmark
  - Hallucinations
  - Verifiability

permalink: /ai/review/2026-02-03-Wiki-Live-Challenge-Challenging-Deep-Research-Agents-with-Expert-Level-Wikipedia-Articles/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01590)

**저자:** Shaohan Wang, Benfeng Xu, Licheng Zhang, Mingxuan Du, Chiwei Zhu, Xiaorui Wang, Zhendong Mao, Yongdong Zhang



## 핵심 연구 목표
현재 **Deep Research Agents (DRAs)** 의 평가 방식이 **LLM 생성 참조** 나 단순한 평가 기준으로 인해 전문가 검증의 신뢰성이 부족하고 세밀한 평가가 어렵다는 문제를 해결하고자 합니다. 이 연구는 **Wikipedia Good Articles (GAs)** 를 전문가 수준의 참조로 활용하는 새로운 실시간 벤치마크인 **Wiki Live Challenge (WLC)** 와 포괄적인 평가 프레임워크인 **Wiki Eval** 을 제안하여, DRA의 연구 능력과 글쓰기 품질을 객관적으로 측정하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **100개의 최신 Wikipedia Good Articles (GAs)** 를 수집하여 벤치마크 데이터셋을 구축했습니다. 평가 프레임워크인 **Wiki Eval** 은 두 가지 주요 구성 요소로 이루어집니다. 첫째, **Wiki Writing** 은 Wikipedia의 **Good Article 기준** 에 기반한 **39가지 세부 기준** 으로 글쓰기 품질을 평가하며, **LLM-as-a-Judge (Gemini-2.5-pro)** 방식을 사용합니다. 둘째, **Wiki Fact** 는 생성된 기사의 사실 정확성과 인용된 참조에 대한 검증 가능성을 **Coverage (Cov. Wiki)** 와 **Reference Accuracy (Ref. Acc.)** 의 두 가지 지표로 측정합니다.

## 주요 결과
실험 결과, 현재 DRA와 인간 전문가가 작성한 Wikipedia 기사 사이에는 상당한 격차가 존재함이 드러났습니다. **Wiki Writing** 평가에서 **Gemini-3-pro Deep Research** 와 **LangChain (GPT-5)** 이 가장 우수한 성능을 보였으나, **Wiki Fact** 의 **Coverage** 에서는 가장 좋은 **Gemini-2.5-pro Deep Research** 조차 평균 **30.76%** 의 낮은 커버리지를 기록했습니다. **LangChain (GPT-5)** 는 **Reference Accuracy** 에서 **67.60%** 로 높은 성능을 보였으며, **낮은 충돌률** 을 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 **Deep Research Agents** 가 전문가 수준의 정보 검색, 통합, 그리고 객관적이고 정확한 보고서 작성 능력에서 여전히 상당한 개선이 필요함을 시사합니다. 특히, 사실 커버리지와 세밀한 정보 추출 능력에서 현저한 약점을 보이며, 이는 환각 현상 감소 및 검증 가능성 향상에 대한 중요성을 강조합니다. **WLC** 와 **Wiki Eval** 벤치마크는 DRA 연구자들이 모델의 한계를 명확히 인지하고, 더욱 신뢰성 높고 정교한 AI 시스템을 개발하기 위한 핵심적인 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.