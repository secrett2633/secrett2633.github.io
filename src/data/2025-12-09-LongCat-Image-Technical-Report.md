---
title: "[논문리뷰] LongCat-Image Technical Report"
excerpt: "이 [arXiv]에 게시한 'LongCat-Image Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Text-to-Image
  - Image Editing
  - Diffusion Model
  - Multilingual Text Rendering
  - Photorealism
  - Efficiency
  - Open-Source

permalink: /ai/review/2025-12-09-LongCat-Image-Technical-Report/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07584)

**저자:** Meituan LongCat Team



## 핵심 연구 목표
컴퓨터 비전 분야에서 **다국어 텍스트 렌더링, 사실주의, 배포 효율성, 개발자 접근성** 등 기존 주요 모델들의 핵심 과제를 해결하고자 합니다. **LongCat-Image** 는 브루트 포스 스케일링에 대한 의존성에서 벗어나 **최첨단 성능과 효율성** 간의 최적의 균형을 이루는 경량 오픈소스 기반 모델을 목표로 합니다.

## 핵심 방법론
모델은 **6B 파라미터** 의 **하이브리드 MM-DiT 및 Single-DiT 구조** 를 기반으로 하며, **Qwen2.5VL-7B** 를 통합 멀티모달 텍스트 인코더로 사용합니다. 엄격한 **데이터 큐레이션 전략** 을 통해 **AIGC 오염 데이터** 를 철저히 제거하고, **RL (Reinforcement Learning)** 단계에서는 **AIGC 감지 모델** 을 보상으로 활용하여 사실감을 극대화합니다. 특히, 복잡한 중국어 텍스트 렌더링을 위해 **SynthDoG** 를 통한 합성 데이터와 **문자 수준 토크나이저** , 그리고 **OCR 및 미학 보상 모델** 을 통합했습니다.

## 주요 결과
**LongCat-Image** 는 **6B 파라미터** 로 **GenEval** 에서 **0.87** , **DPG** 에서 **86.80** , **WISE** 에서 **0.65** 의 종합 성능을 달성하며 여러 벤치마크에서 수십 배 큰 오픈소스 모델들을 능가하는 **SOTA (State-of-the-Art) 성능** 을 입증했습니다. **ChineseWord 벤치마크** 에서 **90.7%** 의 종합 정확도를 기록하며 한자 렌더링에서 새로운 산업 표준을 제시했습니다. 이미지 편집 모델인 **LongCat-Image-Edit** 는 **CEdit-Bench** 에서 **Overall 7.65 (CN)** 및 **7.67 (EN)** 를 달성하며 뛰어난 지시 준수 및 시각적 일관성을 보여주었습니다.

## AI 실무자를 위한 시사점
**LongCat-Image** 는 모델 크기보다 **효율적인 아키텍처 설계** 와 **정교한 데이터 및 훈련 방법론** 이 고성능에 필수적임을 보여주어, AI 모델 개발의 새로운 방향을 제시합니다. **다국어 텍스트 렌더링** 및 **이미지 편집** 분야에서 상업용 시스템에 필적하는 성능을 제공하므로, **다국어 시각 콘텐츠 생성** 및 **고품질 이미지 편집** 이 필요한 실제 애플리케이션에 효과적으로 적용될 수 있습니다. 전체 훈련 코드베이스와 중간 체크포인트까지 오픈소스로 제공되어, 커뮤니티의 추가 연구 및 개발을 위한 진입 장벽을 크게 낮췄습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.