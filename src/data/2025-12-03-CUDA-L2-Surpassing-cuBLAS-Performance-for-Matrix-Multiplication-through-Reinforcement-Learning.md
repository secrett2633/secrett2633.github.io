---
title: "[논문리뷰] CUDA-L2: Surpassing cuBLAS Performance for Matrix Multiplication through Reinforcement Learning"
excerpt: "arXiv에 게시된 'CUDA-L2: Surpassing cuBLAS Performance for Matrix Multiplication through Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - CUDA
  - Matrix Multiplication
  - Reinforcement Learning
  - LLMs
  - Kernel Optimization
  - HGEMM
  - GPU Performance
  - cuBLAS

permalink: /ai/review/2025-12-03-CUDA-L2-Surpassing-cuBLAS-Performance-for-Matrix-Multiplication-through-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02551)

**저자:** Songqiao Su, Xiaofei Sun, Xiaoya Li, Albert Wang, Jiwei Li and Chris Shum



## 핵심 연구 목표
본 연구의 핵심 목표는 **반정밀 일반 행렬 곱셈(HGEMM) CUDA 커널** 의 수동 최적화가 어려운 문제를 해결하고, **cuBLAS** 와 같은 기존의 고도로 최적화된 라이브러리보다 뛰어난 성능을 달성하는 자동화된 최적화 시스템인 **CUDA-L2** 를 개발하는 것입니다. 특히 다양한 행렬 차원(M, N, K)과 GPU 아키텍처에서 일반화 가능한 성능 향상을 목표로 합니다.

## 핵심 방법론
**CUDA-L2** 는 **LLMs** 와 **강화 학습(RL)** 을 결합하여 CUDA 커널을 자동 최적화합니다. 이는 (1) 더 다양한 CUDA 코드를 사용한 **지속적인 사전 훈련** , (2) 일반 커널 유형에서 행렬 곱셈 특정 커널로 진행되는 **다단계 RL 훈련** , (3) **NCU 프로파일링 지표** (메모리 처리량, SM 점유율, 캐시 효율성 등)를 컨텍스트에 포함, (4) **검색 증강 컨텍스트** 통합을 통해 기존 **CUDA-L1** 을 확장합니다. 커널 실행 속도를 RL 보상으로 사용하며, 수치 편차 및 코드 길이에는 페널티를 부여합니다.

## 주요 결과
**CUDA-L2** 는 **A100 GPU** 에서 1,000개 HGEMM 구성에 대해 기존 주요 **matmul** **베이스라인을 일관적으로 능가** 했습니다. 오프라인 모드에서는 **torch.matmul 대비 평균 +22.0%** , **cuBLAS 대비 +19.2%** , **cuBLASLt-heuristic 대비 +16.8%** , 그리고 가장 경쟁력 있는 **cuBLASLt-AutoTuning 대비 +11.4%** 의 속도 향상을 보였습니다. 서버 모드에서는 이러한 성능 향상이 각각 **+28.7%, +26.0%, +22.4%, +15.9%** 로 더욱 증가하여 실시간 추론 시 상당한 이점을 입증했습니다.

## AI 실무자를 위한 시사점
**CUDA-L2** 는 **LLM-guided RL 자동화** 가 **HGEMM** 과 같이 성능에 민감하고 고도로 최적화된 CUDA 커널에서도 인간의 수동 최적화로는 비실용적인 규모의 구성 공간을 탐색하여 우수한 구현을 발견할 수 있음을 보여줍니다. 이는 **AI/ML 워크로드** 에서 행렬 곱셈 성능을 크게 향상시킬 수 있는 잠재력을 가지며, 향후 **Ada Lovelace, Hopper, Blackwell** 등 다른 GPU 아키텍처로 확장될 경우 더 광범위한 적용 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.