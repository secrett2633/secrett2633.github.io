---
title: "[논문리뷰] DiffusionLane: Diffusion Model for Lane Detection"
excerpt: "arXiv에 게시된 'DiffusionLane: Diffusion Model for Lane Detection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Lane Detection
  - Diffusion Model
  - Denoising Diffusion
  - Hybrid Decoding
  - Anchor-based
  - Domain Adaptation
  - Computer Vision
  - Generative Models

permalink: /ai/review/2025-10-28-DiffusionLane-Diffusion-Model-for-Lane-Detection/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22236)

**저자:** Kunyang Zhou, Yeqin Shao



## 핵심 연구 목표
기존 앵커 기반 차선 감지 방법론의 고질적인 **일반화 능력 부족** 과 **과적합 문제** 를 해결하기 위해, 차선 감지 태스크를 **노이즈 제거 확산(denoising diffusion) 과정** 으로 재정의하는 **확산 모델 기반 프레임워크** 를 제안하는 것을 목표로 합니다. 특히, 분포 변화(distribution-shift) 시나리오에서 재훈련 없이 강력한 성능을 보이는 모델을 개발하고자 합니다.

## 핵심 방법론
제안하는 **DiffusionLane** 은 그라운드 트루스 차선의 시작점과 각도 매개변수에 **가우시안 노이즈** 를 추가하여 노이즈가 있는 차선 앵커를 생성하고, 모델이 이를 점진적으로 정제하여 목표 차선을 예측하도록 학습합니다. 인코더의 빈약한 특징 표현 문제를 해결하기 위해, 전역 및 지역 수준 디코더를 결합한 **하이브리드 확산 디코더** 와 학습 가능한 차선 앵커를 활용하는 **보조 헤드(auxiliary head)** 를 포함하는 **하이브리드 디코딩 전략** 을 제안합니다.

## 주요 결과
**DiffusionLane** 은 **Carlane, Tusimple, CULane, LLAMAS** 네 가지 벤치마크에서 기존 SOTA(State-of-the-Art) 방법론을 능가하는 성능을 달성했습니다. 특히, **Carlane의 MuLane 서브셋** 에서 **ResNet18 백본** 사용 시 **CLRerNet** 보다 **1.21%** 높은 **86.23%의 정확도** 를 기록하며 강력한 일반화 능력을 입증했습니다. 또한, **CULane** 에서는 **MobileNetV4 백본** 으로 **81.32% F1 점수** 를 달성하며 새로운 SOTA를 수립했습니다.

## AI 실무자를 위한 시사점
이 연구는 **확산 모델** 을 차선 감지와 같은 지각(perception) 태스크에 성공적으로 적용한 선구적인 사례로, 향후 다양한 컴퓨터 비전 문제에 대한 새로운 해결책을 모색하는 계기가 될 수 있습니다. **랜덤 차선 앵커** 와 **노이즈 제거 확산 패러다임** 을 통해 모델의 **강력한 일반화 능력** 을 확보하여, 실제 자율 주행 환경에서 발생할 수 있는 분포 변화에 효과적으로 대응할 수 있습니다. 다만, 디코더의 다중 실행으로 인해 **추론 속도(FPS)** 가 느려지는 한계가 있어 실시간 애플리케이션을 위한 추가적인 최적화가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.