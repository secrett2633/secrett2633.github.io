---
title: "[논문리뷰] Magentic Marketplace: An Open-Source Environment for Studying Agentic
  Markets"
excerpt: "이 [arXiv]에 게시한 'Magentic Marketplace: An Open-Source Environment for Studying Agentic
  Markets' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Markets
  - Multi-Agent Systems
  - Large Language Models (LLMs)
  - Simulation Environment
  - Open-Source Platform
  - Market Mechanism Design
  - Behavioral Biases
  - Manipulation Resistance

permalink: /ai/review/2025-10-31-Magentic-Marketplace-An-Open-Source-Environment-for-Studying-Agentic-Markets/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25779)

**저자:** Gagan Bansal, Wenyue Hua, Zezhou Huang, Adam Fourney, Amanda Swearngin, Will Epperson, Tyler Payne, Jake M. Hofman, Brendan Lucier, Chinmay Singh, Markus Mobius, Akshay Nambi, Archana Yadav, Kevin Gao, David M. Rothschild, Aleksandrs Slivkins, Daniel G. Goldstein, Hussein Mozannar, Nicole Immorlica, Maya Murad, Matthew Vogel, Subbarao Kambhampati, Eric Horvitz, Saleema Amershi



## 핵심 연구 목표
본 논문은 LLM 에이전트가 중재하는 경제적 의사결정 환경에서 에이전트의 행동과 가치를 이해하기 위한 연구를 목표로 합니다. 기존의 제한적인 환경 연구에서 나아가, 복잡하고 동적인 **실제 시장 조건** 에서 에이전트의 행동을 안전하게 연구할 수 있는 **개방형 시뮬레이션 환경** 을 개발하는 것이 주요 목적입니다. 특히, 소비자를 대변하는 **Assistant 에이전트** 와 경쟁 사업체를 대변하는 **Service 에이전트** 간의 **양면 에이전트 시장** 상호작용을 탐구합니다.

## 핵심 방법론
연구진은 에이전트 시장 연구를 위한 **오픈 소스 시뮬레이션 환경** 인 **Magentic Marketplace** 를 개발했습니다. 이 환경은 **HTTP/REST 클라이언트-서버 아키텍처** 를 기반으로 하며, 등록(`register`), 프로토콜(`protocol`), 액션(`action`)의 **세 가지 핵심 엔드포인트** 를 통해 에이전트 간 상호작용을 조율합니다. 액션 공간은 검색(`Search`), 텍스트 메시지 전송(`Send Text Messages`), 주문 제안(`Send Order Proposals`), 결제(`Send Payments`), 메시지 수신(`Receive Messages`)을 포함하여 완전한 거래 라이프사이클을 지원합니다. 실험은 **멕시칸 레스토랑 및 계약자 도메인** 의 **합성 데이터** 를 활용하여 **GPT-4o, GPT-4.1, GPT-5, Gemini-2.5-Flash** 등 다양한 상용 LLM과 **OpenAI OSS-20b, Qwen3-14b** 와 같은 오픈 소스 모델을 평가했습니다.

## 주요 결과
**최적의 검색 조건** 에서는 최신 모델이 **최적의 복지 수준** 에 근접하지만, 시장 규모가 커질수록 성능이 급격히 저하되었습니다. 흥미롭게도 검색 결과 옵션이 많아질수록 소비자 후생이 감소하는 **'선택의 역설' 현상** 이 관찰되었으며, **GPT-4o** 는 검색 결과 100개 대비 3개일 때 소비자 후생이 **4.3% 감소** 했습니다. 모든 모델은 **심각한 초기 제안 편향** 을 보였는데, 첫 번째 제안이 **60-100%** 의 선택률을 기록하여 응답 속도가 품질보다 **10-30배** 유리했습니다. **GPT-4.1, Sonnet-4.5, Gemini-2.5-Flash** 와 같은 최신 모델은 조작 전략에 대해 **강력한 저항성** 을 보였으나, **GPT-4o, GPT-OSS-20B, Qwen3-4B-2507** 은 프롬프트 인젝션 공격 등 여러 공격 벡터에 **유의미한 취약점** 을 드러냈습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 에이전트 기반 시장 설계 시 **검색 메커니즘, 에이전트 간 통신 프로토콜, 조작 방어 시스템** 에 대한 심층적인 고려가 필수적임을 시사합니다. 특히, **초기 제안 편향** 은 에이전트가 제안을 제대로 비교하지 않고 첫 제안에 만족하는 경향을 보여, 시장에서 응답 속도에만 과도하게 집중하게 만들 수 있으므로 **의사결정 프로세스 개선** 이 중요합니다. **Magentic Marketplace** 는 오픈 소스 플랫폼으로서 다양한 에이전트 아키텍처와 시장 설계를 실험하고, **인간-AI 상호작용, 동적 시장 효과** 등 현실적인 시나리오를 연구하는 데 유용한 도구입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.