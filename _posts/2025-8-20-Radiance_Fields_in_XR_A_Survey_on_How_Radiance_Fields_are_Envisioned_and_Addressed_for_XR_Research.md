---
title: "[논문리뷰] Radiance Fields in XR: A Survey on How Radiance Fields are Envisioned
  and Addressed for XR Research"
excerpt: "Susanne Schmidt이 [arXiv]에 게시한 'Radiance Fields in XR: A Survey on How Radiance Fields are Envisioned
  and Addressed for XR Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Radiance Fields
  - XR
  - NeRF
  - 3D Gaussian Splatting
  - View Synthesis
  - Systematic Review
  - Immersive Technology

permalink: /ai/review/2025-8-20-Radiance_Fields_in_XR_A_Survey_on_How_Radiance_Fields_are_Envisioned_and_Addressed_for_XR_Research/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04326)

**저자:** Ke Li, Mana Masuda, Susanne Schmidt, Shohei Mori



## 핵심 연구 목표
이 논문은 **NeRF** 및 **3DGS**와 같은 **Radiance Field (RF)** 기술이 **확장 현실(XR)** 분야에서 어떻게 구상되고(envisioned) 실제로 구현되었는지(addressed) 사이의 연구 격차를 체계적으로 분석하는 것을 목표로 합니다. RF 기술의 급격한 발전에도 불구하고 XR 커뮤니티 내에서의 실제 적용이 미미한 이유를 이해하고, 미해결 연구 과제를 식별하여 향후 연구 방향을 제시하고자 합니다.

## 핵심 방법론
저자들은 **ACM 디지털 라이브러리** 및 **IEEE Xplore** 데이터베이스에서 **컴퓨터 비전(CV)**, **컴퓨터 그래픽스(CG)**, **로봇공학(Robotics)**, **멀티미디어(MM)**, **인간-컴퓨터 상호작용(HCI)**, **XR** 커뮤니티의 RF 관련 논문 365편을 체계적으로 검토했습니다. 특히, 실제 XR 환경에서의 **기술적 벤치마크** 또는 **사용자 연구**를 통해 RF를 상세하게 다룬 66편의 논문을 심층 분석하여 **XR-Envisioned** 및 **XR-Addressed** 주제 간의 차이를 식별하고, 9가지 주요 주제(예: 동적 캡처, 콘텐츠 편집, 사용자 중심 렌더링)로 분류했습니다.

## 주요 결과
**XR-Envisioned** 논문(299편)은 XR의 잠재적 응용 분야를 광범위하게 언급한 반면, **XR-Addressed** 논문(66편)은 실제로 구현된 내용이 훨씬 적어 큰 연구 격차를 보였습니다. 예를 들어, **CVPR 2024**에서 203편의 RF 관련 논문 중 68편이 XR을 언급했지만, **IEEE VR 2024** 및 **IEEE ISMAR 2024**에서는 RF 관련 기여가 11편에 불과했으며, 이 중 5편만이 실제 XR 환경에서 연구 질문을 직접 다루었습니다. **XR 커뮤니티**는 RF의 모든 9가지 토픽 영역에 대해 실제 구현을 다루는 유일한 커뮤니티로 나타났습니다.

## AI 실무자를 위한 시사점
RF 기술이 XR 분야에서 실용적으로 적용되기 위해서는 **실시간 성능**, **압축 효율성**, **데이터 편집 가능성** 및 **멀티모달 상호작용**에 대한 추가 연구가 필수적입니다. **오픈 소스 프레임워크** 및 **도구의 표준화**를 통해 연구 접근성을 높이고, **모바일 XR 기기**에서의 성능 최적화가 필요합니다. 또한, 실제 사용자 경험을 개선하기 위한 **심층적인 사용자 중심 벤치마크**의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.