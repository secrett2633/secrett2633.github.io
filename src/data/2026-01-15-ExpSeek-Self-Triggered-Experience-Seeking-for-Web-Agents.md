---
title: "[논문리뷰] ExpSeek: Self-Triggered Experience Seeking for Web Agents"
excerpt: "이 [arXiv]에 게시한 'ExpSeek: Self-Triggered Experience Seeking for Web Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Experience Seeking
  - Self-Triggered
  - LLM Reasoning
  - Entropy
  - Proactive Guidance
  - Reinforcement Learning
  - Foundation Models

permalink: /ai/review/2026-01-15-ExpSeek-Self-Triggered-Experience-Seeking-for-Web-Agents/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08605)

**저자:** Wenyuan Zhang¹², Xinghua Zhang³, Haiyang Yu³, Shuaiyi Nie1,2, Bingli Wu³, Juwei Yue1,2, Tingwen Liu1,2*, Yongbin Li³*



## 핵심 연구 목표
기존 웹 에이전트들이 경험을 수동적으로 전역 컨텍스트로 주입하여 동적으로 변하는 환경에서 비효율적인 탐색과 신뢰할 수 없는 응답을 생성하는 문제를 해결하고자 합니다. 특히 소규모 LLM 기반 에이전트의 의사 결정 오류를 줄이기 위해, 에이전트가 환경과 상호작용하는 동안 **단계별로 경험을 능동적으로 탐색** 하여 보다 정확한 지침을 얻는 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 **ExpSeek** 이라는 자가 트리거 경험 탐색 프레임워크를 제안합니다. 이 방법론은 모델의 내재적 신호인 **단계별 엔트로피 임계값** 을 **로지스틱 회귀** 및 **부트스트랩 리샘플링** 을 통해 추정하여 경험 개입 시점을 결정합니다. 또한, 성공 및 실패 궤적 쌍에서 추출한 (오류 동작, 실수 분석, 교정 큐) **경험 트리플릿** 으로 구성된 **경험 기반** 을 구축하고, **Qwen3-235B-A22B-Instruct-2507** 모델을 활용하여 상황에 맞는 맞춤형 지침을 동적으로 생성합니다.

## 주요 결과
**Qwen3-8B** 및 **Qwen3-32B** 모델에 대한 실험 결과, 각각 **9.3%** 및 **7.5%** 의 절대 성능 향상을 달성했습니다. 이는 기존의 수동적 경험 주입 방식인 **Training-Free GRPO** 및 **REASONINGBANK+** 보다 각각 **6.7%** 및 **6.0%** 높은 성능입니다. 특히, 소규모 **4B** 경험 모델이 더 큰 **32B** 에이전트 모델의 성능을 **5.2%** 및 **9.7%** 포인트 향상시킬 수 있음을 입증하며, 엔트로피가 효과적인 자가 트리거 신호임을 확인했습니다.

## AI 실무자를 위한 시사점
**ExpSeek** 은 웹 에이전트 개발에서 수동적 경험 주입에서 **능동적이고 단계별 경험 탐색** 으로의 패러다임 전환 가능성을 제시합니다. 모델의 **엔트로피** 를 활용한 자가 트리거링은 추가적인 보상 모델 없이도 개입 시점을 효율적으로 결정할 수 있어 실제 배포 시 비용 효율성을 높입니다. 또한, 작은 규모의 **경험 모델** 이 더 큰 에이전트 모델의 성능을 향상시키는 "약자로부터 강자에게" 지침 전략의 잠재력을 보여주어 자원 제약이 있는 환경에서도 활용 가능성이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.