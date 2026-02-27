---
title: "[논문리뷰] Efficient Continual Learning in Language Models via Thalamically Routed Cortical Columns"
excerpt: "Afshin Khadangi이 [arXiv]에 게시한 'Efficient Continual Learning in Language Models via Thalamically Routed Cortical Columns' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Continual Learning
  - Language Models
  - Sparse Routing
  - Cortical Columns
  - Thalamic Routing
  - Catastrophic Forgetting
  - Stability-Plasticity

permalink: /ai/review/2026-02-27-Efficient-Continual-Learning-in-Language-Models-via-Thalamically-Routed-Cortical-Columns/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22479)

**저자:** Afshin Khadangi



## 핵심 연구 목표
배포된 언어 모델(LLMs)이 비정상 데이터(non-stationary data) 환경에서 겪는 **치명적 망각(catastrophic forgetting)** 문제를 해결하고, 기존의 높은 지연 시간, 메모리 사용량, 밀집 연산 문제를 야기하는 지속 학습 방법론의 한계를 극복하고자 합니다. 궁극적으로 아키텍처 수준에서 **안정성-유연성(stability-plasticity) 균형** 을 최적화하여 효율적인 지속 학습을 달성하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **TRC2 (Thalamically Routed Cortical Columns)** 라는 디코더-온리 백본을 제안합니다. TRC2는 토큰당 상위 k개 **피질 컬럼(cortical columns)** 을 선택하는 희소한 **시상 라우팅(thalamic routing)** 과 **위상 인식 사전(topology-aware prior)** 을 통한 시간적 연속성 메커니즘을 결합합니다. 또한, **변조(modulation)** , **예측(prediction)** , **메모리(memory)** , **피드백(feedback)** 기능과 함께 느린 피질 파라미터를 안정화하면서 빠른 온라인 조정을 지원하는 **빠른 보정 경로(fast corrective pathway)** 를 포함합니다.

## 주요 결과
**TRC2** 는 언어 모델링 및 지속 학습 벤치마크에서 기존 Transformer 및 Mamba 베이스라인과 유사한 연산량으로 **안정성-유연성 균형을 크게 개선** 했습니다. 특히, 스트리밍 도메인 변화 환경에서 **정규화된 망각(normalized forgetting) AUC** 가 PPL에서 **0.0018** , Bleu에서 **0.0981** 로 베이스라인보다 현저히 낮아, 이전에 학습된 행동을 더 일관되게 유지함을 입증했습니다. 다만, 처리량(throughput)은 Transformer의 약 **127000 tokens/s** 대비 **57000 tokens/s** 로 다소 낮게 측정되었습니다.

## AI 실무자를 위한 시사점
**TRC2** 는 아키텍처 수준에서 지속 학습 문제를 해결하여 LLM이 변화하는 실제 환경에서 **장기적으로 유용하게 기능** 할 수 있는 가능성을 제시합니다. **희소 라우팅** 과 **청크 병렬 실행 전략** 은 모델의 효율적인 학습 및 추론을 가능하게 하여, 제한된 컴퓨팅 자원이나 실시간 응답이 중요한 시나리오에서 특히 유용할 수 있습니다. **빠른 보정 경로** 의 도입은 모델의 핵심 지식을 보존하면서도 새로운 데이터에 빠르게 적응할 수 있는 실용적인 방법론을 제공하여, 모델 업데이트 및 배포 전략 수립에 중요한 통찰을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.