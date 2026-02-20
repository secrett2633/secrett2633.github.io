---
title: "[논문리뷰] LoFT: Parameter-Efficient Fine-Tuning for Long-tailed Semi-Supervised
  Learning in Open-World Scenarios"
excerpt: "Bing Su이 arXiv에 게시한 'LoFT: Parameter-Efficient Fine-Tuning for Long-tailed Semi-Supervised
  Learning in Open-World Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-tailed Learning
  - Semi-Supervised Learning
  - Parameter-Efficient Fine-Tuning
  - Foundation Models
  - Open-World Scenarios
  - OOD Detection
  - Confidence Calibration

permalink: /ai/review/2025-9-15-LoFT-Parameter-Efficient-Fine-Tuning-for-Long-tailed-Semi-Supervised-Learning-in-Open-World-Scenarios/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09926)

**저자:** Jiahao Chen, Zhiyuan Huang, Yurou Liu, Bing Su



## 핵심 연구 목표
본 논문은 Long-Tailed Semi-Supervised Learning (LTSSL)에서 발생하는 기존 문제점들, 즉 모델의 **과신(overconfidence)** 과 **저품질 의사 레이블(pseudo-labels)** 문제를 해결하는 것을 목표로 합니다. 나아가, 레이블링되지 않은 데이터에 Out-of-Distribution (OOD) 샘플이 포함될 수 있는 **개방형 환경(Open-World scenarios)** 에서의 LTSSL 성능 향상에 중점을 둡니다.

## 핵심 방법론
저자들은 **트랜스포머 기반 파운데이션 모델(transformer-based foundation models)** 에 **매개변수 효율적인 미세 조정(Parameter-Efficient Fine-Tuning, PEFT)** 을 적용한 새로운 프레임워크 **LoFT** 를 제안합니다. 특히, 개방형 시나리오를 위해 **LoFT-OW** 는 **2단계 필터링 전략** 을 통해 OOD 샘플을 감지하고 걸러냅니다. 이는 **제로샷 필터링(zero-shot filtering)** 과 **최대 소프트맥스 확률(Maximum Softmax Probability, MSP)** 기반의 필터링을 포함하며, **logit adjustment** 를 사용하여 레이블링된 데이터를 학습하고 신뢰도에 따라 **하드/소프트 의사 레이블** 을 적용합니다.

## 주요 결과
**CIFAR-100-LT** 및 **ImageNet-127** 벤치마크에서 **LoFT** 는 기존 LTSSL 방식 대비 우수한 성능을 달성했습니다. 특히, **OpenCLIP** 백본 사용 시 CIFAR-100-LT에서 **최대 83.2%** 의 정확도를 보였으며, 기존 방식이 레이블링되지 않은 데이터의 1%만 사용해도 더 뛰어난 성능을 입증했습니다. 또한, 모델의 **신뢰도 보정(confidence calibration)** 이 크게 향상되었고, **OOD 감지 작업** 에서도 평균 **AUC 86.51%** 를 기록하며 강력한 식별 능력을 보여주었습니다.

## AI 실무자를 위한 시사점
**LoFT** 는 실세계의 불균형 데이터 문제에 대한 실용적인 해결책을 제시합니다. **사전 훈련된 파운데이션 모델과 PEFT** 를 활용하여 모델의 초기 예측 신뢰도를 높이고 학습 오버헤드를 줄일 수 있으며, 이는 **고품질 의사 레이블 생성** 과 효율적인 모델 훈련으로 이어집니다. 특히, **LoFT-OW** 의 내장된 OOD 감지 메커니즘은 레이블링되지 않은 데이터에 노이즈나 관련 없는 샘플이 포함될 수 있는 **개방형 환경** 에서 모델의 강건성과 일반화 능력을 크게 향상시켜 실제 서비스 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.