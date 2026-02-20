---
title: "[논문리뷰] Xmodel-2.5: 1.3B Data-Efficient Reasoning SLM"
excerpt: "arXiv에 게시된 'Xmodel-2.5: 1.3B Data-Efficient Reasoning SLM' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Small Language Models
  - Data Efficiency
  - Reasoning
  - Maximal-Update Parameterization
  - FP8 Mixed Precision
  - Optimizer Scheduling
  - Long-Context Adaptation
  - Agent AI

permalink: /ai/review/2025-12-01-Xmodel-2-5-1-3B-Data-Efficient-Reasoning-SLM/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19496)

**저자:** Yang Liu, Xiaolong Zhong, Ling Jiang



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)이 복잡한 다단계 추론 능력을 갖추고 있음에도 불구하고 높은 연산 요구사항으로 인해 엣지 또는 비용에 민감한 환경에서의 배포가 어렵다는 문제를 해결하고자 합니다. 이를 위해 **1.3B 파라미터** 규모의 **Xmodel-2.5** 를 개발하여, 자원 제약이 있는 환경에서 에이전트 코어로 활용될 수 있도록 데이터 효율적인 훈련을 통해 복합 추론 능력을 강화하는 것을 목표로 합니다.

## 핵심 방법론
**Xmodel-2.5** 는 하이퍼파라미터 전이를 위해 **Maximal-Update Parameterization (µP)** 을 적용하고 **Megatron-LM** 을 확장하여 이를 완벽하게 지원했습니다. 압축 효율성과 디코딩 속도 개선을 위해 **129k 토큰 DeepSeek-v3 토크나이저** 를 채택했으며, 훈련 처리량을 약 **30%** 높이는 **FP8 혼합 정밀도 훈련** 을 도입했습니다. 또한, **1.4T 토큰** 규모의 **Warmup-Stable-Decay (WSD) 학습률 스케줄** 을 사용하고, 감쇠 단계에서 옵티마이저를 **AdamW에서 Muon으로 전환** 하여 성능을 최적화했습니다.

## 주요 결과
**Xmodel-2.5** 는 13개 추론 태스크의 평균에서 **52.49%** 의 점수를 달성하여 1-2B 파라미터 모델 중 **두 번째로 우수한 성능** 을 보였습니다. 이 모델은 **Qwen3 (56.96%)** 대비 **25% 더 작은 파라미터** 와 **96% 더 적은 훈련 토큰** 을 사용했음에도 불구하고 **71%의 성능 격차를 해소** 했습니다. 특히, 감쇠 단계에서 **AdamW를 Muon으로 전환** 했을 때 13개 태스크 추론 평균이 **4.58%** 향상되었고, **FP8 혼합 정밀도** 는 훈련 처리량을 약 **30%** 증가시켰습니다.

## AI 실무자를 위한 시사점
**Xmodel-2.5** 는 AI 실무자들에게 **자원 제약이 있는 환경** 에서 복잡한 추론 기능을 요구하는 **경량 에이전트** 를 구축하기 위한 강력하고 데이터 효율적인 기준점을 제공합니다. **µP** 를 통한 하이퍼파라미터 전이 가능성과 **FP8 혼합 정밀도 훈련** 은 개발 시간과 비용을 절감하면서 모델 성능을 극대화하는 실용적인 방법을 제시합니다. 또한, **AdamW와 Muon 옵티마이저의 전략적 조합** 이 후기 단계 성능 최적화에 효과적임을 보여주며, **16k 컨텍스트 추론** 을 위한 안정적인 레시피를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.