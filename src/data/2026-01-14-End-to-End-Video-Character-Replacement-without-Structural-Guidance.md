---
title: "[논문리뷰] End-to-End Video Character Replacement without Structural Guidance"
excerpt: "이 [arXiv]에 게시한 'End-to-End Video Character Replacement without Structural Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Character Replacement
  - Diffusion Models
  - In-Context Learning
  - Reinforcement Learning
  - Structural Guidance
  - Video Editing
  - Data Generation Pipeline

permalink: /ai/review/2026-01-14-End-to-End-Video-Character-Replacement-without-Structural-Guidance/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08587)

**저자:** Zhengbo Xu, Jie Ma, Ziheng Wang, Zhan Peng, Jun Liang, Jing Li (AliBaBa Group)



## 핵심 연구 목표
본 논문은 기존 비디오 캐릭터 교체 방법론이 페어링된 데이터 부족과 **per-frame segmentation masks** 및 **explicit structural guidance (e.g., skeleton, depth)** 에 의존하여 일반화 및 시각적 일관성 측면에서 한계를 보이는 문제를 해결하고자 합니다. 이를 극복하여, **단일 프레임 마스크** 만을 사용하여 구조적 가이드 없이도 고품질의 비디오 캐릭터 교체를 수행하는 **end-to-end 프레임워크 MoCha** 를 제안하는 것을 목표로 합니다.

## 핵심 방법론
MoCha는 소스 캐릭터의 움직임과 표정을 배경 장면과 분리하고, 이를 새로운 참조 아이덴티티에 효율적으로 전이하기 위해 **condition-aware RoPE** 를 도입하여 비디오 콘텐츠, 프레임 마스크 및 참조 캐릭터 아이덴티티 등 멀티모달 입력을 통합합니다. 또한, 캐릭터의 얼굴 아이덴티티 일관성을 강화하기 위해 **differentiable facial reward function (Arcface 유사성 + MSE 손실)** 에 기반한 **RL(강화 학습) 기반의 post-training stage** 를 사용합니다. 부족한 학습 데이터 문제를 해결하기 위해 **Unreal Engine 5 (UE5) 렌더링 데이터** , **표정 기반 얼굴 애니메이션 데이터 (Flux inpainting + LivePortrait)** , **증강된 비디오-마스크 데이터 (VIVID-10M, VPData)** 세 가지 소스를 결합한 **종합적인 데이터 구축 파이프라인** 을 제안합니다.

## 주요 결과
MoCha는 기존의 SOTA 방법론들을 크게 능가하는 성능을 보였습니다. 합성 벤치마크에서 **SSIM 0.746** , **LPIPS 0.152** , **PSNR 23.09** 를 달성하여 우수성을 입증했습니다. 실제 세계 VBench 벤치마크에서는 **Subject Consistency 92.25** , **Background Consistency 94.40** , **Aesthetic Quality 60.24** , **Motion Smoothness 98.79** 를 기록하며 높은 품질과 일관성을 보여주었습니다. 특히, **단일 프레임 마스크** 만으로 비디오 전반에 걸쳐 캐릭터를 효과적으로 추적하는 능력을 입증했습니다.

## AI 실무자를 위한 시사점
MoCha는 **단일 프레임 마스크** 만으로 비디오 캐릭터 교체를 가능하게 하여, 복잡한 전처리(예: 매 프레임 마스크, 골격/깊이 맵 추출) 없이도 고품질 비디오 편집 워크플로우를 간소화합니다. **Condition-aware RoPE** 및 **RL 기반 미세 조정** 기법은 멀티모달 입력 통합 및 결과의 신원 일관성 강화에 효과적인 전략으로 활용될 수 있으며, **UE5** 와 **기존 모델 조합** 을 통한 데이터 확장 전략은 고품질의 페어링된 데이터가 부족한 다양한 AI 도메인에 적용될 수 있습니다. 이러한 방법론은 얼굴 교체, 가상 체험 등 다양한 비디오 편집 애플리케이션 개발에 기여할 수 있는 **비디오 확산 모델의 잠재력** 을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.