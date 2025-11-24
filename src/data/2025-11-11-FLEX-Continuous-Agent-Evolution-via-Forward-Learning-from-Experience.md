---
title: "[논문리뷰] FLEX: Continuous Agent Evolution via Forward Learning from Experience"
excerpt: "Jiangjie Chen이 [arXiv]에 게시한 'FLEX: Continuous Agent Evolution via Forward Learning from Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Continuous Learning
  - Experience Library
  - Forward Learning
  - Meta-MDP
  - Knowledge Distillation
  - Non-parametric Adaptation

permalink: /ai/review/2025-11-11-FLEX-Continuous-Agent-Evolution-via-Forward-Learning-from-Experience/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06449)

**저자:** Zhicheng Cai, Xinyuan Guo, Yu Pei, Jiangtao Feng, Jiangjie Chen, Ya-Qin Zhang, Wei-Ming Ma, Mingxuan Wang, Hao Zhou



## 핵심 연구 목표
본 논문의 핵심 목표는 기존 LLM(Large Language Model) 에이전트의 고정된 특성, 경험 기반 학습의 부재, 파라미터 최적화의 높은 비용 및 카타스트로픽 망각 문제점을 해결하는 것입니다. 특히, 파라미터 튜닝 없이 에이전트가 **지속적으로 진화**하고 새로운 경험을 통해 **스스로 학습**할 수 있는 새로운 패러다임을 제안합니다.

## 핵심 방법론
FLEX는 **Gradient 기반 업데이트** 대신 **'경험 라이브러리(experience library)'**를 구축하고 활용하는 **'Forward Learning' 패러다임**을 제안합니다. 이 방법론은 **Meta-level MDP (Markov Decision Process)**로 공식화되며, **Actor**가 환경에서 **'Extensive Experience Exploration'**을 통해 상호작용 궤적을 생성하고, **Updater**가 이를 증류하여 경험 라이브러리에 통합합니다. 이후 에이전트는 라이브러리에서 **가장 관련성 높은 경험**을 검색하여 새로운 태스크에 대한 **'Forward Reasoning'**을 안내하며 지속적으로 성능을 향상시킵니다.

## 주요 결과
FLEX는 **AIME25** 벤치마크에서 **Claude-Sonnet-4**의 정확도를 **40%에서 63.3%(+23.3%)**로, **USPTO50k**에서 **Claude-Sonnet-4.5**의 정확도를 **20%에서 30%(+10.0%)**로 크게 향상시켰습니다. 또한, **ProteinGym**에서는 **Claude-Sonnet-4**의 Spearman's ρ를 **0.460에서 0.597(+0.137)**로 증가시키며 우수한 성능을 입증했습니다. 경험 라이브러리 크기 증가에 따른 **스케일링 법칙**을 통해 **GSM8k**에서 훈련 정확도가 **81.2%에서 94.2%**로, 테스트 정확도가 **81.3%에서 83.3%**로 꾸준히 개선됨을 보여주었습니다.

## AI 실무자를 위한 시사점
FLEX는 LLM 에이전트의 **지속적인 학습과 적응 능력**을 강화하기 위한 강력한 **매개변수-독립적(parameter-free) 접근 방식**을 제공합니다. 이는 고가의 **파라미터 튜닝 없이**도 모델 성능을 효과적으로 개선할 수 있는 실용적인 방법을 제시하며, **경험 라이브러리의 전이 가능성**을 통해 **다양한 에이전트 간 지식 공유** 및 **재사용**의 새로운 길을 열어줍니다. 이를 통해 AI 시스템 개발의 **비용 효율성**과 **확장성**을 크게 높일 수 있을 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.