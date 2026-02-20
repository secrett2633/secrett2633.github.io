---
title: "[논문리뷰] ShapeGen4D: Towards High Quality 4D Shape Generation from Videos"
excerpt: "Sergey Tulyakov이 arXiv에 게시한 'ShapeGen4D: Towards High Quality 4D Shape Generation from Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D Shape Generation
  - Video-conditioned
  - Dynamic 3D Meshes
  - Latent Diffusion Model
  - Spatiotemporal Attention
  - Temporal Consistency
  - Pre-trained 3D Models
  - VAE

permalink: /ai/review/2025-10-8-ShapeGen4D-Towards-High-Quality-4D-Shape-Generation-from-Videos/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06208)

**저자:** Jiraphon Yenphraphai*, Ashkan Mirzaei, Jianqi Chen, Jiaxu Zou, Sergey Tulyakov, Raymond A. Yeh, Peter Wonka, Chaoyang Wang



## 핵심 연구 목표
본 논문은 단일 입력 비디오에서 시간적으로 변화하는 3D 기하학과 시점 일관성을 갖춘 외형(4D Shape)을 직접 복원하는 것을 목표로 합니다. 기존 SDS(Score Distillation Sampling) 기반 방법의 취약성이나 2단계 파이프라인의 누적 오류 문제를 극복하고, 비디오에서 엔드-투-엔드로 동적 3D 메시 표현을 생성하는 프레임워크를 제안합니다.

## 핵심 방법론
본 연구는 **Step1X-3D** 와 같은 **사전 훈련된 3D 생성 모델** 을 4D 설정에 맞게 확장한 **플로우 기반 잠재 확산 트랜스포머** 를 사용합니다. 핵심적으로, (i) 모든 프레임에서 생성 조건을 지정하고 시간 인덱스 동적 표현을 생성하는 **시공간 어텐션(spatiotemporal attention)** , (ii) 시간적으로 일관된 기하학과 텍스처를 촉진하는 **시간 인식 포인트 샘플링 및 4D 잠재 앵커링** , 그리고 (iii) 시간적 안정성을 높이는 **프레임 간 노이즈 공유** 가 도입되었습니다.

## 주요 결과
**Objaverse** 테스트 세트의 정량적 비교에서, ShapeGen4D는 기존의 **L4GM** 및 **GVFD** 를 포함한 최신 방법론을 능가하는 기하학적 정확도를 달성했습니다. 본 방법은 **Chamfer 거리 0.1220 (↓)** , **IoU 0.3276 (↑)** , **F-Score 0.2934 (↑)** 를 기록하며, 베이스라인 대비 일관된 성능 향상을 보였습니다. 또한, 제안된 구성 요소들의 중요성은 각 요소를 제거한 **Ablation Study** 를 통해 검증되었습니다.

## AI 실무자를 위한 시사점
**대규모 사전 훈련된 3D 모델** 을 **제한된 4D 데이터** 로 동적 시퀀스 생성에 활용하는 효과적인 접근 방식을 제공합니다. **시공간 어텐션** 및 **노이즈 공유** 기법은 비디오-투-4D 생성에서 **시간적 일관성** 을 확보하는 데 필수적이며, 이는 다른 시퀀스 기반 AI 모델 개발에도 시사하는 바가 큽니다. 생성된 메시의 **사후 포즈 등록 및 텍스처링 파이프라인** 은 실용적인 4D 에셋 생성에 기여하지만, 입력 비디오의 시점에 대한 독립성으로 인한 전역 모션 처리의 한계는 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.