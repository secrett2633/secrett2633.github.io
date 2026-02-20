---
title: "[논문리뷰] Mantis: A Versatile Vision-Language-Action Model with Disentangled Visual Foresight"
excerpt: "arXiv에 게시된 'Mantis: A Versatile Vision-Language-Action Model with Disentangled Visual Foresight' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) Models
  - Visual Foresight
  - Diffusion Transformer (DiT)
  - Robotics
  - Multimodal Learning
  - Adaptive Temporal Ensemble
  - Latent Actions

permalink: /ai/review/2025-11-24-Mantis-A-Versatile-Vision-Language-Action-Model-with-Disentangled-Visual-Foresight/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16175)

**저자:** Yi Yang, Xueqi Li, Yiyang Chen, Jin Song, Yihan Wang, Jiadi Su, You Qiaoben, Pengfei Liu, Zhijie Deng, Zipeng Xiao



## 핵심 연구 목표
본 논문은 기존 Vision-Language-Action (VLA) 모델의 한계인 희소한 행동 감독 신호, 과도한 시각 상태 예측 비용, 정보 병목 현상, 그리고 언어 감독 부족으로 인한 이해 및 추론 능력 저하를 해결하고자 합니다. 이를 위해 **분리된 시각적 예측 (Disentangled Visual Foresight, DVF)** 기능을 갖춘 새로운 VLA 모델 **Mantis** 를 제안하여 로봇 조작 성능과 효율성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**Mantis** 는 **Qwen2.5-VL** 백본을 기반으로 **메타 쿼리** 와 **Diffusion Transformer (DiT) 헤드** 를 활용해 시각적 예측을 백본과 분리합니다. 현재 시각 상태는 **잔차 연결** 을 통해 DiT에 입력되어 잠재적 행동을 포착하며, **DiT 기반 행동 헤드** 는 n-단계 행동 궤적을 예측합니다. 모델은 **점진적 훈련 레시피** 를 통해 시각, 행동, 언어 양식을 안정적으로 융합하며, 추론 시에는 **적응형 시간 앙상블 (Adaptive Temporal Ensemble, ATE)** 전략을 사용하여 계산 효율성을 높입니다.

## 주요 결과
**Mantis** 는 **LIBERO 벤치마크** 에서 **96.7%의 성공률** 을 달성하여 강력한 기존 시각 예측 기반 모델들을 능가했으며, 이전 방식 대비 **빠른 수렴 속도** 를 보였습니다. 실제 환경 평가에서는 **π0.5** 대비 우수한 명령 수행 능력, 미지의 명령에 대한 일반화 능력, 추론 능력을 입증했습니다. 또한, **Mantis-ATE** 변형은 추론 횟수를 **50%** 까지 줄이면서도 유사한 작업 성공률을 유지하여 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**Mantis** 는 로봇 학습에서 시각적 예측과 행동 학습을 효과적으로 분리하는 것이 성능과 효율성을 동시에 향상시킬 수 있음을 보여줍니다. **점진적 훈련 방법** 과 **언어 감독** 의 중요성은 복잡한 로봇 작업을 위한 강력한 VLA 모델을 구축하는 데 핵심적인 고려사항입니다. **적응형 시간 앙상블** 과 같은 효율적인 추론 전략은 실제 로봇 시스템의 배포 가능성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.