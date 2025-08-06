---
title: "[논문리뷰] Skywork UniPic: Unified Autoregressive Modeling for Visual Understanding
  and Generation"
excerpt: "Tianyidan Xie이 [arXiv]에 게시한 'Skywork UniPic: Unified Autoregressive Modeling for Visual Understanding
  and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Multimodal AI
  - Image Generation
  - Image Editing
  - Visual Understanding
  - Unified Architecture
  - Parameter Efficiency

permalink: /ai/review/2025-8-6-Skywork_UniPic_Unified_Autoregressive_Modeling_for_Visual_Understanding_and_Generation/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03320)

**저자:** Peiyu Wang, Yi Peng, Yimeng Gan, Liang Hu, Eric Li, Xuchen Song, Tianyidan Xie, Xiaokun Wang, Yichen Wei, Chuanxin Tang, Bo Zhu, Changshi Li, Hongyang Wei, Yang Liu, Yahui Zhou



## 핵심 연구 목표
본 논문은 이미지 이해, 텍스트-투-이미지 생성, 이미지 편집 기능을 단일 아키텍처 내에서 통합하는 **1.5억 개 파라미터**의 **자기회귀 모델**인 **Skywork UniPic**을 소개합니다. 기존의 태스크별 어댑터나 모듈 간 연결의 필요성을 제거하고, 소형 멀티모달 시스템이 상용 하드웨어에서 최첨단 성능을 달성할 수 있음을 입증하는 것이 목표입니다.

## 핵심 방법론
**Skywork UniPic**은 **MAR (Masked Autoregressive) 인코더-디코더**와 **SigLIP2 인코더**를 활용하는 **디커플드 시각 인코딩 전략**을 채택하며, 이들은 공유된 **Qwen2.5-1.5B-Instruct LLM 백본**에 연결됩니다. 훈련은 **256x256에서 1024x1024까지 해상도를 점진적으로 확장**하는 프로그레시브 스케줄과 **GRPO**로 훈련된 **Skywork-ImgReward** 및 **Skywork-EditReward**를 포함한 **1억 규모의 데이터셋**을 통해 이루어집니다.

## 주요 결과
**Skywork UniPic**은 GenEval에서 **0.86**점을 달성하며 기존 통합 모델들을 능가했습니다. DPG-Bench 복잡한 생성에서 **85.5**의 신기록을 세웠고, 이미지 편집에서는 GEditBench-EN에서 **5.83**, ImgEdit-Bench에서 **3.49**를 기록했습니다. 특히, **RTX 4090**과 같은 **15GB 미만의 GPU 메모리**로 **1024x1024 이미지**를 생성할 수 있어 뛰어난 자원 효율성을 보여주었습니다.

## AI 실무자를 위한 시사점
본 모델은 **1.5B 파라미터**라는 **작은 규모**에도 불구하고 **다양한 멀티모달 태스크에서 SOTA에 가까운 성능**을 달성하여 **리소스 제약이 있는 환경**에서의 **배포 가능성**을 크게 높였습니다. **단일 아키텍처**로 여러 태스크를 통합함으로써 개발 및 배포 복잡성을 줄이고, **고품질 데이터 큐레이션** 및 **보상 모델링**이 모델 성능에 결정적인 영향을 미친다는 것을 강조합니다. 이는 향후 **경량 멀티모달 AI 시스템** 개발에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.