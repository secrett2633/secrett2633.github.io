---
title: "[논문리뷰] Hail to the Thief: Exploring Attacks and Defenses in Decentralised GRPO"
excerpt: "이 [arXiv]에 게시한 'Hail to the Thief: Exploring Attacks and Defenses in Decentralised GRPO' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Decentralized RL
  - GRPO
  - LLM Post-training
  - Adversarial Attacks
  - Data Poisoning
  - Defense Mechanisms
  - In-context Attack
  - Out-of-context Attack

permalink: /ai/review/2025-11-14-Hail-to-the-Thief-Exploring-Attacks-and-Defenses-in-Decentralised-GRPO/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.09780)

**저자:** Nikolay Blagoev, Oğuzhan Ersoy, Lydia Yiyu Chen



## 핵심 연구 목표
이 논문은 **Large Language Models (LLMs)**의 후처리 훈련에 사용되는 **분산형 Group Relative Policy Optimization (GRPO)** 시스템의 보안 취약점을 탐구합니다. 분산형 환경에서 악의적인 참여자가 어떻게 **양성 모델을 오염**시킬 수 있는지 보여주고, 이에 대응하는 효과적인 방어 메커니즘을 개발하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **인-컨텍스트(in-context)** 및 **아웃-오브-컨텍스트(out-of-context)** 두 가지 유형의 **적대적 공격**을 제시합니다. 공격자는 **verifiable rule-based reward model**을 우회하면서 임의의 악성 토큰을 주입한 완성본을 생성하여 공유함으로써 다른 모델을 오염시킵니다. 방어책으로는 **동일 모델 설정(homogeneous)**에서는 **토큰 생성 로그 확률 확인**을, **이질적 모델 설정(heterogeneous)**에서는 **LLM-as-a-judge (LLaMa 3.1 8B)**를 활용한 완성본 평가를 제안하고 실험했습니다.

## 주요 결과
**아웃-오브-컨텍스트 공격**은 **25% 악의적 참여** 시 **20회 미만의 반복 학습**에서 **최대 100%의 공격 성공률(ASR)**을 달성했습니다. **인-컨텍스트 공격**도 유사하게 높은 성공률을 보였습니다. 제안된 방어 기법 중 **동일 모델 방어**는 "Hail to the thief" 공격에 대해 **100% 탐지율**을, **이질적 모델 방어**는 "2+2=5" 공격에 대해 **95.2% 탐지율**을 기록하며 공격을 효과적으로 차단했습니다.

## AI 실무자를 위한 시사점
본 연구는 **분산형 GRPO 기반 LLM 훈련 시스템**이 **데이터 오염 공격**에 매우 취약함을 경고합니다. 기존의 방어 방식인 **KL-divergence loss**는 효과가 미미하므로, **로그 확률 검증** 또는 **LLM-as-a-judge**와 같은 고급 방어 메커니즘 도입이 필수적입니다. AI 실무자들은 분산 학습 환경에서 모델 보안을 강화하기 위한 강력한 검증 및 필터링 메커니즘의 필요성을 인식해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.