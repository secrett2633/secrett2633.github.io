---
title: "[논문리뷰] $OneMillion-Bench: How Far are Language Agents from Human Experts?"
excerpt: "arXiv에 게시된 '$OneMillion-Bench: How Far are Language Agents from Human Experts?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Agents
  - Benchmarking
  - Expert Evaluation
  - Economic Value
  - Professional Tasks
  - Rubric-based Evaluation
  - Multi-step Reasoning
  - Reliability
  - Domain Adaptation

permalink: /ai/review/2026-03-10-OneMillion-Bench-How-Far-are-Language-Agents-from-Human-Experts/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.07980)

**저자:** Qianyu Yang, Yang Liu, Jiaqi Li, Jun Bai, Hao Chen, Kaiyuan Chen, Tiliang Duan, Jiayun Dong, Xiaobo Hu, Zixia Jia, Yang Liu, Tao Peng, Yixin Ren, Ran Tian, Zaiyuan Wang, Yanglihong Xiao, Gang Yao, Lingyue Yin, Ge Zhang, Chun Zhang, Jianpeng Jiao, Zilong Zheng, Yuan Gong



## 핵심 연구 목표
기존 벤치마크가 실세계 전문직업의 복잡한 요구사항을 충분히 반영하지 못하고, 언어 에이전트의 실제 경제적 가치 창출 능력을 측정하기 어렵다는 문제점을 해결하고자 합니다. 이를 위해 **$OneMillion-Bench($1M-Bench)** 를 도입하여, 경제적으로 중요한 시나리오에서 언어 에이전트의 신뢰성, 전문성 및 실제 적용 준비 상태를 평가하는 것을 목표로 합니다.

## 핵심 방법론
**Law, Finance, Industry, Healthcare, Natural Science** 등 5개 고위험 도메인에 걸쳐 **400개의 전문가 큐레이션 작업** 으로 벤치마크를 구성했습니다. 각 작업에는 선임 전문가의 예상 완료 시간과 시장 임금에 기반한 **실세계 금전적 가치** 가 할당되며, 총 가치는 **$1백만 달러** 를 초과합니다. 평가는 **사실 정확성, 논리적 일관성, 실용적 타당성, 전문적 준수** 에 초점을 맞춘 **루브릭 기반 평가 프로토콜** 을 사용하고, **부정적 페널티** 를 포함한 비대칭적 가중치를 적용하여 에이전트의 행동을 현실의 도메인 요구사항에 맞게 유도합니다.

## 주요 결과
**$OneMillion-Bench** 의 전체 작업 가치는 **$1,008,370 (Global) 및 ¥921,832 (CN)** 에 달하며, **Claude-Opus-4.6** 이 웹 검색 기능 활성화 시 가장 뛰어난 성능을 보이며 **$483.8k** 의 경제적 가치를 달성했습니다. 모델들은 **구조 및 형식 준수** 와 **지시사항 이행** 에서 높은 점수를 얻었으나, **사실 정보** 와 **분석적 추론** 에서는 여전히 어려움을 겪고 있습니다. 웹 검색은 상위 모델의 성능을 향상시키지만, 일부 모델에서는 노이즈로 인해 오히려 성능 저하를 보이기도 합니다.

## AI 실무자를 위한 시사점
언어 에이전트가 복잡한 전문 분야에서 인간 전문가 수준의 신뢰성과 깊이를 갖추기까지 상당한 격차가 있음을 시사합니다. **$OneMillion-Bench** 는 에이전트의 성능을 **경제적 가치** 로 정량화하여 AI 개발의 실용적 목표를 제시하고, **견고한 증거 필터링, 심층적인 분석적 추론, 도메인별 규정 준수** 능력을 강화하는 방향으로 연구를 이끌어야 함을 강조합니다. 웹 검색과 같은 도구의 통합은 효과적인 활용을 위해 신중한 설계가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
