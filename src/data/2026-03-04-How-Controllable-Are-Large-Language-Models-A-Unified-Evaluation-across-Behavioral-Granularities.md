---
title: "[논문리뷰] How Controllable Are Large Language Models? A Unified Evaluation across Behavioral Granularities"
excerpt: "arXiv에 게시된 'How Controllable Are Large Language Models? A Unified Evaluation across Behavioral Granularities' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Controllability
  - Hierarchical Benchmark
  - Behavioral Granularity
  - Model Steering
  - Prompt Engineering
  - Activation-based Steering

permalink: /ai/review/2026-03-04-How-Controllable-Are-Large-Language-Models-A-Unified-Evaluation-across-Behavioral-Granularities/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02578)

**저자:** Ziwen Xu, Kewei Xu, Haoming Xu, Haiwen Hong, Longtao Huang, Hui Xue, Ningyu Zhang, Yongliang Shen, Guozhou Zheng, Huajun Chen, Shumin Deng



## 핵심 연구 목표
본 연구는 사회적으로 민감한 영역에 배포되는 **대규모 언어 모델(LLMs)** 의 예측 불가능한 행동(예: 의도 불일치, 일관성 없는 성격 표현)이 초래하는 상당한 위험을 해결하고자 합니다. LLM의 제어 가능성을 행동적 세분화 및 도메인에 걸쳐 통일된 방식으로 평가할 수 있는 계층적 벤치마크인 **SteerEval** 을 도입하여 안전하고 제어 가능한 LLM 동작을 위한 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 언어 기능, 감정, 성격의 세 가지 도메인에 걸쳐 **SteerEval** 벤치마크를 구축했습니다. 각 도메인은 L1(무엇을 표현할지), L2(어떻게 표현할지), L3(어떻게 구현할지)의 **세 가지 명세 수준** 으로 계층화되어 추상적인 의도와 구체적인 텍스트 출력을 연결합니다. **Prompt-based steering** (0-shot, 3-shot) 및 **Activation-based steering** ( **PCA** , **DiffMean** , **RePS** )과 같은 최신 조종 방법들을 **Gemma-2-9B-Instruct** , **Qwen-2.5-7B-Instruct** , **Llama-3.1-8B-Instruct** 모델에 대해 체계적으로 평가했습니다.

## 주요 결과
평가 결과, **Prompt-based steering** 이 모든 모델에서 **Activation-based steering** 보다 전반적으로 우수한 성능을 보였습니다. 특히 **Activation-based steering** 은 미세한 세분화 수준(L1에서 L3로 갈수록)에서 제어 성능이 급격히 저하되는 반면(예: Gemma-2-9B-Instruct에서 L1의 HM **1.67/2.76/2.94** 에서 L3의 **0.05/0.07/1.72** 로 감소), **Prompt-based steering** 은 모든 수준에서 안정적인 성능(HM 약 **3.0** )을 유지했습니다. 또한, 조종 강도를 높이면 **Concept Score** 는 향상되지만 **Instruction Following** 및 **Fluency** 는 저하될 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
**SteerEval** 벤치마크는 LLM 제어 가능성을 평가하는 해석 가능하고 원칙적인 프레임워크를 제공하여 보다 안전하고 예측 가능한 LLM 개발에 기여합니다. AI 실무자들은 현재 **Prompt-based steering** 이 **Activation-based steering** 보다 다양한 세분화 수준에서 더 강력하고 안정적이라는 점을 고려해야 합니다. 미세한 행동 제어를 위해서는 **Activation-based steering** 방법론의 추가적인 발전이 필요하며, 개념 강화와 모델의 일반적인 능력 유지 사이의 균형을 이해하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.