---
title: "[논문리뷰] UniVA: Universal Video Agent towards Open-Source Next-Generation Video Generalist"
excerpt: "이 [arXiv]에 게시한 'UniVA: Universal Video Agent towards Open-Source Next-Generation Video Generalist' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Agents
  - Multi-modal AI
  - Plan-Act Architecture
  - Tool-Use
  - Long-horizon Reasoning
  - Open-source
  - Video Generation
  - Video Understanding

permalink: /ai/review/2025-11-14-UniVA-Universal-Video-Agent-towards-Open-Source-Next-Generation-Video-Generalist/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08521)

**저자:** Zhengyang Liang, Daoan Zhang, Huichi Zhou, Rui Huang, Bobo Li, Yuechen Zhang, Shengqiong Wu, Xiaohan Wang, Jiebo Luo, Lizi Liao, Hao Fei



## 핵심 연구 목표
본 논문은 전문화된 비디오 AI 모델과 실제 비디오 워크플로우 간의 격차를 해소하여 차세대 비디오 일반 인공지능을 구현하는 것을 목표로 합니다. 비디오 이해, 분할, 편집 및 생성 기능을 통합하는 **오픈소스, 다재다능한 멀티 에이전트 프레임워크 UniVA**를 제안하여 복잡하고 반복적인 비디오 작업에 필요한 통일된 시스템을 제공하고자 합니다.

## 핵심 방법론
UniVA는 **Plan-and-Act 듀얼 에이전트 아키텍처**를 채택합니다. **플래너 에이전트**는 사용자 의도를 해석하여 구조화된 비디오 처리 단계로 분해하고, **실행자 에이전트**는 **모듈형 MCP(Model Context Protocol) 기반 도구 서버**를 통해 이를 실행합니다. **계층적 다단계 메모리** (**글로벌 지식, 작업 컨텍스트, 사용자별 선호도**)는 장기적인 추론과 맥락 연속성을 유지하며, 다양한 오픈소스 및 API 기반 도구의 **플러그 앤 플레이 통합**을 가능하게 합니다.

## 주요 결과
UniVA는 다양한 비디오 태스크에서 경쟁력 있는 성능을 입증했습니다. **LongText2Video**에서 **CLIP Score 0.2814**와 **MLLM Judge Score 3.333**, **Video2Video**에서 **MLLM Judge Score 4.068**로 높은 점수를 달성했습니다. **Long Video Understanding**에서는 **0.76**의 최고 정확도를 기록했으며, **Long Video Segmentation**에서도 모든 지표에서 최고 성능을 보여 **(J&F-mean 0.2467)**, 통합된 이해 모듈을 통해 모호성을 해결하는 능력을 강조했습니다. 또한, **Plan-Act 프레임워크**는 단일 에이전트 대비 **계획 성공률을 두 배**로 높이고 계획 품질을 향상시켰습니다.

## AI 실무자를 위한 시사점
UniVA는 비디오 지능 연구를 가속화할 수 있는 **최초의 오픈소스, 통합형 비디오 제너럴리스트 프레임워크**를 제공합니다. **모듈형 플러그 앤 플레이 아키텍처**는 최신 모델 및 도구의 손쉬운 통합을 가능하게 하여 역동적인 AI 생태계를 조성합니다. **Plan-Act 설계**와 **계층적 메모리 메커니즘**은 복잡하고 반복적인 비디오 프로덕션 워크플로우를 효율적으로 처리하여 산업 수준의 일관성과 품질을 보장하는 실용적인 솔루션을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.