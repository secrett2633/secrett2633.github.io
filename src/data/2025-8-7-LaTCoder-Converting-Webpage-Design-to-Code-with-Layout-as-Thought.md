---
title: "[논문리뷰] LaTCoder: Converting Webpage Design to Code with Layout-as-Thought"
excerpt: "Tianpeng Lv이 [arXiv]에 게시한 'LaTCoder: Converting Webpage Design to Code with Layout-as-Thought' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Design-to-Code
  - Webpage Generation
  - Multimodal Large Language Models (MLLMs)
  - Layout Preservation
  - Chain-of-Thought (CoT)
  - UI Automation
  - Code Generation

permalink: /ai/review/2025-8-7-LaTCoder-Converting-Webpage-Design-to-Code-with-Layout-as-Thought/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03560)

**저자:** Yi Gui, Zhen Li, Zhongyi Zhang, Guohao Wang, Tianpeng Lv, Gaoyang Jiang, Yi Liu, Dongping Chen, Yao Wan, Hongyu Zhang, Wenbin Jiang, Xuanhua Shi, Hai Jin



## 핵심 연구 목표
본 연구는 멀티모달 대규모 언어 모델(MLLM)이 웹페이지 디자인을 코드로 변환하는 과정에서 **레이아웃을 정확하게 유지하지 못하는 문제**를 해결하고자 합니다. 특히 복잡한 레이아웃을 가진 실제 웹페이지 디자인의 경우 MLLM의 한계로 인해 레이아웃 정보가 손실되는 문제를 개선하는 것이 주된 목표입니다.

## 핵심 방법론
본 논문은 인간의 사고 과정에서 영감을 받은 **Layout-as-Thought (LAT)**이라는 새로운 접근 방식을 제안합니다. 이는 웹페이지 디자인을 **레이아웃 인지 분할 (Layout-Aware Division)** 알고리즘을 통해 여러 **이미지 블록**으로 나누고, 각 블록에 대해 **CoT 기반 프롬프트**를 사용하여 **블록별 코드 합성 (Block-Wise Code Synthesis)**을 수행합니다. 최종적으로 **절대 위치 지정 방식 (Absolute Positioning Assembly)**과 **MLLM 기반 조립 (MLLM-Based Assembly)**을 동적으로 선택하여 코드를 재조립함으로써 레이아웃 보존을 강화합니다.

## 주요 결과
**LATCODER**는 **DeepSeek-VL2**, **Gemini**, **GPT-4o** 등 다양한 MLLM 백본을 활용하여 **Design2Code-HARD** 및 새롭게 도입된 **CC-HARD** 벤치마크에서 평가되었습니다. **DeepSeek-VL2** 사용 시 **TreeBLEU 스코어 66.67% 증가** 및 **MAE 38% 감소**를 달성하여 직접 프롬프트 방식 대비 크게 개선되었습니다. 또한, 인간 선호도 평가에서 **60% 이상**의 경우에서 **LATCODER**가 생성한 웹페이지를 선호하는 것으로 나타나 방법론의 효과성을 입증했습니다.

## AI 실무자를 위한 시사점
**LATCODER**는 **MLLM 기반의 디자인-투-코드 시스템**에서 **레이아웃 정확도**를 획기적으로 향상시킬 수 있는 실용적인 방법론을 제시합니다. 이는 복잡한 UI 디자인을 자동으로 코드화하는 데 있어 **MLLM의 기존 한계**를 극복하는 데 기여하며, 특히 **제한된 컨텍스트 길이**를 가진 모델(예: **DeepSeek-VL2**)에서도 효과적인 성능을 보여 **범용적 활용 가능성**이 높습니다. 이러한 **CoT 기반의 분할-합성-조립 전략**은 향후 다른 복잡한 생성 AI 태스크에도 응용될 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.