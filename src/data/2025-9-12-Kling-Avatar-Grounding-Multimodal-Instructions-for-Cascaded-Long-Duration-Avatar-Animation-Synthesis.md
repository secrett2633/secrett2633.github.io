---
title: "[논문리뷰] Kling-Avatar: Grounding Multimodal Instructions for Cascaded
  Long-Duration Avatar Animation Synthesis"
excerpt: "Wentao Hu이 [arXiv]에 게시한 'Kling-Avatar: Grounding Multimodal Instructions for Cascaded
  Long-Duration Avatar Animation Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Avatar Animation
  - Multimodal Instructions
  - Long-Duration Video Generation
  - MLLM Director
  - Cascaded Framework
  - Lip Synchronization
  - Instruction Grounding
  - Video Diffusion Transformers

permalink: /ai/review/2025-9-12-Kling-Avatar-Grounding-Multimodal-Instructions-for-Cascaded-Long-Duration-Avatar-Animation-Synthesis/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09595)

**저자:** Yikang Ding, Jiwen Liu, Wenyuan Zhang, Zekun Wang, Wentao Hu



## 핵심 연구 목표
기존 아바타 애니메이션 방법론의 **지시 불이행 및 장기적 일관성 부족** 문제를 해결하고, 오디오, 이미지, 텍스트 등 **다중 모드 지시**를 심층적으로 이해하여 **표정, 동작, 립싱크**가 정교하고 사실적인 **고품질 장기 아바타 애니메이션**을 생성하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **두 단계의 캐스케이드 프레임워크**인 **Kling-Avatar**를 제안합니다. 첫 번째 단계에서는 **MLLM Director** (예: **Qwen2.5-Omni**, **Qwen2.5-VL**)가 다중 모드 지시를 **의미론적 스토리라인**으로 변환하여 **청사진 비디오(blueprint video)**를 생성합니다. 두 번째 단계에서는 청사진 비디오에서 추출된 키프레임을 **first-last frame 조건**으로 사용하여 여러 서브 클립을 **병렬적으로 생성**하며, 이 과정에서 **MLLM Director**의 지역화된 의미론적 계획과 **시간 정렬된 오디오 조건**이 세부적인 동역학을 제어합니다. **DWPose**를 활용한 입술 영역 가중치 부여 및 **negative frame CFG** 등의 학습/추론 전략도 사용됩니다.

## 주요 결과
**Kling-Avatar**는 자체 구축한 벤치마크에서 **OmniHuman-1** 및 **HeyGen** 대비 **GSB(Good/Same/Bad) 평가지표**에서 **전반적으로 우수한 성능**을 달성했습니다. 특히, **Overall GSB 스코어**에서 **OmniHuman-1**보다 **2.39**, **HeyGen**보다 **1.37** 높은 선호도를 보였습니다. 최대 **1080p 해상도 및 48fps**로 생생하고 유창한 장기 비디오를 생성하며, **정확한 립싱크, 풍부한 감정 표현, 지시 제어 가능성, 신원 일관성, 교차 도메인 일반화** 측면에서 뛰어난 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**다중 모드 대규모 언어 모델(MLLM)**을 활용하여 **고수준의 의미론적 계획**을 생성 과정에 통합하는 방식은 기존 저수준 신호 추적의 한계를 극복하는 혁신적인 접근법입니다. **캐스케이드 및 병렬 생성 프레임워크**는 **장기 비디오 생성의 일관성과 안정성**을 확보하는 데 효과적이며, 디지털 휴먼 라이브스트리밍, 브이로그 등 실제 응용 분야에 직접적으로 활용될 수 있습니다. **데이터 품질 관리** 및 **견고한 학습/추론 전략**의 중요성을 강조하여 고품질 결과물을 위한 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.