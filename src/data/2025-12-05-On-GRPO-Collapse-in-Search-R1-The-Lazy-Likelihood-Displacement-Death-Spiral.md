---
title: "[논문리뷰] On GRPO Collapse in Search-R1: The Lazy Likelihood-Displacement Death Spiral"
excerpt: "Christos Thrampoulidis이 arXiv에 게시한 'On GRPO Collapse in Search-R1: The Lazy Likelihood-Displacement Death Spiral' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Tool-Integrated Reasoning (TIR)
  - GRPO
  - Training Stability
  - Lazy Likelihood Displacement (LLD)
  - Regularization
  - Search-R1

permalink: /ai/review/2025-12-05-On-GRPO-Collapse-in-Search-R1-The-Lazy-Likelihood-Displacement-Death-Spiral/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04220)

**저자:** Wenlong Deng, Yushu Li, Boying Gong, Yi Ren, Christos Thrampoulidis, Xiaoxiao Li



## 핵심 연구 목표
본 논문은 **GRPO(Group Relative Policy Optimization) 기반의 툴 통합 강화 학습(TIRL)** , 특히 **Search-R1** 프레임워크에서 발생하는 고질적인 훈련 붕괴 문제의 근본 원인을 파악하고 해결하는 것을 목표로 합니다. 기존 연구에서 경험적으로만 관찰된 붕괴 현상의 메커니즘을 규명하고, LLM의 안정적이고 확장 가능한 훈련을 위한 실용적인 해결책을 제시하고자 합니다.

## 핵심 방법론
연구는 **Lazy Likelihood Displacement (LLD)** 를 훈련 실패의 핵심 메커니즘으로 지목하며, 이는 정답 및 오답 응답 모두의 likelihood가 체계적으로 감소하거나 정체되는 현상입니다. **LLD** 가 저신뢰 응답, 기울기 증폭, 엔트로피 폭발, 그리고 최종적으로 훈련 붕괴로 이어지는 **LLD Death Spiral** 을 유발한다는 것을 경험적으로 특성화했습니다. 이를 해결하기 위해, likelihood 감소 시에만 활성화되고 감소를 유발하는 토큰에만 페널티를 부과하는 경량의 **likelihood-preserving regularization (LLDS)** 를 제안했습니다.

## 주요 결과
**LLDS** 는 **Qwen2.5-3B** 모델에서 **+37.8%** 의 성능 향상을, **Qwen2.5-7B** 모델에서 **+32.0%** 의 성능 향상을 달성하며 GRPO 훈련의 안정성을 크게 개선했습니다. 7개의 개방형 및 다단계 QA 벤치마크에서 **gradient explosion** 을 방지하고 훈련 붕괴를 성공적으로 해결하여, 모든 모델 크기와 정렬 단계에서 GRPO의 훈련 불안정성이 지속적으로 완화됨을 입증했습니다. 또한, **LLDS-MA(Masking Answer Tokens)** 변형은 모델이 단일 검색 호출에만 의존하는 경향을 보일 때 **다단계 추론** 능력을 더욱 향상시키는 효과를 보였습니다.

## AI 실무자를 위한 시사점
**GRPO 기반 TIRL** 의 고질적인 훈련 불안정성 문제를 **LLD** 라는 새로운 관점에서 진단하고, 이를 효과적으로 해결하는 **LLDS** 를 제시하여 LLM 에이전트의 안정적인 개발 및 배포를 위한 실용적인 솔루션을 제공합니다. 특히, **툴 사용** 이 복잡하고 **OOD(Out-Of-Distribution) 토큰** 이 많은 환경에서 LLM 훈련 시 **likelihood dynamics** 를 면밀히 모니터링하고, 필요에 따라 **LLDS** 와 같은 **정규화 기법** 을 적용하여 **모델 붕괴** 를 사전에 방지하는 것이 중요합니다. **LLDS** 의 **response-level gating** 및 **token-level selectivity** 디자인은 최적화에 미치는 간섭을 최소화하면서도 LLD를 효과적으로 완화하여, 실제 LLM 기반 에이전트 개발 시 **훈련 안정성** 과 **성능 향상** 을 동시에 추구할 수 있는 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.