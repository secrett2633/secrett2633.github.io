---
title: "[논문리뷰] CoF-T2I: Video Models as Pure Visual Reasoners for Text-to-Image Generation"
excerpt: "arXiv에 게시된 'CoF-T2I: Video Models as Pure Visual Reasoners for Text-to-Image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - Video Models
  - Visual Reasoning
  - Chain-of-Frame (CoF)
  - Progressive Refinement
  - Diffusion Models
  - CoF-Evol-Instruct

permalink: /ai/review/2026-01-16-CoF-T2I-Video-Models-as-Pure-Visual-Reasoners-for-Text-to-Image-Generation/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10061)

**저자:** Chengzhuo Tong, Mingkun Chang, Shenglong Zhang, Yuran Wang, Cheng Liang, Zhizheng Zhao, Ruichuan An, Bohan Zeng, Yang Shi, Yifan Dai, Ziming Zhao, Guanbin Li, Pengfei Wan, Yuanxing Zhang, Wentao Zhang



## 핵심 연구 목표
본 논문은 비디오 모델을 텍스트-투-이미지(T2I) 생성의 "순수한 시각적 추론기"로 활용하여, 기존 T2I 모델의 시각적 추론 시작점 부재와 중간 단계의 불명확성 문제를 해결하는 것을 목표로 합니다. 비디오 모델의 **Chain-of-Frame (CoF) 추론 능력** 을 활용하여 프레임별 시각적 추론을 통한 점진적인 이미지 품질 개선을 제안합니다.

## 핵심 방법론
제안된 **CoF-T2I** 모델은 **비디오 생성 백본** ( **Wan2.1-T2V-14B** 로 초기화)을 기반으로 T2I 생성을 **3프레임 시퀀스** 의 명시적인 시각적 추론 과정으로 재정의합니다. 각 프레임은 거친 초기 레이아웃에서 중간 정제, 최종 고품질 이미지로 이어지는 추론 단계를 나타냅니다. 특히, 비디오 고유의 모션 아티팩트를 방지하기 위해 **프레임별 잠재 표현 메커니즘** 을 도입하여 각 프레임을 독립적으로 인코딩 및 디코딩합니다. 모델은 **CoF-Evol-Instruct** 라는 **64K 규모** 의 큐레이션된 **CoF 궤적 데이터셋** 으로 훈련되며, **플로우 매칭 목표 함수** 를 최적화합니다.

## 주요 결과
**CoF-T2I** 는 기본 비디오 모델을 크게 능가하며, **GenEval 벤치마크** 에서 **0.86** 의 선도적인 종합 점수를 달성했습니다 (기존 **Wan2.1** 모델의 **0.55** 대비). 또한, **Imagine-Bench 벤치마크** 에서는 **7.468** 점을 기록하여 (기존 **Wan2.1** 모델의 **5.939** 대비) 경쟁력 있는 성능을 보였습니다. 추론 궤적 분석 결과, 프레임 F1(0.56)에서 F2(0.79)를 거쳐 최종 F3(0.86)까지 성능이 단조롭게 향상됨을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 파운데이션 모델** 이 T2I 분야에서 강력한 시각적 추론기로 활용될 수 있음을 보여주며, 텍스트 기반의 복잡한 추론 단계를 넘어선 새로운 T2I 패러다임을 제시합니다. **CoF-Evol-Instruct 데이터셋** 은 점진적인 시각적 정제를 요구하는 모델 학습에 귀중한 리소스가 될 수 있습니다. 특히, **프레임별 독립적인 인코딩 전략** 은 비디오 백본을 사용하여 고품질 T2I 생성을 달성하는 데 필수적인 요소로, 실무자들이 비디오 모델을 활용할 때 고려해야 할 중요한 기술적 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.