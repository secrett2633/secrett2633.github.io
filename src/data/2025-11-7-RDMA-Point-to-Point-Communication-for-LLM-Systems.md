---
title: "[논문리뷰] RDMA Point-to-Point Communication for LLM Systems"
excerpt: "이 [arXiv]에 게시한 'RDMA Point-to-Point Communication for LLM Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RDMA
  - LLM
  - Point-to-Point Communication
  - Disaggregated Inference
  - MoE Routing
  - KvCache
  - AWS EFA
  - NVIDIA ConnectX

permalink: /ai/review/2025-11-7-RDMA-Point-to-Point-Communication-for-LLM-Systems/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27656)

**저자:** Nandor Licker, Kevin Hu, Vladimir Zaytsev, Lequn Chen



## 핵심 연구 목표
LLM 시스템에서 필요한 유연한 **지점 간 통신(point-to-point communication)** 을 제공하고, 기존 RDMA 구현이 특정 **NIC(Network Interface Controller)** 에 종속되어 발생하는 **벤더 종속성(vendor lock-in)** 및 **하드웨어 이식성(portability)** 문제를 해결하는 것을 목표로 합니다. 특히, **NVIDIA ConnectX** 와 **AWS EFA** 와 같은 이기종 RDMA 하드웨어 환경에서 통일된 인터페이스를 제공하고자 합니다.

## 핵심 방법론
이 논문은 이기종 RDMA 하드웨어 간의 공통 기능을 활용하는 휴대용 RDMA 통신 라이브러리인 **TransferEngine** 을 제안합니다. 이는 **SEND/RECV** 및 **WRITEIMM** 작업을 위한 통일된 API를 노출하며, 메시지 순서에 의존하지 않는 새로운 **IMMCOUNTER** 기본 요소를 통한 완료 알림을 특징으로 합니다. **TransferEngine** 은 GPU당 여러 NIC를 투명하게 관리하여 ( **400 Gbps** 대역폭을 위해 **EFA NIC** 4개 집계 등) 하드웨어 추상화를 제공하고, **KvCache 전송** , **RL 가중치 업데이트** , **MoE 디스패치/결합** 과 같은 세 가지 프로덕션 시스템을 통해 성능을 입증합니다.

## 주요 결과
**TransferEngine** 은 **NVIDIA ConnectX-7** 및 **AWS EFA** 에서 **400 Gbps** 의 최고 처리량을 시연했습니다. RL 가중치 업데이트는 **1조 파라미터 모델** 에 대해 **1.3초** 를 달성하여 기존 RL 프레임워크보다 **100배 이상** 빨랐습니다. MoE 디스패치/결합 구현은 **ConnectX-7** 에서 **DeepEP** 의 디코드 지연 시간을 초과했으며, **EFA** 에서 최초로 실행 가능한 지연 시간을 제공했습니다. 256 KiB 단일 WRITE 시 **EFA** 에서 **54 Gbps** , **ConnectX-7** 에서 **116 Gbps** 를 달성했습니다.

## AI 실무자를 위한 시사점
**TransferEngine** 은 LLM 시스템 개발자들이 **이기종 클라우드 환경(AWS EFA, NVIDIA ConnectX)** 에서 **벤더 종속성** 없이 **고성능 지점 간 RDMA 통신** 을 활용할 수 있게 합니다. 이는 **분산형 추론(disaggregated inference)** 및 **MoE(Mixture-of-Experts)** 아키텍처와 같은 현대 LLM 워크로드의 구축을 간소화하며, **RL 훈련 시간** 을 크게 단축하고 **MoE 추론 지연 시간** 을 개선합니다. 특히 **GPU당 여러 NIC를 투명하게 관리** 하는 기능은 복잡한 네트워크 설정을 추상화하여 AI 엔지니어링 효율성을 높이는 중요한 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.