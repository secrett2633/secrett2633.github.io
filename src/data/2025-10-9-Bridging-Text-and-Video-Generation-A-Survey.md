---
title: "[논문리뷰] Bridging Text and Video Generation: A Survey"
excerpt: "G. Maragatham이 arXiv에 게시한 'Bridging Text and Video Generation: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Video Generation
  - Generative Models
  - Diffusion Models
  - GANs
  - VAEs
  - Video Synthesis
  - Survey
  - Evaluation Metrics

permalink: /ai/review/2025-10-9-Bridging-Text-and-Video-Generation-A-Survey/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04999)

**저자:** Nilay Kumar, Priyansh Bhandari, G. Maragatham



## 핵심 연구 목표
본 논문은 텍스트-투-비디오(T2V) 생성 모델의 발전 과정을 포괄적으로 분석하고, **초기 GANs 및 VAEs 기반 모델부터 최신 확산 기반 아키텍처까지** 주요 혁신과 한계를 조명하는 것을 목표로 합니다. 나아가 T2V 분야의 **주요 도전 과제(정렬, 장기 일관성, 계산 효율성)** 를 식별하고, 미래 연구 방향을 제시하여 이 분야의 발전을 돕고자 합니다.

## 핵심 방법론
논문은 T2V 모델들을 **GANs, VAEs, DDPMs(Diffusion Probabilistic Models)** 세 가지 주요 범주로 분류하여 각각의 **아키텍처, 작동 방식, 선행 모델의 한계 극복 방안** 을 상세히 설명합니다. 또한 **WebVid-10M, HowTo100M, LAION-5B** 등 주요 훈련 데이터셋과 **GPU, 배치 크기, 학습률, 최적화기** 같은 상세한 **훈련 환경 설정** 을 분석합니다. 마지막으로 **Inception Score (IS), Fréchet Inception Distance (FID), CLIP Similarity (CLIP-SIM), Fréchet Video Distance (FVD), Kernel Video Distance (KVD)** 등 **정량적 평가 지표** 와 **VBench** 같은 **인간 평가 중심 벤치마크** 의 역할을 다룹니다.

## 주요 결과
본 연구는 T2V 모델이 초기 **GANs/VAEs** 에서 **확산 기반 모델** 로 진화하면서 **더 높은 품질과 시간적 일관성** 을 달성했음을 보여줍니다. **CogVideo** 는 UCF-101에서 **50.46 IS** 를, **Make-A-Video** 는 UCF-101에서 **71.67 IS** 를 기록하는 등 여러 모델의 표준 벤치마크 성능을 비교 제시합니다. 그러나 **데이터 가용성 부족, 높은 계산 비용, 복잡한 장면에서의 시간적 일관성 모델링의 어려움** 이 여전히 핵심 과제로 남아있음을 강조합니다.

## AI 실무자를 위한 시사점
AI 실무자는 T2V 프로젝트 시 **확산 모델** 이 현재 가장 유망한 접근 방식임을 인지하고, **Make-A-Video, VideoFusion, LaVie** 등의 최신 아키텍처를 참고할 수 있습니다. **대규모의 고품질 데이터셋 확보 및 합성 데이터 생성** 은 모델 성능 향상에 필수적이며, **GPU 사양 및 훈련 하이퍼파라미터** 에 대한 상세한 정보는 실제 시스템 구축 및 최적화에 중요한 가이드라인이 됩니다. **IS, FID, CLIP-SIM** 과 같은 정량적 지표와 더불어 **VBench** 같은 **다차원 인간 평가 벤치마크** 를 활용하여 모델의 종합적인 품질을 평가하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.