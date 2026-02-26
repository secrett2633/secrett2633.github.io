---
title: "[논문리뷰] GUI-Libra: Training Native GUI Agents to Reason and Act with Action-aware Supervision and Partially Verifiable RL"
excerpt: "[arXiv]에 게시된 'GUI-Libra: Training Native GUI Agents to Reason and Act with Action-aware Supervision and Partially Verifiable RL' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Visual Grounding
  - Long-Horizon Tasks
  - Partial Verifiability
  - KL Regularization
  - Data Curation

permalink: /ai/review/2026-02-26-GUI-Libra-Training-Native-GUI-Agents-to-Reason-and-Act-with-Action-aware-Supervision-and-Partially-Verifiable-RL/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22190)

**저자:** Rui Yang, Qianhui Wu, Zhaoyang Wang, Hanyang Chen, Ke Yang, Hao Cheng, Huaxiu Yao, Baolin Peng, Huan Zhang, Jianfeng Gao, Tong Zhang



## 핵심 연구 목표
본 논문은 기존 오픈소스 GUI 에이전트들이 **긴 호라이즌 탐색(long-horizon navigation) 태스크** 에서 상용 시스템에 비해 뒤쳐지는 문제를 해결하고자 합니다. 특히, 고품질의 액션 정렬 추론 데이터 부족과 GUI 에이전트의 고유한 특성을 간과한 일반적인 학습 파이프라인(특히 긴 **CoT(Chain-of-Thought) SFT** 로 인한 그라운딩 정확도 저하 및 **부분적으로 검증 가능한(partially verifiable) RL** 에서의 보상 모호성)을 개선하는 것을 목표로 합니다.

## 핵심 방법론
먼저, 액션 정렬 추론 데이터 부족을 해결하기 위해 **81K 규모의 GUI 추론 데이터셋** 을 구축하는 **데이터 구성 및 필터링 파이프라인** 을 도입했습니다. 다음으로, 추론과 그라운딩 간의 균형을 위해 추론-후-액션 및 직접-액션 감독을 혼합하고 액션 및 그라운딩 토큰을 강조하는 **액션-인식 지도 미세 조정(Action-aware Supervised Fine-Tuning, ASFT)** 을 제안합니다. 마지막으로, 부분적으로 검증 가능한 RL의 안정화를 위해 **KL 정규화** 의 중요성을 강조하고, 신뢰할 수 없는 음의 기울기를 완화하기 위해 **성공-적응형 스케일링(success-adaptive scaling)** 을 도입하는 **보수적 RL(Conservative RL)** 방식을 개발했습니다.

## 주요 결과
GUI-Libra는 다양한 웹 및 모바일 벤치마크에서 일관된 성능 향상을 보였습니다. 특히, **GUI-Libra-4B** 및 **GUI-Libra-8B** 모델은 베이스 모델 대비 **AndroidWorld** 에서 **+15.6%** 및 **+12.2%** , **Online-Mind2Web** 에서 **+4.0%** 및 **+8.7%** , **WebArena-Lite-v2** 에서 **+12.5%** 및 **+11.3%** 의 성능 향상을 달성했습니다. 또한, 오프라인 지표와 온라인 성능 간의 정렬을 강화하여 예측 가능성을 높였습니다.

## AI 실무자를 위한 시사점
본 연구는 **신중하게 설계된 사후 훈련(post-training)** 및 **데이터 큐레이션** 이 비용이 많이 드는 온라인 데이터 수집 없이도 GUI 에이전트의 태스크 해결 능력을 크게 향상시킬 수 있음을 보여줍니다. **액션-인식 SFT** 와 **보수적 RL** 기법은 GUI 에이전트의 추론-그라운딩 간섭 및 부분적 검증 문제를 해결하는 실용적인 방법론을 제공하며, 이는 데이터 효율적인 추론 가능 GUI 에이전트 개발에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.