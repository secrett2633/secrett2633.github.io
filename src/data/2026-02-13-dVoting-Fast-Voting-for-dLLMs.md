---
title: "[논문리뷰] dVoting: Fast Voting for dLLMs"
excerpt: "이 [arXiv]에 게시한 'dVoting: Fast Voting for dLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - dLLMs
  - Diffusion Models
  - Test-Time Scaling
  - Voting
  - Reasoning
  - Masked Language Models
  - Parallel Decoding
  - Remasking

permalink: /ai/review/2026-02-13-dVoting-Fast-Voting-for-dLLMs/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12153)

**저자:** Sicheng Feng, Zigeng Chen, Xinyin Ma, Gongfan Fang, Xinchao Wang



## 핵심 연구 목표
본 논문은 확산 대규모 언어 모델( **dLLMs** )의 추론 능력을 훈련 없이 향상시키면서 기존 테스트 시간 스케일링 기법의 비효율성으로 인한 높은 추론 비용 문제를 해결하는 것을 목표로 합니다. 특히, dLLMs의 유연한 디코딩 프로세스를 활용하여 병렬 테스트 시간 스케일링의 잠재력을 최대한 발휘하고자 합니다.

## 핵심 방법론
제안하는 **DVOTING** 은 반복적인 정제 기법으로, 여러 샘플에서 토큰 예측의 일관성을 분석하여 불확실한 토큰을 식별합니다. 식별된 토큰은 **재마스킹(remasking)** 을 통해 재생성되며, 이 과정은 수렴할 때까지 반복됩니다. 최종적으로는 **다수결 투표(majority voting)** 를 통해 후보 답변들을 취합하고, **엔트로피 임계값 기반 병렬 디코딩** 을 사용하여 효율성을 높입니다.

## 주요 결과
DVOTING은 다양한 벤치마크에서 일관된 성능 향상을 보였습니다. **GSM8K** 에서 **6.22%-7.66%** , **MATH500** 에서 **4.40%-7.20%** , **ARC-C** 에서 **3.16%-14.84%** , **MMLU** 에서 **4.83%-5.74%** 의 성능 향상을 달성했습니다. 특히, LLaDA 모델에서 더 적은 추론 비용으로 우수한 성능-효율성 트레이드오프를 보여주었습니다.

## AI 실무자를 위한 시사점
DVOTING은 **훈련 없이** dLLMs의 추론 성능을 향상시키는 간단하면서도 효율적인 방법을 제공하여, 제한된 연산 예산 내에서 테스트 시간 스케일링을 현실적으로 만듭니다. dLLMs의 **재마스킹 메커니즘** 을 활용한 불확실한 토큰의 선택적 정제는 효율적인 리소스 활용 방안을 제시하며, 향후 온디바이스 추론 및 대규모 서비스에 적용될 잠재력을 가지고 있습니다. 또한, 이 방법론은 다양한 하이퍼파라미터 설정에서도 강건함을 보입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.