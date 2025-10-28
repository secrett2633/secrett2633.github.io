---
title: "[논문리뷰] Code Aesthetics with Agentic Reward Feedback"
excerpt: "Yupan Huang이 [arXiv]에 게시한 'Code Aesthetics with Agentic Reward Feedback' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Aesthetics
  - Agentic Reward Feedback
  - Large Language Models
  - Reinforcement Learning
  - Instruction Tuning
  - Webpage Design
  - Multimodal Evaluation

permalink: /ai/review/2025-10-28-Code_Aesthetics_with_Agentic_Reward_Feedback/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23272)

**저자:** Bang Xiao, Lingjie Jiang, Shaohan Huang, Tengchao Lv, Yupan Huang, Xun Wu, Lei Cui, Furu Wei



## 핵심 연구 목표
대규모 언어 모델(LLM)이 시각 지향적인 코딩 작업(예: 차트 생성, 웹페이지 디자인)에서 종종 최적화되지 않은 미학적 결과물을 생성하는 문제를 해결하고자 합니다. 기존의 코드 생성 LLM 학습을 위한 보상 방법이 시각적 미학 평가에 효과적이지 않다는 한계를 극복하여, LLM이 생성한 코드의 미학적 품질을 향상시키는 새로운 파이프라인을 제시하는 것이 주된 연구 목표입니다.

## 핵심 방법론
먼저 코드 미학에 초점을 맞춘 대규모 명령 튜닝 데이터셋인 **AesCode-358K**를 구축했습니다. 이어서, 코드 **실행 가능성**, **정적 미학**, **대화형 미학**을 평가하는 다중 에이전트 시스템인 **agentic reward feedback**을 제안했습니다. 이 보상 신호는 **GRPO** 알고리즘과 통합되어 기능성과 코드 미학을 공동으로 최적화하는 **GRPO-AR** 방법론을 개발했습니다. 웹페이지 미학 평가를 위한 새로운 벤치마크인 **OpenDesign**도 구축하여 방법론의 효과를 검증했습니다.

## 주요 결과
**AesCode-358K**를 통한 지도 학습과 **agentic reward feedback**을 활용한 강화 학습을 결합한 결과, **OpenDesign** 및 기존 **PandasPlotBench** 벤치마크에서 성능이 크게 향상되었습니다. 특히, 저희의 **AesCoder-4B** 모델은 **GPT-4o** 및 **GPT-4.1**을 능가하며, **480B-685B** 매개변수를 가진 대규모 오픈소스 모델들과 필적하는 성능을 달성했습니다. 이 결과는 제안된 접근 방식의 효과성과 미학적 품질 향상 능력을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 LLM이 시각적 요소를 포함하는 코드를 생성할 때 미학적 품질을 효과적으로 개선할 수 있는 구체적인 방법론을 제공합니다. 다중 에이전트 기반의 **종합적인 보상 시스템**은 LLM 코드 생성의 기능적 정확성과 인간이 인지하는 미학적 품질을 동시에 최적화하는 데 중요한 역할을 합니다. 개발된 **AesCode-358K** 데이터셋과 **OpenDesign** 벤치마크는 LLM 기반의 시각적 코드 생성 연구 및 애플리케이션 개발에 있어 가치 있는 자원으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.