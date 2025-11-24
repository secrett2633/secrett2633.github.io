---
title: "[논문리뷰] Tool-integrated Reinforcement Learning for Repo Deep Search"
excerpt: "Yanzhen Zou이 [arXiv]에 게시한 'Tool-integrated Reinforcement Learning for Repo Deep Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Issue Localization
  - Large Language Models (LLMs)
  - Reinforcement Learning (RL)
  - Supervised Fine-tuning (SFT)
  - Tool-integrated Agents
  - Software Engineering
  - Code Search

permalink: /ai/review/2025-8-6-Tool-integrated-Reinforcement-Learning-for-Repo-Deep-Search/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03012)

**저자:** Zexiong Ma, Chao Peng, Qunhong Zeng, Pengfei Gao, Yanzhen Zou, Bing Xie



## 핵심 연구 목표
소프트웨어 이슈 설명과 실제 결함 코드 사이의 **의미론적 간극** 및 **다중 홉 추론**으로 인해 발생하는 이슈 로컬라이제이션(결함 코드 위치 식별)의 어려움을 해결하는 것이 목표입니다. 특히, LLM 기반 에이전트가 저장소 검색 도구를 효과적으로 활용하여 **이슈 로컬라이제이션**을 수행하는 능력을 강화하고자 합니다.

## 핵심 방법론
본 논문은 **ToolTrain**이라는 두 단계 도구 통합 훈련 프레임워크를 제안합니다. 첫 번째 단계는 **재검증 샘플링된 지도 미세 조정(Rejection-sampled SFT)**으로, LLM이 도구 사용 형식과 호출 방법을 학습하도록 예열합니다. 두 번째 단계는 **도구 통합 강화 학습(Tool-integrated RL)**으로, **nDCG@k**를 보상 신호로 사용하여 LLM이 시행착오를 통해 전략적인 도구 호출 패턴과 다중 홉 추론 능력을 강화하도록 훈련합니다. 이 프레임워크는 **RepoSearcher**라는 경량 이슈 로컬라이제이션 에이전트와 함께 사용됩니다.

## 주요 결과
**ToolTrain**으로 훈련된 모델은 이슈 로컬라이제이션 태스크에서 **최첨단(SOTA)** 성능을 달성했습니다. 특히, **RepoSearcher ToolTrain-32B 모델**은 함수 레벨 로컬라이제이션에서 **Claude-3.7**을 능가하는 **Recall@5 68.55%**를 기록했습니다. 향상된 로컬라이제이션 성능은 더 나은 종단 간 이슈 해결 성능으로 이어져, **RepoSearcher ToolTrain-32B**는 **SWE-Bench-Verified**에서 **31.60% 해결률**을 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM의 도구 활용 능력**을 향상시키는 효과적인 훈련 전략을 제시하여, 복잡한 소프트웨어 개발 문제에 **LLM 기반 에이전트**를 적용하는 실질적인 방안을 제공합니다. 정량적 지표의 개선이 실제 소프트웨어 이슈 해결률 상승으로 이어짐을 입증함으로써, **자동화된 소프트웨어 개발** 분야에서 LLM의 잠재력을 강조합니다. 또한, 비교적 작은 **7B 모델**로도 대규모 모델에 필적하는 성능을 달성할 수 있음을 보여주어 **자원 효율적인 AI 시스템** 구축에 대한 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.