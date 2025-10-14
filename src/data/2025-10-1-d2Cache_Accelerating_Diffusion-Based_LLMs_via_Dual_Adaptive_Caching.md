---
title: "[논문리뷰] d^2Cache: Accelerating Diffusion-Based LLMs via Dual Adaptive Caching"
excerpt: "Jiarui Wang이 [arXiv]에 게시한 'd^2Cache: Accelerating Diffusion-Based LLMs via Dual Adaptive Caching' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Large Language Models (LLMs)
  - Inference Acceleration
  - KV Cache
  - Bidirectional Attention
  - Adaptive Caching
  - Token Selection

permalink: /ai/review/2025-10-1-d2Cache_Accelerating_Diffusion-Based_LLMs_via_Dual_Adaptive_Caching/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23094)

**저자:** Yuchu Jiang, Yue Cai, Xiangzhong Luo, Jiale Fu, Jiarui Wang, Chonghan Liu, Xu Yang



## 핵심 연구 목표
확산 기반 대규모 언어 모델(dLLM)은 양방향 어텐션 구조 때문에 표준 **Key-Value(KV) 캐시**의 이점을 활용하지 못해 추론 효율성이 떨어진다는 문제를 해결하는 것이 목표입니다. 이 연구는 dLLM의 추론 속도를 크게 높이면서도 생성 품질을 유지하거나 향상시킬 수 있는 훈련 없는 **근사 KV 캐시 프레임워크**를 개발하고자 합니다.

## 핵심 방법론
제안된 **d²Cache**는 각 디코딩 단계에서 토큰의 KV 상태를 적응적으로 업데이트하기 위해 **두 단계의 세밀한 토큰 선택 전략**을 사용합니다. 첫 번째 단계인 **Certainty prior-guided selection**에서는 예측 신뢰도와 주변 알려진 토큰의 밀도를 기반으로 마스크된 토큰 중 KV 상태가 급변할 가능성이 있는 토큰을 선별합니다. 두 번째 단계인 **Attention-aware selection**에서는 **어텐션 롤아웃**을 통해 높은 어텐션 활성화를 보이는 프롬프트 및 디코딩된 토큰을 식별하여 KV 상태를 업데이트하고, 나머지 토큰의 KV 상태는 재사용을 위해 캐시합니다.

## 주요 결과
**d²Cache**는 **LLaDA-Inst** 및 **Dream-Inst**와 같은 대표적인 dLLM에서 **Vanilla** 대비 평균 **3.2x–4.0x의 추론 속도 향상**을 달성했습니다. 특히, **Dream-Inst** 모델과 **GSM8K** 데이터셋에서 추론 처리량은 **초당 2.62 토큰에서 12.25 토큰으로 증가**하여 **4.7배의 속도 향상**을 보였습니다. 이러한 속도 향상과 더불어, 모든 모델 및 데이터셋에서 **Fast-dLLM** 대비 평균 **+3.2%의 정확도**를 유지하거나 더 나은 생성 품질을 제공했습니다.

## AI 실무자를 위한 시사점
**d²Cache**는 dLLM의 주요 추론 병목 현상을 해결함으로써 **dLLM의 실제 배포 및 활용 가능성**을 크게 높입니다. 이 **훈련 없는 캐싱 전략**은 기존 dLLM에 쉽게 통합될 수 있으며, **연산 비용을 절감**하고 **생성 품질을 향상**시키는 실용적인 이점을 제공합니다. 마스크된 토큰의 KV 상태 변화 패턴과 어텐션 분포를 활용한 **세밀한 토큰 수준의 캐싱 접근 방식**은 리소스 효율적인 dLLM 운영을 위한 핵심적인 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.