---
title: "[논문리뷰] QuantAgent: Price-Driven Multi-Agent LLMs for High-Frequency Trading"
excerpt: "Chenyu You이 [arXiv]에 게시한 'QuantAgent: Price-Driven Multi-Agent LLMs for High-Frequency Trading' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - High-Frequency Trading
  - Multi-Agent Systems
  - Large Language Models
  - Technical Analysis
  - Algorithmic Trading
  - Financial Reasoning
  - Price-Driven Signals

permalink: /ai/review/2025-9-15-QuantAgent-Price-Driven-Multi-Agent-LLMs-for-High-Frequency-Trading/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09995)

**저자:** Fei Xiong, Xiang Zhang, Aosong Feng, Siqi Sun, Chenyu You



## 핵심 연구 목표
기존 LLM 기반 금융 시스템이 텍스트 기반 입력에 주로 의존하여 고주파 매매(HFT)의 속도 및 정확성 요구사항에 부적합하다는 한계를 해결하고자 합니다. 본 연구는 순전히 **가격 기반 신호**를 활용하여 HFT에 특화된 최초의 **다중 에이전트 LLM 프레임워크**를 개발하고, 실시간적이고 설명 가능한 의사결정 시스템을 제공하는 것을 목표로 합니다.

## 핵심 방법론
QuantAgent는 트레이딩 프로세스를 **IndicatorAgent, PatternAgent, TrendAgent, RiskAgent**의 네 가지 전문 에이전트로 분해합니다. 각 에이전트는 도메인별 도구와 구조화된 추론 기능을 활용하여 **OHLC(Open, High, Low, Close) 데이터**와 기술적 지표만을 분석하며, 외부 텍스트 데이터에 의존하지 않습니다. **LangGraph** 기반의 워크플로우를 통해 에이전트들이 협력하여 투명하고 인간이 읽을 수 있는 트레이딩 결정을 내리도록 설계되었고, RiskAgent는 **고정된 Stop-Loss 및 Take-Profit 값**을 사용하여 위험을 관리합니다.

## 주요 결과
QuantAgent는 비트코인 및 나스닥 선물 등 10개 금융 상품에 대한 **제로샷 평가**에서 강력한 신경망 및 규칙 기반 베이스라인을 능가하는 **우수한 예측 정확도**와 **누적 수익률**을 입증했습니다. 특히 주식 시장에서 높은 성과를 보였으며, SPX에서 **59.0%**, QQQ에서 **50.4%**의 **방향 정확도 개선**을 달성했고, 최대 **80%의 방향 정확도**를 기록했습니다. 위험 관리 설정(Rsim) 하에서도 큰 손실을 수익으로 전환하는 등 **안정적인 수익성**을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM의 고급 추론 능력**과 **구조화된 금융 지표**를 결합하여 고주파 금융 시장에서 실용적이고 설명 가능한 트레이딩 시스템을 구축할 수 있음을 보여줍니다. 텍스트 데이터의 지연 및 노이즈 문제를 회피하고 **순수 가격 데이터**만으로 의사결정을 내리는 접근 방식은 데이터 수집 및 처리의 복잡성을 줄일 수 있습니다. **다중 에이전트 아키텍처**는 복잡한 금융 분석을 모듈화하고 해석 가능성을 높이는 데 효과적인 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.