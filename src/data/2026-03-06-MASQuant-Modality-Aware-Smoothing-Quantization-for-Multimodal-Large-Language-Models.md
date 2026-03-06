---
title: "[논문리뷰] MASQuant: Modality-Aware Smoothing Quantization for Multimodal Large Language Models"
excerpt: "arXiv에 게시된 'MASQuant: Modality-Aware Smoothing Quantization for Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Post-Training Quantization
  - Modality-Aware Smoothing
  - Cross-Modal Compensation
  - Quantization
  - Model Compression
  - SVD-based Whitening

permalink: /ai/review/2026-03-06-MASQuant-Modality-Aware-Smoothing-Quantization-for-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.04800)

**저자:** Lulu Hu, Wenhu Xiao, Xin Chen, Xinghua Xu, Bowen Xu, Kun Li



## 핵심 연구 목표
다중 모달리티 대규모 언어 모델(MLLMs)에서 **채널별 스무딩 양자화(channel-wise smoothing quantization)** 기법이 시각 및 텍스트 토큰 활성화의 큰 차이로 인해 실패하는 문제를 해결하는 것이 목표입니다. 특히, 지배적인 모달리티에 최적화된 스무딩 계수가 약한 모달리티의 성능을 심각하게 저하시키는 "스무딩 불일치(smoothing misalignment)" 현상을 극복하여, MLLMs의 효율적인 **사후 훈련 양자화(PTQ)** 를 가능하게 하고 모달리티 간 계산 불변성을 유지하고자 합니다.

## 핵심 방법론
제안하는 **MASQuant** 프레임워크는 **Modality-Aware Smoothing (MAS)** 과 **Cross-Modal Compensation (CMC)** 으로 구성됩니다. **MAS** 는 각 모달리티의 활성화에 대해 별도의 **모달리티별 스무딩 계수** 를 직접 최적화하여 스무딩 불일치를 제거하며, **MAE 손실 함수** 를 사용하여 최적의 스무딩 패턴을 학습합니다. **CMC** 는 모달리티별 스무딩을 사용하면서도 단일 양자화된 가중치를 유지하기 위해, 모달리티 간 활성화 차이가 **저랭크(low-rank)** 구조를 가진다는 점을 활용합니다. 이를 위해 **SVD 기반 화이트닝(SVD-based whitening)** 을 통해 차이를 압축된 저랭크 행렬로 변환하고, 텍스트 스무딩된 기본 가중치에 경량 저랭크 보정을 적용하여 계산 불변성을 확보합니다.

## 주요 결과
**Qwen2.5-VL-3B 모델 W8A8** 양자화에서 **MASQuant** 는 **70.9%의 평균 정확도** 를 달성하여 기존 SmoothQuant(69.9%) 및 MBQ(70.1%)를 상회했습니다. 특히, 일부 태스크에서는 FP16 성능을 능가하는 **MMMU 46.6%** 를 기록했습니다. **Qwen2.5-Omni-3B 모델 W4A8** 양자화에서는 **Omnibench 46.9% Acc↑** 를 달성했으며, 오디오 태스크인 Librispeech에서 WER이 **4.0** 으로 SmoothQuant의 **77.4** 에 비해 압도적인 성능 향상을 보였습니다. 또한, **MASQuant** 는 FP16 대비 **2.5배의 추론 속도 향상** 을 달성하며 실제 배포 가능성을 입증했습니다.

## AI 실무자를 위한 시사점
**MASQuant** 는 다중 모달리티 LLM의 **효율적인 양자화** 를 가능하게 하여, GPU 메모리 및 컴퓨팅 자원이 제한된 환경에서 대규모 MLLM을 배포하는 데 중요한 해결책을 제공합니다. **모달리티별 스무딩** 과 **저랭크 보정** 의 조합은 다양한 활성화 분포를 가진 모달리티 전반에 걸쳐 강력한 양자화 성능을 유지할 수 있음을 보여주며, 이는 실제 AI 시스템 설계에 있어 중요한 고려사항입니다. 특히 **W4A8** 과 같은 공격적인 양자화 수준에서도 **FP16에 준하는 정확도** 와 **2.5배 빠른 추론 속도** 를 제공하므로, 에지 디바이스나 실시간 응답이 요구되는 서비스에 **MLLM** 을 적용하는 데 기여할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.