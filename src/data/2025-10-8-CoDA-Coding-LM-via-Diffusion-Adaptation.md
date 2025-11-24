---
title: "[논문리뷰] CoDA: Coding LM via Diffusion Adaptation"
excerpt: "이 [arXiv]에 게시한 'CoDA: Coding LM via Diffusion Adaptation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Code Generation
  - Bidirectional Decoding
  - Text Infilling
  - Instruction Tuning
  - Lightweight Models
  - TPU Training

permalink: /ai/review/2025-10-8-CoDA-Coding-LM-via-Diffusion-Adaptation/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03270)

**저자:** Haolin Chen, Shiyu Wang, Can Qin, Bo Pang, Zuxin Liu, Jielin Qiu, Jianguo Zhang, Yingbo Zhou, Zeyuan Chen, Ran Xu, Shelby Heinecke, Silvio Savarese, Caiming Xiong, Huan Wang, Weiran Yao



## 핵심 연구 목표
논문은 AR(Autoregressive) 코드 생성 모델의 한계점, 즉 순차적 오류 전파, 양방향 컨텍스트 활용의 어려움, 코드 채우기(infilling) 기능의 부족을 해결하고자 합니다. 특히, 기존 확산 모델의 높은 계산 비용 문제를 극복하고, **1.7B 매개변수**의 경량 확산 모델인 CoDA를 통해 양방향 컨텍스트와 채우기 기능을 제공하면서도 대규모 모델에 버금가는 성능과 경쟁력 있는 추론 지연 시간을 달성하는 것을 목표로 합니다.

## 핵심 방법론
CoDA는 **Qwen3-1.7B** 백본을 확산 목표에 맞춰 개조하여 개발되었으며, **완전히 오픈 소스**의 훈련 파이프라인을 사용합니다. 훈련은 **대규모 확산 사전 훈련** (~180B 일반 토큰), **코드 중심 중간 훈련** (~20B 선별된 코드 토큰), 그리고 **명령어 튜닝**의 세 단계로 진행됩니다. 특히, 훈련과 추론 간의 노이즈 분포 불일치를 해소하고 모델의 견고성을 높이기 위해 **점진적 마스킹 스케줄** (S1 Unmaskable Prefix, S2 Truncated Suffix, S3 Block Masking)을 도입했으며, 추론 시에는 **신뢰도 기반 샘플링**을 활용합니다.

## 주요 결과
**CoDA-1.7B-Instruct**는 **HumanEval, MBPP, EvalPlus** 벤치마크에서 **7B 매개변수**의 확산 모델들과 동등하거나 그 이상의 **pass@1** 점수를 달성했습니다. 특히, HumanEval (pass@1)에서 **CoDA-1.7B-Base** 대비 **25점** 향상된 성능을 보였습니다. 추론 지연 시간 측면에서는, **Dream-7B-Instruct**보다 **39.64% 낮은 지연 시간**을 기록했으며, 정확도는 **512 확산 스텝** 이후부터 수렴하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **경량 확산 모델(1.7B)**이 코드 생성에서 경쟁력 있는 성능을 달성할 수 있음을 입증하여, 대규모 AR 모델에 대한 효율적인 대안을 제시합니다. **양방향 디코딩** 및 **텍스트 채우기(infilling)** 기능은 코드 어시스턴트에게 매우 유용하며, **신뢰도 기반 샘플링**과 **적응형 스케줄**은 확산 모델의 실제 배포 가능성을 높입니다. 공개된 모델 체크포인트, 훈련 파이프라인 및 평가 도구는 커뮤니티의 확산 기반 코드 생성 연구를 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.