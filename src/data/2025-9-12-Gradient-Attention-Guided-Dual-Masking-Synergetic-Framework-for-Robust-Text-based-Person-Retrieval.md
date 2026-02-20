---
title: "[논문리뷰] Gradient-Attention Guided Dual-Masking Synergetic Framework for Robust
  Text-based Person Retrieval"
excerpt: "Kaicheng Yang이 arXiv에 게시한 'Gradient-Attention Guided Dual-Masking Synergetic Framework for Robust
  Text-based Person Retrieval' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-based Person Retrieval
  - CLIP
  - MLLM
  - Data Curation
  - Dual-Masking
  - Gradient-Attention
  - WebPerson Dataset

permalink: /ai/review/2025-9-12-Gradient-Attention-Guided-Dual-Masking-Synergetic-Framework-for-Robust-Text-based-Person-Retrieval/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09118)

**저자:** Tianlu Zheng, Yifan Zhang, Xiang An, Ziyong Feng, Kaicheng Yang, Qichuan Ding



## 핵심 연구 목표
본 연구는 텍스트 기반 인물 검색(Text-based Person Retrieval)에서 **CLIP** 의 성능 저하를 야기하는 두 가지 주요 문제점을 해결하는 것을 목표로 합니다. 첫째, 인물 중심 이미지-텍스트 데이터의 부족과 노이즈, 둘째, 글로벌 대조 학습의 한계로 인한 노이즈 텍스트 토큰에 대한 취약성 문제를 극복하고, 견고하고 세밀한 의미 학습이 가능한 프레임워크를 개발하고자 합니다.

## 핵심 방법론
먼저, **COYO700M** 데이터셋에서 **YOLOv11** 을 통해 고품질 인물 중심 이미지를 필터링하고, **Qwen2.5-72B-Instruct** 및 **Qwen2.5-VL MLLM** 을 활용하여 500만 개의 이미지-텍스트 쌍으로 구성된 **WebPerson** 데이터셋을 구축합니다. 다음으로, **Gradient-Attention Similarity Score (GASS)** 를 기반으로 노이즈 텍스트 토큰을 적응적으로 마스킹하고, 정보 토큰 예측(Masked Informative Token Prediction)을 통합하는 **GA-DMS (Gradient-Attention Guided Dual-Masking Synergetic)** 프레임워크를 제안하여 교차 모달 정렬 및 미세 grained 의미 학습을 강화합니다.

## 주요 결과
본 연구의 **GA-DMS** 프레임워크는 **WebPerson (5.0M)** 데이터셋으로 사전 훈련된 후 **CUHK-PEDES** , **ICFG-PEDES** , **RSTPReid** 세 가지 벤치마크에서 최신 기술(SOTA)을 달성했습니다. 특히 **RSTPReid** 데이터셋에서 **IRRA** 대비 **Rank-1 정확도 10.10%** , **mAP 7.72%** 향상을 보였으며, **NAM** 대비 **CUHK-PEDES 0.2%** , **ICFG-PEDES 2.02%** , **RSTPReid 1.8%** 의 Rank-1 정확도 향상을 기록했습니다. **GASS** 와 마스킹된 정보 토큰 예측의 통합은 노이즈 처리와 미세한 의미 학습 능력 향상에 결정적인 역할을 했습니다.

## AI 실무자를 위한 시사점
**MLLM** 을 활용한 대규모 **WebPerson** 데이터셋 구축은 인물 검색 모델의 데이터 부족 문제를 해결하고, 실제 환경에서의 견고성을 크게 향상시킬 수 있습니다. **GA-DMS** 프레임워크의 **Gradient-Attention 기반 이중 마스킹** 전략은 텍스트 노이즈를 효과적으로 관리하고 미세한 시각-텍스트 대응 관계 학습을 촉진하여, 실용적인 인물 검색 시스템 개발에 중요한 통찰력을 제공합니다. 이는 지능형 감시, 자율 소매 등 인간 중심 AI 애플리케이션의 성능 향상에 직접적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.