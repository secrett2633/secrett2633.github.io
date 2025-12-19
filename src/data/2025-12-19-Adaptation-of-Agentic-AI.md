---
title: "[논문리뷰] Adaptation of Agentic AI"
excerpt: "Zhiyi Shi이 [arXiv]에 게시한 'Adaptation of Agentic AI' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Adaptation
  - Agent Adaptation
  - Tool Adaptation
  - Reinforcement Learning
  - Fine-tuning
  - Modular AI

permalink: /ai/review/2025-12-19-Adaptation-of-Agentic-AI/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16301)

**저자:** Pengcheng Jiang, Jiacheng Lin, Zhiyi Shi, Zifeng Wang, Luxi He, Yichen Wu, Ming Zhong, Peiyang Song, Qizheng Zhang, Heng Wang, Xueqiang Xu, Hanwen Xu, Pengrui Han, Dylan Zhang, Jiashuo Sun, Chaoqi Yang, Kun Qian, Tian Wang, Changran Hu, Manling Li, Quanzheng Li, Hao Peng, Sheng Wang, Jingbo Shang, Chao Zhang, Jiaxuan You, Liyuan Liu, Pan Lu, Yu Zhang, Heng Ji, Yejin Choi, Dawn Song, Jimeng Sun, Jiawei Han



## 핵심 연구 목표
본 논문은 급성장하는 에이전트 AI 시스템의 **적응(adaptation)** 연구 분야를 체계적인 프레임워크로 통합하고, 에이전트 적응과 툴 적응 모두를 포괄하는 통일된 관점을 제공하는 것을 목표로 합니다. 이를 통해 적응 전략의 설계 공간을 명확히 하고, 트레이드오프를 설명하며, 실제 시스템 설계에 대한 실용적인 지침을 제시하고자 합니다.

## 핵심 방법론
연구진은 에이전트 AI 적응 전략을 **에이전트 적응 (A1, A2)** 과 **툴 적응 (T1, T2)** 의 두 가지 주요 범주로 분류하는 **통합 프레임워크** 를 제안합니다. **A1 (툴 실행 신호 기반 에이전트 적응)** 은 툴 실행 결과에서 오는 검증 가능한 피드백으로 에이전트를 최적화하며, **A2 (에이전트 출력 신호 기반 에이전트 적응)** 는 에이전트 자체의 최종 출력 평가를 사용합니다. **T1 (에이전트 독립적 툴 적응)** 은 고정된 에이전트와 독립적으로 툴을 훈련하고, **T2 (에이전트 감독 툴 적응)** 는 고정된 에이전트의 출력에서 파생된 신호를 사용하여 툴을 적응시킵니다.

## 주요 결과
이 프레임워크는 각 패러다임의 **비용, 유연성, 일반화 능력, 모듈성** 측면에서 명확한 트레이드오프를 보여줍니다. 특히, **T2 방법론** 은 **A2 스타일 에이전트** 에 비해 **데이터 요구 사항을 최대 70배, 훈련 시간을 최대 33배 단축** 하며 유사하거나 더 우수한 성능을 달성할 수 있음을 입증했습니다. 예를 들어, **DeepRetrieval [21] (A1)** 은 검색 작업에서 **리콜(recall)을 약 3배 향상** 시켰고, **AgentFlow [51] (T2)** 는 **GAIA 벤치마크** 에서 **33.1%** 의 정확도를 달성하여 **GPT-4** 를 능가했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 프레임워크를 통해 주어진 태스크와 시스템 제약 조건에 따라 가장 적합한 적응 전략을 선택할 수 있습니다. 특히, **T2 패러다임** 은 **데이터 효율성과 모듈성** 을 극대화하여, 고정된 대규모 기반 모델 주변에 경량화된 보조 도구들을 구축하고 지속적으로 개선하는 **하이브리드 시스템** 이 효과적인 접근 방식임을 시사합니다. 미래에는 **공동 적응, 지속적 적응, 안전한 적응, 효율적 적응** 과 같은 과제 해결이 중요할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.