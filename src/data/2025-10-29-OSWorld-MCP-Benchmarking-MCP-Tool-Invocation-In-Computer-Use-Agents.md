---
title: "[논문리뷰] OSWorld-MCP: Benchmarking MCP Tool Invocation In Computer-Use Agents"
excerpt: "arXiv에 게시된 'OSWorld-MCP: Benchmarking MCP Tool Invocation In Computer-Use Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Agents
  - Tool Invocation
  - Benchmark
  - Model Context Protocol (MCP)
  - GUI Automation
  - Computer-Use Agents
  - Evaluation Metrics

permalink: /ai/review/2025-10-29-OSWorld-MCP-Benchmarking-MCP-Tool-Invocation-In-Computer-Use-Agents/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24563)

**저자:** Hongrui Jia, Jitong Liao, Xi Zhang, Haiyang Xu, Tianbao Xie, Chaoya Jiang, Ming Yan, Si Liu, Wei Ye, Fei Huang



## 핵심 연구 목표
기존 `GUI agent` 벤치마크들이 `Model Context Protocol (MCP)`을 통한 `도구 호출(tool invocation)` 능력을 간과하여 `GUI` 상호작용만 평가하는 한계를 극복하고자 합니다. 본 연구의 목표는 `OSWorld-MCP`라는 포괄적이고 공정한 벤치마크를 제시하여 `컴퓨터 사용 agent`의 `도구 호출`, `GUI 조작`, `의사 결정 능력`을 실제 환경에서 통합적으로 평가하는 것입니다.

## 핵심 방법론
`OSWorld` 벤치마크를 기반으로 **158개의 고품질 MCP 도구** 를 통합하여 **7가지 일반 애플리케이션** 시나리오를 지원합니다. 이 도구들은 **자동화된 코드 생성 파이프라인(Code Generation, Code Filter, Tool Wrap Module)** 과 **수동 검증** 을 통해 제작되었으며, `OpenAI 03`의 추론 능력을 활용했습니다. `agent`는 `GUI` 조작과 `MCP 도구` 호출 중 자율적으로 선택하며, 평가를 위해 `Task Accuracy`와 함께 `Tool Invocation Rate (TIR)`, `Average Completion Steps (ACS)`라는 새로운 지표를 도입했습니다.

## 주요 결과
`MCP 도구`의 도입은 `agent`의 `태스크 성공률`을 크게 향상시켰는데, 예를 들어 **OpenAI 03** 의 `성공률`은 **8.3%에서 20.4%** 로, **Claude 4 Sonnet** 은 **40.1%에서 43.3%** 로 증가했습니다. 하지만 가장 강력한 모델조차 `도구 호출률`이 **36.3%** 에 불과하여 개선의 여지가 크며, `Tool Invocation Rate (TIR)`는 `태스크 정확도(accuracy)`와 **양의 상관관계** 를 보였습니다. `Gemini-2.5-Pro`는 **15단계** 에서 `정확도`가 **7.4%에서 20.5%** 로 가장 큰 향상을 보였으나, **복잡한 다중 도구 연계** 는 여전히 주요 난제로 확인되었습니다.

## AI 실무자를 위한 시사점
`MCP 도구`와 같은 `외부 도구 통합`이 `multimodal agents`의 `성능과 효율성`을 현저히 개선할 수 있음을 시사합니다. 따라서 `agent` 개발 시 `GUI` 상호작용뿐 아니라 `도구 활용 능력`을 핵심적으로 고려해야 합니다. 현재 모델들의 `낮은 도구 호출률`은 `도구 선택 및 활용 전략` 연구의 필요성을 강조하며, 특히 `Retrieval-Augmented Generation (RAG)`과 같은 **도구 선택 메커니즘** 의 고도화가 `복잡한 태스크` 해결에 중요함을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.