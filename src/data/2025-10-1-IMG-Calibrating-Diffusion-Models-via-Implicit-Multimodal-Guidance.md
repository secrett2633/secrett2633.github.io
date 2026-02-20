---
title: "[논문리뷰] IMG: Calibrating Diffusion Models via Implicit Multimodal Guidance"
excerpt: "arXiv에 게시된 'IMG: Calibrating Diffusion Models via Implicit Multimodal Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Multimodal Alignment
  - MLLM
  - Image Re-generation
  - Preference Learning
  - Implicit Guidance
  - Text-to-Image

permalink: /ai/review/2025-10-1-IMG-Calibrating-Diffusion-Models-via-Implicit-Multimodal-Guidance/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26231)

**저자:** Jiayi Guo, Chuanhao Yan, Xingqian Xu, Yulin Wang, Kai Wang, Gao Huang, Humphrey Shi



## 핵심 연구 목표
확산 모델(Diffusion Models)에서 생성된 이미지와 입력 프롬프트 간의 **정확한 멀티모달 정렬(multimodal alignment)** 부족 문제를 해결합니다. 기존의 미세 조정(finetuning) 기반 방법은 고품질 데이터의 부족으로 확장이 어렵고, 편집(editing) 기반 방법은 전체적인 이미지 품질을 저하시킬 수 있다는 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
**Implicit Multimodal Guidance (IMG)** 라는 새로운 재-생성(re-generation) 기반 정렬 프레임워크를 제안합니다. 이 방법은 먼저 **미세 조정된 멀티모달 대규모 언어 모델(MLLM)** 을 사용하여 이미지-프롬프트 불일치를 식별합니다. 이어서 **Implicit Aligner** 가 MLLM의 **가이드런스 피처(guidance features)** 와 초기 이미지 피처를 입력받아 확산 모델의 컨디셔닝 피처를 조정하여 불일치를 감소시키고 재-생성을 가능하게 합니다. Implicit Aligner는 **Iteratively Updated Preference Objective** 를 사용하여 훈련되며, 이는 **직접 선호도 최적화(DPO)** 와 **셀프 플레이 미세 조정(SPIN)** 을 결합한 것입니다.

## 주요 결과
정성 및 정량 평가 모두에서 **IMG** 가 기존 정렬 방법들을 능가함을 입증했습니다. **SDXL + IMG** 는 평균 HPS 스코어 **28.56** 을 달성하며 기본 SDXL 대비 **87.2%의 승률** 을 보였고, **FLUX + IMG** 는 평균 HPS 스코어 **29.48** 로 기본 FLUX 대비 **65.7%의 승률** 을 기록했습니다. 사용자 연구에서는 약 **70%** 의 사용자가 IMG를 통해 재정렬된 이미지를 선호했으며, **T2I-CompBench** 벤치마크에서 **FLUX + IMG** 는 대부분의 compositional image generation 지표에서 최고 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**IMG** 는 기존 확산 모델에 **플러그 앤 플레이(plug-and-play) 어댑터** 로 seamlessly 통합되어 추가 데이터나 편집 작업 없이 프롬프트 정렬 성능을 향상시킬 수 있습니다. 특히, **미세 조정된 MLLM** 을 활용한 불일치 감지 메커니즘은 이미지 생성의 정확도를 크게 개선하며, 재-생성 방식이 이미지의 전반적인 **미적 품질을 유지** 하면서 개념 이해, 미적 품질, 객체 추가 및 교정 등 다양한 측면에서 불일치를 효과적으로 완화합니다. 이는 복잡한 프롬프트에서도 높은 충실도로 이미지를 생성하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.