---
title: "[논문리뷰] Fundamental Reasoning Paradigms Induce Out-of-Domain Generalization in Language Models"
excerpt: "Maria Liakata이 [arXiv]에 게시한 'Fundamental Reasoning Paradigms Induce Out-of-Domain Generalization in Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Deduction
  - Induction
  - Abduction
  - Out-of-Domain Generalization
  - Symbolic Reasoning
  - Fine-tuning
  - Upcycling

permalink: /ai/review/2026-02-10-Fundamental-Reasoning-Paradigms-Induce-Out-of-Domain-Generalization-in-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08658)

**저자:** Mingzi Cao, Xingwei Tan, Mahmud Akhter, Maria Liakata, Marco Valentino, Nikolaos Aletras



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 **연역, 귀납, 귀추** 와 같은 근본적인 추론 패러다임을 습득할 때, 세계 지식으로부터 분리된 **상징적 추론 궤적** 을 통해 **도메인 외부(Out-of-Domain) 일반화 능력** 이 어떻게 형성되는지 체계적으로 탐구하는 것을 목표로 합니다. 각 추론 패러다임이 LLM 성능에 미치는 개별적인 영향을 고립시켜 이해하고자 합니다.

## 핵심 방법론
연구팀은 **Llama3.3-70B-IT** 와 **Qwen3-30B-IT** 같은 교사 LLM을 활용하여 **약 17K개의 상징적 문제와 160K개 이상의 추론 궤적** 으로 구성된 새로운 데이터셋을 구축했습니다. 이를 바탕으로 **Llama-3.1-8B-Instruct** 및 **Qwen3-8B** 와 같은 학생 LLM을 **Full FT, LoRA FT, Up-scaling, Upcycling** 등 다양한 유도 방법론으로 학습시켰으며, **상징적 인-도메인 태스크** 와 **실제 OOD 태스크** 모두에서 평가를 수행했습니다.

## 주요 결과
세계 지식과 분리된 근본적인 추론 능력 유도 훈련은 **현실적인 OOD 태스크에서 최대 14.60%** 에 이르는 상당한 성능 향상을 가져왔습니다. 특히 **연역적 추론 능력** 이 가장 높은 OOD 성능 향상과 전이 가능성을 보였으며, **Upcycling** 방법론은 일반적으로 가장 견고한 성능 향상을 제공했습니다. 주목할 점은 학생 LLM이 교사 LLM을 **OOD 현실 태스크** 에서 능가할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **세계 지식에 얽매이지 않는 상징적 추론 궤적** 을 활용하여 LLM의 근본적인 추론 능력을 훈련함으로써, 모델의 **도메인 외부 일반화 능력** 을 크게 향상시킬 수 있습니다. 특히 **연역적 추론** 은 가장 전이 가능한 기술이므로, 이를 중심으로 훈련 전략을 설계하는 것이 효과적일 수 있으며, **Upcycling** 과 같은 구조적 확장 방법을 고려하여 모델의 추론 견고성을 높일 수 있습니다. 이는 제한된 데이터 환경에서도 강력한 추론 능력을 갖춘 LLM을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.