---
title: "[논문리뷰] Skyra: AI-Generated Video Detection via Grounded Artifact Reasoning"
excerpt: "이 [arXiv]에 게시한 'Skyra: AI-Generated Video Detection via Grounded Artifact Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI-Generated Video Detection
  - Multimodal Large Language Model (MLLM)
  - Artifact Reasoning
  - Explainable AI
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Video Forensics

permalink: /ai/review/2025-12-18-Skyra-AI-Generated-Video-Detection-via-Grounded-Artifact-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-18 00:00:00+0900+0900
last_modified_at: 2025-12-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.15693)

**저자:** Yifei Li, Wenzhao Zhen†, Yanran Zhang, Runze Sun, Yu Zheng, Lei Chen*, Jie Zhou, Jiwen Lu



## 핵심 연구 목표
본 논문은 기존의 AI 생성 비디오 탐지 모델이 이진 분류에만 초점을 맞추고 설명 가능성이 부족하다는 한계를 해결하고자 합니다. 인간이 인지할 수 있는 시각적 아티팩트를 기반으로 AI 생성 비디오를 탐지하고, 그 아티팩트를 탐지 및 설명의 근거로 활용하는 **해석 가능한 AI 생성 비디오 탐지 모델** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 인간이 주석한 AI 생성 비디오 아티팩트 데이터셋인 **ViF-CoT-4K** 를 구축하고, 이를 활용하여 특화된 멀티모달 대규모 언어 모델( **MLLM** )인 **Skyra** 를 훈련시켰습니다. 훈련은 두 단계로 진행되는데, 첫 번째는 **Supervised Fine-Tuning (SFT)** 으로 **Qwen2.5-VL-7B** 를 기반으로 아티팩트 인식 및 설명 능력을 부여하고, 두 번째는 **Reinforcement Learning (RL)** 을 통해 모델의 판별적 아티팩트 탐지 능력을 체계적으로 향상시킵니다.

## 주요 결과
**Skyra** 는 **ViF-Bench** 벤치마크에서 기존 이진 분류기 및 MLLM 기반 탐지기를 크게 능가하는 성능을 보였습니다. 특히, **DeMamba** 대비 **+26.73% 절대 정확도** 와 **+17.27% F1 점수** 를 달성했으며, MLLM 기준선 대비 **+34.12% 정확도** , **+24.57% 재현율** , **+32% F1 점수** 향상을 이루었습니다. 또한, **RL 훈련** 은 **재현율** 에서 **+3.74%** 의 추가적인 개선을 가져왔습니다.

## AI 실무자를 위한 시사점
**Skyra** 는 AI 생성 비디오 탐지 분야에서 **해석 가능성** 과 **신뢰성** 을 크게 향상시켰습니다. **ViF-CoT-4K 데이터셋** 과 **ViF-Bench 벤치마크** 는 향후 설명 가능한 AI 생성 비디오 탐지 연구에 중요한 리소스를 제공합니다. AI/ML 엔지니어는 이 모델의 **아티팩트 기반 추론** 접근 방식을 통해 생성형 AI의 오용을 완화하고 미디어의 신뢰성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.