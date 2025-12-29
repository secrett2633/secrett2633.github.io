---
title: "[논문리뷰] SlideTailor: Personalized Presentation Slide Generation for Scientific Papers"
excerpt: "이 [arXiv]에 게시한 'SlideTailor: Personalized Presentation Slide Generation for Scientific Papers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Personalized Slide Generation
  - Preference Learning
  - Large Language Models
  - Multimodal AI
  - Chain-of-Speech
  - Agentic Framework
  - Document-to-Slides

permalink: /ai/review/2025-12-29-SlideTailor-Personalized-Presentation-Slide-Generation-for-Scientific-Papers/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20292)

**저자:** Wenzheng Zeng, Mingyu Ouyang, Langyuan Cui, Hwee Tou Ng



## 핵심 연구 목표
이 논문은 기존 자동 슬라이드 생성 시스템이 사용자 선호도를 충분히 반영하지 못하여 만족스럽지 못한 결과물을 초래하는 문제를 해결하고자 합니다. 사용자 정의된 콘텐츠 및 시각적 선호도를 기반으로 과학 논문에서 개인화된 프레젠테이션 슬라이드를 생성하는 새로운 태스크를 제안하고, 이를 통해 슬라이드 콘텐츠와 디자인이 개별 사용자 요구에 맞춰 정렬되도록 하는 것을 목표로 합니다.

## 핵심 방법론
논문은 인간 행동에서 영감을 받은 에이전트 프레임워크인 **SlideTailor** 를 제안합니다. 이 프레임워크는 (1) 주어진 논문-슬라이드 샘플 쌍에서 콘텐츠 선호도를, 그리고 (.pptx) 슬라이드 템플릿에서 미학적 선호도를 암묵적으로 학습하는 **선호도 증류(Implicit Preference Distillation)** 단계를 포함합니다. 이후 (2) 학습된 선호도를 기반으로 내용 정리, 슬라이드 개요 및 구두 설명을 동시 생성하는 **연쇄-화법(Chain-of-Speech)** 메커니즘을 포함한 **선호도 기반 슬라이드 계획(Preference-Guided Slide Planning)** 단계를 거쳐, (3) 최종적으로 편집 가능한 슬라이드를 생성하는 **슬라이드 구현(Slide Realization)** 단계로 구성됩니다.

## 주요 결과
**SlideTailor** 는 **PSP (Paper-to-Slides with Preferences) 데이터셋** 을 구축하고, 이 데이터셋에서 기존 최첨단 모델들을 능가하는 성능을 보였습니다. 특히, **GPT-4.1** 기반의 **SlideTailor** 는 전체 **75.8%** 의 종합 점수를 달성하여, **ChatGPT** , **AutoPresent** , **PPTAgent** 와 같은 기준 모델들을 압도했습니다. 또한, **콘텐츠 선호도 증류** 및 **연쇄-화법** 메커니즘이 전체 성능 향상에 결정적인 역할을 했음이 **어블레이션 연구** 를 통해 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 AI 기반 문서 요약 및 콘텐츠 생성 분야에서 사용자 선호도를 통합하는 것의 중요성을 강조합니다. 특히, **연쇄-화법** 메커니즘은 슬라이드 콘텐츠와 구두 설명을 동시에 계획하여 일관성 있는 프레젠테이션 비디오 자동 생성과 같은 다운스트림 응용 가능성을 크게 확장합니다. **PSP 데이터셋** 은 개인화된 멀티모달 콘텐츠 생성 연구를 위한 강력한 벤치마크 역할을 하며, 향후 AI/ML 엔지니어들이 더욱 사용자 중심적인 콘텐츠 저작 도구를 개발하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.