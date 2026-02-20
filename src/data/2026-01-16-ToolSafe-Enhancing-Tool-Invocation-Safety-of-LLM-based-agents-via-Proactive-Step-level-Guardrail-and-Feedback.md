---
title: "[논문리뷰] ToolSafe: Enhancing Tool Invocation Safety of LLM-based agents via Proactive Step-level Guardrail and Feedback"
excerpt: "Shikun Zhang이 arXiv에 게시한 'ToolSafe: Enhancing Tool Invocation Safety of LLM-based agents via Proactive Step-level Guardrail and Feedback' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Tool Use Safety
  - Guardrail
  - Step-level Safety Detection
  - Prompt Injection
  - Reinforcement Learning
  - Feedback Framework

permalink: /ai/review/2026-01-16-ToolSafe-Enhancing-Tool-Invocation-Safety-of-LLM-based-agents-via-Proactive-Step-level-Guardrail-and-Feedback/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10156)

**저자:** Yutao Mou, Zhangchi Xue, Lijun Li, Peiyang Liu, Shikun Zhang, Wei Ye, Jing Shao, MurrayTom



## 핵심 연구 목표
본 논문은 LLM 기반 에이전트의 도구 호출 기능에서 발생하는 보안 위험을 해결하는 것을 목표로 합니다. 특히, 에이전트가 잠재적으로 안전하지 않은 도구 호출을 실행하기 **전에** 동적이고 세밀한 **단계별(step-level) 안전성 모니터링** 을 통해 악의적인 사용자 요청, 프롬프트 주입 공격, 유해한 도구 사용 등의 위험을 선제적으로 감지하고 완화하고자 합니다.

## 핵심 방법론
연구팀은 먼저 에이전트의 안전하지 않은 도구 호출 패턴을 분석하여 **TS-Bench** 라는 최초의 단계별 도구 호출 안전성 감지 벤치마크를 구축했습니다. 이를 바탕으로, **GRPO(Group Relative Policy Optimization)** 및 **다중 작업(multi-task) 보상 체계** 로 훈련된 LLM 기반 가드레일 모델인 **TS-Guard** 를 개발하여 요청 유해성, 공격 연관성, 최종 안전 등급을 포함한 해석 가능한 안전성 피드백을 제공합니다. 마지막으로, **TS-Flow** 라는 피드백 기반 추론 프레임워크를 통해 TS-Guard의 피드백을 에이전트의 추론 과정에 통합하여 안전한 행동으로의 자체 수정을 가능하게 합니다.

## 주요 결과
**TS-Guard** 는 **TS-Bench-eval** 벤치마크에서 모든 기준 모델을 일관되게 능가하며, ASB-Traj에서 **94.97%의 정확도(ACC), 94.76%의 F1 점수, 93.85%의 재현율(Recall)** 을 달성했습니다. 이는 GPT-4o의 65.84% ACC 및 63.03% F1 대비 크게 향상된 수치입니다. **TS-Flow** 는 AgentHarm-Traj에서 유해한 도구 호출을 **평균 65%까지 감소** 시키면서, 양성 작업 성능을 약 **10% 유지하거나 개선** 하는 효과를 보여주었습니다. 또한, 풍부한 피드백이 에이전트의 안전성과 효용성을 더욱 향상시킨다는 점도 입증되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 에이전트를 개방형 환경에 배포할 때 **단계별(step-level) 안전성 검증** 및 **피드백 기반의 자율 수정** 이 얼마나 중요한지 보여줍니다. **TS-Guard** 와 같은 강화 학습 기반의 가드레일 모델은 **프롬프트 주입 공격** 과 같은 복잡한 보안 위협에 효과적으로 대응할 수 있으며, **TS-Flow** 프레임워크는 에이전트가 단순히 작업을 중단하는 대신 안전한 방식으로 행동을 조정하도록 유도하여 실용적인 안전성 향상 솔루션을 제공합니다. 이는 실제 AI 시스템의 신뢰성과 안정성을 높이는 데 핵심적인 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.