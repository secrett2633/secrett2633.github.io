---
title: "[논문리뷰] Lotus-2: Advancing Geometric Dense Prediction with Powerful Image Generative Model"
excerpt: "Ying-Cong Chen이 [arXiv]에 게시한 'Lotus-2: Advancing Geometric Dense Prediction with Powerful Image Generative Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Geometric Dense Prediction
  - Depth Estimation
  - Surface Normal Prediction
  - Diffusion Models
  - Rectified Flow
  - Generative Priors
  - Deterministic Inference
  - Two-Stage Framework

permalink: /ai/review/2025-12-02-Lotus-2-Advancing-Geometric-Dense-Prediction-with-Powerful-Image-Generative-Model/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01030)

**저자:** Jing He, Haodong Li*, Mingzhi Sheng, Ying-Cong Chen*



## 핵심 연구 목표
본 논문은 단일 이미지에서 픽셀 단위의 기하학적 속성을 복구하는 고질적인 난제(ill-posed problem)를 해결하는 것을 목표로 합니다. 특히, 기존의 확률론적 생성 모델(stochastic generative models)이 결정론적 기하학적 예측에 부적합하여 발생하는 구조적 불일치와 부정확성을 극복하고, 사전 학습된 생성 모델의 강력한 세계 사전 지식(world priors)을 안정적이고 정확하며 세밀하게 활용할 수 있는 최적의 방법을 제시하고자 합니다.

## 핵심 방법론
본 논문은 사전 학습된 **FLUX 모델** [18]을 기반으로 하는 **두 단계 결정론적 프레임워크인 Lotus-2** 를 제안합니다. 첫 번째 단계인 **핵심 예측기(Core Predictor)** 는 **단일 단계(single-step)** , **클린-데이터 예측(clean-data prediction)** , 그리고 **경량 국부 연속성 모듈(Local Continuity Module, LCM)** 을 통해 전역적으로 일관되고 정확한 기하학적 구조를 예측합니다. 두 번째 단계인 **디테일 선명화기(Detail Sharpener)** 는 핵심 예측기의 출력을 기반으로, **제약된 다단계 rectified-flow 정제** 를 사용하여 고주파 디테일을 개선하고, 구조적 정확성을 유지하면서 세밀한 기하학적 정보를 조각합니다.

## 주요 결과
**Lotus-2** 는 **단 59K개의 학습 샘플** (기존 대규모 데이터셋의 약 0.09%~0.66%에 불과)만으로도 **단안 깊이 추정(monocular depth estimation)** 에서 새로운 **최첨단(state-of-the-art) 성능** 을 달성했습니다. 다양한 데이터셋에서 기존 모델들을 능가하는 **평균 순위(Avg. Rank)** 를 기록했으며 (깊이 추정: **3.6위** , 표면 법선 추정: **2.9위** ), **유화 및 투명 객체** 와 같은 어려운 경우에도 **날카로운 기하학적 디테일** 을 재구성하는 강력한 제로샷 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 **생성형 Diffusion 모델** 이 학습한 세계 사전 지식을 **결정론적 Dense Prediction** 태스크에 효과적으로 재활용하는 실용적인 방법론을 제시합니다. 특히, **데이터 효율성이 매우 높다** 는 점에서, 라벨링 비용이 많이 드는 분야에서 제한된 데이터만으로도 **고성능 AI 모델** 을 구축할 수 있는 가능성을 열어줍니다. **두 단계 분리된 설계(decoupled two-stage design)** 는 모델이 구조적 정확성과 미세 디테일 정제라는 서로 다른 목표를 동시에 달성하도록 하여, 고품질 기하학적 추론이 필요한 실제 응용 분야에 큰 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.