---
title: "[논문리뷰] AssetFormer: Modular 3D Assets Generation with Autoregressive Transformer"
excerpt: "[arXiv]에 게시된 'AssetFormer: Modular 3D Assets Generation with Autoregressive Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Asset Generation
  - Modular Design
  - Autoregressive Transformer
  - User-Generated Content (UGC)
  - Text-to-3D
  - Tokenization
  - SlowFast Decoding

permalink: /ai/review/2026-02-24-AssetFormer-Modular-3D-Assets-Generation-with-Autoregressive-Transformer/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12100)

**저자:** Lingting Zhu, Shengju Qian, Haidi Fan, Jiayu Dong, Zhenchao Jin, Siwei Zhou, Gen Dong, Xin Wang, Lequan Yu



## 핵심 연구 목표
본 논문은 텍스트 설명을 기반으로 고품질의 다양하고 모듈러한 3D 애셋을 생성하는 것을 목표로 합니다. 특히, 게임 산업과 사용자 생성 콘텐츠(UGC) 환경에서 기존 3D 표현 방식의 한계(높은 품질 요구사항, 큰 파일 크기, 제한된 접근성)를 극복하고자 합니다. 또한, 실제 세계의 모듈러 3D 애셋 데이터셋의 부족 문제를 해결하고, 구성 요소 간의 제약된 설계 매개변수를 준수하는 애셋 생성을 가능하게 합니다.

## 핵심 방법론
제안된 **AssetFormer** 는 **Decoder-only Transformer** 기반의 오토회귀 모델입니다. 3D 애셋을 클래스, 회전, 3D 위치 등 5가지 파라미터로 구성된 **이산 토큰 시퀀스** 로 표현하며, **DFS(Depth-First Search)** 기반의 **토큰 재정렬** 기법을 사용하여 구조적, 공간적 관계를 효과적으로 포착합니다. 추론 시에는 **Classifier-Free Guidance(CFG)** 와 **SlowFast 디코딩** (작은 용량의 드래프트 모델과 큰 용량의 타겟 모델 활용)을 적용하여 생성 품질을 높이고 속도를 가속화합니다.

## 주요 결과
AssetFormer는 온라인 UGC 플랫폼에서 수집된 **대규모 모듈러 3D 애셋 데이터셋(총 20,000개 샘플)** 을 구축했습니다. 정량적 평가에서 **AssetFormer + Top-K Sampling** 은 **FID 55.186** 및 **CLIP 0.320** 을 달성하여 PCG 방법론(FID 108.476) 및 다른 샘플링 전략보다 우수한 성능을 보였습니다. **DFS 토큰 재정렬** 은 다른 재정렬 방식보다 효과적이었으며, **SlowFast 디코딩** 은 품질 저하 없이 디코딩 속도를 **119.02 tokens/s** 로 가속화했습니다.

## AI 실무자를 위한 시사점
AssetFormer는 실제 산업 환경, 특히 게임 엔진 및 UGC 플랫폼에 통합하기 쉬운 모듈러 3D 애셋을 생성하는 실용적인 프레임워크를 제공합니다. **이산 토큰화** 와 **오토회귀 모델링** 은 복잡한 3D 구조를 효율적이고 제어 가능한 방식으로 생성할 수 있게 하며, **SlowFast 디코딩** 은 대규모 3D 애셋 생성의 계산 비용을 줄이는 데 기여합니다. 이는 아티스트의 작업 흐름을 간소화하고 비전문가도 쉽게 3D 콘텐츠를 만들고 공유할 수 있도록 지원하여 3D 콘텐츠 제작의 민주화를 가속화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.