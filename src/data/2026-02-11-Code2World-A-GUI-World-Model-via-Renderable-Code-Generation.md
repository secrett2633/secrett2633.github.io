---
title: "[논문리뷰] Code2World: A GUI World Model via Renderable Code Generation"
excerpt: "이 [arXiv]에 게시한 'Code2World: A GUI World Model via Renderable Code Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI World Model
  - Renderable Code Generation
  - Vision-Language Model
  - Reinforcement Learning
  - HTML Synthesis
  - UI Prediction
  - GUI Agents

permalink: /ai/review/2026-02-11-Code2World-A-GUI-World-Model-via-Renderable-Code-Generation/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09856)

**저자:** Yuhao Zheng, Lian Zhong, Yi Wang, Rui Dai, Kaikui Liu, Xiangxiang Chu, Linyuan Lü, Philip Torr, Kevin Qinghong Lin



## 핵심 연구 목표
본 논문은 기존 텍스트 및 픽셀 기반 GUI 월드 모델이 가지는 시각적 충실도와 세밀한 구조적 제어 능력 부족 문제를 해결하고자 합니다. 사용자 인터페이스(UI)의 다음 상태를 **렌더링 가능한 코드 생성** 을 통해 예측하여, 높은 시각적 충실도와 정교한 구조적 제어가 가능한 **GUI 월드 모델** 을 구축하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Code2World** 는 다음 시각적 상태를 **렌더링 가능한 HTML 코드 생성** 을 통해 시뮬레이션하는 **비전-언어 코더** 입니다. 데이터 부족 문제를 해결하기 위해, GUI 궤적을 고품질 HTML로 변환하고 **시각 피드백 기반 수정 메커니즘** 을 통해 합성된 코드를 정제하여 **8만 개 이상의 고품질 AndroidCode 데이터셋** 을 구축했습니다. 모델 최적화는 초기 형식 학습을 위한 **지도 미세 조정(SFT)** 과 시각적 현실성 및 행동 일관성을 강화하는 **Render-Aware Reinforcement Learning (RARL)** 의 두 단계로 진행되며, **VLM-as-a-Judge** 프레임워크가 보상 신호로 활용됩니다.

## 주요 결과
**Code2World-8B** 는 다음 UI 예측에서 최상위 성능을 달성했으며, 경쟁 모델인 **GPT-5** 및 **Gemini-3-Pro-Image** 에 필적하는 결과를 보였습니다. 특히, 다운스트림 내비게이션 성공률을 크게 향상시켜, **AndroidWorld** 내비게이션에서 **Gemini-2.5-Flash** 의 성능을 **+9.5%** 개선했습니다. 이는 동적 로직 및 시각적 품질 측면에서 10배 이상 많은 파라미터를 가진 오픈 소스 모델들을 능가하는 수치입니다.

## AI 실무자를 위한 시사점
이 연구는 **렌더링 가능한 코드 생성** 을 통해 GUI 월드 모델을 구축하는 새로운 패러다임을 제시하며, AI 엔지니어에게 고충실도 시각 시뮬레이션과 정밀한 구조 제어 기능을 동시에 제공합니다. **AndroidCode** 와 같은 데이터 합성 파이프라인은 정형화된 UI 데이터를 구축하는 효과적인 방법을 제공하며, **Render-Aware Reinforcement Learning** 전략은 모델이 텍스트 출력과 시각적 현실을 일치시키는 데 유용하게 활용될 수 있습니다. **플러그 앤 플레이 시뮬레이터** 로서 기존 GUI 에이전트의 계획 및 의사 결정 능력을 향상시키는 데 직접적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.