---
title: "[논문리뷰] LightOnOCR: A 1B End-to-End Multilingual Vision-Language Model for State-of-the-Art OCR"
excerpt: "arXiv에 게시된 'LightOnOCR: A 1B End-to-End Multilingual Vision-Language Model for State-of-the-Art OCR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - OCR
  - Vision-Language Model
  - End-to-End Learning
  - Multilingual
  - Reinforcement Learning
  - Document Understanding
  - Bounding Box Prediction
  - Task Arithmetic Merging

permalink: /ai/review/2026-01-21-LightOnOCR-A-1B-End-to-End-Multilingual-Vision-Language-Model-for-State-of-the-Art-OCR/

toc: true
toc_sticky: true

date: 2026-01-21 00:00:00+0900+0900
last_modified_at: 2026-01-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14251)

**저자:** Said Taghadouini, Adrien Cavaillès, Baptiste Aubertin



## 핵심 연구 목표
논문은 복잡한 다단계 OCR 파이프라인 없이 문서 이미지를 깨끗하고 자연스럽게 정렬된 텍스트로 변환하는 **10억 개의 파라미터를 가진 종단 간 다국어 비전-언어 모델 LightOnOCR-2-1B** 를 제안합니다. 이는 특히 다단 레이아웃, 테이블, 과학 PDF 등 복잡한 문서에서 최첨단 OCR 성능을 달성하고, 내장된 이미지에 대한 **바운딩 박스 예측** 기능을 확장하는 것을 목표로 합니다.

## 핵심 방법론
핵심 방법론은 **NaViT vision encoder** , **MLP multimodal projector** , **Qwen3 language model decoder** 로 구성된 종단 간 VLM 아키텍처를 기반으로 합니다. 훈련은 **1540px** 의 높은 해상도와 **Qwen3-VL-235B-A22B-Instruct** 교사 모델을 활용한 대규모 고품질 데이터 혼합(스캔, 프랑스어, 과학 문서 포함)을 사용합니다. 모델의 견고성과 성능은 반복 루프 및 수학 오류를 줄이기 위한 **RLVR (Reinforcement Learning with Verifiable Rewards)** 과 IoU 기반 보상을 통한 **이미지 바운딩 박스 위치 파악 정교화** , 그리고 **체크포인트 평균화** 및 **태스크 산술 병합** 을 통해 더욱 향상되었습니다.

## 주요 결과
**LightOnOCR-2-1B** 는 **OlmOCR-Bench** 에서 **83.2 ± 0.9** 의 새로운 최첨단 종합 점수를 달성하여 기존 대규모 모델(90억 파라미터 규모)보다 **9배 작고** 훨씬 빠릅니다. **LightOnOCR-2-1B-bbox** 변형은 **LightOnOCR-bbox-bench** 에서 **Chandra-9B** 모델 대비 **F1@0.5** 및 개수 정확도를 향상시켜, 모델 크기가 훨씬 작음에도 불구하고 신뢰할 수 있는 이미지 탐지 및 정확한 위치 파악 능력을 입증했습니다. 또한, 단일 **NVIDIA H100** 에서 **5.71 pages/sec** 의 높은 추론 처리량을 달성하여 대규모 문서 처리의 실용성을 보여주었습니다.

## AI 실무자를 위한 시사점
**LightOnOCR-2-1B** 는 복잡한 문서 구조와 다양한 언어에서 뛰어난 성능을 보이는 **단일 종단 간 VLM** 으로, 기존 다단계 OCR 파이프라인의 복잡성과 유지보수 비용을 절감합니다. **RLVR** 과 **태스크 산술 병합** 을 통해 OCR 품질과 이미지 객체 위치 파악 정확도 간의 균형을 조절할 수 있는 유연성을 제공하며, **1B 파라미터** 로 최첨단 성능과 높은 처리량을 달성하여 리소스 효율적인 고품질 문서 이해 솔루션 구축 가능성을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.