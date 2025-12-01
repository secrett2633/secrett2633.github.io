---
title: "[논문리뷰] V-Thinker: Interactive Thinking with Images"
excerpt: "Peiqing Yang이 [arXiv]에 게시한 'V-Thinker: Interactive Thinking with Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Multimodal Models
  - Interactive Reasoning
  - Vision-Centric Thinking
  - Reinforcement Learning
  - Data Synthesis
  - Visual Tools
  - Curriculum Learning
  - Multimodal AI

permalink: /ai/review/2025-11-7-V-Thinker-Interactive-Thinking-with-Images/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04460)

**저자:** Runqi Qiao, Qiuna Tan, Minghan Yang, Guanting Dong, Peiqing Yang, Shiqiang Lang, Enhui Wan, Xiaowan Wang, Yida Xu, Lan Yang, Chong Sun, Chen Li, Honggang Zhang



## 핵심 연구 목표
본 논문은 대규모 멀티모달 모델(LMM)이 긴 추론 과정에서 시각적 정보로부터 벗어나 환각을 일으키는 문제를 해결하고자 합니다. 특히, 기존 시각 도구의 제한된 범위와 태스크별 워크플로우 디자인의 한계를 극복하여, 이미지와 상호작용하는 추론(interactive, vision-centric thinking)을 가능하게 하는 **범용 멀티모달 추론 비서 V-Thinker** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**V-Thinker** 는 두 가지 핵심 구성요소로 이루어집니다. 첫째, **Data Evolution Flywheel** 은 지식 개념 및 시각 도구 세트의 공동 진화를 통해 다양성, 품질, 난이도 측면에서 대화형 추론 데이터셋( **V-Interaction-400K** )을 자동으로 합성하고 검증합니다. 둘째, **Visual Progressive Training Curriculum** 은 **V-Perception-40K** 데이터셋을 활용한 **점 단위(point-level) 감독** 을 통해 지각 정렬을 수행한 후, **두 단계의 강화 학습(RL) 프레임워크** 를 통해 대화형 추론 능력을 통합합니다. 이를 통해 모델은 시각적 요소를 조작하는 실행 가능한 코드를 자율적으로 생성하고 추론 체인을 시각적 증거에 기반하여 유지합니다.

## 주요 결과
**V-Thinker-7B** 는 **VTBench** 에서 기존 LMM 기반 모델들을 **일관되게 능가** 하는 성능을 보였습니다. 특히, **Instruction-Guided Interaction** 도메인에서 **25.8%p** 의 성능 향상을 달성했으며, 전체 대화형 추론 도메인에서 평균 **14.6%p** 의 정확도 향상을 이루었습니다. 또한, 일반 추론 벤치마크(MathVision, We-Math, VisuLogic)에서도 **일관된 개선** 을 보여, MathVision에서 **+6.3%p** 의 향상을 기록했습니다. **Data Evolution Flywheel** 은 5회 반복 후 초기 시드 크기의 약 **50배** 에 달하는 지식 개념 및 시각적 도구의 비선형적 성장을 보이며, 다양한 추론 데이터셋 **V-Interaction-400K** 생성을 검증했습니다.

## AI 실무자를 위한 시사점
**V-Thinker** 는 LMM이 복잡한 시각적 추론 태스크에서 **시각적 접지(visual grounding)** 를 유지하고 **코드 기반 시각 도구** 를 통해 능동적으로 상호작용하는 새로운 패러다임을 제시합니다. 자동화된 **데이터 합성 및 진화 방법론** 은 대규모 고품질 대화형 추론 데이터셋 구축에 중요한 실용적 통찰력을 제공하며, **강화 학습 기반 훈련** 은 실제 AI 에이전트가 복잡한 시각적 상호작용 문제를 해결하는 능력을 향상시키는 데 기여할 수 있습니다. 이는 미래의 AI 시스템이 더욱 직관적이고 인간과 유사하게 시각적 정보를 처리하고 추론하는 방향으로 발전할 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.