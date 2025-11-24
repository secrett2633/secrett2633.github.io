---
title: "[논문리뷰] Reasoning in Space via Grounding in the World"
excerpt: "Li Zhang이 [arXiv]에 게시한 'Reasoning in Space via Grounding in the World' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Visual Grounding
  - Spatial Reasoning
  - Large Language Models (LLMs)
  - Chain-of-Thought (CoT)
  - Hybrid Representation
  - Multi-modal LLMs
  - Point Clouds

permalink: /ai/review/2025-10-16-Reasoning-in-Space-via-Grounding-in-the-World/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13800)

**저자:** Yiming Chen, Zekun Qi, Wenyao Zhang, Xin Jin, Li Zhang, Peidong Liu



## 핵심 연구 목표
기존 3D LLM이 통일된 3D 표현 부재 및 외부 모듈 의존으로 인해 3D 시각적 그라운딩과 공간 추론을 원활하게 통합하지 못하는 문제를 해결하는 것이 목표입니다. 본 연구는 LLM이 자율회귀적 방식으로 자연스럽고 효과적인 그라운딩을 수행하여 공간 추론 능력을 향상시킬 수 있는 방법을 모색합니다.

## 핵심 방법론
본 논문은 **Grounded-Spatial Reasoner (GS-Reasoner)**를 제안하며, **듀얼 패스 풀링 메커니즘**을 도입하여 기하학적 특징과 시맨틱 및 위치 단서를 통합하는 **통일된 이미지 패치 기반 3D 표현**을 구축합니다. 이 표현을 통해 외부 모듈 없이 **자율회귀적 그라운딩**을 수행하며, 그라운딩을 공간 추론 과정의 핵심 구성 요소로 통합하는 **Grounded Chain-of-Thought (GCoT) 데이터셋**을 구축했습니다. **SigLIP** 기반의 시맨틱 인코더, **Sonata** 기반의 **Point Transformer v3 (PTv3)** 기하학적 인코더, 그리고 **LLaVA-Video 7B** 기반의 비디오 LLM을 사용합니다.

## 주요 결과
**3D 시각적 그라운딩**에서 메쉬 제안 또는 외부 그라운딩 모듈을 사용하는 SOTA 모델과 필적하는 성능을 달성했으며, **Multi3DRef**에서 **F1@25 SOTA**를 기록했습니다. **VSI-Bench 공간 추론** 태스크에서는 평균 점수 **70점 이상**을 기록하여 이전 SOTA 대비 **거의 10점** 가까이 향상된 성능을 보여주며, 특히 상대 방향 및 절대 거리 태스크에서 뛰어납니다. 또한 **Scan2Cap**에서 **CIDEr 101.0, BLEU-4 47.6**을 달성하며 3D 조밀 캡셔닝에서 새로운 SOTA를 수립했습니다. **GCoT 데이터셋**은 그라운딩을 CoT 과정에 통합하여 객체 절대 거리, 상대 방향, 경로 계획 등 모든 태스크의 성능을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 **3D 시각적 그라운딩**을 LLM의 **자율회귀적 CoT** 단계로 긴밀히 통합하는 것이 고급 **공간 추론**에 필수적임을 보여줍니다. 제안된 **시맨틱-기하학적 하이브리드 3D 표현**은 외부 모듈 없이 복잡한 3D 장면을 효과적으로 처리할 수 있게 하여 배포를 간소화합니다. **GCoT 데이터셋**은 인간의 인지 과정과 일치하도록 객체를 먼저 그라운딩한 후 공간 추론하는 모델을 훈련하는 데 유용한 리소스로, **로봇 공학** 및 **임베디드 AI** 응용 분야에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.