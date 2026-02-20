---
title: "[논문리뷰] RePlan: Reasoning-guided Region Planning for Complex Instruction-based Image Editing"
excerpt: "Yuqi Liu이 arXiv에 게시한 'RePlan: Reasoning-guided Region Planning for Complex Instruction-based Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Vision-Language Models
  - Diffusion Models
  - Region-aligned Guidance
  - Reinforcement Learning
  - Instruction-Visual Complexity
  - Attention Mechanism

permalink: /ai/review/2025-12-19-RePlan-Reasoning-guided-Region-Planning-for-Complex-Instruction-based-Image-Editing/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16864)

**저자:** Tianyuan Qu, Lei Ke, Xiaohang Zhan, Longxiang Tang, Yuqi Liu, Bohao Peng, Bei Yu, Dong Yu, Jiaya Jia



## 핵심 연구 목표
본 논문은 기존 지시 기반 이미지 편집 모델들이 **Instruction-Visual Complexity (IV-Complexity)** 시나리오(복잡한 시각적 문맥, 모호한 지시, 다중 객체 참조, 세계 지식 및 인과적 추론 필요)에서 겪는 어려움을 해결하는 것을 목표로 합니다. 특히, 미세한 이미지 편집에서 정확한 타겟 영역 그라운딩 및 실행 능력이 부족한 문제를 극복하고자 합니다.

## 핵심 방법론
RePlan은 **VLM 플래너** 와 **확산 기반 에디터** 를 결합한 '계획-실행' 프레임워크를 제안합니다. **VLM 플래너** 는 **Chain-of-Thought 추론** 을 통해 입력 이미지와 지시를 분석하고, **구조화된 영역-정렬 가이던스** (바운딩 박스 및 편집 힌트)를 생성합니다. 에디터는 **MMDiT** 아키텍처를 기반으로 **훈련 없이** **어텐션 영역 주입 메커니즘** 을 활용하여 정확하고 병렬적인 다중 영역 편집을 수행합니다. 플래너의 추론 능력을 강화하기 위해 약 1천 개의 지시 전용 예제를 사용하여 **GRPO (Group Relative Policy Optimization) 강화 학습** 을 적용합니다.

## 주요 결과
RePlan은 **IV-Edit 벤치마크** 에서 **Qwen-Image-Edit** , **Flux.1 Kontext dev** , **InstructPix2Pix** , **Bagel-Think** , **Uniworld-V1** , **Gemini-Flash-Image** , **GPT-4o** 등 최신 개방형 및 독점 모델들을 일관되게 능가하는 성능을 보였습니다. 특히 **Target** 및 **Consistency** 점수에서 상당한 개선을 보여, 정확한 타겟 로컬라이제이션과 관련 없는 영역의 보존 능력을 입증했습니다. 예를 들어, **Flux.1 Kontext dev** 를 백본으로 사용했을 때, RePlan은 **Overall 점수를 3.22에서 3.46** 으로, **Weighted 점수를 2.49에서 2.55** 로 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 VLM의 강력한 추론 능력을 확산 모델의 생성 능력과 효과적으로 결합하여 복잡한 지시 기반 이미지 편집의 새로운 가능성을 제시합니다. **영역-정렬 가이던스** 와 **어텐션 영역 주입** 은 미세한 제어와 예측 가능한 편집 결과를 위한 실용적인 접근 방식을 제공합니다. 또한, **적은 데이터셋(~1k 예제)** 으로 **강화 학습** 을 통해 VLM 플래너의 성능을 크게 향상시킬 수 있음을 보여주어, 특정 도메인에 대규모 모델을 효율적으로 적용하는 데 중요한 시사점을 제공합니다. 새로 제안된 **IV-Edit 벤치마크** 는 실제 세계의 복잡한 이미지 편집 시나리오를 반영하여 향후 연구에 중요한 시험대가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.