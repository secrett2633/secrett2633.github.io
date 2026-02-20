---
title: "[논문리뷰] Rewiring Experts on the Fly:Continuous Rerouting for Better Online
  Adaptation in Mixture-of-Expert models"
excerpt: "Shiwei Liu이 arXiv에 게시한 'Rewiring Experts on the Fly:Continuous Rerouting for Better Online
  Adaptation in Mixture-of-Expert models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts (MoE)
  - Online Adaptation
  - Test-Time Adaptation (TTA)
  - Expert Routing
  - Large Language Models (LLMs)
  - Self-Supervision
  - Computational Efficiency
  - Context Shift Robustness

permalink: /ai/review/2025-10-20-Rewiring-Experts-on-the-FlyContinuous-Rerouting-for-Better-Online-Adaptation-in-Mixture-of-Expert-models/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14853)

**저자:** Guinan Su, Yanwu Yang, Li Shen, Lu Yin, Shiwei Liu, Jonas Geiping



## 핵심 연구 목표
MoE(Mixture-of-Experts) 모델이 배포 시 발생하는 **분포 변화(distribution shifts)** 로 인해 **차선적인 라우팅 결정(suboptimal routing decisions)** 을 겪는 문제를 해결하는 것이 목표입니다. 외부 데이터나 추가 감독 없이 입력 컨텍스트만을 기반으로 MoE 라우팅 결정을 실시간으로 지속적으로 개선하여 온라인 적응 능력을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 **데이터 프리(data-free)** , **온라인 테스트-타임 프레임워크** 를 제안하며, 텍스트 생성 중 MoE 라우팅 결정을 지속적으로 조정합니다. 이는 **사전 충전(prefill) 단계** 와 정기적인 간격으로, 이미 생성된 시퀀스에 기반한 **자기 지도 학습(self-supervision)** 을 사용하여 모델의 라우팅 결정을 최적화합니다. 특히, **경량의 가산 벡터(lightweight additive vectors)** 를 통해 선택된 레이어의 라우터 로짓(router logits)만을 업데이트하여 과도한 적응을 방지하고 계산 효율성을 유지합니다.

## 주요 결과
제안된 방법은 challenging 추론 태스크에서 일관된 성능 향상을 보였으며, **OLMOE** 모델에서 HumanEval 태스크에서 **5.5%** 의 성능 개선을 달성했습니다. 또한, **DeepSeek-V2-Lite** 모델에 **self-consistency** 기법과 통합했을 때 평균 **6%** 의 성능 향상을 기록했습니다. 이는 외부 데이터 의존성 없이 기존 테스트-타임 스케일링 기법과 시너지를 창출하며 강건성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 MoE 모델의 **실시간 적응 능력** 을 획기적으로 향상시킬 수 있는 실용적인 방법을 제시합니다. 외부 데이터나 복잡한 검색 메커니즘 없이 모델 자체의 컨텍스트만으로 라우팅을 최적화할 수 있어, **배포(deployment) 환경에서의 강건성** 과 **지속적인 자기 조절(continual self-regulation)** 이 중요한 MoE 기반 LLM 개발에 큰 이점을 제공합니다. 특히, **컴퓨팅 오버헤드를 최소화** 하면서 기존 기법과 쉽게 통합될 수 있어, AI 엔지니어들에게 유연한 솔루션이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.