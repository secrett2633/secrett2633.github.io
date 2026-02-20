---
title: "[논문리뷰] Infinity-RoPE: Action-Controllable Infinite Video Generation Emerges From Autoregressive Self-Rollout"
excerpt: "Pinar Yanardag이 arXiv에 게시한 'Infinity-RoPE: Action-Controllable Infinite Video Generation Emerges From Autoregressive Self-Rollout' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Video Generation
  - Rotary Positional Embedding
  - Infinite Video Generation
  - Action Control
  - Cinematic Transitions
  - Video Diffusion Models
  - KV Cache

permalink: /ai/review/2025-12-02-Infinity-RoPE-Action-Controllable-Infinite-Video-Generation-Emerges-From-Autoregressive-Self-Rollout/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20649)

**저자:** Hidir Yesiltepe, Tuna Han Salih Meral, Adil Kaan Akan, Kaan Oktay, Pinar Yanardag



## 핵심 연구 목표
본 논문은 기존의 autoregressive 비디오 diffusion 모델이 가진 세 가지 핵심 한계를 해결하는 것을 목표로 합니다. 이는 **3D Rotary Positional Embedding (3D-RoPE)** 으로 인한 유한한 시간적 범위, 긴 롤아웃 동안 미세한 액션 제어의 느린 반응성, 그리고 단일 생성 스트림 내에서 불연속적인 시네마틱 전환을 구현하기 어려운 점입니다. 궁극적으로 training-free 방식으로 무한한 시간적 범위, 제어 가능성 및 시네마틱 비디오 생성을 가능하게 하는 통합 프레임워크를 제시하고자 합니다.

## 핵심 방법론
본 연구는 세 가지 상호 연결된 구성 요소를 통해 **∞-ROPE** 라는 통합 추론 시간 프레임워크를 제안합니다. 첫째, **Block-Relativistic RoPE** 는 시간적 인코딩을 움직이는 지역 참조 프레임으로 재구성하여, 새로운 잠재 블록이 기존 모델의 최대 프레임 범위에 상대적으로 회전하고 이전 블록들은 상대적 시간적 기하학을 보존하도록 합니다. 둘째, **KV Flush** 는 KV 캐시를 글로벌 싱크(global sink)와 마지막으로 생성된 잠재 프레임 두 개만 유지하여 새로 고침으로써 즉각적인 프롬프트 반응성을 확보하고 메모리 사용량을 일정하게 유지합니다. 셋째, **RoPE Cut** 은 시간적 RoPE 좌표에 제어된 불연속성을 도입하여 단일 롤아웃 내에서 멀티컷 장면 전환을 가능하게 합니다.

## 주요 결과
**∞-ROPE** 는 VBench 점수에서 기존 autoregressive 모델들을 일관되게 능가하는 성능을 보였습니다. 특히, **60초 비디오** 생성에서 subject, background consistency, motion smoothness, dynamic degree 등에서 state-of-the-art를 달성했습니다 ( **Table 1** 참조). **120초 및 240초 비디오** 에서는 전체 VBench 점수에서 최고 또는 두 번째를 기록하며, **240초 비디오에서 0.8309** 의 종합 점수를 기록하여 확장된 롤아웃에서도 안정적인 장기 시간적 일관성과 동적인 움직임 특성을 입증했습니다 ( **Table 2** 참조). 사용자 연구에서 액션 제어 비디오 생성 시 Text Alignment ( **3.86** ), Subject Consistency ( **3.95** ), Motion Smoothness ( **3.74** ) 등에서 가장 높은 점수를 받았습니다 ( **Table 3** ).

## AI 실무자를 위한 시사점
**∞-ROPE** 는 기존의 autoregressive 비디오 diffusion 모델에 추가 훈련이나 데이터, 계산 자원 없이도 무한한 시간적 범위의 비디오 생성, 정교한 액션 제어, 그리고 시네마틱 장면 전환 기능을 부여할 수 있는 실용적인 솔루션을 제공합니다. 이는 **Block-Relativistic RoPE** 를 통해 모델이 예측 불가능한 위치 인코딩 영역으로 진입하지 않도록 하며, **KV Flush** 를 통해 효율적인 메모리 관리와 즉각적인 프롬프트 반응성을 구현하여 장기 비디오 콘텐츠 제작 및 제어 가능성을 크게 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.