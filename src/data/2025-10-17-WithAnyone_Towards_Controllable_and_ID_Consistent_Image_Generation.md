---
title: "[논문리뷰] WithAnyone: Towards Controllable and ID Consistent Image Generation"
excerpt: "이 [arXiv]에 게시한 'WithAnyone: Towards Controllable and ID Consistent Image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Identity-Consistent Generation
  - Text-to-Image Diffusion
  - Copy-Paste Artifacts
  - Contrastive Learning
  - Multi-Identity Dataset
  - Controllable Generation
  - ID-Preservation

permalink: /ai/review/2025-10-17-WithAnyone_Towards_Controllable_and_ID_Consistent_Image_Generation/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14975)

**저자:** Hengyuan Xu, Wei Cheng, Peng Xing, Yixiao Fang, Shuhan Wu, Rui Wang, Xianfang Zeng, Daxin Jiang, Gang Yu, Xingjun Ma, Yu-Gang Jiang



## 핵심 연구 목표
본 논문은 텍스트-투-이미지 생성 모델에서 레퍼런스 인물의 ID(Identity)를 일관성 있게 유지하면서도, 레퍼런스 이미지를 단순히 복사하는 듯한 **"copy-paste" 아티팩트**를 줄이고 생성된 이미지의 **표현, 포즈, 조명 등의 다양성 및 제어 가능성**을 높이는 것을 목표로 합니다. 기존 모델들이 과도한 ID 유사성을 추구하여 발생하는 제어 가능성 저하 문제를 해결하고자 합니다.

## 핵심 방법론
연구팀은 첫째, 다중 인물 시나리오를 위한 대규모 페어링 데이터셋인 **MultiID-2M**을 구축하여 각 ID에 대해 다양한 레퍼런스를 제공합니다. 둘째, **MultiID-Bench** 벤치마크를 도입하여 copy-paste 아티팩트와 ID 충실도 및 다양성 간의 트레이드오프를 정량화합니다. 셋째, **FLUX** 아키텍처 기반의 **WithAnyone** 모델에 **ID 대조 손실(contrastive identity loss)**과 **GT-aligned ID 손실**을 포함하는 새로운 훈련 패러다임을 제안하여 충실도와 다양성 간의 균형을 맞춥니다.

## 주요 결과
**WithAnyone**은 **MultiID-Bench**에서 copy-paste 아티팩트를 **크게 줄이면서도** 높은 ID 유사성(Sim(GT))을 유지함을 입증했습니다. 예를 들어, 단일 인물 서브셋에서 WithAnyone은 Sim(GT) **0.460**, CP **0.144**를 달성하여, InstantID(Sim(GT) **0.464**, CP **0.337**)보다 copy-paste가 훨씬 적고 ID 충실도는 유사합니다. 또한, 포즈 및 표정에 대한 제어 가능성이 향상되고 전반적인 시각적 품질이 높게 평가되었습니다. 사용자 연구에서도 높은 ID 충실도와 표현력 있는 제어 가능 생성을 확인했습니다.

## AI 실무자를 위한 시사점
**MultiID-2M** 데이터셋과 **MultiID-Bench** 벤치마크는 다중 인물 ID 보존 생성 모델 연구를 위한 귀중한 자원이 될 것입니다. **대조 학습(contrastive learning)**을 활용하여 단순히 레퍼런스를 복제하는 것을 넘어 ID의 본질을 학습하고 제어 가능성을 확보하는 방법론은 실제 애플리케이션에서 **더욱 유연하고 자연스러운 이미지 생성**을 가능하게 할 것입니다. 이는 아바타 생성, 콘텐츠 제작 등 다양한 분야에서 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.