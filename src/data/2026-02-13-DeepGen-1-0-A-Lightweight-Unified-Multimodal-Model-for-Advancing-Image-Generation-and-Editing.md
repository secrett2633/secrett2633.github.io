---
title: "[논문리뷰] DeepGen 1.0: A Lightweight Unified Multimodal Model for Advancing Image Generation and Editing"
excerpt: "이 [arXiv]에 게시한 'DeepGen 1.0: A Lightweight Unified Multimodal Model for Advancing Image Generation and Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Model
  - Image Generation
  - Image Editing
  - Diffusion Models
  - VLM-DiT Architecture
  - Stacked Channel Bridging
  - Reinforcement Learning
  - Lightweight Models

permalink: /ai/review/2026-02-13-DeepGen-1-0-A-Lightweight-Unified-Multimodal-Model-for-Advancing-Image-Generation-and-Editing/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12205)

**저자:** Dianyi Wang, Ruihang Li, Feng Han, Chaofan Ma, Wei Song, Siyuan Wang, Yibin Wang, Yi Xin, Hongjian Liu, Zhixiong Zhang, Shengyuan Ding, Tianhang Wang, Zhenglin Cheng, Tao Lin, Cheng Jin, Kaicheng Yu, Jingjing Chen, Wenjie Wang, Zhongyu Wei, Jiaqi Wang



## 핵심 연구 목표
본 논문은 현재 대규모(~10B 이상) 파라미터를 요구하는 멀티모달 이미지 생성 및 편집 모델의 높은 훈련 비용과 배포 한계를 극복하는 것을 목표로 합니다. **경량의 5B 파라미터 모델(DeepGen 1.0)** 을 통해 훨씬 큰 모델과 동등하거나 이를 능가하는 포괄적인 생성 및 편집 능력을 달성하고자 합니다.

## 핵심 방법론
DeepGen 1.0은 **3B VLM(Qwen-2.5-VL)** 과 **2B DiT(SD3.5-Medium)** 로 구성된 **VLM-DiT 아키텍처** 를 사용합니다. 핵심 기술인 **Stacked Channel Bridging (SCB)** 은 VLM의 여러 계층에서 계층적 특징을 추출하고, **학습 가능한 "think tokens"** 와 융합하여 DiT에 풍부한 추론 정보를 제공합니다. 훈련은 **정렬 사전 훈련** , **공동 지도 미세 조정 (SFT)** , 그리고 **MR-GRPO를 사용한 강화 학습 (RL)** 의 세 단계로 진행되며, 보조 지도 확산 손실을 통해 능력 저하를 방지합니다.

## 주요 결과
DeepGen 1.0은 **총 5B 파라미터** 로, 자신보다 **3배에서 16배 큰 모델과 경쟁하거나 능가하는 성능** 을 보였습니다. 특히, DPG-Bench에서 **87.90점** 을 달성하여 80B 규모의 **HunyuanImage 3.0 (86.10점)** 을 넘어섰고, WISE 추론 태스크에서는 **0.73점** 으로 **HunyuanImage 3.0 (0.57점)** 대비 **28% 높은 성능** 을 기록했습니다. UniREditBench 편집 태스크에서는 **77.5점** 으로 전용 모델인 **Qwen-Image-Edit (56.5점)** 를 **37% 이상** 앞섰으며, 전체 훈련에 **약 5천만 개의 샘플** 만을 사용했습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 파라미터 없이도 정교한 멀티모달 AI 모델을 구축할 수 있음을 입증하여, AI 개발의 **접근성과 지속 가능성** 을 크게 향상시킬 수 있습니다. 공개된 **DeepGen 1.0** 은 **소비자 등급 하드웨어** 에서도 고급 이미지 생성 및 편집 작업을 수행할 수 있는 효율적인 대안을 제공하며, **SCB** 와 **"think tokens"** 는 VLM 기반 모델의 추론 능력과 미세 제어 능력을 강화하는 실용적인 기법으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.