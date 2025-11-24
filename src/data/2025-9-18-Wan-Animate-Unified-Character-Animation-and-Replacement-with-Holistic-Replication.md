---
title: "[논문리뷰] Wan-Animate: Unified Character Animation and Replacement with Holistic
  Replication"
excerpt: "Mingyang Huang이 [arXiv]에 게시한 'Wan-Animate: Unified Character Animation and Replacement with Holistic
  Replication' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Character Animation
  - Video Replacement
  - Diffusion Models
  - Transformer
  - DiT
  - Relighting LoRA
  - Holistic Replication
  - Open-Source

permalink: /ai/review/2025-9-18-Wan-Animate-Unified-Character-Animation-and-Replacement-with-Holistic-Replication/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14055)

**저자:** HumanAIGC Team, Tongyi Lab, Alibaba (Mingyang Huang, Siqi Hu, Li Hu, Xin Gao, Gang Cheng 등)



## 핵심 연구 목표
논문은 캐릭터 애니메이션과 교체를 위한 **통합 프레임워크**를 제시하여, 동작, 표정, 환경 상호작용에 대한 **총체적인 제어**를 고품질로 달성하는 것을 목표로 합니다. 기존 오픈소스 솔루션의 성능 및 기능적 한계를 극복하고, 다양한 시나리오에서 일관성과 표현력을 갖춘 캐릭터 비디오 생성을 가능하게 하고자 합니다.

## 핵심 방법론
**Wan-I2V 모델**을 기반으로, 참조 조건과 생성 영역을 구분하는 **수정된 입력 패러다임**을 사용하여 여러 태스크를 통합합니다. 신체 동작은 **공간적으로 정렬된 스켈레톤 신호**로 복제하고, 표정은 원본 이미지에서 추출된 **암시적 얼굴 특징**을 통해 재연합니다. 캐릭터 교체 시 환경 통합을 강화하기 위해 **보조 Relighting LoRA** 모듈을 개발하여 환경 조명과 색조를 적용합니다.

## 주요 결과
**Wan-Animate**는 정량적 평가에서 **SSIM 0.813, LPIPS 0.227, FVD 118.65**를 달성하여 기존 오픈소스 프레임워크 중 최고 성능을 보여줍니다. 특히, 얼굴 애니메이션에 특화된 평가에서는 **SSIM 0.834, LPIPS 0.205, FVD 94.65**로 더욱 뛰어난 결과를 기록했습니다. 또한, 인간 평가지표에서도 **Runway Act-two** 및 **DreamActor-M1**과 같은 상업용 SOTA 모델 대비 우수한 선호도를 보였습니다.

## AI 실무자를 위한 시사점
이 논문은 **Diffusion Transformer (DiT) 기반 모델**의 영상 생성 능력을 활용하여 캐릭터 애니메이션 및 교체라는 복잡한 문제를 해결하는 효과적인 접근법을 제시합니다. **진보적인 훈련 파이프라인**과 **Relighting LoRA**와 같은 모듈형 제어는 실제 AI 응용 시 모델 개발 및 미세 조정을 위한 중요한 통찰을 제공하며, **오픈소스 공개**는 관련 연구 및 개발을 가속화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.