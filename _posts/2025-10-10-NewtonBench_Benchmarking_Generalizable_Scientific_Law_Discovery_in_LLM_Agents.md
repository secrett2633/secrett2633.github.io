---
title: "[논문리뷰] NewtonBench: Benchmarking Generalizable Scientific Law Discovery in LLM
  Agents"
excerpt: "Baixuan Xu이 [arXiv]에 게시한 'NewtonBench: Benchmarking Generalizable Scientific Law Discovery in LLM
  Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Scientific Law Discovery
  - Benchmarking
  - Metaphysical Shifts
  - Interactive Environments
  - Exploration-Exploitation
  - Tool Use

permalink: /ai/review/2025-10-10-NewtonBench_Benchmarking_Generalizable_Scientific_Law_Discovery_in_LLM_Agents/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07172)

**저자:** Tianshi Zheng, Kelvin Kiu-Wai Tam, Newt Hue-Nam K. Nguyen, Baixuan Xu, Zhaowei Wang, et al.



## 핵심 연구 목표
기존 과학 법칙 발견 벤치마크들이 겪는 **과학적 관련성, 확장성, 암기 저항성 간의 방법론적 딜레마**를 해결하고, 정적인 함수 피팅을 넘어 **복잡한 모델 시스템의 상호작용적 탐색**을 통한 실제 과학적 발견 과정을 평가하는 것을 목표로 합니다. LLM 에이전트의 일반화 가능한 과학적 발견 능력을 엄격하게 측정하기 위한 강력한 테스트베드인 **NewtonBench**를 제안합니다.

## 핵심 방법론
**NewtonBench**는 12개 물리 도메인에 걸쳐 **324개의 과학 법칙 발견 태스크**로 구성됩니다. **형이상학적 전환(metaphysical shifts)** 기법을 사용하여 정규 법칙의 수학적 구조를 체계적으로 변경, 암기 저항성이 높고 과학적으로 관련성 있는 새로운 법칙을 생성합니다. 평가를 위해 에이전트는 **시뮬레이션된 복잡한 시스템을 실험적으로 탐색**하여 숨겨진 원리를 밝혀야 하며, **코드 해석기(code interpreter) 도구**를 선택적으로 제공하여 계산 능력을 오프로드하고 추론 능력에 집중할 수 있도록 설계했습니다.

## 주요 결과
**11개의 최신 LLM**에 대한 광범위한 평가 결과, **GPT-5**가 **72.9%**, **Gemini-2.5-pro**가 **65.0%**의 전체 기호 정확도를 기록하는 등 **선두 모델들이 과학적 발견에 있어 명확하지만 취약한 능력**을 보였습니다. 시스템 복잡성 증가 및 **관측 노이즈(observational noise)**에 극도로 민감하여, **0.0001의 미미한 노이즈**에도 정확도가 **13-15% 하락**했습니다. 또한, **코드 지원 도구**가 약한 모델에는 도움이 되지만, 유능한 모델에서는 **탐색에서 활용으로의 조기 전환**을 유도하여 성능을 저해하는 **역설적인 효과**가 발견되었습니다.

## AI 실무자를 위한 시사점
LLM이 과학적 추론의 기초 기술을 개발하고 있지만, 복잡하고 상호작용적인 환경에서 **견고하고 일반화 가능한 발견 능력**을 갖추는 것은 여전히 핵심 과제임을 시사합니다. 특히, **도구 지원이 LLM의 문제 해결 전략에 미치는 이분법적 영향**은 에이전트 설계 시 **탐색-활용 트레이드오프(exploration-exploitation trade-off)**를 신중하게 관리해야 함을 강조하며, 단순한 도구 통합이 항상 최적의 결과를 보장하지 않음을 알려줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.