---
title: "[논문리뷰] ProPhy: Progressive Physical Alignment for Dynamic World Simulation"
excerpt: "Yuhao Cheng이 arXiv에 게시한 'ProPhy: Progressive Physical Alignment for Dynamic World Simulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Physics-aware
  - World Simulation
  - Progressive Alignment
  - Mixture-of-Experts
  - Vision-Language Models
  - Token-level Routing

permalink: /ai/review/2025-12-08-ProPhy-Progressive-Physical-Alignment-for-Dynamic-World-Simulation/

toc: true
toc_sticky: true

date: 2025-12-08 00:00:00+0900+0900
last_modified_at: 2025-12-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05564)

**저자:** Zijun Wang, Panwen Hu, Jing Wang, Terry Jingchen Zhang, Yuhao Cheng, Long Chen, Yiqiang Yan, Zutao Jiang, Hanhui Li, Xiaodan Liang



## 핵심 연구 목표
기존 비디오 생성 모델들이 대규모 또는 복잡한 다이내믹스에서 물리적으로 일관된 결과를 생성하는 데 어려움을 겪는 문제를 해결하는 것이 목표입니다. 특히, 물리적 프롬프트에 균일하게 반응하고 생성된 콘텐츠와 국지적인 물리적 단서 간의 미세한 정렬이 부족한 점을 극복하여, 명시적인 물리 인식 조건부 및 비등방성 생성을 통해 물리적으로 그럴듯한 비디오를 만들고자 합니다.

## 핵심 방법론
본 논문은 점진적 물리 정렬 프레임워크인 **ProPhy** 를 제안합니다. 이는 **Semantic Expert Block (SEB)** 과 **Refinement Expert Block (REB)** 으로 구성된 2단계 **Mixture-of-Physics-Experts (MoPE)** 메커니즘을 사용하여 계층적 물리 사전 지식(priors)을 추출합니다. 특히, **Vision-Language Models (VLMs)** 로부터 미세한 물리적 현상 위치화 능력을 **REB** 로 전이시키는 물리 정렬 전략을 통해 공간적으로 비등방적인 표현 생성을 유도합니다.

## 주요 결과
**VideoPhy2 벤치마크** 에서 제안된 **ProPhy** 는 기존 최첨단 방법론들을 능가하는 성능을 보였습니다. 특히, **CogVideoX-5B** 기반 모델에 **ProPhy** 를 적용했을 때 **Joint Pass Rate** 에서 **26.7%** 를 달성하여 기본 모델의 22.3% 대비 크게 향상되었으며, **Wan2.1-1.3B** 기반에서도 **26.5%** 를 기록했습니다. **VBench** 평가에서는 **Dynamic Degree** 지표에서 **72.0%** 를 달성하여 높은 동적 물리적 행동 캡처 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**ProPhy** 는 비디오 생성의 물리적 사실성을 향상시켜 **세계 시뮬레이터** 및 **로보틱스** 분야에서 실용적인 가치를 제공합니다. 모델이 미세한 수준에서 물리적 지식을 학습하고 적용할 수 있도록 **VLM 기반의 정렬 신호** 를 활용하는 것은 상세한 물리적 주석을 얻는 효율적인 방법을 제시합니다. 또한, **MoPE 아키텍처** 는 다양한 물리 지식을 통합하는 확장 가능한 방안을 제공하여 복잡한 다중 물리 시나리오 처리에 유리합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.