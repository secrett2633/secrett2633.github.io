---
title: "[논문리뷰] Video-R4: Reinforcing Text-Rich Video Reasoning with Visual Rumination"
excerpt: "Jing Bi이 arXiv에 게시한 'Video-R4: Reinforcing Text-Rich Video Reasoning with Visual Rumination' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Large Multimodal Models
  - Reinforcement Learning
  - Visual Rumination
  - Text-Rich Video
  - Video Question Answering
  - Iterative Perception

permalink: /ai/review/2025-11-24-Video-R4-Reinforcing-Text-Rich-Video-Reasoning-with-Visual-Rumination/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17490)

**저자:** Yolo Yunlong Tang, Daiki Shimada, Hang Hua, Chao Huang, Jing Bi, Rogerio Feris, Chenliang Xu



## 핵심 연구 목표
본 논문은 텍스트가 풍부한 비디오에서 미세한 증거를 기반으로 하는 추론 문제, 특히 기존 **단일 패스(single-pass) 비디오 QA 모델의 환각 및 오류 문제** 를 해결하고자 합니다. 인간의 인지 과정을 모방하여 **반복적인 시각적 되새김(visual rumination)** 을 통해 픽셀 단위의 정확한 추론을 가능하게 하는 **Video-R4** 모델을 제안하는 것이 목표입니다.

## 핵심 방법론
Video-R4는 프레임 선택, 관심 영역 확대, 픽셀 재인코딩 및 추론 상태 업데이트를 반복하는 **시각적 되새김(visual rumination)** 을 수행하는 **비디오 추론 LMM** 입니다. 이 모델은 두 가지 데이터셋, 즉 지도 학습을 위한 **Video-R4-CoT-17k** 와 강화 학습을 위한 **Video-R4-RL-30k** 를 통해 훈련됩니다. 학습은 **GRPO 기반 RL** 과 **SFT** 를 사용하는 **다단계 되새김 학습 프레임워크** 를 통해 원자적 및 구성적 시각 작업을 점진적으로 학습합니다.

## 주요 결과
**M4-ViteVQA 데이터셋** 에서 **Video-R4-7B** 는 **56.17% Acc** 및 **65.22% ANLS** (Task 1 - Split 1)를 달성하여 기존 최첨단 모델들을 능가하는 성능을 보여줍니다. 특히 Task 2에서는 **64.21% Acc** 를 달성하며 **Video-R1** 대비 큰 폭으로 개선되었습니다. 또한, 텍스트가 풍부한 비디오 외에도 **다중 페이지 문서 QA 및 슬라이드 QA 벤치마크** 에서도 효과적으로 일반화됨을 입증했습니다.

## AI 실무자를 위한 시사점
**Video-R4** 는 텍스트가 풍부한 비디오 환경에서 LMM의 **환각을 줄이고 추론의 견고성을 높이는** 새로운 패러다임을 제시합니다. **반복적인 시각적 되새김** 은 복잡한 다중 모달 추론 작업에 적용될 수 있는 중요한 아이디어이며, **다단계 RL 학습 프레임워크** 는 상호작용형 AI 에이전트 개발에 대한 실용적인 청사진을 제공합니다. 이는 특히 소규모, 분산된 텍스트 증거를 정확히 찾아내고 검증해야 하는 AI 시스템 개발에 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.