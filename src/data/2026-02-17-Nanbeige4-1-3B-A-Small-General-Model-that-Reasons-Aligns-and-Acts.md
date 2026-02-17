---
title: "[논문리뷰] Nanbeige4.1-3B: A Small General Model that Reasons, Aligns, and Acts"
excerpt: "이 [arXiv]에 게시한 'Nanbeige4.1-3B: A Small General Model that Reasons, Aligns, and Acts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Small Language Model
  - Generalist AI
  - Reasoning
  - Code Generation
  - Agentic Behavior
  - Reinforcement Learning
  - Tool Use
  - Deep Search

permalink: /ai/review/2026-02-17-Nanbeige4-1-3B-A-Small-General-Model-that-Reasons-Aligns-and-Acts/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.13367)

**저자:** Nanbeige LLM Lab, Boss Zhipin



## 핵심 연구 목표
컴팩트한 30억(3B) 파라미터 규모의 모델인 **Nanbeige4.1-3B** 를 개발하여 강력한 에이전트 행동, 코드 생성 및 일반적인 추론 능력을 동시에 달성하는 것을 목표로 합니다. 단일 소규모 언어 모델(SLM) 내에서 이러한 다재다능성을 입증하고, 3B 파라미터 모델의 잠재력을 재정의하고자 합니다.

## 핵심 방법론
연구팀은 향상된 **SFT(Supervised Fine-Tuning)** 레시피와 다단계 **RL(Reinforcement Learning)** 전략을 사용했습니다. 추론 및 정렬을 위해 **점 단위(point-wise) 및 쌍 단위(pair-wise) 보상 모델링** 을 결합하고, 코드 생성에는 정확성 및 효율성을 위한 **복잡도 인식 보상(complexity-aware rewards)** 을 도입했습니다. 또한, 장기적인 도구 상호작용을 위해 **Wiki-graph random walks** 와 **턴-레벨 감독(turn-level supervision)** 을 포함한 복잡한 데이터 합성을 수행하고, **cascaded RL** 파이프라인을 통해 각 영역의 강점을 통합했습니다.

## 주요 결과
**Nanbeige4.1-3B** 는 다양한 벤치마크에서 뛰어난 성능을 보였습니다. 코드 생성에서는 **LiveCodeBench-V6** 에서 **76.9%** (Qwen3-4B 57.4% 대비), **LiveCodeBench-Pro-Easy** 에서 **81.4%** (Qwen3-4B 40.2% 대비)를 달성했으며, 딥 서치 태스크에서는 **GAIA (text-only)** 에서 **69.90%** (Qwen3-4B 28.33% 대비), **xBench-DeepSearch-05** 에서 **75.00%** (Qwen3-4B 34.00% 대비)를 기록했습니다. 특히 **LeetCode Weekly Contest** 에서는 **85.0%** 의 통과율로 1위와 3위를 차지하며, 유사 규모 및 일부 대규모 모델을 능가하는 경쟁력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 3B 파라미터 모델이 광범위한 역량과 강력한 전문성을 동시에 달성할 수 있음을 보여주며, **리소스 제약이 있는 환경** 에서 고성능 AI 에이전트를 개발할 가능성을 제시합니다. **고품질 데이터 합성** , **다단계 RL** , 그리고 **복잡도 및 장기 계획을 고려한 보상 설계** 는 소규모 모델의 범용성을 높이는 핵심 전략으로 활용될 수 있습니다. 이는 **경량화된 AI 모델** 로도 복잡한 추론, 코딩, 도구 사용 작업을 수행할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.