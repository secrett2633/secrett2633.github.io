---
title: "[논문리뷰] OceanGym: A Benchmark Environment for Underwater Embodied Agents"
excerpt: "이 [arXiv]에 게시한 'OceanGym: A Benchmark Environment for Underwater Embodied Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Underwater Robotics
  - Embodied AI
  - Benchmark Environment
  - Multi-modal Large Language Models
  - Autonomous Underwater Vehicles
  - Perception
  - Decision-Making
  - Simulation

permalink: /ai/review/2025-10-1-OceanGym-A-Benchmark-Environment-for-Underwater-Embodied-Agents/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26536)

**저자:** Yida Xue, Mingjun Mao, Xiangyuan Ru, Yuqi Zhu, Baochang Ren, Shuofei Qiao, Mengru Wang, Shumin Deng, Xinyu An, Ningyu Zhang, Ying Chen, Huajun Chen



## 핵심 연구 목표
본 연구는 해저 환경의 낮은 가시성, 동적 해류 등의 극한 조건에서 AI 기반 **자율 수중 로봇(AUV)** 이 직면하는 심각한 인지 및 의사결정 문제들을 해결하기 위해, 포괄적인 벤치마크 환경인 **OCEANGYM** 을 제안합니다. 궁극적으로는 실제 환경에 적용 가능한 강력한 자율 에이전트 개발을 촉진하는 것을 목표로 합니다.

## 핵심 방법론
**Unreal Engine 5.3** 기반으로 **800m x 800m** 규모의 현실적인 수중 환경을 구축했으며, 얕은 수심(50m)과 깊은 수심(500m) 시나리오에서 8가지 실제 작업(예: 로봇 찾기, 송유관 검사, 침몰선 수색)을 시뮬레이션합니다. 에이전트는 **멀티모달 대규모 언어 모델(MLLM)** 을 기반으로 **인식, 기억, 순차적 의사결정** 기능을 통합하며, 인식 작업은 **정확도** 로, 의사결정 작업은 **거리 기반 점수 매기기** 를 통해 평가됩니다.

## 주요 결과
**GPT-4o-mini, Gemini-2.5, Qwen2.5-VL-7B, MiniCPM-V-4.5** 모델들을 테스트한 결과, MLLM 에이전트와 인간 전문가 사이에 상당한 성능 격차가 확인되었습니다. 특히 **깊은 수심/저가시성 환경** 에서 의사결정 성공률이 **14.8%** 까지 크게 떨어졌으며, MLLM은 인간과 달리 **음파 탐지기 데이터** 를 효과적으로 활용하지 못했습니다. **Qwen2.5-VL-7B** 가 얕은 수심에서 **57.12%** 의 최고 인식 정확도를, **GPT-4o-mini** 가 의사결정 태스크에서 가장 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
**OCEANGYM** 은 극한의 수중 환경에서 **견고한 embodied AI** 를 개발하기 위한 필수적인 테스트베드를 제공합니다. 현재 MLLM은 **음파 탐지기 데이터 해석, 복잡한 객체 구별, 장기 기억 유지** 등에서 한계를 보여, 이 분야에 대한 집중적인 연구가 필요함을 시사합니다. 이 벤치마크는 **시뮬레이션-실제 환경 간의 연결(sim-to-real bridge)** 역할을 하여 AUV 개발 및 배포를 가속화하고, 비용이 많이 드는 현장 시험의 의존도를 줄이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.