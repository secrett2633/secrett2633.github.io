---
title: "[논문리뷰] CALM Before the STORM: Unlocking Native Reasoning for Optimization
  Modeling"
excerpt: "Chengpeng Li이 arXiv에 게시한 'CALM Before the STORM: Unlocking Native Reasoning for Optimization
  Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models
  - Optimization Modeling
  - Reflective Generation
  - Supervised Fine-tuning
  - Reinforcement Learning
  - Human-in-the-Loop
  - Code Generation
  - Domain Adaptation

permalink: /ai/review/2025-10-9-CALM-Before-the-STORM-Unlocking-Native-Reasoning-for-Optimization-Modeling/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04204)

**저자:** Zhengyang Tang, Zihan Ye, Chenyu Huang, Xuhan Huang, Chengpeng Li, Sihang Li, Guanhua Chen, Ming Yan, Zizhuo Wang, Hongyuan Zha, Dayiheng Liu, Benyou Wang



## 핵심 연구 목표
본 연구는 Large Reasoning Models (LRMs)을 최적화 모델링 태스크에 효과적으로 적용하기 위한 새로운 프레임워크를 제안합니다. 기존의 비반영적(non-reflective) 데이터셋을 이용한 미세 조정이 LRM의 **고유한 다단계 추론 능력** 을 충분히 활용하지 못하고 오히려 성능 저하를 초래하는 문제를 해결하고자 합니다. 궁극적으로, LRM이 전문가 수준의 최적화 모델링 성능을 달성하도록 돕는 것이 목표입니다.

## 핵심 방법론
논문은 **CALM (Corrective Adaptation with Lightweight Modification)** 이라는 프레임워크를 제안하며, 이는 **Reasoner(LRM)** 와 **Intervener(전문가 LLM)** 간의 협력 패턴을 통해 데이터셋을 구축합니다. Intervener는 LRM의 추론 과정에서 발생하는 **7가지 유형의 결함(flaw taxonomy)** 을 식별하고, **간결한 교정 힌트(corrective hints)** 를 제공하여 LRM이 추론 궤적을 수정하도록 유도합니다. 이 과정에서 **코드 실행 피드백** 을 활용하며, 생성된 토큰의 2.6% 미만만 수정하는 **경량화된 개입** 을 특징으로 합니다. 이렇게 정제된 데이터는 **감독 미세 조정(SFT)** 과 **강화 학습(RL)** 의 **2단계 훈련 파이프라인** 에 사용되어, 최종 모델인 **STORM (Smart Thinking Optimization Reasoning Model)** 을 개발합니다.

## 주요 결과
**4B 파라미터** 를 가진 **STORM 모델** 은 5가지 최적화 모델링 벤치마크에서 **68.9%의 매크로 평균 정확도** 를 달성하여 새로운 SOTA를 수립했습니다. 이는 베이스 LRM 대비 **11.8%p 증가** 한 수치이며, **671B 파라미터** 를 가진 대규모 LRM인 **DeepSeek-R1-0528** 의 성능( **67.5%** )에 필적합니다. SFT 단계는 초기 추론 결함을 완화하여 58.7%로 소폭 개선했고, RL 단계는 **계산 중심 추론(computation-driven reasoning)** 으로의 전환을 가속화하며 성능을 68.9%까지 끌어올렸습니다.

## AI 실무자를 위한 시사점
본 연구는 LRM의 **고유한 추론 패턴을 보존하고 강화** 하는 것이 복잡한 AI 태스크에 대한 효과적인 도메인 적응의 핵심임을 보여줍니다. **CALM 프레임워크** 는 전문가의 지식을 **경량 개입** 을 통해 LRM 학습 데이터로 전환하는 **확장 가능한 방법** 을 제공합니다. 특히, 작은 규모의 LRM(예: **4B 모델** )으로도 **대규모 모델에 필적하는 전문가 수준의 성능** 을 달성할 수 있음을 입증하여, 컴퓨팅 자원 효율성을 높이는 중요한 방향을 제시합니다. 이는 최적화 모델링을 포함한 다양한 복잡한 추론 도메인에서 LRM 적용 가능성을 확대합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.