---
title: "[논문리뷰] Mixture of Global and Local Experts with Diffusion Transformer for
  Controllable Face Generation"
excerpt: "Kai Li이 [arXiv]에 게시한 'Mixture of Global and Local Experts with Diffusion Transformer for
  Controllable Face Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Transformer
  - Mixture of Experts
  - Controllable Generation
  - Face Generation
  - Multimodal Synthesis
  - Semantic Control
  - Image Generation

permalink: /ai/review/2025-9-4-Mixture-of-Global-and-Local-Experts-with-Diffusion-Transformer-for-Controllable-Face-Generation/

toc: true
toc_sticky: true

date: 2025-09-04 12:56:15+0900
last_modified_at: 2025-09-04 12:56:15+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.00428)

**저자:** Xuechao Zou, Shun Zhang, Xing Fu, Yue Li, Kai Li, Yushe Cao, Congyan Lang, Pin Tao, Junliang Xing



## 핵심 연구 목표
논문은 기존 생성 모델이 의미론적 제어와 사진 같은 사실성 사이의 섬세한 균형을 맞추는 데 어려움을 겪고, 특히 **Diffusion Transformer (DiT)**가 복잡한 다중 모드 조건부 설정에서 충분히 탐색되지 않았다는 문제를 해결하고자 합니다. 궁극적으로는 높은 품질의 제어 가능한 얼굴 생성을 위한 통합적이고 유연한 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Diffusion Transformer (DiT)** 백본과 **FLUX [26]**를 기반으로 **Mixture of Global and Local Experts (MoGLE)** 아키텍처를 도입합니다. 입력 마스크를 여러 이진 마스크로 **의미론적 디커플링**하여 **글로벌 전문가**가 전체 구조를, **지역 전문가**가 특정 영역의 세부 사항을 처리하도록 합니다. 또한, 확산 단계 및 공간 위치에 따라 전문가 출력을 동적으로 통합하는 **확산 인식 동적 게이팅 네트워크**를 사용하여 세밀한 제어력을 확보합니다.

## 주요 결과
**MM-CelebA-HQ** 데이터셋에서 다중 모드 얼굴 생성 시 **FID 22.24**, **KID 10.87**, **CMMD 0.477**를 달성하여 최신 모델들을 능가하는 성능을 보였습니다. 특히 **MM-FFHQ-Female** 데이터셋의 제로샷 일반화 평가에서 기존 확산 기반 모델인 **UaC [33]** 대비 **FID 27.3%**, **KID 32.9%** 감소를 기록하며 우수한 일반화 능력을 입증했습니다. 또한, 본 모델로 생성된 이미지는 **NPR [49]** 및 **Wavelet-CLIP [1]** 딥페이크 탐지 모델에 대해 높은 사실성을 보여주며, 탐지 회피 능력을 시사했습니다.

## AI 실무자를 위한 시사점
**Face-MoGLE**는 마스크 정보의 의미론적 디커플링과 동적 전문가 선택을 통해 얼굴 특징을 정밀하게 조작할 수 있는 능력을 제공하여 디지털 콘텐츠 생성, 가상 휴먼, 보안 응용 분야에서 높은 실용성을 가집니다. **Diffusion Transformer**와 **MoE**의 결합은 높은 이미지 품질과 강력한 제어 가능성을 동시에 달성하며, 다양한 조건과 제로샷 상황에서도 견고한 성능을 보여 개발 비용과 시간을 절감할 수 있는 잠재력을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.