---
title: "[논문리뷰] Open-o3 Video: Grounded Video Reasoning with Explicit Spatio-Temporal
  Evidence"
excerpt: "이 [arXiv]에 게시한 'Open-o3 Video: Grounded Video Reasoning with Explicit Spatio-Temporal
  Evidence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Spatio-Temporal Grounding
  - Large Multimodal Models
  - Reinforcement Learning
  - Chain-of-Thought
  - Visual Evidence
  - Dataset Curation

permalink: /ai/review/2025-10-24-Open-o3-Video-Grounded-Video-Reasoning-with-Explicit-Spatio-Temporal-Evidence/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20579)

**저자:** Jiahao Meng, Xiangtai Li, Haochen Wang, Yue Tan, Tao Zhang, Lingdong Kong, Yunhai Tong, Anran Wang, Zhiyang Teng, Yujing Wang, Zhuochen Wang



## 핵심 연구 목표
기존 비디오 추론 모델들이 텍스트 기반 추론만을 제공하며 핵심 증거의 시점과 위치를 명시하지 못하는 문제를 해결하고자 합니다. 본 논문은 **명시적인 시공간적 증거(explicit spatio-temporal evidence)** 를 비디오 추론 과정에 통합하여, 추론을 구체적인 시각적 관찰에 기반하도록 함으로써 예측의 투명성과 검증 가능성을 높이는 것을 목표로 합니다.

## 핵심 방법론
**Open-03 Video** 프레임워크는 **두 단계 학습 전략** 을 채택합니다: **cold-start 초기화** (STGR-CoT-30k로 SFT) 및 **강화 학습** (STGR-RL-36k로 GSPO). 특히, **적응형 시간 근접성(adaptive temporal proximity)** 및 **시간 게이팅(temporal gating)** 메커니즘을 포함한 **새로운 보상 설계** 를 통해 시공간 정렬 및 공간 정밀도를 최적화합니다. 또한, 기존 데이터셋의 한계를 극복하기 위해 **5.9k개의 고품질 시공간 주석 샘플** 을 포함한 학습 데이터를 구축했습니다.

## 주요 결과
**V-STAR 벤치마크** 에서 **Open-03 Video** 는 **Qwen2.5-VL** 대비 **mAM 14.4%p, mLGM 24.2%p** 향상이라는 최첨단 성능을 달성했습니다. **VideoMME, WorldSense, VideoMMMU, TVGBench** 등 다양한 비디오 이해 벤치마크에서도 일관된 개선을 보였으며, **신뢰도 인식 투표(confidence-aware voting)** 를 통해 **WorldSense에서 1.2%p, VideoMMMU에서 1.0%p** 의 정확도 향상을 추가로 입증했습니다.

## AI 실무자를 위한 시사점
**Open-03 Video** 는 비디오 추론의 **투명성과 신뢰성** 을 크게 향상시킬 수 있는 실용적인 방법론을 제시합니다. **명시적인 시공간적 증거** 를 제공하여 **AI 시스템의 의사결정 과정을 이해하고 검증** 하는 데 도움이 되며, 이는 **테스트 시간 스케일링** 과 **모델 신뢰도 향상** 에도 기여합니다. 고품질 데이터셋 구축 파이프라인과 **GSPO 기반의 강화 학습 전략** 은 복잡한 멀티모달 추론 시스템 개발에 유용한 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.