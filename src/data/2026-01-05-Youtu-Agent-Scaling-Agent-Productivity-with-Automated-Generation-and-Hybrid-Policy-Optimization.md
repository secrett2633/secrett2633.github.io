---
title: "[논문리뷰] Youtu-Agent: Scaling Agent Productivity with Automated Generation and Hybrid Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'Youtu-Agent: Scaling Agent Productivity with Automated Generation and Hybrid Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Automated Agent Generation
  - Reinforcement Learning
  - Hybrid Policy Optimization
  - Tool Synthesis
  - In-context Learning
  - Agent Framework
  - Scalability

permalink: /ai/review/2026-01-05-Youtu-Agent-Scaling-Agent-Productivity-with-Automated-Generation-and-Hybrid-Policy-Optimization/

toc: true
toc_sticky: true

date: 2026-01-05 00:00:00+0900+0900
last_modified_at: 2026-01-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24615)

**저자:** Yuchen Shi, Yuzheng Cai, Siqi Cai, Zihan Xu, Lichao Chen, Yulei Qin, Zhijian Zhou, Xiang Fei, Chaofan Qiu, Xiaoyu Tan, Gang Li, Zongyi Li, Haojia Lin, Guocan Cai, Yong Mao, Yunsheng Wu, Ke Li, Xing Sun



## 핵심 연구 목표
본 논문은 기존 LLM 에이전트 프레임워크가 겪는 **높은 구성 비용** 과 **정적 기능** 문제를 해결하는 것을 목표로 합니다. 특히, 수동적인 툴 통합 및 프롬프트 엔지니어링의 부담을 줄이고, 배포된 에이전트가 동적 환경에 적응하기 어려운 한계를 극복하기 위해 **자동화된 생성** 과 **지속적인 진화** 를 위한 모듈형 프레임워크 **Youtu-Agent** 를 제안합니다.

## 핵심 방법론
**Youtu-Agent** 는 환경, 툴킷, 컨텍스트 관리를 분리하는 **모듈형 YAML 기반 구성 시스템** 을 특징으로 합니다. 에이전트 생성에는 **Workflow 모드** (표준 작업용)와 **Meta-Agent 모드** (복잡한 요구사항에 대해 **툴 코드, 프롬프트, 구성 자동 생성** ) 두 가지 패러다임을 도입합니다. 또한, **Agent Practice 모듈** 을 통해 파라미터 업데이트 없이 **인-컨텍스트 경험 축적** 을 통한 성능 개선을 지원하고, **Agent RL 모듈** 은 분산 학습 프레임워크와 통합하여 **대규모 종단 간 강화 학습** 을 위한 확장 가능하고 안정적인 최적화 시스템을 구축합니다.

## 주요 결과
**Youtu-Agent** 는 오픈 소스 모델(DeepSeek-V3 시리즈, Qwen2.5-7B)만을 사용하여 **WebWalkerQA에서 71.47% pass@1** 및 **GAIA(텍스트 전용)에서 72.8% pass@1** 의 최첨단 성능을 달성했습니다. 자동화된 툴 합성 파이프라인은 **81% 이상의 툴 합성 성공률** 을 보였습니다. **Practice 모듈** 은 단 100개 샘플 및 $18의 비용으로 AIME 2024/2025에서 각각 **+2.7% 및 +5.4%** 의 성능 향상을 가져왔습니다. **Agent RL 학습** 은 학습 반복 시간을 **40% 단축** 하고 Qwen2.5-7B 모델의 AIME 2024 정확도를 **10%에서 45%로 향상** 시켰습니다.

## AI 실무자를 위한 시사점
**Youtu-Agent** 는 LLM 에이전트 개발의 **높은 초기 비용** 과 **정적 기능 문제** 를 해결하여 실무자들이 복잡한 에이전트를 보다 효율적으로 구축하고 지속적으로 개선할 수 있는 강력한 프레임워크를 제공합니다. **자동화된 툴 코드 및 프롬프트 생성** 기능은 에이전트 개발의 **진입 장벽을 낮추고 확장성** 을 크게 높이며, **인-컨텍스트 학습** 을 통한 저비용 성능 개선과 **대규모 강화 학습** 지원은 에이전트의 **지속적인 진화** 를 가능하게 합니다. 또한, **오픈 소스 모델** 만으로 경쟁력 있는 성능을 달성하여 비용 효율적인 에이전트 개발 및 배포에 활용 가치가 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.