---
title: "[논문리뷰] A^2Search: Ambiguity-Aware Question Answering with Reinforcement
  Learning"
excerpt: "이 [arXiv]에 게시한 'A^2Search: Ambiguity-Aware Question Answering with Reinforcement
  Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Question Answering
  - Reinforcement Learning
  - Large Language Models
  - Ambiguity Resolution
  - Multi-hop QA
  - Automated Data Generation
  - Tool-Augmented LLMs
  - AnsF1 Reward

permalink: /ai/review/2025-10-10-A2Search-Ambiguity-Aware-Question-Answering-with-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07958)

**저자:** Fengji Zhang, Xinyao Niu, Chengyang Ying, Guancheng Lin, Zhongkai Hao, Fan Zhou, Chengen Huang, Jacky Keung, Bei Chen, Junyang Lin



## 핵심 연구 목표
본 논문은 기존 QA 모델들이 여러 유효한 답변을 허용하는 모호한 질문에 어려움을 겪으며, 단일 정답을 가정하는 벤치마크가 잘못된 훈련 신호를 제공한다는 문제를 해결하고자 합니다. 이를 위해 질문의 모호성을 인식하고 모든 유효한 답변을 생성하도록 모델을 훈련하는, 주석 없는(annotation-free) 종단 간 **강화 학습(RL)** 프레임워크인 **A2SEARCH** 를 제안합니다.

## 핵심 방법론
**A2SEARCH** 는 먼저 **trajectory sampling** 을 통해 여러 검색 가능 LLM에서 다양한 답변 궤적을 수집하는 자동화된 데이터 생성 파이프라인을 사용합니다. 수집된 답변들은 **LLM 기반 검증기** 를 통한 **증거 기반 검증** 을 거치고, 의미적으로 동일한 답변들을 **그룹화** 하여 최종 대안 답변 세트를 구축합니다. 모델은 다중 답변 시나리오에 적합하도록 설계된 **AnsF1 보상** 을 활용하는 **Group Relative Policy Optimization (GRPO)** 으로 최적화됩니다.

## 주요 결과
**A2SEARCH-7B** 는 네 가지 멀티홉 벤치마크(MuSiQue, HotpotQA, 2Wiki, Bamboogle)에서 단일 롤아웃만으로 평균 **AnsF1@1 48.4%** 를 달성하여, 훨씬 큰 **ReSearch-32B(46.2%)** 를 포함한 모든 강력한 베이스라인을 능가했습니다. 특히 **AmbigQA** 벤치마크에서는 외부 데이터 없이 학습되었음에도 불구하고 기존 베이스라인을 뛰어넘는 성능을 보였으며, 7B 모델은 질문당 평균 **1.51개** 의 답변을 생성하며 데이터셋별 모호성 수준에 성공적으로 적응했습니다.

## AI 실무자를 위한 시사점
이 연구는 QA 시스템 개발 시 질문의 **내재된 모호성을 명시적으로 처리** 하는 것이 모델의 신뢰성과 실제 적용 가능성을 높이는 데 결정적인 역할을 함을 시사합니다. **자동화된 데이터 생성 파이프라인** 은 고비용의 수동 주석 없이 다중 답변 QA 데이터셋을 효율적으로 구축할 수 있는 실용적인 대안을 제공합니다. 이는 복잡한 실제 시나리오에서 더욱 강력하고 유연한 RL 기반 LLM 에이전트를 개발하는 데 중요한 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.