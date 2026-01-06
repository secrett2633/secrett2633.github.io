---
title: "[논문리뷰] VAR RL Done Right: Tackling Asynchronous Policy Conflicts in Visual Autoregressive Generation"
excerpt: "이 [arXiv]에 게시한 'VAR RL Done Right: Tackling Asynchronous Policy Conflicts in Visual Autoregressive Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Autoregressive Models
  - Reinforcement Learning
  - Policy Conflicts
  - GRPO
  - Text-to-Image Generation
  - Credit Assignment
  - Multi-scale Generation

permalink: /ai/review/2026-01-06-VAR-RL-Done-Right-Tackling-Asynchronous-Policy-Conflicts-in-Visual-Autoregressive-Generation/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.02256)

**저자:** Shikun Sun, Liao Qu, Huichao Zhang, Yiheng Liu, Yangyang Song, Xian Li, Xu Wang, Yi Jiang, Daniel K. Du, Xinglong Wu, Jia Jia



## 핵심 연구 목표
Visual Autoregressive (VAR) 모델은 이질적인 입력 구조와 생성 단계별로 크게 변동하는 쿼리 토큰 수로 인해 비동기 정책 충돌이 발생하여, 특히 RL 환경에서 불안정한 학습과 최적화되지 않은 정렬을 초래합니다. 본 연구는 이러한 문제를 해결하고, 시각 자동회귀 생성에서 **Group Relative Policy Optimization (GRPO)** 기반의 RL 학습을 안정화하며 성능을 향상시키는 새로운 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 프레임워크는 세 가지 시너지 효과를 내는 구성 요소로 이루어져 있습니다: 전체 목표를 중간 시점 *m* (예: **m=m256** )에서 접두사 및 접미사 하위 작업으로 분해하는 **Value-as-Middle-Return (VMR)** , 각 시간 단계의 쿼리 토큰 수에 따라 손실 기여도를 동적으로 조정하는 **Per-Action Normalization Weighting (PANW)** , 그리고 보상 관련 토큰에 대한 업데이트를 집중시키기 위해 멀티스케일 계층 구조를 통해 마스크를 역전파하는 **Mask Propagation (MP)** 입니다. 기본 모델로 **NextFlow** 를 사용하고, 보상 설계에는 **PaddleOCRv5** 와 **HPSv3** 를 활용했습니다.

## 주요 결과
텍스트 렌더링 태스크의 **CVTG-2K 데이터셋** 에서, 제안된 방법( **NextFlow-RL** )은 기본 모델인 **NextFlow** 를 크게 능가하여, **Word Accuracy 0.7841** (대비 0.5536, **+41.6% 상대적 증가** ), **NED 0.9081** (대비 0.7816, **+16.2% 상대적 증가** ), **CLIPScore 0.8224** (대비 0.8068)를 달성했습니다. HPS refine 태스크에서는 HPSv3 평가 세트의 모든 카테고리에서 큰 성능 향상을 보였으며, 전체 Human Preference Score가 **8.43에서 10.64** 로 향상되었습니다 ( **+2.21 절대 증가** ).

## AI 실무자를 위한 시사점
VAR 모델의 고질적인 **비동기 정책 충돌 문제** 를 효과적으로 해결하는 실용적인 RL 프레임워크를 제시하여, 고해상도 시각 생성 모델의 **안정적인 학습과 성능 향상** 에 기여합니다. **VMR, PANW, MP** 와 같은 모듈형 접근 방식은 다른 복잡한 시퀀스 생성 또는 멀티스케일 모델에도 적용하여 **RL 학습의 안정성과 효율성을 개선** 할 수 있는 잠재력을 가집니다. 특히 **텍스트-이미지 생성** 에서 **텍스트 충실도와 시각적 품질** 을 동시에 크게 향상시켜, 고품질 이미지 생성 애플리케이션 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.