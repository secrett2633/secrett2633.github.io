---
title: "[논문리뷰] VideoWorld 2: Learning Transferable Knowledge from Real-world Videos"
excerpt: "이 [arXiv]에 게시한 'VideoWorld 2: Learning Transferable Knowledge from Real-world Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Transferable Knowledge
  - Real-world Video Learning
  - Latent Dynamics Model
  - Video Diffusion
  - Robotics Manipulation
  - Long-horizon Tasks
  - Unlabeled Data

permalink: /ai/review/2026-02-11-VideoWorld-2-Learning-Transferable-Knowledge-from-Real-world-Videos/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10102)

**저자:** Zhongwei Ren, Yunchao Wei, Xiao Yu, Guixun Luo, Yao Zhao, Bingyi Kang, Jiashi Feng, Xiaojie Jin



## 핵심 연구 목표
본 연구는 복잡하고 장기적인 태스크를 위해 레이블이 없는 **실세계 비디오 데이터** 로부터 전이 가능한 지식을 학습하는 것을 목표로 합니다. 기존 VideoWorld 모델이 실세계 비디오의 시각적 다양성, 복잡한 액션 다이내믹스, 장기 상호작용 처리에서 겪는 한계를 극복하고, 외형 모델링과 액션 학습을 명확히 분리하여 강건한 일반화 능력을 확보하고자 합니다.

## 핵심 방법론
핵심 방법론은 액션 다이내믹스를 시각적 외형과 분리하는 **dynamics-enhanced Latent Dynamics Model (dLDM)** 입니다. **사전 훈련된 Video Diffusion Model (VDM)** 이 시각적 외형 모델링을 담당하고, **인과적 VQ-VAE** 는 미래 시각 변화로부터 태스크 관련 다이내믹스를 포착하는 압축된 잠재 코드를 학습합니다. 이 잠재 코드는 **자기회귀(autoregressive) Transformer** 에 의해 모델링되어 태스크 정책을 학습하고 장기적인 추론을 지원합니다.

## 주요 결과
**Video-CraftBench** 에서 **VideoWorld 2** 는 기존 방법론 대비 태스크 성공률에서 **최대 70% 향상** 을 달성했으며, 장기 종이 접기 태스크에서 **68.8%** , 블록 쌓기 태스크에서 **81.5%** 의 최종 단계 성공률을 보였습니다. **Open-X 데이터셋** 으로 사전 훈련 후 **CALVIN 환경** 에서 미세 조정했을 때, 장기 태스크에서 **72.3%** 의 최종 단계 성공률을 기록하며 강력한 도메인 간 일반화 능력과 높은 시각적 품질을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **레이블이 없는 실세계 비디오** 에서 **전이 가능한 지식** 을 학습하는 데 있어 **외형과 다이내믹스 분리** 의 중요성을 강조합니다. 제안된 **dLDM 아키텍처** 는 복잡한 조작 및 장기 계획이 필요한 **로봇 공학 태스크** 에 효율적으로 적용될 수 있습니다. **Video-CraftBench** 와 같은 새로운 벤치마크는 실제 환경에서 **미세한 조작 및 장기 비주얼 추론** 연구를 촉진하여, 향후 AI 에이전트 개발에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.