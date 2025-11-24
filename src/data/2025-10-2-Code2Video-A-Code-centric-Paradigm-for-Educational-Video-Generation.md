---
title: "[논문리뷰] Code2Video: A Code-centric Paradigm for Educational Video Generation"
excerpt: "이 [arXiv]에 게시한 'Code2Video: A Code-centric Paradigm for Educational Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Educational Video Generation
  - Code-centric AI
  - Multi-agent Framework
  - Manim
  - Vision-Language Models
  - Knowledge Transfer
  - Code Generation
  - MMMC Benchmark

permalink: /ai/review/2025-10-2-Code2Video-A-Code-centric-Paradigm-for-Educational-Video-Generation/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01174)

**저자:** Yanzhe Chen, Kevin Qinghong Lin, Mike Zheng Shou



## 핵심 연구 목표
최근 픽셀 기반 생성 모델들은 전문적인 교육용 비디오 제작에 어려움을 겪습니다. 특히 학문적 지식, 정밀한 시각 구조, 일관된 전환이 필요한데, Code2Video는 이러한 한계를 극복하기 위해 **실행 가능한 Python 코드**를 활용한 코드 중심의 에이전트 프레임워크를 제안합니다. 궁극적으로 시공간적 계획, 공간 구성, 교육적 평가를 통합하여 확장 가능하고 해석 가능하며 제어 가능한 고품질 교육 비디오를 생성하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Planner, Coder, Critic**의 세 가지 협력 에이전트로 구성된 프레임워크를 제시합니다. **Planner**는 강의 내용을 시간적으로 일관된 흐름으로 구성하고 시각적 자산을 준비하며, **Coder**는 구조화된 지시를 실행 가능한 **Manim 코드**로 변환하고 **scope-guided auto-fix**를 통해 효율적인 코드 생성을 보장합니다. 마지막으로 **Critic**은 **Vision-Language Models (VLM)**과 **visual anchor prompts**를 활용하여 렌더링된 비디오의 공간 레이아웃을 세밀하게 조정하고 명확성을 확보합니다.

## 주요 결과
Code2Video는 **MMMC 벤치마크**에서 직접적인 코드 생성 방식 대비 **TeachQuiz 점수에서 40% 향상**을 달성했습니다. 특히, **Claude Opus 4.1** 백본 사용 시 **Aesthetics 점수 50%** 및 **TeachQuiz 점수 46%**가 개선되었음을 보고합니다. 인간 연구에서도 Code2Video가 생성한 비디오는 **인간이 제작한 튜토리얼과 유사한 TeachQuiz 점수(80.3%)**를 기록하며 높은 교육적 효과를 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 교육용 비디오 생성에서 **코드 중심의 패러다임**이 픽셀 기반 모델의 한계를 극복하고 **높은 제어 가능성**과 **해석 가능성**을 제공함을 보여줍니다. **멀티 에이전트 시스템**과 **VLM 기반의 피드백 루프**를 통해 복잡한 시각적 콘텐츠의 자동화된 생성을 가능하게 하여, AI/ML 엔지니어들이 고품질 교육 자료를 효율적으로 개발하고 맞춤형 학습 경험을 제공하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.