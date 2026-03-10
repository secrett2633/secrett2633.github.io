---
title: "[논문리뷰] CARE-Edit: Condition-Aware Routing of Experts for Contextual Image Editing"
excerpt: "Dan Xu이 arXiv에 게시한 'CARE-Edit: Condition-Aware Routing of Experts for Contextual Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Diffusion Models
  - Mixture-of-Experts (MoE)
  - Condition-Aware Routing
  - Contextual Image Editing
  - Mask Repaint
  - Latent Mixture
  - Diffusion Transformer

permalink: /ai/review/2026-03-10-CARE-Edit-Condition-Aware-Routing-of-Experts-for-Contextual-Image-Editing/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08589)

**저자:** Yucheng Wang*, Zedong Wang*, Yuetong Wu, Yue Ma, Dan Xu



## 핵심 연구 목표
이 논문은 기존의 통합 이미지 편집 모델들이 고정된 공유 백본을 사용함으로써 다중 조건(텍스트, 마스크, 참조 이미지) 입력 시 발생하는 태스크 간섭, 색상 번짐, 정체성/스타일 왜곡 등의 문제를 해결하고자 합니다. 특히, 정적 조건 융합 방식의 한계를 극복하고 이질적인 요구사항에 동적으로 적응하는 고품질 컨텍스트 이미지 편집 프레임워크를 개발하는 것이 목표입니다.

## 핵심 방법론
제안하는 **CARE-Edit** 은 **경량 잠재-어텐션 라우터** 를 통해 인코딩된 확산 토큰을 텍스트, 마스크, 참조, 기본 이미지라는 네 가지 전문화된 **이종 전문가(heterogeneous experts)** 에게 동적으로 할당합니다. 이 과정에는 사용자 정의 마스크를 정밀하게 개선하는 **Mask Repaint 모듈** , 최상위 K개 전문가를 선택하는 **Routing Select** , 그리고 전문가 출력을 통합하는 **Latent Mixture 모듈** 이 포함됩니다. 모델은 **FLUX diffusion model** 을 기반으로 **LoRA-스타일 미세 조정** 되며, **로드 밸런싱** , **마스크 경계 일관성** , **잠재 혼합 평활도** 손실을 포함한 보조 정규화 기법과 함께 최적화됩니다.

## 주요 결과
**CARE-Edit** 은 이미지 제거, 대체, 텍스트 기반 편집 및 스타일 전송을 포함한 다양한 컨텍스트 편집 태스크에서 강력한 성능을 입증했습니다. 특히 **DreamBench++** 벤치마크에서 **DINO-I↑ 0.568** , **CLIP-I↑ 0.720** , **CLIP-T↑ 0.327** 의 점수를 달성하며 기존 최첨단 모델들을 능가했습니다. 경험적 분석을 통해 동적, 조건 인식 전문가 할당이 다중 조건 충돌을 효과적으로 해결하고, 각 전문가가 태스크별로 특화된 역할을 수행함을 확인했습니다.

## AI 실무자를 위한 시사점
**Condition-Aware Routing of Experts (MoE)** 아키텍처는 복잡한 다중 모달 이미지 편집 환경에서 **모델의 효율성과 제어 가능성을 혁신적** 으로 개선할 수 있음을 보여줍니다. AI 실무자들은 **정적 조건 융합** 의 한계를 극복하기 위해 태스크 및 시점에 따라 **모델 연산을 동적으로 할당** 하는 방식을 고려하여, 특정 영역에 대한 정밀한 편집이나 스타일/정체성 보존이 필요한 고품질 이미지 생성 및 편집 시스템을 구축하는 데 활용할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.