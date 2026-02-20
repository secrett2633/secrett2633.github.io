---
title: "[논문리뷰] Hyper-Bagel: A Unified Acceleration Framework for Multimodal
  Understanding and Generation"
excerpt: "Jianbin Zheng이 arXiv에 게시한 'Hyper-Bagel: A Unified Acceleration Framework for Multimodal
  Understanding and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Acceleration Framework
  - Speculative Decoding
  - Diffusion Distillation
  - Unified Models
  - Text-to-Image Generation
  - Image Editing
  - Computational Efficiency

permalink: /ai/review/2025-9-24-Hyper-Bagel-A-Unified-Acceleration-Framework-for-Multimodal-Understanding-and-Generation/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18824)

**저자:** Yanzuo Lu, Xin Xia, Manlin Zhang, Huafeng Kuang, Jianbin Zheng, Yuxi Ren, Xuefeng Xiao



## 핵심 연구 목표
통합 멀티모달 모델에서 확산 디노이징과 자기회귀 디코딩의 반복적인 프로세스로 발생하는 상당한 **계산 오버헤드** 를 해결하는 것이 주 목표입니다. **Hyper-Bagel** 이라는 통합 가속 프레임워크를 제안하여 멀티모달 이해 및 생성 작업을 동시에 가속화하면서 원본 모델의 고품질 출력을 유지하고자 합니다.

## 핵심 방법론
**Hyper-Bagel** 은 이해 작업을 위한 **스펙큘레이티브 디코딩** 과 생성 작업을 위한 **다단계 확산 증류(multi-stage diffusion distillation)** 전략을 사용합니다. 스펙큘레이티브 디코딩은 **새로운 중간 계층 아키텍처** 와 **제로-초기화 기법** 으로 개선되었으며, 확산 증류는 **CFG 증류** , **TSCD(Trajectory Segmented Consistency Distillation)** , 그리고 **DMDO(Distribution Matching Distillation via ODE)** 로 구성됩니다. 또한, **1-NFE 모델** 은 **ADP(Adversarial Diffusion Pre-training)** 및 **ReFL(Reward Feedback Learning)** 을 통해 미세 조정되었습니다.

## 주요 결과
이 프레임워크는 멀티모달 이해에서 **2배 이상의 속도 향상** 을 달성했습니다. 생성 작업의 경우, 손실 없는 **6-NFE 모델** 은 텍스트-투-이미지 생성에서 **16.67배** , 이미지 편집에서 **22배** 의 속도 향상을 이루었으며, 원본 모델과 동등하거나 우수한 품질을 유지했습니다. 특히, **6-NFE Hyper-BAGEL** 은 GenEval에서 **0.8647** 점을 기록하여 기준 모델을 능가했으며, GEdit-Bench에서도 **6.612(영어)** 및 **6.671(중국어)** 로 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**Hyper-Bagel** 은 대규모 멀티모달 모델의 **추론 속도와 비용 효율성을 혁신적** 으로 개선하여 실무 배포 가능성을 크게 높였습니다. **스펙큘레이티브 디코딩** 과 **다단계 증류** 는 복잡한 AI 모델의 지연 시간을 줄이고 사용자 경험을 향상시키는 데 중요한 기술적 통찰을 제공합니다. 특히 **1-NFE 모델** 은 실시간 상호작용이 필수적인 대화형 이미지 편집 및 생성 애플리케이션에서 **즉각적이고 끊김 없는 사용자 경험** 을 구현하는 데 핵심적인 역할을 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.