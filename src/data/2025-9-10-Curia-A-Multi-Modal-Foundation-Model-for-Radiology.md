---
title: "[논문리뷰] Curia: A Multi-Modal Foundation Model for Radiology"
excerpt: "Elodie Ferreres이 arXiv에 게시한 'Curia: A Multi-Modal Foundation Model for Radiology' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Foundation Model
  - Radiology
  - Computed Tomography (CT)
  - Magnetic Resonance Imaging (MRI)
  - Self-supervised Learning
  - Vision Transformer
  - Cross-Modality Generalization

permalink: /ai/review/2025-9-10-Curia-A-Multi-Modal-Foundation-Model-for-Radiology/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06830)

**저자:** Corentin Dancette, Julien Khlaut, Antoine Saporta, Helene Philippe, Elodie Ferreres, Baptiste Callard, Théo Danielou, Léo Alberge, Léo Machado, Daniel Tordjman, Julie Dupuis, Korentin Le Floch, Jean Du Terrail, Mariam Moshiri, Laurent Dercle, Tom Boeken, Jules Gregory, Maxime Ronot, François Legou, Pascal Roux, Marc Sapoval, Pierre Manceron, Paul Hérent



## 핵심 연구 목표
기존 방사선과 AI 모델의 "원 태스크, 원 모델" 방식이 비효율적이고 일반화 능력이 부족하다는 문제를 해결하고자 합니다. 대규모 임상 데이터를 활용하여 **다중 모달 파운데이션 모델(Foundation Model)** 인 **Curia** 를 개발함으로써 다양한 영상 모달리티, 질병, 소견에 걸쳐 광범위하게 일반화하고, 적은 데이터 환경에서도 뛰어난 성능을 발휘하여 방사선과 워크플로우를 혁신하는 것을 목표로 합니다.

## 핵심 방법론
**Curia** 는 **Vision Transformer (ViT-B, ViT-L)** 아키텍처를 기반으로 하며, **DINOv2 알고리즘** 을 통해 **200M개 이상의 CT 및 MRI 이미지(130 TB)** 라는 대규모 임상 실세계 데이터셋에서 **자체 지도 학습** 방식으로 사전 훈련되었습니다. 모델의 성능은 **CuriaBench** 라는 19가지의 새로운 방사선과 태스크 벤치마크를 사용하여 평가되었으며, 사전 훈련된 모델 백본에 **경량 분류기** 를 연결하여 **미세 조정 없이** 특징을 추출하는 방식으로 다양한 하위 태스크에 적응했습니다.

## 주요 결과
**Curia** 는 **CT Organ Recognition** 에서 **98.40%** , **MRI Organ Recognition** 에서 **89.11%** 의 정확도를 달성하며 기존 **MedImageInsight** 및 **BiomedCLIP** 모델을 능가했습니다. 특히 **Kidney Lesion Malignancy** 태스크에서 **Curia-L** 은 **80.29% AUROC** 를 기록하며 다른 파운데이션 모델보다 뛰어난 성능을 보였습니다. 또한, **Curia** 는 **cross-modal generalization** 능력을 입증하여 CT 훈련 후 MRI에서 **9.17%** 의 정확도 감소를 보여주었으며, 많은 작업에서 **방사선과 레지던트** 의 성능에 필적하거나 이를 능가하는 임상적으로 중요한 결과를 달성했습니다.

## AI 실무자를 위한 시사점
**Curia** 의 성공은 대규모 **자체 지도 학습** 과 **단일 모델 아키텍처** 가 다양한 방사선과 태스크에서 뛰어난 일반화 성능을 제공하는 **파운데이션 모델** 개발의 가능성을 확증합니다. 이 모델의 **cross-modal generalization** 능력은 CT와 MRI 같은 여러 모달리티 간의 특징 전이를 가능하게 하여 의료 영상 AI 솔루션 개발의 비용과 복잡성을 획기적으로 줄일 수 있습니다. **낮은 데이터 환경(few-shot learning)** 에서의 높은 성능은 희귀 질환 진단 등 데이터가 제한적인 임상 시나리오에 매우 유용하며, 공개될 모델 가중치(`https://huggingface.co/raidium/curia`)는 의료 AI의 실용적인 적용을 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.