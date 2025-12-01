---
title: "[논문리뷰] Durian: Dual Reference-guided Portrait Animation with Attribute Transfer"
excerpt: "Hanbyul Joo이 [arXiv]에 게시한 'Durian: Dual Reference-guided Portrait Animation with Attribute Transfer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Portrait Animation
  - Attribute Transfer
  - Diffusion Models
  - Dual Reference Networks
  - Zero-shot Learning
  - Self-Reconstruction
  - Facial Editing

permalink: /ai/review/2025-9-5-Durian-Dual-Reference-guided-Portrait-Animation-with-Attribute-Transfer/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04434)

**저자:** Hyunsoo Cha, Byungjun Kim, Hanbyul Joo



## 핵심 연구 목표
본 논문은 주어진 참조 이미지로부터 대상 인물의 얼굴 속성(예: 헤어스타일, 안경)을 전이하여 동적인 초상화 애니메이션 비디오를 **제로샷(zero-shot)** 방식으로 생성하는 것을 목표로 합니다. 기존 정적 이미지 편집이나 복잡한 마스킹, 또는 방대한 **트리플렛 데이터(triplet data)** 구축의 한계를 극복하고, 다양한 속성과 표현에 일관성을 유지하는 애니메이션을 구현하고자 합니다.

## 핵심 방법론
제안된 **Durian** 모델은 속성 및 인물 이미지에서 공간 특징을 주입하기 위한 **듀얼 레퍼런스 네트워크(Dual ReferenceNet)** 를 활용하며, 이는 디퓨전 모델의 **디노이징 UNet (DNet)** 에 통합됩니다. 훈련 시에는 동일한 영상에서 두 프레임을 샘플링하여 하나는 속성 참조, 다른 하나는 대상 인물로 사용하는 **자기 재구성(self-reconstruction)** 방식을 사용합니다. 또한, 속성별 **마스크 확장 전략(mask expansion strategy)** 과 **공간/외형 변형 증강(augmentation)** 을 통해 견고성과 일반화 성능을 높였습니다.

## 주요 결과
Durian은 초상화 애니메이션 속성 전이 분야에서 **최첨단 성능(state-of-the-art performance)** 을 달성했습니다. 정량적 평가에서 **L1 0.0744** , **PSNR 18.83** , **SSIM 0.6527** , **LPIPS 0.1565** , **FID 38.00** 을 기록하며 기존 기준 모델들을 압도적으로 능가했습니다. 특히, 듀얼 레퍼런스 디자인 덕분에 추가 훈련 없이 단일 생성 과정에서 **다중 속성 조합(multi-attribute composition)** 을 자연스럽게 지원합니다.

## AI 실무자를 위한 시사점
이 연구는 **제로샷 속성 전이** 와 **동적 초상화 애니메이션** 을 결합하여 AR/VR, 가상 아바타, 콘텐츠 생성 등 다양한 분야에서 혁신적인 응용 가능성을 제시합니다. **자기 재구성 훈련 방식** 과 **마스크 확장 전략** 은 방대한 주석 데이터 없이도 모델의 확장성과 견고성을 확보하는 효과적인 방법을 제공하며, **다중 속성 조합** 기능은 복잡한 편집 시나리오에 대한 실용적인 해결책이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.