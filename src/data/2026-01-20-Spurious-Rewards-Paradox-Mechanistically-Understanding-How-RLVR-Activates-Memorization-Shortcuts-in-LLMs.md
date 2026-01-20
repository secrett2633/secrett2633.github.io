---
title: "[논문리뷰] Spurious Rewards Paradox: Mechanistically Understanding How RLVR Activates Memorization Shortcuts in LLMs"
excerpt: "Lecheng Yan이 [arXiv]에 게시한 'Spurious Rewards Paradox: Mechanistically Understanding How RLVR Activates Memorization Shortcuts in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RLVR
  - LLMs
  - Mechanistic Interpretability
  - Memorization Shortcuts
  - Data Contamination
  - Anchor-Adapter Circuit
  - Path Patching
  - Logit Lens

permalink: /ai/review/2026-01-20-Spurious-Rewards-Paradox-Mechanistically-Understanding-How-RLVR-Activates-Memorization-Shortcuts-in-LLMs/

toc: true
toc_sticky: true

date: 2026-01-20 00:00:00+0900+0900
last_modified_at: 2026-01-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11061)

**저자:** Lecheng Yan, Ruizhe Li, Guanhua Chen, Qing Li, Jiahui Geng, Wenxi Li, Vincent Wang, Chris Lee



## 핵심 연구 목표
본 논문은 **RLVR(Reinforcement Learning with Verifiable Rewards)** 로 튜닝된 **LLM** 이 때로는 **불량한(spurious) 보상** 에도 불구하고 성능 향상을 보이는 "Spurious Rewards Paradox" 현상을 기계론적으로 이해하는 것을 목표로 합니다. 특히, 모델이 진정한 추론 능력 대신 **훈련 데이터 암기(memorization)** 를 위한 **지름길(shortcuts)** 을 어떻게 활성화하는지 그 내부 메커니즘을 밝히고자 합니다.

## 핵심 방법론
연구팀은 **Qwen2.5-Math** 모델에서 **Path Patching** , **Logit Lens** , **Jensen-Shannon Divergence (JSD)** 분석, 그리고 **Neural Differential Equations (NDEs)** 를 포함하는 포괄적인 **메커니즘 해석(mechanistic interpretability)** 기법을 활용했습니다. 이를 통해 모델의 내부 작동을 분석하고, **"Perplexity Paradox"** (답변 토큰 perplexity는 감소하나 프롬프트 일관성은 저하되는 현상)를 통해 암기 효과를 진단했으며, 특정 **MLP 키 스케일링** 을 통한 인과적 제어 실험을 수행했습니다.

## 주요 결과
논문은 **LLM** 내부에 **"Anchor-Adapter 회로"** 를 발견했습니다. **중간 레이어(L18-L20)** 의 **Functional Anchor** 는 암기된 솔루션 검색을 촉발하고, **후기 레이어(L21+)** 의 **Structural Adapter** 는 이 신호에 맞춰 표현을 변환합니다. **Anchor 레이어** 를 리셋하면 **MATH-500** 에서 **98%에서 86%** 로, **MinervaMath** 에서 **88%에서 72%** 로 정확도가 크게 하락하는 등 **Adapter 레이어** 보다 더 중요함이 확인되었습니다. 또한, 특정 **MLP 키** 를 스케일링하여 암기 성능을 인과적으로 증폭하거나 억제할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
**AI/ML 실무자** 는 **RLVR** 튜닝 시 **데이터 오염** 과 모델의 **암기 지름길** 활성화 가능성에 대한 경각심을 가져야 합니다. 본 연구에서 제시된 **Anchor-Adapter 회로** 와 같은 **메커니즘 해석 기법** 은 **LLM** 의 성능이 진정한 추론 능력에서 비롯되는지, 아니면 단순히 **훈련 데이터** 를 암기한 결과인지를 판별하고 **데이터 오염** 문제를 식별 및 완화하는 데 중요한 도구가 될 수 있습니다. 이는 **신뢰할 수 있는(trustworthy) AI 시스템** 구축에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.