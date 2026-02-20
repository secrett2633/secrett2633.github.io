---
title: "[논문리뷰] OmniVinci: Enhancing Architecture and Data for Omni-Modal Understanding
  LLM"
excerpt: "arXiv에 게시된 'OmniVinci: Enhancing Architecture and Data for Omni-Modal Understanding
  LLM' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omni-Modal LLM
  - Multimodal Understanding
  - Vision-Audio Alignment
  - Temporal Reasoning
  - Data Curation
  - Foundation Models
  - Contrastive Learning
  - Rotary Time Embedding

permalink: /ai/review/2025-10-20-OmniVinci-Enhancing-Architecture-and-Data-for-Omni-Modal-Understanding-LLM/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15870)

**OmniVinci: Enhancing Architecture and Data for Omni-Modal Understanding LLM**

**저자:** Hanrong Ye, Chao-Han Huck Yang, Arushi Goel, Wei Huang, Ligeng Zhu, Yuanhang Su, Sean Lin, An-Chieh Cheng, Zhen Wan, Jinchuan Tian, Yuming Lou, Dong Yang, Zhijian Liu, Yukang Chen, Ambrish Dantrey, Ehsan Jahangiri, Sreyan Ghosh, Daguang Xu, Ehsan Hosseini-Asl, Danial Mohseni Taheri, Vidya Murali, Sifei Liu, Jason Lu, Oluwatobi Olabiyi, Frank Wang, Rafael Valle, Bryan Catanzaro, Andrew Tao, Song Han, Hongxu Yin, Pavlo Molchanov



## 핵심 연구 목표
본 연구는 인간처럼 여러 모달리티에 걸쳐 세상을 인지하고 추론할 수 있는 강력한 오픈소스 **옴니모달 LLM(Omni-Modal LLM)** 인 **OmniVinci** 를 구축하는 것을 목표로 합니다. 특히 모델 아키텍처와 데이터 큐레이션 측면에서 최적의 설계 선택을 체계적으로 탐구하여 시각, 청각, 언어 정보를 동시에 이해하는 능력을 강화하고자 합니다.

## 핵심 방법론
**OmniVinci** 는 세 가지 핵심 아키텍처 혁신을 제안합니다. 첫째, **OmniAlignNet** 을 통해 시각 및 오디오 임베딩을 공유된 옴니모달 잠재 공간에 정렬하고 **CLIP-style contrastive loss** 로 학습합니다. 둘째, **Temporal Embedding Grouping (TEG)** 으로 시각 및 오디오 신호 간의 상대적 시간 정렬을 포착하며, 셋째, **Constrained Rotary Time Embedding (CRTE)** 을 사용하여 절대적인 시간 정보를 임베딩에 인코딩합니다. 또한, **2,400만 개** 의 단일 및 옴니모달 대화를 생성하는 큐레이션 및 합성 파이프라인을 도입하여 데이터 부족 문제를 해결합니다.

## 주요 결과
**OmniVinci** 는 크로스모달 이해 벤치마크인 **DailyOmni** 에서 **Qwen2.5-Omni** 보다 **+19.05** 점 높은 성능을 보였으며, 오디오 벤치마크 **MMAR** 에서 **+1.7** 점, 비전 벤치마크 **Video-MME** 에서 **+3.9** 점 높은 점수를 달성했습니다. 특히, **Qwen2.5-Omni** 의 **1.2T** 대비 **6배 적은 0.2T** 의 훈련 토큰만을 사용하여 이러한 성능을 이루어 효율성을 입증했습니다. 또한, **1.7배 빠른 첫 토큰 생성** 및 **2.72배 빠른 디코딩 지연 시간** 을 제공합니다.

## AI 실무자를 위한 시사점
본 연구는 로봇 공학, 의료 AI, 스마트 팩토리 등 다양한 다운스트림 애플리케이션에서 옴니모달 모델의 잠재력을 확장합니다. 효율적인 훈련 데이터 사용과 **옴니모달 정렬 및 시간 임베딩** 과 같은 아키텍처 혁신은 복잡한 다중 모달 시나리오에서 모델의 성능을 향상시키는 데 중요한 통찰력을 제공합니다. 이를 통해 **오픈소스 옴니모달 LLM** 개발의 새로운 지평을 열어 AI 시스템의 전반적인 이해 능력을 증진할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.