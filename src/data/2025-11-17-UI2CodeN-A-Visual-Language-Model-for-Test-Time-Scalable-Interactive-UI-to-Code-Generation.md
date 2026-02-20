---
title: "[논문리뷰] UI2Code^N: A Visual Language Model for Test-Time Scalable Interactive UI-to-Code Generation"
excerpt: "Weihan Wang이 arXiv에 게시한 'UI2Code^N: A Visual Language Model for Test-Time Scalable Interactive UI-to-Code Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Language Model
  - UI-to-Code Generation
  - Interactive UI
  - UI Editing
  - UI Polishing
  - Reinforcement Learning
  - Multimodal Coding
  - Test-Time Scaling

permalink: /ai/review/2025-11-17-UI2CodeN-A-Visual-Language-Model-for-Test-Time-Scalable-Interactive-UI-to-Code-Generation/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08195)

**저자:** Zhen Yang¹, Wenyi Hong¹, Mingde Xu², Xinyue Fan², Weihan Wang², Jiele Cheng¹, Xiaotao Gu², Jie Tang¹†
¹Department of Computer Science and Technology, Tsinghua University
²Zhipu AI



## 핵심 연구 목표
본 논문은 UI(사용자 인터페이스) 코딩에서 기존 **시각 언어 모델(VLM)** 의 제한적인 멀티모달 코딩 능력과 단일 턴 생성 패러다임의 한계를 극복하고자 합니다. 실제 UI 개발 워크플로우를 반영하고 반복적인 시각적 피드백을 활용하는 **대화형 UI-to-Code 패러다임** 을 제안하며, **UI2CodeN** 모델을 통해 UI-to-Code 생성, UI 편집, UI 개선의 세 가지 핵심 기능을 통합하여 성능 향상을 목표로 합니다.

## 핵심 방법론
본 연구는 **대화형 UI-to-Code 패러다임** 을 핵심으로 하며, 이는 UI-to-Code 생성, UI 편집, UI 개선으로 구성되어 시각적 피드백을 통한 반복적인 개선을 지원합니다. 모델인 **UI2CodeN** 은 세 단계의 훈련 파이프라인을 거칩니다: 먼저, **대규모 실제 웹페이지 데이터** 로 사전 훈련하여 멀티모달 기반을 구축합니다. 다음으로, **정제된 합성 데이터셋** 으로 **지도 미세 조정(SFT)** 을 수행하여 코드 품질과 기능을 향상합니다. 마지막으로, **강화 학습(RL)** 단계에서 **GRPO** 를 활용하고 **GLM-4.5V** 를 검증자로 사용한 **삼중항 기반의 보상 설계** 를 통해 실제 웹페이지 분포에 모델을 적응시킵니다.

## 주요 결과
**UI2CodeN** 은 UI-to-Code 및 UI 개선 벤치마크에서 오픈 소스 모델 중 **최고 성능** 을 달성했으며, **Claude-4-Sonnet** 및 **GPT-5** 와 같은 선도적인 클로즈드 소스 모델과 필적하는 성능을 보였습니다. UI-to-Code 벤치마크( **Design2Code** , **Flame-React-Eval** , **Web2Code** , **UI2Code-Real** )에서 **UI2CodeN-9B-RL** 은 Design2Code에서 **88.6** , Flame에서 **95.0** 등의 높은 점수를 기록했습니다. 특히 UI 개선 태스크에서는 UIPolish-Real에서 **80.0%** , UIPolish-Synthetic에서 **94.0%** 의 정확도를 달성했으며, **테스트-타임 스케일링** 을 통해 상호작용 횟수(N)가 증가함에 따라 UI2Code-Real에서 **최대 12%의 성능 향상** (N=1에서 N=5로 증가 시 66.0%에서 74.0%)을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 UI 개발 프로세스에 **AI 보조 도구** 를 통합하는 실용적인 방법을 제시합니다. **대규모 데이터 사전 훈련, 정밀한 지도 미세 조정, 실제 환경에 강건한 강화 학습** 으로 구성된 훈련 프레임워크는 복잡한 UI-to-Code 문제 해결에 대한 효과적인 청사진을 제공합니다. 특히, **테스트-타임 스케일링** 을 통해 여러 차례의 대화형 피드백 루프를 거쳐 코드 품질을 지속적으로 개선할 수 있는 능력은 개발자의 생산성 향상에 크게 기여할 수 있는 유연하고 강력한 AI 시스템의 잠재력을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.