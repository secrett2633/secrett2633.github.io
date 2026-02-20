---
title: "[논문리뷰] In-Video Instructions: Visual Signals as Generative Control"
excerpt: "arXiv에 게시된 'In-Video Instructions: Visual Signals as Generative Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Controllable AI
  - Visual Instructions
  - Image-to-Video
  - Spatial Control
  - Zero-shot Learning
  - Generative Models

permalink: /ai/review/2025-11-25-In-Video-Instructions-Visual-Signals-as-Generative-Control/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19401)

**저자:** Gongfan Fang, Xinyin Ma, Xinchao Wang



## 핵심 연구 목표
본 논문은 대규모 비디오 생성 모델의 제어 가능성을 탐구하며, 기존 텍스트 프롬프트의 한계인 전역적이고 추상적인 제어를 극복하고자 합니다. 비디오 프레임 내에 시각적 신호를 직접 삽입하여 **정밀하고 공간 인식적인 지시** 를 통해 이미지-투-비디오 생성을 제어하는 새로운 패러다임인 **In-Video Instruction** 을 제안합니다.

## 핵심 방법론
제안하는 In-Video Instruction은 초기 프레임에 **오버레이된 텍스트, 화살표, 궤적** 과 같은 시각적 요소를 통해 사용자 지침을 인코딩합니다. 이 지침은 **"Follow the instructions step by step"** 과 같은 단일 전역 텍스트 프롬프트와 함께 사전 훈련된 비디오 생성 모델에 입력되며, **모델의 아키텍처나 추가 파인튜닝 없이** 제로샷 방식으로 작동합니다.

## 주요 결과
**Veo 3.1, Kling 2.5, Wan 2.2** 등 세 가지 최첨단 비디오 생성 모델에서 In-Video Instruction의 효과를 검증했습니다. 특히, 복수 객체 및 복수 지침 시나리오에 대한 인간 평가 결과, 텍스트 프롬프트 대비 **"Back up" 지침의 성공률은 20.8% 대 8.3%** , **"Turn right"는 58.3% 대 29.2%** , **"Stop"은 95.8% 대 58.3%** 로 현저히 높은 성공률을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 In-Video Instruction을 통해 **복잡한 다중 객체 시나리오** 및 **정확한 공간 제어** 가 필요한 비디오 생성 작업에서 텍스트 기반 제어의 한계를 극복할 수 있습니다. **제로샷(zero-shot) 방식** 으로 추가 학습 없이 기존 모델에 적용 가능하여, 비용 효율적인 **정밀하고 해석 가능한 제어 인터페이스** 를 제공합니다. 그러나 생성된 비디오에 지시 사항이 남아 후처리해야 할 필요성이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.