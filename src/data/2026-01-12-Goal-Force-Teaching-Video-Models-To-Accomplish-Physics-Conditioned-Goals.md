---
title: "[논문리뷰] Goal Force: Teaching Video Models To Accomplish Physics-Conditioned Goals"
excerpt: "Arjan Chakravarthy이 arXiv에 게시한 'Goal Force: Teaching Video Models To Accomplish Physics-Conditioned Goals' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - World Models
  - Physics-Conditioned Goals
  - Causal Planning
  - Force Vectors
  - Zero-Shot Generalization
  - Diffusion Models
  - Robotics Planning

permalink: /ai/review/2026-01-12-Goal-Force-Teaching-Video-Models-To-Accomplish-Physics-Conditioned-Goals/

toc: true
toc_sticky: true

date: 2026-01-12 00:00:00+0900+0900
last_modified_at: 2026-01-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05848)

**저자:** Nate Gillman, Yinghua Zhou, Zitian Tang, Evan Luo, Arjan Chakravarthy, Daksh Aggarwal, Michael Freeman, Charles Herrmann, Chen Sun



## 핵심 연구 목표
기존 비디오 생성 "월드 모델"이 복잡한 물리적 작업을 위한 정확한 목표를 지정하는 데 어려움을 겪는 문제를 해결하는 것을 목표로 합니다. 특히 텍스트 명령어의 추상성과 동적 작업에서 대상 이미지의 비실용성을 극복하기 위해, 명시적인 **힘 벡터** 와 **중간 역학** 을 통해 목표를 정의하고, 모델이 목표 달성을 위한 선행 동작을 생성하도록 하는 프레임워크를 제안합니다.

## 핵심 방법론
`Goal Force` 프레임워크는 명시적인 목표 힘 벡터에 기반한 비디오 생성을 조건화합니다. **Wan2.2** 기본 모델과 **ControlNet** 모듈을 활용하여 3채널 물리 제어 신호(직접 힘, 목표 힘, 질량)를 입력으로 받도록 모델을 조정합니다. **Blender** 와 **PhysDreamer** 로 생성된 **탄성 충돌** 및 **도미노 쓰러뜨리기** 와 같은 단순한 인과적 기본 데이터셋으로 모델을 훈련하며, 훈련 시 무작위로 인과 정보를 마스킹하여 모델이 목표를 달성하기 위한 선행 동작을 추론하도록 유도합니다.

## 주요 결과
제안된 `Goal Force` 모델은 텍스트 전용 기준선 대비 목표 힘 준수에서 일관되게 우수한 성능을 보였습니다. 특히 **도구 조작** 및 **다중 객체 인과 체인** 과 같은 복잡한 실제 시나리오에 대해 훈련 데이터와는 다른 영역에서 놀라운 **제로샷 일반화 능력** 을 입증했습니다. 또한, 시각적 계획 정확도 면에서 **도미노 1** 시나리오에서 **100.00%** , **Pool 2** 시나리오에서 **97.96%** 의 높은 성공률을 달성했으며, 5개 도미노 작업에서 `0.6577`의 **다양성 지표(δ(p))** 점수를 기록하여 모드 붕괴 없이 다양한 유효 계획을 생성합니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 공학 및 계획 분야에서 **월드 모델** 의 목표 지정 방식을 텍스트나 정적 이미지에서 벗어나 물리적으로 직관적인 **힘 벡터** 기반으로 전환하는 새로운 패러다임을 제시합니다. 외부에 물리 엔진에 의존하지 않고 비디오 모델 자체가 물리적 상호작용을 학습하여 **암묵적인 신경 물리 시뮬레이터** 역할을 할 수 있음을 시사하며, 이는 물리 인식 계획을 가능하게 합니다. 단순한 데이터로 훈련하여 복잡한 실제 시나리오에 대한 **제로샷 일반화** 를 달성할 수 있음을 보여주어, 다양한 응용 분야에서 모델 개발의 효율성을 높일 잠재력을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.