---
title: "[논문리뷰] MM-BrowseComp: A Comprehensive Benchmark for Multimodal Browsing Agents"
excerpt: "Jun Dong이 [arXiv]에 게시한 'MM-BrowseComp: A Comprehensive Benchmark for Multimodal Browsing Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Browsing
  - AI Agents
  - Benchmark
  - Vision-Language Models
  - Reasoning
  - Tool Use
  - Deep Search

permalink: /ai/review/2025-8-20-MM-BrowseComp-A-Comprehensive-Benchmark-for-Multimodal-Browsing-Agents/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13186)

**저자:** Jun Dong, Jiaheng Liu, Wenjie Wang, Xingyuan Bu, Shilong Li



## 핵심 연구 목표
기존 웹 브라우징 벤치마크가 주로 텍스트 정보에만 초점을 맞춰 멀티모달 콘텐츠의 중요성을 간과하는 문제를 해결하고자 합니다. 이 연구는 AI 에이전트의 **멀티모달 검색 및 추론 능력**을 평가하기 위한 새로운 벤치마크인 **MM-BrowseComp**를 제안하여, 텍스트 기반 접근 방식만으로는 성공하기 어렵게 만드는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 **224개의 도전적인 수제(hand-crafted) 질문**으로 구성된 **MM-BrowseComp** 벤치마크를 도입합니다. 핵심 설계 원칙은 필수 정보가 이미지나 비디오와 같은 **시각적 모달리티**에 주로 내재되어 있어야 한다는 **강제적 멀티모달 의존성**입니다. 에이전트의 추론 과정을 상세히 분석하기 위해 각 질문에 **불가분 추론 체크리스트**를 제공하며, 평가 지표로 **전반적 정확도(OA)**, **엄격한 정확도(SA)**, **평균 체크리스트 점수(AVG CS)**를 사용합니다.

## 주요 결과
**MM-BrowseComp**는 매우 도전적이며, **도구 사용 기능을 갖춘 OpenAI o3**만이 **29.02%의 전반적 정확도**를 달성했습니다. 다른 최신 **Vision-Language 모델(VLM)** 및 에이전트(예: **Gemini-2.5-Pro**)는 **10% 미만의 정확도**를 보였습니다. 모델들은 텍스트 처리보다 이미지/비디오 이해를 요구하는 멀티모달 체크리스트 항목에서 더 낮은 성능을 보였으며, 테스트 시간 스케일링은 **전반적 정확도**를 향상시켰지만 **엄격한 정확도**는 미미한 개선에 그쳤습니다.

## AI 실무자를 위한 시사점
현재 AI 에이전트, 특히 오픈소스 에이전트들은 **멀티모달 정보 검색 및 추론 능력**에 상당한 한계를 가지고 있음을 보여줍니다. AI 실무자들은 단순한 캡셔닝 도구를 넘어, 이미지와 텍스트를 동등한 정보원으로 처리하는 **내재적으로 통합된 멀티모달 백본** 개발에 집중해야 합니다. 이 벤치마크의 **세분화된 평가 프레임워크**와 **체크리스트**는 에이전트 훈련에서 **밀집 보상 신호**로 활용될 수 있어, 더 강력하고 견고한 멀티모달 브라우징 에이전트 개발을 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.