---
title: "[논문리뷰] Visual Jigsaw Post-Training Improves MLLMs"
excerpt: "Lewei Lu이 [arXiv]에 게시한 'Visual Jigsaw Post-Training Improves MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MLLMs
  - Post-training
  - Self-supervised Learning
  - Visual Understanding
  - Jigsaw Puzzles
  - RLVR
  - Multimodal Perception
  - Spatial Reasoning

permalink: /ai/review/2025-9-30-Visual-Jigsaw-Post-Training-Improves-MLLMs/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25190)

**저자:** Penghao Wu, Yushan Zhang, Haiwen Diao, Bo Li, Lewei Lu, Ziwei Liu



## 핵심 연구 목표
본 논문은 기존 MLLM(Multimodal Large Language Models)의 텍스트 중심 후속 훈련 패러다임이 시각 신호에 대한 세밀한 이해를 과소평가한다는 문제점을 해결하고자 합니다. 모델 아키텍처나 출력 형식을 변경하지 않으면서도, 가볍고 검증 가능한 자가 지도 시각 중심 태스크를 통해 MLLM의 **본질적인 시각적 인지 및 이해 능력**을 강화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 MLLM의 시각 이해를 강화하기 위해 **Visual Jigsaw**라는 자가 지도 후속 훈련 프레임워크를 제안합니다. 이 프레임워크는 시각 입력(이미지, 비디오, 3D 데이터)을 분할하고 섞은 뒤, 모델이 자연어로 올바른 순열을 재구성하도록 요구하는 **순서 재구성 태스크**로 구성됩니다. 특히, **Reinforcement Learning from Verifiable Rewards (RLVR)**를 통해 학습되며, **부분 정확도에 대한 할인 계수(γ)**를 포함하는 **계층적 보상 함수**를 사용합니다.

## 주요 결과
Visual Jigsaw는 다양한 벤치마크에서 MLLM의 시각적 능력에 상당한 개선을 보였습니다. 이미지 영역에서는 **MMStar 벤치마크에서 +6.06%의 성능 향상**을, 비디오 영역에서는 **AoTBench에서 최대 +6.15%의 성능 향상**을 달성했습니다. 3D 데이터의 경우 **DA-2K 벤치마크에서 +17.11%의 가장 큰 성능 향상**을 기록하며, 모델이 깊이 순서와 3D 공간 구조를 효과적으로 학습했음을 입증했습니다.

## AI 실무자를 위한 시사점
Visual Jigsaw는 MLLM의 시각 이해를 강화하는 **가볍고 검증 가능한 자가 지도 후속 훈련 접근 방식**을 제시하며, 복잡한 생성 모델 없이 다양한 MLLM 개발에 활용될 수 있습니다. 이미지, 비디오, 3D 데이터 등 **다양한 모달리티에 걸친 일반성**을 보여주어 실제 멀티모달 애플리케이션에 대한 잠재력을 높입니다. 또한, **RLVR이 일반화 능력**을 향상시키고, **난이도 있는 선행 태스크**가 강력한 지도 신호를 제공한다는 점은 향후 MLLM 훈련 전략 수립에 중요한 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.