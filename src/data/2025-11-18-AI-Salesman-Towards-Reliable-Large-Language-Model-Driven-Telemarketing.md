---
title: "[논문리뷰] AI-Salesman: Towards Reliable Large Language Model Driven Telemarketing"
excerpt: "Hongyu Lin이 [arXiv]에 게시한 'AI-Salesman: Towards Reliable Large Language Model Driven Telemarketing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Telemarketing
  - Large Language Models
  - Persuasive Dialogue
  - Reinforcement Learning
  - Bayesian Optimization
  - Dynamic Prompting
  - Dialogue Systems

permalink: /ai/review/2025-11-18-AI-Salesman-Towards-Reliable-Large-Language-Model-Driven-Telemarketing/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.12133)

**저자:** Qingyu Zhang, Chunlei Xin, Xuanang Chen, Yaojie Lu, Hongyu Lin, Xianpei Han, Le Sun, Qing Ye, Qianlong Xie, Xingxing Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 겪는 전략적 취약성, 사실적 환각, 맞춤화 부족 문제로 인해 난항을 겪는 **목표 지향적 설득형 대화(예: 텔레마케팅)**의 신뢰성을 향상시키는 것을 목표로 합니다. 특히, 기존 LLM의 한계를 극복하고 실제 판매 시나리오에 효과적인 AI 에이전트를 개발하고자 합니다.

## 핵심 방법론
`AI-Salesman`은 두 가지 핵심 메커니즘을 통합한 **듀얼 스테이지 프레임워크**를 제안합니다. 훈련 단계에서는 **Bayesian-supervised reinforcement learning (GRPO) 알고리즘**을 사용하여 견고한 판매 전략을 학습하며, 추론 단계에서는 **Dynamic Outline-Guided Agent (DOGA)**를 통해 사전 구축된 스크립트 라이브러리에서 동적이고 턴별 전략적 지침을 제공하여 맞춤형 응답을 생성합니다. 또한, 실제 세계 기반의 대화 데이터셋인 **TeleSalesCorpus**를 구축하고 **LLM-as-a-Judge (GPT-4)**를 활용한 포괄적인 평가 프레임워크를 제시합니다.

## 주요 결과
제안된 `AI-Salesman`은 자동 및 인간 평가 모두에서 기준 모델들을 **크게 능가**했습니다. 특히, **SFT 단계를 거치지 않은 직접 RL 최적화**는 기준 모델 대비 **전체 평균 점수 5.46에서 6.49로 18.9% 향상**을 보였습니다. **DOGA**는 비즈니스 분석, 이의 처리, 운영 지침과 같은 복잡한 전략적 역량에서 **최대 14.7%**의 성능 향상을 가져왔으며, **32B 모델**에서 **7.17점**으로 최적의 성능을 달성했습니다. 인간 평가에서는 `AI-Salesman`이 기준 모델 대비 **88.5%**의 선호도를 얻었습니다.

## AI 실무자를 위한 시사점
텔레마케팅과 같은 **고위험 설득형 대화**에서 **추론 인지 강화 학습**과 **동적 프롬프트 생성**이 LLM의 전략적 능력과 사실적 일관성을 크게 향상시킬 수 있음을 보여줍니다. 또한, **도메인 특화된 고품질 데이터셋**과 **스크립트 기반의 지침**을 LLM과 결합하는 하이브리드 접근 방식이 일반 LLM의 한계를 보완하고 실용적인 AI 애플리케이션 개발에 필수적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.