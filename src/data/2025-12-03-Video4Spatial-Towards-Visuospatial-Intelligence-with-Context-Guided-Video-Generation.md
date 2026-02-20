---
title: "[논문리뷰] Video4Spatial: Towards Visuospatial Intelligence with Context-Guided Video Generation"
excerpt: "Yu Ning이 arXiv에 게시한 'Video4Spatial: Towards Visuospatial Intelligence with Context-Guided Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Spatial Reasoning
  - Visuospatial Intelligence
  - Diffusion Models
  - Context-Guided Generation
  - Scene Navigation
  - Object Grounding
  - Out-of-Domain Generalization

permalink: /ai/review/2025-12-03-Video4Spatial-Towards-Visuospatial-Intelligence-with-Context-Guided-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03040)

**저자:** Zeqi Xiao, Yiwei Zhao, Lingxiao Li, Yushi Lan, Yu Ning



## 핵심 연구 목표
본 논문은 비디오 생성 모델이 **시각 데이터(비디오 컨텍스트)** 만을 사용하여 인간의 인지와 유사한 **시공간 지능(Visuospatial Intelligence)** 을 발휘할 수 있는지 탐구하는 것을 목표로 합니다. 특히 깊이나 포즈와 같은 보조 양식 없이도 복잡한 **공간 작업(spatial tasks)** , 즉 **장면 내비게이션(scene navigation)** 과 **객체 접지(object grounding)** 를 수행하는 프레임워크를 제시합니다.

## 핵심 방법론
제안된 **VIDEO4SPATIAL** 프레임워크는 **비디오 확산 모델(video diffusion models)** 을 기반으로 하며, 비디오 기반 장면 컨텍스트에만 조건화됩니다. **컨텍스트와 타겟 프레임을 동일한 트랜스포머 스택** 을 통해 처리하고, 컨텍스트 프레임의 확산 타임스텝을 **t=0** 으로 설정합니다. 컨텍스트 일관성을 높이기 위해 **공동 분류기-자유 안내(joint Classifier-Free Guidance, CFG)** 를 적용하며, 객체 접지 정확도를 위해 훈련 시 **보조 바운딩 박스(auxiliary bounding box)** 를 활용합니다. 또한, 효율적인 컨텍스트 이해를 위해 **비연속 컨텍스트 샘플링(non-contiguous context sampling)** 과 **Rotary Positional Embeddings (RoPE)** 를 사용합니다.

## 주요 결과
본 방법은 **객체 접지** 와 **장면 내비게이션** 두 가지 작업에서 강력한 성능을 입증했습니다. 객체 접지 작업에서 우리 모델은 **SD(Spatial Distance)** **0.1099** , **IF(SD<0.2)** **0.6486** 를 달성하여 기존 **Wan2.2-5B** (SD 0.5341, IF(SD<0.2) 0.2242) 및 **Veo3** (SD 0.2211, IF(SD<0.2) 0.4599) 모델을 크게 능가했습니다. 특히, **보조 바운딩 박스** 는 **IF(SD<0.2)** 를 **0.5401에서 0.6486** 로 향상시켰으며, **비연속 RoPE** 는 **SD** 를 **0.3246(연속)에서 0.1099** 로 개선했습니다. 또한, 실내 데이터셋으로 학습했음에도 불구하고 **실외 환경** 및 **훈련 중 보지 못한 객체 카테고리** 에 대해서도 효과적으로 일반화되는 것을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 생성 모델이 명시적인 3D 정보 없이 **시각 데이터만으로 복잡한 공간 추론 능력** 을 구축할 수 있음을 보여줍니다. **공동 CFG, 보조 바운딩 박스, 비연속 컨텍스트 샘플링** 과 같은 핵심 설계 선택은 비디오 생성의 일관성과 접지 정확도를 높이는 실용적인 방법론을 제공합니다. 이는 실제 환경에서 **자율 내비게이션** 및 **객체 상호작용** 과 같은 AI 응용 분야에서 비디오 기반 시공간 지능의 잠재력을 확장하는 데 중요한 의미를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.