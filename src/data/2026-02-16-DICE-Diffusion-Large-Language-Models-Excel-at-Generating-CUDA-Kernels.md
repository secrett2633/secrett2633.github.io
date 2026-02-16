---
title: "[논문리뷰] DICE: Diffusion Large Language Models Excel at Generating CUDA Kernels"
excerpt: "Zhiqiang Tao이 [arXiv]에 게시한 'DICE: Diffusion Large Language Models Excel at Generating CUDA Kernels' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion LLM
  - CUDA Kernel Generation
  - Reinforcement Learning
  - Code Generation
  - High-Performance Computing
  - Bi-phase Curated RL
  - CuKe Dataset

permalink: /ai/review/2026-02-16-DICE-Diffusion-Large-Language-Models-Excel-at-Generating-CUDA-Kernels/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11715)

**저자:** Haolei Bai, Lingcheng Kong, Xueyi Chen, Jianmian Wang, Zhiqiang Tao, Huan Wang



## 핵심 연구 목표
본 연구는 고도로 전문화된 **CUDA 커널 생성** 태스크에서 **diffusion large language models (dLLMs)** 의 잠재력을 탐색하고, 이 분야의 고품질 학습 데이터 부족 및 dLLM의 적합성 문제를 해결하는 것을 목표로 합니다. 특히, 기존 LLM의 **autoregressive (AR)** 방식의 한계를 극복하고 병렬 토큰 생성을 통해 보다 효율적이고 정확한 커널 생성을 실현하고자 합니다.

## 핵심 방법론
연구팀은 고성능 CUDA 커널에 최적화된 증강된 **지도 학습 미세 조정(SFT) 데이터셋인 CuKe** 를 구축했습니다. 이를 바탕으로 **BiC-RL (Bi-phase Curated Reinforcement Learning)** 이라는 새로운 강화 학습 프레임워크를 제안하며, 이는 **CUDA 커널 인필링(infilling)** 과 **엔드투엔드 CUDA 커널 생성** 두 단계로 구성됩니다. 이 프레임워크를 활용하여 **DICE** 라는 1.7B, 4B, 8B 세 가지 스케일의 dLLM 시리즈를 개발했습니다.

## 주요 결과
**KernelBench** 에 대한 광범위한 실험 결과, **DICE 모델** 은 유사한 스케일의 AR 및 diffusion LLM을 모두 능가하는 **최고 수준의 성능** 을 달성했습니다. 특히, **DICE-8B** 는 **cudaLLM** 과 비교 가능한 결과를 보이며, **Gemini-3-Pro** 와 같은 강력한 상용 모델을 뛰어넘었습니다. 또한, **BiC-RL 프레임워크** 는 학습 효율성과 수렴 안정성을 크게 향상시키고, **CuKe 데이터셋** 은 데이터 효율적인 스케일링을 가능하게 하여 데이터 볼륨보다 **고성능 샘플의 전략적 통합** 이 중요함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **dLLM** 이 기존 **AR LLM** 을 넘어 고성능 컴퓨팅(HPC) 분야의 전문화된 코드 생성, 특히 **CUDA 커널 생성** 에서 강력한 대안이 될 수 있음을 보여줍니다. **CuKe** 와 같은 고품질, 전문화된 데이터셋 구축과 **BiC-RL** 같은 계층적 강화 학습 전략은 복잡한 도메인에서 모델의 성능과 안정성을 극대화하는 데 필수적입니다. 이는 AI 시스템의 효율성을 높이고 에너지 소비를 줄여 지속 가능한 AI 인프라 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.