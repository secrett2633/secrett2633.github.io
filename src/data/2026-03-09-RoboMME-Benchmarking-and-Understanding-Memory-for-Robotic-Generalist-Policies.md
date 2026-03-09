---
title: "[논문리뷰] RoboMME: Benchmarking and Understanding Memory for Robotic Generalist Policies"
excerpt: "Haoran Zhang이 arXiv에 게시한 'RoboMME: Benchmarking and Understanding Memory for Robotic Generalist Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Memory
  - Benchmark
  - Manipulation
  - Vision-Language-Action Models
  - Temporal Memory
  - Spatial Memory
  - Procedural Memory

permalink: /ai/review/2026-03-09-RoboMME-Benchmarking-and-Understanding-Memory-for-Robotic-Generalist-Policies/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.04639)

**저자:** Yinpei Dai, Hongze Fu, Jayjun Lee, Yuejiang Liu, Haoran Zhang, Jianing Yang, Chelsea Finn, Nima Fazeli, Joyce Chai



## 핵심 연구 목표
본 논문은 장기적이고 이력 의존적인 로봇 조작 태스크에서 메모리 기반의 **Vision-Language-Action (VLA) 모델** 의 체계적인 평가 및 발전을 위한 표준화된 벤치마크를 구축하는 것을 목표로 합니다. 기존 메모리 메커니즘 평가의 비표준화된 환경과 제한적인 이해를 개선하고자 합니다.

## 핵심 방법론
**RoboMME** 벤치마크는 **temporal, spatial, object, procedural memory** 의 네 가지 인지적 차원을 평가하는 **16가지 조작 태스크** 로 구성됩니다. 또한, **π0.5 백본** 을 기반으로 **14가지 메모리 증강 VLA 모델 변형** 을 개발하여 **Symbolic, Perceptual, Recurrent memory** 와 **Memory-as-Context, Memory-as-Modulator, Memory-as-Expert** 의 세 가지 통합 전략을 체계적으로 탐구합니다.

## 주요 결과
어떤 단일 메모리 표현이나 통합 전략도 모든 태스크에서 지배적이지 않으며, 효과는 태스크에 따라 크게 달라졌습니다. **Perceptual memory** 가 가장 우수한 전체 성능을 보였고, 특히 **FrameSamp+Modul** 은 최고 **44.51%** 의 평균 성공률을 달성했습니다. 인간 참여자들은 **90.5%** 의 성공률을 보였지만, 여전히 복잡한 장기 태스크에서는 실패를 경험했습니다.

## AI 실무자를 위한 시사점
**Perceptual memory** 는 특히 **모션 중심 및 시간 민감 태스크** 에서 강력한 성능을 보여 로봇 조작 정책 설계에 중요한 고려 사항이 됩니다. 반면 **Symbolic memory** 는 카운팅 및 단기 추론에 강점을 가지므로, 태스크 특성에 맞춰 메모리 종류를 선택하거나 여러 형태의 메모리를 결합하는 **통합 프레임워크** 의 필요성을 시사합니다. **RoboMME** 는 메모리 증강 로봇 정책 개발을 위한 표준화된 플랫폼을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.