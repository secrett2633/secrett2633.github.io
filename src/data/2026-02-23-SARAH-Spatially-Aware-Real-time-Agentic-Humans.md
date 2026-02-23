---
title: "[논문리뷰] SARAH: Spatially Aware Real-time Agentic Humans"
excerpt: "Alexander Richard이 [arXiv]에 게시한 'SARAH: Spatially Aware Real-time Agentic Humans' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied Agents
  - Real-time
  - Conversational AI
  - Motion Generation
  - Spatially Aware
  - VR
  - Causal Models
  - Flow Matching
  - Gaze Control

permalink: /ai/review/2026-02-23-SARAH-Spatially-Aware-Real-time-Agentic-Humans/

toc: true
toc_sticky: true

date: 2026-02-23 00:00:00+0900+0900
last_modified_at: 2026-02-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18432)

**저자:** Evonne Ng, Siwei Zhang, Zhang Chen, Michael Zollhoefer, Alexander Richard



## 핵심 연구 목표
본 논문은 VR, 텔레프레젠스, 디지털 휴먼 애플리케이션에서 사용자의 움직임과 대화에 동적으로 반응하며, 자연스러운 시선을 유지하는 **공간 인식(spatially aware) 에이전트의 실시간 전신 3D 동작 생성** 을 목표로 합니다. 기존 방법론들이 부족했던 공간적 인식, 실시간 처리, 제어 가능성을 동시에 해결하고자 합니다.

## 핵심 방법론
제안하는 SARAH는 **인과적 Transformer 기반 VAE** 와 **플로우 매칭(Flow Matching) 모델** 을 결합합니다. VAE는 동작을 시간적 스트라이드가 있는 잠재 시퀀스로 압축하고, 플로우 매칭 모델은 사용자 머리 궤적(`py`)과 양방향 오디오에 조건화하여 잠재 공간에서 동작을 생성합니다. 특히, **완전 유클리드 동작 표현** 을 사용하며, **분류기 없는 가이던스(classifier-free guidance)** 기반의 **시선 점수 메커니즘** 을 도입하여 추론 시 시선 접촉 강도를 조절할 수 있게 합니다.

## 주요 결과
SARAH는 Embody 3D 데이터셋에서 **300 FPS 이상** 의 속도로 **최첨단 동작 품질** 을 달성했으며, 이는 비인과적(non-causal) 기준선 대비 **3배 이상 빠른 성능** 입니다. 또한, 비인과적 모델과 유사한 수준의 시선 정렬(ground truth 0.81 대비 본 모델 0.83)을 달성하여 인과적 방식으로 반응적인 공간 행동을 학습할 수 있음을 입증했습니다. 시선 제어(`g=0.8` 설정 시 **FGD 0.92** )를 통해 자연스러운 동작을 유지하며 사용자의 시선 선호도를 반영할 수 있습니다.

## AI 실무자를 위한 시사점
본 연구는 **VR 및 텔레프레젠스** 분야에서 실시간으로 사용자 상호작용에 반응하는 **몰입감 있는 에이전트 개발** 을 위한 중요한 토대를 마련합니다. **300 FPS 이상의 성능** 과 **완전 인과적 모델링** 은 실제 배포 가능한 고성능 시스템 구현에 대한 실용적인 지침을 제공합니다. 또한, **사용자 선호도에 따른 시선 제어** 기능은 다양한 애플리케이션에서 에이전트의 행동을 유연하게 맞춤 설정할 수 있는 잠재력을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.