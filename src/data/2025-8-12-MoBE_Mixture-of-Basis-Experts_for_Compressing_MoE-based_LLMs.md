---
title: "[논문리뷰] MoBE: Mixture-of-Basis-Experts for Compressing MoE-based LLMs"
excerpt: "Jianguo Li이 [arXiv]에 게시한 'MoBE: Mixture-of-Basis-Experts for Compressing MoE-based LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts (MoE)
  - LLM Compression
  - Matrix Decomposition
  - Parameter Efficiency
  - Deep Learning
  - Memory Optimization

permalink: /ai/review/2025-8-12-MoBE_Mixture-of-Basis-Experts_for_Compressing_MoE-based_LLMs/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05257)

**저자:** Xiaodong Chen, Mingming Ha, Zhenzhong Lan, Jing Zhang, Jianguo Li



## 핵심 연구 목표
대규모 MoE 기반 LLM(예: **DeepSeek-V3-0324**, **Kimi-K2-Instruct**)의 막대한 메모리 요구사항으로 인한 배포 병목 현상을 해결하고자 합니다. 기존 MoE 압축 방식들이 높은 정확도 하락(예: **7-14%**)을 겪는 문제를 극복하여, 최소한의 성능 저하로 모델을 압축하는 새로운 방법론을 제시하는 것이 목표입니다.

## 핵심 방법론
본 논문은 MoBE(Mixture-of-Basis-Experts)를 제안합니다. 각 전문가 내의 `up/gate` 행렬 **W**를 **W = AB**로 랭크 분해합니다. 여기서 행렬 **A**는 각 전문가에 고유하며, 상대적으로 큰 행렬 **B**는 해당 MoE 레이어 내의 모든 전문가가 공유하는 기저 행렬 **{B^j}**의 선형 조합으로 재매개변수화됩니다. 이 분해는 원본 가중치 행렬에 대한 **재구성 오차를 최소화**하는 방식으로 학습되며, **Adam 최적화기**를 사용한 **경사하강법**으로 구현됩니다.

## 주요 결과
MoBE는 **MoLAE** 및 **D2-MoE**와 비교하여 일관되게 **50% 이상 낮은 재구성 MSE**를 달성했습니다. 또한, **Qwen3-235B-A22B-2507**, **DeepSeek-V3-0324**, **Kimi-K2-Instruct**와 같은 대규모 모델의 총 파라미터 수를 **24%~30%** 감소시키면서도, 원래 성능의 **98%**까지 유지하여 **1~2%**의 정확도 하락(상대적으로 약 **2%** 하락)만을 보였습니다. 이는 기존 압축 방식 대비 **4-8%** 더 높은 정확도를 보여주는 결과입니다.

## AI 실무자를 위한 시사점
MoBE는 대규모 MoE 기반 LLM의 실용적인 배포를 위한 효과적인 솔루션을 제공하며, GPU 메모리 제약을 완화하는 데 크게 기여합니다. 특히, **데이터 없이 압축이 가능**하다는 점은 실제 운영 환경에서의 유연성을 높입니다. 다만, 원본 모델 대비 미미한 정확도 하락이 존재하며, 향후 연구에서는 **지식 증류(Knowledge Distillation)** 또는 **특정 메가 커널(mega-kernel) 구현**을 통해 이러한 한계를 보완할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.