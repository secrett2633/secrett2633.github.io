---
title: "[논문리뷰] Thinking in Frames: How Visual Context and Test-Time Scaling Empower Video Reasoning"
excerpt: "이 [arXiv]에 게시한 'Thinking in Frames: How Visual Context and Test-Time Scaling Empower Video Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Visual Reasoning
  - Zero-Shot Generalization
  - Test-Time Scaling
  - Visual Context
  - Sequential Planning
  - Continuous Manipulation

permalink: /ai/review/2026-02-06-Thinking-in-Frames-How-Visual-Context-and-Test-Time-Scaling-Empower-Video-Reasoning/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21037)

**저자:** Chengzu Li, Zanyi Wang, Jiaang Li, Yi Xu, Han Zhou, Huanyu Zhang, Ruichuan An, Dengyang Jiang, Zhaochong An, Ivan Vulić, Serge Belongie, Anna Korhonen



## 핵심 연구 목표
본 논문은 기존 MLLMs가 겪는 미세한 공간 이해 및 연속적인 행동 계획의 한계를 극복하고, 복잡한 시각적 추론을 위한 새로운 패러다임을 제시하는 것을 목표로 합니다. 생성된 비디오 프레임을 중간 추론 단계로 활용하여 비디오 생성 모델의 시각적 추론 능력을 평가하고, 특히 **MAZENAVIGATION** 및 **TANGRAMPUZZLE** 의 두 가지 상이한 시각적 추론 시나리오에서 모델의 일반화 능력을 심층적으로 분석하고자 합니다.

## 핵심 방법론
시각적 추론 문제를 비디오 생성 문제로 공식화하고, 생성 모델 **Pθ(V|Sstart, g)** 를 계획 정책으로 사용합니다. 주요 모델로는 대규모 비디오 데이터에 사전 훈련된 텍스트-투-비디오 확산 모델인 **Wan 2.2 TI2V 5B** 를 사용하며, **LoRA** 를 통해 미세 조정합니다. 모델은 에이전트 아이콘이나 탕그램 조각과 같은 **시각적 컨텍스트** 를 명시적인 제어 제약 조건으로 활용하며, 추론 예산(생성 프레임 수)을 늘리는 **시각적 테스트-타임 스케일링** 을 통해 복잡한 문제 해결 능력을 평가합니다.

## 주요 결과
모델은 **MAZENAVIGATION** 작업에서 인-분포 데이터에 대해 **98.0%의 Exact Match (EM)** 를 달성하며 강력한 성능을 보였습니다. OOD(Out-Of-Distribution) 환경에서도 강력한 제로샷 일반화 능력을 보였는데, 7x7 미로에서 **92.00% EM** 을 달성하고, 미확인 시각적 에이전트 아이콘에 대해서는 성능 저하가 미미했습니다. **시각적 테스트-타임 스케일링** 은 OOD 복잡 경로에서 일반화 성능을 크게 향상시키며, 61프레임에서 121프레임으로 늘릴 때 성능이 꾸준히 증가하고 "자체 수정" 행동이 나타나는 것을 관찰했습니다.

## AI 실무자를 위한 시사점
본 연구는 비디오 생성 모델이 연속적인 역학과 정밀한 기하학적 제어가 필요한 시각적 추론 및 계획 작업에서 MLLMs의 한계를 뛰어넘는 유망하고 확장 가능한 패러다임을 제공함을 시사합니다. **시각적 컨텍스트를 직접적인 제어 메커니즘으로 활용** 하는 것은 OOD 시나리오에서 견고한 일반화와 시각적 일관성 유지에 필수적입니다. 또한, **시각적 테스트-타임 스케일링** 은 추론 예산을 늘려 복잡하고 장기적인 작업을 처리하는 모델의 성능을 향상시킬 수 있는 실용적인 전략으로 활용될 수 있습니다. 그러나 **TANGRAMPUZZLE** 과 같이 시각적 변화가 큰 작업에서는 기하학적 일관성 유지의 어려움으로 인한 추론-충실도 트레이드오프와 아키텍처적 한계를 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.