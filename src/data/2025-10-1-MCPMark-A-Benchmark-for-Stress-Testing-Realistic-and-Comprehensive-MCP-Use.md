---
title: "[논문리뷰] MCPMark: A Benchmark for Stress-Testing Realistic and Comprehensive MCP
  Use"
excerpt: "이 [arXiv]에 게시한 'MCPMark: A Benchmark for Stress-Testing Realistic and Comprehensive MCP
  Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Model Context Protocol
  - Benchmark
  - Tool Use
  - CRUD Operations
  - Workflow Automation
  - Stress Testing
  - Evaluation

permalink: /ai/review/2025-10-1-MCPMark-A-Benchmark-for-Stress-Testing-Realistic-and-Comprehensive-MCP-Use/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24002)

**저자:** Zijian Wu, Xiangyan Liu, Xinyuan Zhang, Lingjun Chen, Fanqing Meng, Lingxiao Du, Yiran Zhao, Fanshi Zhang, Yaoqi Ye, Jiawei Wang, Zirui Wang, Jinjie Ni, Yufan Yang, Arvin Xu, Michael Qizhe Shieh



## 핵심 연구 목표
본 논문은 기존의 MCP(Model Context Protocol) 벤치마크가 현실적인 워크플로우의 복잡성을 제대로 포착하지 못하고 읽기 위주 또는 제한적인 상호작용 깊이에 머물러 있다는 문제점을 해결하고자 합니다. 이를 위해 **MCPMark** 라는 새로운 벤치마크를 제안하여 LLM 에이전트가 실제와 유사한 환경에서 포괄적이고 복잡한 다단계 태스크를 얼마나 잘 수행하는지 스트레스 테스트하는 것을 목표로 합니다.

## 핵심 방법론
**MCPMark** 는 **Notion, GitHub, Filesystem, PostgreSQL, Playwright** 의 5가지 대표적인 MCP 환경에 걸쳐 127개의 고품질 태스크로 구성됩니다. 각 태스크는 선별된 초기 상태와 자동 검증을 위한 **프로그래밍 스크립트** 를 포함하며, **CRUD(Create, Read, Update, Delete) 작업** 을 아우르는 광범위하고 다양한 환경 상호작용을 요구합니다. 평가는 최소한의 에이전트 프레임워크인 **MCPMark-Agent** 를 사용하여 **도구 호출 루프** 방식으로 진행되며, 태스크별로 모델의 내재적 에이전트 역량을 측정합니다.

## 주요 결과
평가 결과, 가장 성능이 우수한 모델인 **gpt-5-medium** 조차 **Pass@1에서 52.56%** , **Pass^4에서 33.86%** 의 성공률을 기록했습니다. **claude-sonnet-4** 및 **03** 와 같은 다른 강력한 모델들은 **Pass@1에서 30% 미만** , **Pass^4에서 15% 미만** 의 저조한 성능을 보였습니다. 평균적으로 LLM은 태스크당 **16.2회 실행 턴** 과 **17.4회 도구 호출** 을 필요로 하여, 기존 벤치마크보다 훨씬 높은 상호작용 복잡성을 보여주었습니다.

## AI 실무자를 위한 시사점
**MCPMark** 는 현재 최첨단 LLM 에이전트가 현실적인 다단계 워크플로우 처리 능력에 중대한 한계가 있음을 명확히 보여줍니다. 특히, 낮은 **Pass^4 점수** 는 모델의 **일관성과 안정성** 이 부족함을 시사하며, 이는 신뢰할 수 있는 실제 배포를 위해 **안정적인 오류 처리 및 자가 수정 능력** 을 갖춘 에이전트 구축의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.