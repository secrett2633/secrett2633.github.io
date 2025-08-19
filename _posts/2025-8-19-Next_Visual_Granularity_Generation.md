---
title: "[논문리뷰] Next Visual Granularity Generation"
excerpt: "Kang Liao이 [arXiv]에 게시한 'Next Visual Granularity Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Granularity Control
  - Structured Representation
  - Hierarchical Generation
  - Coarse-to-fine
  - Visual Tokenization
  - Latent Space

permalink: /ai/review/2025-8-19-Next_Visual_Granularity_Generation/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.12811)

**저자:** Yikai Wang, Zhouxia Wang, Zhonghua Wu, Qingyi Tao, Kang Liao, Chen Change Loy



## 핵심 연구 목표
본 논문은 기존 이미지 생성 모델들이 이미지를 평면적이거나 비구조적인 데이터로 취급하여 미세한 제어 및 오류 누적에 한계가 있다는 문제점을 해결하고자 합니다. 이를 위해 이미지를 다양한 시각적 세분성(granularity) 레벨로 계층적으로 분해하는 새로운 **Next Visual Granularity (NVG)** 생성 프레임워크를 제안하여, 생성 과정에 대한 **세밀하고 명시적인 구조 제어**를 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
NVG는 이미지를 고유 토큰 수에 따라 달라지는 **구조화된 시퀀스(structured sequences)**로 표현합니다. **Multi-granularity quantized autoencoder**를 통해 데이터 기반으로 시각적 세분성 시퀀스를 구성하며, 시각적으로 유사한 토큰들을 점진적으로 클러스터링하여 **구조 맵(structure maps)**을 생성합니다. 생성 과정에서는 **lightweight rectified flow model**로 구조 맵을 먼저 생성한 후, **progressive canvas refinement**와 **Structure-Aware RoPE**를 활용하는 **content generator**로 해당 콘텐츠를 생성하는 coarse-to-fine 방식을 사용합니다.

## 주요 결과
NVG 모델은 ImageNet 클래스 조건부 이미지 생성 태스크에서 **VAR (Visual Autoregressive models)** 대비 일관되게 우수한 성능을 보여줍니다. 특히, **FID 점수**에서 NVG-d24 모델이 **2.06**을 달성하여 VAR-d24의 2.09보다 낮았으며, IS(Inception Score) 및 리콜에서도 개선을 보였습니다. 또한, 생성된 이미지는 이진 구조 맵과 잘 정렬되며, 참조 이미지의 구조를 재사용하여 다양한 콘텐츠의 새 이미지를 생성할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
NVG는 이미지 생성 과정에 **직관적인 계층적 제어**를 도입하여, 사용자가 객체의 레이아웃부터 미세한 질감까지 명시적으로 조작할 수 있는 새로운 가능성을 제시합니다. 이는 **이미지 편집, 스타일 전이, 조건부 이미지 생성** 등 고도의 제어가 필요한 AI 응용 분야에서 큰 장점이 될 수 있습니다. 또한, 기존 autoregressive 모델의 한계를 보완하며 효율적인 **residual modeling** 방식을 채택하여 안정적이고 고품질의 이미지 생성을 지원합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.