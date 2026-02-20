---
title: "[논문리뷰] DCPO: Dynamic Clipping Policy Optimization"
excerpt: "Kai Lu이 arXiv에 게시한 'DCPO: Dynamic Clipping Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM
  - Policy Optimization
  - Dynamic Clipping
  - Advantage Standardization
  - RLVR
  - Reasoning

permalink: /ai/review/2025-9-3-DCPO-Dynamic-Clipping-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02333)

**저자:** Shihui Yang, Chengfeng Dou, Peidong Guo, Kai Lu, Qiang Ju, Fei Deng, Rihui Xin



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 능력을 향상시키기 위한 **Verifiable Rewards 기반의 강화 학습(RLVR)** 에서 발생하는 기존 방법론(예: GRPO)의 한계를 해결하는 것을 목표로 합니다. 특히, 고정된 클리핑 바운드로 인한 **제로 그레디언트 문제** 와 **동일한 보상의 표준화** 로 인한 비효율적인 업데이트 문제를 개선하고자 합니다.

## 핵심 방법론
제안된 **Dynamic Clipping Policy Optimization (DCPO)** 는 두 가지 주요 혁신을 도입합니다. 첫째, **동적 클리핑 전략(Dynamic Adaptive Clipping, DAC)** 을 통해 토큰별 사전 확률에 따라 클리핑 바운드를 적응적으로 조절하여 토큰 레벨 탐색을 강화합니다. 둘째, **스무드 어드밴티지 표준화(Smooth Advantage Standardization, SAS)** 기법을 사용하여 누적 훈련 단계에 걸쳐 보상을 표준화하고 응답 레벨 활용도를 높입니다. 또한, 배치 레벨이 아닌 **응답 내 토큰 평균 손실(Only Token Mean loss, OTM)** 을 계산하여 상대적 어드밴티지 구조를 보존합니다.

## 주요 결과
DCPO는 다양한 벤치마크에서 최첨단 성능을 달성했습니다. 특히 **Qwen2.5-Math-7B 모델** 의 **AIME24 벤치마크** 에서 Avg@32가 **38.8** 로 DAPO( **31.6** )와 GRPO( **32.1** )를 능가했습니다. **Qwen2.5-14B 모델** 의 **AIME25 벤치마크** 에서는 Avg@32 **19.0** 를 달성하여 GRPO( **10.5** )와 DAPO( **15.3** )를 크게 상회했습니다. 또한, GRPO 대비 **비제로 어드밴티지 비율 28% 증가** , DAPO 대비 **훈련 효율성 2배 증가** , 토큰 클리핑 비율 **한 자릿수 감소** 를 보였습니다.

## AI 실무자를 위한 시사점
DCPO는 LLM 강화 학습의 **데이터 효율성** 과 **훈련 안정성** 을 크게 향상시키는 효과적인 방법론입니다. 특히, 낮은 확률의 희귀 토큰에 대한 탐색 능력을 높이고 **모델의 추론 능력** 을 개선하는 데 기여합니다. 이는 대규모 수학 및 코딩 문제와 같이 **반복적인 의사결정이 필요한 복잡한 추론 태스크** 에서 LLM을 최적화하는 데 실용적으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.