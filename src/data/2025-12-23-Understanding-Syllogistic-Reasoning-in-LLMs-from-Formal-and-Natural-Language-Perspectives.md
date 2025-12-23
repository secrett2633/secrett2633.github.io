---
title: "[논문리뷰] Understanding Syllogistic Reasoning in LLMs from Formal and Natural Language Perspectives"
excerpt: "Sujata Ghosh이 [arXiv]에 게시한 'Understanding Syllogistic Reasoning in LLMs from Formal and Natural Language Perspectives' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Syllogistic Reasoning
  - Large Language Models (LLMs)
  - Belief Bias
  - Natural Language Understanding (NLU)
  - Formal Logic
  - Prompt Engineering
  - Self-Consistency
  - Cognitive Psychology

permalink: /ai/review/2025-12-23-Understanding-Syllogistic-Reasoning-in-LLMs-from-Formal-and-Natural-Language-Perspectives/

toc: true
toc_sticky: true

date: 2025-12-23 00:00:00+0900+0900
last_modified_at: 2025-12-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.12620)

**저자:** Aheli Poddar, Saptarshi Sahoo, Sujata Ghosh



## 핵심 연구 목표
본 연구는 LLM의 **연역적 추론 능력** 을 논리적(형식적) 및 직관적(자연어) 관점에서 깊이 이해하는 것을 목표로 합니다. 특히, LLM이 인간의 추론에서 흔히 나타나는 **믿음 편향(belief bias)** 을 보이는지, 아니면 형식 논리 규칙을 우선시하는지 분석하며, 이는 LLM이 인간과 유사한 추론자인지 또는 형식 논리 엔진에 가까운지 판단하기 위함입니다.

## 핵심 방법론
**14개의 최신 LLM** 을 대상으로 **160개의 정언 삼단논법(categorical syllogisms)** 벤치마크를 사용하여 평가했습니다. 논리적 구조와 자연어 의미의 영향을 분리하기 위해 **이중 진실값(dual ground truth) 프레임워크** 를 도입하여 **구문적 유효성(syntactic validity)** 과 **자연어 타당성(natural language believability)** 을 독립적으로 평가했습니다. 또한, **제로샷(Zero-shot), 원샷(One-shot), 퓨샷(Few-shot), 제로샷 CoT(Zero-shot Chain-of-Thought)** 의 **네 가지 프롬프트 전략** 과 **자기 일관성(self-consistency)** 기반의 **적응형 샘플링** 을 적용하여 모델의 반응을 분석했습니다.

## 주요 결과
최상위 LLM(예: **Gemini 2.5 Flash** )은 **99.6%** 에 달하는 **거의 완벽한 구문 정확도** 를 보인 반면, **자연어 이해(NLU) 타당성 판단** 에서는 **52%** 수준으로 무작위 성능에 가까웠습니다. **14개 모델 중 12개** 가 **양의 믿음 편향(+10.81 pp, p = 0.0280)** 을 나타냈으나, 추론 능력이 뛰어난 모델일수록 의미론적 휴리스틱에 대한 의존도가 감소했습니다. 예상과 달리 **퓨샷 프롬프트** 는 **제로샷** 대비 성능을 **유의미하게 저하시켰으며(∆ = -3.57 pp, p = 0.0165*) **, 추론 능력은 ** 모델 아키텍처 및 훈련 방법 **에 크게 의존했습니다.

## AI 실무자를 위한 시사점
현재 LLM은 ** 형식 논리 구조 **를 처리하는 데는 탁월하지만, ** 자연어의 직관적인 타당성 판단 **에는 어려움을 겪는 경향이 있습니다. 이는 LLM이 인간의 추론 방식과는 반대로 ** 형식 논리 엔진 **처럼 작동할 가능성을 시사합니다. 따라서 LLM의 추론 능력을 향상시키기 위해서는 ** 단순한 모델 크기 확장 **보다는 ** 아키텍처 설계와 훈련 데이터셋의 품질 **에 더 집중해야 합니다. 또한, ** 프롬프트 전략 **은 신중하게 선택해야 하며, 특히 ** 퓨샷 프롬프트**가 예상치 못한 성능 저하를 일으킬 수 있음을 인지해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.