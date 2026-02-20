---
title: "[논문리뷰] UniUGP: Unifying Understanding, Generation, and Planing For End-to-end Autonomous Driving"
excerpt: "arXiv에 게시된 'UniUGP: Unifying Understanding, Generation, and Planing For End-to-end Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - End-to-End Learning
  - Vision-Language Models
  - World Model
  - Chain-of-Thought
  - Video Generation
  - Trajectory Planning
  - Multimodal Learning

permalink: /ai/review/2025-12-11-UniUGP-Unifying-Understanding-Generation-and-Planing-For-End-to-end-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09864)

**저자:** Hao Lu, Ziyang Liu, Guangfeng Jiang, Yuanfei Luo, Sheng Chen, Yangang Zhang, Ying-Cong Chen



## 핵심 연구 목표
자율 주행 시스템이 **제한된 세계 지식** 과 **시각적 동적 모델링 부족** 으로 인해 롱테일 시나리오에서 겪는 어려움을 해결하는 것이 목표입니다. 기존 VLA(Vision-Language-Action) 모델이 **레이블이 없는 비디오** 를 활용하지 못하고, 세계 모델이 **대규모 언어 모델의 추론 능력** 을 결여하는 한계를 극복하고자 합니다. 궁극적으로 장면 이해, 미래 비디오 생성, 궤적 계획을 통합하여 **종단 간 자율 주행 성능** 을 향상시키는 데 집중합니다.

## 핵심 방법론
본 논문은 **UniUGP** 라는 통일된 **Understanding-Generation-Planning 프레임워크** 를 제안하며, **하이브리드 전문가(hybrid expert) 아키텍처** 를 활용합니다. 이 프레임워크는 **사전 훈련된 VLM(Vision-Language Models)** 과 **비디오 생성 모델** 을 통합하여 시각적 동역학 및 의미론적 추론을 강화합니다. 다중 프레임 관측 및 자연어 지침을 입력으로 받아 **CoT(Chain-of-Thought) 추론** , **물리적으로 일관된 궤적** , 그리고 **일관된 미래 비디오** 를 출력합니다. 학습은 10개 이상의 다양한 AD 데이터셋을 활용하는 **4단계 훈련 전략** 으로 이루어지며, CoT 논리적 일관성, 궤적 시간적 부드러움, 비디오 시각적 일관성을 강제하는 **다중 항 손실 함수** 를 사용합니다.

## 주요 결과
UniUGP는 이해, 추론 및 의사결정 분야에서 **최첨단 성능** 을 달성했으며, 특히 도전적인 롱테일 상황에서 **우수한 일반화 능력** 을 보였습니다. DriveLM GVQA 벤치마크에서 **최종 점수 0.59** 를 기록하며 기존 모델들을 능가했습니다. 계획 능력 평가에서 **L2 거리(3초) 1.45m** 를 달성했으며, 미래 프레임 생성 품질에서 **FID 7.4** 와 **FVD 75.9** 로 기존 방법론을 뛰어넘었습니다.

## AI 실무자를 위한 시사점
UniUGP는 **이해, 생성, 계획 기능을 통합** 하여 자율 주행 시스템의 복잡성을 줄이고 정보 손실을 최소화할 수 있는 효과적인 접근 방식을 제시합니다. **CoT 추론 능력** 은 자율 주행 시스템의 의사결정 과정을 설명 가능하게 하여, **안전 및 신뢰성 측면에서 중요한 진전** 을 제공합니다. 또한, **제어 가능한 비디오 생성 기능** 은 다양한 시나리오 및 기상 조건에서 **합성 데이터를 생성** 하여, 실제 환경에서의 데이터 수집 제약을 극복하고 시스템 개발 및 테스트를 가속화하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.