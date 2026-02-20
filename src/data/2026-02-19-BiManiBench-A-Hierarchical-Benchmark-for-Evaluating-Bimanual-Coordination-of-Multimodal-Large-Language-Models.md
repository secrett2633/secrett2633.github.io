---
title: "[논문리뷰] BiManiBench: A Hierarchical Benchmark for Evaluating Bimanual Coordination of Multimodal Large Language Models"
excerpt: "arXiv에 게시된 'BiManiBench: A Hierarchical Benchmark for Evaluating Bimanual Coordination of Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Bimanual Manipulation
  - MLLMs
  - Robotics Benchmark
  - Spatial Reasoning
  - Action Planning
  - End-Effector Control
  - Embodied AI
  - Multimodal LLMs

permalink: /ai/review/2026-02-19-BiManiBench-A-Hierarchical-Benchmark-for-Evaluating-Bimanual-Coordination-of-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08392)

**저자:** Xin Wu, Zhixuan Liang, Yue Ma, Mengkang Hu, Zhiyuan Qin, Xiu Li



## 핵심 연구 목표
기존 로봇 조작 벤치마크가 주로 단일 팔 조작에 국한되어 양팔 조작에 필수적인 **공간-시간적 조정, 동적 역할 할당, 자가 충돌 방지** 등의 복잡성을 포착하지 못하는 문제를 해결하는 것이 목표입니다. 이를 위해 **계층적 벤치마크 BiManiBench** 를 도입하여 멀티모달 대규모 언어 모델(MLLMs)의 양팔 협업 능력을 체계적으로 평가하고자 합니다.

## 핵심 방법론
**BiManiBench** 는 세 가지 계층으로 구성됩니다: (1) **Dual-Arm Spatial Reasoning** 은 작업 공간 인식 및 정확한 팔 할당을 평가합니다. (2) **High-Level Action Planning** 은 독립 병렬, 순차 협업과 같은 다양한 조정 모드 하에서의 장기 계획 능력을 측정합니다. (3) **Low-Level End-Effector Control** 은 16-DoF의 정밀하고 연속적인 양팔 제어 및 동기화 능력을 테스트합니다. 또한, 효율적인 실행과 폐쇄 루프 견고성을 위해 **액션 청킹** 및 **Task-Adaptive Execution Truncation 메커니즘** 을 갖춘 **비전 기반 에이전트 프레임워크** 를 설계했습니다.

## 주요 결과
**30개 이상의 최신 MLLMs** 평가 결과, MLLMs는 고수준 추론 능력에도 불구하고 **양팔 공간 접지(spatial grounding)** 와 **제어** 에 어려움을 겪으며 상호 간섭 및 순서 오류를 자주 발생시키는 것으로 나타났습니다. 특히 **폐쇄형 모델(예: Gemini-2.5-Pro)** 이 개방형 모델보다 우수했으나, **GPT-5** 는 저수준 제어에서 **66.80%** , **Gemini-2.5-Pro** 는 고수준 계획에서 **70.21%** 의 평균 성공률을 기록하여 여전히 정밀 제어에 한계가 있음을 보여주었습니다. 또한, 소규모 모델에서는 추가적인 멀티뷰 입력이 오히려 성능 저하를 일으키는 **정보 과부하** 현상이 관찰되었습니다.

## AI 실무자를 위한 시사점
현재 **MLLMs는 전략적 고수준 계획에는 잠재력** 을 보이지만, **정밀한 공간 추론과 실시간 양팔 동기화 제어** 에는 심각한 한계가 있음을 보여줍니다. 따라서 AI 실무자들은 **양팔 간의 운동학적 제약 조건, 충돌 회피, 미세한 시간적 순서 지정** 에 대한 깊은 이해를 모델에 통합하는 연구에 집중해야 합니다. 또한, **고수준 계획과 저수준 반응형 제어** 를 결합하는 **하이브리드 아키텍처** 를 탐색하고, **멀티뷰 데이터 처리 시 모델 용량** 을 고려하여 최적의 시각 정보 융합 전략을 수립해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.