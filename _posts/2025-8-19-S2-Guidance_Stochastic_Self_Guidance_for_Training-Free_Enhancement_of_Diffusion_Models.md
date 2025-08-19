---
title: "[논문리뷰] S^2-Guidance: Stochastic Self Guidance for Training-Free Enhancement of
  Diffusion Models"
excerpt: "Meiqi Wu이 [arXiv]에 게시한 'S^2-Guidance: Stochastic Self Guidance for Training-Free Enhancement of
  Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Classifier-free Guidance
  - Self-Guidance
  - Training-Free
  - Stochastic Block-Dropping
  - Generative Models
  - Text-to-Image

permalink: /ai/review/2025-8-19-S2-Guidance_Stochastic_Self_Guidance_for_Training-Free_Enhancement_of_Diffusion_Models/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.12880)

**저자:** Chubin Chen, Jiashu Zhu, Xiaokun Feng, Nisha Huang, Meiqi Wu, Fangyuan Mao, Jiahong Wu, Xiangxiang Chu, Xiu Li



## 핵심 연구 목표
본 논문은 확산 모델에서 널리 사용되는 **Classifier-free Guidance (CFG)**가 종종 의미론적 불일치와 낮은 품질의 결과물을 초래하는 문제를 해결하고자 합니다. 외부 훈련된 약한 모델이나 태스크별 아키텍처 수정에 의존하는 기존 방법론의 한계를 극복하여, 모델 자체의 구조를 활용한 **훈련-비용 없는(training-free)** 방식으로 확산 모델의 생성 품질을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 먼저 **Gaussian mixture modeling**에 대한 분석을 통해 CFG의 최적화되지 않은 예측을 시각화합니다. 이를 기반으로, 포워드 프로세스 중에 **확률적 블록 드롭핑(stochastic block-dropping)**을 활용하여 약한 모델을 구성하는 **S²-Guidance**를 제안합니다. 이 방법은 **단일 확률적 블록 드롭핑**을 통해 생성된 서브-네트워크의 예측을 CFG의 출력에서 빼는 방식으로 기존 CFG의 가이던스 신호를 수정하여 모델이 잠재적인 저품질 예측에서 벗어나 고품질 결과물로 향하도록 유도합니다.

## 주요 결과
**Text-to-Image (T2I)** 생성 태스크에서 **SD3** 모델 기준 **HPSv2.1** 벤치마크에서 **31.09%**의 평균 점수를 기록하며 CFG(30.48%)를 능가했습니다. 또한 **T2I-CompBench**에서는 Color 항목에서 **59.63%**를 달성하여 CFG(53.61%) 대비 상당한 향상을 보였고, **최고의 심미적 점수(Qalign)**를 달성했습니다. **Text-to-Video (T2V)**에서는 **Wan1.3B** 모델 기준 **80.93**의 **최고 총점**을 기록하며 CFG(80.29) 및 다른 경쟁 방법들을 뛰어넘었습니다. 사용자 연구에서도 **31.0%**의 **전반적인 선호도**를 얻으며 탁월한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**S²-Guidance**는 기존 확산 모델에 추가적인 **훈련 없이** 적용 가능하여, **훈련-비용 없는** 방식으로 생성 품질을 향상시키는 실용적인 솔루션을 제공합니다. 이 방법은 CFG가 야기하는 의미론적 불일치 및 아티팩트 생성과 같은 일반적인 문제를 효과적으로 완화하여, 이미지 및 비디오 생성에서 시각적으로 우수하고 프롬프트에 더 잘 부합하는 결과물을 얻을 수 있습니다. 이는 AI/ML 엔지니어들이 배포된 모델의 성능을 손쉽게 개선하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.