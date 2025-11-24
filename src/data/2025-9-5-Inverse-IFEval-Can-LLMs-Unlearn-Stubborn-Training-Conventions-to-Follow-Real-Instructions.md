---
title: "[논문리뷰] Inverse IFEval: Can LLMs Unlearn Stubborn Training Conventions to Follow
  Real Instructions?"
excerpt: "Yu Fu이 [arXiv]에 게시한 'Inverse IFEval: Can LLMs Unlearn Stubborn Training Conventions to Follow
  Real Instructions?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - Instruction Following
  - Benchmark
  - Cognitive Inertia
  - Out-of-Distribution
  - Supervised Fine-Tuning
  - Evaluation
  - Robustness

permalink: /ai/review/2025-9-5-Inverse-IFEval-Can-LLMs-Unlearn-Stubborn-Training-Conventions-to-Follow-Real-Instructions/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04292)

**저자:** Qinyan Zhang, Xinping Lei, Ruijie Miao, Yu Fu, Haojie Fan, Le Chang, Jiafan Hou, Dingling Zhang, Zhongfei Hou, Ziqiang Yang, Changxin Pu, Fei Hu, Jingkai Liu, Mengyun Liu, Yang Liu, Xiang Gao



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 지도 미세 조정(SFT) 과정에서 학습한 표준화된 패턴과 상충하는 지시를 따르는 데 어려움을 겪는 "**인지적 관성**" 문제를 해결하고자 합니다. 이를 평가하기 위해 LLM의 **반직관적 능력(Counter-intuitive Ability)**을 측정하는 새로운 벤치마크 **Inverse IFEval**을 제안하며, 훈련으로 인한 편향을 극복하고 비정형적인 지시를 따를 수 있는지 확인하는 것을 목표로 합니다.

## 핵심 방법론
**Inverse IFEval** 벤치마크는 **질문 교정, 의도적인 텍스트 결함, 주석 없는 코드, 반관습적 형식** 등 8가지 유형의 반직관적 지시를 도입합니다. 이 벤치마크는 인간 참여 파이프라인(전문가 초기 질문 설계, LLM 기반 생성, 자동 필터링, 전문가 검토)을 통해 **23개 도메인에 걸친 1012개의 고품질 중국어 및 영어 질문**으로 구성됩니다. 평가는 최적화된 **LLM-as-a-Judge 프레임워크**를 사용하며, 최종 판정 정확도는 **98%**에 달합니다.

## 주요 결과
실험 결과, **03-high 모델**이 **Inverse IFEval**에서 가장 우수한 성능을 보였으며, 기존의 미세 조정된 모델(예: **Qwen3-235B-A22B-Instruct**)은 낮은 성능을 기록하여 벤치마크의 의도된 목적을 확인했습니다. **"사고(thinking)" 메커니즘**을 가진 모델(예: **Gemini-2.5-pro**)이 그렇지 않은 모델보다 우수했으며, 매개변수가 더 큰 LLM(**Qwen3 시리즈**)이 더 나은 성능을 보이는 경향이 있었습니다. 특히, 모델들은 **반사실적 답변(Counterfactual Answering)**에서는 비교적 잘 수행했으나, **질문 교정(Question Correction)**에서 가장 어려움을 겪었습니다.

## AI 실무자를 위한 시사점
현재 LLM은 기존 환경에서는 우수하지만, **인지적 관성**과 **SFT 패턴에 대한 과적합**으로 인해 **비전형적인(OOD) 지시**에 대한 견고성이 부족함을 시사합니다. 미래의 LLM 정렬 노력은 단순히 유창성과 사실적 정확성뿐만 아니라 예측 불가능한 실세계 시나리오에서 **명령 준수 신뢰성**을 높이기 위한 **적응성**을 고려해야 합니다. **Inverse IFEval**은 LLM의 한계를 진단하고, 인지적 관성을 완화하며 과적합을 줄이는 방법론 개발의 토대가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.