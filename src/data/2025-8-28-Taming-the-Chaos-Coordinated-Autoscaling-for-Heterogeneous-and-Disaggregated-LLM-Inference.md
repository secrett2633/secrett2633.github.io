---
title: "[논문리뷰] Taming the Chaos: Coordinated Autoscaling for Heterogeneous and
  Disaggregated LLM Inference"
excerpt: "Chunlei Han이 arXiv에 게시한 'Taming the Chaos: Coordinated Autoscaling for Heterogeneous and
  Disaggregated LLM Inference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Inference
  - Autoscaling
  - Disaggregated Architecture
  - Heterogeneous Hardware
  - Resource Management
  - Topology-aware Scheduling
  - GPU Utilization

permalink: /ai/review/2025-8-28-Taming-the-Chaos-Coordinated-Autoscaling-for-Heterogeneous-and-Disaggregated-LLM-Inference/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19559)

**저자:** Rongzhi Li, Ruogu Du, Zefang Chu, Sida Zhao, Chunlei Han, Zuocheng Shi, Yiwen Shao, Huanle Han, Long Huang, Zherui Liu, Shufan Liu



## 핵심 연구 목표
전통적인 자동 스케일러가 **Prefill-Decode (P/D) 분리형 아키텍처** 를 사용하는 대규모 언어 모델(LLM) 추론 환경에서 비효율적이라는 문제에 직면했습니다. 이로 인해 이기종 하드웨어의 비효율적인 사용, 네트워크 병목 현상, 그리고 Prefill 및 Decode 단계 간의 불균형이 발생합니다. 본 논문은 이러한 핵심 과제를 해결하고, 아키텍처 균형을 유지하며 효율적이고 적응 가능한 자원 관리를 보장하는 조정된 자동 스케일링 프레임워크인 **HeteroScale** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**HeteroScale** 은 이기종 하드웨어 및 네트워크 제약에 적응하는 **topology-aware scheduler** 와 프로덕션 환경에서의 자동 스케일링 신호에 대한 대규모 실증 연구를 통해 도출된 **novel metric-driven policy** 를 결합합니다. **단일의 견고한 지표** 를 활용하여 Prefill 및 Decode 풀을 동시에 스케일링하며, **TPS(Throughput Per Second)** 를 주요 스케일링 지표로 채택하고 **Proportional Control Scaling** 및 **Negative Feedback Control Scaling** 알고리즘을 사용합니다. 또한, **네트워크 affinity-aware scheduling** 을 통해 계층적 자원 구조를 최적화하여 배치 결정을 수행합니다.

## 주요 결과
**HeteroScale** 은 수만 개의 GPU가 사용되는 대규모 프로덕션 환경에 성공적으로 배포되어 탁월한 효과를 입증했습니다. 평균 **GPU 활용률을 26.6% 포인트** 유의미하게 향상시켰으며, 이는 매일 **수십만 GPU-시간** 을 절약하면서도 엄격한 **서비스 수준 목표(SLO)** 를 성공적으로 준수했습니다. 특히, vision-language 검색 서비스의 TPS 기반 자동 스케일링은 **prefill GPU 활용률을 46.8%에서 76.2%** 로, **decode GPU 활용률을 86.0%에서 82.2%** 로 유지하는 등 높은 효율성을 보였습니다.

## AI 실무자를 위한 시사점
**Prefill-Decode 분리형 LLM 인프라** 의 복잡성 속에서 **GPU 자원 활용 효율성** 과 **서비스 안정성** 을 극대화할 수 있는 실증된 솔루션을 제공합니다. **토폴로지 인식 스케줄링** 과 **단일 통합 지표 기반의 스케일링 정책** 은 대규모 이기종 AI 시스템의 운영 최적화에 중요한 설계 원칙과 통찰력을 제공합니다. 실제 프로덕션 환경에서의 **뛰어난 성능 개선(26.6% GPU 활용률 향상)** 은 유사한 대규모 LLM 서빙 시스템을 구축하고 운영하는 AI 엔지니어 및 데이터 사이언티스트에게 직접적인 참고 자료가 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.