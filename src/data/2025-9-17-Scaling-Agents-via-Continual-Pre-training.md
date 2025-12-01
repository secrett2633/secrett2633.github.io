---
title: "[논문리뷰] Scaling Agents via Continual Pre-training"
excerpt: "Guangyu Li이 [arXiv]에 게시한 'Scaling Agents via Continual Pre-training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic LLMs
  - Continual Pre-training
  - Deep Research Agents
  - Tool Use
  - Multi-step Reasoning
  - Data Synthesis
  - Scaling Laws

permalink: /ai/review/2025-9-17-Scaling-Agents-via-Continual-Pre-training/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13310)

**저자:** Liangcai Su, Zhen Zhang, Guangyu Li, Zhuo Chen, Chenxi Wang, Maojia Song, Xinyu Wang, et al.



## 핵심 연구 목표
본 논문은 기존의 에이전트 LLM 훈련 방법론(SFT, RL)이 복잡한 에이전트 태스크에서, 특히 오픈소스 구현체에서 저조한 성능을 보이는 문제를 해결하고자 합니다. 이는 견고한 에이전트 파운데이션 모델의 부재로 인해 훈련 후 다양한 에이전트 행동 학습과 정렬이 동시에 이루어지면서 발생하는 최적화 충돌 때문입니다. 따라서, 효과적인 다운스트림 미세 조정을 위해 에이전트 행동을 자연스럽게 지원하는 강력한 에이전트 파운데이션 모델을 구축하는 **Agentic Continual Pre-training (Agentic CPT)** 접근 방식을 제안합니다.

## 핵심 방법론
연구팀은 에이전트 파운데이션 모델인 **AgentFounder** 를 개발하며, **Agentic CPT** 를 LLM 훈련 파이프라인에 통합했습니다. 핵심 방법론은 두 가지 데이터 합성 방식에 기반합니다: 외부 도구 호출 없이 계획 및 논리적 추론을 생성하는 **First-order Action Synthesis (FAS)** 와, 탐색 경로를 확장하여 다단계 의사 결정 문제로 궤적을 재구성하는 **Higher-order Action Synthesis (HAS)** 입니다. 이 데이터는 **두 단계 훈련 전략** 에 따라 사용되는데, 첫 단계는 짧은 컨텍스트(32K)로 FAS 및 HAS 데이터를 활용하고, 두 번째 단계는 확장된 컨텍스트(128K)로 고품질 HAS 데이터를 사용하여 모델을 정교하게 다듬습니다.

## 주요 결과
**AgentFounder-30B** 는 10개 벤치마크에서 최첨단 성능을 달성하며, 강력한 도구 사용 능력을 유지했습니다. 특히 **BrowseComp-en에서 39.9%** , **BrowseComp-zh에서 43.3%** , **HLE에서 31.5% Pass@1** , **GAIA에서 72.8%** , **xbench-DeepSearch에서 73.0%** 를 기록했습니다. 이는 기존 모든 오픈소스 딥 리서치 에이전트를 능가하며, 일부 상업용 모델보다도 우수한 성능을 보여줍니다. 또한, 에이전트 능력에 대한 **로그 스케일링 법칙** 이 데이터 볼륨 및 모델 크기에 모두 적용됨을 입증했습니다.

## AI 실무자를 위한 시사점
**Agentic CPT** 는 복잡한 도구 사용 및 다단계 추론이 필요한 에이전트 LLM의 성능 향상을 위한 핵심적인 접근 방식입니다. **FAS 및 HAS** 와 같은 합성 데이터 생성 기법은 실제 API 호출 없이 대규모의 고품질 훈련 데이터를 효율적으로 확보할 수 있는 실용적인 해결책을 제시합니다. **AgentFounder** 의 성공은 딥 리서치 에이전트와 같은 고성능 에이전트 시스템 개발에 필수적인 강력한 파운데이션 모델을 구축하는 새로운 패러다임을 제공하며, 모델 및 데이터 확장(scaling)이 성능 향상에 일관되게 기여함을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.