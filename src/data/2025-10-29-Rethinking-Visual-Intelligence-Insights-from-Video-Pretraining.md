---
title: "[논문리뷰] Rethinking Visual Intelligence: Insights from Video Pretraining"
excerpt: "Ahmad Rahimi이 arXiv에 게시한 'Rethinking Visual Intelligence: Insights from Video Pretraining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Models
  - Visual Intelligence
  - Pretraining
  - Foundation Models
  - Low-resource Learning
  - Inductive Biases
  - Visual Reasoning
  - Image-to-Image Tasks

permalink: /ai/review/2025-10-29-Rethinking-Visual-Intelligence-Insights-from-Video-Pretraining/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24448)

**저자:** Pablo Acuaviva, Aram Davtyan, Sebastian Stapf, Mariam Hassan, Ahmad Rahimi, Alexandre Alahi, Paolo Favaro



## 핵심 연구 목표
Large Language Models (LLMs)의 성공에도 불구하고 시각 도메인에서 **구성적 이해, 샘플 효율성, 범용 문제 해결** 의 한계가 지속되고 있습니다. 본 연구는 **Video Diffusion Models (VDMs)** 이 이러한 간극을 메우는 유망한 방향임을 가정하고, **비디오 사전 학습** 이 다양한 시각 태스크에 대한 적응성을 지원하는 강력한 **귀납적 편향(inductive biases)** 을 제공하는지 평가하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **사전 학습된 VDM** 과 **사전 학습된 LLM** 을 **LoRA 기반 어댑터** 로 경량화하여 동등한 조건에서 비교하는 통제된 평가 프레임워크를 제안합니다. VDM의 경우, 이미지-이미지 예측 태스크를 입력과 출력 이미지를 잇는 짧은 **전이 비디오(temporal sequence)** 로 재구성하여 학습하며, LLM은 입력과 출력을 **JSON-to-JSON 변환 문제** 로 프레이밍하여 학습합니다. **ARC-AGI, ConceptARC, 시각 게임, 경로 계획, 셀룰러 오토마타** 등 다양한 시각 기반 벤치마크를 활용하여 모델의 데이터 효율성과 일반화 능력을 평가했습니다.

## 주요 결과
실험 결과, **Video Diffusion Models (VDMs)** 은 비교 대상인 LLM 대비 **더 적은 훈련 예제** 로 구조화된 시각 태스크에 효과적으로 적응하는 능력을 보였습니다. 특히 **ConceptARC** 벤치마크에서 **CogVideoX1.5-5B VDM** 은 여러 개념 카테고리에서 LLM을 능가하며, `Count`에서 VDM이 **0.57** 정확도를, LLM이 **0.13** 정확도를 기록했습니다. 또한, **경로 계획 태스크** 에서 VDM은 LLM 대비 **최대 10배 높은 데이터 효율성** 을 보였으며, VLM (Gemma-4B)은 **Sudoku** 태스크에서 **0.00%** 의 정확도를 기록하며 이미지 입력의 추가적인 이점이 없음을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 **모달리티 정렬 사전 학습(modality-aligned pretraining)** 이 시각 지능 발전에 중요한 역할을 한다는 강력한 증거를 제시합니다. VDM은 **공간 구조 및 시간적 변환** 이 중요한 태스크에서 LLM보다 훨씬 높은 **데이터 효율성** 을 보여, **시각 파운데이션 모델** 개발의 새로운 길을 열었습니다. 이는 **경로 계획, 시뮬레이션, 로봇 공학** 과 같은 실제 응용 분야에서 **사전 학습된 VDM** 의 잠재력을 시사하며, 더 적은 데이터로 복잡한 시각 문제를 해결해야 하는 AI 엔지니어들에게 **데이터 효율적인 모델 선택의 중요성** 을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.