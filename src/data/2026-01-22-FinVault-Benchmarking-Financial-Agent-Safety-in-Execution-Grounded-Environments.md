---
title: "[논문리뷰] FinVault: Benchmarking Financial Agent Safety in Execution-Grounded Environments"
excerpt: "arXiv에 게시된 'FinVault: Benchmarking Financial Agent Safety in Execution-Grounded Environments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Financial AI Agents
  - Security Benchmark
  - Execution-Grounded
  - LLM Safety
  - Prompt Injection
  - Jailbreaking
  - Compliance
  - Vulnerability Assessment

permalink: /ai/review/2026-01-22-FinVault-Benchmarking-Financial-Agent-Safety-in-Execution-Grounded-Environments/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07853)

**저자:** Zhi Yang, Runguo Li, Qiqi Qiang, Jiashun Wang, Fangqi Lou, Mengping Li, Dongpo Cheng, Rui Xu, Heng Lian, Shuo Zhang, Xiaolong Liang, Xiaoming Huang, Zheng Wei, Zhaowei Liu, Xin Guo, Huacan Wang, Ronghao Chen, Liwen Zhang



## 핵심 연구 목표
금융 에이전트(LLM 기반)가 투자 분석, 위험 평가, 자동화된 의사결정 등 고위험 및 고규제 환경에서 새로운 보안 위험을 초래하는 문제를 해결하고자 합니다. 기존 안전성 평가가 언어 모델 수준의 콘텐츠 준수나 추상적인 에이전트 설정에만 초점을 맞춰 실제 운영 워크플로우와 상태 변경 작업에서 발생하는 실행 기반 위험을 포착하지 못하는 한계를 극복하고, **금융 에이전트의 실행 기반 보안을 벤치마킹하는 최초의 시스템** 을 구축하는 것이 목표입니다.

## 핵심 방법론
본 연구는 `FINVAULT`라는 벤치마크를 제안하며, 이는 **31개의 규제 중심 샌드박스 시나리오** 와 **상태 쓰기 가능한 데이터베이스** , 그리고 명시적인 규제 제약 조건을 포함합니다. **107가지의 실제 취약점** 과 **프롬프트 인젝션** , **탈옥(Jailbreaking)** , **금융 적응형 공격** 을 포함하는 **963개의 테스트 케이스** 를 구축하여 공격과 양성 입력을 체계적으로 커버합니다. **공격 성공률(ASR)** , **오탐률(FPR)** 및 토큰 소비량을 지표로 사용하여 **DeepSeek-V3.2, Qwen3-Max, Claude-Haiku-4.5** 등 다양한 주류 LLM과 **GPT-OSS-Safeguard, LLaMA Guard 3/4** 와 같은 방어 모델의 안전 성능을 평가합니다.

## 주요 결과
실험 결과, 기존 방어 메커니즘은 현실적인 금융 에이전트 환경에서 여전히 비효율적이며, 최신 모델에서도 평균 **공격 성공률(ASR)이 최대 50.0%** 에 달했습니다. 가장 견고한 시스템( **Claude-Haiku-4.5** )에서도 ASR이 **6.7%** 로 나타나, 현재 안전 설계의 제한적인 전이성을 보여주었습니다. 특히, **역할 연기(Role-Playing)** 공격은 Qwen3-Max에서 **64.50%** 의 ASR을 기록하는 등 기술적 공격보다 의미론적 공격이 훨씬 효과적임을 입증했습니다. 방어 모델 중 **LLaMA Guard 4** 는 가장 높은 **TPR 61.10%** 를 달성했으나, **FPR 29.91%** 로 높은 오탐률을 보였습니다.

## AI 실무자를 위한 시사점
금융 AI 에이전트의 안전성을 확보하기 위해서는 일반적인 LLM 안전성 정렬을 넘어선 **강력한 금융 도메인 특화 방어 메커니즘** 개발이 시급합니다. 특히, **프롬프트 명령어 격리(instruction isolation)** 및 **의미론적 공격** 에 대한 취약성이 높으므로, 시스템 프롬프트 설계 시 명확한 규칙과 경계 설정을 엄격히 적용해야 합니다. 다중 턴 상호작용에서 발생하는 **컨텍스트 신뢰 축적 위험** 을 인지하고, 지속적인 모니터링과 실시간 위험 평가를 통해 금융 환경의 고유한 요구사항을 충족하는 안전 시스템을 구축해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.