---
title: "[논문리뷰] AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security"
excerpt: "arXiv에 게시된 'AgentDoG: A Diagnostic Guardrail Framework for AI Agent Safety and Security' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Safety Guardrails
  - Explainable AI (XAI)
  - Risk Taxonomy
  - Benchmarking
  - LLM Safety
  - Tool Use
  - Agent Alignment

permalink: /ai/review/2026-01-28-AgentDoG-A-Diagnostic-Guardrail-Framework-for-AI-Agent-Safety-and-Security/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18491)

**저자:** Dongrui Liu, Jing Shao, Qihan Ren, et al.



## 핵심 연구 목표
AI 에이전트의 자율적인 도구 사용과 환경 상호작용으로 인해 발생하는 복잡한 안전 및 보안 문제를 해결하고자 합니다. 기존 가드레일 모델의 에이전트 리스크 인지 부족과 진단 투명성 부족이라는 한계를 극복하고, 복잡하고 다양한 위험 행동을 포괄하는 진단형 가드레일 프레임워크 **AgentDoG** 를 제시하는 것이 목표입니다.

## 핵심 방법론
논문은 에이전트 리스크를 원인(where), 실패 모드(how), 결과(what)의 세 가지 차원으로 정교하게 분류하는 **통합적인 3차원 안전 분류 체계** 를 제안합니다. 이 분류 체계를 기반으로 **ATBench** 라는 세분화된 에이전트 안전 벤치마크를 구축했으며, 이는 **10,000개 이상의 도구** 를 활용한 다단계 상호작용 궤적 데이터를 포함합니다. 또한, 에이전트 동작의 근본 원인을 진단하기 위해 **계층적 에이전트 XAI(Explainable AI) 귀인 프레임워크** 를 도입하여 특정 행동을 계획 단계, 도구 선택, 또는 맥락 오해와 연결합니다. **AgentDoG 모델** 은 **Qwen** 및 **Llama** 모델 계열의 **4B, 7B, 8B** 매개변수 변형으로 **지도 미세조정(SFT)** 을 통해 훈련되었습니다.

## 주요 결과
**AgentDoG** 는 다양한 복합 상호작용 시나리오에서 에이전트 안전 중재에 있어 **최첨단 성능** 을 달성했습니다. **R-Judge 벤치마크** 에서 **AgentDoG-Qwen3-4B** 는 **92.7%의 F1 점수** 로 **GPT-5.2(91.8%)** 를 능가했습니다. **ASSE-Safety 데이터셋** 에서는 **AgentDoG-Llama3.1-8B** 가 **83.4%의 F1 점수** 로 **Gemini-3-Pro(78.6%)** 를 앞섰습니다. **ATBench** 의 세분화된 리스크 진단에서 **AgentDoG-Qwen3-FG-4B** 는 리스크 원인 **82.0%** , 실패 모드 **32.4%** , 실제 피해 **58.4%** 의 정확도를 보이며, **Gemini-3-Pro** 의 리스크 원인 **36.8%** 대비 압도적인 성능을 입증했습니다. 모든 모델과 데이터셋은 공개적으로 배포됩니다.

## AI 실무자를 위한 시사점
**AgentDoG** 는 AI 에이전트의 복잡한 동작과 **툴 사용** 시 발생하는 안전 및 보안 문제를 진단하는 데 매우 효과적인 프레임워크입니다. 이 모델은 단순히 안전 여부를 판단하는 것을 넘어, **세분화된 리스크 진단** ( **리스크 원인, 실패 모드, 실제 피해** )을 제공하여 문제의 **근본 원인을 파악** 하고 **효과적인 개선 전략** 을 수립하는 데 도움을 줄 수 있습니다. 특히 **XAI 귀인 프레임워크** 를 통해 에이전트의 의사결정 과정을 **투명하게 이해** 할 수 있게 되어, **고위험 AI 에이전트 시스템** 의 **책임성 있는 배포** 및 **안전성 감사** 에 중요한 기반을 제공합니다. 공개된 **ATBench 벤치마크** 와 **AgentDoG 모델 변형** 들은 실제와 유사한 **툴 생태계** 에서의 **에이전트 안전 연구** 를 촉진할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.