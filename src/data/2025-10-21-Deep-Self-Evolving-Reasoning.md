---
title: "[논문리뷰] Deep Self-Evolving Reasoning"
excerpt: "이 [arXiv]에 게시한 'Deep Self-Evolving Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Self-Evolving Reasoning
  - LLMs
  - Iterative Reasoning
  - Markov Chain
  - Self-Verification
  - Self-Refinement
  - Mathematical Reasoning
  - AIME Benchmark

permalink: /ai/review/2025-10-21-Deep-Self-Evolving-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17498)

**저자:** Zihan Liu*1, Shun Zheng*†2, Xumeng Wen*2, Yang Wang2, Jiang Bian², Mao Yang2



## 핵심 연구 목표
본 연구는 개방형 소형 언어 모델(LLM)이 어려운 추론 작업에서 취약한 검증 및 교정 능력으로 인해 한계에 부딪히는 문제를 해결하고자 합니다. **Deep Self-Evolving Reasoning (DSER)** 이라는 확률론적 패러다임을 통해 이러한 모델의 추론 한계를 크게 확장하고, 약한 능력으로도 올바른 답에 점근적으로 도달할 수 있도록 하는 것을 목표로 합니다.

## 핵심 방법론
반복적 추론을 각 단계가 솔루션 공간의 확률론적 전환을 나타내는 **마르코프 연쇄** 로 개념화합니다. 개선될 확률( **_p_IC** )이 저하될 확률( **_p_CI** )을 미미하게 초과하는 한 올바른 솔루션으로의 수렴이 보장된다는 핵심 통찰을 바탕으로, 여러 장기적인 자가 진화 프로세스를 병렬로 실행합니다. 각 단계는 **검증 단계** 와 **개선 단계** 로 구성되며, **DeepSeek-R1-0528-Qwen3-8B (DS-8B)** 모델을 사용하여 **AIME 2024-2025** 벤치마크에서 평가되었습니다.

## 주요 결과
**DSER** 은 **DS-8B** 모델이 이전에 풀 수 없었던 **AIME 2024-2025 문제 중 9개 중 5개** 를 해결할 수 있게 했으며, 그중 하나는 초기 **Pass@1이 0** 인 문제였습니다. 전체 **Pass@1 정확도는 AIME 2024에서 6.5%** , **AIME 2025에서 9.0%** 향상되었습니다. 특히, 이 **8B 매개변수 모델** 은 다수결 투표를 통해 **600B 매개변수 교사 모델** 의 **Pass@1 성능을 능가** 했습니다. 한 문제 해결에 **80회 반복** 동안 약 **1천만 개의 추론 토큰** 이 소모되었습니다.

## AI 실무자를 위한 시사점
DSER은 개방형 LLM이 제한적인 자체 교정 능력에도 불구하고 복잡한 추론 작업에서 능력을 크게 확장할 수 있음을 입증하여, **고급 AI 추론의 민주화** 에 중요한 기여를 합니다. 이는 **모델 규모와 추론 시간 계산량 간의 효율적인 균형점** 을 제시하며, 작은 모델도 심층적인 반복 추론을 통해 큰 모델의 성능에 필적할 수 있음을 시사합니다. 또한, 견고한 자기 비판 및 건설적인 자기 교정을 장려하는 **새로운 훈련 목표의 필요성** 을 강조하여 향후 LLM 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.