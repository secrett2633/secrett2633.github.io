---
title: "[논문리뷰] Cut2Next: Generating Next Shot via In-Context Tuning"
excerpt: "Yu Qiao이 [arXiv]에 게시한 'Cut2Next: Generating Next Shot via In-Context Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Next Shot Generation
  - In-Context Tuning
  - Diffusion Transformer
  - Cinematic Continuity
  - Hierarchical Prompting
  - Video Generation
  - Shot Editing

permalink: /ai/review/2025-8-13-Cut2Next_Generating_Next_Shot_via_In-Context_Tuning/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08244)

**저자:** Jingwen He, Hongbo Liu, Jiajun Li, Ziqi Huang, Yu Qiao, Wanli Ouyang, Ziwei Liu



## 핵심 연구 목표
본 논문은 기존 비디오 생성 모델이 간과했던 영화적 내러티브 흐름과 편집 패턴(예: **Shot/Reverse Shot**, **Cut-Out**, **Cutaway**)을 준수하면서, 선행 샷에 **영화적으로 일관성 있는 다음 샷을 생성**하는 새로운 태스크인 **Next Shot Generation (NSG)**을 제안합니다. 시각적 일관성을 넘어 **서사적 정교함**과 **진정한 영화적 무결성**을 달성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 프레임워크인 **Cut2Next**는 **Diffusion Transformer (DiT)** 기반의 **FLUX.1-dev** 모델을 활용하며, **인-콘텍스트 튜닝**을 통해 다음 샷을 생성합니다. 핵심은 **계층적 멀티 프롬프팅 전략**으로, 전반적인 맥락과 샷 간 편집 스타일을 정의하는 **Relational Prompts**와 각 샷의 내용 및 영화적 속성을 상세히 명시하는 **Individual Prompts**를 사용합니다. 또한, **Context-Aware Condition Injection (CACI)** 및 **Hierarchical Attention Mask (HAM)**과 같은 아키텍처 개선을 통해 다양한 조건부 입력을 통합합니다.

## 주요 결과
**CutBench** 벤치마크에서의 정량적 평가에서 **Cut2Next**는 기존 **IC-LoRA-Cond** 대비 월등한 성능을 보였습니다. 샷 간 시각적 일관성에서 더 높은 **DINO Similarity (0.4952)**와 **CLIP-I Similarity (0.7298)**를 달성했으며, 텍스트 충실도에서는 **CLIP-T Fidelity (0.2979)**를 기록했습니다. 특히 **FID 점수**는 **IC-LoRA-Cond의 80.43**에 비해 현저히 낮은 **59.37**을 달성하여 우수성을 입증했습니다. 사용자 연구에서도 **Cut2Next**는 영화적 연속성(93.7%) 및 편집 준수(96.5%) 측면에서 압도적인 선호도를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 단순한 시각적 일관성을 넘어선 **영화적 내러티브 비디오 생성**의 가능성을 보여주며, AI 기반 콘텐츠 제작의 새로운 방향을 제시합니다. **계층적 프롬프팅**과 **인-콘텍스트 튜닝** 방식은 복잡한 시네마틱 요소를 제어하는 데 효과적인 접근법으로, 실제 영화 제작 과정에 영감을 줄 수 있습니다. 다만, **높은 모션이 포함된 샷**이나 **장기적인 일관성 유지**는 여전히 도전 과제로 남아있으므로 후속 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.