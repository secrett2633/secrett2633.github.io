---
title: "[논문리뷰] VLS: Steering Pretrained Robot Policies via Vision-Language Models"
excerpt: "arXiv에 게시된 'VLS: Steering Pretrained Robot Policies via Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robot Learning
  - Vision-Language Models
  - Policy Steering
  - Inference-Time Adaptation
  - Out-of-Distribution Generalization
  - Diffusion Models
  - Generative Policies

permalink: /ai/review/2026-02-05-VLS-Steering-Pretrained-Robot-Policies-via-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03973)

**저자:** Shuo Liu¹,⁴, Ishneet Sukhvinder Singh², Yiqing Xu³,⁴, Jiafei Duan¹,⁴,*, Ranjay Krishna¹,⁴,*
¹University of Washington ²University of Oxford ³National University of Singapore ⁴Allen Institute for Artificial Intelligence *Co-advising



## 핵심 연구 목표
본 논문은 사전 학습된 로봇 정책이 새로운 객체, 장면, 또는 명령 변경과 같은 **분포 외(Out-of-Distribution, OOD) 시나리오** 에서 실패하는 문제를 해결하고자 합니다. 기존 정책의 파라미터를 수정하지 않고 **추론 시간(inference-time)에 정책을 적응** 시켜, 로봇이 새로운 공간적 및 태스크 요구사항에 따라 기존 기술을 유연하게 조정할 수 있도록 하는 훈련-무료(training-free) 프레임워크를 제안합니다.

## 핵심 방법론
VLS는 **Vision-Language Model (VLM)** 의 개방형 세계 이해 능력을 활용하여 **차등 가능한(trajectory-differentiable) 보상 함수** 를 생성합니다. 이 보상 함수는 **사전 학습된 Diffusion 또는 Flow-Matching 정책** 의 디노이징(denoising) 샘플링 과정을 안내합니다. 구체적으로, **SAM (Segment Anything Model)** 및 **DINOv2** 를 사용하여 관측 및 언어 명령을 **공간 키포인트(spatial keypoints)** 로 접지하고, VLM이 **단계별(stage-aware) 보상 함수** 를 생성합니다. 샘플링 과정에서는 **RBF 기반의 다양성 초기화** , **그래디언트 기반 정제(refinement)** , 그리고 **Feynman-Kac 기반의 그래디언트-자유 리샘플링(resampling)** 을 통해 OOD 조건에 정렬된 액션 궤적을 생성합니다. 또한, **닫힌 루프(closed-loop) 실행 제어 및 단계 전환(stage switching)** 메커니즘을 통해 물리적 불확실성에 대응합니다.

## 주요 결과
VLS는 시뮬레이션 및 실제 환경에서 기존 조향(steering) 방식보다 일관되게 우수한 성능을 보였습니다. **CALVIN** 벤치마크에서 **31%의 성공률 향상** 과 **LIBERO-PRO** 에서 **13%의 성능 향상** 을 달성했습니다. CALVIN의 이동 가능한 객체(movable objects) 태스크에서는 **94%의 평균 성공률** 을 달성하여 기본 정책 대비 **7.4배 향상** 을, 관절형 부품(articulated parts) 태스크에서는 **87%의 성공률** 을 기록하여 **9.6배 향상** 을 보였습니다. 실세계 Franka 로봇 실험에서는 분포 내(in-distribution) 태스크 성공률을 **19% 향상** 시켰으며, 이전에 보지 못한 머그잔과 같은 OOD 시나리오에서도 **40%의 성공률** 을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 사전 학습된 로봇 정책을 재훈련 없이 **다양한 실제 환경에 효과적으로 적용** 할 수 있는 실용적인 방법을 제시합니다. VLM을 활용한 **동적 보상 함수 생성** 은 OOD 시나리오에서의 로봇 적응력을 크게 향상시키며, 이는 복잡하고 예측 불가능한 환경에서 로봇 시스템을 배포하는 데 중요한 이정표가 됩니다. 다만, **배치 샘플링, MCMC 실행, FK 리샘플링** 등으로 인해 **계산 지연(computational latency)** 이 발생할 수 있으므로, 실시간 애플리케이션을 위한 효율성 최적화가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.