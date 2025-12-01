---
title: "[논문리뷰] Improving Large Vision and Language Models by Learning from a Panel of
  Peers"
excerpt: "Simon Jenni이 [arXiv]에 게시한 'Improving Large Vision and Language Models by Learning from a Panel of
  Peers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Vision and Language Models (LVLMs)
  - Self-Improvement
  - Peer Learning
  - Preference Alignment
  - Reward Modeling
  - Multimodal Learning
  - Knowledge Transfer

permalink: /ai/review/2025-9-3-Improving-Large-Vision-and-Language-Models-by-Learning-from-a-Panel-of-Peers/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01610)

**저자:** Jefferson Hernandez, Jing Shi, Simon Jenni, Vicente Ordonez, Kushal Kafle



## 핵심 연구 목표
본 논문은 대규모 시각-언어 모델(LVLMs)의 성능을 향상시키기 위해 **고가의 인간 주석 데이터에 대한 의존성을 줄이는** 새로운 자체 개선 프레임워크인 'Panel-of-Peers(PoP)'를 제안합니다. LVLMs가 서로의 피드백으로부터 반복적으로 학습하여 능력 격차를 해소하고, 다양한 태스크에서 전반적인 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
PoP 프레임워크는 여러 LVLM으로 구성된 패널을 활용하여 다음 두 단계를 반복합니다. 첫째, 패널 내 각 모델이 새로운 프롬프트에 대한 **후보 응답을 생성** 합니다. 둘째, 생성된 응답들을 패널 내 다른 모델들이 **Helpfulness, Correctness, Coherence, Complexity, Verbosity** 와 같은 기준에 따라 상호 평가하여 **보상 점수** 를 부여하고, 이를 **SimPO (Simple Preference Optimization)** 를 사용한 **반복적 미세 조정(fine-tuning)** 에 활용합니다. 이 과정에서 **평균 투표(mean voting)** 를 통해 보상 점수를 집계하고, 가장 높은 점수와 낮은 점수의 응답을 선별하여 선호도 데이터셋을 구축합니다.

## 주요 결과
PoP 방법론은 15개 벤치마크에서 평균 점수를 **48점(초기)에서 57점(3회 반복 후)으로 9점 향상** 시켰습니다. 특히, PoP의 첫 번째 반복(PoP-iter1)만으로도 **MMbench에서 68.7%** , **SEED-Bench에서 67.9%** , **MM-Vet에서 35.6%** 의 성능을 달성하여 기존 최신 선호도 정렬 방법들을 능가했습니다. 또한, **OCR-Dumb** 모델에 OCR 지식을 성공적으로 전이하여 새로운 능력을 학습시킬 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
PoP는 LVLMs 개발 시 **고가의 인간 주석 작업 없이도 모델의 성능을 향상** 시킬 수 있는 비용 효율적인 대안을 제공합니다. 이는 모델 간 **상호 지식 전이** 를 통해 특정 약점을 보완하고, 다양한 멀티모달 태스크에서의 전반적인 성능을 끌어올릴 수 있음을 시사합니다. 따라서, AI 엔지니어는 PoP 프레임워크를 활용하여 LVLM의 **확장성과 다재다능함** 을 높이고, 자체 개선 메커니즘을 통해 모델의 지속적인 발전을 도모할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.