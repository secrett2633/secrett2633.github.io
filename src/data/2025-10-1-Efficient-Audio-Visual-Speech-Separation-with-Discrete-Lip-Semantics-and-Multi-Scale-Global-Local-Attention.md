---
title: "[논문리뷰] Efficient Audio-Visual Speech Separation with Discrete Lip Semantics and
  Multi-Scale Global-Local Attention"
excerpt: "이 [arXiv]에 게시한 'Efficient Audio-Visual Speech Separation with Discrete Lip Semantics and
  Multi-Scale Global-Local Attention' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Visual Speech Separation
  - Deep Learning
  - Efficiency
  - Discrete Lip Semantics
  - Global-Local Attention
  - Lightweight Models
  - VQ-VAE

permalink: /ai/review/2025-10-1-Efficient-Audio-Visual-Speech-Separation-with-Discrete-Lip-Semantics-and-Multi-Scale-Global-Local-Attention/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23610)

**저자:** Kai Li, Kejun Gao, Xiaolin Hu



## 핵심 연구 목표
오디오-비주얼 음성 분리(AVSS) 분야에서 기존 모델들의 높은 연산 비용과 파라미터 수로 인해 발생하는 실용적 배포의 한계를 해결하는 것을 목표로 합니다. 특히, 시각 인코더의 '경로 의존성' 문제와 반복적 분리기의 추론 지연 문제를 극복하면서 분리 성능 저하 없이 효율성을 극대화하는 **경량 AVSS 모델** 을 개발하고자 합니다.

## 핵심 방법론
본 연구는 효율적인 AVSS 모델인 **Dolphin** 을 제안합니다. 이를 위해, 립 모션을 이산적인 오디오 정렬 의미 토큰으로 변환하는 이중 경로 경량 비디오 인코더인 **DP-LipCoder** 를 개발했습니다. 음성 분리에는 각 레이어에 멀티 스케일 종속성을 효율적으로 캡처하는 **Global-Local Attention (GLA) 블록** 을 통합한 경량 인코더-디코더 분리기를 구축했습니다.

## 주요 결과
**Dolphin** 은 LRS2, LRS3, VoxCeleb2 벤치마크 데이터셋에서 최신 **SOTA IIANet 모델** 보다 우수한 분리 품질을 달성했습니다. 특히, 효율성 측면에서 **IIANet** 대비 **파라미터 50% 이상 감소** , **MACs 2.4배 이상 감소** , **GPU 추론 속도 6배 이상 향상** 이라는 놀라운 성과를 보였습니다. **DP-LipCoder** 는 **3D ResNet-18** 대비 파라미터 93%, MACs 70%를 줄이면서도 유사한 SI-SNRi 성능을 유지했습니다.

## AI 실무자를 위한 시사점
**Dolphin** 은 고성능 AVSS를 요구하면서도 리소스가 제한적인 실제 시나리오, 특히 에지 디바이스에서의 배포에 실용적인 해결책을 제시합니다. **DP-LipCoder** 의 이산 립 의미론 사용과 **GLA 블록** 을 통한 효율적인 멀티스케일 특징 학습은 경량 모델 설계에 대한 새로운 방향을 제시하여, 향후 **온디바이스 AI 음성 처리 애플리케이션** 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.