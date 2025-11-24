---
title: "[논문리뷰] DeepPHY: Benchmarking Agentic VLMs on Physical Reasoning"
excerpt: "Ziming Wang이 [arXiv]에 게시한 'DeepPHY: Benchmarking Agentic VLMs on Physical Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Language Models (VLMs)
  - Agentic AI
  - Physical Reasoning
  - Benchmark
  - Simulation Environments
  - Action Planning
  - Interactive AI

permalink: /ai/review/2025-8-8-DeepPHY-Benchmarking-Agentic-VLMs-on-Physical-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05405)

**저자:** Xinrun Xu, Pi Bu, Ye Wang, Börje F. Karlsson, Ziming Wang



## 핵심 연구 목표
본 논문은 Vision Language Models(VLMs)이 복잡하고 동적인 물리 환경에서 **정확한 행동 계획 및 공간/시간 추론 능력**에 한계를 보이는 문제를 해결하고자 합니다. 기존 벤치마크들이 정적 QA나 단순한 물리 시뮬레이션을 다루는 반면, **DeepPHY** 벤치마크는 에이전트의 **대규모 물리 원리 이해 및 상호작용 능력**을 종합적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
DeepPHY는 **PHYRE**, **I-PHYRE**, **Kinetix**, **Pooltool**, **Angry Birds**, **Cut the Rope** 등 6가지 물리 기반 시뮬레이션 환경을 통합하여 에이전트 VLM을 평가합니다. 연속적인 액션 공간을 **정형화된 이산 액션 공간**으로 변환하고, 시각적 관측 공간에 **주석(grids, numerical IDs)**을 추가하여 객체 인식 부담을 줄였습니다. 평가 전략은 **In-advance Planning**과 **On-the-fly Planning**으로 구분되며, **Success Rate**, **Pass@K**, **Average Attempts** 지표를 사용합니다.

## 주요 결과
현재 VLM들은 복잡한 물리적 추론 작업에서 인간 대비 **상당한 성능 격차**를 보입니다. **PHYRE**에서는 **GPT-03 VLA** 모델이 10회 시도 후 **23.1%** 성공률에 그쳤으며, **Angry Birds**에서는 **Claude 3.7 Sonnet**이 **41.18%**로 인간(64.71%)보다 현저히 낮았습니다. 특히 **World Model(WM) 프롬프트**는 **Visual-Language-Action(VLA) 프롬프트**보다 성능이 저조하여, 모델의 서술적 지식이 절차적 제어로 잘 전환되지 않음을 시사합니다. **Pooltool**에서의 **GPT-40-mini VLA**의 **100%** 성공률은 단순한 **무차별적 휴리스틱**에 기인한 것으로 분석되었습니다.

## AI 실무자를 위한 시사점
본 벤치마크 결과는 현재 VLM이 복잡한 물리 환경에서 **다단계, 정밀한 계획 및 동적 적응**에 취약하다는 점을 명확히 보여줍니다. 특히 모델이 물리 현상을 **설명하는 능력**과 이를 바탕으로 **예측하고 제어하는 능력** 사이에 근본적인 단절이 존재합니다. DeepPHY는 **더욱 물리적으로 그라운딩된 AI 에이전트**를 개발하고 VLM의 실용적 적용 가능성을 높이기 위한 향후 연구의 중요한 기준점을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.