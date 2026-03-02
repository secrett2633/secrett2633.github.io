---
title: "[논문리뷰] From Perception to Action: An Interactive Benchmark for Vision Reasoning"
excerpt: "Zhiqiang Hu이 arXiv에 게시한 'From Perception to Action: An Interactive Benchmark for Vision Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Physical Reasoning
  - Interactive AI
  - 3D Benchmark
  - Mechanical Puzzles
  - Spatial Packing
  - Embodied AI

permalink: /ai/review/2026-02-25-From-Perception-to-Action-An-Interactive-Benchmark-for-Vision-Reasoning/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21015)

**저자:** Yuhao Wu, Maojia Song, Yihuai Lan, Lei Wang, Zhiqiang Hu, Yao Xiao, Heng Zhou, Weihua Zheng, Dylan Raharja, Soujanya Poria, Roy Ka-Wei Lee



## 핵심 연구 목표
기존 VLM 평가가 구조 불가지론적이고 단일 턴 질의응답(VQA)에 치중하여 동적 환경에서 기하학, 접촉, 지지 관계가 행동 가능성을 어떻게 제약하는지에 대한 에이전트의 추론 능력을 평가하지 못하는 문제를 해결하는 것이 목표입니다. 물리적 제약에 기반한 구조화된 액션 시퀀스를 이해하고, 계획하며, 실행하는 모델의 능력을 평가하기 위한 인터랙티브 벤치마크를 제시하고자 합니다.

## 핵심 방법론
이 연구는 인터랙티브 3D 물리 기반 테스트베드인 **CHAIN** 벤치마크를 도입합니다. **CHAIN** 은 **인터로킹 기계 퍼즐** 과 **3D 스태킹/패킹** 의 두 가지 태스크 패밀리로 구성되어 있으며, 에이전트는 환경을 반복적으로 관찰하고, 실행 가능한 상호작용을 선택하며, 중간 결과에 기반하여 계획을 수정합니다. 평가는 **Pass@1** (단일 시도 성공률), **AvgSteps** (계획 효율성), **Dist2Opt** (최적 대비 추가 단계), **Solved/Tokens** 및 **Solved/USD** (비용 효율성) 등의 지표를 사용하여 진행되었습니다.

## 주요 결과
평가 결과, **GPT-5.2** 가 **Pass@1=22.9%** 로 가장 높은 종합 성능을 보였으나, **퍼즐 태스크** 에서는 모든 모델이 **0.0%에서 3.1%** 사이의 낮은 성공률을 기록하여 심각한 어려움을 드러냈습니다. 스태킹 태스크에서는 **GPT-5.2** 가 **31.2%** 로 상대적으로 높은 성공률을 보였습니다. 특히, **상호작용적 평가** 는 **원샷(one-shot) 평가** 보다 훨씬 뛰어난 성능을 보여 피드백의 중요성을 입증했으며, 확산 모델 기반 세계 모델들은 분해 태스크에서 심각한 환각을 동반한 **치명적인 실패** 를 보였습니다.

## AI 실무자를 위한 시사점
현재 VLM은 물리적 구조와 인과적 제약을 내재화하는 데 어려움을 겪으며, 장기적인 계획을 수립하고 인지된 구조를 효과적인 행동으로 전환하는 데 한계를 보입니다. **CHAIN** 벤치마크는 물리적으로 기반을 둔, 구조 인식적인 인터랙티브 에이전트 개발을 위한 도전적인 평가 도구를 제공합니다. 이는 미래 AI 시스템이 복잡한 물리적 환경에서 능동적으로 문제를 해결하기 위해 **구조적 추론** 및 **상호작용 기반 학습** 에 더 집중해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.