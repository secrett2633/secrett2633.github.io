---
title: "[논문리뷰] Quantization Meets dLLMs: A Systematic Study of Post-training
  Quantization for Diffusion LLMs"
excerpt: "Haobo Xu이 [arXiv]에 게시한 'Quantization Meets dLLMs: A Systematic Study of Post-training
  Quantization for Diffusion LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion LLMs
  - Post-training Quantization (PTQ)
  - Model Compression
  - Activation Outliers
  - Quantization Methods
  - Efficient Deployment
  - Large Language Models

permalink: /ai/review/2025-8-21-Quantization-Meets-dLLMs-A-Systematic-Study-of-Post-training-Quantization-for-Diffusion-LLMs/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14896)

**저자:** Haokun Lin, Haobo Xu, Yichen Wu, Ziyu Guo, Renrui Zhang, Zhichao Lu, Ying Wei, Qingfu Zhang, Zhenan Sun



## 핵심 연구 목표
본 연구는 **확산 기반 대규모 언어 모델(dLLM)**의 효율적인 배포를 저해하는 막대한 파라미터 규모 및 높은 자원 요구량을 해결하고자 합니다. 특히, 기존 **오토회귀(AR) LLM**에서 널리 사용되던 **후학습 양자화(PTQ)** 기법의 **dLLM**에 대한 적용 가능성을 체계적으로 연구하고, 양자화 성능에 영향을 미치는 요인들을 심층적으로 분석하는 것을 목표로 합니다.

## 핵심 방법론
연구는 먼저 **dLLM**에서 동적 범위의 대부분을 차지하는 **활성화 아웃라이어(activation outliers)**의 존재를 식별합니다. 이후, **GPTQ**, **AWQ**와 같은 **가중치 전용 양자화(weight-only quantization)** 기법과 **SmoothQuant**, **QuaRot**, **DuQuant**와 같은 **가중치-활성화 양자화(weight-activation quantization)** 기법을 구현하여 **LLaDA-8B-Base**, **LLaDA-8B-Instruct**, **Dream-7B** 모델에 적용했습니다. 평가는 **비트 폭**, **양자화 방법**, **태스크 유형(일반 QA, 수학 추론, 코드 생성)**, **모델 유형**의 네 가지 관점에서 수행되었으며, **WikiText-2** 데이터셋을 보정 데이터로 사용했습니다.

## 주요 결과
**가중치 전용 양자화**의 경우 **4-비트**가 가장 효과적이었으며, **GPTQ**가 **AWQ**보다 전반적으로 우수한 성능을 보였습니다. **가중치-활성화 양자화**에서는 **8-비트** 설정이 거의 손실 없는 성능을 제공했지만, **4-비트**에서는 성능 저하가 컸습니다. 특히 **회전 기반 방법론(DuQuant, QuaRot)**이 **SmoothQuant**보다 우수했으며, **DuQuant**는 **LLaDA-8B** 모델에서 **QuaRot** 대비 더 낮은 성능 하락(일반 QA **5.1% vs 6.6%**)을 보였습니다. **수학 추론** 및 **코드 생성** 태스크에서는 다른 태스크보다 **상당한 성능 저하(SmoothQuant W4A4에서 최대 ↓37.3%)**가 관찰되었으며, **명령어 튜닝된 LLaDA 모델**이 기본 모델보다 양자화에 강건함을 보였습니다.

## AI 실무자를 위한 시사점
**dLLM**의 효율적인 배포를 위해 **PTQ**가 유망한 기술임을 확인했지만, **활성화 아웃라이어**와 **저비트 양자화(특히 4-비트 W4A4)**는 여전히 중요한 과제입니다. **GPTQ** (가중치 전용) 및 **DuQuant** (가중치-활성화)는 현재로서는 **dLLM** 양자화를 위한 가장 효과적인 방법론으로 추천됩니다. 복잡한 **수학 및 코드 생성** 태스크에서는 성능 저하가 크므로, 이러한 태스크를 위한 **dLLM** 배포 시에는 추가적인 최적화 또는 태스크별 양자화 전략을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.