---
title: "[논문리뷰] Human3R: Everyone Everywhere All at Once"
excerpt: "Yuliang Xiu이 [arXiv]에 게시한 'Human3R: Everyone Everywhere All at Once' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D Human-Scene Reconstruction
  - Online Reconstruction
  - Multi-person
  - SMPL-X
  - Transformer
  - Visual Prompt Tuning
  - Real-time
  - Foundation Model

permalink: /ai/review/2025-10-8-Human3R_Everyone_Everywhere_All_at_Once/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06219)

**저자:** Yue Chen, Xingyu Chen, Yuxuan Xue, Anpei Chen, Yuliang Xiu, Gerard Pons-Moll



## 핵심 연구 목표
본 논문은 캐주얼하게 촬영된 모노큘러 비디오로부터 세계 좌표계 상의 **온라인 4D 인간-장면 재구성**을 위한 통합적이고 피드포워드 방식의 프레임워크인 Human3R을 제안합니다. 기존의 다단계 파이프라인, 반복적 정제, 그리고 인간 감지 및 SLAM과 같은 무거운 전처리에 대한 의존성 문제를 해결하고자 합니다.

## 핵심 방법론
Human3R은 4D 온라인 재구성 파운데이션 모델인 **CUT3R**을 기반으로 하며, **매개변수 효율적인 비주얼 프롬프트 튜닝(VPT)**을 활용하여 CUT3R의 시공간 사전 지식을 보존하면서 다중 **SMPL-X 바디**를 직접적으로 읽어낼 수 있도록 합니다. 특히, 이미지 특징에서 **인간 머리 토큰**을 감지하고, **Multi-HMR ViT-DINO 인코더**에서 학습된 인간 사전 토큰과 결합하여 **학습 가능한 MLP**를 통해 인간 프롬프트로 변환하는 방식을 사용합니다. 훈련은 소규모 합성 데이터셋 **BEDLAM**에서 단 하루, **단일 GPU**로 진행됩니다.

## 주요 결과
Human3R은 **단일 통합 모델**로 다중 인간 및 3D 장면을 **원샷(one-shot)** 방식으로 실시간 재구성(15 FPS)하며 **8 GB의 낮은 메모리 사용량**을 달성했습니다. 글로벌 인간 모션 추정, 로컬 인간 메시 복구, 비디오 깊이 추정 및 카메라 자세 추정을 포함한 다양한 4D 태스크에서 최첨단 또는 경쟁력 있는 성능을 보였습니다. 특히, **CUT3R**의 3D 공간 인식을 활용하여 Multi-HMR의 이미지 종횡비 변화에 대한 민감도를 극복합니다.

## AI 실무자를 위한 시사점
Human3R은 복잡한 다단계 파이프라인 없이 **단일 모델**로 실시간 4D 인간-장면 재구성을 가능하게 하여 **AR/VR, 로봇 공학, 자율 내비게이션**과 같은 응용 분야에 직접적으로 활용될 수 있습니다. **파운데이션 모델과 비주얼 프롬프트 튜닝**의 결합은 최소한의 훈련으로 특정 도메인에 모델을 효과적으로 적응시키는 강력한 방법을 제시하며, 이는 AI 모델 개발의 효율성을 높이는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.