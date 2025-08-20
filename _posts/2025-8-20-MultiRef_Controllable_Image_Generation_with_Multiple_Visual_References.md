---
title: "[논문리뷰] MultiRef: Controllable Image Generation with Multiple Visual References"
excerpt: "Shiyun Lang이 [arXiv]에 게시한 'MultiRef: Controllable Image Generation with Multiple Visual References' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Controllable Image Generation
  - Multi-modal Generation
  - Visual References
  - Image-to-Image
  - Benchmark
  - Dataset
  - MLLM-as-a-Judge

permalink: /ai/review/2025-8-20-MultiRef_Controllable_Image_Generation_with_Multiple_Visual_References/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.06905)

**저자:** Ruoxi Chen, Dongping Chen, Siyuan Wu, Sinan Wang, Shiyun Lang, Peter Sushko, Gaoyang Jiang, Yao Wan, Ranjay Krishna*



## 핵심 연구 목표
이 연구는 텍스트 프롬프트나 단일 이미지 참조에 의존하는 기존 이미지 생성 모델의 한계를 극복하고, **다중 시각 참조(multiple visual references)를 활용한 제어 가능한 이미지 생성**이라는 새로운 문제에 초점을 맞춥니다. 실제 예술가들이 다양한 시각적 영감을 결합하여 작품을 만들듯이, AI 모델이 복합적인 지시를 따르도록 하는 것을 목표로 합니다.

## 핵심 방법론
다중 시각 참조 이미지 생성을 위한 엄격한 평가 프레임워크인 **MULTIREF-BENCH**를 제안하며, 이는 990개의 합성 및 1,000개의 실제 샘플로 구성됩니다. 또한, 10가지 참조 유형과 33가지 조합을 포함하는 데이터 생성 엔진 **REFBLEND**를 통해 **38,000개 이상의 고품질 MULTIREF 데이터셋**을 구축했습니다. 실험에서는 **OmniGen, ACE, Show-o**와 같은 이미지-텍스트 모델 및 **ChatDiT, LLM + SD**와 같은 에이전트 프레임워크를 평가했습니다.

## 주요 결과
실험 결과, 현재의 최첨단 시스템조차 다중 참조 조건화에 어려움을 겪는 것으로 나타났습니다. 최상위 모델인 **OmniGen**은 합성 샘플에서 **66.6%**, 실제 샘플에서 **79.0%**의 정확도를 보여 황금 표준에 비해 낮은 성능을 기록했습니다. 구성 프레임워크는 이미지 품질에서 강점을 보였으나, 지시 따르기 및 원본 충실도 측면에서는 미흡했습니다.

## AI 실무자를 위한 시사점
이 연구는 다중 시각 참조를 이용한 제어 가능한 이미지 생성이 여전히 인공지능 분야의 주요 도전 과제임을 명확히 합니다. **MULTIREF-BENCH**와 **MULTIREF 데이터셋**은 이 복잡한 문제에 대한 향후 연구 및 모델 개발을 위한 필수적인 자원을 제공합니다. AI 개발자들은 다양한 시각적 입력 간의 **정보 통합 능력**과 **참조 충실도 유지**에 초점을 맞춰 더욱 유연하고 인간적인 창의적 AI 도구를 개발해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.