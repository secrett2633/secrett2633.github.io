---
title: "[논문리뷰] MoME: Mixture of Matryoshka Experts for Audio-Visual Speech Recognition"
excerpt: "이 [arXiv]에 게시한 'MoME: Mixture of Matryoshka Experts for Audio-Visual Speech Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Visual Speech Recognition
  - Mixture of Experts
  - Matryoshka Representation Learning
  - Large Language Models
  - Elastic Inference
  - Token Compression
  - Multimodal AI

permalink: /ai/review/2025-10-7-MoME-Mixture-of-Matryoshka-Experts-for-Audio-Visual-Speech-Recognition/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04136)

**저자:** Umberto Cappellazzo, Minsu Kim, Pingchuan Ma, Honglie Chen, Xubo Liu, Stavros Petridis, Maja Pantic



## 핵심 연구 목표
논문은 대규모 언어 모델(LLMs) 기반 **오디오-비주얼 음성 인식(AVSR)** 시스템이 겪는 높은 계산 수요와 고정된 토큰 압축률의 한계를 해결하고자 합니다. 특히, 기존 **Matryoshka Representation Learning (MRL)** 기반 모델이 스케일을 독립적으로 학습하여 높은 압축률에서 성능 저하 및 일반화 부족을 보이는 문제를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **MoME(Mixture of Matryoshka Experts)**라는 새로운 프레임워크를 제안합니다. 이는 **사전 훈련된 LLM**에 **sparse Mixture-of-Experts (MoE)**를 통합하여, **top-k 라우팅**되는 전문가와 **공유 전문가(shared experts)**를 통해 동적으로 계산 용량을 할당합니다. **공유 라우터**는 스케일 간 일관된 전문가 활성화를 촉진하고, **bottleneck dimension**이 작은 전문가 설계를 통해 **파라미터 효율적인 미세 조정** 및 **cross-scale knowledge transfer**를 가능하게 합니다.

## 주요 결과
**MoME**는 **LRS2 및 LRS3 데이터셋**에서 **AVSR, ASR, VSR** 태스크 모두에서 기존 **Matryoshka 기반** 및 **고정 스케일 모델**보다 뛰어난 **state-of-the-art 성능**을 달성했습니다. 특히, **LRS3 데이터셋**에서 **MoME-23/4-LAYER**는 **(4,2) 오디오-비주얼 압축률** 기준 **1.5% WER**를 기록하여, 기존 **Llama-MTSK SS**의 **2.3%**보다 우수합니다. 또한, **MoME**는 **상당히 적은 활성화 파라미터(LRS3에서 0.9M)**로 고성능을 유지하며, 노이즈 환경에서도 강력한 **강건성**을 입증했습니다.

## AI 실무자를 위한 시사점
**MoME**는 리소스 제약이 있는 환경에서 **AVSR 모델을 배포**할 때, **동적 압축률 조절**과 **높은 성능 유지**를 가능하게 하는 실용적인 솔루션을 제공합니다. **MoE**와 **MRL**의 통합은 **모델의 확장성**과 **해석 가능성**을 높여, 다양한 멀티모달 AI 시스템 설계에 영감을 줄 수 있습니다. **파라미터 효율적인 미세 조정**과 **cross-scale knowledge transfer**는 제한된 계산 자원 내에서 고성능 멀티모달 모델을 구축하는 데 중요한 접근 방식이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.