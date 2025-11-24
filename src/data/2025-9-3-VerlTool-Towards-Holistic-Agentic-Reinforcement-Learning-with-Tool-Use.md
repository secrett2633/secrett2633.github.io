---
title: "[논문리뷰] VerlTool: Towards Holistic Agentic Reinforcement Learning with Tool Use"
excerpt: "Zhiheng Lyu이 [arXiv]에 게시한 'VerlTool: Towards Holistic Agentic Reinforcement Learning with Tool Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Reinforcement Learning
  - Tool Use
  - Large Language Models
  - Reinforcement Learning from Verifiable Rewards (RLVR)
  - Asynchronous Execution
  - Multi-modal AI
  - Framework

permalink: /ai/review/2025-9-3-VerlTool-Towards-Holistic-Agentic-Reinforcement-Learning-with-Tool-Use/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01055)

**저자:** Dongfu Jiang, Yi Lu, Zhuofeng Li, Zhiheng Lyu, Ping Nie, Haozhe Wang, Alex Su, Hui Zhen, Fei Zou, Chao Du, Tianpeng Pang, Wenhui Chen



## 핵심 연구 목표
논문은 LLM의 독립적인 추론과 상호작용적 에이전트 지능 사이의 격차를 해소하고자 합니다. 기존 LLM의 폐쇄적인 단일 턴 추론, 파편화된 도구 관리, 비효율적인 동기식 롤아웃 등의 한계를 극복하고, 다양한 도구 사용을 지원하는 확장 가능하고 효율적인 **ARLT (Agentic Reinforcement Learning with Tool Use)** 훈련 프레임워크인 **VERLTOOL**을 제안합니다.

## 핵심 방법론
**VERLTOOL**은 기존 **VERL** 프레임워크를 기반으로 하며, RL 훈련을 담당하는 **Verl Workflow**와 도구 실행을 처리하는 **Tool Server**로 구성된 모듈식 아키텍처를 채택합니다. **표준화된 API**를 통해 **Python 코드 인터프리터, 검색 엔진, SQL, 시각 처리, Bash 터미널** 등 다양한 도구를 통합하며, 새로운 도구는 경량 Python 정의 파일을 통해 쉽게 추가됩니다. 특히, **비동기식 롤아웃**을 구현하여 배치 단위가 아닌 궤적별로 도구 호출을 처리함으로써 유휴 시간을 제거하고 훈련 효율성을 높였습니다.

## 주요 결과
**VERLTOOL**은 비동기식 롤아웃을 통해 롤아웃 실행에서 **최대 2배 이상의 속도 향상**을 달성했습니다 (예: Math-TIR에서 **1.32배**, DeepSearch에서 **1.97배**). 또한, **VT-Math에서 62.2%**, **VT-Search에서 45.9%**, **VT-SQL에서 83.9%**, **VT-VisualReasoner에서 82.7%**, **VT-DeepSearch에서 34.0%**, **VT-SWE에서 19.5%**의 성능을 기록하며, 기존 전문 시스템과 비교하여 경쟁력 있는 결과를 보였습니다. 이는 프레임워크가 다양한 도메인과 양식에 걸쳐 효과적으로 작동함을 입증합니다.

## AI 실무자를 위한 시사점
**VERLTOOL**은 AI/ML 엔지니어들이 다양한 도구와 상호작용하는 LLM 에이전트를 개발하고 훈련하는 데 필요한 **통합적이고 확장 가능한 인프라**를 제공합니다. **비동기식 롤아웃** 방식은 멀티 턴 및 도구 집약적인 태스크에서 훈련 효율성을 크게 향상시켜 분산 환경에서 리소스 활용도를 최적화합니다. 또한, **멀티모달 도구 지원**을 통해 시각적 추론과 같은 복잡한 태스크를 수행하는 에이전트 개발을 가능하게 하여, 에이전트 기반 AI 연구 및 응용 분야의 발전에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.