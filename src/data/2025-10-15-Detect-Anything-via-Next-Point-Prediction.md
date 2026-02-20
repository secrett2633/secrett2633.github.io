---
title: "[논문리뷰] Detect Anything via Next Point Prediction"
excerpt: "arXiv에 게시된 'Detect Anything via Next Point Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Object Detection
  - Coordinate Prediction
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Visual Perception
  - Zero-shot Learning
  - Spatial Reasoning

permalink: /ai/review/2025-10-15-Detect-Anything-via-Next-Point-Prediction/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12798)

**저자:** Qing Jiang, Junan Huo, Xingyu Chen, Yuda Xiong, Zhaoyang Zeng, Yihao Chen, Tianhe Ren, Junzhi Yu, Lei Zhang



## 핵심 연구 목표
본 논문은 MLLM(Multimodal Large Language Model) 기반 객체 감지에서 발생하는 낮은 재현율, 중복 예측, 좌표 불일치 등의 문제를 해결하고, 기존 회귀 기반 모델과 동등하거나 이를 능가하는 **제로샷 객체 인식 성능** 을 달성하는 것을 목표로 합니다. 나아가, 언어 이해 능력을 통합하여 다양한 시각 인식 작업을 수행할 수 있는 다재다능한 시스템을 구축하고자 합니다.

## 핵심 방법론
Rex-Omni는 세 가지 핵심 설계 원칙을 따릅니다: 1) **태스크 공식화** : 좌표 값을 **1,000개의 이산적인 특수 토큰** 으로 양자화하여 예측의 학습 난이도와 토큰 효율성을 개선합니다. 2) **데이터 엔진** : 고품질의 **그라운딩, 참조, 포인팅 데이터** 를 생성하는 여러 전문 데이터 엔진을 구축하여 의미론적으로 풍부한 학습 데이터를 제공합니다. 3) **학습 파이프라인** : **2,200만 개의 데이터** 로 **지도 미세 조정(SFT)** 을 수행한 후, **GRPO(Geometry-aware Reinforcement Post-training)** 기반의 강화 학습을 통해 이산-연속 좌표 예측 간극을 해소하고 중복 예측과 같은 바람직하지 않은 행동을 완화합니다.

## 주요 결과
**3B 매개변수 MLLM** 인 Rex-Omni는 COCO 벤치마크에서 기존 MLLM인 **SEED1.5-VL** 을 뛰어넘는 객체 감지 성능을 보였습니다. 특히, GRPO 적용 후 **COCO F1@mIoU는 52.9%** 를 달성했으며, GRPO가 SFT-only 모델의 중복 예측 비율을 **VisDrone에서 15.3%에서 0.1%로** 크게 줄여 행동 문제를 효과적으로 완화함을 입증했습니다. 또한 객체 참조, 시각적 프롬프팅, GUI 그라운딩, OCR 등 다양한 시각 인식 작업에서 강력한 성능을 보여주며 다목적 시각 지각 시스템으로서의 잠재력을 확인했습니다.

## AI 실무자를 위한 시사점
Rex-Omni는 **MLLM** 이 정밀한 위치 파악과 강력한 언어 이해 능력을 동시에 갖출 수 있음을 보여주며, 새로운 AI 기반 시각 인식 시스템 개발의 가능성을 제시합니다. **양자화된 상대 좌표와 특수 토큰 사용** 은 모델의 효율성을 크게 향상시켜 실제 애플리케이션에 적용 가능성을 높입니다. **SFT 이후 GRPO 기반의 2단계 강화 학습** 은 MLLM의 예측 정밀도와 행동 일관성을 높이는 데 필수적이며, 이는 AI 모델 학습 파이프라인 설계 시 고려해야 할 중요한 요소입니다. 다만, 추론 속도는 여전히 최적화가 필요한 부분입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.