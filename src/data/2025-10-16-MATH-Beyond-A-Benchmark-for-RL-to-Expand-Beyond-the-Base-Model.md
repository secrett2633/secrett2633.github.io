---
title: "[논문리뷰] MATH-Beyond: A Benchmark for RL to Expand Beyond the Base Model"
excerpt: "Wieland Brendel이 [arXiv]에 게시한 'MATH-Beyond: A Benchmark for RL to Expand Beyond the Base Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Mathematical Reasoning
  - Benchmark
  - Large Language Models (LLMs)
  - Exploration
  - Boundary Expansion
  - MATH-Beyond

permalink: /ai/review/2025-10-16-MATH-Beyond-A-Benchmark-for-RL-to-Expand-Beyond-the-Base-Model/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11653)

**저자:** Prasanna Mayilvahanan, Ricardo Dominguez-Olmedo, Thaddäus Wiedemer, Wieland Brendel



## 핵심 연구 목표
기존 RL 기반 LLM들이 수학적 추론 능력을 *확장*하기보다 기존 지식을 *정교화*하는 데 그치는 한계를 극복하고, 실제 **모델의 추론 능력 경계를 확장**시키는 새로운 RL 방법론 개발을 촉진하기 위한 벤치마크 **MATH-Beyond (MATH-B)**를 제시하는 것을 목표로 합니다. 현재 벤치마크들이 이미 **pass@1024**에서 높은 포화 상태를 보여, 진정한 탐색 기반 진전을 측정하기 어렵다는 문제의식에서 출발합니다.

## 핵심 방법론
**MATH-Beyond**는 **DAPO-Math-17K** 및 **DeepScaleR** 데이터셋에서 시작하여, 엄격한 **품질 필터링**과 **표준 벤치마크 중복 제거**를 거쳤습니다. 특히, **pass@1024 필터링**을 통해 다양한 오픈소스 기반 모델(예: **Qwen3, Qwen2.5 (-Math), DeepSeek-R1-Distill**)이 1024회 시도에도 문제를 해결하지 못하는 **"제로-베이스라인"** 문제를 선별하여 구성했습니다. 이 벤치마크는 RLVR 검증 과정에서 발견된 여러 실패 모드를 고려하여 설계되었으며, **GPT-5-Mini** 및 **o4-mini-high**와 같은 최첨단 모델을 통해 정답 검증이 이루어졌습니다.

## 주요 결과
**MATH-Beyond**는 기존 오픈소스 모델들이 **pass@1024**에서 거의 0%의 성공률을 보이는 등 매우 높은 난이도를 보였습니다. **Nemotron-Research-Reasoning-Qwen-1.5B** 및 **DeepScaleR-1.5B-Preview**와 같은 현행 RL 미세 조정 모델들은 **MATH-B**에서 낮은 확장률(10% 미만)을 기록하며 기존 접근 방식의 한계를 드러냈습니다. 반면, **Qwen3-4B** 및 **Qwen3-8B** (Long CoT Distillation으로 훈련)는 각각 **58.93%** 및 **66.38%**의 높은 확장률을 달성하여, 올바른 추론 단계 분포와의 **분포적 중첩**이 성능 확장에 중요함을 시사했습니다.

## AI 실무자를 위한 시사점
이 연구는 AI/ML 엔지니어들에게 현행 RL 방법론이 모델의 추론 능력을 *확장*하는 데 한계가 있으며, **새로운 탐색 기반 RL 접근법**이 필요하다는 중요한 시사점을 제공합니다. **MATH-Beyond** 벤치마크는 모델이 기존 지식을 넘어 새로운 추론 경로를 발견했는지 진정으로 측정할 수 있는 **진단 도구**로 활용될 수 있습니다. 특히, 대규모 데이터셋과 **Long CoT Distillation**이 모델의 추론 경계를 확장하는 데 효과적일 수 있음을 보여주어, AI 모델 훈련 전략에 대한 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.