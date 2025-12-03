---
title: "[논문리뷰] CodeV: Code with Images for Faithful Visual Reasoning via Tool-Aware Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'CodeV: Code with Images for Faithful Visual Reasoning via Tool-Aware Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Agentic Reasoning
  - Tool Use
  - Reinforcement Learning
  - Faithfulness Evaluation
  - Policy Optimization
  - Visual Search
  - Code Generation

permalink: /ai/review/2025-12-03-CodeV-Code-with-Images-for-Faithful-Visual-Reasoning-via-Tool-Aware-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19661)

**저자:** Xinhai Hou, Shaoyuan Xu, Manan Biyani, Moyan Li, Jia Liu, Todd C. Hollon, Bryan Wang



## 핵심 연구 목표
본 논문은 에이전트 시각-언어 모델(VLMs)이 높은 최종 답변 정확도에도 불구하고 종종 "불성실한" 시각적 추론을 수행하는 문제를 해결하고자 합니다. 모델이 관련 없는 영역에 도구를 사용하거나 도구 출력을 무시하면서도 정답을 추측하는 현상이 발생하는바, 중간 시각 도구 출력이 질의된 증거를 실제로 포함하는지 측정하는 '신뢰성 프로토콜'을 제안하고, 도구 출력에 기반한 '성실한 추론'을 촉진하는 새로운 학습 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **Tool-Aware Policy Optimization (TAPO)** 이라는 새로운 정책 최적화 방법을 도입하며, 이는 **GRPO** 를 **dense process rewards** 로 강화합니다. **TAPO** 는 시각적 도구를 실행 가능한 **Python 코드** 로 표현하고, 질문과 도구 출력을 기반으로 스텝별 보상을 부여하여 필수적이고 증거와 일치하는 도구 사용을 장려합니다. 또한, 모델의 추론이 도구 출력에 얼마나 충실한지 평가하기 위해 **GPT-4o** 를 Judge로 활용하여 중간 크롭 이미지에 질의된 객체가 포함되어 있는지 확인하는 **신뢰성 평가 프로토콜** 을 제안합니다.

## 주요 결과
**CodeV-7B** 모델은 시각 검색 벤치마크에서 **Pixel-Reasoner** 및 **DeepEyes** 대비 **두 자릿수 이상** 의 충실도 향상을 달성했으며, 특정 설정에서는 **30점 이상** 개선되었습니다. 동시에 **VLMBlinds** 에서 **46.6%** , **V***에서 **84.8%** , **MathVista** 에서 **71.8%** 등 10개의 벤치마크에서 경쟁력 있거나 우수한 정확도를 유지하거나 향상시켰습니다. 특히 **V*** 벤치마크에서는 **GPT-4o** 의 **64.4%** 대비 **84.8%** 로 크게 우수했습니다.

## AI 실무자를 위한 시사점
본 연구는 **VLM** 의 "불성실한" 추론 문제를 해결하기 위한 **실용적인 방법론** 을 제공하며, **tool-aware policy optimization** 이 모델의 **해석 가능성** 과 **신뢰성** 을 크게 향상시킬 수 있음을 보여줍니다. **LLM 기반 Judge 모델** 을 활용한 **스텝-레벨 보상 설계** 는 희소하거나 해킹에 취약한 기존 보상 방식을 보완하는 효과적인 전략으로, 다양한 에이전트 시스템에 적용 가능합니다. 이는 특히 복잡한 시각적 추론 작업에서 **증거 기반의 도구 사용** 을 통해 **신뢰할 수 있는 에이전트 시스템** 을 구축하는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.