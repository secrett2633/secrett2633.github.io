---
title: "[논문리뷰] Taming Text-to-Sounding Video Generation via Advanced Modality Condition
  and Interaction"
excerpt: "arXiv에 게시된 'Taming Text-to-Sounding Video Generation via Advanced Modality Condition
  and Interaction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Sounding Video Generation
  - Diffusion Models
  - Dual-tower Architecture
  - Cross-modal Fusion
  - Visual Grounding
  - Hierarchical Captioning
  - Cross-Attention

permalink: /ai/review/2025-10-10-Taming-Text-to-Sounding-Video-Generation-via-Advanced-Modality-Condition-and-Interaction/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03117)

**저자:** Kaisi Guan, Xi Hua, Zhengfeng Lai, Xin Cheng, Peng Zhang, Kieran Liu, Ruihua Song, Meng Cao.



## 핵심 연구 목표
본 논문은 텍스트로부터 사운딩 비디오를 생성하는 **Text-to-Sounding Video (T2SV)** 연구에서 발생하는 두 가지 근본적인 문제를 해결하고자 합니다. 첫째는 단일 텍스트 캡션을 공유함으로써 발생하는 **모달 간섭(modal interference) 문제** 이고, 둘째는 듀얼 타워 아키텍처 내에서 **효과적인 크로스-모달 상호작용 메커니즘** 을 설계하는 문제입니다.

## 핵심 방법론
첫째, **Hierarchical Visual-Grounded Captioning (HVGC)** 프레임워크를 도입하여 시각적 정보를 기반으로 **분리된 모달리티-순수(modality-pure) 캡션** 을 생성합니다. 둘째, **BridgeDiT** 라는 새로운 듀얼 타워 디퓨전 트랜스포머 아키텍처를 제안하고, 이 아키텍처 내에 대칭적이고 효율적인 정보 교환을 가능하게 하는 **Dual CrossAttention (DCA)** 융합 메커니즘을 통합했습니다. 이 모델은 **WAN 2.1** 과 **Stable Audio Open 1.0** 같은 사전 훈련된 단일 모달 백본 위에 구축되었습니다.

## 주요 결과
본 모델은 **AVSync15, VGGSound-SS, Landscape** 등 세 가지 벤치마크 데이터셋에서 기존 방법론들을 능가하는 **최첨단 성능** 을 달성했습니다. 특히, **AVSync15** 데이터셋에서 FVD↓ **765.74** , FAD↓ **21.33** , CLAP↑ **35.95** , AV-Align↑ **0.275** 를 기록하며 우수성을 입증했습니다. 또한, 사용자 연구에서도 모든 평가 기준에서 가장 높은 전반적 품질 점수(Overall↑ **3.46** )를 획득하여 사람의 선호도와도 일치함을 보였습니다.

## AI 실무자를 위한 시사점
**T2SV** 와 같은 복합 멀티모달 생성 태스크에서 **모달리티별 독립적인 조건 부여(conditional generation)** 가 성능 향상에 필수적임을 보여주었습니다. **시각적으로 접지된 캡션 생성(HVGC)** 방식은 기존 오디오 LLM의 환각 문제를 해결하는 효과적인 전략입니다. 또한, 듀얼 타워 아키텍처에서 **Dual CrossAttention** 과 같은 대칭적 융합 메커니즘이 의미론적, 시간적 동기화를 강화하는 데 중요하며, **BridgeDiT 블록의 조기/중간 레이어 배치** 가 가장 효과적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.