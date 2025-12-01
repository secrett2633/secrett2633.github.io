---
title: "[논문리뷰] MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling"
excerpt: "cyyang822이 [arXiv]에 게시한 'MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Research Agent
  - Tool-Augmented Reasoning
  - Interaction Scaling
  - Large Language Models
  - Reinforcement Learning
  - Context Management
  - Open-Source AI

permalink: /ai/review/2025-11-18-MiroThinker-Pushing-the-Performance-Boundaries-of-Open-Source-Research-Agents-via-Model-Context-and-Interactive-Scaling/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11793)

**저자:** cyyang822, weizhiwang, Eric-LRL-130, mx1024, YuntaoChen



## 핵심 연구 목표
논문은 오픈소스 연구 에이전트의 성능 한계를 **모델 크기, 컨텍스트 길이, 상호작용 스케일링(interaction scaling)** 이라는 세 가지 주요 차원을 통해 확장하는 것을 목표로 합니다. 이는 에이전트가 환경과 더 깊고 빈번하게 상호작용하도록 훈련시켜, 오류를 수정하고 추론 경로를 개선하여 복잡한 실세계 연구 문제를 해결하는 능력을 향상시키는 데 중점을 둡니다.

## 핵심 방법론
MiroThinker v1.0은 **ReAct 패러다임** 을 기반으로 하며, **256K 컨텍스트 윈도우** 내에서 최대 **600회의 도구 호출** 을 수행할 수 있습니다. 효율적인 컨텍스트 관리를 위해 **최신 기반 컨텍스트 유지(Recency-Based Context Retention)** 및 결과 잘림(Result Truncation) 전략을 사용하여 컨텍스트 효율성을 높였습니다. 훈련은 **지도 미세 조정(SFT)** , **선호도 최적화(DPO)** , **강화 학습(RL)** 의 3단계 파이프라인으로 진행되며, RL은 에이전트가 환경과 직접 상호작용하며 창의적인 해결책을 탐색하도록 돕습니다.

## 주요 결과
MiroThinker v1.0-72B는 GAIA 벤치마크에서 **81.9%** , HLE에서 **37.7%** , BrowseComp에서 **47.1%** , BrowseComp-ZH에서 **55.6%** 의 정확도를 달성하며 이전 오픈소스 에이전트들을 능가하고 GPT-5-high와 같은 상용 시스템에 근접한 성능을 보였습니다. 특히, 상호작용 깊이(interaction depth)가 모델 크기 및 컨텍스트 길이와 유사한 스케일링 행동을 보이며 연구 성능이 예측 가능하게 향상됨을 입증했습니다.

## AI 실무자를 위한 시사점
MiroThinker는 **오픈소스 연구 에이전트** 로서, 모델, 컨텍스트, 그리고 **상호작용 스케일링** 이라는 새로운 성능 향상 차원을 제시합니다. AI 실무자들은 이 모델을 활용하여 복잡한 실세계 연구 워크플로우를 자동화하고, **도구 증강 추론(tool-augmented reasoning)** 및 정보 탐색 능력을 강화할 수 있습니다. 특히, **256K의 긴 컨텍스트** 와 **수백 회의 도구 호출** 을 지원하여 장기적인 추론이 필요한 작업에 유용하며, 공개된 모델 가중치와 도구 모음은 커뮤니티 기반 혁신에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.