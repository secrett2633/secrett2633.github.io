---
title: "[논문리뷰] OmegaUse: Building a General-Purpose GUI Agent for Autonomous Task Execution"
excerpt: "Yusai Zhao이 arXiv에 게시한 'OmegaUse: Building a General-Purpose GUI Agent for Autonomous Task Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agent
  - Multimodal AI
  - MoE
  - Data Synthesis
  - Reinforcement Learning
  - Cross-Platform
  - Benchmarking

permalink: /ai/review/2026-01-29-OmegaUse-Building-a-General-Purpose-GUI-Agent-for-Autonomous-Task-Execution/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20380)

**저자:** Le Zhang*, Yixiong Xiao*, Xinjiang Lu*, Jingjia Cao*, Yusai Zhao*, Jingbo Zhou*†, Lang An, Zikan Feng, Wanxiang Sha, Yu Shi, Congxi Xiao, Jian Xiong, Yankai Zhang, Hua Wu, Haifeng Wang



## 핵심 연구 목표
본 논문은 모바일 및 데스크톱 환경 모두에서 자율적인 태스크 실행을 위한 범용 GUI(Graphical User Interface) 에이전트 모델인 **OmegaUse** 를 구축하는 것을 목표로 합니다. 데이터 품질, 효과적인 훈련 방법, 그리고 다양한 디지털 생태계 전반의 포괄적인 평가 부족이라는 기존 GUI 에이전트의 주요 병목 현상을 해결하고자 합니다.

## 핵심 방법론
**OmegaUse** 는 **Mixture-of-Experts (MoE)** 백본 아키텍처를 기반으로 하여 효율성과 추론 능력을 동시에 확보합니다. 데이터 구축을 위해 정교하게 선별된 오픈 소스 데이터셋과 **자동화된 합성 프레임워크** (하향식 분류 기반 생성과 상향식 자율 탐색 결합)를 활용합니다. 훈련은 **Supervised Fine-Tuning (SFT)** 으로 상호작용 구문 및 기본 로직을 확립한 후, **Group Relative Policy Optimization (GRPO)** 으로 공간 접지 및 순차적 계획을 정교화하는 2단계 학습 패러다임을 따릅니다.

## 주요 결과
**OmegaUse** 는 GUI 벤치마크에서 뛰어난 성능을 입증했습니다. **ScreenSpot-V2** 에서 **96.3%** 의 최첨단(SOTA) 점수를 달성했으며, **AndroidControl** 에서 **79.1%** 의 선도적인 단계 성공률을 기록했습니다. 또한, 새롭게 도입된 OS-Nav 벤치마크에서 **ChiM-Nav** **74.24%** 단계 성공률, **Ubu-Nav** 평균 **55.9%** 성공률을 달성하며 크로스-터미널 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**OmegaUse** 는 **MoE 백본** 을 통해 대규모 모델의 추론 능력을 유지하면서도 계산 오버헤드를 줄이는 효율적인 에이전트 설계 방향을 제시합니다. **계층적 데이터 합성 파이프라인** 은 고품질 훈련 데이터 부족 문제를 해결하여 수동 어노테이션에 대한 의존도를 줄일 수 있습니다. 또한, **OS-Nav** 벤치마크는 중국 모바일 및 Ubuntu 데스크톱 환경과 같은 특정 디지털 환경에서 GUI 에이전트의 성능을 평가할 수 있는 중요한 자원을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.