---
title: "[논문리뷰] NURBGen: High-Fidelity Text-to-CAD Generation through LLM-Driven NURBS   Modeling"
excerpt: "이 [arXiv]에 게시한 'NURBGen: High-Fidelity Text-to-CAD Generation through LLM-Driven NURBS   Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-CAD
  - NURBS Modeling
  - Large Language Models
  - Geometric Deep Learning
  - Boundary Representation
  - Hybrid Representation
  - CAD Generation

permalink: /ai/review/2025-11-11-NURBGen-High-Fidelity-Text-to-CAD-Generation-through-LLM-Driven-NURBS-Modeling/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06194)

**저자:** Muhammad Usama, Mohammad Sadil Khan, Didier Stricker, Muhammad Zeshan Afzal



## 핵심 연구 목표
본 논문은 자연어 텍스트 설명으로부터 **NURBS(Non-Uniform Rational B-Splines)** 기반의 고정밀 3D CAD 모델을 직접 생성하는 최초의 프레임워크인 **NURBGen** 을 제시합니다. 기존 텍스트-CAD 시스템이 메쉬를 생성하거나 부족한 디자인 히스토리 데이터에 의존하는 한계를 극복하고, 파라메트릭 CAD 모델의 편집 가능성을 높이는 것을 목표로 합니다.

## 핵심 방법론
자유 형식 텍스트를 **NURBS 표면 파라미터(제어점, knot 벡터, 차수, 가중치)** 를 포함하는 **JSON 표현** 으로 변환하기 위해 **Qwen3-4B** 대규모 언어 모델(LLM)을 미세 조정합니다. 또한, 잘림(trimmed) 표면과 퇴화(degenerate) 영역을 견고하게 처리하고 토큰 복잡성을 줄이기 위해 **트리밍되지 않은 NURBS** 와 **분석적 기본 도형(analytic primitives)** 을 결합한 하이브리드 표현 방식을 제안합니다. 이를 위해 **ABC 데이터셋** 에서 300k개 이상의 CAD 부품으로 구성된 **partABC 데이터셋** 을 구축하고 자동 주석 파이프라인으로 고품질 캡션을 생성합니다.

## 주요 결과
**NURBGen** 은 기존 텍스트-CAD 방법론 대비 기하학적 충실도와 치수 정확도에서 뛰어난 성능을 보여줍니다. 인간 평가에서 **60.8%의 Top-1 선호도** 를 달성했으며, **GPT-4o 평가** 에서도 **63.7%의 선호도** 를 기록했습니다. 특히, 무효화 비율(Invalidity Ratio)은 **0.01** 로, **DeepCAD의 0.3** 과 비교하여 가장 낮은 오류율을 기록하며 강력한 기하학적 정확도를 입증했습니다.

## AI 실무자를 위한 시사점
**NURBGen** 은 LLM을 활용하여 고품질의 편집 가능한 CAD 모델을 직접 생성하는 새로운 가능성을 제시합니다. 특히, **NURBS 기반 모델링** 과 **하이브리드 표현** 은 전통적인 디자인 히스토리 기반 방식의 제약을 우회하며, **partABC** 와 같은 대규모 멀티모달 데이터셋은 향후 텍스트-CAD 연구를 위한 중요한 자원이 될 것입니다. 그러나 복잡한 건축 구조나 텍스트 각인과 같은 세밀한 디테일 처리에는 여전히 한계가 존재하여 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.