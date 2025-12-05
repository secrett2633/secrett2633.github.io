---
title: "[논문리뷰] Reward Forcing: Efficient Streaming Video Generation with Rewarded Distribution Matching Distillation"
excerpt: "Hao Ouyang이 [arXiv]에 게시한 'Reward Forcing: Efficient Streaming Video Generation with Rewarded Distribution Matching Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Streaming Video Generation
  - Video Diffusion Models
  - Distribution Matching Distillation
  - Reinforcement Learning
  - Autoregressive Models
  - Attention Sink
  - Real-time

permalink: /ai/review/2025-12-05-Reward-Forcing-Efficient-Streaming-Video-Generation-with-Rewarded-Distribution-Matching-Distillation/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04678)

**저자:** Yunhong Lu, Hao Ouyang, Haobo Li, Yanhong Zeng, Ka Leong Cheng, Jiapeng Zhu, Hengyuan Cao, Xing Zhu, Yujun Shen, Min Zhang, Qiuyu Wang, Zhipeng Zhang



## 핵심 연구 목표
효율적인 스트리밍 비디오 생성 시 기존 방법론들이 정적 초기 토큰에 과도하게 의존하여 동적 움직임 저하와 "프레임 복사" 문제를 겪는 한계를 극복하고자 합니다. 본 연구는 실시간으로 높은 시각적 충실도와 강력한 움직임 역동성을 동시에 유지하는 비디오 생성을 목표로 합니다.

## 핵심 방법론
논문은 두 가지 핵심 디자인을 제안합니다. 첫째, **EMA-Sink** 는 초기 프레임에서 고정된 크기의 토큰을 유지하고 슬라이딩 윈도우에서 제거된 토큰을 **지수 이동 평균(Exponential Moving Average)** 으로 융합하여 업데이트합니다. 둘째, 움직임 역동성을 효과적으로 증류하기 위해 **Rewarded Distribution Matching Distillation (Re-DMD)** 를 도입합니다. **Re-DMD** 는 **비전-언어 모델** 로 평가된 샘플의 움직임 품질에 따라 높은 보상 영역에 가중치를 부여하여 증류 프로세스를 편향시킵니다.

## 주요 결과
**Reward Forcing** 은 단일 **H100 GPU** 에서 **23.1 FPS** 의 실시간 스트리밍 비디오 생성 속도를 달성하며, **VBench** 벤치마크에서 5초 클립 기준 전체 점수 **84.13** 을 기록하여 기존의 모든 베이스라인을 능가했습니다. 특히, 장시간 비디오 생성의 동적 지표에서 **66.95** 를 달성하여 **LongLive** 대비 **88.38%** 향상된 움직임 역동성을 보였으며, 품질 드리프트를 최소화했습니다. 사용자 연구에서도 모든 평가 기준에서 높은 점수를 획득하며 방법론의 우수성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **실시간 고품질 스트리밍 비디오 생성** 의 새로운 표준을 제시하며, **EMA-Sink** 와 **Re-DMD** 같은 혁신적인 기술을 통해 장기적인 일관성과 동적인 움직임을 동시에 유지하는 효율적인 모델 증류 가능성을 보여줍니다. **비전-언어 모델** 을 보상 함수로 활용한 증류 방식은 특정 품질 속성을 최적화하는 효과적인 전략으로, 향후 다양한 생성 모델의 실용적인 응용 및 개발에 중요한 영향을 미 미칠 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.