---
title: "[논문리뷰] SCAN: Self-Denoising Monte Carlo Annotation for Robust Process Reward
  Learning"
excerpt: "Zhaopeng Tu이 [arXiv]에 게시한 'SCAN: Self-Denoising Monte Carlo Annotation for Robust Process Reward
  Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Process Reward Models
  - Monte Carlo Annotation
  - Noise Denoising
  - Robust Learning
  - Self-Supervision
  - Mathematical Reasoning
  - Large Language Models

permalink: /ai/review/2025-9-23-SCAN-Self-Denoising-Monte-Carlo-Annotation-for-Robust-Process-Reward-Learning/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16548)

**저자:** Yuyang Ding, Xinyu Shi, Juntao Li, Xiaobo Liang, Zhaopeng Tu, Min Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)의 추론 과정을 평가하는 **Process Reward Models (PRMs)** 개발의 핵심 난제인 **높은 비용의 사람 주석 데이터** 와 **Monte Carlo (MC) 추정 데이터의 높은 노이즈** 문제를 해결하고자 합니다. 외부의 강력한 감독 없이 **MC 추정 자체의 노이즈 제거 잠재력** 과 **PRM의 강건한 학습** 방법을 탐구하여, 비용 효율적이고 확장 가능한 PRM 학습 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Self-Denoising Monte Carlo Annotation (SCAN)** 프레임워크를 제안합니다. 이는 MC 추정 노이즈 분포 분석을 통해 어노테이션 모델의 과소/과대 추정 경향을 파악한 데 기반하며, **self-confidence metric** `SCo(q)`를 도입하여 어노테이션 신뢰도를 측정합니다. 이 신뢰도를 바탕으로 **효율적인 데이터 합성 모듈** 은 정보성 샘플에만 MC 어노테이션을 선택적으로 적용하여 기존 MC 추정 대비 **6%의 추론 비용** 만으로 데이터를 생성합니다. 또한, 노이즈에 강건한 학습을 위해 **노이즈 내성 라벨링 전략** (오류 이전 단계에 **tolerance distance d=2** 의 소프트 라벨 적용)과 **신뢰도 기반 재가중치** `min(ci/SCπ(q), 1)`를 통해 모델 편향을 완화합니다.

## 주요 결과
**SCAN-Base** (101K 합성 샘플, 1.5B 모델 생성)는 **Best-of-8에서 평균 정확도 69.1%** , **ProcessBench에서 F1 점수 56.8%** 를 달성하여 더 큰 합성 데이터셋으로 훈련된 PRM들을 능가했습니다. **SCAN-Pro** (197K 합성 샘플, 7B 모델 통합)는 **평균 정확도 70.1%** , **F1 점수 59.1%** 로 성능을 더욱 향상시켜, **인간 주석 PRM800K 데이터셋 (평균 정확도 69.3%, F1 점수 56.5%)** 의 성능을 뛰어넘었습니다. 또한, 제안된 방법은 합성 데이터의 노이즈 비율을 크게 줄여, **Llama-3.1-8B-Ins** 의 경우 **56.2%에서 19.1% (37.1%↓)** , **Qwen2.5-Math-7B-Ins** 의 경우 **51.8%에서 29.4% (22.4%↓)** 로 개선했습니다.

## AI 실무자를 위한 시사점
본 연구는 경량 모델로도 **자체 denoising 전략** 을 통해 고품질 PRM 훈련 데이터를 효율적으로 생성할 수 있음을 입증하며, 비용 효율적인 AI 모델 개발 가능성을 제시합니다. 제안된 **강력한 학습 전략** 은 노이즈가 많은 약한 감독 환경에서도 PRM이 효과적으로 학습하여 **ProcessBench에서 F1 점수 39.2%p 개선** 이라는 실질적인 성능 향상을 달성할 수 있음을 보여줍니다. 이는 **대규모 데이터 없이도 강력한 PRM을 구축** 할 수 있는 기반을 제공하며, LLM 기반의 복잡한 추론 태스크에서 **강건하고 확장 가능한 평가 시스템** 을 구축하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.