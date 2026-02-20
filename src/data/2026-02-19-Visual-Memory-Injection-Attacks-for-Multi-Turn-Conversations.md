---
title: "[논문리뷰] Visual Memory Injection Attacks for Multi-Turn Conversations"
excerpt: "Matthias Hein이 arXiv에 게시한 'Visual Memory Injection Attacks for Multi-Turn Conversations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LVLM
  - Adversarial Attacks
  - Multi-Turn Conversations
  - Visual Memory Injection
  - Stealthy Attacks
  - Benign Anchoring
  - Context-Cycling

permalink: /ai/review/2026-02-19-Visual-Memory-Injection-Attacks-for-Multi-Turn-Conversations/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15927)

**저자:** Christian Schlarmann, Matthias Hein



## 핵심 연구 목표
본 논문은 대규모 시각-언어 모델(LVLM)의 다중 턴 대화 환경에서의 보안 취약점을 해결하고자 합니다. 기존 단일 턴 공격의 한계를 넘어, **사용자의 의심을 사지 않고** 수많은 무관한 대화 턴 이후에도 특정 트리거 프롬프트에 의해 미리 정의된 악성 응답을 출력하도록 LVLM을 조작하는 **시각적 메모리 주입(VMI) 공격** 을 개발하고 평가하는 것을 목표로 합니다.

## 핵심 방법론
공격자는 이미지에 **인지 불가능한 수준의 미세한 적대적 섭동(`l∞ radius 8/255`)** 을 주입합니다. VMI 공격은 두 가지 핵심 메커니즘을 사용합니다: 첫째, **Benign Anchoring** 은 모델이 일반 프롬프트에 정상적으로 응답하도록 하면서, 동시에 트리거 프롬프트에 대한 악성 응답을 최적화하여 모델의 퇴보를 방지합니다. 둘째, **Context-Cycling** 은 최적화 과정에서 다양한 길이의 대화 컨텍스트를 순환하여 공격이 장기간의 대화에서도 일관되게 효과를 유지하도록 합니다. 공격 최적화에는 **Adaptive Projected Gradient Descent (APGD)** 를 사용합니다.

## 주요 결과
VMI 공격은 여러 최신 공개 LVLM(예: **Qwen2.5-VL-7B-Instruct** , **Qwen3-VL-8B-Instruct** , **LLaVA-OneVision-1.5-8B-Instruct** )에서 **상당한 성공률** 을 달성했습니다. 특히, **25개 이상의 무관한 대화 턴(10,000 토큰 이상)** 이후에도 효과가 지속되었으며, 보지 못한 프롬프트 세트와 **재구성된 프롬프트** 에 대해서도 높은 전이성을 보였습니다. 또한, **Qwen3-VL** 에서 최적화된 적대적 이미지는 **Qwen-SEA-LION-v4-8B-VL** 및 **QoQ-Med3-VL-8B** 와 같은 미세 조정된 모델에서도 높은 성공률로 전이되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LVLM이 다중 턴 대화 환경에서 **정교하고 지속적인 적대적 공격** 에 취약함을 보여주며, 이는 AI 챗봇 및 에이전트의 심각한 보안 위험을 시사합니다. AI 개발자들은 모델 안전성 평가 시 **단일 턴 행동뿐만 아니라 장기 컨텍스트 상호작용** 을 반드시 고려해야 합니다. 특히, 기반 모델에 대한 공격이 미세 조정된 모델에 전이될 수 있다는 점은 **화이트박스 접근을 통한 선제적인 방어 메커니즘 개발** 및 **레드 팀 활동** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.