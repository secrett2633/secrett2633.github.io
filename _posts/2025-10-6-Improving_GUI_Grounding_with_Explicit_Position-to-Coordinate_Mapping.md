---
title: "[논문리뷰] Improving GUI Grounding with Explicit Position-to-Coordinate Mapping"
excerpt: "Spandana Gella이 [arXiv]에 게시한 'Improving GUI Grounding with Explicit Position-to-Coordinate Mapping' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - Vision-Language Models
  - Positional Embedding
  - UI Automation
  - Coordinate Prediction
  - Resolution Generalization
  - Transformer Architecture

permalink: /ai/review/2025-10-6-Improving_GUI_Grounding_with_Explicit_Position-to-Coordinate_Mapping/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03230)

**저자:** Suyuchen Wang, Tianyu Zhang, Ahmed Masry, Christopher Pal, Spandana Gella, Bang Liu, Perouz Taslakian



## 핵심 연구 목표
본 논문은 기존 VLM(Vision-Language Model)의 GUI Grounding(자연어 지시를 픽셀 좌표에 매핑) 한계를 해결하는 것을 목표로 합니다. 특히, 모델이 학습 시 보지 못한 고해상도 디스플레이에 추론할 때 발생하는 불안정한 좌표 예측과 해상도 일반화 문제를 개선하고자 합니다. 이는 추상적인 시각 특징에서 픽셀 좌표를 암시적으로 학습하는 방식의 근본적인 문제점을 해결하려는 시도입니다.

## 핵심 방법론
두 가지 혁신적인 방법을 제시합니다. 첫째, **RULER (Rotary position-to-pixeL mappER) 토큰**을 도입하여 명시적인 좌표 참조 시스템을 구축합니다. 이 토큰은 이미지 패치와 동일한 위치 임베딩을 공유하며, 모델이 가장 가까운 **RULER 토큰**을 참조하여 좌표를 생성하도록 유도함으로써 불안정한 회귀 문제를 안정적인 참조-조정 메커니즘으로 전환합니다. 둘째, **Interleaved MROPE (I-MROPE)**를 통해 표준 positional encoding의 주파수 불균형을 해결합니다. 이는 주파수 구성 요소를 공간 차원(너비, 높이)에 교차 할당하여 각 차원이 고주파수와 저주파수 스펙트럼을 모두 받도록 함으로써 균형 잡힌 공간 표현을 가능하게 합니다.

## 주요 결과
**ScreenSpot-Pro** 벤치마크(훈련 해상도를 초과하는 고해상도 디스플레이)에서 모델의 성능이 크게 향상되었습니다. 파인튜닝 시 **Qwen2.5-VL + RULER** 모델은 **UGround-V1-7B**의 **31.1%** 대비 **37.2%**의 정확도를 달성하여 고해상도 인터페이스에서 강력한 일반화 능력을 보였습니다. 또한, **RULER 토큰**은 8K 디스플레이에서도 전체 토큰 수의 **1% 미만**만을 차지하여 미미한 계산 오버헤드를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 GUI Grounding 시스템의 **고해상도 환경에서의 좌표 예측 신뢰성**을 획기적으로 향상시킬 수 있는 실용적인 방법론을 제공합니다. 특히 **RULER 토큰**의 도입은 기존 VLM 아키텍처에 쉽게 통합될 수 있어, 다양한 해상도와 플랫폼에서 **UI 자동화 에이전트의 안정성**을 높이는 데 기여할 수 있습니다. 낮은 계산 오버헤드는 **실제 서비스 배포**에 유리하며, 명시적인 공간 지침의 성공은 정밀한 시각적 로컬라이제이션이 필요한 다른 AI 태스크에도 적용 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.