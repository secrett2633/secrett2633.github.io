---
title: "[논문리뷰] The Tool Decathlon: Benchmarking Language Agents for Diverse, Realistic,
  and Long-Horizon Task Execution"
excerpt: "Haoze Wu이 [arXiv]에 게시한 'The Tool Decathlon: Benchmarking Language Agents for Diverse, Realistic,
  and Long-Horizon Task Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Agents
  - Tool Use
  - Benchmarking
  - Long-Horizon Tasks
  - Realistic Environments
  - Multi-Application
  - Execution-Based Evaluation
  - Model Context Protocol (MCP)

permalink: /ai/review/2025-10-30-The_Tool_Decathlon_Benchmarking_Language_Agents_for_Diverse_Realistic_and_Long-Horizon_Task_Execution/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25726)

**저자:** Junlong Li, Wenshuo Zhao, Jian Zhao, Weihao Zeng, Haoze Wu, Xiaochen Wang, Rui Ge, Yuxuan Cao, Yuzhen Huang, Wei Liu, Junteng Liu, Zhaochen Su, Yiyang Guo, Fan Zhou, Lueyang Zhang, Juan Michelini, Xingyao Wang, Xiang Yue, Shuyan Zhou, Graham Neubig, Junxian He



## 핵심 연구 목표
이 논문은 기존 언어 에이전트 벤치마크가 현실 세계의 다양성, 복잡성 및 장기적인 태스크 실행 능력을 제대로 반영하지 못하는 한계를 해결하고자 합니다. 이를 위해 다양한 애플리케이션, 현실적인 환경 설정, 신뢰할 수 있는 실행 기반 평가를 통해 언어 에이전트의 실제 성능을 평가하기 위한 새로운 벤치마크인 **Tool Decathlon (TOOLATHLON)**을 제안합니다.

## 핵심 방법론
**TOOLATHLON** 벤치마크는 **Google Calendar, Notion, WooCommerce, Kubernetes, BigQuery** 등 32개의 실제 소프트웨어 애플리케이션과 604개의 도구를 포괄합니다. 대부분의 도구는 **Model Context Protocol (MCP) 서버**를 기반으로 하며, 실제 소프트웨어에서 추출된 현실적인 초기 환경 상태를 제공하여 환경 상태의 다양성과 복잡성을 확보합니다. 각 108개 태스크는 여러 애플리케이션 간의 조정을 요구하며, 평균 약 20회 이상의 도구 호출을 필요로 하고, 전용 평가 스크립트를 통한 **실행 기반(execution-based)** 평가로 엄격하게 검증됩니다.

## 주요 결과
최신 모델들의 종합 평가 결과, 가장 뛰어난 상용 모델인 **Claude-4.5-Sonnet**조차 평균 20.2회의 도구 호출로 단 38.6%의 성공률을 기록했습니다. 최고 성능의 오픈 소스 모델인 **DeepSeek-V3.2-Exp**는 20.1%의 성공률을 달성하여, 상용 모델과의 명확한 성능 격차를 보였습니다. 이러한 결과는 현재 모델들이 현실 세계의 복잡하고 장기적인 태스크를 수행하는 데 상당한 한계가 있음을 명확히 보여줍니다.

## AI 실무자를 위한 시사점
**TOOLATHLON**은 복잡하고 현실적인 시나리오에서 언어 에이전트의 실제 성능을 평가하는 데 필수적인 도구입니다. 현재 모델들은 **장문 컨텍스트 처리**, **견고한 도구 호출 오류 추적**, 그리고 **다양한 환경 상태에 대한 일반화 능력**에서 큰 개선이 필요하다는 점을 시사합니다. 이 벤치마크는 실무자들이 현실 세계에 배포될 수 있는 보다 유능하고 견고한 언어 에이전트의 개발을 가속화하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.