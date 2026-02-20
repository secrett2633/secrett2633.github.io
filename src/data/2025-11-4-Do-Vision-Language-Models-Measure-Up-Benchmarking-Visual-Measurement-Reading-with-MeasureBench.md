---
title: "[논문리뷰] Do Vision-Language Models Measure Up? Benchmarking Visual Measurement
  Reading with MeasureBench"
excerpt: "arXiv에 게시된 'Do Vision-Language Models Measure Up? Benchmarking Visual Measurement
  Reading with MeasureBench' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Benchmarking
  - Visual Measurement Reading
  - Synthetic Data Generation
  - Fine-grained Perception
  - Spatial Grounding
  - Reinforcement Learning

permalink: /ai/review/2025-11-4-Do-Vision-Language-Models-Measure-Up-Benchmarking-Visual-Measurement-Reading-with-MeasureBench/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26865)

**저자:** Fenfen Lin, Yesheng Liu, Haiyu Xu, Chen Yue, Zheqi He, Mingxuan Zhao, Miguel Hu Chen, Jiakang Liu, JG Yao, Xi Yang



## 핵심 연구 목표
본 연구는 최신 **Vision-Language Model (VLM)** 들이 시각적 측정 기기 판독과 같은 **미세한 시각적 이해(fine-grained visual understanding)** 작업을 얼마나 잘 수행하는지 평가하는 것을 목표로 합니다. 기존 VLM들이 이러한 종류의 작업에서 겪는 어려움을 분석하고, 실제 환경과 유사한 **MeasureBench** 벤치마크를 통해 VLM의 **수치 연산 및 정밀한 공간 grounding** 능력의 한계를 명확히 규명하고자 합니다.

## 핵심 방법론
연구진은 **2,442개** 의 이미지-질문 쌍으로 구성된 `MeasureBench` 벤치마크를 제시했습니다. 이는 **1,272개** 의 실제 이미지와 **1,170개** 의 합성 이미지로 구성되며, **26가지** 의 다양한 측정 기기 유형과 다이얼, 디지털, 선형, 복합의 **4가지 판독 디자인** 을 포함합니다. 또한, **2D 프로그래밍 렌더러** 와 **3D Blender 렌더러** 를 활용한 데이터 합성 파이프라인을 구축하여 다양한 시각적 변이를 가진 이미지를 생성했습니다. 평가 척도로는 `interval matching`을 통한 수치 정확도와 `unit prediction` 정확도를 사용했으며, `Qwen2.5-VL-7B` 모델에 **강화 학습(GRPO 알고리즘)** 을 적용한 예비 실험도 수행했습니다.

## 주요 결과
평가 결과, 최신 VLM들도 측정 기기 판독에 여전히 어려움을 겪는 것으로 나타났습니다. 가장 성능이 좋은 모델인 **Gemini 2.5 Pro** 는 실제 이미지에서 **30.3%** 의 전체 정확도를, 합성 이미지에서는 **26.1%** 를 달성했습니다. 모델들은 단위 인식에서는 **90% 이상** 의 높은 정확도를 보였으나, 포인터 위치 오인 및 스케일 매핑 오류 등으로 인해 수치 판독 정확도(예: **Gemini 2.5 Pro는 30.9%** )는 훨씬 낮았습니다. 합성 데이터에 대한 **강화 학습** 은 **Qwen2.5-VL-7B** 의 합성 데이터셋 성능을 **11.0%에서 35.2%** 로 크게 향상시켰지만, 실제 이미지에 대한 일반화는 **15.5%에서 20.1%** 로 제한적이었습니다. 또한, 모델의 수치 예측은 `반올림된 숫자`나 시계의 `10:10`과 같은 **강한 사전 편향** 을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 VLM이 고수준 추론에는 뛰어나지만, 실제 환경에서 **미세한 시각적 요소(예: 포인터 위치, 눈금 간격)를 정확하게 해석** 하고 **공간적으로 grounding** 하는 데 여전히 취약하다는 중요한 시사점을 제공합니다. AI 실무자들은 VLM을 산업용 계측이나 자율 주행 등 **정밀한 시각적 수치 판독** 이 필요한 분야에 적용할 때, 현재 모델의 이러한 **한계를 명확히 인지** 해야 합니다. `MeasureBench`의 **합성 데이터 생성 파이프라인** 은 특정 시각적 문제에 대한 **데이터 증강 및 모델 훈련** 에 효과적인 수단으로 활용될 수 있으며, **강화 학습** 을 통한 모델 개선 가능성도 탐색할 가치가 있습니다. 또한, 모델이 특정 수치에 대한 **편향된 예측 분포** 를 보이는 점을 고려하여, 모델 출력의 신뢰성을 평가하고 보정하는 노력이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.