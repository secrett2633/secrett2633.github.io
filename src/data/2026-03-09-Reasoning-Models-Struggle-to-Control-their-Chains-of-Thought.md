---
title: "[논문리뷰] Reasoning Models Struggle to Control their Chains of Thought"
excerpt: "arXiv에 게시된 'Reasoning Models Struggle to Control their Chains of Thought' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chain-of-Thought (CoT)
  - Model Controllability
  - AI Safety
  - Monitorability
  - Large Language Models (LLMs)
  - Reinforcement Learning (RL)
  - Evaluation Suite

permalink: /ai/review/2026-03-09-Reasoning-Models-Struggle-to-Control-their-Chains-of-Thought/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05706)

**저자:** Chen Yueh-Han, Robert McCarthy, Bruce W. Lee, He He, Ian Kivlichan, Bowen Baker, Micah Carroll, Tomek Korbak



## 핵심 연구 목표
본 논문은 최신 추론 모델이 자신의 CoT (Chain-of-Thought)를 '의도적으로' 제어하여 모니터링을 회피할 수 있는 능력, 즉 **CoT controllability** 를 측정하고 분석하는 것을 목표로 합니다. 이는 CoT 모니터링이 AI 시스템의 오작동 및 오정렬을 탐지하는 유망한 방법이지만, 모델이 자신의 추론 과정을 조작할 수 있다면 그 효과가 저해될 수 있다는 우려에서 비롯됩니다.

## 핵심 방법론
연구팀은 **CoT-Control 평가 스위트** 를 도입하여, 모델이 특정 단어를 사용하지 않거나, 특정 형식으로 추론하는 등 CoT 지침을 따르면서 문제를 해결하도록 요구합니다. 이 스위트는 **GPQA, MMLU-Pro, Humanity's Last Exam** 등 다양한 벤치마크의 **14,076개 문제** 로 구성되며, **억제(suppression), 추가(addition), 스타일 수정(stylistic modification)** 세 가지 유형의 지침을 포함합니다. 또한, 상황 인식, 자동화된 레드 팀 공격, 반복 시도와 같은 적대적 시나리오에서 모델의 CoT controllability를 평가했습니다.

## 주요 결과
추론 모델은 출력 제어에 비해 자신의 CoT를 제어하는 데 **훨씬 낮은 성공률** 을 보였습니다. 예를 들어, **Claude Sonnet 4.5** 는 CoT를 **2.7%** 만 제어했지만, 최종 출력은 **61.9%** 제어했습니다. **대규모 오픈소스 모델** 일수록 CoT controllability가 높아지는 경향을 보였으나, **RL 훈련이 증가** 함에 따라 CoT controllability는 **크게 감소** 했습니다 (OLMo-3-7B-RL-Zero-Math에서 **10배 이상 감소** ). 추론 노력 증가 및 작업 난이도 상승도 controllability를 저하시켰으며, 적대적 프롬프트 최적화는 효과적이지 않았습니다.

## AI 실무자를 위한 시사점
현재 LLM들이 CoT를 효과적으로 제어하지 못한다는 발견은 **CoT 모니터링이 여전히 강력한 AI 안전 메커니즘** 임을 시사합니다. 하지만 모델 크기 증가 및 RL 훈련이 CoT controllability에 영향을 미칠 수 있으므로, AI 개발자들은 **CoT-Control** 과 같은 평가 도구를 활용하여 미래 모델의 **CoT controllability를 지속적으로 추적** 해야 합니다. 특히 **RL 훈련이 CoT controllability를 감소** 시키는 경향을 고려하여, 모델 학습 과정에서 CoT의 투명성을 유지하기 위한 전략적 접근이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.