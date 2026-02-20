---
title: "[논문리뷰] Thinking with Programming Vision: Towards a Unified View for Thinking with Images"
excerpt: "Tao Jin이 arXiv에 게시한 'Thinking with Programming Vision: Towards a Unified View for Thinking with Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Tool Learning
  - Code Generation
  - Reinforcement Learning
  - Image Manipulation
  - Robustness
  - Error Recovery
  - Programming Vision

permalink: /ai/review/2025-12-04-Thinking-with-Programming-Vision-Towards-a-Unified-View-for-Thinking-with-Images/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03746)

**저자:** Zirun Guo, Minjie Hong, Feng Zhang, Kai Jia, Tao Jin



## 핵심 연구 목표
본 논문은 기존 MLLM이 단순한 이미지 변형(방향 전환, 뒤집기 등)에 취약하며, 제한적이고 유연하지 못한 도구 사용으로 인해 시각적 추론 성능 향상이 미미하다는 문제를 제기합니다. 이러한 한계를 극복하고, MLLM이 이미지를 프로그래밍 방식으로 조작하며 견고하고 확장 가능한 다중 도구 추론을 수행할 수 있도록 하는 통합 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 모델이 어떠한 이미지 작업이든 호출할 수 있는 범용 인터페이스로 코드를 생성하는 유연하고 확장 가능한 **CodeVision** 이라는 "코드-as-툴" 프레임워크를 제안합니다. 복잡한 다중 도구 구성 및 오류 처리를 위해 큐레이션된 고품질 데이터셋을 활용한 **지도 미세 조정(SFT)** 과 전략적이고 효율적인 도구 사용을 장려하는 **밀집된 다중 구성 요소 보상 함수** 를 포함하는 **강화 학습(RL)** 의 2단계 학습 방식을 사용합니다.

## 주요 결과
**CodeVision 모델** 은 이미지 방향 변형에 대한 MLLM의 취약성을 해결하여, 변형된 **OCRBench** 에서 **CodeVision-7B** 가 기본 모델 대비 **+17.4% 향상된 73.4%** 의 평균 점수를 달성했습니다. 특히, 다중 도구 추론 벤치마크인 **MVToolBench** 에서 **CodeVision-7B** 는 **60.1%** 의 점수를 기록하며 차선책 모델인 **Gemini2.5-Pro (32.6%)** 의 성능을 거의 두 배로 능가했습니다. 또한, 유연한 도구 구성, 효율적인 연쇄 실행, 런타임 피드백을 통한 견고한 오류 복구와 같은 새로운 기능이 나타남을 확인했습니다.

## AI 실무자를 위한 시사점
"코드-as-툴" 패러다임은 AI/ML 엔지니어가 MLLM에 고정된 도구 레지스트리를 넘어 사실상 무한한 시각적 작업을 통합할 수 있는 강력한 방법을 제공합니다. 본 연구에서 사용된 **SFT와 RL의 2단계 학습** 및 **밀집된 다중 구성 요소 보상 함수** 설계는 복잡한 시각적 추론에서 모델의 견고성과 전략적 도구 사용 능력을 향상시키는 데 핵심적인 고려사항임을 시사합니다. 이는 MLLM이 시각적 상호작용을 프로그래밍 작업으로 취급하는 새로운 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.