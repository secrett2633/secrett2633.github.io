---
title: "[논문리뷰] OpenVision 2: A Family of Generative Pretrained Visual Encoders for
  Multimodal Learning"
excerpt: "Zirui Wang이 [arXiv]에 게시한 'OpenVision 2: A Family of Generative Pretrained Visual Encoders for
  Multimodal Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Learning
  - Vision Encoder
  - Generative Pretraining
  - Captioning Loss
  - Training Efficiency
  - Image-Text Models
  - Large Language Models

permalink: /ai/review/2025-9-3-OpenVision-2-A-Family-of-Generative-Pretrained-Visual-Encoders-for-Multimodal-Learning/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01644)

**저자:** Yanqing Liu, Xianhang Li, Letian Zhang, Zirui Wang, Zeyu Zheng, Yuyin Zhou, Cihang Xie



## 핵심 연구 목표
OpenVision 2는 기존 OpenVision 아키텍처와 손실 함수의 복잡성을 단순화하여 멀티모달 학습을 위한 시각 인코더의 훈련 효율성을 대폭 향상시키는 것을 목표로 합니다. 본 연구는 **텍스트 인코더와 대조 학습(contrastive loss)** 을 완전히 제거하고 **캡셔닝 손실(captioning loss)** 만을 사용한 순수한 생성적 학습 패러다임이 높은 성능을 유지하면서 계산 비용을 크게 절감할 수 있음을 입증하고자 합니다.

## 핵심 방법론
OpenVision 2는 기존의 다중 브랜치 파이프라인에서 **이미지 인코더** 와 **텍스트 디코더** 라는 두 개의 핵심 모듈로 단순화되었습니다. 훈련 과정에서 이미지에서 추출된 시각 토큰 중 약 **3분의 2를 무작위로 마스킹** 한 후, 나머지 토큰을 **텍스트 디코더** 에 입력하여 합성 캡션을 예측하는 생성적 학습 방식을 채택합니다. 데이터셋으로는 **Llama-3 기반의 고품질 합성 캡션 데이터셋인 ReCap-DataComp-1B v2** 를 활용하여 학습 데이터의 품질을 극대화했습니다.

## 주요 결과
OpenVision 2는 기존 OpenVision 모델과 유사하거나 더 우수한 멀티모달 벤치마크 성능을 달성하면서 훈련 시간과 메모리 사용량을 크게 절감했습니다. 예를 들어, **ViT-L/14** 모델은 훈련 시간을 **약 1.5배(83시간에서 57시간)** 단축하고, 메모리 사용량을 **약 1.8배(24.5GB에서 13.8GB)** 절감했으며, 최대 배치 크기를 **2k에서 8k** 로 늘릴 수 있었습니다. 특히 **OCR 관련 태스크** 에서 강점을 보이며, **ViT-L/14 해상도 224 설정에서 TextVQA 59.0, OCR-Bench 327** 을 기록하는 등 뛰어난 효율성과 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 멀티모달 AI 모델 훈련에서 **CLIP 스타일의 대조 학습이 필수적이지 않으며** , 순수하게 **생성적인 캡셔닝 학습만으로도 강력한 성능과 효율성** 을 동시에 달성할 수 있음을 시사합니다. 훈련 시간 및 메모리 사용량의 대폭적인 절감은 **제한된 컴퓨팅 자원을 가진 환경** 에서도 대규모 비전 인코더를 훈련하고 확장할 수 있는 실용적인 가능성을 제공합니다. 공개된 **사전 훈련 모델** 과 학습 코드는 AI 개발자들이 효율적인 멀티모달 시스템을 구축하는 데 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.