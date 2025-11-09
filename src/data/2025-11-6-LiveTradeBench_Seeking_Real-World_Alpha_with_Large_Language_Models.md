---
title: "[논문리뷰] LiveTradeBench: Seeking Real-World Alpha with Large Language Models"
excerpt: "Jiaxuan You이 [arXiv]에 게시한 'LiveTradeBench: Seeking Real-World Alpha with Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Live Trading
  - Portfolio Management
  - Financial AI
  - Prediction Markets
  - Real-World Uncertainty
  - Agent Benchmarking

permalink: /ai/review/2025-11-6-LiveTradeBench_Seeking_Real-World_Alpha_with_Large_Language_Models/

toc: true
toc_sticky: true

date: 2025-11-09 21:54:30+0900
last_modified_at: 2025-11-09 21:54:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03628)

**저자:** Haofei Yu, Fenghai Li, Jiaxuan You



## 핵심 연구 목표
본 논문은 기존의 정적 벤치마크로는 평가하기 어려운 LLM 에이전트의 **실제 시장에서의 의사결정 능력**과 **불확실성 하의 적응성**을 평가하기 위한 라이브 트레이딩 환경을 구축하는 것을 목표로 합니다. 특히, LLM의 일반적인 추론 능력이 실제 금융 시장에서의 성능으로 이어지는지 검증하고자 합니다.

## 핵심 방법론
저자들은 **LiveTradeBench**라는 실시간 트레이딩 환경을 도입했습니다. 이는 **라이브 데이터 스트리밍** (시장 가격, 뉴스), **포트폴리오 관리 추상화** (다중 자산 할당, 리스크 관리), 그리고 **다중 시장 평가** (미국 주식, 폴리마켓 예측 시장)의 세 가지 설계 원칙을 따릅니다. 에이전트는 **ReAct 스타일 프레임워크**를 기반으로 **도구 사용, 기억, 추론** 기능을 활용하여 의사결정을 수행하며, **21개 LLM**에 대해 **50일간의 실시간 평가**를 진행했습니다.

## 주요 결과
평가 결과, **높은 LMArena 점수**가 우수한 트레이딩 성과로 이어지지 않음을 확인했습니다. 특히, 폴리마켓에서 LMArena 점수와 Sharpe ratio 간의 **상관관계는 -0.38**을 기록했습니다. **GPT-4.1**은 주식 시장에서 **가장 높은 누적 수익률 (> 6%)**을 달성했으나, 폴리마켓에서는 저조한 성과를 보였습니다. 롤링-k 델타 분석을 통해 LLM 에이전트가 시장 신호에 적응하며, **폴리마켓에서 k가 증가할수록 성능이 2%씩 저하**됨을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 정적 벤치마크 성능과 실제 금융 시장에서의 역량 사이에 **명확한 격차**가 있음을 시사합니다. AI 엔지니어는 금융 AI 개발 시 **라이브 데이터, 동적 환경 적응, 리스크 관리** 등을 고려한 **시장별 특화 전략**과 **지속적인 학습 및 적응 메커니즘**의 중요성을 인지해야 합니다. 단순히 일반적인 LLM 성능이 아닌, **실시간 의사결정 및 불확실성 대응 능력**을 평가하는 벤치마크의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.