---
title: "[논문리뷰] SWE-EVO: Benchmarking Coding Agents in Long-Horizon Software Evolution Scenarios"
excerpt: "Nghi D. Q. Bui이 [arXiv]에 게시한 'SWE-EVO: Benchmarking Coding Agents in Long-Horizon Software Evolution Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Coding Agents
  - Software Evolution
  - Benchmarking
  - Long-Horizon Tasks
  - Large Language Models (LLMs)
  - Software Engineering
  - Code Generation

permalink: /ai/review/2025-12-25-SWE-EVO-Benchmarking-Coding-Agents-in-Long-Horizon-Software-Evolution-Scenarios/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.18470)

**저자:** Minh V. T. Thai, Tue Le, Dung Nguyen Manh, Huy N. Phan, Nghi D. Q. Bui



## 핵심 연구 목표
이 논문은 기존 AI 코딩 에이전트 벤치마크(예: **SWE-Bench** )가 **단일 이슈 해결** 에 초점을 맞춰 실제 소프트웨어 진화의 복잡성을 포착하지 못하는 한계를 해결하고자 합니다. 개발자가 고수준 요구사항을 해석하고, 여러 파일에 걸쳐 다단계 수정을 조율하며, 기능성을 유지하면서 코드베이스를 반복적으로 발전시키는 **장기적인 소프트웨어 진화 시나리오** 에서 에이전트의 능력을 평가하는 것을 목표로 합니다.

## 핵심 방법론
논문은 실제 소프트웨어 진화 시나리오를 반영하기 위해 **릴리스 노트, 커밋 기록, 버전별 스냅샷** 을 활용하여 **48개** 의 도전적인 작업을 포함하는 새로운 벤치마크 **SWE-EVO** 를 도입합니다. 에이전트는 **Python** 오픈소스 프로젝트의 복잡한 요구사항을 해석하고, 다단계 수정을 계획하며, 광범위한 테스트 스위트를 통과해야 합니다. 또한, 부분적인 진행 상황을 측정하는 소프트 스코어 지표인 **Fix Rate (%)** 를 도입했으며, **OpenHands** 및 **SWE-agent** 프레임워크와 **GPT-5, GPT-4, Deepseek-R1** 등 **11개** 의 SOTA LLM을 사용하여 평가를 수행했습니다.

## 주요 결과
**SWE-EVO** 는 기존 벤치마크보다 훨씬 도전적이며, 최고 성능 모델인 **GPT-5** 도 **SWE-EVO** 에서 **21%** 의 **Resolved Rate** 만을 달성하여 **SWE-Bench Verified** 의 **65%** 와 큰 격차를 보였습니다. **Fix Rate (%)** 는 낮은 **Resolved Rate** 에서도 모델 간의 미묘한 성능 차이를 포착하여 **gpt-4.1** 과 **gpt-oss-120b** 가 **2.08% Resolved Rate** 임에도 각각 **4.65%** 및 **2.08% Fix Rate** 를 기록했습니다. 실패 모드 분석 결과, 강력한 모델은 주로 **Instruction Following** 에서, 약한 모델은 **Tool Use** 및 **Syntax Error** 에서 실패하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
**SWE-EVO** 의 결과는 현재 AI 코딩 에이전트가 실제 장기 소프트웨어 진화 작업에 필요한 **지속적인 계획, 다중 파일 추론 및 회귀 방지 수정** 능력에 심각한 격차가 있음을 명확히 보여줍니다. 이는 **LLM 기반 에이전트** 를 실무에 적용할 때 **고수준 요구사항 해석** 과 **코드베이스 전반의 조정** 에 대한 **인간의 면밀한 감독** 이 여전히 필수적임을 시사합니다. **SWE-EVO** 는 향후 자율 소프트웨어 엔지니어링 에이전트의 발전을 위한 중요한 벤치마크 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.