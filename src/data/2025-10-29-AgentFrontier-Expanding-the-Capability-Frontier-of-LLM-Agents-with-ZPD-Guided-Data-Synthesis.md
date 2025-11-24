---
title: "[논문리뷰] AgentFrontier: Expanding the Capability Frontier of LLM Agents with
  ZPD-Guided Data Synthesis"
excerpt: "이 [arXiv]에 게시한 'AgentFrontier: Expanding the Capability Frontier of LLM Agents with
  ZPD-Guided Data Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Data Synthesis
  - Zone of Proximal Development (ZPD)
  - Complex Reasoning
  - Tool Use
  - Automated Benchmarking
  - Agentic AI
  - Rejection Sampling Fine-Tuning

permalink: /ai/review/2025-10-29-AgentFrontier-Expanding-the-Capability-Frontier-of-LLM-Agents-with-ZPD-Guided-Data-Synthesis/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24695)

**저자:** Xuanzhong Chen, Zile Qiao, Guoxin Chen, Liangcai Su, Zhen Zhang, Xinyu Wang, Pengjun Xie, Fei Huang, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 에이전트의 **고급 추론 능력**을 확장하기 위해, 교육 이론인 **근접 발달 영역(ZPD)**에서 영감을 받은 새로운 데이터 합성 접근 방식을 제안합니다. LLM이 단독으로는 해결할 수 없지만 지도를 통해 마스터할 수 있는, **모델 능력의 최전선(frontier of capabilities)**에 위치하는 고품질의 다학제적 데이터를 자동으로 합성하는 것을 주요 목표로 합니다.

## 핵심 방법론
이 연구는 **AgentFrontier Engine**이라는 자동화된 파이프라인을 도입하여, **덜 지식이 풍부한 동료(LKP)**와 **더 지식이 풍부한 타인(MKO)**이라는 페르소나를 통해 LLM의 ZPD 내 데이터를 생성합니다. 엔진은 **지식 융합을 위한 시드 질문 생성**, **에이전트 정제를 통한 복잡성 확장**(예: 검색, 학술 자료, 브라우저, 코드 도구 활용), **ZPD 기반 필터링 및 보정**의 3단계 프로세스를 거쳐 데이터를 합성합니다. 합성된 데이터는 **지속적인 사전 학습(CPT)** 및 **리젝션 샘플링 미세 조정(RFT)**에 사용되며, 에이전트 능력을 평가하기 위한 **ZPD Exam**이라는 동적 벤치마크도 함께 개발되었습니다.

## 주요 결과
합성된 데이터로 훈련된 **AgentFrontier-30B-A3B** 모델은 **Humanity's Last Exam (HLE)** 벤치마크에서 **28.6%**의 최첨단 성능을 달성하여 일부 선도적인 독점 에이전트를 능가했습니다. 새로 도입된 **ZPD Exam-v1**에서는 **93.4%**의 높은 점수를 기록했습니다. 특히, **CPT**는 HLE에서 **+2.9%**, ZPD Exam에서 **+2.0%**, xBench-ScienceQA에서 **+7.0%**의 성능 향상을 가져와 모델의 복합 에이전트 태스크 능력을 강화하는 데 기여했습니다.

## AI 실무자를 위한 시사점
본 연구는 **ZPD 기반 데이터 합성**이 LLM 에이전트의 복잡한 추론 능력을 확장하기 위한 확장 가능하고 매우 효과적인 방법임을 보여줍니다. **AgentFrontier Engine**은 고품질의 도전적인 추론 데이터를 효율적으로 생성할 수 있는 실용적인 프레임워크를 제공하여, 값비싼 수동 데이터 큐레이션에 대한 의존도를 낮출 수 있습니다. 또한, **ZPD Exam**은 에이전트의 발전 단계를 진단하고 차별화하는 자가 진화형 벤치마크로서 AI 에이전트 연구 및 개발에 중요한 도구를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.