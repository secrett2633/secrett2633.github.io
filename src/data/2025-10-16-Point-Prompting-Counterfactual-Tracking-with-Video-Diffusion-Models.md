---
title: "[논문리뷰] Point Prompting: Counterfactual Tracking with Video Diffusion Models"
excerpt: "Andrew Owens이 [arXiv]에 게시한 'Point Prompting: Counterfactual Tracking with Video Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Models
  - Point Tracking
  - Zero-Shot Learning
  - Counterfactual Modeling
  - Visual Prompting
  - SDEdit
  - Negative Prompting
  - Object Permanence

permalink: /ai/review/2025-10-16-Point-Prompting-Counterfactual-Tracking-with-Video-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11715)

**저자:** Ayush Shrivastava, Sanyam Mehta, Daniel Geng, Andrew Owens



## 핵심 연구 목표
본 논문은 사전 학습된 **비디오 확산 모델(video diffusion models)** 이 추가 훈련 없이 **제로-샷(zero-shot)** 방식으로 시점 추적(point tracking)을 수행할 수 있는지 탐구합니다. 이는 생성 모델의 내재된 **객체 영속성(object permanence)** 능력을 활용하여 기존 추적 방법론의 한계를 극복하고, 생성과 분석 간의 연결성을 입증하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 방법론은 **"점 프롬프팅(point prompting)"** 으로, 초기 비디오 프레임의 추적하고자 하는 지점에 **빨간색 점** 과 같은 독특한 마커를 삽입합니다. 이어서 **SDEdit** 을 사용하여 비디오의 나머지 부분을 재생성함으로써 마커가 프레임에 걸쳐 전파되도록 합니다. 마커의 가시성을 보장하기 위해 **수정되지 않은 초기 프레임** 을 **음성 프롬프트(negative prompt)** 로 사용하여 카운터팩추얼 신호를 강화하고, 후처리 단계에서 **색상 재조정(color rebalancing)** 및 **세분화된 개선(coarse-to-fine refinement)** 을 통해 추적 정확도를 높입니다.

## 주요 결과
본 방법은 **TAP-Vid DAVIS** 벤치마크에서 **42.21 AJ(Average Jaccard) 점수** 를 달성하여 다른 제로-샷 베이스라인을 크게 능가하며, 특정 시나리오에서는 자기 지도 학습(self-supervised) 모델과 경쟁력 있는 성능을 보였습니다. 특히 **객체 영속성** 덕분에 탁월한 **폐색 정확도(Occlusion Accuracy, OA)** 를 기록했고, 더 높은 해상도의 입력과 최적의 노이즈 강도( **0.5** ) 사용 시 성능이 향상됨을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 사전 학습된 **비디오 확산 모델** 이 단순한 생성 작업을 넘어 복잡한 비디오 분석 작업에 재활용될 수 있음을 보여줍니다. **제로-샷** 추적 능력은 전문적인 추적 모델 훈련의 필요성을 줄여 **자원 효율적인 AI 개발** 가능성을 시사합니다. **시각적 프롬프팅** 과 **음성 프롬프팅** 기법은 생성 모델의 제어 가능성을 확장하는 일반적인 전략으로, 새로운 AI 애플리케이션 개발에 영감을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.