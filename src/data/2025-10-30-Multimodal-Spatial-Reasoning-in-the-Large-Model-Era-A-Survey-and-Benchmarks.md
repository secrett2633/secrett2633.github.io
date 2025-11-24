---
title: "[논문리뷰] Multimodal Spatial Reasoning in the Large Model Era: A Survey and
  Benchmarks"
excerpt: "이 [arXiv]에 게시한 'Multimodal Spatial Reasoning in the Large Model Era: A Survey and
  Benchmarks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Spatial Reasoning
  - Survey
  - Benchmarks
  - 3D Vision
  - Embodied AI
  - Vision-Language Navigation

permalink: /ai/review/2025-10-30-Multimodal-Spatial-Reasoning-in-the-Large-Model-Era-A-Survey-and-Benchmarks/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25760)

**저자:** Xu Zheng, Zihao Dongfang, Lutao Jiang, et al.



## 핵심 연구 목표
본 논문은 인간의 다중모달 공간 추론 능력을 대규모 모델(MLLMs)에 적용하는 연구의 현황을 체계적으로 검토하고, 이 분야의 발전을 위한 **공개 벤치마크**를 제시하는 것을 목표로 합니다. 기존 연구에서 부족했던 **체계적인 리뷰와 평가 프레임워크**의 부재를 해결하여, MLLMs의 공간 추론 능력에 대한 종합적인 이해를 돕고 미래 연구 방향을 제시하고자 합니다.

## 핵심 방법론
이 서베이는 MLLMs의 공간 추론 발전을 **사후 훈련(Post-Training) 기법, 설명 가능성(Explainability), 아키텍처(Architecture) 설계** 등의 관점에서 분석합니다. 또한, **2D 이미지, 3D 장면, 비디오, 오디오** 등 다양한 모달리티 입력에 기반한 **3D 시각 그라운딩, 장면 이해, 임베디드 AI 태스크** 등을 상세히 검토합니다. 특히, **새로운 센서(egocentric video, audio)**를 활용한 공간 이해를 포함하여 광범위한 다중모달 공간 추론 태스크를 분류하고 주요 연구들을 요약합니다.

## 주요 결과
MLLMs가 2D 및 3D 공간 관계 이해에서 유망한 성능을 보이지만, **데이터 희소성, 일반화 부족, 해석 가능성 문제**에 직면하고 있음을 확인했습니다. 기존 연구들은 **시각적 추론 단계 시각화(Mind's Eye [9])**를 통해 2D 공간 추론 정확도를 높였으며, **Spatial-MLLM [18]**은 공간 벤치마크에서 **35-45% 상대적 성능 향상**을 보고했습니다. **GPT-4V [244]**는 SpatialRGPT-Bench에서 **58.14%의 성공률**을, SpatialEval에서 **92.4%의 정확도**를 달성하는 등 인상적인 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
본 서베이는 AI/ML 실무자들이 **MLLMs 기반 공간 추론 시스템**을 개발하고 평가하는 데 필요한 **핵심 개념, 최신 기술, 도전 과제 및 유용한 벤치마크**를 제공합니다. 특히, **데이터 희소성, 개방형 환경에서의 일반화, 실시간 상호작용** 등 실제 적용 시 직면할 수 있는 주요 문제점들을 인지하고, **오픈 벤치마크(https://github.com/zhengxuJosh/Awesome-Spatial-Reasoning)**를 활용하여 모델 성능을 표준화된 방식으로 평가하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.