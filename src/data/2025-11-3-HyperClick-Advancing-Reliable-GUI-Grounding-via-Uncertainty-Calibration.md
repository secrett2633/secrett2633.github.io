---
title: "[논문리뷰] HyperClick: Advancing Reliable GUI Grounding via Uncertainty Calibration"
excerpt: "Anan Du이 [arXiv]에 게시한 'HyperClick: Advancing Reliable GUI Grounding via Uncertainty Calibration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - Uncertainty Calibration
  - Reinforcement Learning
  - Confidence Estimation
  - Brier Score
  - GUI Agents
  - Visual-Language Models

permalink: /ai/review/2025-11-3-HyperClick-Advancing-Reliable-GUI-Grounding-via-Uncertainty-Calibration/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27266)

**저자:** Shaojie Zhang, Pei Fu, Ruoceng Zhang, Jiahui Yang, Anan Du, Xiuwen Xi, Shaokang Wang, Ying Huang, Bin Qin, Zhenbo Luo, Jian Luan



## 핵심 연구 목표
본 논문은 자율 **GUI(Graphical User Interface) 에이전트**가 부정확하거나 과도한 확신을 가진 예측을 생성하여 태스크 실패로 이어지는 문제를 해결하고자 합니다. 기존 모델들이 보이는 **실제 정확도와 예측 신뢰도 간의 불일치**를 체계적으로 평가하고, 이를 개선하여 **신뢰성 높은 GUI 그라운딩**을 달성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **HyperClick** 프레임워크는 불확실성 보정을 통해 GUI 그라운딩의 신뢰성을 향상시킵니다. 이는 **정확성 보상(binary correctness reward)**과 **절단된 가우시안(truncated Gaussian) 분포 기반의 공간 신뢰도 모델링**을 결합한 **이중 보상 메커니즘**을 도입합니다. 모델의 예측 신뢰도는 **Brier score**를 사용하여 보정되며, **Group Relative Policy Optimization (GRPO)**을 통해 그라운딩 정확도와 신뢰도 안정성을 동시에 최적화합니다.

## 주요 결과
**HyperClick-7B**는 7개의 도전적인 벤치마크에서 **최고 수준의 성능**을 달성했습니다. 특히 **ScreenSpot-Pro 벤치마크**에서 **48.2%의 AP(평균 정확도)conf=95**를 기록하여, 기존 MiMo-VL (30.0%) 및 Qwen2.5-VL (24.7%)과 같은 베이스라인 모델들을 크게 앞섰습니다. 이는 **HyperClick**이 정확한 예측과 더불어 **잘 보정된 신뢰도 점수**를 제공함을 입증합니다.

## AI 실무자를 위한 시사점
**HyperClick**은 GUI 에이전트가 자신의 예측에 대한 **내성적인 자기 비판 능력**을 갖도록 하여, 과도한 확신에 기반한 오류를 줄이고 **안전한 의사 결정**을 지원합니다. 이는 **신뢰성 높은 GUI 자동화 시스템** 구축에 필수적인 요소로, 예측의 불확실성을 명시적으로 처리함으로써 **실제 배포 환경에서의 견고성**을 크게 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.