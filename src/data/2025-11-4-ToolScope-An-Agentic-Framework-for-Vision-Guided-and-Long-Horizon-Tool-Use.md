---
title: "[논문리뷰] ToolScope: An Agentic Framework for Vision-Guided and Long-Horizon Tool
  Use"
excerpt: "Guanting Dong이 [arXiv]에 게시한 'ToolScope: An Agentic Framework for Vision-Guided and Long-Horizon Tool
  Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Agents
  - Tool-Augmented LLMs
  - Vision-Guided Reasoning
  - Long-Horizon Tasks
  - VQA
  - Global Planning
  - Context Preservation
  - Perceive Tool

permalink: /ai/review/2025-11-4-ToolScope-An-Agentic-Framework-for-Vision-Guided-and-Long-Horizon-Tool-Use/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27363)

**저자:** Mengjie Deng, Guanting Dong, Zhicheng Dou*



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)이 동적 추론, 외부 지식 접근 및 다단계 연산이 필요한 복잡한 작업에서 겪는 한계, 특히 **장기적인 VQA 작업**에서의 **제한된 전역 계획**과 **시각적 맥락 저하** 문제를 해결하는 것을 목표로 합니다. 이를 위해 MLLM이 유연하고 효율적으로 외부 도구를 활용하여 비전 기반의 장기 추론 작업을 수행할 수 있는 에이전트 프레임워크를 제안합니다.

## 핵심 방법론
본 연구는 **ToolScope**라는 에이전트 프레임워크를 제안하며, 이는 **Global Navigator**, **Agentic Executor**, **Response Synthesizer**의 세 가지 주요 구성 요소로 이루어집니다. **Global Navigator**는 고수준의 작업 분해 및 장기적인 도구 선택을 담당하여 전략적 지침을 제공하고, **Agentic Executor**는 **Search**, **Code**, 그리고 특수 설계된 **Perceive** 도구와 같은 외부 도구를 반복적으로 호출하여 지역적 멀티모달 인식을 강화합니다. 특히 **Perceive 도구**는 이미지를 질의 가능한 지각적 메모리로 취급하여 시각적 맥락 저하 문제를 완화하고 동적 시각적 접지를 가능하게 합니다.

## 주요 결과
**ToolScope**는 VQA 2.0, ScienceQA, MAT-Search, MathVista 등 네 가지 다양한 VQA 벤치마크에서 모든 기준선 대비 평균 **+6.69%**의 정확도 향상을 달성하며 일관되게 우수한 성능을 보였습니다. 특히 **MiMo-VL-7B-RL** 기반에서는 **MAT-Search**에서 최대 **+9.12%**의 성능 향상을 기록했습니다. 또한, **Search 도구**가 가장 큰 영향을 미치며 (MAT-Search에서 미사용 시 정확도 **39.40%에서 33.10%로 하락**), **Code 도구** 역시 **MathVista**에서 중요함이 입증되었습니다.

## AI 실무자를 위한 시사점
**ToolScope**는 **훈련 없이** 기존 MLLM에 통합될 수 있는 **플러그 앤 플레이** 방식의 프레임워크로, **AI 실무자**가 복잡한 멀티모달 에이전트를 구축하는 데 있어 효율적인 청사진을 제공합니다. 특히 **Perceive 도구**를 통해 **시각적 맥락 저하**라는 고질적인 문제를 효과적으로 해결하여, 장기적이고 반복적인 시각 추론이 필요한 고급 **VQA 시스템** 개발에 유용합니다. 이는 **강력한 일반화 능력과 확장성**을 바탕으로 다양한 도메인에서 MLLM의 도구 활용 능력과 추론 역량을 크게 향상시키는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.