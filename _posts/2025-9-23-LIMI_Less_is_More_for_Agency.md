---
title: "[논문리뷰] LIMI: Less is More for Agency"
excerpt: "happyZYM이 [arXiv]에 게시한 'LIMI: Less is More for Agency' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agency
  - Data Curation
  - Less Is More
  - Agentic Intelligence
  - Foundation Models
  - Evaluation Benchmark
  - Efficiency Principle
  - Large Language Models

permalink: /ai/review/2025-9-23-LIMI_Less_is_More_for_Agency/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17567)

**저자:** happyZYM, evanlin2570, weizhihao1, mhjiang0408, YangXiao-nlp



## 핵심 연구 목표
현재 AI 에이전트 개발이 대규모 데이터가 더 나은 에이전시를 가져온다는 기존 스케일링 법칙을 따르는 한계를 극복하는 것을 목표로 합니다. **LIMI (Less Is More for Intelligent Agency)** 접근 방식을 통해, 정교한 에이전트 지능이 최소한의 전략적으로 선별된 데모로부터도 발현될 수 있음을 입증하고, '에이전시 효율성 원칙'을 확립하고자 합니다.

## 핵심 방법론
본 연구는 협업 소프트웨어 개발 및 과학 연구 워크플로우에 중점을 두고 **78개의 엄선된 학습 샘플**을 사용한 **LIMI**를 제안합니다. 주요 방법론으로는 **인간-AI 협업 쿼리 수집**, **고급 LLM (예: GPT-5)을 활용한 GitHub PR 기반 쿼리 합성**, 그리고 **SII CLI 환경**에서 전체 멀티턴 상호작용 시퀀스를 캡처하는 **체계적인 궤적 수집 프로토콜**을 포함합니다. 이는 실제적인 에이전트 행동 패턴과 학습 신호를 밀도 높게 담보합니다.

## 주요 결과
**LIMI**는 **AgencyBench**에서 **73.5%**의 성능을 달성하여, **GLM-4.5 (45.1%)**, **Kimi-K2-Instruct (24.1%)**, **DeepSeek-V3.1 (11.9%)** 등 최첨단 모델들을 크게 능가했습니다. 특히 **78개의 훈련 샘플**만으로 **10,000개 샘플**로 훈련된 모델 대비 **53.7%의 성능 향상**을 보이며, **128배 적은 샘플**로 우수한 에이전트 지능을 달성했습니다. 이는 기계 자율성이 데이터 풍부함이 아닌 전략적인 고품질 데모 큐레이션에서 비롯되는 '에이전시 효율성 원칙'을 확립합니다.

## AI 실무자를 위한 시사점
이 연구는 에이전트 AI 개발에서 전통적인 데이터 스케일링 패러다임에 근본적인 도전을 제기합니다. AI 실무자들은 더 이상 방대한 데이터 축적에 집중하기보다, 고품질의 전략적으로 큐레이션된 에이전트 데모와 상호작용 궤적을 설계하는 데 초점을 맞춰야 합니다. 이는 에이전트 AI 개발의 지속 가능성을 높이고, "생각하는 AI"에서 "일하는 AI"로의 전환에 중요한 효율성 향상을 가져올 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.