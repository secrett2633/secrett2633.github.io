---
title: "[논문리뷰] SAM2S: Segment Anything in Surgical Videos via Semantic Long-term Tracking"
excerpt: "이 [arXiv]에 게시한 'SAM2S: Segment Anything in Surgical Videos via Semantic Long-term Tracking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Surgical Video Segmentation
  - Interactive Video Object Segmentation
  - Long-term Tracking
  - Foundation Models
  - Domain Adaptation
  - Semantic Learning
  - Prompt-based Segmentation

permalink: /ai/review/2025-11-21-SAM2S_Segment_Anything_in_Surgical_Videos_via_Semantic_Long-term_Tracking/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16618)

**저자:** Haofeng Liu, Guanyi Qin, Ziyue Wang, Sudhanshu Mishra, Chang Han Low, Alex Y. W. Kong, Mingqi Gao, Yueming Jin



## 핵심 연구 목표
수술 비디오 세분화는 컴퓨터 지원 수술에 필수적이지만, 기존 **SAM2**와 같은 iVOS 모델은 도메인 격차, 제한된 장기 추적 능력, 다중 소스 데이터셋 간의 주석 불일치 문제에 직면해 있습니다. 본 연구는 이러한 한계를 극복하고 수술 시나리오에 특화된 강력한 **SAM2S** 파운데이션 모델을 개발하며, 최대 규모의 수술 iVOS 벤치마크인 **SA-SV**를 구축하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 인스턴스 레벨 시공간 주석(masklets)을 포함하는 최대 규모의 수술 iVOS 벤치마크인 **SA-SV**를 구축했습니다. 제안된 **SAM2S** 모델은 **SAM2**를 기반으로 세 가지 핵심 혁신을 통합합니다: 첫째, **DiveMem**은 견고한 장기 추적을 위해 **학습 가능한 다양한 메모리 메커니즘**을 활용하며, 훈련 중 무작위 샘플링과 추론 중 **코사인 유사도** 기반의 다양성 필터를 사용합니다. 둘째, **Temporal Semantic Learning (TSL)**은 **CLIP 텍스트 인코더**를 사용한 **vision-language 대조 학습**을 통해 기기 의미론적 이해를 강화합니다. 셋째, **Ambiguity-Resilient Learning (ARL)**은 주석 불일치를 완화하기 위해 **가우시안 커널 컨볼루션**을 통한 **레이블 스무딩**과 **Focal Loss**를 적용합니다.

## 주요 결과
**SA-SV** 데이터셋에서 미세 조정된 **SAM2**는 바닐라 **SAM2** 대비 평균 **12.99 J&F**의 상당한 성능 향상을 보였습니다. 제안된 **SAM2S** 모델은 평균 **80.42 J&F**를 달성하여 바닐라 **SAM2** 및 미세 조정된 **SAM2**보다 각각 **17.10 J&F** 및 **4.11 J&F** 포인트 더 높은 성능을 보였습니다. 또한, **SAM2S**는 **68 FPS**의 실시간 추론 속도를 유지하며 강력한 **제로샷 일반화 능력**을 입증했습니다.

## AI 실무자를 위한 시사점
수술 비디오 분석 분야에서 **SAM2**와 같은 파운데이션 모델의 잠재력을 최대한 활용하기 위해 **SA-SV**와 같은 **도메인 특화 대규모 데이터셋** 구축의 중요성을 보여줍니다. **DiveMem**, **TSL**, **ARL**과 같은 모듈식 접근 방식은 장기 추적, 의미론적 이해, 주석 불일치 문제를 해결하는 데 효과적이며, 이는 다른 고유한 도메인에서의 **iVOS 모델 개발**에 중요한 영감을 줄 수 있습니다. **68 FPS**의 실시간 성능과 높은 정확도는 **컴퓨터 지원 수술 시스템**에 **SAM2S**를 실제 적용할 수 있는 길을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.