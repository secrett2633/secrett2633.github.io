---
title: "[논문리뷰] Adapting Vision-Language Models Without Labels: A Comprehensive Survey"
excerpt: "Eleni Chatzi이 arXiv에 게시한 'Adapting Vision-Language Models Without Labels: A Comprehensive Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Unsupervised Adaptation
  - Test-Time Adaptation (TTA)
  - Domain Transfer
  - Multimodal Learning
  - Label-Free Learning
  - Zero-Shot Learning

permalink: /ai/review/2025-8-11-Adapting-Vision-Language-Models-Without-Labels-A-Comprehensive-Survey/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05547)

**저자:** Hao Dong, Lijun Sheng, Jian Liang, Ran He, Eleni Chatzi, Olga Fink



## 핵심 연구 목표
본 서베이 논문은 레이블링된 데이터 없이 사전 훈련된 **Vision-Language Models (VLMs)** 를 특정 다운스트림 태스크에 적용할 때 발생하는 성능 저하 문제를 해결하고자 합니다. 기존 VLM 미세 조정 방식의 높은 레이블링 비용과 분포 변화에 대한 취약점을 극복하기 위해, **비지도 VLM 적응** 분야에 대한 포괄적이고 체계적인 분류 및 분석을 제공하는 것을 목표로 합니다.

## 핵심 방법론
논문은 비레이블 시각 데이터의 가용성에 따라 비지도 VLM 적응 방법을 **네 가지 패러다임** 으로 분류하는 **새로운 분류 체계** 를 제안합니다. 이는 **Data-Free Transfer** (데이터 없음), **Unsupervised Domain Transfer** (풍부한 데이터), **Episodic Test-Time Adaptation** (배치 데이터), **Online Test-Time Adaptation** (스트리밍 데이터)입니다. 각 패러다임 내에서 **텍스트 증강** , **자기 훈련** , **엔트로피 최소화** , **가상 레이블링** , **메모리 메커니즘** 등 핵심 방법론과 적응 전략을 상세히 분석합니다.

## 주요 결과
본 서베이 논문 자체는 새로운 정량적 결과를 제시하지 않지만, 범주화된 방법론들이 **이미지 분류** , **의미론적 분할** , **객체 감지** 등 다양한 태스크와 **ImageNet** , **COCO Stuff** 와 같은 벤치마크에서 **레이블 없이** **강화된 성능과 일반화 능력** 을 보여주었음을 강조합니다. 이는 기존의 VLM들이 가지는 **분포 변화(distribution shifts)** 및 **작업별 적응(task-specific adaptation)** 의 한계를 효과적으로 극복함을 시사합니다.

## AI 실무자를 위한 시사점
이 서베이는 AI/ML 엔지니어와 데이터 사이언티스트에게 데이터 가용성에 기반한 **적합한 비지도 VLM 적응 기술** 을 선택하는 데 필요한 명확한 프레임워크를 제공합니다. **높은 레이블링 비용을 절감** 하고, 실시간 및 동적 환경에서의 **VLM 배포 효율성** 을 높이는 실용적인 해결책을 탐색하는 데 중요한 가이드 역할을 합니다. 또한 **오픈 월드 시나리오** , **개인 정보 보호** , **효율적인 추론** 등 향후 연구 과제를 제시하여 산업 적용의 방향을 제안합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.