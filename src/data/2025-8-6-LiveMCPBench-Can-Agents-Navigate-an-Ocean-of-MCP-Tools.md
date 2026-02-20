---
title: "[논문리뷰] LiveMCPBench: Can Agents Navigate an Ocean of MCP Tools?"
excerpt: "Yaojie Lu이 arXiv에 게시한 'LiveMCPBench: Can Agents Navigate an Ocean of MCP Tools?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agent
  - Tool-use
  - MCP
  - Benchmark
  - Large-scale
  - Real-world tasks
  - Automated Evaluation
  - Meta-tool-learning

permalink: /ai/review/2025-8-6-LiveMCPBench-Can-Agents-Navigate-an-Ocean-of-MCP-Tools/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01780)

**저자:** Mo Guozhao, Wenliang Zhong, Jiawei Chen, Xuanang Chen, Yaojie Lu, Hongyu Lin, Ben He, Xianpei Han, Le Sun



## 핵심 연구 목표
본 논문은 기존 도구 사용 벤치마크가 시뮬레이션되거나 소규모의 MCP(Model Context Protocol) 서버에 국한되어 실제 대규모의 동적인 환경을 반영하지 못하는 한계를 지적합니다. 이에 따라 대규모의 실제 MCP 도구 환경에서 LLM 에이전트의 도구 탐색, 활용, 일반화 능력을 평가하기 위한 포괄적이고 재현 가능한 벤치마크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **95가지 실제 태스크** 를 포함하는 최초의 종합 벤치마크인 **LiveMCPBench** 를 제안합니다. 이를 위해 **70개의 MCP 서버** 와 **527개의 도구** 로 구성된 방대한 **LiveMCPTool** 도구 세트를 구축하여 접근성과 재현성을 확보했습니다. 또한, 동적이고 시간 가변적인 태스크 환경에서 다단계 도구 호출 궤적을 평가하기 위해 **LLM-as-a-Judge** 방식의 자동화된 평가 프레임워크인 **LiveMCPEval** 을 도입했으며, **ReACT 기반** 의 다단계 에이전트인 **MCP Copilot Agent** 를 개발하여 baseline으로 활용했습니다.

## 주요 결과
**LiveMCPEval** 은 인간 평가자와 **81%** 의 높은 일치율을 달성하며 평가 방법론의 신뢰성을 입증했습니다. **Claude-Sonnet-4** 모델이 **78.95%** 의 가장 높은 태스크 성공률을 기록했으며, **Claude-Opus-4** 는 **70.53%** 의 성공률을 보였습니다. 대부분의 모델은 **30%-50%** 대의 성공률을 보여 모델 간 상당한 성능 격차를 확인했습니다. Claude 계열 모델은 다른 모델 대비 더 높은 도구 활용률과 능동적인 탐색 행동을 보였으며, 비용-성능 파레토 프론티어 분석을 통해 **Qwen3-32B** , **Qwen2.5-72B-Instruct** , **Deepseek-R1-0528** , **Claude-Sonnet-4** 가 최적의 효율성을 제공함을 밝혔습니다.

## AI 실무자를 위한 시사점
**LiveMCPBench** 는 대규모 실제 환경에서 LLM 에이전트의 도구 사용 능력을 평가하는 데 필수적인 리소스를 제공합니다. 대부분의 LLM이 **메타 도구 학습** 및 다중 도구 협업에서 여전히 한계를 보인다는 점은, 향후 LLM 에이전트의 계획, 검색, 오류 처리 메커니즘 개선의 필요성을 시사합니다. 또한, **LLM-as-a-Judge** 평가 프레임워크는 동적인 태스크 환경에서 확장 가능한 평가 솔루션을 제시하여, 실제 서비스에 LLM 에이전트를 도입할 때 중요한 평가 지표로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.