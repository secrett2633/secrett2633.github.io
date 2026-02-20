---
title: "[논문리뷰] FSVideo: Fast Speed Video Diffusion Model in a Highly-Compressed Latent Space"
excerpt: "arXiv에 게시된 'FSVideo: Fast Speed Video Diffusion Model in a Highly-Compressed Latent Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Model
  - Image-to-Video Generation
  - Latent Space Compression
  - Diffusion Transformer (DiT)
  - Model Acceleration
  - Layer Memory
  - Video Upsampling

permalink: /ai/review/2026-02-03-FSVideo-Fast-Speed-Video-Diffusion-Model-in-a-Highly-Compressed-Latent-Space/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02092)

**저자:** FSVideo Team, Intelligent Creation, ByteDance



## 핵심 연구 목표
본 논문은 기존 비디오 확산 모델의 높은 추론 비용으로 인한 긴 대기 시간과 GPU 비용 문제를 해결하여, 더욱 빠르고 효율적인 비디오 생성을 가능하게 하는 **고속 이미지-투-비디오 (I2V) 확산 프레임워크인 FSVideo** 를 개발하는 것을 목표로 합니다. 특히, **높게 압축된 잠재 공간** 에서의 비디오 생성을 통해 모델 연산량을 줄여 속도를 극대화하고자 합니다.

## 핵심 방법론
FSVideo는 세 가지 핵심 구성요소를 기반으로 합니다. 첫째, **64 × 64 × 4의 높은 공간-시간 다운샘플링 비율** 을 가진 새로운 비디오 오토인코더인 **FSAE** 를 사용하여 경쟁력 있는 재구성 품질을 유지하면서 잠재 공간을 대폭 압축합니다. 둘째, **새로운 레이어 메모리 디자인** 을 적용한 **Diffusion Transformer (DiT) 아키텍처** 를 통해 레이어 간 정보 흐름과 컨텍스트 재사용을 강화합니다. 셋째, **몇 단계의 DiT 업샘플러** 를 통한 **다중 해상도 생성 전략** 으로 비디오 충실도를 크게 향상시킵니다.

## 주요 결과
FSVideo는 다른 인기 있는 오픈소스 모델들과 비교하여 경쟁력 있는 성능을 달성하면서 **최대 42.3배 더 빠른 속도** 를 보여주었습니다. 특히, **Wan2.1-I2V-14B-720P** 모델 대비 H100 GPU 2개 사용 시 **42.3배의 속도 향상** 을 기록했으며, 잠재적 최적화 시 **58.7배** 까지 빨라질 수 있음을 제시합니다. **VBench 2.0 벤치마크** 에서 FSVideo는 **88.12%의 총점** , **95.39%의 I2V 점수** , **80.85%의 품질 점수** 를 달성하여 경쟁 모델과 유사하거나 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
FSVideo는 **매우 높은 압축률의 잠재 공간** 을 활용하여 비디오 생성 속도를 획기적으로 향상시킬 수 있음을 입증하여, AI/ML 엔지니어들에게 실용적인 **비디오 생성 모델 최적화 방향** 을 제시합니다. **레이어 메모리 디자인** 과 **다단계 업샘플링 전략** 은 모델의 표현력과 생성 품질을 유지하면서 효율성을 높이는 중요한 기법입니다. 이는 리소스 제약이 있는 환경에서 고품질 비디오를 빠르게 생성해야 하는 애플리케이션 개발에 특히 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.