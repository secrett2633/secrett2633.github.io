---
title: "[논문리뷰] A Pragmatic VLA Foundation Model"
excerpt: "arXiv에 게시된 'A Pragmatic VLA Foundation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Model
  - Robotics
  - Foundation Models
  - Multi-Embodiment Learning
  - Data Scaling
  - Computational Efficiency
  - Real-world Deployment

permalink: /ai/review/2026-01-28-A-Pragmatic-VLA-Foundation-Model/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18692)

**저자:** Wei Wu*, Fan Lu*, Yunnan Wang*, Shuai Yang*, Shi Liu*, Fangjing Wang*, Qian Zhu, He Sun, Yong Wang, Shuailei Ma, Yiyu Ren, Kejia Zhang, Hui Yu, Jingmei Zhao, Shuai Zhou, Zhenqi Qiu, Houlong Xiong, Ziyu Wang, Zechen Wang, Ran Cheng, Yong-Lu Li, Yongtao Huang, Xing Zhu, Yujun Shen, Kecheng Zheng†



## 핵심 연구 목표
이 논문은 로봇 조작을 위한 **Vision-Language-Action (VLA) 파운데이션 모델** 이 다양한 작업과 플랫폼에서 비용 효율적으로 일반화되는 문제를 해결하고자 합니다. 특히, 대규모 실제 로봇 데이터가 VLA 모델 성능에 어떻게 영향을 미치는지에 대한 포괄적인 실증 연구와 효율적인 학습 코드베이스의 필요성을 강조합니다.

## 핵심 방법론
본 연구는 **LingBot-VLA** 를 제안하며, **9가지 듀얼 암 로봇 구성에서 수집된 약 20,000시간의 실제 데이터** 로 사전 훈련되었습니다. 모델 아키텍처는 **사전 훈련된 VLM (Qwen2.5-VL)** 과 **Mixture-of-Transformers (MoT)** 기반의 **액션 전문가(action expert)** 를 통합하며, 연속적인 액션 모델링을 위해 **Flow Matching** 기법을 사용합니다. 특히, **LingBot-Depth 토큰과 VLM 쿼리를 정렬** 하는 **비전 증류 접근 방식** 을 통해 공간 인식을 강화했습니다. 또한, **FSDP, 혼합 정밀도 학습, FlexAttention** 등의 최적화를 통해 GPU당 **261 샘플/초** 의 높은 처리량을 달성한 효율적인 코드베이스를 구축했습니다.

## 주요 결과
**LingBot-VLA** 는 3,000시간에서 20,000시간으로 사전 훈련 데이터 규모를 늘릴 때 다운스트림 작업 성공률과 진행률이 **일관되고 상당하게 향상** 되는 스케일링 법칙을 입증했습니다. 실제 로봇 벤치마크인 **GM-100** 에서 경쟁 모델 대비 **명확한 우위** 를 보였으며, 특히 **LingBot-VLA w/ depth** 는 π0.5 대비 평균 SR **4.28%** , PS **7.76%** 향상을 달성했습니다. 또한, 기존 VLA 코드베이스보다 **1.5~2.8배 빠른** 효율적인 훈련 처리량을 제공합니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 실제 데이터를 활용한 **VLA 파운데이션 모델의 실용적인 잠재력** 을 보여주며, 로봇 학습 분야에서 데이터 스케일링의 중요성을 강조합니다. 효율적인 훈련 코드베이스는 개발 비용을 절감하고 연구 반복 속도를 높여 **대규모 로봇 학습의 접근성** 을 향상시킵니다. 공개된 코드, 모델 및 벤치마크 데이터는 **표준화된 평가 촉진** 과 **더 도전적인 로봇 작업** 개발을 위한 기반을 제공하여 AI 실무자들에게 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.