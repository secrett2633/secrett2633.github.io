---
title: "[논문리뷰] Video Generation Models Are Good Latent Reward Models"
excerpt: "이 [arXiv]에 게시한 'Video Generation Models Are Good Latent Reward Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Reward Feedback Learning
  - Latent Space
  - Diffusion Models
  - Human Preferences
  - Motion Quality
  - Process-aware

permalink: /ai/review/2025-11-28-Video-Generation-Models-Are-Good-Latent-Reward-Models/

toc: true
toc_sticky: true

date: 2025-11-28 00:00:00+0900+0900
last_modified_at: 2025-11-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21541)

**저자:** Xiaoyue Mi, Wenqing Yu, Jiesong Lian, Shibo Jie, Ruizhe Zhong, Zijun Liu, Guozhen Zhang, Zixiang Zhou, Zhiyong Xu, Yuan Zhou, Qinglin Lu, Fan Tang



## 핵심 연구 목표
비디오 생성 모델을 인간의 선호도에 맞춰 정렬하는 **Reward Feedback Learning (ReFL)**의 기존 한계, 즉 높은 메모리 사용량, 긴 훈련 시간, 초기 생성 단계 감독 부족 문제를 해결하는 것이 목표입니다. 특히, 픽셀 공간 기반의 리워드 모델이 아닌, **사전 훈련된 비디오 생성 모델(VGM)**을 소음이 있는 잠재 공간에서 직접 리워드 모델로 활용하는 방법을 제안합니다.

## 핵심 방법론
본 논문은 **Process Reward Feedback Learning (PRFL)** 프레임워크를 제안합니다. 이 프레임워크는 **Process-Aware Video Reward Model (PAVRM)**을 사용하여 임의의 시간 단계에서 노이즈가 있는 잠재 표현으로부터 직접 비디오 품질을 평가합니다. **PAVRM**은 **VGM의 DiT 블록**을 특징 추출기로 활용하며, **쿼리 기반 공간-시간 집계**를 통해 가변 길이 비디오 특징을 압축하고, **VAE 디코딩 없이** 잠재 공간에서 전적으로 선호도 최적화를 수행합니다.

## 주요 결과
**PRFL**은 RGB 기반 ReFL 대비 **동적 정도(dynamic degree)에서 최대 +56.00**, **인체 해부학(human anatomy)에서 +21.52**의 상당한 개선을 달성했습니다. 또한, **RGB ReFL**이 **Out-Of-Memory (OOM)** 오류를 겪는 반면, **PAVRM**은 **67 GB** 이내의 VRAM으로 전체 비디오를 처리할 수 있어 **1.4배 빠른 훈련 시간**과 상당한 메모리 절감 효과를 보였습니다. 사용자 연구에서도 **PRFL**이 기존 방식들을 일관되게 능가하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
**PRFL**은 비디오 생성 모델을 인간의 선호도에 맞춰 효율적이고 확장 가능하게 정렬할 수 있는 실용적인 방법을 제공합니다. 특히, **잠재 공간 최적화**와 **VAE 디코딩 제거**를 통해 고해상도 비디오 생성에서 발생하는 계산 및 메모리 병목 현상을 크게 완화합니다. 이는 **사전 훈련된 비디오 생성 모델**이 리워드 모델로서 활용될 수 있음을 보여주어, 향후 비디오 생성 모델의 **Self-Supervision** 및 **Fine-tuning** 전략에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.