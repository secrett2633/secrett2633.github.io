---
title: "[논문리뷰] Towards Bridging the Gap between Large-Scale Pretraining and Efficient Finetuning for Humanoid Control"
excerpt: "Yao Su이 arXiv에 게시한 'Towards Bridging the Gap between Large-Scale Pretraining and Efficient Finetuning for Humanoid Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Humanoid Control
  - Reinforcement Learning
  - SAC
  - Model-Based RL
  - Pretraining
  - Finetuning
  - Physics-Informed World Model
  - Sim-to-Real Transfer

permalink: /ai/review/2026-02-10-Towards-Bridging-the-Gap-between-Large-Scale-Pretraining-and-Efficient-Finetuning-for-Humanoid-Control/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21363)

**저자:** Weidong Huang, Zhehan Li, Hangxin Liu, Biao Hou, Yao Su, Jingwen Zhang



## 핵심 연구 목표
대규모 사전 훈련(large-scale pretraining)과 효율적인 미세 조정(efficient finetuning) 사이의 간극을 줄여 휴머노이드 로봇 제어의 **샘플 효율성과 안전성을 향상** 시키는 것을 목표로 합니다. 특히, 온-정책(on-policy) RL의 낮은 샘플 효율성과 오프-정책(off-policy) RL의 불안정한 탐색 문제를 해결하고자 합니다.

## 핵심 방법론
본 논문은 세 단계의 **LIFT (Large-scale pretraIning and efficient FineTuning) 프레임워크** 를 제안합니다. 첫째, **JAX 기반의 Soft Actor-Critic (SAC)** 을 사용하여 대규모 병렬 시뮬레이션 환경에서 **대규모 배치 업데이트** 와 **높은 UTD (Update-To-Data) 비율** 로 정책을 사전 훈련합니다. 둘째, **SAC 사전 훈련 데이터** 를 활용하여 **Lagrangian dynamics** 와 **residual predictor** 를 결합한 **물리 기반(physics-informed) 월드 모델** 을 오프라인으로 훈련합니다. 셋째, 미세 조정 단계에서는 환경에서 **확정적(deterministic) 정책** 을 실행하여 데이터를 수집하고, **확률적 탐색(stochastic exploration)** 은 **월드 모델 내부** 로 제한하여 안전하고 효율적인 학습을 가능하게 합니다.

## 주요 결과
**LIFT** 는 **단일 NVIDIA RTX 4090 GPU** 에서 **1시간 이내** 로 휴머노이드 보행 정책을 강건하게 사전 훈련하고 실제 로봇에 **제로샷 배포** 할 수 있었습니다. 미세 조정 시, **LIFT** 는 기존 **PPO** 및 **FastTD3** 등 다른 기준선들이 불안정성을 보이거나 수렴에 실패한 반면, **in-distribution, long-tail, out-of-distribution** 등 다양한 속도 목표에서 안정적으로 수렴했습니다. 실제 로봇 실험에서는 **80-590초** 의 실제 데이터 수집만으로 초기 불안정한 정책을 개선했습니다.

## AI 실무자를 위한 시사점
**LIFT 프레임워크** 는 대규모 시뮬레이션의 효율성과 모델 기반 학습의 샘플 효율성을 결합하여 복잡한 휴머노이드 로봇 제어 문제를 해결하는 실용적인 접근 방식을 제공합니다. 특히, **실세계 탐색을 월드 모델 내부로 제한** 함으로써 로봇의 안전성을 높이고, **데이터 수집 비용을 절감** 할 수 있어 실제 로봇 배포 및 적응에 큰 이점이 있습니다. 이는 **대규모 사전 훈련된 모델** 을 실제 환경에 빠르고 안전하게 적용하려는 AI/ML 엔지니어들에게 중요한 기준점을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.