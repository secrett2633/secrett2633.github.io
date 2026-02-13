---
title: "[논문리뷰] DeepSight: An All-in-One LM Safety Toolkit"
excerpt: "이 [arXiv]에 게시한 'DeepSight: An All-in-One LM Safety Toolkit' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LM Safety
  - Evaluation
  - Diagnosis
  - Multimodal AI
  - Frontier AI Risks
  - Black-box Analysis
  - White-box Insight
  - Open-source Toolkit

permalink: /ai/review/2026-02-13-DeepSight-An-All-in-One-LM-Safety-Toolkit/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12092)

**저자:** Bo Zhang, Jiaxuan Guo, Lijun Li, Dongrui Liu, Sujin Chen, Guanxu Chen, Zhijie Zheng, Qihao Lin, Lewen Yan, Chen Qian, Yijin Zhou, Yuyao Wu, Shaoxiong Guo, Tianyi Du, Jingyi Yang, Xuhao Hu, Ziqi Miao, Xiaoya Lu, Jing Shao, Xia Hu



## 핵심 연구 목표
본 논문은 현재 대규모 언어 모델(LM) 및 멀티모달 대규모 언어 모델(MLLM)의 안전성 평가, 진단, 정렬 워크플로우가 파편화되어 외부 행동 위험만 파악하고 내부 원인을 규명하지 못하는 문제를 해결하고자 합니다. 연구는 안전성 평가와 진단을 통합하는 새로운 패러다임인 **DeepSight** 를 제안하여, 비용 효율적이고 재현 가능하며 확장 가능한 "올인원" LM 안전성 툴킷을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**DeepSight** 는 평가 툴킷인 **DeepSafe** 와 진단 툴킷인 **DeepScan** 의 두 가지 핵심 엔진으로 구성됩니다. **DeepSafe** 는 20개 이상의 안전성 벤치마크와 프론티어 AI 위험 평가를 통합한 모듈형, **설정-구동(configuration-driven)** 프레임워크이며, **ProGuard** 와 같은 전문 안전성 평가 모델을 활용합니다. **DeepScan** 은 **X-Boundary** , **TELLME** , **SPIN** , **MI-Peaks** 와 같은 LLM 진단 도구를 갖춘 표준화된 확장 가능한 프레임워크로, 모델 가중치를 수정하지 않고 내부 표현 구조와 객관적 수준의 충돌을 탐색합니다.

## 주요 결과
평가 결과, LLM의 평균 안전성 비율은 **Qwen3-30B-A3B-Thinking** 이 **0.79** 로 가장 높았으며, MLLM에서는 **Qwen3-VL-235B-A22B-Instruct** 가 **0.71** 을 기록했습니다. 멀티모달 시나리오에서 추론 모델은 비추론 모델(평균 안전성 비율 **0.5633** vs. **0.5383** )을 능가하며 안전성 이점을 보였습니다. 특히, **DeepScan X-Boundary** 분석을 통해 과도한 표현 분리(예: **Gemma-3-27B-IT** 의 분리 점수 **2998.57** )는 미세한 안전성 판단 능력을 저해할 수 있음이 밝혀졌습니다.

## AI 실무자를 위한 시사점
**DeepSight** 는 AI/ML 엔지니어들이 모델의 외부적인 안전성 문제뿐만 아니라, 그 근본적인 내부 원인을 진단하고 이해할 수 있도록 지원하는 최초의 오픈소스 통합 툴킷입니다. 이는 프론티어 AI 위험 평가 및 진단 기능을 제공하여, 개발자들이 블랙박스 테스트를 넘어 화이트박스 통찰력을 기반으로 AI 시스템의 안전성을 설계하고 개선할 수 있게 합니다. 또한, 멀티모달 환경에서의 복잡한 안전성 문제와 추론 능력의 한계를 이해하는 데 중요한 실용적 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.