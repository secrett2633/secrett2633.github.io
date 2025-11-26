---
title: "[논문리뷰] ReDirector: Creating Any-Length Video Retakes with Rotary Camera Encoding"
excerpt: "이 [arXiv]에 게시한 'ReDirector: Creating Any-Length Video Retakes with Rotary Camera Encoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Retake Generation
  - Camera Control
  - Rotary Position Embedding (RoPE)
  - Rotary Camera Encoding (RoCE)
  - Geometric Consistency
  - Video Generative Models
  - Transformer Architecture
  - Multi-view Synthesis

permalink: /ai/review/2025-11-26-ReDirector-Creating-Any-Length-Video-Retakes-with-Rotary-Camera-Encoding/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19827)

**저자:** Byung-Hoon Kim, Byeongjun Park, Hyungjin Chung, Jong Chul Ye



## 핵심 연구 목표
본 연구는 기존 비디오 리테이크 생성 방법론이 가변 길이 입력, 동적 카메라 모션, 분포 외 카메라 궤적에 취약하며, 종종 워핑 아티팩트나 흐릿한 객체를 생성하는 한계를 해결하고자 합니다. 특히, **RoPE(Rotary Position Embedding)의 오용**을 바로잡고 **카메라 제어 비디오 생성 모델**의 **동적 객체 지역화 및 정적 배경 보존** 능력을 향상시켜, 동적으로 캡처된 **임의 길이 비디오**에 대해 물리적으로 그럴듯한 리테이크를 생성하는 것을 목표로 합니다.

## 핵심 방법론
이 논문은 사전 학습된 **카메라 제어 이미지-투-비디오 생성 모델(Wan-I2V-CamCtrl [61])**을 미세 조정하여 **ReDirector**를 제안합니다. 핵심적으로, 입력 및 타겟 비디오 모두에 **공유 3D RoPE**를 적용하여 시공간적 위치를 정렬하고 길이 불변 위치 인코딩을 보존하며, **Plücker rays**를 토큰 레벨 카메라 인코딩으로 활용합니다. 또한, 카메라 포즈를 **RoPE 위상 편이**로 통합하는 **RoCE(Rotary Camera Encoding)**를 도입하여 기하학적 일관성을 강화하고, **값 경로에 위상 편이**를 적용하는 **기하학 인식 어텐션**으로 동적 객체와 정적 배경의 분리를 개선합니다.

## 주요 결과
**DAVIS 데이터셋**에서 ReDirector는 기존 방법론 대비 월등한 성능을 보였습니다. 특히, **기하학적 일관성** 지표인 **Dyn-MEt3R은 0.8477** (기존 최고 0.7857), **카메라 제어 정확도** 지표인 **RotErr은 1.666** (기존 최고 2.347)을 달성하여 모든 베이스라인을 능가했습니다. **iPhone 데이터셋**에서는 입력 비디오 길이가 증가함에 따라 **PSNR은 11.85**까지 향상되고 **LPIPS는 0.611**까지 감소하는 등, 길이 및 궤적 분포 외 조건에서도 강력한 일반화 성능과 고품질 리테이크를 입증했습니다.

## AI 실무자를 위한 시사점
ReDirector는 **정교한 카메라 제어가 필요한 영상 편집 및 생성 도구** 개발에 중요한 기술적 발판을 제공합니다. 특히 **가변 길이 입력 및 동적 카메라 움직임**에 강건한 특성 덕분에, 실제 촬영 현장의 흔들리는 푸티지 안정화나 비현실적인 시점의 샷 구성 등 **가상 프로덕션 및 영화 제작** 분야에서 **생산성 향상과 몰입감 증대**에 크게 기여할 수 있습니다. **RoPE와 RoCE**를 활용한 새로운 위치 인코딩 방식은 향후 **비디오 생성 모델의 기하학적 일관성**을 높이는 연구 방향에 중요한 영감을 줄 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.