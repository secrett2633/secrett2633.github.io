---
title: "[논문리뷰] UniMoE-Audio: Unified Speech and Music Generation with Dynamic-Capacity
  MoE"
excerpt: "arXiv에 게시된 'UniMoE-Audio: Unified Speech and Music Generation with Dynamic-Capacity
  MoE' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture of Experts
  - Speech Generation
  - Music Generation
  - Multimodal AI
  - Dynamic Routing
  - Training Curriculum
  - Data Imbalance
  - Audio Synthesis

permalink: /ai/review/2025-10-16-UniMoE-Audio-Unified-Speech-and-Music-Generation-with-Dynamic-Capacity-MoE/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13344)

**저자:** Zhenyu Liu, Yunxin Li, Xuanyu Zhang, Qixun Teng, Shenyuan Jiang, Xinyu Chen, Haoyuan Shi, Jinchao Li, Qi Wang, Haolan Chen, Fanbo Meng, Mingjun Zhao, Yu Xu, Yancheng He, Baotian Hu, Min Zhang



## 핵심 연구 목표
본 연구는 음성 및 음악 생성의 통합이라는 오랜 과제를 해결하는 것을 목표로 합니다. 특히, 기존 모델들이 겪는 **태스크 충돌** 과 **심각한 데이터 불균형** 문제로 인해 보편적인 오디오 합성 모델 개발이 저해되는 점을 극복하고, 단일 공유 모델이 음성 및 음악 생성을 **시너지 효과** 를 통해 마스터할 수 있도록 하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 새로운 **Dynamic-Capacity Mixture-of-Experts (MoE) 프레임워크** 기반의 **UniMoE-Audio** 모델을 제안합니다. 이 아키텍처는 토큰의 복잡성에 따라 동적으로 전문가 수를 할당하는 **Top-P 라우팅 전략** 과 **하이브리드 전문가 설계(routed, shared, null expert)** 를 특징으로 합니다. 데이터 불균형을 해결하기 위해 **3단계 훈련 커리큘럼(독립 전문가 훈련, MoE 통합 및 워밍업, 시너지 공동 훈련)** 을 도입하여 전문 지식을 점진적으로 통합합니다.

## 주요 결과
**UniMoE-Audio** 는 주요 음성 및 음악 생성 벤치마크에서 **최고 수준(SOTA)** 또는 경쟁력 있는 성능을 달성했습니다. 특히, 나이브(naive) 공동 훈련 방식과 비교하여 음악 충실도(Music-fidelity)에서 **16.39%** , 음악 심미적 품질(Music-aesthetic quality)에서 **19.91%** 의 현저한 성능 향상을 보였으며, SeedTTS-EN 벤치마크에서 UTMOS **4.36** , WER **1.9** 를 달성하는 등 뛰어난 데이터 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **MoE 아키텍처** 와 **단계별 훈련 전략** 이 음성 및 음악과 같이 근본적인 태스크 충돌과 데이터 불균형이 존재하는 다중 모달/태스크 설정에서 효과적인 솔루션임을 보여줍니다. 특히, **Top-P 동적 라우팅** 과 **하이브리드 전문가 설계** 는 리소스 효율성과 태스크 특화 학습을 동시에 가능하게 하여, 범용 오디오 생성 시스템 개발에 중요한 청사진을 제공합니다. 이는 향후 더 포괄적인 멀티모달 AI 모델 구축에 실용적인 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.