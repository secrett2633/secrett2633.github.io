---
title: "[논문리뷰] Towards Scalable Pre-training of Visual Tokenizers for Generation"
excerpt: "arXiv에 게시된 'Towards Scalable Pre-training of Visual Tokenizers for Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Tokenizers
  - Pre-training
  - Latent Diffusion Models
  - Generative Models
  - Vision Transformer
  - Contrastive Learning
  - Self-Supervised Learning
  - Scaling Laws

permalink: /ai/review/2025-12-16-Towards-Scalable-Pre-training-of-Visual-Tokenizers-for-Generation/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13687)

**저자:** Jingfeng Yao¹*, Yuda Song², Yucong Zhou¹, Xinggang Wang¹† (¹Huazhong University of Science and Technology, ²MiniMax)



## 핵심 연구 목표
본 논문은 시각 토크나이저(예: VAE)의 잠재 공간이 저수준 정보에 편향되어 고품질 생성으로 이어지지 않는 '사전 학습 스케일링 문제'를 해결하는 것을 목표로 합니다. 생성 모델을 위해 잠재 공간이 **고수준 의미** 를 효과적으로 표현하고, 컴퓨팅, 파라미터, 데이터 규모에 따라 생성 성능이 진정으로 확장될 수 있는 새로운 사전 학습 패러다임을 제안합니다.

## 핵심 방법론
저자들은 **VTP(Visual Tokenizer Pre-training)** 라는 통합 프레임워크를 제시하며, 이는 **Vision Transformer(ViT)** 기반의 오토인코더 구조를 활용합니다. **VTP** 는 **이미지-텍스트 대조 학습(CLIP)** , **자기 지도 학습(Self-Supervised Learning; MIM 및 DINOv2)** , 그리고 **재구성 손실(L1 및 Perceptual loss)** 이라는 세 가지 주요 목표를 공동으로 최적화합니다. 이 다중 작업 학습 방식은 잠재 공간이 높은 재구성 충실도, 풍부한 의미론적 표현, 그리고 교차 모달 정렬을 동시에 갖추도록 훈련시킵니다.

## 주요 결과
제안된 **VTP** 는 기존 재구성 전용 오토인코더가 사전 학습 **FLOPS** 스케일링 시 생성 성능이 저하되는 것과 달리, **FLOPS** 를 늘리면 다운스트림 생성 **FID** 가 **65.8%** 향상됨을 보여주었습니다. 최종 **VTP-L-d64 모델** 은 **ImageNet** 에서 **78.2% 제로샷 정확도** 와 **0.36 rFID** 를 달성했으며, 기존 증류 기반 방법론 대비 **4.1배 빠른 생성 수렴 속도** 를 기록했습니다. 또한, **VTP** 는 모델 파라미터 및 데이터 스케일링에 따라 생성 성능이 일관되게 향상되는 우수한 확장성을 입증했습니다.

## AI 실무자를 위한 시사점
**VTP** 는 시각 토크나이저 사전 학습에서 **의미론적 이해(understanding)** 가 고품질 생성의 핵심 동인임을 명확히 보여주며, 단순히 픽셀 수준의 재구성 정확도에만 집중하는 것의 한계를 지적합니다. AI/ML 엔지니어는 생성 모델의 토크나이저를 설계할 때 **CLIP** 이나 **DINOv2** 와 같은 **표현 학습 목표** 를 재구성 손실과 결합하는 **다중 목표 학습 전략** 을 적극적으로 고려해야 합니다. 특히 대규모 데이터와 컴퓨팅 자원을 활용하는 경우, **VTP** 와 같은 이해 기반 접근 방식이 생성 모델 성능의 상한선을 높이고 효율적인 스케일링을 가능하게 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.