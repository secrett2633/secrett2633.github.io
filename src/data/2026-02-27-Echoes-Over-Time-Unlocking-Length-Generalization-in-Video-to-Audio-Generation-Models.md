---
title: "[논문리뷰] Echoes Over Time: Unlocking Length Generalization in Video-to-Audio Generation Models"
excerpt: "arXiv에 게시된 'Echoes Over Time: Unlocking Length Generalization in Video-to-Audio Generation Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-to-Audio Generation
  - Length Generalization
  - Multimodal Learning
  - Mamba Architecture
  - Hierarchical Networks
  - Flow Matching
  - Audio Synthesis

permalink: /ai/review/2026-02-27-Echoes-Over-Time-Unlocking-Length-Generalization-in-Video-to-Audio-Generation-Models/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20981)

**저자:** Christian Simon, Masato Ishii, Wei-Yao Wang, Koichi Saito, Akio Hayakawa, Dongseok Shim, Zhi Zhong, Shuyang Cui, Shusuke Takahashi, Takashi Shibuya, Yuki Mitsufuji



## 핵심 연구 목표
본 연구는 짧은 비디오 데이터로 학습한 모델이 추론 시 긴 길이의 오디오(Long-Form Audio)를 일관성 있고 고품질로 생성할 수 있도록 **Video-to-Audio (V2A) 모델의 길이 일반화(Length Generalization) 문제** 를 해결하는 것을 목표로 합니다. 기존 Transformer 기반 V2A 모델이 갖는 **위치 임베딩 의존성** 및 장기 시퀀스 처리의 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **MMHNet (Multimodal Hierarchical Networks)** 은 기존 V2A 모델을 확장하여 **계층적 구조** 와 **비인과적 Mamba(Non-Causal Mamba)** 아키텍처를 통합합니다. 이는 명시적인 위치 임베딩 없이도 시퀀스를 처리하여 긴 길이의 오디오 생성을 지원하며, **Temporal Routing** 및 **Multimodal Routing** 메커니즘을 통해 중요한 토큰만 선택적으로 처리하고 모달리티 간의 정렬을 효율적으로 수행합니다. 모델은 **Conditional Flow Matching** 목표로 짧은 오디오-비주얼 데이터에서 훈련됩니다.

## 주요 결과
MMHNet은 **UnAV100** 및 **LongVale** 과 같은 장편 V2A 벤치마크에서 기존 SOTA(State-Of-The-Art) 방법들을 크게 능가하는 성능을 보였습니다. 특히 UnAV100 데이터셋에서 **MMHNet-L** 은 **IB-Score 36.27** 과 **DeSync 0.410** 을 달성하여, **LoVA의 IB-Score 24.62** 및 **DeSync 1.232** 를 뛰어넘었습니다. 또한, 이전 V2A 모델들이 어려움을 겪었던 **5분 이상 길이의 비디오** 에서도 일관된 오디오 생성이 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
**Non-Causal Mamba 아키텍처** 와 **계층적 토큰 라우팅** 의 도입은 기존 Transformer 기반 모델의 길이 일반화 문제를 해결하는 효과적인 전략을 제시합니다. 짧은 훈련 데이터만으로 긴 길이의 오디오를 생성할 수 있는 능력은 실제 애플리케이션에서 **데이터 수집 부담을 줄이고** 효율적인 모델 배포를 가능하게 합니다. **MMHNet** 은 영화, 게임 등 장편 비디오 콘텐츠의 사운드 디자인 자동화에 강력한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.