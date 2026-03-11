---
title: "[논문리뷰] Streaming Autoregressive Video Generation via Diagonal Distillation"
excerpt: "arXiv에 게시된 'Streaming Autoregressive Video Generation via Diagonal Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Autoregressive Models
  - Diffusion Models
  - Distillation
  - Real-time
  - Streaming
  - Temporal Coherence
  - Flow Matching

permalink: /ai/review/2026-03-11-Streaming-Autoregressive-Video-Generation-via-Diagonal-Distillation/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09488)

**저자:** Jinxiu Liu, Xuanming Liu, Kangfu Mei, Yandong Wen, Ming-Hsuan Yang, Weiyang Liu



## 핵심 연구 목표
대규모 확산 모델의 제한된 실시간 스트리밍 기능을 개선하고, 기존 자기회귀 모델의 높은 연산 비용으로 인한 낮은 품질 문제를 해결하는 것이 목표입니다. 특히, 시간적 맥락 활용 부족과 다음 청크 예측 시 노이즈 수준의 암묵적 예측(노출 편향)으로 발생하는 비디오 품질 저하 및 모션 불일치 문제를 극복하여 효율적이면서도 고품질의 실시간 비디오 스트리밍 생성을 가능하게 하고자 합니다.

## 핵심 방법론
본 논문은 비디오 청크와 노이즈 제거 단계 모두에서 시간 정보를 활용하는 **Diagonal Distillation** 프레임워크를 제안합니다. 초기 청크에는 더 많은 노이즈 제거 단계를 할당하고 후반 청크에는 점진적으로 적은 단계를 사용하는 **비대칭 생성 전략** 을 채택하여 효율성을 높입니다. 훈련 중 **Diagonal Forcing** 을 통해 대각선 노이즈 제거 경로를 시뮬레이션하여 오류 누적을 완화하고, **Flow Distribution Matching** 을 도입하여 동적 일관성을 강화하고 모션 품질을 보존합니다.

## 주요 결과
제안된 방법은 **5초 비디오를 2.61초(최대 31 FPS)** 만에 생성하여 기존 비증류 모델 대비 **277.3배의 속도 향상** 을 달성했습니다. **VBench** 평가에서 **Wan2.1** baseline과 비교하여 유사한 시각적 품질( **85.26 대 85.3** )을 유지하면서 **Self-Forcing** 보다 **1.53배 빠른 레이턴시** 를 기록했습니다. 특히 장기 시퀀스에서 오류 누적을 줄이고 높은 시간적 일관성을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 확산 모델을 실시간 스트리밍 비디오 생성에 적용할 수 있는 효율적인 방법을 제시하여 **게임 시뮬레이션, 로봇 학습** 등 지연 시간에 민감한 응용 분야에 큰 잠재력을 제공합니다. **모델 증류** 과정에서 시간적 일관성과 모션 품질을 유지하는 구체적인 기법( **Diagonal Forcing** , **Flow Distribution Matching** )은 실무에서 시퀀스 데이터 처리 시 유용하게 활용될 수 있습니다. 특히, 적은 연산량으로도 고품질을 유지하는 방법을 통해 **자원 효율적인 AI 모델 개발** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.