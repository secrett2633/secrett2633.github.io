---
title: "[논문리뷰] Janus: Disaggregating Attention and Experts for Scalable MoE Inference"
excerpt: "arXiv에 게시된 'Janus: Disaggregating Attention and Experts for Scalable MoE Inference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MoE Inference
  - Disaggregated Architecture
  - Resource Management
  - Scalability
  - Load Balancing
  - GPU Utilization
  - Communication Optimization

permalink: /ai/review/2025-12-17-Janus-Disaggregating-Attention-and-Experts-for-Scalable-MoE-Inference/

toc: true
toc_sticky: true

date: 2025-12-17 00:00:00+0900+0900
last_modified_at: 2025-12-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13525)

**저자:** Zhexiang Zhang1*, Ye Wang1,2*, Xiangyu Wang2, Yumiao Zhao³, Jingzhe Jiang¹, Qizhen Weng2, Shaohuai Shi⁴, Yin Chen², Minchen Yu¹†



## 핵심 연구 목표
본 연구는 대규모 Mixture-of-Experts (MoE) 모델 추론 시 발생하는 높은 자원 요구량, 동적 워크로드, 그리고 어텐션 및 전문가 레이어 간의 이질적인 컴퓨팅 요구사항 문제를 해결하고자 합니다. 기존의 모놀리식 접근 방식이 가진 자원 비효율성과 확장성 한계를 극복하고, 확장 가능하며 자원 효율적인 MoE 추론 시스템을 개발하는 것을 목표로 합니다.

## 핵심 방법론
`JANUS`는 **어텐션** 및 **전문가 레이어** 를 별도의 **GPU 서브 클러스터** 에 분리하여 배치하고 독립적으로 관리합니다. 이를 위해, 저지연 데이터 교환을 위한 **적응형 2단계 통신 방식** 을 제안하며, MoE 인스턴스 간 활성화된 전문가 수를 균형 있게 분배하기 위해 **GPU 커널로 구현된 경량 활성화 부하 분산 스케줄러** 를 도입합니다. 또한, 활성화 패턴을 고려한 **전문가 복제 및 배치 전략** 과 세분화된 자원 관리를 통해 전반적인 효율성을 극대화합니다.

## 주요 결과
`JANUS`는 최첨단 시스템 대비 **GPU당 처리량** 을 최대 **3.9배** 높게 달성하면서 **200ms TPOT** 와 같은 서비스 수준 목표(SLO)를 충족시켰습니다. 동적 워크로드에 대한 적응 능력을 통해 모놀리식 방식과 비교하여 **GPU 리소스 비용을 25% 절감** 하는 효율성을 보였습니다. 스케줄링 오버헤드는 모든 조건에서 일관되게 **100µs 미만** 으로 유지되어 MoE 레이어 실행의 엄격한 지연 시간 요구사항을 효과적으로 충족합니다.

## AI 실무자를 위한 시사점
`JANUS`는 MoE 기반 LLM의 **실제 서비스 환경** 에서 **자원 효율성** 과 **확장성** 을 크게 향상시킬 수 있는 실질적인 방안을 제시합니다. 어텐션과 전문가 레이어의 분리 관리는 **GPU 자원의 최적화된 할당** 을 가능하게 하여, 특히 동적 워크로드 상황에서 **운영 비용 절감** 에 기여할 수 있습니다. 또한, GPU 커널 기반의 **저지연 부하 분산 스케줄링** 은 고성능 AI 시스템 설계에 있어 중요한 참고 자료가 될 것이며, 이질적인 컴퓨팅 특성을 가진 다른 복잡한 모델 아키텍처에도 적용 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.