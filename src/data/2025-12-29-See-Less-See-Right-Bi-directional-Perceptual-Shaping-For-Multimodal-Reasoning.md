---
title: "[논문리뷰] See Less, See Right: Bi-directional Perceptual Shaping For Multimodal Reasoning"
excerpt: "arXiv에 게시된 'See Less, See Right: Bi-directional Perceptual Shaping For Multimodal Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Vision-Language Models (VLMs)
  - Perceptual Shaping
  - KL-Divergence
  - Chart Understanding
  - Data Augmentation
  - Reinforcement Learning (RL)
  - GRPO

permalink: /ai/review/2025-12-29-See-Less-See-Right-Bi-directional-Perceptual-Shaping-For-Multimodal-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22120)

**저자:** Shuoshuo Zhang, Yizhen Zhang, Jingjing Fu, Lei Song, Jiang Bian, Yujiu Yang, Rui Wang



## 핵심 연구 목표
본 논문은 대규모 시각-언어 모델(VLM)이 **미세한 시각적 증거(fine-grained visual evidence)** 를 놓치고, 도메인 간 일반화 능력이 떨어지며, 추론 시 높은 비용을 유발하는 문제를 해결하는 것을 목표로 합니다. 특히, 외부 도구나 잠재적 토큰을 통해 중간 시각적 단서를 주입하는 기존 방식의 한계를 극복하고, 추론 시간 오버헤드 없이 VLM의 인지 능력을 향상시키고자 합니다.

## 핵심 방법론
제안하는 **Bi-directional Perceptual Shaping (BiPS)** 은 **Group Relative Policy Optimization (GRPO)** 프레임워크 내에서 작동하는 2단계 훈련 커리큘럼입니다. 1단계( **Consistency Stage** )에서는 원본 이미지와 **증거-보존 뷰(evidence-preserving view, I_pres)** 간의 **KL-일관성 제약(KL-consistency constraint)** 을 적용하여 질문과 관련된 영역에 대한 포괄적인 인지를 유도합니다. 2단계( **Separation Stage** )에서는 원본 이미지와 **증거-제거 뷰(evidence-ablated view, I_abl)** 간의 **KL-분리 제약(KL-separation constraint)** 을 적용하여 텍스트 기반의 지름길 추론을 막고 미세한 시각적 의존성을 강화합니다. 이러한 I_pres 및 I_abl 뷰는 차트 소스 코드를 통해 프로그램적으로 생성됩니다.

## 주요 결과
**BiPS** 는 **Qwen2.5-VL-7B** 모델의 성능을 8개 벤치마크(CharXiv, MathVista, MMStar 등)에서 **평균 8.2% 향상** 시켰습니다. 특히, **BiPS-Chart-7B** 모델은 13K 개의 차트 샘플만으로 훈련되었음에도 불구하고, 베이스라인인 Qwen2.5-VL-7B 대비 **평균 7.3% 포인트(44.3%에서 51.6%)** 의 성능 향상을 보이며 뛰어난 도메인 외 일반화 능력을 입증했습니다. 추가적으로 39K 개의 수학 관련 샘플을 포함한 **BiPS-General-7B** 는 총 **8.2% 포인트(52.5%)** 의 평균 향상을 달성했습니다.

## AI 실무자를 위한 시사점
**BiPS** 는 **미세한 시각적 증거** 에 대한 VLM의 이해를 효과적으로 개선하는 데이터 효율적인 훈련 패러다임을 제공합니다. 이 방법론은 추론 시 추가적인 연산 비용 없이 모델의 인지 능력을 강화하여, 특히 **차트 이해** 와 같이 정밀한 시각적 해석이 요구되는 분야에서 **강력한 도메인 외 일반화 성능** 을 보입니다. AI 실무자들은 **BiPS** 를 활용하여 복잡한 시각 추론 태스크를 위한 보다 신뢰성 높고 정확한 VLM을 구축할 수 있으며, 이는 대규모 수동 주석 데이터셋의 필요성을 줄이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.