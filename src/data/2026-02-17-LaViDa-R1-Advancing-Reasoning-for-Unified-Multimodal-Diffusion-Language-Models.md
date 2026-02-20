---
title: "[논문리뷰] LaViDa-R1: Advancing Reasoning for Unified Multimodal Diffusion Language Models"
excerpt: "arXiv에 게시된 'LaViDa-R1: Advancing Reasoning for Unified Multimodal Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Diffusion Models
  - Reasoning
  - Reinforcement Learning
  - Supervised Finetuning
  - Visual Question Answering
  - Image Editing
  - Object Grounding
  - Policy Gradient

permalink: /ai/review/2026-02-17-LaViDa-R1-Advancing-Reasoning-for-Unified-Multimodal-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14147)

**저자:** Shufan Li, Yuchen Zhu, Jiuxiang Gu, Kangning Liu, Zhe Lin, Yongxin Chen, Molei Tao, Aditya Grover, Jason Kuen



## 핵심 연구 목표
본 논문은 기존 확산 언어 모델(dLLMs) 기반 추론 시스템이 겪는 태스크 특이성, RL 학습 불안정성, 훈련 신호 부족 등의 문제를 해결하고자 합니다. 이를 위해 다양한 시각 및 언어 태스크(수학 추론, VQA, 이미지 편집, 객체 접지)에 걸쳐 강력하고 범용적인 추론 능력을 갖춘 **멀티모달 dLLM인 LaViDa-R1** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
**LaViDa-R1** 은 **LaViDa-O** 모델을 기반으로 하며, **SFT(Supervised Finetuning)** 와 **다중 태스크 RL(Reinforcement Learning)** 을 통합하는 새로운 **통합 후처리 프레임워크** 를 도입합니다. **KL 발산 항을 SFT 정규화** 로 대체하여 학습 안정성과 탐색 능력을 향상시키고, 훈련 중 고품질 샘플 생성을 위해 **Answer-Forcing** (정답이 있는 경우) 및 **Tree Search** (정답이 없는 경우)와 같은 **가이드 롤아웃 생성 메커니즘** 을 활용합니다. 또한, **상보적 마스킹(complementary masking) 기반의 likelihood estimator** 를 제안하여 기존 Monte Carlo 방법의 한계를 극복합니다.

## 주요 결과
**LaViDa-R1** 은 다양한 멀티모달 벤치마크에서 강력한 추론 성능을 달성했으며, **MathVista에서 60.0%** , **ChartQA에서 81.7%** , **MMMU-Pro에서 32.8%** 의 정확도를 기록하며 베이스라인 대비 개선을 보였습니다. 특히, 복잡한 시각적 추론을 요구하는 **Lisa-Grounding 태스크에서는 mIoU 60.0%** 를 달성하여 LaViDa-O 대비 **+33.9 mIoU** 의 상당한 성능 향상을 보였으며, **ImgEdit 벤치마크에서 3.90** 의 Overall 점수를 기록했습니다. Ablation 연구를 통해 **10% 확률의 Answer-Forcing** 과 제안된 **Complementary Masking Likelihood Estimator** 가 성능 향상에 핵심적인 역할을 했음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **멀티모달 확산 언어 모델(dLLM)의 추론 능력** 을 효과적으로 향상시키는 **통합 학습 프레임워크** 를 제시하여, 복잡한 시각-언어 추론 태스크의 성능 개선에 크게 기여할 수 있습니다. **Answer-Forcing 및 Tree Search** 와 같은 **가이드 생성 전략** 은 학습 과정에서 고품질 샘플 확보의 중요성을 강조하며, 이는 **데이터 희소성 문제** 를 겪는 다른 RL 기반 모델 개발에 영감을 줄 수 있습니다. 하지만, **자동 회귀(AR) MLLM과의 성능 격차** 가 여전히 존재하므로, dLLM의 **사전 훈련 및 스케일링** 에 대한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.