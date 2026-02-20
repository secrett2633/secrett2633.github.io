---
title: "[논문리뷰] Interactive Recommendation Agent with Active User Commands"
excerpt: "Xueyang Feng이 arXiv에 게시한 'Interactive Recommendation Agent with Active User Commands' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Interactive Recommendation
  - Large Language Models
  - Multi-Agent System
  - Natural Language Processing
  - Knowledge Distillation
  - User Control

permalink: /ai/review/2025-9-26-Interactive-Recommendation-Agent-with-Active-User-Commands/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21317)

**저자:** Jiakai Tang, Yujie Luo, Xunke Xi, Fei Sun, Xueyang Feng, Sunhao Dai, Chao Yi, Dian Chen, Zhujin Gao, Yang Li, Xu Chen, Wen Chen, Jian Wu, Yuning Jiang, Bo Zheng



## 핵심 연구 목표
본 논문은 기존 추천 시스템의 수동적 피드백 메커니즘이 사용자의 미묘한 의도와 만족도를 정확히 포착하지 못하여 발생하는 "사용자 의도-시스템 해석" 간의 간극을 해결하고자 합니다. 이를 위해 사용자가 **자연어 명령** 을 통해 추천 정책을 능동적으로 제어할 수 있는 새로운 **대화형 추천 피드(Interactive Recommendation Feed, IRF)** 패러다임을 제안하고, 사용자 만족도 및 시스템 효율성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 IRF 패러다임을 지원하기 위해 **RecBot** 이라는 **듀얼-에이전트 아키텍처** 를 개발했습니다. 이 아키텍처는 사용자의 언어 표현을 구조화된 선호도로 변환하는 **파서 에이전트(Parser Agent)** 와, 동적으로 적응형 도구 체인을 조정하여 실시간 정책 조정을 수행하는 **플래너 에이전트(Planner Agent)** 로 구성됩니다. 실용적인 배포를 위해 **시뮬레이션 증강 지식 증류(simulation-augmented knowledge distillation)** 기법을 사용하여 효율적인 성능과 강력한 추론 능력을 동시에 확보했습니다.

## 주요 결과
광범위한 오프라인 및 장기 온라인 실험 결과, **RecBot** 은 사용자 만족도와 비즈니스 성과 모두에서 상당한 개선을 보였습니다. 온라인 A/B 테스트에서 **부정적 피드백 빈도(NFF)를 0.71% 감소** 시키고, **클릭된 아이템 카테고리 다양성(CICD)을 1.44% 증가** 시켰으며, **장바구니 추가(ATC)를 1.28%, 총거래액(GMV)을 1.40% 증가** 시켰습니다. 또한 사용자 명령 이행 정확도는 **88.9%** 로 나타났습니다.

## AI 실무자를 위한 시사점
**RecBot** 은 사용자가 자연어 명령을 통해 추천 시스템과 능동적으로 상호작용하는 새로운 AI 에이전트 기반 추천 시스템의 가능성을 보여줍니다. 이는 **LLM 기반 에이전트** 를 활용하여 복잡한 사용자 의도를 해석하고 실시간으로 추천 정책을 조정하는 실용적인 접근 방식을 제시하며, **지식 증류 기법** 을 통해 대규모 LLM의 추론 능력을 유지하면서도 실제 서비스에 효율적으로 배포할 수 있음을 입증했습니다. 이는 차세대 개인화 추천 시스템 개발에 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.