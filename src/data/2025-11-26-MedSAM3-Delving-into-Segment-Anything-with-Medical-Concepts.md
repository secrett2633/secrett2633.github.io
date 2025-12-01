---
title: "[논문리뷰] MedSAM3: Delving into Segment Anything with Medical Concepts"
excerpt: "Yi Lu이 [arXiv]에 게시한 'MedSAM3: Delving into Segment Anything with Medical Concepts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Medical Image Segmentation
  - Segment Anything Model (SAM)
  - Promptable Concept Segmentation (PCS)
  - Multimodal Large Language Models (MLLMs)
  - Agentic AI
  - Domain Adaptation
  - Text-guided Segmentation

permalink: /ai/review/2025-11-26-MedSAM3-Delving-into-Segment-Anything-with-Medical-Concepts/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19046)

**저자:** Anglin Liu, Rundong Xue, Xu R. Cao, Yifan Shen, Yi Lu, Xiang Li, Qianqian Chen, Jintai Chen



## 핵심 연구 목표
의료 영상 분할 분야에서 기존 모델들의 일반화 부족과 광범위한 수동 주석 요구 사항을 해결하고, 순전히 기하학적 프롬프트에 의존하는 한계를 극복하는 것을 목표로 합니다. 특히, **SAM 3** 의 "Promptable Concept Segmentation (PCS)" 기능을 의료 도메인에 적용하여 자연어 텍스트 설명으로 해부학적 구조를 정확하게 타겟팅하는 **개념 기반 의료 분할 모델** 을 개발하고자 합니다.

## 핵심 방법론
**Segment Anything Model (SAM) 3 아키텍처** 를 의료 이미지 및 비디오 분할을 위해 **미세 조정** 했습니다. 이 과정에서 이미지와 텍스트 인코더는 고정하고, **검출기 모듈** 만 업데이트하여 의료 개념에 효율적으로 적응시켰습니다. 또한, **MedSAM-3 Agent** 라는 프레임워크를 도입하여 **Multimodal Large Language Models (MLLMs)** (예: **Gemini 3 Pro** )와 통합, 복잡한 추론 및 반복적인 세분화를 통해 에이전트-인-더-루프(agent-in-the-loop) 워크플로우를 구현합니다.

## 주요 결과
**MedSAM-3 Agent** 는 **BUSI** 테스트 세트에서 **Dice score 0.8064** 를 달성하여 기본 **MedSAM-3 (0.7772)** 대비 성능을 향상시켰습니다. **MedSAM-3 T+I (Text Prompt + Bounding Box)** 설정은 다양한 2D 의료 데이터셋(예: **BUSI, RIM-ONE(Cup), ISIC 2018, Kvasir-SEG** )에서 기존 SAM 3 및 전문 모델들을 일관되게 능가하는 성능을 보였습니다. 순수 텍스트 프롬프트 기반의 **SAM 3 T** 는 의료 영상 분할에서 명확한 한계를 보였으며, SAM 3는 3D 데이터셋에서 전반적으로 낮은 성능을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 **SAM 3** 와 같은 대규모 파운데이션 모델을 의료 도메인에 성공적으로 **도메인 적응** 시키는 방법을 제시하며, 복잡한 의료 개념을 직접 활용하여 분할의 정확도를 높이는 가능성을 열었습니다. **MLLM 기반 에이전트 프레임워크** 의 도입은 단순히 분할 도구를 제공하는 것을 넘어, 복잡한 임상 지침을 해석하고 반복적인 피드백을 통해 정확도를 개선하는 새로운 AI 시스템 개발 방향을 제시합니다. 이는 의료 AI 시스템의 **일반화 가능성** 과 **사용자 상호작용성** 을 크게 향상시킬 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.