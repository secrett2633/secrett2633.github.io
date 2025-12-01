---
title: "[논문리뷰] Towards General Agentic Intelligence via Environment Scaling"
excerpt: "Guangyu Li이 [arXiv]에 게시한 'Towards General Agentic Intelligence via Environment Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Environment Scaling
  - Function Calling
  - Tool Use
  - Large Language Models
  - Synthetic Data Generation
  - Supervised Fine-tuning

permalink: /ai/review/2025-9-17-Towards-General-Agentic-Intelligence-via-Environment-Scaling/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13311)

**저자:** Runnan Fang, Shihao Cai, Baixuan Li, Jialong Wu, Guangyu Li, Wenbiao Yin, Xinyu Wang, Xiaobin Wang, Liangcai Su, Zhen Zhang, Shibin Wu, Zhengwei Tao, Yong Jiang, Pengjun Xie, Fei Huang, Jingren Zhou



## 핵심 연구 목표
본 논문은 일반 에이전트 지능(General Agentic Intelligence)을 발전시키기 위해 **대규모 언어 모델(LLM)의 함수 호출 능력** 을 향상시키는 것을 목표로 합니다. 특히, 다양한 환경에서 상호작용을 통해 에이전트가 견고한 능력을 개발하도록 돕고, 기존 에이전트 데이터 부족 및 환경 비확장성 문제를 해결하고자 합니다.

## 핵심 방법론
연구팀은 두 단계 파이프라인을 제안합니다. 첫째, **완전히 시뮬레이션된 환경 구축 및 스케일링** 단계에서는 다양한 API를 수집하고 **커뮤니티 탐지(community detection)** 를 통해 도메인으로 조직한 후, **도구 종속성 그래프(tool dependency graph)** 를 모델링하여 도구를 실행 가능한 코드로 구현합니다. 둘째, **에이전트 경험 학습** 단계에서는 시뮬레이션된 인간-에이전트 상호작용을 통해 훈련 데이터를 수집하고, **유효성 제어(validity control), 환경 상태 정렬(environment state alignment), 함수 호출 정확 일치(function calling exact match)** 의 세 단계 필터링을 적용합니다. 에이전트 훈련은 **일반 도메인에서의 기본 능력 학습** 과 **도메인 특화 시나리오에서의 전문화** 를 포함하는 **두 단계 미세 조정(two-phase fine-tuning)** 전략을 사용합니다.

## 주요 결과
제안된 모델인 **AgentScaler** 는 **t-bench, t²-Bench, ACEBench** 와 같은 주요 에이전트 벤치마크에서 오픈 소스 모델 중 최첨단 성능을 달성했습니다. 특히, **AgentScaler-4B** 는 더 적은 파라미터(40억)에도 불구하고 **30B 파라미터 모델** 과 동등한 성능을 보였으며, **AgentScaler-30B-A3B** 는 **ACEBench-zh** 에서 **81.5%의 전체 점수** 를 기록하며 Qwen3-Thinking-30B-A3B를 뛰어넘는 성능을 보여주었습니다. 두 단계 훈련 전략은 모델의 성능을 크게 향상시켰음이 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **확장 가능하고 검증 가능한 에이전트 경험 생성 프레임워크** 를 제공하여, 실제 API 호출의 높은 비용과 수동 개입의 필요성을 줄일 수 있습니다. **AgentScaler-4B 및 8B** 와 같은 경량 모델의 뛰어난 성능은 리소스 제약이 있는 환경에서도 **에이전트 LLM 배포 가능성** 을 높여줍니다. 하지만 **장기적인 도구 호출(long-horizon tool calling)** 은 여전히 어려운 과제로 남아있으며, 이는 향후 연구의 중요한 방향임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.