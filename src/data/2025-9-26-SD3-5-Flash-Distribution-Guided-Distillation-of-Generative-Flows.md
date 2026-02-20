---
title: "[논문리뷰] SD3.5-Flash: Distribution-Guided Distillation of Generative Flows"
excerpt: "Yi-Zhe Song이 arXiv에 게시한 'SD3.5-Flash: Distribution-Guided Distillation of Generative Flows' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative AI
  - Image Generation
  - Diffusion Models
  - Rectified Flow
  - Model Distillation
  - Few-Step Generation
  - Computational Efficiency
  - Prompt Alignment

permalink: /ai/review/2025-9-26-SD3-5-Flash-Distribution-Guided-Distillation-of-Generative-Flows/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21318)

**저자:** Hmrishav Bandyopadhyay, Reshinth Adithyan, Rahim Entezari, Jim Scott, Yi-Zhe Song, Varun Jampani



## 핵심 연구 목표
본 논문은 최첨단 생성 모델, 특히 **Rectified Flow 모델** 의 높은 연산 요구량으로 인해 발생하는 접근성 문제를 해결하고자 합니다. 적은 스텝으로도 고품질 이미지를 생성할 수 있는 효율적인 증류(distillation) 프레임워크를 개발하여, 모바일 기기부터 데스크톱까지 다양한 소비자 기기에서 AI 기반 이미지 생성을 가능하게 하는 것이 주요 목표입니다.

## 핵심 방법론
제안하는 **SD3.5-Flash** 는 **재구성된 분포 일치(distribution matching) 목표 함수** 를 통해 **Rectified Flow 모델** 을 증류합니다. 핵심 혁신으로는 **"timestep sharing"** 을 도입하여 학생 모델 궤적 샘플로 분포 일치를 계산함으로써 기울기 노이즈를 줄이고 훈련 안정성을 높였습니다. 또한, **"split-timestep fine-tuning"** 을 통해 모델 용량을 임시로 확장하고 **서로 다른 타임스텝 범위(예: (0,500] 및 (500,1000])** 에서 모델을 훈련한 후, **3:7 비율의 가중치 보간(weight interpolation)** 으로 병합하여 프롬프트 정렬을 개선했습니다. 파이프라인 최적화에는 **T5-XXL 텍스트 인코더 재구조화** 및 **16비트에서 6비트 정밀도로의 전문화된 양자화** 가 포함됩니다.

## 주요 결과
**SD3.5-Flash** 는 기존의 소수 스텝 생성 모델과 50스텝 교사 모델보다 이미지 품질 및 프롬프트 준수 측면에서 일관되게 우수한 성능을 보여, 사용자 연구에서 더 높은 ELO 등급을 획득했습니다. 특히 4스텝 모델은 **GenEval 점수 0.70 (T5-XXL, 16비트)** 및 **ImageReward(IR) 점수 1.10** 를 달성했으며, **RTX 4090 GPU** 에서 **512px 이미지 기준 0.19초** , **A17 iPhone** 에서 **6비트 양자화 시 2.62초** 의 낮은 지연 시간을 기록했습니다. 또한, VRAM 요구 사항을 **18 GiB에서 약 6 GiB** 로 크게 절감했습니다.

## AI 실무자를 위한 시사점
**SD3.5-Flash** 는 고품질 생성 AI의 대중화를 앞당겨, 자원 제약이 있는 소비자 기기에서도 고급 이미지 생성을 가능하게 합니다. AI/ML 엔지니어는 **"timestep sharing"** 및 **"split-timestep fine-tuning"** 과 같은 새로운 증류 기법을 활용하여 소수 스텝 생성 모델의 훈련 안정성과 프롬프트 정렬을 향상시킬 수 있습니다. 또한, **양자화** 및 **텍스트 인코더 재구조화** 와 같은 파이프라인 최적화는 엣지 디바이스부터 고성능 GPU에 이르기까지 광범위한 하드웨어에서 메모리 효율적이고 빠른 추론이 가능한 모델을 배포하는 데 실질적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.