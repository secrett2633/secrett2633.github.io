---
title: "[논문리뷰] A Glimpse to Compress: Dynamic Visual Token Pruning for Large
  Vision-Language Models"
excerpt: "Zuxuan Wu이 [arXiv]에 게시한 'A Glimpse to Compress: Dynamic Visual Token Pruning for Large
  Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Visual Token Pruning
  - Large Vision-Language Models (LVLMs)
  - Dynamic Compression
  - Glimpse Token
  - Reinforcement Learning (RL)
  - VQA
  - Computational Efficiency

permalink: /ai/review/2025-8-5-A_Glimpse_to_Compress__Dynamic_Visual_Token_Pruning_for_Large __Vision-Language_Models/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01548)

**저자:** Quan-Sheng Zeng, Yunheng Li, Qilong Wang, Peng-Tao Jiang, Zuxuan Wu, Ming-Ming Cheng, Qibin Hou

**키워드:** `Visual Token Pruning`, `Large Vision-Language Models (LVLMs)`, `Dynamic Compression`, `Glimpse Token`, `Reinforcement Learning (RL)`, `VQA`, `Computational Efficiency`

## 핵심 연구 목표
본 논문은 대규모 시각-언어 모델(LVLMs)이 고해상도 입력을 처리할 때 발생하는 시각 토큰 폭증으로 인한 비효율성과 컴퓨테이션 부담 문제를 해결하고자 합니다. 특히, 기존의 고정된 압축률 방식이나 수작업으로 설계된 프루닝 방법이 다양한 복잡성의 장면에 적응하지 못하고 정보 손실을 야기하여 모델 성능 저하를 초래하는 한계를 극복하기 위한 동적이고 데이터 기반의 시각 토큰 프루닝 방법을 개발하는 것이 주된 목표입니다.

## 핵심 방법론
제안하는 **GlimpsePrune** 프레임워크는 인간의 인지 과정에서 영감을 받아, 답변 생성 전 단일 순방향 패스에서 관련 없는 시각 토큰을 가지치기합니다. 프리필링(prefilling) 단계에서 **학습 가능한 "glimpse token"**을 삽입하고, LLM 디코더의 초기 **K 계층**을 통과하며 얻은 cross-attention 점수를 경량의 **시각 중요도 예측기(VIP)**에 입력하여 중요도를 학습합니다. 이를 바탕으로 관련 없는 시각 토큰을 **한 번에 가지치기**하며, **강화 학습(GRPO)**을 통해 미세 조정된 **GlimpsePrune+** 버전으로 성능을 더욱 향상시킵니다.

## 주요 결과
GlimpsePrune은 평균 **92.6%**의 시각 토큰을 가지치기하면서도 자유 형식 VQA 태스크에서 기준 모델의 **100% 성능**을 유지하는 놀라운 효율성을 보여주었습니다. 특히, 향상된 **GlimpsePrune+**는 유사한 높은 가지치기 비율을 유지하면서 기준 모델 성능의 **110%**에 도달했습니다. 이로 인해 프리필링 연산 비용은 기준 대비 **69.1%**로 감소했으며, KV 캐시 길이는 **5,073.9개에서 202.5개 토큰으로** 대폭 줄었습니다.

## AI 실무자를 위한 시사점
이 연구는 LVLM의 **고해상도 입력 처리 효율성**을 크게 개선하여, 컴퓨팅 자원이 제한된 환경에서도 강력한 모델을 구축할 수 있는 실용적인 해결책을 제시합니다. 동적 시각 토큰 프루닝은 모델이 다양한 시각적 복잡성에 유연하게 대응하게 하여 **정확도를 유지하면서도 자원 효율성을 극대화**합니다. 또한, 가지치기 메커니즘을 통한 효율성 증대는 **강화 학습 기반의 미세 조정**을 더욱 효과적으로 가능하게 하여 LVLM의 응용 범위를 넓히는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.