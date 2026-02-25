---
title: "[논문리뷰] LaS-Comp: Zero-shot 3D Completion with Latent-Spatial Consistency"
excerpt: "[arXiv]에 게시된 'LaS-Comp: Zero-shot 3D Completion with Latent-Spatial Consistency' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Shape Completion
  - Zero-shot
  - Latent-Spatial Consistency
  - Foundation Models
  - Diffusion Models
  - Category-Agnostic
  - Generative Priors

permalink: /ai/review/2026-02-25-LaS-Comp-Zero-shot-3D-Completion-with-Latent-Spatial-Consistency/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18735)

**저자:** Weilong Yan¹, Haipeng Li², Hao Xu³, Nianjin Ye¹, Yihao Ai¹, Shuaicheng Liu², Jingyu Hu³+



## 핵심 연구 목표
기존 3D 형상 완성 방법론들이 다양한 부분 관측 패턴, 범주 간 일반화, 그리고 쌍을 이루는 데이터셋 의존성 및 불완전한 렌더링 가정에서 겪는 한계를 극복하는 것을 목표로 합니다. 특히, 잠재 공간(latent space) 기반의 3D 파운데이션 모델의 강력한 기하학적 사전 지식(geometric priors)을 활용하여, 잠재 공간과 공간 도메인(spatial domain) 간의 불일치를 해소하고 **zero-shot, category-agnostic 3D 형상 완성** 을 달성하고자 합니다.

## 핵심 방법론
**LaS-Comp** 는 가우시안 노이즈에서 시작하여 부분 입력 **Sp** 의 가이드에 따라 잠재 특징 **xt** 를 반복적으로 정제하는 **상호 보완적인 2단계 디자인** 을 제안합니다. 첫 번째 **명시적 대체 단계(Explicit Replacement Stage, ERS)** 에서는 부분 입력의 알려진 기하학적 정보를 잠재 표현에 직접 주입하여 **부분 관측 형상에 대한 충실도(fidelity)** 를 보장합니다. 두 번째 **암묵적 정렬 단계(Implicit Alignment Stage, IAS)** 에서는 기하학적 정렬 손실( **L_align** , **BCE loss** )을 통한 **gradient-based optimization** 으로 관측 및 합성 영역 간의 경계가 매끄럽게 이어지도록 잠재 특징을 정제합니다.

## 주요 결과
**LaS-Comp** 는 기존 **zero-shot** 방법론 대비 우수한 성능을 보였습니다. Redwood 및 Synthetic 데이터셋에서 **ComPC [25]** 보다 **CD** 에서 **27.2%** , **EMD** 에서 **29.0%** 향상되었으며, **GenPC [34]** 보다 **CD** 에서 **18.4%** , **EMD** 에서 **36.1%** 향상되었습니다. 새롭게 도입된 **Omni-Comp 벤치마크** 에서는 **ComPC [25]** 대비 **CD** 에서 **49.6%** , **EMD** 에서 **39.4%** 의 개선을 달성하며 다양한 카테고리와 부분 패턴에 대한 강건성을 입증했습니다. 또한, 각 형상 완성에 **20초** 밖에 걸리지 않아 기존 **zero-shot** 방법보다 **3배 이상 빠릅니다** .

## AI 실무자를 위한 시사점
**LaS-Comp** 는 **기존 3D 파운데이션 모델** 을 활용하여 **별도의 학습 없이(zero-shot)** 다양한 부분 관측 패턴과 객체 카테고리에 걸쳐 3D 형상 완성을 가능하게 합니다. **훈련-자유(training-free)** 특성 덕분에 새로운 데이터셋이나 시나리오에 대한 **빠른 배포 및 적용** 이 용이하며, **20초 이내의 빠른 완성 속도** 는 실시간 또는 근실시간(near real-time) 애플리케이션에 매우 유용합니다. **latent-spatial consistency** 는 관측된 영역의 **충실도** 와 합성된 영역의 **일관성(coherence)** 을 동시에 보장하여 사실적인 결과물을 얻을 수 있도록 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.