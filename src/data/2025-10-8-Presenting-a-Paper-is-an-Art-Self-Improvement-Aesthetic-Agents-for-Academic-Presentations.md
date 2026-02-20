---
title: "[논문리뷰] Presenting a Paper is an Art: Self-Improvement Aesthetic Agents for
  Academic Presentations"
excerpt: "arXiv에 게시된 'Presenting a Paper is an Art: Self-Improvement Aesthetic Agents for
  Academic Presentations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Improvement Agent
  - Academic Presentation
  - Aesthetic Evaluation
  - Reinforcement Learning
  - Multi-task Learning
  - Presentation Generation
  - LLM-based Agents
  - Human Feedback

permalink: /ai/review/2025-10-8-Presenting-a-Paper-is-an-Art-Self-Improvement-Aesthetic-Agents-for-Academic-Presentations/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05571)

**저자:** Chengzhi Liu, Yuzhe Yang, Kaiwen Zhou, Zhen Zhang, Yue Fan, Yanan Xie, Peng Qi, Xin Eric Wang



## 핵심 연구 목표
이 논문은 기존 자동화된 학술 발표 자료 생성 방법론이 가진 제한된 스토리텔링, 낮은 미적 품질, 그리고 자체 조정 능력 부족 문제를 해결하고자 합니다. 특히, 신뢰할 수 있는 피드백 메커니즘의 부재로 인한 개선의 어려움을 극복하기 위해, **서사적 일관성** 과 **미적 인식** 을 모두 갖춘 고품질 학술 발표 자료를 생성하는 **자기 개선 에이전트 프레임워크 EvoPresent** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**EvoPresent** 는 스토리라인 에이전트, 스칼라 에이전트, 디자인 에이전트, 체커 에이전트로 구성된 **드래프트-피드백-개선** 반복 루프를 따르는 자기 개선 에이전트 프레임워크입니다. 핵심적으로 **PresAesth** 라는 **멀티태스크 강화 학습(RL) 기반 미적 모델** 을 통합하여, 슬라이드의 미적 점수 측정, 결함 조정, 비교 피드백의 세 가지 핵심 작업을 수행합니다. **Group Relative Policy Optimization (GRPO)** 와 **Qwen-2.5-VL-7B** 를 활용하여 제한된 데이터로도 안정적인 미적 인식을 학습하며, **EvoPresent Benchmark** 를 통해 콘텐츠 및 디자인 품질을 체계적으로 평가합니다.

## 주요 결과
**EvoPresent** 는 기존 방법론 대비 콘텐츠 및 시각적 디자인 모두에서 뛰어난 성능을 보였습니다. 특히 **EvoPresent-claude-4** 는 **ROUGE-L 16.78** 및 **글로벌 미적 점수 8.05** 를 달성하여 다른 모델들을 능가했습니다. **PresAesth** 는 미적 인식 작업에서 지속적으로 우수한 성능을 나타내며, 채점 작업에서 **평균 절대 오차(MAE) 1.33** , 결함 조정에서 **F1-점수 0.389** , 비교 작업에서 **정확도(Accuracy) 87.8%** 를 기록했습니다. 또한, 고품질 피드백이 에이전트의 자기 개선 속도를 크게 향상시키는 것으로 입증되었습니다.

## AI 실무자를 위한 시사점
**EvoPresent** 는 AI가 고품질 콘텐츠를 생성하는 데 있어 **반복적인 드래프트-피드백-개선** 프로세스의 중요성을 강조합니다. **강화 학습 기반의 미적 평가 모델(PresAesth)** 은 주관적인 시각 디자인 작업을 자동화하고 AI가 인간의 선호도에 더 잘 부합하는 결과물을 생성할 수 있음을 보여줍니다. 또한, **EvoPresent Benchmark** 는 멀티모달 콘텐츠 생성 및 미적 AI를 위한 표준화된 평가 및 훈련 자원을 제공하여 관련 연구 발전에 기여합니다. 이는 자동화된 생성 작업에서 시각 디자인과 콘텐츠 구성 사이의 **내재적인 트레이드오프** 와 **미적 인식이 주요 병목 현상** 임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.