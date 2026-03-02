---
title: "[논문리뷰] DualPath: Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference"
excerpt: "arXiv에 게시된 'DualPath: Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Inference
  - KV-Cache
  - Storage Bottleneck
  - Agentic Workloads
  - Dual-Path Loading
  - PD Disaggregation
  - RDMA
  - Adaptive Scheduling

permalink: /ai/review/2026-02-26-DualPath-Breaking-the-Storage-Bandwidth-Bottleneck-in-Agentic-LLM-Inference/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21548)

**저자:** Yongtong Wu, Shaoyuan Chen, Yinmin Zhong, Rilin Huang, Yixuan Tan, Wentao Zhang, Liyue Zhang, Shangyan Zhou, Yuxuan Liu, Shunfeng Zhou, Mingxing Zhang, Xin Jin, Panpan Huang



## 핵심 연구 목표
본 논문은 에이전틱 LLM 추론 시 **KV-Cache** 저장소 I/O가 컴퓨테이션보다 병목 현상을 일으키는 문제를 해결하고자 합니다. 특히, 기존 분리형 아키텍처에서 프리필(prefill) 엔진의 스토리지 NIC가 대역폭 포화 상태인 반면, 디코딩(decode) 엔진의 NIC는 유휴 상태로 남아 전반적인 시스템 처리량을 심각하게 제한하는 **스토리지 대역폭 불균형** 문제를 해소하는 것이 목표입니다.

## 핵심 방법론
`DualPath`는 기존의 스토리지-프리필 경로 외에, **KV-Cache** 를 디코딩 엔진으로 먼저 로드한 후 고대역폭 **RDMA** 를 통해 프리필 엔진으로 전송하는 **새로운 스토리지-디코드 경로** 를 도입합니다. 이 방법론은 **NIC 중심의 트래픽 관리** 를 통해 **KV-Cache** 트래픽을 모델 실행 통신과 분리하고, **동적 스케줄링 정책** 으로 프리필 및 디코드 엔진 간의 계산 및 네트워크 활용 균형을 맞춥니다.

## 주요 결과
`DualPath`는 오프라인 추론 시 **최대 1.87배** 의 처리량 향상을 달성했으며, 온라인 서빙 시 SLO를 위반하지 않으면서 **평균 1.96배** 의 처리량을 개선했습니다. 또한, **스토리지 NIC** 의 부하 균형을 **1.53에서 1.18** 로 향상시켰으며, **레이어별 프리필** , **듀얼패스 로딩** , **스케줄링 알고리즘** 이 결합되어 **Basic** 대비 **45.62%** 의 JCT(Job Completion Time) 감소를 보였습니다.

## AI 실무자를 위한 시사점
`DualPath`는 컨텍스트가 길고 I/O 바운드된 **멀티턴 에이전틱 LLM 워크로드** 를 운영하는 AI 실무자들에게 필수적인 성능 개선을 제공합니다. 이는 **분산형 아키텍처** 에서 **KV-Cache** 로딩 병목 현상을 해결하여 LLM 서비스의 **확장성과 효율성** 을 크게 높일 수 있는 실용적인 솔루션을 제시합니다. 특히, 기존 인프라에서 유휴 상태였던 리소스를 활용하여 전체 시스템 처리량을 최적화하는 방안을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.